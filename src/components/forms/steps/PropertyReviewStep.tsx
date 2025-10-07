'use client';

import { PropertySetupForm } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PropertyReviewStepProps {
  data: PropertySetupForm;
  onPrevious: () => void;
}

const propertyTypeLabels: Record<string, string> = {
  hotel: 'Hotel',
  motel: 'Motel',
  resort: 'Resort',
  boutique: 'Boutique Hotel',
  apartment: 'Apartment Hotel',
  hostel: 'Hostel',
  bed_and_breakfast: 'Bed & Breakfast',
};

export function PropertyReviewStep({ data, onPrevious }: PropertyReviewStepProps) {
  const handleSubmit = () => {
    // Here you would typically save the configuration and proceed to the next step
    console.log('Submitting property configuration:', data);
    // For now, we'll just show an alert
    alert('Configuration saved! This would proceed to kiosk selection.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Review Your Property Configuration</h3>
        <p className="text-gray-600">
          Please review your property information before proceeding to product selection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
            <CardDescription>Property details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Property Name:</span>
              <p className="text-gray-600">{data.name}</p>
            </div>
            <div>
              <span className="font-medium">Property Type:</span>
              <Badge variant="secondary" className="ml-2">
                {propertyTypeLabels[data.type] || data.type}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Location:</span>
              <p className="text-gray-600">{data.location}</p>
            </div>
            <div>
              <span className="font-medium">Address:</span>
              <p className="text-gray-600">{data.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
            <CardDescription>How to reach your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Phone:</span>
              <p className="text-gray-600">{data.phone}</p>
            </div>
            <div>
              <span className="font-medium">Email:</span>
              <p className="text-gray-600">{data.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Property Details</CardTitle>
            <CardDescription>Size and layout information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Number of Rooms:</span>
              <p className="text-gray-600">{data.rooms} rooms</p>
            </div>
            <div>
              <span className="font-medium">Number of Floors:</span>
              <p className="text-gray-600">{data.floors} floors</p>
            </div>
            <div>
              <span className="font-medium">Average Rooms per Floor:</span>
              <p className="text-gray-600">
                {data.floors > 0 ? Math.round(data.rooms / data.floors) : 0} rooms
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Steps</CardTitle>
            <CardDescription>What happens after you submit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Kiosk selection and configuration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Smart lock options and setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Room automation features</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Pricing and implementation plan</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleSubmit} size="lg" className="bg-green-600 hover:bg-green-700">
          Save Configuration & Continue
        </Button>
      </div>
    </div>
  );
}
