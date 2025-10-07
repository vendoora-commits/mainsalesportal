import { SmartLockWizard } from '@/components/forms/SmartLockWizard';

export default function SmartLocksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Configure Your Smart Lock System
            </h1>
            <p className="text-lg text-gray-600">
              Choose the perfect smart locks with your preferred access methods and power options
            </p>
          </div>
          
          <SmartLockWizard />
        </div>
      </div>
    </div>
  );
}
