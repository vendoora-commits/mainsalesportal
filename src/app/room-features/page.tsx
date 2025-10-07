import { RoomFeaturesWizard } from '@/components/forms/RoomFeaturesWizard';

export default function RoomFeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Configure Your Smart Room Features
            </h1>
            <p className="text-lg text-gray-600">
              Complete your smart hotel experience with automated room controls and sensors
            </p>
          </div>
          
          <RoomFeaturesWizard />
        </div>
      </div>
    </div>
  );
}
