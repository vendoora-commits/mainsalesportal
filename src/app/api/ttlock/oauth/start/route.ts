import { NextResponse } from 'next/server';

/**
 * TTLock OAuth Start
 * Initiates OAuth flow with TTLock (cnopen.ttlock.com)
 */
export async function GET(request: Request) {
  const mockMode = process.env.TTLOCK_MOCK_MODE !== 'false';

  if (mockMode) {
    // DEV MODE: Return mock OAuth URL
    console.log('[TTLock OAuth] Mock mode - would redirect to TTLock OAuth');
    return NextResponse.json({
      success: true,
      mock: true,
      message: 'Mock OAuth - In production, would redirect to TTLock',
      redirectUrl: '/api/ttlock/oauth/callback?code=mock_auth_code',
    });
  }

  // PRODUCTION MODE: Redirect to actual TTLock OAuth
  const clientId = process.env.TTLOCK_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/ttlock/oauth/callback`;
  
  if (!clientId) {
    return NextResponse.json({ success: false, error: 'TTLock client ID not configured' }, { status: 500 });
  }

  const oauthUrl = `https://euopen.ttlock.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;

  return NextResponse.redirect(oauthUrl);
}

