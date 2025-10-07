import { NextResponse } from 'next/server';

/**
 * POST /api/checkin/finish
 * Completes the check-in process
 * 
 * Body: { 
 *   checkinId: string,
 *   keyId: string
 * }
 * 
 * Response: { 
 *   status: "completed",
 *   completedAt: string,
 *   roomNumber?: string,
 *   checkoutTime?: string
 * }
 */
export async function POST(request: Request) {
  try {
    const { checkinId, keyId } = await request.json();

    if (!checkinId || !keyId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: checkinId or keyId' },
        { status: 400 }
      );
    }

    // Mock check-in completion
    // In production, this would:
    // 1. Update reservation status to 'checked_in'
    // 2. Update guest status in guest management
    // 3. Send welcome message
    // 4. Trigger room preparation if applicable
    // 5. Log check-in event for analytics

    const completionRecord = {
      checkinId,
      keyId,
      status: 'completed',
      completedAt: new Date().toISOString(),
      roomNumber: '301', // Mock room assignment
      checkoutTime: '11:00 AM',
      welcomeMessageSent: true,
    };

    return NextResponse.json({
      success: true,
      data: {
        status: 'completed',
        completedAt: completionRecord.completedAt,
        roomNumber: completionRecord.roomNumber,
        checkoutTime: completionRecord.checkoutTime,
        message: 'Check-in completed successfully. Welcome!',
        record: completionRecord,
      },
    });
  } catch (error) {
    console.error('Check-in completion error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

