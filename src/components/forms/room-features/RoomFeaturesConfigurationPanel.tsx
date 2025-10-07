'use client';

import { useState } from 'react';
import { RoomFeatureOption, RoomFeaturesConfiguration } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/utils';

interface RoomFeaturesConfigurationPanelProps {
  selectedFeatures: RoomFeatureOption[];
  onBack: () => void;
  onSave: (config: RoomFeaturesConfiguration) => void;
}

interface FeatureConfig {
  featureId: string;
  quantity: number;
  roomNumbers: string;
  customizations: {
    automation: boolean;
    scheduling: boolean;
    voiceControl: boolean;
    mobileApp: boolean;
    energyMonitoring: boolean;
    customBranding: boolean;
  };
}

export function RoomFeaturesConfigurationPanel({ 
  selectedFeatures, 
  onBack, 
  onSave 
}: RoomFeaturesConfigurationPanelProps) {
  const [configurations, setConfigurations] = useState<FeatureConfig[]>(
    selectedFeatures.map(feature => ({
      featureId: feature.id,
      quantity: 1,
      roomNumbers: '',
      customizations: {
        automation: true,
        scheduling: true,
        voiceControl: true,
        mobileApp: true,
        energyMonitoring: false,
        customBranding: false
      }
    }))
  );

  const updateConfiguration = (featureId: string, updates: Partial<FeatureConfig>) => {
    setConfigurations(prev => 
      prev.map(config => 
        config.featureId === featureId 
          ? { ...config, ...updates }
          : config
      )
    );
  };

  const updateCustomizations = (featureId: string, customizations: Partial<FeatureConfig['customizations']>) => {
    setConfigurations(prev => 
      prev.map(config => 
        config.featureId === featureId 
          ? { ...config, customizations: { ...config.customizations, ...customizations } }
          : config
      )
    );
  };

  const handleSave = () => {
    const totalPrice = configurations.reduce((sum, config) => {
      const feature = selectedFeatures.find(f => f.id === config.featureId);
      let basePrice = feature?.price || 0;
      
      // Add customization costs
      if (config.customizations.energyMonitoring) basePrice += 10;
      if (config.customizations.customBranding) basePrice += 25;
      
      return sum + basePrice * config.quantity;
    }, 0);

    const roomFeaturesConfig: RoomFeaturesConfiguration = {
      selectedOptions: selectedFeatures,
      totalPrice
    };

    onSave(roomFeaturesConfig);
  };

  const totalPrice = configurations.reduce((sum, config) => {
    const feature = selectedFeatures.find(f => f.id === config.featureId);
    let basePrice = feature?.price || 0;
    
    // Add customization costs
    if (config.customizations.energyMonitoring) basePrice += 10;
    if (config.customizations.customBranding) basePrice += 25;
    
    return sum + basePrice * config.quantity;
  }, 0);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configure Your Room Features</h2>
          <p className="text-gray-600">Customize your selected room automation features</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to Catalog
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Forms */}
        <div className="lg:col-span-2 space-y-6">
          {configurations.map((config) => {
            const feature = selectedFeatures.find(f => f.id === config.featureId);
            if (!feature) return null;

            return (
              <Card key={config.featureId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{getCategoryIcon(feature.category)}</span>
                      <span>{feature.name}</span>
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {formatCurrency(feature.price)}
                    </div>
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Quantity and Room Assignment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${config.featureId}`}>Quantity</Label>
                      <Input
                        id={`quantity-${config.featureId}`}
                        type="number"
                        min="1"
                        value={config.quantity}
                        onChange={(e) => updateConfiguration(config.featureId, { 
                          quantity: parseInt(e.target.value) || 1 
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`rooms-${config.featureId}`}>Room Numbers</Label>
                      <Input
                        id={`rooms-${config.featureId}`}
                        value={config.roomNumbers}
                        onChange={(e) => updateConfiguration(config.featureId, { 
                          roomNumbers: e.target.value 
                        })}
                        placeholder="e.g., 101-120, 201-240"
                      />
                    </div>
                  </div>

                  {/* Feature-Specific Configuration */}
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">Feature Configuration</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`automation-${config.featureId}`}
                            checked={config.customizations.automation}
                            onCheckedChange={(checked) => updateCustomizations(config.featureId, { 
                              automation: checked as boolean 
                            })}
                          />
                          <Label htmlFor={`automation-${config.featureId}`}>
                            Smart Automation
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`scheduling-${config.featureId}`}
                            checked={config.customizations.scheduling}
                            onCheckedChange={(checked) => updateCustomizations(config.featureId, { 
                              scheduling: checked as boolean 
                            })}
                          />
                          <Label htmlFor={`scheduling-${config.featureId}`}>
                            Scheduling & Timers
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`voice-${config.featureId}`}
                            checked={config.customizations.voiceControl}
                            onCheckedChange={(checked) => updateCustomizations(config.featureId, { 
                              voiceControl: checked as boolean 
                            })}
                          />
                          <Label htmlFor={`voice-${config.featureId}`}>
                            Voice Control
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-${config.featureId}`}
                            checked={config.customizations.mobileApp}
                            onCheckedChange={(checked) => updateCustomizations(config.featureId, { 
                              mobileApp: checked as boolean 
                            })}
                          />
                          <Label htmlFor={`mobile-${config.featureId}`}>
                            Mobile App Control
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`energy-${config.featureId}`}
                            checked={config.customizations.energyMonitoring}
                            onCheckedChange={(checked) => updateCustomizations(config.featureId, { 
                              energyMonitoring: checked as boolean 
                            })}
                          />
                          <Label htmlFor={`energy-${config.featureId}`}>
                            Energy Monitoring (+$10)
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`branding-${config.featureId}`}
                            checked={config.customizations.customBranding}
                            onCheckedChange={(checked) => updateCustomizations(config.featureId, { 
                              customBranding: checked as boolean 
                            })}
                          />
                          <Label htmlFor={`branding-${config.featureId}`}>
                            Custom Branding (+$25)
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category-Specific Options */}
                  {feature.category === 'thermostat' && (
                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="font-medium">Thermostat Settings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Default Temperature</Label>
                          <Select defaultValue="72">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="68">68°F (20°C)</SelectItem>
                              <SelectItem value="70">70°F (21°C)</SelectItem>
                              <SelectItem value="72">72°F (22°C)</SelectItem>
                              <SelectItem value="74">74°F (23°C)</SelectItem>
                              <SelectItem value="76">76°F (24°C)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Energy Saving Mode</Label>
                          <Select defaultValue="auto">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Auto</SelectItem>
                              <SelectItem value="eco">Eco Mode</SelectItem>
                              <SelectItem value="comfort">Comfort Mode</SelectItem>
                              <SelectItem value="off">Off</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {feature.category === 'lighting' && (
                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="font-medium">Lighting Settings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Default Brightness</Label>
                          <Select defaultValue="80">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="25">25%</SelectItem>
                              <SelectItem value="50">50%</SelectItem>
                              <SelectItem value="75">75%</SelectItem>
                              <SelectItem value="80">80%</SelectItem>
                              <SelectItem value="100">100%</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Color Temperature</Label>
                          <Select defaultValue="warm">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="warm">Warm (2700K)</SelectItem>
                              <SelectItem value="neutral">Neutral (4000K)</SelectItem>
                              <SelectItem value="cool">Cool (6500K)</SelectItem>
                              <SelectItem value="auto">Auto Adjust</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {feature.category === 'security' && (
                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="font-medium">Security Settings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Privacy Mode</Label>
                          <Select defaultValue="guest">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="guest">Guest Privacy</SelectItem>
                              <SelectItem value="staff">Staff Access</SelectItem>
                              <SelectItem value="management">Management Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Recording Quality</Label>
                          <Select defaultValue="hd">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sd">SD (720p)</SelectItem>
                              <SelectItem value="hd">HD (1080p)</SelectItem>
                              <SelectItem value="4k">4K (2160p)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
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
                const feature = selectedFeatures.find(f => f.id === config.featureId);
                if (!feature) return null;

                let itemTotal = feature.price * config.quantity;
                const customizationCost = (config.customizations.energyMonitoring ? 10 : 0) + 
                                        (config.customizations.customBranding ? 25 : 0);
                const totalWithCustomizations = (itemTotal + customizationCost) * config.quantity;

                return (
                  <div key={config.featureId} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium flex items-center space-x-2">
                          <span>{getCategoryIcon(feature.category)}</span>
                          <span>{feature.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Qty: {config.quantity} × {formatCurrency(feature.price)}
                        </div>
                        {config.roomNumbers && (
                          <div className="text-sm text-gray-500">
                            Rooms: {config.roomNumbers}
                          </div>
                        )}
                        <div className="text-sm text-gray-500">
                          Features: {Object.entries(config.customizations)
                            .filter(([_, enabled]) => enabled)
                            .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
                            .join(', ')}
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
