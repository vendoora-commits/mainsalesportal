import { NextResponse } from 'next/server';

/**
 * TTLock List Locks
 * Returns list of locks associated with the authenticated account
 */
export async function GET(request: Request) {
  const mockMode = process.env.TTLOCK_MOCK_MODE !== 'false';

  if (mockMode) {
    // DEV MODE: Return mock locks
    const mockLocks = [
      {
        lockId: 'mock_lock_1',
        lockName: 'Room 101 - TAJ L-Series',
        lockAlias: 'Room 101',
        lockMac: '00:11:22:33:44:55',
        electricQuantity: 85,
        featureValue: 'T1_SL_FPRW',
        lockData: 'mock_data',
      },
      {
        lockId: 'mock_lock_2',
        lockName: 'Room 102 - TAJ KL-Series',
        lockAlias: 'Room 102',
        lockMac: '00:11:22:33:44:66',
        electricQuantity: 92,
        featureValue: 'T1_SL_FPRWC',
        lockData: 'mock_data',
      },
    ];

    console.log('[TTLock List] Mock mode - returning', mockLocks.length, 'locks');

    return NextResponse.json({
      success: true,
      mock: true,
      data: {
        list: mockLocks,
        pageNo: 1,
        pageSize: 20,
        pages: 1,
        total: mockLocks.length,
      },
    });
  }

  // PRODUCTION MODE: Call actual TTLock API
  try {
    // TODO: Get access token from session
    const accessToken = 'token_from_session'; // Replace with actual token retrieval

    const response = await fetch('https://euopen.ttlock.com/v3/lock/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        clientId: process.env.TTLOCK_CLIENT_ID || '',
        accessToken,
        pageNo: '1',
        pageSize: '100',
        date: Date.now().toString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch locks from TTLock API');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      mock: false,
      data,
    });
  } catch (error) {
    console.error('[TTLock List Error]', error);
    return NextResponse.json({ success: false, error: 'Failed to list locks' }, { status: 500 });
  }
}

