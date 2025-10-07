import { StateManagementDemo } from '@/components/examples/state-management-demo';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <StateManagementDemo />
        </div>
      </div>
    </div>
  );
}
