'use client';

import { useState } from 'react';
import { useConfigurationStore } from '@/store/useConfigurationStore';
import { RoomFeatureOption, RoomFeaturesConfiguration } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RoomFeaturesCatalog } from './room-features/RoomFeaturesCatalog';
import { RoomFeaturesConfigurationPanel } from './room-features/RoomFeaturesConfigurationPanel';
import { RoomFeaturesSummary } from './room-features/RoomFeaturesSummary';

export function RoomFeaturesWizard() {
  const { updateRoomFeaturesConfig } = useConfigurationStore();
  const [selectedFeatures, setSelectedFeatures] = useState<RoomFeatureOption[]>([]);
  const [currentStep, setCurrentStep] = useState<'catalog' | 'configure' | 'summary'>('catalog');

  const handleFeatureSelect = (feature: RoomFeatureOption) => {
    setSelectedFeatures(prev => {
      const isSelected = prev.some(f => f.id === feature.id);
      if (isSelected) {
        return prev.filter(f => f.id !== feature.id);
      } else {
        return [...prev, feature];
      }
    });
  };

  const handleConfigure = () => {
    setCurrentStep('configure');
  };

  const handleBackToCatalog = () => {
    setCurrentStep('catalog');
  };

  const handleSaveConfiguration = (config: RoomFeaturesConfiguration) => {
    updateRoomFeaturesConfig(config);
    setCurrentStep('summary');
  };

  const handleCompleteConfiguration = () => {
    // This would navigate to the final checkout/payment page
    console.log('Configuration complete! Proceeding to checkout...');
  };

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            ✓
          </div>
          <span className="text-sm font-medium text-green-600">Property Setup</span>
        </div>
        <div className="w-16 h-0.5 bg-green-500"></div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            ✓
          </div>
          <span className="text-sm font-medium text-green-600">Kiosk Selection</span>
        </div>
        <div className="w-16 h-0.5 bg-green-500"></div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            ✓
          </div>
          <span className="text-sm font-medium text-green-600">Smart Locks</span>
        </div>
        <div className="w-16 h-0.5 bg-green-500"></div>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'catalog' ? 'bg-primary text-white' : 
            currentStep === 'configure' || currentStep === 'summary' ? 'bg-primary text-white' : 
            'bg-gray-200 text-gray-600'
          }`}>
            {currentStep === 'catalog' ? '4' : '✓'}
          </div>
          <span className="text-sm font-medium text-primary">Room Features</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-200"></div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
            5
          </div>
          <span className="text-sm font-medium text-gray-500">Checkout</span>
        </div>
      </div>

      {/* Content */}
      {currentStep === 'catalog' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Smart Room Features</h2>
              <p className="text-gray-600">Select automation features to enhance your guests&apos; experience</p>
            </div>
            {selectedFeatures.length > 0 && (
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">
                  {selectedFeatures.length} feature{selectedFeatures.length !== 1 ? 's' : ''} selected
                </Badge>
                <Button onClick={handleConfigure} size="lg">
                  Configure Selected ({selectedFeatures.length})
                </Button>
              </div>
            )}
          </div>

          <RoomFeaturesCatalog 
            selectedFeatures={selectedFeatures}
            onFeatureSelect={handleFeatureSelect}
          />
        </div>
      )}

      {currentStep === 'configure' && (
        <RoomFeaturesConfigurationPanel
          selectedFeatures={selectedFeatures}
          onBack={handleBackToCatalog}
          onSave={handleSaveConfiguration}
        />
      )}

      {currentStep === 'summary' && (
        <RoomFeaturesSummary
          onBack={() => setCurrentStep('configure')}
          onComplete={handleCompleteConfiguration}
        />
      )}
    </div>
  );
}
