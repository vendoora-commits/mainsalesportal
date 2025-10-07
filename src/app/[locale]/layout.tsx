import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/components/providers/language-provider';
import { NotificationSystem } from '@/components/ui/notification-system';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

const locales = ['en-US', 'zh-CN', 'es-419', 'pt-BR', 'de-DE', 'fr-FR', 'ar'];

// Generate metadata with hreflang support
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vendoora.com';
  const { locale } = params;

  // Generate alternate language links (hreflang)
  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = `${baseUrl}/${loc}`;
  });

  return {
    title: 'Vendoora - Smart Hotel Experience Platform',
    description:
      'Transform your property with intelligent kiosks, smart locks, and automation. Multi-language, region-aware solution for hotels, Airbnb, VRBO, and timeshare properties.',
    keywords: [
      'smart hotel',
      'hotel automation',
      'self check-in kiosk',
      'smart lock',
      'property management',
      'guest experience',
      'hotel technology',
      'smart room',
      'IoT',
      'hospitality',
    ],
    icons: {
      icon: '/vendoora-assets/favicon-32.png',
      shortcut: '/vendoora-assets/favicon-32.png',
      apple: '/vendoora-assets/favicon-32.png',
    },
    manifest: '/manifest.json',
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: 'Vendoora - Smart Hotel Experience Platform',
      description:
        'Transform your property with intelligent kiosks, smart locks, and automation',
      url: `${baseUrl}/${locale}`,
      siteName: 'Vendoora',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/vendoora-assets/logos/vendoora-logo-light.svg`,
          width: 1200,
          height: 630,
          alt: 'Vendoora Smart Hotel Platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Vendoora - Smart Hotel Experience Platform',
      description: 'Transform your property with intelligent kiosks, smart locks, and automation',
    },
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
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Custom CSS */}
        <link rel="stylesheet" href="/vendoora-assets/css/ui-buttons.css" />
        <link rel="stylesheet" href="/vendoora-assets/css/kiosk-interactive.css" />
        
        {/* Custom JS */}
        <script src="/vendoora-assets/js/kiosk-interactive.js" defer></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            {children}
            <NotificationSystem />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

