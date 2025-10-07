import { NextResponse } from 'next/server';
import { generateId } from '@/lib/utils';

/**
 * POST /api/checkin/start
 * Initiates the check-in process at a kiosk
 * 
 * Body: { 
 *   reservationId: string,
 *   guest: { name: string, docType: string, docScanId?: string },
 *   kioskId: string 
 * }
 * 
 * Response: { 
 *   checkinId: string,
 *   verificationRequired: boolean,
 *   verificationMethods: string[],
 *   estimatedTime: number
 * }
 */
export async function POST(request: Request) {
  try {
    const { reservationId, guest, kioskId } = await request.json();

    if (!reservationId || !guest || !kioskId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: reservationId, guest, or kioskId' },
        { status: 400 }
      );
    }

    // Generate check-in session ID
    const checkinId = generateId();
    
    // Determine if ID verification is required
    const verificationRequired = true; // Always require verification for security
    const verificationMethods = ['passport', 'id', 'face'];

    // Mock check-in session
    const checkinSession = {
      id: checkinId,
      reservationId,
      guest: {
        name: guest.name,
        docType: guest.docType,
        docScanId: guest.docScanId,
      },
      kioskId,
      status: 'pending_verification',
      verificationRequired,
      verificationMethods,
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min expiry
    };

    // In production, this would be stored in database
    // For now, return the session data
    return NextResponse.json({
      success: true,
      data: {
        checkinId,
        verificationRequired,
        verificationMethods,
        estimatedTime: 5, // minutes
        session: checkinSession,
      },
    });
  } catch (error) {
    console.error('Check-in start error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

