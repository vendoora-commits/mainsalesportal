/**
 * SEO and Metadata Management
 * Generates optimized meta tags, structured data, and multilingual SEO
 */

import type { Metadata } from 'next';
import type { Region } from './regions';

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  locale: string;
  alternates?: Record<string, string>;
  openGraph?: {
    title: string;
    description: string;
    image?: string;
    type?: string;
  };
  twitter?: {
    card: 'summary' | 'summary_large_image';
    title: string;
    description: string;
    image?: string;
  };
}

/**
 * Generate metadata for a page
 */
export function generateMetadata(seo: PageSEO, baseUrl: string = 'https://vendoora.com'): Metadata {
  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    
    // Open Graph
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      url: seo.canonical || baseUrl,
      siteName: 'Vendoora',
      locale: seo.locale,
      type: (seo.openGraph?.type as 'website') || 'website',
      ...(seo.openGraph?.image && {
        images: [
          {
            url: seo.openGraph.image,
            width: 1200,
            height: 630,
            alt: seo.openGraph.title || seo.title,
          },
        ],
      }),
    },

    // Twitter
    twitter: {
      card: seo.twitter?.card || 'summary_large_image',
      title: seo.twitter?.title || seo.title,
      description: seo.twitter?.description || seo.description,
      ...(seo.twitter?.image && {
        images: [seo.twitter.image],
      }),
    },

    // Canonical URL
    ...(seo.canonical && {
      alternates: {
        canonical: seo.canonical,
        ...(seo.alternates && {
          languages: seo.alternates,
        }),
      },
    }),

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

/**
 * Generate hreflang tags for multilingual pages
 */
export function generateHreflangTags(
  path: string,
  languages: string[],
  baseUrl: string = 'https://vendoora.com'
): Record<string, string> {
  const alternates: Record<string, string> = {};

  for (const lang of languages) {
    alternates[lang] = `${baseUrl}/${lang}${path}`;
  }

  // Add x-default for default language
  alternates['x-default'] = `${baseUrl}/en${path}`;

  return alternates;
}

/**
 * Generate structured data (JSON-LD) for products
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl?: string;
  sku?: string;
  brand?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Vendoora',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * Generate structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vendoora',
    url: 'https://vendoora.com',
    logo: 'https://vendoora.com/vendoora-assets/logos/vendoora-logo-light.svg',
    description: 'Smart Hotel Experience Platform - Transform your property with intelligent kiosks, smart locks, and automation',
    sameAs: [
      // Add social media profiles here
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'sales@vendoora.com',
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Get region-specific SEO keywords
 */
export function getRegionalKeywords(region: Region): string[] {
  const baseKeywords = [
    'smart hotel',
    'hotel automation',
    'self check-in kiosk',
    'smart lock',
    'property management',
    'guest experience',
    'hotel technology',
    'smart room',
  ];

  const regionalKeywords: Record<Region, string[]> = {
    us: ['hotel technology USA', 'US smart hotel', 'American hospitality tech'],
    eu: ['hotel technology Europe', 'EU smart hotel', 'European hospitality tech', 'CE certified'],
    asia: ['hotel technology Asia', 'Asian smart hotel', 'smart hotel China', 'smart hotel Japan'],
    latam: ['tecnología hotelera', 'hotel inteligente', 'automatización hotelera'],
    africa: ['hotel technology Africa', 'smart hotel Middle East', 'African hospitality tech'],
    global: ['international hotel technology', 'global smart hotel solutions'],
  };

  return [...baseKeywords, ...(regionalKeywords[region] || [])];
}

/**
 * Generate sitemap entry
 */
export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: {
    languages: Record<string, string>;
  };
}

/**
 * Generate sitemap for all pages
 */
export function generateSitemap(baseUrl: string = 'https://vendoora.com'): SitemapEntry[] {
  const now = new Date();
  const languages = ['en', 'es', 'zh', 'de', 'fr', 'pt'];

  const pages = [
    { path: '/', priority: 1.0, freq: 'daily' as const },
    { path: '/setup', priority: 0.9, freq: 'weekly' as const },
    { path: '/kiosk', priority: 0.9, freq: 'weekly' as const },
    { path: '/locks', priority: 0.9, freq: 'weekly' as const },
    { path: '/room-features', priority: 0.9, freq: 'weekly' as const },
    { path: '/checkout', priority: 0.8, freq: 'weekly' as const },
    { path: '/short-term-rental', priority: 0.8, freq: 'weekly' as const },
    { path: '/guest-management', priority: 0.7, freq: 'weekly' as const },
    { path: '/booking-integration', priority: 0.7, freq: 'weekly' as const },
    { path: '/cleaning-maintenance', priority: 0.7, freq: 'weekly' as const },
    { path: '/kiosk-showcase', priority: 0.6, freq: 'monthly' as const },
    { path: '/supplier-catalogs', priority: 0.5, freq: 'monthly' as const },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: now,
    changeFrequency: page.freq,
    priority: page.priority,
    alternates: {
      languages: languages.reduce((acc, lang) => {
        acc[lang] = `${baseUrl}/${lang}${page.path}`;
        return acc;
      }, {} as Record<string, string>),
    },
  }));
}

