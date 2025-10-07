'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Check, Minus, Star, Info, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/product-catalog';

interface ProductComparisonProps {
  products: (Product & {
    images?: { [key: string]: string };
    rating?: number;
    reviews?: number;
    inStock?: boolean;
  })[];
  onRemoveProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onClearAll: () => void;
}

export function ProductComparison({
  products,
  onRemoveProduct,
  onAddToCart,
  onClearAll,
}: ProductComparisonProps) {
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  if (products.length === 0) {
    return (
      <Card className="bg-gray-50">
        <CardContent className="py-12 text-center">
          <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Products Selected</h3>
          <p className="text-muted-foreground">
            Select products to compare their features side-by-side
          </p>
        </CardContent>
      </Card>
    );
  }

  // Extract all unique features across products
  const allFeatures = Array.from(
    new Set(products.flatMap((p) => p.features || []))
  ).sort();

  // Get feature values for comparison
  const getFeatureValue = (product: Product, feature: string): boolean => {
    return product.features?.includes(feature) || false;
  };

  // Check if a feature has different values across products
  const isDifferentFeature = (feature: string): boolean => {
    const values = products.map((p) => getFeatureValue(p, feature));
    return new Set(values).size > 1;
  };

  // Find the best value for a property
  const getBestProduct = (property: 'price' | 'rating'): string | null => {
    if (products.length === 0) return null;
    
    if (property === 'price') {
      const minPrice = Math.min(...products.map((p) => p.price));
      return products.find((p) => p.price === minPrice)?.id || null;
    }
    
    if (property === 'rating') {
      const maxRating = Math.max(...products.map((p) => p.rating || 0));
      return products.find((p) => (p.rating || 0) === maxRating)?.id || null;
    }
    
    return null;
  };

  const bestPriceId = getBestProduct('price');
  const bestRatingId = getBestProduct('rating');

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Compare Products ({products.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHighlightDifferences(!highlightDifferences)}
              >
                {highlightDifferences ? 'Show All' : 'Highlight Differences'}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClearAll}>
                Clear All
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${products.length}, minmax(300px, 1fr))` }}>
            {/* Product Cards */}
            {products.map((product) => (
              <Card key={product.id} className="relative">
                <button
                  onClick={() => onRemoveProduct(product.id)}
                  className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white hover:bg-gray-100 shadow-md"
                >
                  <X className="h-4 w-4" />
                </button>

                <CardContent className="p-6 space-y-4">
                  {/* Image */}
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={product.images?.['white'] || product.imageUrl || '/vendoora-assets/images_4k/placeholder.png'}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Name & Category */}
                  <div>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>

                  {/* SKU */}
                  <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>

                  {/* Rating */}
                  {product.rating && (
                    <div className={cn(
                      'flex items-center gap-2 p-2 rounded-md',
                      bestRatingId === product.id && 'bg-green-50 border border-green-200'
                    )}>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-4 w-4',
                              i < Math.floor(product.rating || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-sm">({product.reviews || 0})</span>
                      {bestRatingId === product.id && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          Highest Rated
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className={cn(
                    'p-3 rounded-md',
                    bestPriceId === product.id && 'bg-green-50 border border-green-200'
                  )}>
                    <p className="text-2xl font-bold">
                      ${product.price.toLocaleString()}
                    </p>
                    {bestPriceId === product.id && (
                      <Badge variant="secondary" className="mt-1 text-xs">
                        Best Price
                      </Badge>
                    )}
                  </div>

                  {/* Stock Status */}
                  {product.inStock !== undefined && (
                    <div className={cn(
                      'flex items-center gap-2 p-2 rounded-md text-sm',
                      product.inStock
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                    )}>
                      {product.inStock ? (
                        <>
                          <Check className="h-4 w-4" />
                          In Stock
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4" />
                          Out of Stock
                        </>
                      )}
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Features:</h4>
                    <div className="space-y-1">
                      {allFeatures.map((feature) => {
                        const hasFeature = getFeatureValue(product, feature);
                        const isDifferent = isDifferentFeature(feature);
                        const shouldShow = !highlightDifferences || isDifferent;

                        if (!shouldShow) return null;

                        return (
                          <div
                            key={feature}
                            className={cn(
                              'flex items-start gap-2 text-sm p-1 rounded',
                              highlightDifferences && isDifferent && 'bg-yellow-50'
                            )}
                          >
                            {hasFeature ? (
                              <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Minus className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={cn(
                              hasFeature ? 'text-foreground' : 'text-muted-foreground'
                            )}>
                              {feature}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    className="w-full"
                    onClick={() => onAddToCart(product)}
                    disabled={product.inStock === false}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Configuration
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-semibold mb-3">Comparison Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Products</p>
              <p className="font-semibold">{products.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Price Range</p>
              <p className="font-semibold">
                ${Math.min(...products.map((p) => p.price))} - ${Math.max(...products.map((p) => p.price))}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Categories</p>
              <p className="font-semibold">
                {new Set(products.map((p) => p.category)).size}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Features</p>
              <p className="font-semibold">{allFeatures.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

