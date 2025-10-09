import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 11 locales as per final spec (locked)
const locales = ['en', 'es', 'pt', 'fi', 'tl', 'ur', 'pl', 'de', 'nl', 'ar', 'fr'];
const defaultLocale = 'en';

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

  // Try to detect from geo (if available)
  const country = request.geo?.country;
  if (country) {
    const market = countryToMarket(country);
    if (market !== 'global') {
      return market;
    }
  }

  // Map locale to market (as per final specification)
  const localeToMarket: Record<string, string> = {
    'en': 'us',
    'es': 'latam',
    'pt': 'latam',
    'fi': 'eu',
    'tl': 'apac',
    'ur': 'pk',
    'pl': 'eu',
    'de': 'eu',
    'nl': 'eu',
    'ar': 'gcc',
    'fr': 'eu',
  };

  return localeToMarket[locale] || 'us';
}

// Country to market mapping (as per specification)
function countryToMarket(cc: string): string {
  const c = cc.toUpperCase();
  if (['US', 'CA'].includes(c)) return 'us';
  if (['BR', 'MX', 'AR', 'CL', 'CO', 'PE', 'UY', 'PY', 'EC', 'BO', 'CR', 'PA', 'SV', 'GT', 'NI', 'HN', 'DO', 'PR'].includes(c)) return 'latam';
  if (['ZA', 'NG', 'KE', 'EG', 'MA', 'GH', 'ET', 'DZ', 'TN'].includes(c)) return 'afr';
  if (['AE', 'SA', 'QA', 'KW', 'OM', 'BH'].includes(c)) return 'gcc';
  if (['PK'].includes(c)) return 'pk';
  if (['CN', 'JP', 'KR', 'SG', 'AU', 'NZ', 'TH', 'MY', 'PH', 'ID', 'IN', 'VN', 'TW', 'HK', 'BD', 'LK'].includes(c)) return 'apac';
  if (['GB', 'IE', 'DE', 'FR', 'ES', 'IT', 'NL', 'SE', 'NO', 'DK', 'FI', 'PT', 'PL', 'AT', 'BE', 'CZ', 'HU', 'RO', 'SK', 'GR', 'BG', 'HR', 'SI', 'EE', 'LV', 'LT', 'LU', 'MT', 'CY'].includes(c)) return 'eu';
  return 'global';
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

