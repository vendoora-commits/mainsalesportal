'use client';

import { useState } from 'react';
import { PropertySetupForm } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PropertyDetailsStepProps {
  data: PropertySetupForm;
  onChange: (updates: Partial<PropertySetupForm>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function PropertyDetailsStep({ data, onChange, onNext, onPrevious }: PropertyDetailsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (data.rooms <= 0) {
      newErrors.rooms = 'Number of rooms must be greater than 0';
    }

    if (data.floors <= 0) {
      newErrors.floors = 'Number of floors must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Number of Rooms */}
        <div className="space-y-2">
          <Label htmlFor="rooms">Number of Rooms *</Label>
          <Input
            id="rooms"
            type="number"
            min="1"
            value={data.rooms || ''}
            onChange={(e) => onChange({ rooms: parseInt(e.target.value) || 0 })}
            placeholder="Enter number of rooms"
            className={errors.rooms ? 'border-red-500' : ''}
          />
          {errors.rooms && <p className="text-sm text-red-500">{errors.rooms}</p>}
          <p className="text-sm text-gray-500">
            Total number of guest rooms in your property
          </p>
        </div>

        {/* Number of Floors */}
        <div className="space-y-2">
          <Label htmlFor="floors">Number of Floors *</Label>
          <Input
            id="floors"
            type="number"
            min="1"
            value={data.floors || ''}
            onChange={(e) => onChange({ floors: parseInt(e.target.value) || 0 })}
            placeholder="Enter number of floors"
            className={errors.floors ? 'border-red-500' : ''}
          />
          {errors.floors && <p className="text-sm text-red-500">{errors.floors}</p>}
          <p className="text-sm text-gray-500">
            Total number of floors in your property
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Property Layout Information</h3>
        <p className="text-sm text-blue-700">
          This information helps us recommend the best smart technology solutions for your property size and layout.
          We&apos;ll use this to calculate optimal kiosk placement, smart lock distribution, and room automation coverage.
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleNext} size="lg">
          Next: Requirements
        </Button>
      </div>
    </div>
  );
}
