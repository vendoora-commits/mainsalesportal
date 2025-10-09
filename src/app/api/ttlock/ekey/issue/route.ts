import { NextResponse } from 'next/server';

/**
 * TTLock Issue eKey
 * Issues a temporary or permanent digital key to a user
 */
export async function POST(request: Request) {
  const mockMode = process.env.TTLOCK_MOCK_MODE !== 'false';

  try {
    const body = await request.json();
    const { lockId, keyName, startDate, endDate, receiverUsername } = body;

    if (!lockId || !keyName || !receiverUsername) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: lockId, keyName, receiverUsername' },
        { status: 400 }
      );
    }

    if (mockMode) {
      // DEV MODE: Return mock eKey
      const mockEKey = {
        keyId: `mock_ekey_${Date.now()}`,
        lockId,
        keyName,
        receiverUsername,
        startDate: startDate || Date.now(),
        endDate: endDate || Date.now() + 24 * 60 * 60 * 1000, // 24 hours default
        keyStatus: 110401, // Valid key
        keyRight: 1, // Admin right
      };

      console.log('[TTLock Issue eKey] Mock mode - eKey issued:', mockEKey);

      return NextResponse.json({
        success: true,
        mock: true,
        data: mockEKey,
        message: 'Mock eKey issued successfully',
      });
    }

    // PRODUCTION MODE: Call actual TTLock API
    const accessToken = 'token_from_session'; // TODO: Get from session
    const clientId = process.env.TTLOCK_CLIENT_ID;

    const response = await fetch('https://euopen.ttlock.com/v3/key/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        clientId: clientId || '',
        accessToken,
        lockId: lockId.toString(),
        keyName,
        receiverUsername,
        startDate: startDate?.toString() || Date.now().toString(),
        endDate: endDate?.toString() || (Date.now() + 24 * 60 * 60 * 1000).toString(),
        date: Date.now().toString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to issue eKey via TTLock API');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      mock: false,
      data,
    });
  } catch (error) {
    console.error('[TTLock Issue eKey Error]', error);
    return NextResponse.json({ success: false, error: 'Failed to issue eKey' }, { status: 500 });
  }
}

