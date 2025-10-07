'use client';

import { useState } from 'react';
import { useConfigurationStore } from '@/store/useConfigurationStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GuestManagementStep } from './short-term-rental/GuestManagementStep';
import { CleaningSchedulingStep } from './short-term-rental/CleaningSchedulingStep';
import { BookingIntegrationStep } from './short-term-rental/BookingIntegrationStep';
import { ProgressIndicator } from './ProgressIndicator';

const steps = [
  { id: 1, title: 'Guest Management', description: 'Configure guest experience and policies' },
  { id: 2, title: 'Cleaning & Maintenance', description: 'Set up cleaning and maintenance schedules' },
  { id: 3, title: 'Booking Integration', description: 'Connect to booking platforms and pricing' },
  { id: 4, title: 'Review', description: 'Review your short-term rental configuration' },
];

export function ShortTermRentalWizard() {
  const { stepProgress, setCurrentStep, completeStep } = useConfigurationStore();
  const [currentWizardStep, setCurrentWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    guestManagement: {},
    cleaningScheduling: {},
    bookingIntegration: {},
  });

  const totalSteps = steps.length;

  const handleNext = () => {
    if (currentWizardStep < totalSteps) {
      setCurrentWizardStep(prev => prev + 1);
    } else {
      // Complete the wizard and navigate to next main step
      completeStep(stepProgress.currentStep);
      setCurrentStep(stepProgress.currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentWizardStep > 1) {
      setCurrentWizardStep(prev => prev - 1);
    } else {
      // Go back to previous main step
      setCurrentStep(stepProgress.currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    if (step <= currentWizardStep) {
      setCurrentWizardStep(step);
    }
  };

  const updateWizardData = (section: string, data: any) => {
    setWizardData(prev => ({ ...prev, [section]: data }));
  };

  const renderStepContent = () => {
    switch (currentWizardStep) {
      case 1:
        return (
          <GuestManagementStep
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <CleaningSchedulingStep
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <BookingIntegrationStep
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Review Short-Term Rental Configuration</h2>
              <p className="text-gray-600">Review your configuration before proceeding</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Guest Management</CardTitle>
                  <CardDescription>Guest policies and communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Auto Check-in:</span>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>ID Verification:</span>
                      <Badge variant="outline">Required</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Guest Communication:</span>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cleaning & Maintenance</CardTitle>
                  <CardDescription>Scheduling and quality control</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Professional Cleaners:</span>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Auto Scheduling:</span>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality Control:</span>
                      <Badge variant="outline">Photos Required</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Integration</CardTitle>
                  <CardDescription>Platform connections and pricing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Connected Platforms:</span>
                      <Badge variant="outline">3 Platforms</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Dynamic Pricing:</span>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Calendar Sync:</span>
                      <Badge variant="outline">Auto Sync</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between pt-6">
              <button
                onClick={handlePrevious}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Complete Configuration
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <ProgressIndicator
        steps={steps}
        currentStep={currentWizardStep}
        completedSteps={[]}
        onStepClick={handleStepClick}
      />

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentWizardStep - 1]?.title}</CardTitle>
          <CardDescription>{steps[currentWizardStep - 1]?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
}
