import { BookingIntegrationDemo } from '@/components/booking-integration/BookingIntegrationDemo';

export default function BookingIntegrationDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <BookingIntegrationDemo />
        </div>
      </div>
    </div>
  );
}
