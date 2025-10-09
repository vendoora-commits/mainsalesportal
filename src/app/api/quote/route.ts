import { NextResponse } from 'next/server';
import { notifyQuote, formatQuoteMessage } from '@/lib/notify';
import { generateId } from '@/lib/utils';

/**
 * Quote API Route
 * Handles quote requests and sends notifications
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { property, items, contact } = body;

    if (!property || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: property, items' },
        { status: 400 }
      );
    }

    // Generate quote ID
    const quoteId = generateId();

    // Calculate total cost
    const totalCost = items.reduce((sum: number, item: { price: number; quantity: number }) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Format notification message
    const message = formatQuoteMessage({
      propertyName: property.name || 'Unnamed Property',
      propertyType: property.type || 'Hotel',
      numberOfRooms: property.rooms || 1,
      market: property.market || 'us',
      selectedProducts: items,
      totalCost,
    });

    // Send WhatsApp/SMS notification
    const notificationResult = await notifyQuote({
      message,
      phoneNumber: process.env.SALES_PHONE_NUMBER,
    });

    // Log quote request
    console.log('[Quote Request]', {
      quoteId,
      property: property.name,
      items: items.length,
      totalCost,
      contact,
      notificationSent: notificationResult.ok,
      mocked: notificationResult.mocked,
    });

    // TODO: Store quote in database (Supabase)
    // await db.quotes.create({ quoteId, property, items, contact, totalCost, status: 'pending' });

    // Return quote details
    return NextResponse.json({
      success: true,
      data: {
        quoteId,
        property,
        items,
        totalCost,
        contact,
        createdAt: new Date().toISOString(),
        status: 'received',
        notification: {
          sent: notificationResult.ok,
          mocked: notificationResult.mocked,
          messageId: notificationResult.messageId,
        },
      },
      message: notificationResult.mocked
        ? 'Quote received (notification mocked in dev mode)'
        : 'Quote received and sales team notified',
    });
  } catch (error) {
    console.error('[Quote API Error]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}

/**
 * GET - Retrieve quote by ID
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const quoteId = searchParams.get('id');

  if (!quoteId) {
    return NextResponse.json({ success: false, error: 'Quote ID required' }, { status: 400 });
  }

  // TODO: Fetch from database
  // const quote = await db.quotes.findById(quoteId);

  // Mock response for now
  return NextResponse.json({
    success: true,
    mock: true,
    data: {
      quoteId,
      status: 'pending',
      message: 'Quote retrieval - database integration pending',
    },
  });
}

