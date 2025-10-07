import { KioskSelectionWizard } from '@/components/forms/KioskSelectionWizard';

export default function KioskSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Select Your Smart Kiosk Solutions
            </h1>
            <p className="text-lg text-gray-600">
              Choose the perfect kiosk solutions for your hotel&apos;s front desk and guest services
            </p>
          </div>
          
          <KioskSelectionWizard />
        </div>
      </div>
    </div>
  );
}
