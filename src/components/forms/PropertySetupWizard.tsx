'use client';

import { useState } from 'react';
import { useConfigurationStore } from '@/store/useConfigurationStore';
import { PropertySetupForm } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyInfoStep } from './steps/PropertyInfoStep';
import { PropertyDetailsStep } from './steps/PropertyDetailsStep';
import { ShortTermRentalStep } from './steps/ShortTermRentalStep';
import { PropertyRequirementsStep } from './steps/PropertyRequirementsStep';
import { PropertyReviewStep } from './steps/PropertyReviewStep';
import { ProgressIndicator } from './ProgressIndicator';

const steps = [
  { id: 1, title: 'Property Information', description: 'Basic property details' },
  { id: 2, title: 'Property Details', description: 'Room count and layout' },
  { id: 3, title: 'Short-Term Rental Details', description: 'Rental-specific information', conditional: true },
  { id: 4, title: 'Requirements', description: 'Specific needs and preferences' },
  { id: 5, title: 'Review', description: 'Confirm your configuration' },
];

export function PropertySetupWizard() {
  const { stepProgress, setCurrentStep, completeStep } = useConfigurationStore();
  const [formData, setFormData] = useState<PropertySetupForm>({
    name: '',
    type: 'hotel',
    rooms: 0,
    floors: 0,
    location: '',
    address: '',
    phone: '',
    email: '',
  });

  const currentStep = stepProgress.currentStep;
  
  // Determine if short-term rental step should be shown
  const isShortTermRental = ['airbnb', 'vrbo', 'vacation_rental', 'timeshare'].includes(formData.type);
  const visibleSteps = steps.filter(step => !step.conditional || (step.conditional && isShortTermRental));
  const totalSteps = visibleSteps.length;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      completeStep(currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep || stepProgress.completedSteps.includes(step - 1)) {
      setCurrentStep(step);
    }
  };

  const updateFormData = (updates: Partial<PropertySetupForm>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    // Map current step to actual step based on conditional logic
    const actualStep = isShortTermRental ? currentStep : (currentStep > 2 ? currentStep + 1 : currentStep);
    
    switch (actualStep) {
      case 1:
        return (
          <PropertyInfoStep
            data={formData}
            onChange={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <PropertyDetailsStep
            data={formData}
            onChange={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        if (isShortTermRental) {
          return (
            <ShortTermRentalStep
              data={formData}
              onChange={updateFormData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          );
        } else {
          return (
            <PropertyRequirementsStep
              data={formData}
              onChange={updateFormData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          );
        }
      case 4:
        if (isShortTermRental) {
          return (
            <PropertyRequirementsStep
              data={formData}
              onChange={updateFormData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          );
        } else {
          return (
            <PropertyReviewStep
              data={formData}
              onPrevious={handlePrevious}
            />
          );
        }
      case 5:
        return (
          <PropertyReviewStep
            data={formData}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <ProgressIndicator
        steps={visibleSteps}
        currentStep={currentStep}
        completedSteps={stepProgress.completedSteps}
        onStepClick={handleStepClick}
      />

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{visibleSteps[currentStep - 1]?.title}</CardTitle>
          <CardDescription>{visibleSteps[currentStep - 1]?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
}
