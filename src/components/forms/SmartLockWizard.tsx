'use client';

import { useState } from 'react';
import { useConfigurationStore } from '@/store/useConfigurationStore';
import { SmartLockOption, SmartLockConfiguration } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SmartLockCatalog } from './smart-locks/SmartLockCatalog';
import { SmartLockConfigurationPanel } from './smart-locks/SmartLockConfigurationPanel';
import { SmartLockSummary } from './smart-locks/SmartLockSummary';

export function SmartLockWizard() {
  const { updateSmartLockConfig } = useConfigurationStore();
  const [selectedLocks, setSelectedLocks] = useState<SmartLockOption[]>([]);
  const [currentStep, setCurrentStep] = useState<'catalog' | 'configure' | 'summary'>('catalog');

  const handleLockSelect = (lock: SmartLockOption) => {
    setSelectedLocks(prev => {
      const isSelected = prev.some(l => l.id === lock.id);
      if (isSelected) {
        return prev.filter(l => l.id !== lock.id);
      } else {
        return [...prev, lock];
      }
    });
  };

  const handleConfigure = () => {
    setCurrentStep('configure');
  };

  const handleBackToCatalog = () => {
    setCurrentStep('catalog');
  };

  const handleSaveConfiguration = (config: SmartLockConfiguration) => {
    updateSmartLockConfig(config);
    setCurrentStep('summary');
  };

  const handleContinueToRoomFeatures = () => {
    // This would navigate to the room features configuration
    console.log('Proceeding to room features configuration...');
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
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'catalog' ? 'bg-primary text-white' : 
            currentStep === 'configure' || currentStep === 'summary' ? 'bg-primary text-white' : 
            'bg-gray-200 text-gray-600'
          }`}>
            {currentStep === 'catalog' ? '3' : '✓'}
          </div>
          <span className="text-sm font-medium text-primary">Smart Locks</span>
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
              <h2 className="text-2xl font-bold text-gray-900">Smart Lock Solutions</h2>
              <p className="text-gray-600">Select smart locks that match your security and access requirements</p>
            </div>
            {selectedLocks.length > 0 && (
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">
                  {selectedLocks.length} lock{selectedLocks.length !== 1 ? 's' : ''} selected
                </Badge>
                <Button onClick={handleConfigure} size="lg">
                  Configure Selected ({selectedLocks.length})
                </Button>
              </div>
            )}
          </div>

          <SmartLockCatalog 
            selectedLocks={selectedLocks}
            onLockSelect={handleLockSelect}
          />
        </div>
      )}

      {currentStep === 'configure' && (
        <SmartLockConfigurationPanel
          selectedLocks={selectedLocks}
          onBack={handleBackToCatalog}
          onSave={handleSaveConfiguration}
        />
      )}

      {currentStep === 'summary' && (
        <SmartLockSummary
          onBack={() => setCurrentStep('configure')}
          onContinue={handleContinueToRoomFeatures}
        />
      )}
    </div>
  );
}
