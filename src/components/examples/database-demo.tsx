'use client';

import React, { useState, useEffect } from 'react';
import { useStores } from '@/hooks/useStores';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { generateId } from '@/lib/utils';
import { 
  Database, 
  Users, 
  ShoppingCart, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react';

export function DatabaseDemo() {
  const stores = useStores();
  const config = stores?.config;
  const user = stores?.user;
  const order = stores?.order;
  const ui = stores?.ui;
  const [isLoading, setIsLoading] = useState(false);
  const [demoData, setDemoData] = useState({
    users: 0,
    properties: 0,
    configurations: 0,
    orders: 0,
    products: 0,
  });

  const handleCreateDemoUser = async () => {
    setIsLoading(true);
    try {
      // Mock user creation
      const mockUser = {
        id: generateId(),
        email: `demo-${Date.now()}@example.com`,
        name: 'Demo User',
        role: 'user' as const,
      };
      
      user?.setUser(mockUser);
      ui?.addToast({ 
        message: 'Demo user created successfully!', 
        type: 'success' 
      });
      
      setDemoData(prev => ({ ...prev, users: prev.users + 1 }));
    } catch (error) {
      ui?.addToast({ 
        message: 'Failed to create demo user', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDemoProperty = async () => {
    setIsLoading(true);
    try {
      const mockProperty = {
        id: generateId(),
        name: 'Demo Hotel Property',
        address: '123 Demo Street, Demo City, DC 12345',
        propertyType: 'hotel',
        roomCount: 50,
        floorCount: 5,
        checkInTime: '15:00',
        checkOutTime: '11:00',
        amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
      };
      
      config?.setProperty(mockProperty);
      ui?.addToast({ 
        message: 'Demo property created successfully!', 
        type: 'success' 
      });
      
      setDemoData(prev => ({ ...prev, properties: prev.properties + 1 }));
    } catch (error) {
      ui?.addToast({ 
        message: 'Failed to create demo property', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDemoConfiguration = async () => {
    setIsLoading(true);
    try {
      const mockConfiguration = {
        id: generateId(),
        propertyId: config.property?.id || 'demo-property-id',
        kioskConfig: {
          selectedOptions: [
            {
              id: 'kiosk-basic',
              name: 'Basic Kiosk',
              description: 'Entry-level self-service kiosk',
              price: 2500,
              category: 'kiosk' as const,
              features: ['Passport scanning', 'Self check-in/check-out'],
            }
          ],
          totalPrice: 2500,
        },
        smartLockConfig: {
          selectedOptions: [
            {
              id: 'lock-basic',
              name: 'Basic Smart Lock',
              description: 'Entry-level smart lock',
              price: 180,
              category: 'smart_lock' as const,
              powerType: 'battery' as const,
              accessMethods: ['key_card', 'mobile_app'],
            }
          ],
          totalPrice: 180,
        },
        roomFeaturesConfig: {
          selectedOptions: [
            {
              id: 'features-basic',
              name: 'Basic Room Features',
              description: 'Essential room automation',
              price: 1200,
              category: 'switches' as const,
              features: ['Smart lighting', 'Climate control'],
            }
          ],
          totalPrice: 1200,
        },
        totalPrice: 3880,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      config?.setConfiguration(mockConfiguration);
      ui?.addToast({ 
        message: 'Demo configuration created successfully!', 
        type: 'success' 
      });
      
      setDemoData(prev => ({ ...prev, configurations: prev.configurations + 1 }));
    } catch (error) {
      ui?.addToast({ 
        message: 'Failed to create demo configuration', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDemoOrder = async () => {
    setIsLoading(true);
    try {
      const mockOrder = {
        id: generateId(),
        configurationId: config.configuration?.id || 'demo-config-id',
        userId: user.user?.id || 'demo-user-id',
        status: 'pending' as const,
        totalAmount: config.configuration?.totalPrice || 0,
        stripePaymentIntentId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await order?.createOrder(mockOrder);
      order?.addOrder(mockOrder);
      ui?.addToast({ 
        message: 'Demo order created successfully!', 
        type: 'success' 
      });
      
      setDemoData(prev => ({ ...prev, orders: prev.orders + 1 }));
    } catch (error) {
      ui?.addToast({ 
        message: 'Failed to create demo order', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success) {
        setDemoData(prev => ({ ...prev, products: result.data.length }));
        ui?.addToast({ 
          message: `Loaded ${result.data.length} products from database!`, 
          type: 'success' 
        });
      } else {
        throw new Error(result.error || 'Failed to load products');
      }
    } catch (error) {
      ui?.addToast({ 
        message: 'Failed to load products from database', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfiguration = async () => {
    if (!config?.configuration) {
      ui?.addToast({ 
        message: 'No configuration to save', 
        type: 'error' 
      });
      return;
    }

    try {
      await config.saveConfiguration();
      ui?.addToast({ 
        message: 'Configuration saved to database!', 
        type: 'success' 
      });
    } catch (error) {
      ui?.addToast({ 
        message: 'Failed to save configuration', 
        type: 'error' 
      });
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Database Integration Demo</h1>
        <p className="text-gray-600 mt-2">
          This demonstrates the Supabase database integration with API routes and persistent storage
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Database Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Database Stats</span>
            </CardTitle>
            <CardDescription>Current database record counts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Users:</span>
              <Badge>{demoData.users}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Properties:</span>
              <Badge>{demoData.properties}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Configurations:</span>
              <Badge>{demoData.configurations}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Orders:</span>
              <Badge>{demoData.orders}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Products:</span>
              <Badge>{demoData.products}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Management</span>
            </CardTitle>
            <CardDescription>Create and manage users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current User</Label>
              <div className="text-sm text-gray-600">
                {user?.user ? (
                  <div>
                    <div className="font-medium">{user.user.name}</div>
                    <div>{user.user.email}</div>
                    <Badge variant="outline">{user.user.role}</Badge>
                  </div>
                ) : (
                  'No user logged in'
                )}
              </div>
            </div>
            <Button 
              onClick={handleCreateDemoUser} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Users className="h-4 w-4 mr-2" />
              )}
              Create Demo User
            </Button>
          </CardContent>
        </Card>

        {/* Property Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Property Management</span>
            </CardTitle>
            <CardDescription>Create and manage properties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Property</Label>
              <div className="text-sm text-gray-600">
                {config?.property ? (
                  <div>
                    <div className="font-medium">{config.property.name}</div>
                    <div>{config.property.roomCount} rooms</div>
                    <Badge variant="outline">{config.property.propertyType}</Badge>
                  </div>
                ) : (
                  'No property configured'
                )}
              </div>
            </div>
            <Button 
              onClick={handleCreateDemoProperty} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Settings className="h-4 w-4 mr-2" />
              )}
              Create Demo Property
            </Button>
          </CardContent>
        </Card>

        {/* Configuration Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Configuration Management</span>
            </CardTitle>
            <CardDescription>Create and save configurations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Configuration</Label>
              <div className="text-sm text-gray-600">
                {config?.configuration ? (
                  <div>
                    <div className="font-medium">Total: ${config.configuration.totalPrice}</div>
                    <div>Kiosk: {config.configuration.kioskConfig.selectedOptions.length} items</div>
                    <div>Locks: {config.configuration.smartLockConfig.selectedOptions.length} items</div>
                    <div>Features: {config.configuration.roomFeaturesConfig.selectedOptions.length} items</div>
                  </div>
                ) : (
                  'No configuration created'
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Button 
                onClick={handleCreateDemoConfiguration} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Create Demo Configuration
              </Button>
              <Button 
                onClick={handleSaveConfiguration} 
                disabled={isLoading || !config?.configuration}
                variant="outline"
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Database className="h-4 w-4 mr-2" />
                )}
                Save to Database
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Order Management</span>
            </CardTitle>
            <CardDescription>Create and manage orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Order</Label>
              <div className="text-sm text-gray-600">
                {order?.currentOrder ? (
                  <div>
                    <div className="font-medium">Order #{order.currentOrder.id}</div>
                    <div>Amount: ${order.currentOrder.totalAmount}</div>
                    <Badge variant="outline">{order.currentOrder.status}</Badge>
                  </div>
                ) : (
                  'No active order'
                )}
              </div>
            </div>
            <Button 
              onClick={handleCreateDemoOrder} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ShoppingCart className="h-4 w-4 mr-2" />
              )}
              Create Demo Order
            </Button>
          </CardContent>
        </Card>

        {/* Product Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Product Management</span>
            </CardTitle>
            <CardDescription>Load products from database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Products in Database</Label>
              <div className="text-sm text-gray-600">
                <div className="font-medium">{demoData.products} products loaded</div>
                <div>Kiosks, Smart Locks, Room Features</div>
              </div>
            </div>
            <Button 
              onClick={handleLoadProducts} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Database className="h-4 w-4 mr-2" />
              )}
              Load Products from DB
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Database Status */}
      <Card>
        <CardHeader>
          <CardTitle>Database Integration Status</CardTitle>
          <CardDescription>Current status of database connections and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">API Routes Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Database Schema Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Mock Data Mode</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Row Level Security</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Database Integration Ready</p>
                <p>
                  The database integration is fully implemented with API routes, schema, and security policies. 
                  To connect to a real Supabase instance, update your environment variables with your Supabase URL and keys.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
