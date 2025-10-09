/**
 * Regional Configuration System
 * Manages region-specific settings, certifications, and product filtering
 * Updated to match specification: us, eu, latam, afr, gcc, apac
 */

export type Region = 'us' | 'eu' | 'latam' | 'afr' | 'gcc' | 'apac' | 'pk' | 'global';

export interface RegionConfig {
  id: Region;
  name: string;
  languages: string[];
  defaultLanguage: string;
  currency: string;
  currencySymbol: string;
  voltage: string;
  frequency: string;
  certifications: string[];
  dateFormat: string;
  timezone: string;
}

export const REGIONS: Record<Region, RegionConfig> = {
  us: {
    id: 'us',
    name: 'United States & Canada',
    languages: ['en', 'es'],
    defaultLanguage: 'en',
    currency: 'USD',
    currencySymbol: '$',
    voltage: '120V',
    frequency: '60Hz',
    certifications: ['FCC', 'UL', 'ETL', 'Energy Star'],
    dateFormat: 'MM/DD/YYYY',
    timezone: 'America/New_York',
  },
  eu: {
    id: 'eu',
    name: 'European Union',
    languages: ['en', 'de', 'fr', 'es', 'it'],
    defaultLanguage: 'en',
    currency: 'EUR',
    currencySymbol: '€',
    voltage: '230V',
    frequency: '50Hz',
    certifications: ['CE', 'RoHS', 'WEEE', 'UKCA', 'ErP'],
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Europe/London',
  },
  apac: {
    id: 'apac',
    name: 'Asia Pacific',
    languages: ['en', 'zh', 'ja', 'ko'],
    defaultLanguage: 'en',
    currency: 'USD',
    currencySymbol: '$',
    voltage: '100-240V',
    frequency: '50-60Hz',
    certifications: ['CCC', 'PSE', 'KC', 'BSMI'],
    dateFormat: 'YYYY/MM/DD',
    timezone: 'Asia/Shanghai',
  },
  latam: {
    id: 'latam',
    name: 'Latin America',
    languages: ['es', 'pt', 'en'],
    defaultLanguage: 'es',
    currency: 'USD',
    currencySymbol: '$',
    voltage: '110-240V',
    frequency: '50-60Hz',
    certifications: ['NOM', 'INMETRO', 'IRAM'],
    dateFormat: 'DD/MM/YYYY',
    timezone: 'America/Mexico_City',
  },
  afr: {
    id: 'afr',
    name: 'Africa',
    languages: ['en', 'fr'],
    defaultLanguage: 'en',
    currency: 'USD',
    currencySymbol: '$',
    voltage: '220-240V',
    frequency: '50Hz',
    certifications: ['SABS', 'KEBS'],
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Africa/Johannesburg',
  },
  gcc: {
    id: 'gcc',
    name: 'Gulf Cooperation Council',
    languages: ['ar', 'en'],
    defaultLanguage: 'ar',
    currency: 'USD',
    currencySymbol: '$',
    voltage: '220-240V',
    frequency: '50Hz',
    certifications: ['SASO', 'ESMA'],
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Asia/Dubai',
  },
  pk: {
    id: 'pk',
    name: 'Pakistan',
    languages: ['ur', 'en'],
    defaultLanguage: 'ur',
    currency: 'PKR',
    currencySymbol: '₨',
    voltage: '220-240V',
    frequency: '50Hz',
    certifications: ['CE', 'SASO'], // Accept CE while PK-specific certs are added
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Asia/Karachi',
  },
  global: {
    id: 'global',
    name: 'Global',
    languages: ['en'],
    defaultLanguage: 'en',
    currency: 'USD',
    currencySymbol: '$',
    voltage: '100-240V',
    frequency: '50-60Hz',
    certifications: ['CE', 'FCC', 'RoHS'],
    dateFormat: 'YYYY-MM-DD',
    timezone: 'UTC',
  },
};

/**
 * Get region configuration by ID
 */
export function getRegion(regionId: Region): RegionConfig {
  return REGIONS[regionId];
}

/**
 * Country to Market mapping (as per specification)
 */
