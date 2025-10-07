/**
 * Pre-built Configuration Templates
 * Ready-to-use property configurations for different scenarios
 */

import type { PropertyType } from '@/types';

export interface ConfigurationTemplate {
  id: string;
  name: string;
  description: string;
  propertyType: PropertyType;
  recommendedFor: string[];
  roomRange: [number, number];
  estimatedBudget: [number, number];
  products: {
    id: string;
    category: string;
    quantity: number;
    priority: 'essential' | 'recommended' | 'optional';
  }[];
  features: string[];
  benefits: string[];
  icon: string;
}

export const CONFIGURATION_TEMPLATES: ConfigurationTemplate[] = [
  {
    id: 'boutique-hotel-starter',
    name: 'Boutique Hotel Starter',
    description: 'Perfect for small luxury hotels with 10-30 rooms',
    propertyType: 'hotel',
    recommendedFor: ['Boutique hotels', 'Luxury B&Bs', 'Small resorts'],
    roomRange: [10, 30],
    estimatedBudget: [15000, 40000],
    products: [
      { id: 'TAJ-KL-series', category: 'lock', quantity: 1, priority: 'essential' },
      { id: 'kiosk-desktop-19', category: 'kiosk', quantity: 1, priority: 'essential' },
      { id: 'hs-us-2g-w', category: 'switch', quantity: 2, priority: 'recommended' },
      { id: 'hm-us-pir', category: 'sensor', quantity: 1, priority: 'recommended' },
      { id: 'pb-int-roller-w', category: 'blinds', quantity: 1, priority: 'optional' },
    ],
    features: [
      'Smart locks with mobile access',
      'Self-check-in kiosk',
      'Smart lighting control',
      'Motion sensors for energy savings',
      'Automated blinds',
    ],
    benefits: [
      'Contactless check-in',
      'Reduce front desk workload',
      '30% energy savings',
      'Premium guest experience',
    ],
    icon: '🏨',
  },
  {
    id: 'full-service-hotel',
    name: 'Full-Service Hotel',
    description: 'Complete solution for mid-size hotels with 50-150 rooms',
    propertyType: 'hotel',
    recommendedFor: ['Mid-size hotels', 'Business hotels', 'Conference centers'],
    roomRange: [50, 150],
    estimatedBudget: [75000, 250000],
    products: [
      { id: 'TAJ-L-series', category: 'lock', quantity: 1, priority: 'essential' },
      { id: 'kiosk-stand-32', category: 'kiosk', quantity: 2, priority: 'essential' },
      { id: 'hs-us-3g-w', category: 'switch', quantity: 3, priority: 'essential' },
      { id: 'hm-us-pir', category: 'sensor', quantity: 2, priority: 'recommended' },
      { id: 'pb-int-roller-w', category: 'blinds', quantity: 2, priority: 'recommended' },
      { id: 'hd-us-1g-w', category: 'dimmer', quantity: 1, priority: 'optional' },
    ],
    features: [
      'Enterprise-grade smart locks',
      'Multiple self-check-in kiosks',
      'Complete room automation',
      'Advanced energy management',
      'Automated window treatments',
    ],
    benefits: [
      'Process 3x more check-ins',
      '40% energy cost reduction',
      'Enhanced guest satisfaction',
      'Reduced operational costs',
      '15% volume discount',
    ],
    icon: '🏢',
  },
  {
    id: 'luxury-resort',
    name: 'Luxury Resort Package',
    description: 'Premium experience for high-end resorts with 100+ rooms',
    propertyType: 'resort',
    recommendedFor: ['Luxury resorts', '5-star hotels', 'Premium destinations'],
    roomRange: [100, 500],
    estimatedBudget: [200000, 1000000],
    products: [
      { id: 'TAJ-KL-series', category: 'lock', quantity: 1, priority: 'essential' },
      { id: 'kiosk-stand-32', category: 'kiosk', quantity: 4, priority: 'essential' },
      { id: 'hs-us-3g-w', category: 'switch', quantity: 4, priority: 'essential' },
      { id: 'hd-us-1g-w', category: 'dimmer', quantity: 2, priority: 'essential' },
      { id: 'hm-us-pir', category: 'sensor', quantity: 3, priority: 'essential' },
      { id: 'pb-int-roller-w', category: 'blinds', quantity: 2, priority: 'essential' },
      { id: 'pb-ext-roller-w', category: 'blinds', quantity: 1, priority: 'recommended' },
    ],
    features: [
      'Facial recognition smart locks',
      'Multiple premium kiosks',
      'Full room automation suite',
      'Motorized interior blinds',
      'Weather-resistant exterior shades',
      'Smart scene control',
      'Energy optimization system',
    ],
    benefits: [
      'White-glove check-in experience',
      'Personalized room controls',
      'Maximum energy efficiency',
      'Premium brand positioning',
      '15% volume discount',
    ],
    icon: '🌴',
  },
  {
    id: 'airbnb-starter',
    name: 'Airbnb Starter Pack',
    description: 'Essential smart features for 1-5 properties',
    propertyType: 'airbnb',
    recommendedFor: ['Airbnb hosts', 'Vacation rentals', 'Short-term rentals'],
    roomRange: [1, 5],
    estimatedBudget: [2000, 10000],
    products: [
      { id: 'TAJ-S-series', category: 'lock', quantity: 1, priority: 'essential' },
      { id: 'hs-us-2g-w', category: 'switch', quantity: 1, priority: 'recommended' },
      { id: 'hm-us-pir', category: 'sensor', quantity: 1, priority: 'optional' },
    ],
    features: [
      'Mobile-first smart locks',
      'Temporary guest codes',
      'Remote access control',
      'Basic smart lighting',
      'Occupancy detection',
    ],
    benefits: [
      'Keyless check-in',
      'Remote property management',
      'Enhanced security',
      'Guest convenience',
      'Easy installation',
    ],
    icon: '🏡',
  },
  {
    id: 'vrbo-professional',
    name: 'VRBO Professional',
    description: 'Complete smart home for 5-20 vacation rental properties',
    propertyType: 'vrbo',
    recommendedFor: ['VRBO hosts', 'Property managers', 'Vacation rental businesses'],
    roomRange: [5, 20],
    estimatedBudget: [15000, 60000],
    products: [
      { id: 'TAJ-S-series', category: 'lock', quantity: 1, priority: 'essential' },
      { id: 'hs-us-3g-w', category: 'switch', quantity: 2, priority: 'essential' },
      { id: 'hm-us-pir', category: 'sensor', quantity: 2, priority: 'recommended' },
      { id: 'pb-int-roller-w', category: 'blinds', quantity: 1, priority: 'recommended' },
      { id: 'pb-curtain-motor', category: 'blinds', quantity: 1, priority: 'optional' },
    ],
    features: [
      'Smart lock system with guest codes',
      'Multi-room smart lighting',
      'Automated energy management',
      'Smart blinds and curtains',
      'Remote monitoring',
    ],
    benefits: [
      'Manage multiple properties',
      'Automated guest access',
      '35% energy savings',
      'Premium guest reviews',
      '10% volume discount',
    ],
    icon: '🏘️',
  },
  {
    id: 'timeshare-complex',
    name: 'Timeshare Complex',
    description: 'Scalable solution for timeshare resorts with 50-200 units',
    propertyType: 'timeshare',
    recommendedFor: ['Timeshare resorts', 'Fractional ownership', 'Vacation clubs'],
    roomRange: [50, 200],
    estimatedBudget: [100000, 400000],
    products: [
      { id: 'TAJ-KL-series', category: 'lock', quantity: 1, priority: 'essential' },
      { id: 'kiosk-wall-21', category: 'kiosk', quantity: 3, priority: 'essential' },
      { id: 'hs-us-3g-w', category: 'switch', quantity: 3, priority: 'essential' },
      { id: 'hm-us-pir', category: 'sensor', quantity: 2, priority: 'essential' },
      { id: 'pb-int-roller-w', category: 'blinds', quantity: 2, priority: 'recommended' },
    ],
    features: [
      'Multi-user access management',
      'Wall-mounted check-in kiosks',
      'Complete room automation',
      'Energy optimization',
      'Owner portal integration',
    ],
    benefits: [
      'Streamlined owner access',
      'Reduced maintenance costs',
      'Enhanced property value',
      'Professional management',
      '15% volume discount',
    ],
    icon: '🏖️',
  },
  {
    id: 'casino-hotel',
    name: 'Casino Hotel',
    description: 'High-security solution for gaming properties with 200+ rooms',
    propertyType: 'casino',
    recommendedFor: ['Casino resorts', 'Gaming properties', 'Entertainment venues'],
    roomRange: [200, 1000],
    estimatedBudget: [300000, 1500000],
    products: [
      { id: 'TAJ-L-series', category: 'lock', quantity: 1, priority: 'essential' },
      { id: 'kiosk-stand-32', category: 'kiosk', quantity: 6, priority: 'essential' },
      { id: 'hs-us-3g-w', category: 'switch', quantity: 4, priority: 'essential' },
      { id: 'hd-us-1g-w', category: 'dimmer', quantity: 2, priority: 'essential' },
      { id: 'hm-us-pir', category: 'sensor', quantity: 3, priority: 'essential' },
      { id: 'pb-int-roller-w', category: 'blinds', quantity: 2, priority: 'recommended' },
    ],
    features: [
      'High-security smart locks',
      'Multiple lobby kiosks',
      'Advanced audit logging',
      'Complete room automation',
      'Integration with player tracking',
    ],
    benefits: [
      'Enhanced security',
      'Fast guest throughput',
      'Operational efficiency',
      'Comp room management',
      '15% volume discount',
    ],
    icon: '🎰',
  },
  {
    id: 'budget-motel',
    name: 'Budget Motel',
    description: 'Cost-effective solution for economy properties with 20-60 rooms',
    propertyType: 'motel',
    recommendedFor: ['Budget motels', 'Economy hotels', 'Highway lodging'],
    roomRange: [20, 60],
    estimatedBudget: [10000, 35000],
    products: [
      { id: 'TAJ-L-series', category: 'lock', quantity: 1, priority: 'essential' },
      { id: 'kiosk-desktop-19', category: 'kiosk', quantity: 1, priority: 'recommended' },
      { id: 'hs-us-1g-w', category: 'switch', quantity: 1, priority: 'recommended' },
      { id: 'hm-us-pir', category: 'sensor', quantity: 1, priority: 'optional' },
    ],
    features: [
      'Reliable smart locks',
      'Basic self-check-in',
      'Simple lighting control',
      'Energy savings features',
    ],
    benefits: [
      'Affordable modernization',
      'Reduced labor costs',
      '25% energy savings',
      'Competitive advantage',
      '5-10% volume discount',
    ],
    icon: '🛏️',
  },
];

/**
 * Get templates by property type
 */
export function getTemplatesByPropertyType(propertyType: PropertyType): ConfigurationTemplate[] {
  return CONFIGURATION_TEMPLATES.filter((t) => t.propertyType === propertyType);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): ConfigurationTemplate | undefined {
  return CONFIGURATION_TEMPLATES.find((t) => t.id === id);
}

/**
 * Get recommended template based on criteria
 */
export function getRecommendedTemplate(
  propertyType: PropertyType,
  roomCount: number,
  budget?: number
): ConfigurationTemplate | undefined {
  const templates = getTemplatesByPropertyType(propertyType);
  
  return templates.find((t) => {
    const roomMatch = roomCount >= t.roomRange[0] && roomCount <= t.roomRange[1];
    const budgetMatch = !budget || (budget >= t.estimatedBudget[0] && budget <= t.estimatedBudget[1]);
    return roomMatch && budgetMatch;
  });
}

