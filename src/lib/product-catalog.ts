/**
 * Product Catalog Management
 * Handles loading, filtering, and querying product catalogs
 */

import type { Region } from './regions';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  imageUrl?: string;
  features?: string[];
  compatibility?: {
    [key: string]: string[] | string;
  };
  region?: Region | 'global';
  certifications?: string[];
  voltage?: string;
  frequency?: string;
}

export interface Catalog {
  source: string;
  region: Region | 'global';
  categories?: Array<{
    id: string;
    name: string;
    description?: string;
    products: Product[];
  }>;
  models?: Product[];
  families?: Array<{
    id: string;
    name: string;
    products?: Product[];
    [key: string]: unknown;
  }>;
}

/**
 * Load a catalog from JSON file
 */
export async function loadCatalog(catalogPath: string): Promise<Catalog | null> {
  try {
    const response = await fetch(catalogPath);
    if (!response.ok) {
      console.error(`Failed to load catalog: ${catalogPath}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading catalog ${catalogPath}:`, error);
    return null;
  }
}

/**
 * Get all products from a catalog
 */
export function getAllProducts(catalog: Catalog): Product[] {
  const products: Product[] = [];

  // Check categories
  if (catalog.categories) {
    catalog.categories.forEach((category) => {
      products.push(...category.products);
    });
  }

  // Check models (for kiosks)
  if (catalog.models) {
    products.push(...catalog.models);
  }

  // Check families (for locks)
  if (catalog.families) {
    catalog.families.forEach((family) => {
      if (family.products) {
        products.push(...family.products);
      } else {
        // Convert family to product if it doesn't have sub-products
        products.push({
          id: family.id,
          sku: family.id,
          name: family.name,
          category: 'lock',
          price: (family as unknown as { price: number }).price || 0,
          features: (family as unknown as { features: string[] }).features || [],
        });
      }
    });
  }

  return products;
}

/**
 * Filter products by property type
 */
export function filterByPropertyType(products: Product[], propertyType: string): Product[] {
  return products.filter((product) => {
    const audience = (product as unknown as { audience?: string[] }).audience;
    if (!audience) return true; // Include products without audience restriction
    return audience.includes(propertyType.toLowerCase());
  });
}

/**
 * Filter products by features
 */
export function filterByFeatures(products: Product[], requiredFeatures: string[]): Product[] {
  return products.filter((product) => {
    if (!product.features || requiredFeatures.length === 0) return true;
    return requiredFeatures.every((feature) =>
      product.features?.some((pf) => pf.toLowerCase().includes(feature.toLowerCase()))
    );
  });
}

/**
 * Filter products by region
 */
export function filterByRegion(products: Product[], region: Region): Product[] {
  return products.filter((product) => {
    if (!product.region) return true; // Include products without region restriction
    return product.region === region || product.region === 'global';
  });
}

/**
 * Get product recommendations based on configuration
 */
export function getRecommendations(
  catalog: Catalog,
  config: {
    propertyType?: string;
    features?: string[];
    region?: Region;
    budget?: number;
  }
): Product[] {
  let products = getAllProducts(catalog);

  // Apply filters
  if (config.propertyType) {
    products = filterByPropertyType(products, config.propertyType);
  }

  if (config.features) {
    products = filterByFeatures(products, config.features);
  }

  if (config.region) {
    products = filterByRegion(products, config.region);
  }

  if (config.budget) {
    products = products.filter((p) => p.price <= config.budget);
  }

  // Sort by relevance (price descending for premium recommendations)
  return products.sort((a, b) => b.price - a.price);
}

/**
 * Check product compatibility with other products
 */
export function checkCompatibility(
  product: Product,
  otherProducts: Product[]
): { compatible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  let compatible = true;

  // Check if product has compatibility requirements
  if (!product.compatibility) {
    return { compatible: true, reasons: [] };
  }

  // For locks, check kiosk compatibility
  if (product.category === 'lock' && product.compatibility.kiosks) {
    const compatibleKiosks = product.compatibility.kiosks as string[];
    const selectedKiosks = otherProducts.filter((p) => p.category === 'kiosk');

    if (selectedKiosks.length > 0) {
      const hasCompatibleKiosk = selectedKiosks.some((k) => compatibleKiosks.includes(k.id));
      if (!hasCompatibleKiosk) {
        compatible = false;
        reasons.push('No compatible kiosk selected');
      }
    }
  }

  // For kiosks, check lock compatibility
  if (product.category === 'kiosk' && product.compatibility.locks) {
    const compatibleLocks = product.compatibility.locks as string[];
    const selectedLocks = otherProducts.filter((p) => p.category === 'lock');

    if (selectedLocks.length > 0) {
      const hasCompatibleLock = selectedLocks.some((l) => compatibleLocks.includes(l.id));
      if (!hasCompatibleLock) {
        compatible = false;
        reasons.push('No compatible lock selected');
      }
    }
  }

  return { compatible, reasons };
}

/**
 * Calculate bundle discount
 */
export function calculateBundleDiscount(products: Product[]): number {
  const total = products.reduce((sum, p) => sum + p.price, 0);

  // Tiered discount based on total
  if (total >= 10000) return 0.15; // 15% off
  if (total >= 5000) return 0.1; // 10% off
  if (total >= 2000) return 0.05; // 5% off

  return 0;
}

