'use client';

import { useState } from 'react';
import { PropertySetupForm, PropertyType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PropertyInfoStepProps {
  data: PropertySetupForm;
  onChange: (updates: Partial<PropertySetupForm>) => void;
  onNext: () => void;
}

const propertyTypes: { value: PropertyType; label: string; description: string; category: 'traditional' | 'short_term' }[] = [
  // Traditional Hospitality
  { value: 'hotel', label: 'Hotel', description: 'Full-service hotel with amenities', category: 'traditional' },
  { value: 'motel', label: 'Motel', description: 'Budget-friendly roadside accommodation', category: 'traditional' },
  { value: 'resort', label: 'Resort', description: 'Luxury resort with extensive facilities', category: 'traditional' },
  { value: 'boutique', label: 'Boutique Hotel', description: 'Small, stylish, unique property', category: 'traditional' },
  { value: 'apartment', label: 'Apartment Hotel', description: 'Extended stay with kitchen facilities', category: 'traditional' },
  { value: 'hostel', label: 'Hostel', description: 'Budget accommodation with shared facilities', category: 'traditional' },
  { value: 'bed_and_breakfast', label: 'Bed & Breakfast', description: 'Small, intimate accommodation', category: 'traditional' },
  { value: 'luxury', label: 'Luxury Hotel', description: 'Premium luxury accommodation', category: 'traditional' },
  
  // Short-Term Rentals
  { value: 'airbnb', label: 'Airbnb Property', description: 'Short-term rental listed on Airbnb', category: 'short_term' },
  { value: 'vrbo', label: 'VRBO Property', description: 'Vacation rental on VRBO platform', category: 'short_term' },
  { value: 'vacation_rental', label: 'Vacation Rental', description: 'Private vacation rental property', category: 'short_term' },
  { value: 'timeshare', label: 'Timeshare', description: 'Shared ownership vacation property', category: 'short_term' },
];

export function PropertyInfoStep({ data, onChange, onNext }: PropertyInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.name.trim()) {
      newErrors.name = 'Property name is required';
    }

    if (!data.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!data.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
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
        {/* Property Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Property Name *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Enter your property name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Property Type *</Label>
          <Select value={data.type} onValueChange={(value: PropertyType) => onChange({ type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              {/* Traditional Hospitality */}
              <div className="px-2 py-1.5 text-sm font-semibold text-gray-500 bg-gray-50">
                Traditional Hospitality
              </div>
              {propertyTypes.filter(type => type.category === 'traditional').map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </SelectItem>
              ))}
              
              {/* Short-Term Rentals */}
              <div className="px-2 py-1.5 text-sm font-semibold text-gray-500 bg-gray-50">
                Short-Term Rentals
              </div>
              {propertyTypes.filter(type => type.category === 'short_term').map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="City, State/Province"
            className={errors.location ? 'border-red-500' : ''}
          />
          {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address">Full Address *</Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Street address"
            className={errors.address ? 'border-red-500' : ''}
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="contact@yourproperty.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button onClick={handleNext} size="lg">
          Next: Property Details
        </Button>
      </div>
    </div>
  );
}
