import { DatabaseDemo } from '@/components/examples/database-demo';

export default function DatabaseDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <DatabaseDemo />
        </div>
      </div>
    </div>
  );
}
