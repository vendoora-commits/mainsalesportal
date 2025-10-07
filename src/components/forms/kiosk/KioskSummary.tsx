'use client';

import { useConfigurationStore } from '@/store/useConfigurationStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

interface KioskSummaryProps {
  onBack: () => void;
  onContinue: () => void;
}

export function KioskSummary({ onBack, onContinue }: KioskSummaryProps) {
  const { configuration } = useConfigurationStore();
  
  if (!configuration?.kioskConfig) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">No kiosk configuration found. Please go back and configure your kiosks.</p>
          <Button onClick={onBack} className="mt-4">
            Back to Configuration
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { selectedOptions, totalPrice } = configuration.kioskConfig;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kiosk Configuration Complete</h2>
          <p className="text-gray-600">Review your selected kiosk solutions</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Edit Configuration
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selected Kiosks */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold">Selected Kiosk Solutions</h3>
          
          {selectedOptions.map((kiosk) => (
            <Card key={kiosk.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{kiosk.name}</CardTitle>
                    <CardDescription>{kiosk.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {kiosk.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {kiosk.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Specifications:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Screen: {String(kiosk.specifications.screenSize)}</div>
                      <div>Memory: {String(kiosk.specifications.memory)}</div>
                      <div>Storage: {String(kiosk.specifications.storage)}</div>
                      <div>Weight: {String(kiosk.specifications.weight)}</div>
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
              <CardDescription>Your kiosk configuration details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Kiosks Selected:</span>
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
                  <div>✓ 1-year warranty</div>
                  <div>✓ 24/7 technical support</div>
                  <div>✓ Training for your staff</div>
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
                  <span>Configure smart locks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Select room automation features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Review final pricing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Schedule installation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={onContinue} size="lg" className="w-full">
              Continue to Smart Locks
            </Button>
            <Button variant="outline" onClick={onBack} className="w-full">
              Edit Kiosk Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
