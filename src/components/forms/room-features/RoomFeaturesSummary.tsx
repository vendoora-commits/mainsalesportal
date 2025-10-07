'use client';

import { useConfigurationStore } from '@/store/useConfigurationStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

interface RoomFeaturesSummaryProps {
  onBack: () => void;
  onComplete: () => void;
}

export function RoomFeaturesSummary({ onBack, onComplete }: RoomFeaturesSummaryProps) {
  const { configuration } = useConfigurationStore();
  
  if (!configuration?.roomFeaturesConfig) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">No room features configuration found. Please go back and configure your features.</p>
          <Button onClick={onBack} className="mt-4">
            Back to Configuration
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { selectedOptions, totalPrice } = configuration.roomFeaturesConfig;

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

  // Group features by category
  const featuresByCategory = selectedOptions.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, typeof selectedOptions>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Room Features Configuration Complete</h2>
          <p className="text-gray-600">Review your selected smart room automation features</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Edit Configuration
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selected Features by Category */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-semibold">Selected Room Features</h3>
          
          {Object.entries(featuresByCategory).map(([category, features]) => (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <span>{category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  <Badge className={getCategoryColor(category)}>
                    {features.length} item{features.length !== 1 ? 's' : ''}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {features.map((feature) => (
                    <div key={feature.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{feature.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                          
                          <div className="mt-2">
                            <h5 className="font-medium text-sm">Key Features:</h5>
                            <ul className="text-sm text-gray-600 space-y-1 mt-1">
                              {feature.features.slice(0, 4).map((featureItem, index) => (
                                <li key={index} className="flex items-center">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                                  {featureItem}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-primary">
                            {formatCurrency(feature.price)}
                          </div>
                          <div className="text-sm text-gray-500">per unit</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Your complete smart hotel configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Room Features:</span>
                  <span className="font-medium">{selectedOptions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Categories:</span>
                  <span className="font-medium">{Object.keys(featuresByCategory).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Price:</span>
                  <span className="font-bold text-primary">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-sm text-gray-600 space-y-1">
                  <div>✓ Professional installation included</div>
                  <div>✓ 2-year warranty on all devices</div>
                  <div>✓ 24/7 technical support</div>
                  <div>✓ Mobile app setup & training</div>
                  <div>✓ Staff training included</div>
                  <div>✓ Remote monitoring & updates</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Complete Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Property setup completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Kiosk selection completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Smart locks configured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Room features configured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Review pricing and checkout</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={onComplete} size="lg" className="w-full">
              Complete Configuration & Checkout
            </Button>
            <Button variant="outline" onClick={onBack} className="w-full">
              Edit Room Features
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Smart Hotel Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-medium">Energy Savings</h4>
              <p className="text-sm text-gray-600">Up to 30% reduction in energy costs</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⭐</div>
              <h4 className="font-medium">Guest Satisfaction</h4>
              <p className="text-sm text-gray-600">Enhanced guest experience and reviews</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔧</div>
              <h4 className="font-medium">Operational Efficiency</h4>
              <p className="text-sm text-gray-600">Streamlined operations and maintenance</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-medium">Data Insights</h4>
              <p className="text-sm text-gray-600">Real-time analytics and reporting</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
