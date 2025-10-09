import { NextResponse } from 'next/server';

/**
 * TTLock Revoke eKey
 * Revokes an issued digital key
 */
export async function POST(request: Request) {
  const mockMode = process.env.TTLOCK_MOCK_MODE !== 'false';

  try {
    const body = await request.json();
    const { keyId, lockId } = body;

    if (!keyId) {
      return NextResponse.json({ success: false, error: 'Missing required field: keyId' }, { status: 400 });
    }

    if (mockMode) {
      // DEV MODE: Mock revocation
      console.log('[TTLock Revoke eKey] Mock mode - revoking keyId:', keyId);

      return NextResponse.json({
        success: true,
        mock: true,
        data: {
          keyId,
          lockId,
          revokedAt: new Date().toISOString(),
          status: 'revoked',
        },
        message: 'Mock eKey revoked successfully',
      });
    }

    // PRODUCTION MODE: Call actual TTLock API
    const accessToken = 'token_from_session'; // TODO: Get from session
    const clientId = process.env.TTLOCK_CLIENT_ID;

    const response = await fetch('https://euopen.ttlock.com/v3/key/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        clientId: clientId || '',
        accessToken,
        keyId: keyId.toString(),
        date: Date.now().toString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to revoke eKey via TTLock API');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      mock: false,
      data,
    });
  } catch (error) {
    console.error('[TTLock Revoke eKey Error]', error);
    return NextResponse.json({ success: false, error: 'Failed to revoke eKey' }, { status: 500 });
  }
}

