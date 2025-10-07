import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CertificationBadges } from '@/components/ui/certification-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Download, Share2, Heart, Check } from 'lucide-react';
import { loadCatalog, getAllProducts } from '@/lib/product-catalog';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: { locale: string; category: string; slug: string };
}

const catalogMap: Record<string, string> = {
  'locks': '/data/locks-taj-hotel-v2.json',
  'kiosks': '/data/estar-kiosks.json',
  'switches': '/data/hidintech-switches-us.json',
  'blinds': '/data/poyal-blinds.json',
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, category, slug } = params;
  
  const catalogPath = catalogMap[category];
  if (!catalogPath) {
    notFound();
  }

  const catalog = await loadCatalog(catalogPath);
  const products = catalog ? getAllProducts(catalog) : [];
  const product = products.find((p) => p.id === slug || p.sku === slug);

  if (!product) {
    notFound();
  }

  // Get localized name
  const productName = (product as any).name?.[locale] || (product as any).name?.['en-US'] || product.name;
  const productShort = (product as any).short?.[locale] || (product as any).short?.['en-US'] || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <a href={`/${locale}`} className="hover:text-primary">Home</a>
            {' / '}
            <a href={`/${locale}/products`} className="hover:text-primary">Products</a>
            {' / '}
            <a href={`/${locale}/products/${category}`} className="hover:text-primary">{category}</a>
            {' / '}
            <span className="text-foreground font-medium">{productName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <div className="aspect-square bg-white p-8">
                  <img
                    src={(product as any).images?.default?.[0] || product.imageUrl || '/vendoora-assets/images_4k/placeholder.png'}
                    alt={productName}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Card>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{productName}</h1>
                {productShort && (
                  <p className="text-lg text-muted-foreground">{productShort}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">SKU: {product.sku}</p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" className="text-base px-4 py-2">
                  {product.category}
                </Badge>
                {(product as any).protocols?.map((protocol: string) => (
                  <Badge key={protocol} variant="secondary">
                    {protocol.toUpperCase()}
                  </Badge>
                ))}
                {(product as any).power?.map((power: string) => (
                  <Badge key={power} variant="outline">
                    {power}
                  </Badge>
                ))}
              </div>

              {/* Certifications */}
              {(product as any).certifications && (
                <div>
                  <h3 className="font-semibold mb-2">Certifications</h3>
                  <CertificationBadges certifications={(product as any).certifications} variant="compact" />
                </div>
              )}

              {/* Price */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="pt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold">${product.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">per unit</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Volume discounts available for 20+ units
                  </p>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Configuration
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Product Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Key Features:</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(product as any).protocols && (
                      <div>
                        <dt className="font-semibold text-sm text-muted-foreground">Protocols</dt>
                        <dd className="mt-1">{(product as any).protocols.join(', ')}</dd>
                      </div>
                    )}
                    {(product as any).power && (
                      <div>
                        <dt className="font-semibold text-sm text-muted-foreground">Power</dt>
                        <dd className="mt-1">{(product as any).power.join(', ')}</dd>
                      </div>
                    )}
                    {(product as any).electrical && (
                      <div>
                        <dt className="font-semibold text-sm text-muted-foreground">Electrical</dt>
                        <dd className="mt-1">
                          {(product as any).electrical.voltage} {(product as any).electrical.freq}
                        </dd>
                      </div>
                    )}
                    {(product as any).regions && (
                      <div>
                        <dt className="font-semibold text-sm text-muted-foreground">Available Regions</dt>
                        <dd className="mt-1">
                          {(product as any).regions.map((r: string) => r.toUpperCase()).join(', ')}
                        </dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integration">
              <Card>
                <CardHeader>
                  <CardTitle>Integration & Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(product as any).integration && (
                    <div>
                      <h3 className="font-semibold mb-2">Compatible Apps</h3>
                      <div className="flex flex-wrap gap-2">
                        {(product as any).integration.apps?.map((app: string) => (
                          <Badge key={app} variant="secondary">{app}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {(product as any).requirements && (
                    <div>
                      <h3 className="font-semibold mb-2">Requirements</h3>
                      <ul className="space-y-2">
                        {(product as any).requirements.map((req: any, index: number) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {typeof req === 'string' ? req : (req[locale] || req['en-US'])}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="downloads">
              <Card>
                <CardHeader>
                  <CardTitle>Downloads & Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Product Specification Sheet (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Installation Guide (PDF)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    API Documentation (PDF)
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

