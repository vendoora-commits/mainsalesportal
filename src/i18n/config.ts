/**
 * i18n Configuration
 * Matches specification requirements for route-based locales and market mapping
 */

export const locales = ['en-US', 'zh-CN', 'es-419', 'pt-BR', 'de-DE', 'fr-FR', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en-US';

export const localeNames: Record<Locale, string> = {
  'en-US': 'English (US)',
  'zh-CN': '中文 (简体)',
  'es-419': 'Español (América Latina)',
  'pt-BR': 'Português (Brasil)',
  'de-DE': 'Deutsch',
  'fr-FR': 'Français',
  'ar': 'العربية',
};

export const localeFlags: Record<Locale, string> = {
  'en-US': '🇺🇸',
  'zh-CN': '🇨🇳',
  'es-419': '🌎',
  'pt-BR': '🇧🇷',
  'de-DE': '🇩🇪',
  'fr-FR': '🇫🇷',
  'ar': '🇸🇦',
};

// Market mapping as per specification
export const markets = ['us', 'eu', 'latam', 'afr', 'gcc', 'apac'] as const;
export type Market = (typeof markets)[number];

export const marketNames: Record<Market, string> = {
  us: 'United States & Canada',
  eu: 'European Union',
  latam: 'Latin America',
  afr: 'Africa',
  gcc: 'Gulf Cooperation Council',
  apac: 'Asia Pacific',
};

// Locale → Market mapping (as per spec)
export const localeToMarket: Record<Locale, Market> = {
  'en-US': 'us',
  'zh-CN': 'apac',
  'es-419': 'latam',
  'pt-BR': 'latam',
  'de-DE': 'eu',
  'fr-FR': 'eu',
  'ar': 'gcc',
};

// Country → Market mapping (as per spec)
export const countryToMarket: Record<string, Market> = {
  // US & Canada
  'US': 'us', 'CA': 'us',
  
  // European Union
  'GB': 'eu', 'IE': 'eu', 'DE': 'eu', 'FR': 'eu', 'ES': 'eu', 'IT': 'eu',
  'NL': 'eu', 'SE': 'eu', 'NO': 'eu', 'DK': 'eu', 'FI': 'eu', 'PT': 'eu',
  'AT': 'eu', 'BE': 'eu', 'CH': 'eu', 'PL': 'eu', 'CZ': 'eu', 'GR': 'eu',
  
  // Latin America
  'BR': 'latam', 'MX': 'latam', 'AR': 'latam', 'CL': 'latam', 'CO': 'latam',
  'PE': 'latam', 'VE': 'latam', 'EC': 'latam', 'UY': 'latam',
  
  // Africa
  'ZA': 'afr', 'NG': 'afr', 'KE': 'afr', 'EG': 'afr', 'MA': 'afr',
  'TZ': 'afr', 'GH': 'afr', 'ET': 'afr',
  
  // GCC (Gulf Cooperation Council)
  'AE': 'gcc', 'SA': 'gcc', 'QA': 'gcc', 'KW': 'gcc', 'OM': 'gcc', 'BH': 'gcc',
  
  // Asia Pacific
  'CN': 'apac', 'JP': 'apac', 'KR': 'apac', 'SG': 'apac', 'AU': 'apac',
  'NZ': 'apac', 'TH': 'apac', 'MY': 'apac', 'PH': 'apac', 'ID': 'apac',
  'IN': 'apac', 'VN': 'apac', 'HK': 'apac', 'TW': 'apac',
};

// Market electrical specifications
export const marketElectricalSpecs: Record<Market, {
  voltage: string;
  frequency: string;
  commonSockets: string[];
}> = {
  us: {
    voltage: '120V',
    frequency: '60 Hz',
    commonSockets: ['decora', 'NEMA 5-15'],
  },
  eu: {
    voltage: '230V',
    frequency: '50 Hz',
    commonSockets: ['euro86', 'Type F', 'Type E'],
  },
  latam: {
    voltage: '110-240V',
    frequency: '50-60 Hz',
    commonSockets: ['Type N', 'Type A', 'Type C'],
  },
  afr: {
    voltage: '220-240V',
    frequency: '50 Hz',
    commonSockets: ['Type M', 'Type D', 'Type G'],
  },
  gcc: {
    voltage: '220-240V',
    frequency: '50 Hz',
    commonSockets: ['Type G', 'Type D'],
  },
  apac: {
    voltage: '100-240V',
    frequency: '50-60 Hz',
    commonSockets: ['Type I', 'Type A', 'Type C'],
  },
};

// Market required certifications
export const marketCertifications: Record<Market, string[]> = {
  us: ['FCC', 'UL', 'ETL'],
  eu: ['CE', 'RoHS', 'WEEE', 'UKCA'],
  latam: ['INMETRO', 'NOM', 'IRAM'],
  afr: ['SABS', 'KEBS'],
  gcc: ['SASO', 'ESMA'],
  apac: ['CCC', 'PSE', 'KC', 'BSMI'],
};

/**
 * Detect locale from browser
 */
export function detectLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  
  const browserLang = navigator.language || 'en-US';
  
  // Try exact match first
  if (locales.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }
  
  // Try language code match
  const langCode = browserLang.split('-')[0];
  const match = locales.find(l => l.startsWith(langCode));
  
  return match || defaultLocale;
}

/**
 * Detect market from browser/country
 */
export function detectMarket(): Market {
  if (typeof window === 'undefined') return 'us';
  
  // Try to get country from timezone or language
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = detectLocale();
  
  // Use locale → market mapping
  return localeToMarket[locale] || 'us';
}

/**
 * Get/Set locale and market from cookies
 */
export function getStoredLocale(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
  return match ? (match[1] as Locale) : null;
}

export function getStoredMarket(): Market | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/NEXT_MARKET=([^;]+)/);
  return match ? (match[1] as Market) : null;
}

export function storeLocale(locale: Locale): void {
  if (typeof document === 'undefined') return;
  document.cookie = `NEXT_LOCALE=${locale}; max-age=${60 * 60 * 24 * 365}; path=/`;
}

export function storeMarket(market: Market): void {
  if (typeof document === 'undefined') return;
  document.cookie = `NEXT_MARKET=${market}; max-age=${60 * 60 * 24 * 365}; path=/`;
}

/**
 * Get locale and market (cookie > detection)
 */
export function getUserRegion(): { locale: Locale; market: Market } {
  const storedLocale = getStoredLocale();
  const storedMarket = getStoredMarket();
  
  if (storedLocale && storedMarket) {
    return { locale: storedLocale, market: storedMarket };
  }
  
  const locale = detectLocale();
  const market = detectMarket();
  
  return { locale, market };
}

