'use client';

import { KioskOption } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/utils';

interface KioskCatalogProps {
  selectedKiosks: KioskOption[];
  onKioskSelect: (kiosk: KioskOption) => void;
}

// Sample kiosk data - in a real app, this would come from an API
const kioskOptions: KioskOption[] = [
  {
    id: 'kiosk-basic',
    name: 'Basic Check-in Kiosk',
    description: 'Essential self-service check-in and check-out functionality',
    price: 2500,
    features: [
      'Touch screen interface',
      'ID/Passport scanning',
      'Key card dispensing',
      'Basic payment processing',
      'Multi-language support (5 languages)',
      'Basic reporting'
    ],
    specifications: {
      screenSize: '15.6"',
      processor: 'Intel Core i3',
      memory: '8GB RAM',
      storage: '256GB SSD',
      connectivity: 'WiFi, Ethernet',
      dimensions: '18" x 12" x 6"',
      weight: '15 lbs'
    },
    image: '/images/kiosk-basic.jpg',
    category: 'self_check_in'
  },
  {
    id: 'kiosk-premium',
    name: 'Premium Hospitality Kiosk',
    description: 'Advanced kiosk with full guest services and premium features',
    price: 4500,
    features: [
      'Large 21.5" touch screen',
      'Advanced ID/Passport scanning',
      'Key card and mobile key dispensing',
      'Full payment processing',
      'Multi-language support (20+ languages)',
      'Advanced analytics and reporting',
      'Voice assistance',
      'Facial recognition',
      'Document printing'
    ],
    specifications: {
      screenSize: '21.5"',
      processor: 'Intel Core i5',
      memory: '16GB RAM',
      storage: '512GB SSD',
      connectivity: 'WiFi, Ethernet, Bluetooth',
      dimensions: '24" x 16" x 8"',
      weight: '25 lbs'
    },
    image: '/images/kiosk-premium.jpg',
    category: 'self_check_in'
  },
  {
    id: 'kiosk-passport',
    name: 'Passport Scanner Kiosk',
    description: 'Specialized kiosk for international guest verification',
    price: 3200,
    features: [
      'High-resolution passport scanning',
      'OCR text extraction',
      'Document verification',
      'Multi-format support (passport, ID, visa)',
      'Security compliance',
      'Integration with hotel systems',
      'Audit trail logging'
    ],
    specifications: {
      screenSize: '17"',
      processor: 'Intel Core i5',
      memory: '12GB RAM',
      storage: '256GB SSD',
      connectivity: 'WiFi, Ethernet, USB',
      dimensions: '20" x 14" x 7"',
      weight: '20 lbs'
    },
    image: '/images/kiosk-passport.jpg',
    category: 'passport_scanner'
  },
  {
    id: 'kiosk-payment',
    name: 'Payment Terminal Kiosk',
    description: 'Secure payment processing with multiple payment methods',
    price: 2800,
    features: [
      'Credit/debit card processing',
      'Contactless payments (NFC)',
      'Mobile payments (Apple Pay, Google Pay)',
      'Cash handling (optional)',
      'Receipt printing',
      'PCI DSS compliance',
      'Multi-currency support',
      'Fraud detection'
    ],
    specifications: {
      screenSize: '15.6"',
      processor: 'Intel Core i3',
      memory: '8GB RAM',
      storage: '256GB SSD',
      connectivity: 'WiFi, Ethernet, 3G/4G',
      dimensions: '18" x 12" x 6"',
      weight: '18 lbs'
    },
    image: '/images/kiosk-payment.jpg',
    category: 'payment_terminal'
  },
  {
    id: 'kiosk-key-dispenser',
    name: 'Smart Key Dispenser',
    description: 'Automated key card and mobile key distribution system',
    price: 1800,
    features: [
      'Key card dispensing',
      'Mobile key distribution',
      'Room assignment integration',
      'Inventory management',
      'Security logging',
      'Multi-room support',
      'Emergency key access'
    ],
    specifications: {
      screenSize: '10.1"',
      processor: 'ARM Cortex-A72',
      memory: '4GB RAM',
      storage: '128GB eMMC',
      connectivity: 'WiFi, Ethernet',
      dimensions: '14" x 10" x 4"',
      weight: '8 lbs'
    },
    image: '/images/kiosk-key-dispenser.jpg',
    category: 'key_dispenser'
  },
  {
    id: 'kiosk-printer',
    name: 'Document Printer Kiosk',
    description: 'Multi-function printer for guest documents and receipts',
    price: 1200,
    features: [
      'High-speed printing',
      'Multi-format support',
      'Color and black & white',
      'Document scanning',
      'Fax capabilities',
      'Cloud printing',
      'Mobile printing',
      'Low maintenance design'
    ],
    specifications: {
      screenSize: '7"',
      processor: 'ARM Cortex-A53',
      memory: '2GB RAM',
      storage: '64GB eMMC',
      connectivity: 'WiFi, Ethernet, USB',
      dimensions: '16" x 12" x 8"',
      weight: '12 lbs'
    },
    image: '/images/kiosk-printer.jpg',
    category: 'printer'
  }
];

export function KioskCatalog({ selectedKiosks, onKioskSelect }: KioskCatalogProps) {
  const isSelected = (kiosk: KioskOption) => 
    selectedKiosks.some(selected => selected.id === kiosk.id);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      self_check_in: 'Self Check-in',
      passport_scanner: 'Passport Scanner',
      payment_terminal: 'Payment Terminal',
      key_dispenser: 'Key Dispenser',
      printer: 'Printer'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      self_check_in: 'bg-blue-100 text-blue-800',
      passport_scanner: 'bg-green-100 text-green-800',
      payment_terminal: 'bg-purple-100 text-purple-800',
      key_dispenser: 'bg-orange-100 text-orange-800',
      printer: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">All Kiosks</Button>
        <Button variant="outline" size="sm">Self Check-in</Button>
        <Button variant="outline" size="sm">Passport Scanner</Button>
        <Button variant="outline" size="sm">Payment Terminal</Button>
        <Button variant="outline" size="sm">Key Dispenser</Button>
        <Button variant="outline" size="sm">Printer</Button>
      </div>

      {/* Kiosk Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kioskOptions.map((kiosk) => (
          <Card 
            key={kiosk.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              isSelected(kiosk) ? 'ring-2 ring-primary shadow-lg' : ''
            }`}
            onClick={() => onKioskSelect(kiosk)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{kiosk.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {kiosk.description}
                  </CardDescription>
                </div>
                <Checkbox 
                  checked={isSelected(kiosk)}
                  onChange={() => onKioskSelect(kiosk)}
                  className="ml-2"
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <Badge className={getCategoryColor(kiosk.category)}>
                  {getCategoryLabel(kiosk.category)}
                </Badge>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(kiosk.price)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Kiosk Image Placeholder */}
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Kiosk Image</div>
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {kiosk.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                  {kiosk.features.length > 3 && (
                    <li className="text-primary text-xs">
                      +{kiosk.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium text-sm mb-2">Specifications:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>Screen: {String(kiosk.specifications.screenSize)}</div>
                  <div>Memory: {String(kiosk.specifications.memory)}</div>
                  <div>Storage: {String(kiosk.specifications.storage)}</div>
                  <div>Weight: {String(kiosk.specifications.weight)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedKiosks.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Selection Summary</h3>
                <p className="text-gray-600">
                  {selectedKiosks.length} kiosk{selectedKiosks.length !== 1 ? 's' : ''} selected
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(selectedKiosks.reduce((sum, kiosk) => sum + kiosk.price, 0))}
                </div>
                <div className="text-sm text-gray-600">Total Price</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
