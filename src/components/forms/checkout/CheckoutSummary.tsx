'use client';

import { Configuration } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle, Package, Lock, Home, CreditCard } from 'lucide-react';

interface CheckoutSummaryProps {
  configuration: Configuration;
  onProceed: () => void;
}

export function CheckoutSummary({ configuration, onProceed }: CheckoutSummaryProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'kiosk':
        return <Package className="h-5 w-5" />;
      case 'smart-lock':
        return <Lock className="h-5 w-5" />;
      case 'room-features':
        return <Home className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'kiosk':
        return 'bg-blue-100 text-blue-800';
      case 'smart-lock':
        return 'bg-green-100 text-green-800';
      case 'room-features':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
          <p className="text-gray-600">Review your smart hotel configuration before proceeding</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Total: {formatCurrency(configuration.totalPrice)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Kiosk Configuration */}
          {configuration.kioskConfig.selectedOptions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span>Kiosk Solutions</span>
                  <Badge className={getCategoryColor('kiosk')}>
                    {configuration.kioskConfig.selectedOptions.length} items
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Selected kiosk solutions for your property
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {configuration.kioskConfig.selectedOptions.map((kiosk) => (
                    <div key={kiosk.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{kiosk.name}</h4>
                        <p className="text-sm text-gray-600">{kiosk.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {kiosk.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{formatCurrency(kiosk.price)}</div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Kiosk Subtotal:</span>
                      <span className="font-bold">{formatCurrency(configuration.kioskConfig.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Smart Lock Configuration */}
          {configuration.smartLockConfig.selectedOptions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-green-600" />
                  <span>Smart Lock System</span>
                  <Badge className={getCategoryColor('smart-lock')}>
                    {configuration.smartLockConfig.selectedOptions.length} items
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Selected smart lock solutions for your property
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {configuration.smartLockConfig.selectedOptions.map((lock) => (
                    <div key={lock.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{lock.name}</h4>
                        <p className="text-sm text-gray-600">{lock.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {lock.powerType.charAt(0).toUpperCase() + lock.powerType.slice(1)}
                          </Badge>
                          <div className="text-xs text-gray-500">
                            Access: {lock.accessMethods.join(', ')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{formatCurrency(lock.price)}</div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Smart Lock Subtotal:</span>
                      <span className="font-bold">{formatCurrency(configuration.smartLockConfig.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Room Features Configuration */}
          {configuration.roomFeaturesConfig.selectedOptions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="h-5 w-5 text-purple-600" />
                  <span>Room Features</span>
                  <Badge className={getCategoryColor('room-features')}>
                    {configuration.roomFeaturesConfig.selectedOptions.length} items
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Selected room automation features for your property
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {configuration.roomFeaturesConfig.selectedOptions.map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{feature.name}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                        <Badge variant="outline" className="text-xs mt-2">
                          {feature.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{formatCurrency(feature.price)}</div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Room Features Subtotal:</span>
                      <span className="font-bold">{formatCurrency(configuration.roomFeaturesConfig.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Order Total</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Kiosk Solutions:</span>
                  <span>{formatCurrency(configuration.kioskConfig.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Smart Locks:</span>
                  <span>{formatCurrency(configuration.smartLockConfig.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Room Features:</span>
                  <span>{formatCurrency(configuration.roomFeaturesConfig.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Installation:</span>
                  <span className="text-green-600">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Warranty:</span>
                  <span className="text-green-600">2 Years</span>
                </div>
                <div className="flex justify-between">
                  <span>Support:</span>
                  <span className="text-green-600">24/7</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">{formatCurrency(configuration.totalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What&apos;s Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Professional installation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>2-year comprehensive warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>24/7 technical support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Mobile app setup & training</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Staff training included</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Remote monitoring & updates</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={onProceed} size="lg" className="w-full">
              Proceed to Billing Information
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="w-full">
              Back to Configuration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
