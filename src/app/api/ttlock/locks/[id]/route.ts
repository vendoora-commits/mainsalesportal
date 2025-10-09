import { NextResponse } from 'next/server';

/**
 * TTLock Lock Details
 * Gets detailed information about a specific lock
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const mockMode = process.env.TTLOCK_MOCK_MODE !== 'false';
  const { id } = params;

  if (mockMode) {
    // DEV MODE: Return mock lock details
    const mockLock = {
      lockId: id,
      lockName: `Room ${id} - TAJ Smart Lock`,
      lockAlias: `Room ${id}`,
      lockMac: '00:11:22:33:44:' + id.slice(-2),
      electricQuantity: Math.floor(Math.random() * 40) + 60,
      featureValue: 'T1_SL_FPRW',
      lockData: 'mock_encrypted_data',
      lockVersion: {
        protocolType: 5,
        protocolVersion: 3,
        scene: 2,
        groupId: 7,
        orgId: 1,
      },
      timezoneRawOffset: 28800000,
      modelNum: 'TAJ-L-001',
      hardwareRevision: '1.0',
      firmwareRevision: '3.2.1',
    };

    console.log('[TTLock Lock Detail] Mock mode - returning details for lock:', id);

    return NextResponse.json({
      success: true,
      mock: true,
      data: mockLock,
    });
  }

  // PRODUCTION MODE: Call actual TTLock API
  try {
    const accessToken = 'token_from_session'; // TODO: Get from session
    const clientId = process.env.TTLOCK_CLIENT_ID;

    const response = await fetch('https://euopen.ttlock.com/v3/lock/detail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        clientId: clientId || '',
        accessToken,
        lockId: id,
        date: Date.now().toString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch lock details from TTLock API');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      mock: false,
      data,
    });
  } catch (error) {
    console.error('[TTLock Lock Detail Error]', error);
    return NextResponse.json({ success: false, error: 'Failed to get lock details' }, { status: 500 });
  }
}

