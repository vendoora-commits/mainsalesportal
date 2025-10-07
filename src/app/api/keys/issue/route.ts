import { NextResponse } from 'next/server';
import { generateId } from '@/lib/utils';

/**
 * POST /api/keys/issue
 * Issues a digital or physical key for guest room access
 * 
 * Body: {
 *   propertyId: string,
 *   unitId: string,
 *   guestId: string,
 *   lockFamily: "TAJ-L-series" | "TAJ-KL-series" | "TAJ-S-series",
 *   auth: ("card" | "mobile" | "pin" | "fp")[],
 *   validFrom: string,
 *   validUntil: string,
 *   channel: "kiosk" | "mobile" | "pms"
 * }
 * 
 * Response: { 
 *   keyId: string,
 *   type: "rfid" | "mobile" | "pin",
 *   vendorRef: string,
 *   qrPayload?: string,
 *   walletPassUrl?: string,
 *   pinCode?: string
 * }
 */
export async function POST(request: Request) {
  try {
    const { 
      propertyId, 
      unitId, 
      guestId, 
      lockFamily, 
      auth, 
      validFrom, 
      validUntil, 
      channel 
    } = await request.json();

    if (!propertyId || !unitId || !guestId || !lockFamily || !auth || !validFrom || !validUntil) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate lock family
    const validLockFamilies = ['TAJ-L-series', 'TAJ-KL-series', 'TAJ-S-series'];
    if (!validLockFamilies.includes(lockFamily)) {
      return NextResponse.json(
        { success: false, error: 'Invalid lock family' },
        { status: 400 }
      );
    }

    // Generate key ID
    const keyId = generateId();
    
    // Determine key type based on auth methods
    let keyType: 'rfid' | 'mobile' | 'pin' = 'mobile';
    let qrPayload: string | undefined;
    let walletPassUrl: string | undefined;
    let pinCode: string | undefined;

    if (auth.includes('card')) {
      keyType = 'rfid';
    } else if (auth.includes('mobile')) {
      keyType = 'mobile';
      // Generate QR payload for mobile key
      qrPayload = JSON.stringify({
        keyId,
        propertyId,
        unitId,
        validFrom,
        validUntil,
        lockFamily,
      });
      // Generate wallet pass URL
      walletPassUrl = `https://vendoora.com/wallet/${keyId}`;
    } else if (auth.includes('pin')) {
      keyType = 'pin';
      // Generate random 6-digit PIN
      pinCode = Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Mock vendor reference (would be actual TTLock/Tuya API response)
    const vendorRef = `${lockFamily.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create key record
    const keyRecord = {
      id: keyId,
      propertyId,
      unitId,
      guestId,
      lockFamily,
      type: keyType,
      auth,
      validFrom,
      validUntil,
      channel,
      vendorRef,
      qrPayload,
      walletPassUrl,
      pinCode,
      status: 'issued',
      issuedAt: new Date().toISOString(),
      lastUsed: null,
      accessCount: 0,
    };

    // In production, this would:
    // 1. Call TTLock/Tuya API to register the key
    // 2. Store key record in database
    // 3. Send mobile key to guest via email/SMS if applicable

    return NextResponse.json({
      success: true,
      data: {
        keyId,
        type: keyType,
        vendorRef,
        qrPayload,
        walletPassUrl,
        pinCode,
        expiresAt: validUntil,
        record: keyRecord,
      },
    });
  } catch (error) {
    console.error('Key issuance error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

