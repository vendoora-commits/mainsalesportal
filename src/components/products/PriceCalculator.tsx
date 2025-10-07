'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingDown, Package, DollarSign, Percent } from 'lucide-react';
import { calculateSystemCost } from '@/lib/recommendations';
import type { Product } from '@/lib/product-catalog';

interface PriceCalculatorProps {
  products: Product[];
  defaultRoomCount?: number;
}

export function PriceCalculator({ products, defaultRoomCount = 1 }: PriceCalculatorProps) {
  const [roomCount, setRoomCount] = useState(defaultRoomCount);
  const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({});

  // Initialize with one of each product
  useEffect(() => {
    const initial: Record<string, number> = {};
    products.forEach((product) => {
      initial[product.id] = 1;
    });
    setSelectedProducts(initial);
  }, [products]);

  const updateQuantity = (productId: string, quantity: number) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: Math.max(0, quantity),
    }));
  };

  // Calculate costs
  const productsWithQuantities = products.map((product) => ({
    ...product,
    quantity: selectedProducts[product.id] || 0,
  }));

  const activeProducts = productsWithQuantities.filter((p) => p.quantity > 0);

  const subtotal = activeProducts.reduce((sum, p) => sum + p.price * p.quantity * roomCount, 0);

  // Volume discount tiers
  let discountRate = 0;
  if (roomCount >= 100) discountRate = 0.15;
  else if (roomCount >= 50) discountRate = 0.1;
  else if (roomCount >= 20) discountRate = 0.05;

  const discount = subtotal * discountRate;
  const total = subtotal - discount;
  const perRoom = roomCount > 0 ? total / roomCount : 0;

  // Savings calculation
  const savingsPerRoom = roomCount > 0 ? discount / roomCount : 0;

  return (
    <div className="space-y-4">
      {/* Room Count Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Price Calculator
          </CardTitle>
          <CardDescription>
            Calculate total cost for your property
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="room-count">Number of Rooms / Units</Label>
            <Input
              id="room-count"
              type="number"
              min="1"
              max="1000"
              value={roomCount}
              onChange={(e) => setRoomCount(parseInt(e.target.value) || 1)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Volume discounts: 20+ rooms (5%), 50+ rooms (10%), 100+ rooms (15%)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Product Quantities */}
      <Card>
        <CardHeader>
          <CardTitle>Products per Room</CardTitle>
          <CardDescription>
            Adjust quantities for each product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  ${product.price.toLocaleString()} each
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(product.id, (selectedProducts[product.id] || 0) - 1)}
                  disabled={(selectedProducts[product.id] || 0) <= 0}
                >
                  -
                </Button>
                <Input
                  type="number"
                  min="0"
                  value={selectedProducts[product.id] || 0}
                  onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 0)}
                  className="w-16 text-center"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(product.id, (selectedProducts[product.id] || 0) + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle>Cost Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Items */}
          <div className="space-y-2">
            {activeProducts.map((product) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {product.name} × {product.quantity} × {roomCount} rooms
                </span>
                <span className="font-medium">
                  ${(product.price * product.quantity * roomCount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 space-y-2">
            {/* Subtotal */}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toLocaleString()}</span>
            </div>

            {/* Discount */}
            {discountRate > 0 && (
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1">
                  <TrendingDown className="h-4 w-4" />
                  Volume Discount ({Math.round(discountRate * 100)}%)
                </span>
                <span className="font-medium">
                  -${discount.toLocaleString()}
                </span>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">${total.toLocaleString()}</span>
            </div>

            {/* Per Room */}
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Per Room</span>
              <span>${perRoom.toFixed(2)}</span>
            </div>
          </div>

          {/* Savings Badge */}
          {discountRate > 0 && (
            <div className="bg-green-100 border border-green-200 rounded-lg p-3 flex items-center gap-2">
              <Percent className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="font-semibold text-green-900">
                  You&apos;re saving ${discount.toLocaleString()}!
                </p>
                <p className="text-sm text-green-700">
                  ${savingsPerRoom.toFixed(2)} per room with volume discount
                </p>
              </div>
            </div>
          )}

          {/* Next Discount Tier */}
          {roomCount < 100 && (
            <div className="bg-blue-100 border border-blue-200 rounded-lg p-3 text-sm">
              <p className="font-medium text-blue-900 mb-1">
                💡 Save more with volume!
              </p>
              <p className="text-blue-700">
                {roomCount < 20 && `Add ${20 - roomCount} more rooms to get 5% off`}
                {roomCount >= 20 && roomCount < 50 && `Add ${50 - roomCount} more rooms to get 10% off`}
                {roomCount >= 50 && roomCount < 100 && `Add ${100 - roomCount} more rooms to get 15% off`}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" size="lg">
              <Package className="h-4 w-4 mr-2" />
              Add to Configuration
            </Button>
            <Button variant="outline" size="lg">
              <DollarSign className="h-4 w-4 mr-2" />
              Get Quote
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{activeProducts.length}</p>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{roomCount}</p>
              <p className="text-sm text-muted-foreground">Rooms</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {Math.round(discountRate * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Discount</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                ${perRoom.toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground">Per Room</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

