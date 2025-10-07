import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en-US', 'zh-CN', 'es-419', 'pt-BR', 'de-DE', 'fr-FR', 'ar'];
const defaultLocale = 'en-US';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip API routes, static files, and assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/vendoora-assets') ||
    pathname.startsWith('/data') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Get locale from cookie or Accept-Language header
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const acceptLanguage = request.headers.get('accept-language');

  let locale = defaultLocale;

  // Priority: Cookie > Accept-Language > Default
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "en-US,en;q=0.9,es;q=0.8")
    const langs = acceptLanguage
      .split(',')
      .map((l) => l.split(';')[0].trim());

    // Try exact match first
    const exactMatch = langs.find((l) => locales.includes(l));
    if (exactMatch) {
      locale = exactMatch;
    } else {
      // Try language code match (e.g., "zh" matches "zh-CN")
      const langCode = langs[0]?.split('-')[0];
      const codeMatch = locales.find((l) => l.startsWith(langCode + '-'));
      if (codeMatch) {
        locale = codeMatch;
      }
    }
  }

  // Detect market from locale or geo
  const market = getMarketFromLocale(locale, request);

  // Redirect to locale-prefixed URL
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);

  // Set cookies for future visits (1 year)
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });

  response.cookies.set('NEXT_MARKET', market, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });

  return response;
}

function getMarketFromLocale(locale: string, request: NextRequest): string {
  // First try to get from existing cookie
  const cookieMarket = request.cookies.get('NEXT_MARKET')?.value;
  if (cookieMarket) {
    return cookieMarket;
  }

  // Map locale to market (as per specification)
  const localeToMarket: Record<string, string> = {
    'en-US': 'us',
    'zh-CN': 'apac',
    'es-419': 'latam',
    'pt-BR': 'latam',
    'de-DE': 'eu',
    'fr-FR': 'eu',
    'ar': 'gcc',
  };

  return localeToMarket[locale] || 'us';
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next (Next.js internals)
     * - vendoora-assets (static assets)
     * - data (JSON files)
     * - Files with extensions (images, css, js)
     */
    '/((?!api|_next|vendoora-assets|data|.*\\..*).*)',
  ],
};