const countryToMarket: Record<string, Region> = {
  // US & Canada
  'US': 'us', 'CA': 'us',
  
  // European Union
  'GB': 'eu', 'IE': 'eu', 'DE': 'eu', 'FR': 'eu', 'ES': 'eu', 'IT': 'eu',
  'NL': 'eu', 'SE': 'eu', 'NO': 'eu', 'DK': 'eu', 'FI': 'eu', 'PT': 'eu',
  'AT': 'eu', 'BE': 'eu', 'CH': 'eu', 'PL': 'eu', 'CZ': 'eu', 'GR': 'eu',
  'BG': 'eu', 'HR': 'eu', 'CY': 'eu', 'EE': 'eu', 'HU': 'eu', 'LV': 'eu',
  'LT': 'eu', 'LU': 'eu', 'MT': 'eu', 'RO': 'eu', 'SK': 'eu', 'SI': 'eu',
  
  // Latin America
  'BR': 'latam', 'MX': 'latam', 'AR': 'latam', 'CL': 'latam', 'CO': 'latam',
  'PE': 'latam', 'VE': 'latam', 'EC': 'latam', 'UY': 'latam', 'BO': 'latam',
  'PY': 'latam', 'GT': 'latam', 'CU': 'latam', 'DO': 'latam', 'HN': 'latam',
  'NI': 'latam', 'SV': 'latam', 'CR': 'latam', 'PA': 'latam',
  
  // Africa
  'ZA': 'afr', 'NG': 'afr', 'KE': 'afr', 'EG': 'afr', 'MA': 'afr',
  'TZ': 'afr', 'GH': 'afr', 'ET': 'afr', 'UG': 'afr', 'DZ': 'afr',
  'SD': 'afr', 'AO': 'afr', 'MZ': 'afr',
  
  // GCC (Gulf Cooperation Council)
  'AE': 'gcc', 'SA': 'gcc', 'QA': 'gcc', 'KW': 'gcc', 'OM': 'gcc', 'BH': 'gcc',
  
  // Pakistan (separate market as per final spec)
  'PK': 'pk',
  
  // Asia Pacific
  'CN': 'apac', 'JP': 'apac', 'KR': 'apac', 'SG': 'apac', 'AU': 'apac',
  'NZ': 'apac', 'TH': 'apac', 'MY': 'apac', 'PH': 'apac', 'ID': 'apac',
  'IN': 'apac', 'VN': 'apac', 'HK': 'apac', 'TW': 'apac', 'BD': 'apac',
  'LK': 'apac',
};

/**
 * Detect region from browser locale (as per specification)
 */
export function detectRegion(): Region {
  if (typeof window === 'undefined') return 'global';

  const locale = navigator.language || 'en-US';
  const country = locale.split('-')[1]?.toUpperCase();

  // Use country-to-market mapping from spec
  if (country && countryToMarket[country]) {
    return countryToMarket[country];
  }

  // Fallback to US
  return 'us';
}

/**
 * Format currency for a region
 */
export function formatCurrency(amount: number, region: Region): string {
  const config = getRegion(region);
  return new Intl.NumberFormat(config.defaultLanguage, {
    style: 'currency',
    currency: config.currency,
  }).format(amount);
}

/**
 * Format date for a region
 */
export function formatDate(date: Date, region: Region): string {
  const config = getRegion(region);
  return new Intl.DateTimeFormat(config.defaultLanguage, {
    dateStyle: 'medium',
    timeZone: config.timezone,
  }).format(date);
}

/**
 * Check if a product is compatible with a region
 */
export function isProductCompatible(
  productVoltage: string,
  productFrequency: string,
  productCertifications: string[],
  region: Region
): boolean {
  const config = getRegion(region);

  // Check voltage compatibility
  const voltageMatch = productVoltage.includes(config.voltage.split('-')[0]);

  // Check frequency compatibility
  const frequencyMatch = productFrequency.includes(config.frequency.split('-')[0]);

  // Check if product has at least one regional certification
  const certificationMatch = productCertifications.some((cert) =>
    config.certifications.some((regCert) => regCert.toLowerCase() === cert.toLowerCase())
  );

  return voltageMatch && frequencyMatch && certificationMatch;
}

