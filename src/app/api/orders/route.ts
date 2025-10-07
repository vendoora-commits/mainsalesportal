import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, configurationId, totalAmount, billingAddress, shippingAddress } = body;

    const order = await db.createOrder({
      user_id: userId,
      configuration_id: configurationId,
      total_amount: totalAmount,
      billing_address: billingAddress,
      shipping_address: shippingAddress,
      status: 'pending',
    });

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (id) {
      const order = await db.getOrderById(id);
      return NextResponse.json({ success: true, data: order });
    }

    if (userId) {
      const orders = await db.getOrdersByUserId(userId);
      return NextResponse.json({ success: true, data: orders });
    }

    return NextResponse.json({ success: false, error: 'Order ID or User ID required' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, stripePaymentIntentId } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Order ID required' }, { status: 400 });
    }

    const updates: Record<string, string> = {
      updated_at: new Date().toISOString(),
    };

    if (status) updates.status = status;
    if (stripePaymentIntentId) updates.stripe_payment_intent_id = stripePaymentIntentId;

    const order = await db.updateOrderStatus(id, status);
    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
