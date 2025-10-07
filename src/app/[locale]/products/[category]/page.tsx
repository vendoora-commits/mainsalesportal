import { Header } from '@/components/layout/header';
import { ProductCard } from '@/components/products/ProductCard';
import { loadCatalog, getAllProducts } from '@/lib/product-catalog';
import type { Product } from '@/lib/product-catalog';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: { locale: string; category: string };
}

const catalogMap: Record<string, string> = {
  'locks': '/data/locks-taj-hotel-v2.json',
  'kiosks': '/data/estar-kiosks.json',
  'switches': '/data/hidintech-switches-us.json',
  'blinds': '/data/poyal-blinds.json',
};

export async function generateStaticParams() {
  return [
    { category: 'locks' },
    { category: 'kiosks' },
    { category: 'switches' },
    { category: 'blinds' },
  ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, category } = params;
  
  const catalogPath = catalogMap[category];
  if (!catalogPath) {
    notFound();
  }

  const catalog = await loadCatalog(catalogPath);
  const products = catalog ? getAllProducts(catalog) : [];

  const categoryNames: Record<string, string> = {
    locks: 'Smart Locks',
    kiosks: 'Self Check-in Kiosks',
    switches: 'Smart Switches',
    blinds: 'Smart Blinds',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <nav className="text-sm text-muted-foreground mb-4">
              <a href={`/${locale}`} className="hover:text-primary">Home</a>
              {' / '}
              <a href={`/${locale}/products`} className="hover:text-primary">Products</a>
              {' / '}
              <span className="text-foreground font-medium">{categoryNames[category]}</span>
            </nav>
            <h1 className="text-4xl font-bold mb-2">{categoryNames[category]}</h1>
            <p className="text-lg text-muted-foreground">
              Showing {products.length} products in this category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product as Product & { images?: { [key: string]: string }; rating?: number; reviews?: number; inStock?: boolean }}
                variant="default"
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg font-medium mb-2">No products found in this category</p>
              <p className="text-muted-foreground">Check back soon for new additions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

