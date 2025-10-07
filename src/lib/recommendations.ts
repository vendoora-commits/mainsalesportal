/**
 * Smart Recommendations Engine
 * AI-powered product recommendations based on property configuration
 */

import type { Product } from './product-catalog';
import type { Region } from './regions';
import type { PropertyType } from '@/types';

export interface RecommendationContext {
  propertyType: PropertyType;
  numberOfRooms: number;
  region: Region;
  budget?: number;
  priorities?: ('cost' | 'features' | 'automation' | 'guest-experience')[];
  existingProducts?: Product[];
}

export interface Recommendation {
  product: Product;
  score: number;
  reasons: string[];
  category: 'essential' | 'recommended' | 'optional' | 'premium';
  alternativeProducts?: Product[];
}

/**
 * Calculate recommendation score for a product
 */
function calculateScore(product: Product, context: RecommendationContext): number {
  let score = 50; // Base score

  // Property type match
  const audience = (product as unknown as { audience?: string[] }).audience;
  if (audience?.includes(context.propertyType)) {
    score += 20;
  }

  // Region compatibility
  if (product.region === context.region || product.region === 'global') {
    score += 10;
  }

  // Budget considerations
  if (context.budget) {
    const roomCost = product.price * context.numberOfRooms;
    if (roomCost <= context.budget) {
      score += 15;
    } else if (roomCost <= context.budget * 1.2) {
      score += 5;
    } else {
      score -= 10;
    }
  }

  // Priority-based scoring
  if (context.priorities) {
    if (context.priorities.includes('cost') && product.price < 200) {
      score += 10;
    }
    if (context.priorities.includes('features') && (product.features?.length || 0) > 3) {
      score += 10;
    }
    if (context.priorities.includes('automation') && product.features?.some((f) => f.includes('auto'))) {
      score += 10;
    }
    if (context.priorities.includes('guest-experience') && product.features?.some((f) => f.includes('mobile') || f.includes('voice'))) {
      score += 10;
    }
  }

  // Cap score at 100
  return Math.min(score, 100);
}

/**
 * Generate reasons for recommendation
 */
function generateReasons(product: Product, context: RecommendationContext): string[] {
  const reasons: string[] = [];

  const audience = (product as unknown as { audience?: string[] }).audience;
  if (audience?.includes(context.propertyType)) {
    reasons.push(`Optimized for ${context.propertyType} properties`);
  }

  if (product.features) {
    if (product.features.includes('mobile')) {
      reasons.push('Mobile-first guest experience');
    }
    if (product.features.includes('energy-monitor')) {
      reasons.push('Energy monitoring for cost savings');
    }
    if (product.features.includes('voice-control')) {
      reasons.push('Voice control compatibility');
    }
    if (product.features.includes('schedule')) {
      reasons.push('Automated scheduling');
    }
  }

  if (context.budget) {
    const roomCost = product.price * context.numberOfRooms;
    if (roomCost <= context.budget * 0.8) {
      reasons.push('Cost-effective solution within budget');
    }
  }

  return reasons;
}

/**
 * Categorize recommendation
 */
function categorizeRecommendation(score: number, product: Product, context: RecommendationContext): Recommendation['category'] {
  // Essential products for property operation
  if (product.category === 'lock' || product.category === 'kiosk') {
    return 'essential';
  }

  // Premium features
  if (score >= 80 && product.price > 300) {
    return 'premium';
  }

  // Recommended based on score
  if (score >= 70) {
    return 'recommended';
  }

  return 'optional';
}

/**
 * Get smart recommendations for a configuration
 */
export async function getSmartRecommendations(context: RecommendationContext): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = [];

  // Load catalogs based on property type
  const catalogPaths = getCatalogPaths(context.propertyType, context.region);

  for (const path of catalogPaths) {
    try {
      const response = await fetch(path);
      if (!response.ok) continue;

      const catalog = await response.json();
      const products = extractProducts(catalog);

      for (const product of products) {
        const score = calculateScore(product, context);
        const reasons = generateReasons(product, context);
        const category = categorizeRecommendation(score, product, context);

        recommendations.push({
          product,
          score,
          reasons,
          category,
        });
      }
    } catch (error) {
      console.error(`Error loading catalog ${path}:`, error);
    }
  }

  // Sort by score (descending)
  recommendations.sort((a, b) => b.score - a.score);

  // Find alternative products for top recommendations
  for (const rec of recommendations.slice(0, 10)) {
    rec.alternativeProducts = recommendations
      .filter((r) => r.product.category === rec.product.category && r.product.id !== rec.product.id)
      .slice(0, 3)
      .map((r) => r.product);
  }

  return recommendations;
}

/**
 * Get catalog paths based on property type and region
 */
function getCatalogPaths(propertyType: PropertyType, region: Region): string[] {
  const paths: string[] = [];

  // Kiosks (for hotels/resorts/casinos/motels)
  if (['hotel', 'resort', 'casino', 'motel'].includes(propertyType)) {
    paths.push('/data/estar-kiosks.json');
  }

  // Locks (all property types)
  paths.push('/data/locks-trinity-taj.json');

  // Switches (region-specific)
  if (region === 'us') {
    paths.push('/data/hidintech-switches-us.json');
  } else if (region === 'eu') {
    paths.push('/data/hidintech-switches-eu.json');
  }

  // Blinds (all regions)
  paths.push('/data/poyal-blinds.json');

  return paths;
}

/**
 * Extract products from catalog
 */
function extractProducts(catalog: unknown): Product[] {
  const products: Product[] = [];
  const cat = catalog as {
    categories?: Array<{ products: Product[] }>;
    models?: Product[];
    families?: Array<{ id: string; name: string; price?: number; features?: string[]; audience?: string[] }>;
  };

  if (cat.categories) {
    cat.categories.forEach((category) => {
      products.push(...category.products);
    });
  }

  if (cat.models) {
    products.push(...cat.models);
  }

  if (cat.families) {
    cat.families.forEach((family) => {
      products.push({
        id: family.id,
        sku: family.id,
        name: family.name,
        category: 'lock',
        price: family.price || 0,
        features: family.features || [],
      } as Product);
    });
  }

  return products;
}

/**
 * Get compatibility warnings
 */
export function getCompatibilityWarnings(products: Product[]): string[] {
  const warnings: string[] = [];

  const kiosks = products.filter((p) => p.category === 'kiosk');
  const locks = products.filter((p) => p.category === 'lock');

  // Check kiosk-lock compatibility
  if (kiosks.length > 0 && locks.length > 0) {
    for (const kiosk of kiosks) {
      const compatibleLocks = (kiosk.compatibility?.locks as string[]) || [];
      const hasCompatible = locks.some((lock) => compatibleLocks.includes(lock.id));

      if (!hasCompatible) {
        warnings.push(`${kiosk.name} may not be fully compatible with selected locks`);
      }
    }
  }

  // Check for missing essential products
  if (locks.length === 0) {
    warnings.push('No smart lock selected - essential for property security');
  }

  return warnings;
}

/**
 * Calculate total system cost
 */
export function calculateSystemCost(products: Product[], numberOfRooms: number): {
  subtotal: number;
  perRoom: number;
  discount: number;
  total: number;
} {
  const subtotal = products.reduce((sum, p) => sum + p.price * numberOfRooms, 0);
  const perRoom = subtotal / numberOfRooms;

  // Volume discount
  let discountRate = 0;
  if (numberOfRooms >= 100) discountRate = 0.15;
  else if (numberOfRooms >= 50) discountRate = 0.1;
  else if (numberOfRooms >= 20) discountRate = 0.05;

  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  return { subtotal, perRoom, discount, total };
}

