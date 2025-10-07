'use client';

import { RoomFeatureOption } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/utils';

interface RoomFeaturesCatalogProps {
  selectedFeatures: RoomFeatureOption[];
  onFeatureSelect: (feature: RoomFeatureOption) => void;
}

// Sample room features data - in a real app, this would come from an API
const roomFeatureOptions: RoomFeatureOption[] = [
  // Smart Switches & Controls
  {
    id: 'smart-switch-basic',
    name: 'Smart Light Switches',
    description: 'WiFi-enabled light switches with app control and scheduling',
    price: 45,
    category: 'switches',
    features: [
      'WiFi connectivity',
      'Mobile app control',
      'Voice control (Alexa/Google)',
      'Scheduling & timers',
      'Energy monitoring',
      'Dimmer functionality'
    ],
    specifications: {
      connectivity: 'WiFi 2.4GHz',
      power: '120V AC',
      load: '600W incandescent, 300W LED',
      material: 'Thermoplastic',
      finish: 'White, Black, Silver',
      dimensions: '4.5" x 2.8" x 1.2"'
    },
    image: '/images/smart-switch-basic.jpg',
  },
  {
    id: 'smart-switch-premium',
    name: 'Premium Smart Switches',
    description: 'Advanced smart switches with touch display and scene control',
    price: 85,
    category: 'switches',
    features: [
      'Touch display interface',
      'Scene control buttons',
      'WiFi & Bluetooth',
      'Voice control',
      'Energy monitoring',
      'Occupancy sensing',
      'Customizable LED indicators'
    ],
    specifications: {
      connectivity: 'WiFi 2.4GHz, Bluetooth 5.0',
      power: '120V AC',
      load: '1000W incandescent, 500W LED',
      material: 'Glass touch panel',
      finish: 'White, Black, Brushed Nickel',
      dimensions: '4.7" x 2.9" x 1.3"'
    },
    image: '/images/smart-switch-premium.jpg',
  },

  // Motion Sensors
  {
    id: 'motion-sensor-basic',
    name: 'Motion Sensors',
    description: 'PIR motion sensors for automatic lighting and energy savings',
    price: 35,
    category: 'motion_sensors',
    features: [
      'PIR motion detection',
      '360° coverage',
      'Adjustable sensitivity',
      'Daylight sensor',
      'Battery powered',
      '2-year battery life'
    ],
    specifications: {
      detectionRange: '30 feet',
      coverage: '360° horizontal, 90° vertical',
      power: '2x AA batteries',
      batteryLife: '2 years',
      material: 'ABS plastic',
      finish: 'White',
      dimensions: '2.5" x 2.5" x 1.2"'
    },
    image: '/images/motion-sensor-basic.jpg',
  },
  {
    id: 'motion-sensor-advanced',
    name: 'Advanced Motion Sensors',
    description: 'Multi-sensor devices with motion, light, temperature, and humidity detection',
    price: 65,
    category: 'motion_sensors',
    features: [
      'PIR motion detection',
      'Ambient light sensor',
      'Temperature monitoring',
      'Humidity detection',
      'WiFi connectivity',
      'Mobile notifications',
      '3-year battery life'
    ],
    specifications: {
      detectionRange: '40 feet',
      coverage: '360° horizontal, 120° vertical',
      power: '2x AA batteries',
      batteryLife: '3 years',
      connectivity: 'WiFi 2.4GHz',
      material: 'ABS plastic',
      finish: 'White, Black',
      dimensions: '3.0" x 3.0" x 1.5"'
    },
    image: '/images/motion-sensor-advanced.jpg',
  },

  // Smart Blinds
  {
    id: 'smart-blinds-basic',
    name: 'Smart Motorized Blinds',
    description: 'Automated window blinds with app control and scheduling',
    price: 180,
    category: 'blinds',
    features: [
      'Motorized operation',
      'Mobile app control',
      'Voice control',
      'Scheduling & timers',
      'Sun tracking',
      'Battery powered'
    ],
    specifications: {
      power: 'Rechargeable battery',
      batteryLife: '6 months',
      connectivity: 'WiFi 2.4GHz',
      material: 'Aluminum slats',
      finish: 'White, Beige, Gray',
      maxWidth: '72 inches',
      maxHeight: '96 inches'
    },
    image: '/images/smart-blinds-basic.jpg',
  },
  {
    id: 'smart-blinds-premium',
    name: 'Premium Smart Blinds',
    description: 'High-end motorized blinds with solar charging and advanced automation',
    price: 280,
    category: 'blinds',
    features: [
      'Solar panel charging',
      'Advanced sun tracking',
      'Weather integration',
      'Scene automation',
      'Energy efficiency mode',
      'Quiet operation',
      '5-year warranty'
    ],
    specifications: {
      power: 'Solar panel + battery backup',
      batteryLife: '12 months backup',
      connectivity: 'WiFi 2.4GHz, Zigbee',
      material: 'Wood composite slats',
      finish: 'Natural wood, White, Black',
      maxWidth: '84 inches',
      maxHeight: '120 inches'
    },
    image: '/images/smart-blinds-premium.jpg',
  },

  // Smart Thermostats
  {
    id: 'smart-thermostat-basic',
    name: 'Smart Thermostat',
    description: 'WiFi-enabled thermostat with learning capabilities and energy savings',
    price: 120,
    category: 'thermostat',
    features: [
      'WiFi connectivity',
      'Learning algorithms',
      'Mobile app control',
      'Energy usage reports',
      'Geofencing',
      'Voice control',
      '7-day programming'
    ],
    specifications: {
      connectivity: 'WiFi 2.4GHz',
      power: '24V AC or battery',
      display: '3.5" color touchscreen',
      compatibility: 'Most HVAC systems',
      material: 'Plastic housing',
      finish: 'White, Black',
      dimensions: '4.3" x 4.3" x 1.0"'
    },
    image: '/images/smart-thermostat-basic.jpg',
  },
  {
    id: 'smart-thermostat-premium',
    name: 'Premium Smart Thermostat',
    description: 'Advanced thermostat with room sensors and AI optimization',
    price: 200,
    category: 'thermostat',
    features: [
      'Room temperature sensors',
      'AI-powered optimization',
      'Occupancy detection',
      'Humidity control',
      'Air quality monitoring',
      'Advanced scheduling',
      'Energy efficiency analytics'
    ],
    specifications: {
      connectivity: 'WiFi 2.4GHz, Bluetooth',
      power: '24V AC',
      display: '4.3" HD color display',
      sensors: 'Temperature, humidity, occupancy',
      compatibility: 'All HVAC systems',
      material: 'Glass touch panel',
      finish: 'White, Black, Stainless Steel',
      dimensions: '4.5" x 4.5" x 1.2"'
    },
    image: '/images/smart-thermostat-premium.jpg',
  },

  // Smart Lighting
  {
    id: 'smart-lighting-basic',
    name: 'Smart LED Lighting',
    description: 'Color-changing LED strips and bulbs with app control',
    price: 25,
    category: 'lighting',
    features: [
      '16 million colors',
      'WiFi connectivity',
      'Mobile app control',
      'Voice control',
      'Scheduling & scenes',
      'Music sync',
      'Energy efficient'
    ],
    specifications: {
      connectivity: 'WiFi 2.4GHz',
      power: '12V DC',
      brightness: '800 lumens',
      colorTemp: '2700K-6500K',
      material: 'Aluminum housing',
      finish: 'White, Black',
      dimensions: '4.0" x 4.0" x 2.0"'
    },
    image: '/images/smart-lighting-basic.jpg',
  },
  {
    id: 'smart-lighting-premium',
    name: 'Premium Smart Lighting',
    description: 'High-end smart lighting with advanced color accuracy and effects',
    price: 55,
    category: 'lighting',
    features: [
      'Professional color accuracy',
      'Circadian rhythm support',
      'Advanced effects',
      'Multiple zones',
      'Energy monitoring',
      'Weather integration',
      'Professional installation'
    ],
    specifications: {
      connectivity: 'WiFi 2.4GHz, Zigbee',
      power: '24V DC',
      brightness: '1200 lumens',
      colorAccuracy: 'CRI 95+',
      material: 'Aluminum with glass diffuser',
      finish: 'White, Black, Chrome',
      dimensions: '5.0" x 5.0" x 2.5"'
    },
    image: '/images/smart-lighting-premium.jpg',
  },

  // TV Control
  {
    id: 'tv-control-basic',
    name: 'Smart TV Control',
    description: 'Universal remote control system for hotel room entertainment',
    price: 40,
    category: 'tv_control',
    features: [
      'Universal TV control',
      'Mobile app interface',
      'Channel favorites',
      'Volume control',
      'Input switching',
      'Guest-friendly interface'
    ],
    specifications: {
      connectivity: 'Infrared, WiFi',
      compatibility: 'All major TV brands',
      range: '30 feet',
      power: 'USB powered',
      material: 'Plastic housing',
      finish: 'Black',
      dimensions: '3.0" x 1.5" x 0.5"'
    },
    image: '/images/tv-control-basic.jpg',
  },
  {
    id: 'tv-control-premium',
    name: 'Premium TV Control System',
    description: 'Advanced entertainment control with streaming integration and guest services',
    price: 85,
    category: 'tv_control',
    features: [
      'Streaming service integration',
      'Guest services portal',
      'Room service ordering',
      'Hotel information',
      'Weather & news',
      'Multi-language support',
      'Custom branding'
    ],
    specifications: {
      connectivity: 'WiFi, Bluetooth, Infrared',
      display: '7" touchscreen',
      compatibility: 'All smart TVs',
      power: 'AC adapter',
      material: 'Aluminum housing',
      finish: 'Black, White, Silver',
      dimensions: '8.0" x 5.0" x 1.0"'
    },
    image: '/images/tv-control-premium.jpg',
  },

  // Security Features
  {
    id: 'security-basic',
    name: 'Room Security Sensors',
    description: 'Door and window sensors for enhanced guest security',
    price: 30,
    category: 'security',
    features: [
      'Door/window sensors',
      'Motion detection',
      'Mobile notifications',
      'Battery powered',
      'Easy installation',
      '2-year battery life'
    ],
    specifications: {
      connectivity: 'WiFi 2.4GHz',
      power: '2x AA batteries',
      batteryLife: '2 years',
      range: '100 feet',
      material: 'ABS plastic',
      finish: 'White',
      dimensions: '2.0" x 1.5" x 0.8"'
    },
    image: '/images/security-basic.jpg',
  },
  {
    id: 'security-premium',
    name: 'Premium Security System',
    description: 'Comprehensive room security with cameras and advanced monitoring',
    price: 150,
    category: 'security',
    features: [
      'HD security camera',
      'Motion detection',
      'Night vision',
      'Cloud storage',
      'Mobile app access',
      'Privacy mode',
      'Professional monitoring'
    ],
    specifications: {
      connectivity: 'WiFi 2.4GHz',
      camera: '1080p HD',
      nightVision: '30 feet',
      storage: 'Cloud + local',
      power: 'AC adapter',
      material: 'Aluminum housing',
      finish: 'White, Black',
      dimensions: '4.0" x 3.0" x 2.0"'
    },
    image: '/images/security-premium.jpg',
  },

  // Entertainment
  {
    id: 'entertainment-basic',
    name: 'Smart Speaker System',
    description: 'Voice-controlled speakers with music streaming and hotel services',
    price: 80,
    category: 'entertainment',
    features: [
      'Voice control',
      'Music streaming',
      'Hotel services integration',
      'Multi-room audio',
      'Bluetooth connectivity',
      'Guest-friendly setup'
    ],
    specifications: {
      connectivity: 'WiFi, Bluetooth 5.0',
      power: 'AC adapter',
      audio: 'Stereo speakers',
      voice: 'Built-in microphone',
      material: 'Fabric mesh',
      finish: 'Gray, Black, White',
      dimensions: '6.0" x 4.0" x 4.0"'
    },
    image: '/images/entertainment-basic.jpg',
  },
  {
    id: 'entertainment-premium',
    name: 'Premium Entertainment Hub',
    description: 'Complete entertainment system with streaming, gaming, and smart controls',
    price: 200,
    category: 'entertainment',
    features: [
      '4K streaming',
      'Gaming console integration',
      'Smart home control',
      'Voice assistant',
      'Multi-room audio',
      'Guest services portal',
      'Custom content'
    ],
    specifications: {
      connectivity: 'WiFi 6, Bluetooth 5.0, HDMI',
      display: '4K HDR support',
      audio: 'Dolby Atmos',
      storage: '256GB SSD',
      power: 'AC adapter',
      material: 'Aluminum housing',
      finish: 'Black, Silver',
      dimensions: '10.0" x 8.0" x 2.0"'
    },
    image: '/images/entertainment-premium.jpg',
  }
];

