import { KioskCatalog } from '@/components/kiosk-showcase/KioskCatalog';

export const metadata = {
  title: 'Interactive Kiosk Showcase | Vendoora',
  description: 'Explore our premium self-service kiosks in dual finishes with interactive hover/tap switching',
};

export default function KioskShowcasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <KioskCatalog />
        </div>
      </div>
    </div>
  );
}

