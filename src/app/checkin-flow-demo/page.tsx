import { CheckInFlowDemo } from '@/components/trinity-taj/CheckInFlowDemo';

export const metadata = {
  title: 'Check-In Flow Demo | Trinity-TAJ API | Vendoora',
  description: 'Interactive demonstration of the Trinity-TAJ kiosk to lock check-in automation flow',
};

export default function CheckInFlowDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <CheckInFlowDemo />
        </div>
      </div>
    </div>
  );
}

