'use client';

import { SmartLockOption } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/utils';

interface SmartLockCatalogProps {
  selectedLocks: SmartLockOption[];
  onLockSelect: (lock: SmartLockOption) => void;
}

// Sample smart lock data - in a real app, this would come from an API
const smartLockOptions: SmartLockOption[] = [
  {
    id: 'lock-basic-battery',
    name: 'Basic Battery Smart Lock',
    description: 'Essential smart lock with mobile app access and key card compatibility',
    price: 180,
    powerType: 'battery',
    accessMethods: ['mobile', 'keycard', 'bluetooth'],
    features: [
      'Mobile app control',
      'Key card access',
      'Bluetooth connectivity',
      'Auto-lock feature',
      'Guest access codes',
      'Battery life: 12 months'
    ],
    specifications: {
      batteryLife: '12 months',
      connectivity: 'Bluetooth, WiFi',
      material: 'Zinc alloy',
      finish: 'Matte black',
      dimensions: '4.5" x 2.8" x 1.2"',
      weight: '1.2 lbs',
      weatherRating: 'IP65'
    },
    image: '/images/lock-basic-battery.jpg',
  },
  {
    id: 'lock-premium-battery',
    name: 'Premium Battery Smart Lock',
    description: 'Advanced smart lock with biometric access and premium features',
    price: 320,
    powerType: 'battery',
    accessMethods: ['mobile', 'keycard', 'fingerprint', 'bluetooth'],
    features: [
      'Fingerprint recognition',
      'Mobile app control',
      'Key card access',
      'Bluetooth & WiFi',
      'Auto-lock feature',
      'Guest access codes',
      'Tamper detection',
      'Battery life: 18 months'
    ],
    specifications: {
      batteryLife: '18 months',
      connectivity: 'Bluetooth, WiFi',
      material: 'Stainless steel',
      finish: 'Brushed nickel',
      dimensions: '5.2" x 3.1" x 1.4"',
      weight: '1.8 lbs',
      weatherRating: 'IP67'
    },
    image: '/images/lock-premium-battery.jpg',
  },
  {
    id: 'lock-wired-premium',
    name: 'Wired Premium Smart Lock',
    description: 'Professional-grade wired smart lock with advanced security features',
    price: 450,
    powerType: 'wired',
    accessMethods: ['mobile', 'keycard', 'fingerprint', 'wifi'],
    features: [
      'Fingerprint recognition',
      'Mobile app control',
      'Key card access',
      'WiFi connectivity',
      'Auto-lock feature',
      'Guest access codes',
      'Tamper detection',
      'Audit logging',
      'Remote management'
    ],
    specifications: {
      powerSource: 'Hardwired 12V DC',
      connectivity: 'WiFi, Ethernet',
      material: 'Stainless steel',
      finish: 'Brushed chrome',
      dimensions: '5.8" x 3.5" x 1.6"',
      weight: '2.2 lbs',
      weatherRating: 'IP68'
    },
    image: '/images/lock-wired-premium.jpg',
  },
  {
    id: 'lock-solar-premium',
    name: 'Solar-Powered Smart Lock',
    description: 'Eco-friendly smart lock with solar charging and premium features',
    price: 380,
    powerType: 'solar',
    accessMethods: ['mobile', 'keycard', 'fingerprint', 'bluetooth'],
    features: [
      'Solar panel charging',
      'Fingerprint recognition',
      'Mobile app control',
      'Key card access',
      'Bluetooth & WiFi',
      'Auto-lock feature',
      'Guest access codes',
      'Battery backup: 6 months'
    ],
    specifications: {
      powerSource: 'Solar panel + battery backup',
      connectivity: 'Bluetooth, WiFi',
      material: 'Aluminum alloy',
      finish: 'Anodized silver',
      dimensions: '5.5" x 3.2" x 1.5"',
      weight: '1.9 lbs',
      weatherRating: 'IP66'
    },
    image: '/images/lock-solar-premium.jpg',
  },
  {
    id: 'lock-budget-battery',
    name: 'Budget Battery Smart Lock',
    description: 'Affordable smart lock with essential features for budget-conscious properties',
    price: 120,
    powerType: 'battery',
    accessMethods: ['mobile', 'keycard'],
    features: [
      'Mobile app control',
      'Key card access',
      'Bluetooth connectivity',
      'Auto-lock feature',
      'Basic guest codes',
      'Battery life: 8 months'
    ],
    specifications: {
      batteryLife: '8 months',
      connectivity: 'Bluetooth',
      material: 'ABS plastic',
      finish: 'White',
      dimensions: '4.2" x 2.6" x 1.0"',
      weight: '0.8 lbs',
      weatherRating: 'IP54'
    },
    image: '/images/lock-budget-battery.jpg',
  },
  {
    id: 'lock-enterprise-wired',
    name: 'Enterprise Wired Smart Lock',
    description: 'High-security smart lock designed for enterprise and commercial properties',
    price: 650,
    powerType: 'wired',
    accessMethods: ['mobile', 'keycard', 'fingerprint', 'wifi'],
    features: [
      'Advanced fingerprint scanner',
      'Mobile app control',
      'Key card access',
      'WiFi & Ethernet',
      'Auto-lock feature',
      'Advanced guest management',
      'Tamper detection',
      'Comprehensive audit logging',
      'Remote management',
      'Integration APIs'
    ],
    specifications: {
      powerSource: 'Hardwired 24V DC',
      connectivity: 'WiFi, Ethernet, RS485',
      material: '316 Stainless steel',
      finish: 'Satin finish',
      dimensions: '6.2" x 3.8" x 1.8"',
      weight: '2.8 lbs',
      weatherRating: 'IP69K'
    },
    image: '/images/lock-enterprise-wired.jpg',
  }
];

