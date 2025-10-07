import { CheckoutWizard } from '@/components/forms/CheckoutWizard';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Your Order
            </h1>
            <p className="text-lg text-gray-600">
              Review your configuration and complete your smart hotel setup
            </p>
          </div>
          
          <CheckoutWizard />
        </div>
      </div>
    </div>
  );
}
