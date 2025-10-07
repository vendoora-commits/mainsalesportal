'use client';

import { useState } from 'react';
import { SmartLockOption, SmartLockConfiguration } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/utils';

interface SmartLockConfigurationPanelProps {
  selectedLocks: SmartLockOption[];
  onBack: () => void;
  onSave: (config: SmartLockConfiguration) => void;
}

interface LockConfig {
  lockId: string;
  quantity: number;
  roomNumbers: string;
  accessMethods: string[];
  customizations: {
    autoLockDelay: number;
    guestCodeExpiry: number;
    tamperAlerts: boolean;
    auditLogging: boolean;
    customBranding: boolean;
  };
}

export function SmartLockConfigurationPanel({ 
  selectedLocks, 
  onBack, 
  onSave 
}: SmartLockConfigurationPanelProps) {
  const [configurations, setConfigurations] = useState<LockConfig[]>(
    selectedLocks.map(lock => ({
      lockId: lock.id,
      quantity: 1,
      roomNumbers: '',
      accessMethods: lock.accessMethods,
      customizations: {
        autoLockDelay: 30,
        guestCodeExpiry: 24,
        tamperAlerts: true,
        auditLogging: true,
        customBranding: false
      }
    }))
  );

  const updateConfiguration = (lockId: string, updates: Partial<LockConfig>) => {
    setConfigurations(prev => 
      prev.map(config => 
        config.lockId === lockId 
          ? { ...config, ...updates }
          : config
      )
    );
  };

  const updateCustomizations = (lockId: string, customizations: Partial<LockConfig['customizations']>) => {
    setConfigurations(prev => 
      prev.map(config => 
        config.lockId === lockId 
          ? { ...config, customizations: { ...config.customizations, ...customizations } }
          : config
      )
    );
  };

  const handleSave = () => {
    const totalPrice = configurations.reduce((sum, config) => {
      const lock = selectedLocks.find(l => l.id === config.lockId);
      return sum + (lock?.price || 0) * config.quantity;
    }, 0);

    const smartLockConfig: SmartLockConfiguration = {
      selectedOptions: selectedLocks,
      totalPrice,
      configurations
    };

    onSave(smartLockConfig);
  };

  const totalPrice = configurations.reduce((sum, config) => {
    const lock = selectedLocks.find(l => l.id === config.lockId);
    return sum + (lock?.price || 0) * config.quantity;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configure Your Smart Locks</h2>
          <p className="text-gray-600">Customize your selected smart locks for your property</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to Catalog
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Forms */}
        <div className="lg:col-span-2 space-y-6">
          {configurations.map((config) => {
            const lock = selectedLocks.find(l => l.id === config.lockId);
            if (!lock) return null;

            return (
              <Card key={config.lockId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {lock.name}
                    <div className="text-lg font-bold text-primary">
                      {formatCurrency(lock.price)}
                    </div>
                  </CardTitle>
                  <CardDescription>{lock.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Quantity and Room Assignment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${config.lockId}`}>Quantity</Label>
                      <Input
                        id={`quantity-${config.lockId}`}
                        type="number"
                        min="1"
                        value={config.quantity}
                        onChange={(e) => updateConfiguration(config.lockId, { 
                          quantity: parseInt(e.target.value) || 1 
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`rooms-${config.lockId}`}>Room Numbers</Label>
                      <Input
                        id={`rooms-${config.lockId}`}
                        value={config.roomNumbers}
                        onChange={(e) => updateConfiguration(config.lockId, { 
                          roomNumbers: e.target.value 
                        })}
                        placeholder="e.g., 101-120, 201-240"
                      />
                    </div>
                  </div>

                  {/* Access Methods */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Access Methods</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {lock.accessMethods.map((method) => (
                        <div key={method} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${method}-${config.lockId}`}
                            checked={config.accessMethods.includes(method)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateConfiguration(config.lockId, {
                                  accessMethods: [...config.accessMethods, method]
                                });
                              } else {
                                updateConfiguration(config.lockId, {
                                  accessMethods: config.accessMethods.filter(m => m !== method)
                                });
                              }
                            }}
                          />
                          <Label htmlFor={`${method}-${config.lockId}`} className="capitalize">
                            {method === 'wifi' ? 'WiFi' : method}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">Security Settings</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`autoLock-${config.lockId}`}>Auto-lock Delay (seconds)</Label>
                        <Select 
                          value={config.customizations.autoLockDelay.toString()}
                          onValueChange={(value) => updateCustomizations(config.lockId, { 
                            autoLockDelay: parseInt(value) 
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="60">1 minute</SelectItem>
                            <SelectItem value="120">2 minutes</SelectItem>
                            <SelectItem value="300">5 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`guestExpiry-${config.lockId}`}>Guest Code Expiry (hours)</Label>
                        <Select 
                          value={config.customizations.guestCodeExpiry.toString()}
                          onValueChange={(value) => updateCustomizations(config.lockId, { 
                            guestCodeExpiry: parseInt(value) 
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 hour</SelectItem>
                            <SelectItem value="6">6 hours</SelectItem>
                            <SelectItem value="12">12 hours</SelectItem>
                            <SelectItem value="24">24 hours</SelectItem>
                            <SelectItem value="72">3 days</SelectItem>
                            <SelectItem value="168">1 week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`tamper-${config.lockId}`}
                          checked={config.customizations.tamperAlerts}
                          onCheckedChange={(checked) => updateCustomizations(config.lockId, { 
                            tamperAlerts: checked as boolean 
                          })}
                        />
                        <Label htmlFor={`tamper-${config.lockId}`}>
                          Tamper Detection Alerts
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`audit-${config.lockId}`}
                          checked={config.customizations.auditLogging}
                          onCheckedChange={(checked) => updateCustomizations(config.lockId, { 
                            auditLogging: checked as boolean 
                          })}
                        />
                        <Label htmlFor={`audit-${config.lockId}`}>
                          Comprehensive Audit Logging
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`branding-${config.lockId}`}
                          checked={config.customizations.customBranding}
                          onCheckedChange={(checked) => updateCustomizations(config.lockId, { 
                            customBranding: checked as boolean 
                          })}
                        />
                        <Label htmlFor={`branding-${config.lockId}`}>
                          Custom Branding ($50 per lock)
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {configurations.map((config) => {
                const lock = selectedLocks.find(l => l.id === config.lockId);
                if (!lock) return null;

                const itemTotal = lock.price * config.quantity;
                const customizationCost = config.customizations.customBranding ? 50 : 0;
                const totalWithCustomizations = (itemTotal + customizationCost) * config.quantity;

                return (
                  <div key={config.lockId} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{lock.name}</div>
                        <div className="text-sm text-gray-600">
                          Qty: {config.quantity} × {formatCurrency(lock.price)}
                        </div>
                        {config.roomNumbers && (
                          <div className="text-sm text-gray-500">
                            Rooms: {config.roomNumbers}
                          </div>
                        )}
                        <div className="text-sm text-gray-500">
                          Access: {config.accessMethods.join(', ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(totalWithCustomizations)}</div>
                        {customizationCost > 0 && (
                          <div className="text-xs text-gray-500">
                            +{formatCurrency(customizationCost)} customizations
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={handleSave} size="lg" className="w-full">
              Save Configuration
            </Button>
            <Button variant="outline" onClick={onBack} className="w-full">
              Back to Catalog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
