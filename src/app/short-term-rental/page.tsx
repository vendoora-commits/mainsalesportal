import { ShortTermRentalWizard } from '@/components/forms/ShortTermRentalWizard';

export default function ShortTermRentalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Configure Your Short-Term Rental
            </h1>
            <p className="text-lg text-gray-600">
              Set up your Airbnb, VRBO, or vacation rental property with smart technology solutions
            </p>
          </div>
          
          <ShortTermRentalWizard />
        </div>
      </div>
    </div>
  );
}
