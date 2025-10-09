import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vendoora.com';
// 11 locales as per final spec (locked)
const locales = ['en', 'es', 'pt', 'fi', 'tl', 'ur', 'pl', 'de', 'nl', 'ar', 'fr'];

const routes = [
  '',
  '/setup',
  '/product-catalog',
  '/kiosk-showcase',
  '/short-term-rental',
  '/guest-management',
  '/booking-integration',
  '/cleaning-maintenance',
  '/admin',
  '/products',
  '/products/locks',
  '/products/kiosks',
  '/products/switches',
  '/products/blinds',
  '/wizard',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Generate entries for each route × locale combination
  for (const route of routes) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${route}`;
      
      // Create alternate language links
      const languages: Record<string, string> = {};
      locales.forEach((loc) => {
        languages[loc] = `${baseUrl}/${loc}${route}`;
      });

      entries.push({
        url,
        lastModified: now,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route.startsWith('/products') ? 0.9 : 0.8,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}

