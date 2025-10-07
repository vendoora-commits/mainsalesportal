'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Calendar, 
  DollarSign, 
  BarChart,
  Settings,
  CheckCircle,
  AlertCircle,
  Link,
  Zap,
  Shield
} from 'lucide-react';

interface BookingIntegrationStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function BookingIntegrationStep({ onNext, onPrevious }: BookingIntegrationStepProps) {
  const [bookingSettings, setBookingSettings] = useState({
    // Platform Integration
    airbnbIntegration: false,
    vrboIntegration: false,
    bookingComIntegration: false,
    expediaIntegration: false,
    directBooking: true,
    
    // API Settings
    airbnbApiKey: '',
    vrboApiKey: '',
    bookingComApiKey: '',
    expediaApiKey: '',
    
    // Pricing
    dynamicPricing: true,
    basePrice: 150,
    weekendMultiplier: 1.5,
    holidayMultiplier: 2.0,
    lastMinuteDiscount: 0.1,
    earlyBirdDiscount: 0.15,
    
    // Availability
    minStay: 1,
    maxStay: 30,
    advanceBookingDays: 365,
    sameDayBooking: true,
    instantBooking: false,
    
    // Calendar Sync
    syncCalendars: true,
    preventDoubleBooking: true,
    bufferDays: 1,
    autoUpdateRates: true,
    
    // Revenue Management
    occupancyTarget: 80, // percentage
    revenueOptimization: true,
    competitorAnalysis: false,
    seasonalPricing: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setBookingSettings(prev => ({ ...prev, [key]: value }));
  };

  const bookingPlatforms = [
    { id: 'airbnb', name: 'Airbnb', icon: '🏠', description: 'World\'s largest short-term rental platform' },
    { id: 'vrbo', name: 'VRBO', icon: '🏖️', description: 'Vacation rental by owner platform' },
    { id: 'bookingCom', name: 'Booking.com', icon: '🌐', description: 'Global travel platform' },
    { id: 'expedia', name: 'Expedia', icon: '✈️', description: 'Online travel agency' },
    { id: 'direct', name: 'Direct Booking', icon: '🔗', description: 'Direct website bookings' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Booking Platform Integration</h2>
        <p className="text-gray-600">Connect your property to booking platforms and manage availability</p>
      </div>

      {/* Platform Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Booking Platforms</span>
          </CardTitle>
          <CardDescription>Select which platforms you want to integrate with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookingPlatforms.map((platform) => (
              <div key={platform.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                <div className="text-2xl">{platform.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={bookingSettings[platform.id + 'Integration' as keyof typeof bookingSettings] as boolean}
                      onCheckedChange={(checked) => handleSettingChange(platform.id + 'Integration', checked)}
                    />
                    <Label htmlFor={platform.id} className="font-medium">{platform.name}</Label>
                  </div>
                  <p className="text-sm text-gray-500">{platform.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="h-5 w-5" />
            <span>API Configuration</span>
          </CardTitle>
          <CardDescription>Configure API keys for platform integration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {bookingSettings.airbnbIntegration && (
            <div className="space-y-2">
              <Label htmlFor="airbnbApiKey">Airbnb API Key</Label>
              <Input
                id="airbnbApiKey"
                type="password"
                value={bookingSettings.airbnbApiKey}
                onChange={(e) => handleSettingChange('airbnbApiKey', e.target.value)}
                placeholder="Enter your Airbnb API key"
              />
            </div>
          )}
          
          {bookingSettings.vrboIntegration && (
            <div className="space-y-2">
              <Label htmlFor="vrboApiKey">VRBO API Key</Label>
              <Input
                id="vrboApiKey"
                type="password"
                value={bookingSettings.vrboApiKey}
                onChange={(e) => handleSettingChange('vrboApiKey', e.target.value)}
                placeholder="Enter your VRBO API key"
              />
            </div>
          )}
          
          {bookingSettings.bookingComIntegration && (
            <div className="space-y-2">
              <Label htmlFor="bookingComApiKey">Booking.com API Key</Label>
              <Input
                id="bookingComApiKey"
                type="password"
                value={bookingSettings.bookingComApiKey}
                onChange={(e) => handleSettingChange('bookingComApiKey', e.target.value)}
                placeholder="Enter your Booking.com API key"
              />
            </div>
          )}
          
          {bookingSettings.expediaIntegration && (
            <div className="space-y-2">
              <Label htmlFor="expediaApiKey">Expedia API Key</Label>
              <Input
                id="expediaApiKey"
                type="password"
                value={bookingSettings.expediaApiKey}
                onChange={(e) => handleSettingChange('expediaApiKey', e.target.value)}
                placeholder="Enter your Expedia API key"
              />
            </div>
          )}

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">API Key Security</p>
                <p>API keys are encrypted and stored securely. You can update them anytime in your account settings.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Pricing Strategy</span>
          </CardTitle>
          <CardDescription>Configure dynamic pricing and revenue optimization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price per Night ($)</Label>
              <Input
                id="basePrice"
                type="number"
                value={bookingSettings.basePrice}
                onChange={(e) => handleSettingChange('basePrice', parseInt(e.target.value))}
                placeholder="150"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupancyTarget">Occupancy Target (%)</Label>
              <Input
                id="occupancyTarget"
                type="number"
                min="1"
                max="100"
                value={bookingSettings.occupancyTarget}
                onChange={(e) => handleSettingChange('occupancyTarget', parseInt(e.target.value))}
                placeholder="80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weekendMultiplier">Weekend Multiplier</Label>
              <Input
                id="weekendMultiplier"
                type="number"
                step="0.1"
                value={bookingSettings.weekendMultiplier}
                onChange={(e) => handleSettingChange('weekendMultiplier', parseFloat(e.target.value))}
                placeholder="1.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="holidayMultiplier">Holiday Multiplier</Label>
              <Input
                id="holidayMultiplier"
                type="number"
                step="0.1"
                value={bookingSettings.holidayMultiplier}
                onChange={(e) => handleSettingChange('holidayMultiplier', parseFloat(e.target.value))}
                placeholder="2.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastMinuteDiscount">Last Minute Discount</Label>
              <Input
                id="lastMinuteDiscount"
                type="number"
                step="0.01"
                value={bookingSettings.lastMinuteDiscount}
                onChange={(e) => handleSettingChange('lastMinuteDiscount', parseFloat(e.target.value))}
                placeholder="0.1"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dynamicPricing"
                checked={bookingSettings.dynamicPricing}
                onCheckedChange={(checked) => handleSettingChange('dynamicPricing', checked)}
              />
              <Label htmlFor="dynamicPricing">Enable dynamic pricing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="revenueOptimization"
                checked={bookingSettings.revenueOptimization}
                onCheckedChange={(checked) => handleSettingChange('revenueOptimization', checked)}
              />
              <Label htmlFor="revenueOptimization">Enable revenue optimization</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="seasonalPricing"
                checked={bookingSettings.seasonalPricing}
                onCheckedChange={(checked) => handleSettingChange('seasonalPricing', checked)}
              />
              <Label htmlFor="seasonalPricing">Enable seasonal pricing</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Availability & Booking Rules</span>
          </CardTitle>
          <CardDescription>Set booking rules and availability windows</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minStay">Minimum Stay (nights)</Label>
              <Select 
                value={bookingSettings.minStay.toString()} 
                onValueChange={(value) => handleSettingChange('minStay', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 7, 14, 30].map(nights => (
                    <SelectItem key={nights} value={nights.toString()}>
                      {nights} night{nights > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxStay">Maximum Stay (nights)</Label>
              <Select 
                value={bookingSettings.maxStay.toString()} 
                onValueChange={(value) => handleSettingChange('maxStay', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[7, 14, 21, 30, 60, 90].map(nights => (
                    <SelectItem key={nights} value={nights.toString()}>
                      {nights} night{nights > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="advanceBookingDays">Advance Booking Window (days)</Label>
              <Select 
                value={bookingSettings.advanceBookingDays.toString()} 
                onValueChange={(value) => handleSettingChange('advanceBookingDays', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">6 months</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bufferDays">Buffer Days</Label>
              <Select 
                value={bookingSettings.bufferDays.toString()} 
                onValueChange={(value) => handleSettingChange('bufferDays', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 7].map(days => (
                    <SelectItem key={days} value={days.toString()}>
                      {days} day{days > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameDayBooking"
                checked={bookingSettings.sameDayBooking}
                onCheckedChange={(checked) => handleSettingChange('sameDayBooking', checked)}
              />
              <Label htmlFor="sameDayBooking">Allow same-day bookings</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="instantBooking"
                checked={bookingSettings.instantBooking}
                onCheckedChange={(checked) => handleSettingChange('instantBooking', checked)}
              />
              <Label htmlFor="instantBooking">Enable instant booking</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Sync */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart className="h-5 w-5" />
            <span>Calendar Synchronization</span>
          </CardTitle>
          <CardDescription>Automated calendar management and sync</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="syncCalendars"
                checked={bookingSettings.syncCalendars}
                onCheckedChange={(checked) => handleSettingChange('syncCalendars', checked)}
              />
              <Label htmlFor="syncCalendars">Sync calendars across all platforms</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="preventDoubleBooking"
                checked={bookingSettings.preventDoubleBooking}
                onCheckedChange={(checked) => handleSettingChange('preventDoubleBooking', checked)}
              />
              <Label htmlFor="preventDoubleBooking">Prevent double bookings</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoUpdateRates"
                checked={bookingSettings.autoUpdateRates}
                onCheckedChange={(checked) => handleSettingChange('autoUpdateRates', checked)}
              />
              <Label htmlFor="autoUpdateRates">Auto-update rates across platforms</Label>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Smart Calendar Sync</p>
                <p>Automatically sync availability, rates, and bookings across all connected platforms to prevent overbooking and maximize revenue.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext}>
          Next: Review Configuration
        </Button>
      </div>
    </div>
  );
}
