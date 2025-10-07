'use client';

import { useState } from 'react';
import { PropertySetupForm } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface PropertyRequirementsStepProps {
  data: PropertySetupForm;
  onChange: (updates: Partial<PropertySetupForm>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface ExtendedPropertySetupForm extends PropertySetupForm {
  requirements?: Requirements;
  additionalNotes?: string;
}

interface Requirements {
  selfCheckIn: boolean;
  mobileAccess: boolean;
  biometricAccess: boolean;
  roomAutomation: boolean;
  energyEfficiency: boolean;
  securityMonitoring: boolean;
  guestAnalytics: boolean;
  multiLanguage: boolean;
}

export function PropertyRequirementsStep({ onChange, onNext, onPrevious }: PropertyRequirementsStepProps) {
  const [requirements, setRequirements] = useState<Requirements>({
    selfCheckIn: false,
    mobileAccess: false,
    biometricAccess: false,
    roomAutomation: false,
    energyEfficiency: false,
    securityMonitoring: false,
    guestAnalytics: false,
    multiLanguage: false,
  });

  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleRequirementChange = (key: keyof Requirements, checked: boolean) => {
    setRequirements(prev => ({ ...prev, [key]: checked }));
  };

  const handleNext = () => {
    // Store requirements in form data (you might want to extend the PropertySetupForm type)
    onChange({ 
      // Add requirements to form data as needed
    } as Partial<ExtendedPropertySetupForm>);
    onNext();
  };

  const requirementOptions = [
    {
      key: 'selfCheckIn' as keyof Requirements,
      title: 'Self Check-in/Check-out',
      description: 'Allow guests to check in and out without front desk assistance',
      icon: '🏨',
    },
    {
      key: 'mobileAccess' as keyof Requirements,
      title: 'Mobile App Access',
      description: 'Guests can use their smartphones to access rooms and services',
      icon: '📱',
    },
    {
      key: 'biometricAccess' as keyof Requirements,
      title: 'Biometric Access',
      description: 'Fingerprint or facial recognition for secure room access',
      icon: '👆',
    },
    {
      key: 'roomAutomation' as keyof Requirements,
      title: 'Smart Room Automation',
      description: 'Automated lighting, climate control, and room features',
      icon: '🏠',
    },
    {
      key: 'energyEfficiency' as keyof Requirements,
      title: 'Energy Efficiency',
      description: 'Smart systems to reduce energy consumption and costs',
      icon: '⚡',
    },
    {
      key: 'securityMonitoring' as keyof Requirements,
      title: 'Security Monitoring',
      description: 'Advanced security systems and monitoring capabilities',
      icon: '🔒',
    },
    {
      key: 'guestAnalytics' as keyof Requirements,
      title: 'Guest Analytics',
      description: 'Track guest preferences and behavior for better service',
      icon: '📊',
    },
    {
      key: 'multiLanguage' as keyof Requirements,
      title: 'Multi-language Support',
      description: 'Support for multiple languages in kiosks and interfaces',
      icon: '🌍',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Your Smart Technology Requirements</h3>
        <p className="text-gray-600 mb-6">
          Choose the features that are most important for your property. This helps us recommend the best solutions for your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requirementOptions.map((option) => (
          <div key={option.key} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
            <Checkbox
              id={option.key}
              checked={requirements[option.key]}
              onCheckedChange={(checked) => handleRequirementChange(option.key, checked as boolean)}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{option.icon}</span>
                <Label htmlFor={option.key} className="font-medium cursor-pointer">
                  {option.title}
                </Label>
              </div>
              <p className="text-sm text-gray-600 mt-1">{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Requirements or Notes</Label>
        <Textarea
          id="additionalNotes"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Any specific requirements, constraints, or questions you'd like us to consider..."
          rows={4}
        />
        <p className="text-sm text-gray-500">
          Optional: Share any specific needs, budget constraints, or questions about implementation.
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleNext} size="lg">
          Review Configuration
        </Button>
      </div>
    </div>
  );
}
