import { Header } from '@/components/layout/header';
import { HomePageContent } from '@/components/pages/home-page-content';
import type { Metadata } from 'next';

interface LocalePageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vendoora.com';
  const { locale } = params;

  const titles: Record<string, string> = {
    'en-US': 'Smart Hotel Solutions - Vendoora',
    'zh-CN': '智能酒店解决方案 - Vendoora',
    'es-419': 'Soluciones de Hotel Inteligente - Vendoora',
    'pt-BR': 'Soluções de Hotel Inteligente - Vendoora',
    'de-DE': 'Smarte Hotellösungen - Vendoora',
    'fr-FR': 'Solutions Hôtel Intelligent - Vendoora',
    'ar': 'حلول الفنادق الذكية - Vendoora',
  };

  const descriptions: Record<string, string> = {
    'en-US':
      'Transform your hotel, Airbnb, VRBO or timeshare with intelligent kiosks, smart locks, and complete room automation. Multi-language, region-aware solutions.',
    'zh-CN': '使用智能自助机、智能门锁和完整的房间自动化改造您的酒店、Airbnb、VRBO 或分时度假物业。多语言、区域感知解决方案。',
    'es-419':
      'Transforme su hotel, Airbnb, VRBO o tiempo compartido con quioscos inteligentes, cerraduras inteligentes y automatización completa de habitaciones.',
    'pt-BR':
      'Transforme seu hotel, Airbnb, VRBO ou time-share com quiosques inteligentes, fechaduras inteligentes e automação completa de quartos.',
  };

  return {
    title: titles[locale] || titles['en-US'],
    description: descriptions[locale] || descriptions['en-US'],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries(
        ['en-US', 'zh-CN', 'es-419', 'pt-BR', 'de-DE', 'fr-FR', 'ar'].map((loc) => [
          loc,
          `${baseUrl}/${loc}`,
        ])
      ),
    },
  };
}

export default function LocalePage({ params }: LocalePageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HomePageContent />
      </main>
    </div>
  );
}

