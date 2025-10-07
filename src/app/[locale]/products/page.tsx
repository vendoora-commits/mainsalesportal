import { Header } from '@/components/layout/header';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, MonitorPlay, Lightbulb, Blinds, ArrowRight } from 'lucide-react';

interface ProductsPageProps {
  params: { locale: string };
}

const categories = [
  {
    id: 'locks',
    name: 'Smart Locks',
    description: 'Advanced smart lock systems for hotels and short-term rentals',
    icon: Lock,
    productCount: 15,
    path: '/products/locks',
  },
  {
    id: 'kiosks',
    name: 'Self Check-in Kiosks',
    description: 'E-Star kiosks for seamless guest check-in',
    icon: MonitorPlay,
    productCount: 8,
    path: '/products/kiosks',
  },
  {
    id: 'switches',
    name: 'Smart Switches',
    description: 'HidinTech smart switches with regional variants',
    icon: Lightbulb,
    productCount: 20,
    path: '/products/switches',
  },
  {
    id: 'blinds',
    name: 'Smart Blinds',
    description: 'Poyal motorized blinds for interior and exterior',
    icon: Blinds,
    productCount: 12,
    path: '/products/blinds',
  },
];

export default function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Product Categories</h1>
            <p className="text-lg text-muted-foreground">
              Explore our complete range of smart hotel solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} href={`/${locale}${category.path}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <Badge variant="secondary">{category.productCount} Products</Badge>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                        Explore {category.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

