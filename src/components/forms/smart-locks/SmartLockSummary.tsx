'use client';

import { useConfigurationStore } from '@/store/useConfigurationStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

interface SmartLockSummaryProps {
  onBack: () => void;
  onContinue: () => void;
}

export function SmartLockSummary({ onBack, onContinue }: SmartLockSummaryProps) {
  const { configuration } = useConfigurationStore();
  
  if (!configuration?.smartLockConfig) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">No smart lock configuration found. Please go back and configure your locks.</p>
          <Button onClick={onBack} className="mt-4">
            Back to Configuration
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { selectedOptions, totalPrice } = configuration.smartLockConfig;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Lock Configuration Complete</h2>
          <p className="text-gray-600">Review your selected smart lock solutions</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Edit Configuration
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selected Locks */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold">Selected Smart Lock Solutions</h3>
          
          {selectedOptions.map((lock) => (
            <Card key={lock.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{lock.name}</CardTitle>
                    <CardDescription>{lock.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={
                      lock.powerType === 'battery' ? 'bg-green-100 text-green-800' :
                      lock.powerType === 'wired' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {lock.powerType.charAt(0).toUpperCase() + lock.powerType.slice(1)}
                    </Badge>
                    <div className="text-lg font-bold text-primary">
                      {formatCurrency(lock.price)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {lock.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Access Methods:</h4>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {lock.accessMethods.map((method) => (
                        <Badge key={method} variant="outline" className="text-xs">
                          {method.charAt(0).toUpperCase() + method.slice(1)}
                        </Badge>
                      ))}
                    </div>
                    
                    <h4 className="font-medium text-sm mb-2">Specifications:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Material: {String(lock.specifications.material)}</div>
                      <div>Weight: {String(lock.specifications.weight)}</div>
                      <div>Rating: {String(lock.specifications.weatherRating)}</div>
                    </div>
                  </div>
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
              <CardDescription>Your smart lock configuration details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Locks Selected:</span>
                  <span className="font-medium">{selectedOptions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Price:</span>
                  <span className="font-bold text-primary">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-sm text-gray-600 space-y-1">
                  <div>✓ Professional installation included</div>
                  <div>✓ 2-year warranty</div>
                  <div>✓ 24/7 technical support</div>
                  <div>✓ Mobile app setup</div>
                  <div>✓ Staff training included</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Configure room automation features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Review final pricing and package</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Schedule installation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Complete order and payment</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={onContinue} size="lg" className="w-full">
              Continue to Room Features
            </Button>
            <Button variant="outline" onClick={onBack} className="w-full">
              Edit Lock Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
