import { NextResponse } from 'next/server';

/**
 * POST /api/keys/revoke
 * Revokes a previously issued key
 * 
 * Body: { 
 *   keyId: string,
 *   reason: string
 * }
 * 
 * Response: { 
 *   revoked: boolean,
 *   revokedAt: string
 * }
 */
export async function POST(request: Request) {
  try {
    const { keyId, reason } = await request.json();

    if (!keyId || !reason) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: keyId or reason' },
        { status: 400 }
      );
    }

    // Mock key revocation
    // In production, this would:
    // 1. Call TTLock/Tuya API to revoke the key
    // 2. Update database to mark key as revoked
    // 3. Send notification to lock (if online)
    // 4. Log the revocation for audit trail

    const revocationRecord = {
      keyId,
      reason,
      revoked: true,
      revokedAt: new Date().toISOString(),
      revokedBy: 'system', // Would be actual user ID
      method: 'api',
    };

    return NextResponse.json({
      success: true,
      data: {
        revoked: true,
        revokedAt: revocationRecord.revokedAt,
        message: 'Key revoked successfully',
        record: revocationRecord,
      },
    });
  } catch (error) {
    console.error('Key revocation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

