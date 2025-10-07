'use client';

import { useState } from 'react';
import { PropertySetupForm } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ShortTermRentalStepProps {
  data: PropertySetupForm;
  onChange: (updates: Partial<PropertySetupForm>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const bookingPlatforms = [
  { value: 'airbnb', label: 'Airbnb', description: 'World\'s largest short-term rental platform' },
  { value: 'vrbo', label: 'VRBO', description: 'Vacation rental by owner platform' },
  { value: 'booking_com', label: 'Booking.com', description: 'Global travel platform' },
  { value: 'expedia', label: 'Expedia', description: 'Online travel agency' },
  { value: 'homeaway', label: 'HomeAway', description: 'Vacation rental marketplace' },
  { value: 'tripadvisor', label: 'TripAdvisor', description: 'Travel review platform' },
  { value: 'direct', label: 'Direct Booking', description: 'Direct website bookings' },
];

const amenities = [
  { id: 'hasKitchen', label: 'Full Kitchen', description: 'Complete kitchen with appliances' },
  { id: 'hasParking', label: 'Parking', description: 'On-site parking available' },
  { id: 'hasWiFi', label: 'WiFi', description: 'High-speed internet access' },
  { id: 'hasPool', label: 'Pool', description: 'Swimming pool access' },
  { id: 'hasGym', label: 'Gym/Fitness', description: 'Fitness center or equipment' },
  { id: 'hasSpa', label: 'Spa/Wellness', description: 'Spa or wellness facilities' },
  { id: 'hasRestaurant', label: 'Restaurant', description: 'On-site dining' },
  { id: 'hasBar', label: 'Bar/Lounge', description: 'Bar or lounge area' },
  { id: 'hasConcierge', label: 'Concierge', description: 'Concierge services' },
  { id: 'hasRoomService', label: 'Room Service', description: 'In-room dining service' },
  { id: 'hasLaundry', label: 'Laundry', description: 'Laundry facilities or service' },
  { id: 'hasBusinessCenter', label: 'Business Center', description: 'Business facilities' },
  { id: 'hasConferenceRooms', label: 'Conference Rooms', description: 'Meeting spaces' },
  { id: 'hasValet', label: 'Valet Service', description: 'Valet parking service' },
  { id: 'hasElevator', label: 'Elevator', description: 'Elevator access' },
  { id: 'hasAccessibility', label: 'Accessibility', description: 'ADA compliant features' },
  { id: 'hasSecurity', label: 'Security', description: 'Security systems' },
  { id: 'hasCCTV', label: 'CCTV', description: 'Security cameras' },
  { id: 'hasFireSafety', label: 'Fire Safety', description: 'Fire safety systems' },
];

export function ShortTermRentalStep({ data, onChange, onNext, onPrevious }: ShortTermRentalStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.maxGuests || data.maxGuests <= 0) {
      newErrors.maxGuests = 'Maximum guests is required';
    }

    if (!data.bedrooms || data.bedrooms <= 0) {
      newErrors.bedrooms = 'Number of bedrooms is required';
    }

    if (!data.bathrooms || data.bathrooms <= 0) {
      newErrors.bathrooms = 'Number of bathrooms is required';
    }

    if (!data.checkInTime) {
      newErrors.checkInTime = 'Check-in time is required';
    }

    if (!data.checkOutTime) {
      newErrors.checkOutTime = 'Check-out time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    onChange({ [amenityId]: checked });
  };

  const handleBookingPlatformChange = (platforms: string[]) => {
    onChange({ bookingPlatforms: platforms });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Short-Term Rental Details</h2>
        <p className="text-gray-600">Tell us about your rental property specifics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maximum Guests */}
        <div className="space-y-2">
          <Label htmlFor="maxGuests">Maximum Guests *</Label>
          <Input
            id="maxGuests"
            type="number"
            min="1"
            value={data.maxGuests || ''}
            onChange={(e) => onChange({ maxGuests: parseInt(e.target.value) || 0 })}
            placeholder="Enter maximum guests"
            className={errors.maxGuests ? 'border-red-500' : ''}
          />
          {errors.maxGuests && <p className="text-sm text-red-500">{errors.maxGuests}</p>}
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Number of Bedrooms *</Label>
          <Input
            id="bedrooms"
            type="number"
            min="1"
            value={data.bedrooms || ''}
            onChange={(e) => onChange({ bedrooms: parseInt(e.target.value) || 0 })}
            placeholder="Enter number of bedrooms"
            className={errors.bedrooms ? 'border-red-500' : ''}
          />
          {errors.bedrooms && <p className="text-sm text-red-500">{errors.bedrooms}</p>}
        </div>

        {/* Bathrooms */}
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Number of Bathrooms *</Label>
          <Input
            id="bathrooms"
            type="number"
            min="1"
            step="0.5"
            value={data.bathrooms || ''}
            onChange={(e) => onChange({ bathrooms: parseFloat(e.target.value) || 0 })}
            placeholder="Enter number of bathrooms"
            className={errors.bathrooms ? 'border-red-500' : ''}
          />
          {errors.bathrooms && <p className="text-sm text-red-500">{errors.bathrooms}</p>}
        </div>

        {/* Property Size */}
        <div className="space-y-2">
          <Label htmlFor="propertySize">Property Size (sq ft)</Label>
          <Input
            id="propertySize"
            type="number"
            min="1"
            value={data.propertySize || ''}
            onChange={(e) => onChange({ propertySize: parseInt(e.target.value) || 0 })}
            placeholder="Enter property size in square feet"
          />
        </div>

        {/* Check-in Time */}
        <div className="space-y-2">
          <Label htmlFor="checkInTime">Check-in Time *</Label>
          <Input
            id="checkInTime"
            type="time"
            value={data.checkInTime || ''}
            onChange={(e) => onChange({ checkInTime: e.target.value })}
            className={errors.checkInTime ? 'border-red-500' : ''}
          />
          {errors.checkInTime && <p className="text-sm text-red-500">{errors.checkInTime}</p>}
        </div>

        {/* Check-out Time */}
        <div className="space-y-2">
          <Label htmlFor="checkOutTime">Check-out Time *</Label>
          <Input
            id="checkOutTime"
            type="time"
            value={data.checkOutTime || ''}
            onChange={(e) => onChange({ checkOutTime: e.target.value })}
            className={errors.checkOutTime ? 'border-red-500' : ''}
          />
          {errors.checkOutTime && <p className="text-sm text-red-500">{errors.checkOutTime}</p>}
        </div>
      </div>

      {/* Booking Platforms */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Platforms</CardTitle>
          <CardDescription>Select which platforms you use for bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookingPlatforms.map((platform) => (
              <div key={platform.value} className="flex items-center space-x-2">
                <Checkbox
                  id={platform.value}
                  checked={data.bookingPlatforms?.includes(platform.value) || false}
                  onCheckedChange={(checked) => {
                    const currentPlatforms = data.bookingPlatforms || [];
                    if (checked) {
                      handleBookingPlatformChange([...currentPlatforms, platform.value]);
                    } else {
                      handleBookingPlatformChange(currentPlatforms.filter(p => p !== platform.value));
                    }
                  }}
                />
                <Label htmlFor={platform.value} className="flex-1">
                  <div className="font-medium">{platform.label}</div>
                  <div className="text-sm text-gray-500">{platform.description}</div>
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Property Amenities</CardTitle>
          <CardDescription>Select all amenities available at your property</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={data[amenity.id as keyof PropertySetupForm] as boolean || false}
                  onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                />
                <Label htmlFor={amenity.id} className="flex-1">
                  <div className="font-medium">{amenity.label}</div>
                  <div className="text-sm text-gray-500">{amenity.description}</div>
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
