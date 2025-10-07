'use client';

import { useState } from 'react';
import { KioskOption, KioskConfiguration } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/utils';

interface KioskConfigurationPanelProps {
  selectedKiosks: KioskOption[];
  onBack: () => void;
  onSave: (config: KioskConfiguration) => void;
}

interface KioskConfig {
  kioskId: string;
  quantity: number;
  location: string;
  customizations: {
    language: string;
    branding: boolean;
    customLogo: boolean;
    additionalFeatures: string[];
  };
}

export function KioskConfigurationPanel({ 
  selectedKiosks, 
  onBack, 
  onSave 
}: KioskConfigurationPanelProps) {
  const [configurations, setConfigurations] = useState<KioskConfig[]>(
    selectedKiosks.map(kiosk => ({
      kioskId: kiosk.id,
      quantity: 1,
      location: '',
      customizations: {
        language: 'en',
        branding: false,
        customLogo: false,
        additionalFeatures: []
      }
    }))
  );

  const updateConfiguration = (kioskId: string, updates: Partial<KioskConfig>) => {
    setConfigurations(prev => 
      prev.map(config => 
        config.kioskId === kioskId 
          ? { ...config, ...updates }
          : config
      )
    );
  };

  const updateCustomizations = (kioskId: string, customizations: Partial<KioskConfig['customizations']>) => {
    setConfigurations(prev => 
      prev.map(config => 
        config.kioskId === kioskId 
          ? { ...config, customizations: { ...config.customizations, ...customizations } }
          : config
      )
    );
  };

  const handleSave = () => {
    const totalPrice = configurations.reduce((sum, config) => {
      const kiosk = selectedKiosks.find(k => k.id === config.kioskId);
      return sum + (kiosk?.price || 0) * config.quantity;
    }, 0);

    const kioskConfig: KioskConfiguration = {
      selectedOptions: selectedKiosks,
      totalPrice,
      configurations
    };

    onSave(kioskConfig);
  };

  const totalPrice = configurations.reduce((sum, config) => {
    const kiosk = selectedKiosks.find(k => k.id === config.kioskId);
    return sum + (kiosk?.price || 0) * config.quantity;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configure Your Kiosks</h2>
          <p className="text-gray-600">Customize your selected kiosks for your property</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to Catalog
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Forms */}
        <div className="lg:col-span-2 space-y-6">
          {configurations.map((config) => {
            const kiosk = selectedKiosks.find(k => k.id === config.kioskId);
            if (!kiosk) return null;

            return (
              <Card key={config.kioskId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {kiosk.name}
                    <div className="text-lg font-bold text-primary">
                      {formatCurrency(kiosk.price)}
                    </div>
                  </CardTitle>
                  <CardDescription>{kiosk.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Quantity and Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${config.kioskId}`}>Quantity</Label>
                      <Input
                        id={`quantity-${config.kioskId}`}
                        type="number"
                        min="1"
                        value={config.quantity}
                        onChange={(e) => updateConfiguration(config.kioskId, { 
                          quantity: parseInt(e.target.value) || 1 
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`location-${config.kioskId}`}>Installation Location</Label>
                      <Input
                        id={`location-${config.kioskId}`}
                        value={config.location}
                        onChange={(e) => updateConfiguration(config.kioskId, { 
                          location: e.target.value 
                        })}
                        placeholder="e.g., Front desk, Lobby, Guest services"
                      />
                    </div>
                  </div>

                  {/* Customizations */}
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">Customizations</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`language-${config.kioskId}`}>Primary Language</Label>
                      <Select 
                        value={config.customizations.language}
                        onValueChange={(value) => updateCustomizations(config.kioskId, { language: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                          <SelectItem value="pt">Portuguese</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                          <SelectItem value="ko">Korean</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`branding-${config.kioskId}`}
                          checked={config.customizations.branding}
                          onCheckedChange={(checked) => updateCustomizations(config.kioskId, { 
                            branding: checked as boolean 
                          })}
                        />
                        <Label htmlFor={`branding-${config.kioskId}`}>
                          Custom Branding ($200)
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`logo-${config.kioskId}`}
                          checked={config.customizations.customLogo}
                          onCheckedChange={(checked) => updateCustomizations(config.kioskId, { 
                            customLogo: checked as boolean 
                          })}
                        />
                        <Label htmlFor={`logo-${config.kioskId}`}>
                          Custom Logo Integration ($150)
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
                const kiosk = selectedKiosks.find(k => k.id === config.kioskId);
                if (!kiosk) return null;

                const itemTotal = kiosk.price * config.quantity;
                const customizationCost = 
                  (config.customizations.branding ? 200 : 0) +
                  (config.customizations.customLogo ? 150 : 0);
                const totalWithCustomizations = (itemTotal + customizationCost) * config.quantity;

                return (
                  <div key={config.kioskId} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{kiosk.name}</div>
                        <div className="text-sm text-gray-600">
                          Qty: {config.quantity} × {formatCurrency(kiosk.price)}
                        </div>
                        {config.location && (
                          <div className="text-sm text-gray-500">
                            Location: {config.location}
                          </div>
                        )}
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
