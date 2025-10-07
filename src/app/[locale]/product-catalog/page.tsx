'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters, type FilterOptions } from '@/components/products/ProductFilters';
import { ProductComparison } from '@/components/products/ProductComparison';
import { PriceCalculator } from '@/components/products/PriceCalculator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpDown, LayoutGrid, List, GitCompare, Calculator, Loader2 } from 'lucide-react';
import { loadCatalog, getAllProducts, type Product } from '@/lib/product-catalog';
import { detectRegion } from '@/lib/regions';

export default function ProductCatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'compare' | 'calculate'>('browse');

  // Load all product catalogs
  useEffect(() => {
    const loadAllProducts = async () => {
      setIsLoading(true);
      const region = detectRegion();
      const catalogPaths = [
        '/data/hidintech-switches-us.json',
        '/data/hidintech-switches-eu.json',
        '/data/poyal-blinds.json',
        '/data/estar-kiosks.json',
        '/data/locks-trinity-taj.json',
      ];

      const allProducts: Product[] = [];

      for (const path of catalogPaths) {
        const catalog = await loadCatalog(path);
        if (catalog) {
          const catalogProducts = getAllProducts(catalog);
          // Add mock data for demo
          const enhancedProducts = catalogProducts.map((p, index) => ({
            ...p,
            rating: 4 + Math.random(),
            reviews: Math.floor(Math.random() * 200) + 10,
            inStock: Math.random() > 0.1,
            discount: Math.random() > 0.7 ? Math.random() * 0.3 : 0,
            images: p.imageUrl ? { default: p.imageUrl } : undefined,
          }));
          allProducts.push(...enhancedProducts);
        }
      }

      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setIsLoading(false);
    };

    loadAllProducts();
  }, []);

  // Handle filtering
  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...products];

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.sku.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower)
      );
    }

    // Categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.category));
    }

    // Price range
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Features
    if (filters.features.length > 0) {
      filtered = filtered.filter((p) =>
        filters.features.some((f) => p.features?.some((pf) => pf.toLowerCase().includes(f.toLowerCase())))
      );
    }

    // Regions
    if (filters.regions.length > 0) {
      filtered = filtered.filter((p) => {
        const productRegion = (p as unknown as { region?: string }).region;
        return !productRegion || productRegion === 'global' || filters.regions.includes(productRegion);
      });
    }

    // Stock
    if (filters.inStockOnly) {
      filtered = filtered.filter((p) => (p as unknown as { inStock?: boolean }).inStock !== false);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => ((b as unknown as { rating?: number }).rating || 0) - ((a as unknown as { rating?: number }).rating || 0));
        break;
      case 'newest':
        // Keep original order (newest first)
        break;
    }

    setFilteredProducts(filtered);
  };

  // Handle product comparison
  const handleAddToCompare = (product: Product) => {
    if (compareProducts.find((p) => p.id === product.id)) {
      setCompareProducts(compareProducts.filter((p) => p.id !== product.id));
    } else if (compareProducts.length < 4) {
      setCompareProducts([...compareProducts, product]);
      setActiveTab('compare');
    }
  };

  // Extract unique values for filters
  const availableCategories = Array.from(new Set(products.map((p) => p.category)));
  const availableFeatures = Array.from(
    new Set(products.flatMap((p) => p.features || []))
  ).slice(0, 20);
  const availableRegions = Array.from(
    new Set(products.map((p) => (p as unknown as { region?: string }).region).filter(Boolean))
  );
  const priceRange: [number, number] = [
    Math.min(...products.map((p) => p.price), 0),
    Math.max(...products.map((p) => p.price), 5000),
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-medium">Loading Product Catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Product Catalog</h1>
          <p className="text-lg text-muted-foreground">
            Explore our complete range of smart hotel solutions
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="secondary">{products.length} Total Products</Badge>
            <Badge variant="secondary">{filteredProducts.length} Showing</Badge>
            {compareProducts.length > 0 && (
              <Badge className="bg-blue-600">{compareProducts.length} Selected for Comparison</Badge>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="browse" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              Browse
            </TabsTrigger>
            <TabsTrigger value="compare" className="gap-2">
              <GitCompare className="h-4 w-4" />
              Compare ({compareProducts.length})
            </TabsTrigger>
            <TabsTrigger value="calculate" className="gap-2">
              <Calculator className="h-4 w-4" />
              Calculate
            </TabsTrigger>
          </TabsList>

          {/* Browse Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <ProductFilters
              availableCategories={availableCategories}
              availableFeatures={availableFeatures}
              availableRegions={availableRegions}
              priceRange={priceRange}
              onFilterChange={handleFilterChange}
            />

            {/* View Controls */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product as Product & { images?: { [key: string]: string }; rating?: number; reviews?: number; inStock?: boolean; discount?: number }}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                    onCompare={handleAddToCompare}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Compare Tab */}
          <TabsContent value="compare">
            <ProductComparison
              products={compareProducts as (Product & { images?: { [key: string]: string }; rating?: number; reviews?: number; inStock?: boolean })[]}
              onRemoveProduct={(id) => setCompareProducts(compareProducts.filter((p) => p.id !== id))}
              onAddToCart={(product) => console.log('Add to cart:', product)}
              onClearAll={() => setCompareProducts([])}
            />
          </TabsContent>

          {/* Calculate Tab */}
          <TabsContent value="calculate">
            <PriceCalculator
              products={compareProducts.length > 0 ? compareProducts : filteredProducts.slice(0, 5)}
              defaultRoomCount={50}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