export function SmartLockCatalog({ selectedLocks, onLockSelect }: SmartLockCatalogProps) {
  const isSelected = (lock: SmartLockOption) => 
    selectedLocks.some(selected => selected.id === lock.id);

  const getPowerTypeColor = (powerType: string) => {
    const colors: Record<string, string> = {
      battery: 'bg-green-100 text-green-800',
      wired: 'bg-blue-100 text-blue-800',
      solar: 'bg-yellow-100 text-yellow-800'
    };
    return colors[powerType] || 'bg-gray-100 text-gray-800';
  };

  const getAccessMethodIcons = (methods: string[]) => {
    const icons: Record<string, string> = {
      mobile: '📱',
      keycard: '💳',
      fingerprint: '👆',
      bluetooth: '🔵',
      wifi: '📶'
    };
    return methods.map(method => icons[method] || '🔒').join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">All Locks</Button>
        <Button variant="outline" size="sm">Battery Powered</Button>
        <Button variant="outline" size="sm">Wired</Button>
        <Button variant="outline" size="sm">Solar Powered</Button>
        <Button variant="outline" size="sm">Biometric</Button>
        <Button variant="outline" size="sm">Mobile Access</Button>
      </div>

      {/* Smart Lock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {smartLockOptions.map((lock) => (
          <Card 
            key={lock.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              isSelected(lock) ? 'ring-2 ring-primary shadow-lg' : ''
            }`}
            onClick={() => onLockSelect(lock)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{lock.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {lock.description}
                  </CardDescription>
                </div>
                <Checkbox 
                  checked={isSelected(lock)}
                  onChange={() => onLockSelect(lock)}
                  className="ml-2"
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Badge className={getPowerTypeColor(lock.powerType)}>
                    {lock.powerType.charAt(0).toUpperCase() + lock.powerType.slice(1)}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    {getAccessMethodIcons(lock.accessMethods)}
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(lock.price)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Lock Image Placeholder */}
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Smart Lock Image</div>
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {lock.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                  {lock.features.length > 3 && (
                    <li className="text-primary text-xs">
                      +{lock.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>

              {/* Access Methods */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium text-sm mb-2">Access Methods:</h4>
                <div className="flex flex-wrap gap-1">
                  {lock.accessMethods.map((method) => (
                    <Badge key={method} variant="outline" className="text-xs">
                      {method.charAt(0).toUpperCase() + method.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium text-sm mb-2">Specifications:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>Material: {String(lock.specifications.material)}</div>
                  <div>Weight: {String(lock.specifications.weight)}</div>
                  <div>Rating: {String(lock.specifications.weatherRating)}</div>
                  <div>Size: {String(lock.specifications.dimensions)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedLocks.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Selection Summary</h3>
                <p className="text-gray-600">
                  {selectedLocks.length} smart lock{selectedLocks.length !== 1 ? 's' : ''} selected
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(selectedLocks.reduce((sum, lock) => sum + lock.price, 0))}
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
