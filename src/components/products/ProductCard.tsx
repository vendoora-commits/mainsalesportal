'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Info, Check, Star, Zap } from 'lucide-react';
import { useConfigurationStore } from '@/store/useConfigurationStore';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/product-catalog';

interface ProductCardProps {
  product: Product & {
    images?: { [key: string]: string };
    finishes?: string[];
    rating?: number;
    reviews?: number;
    inStock?: boolean;
    discount?: number;
  };
  variant?: 'default' | 'compact' | 'featured';
  onCompare?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({
  product,
  variant = 'default',
  onCompare,
  onQuickView,
}: ProductCardProps) {
  const [selectedFinish, setSelectedFinish] = useState(product.finishes?.[0] || 'default');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToConfiguration } = useConfigurationStore();

  const currentImage = product.images?.[selectedFinish] || product.imageUrl || '/vendoora-assets/images_4k/placeholder.png';
  const hasDiscount = (product.discount || 0) > 0;
  const discountedPrice = hasDiscount ? product.price * (1 - (product.discount || 0)) : product.price;

  const handleAddToCart = () => {
    addToConfiguration({
      products: [product],
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (variant === 'compact') {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 flex-shrink-0">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-contain rounded-md"
              />
              {hasDiscount && (
                <Badge className="absolute -top-2 -right-2 bg-red-500">
                  -{Math.round((product.discount || 0) * 100)}%
                </Badge>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{product.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{product.sku}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-lg">
                  ${discountedPrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <Button size="sm" className="mt-2 w-full" onClick={handleAddToCart}>
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300',
        isHovered && 'shadow-xl scale-[1.02]',
        variant === 'featured' && 'border-2 border-primary'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {variant === 'featured' && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Star className="h-3 w-3 mr-1" />
            Recommended
          </Badge>
        </div>
      )}

      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-red-500 text-white">
            <Zap className="h-3 w-3 mr-1" />
            -{Math.round((product.discount || 0) * 100)}%
          </Badge>
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className={cn(
          'absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          'hover:bg-white hover:scale-110 transition-transform',
          isFavorite && 'opacity-100'
        )}
      >
        <Heart
          className={cn(
            'h-5 w-5 transition-colors',
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
          )}
        />
      </button>

      <CardHeader className="pb-4">
        {/* Product Image with Finish Swap */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50 mb-4">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Stock Status */}
          {product.inStock !== undefined && (
            <div className={cn(
              'absolute bottom-2 left-2 px-2 py-1 rounded-md text-xs font-medium',
              product.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            )}>
              {product.inStock ? (
                <>
                  <Check className="h-3 w-3 inline mr-1" />
                  In Stock
                </>
              ) : (
                'Out of Stock'
              )}
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className={cn(
            'absolute inset-0 bg-black/60 flex items-center justify-center gap-2',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          )}>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onQuickView?.(product)}
            >
              <Info className="h-4 w-4 mr-1" />
              Quick View
            </Button>
            {onCompare && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onCompare(product)}
              >
                Compare
              </Button>
            )}
          </div>
        </div>

        {/* Finish Selector */}
        {product.finishes && product.finishes.length > 1 && (
          <div className="flex gap-2 mb-2">
            {product.finishes.map((finish) => (
              <button
                key={finish}
                onClick={() => setSelectedFinish(finish)}
                className={cn(
                  'w-8 h-8 rounded-full border-2 transition-all',
                  selectedFinish === finish
                    ? 'border-primary scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                )}
                style={{
                  backgroundColor: finish === 'white' ? '#ffffff' : finish === 'black' ? '#000000' : finish === 'silver' ? '#c0c0c0' : finish === 'gold' ? '#ffd700' : '#cccccc',
                }}
                title={finish.charAt(0).toUpperCase() + finish.slice(1)}
              />
            ))}
          </div>
        )}

        <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description || product.sku}
        </CardDescription>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mt-2">
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
            <span className="text-sm text-muted-foreground">
              ({product.reviews || 0})
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="space-y-1 mb-4">
            {product.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
            {product.features.length > 3 && (
              <p className="text-xs text-muted-foreground ml-6">
                +{product.features.length - 3} more features
              </p>
            )}
          </div>
        )}

        {/* Category Badge */}
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        {/* Price */}
        <div className="flex items-baseline gap-2 w-full">
          <span className="text-2xl font-bold">
            ${discountedPrice.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price.toLocaleString()}
            </span>
          )}
          <span className="text-sm text-muted-foreground ml-auto">
            per unit
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1"
            onClick={handleAddToCart}
            disabled={product.inStock === false}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Configuration
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

