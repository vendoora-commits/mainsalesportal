import { Header } from '@/components/layout/header';
import { HomePageContent } from '@/components/pages/home-page-content';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <HomePageContent />
    </div>
  );
}