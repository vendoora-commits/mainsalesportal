'use client';

import { Configuration } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle, Download, Mail, Phone, Calendar, Package, Lock, Home } from 'lucide-react';

interface OrderConfirmationProps {
  orderId: string;
  configuration: Configuration;
}

export function OrderConfirmation({ orderId, configuration }: OrderConfirmationProps) {
  const handleDownloadInvoice = () => {
    // Mock invoice download
    console.log('Downloading invoice for order:', orderId);
  };

  const handleEmailConfirmation = () => {
    // Mock email confirmation
    console.log('Sending email confirmation for order:', orderId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-lg text-gray-600 mb-4">
          Thank you for your order. Your smart hotel configuration has been successfully processed.
        </p>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Order #{orderId}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>
                Your order has been processed and is being prepared for installation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Order Number</h4>
                  <p className="text-gray-600">{orderId}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Order Date</h4>
                  <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Total Amount</h4>
                  <p className="text-gray-600 font-bold">{formatCurrency(configuration.totalPrice)}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Status</h4>
                  <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">1. Installation Scheduling</h4>
                    <p className="text-sm text-gray-600">
                      Our team will contact you within 24 hours to schedule your installation appointment.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">2. Equipment Preparation</h4>
                    <p className="text-sm text-gray-600">
                      Your smart hotel equipment will be prepared and shipped to your property.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lock className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">3. Professional Installation</h4>
                    <p className="text-sm text-gray-600">
                      Certified technicians will install and configure your smart hotel system.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Home className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">4. System Activation</h4>
                    <p className="text-sm text-gray-600">
                      Your smart hotel system will be activated and staff training will be provided.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {configuration.kioskConfig.selectedOptions.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Package className="h-5 w-5 text-blue-600" />
                      <span>Kiosk Solutions</span>
                    </div>
                    <Badge variant="outline">
                      {configuration.kioskConfig.selectedOptions.length} items
                    </Badge>
                  </div>
                )}
                
                {configuration.smartLockConfig.selectedOptions.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-5 w-5 text-green-600" />
                      <span>Smart Lock System</span>
                    </div>
                    <Badge variant="outline">
                      {configuration.smartLockConfig.selectedOptions.length} items
                    </Badge>
                  </div>
                )}
                
                {configuration.roomFeaturesConfig.selectedOptions.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Home className="h-5 w-5 text-purple-600" />
                      <span>Room Features</span>
                    </div>
                    <Badge variant="outline">
                      {configuration.roomFeaturesConfig.selectedOptions.length} items
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <p className="text-sm text-gray-600">1-800-VENDOORA</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">support@vendoora.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-sm text-gray-600">24/7 Support Available</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleDownloadInvoice} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              
              <Button onClick={handleEmailConfirmation} variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Email Confirmation
              </Button>
              
              <Button onClick={() => window.location.href = '/dashboard'} className="w-full">
                View Order Status
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Installation Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Order Processing:</span>
                  <span className="text-green-600">Complete</span>
                </div>
                <div className="flex justify-between">
                  <span>Equipment Preparation:</span>
                  <span className="text-blue-600">1-2 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Installation Scheduling:</span>
                  <span className="text-blue-600">3-5 days</span>
                </div>
                <div className="flex justify-between">
                  <span>System Activation:</span>
                  <span className="text-gray-600">7-10 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
