// Internationalization configuration and utilities
// This provides a foundation for multilingual support

export const locales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ar'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  ar: 'العربية',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
  pt: '🇵🇹',
  ja: '🇯🇵',
  ko: '🇰🇷',
  zh: '🇨🇳',
  ar: '🇸🇦',
};

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  es: 'ltr',
  fr: 'ltr',
  de: 'ltr',
  it: 'ltr',
  pt: 'ltr',
  ja: 'ltr',
  ko: 'ltr',
  zh: 'ltr',
  ar: 'rtl',
};

// Language detection utilities
export function detectLocale(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return defaultLocale;
  
  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase());
  
  for (const lang of languages) {
    // Exact match
    if (locales.includes(lang as Locale)) {
      return lang as Locale;
    }
    
    // Language code match (e.g., 'en-US' -> 'en')
    const langCode = lang.split('-')[0];
    if (locales.includes(langCode as Locale)) {
      return langCode as Locale;
    }
  }
  
  return defaultLocale;
}

// URL utilities for locale routing
export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }
  return `/${locale}${path}`;
}

export function getLocaleFromPath(path: string): Locale | null {
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  
  const firstSegment = segments[0];
  if (locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  
  return null;
}

export function removeLocaleFromPath(path: string): string {
  const locale = getLocaleFromPath(path);
  if (!locale) return path;
  
  return path.replace(`/${locale}`, '') || '/';
}

// Format utilities
export function formatCurrency(amount: number, locale: Locale = defaultLocale): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  });
  
  return formatter.format(amount);
}

export function formatDate(date: Date, locale: Locale = defaultLocale): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return formatter.format(date);
}

export function formatDateTime(date: Date, locale: Locale = defaultLocale): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return formatter.format(date);
}

export function formatNumber(number: number, locale: Locale = defaultLocale): string {
  const formatter = new Intl.NumberFormat(locale);
  return formatter.format(number);
}

// Validation
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
