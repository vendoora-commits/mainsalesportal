import { SmartHotelBuilder } from '@/components/trinity-taj/SmartHotelBuilder';

export const metadata = {
  title: 'Smart Hotel Builder | Trinity-TAJ Integration | Vendoora',
  description: 'Configure your smart hotel with Trinity-TAJ locks and kiosks - complete check-in automation solution',
};

export default function TrinityTajBuilderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Smart Hotel Experience Builder
            </h1>
            <p className="text-xl text-gray-600">
              Configure your property with Trinity-TAJ smart locks and self-service kiosks
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Powered by Trinity-TAJ Smart Lock 2025 & Hotel Lock API catalogs
            </p>
          </div>
          
          <SmartHotelBuilder />
        </div>
      </div>
    </div>
  );
}

