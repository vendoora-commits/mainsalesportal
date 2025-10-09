import { NextResponse } from 'next/server';

/**
 * TTLock OAuth Callback
 * Exchanges auth code for access token and stores in session
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const mockMode = process.env.TTLOCK_MOCK_MODE !== 'false';

  if (!code) {
    return NextResponse.json({ success: false, error: 'No authorization code provided' }, { status: 400 });
  }

  if (mockMode) {
    // DEV MODE: Return mock token
    console.log('[TTLock OAuth Callback] Mock mode - received code:', code);
    
    const mockToken = {
      access_token: 'mock_access_token_' + Date.now(),
      refresh_token: 'mock_refresh_token_' + Date.now(),
      expires_in: 3600,
      scope: 'user,lock',
    };

    // TODO: Store in encrypted session
    console.log('[TTLock OAuth] Mock token generated:', mockToken);

    return NextResponse.json({
      success: true,
      mock: true,
      message: 'Mock OAuth callback - token generated',
      token: mockToken,
    });
  }

  // PRODUCTION MODE: Exchange code for token
  try {
    const clientId = process.env.TTLOCK_CLIENT_ID;
    const clientSecret = process.env.TTLOCK_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/ttlock/oauth/callback`;

    if (!clientId || !clientSecret) {
      return NextResponse.json({ success: false, error: 'TTLock credentials not configured' }, { status: 500 });
    }

    const tokenResponse = await fetch('https://euopen.ttlock.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const tokenData = await tokenResponse.json();

    // TODO: Store token in encrypted session (NextAuth or similar)
    console.log('[TTLock OAuth] Token obtained successfully');

    return NextResponse.json({
      success: true,
      mock: false,
      message: 'OAuth successful',
    });
  } catch (error) {
    console.error('[TTLock OAuth Error]', error);
    return NextResponse.json({ success: false, error: 'Failed to complete OAuth flow' }, { status: 500 });
  }
}

