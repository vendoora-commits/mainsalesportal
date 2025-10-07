'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Search, X, Filter, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterOptions {
  search: string;
  categories: string[];
  priceRange: [number, number];
  features: string[];
  regions: string[];
  inStockOnly: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'name' | 'rating' | 'newest';
}

interface ProductFiltersProps {
  availableCategories: string[];
  availableFeatures: string[];
  availableRegions: string[];
  priceRange: [number, number];
  onFilterChange: (filters: FilterOptions) => void;
  activeFilters?: Partial<FilterOptions>;
  className?: string;
}

export function ProductFilters({
  availableCategories,
  availableFeatures,
  availableRegions,
  priceRange,
  onFilterChange,
  activeFilters = {},
  className,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: activeFilters.search || '',
    categories: activeFilters.categories || [],
    priceRange: activeFilters.priceRange || priceRange,
    features: activeFilters.features || [],
    regions: activeFilters.regions || [],
    inStockOnly: activeFilters.inStockOnly || false,
    sortBy: activeFilters.sortBy || 'name',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilter('categories', newCategories);
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature];
    updateFilter('features', newFeatures);
  };

  const toggleRegion = (region: string) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter((r) => r !== region)
      : [...filters.regions, region];
    updateFilter('regions', newRegions);
  };

  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      search: '',
      categories: [],
      priceRange,
      features: [],
      regions: [],
      inStockOnly: false,
      sortBy: 'name',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFilterCount =
    filters.categories.length +
    filters.features.length +
    filters.regions.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.search ? 1 : 0);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-10"
              />
              {filters.search && (
                <button
                  onClick={() => updateFilter('search', '')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 mt-4">
            <Label className="text-sm text-muted-foreground">Sort by:</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'name', label: 'Name' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
                { value: 'rating', label: 'Rating' },
                { value: 'newest', label: 'Newest' },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={filters.sortBy === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateFilter('sortBy', option.value as FilterOptions['sortBy'])}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {isExpanded && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Advanced Filters
                </CardTitle>
                <CardDescription>
                  Narrow down your product selection
                </CardDescription>
              </div>
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Categories */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Categories</Label>
              <div className="grid grid-cols-2 gap-3">
                {availableCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </Label>
              <Slider
                min={priceRange[0]}
                max={priceRange[1]}
                step={10}
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                className="mt-2"
              />
            </div>

            {/* Features */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Features</Label>
              <div className="flex flex-wrap gap-2">
                {availableFeatures.map((feature) => (
                  <Badge
                    key={feature}
                    variant={filters.features.includes(feature) ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => toggleFeature(feature)}
                  >
                    {feature}
                    {filters.features.includes(feature) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Regions */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Regions</Label>
              <div className="flex flex-wrap gap-2">
                {availableRegions.map((region) => (
                  <Badge
                    key={region}
                    variant={filters.regions.includes(region) ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => toggleRegion(region)}
                  >
                    {region.toUpperCase()}
                    {filters.regions.includes(region) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stock Filter */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStockOnly}
                onCheckedChange={(checked) => updateFilter('inStockOnly', checked as boolean)}
              />
              <label
                htmlFor="in-stock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Show in-stock items only
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Summary */}
      {activeFilterCount > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-900">
                Active Filters ({activeFilterCount})
              </p>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto py-1 px-2 text-blue-900">
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <Badge variant="secondary" className="gap-1">
                  Search: {filters.search}
                  <button onClick={() => updateFilter('search', '')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.categories.map((category) => (
                <Badge key={category} variant="secondary" className="gap-1">
                  {category}
                  <button onClick={() => toggleCategory(category)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {filters.features.map((feature) => (
                <Badge key={feature} variant="secondary" className="gap-1">
                  {feature}
                  <button onClick={() => toggleFeature(feature)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {filters.regions.map((region) => (
                <Badge key={region} variant="secondary" className="gap-1">
                  {region.toUpperCase()}
                  <button onClick={() => toggleRegion(region)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {filters.inStockOnly && (
                <Badge variant="secondary" className="gap-1">
                  In Stock Only
                  <button onClick={() => updateFilter('inStockOnly', false)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

