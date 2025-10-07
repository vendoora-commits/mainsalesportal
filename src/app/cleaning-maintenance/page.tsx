import { CleaningDashboard } from '@/components/cleaning-maintenance/CleaningDashboard';

export default function CleaningMaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <CleaningDashboard />
        </div>
      </div>
    </div>
  );
}
