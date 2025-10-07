'use client';

import { useState } from 'react';
import { useConfigurationStore } from '@/store/useConfigurationStore';
import { KioskOption, KioskConfiguration } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KioskCatalog } from './kiosk/KioskCatalog';
import { KioskConfigurationPanel } from './kiosk/KioskConfigurationPanel';
import { KioskSummary } from './kiosk/KioskSummary';

export function KioskSelectionWizard() {
  const { updateKioskConfig } = useConfigurationStore();
  const [selectedKiosks, setSelectedKiosks] = useState<KioskOption[]>([]);
  const [currentStep, setCurrentStep] = useState<'catalog' | 'configure' | 'summary'>('catalog');

  const handleKioskSelect = (kiosk: KioskOption) => {
    setSelectedKiosks(prev => {
      const isSelected = prev.some(k => k.id === kiosk.id);
      if (isSelected) {
        return prev.filter(k => k.id !== kiosk.id);
      } else {
        return [...prev, kiosk];
      }
    });
  };

  const handleConfigure = () => {
    setCurrentStep('configure');
  };

  const handleBackToCatalog = () => {
    setCurrentStep('catalog');
  };

  const handleSaveConfiguration = (config: KioskConfiguration) => {
    updateKioskConfig(config);
    setCurrentStep('summary');
  };

  const handleContinueToLocks = () => {
    // This would navigate to the smart lock configuration
    console.log('Proceeding to smart lock configuration...');
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
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'catalog' ? 'bg-primary text-white' : 
            currentStep === 'configure' || currentStep === 'summary' ? 'bg-primary text-white' : 
            'bg-gray-200 text-gray-600'
          }`}>
            {currentStep === 'catalog' ? '2' : '✓'}
          </div>
          <span className="text-sm font-medium text-primary">Kiosk Selection</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-200"></div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
            3
          </div>
          <span className="text-sm font-medium text-gray-500">Smart Locks</span>
        </div>
        <div className="w-16 h-0.5 bg-gray-200"></div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
            4
          </div>
          <span className="text-sm font-medium text-gray-500">Room Features</span>
        </div>
      </div>

      {/* Content */}
      {currentStep === 'catalog' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Kiosk Solutions Catalog</h2>
              <p className="text-gray-600">Select the kiosk solutions that best fit your property needs</p>
            </div>
            {selectedKiosks.length > 0 && (
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">
                  {selectedKiosks.length} kiosk{selectedKiosks.length !== 1 ? 's' : ''} selected
                </Badge>
                <Button onClick={handleConfigure} size="lg">
                  Configure Selected ({selectedKiosks.length})
                </Button>
              </div>
            )}
          </div>

          <KioskCatalog 
            selectedKiosks={selectedKiosks}
            onKioskSelect={handleKioskSelect}
          />
        </div>
      )}

      {currentStep === 'configure' && (
        <KioskConfigurationPanel
          selectedKiosks={selectedKiosks}
          onBack={handleBackToCatalog}
          onSave={handleSaveConfiguration}
        />
      )}

      {currentStep === 'summary' && (
        <KioskSummary
          onBack={() => setCurrentStep('configure')}
          onContinue={handleContinueToLocks}
        />
      )}
    </div>
  );
}
