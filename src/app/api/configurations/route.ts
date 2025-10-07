import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { propertyId, kioskConfig, smartLockConfig, roomFeaturesConfig, totalPrice } = body;

    const configuration = await db.createConfiguration({
      property_id: propertyId,
      kiosk_config: kioskConfig,
      smart_lock_config: smartLockConfig,
      room_features_config: roomFeaturesConfig,
      total_price: totalPrice,
      status: 'draft',
    });

    return NextResponse.json({ success: true, data: configuration });
  } catch (error) {
    console.error('Error creating configuration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create configuration' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const configuration = await db.getConfigurationById(id);
      return NextResponse.json({ success: true, data: configuration });
    }

    return NextResponse.json({ success: false, error: 'Configuration ID required' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching configuration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch configuration' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Configuration ID required' }, { status: 400 });
    }

    const configuration = await db.updateConfiguration(id, {
      ...updates,
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: configuration });
  } catch (error) {
    console.error('Error updating configuration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update configuration' },
      { status: 500 }
    );
  }
}
