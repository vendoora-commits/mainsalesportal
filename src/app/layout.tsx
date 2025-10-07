import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/components/providers/language-provider';
import { NotificationSystem, ToastSystem } from '@/components/ui/notification-system';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Vendoora - Smart Hotel Experience Platform',
    template: '%s | Vendoora',
  },
  description: 'Customize your hotel property with smart kiosks, locks, and room automation solutions.',
  keywords: ['hotel', 'smart', 'kiosk', 'automation', 'hospitality', 'technology'],
  authors: [{ name: 'Vendoora Team' }],
  creator: 'Vendoora',
  publisher: 'Vendoora',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vendoora.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vendoora.com',
    title: 'Vendoora - Smart Hotel Experience Platform',
    description: 'Customize your hotel property with smart kiosks, locks, and room automation solutions.',
    siteName: 'Vendoora',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vendoora - Smart Hotel Experience Platform',
    description: 'Customize your hotel property with smart kiosks, locks, and room automation solutions.',
    creator: '@vendoora',
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
  icons: {
    icon: '/vendoora-assets/favicon-32.png',
    apple: '/vendoora-assets/images/icon-192.png',
  },
  manifest: '/vendoora-assets/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="stylesheet" href="/vendoora-assets/css/ui-buttons.css" />
          <link rel="stylesheet" href="/vendoora-assets/css/kiosk-interactive.css" />
          <script src="/vendoora-assets/js/kiosk-interactive.js" defer></script>
        </head>
        <body className={`${inter.className} antialiased`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <LanguageProvider>
                {children}
                <NotificationSystem />
                <ToastSystem />
              </LanguageProvider>
            </ThemeProvider>
          </body>
        </html>
  );
}