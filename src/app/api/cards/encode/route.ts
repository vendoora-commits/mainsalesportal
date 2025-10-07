import { NextResponse } from 'next/server';

/**
 * POST /api/cards/encode
 * Encodes an RFID card with key data and dispenses it from kiosk
 * 
 * Body: { 
 *   keyId: string,
 *   kioskId: string,
 *   encoderId: string
 * }
 * 
 * Response: { 
 *   status: "dispensed" | "failed",
 *   cardId?: string,
 *   error?: string
 * }
 */
export async function POST(request: Request) {
  try {
    const { keyId, kioskId, encoderId } = await request.json();

    if (!keyId || !kioskId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: keyId or kioskId' },
        { status: 400 }
      );
    }

    // Mock card encoding process
    // In production, this would:
    // 1. Send command to kiosk card encoder
    // 2. Write key data to RFID chip
    // 3. Dispense card from slot
    // 4. Verify card was dispensed successfully

    // Simulate encoding delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate card ID
    const cardId = `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const encodingRecord = {
      keyId,
      cardId,
      kioskId,
      encoderId: encoderId || 'default-encoder',
      status: 'dispensed',
      encodedAt: new Date().toISOString(),
      cardType: 'RFID-13.56MHz', // MIFARE Classic or compatible
      technology: 'ISO14443A',
    };

    return NextResponse.json({
      success: true,
      data: {
        status: 'dispensed',
        cardId,
        message: 'Card encoded and dispensed successfully',
        record: encodingRecord,
      },
    });
  } catch (error) {
    console.error('Card encoding error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Card encoding failed',
        status: 'failed' 
      },
      { status: 500 }
    );
  }
}