export function RoomFeaturesCatalog({ selectedFeatures, onFeatureSelect }: RoomFeaturesCatalogProps) {
  const isSelected = (feature: RoomFeatureOption) => 
    selectedFeatures.some(selected => selected.id === feature.id);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      switches: 'bg-blue-100 text-blue-800',
      motion_sensors: 'bg-green-100 text-green-800',
      blinds: 'bg-purple-100 text-purple-800',
      thermostat: 'bg-orange-100 text-orange-800',
      lighting: 'bg-yellow-100 text-yellow-800',
      tv_control: 'bg-red-100 text-red-800',
      security: 'bg-gray-100 text-gray-800',
      entertainment: 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      switches: '🔌',
      motion_sensors: '👁️',
      blinds: '🪟',
      thermostat: '🌡️',
      lighting: '💡',
      tv_control: '📺',
      security: '🔒',
      entertainment: '🎵'
    };
    return icons[category] || '⚙️';
  };

  const categories = Array.from(new Set(roomFeatureOptions.map(f => f.category)));

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">All Features</Button>
        {categories.map((category) => (
          <Button key={category} variant="outline" size="sm">
            {getCategoryIcon(category)} {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Button>
        ))}
      </div>

      {/* Room Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomFeatureOptions.map((feature) => (
          <Card 
            key={feature.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              isSelected(feature) ? 'ring-2 ring-primary shadow-lg' : ''
            }`}
            onClick={() => onFeatureSelect(feature)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{feature.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {feature.description}
                  </CardDescription>
                </div>
                <Checkbox 
                  checked={isSelected(feature)}
                  onChange={() => onFeatureSelect(feature)}
                  className="ml-2"
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Badge className={getCategoryColor(feature.category)}>
                    {getCategoryIcon(feature.category)} {feature.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(feature.price)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Feature Image Placeholder */}
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Room Feature Image</div>
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {feature.features.slice(0, 3).map((featureItem, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {featureItem}
                    </li>
                  ))}
                  {feature.features.length > 3 && (
                    <li className="text-primary text-xs">
                      +{feature.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium text-sm mb-2">Specifications:</h4>
                <div className="grid grid-cols-1 gap-1 text-xs text-gray-600">
                  <div>Power: {String(feature.specifications.power || feature.specifications.connectivity)}</div>
                  <div>Material: {String(feature.specifications.material)}</div>
                  <div>Finish: {String(feature.specifications.finish)}</div>
                  <div>Size: {String(feature.specifications.dimensions)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selection Summary */}
      {selectedFeatures.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Selection Summary</h3>
                <p className="text-gray-600">
                  {selectedFeatures.length} room feature{selectedFeatures.length !== 1 ? 's' : ''} selected
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(selectedFeatures.reduce((sum, feature) => sum + feature.price, 0))}
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
