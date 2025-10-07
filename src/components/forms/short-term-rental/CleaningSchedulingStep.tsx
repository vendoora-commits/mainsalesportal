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
  Calendar, 
  Clock, 
  Users, 
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Settings,
  DollarSign,
  MapPin
} from 'lucide-react';

interface CleaningSchedulingStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function CleaningSchedulingStep({ onNext, onPrevious }: CleaningSchedulingStepProps) {
  const [cleaningSettings, setCleaningSettings] = useState({
    // Cleaning Schedule
    cleaningWindow: '11:00-15:00',
    bufferTime: 2, // hours between checkout and next checkin
    sameDayTurnover: true,
    deepCleanFrequency: 7, // days
    linenChangeFrequency: 3, // days
    
    // Cleaning Services
    useProfessionalCleaners: true,
    useInHouseCleaning: false,
    cleaningCompany: '',
    cleaningContact: '',
    cleaningRate: 75, // per cleaning
    emergencyCleaningAvailable: true,
    
    // Maintenance
    maintenanceCheckFrequency: 30, // days
    preventiveMaintenance: true,
    emergencyMaintenance: true,
    maintenanceContact: '',
    
    // Quality Control
    requireCleaningPhotos: true,
    requireCleaningChecklist: true,
    qualityInspection: true,
    guestFeedbackRequired: false,
    
    // Automation
    autoScheduleCleaning: true,
    autoNotifyCleaners: true,
    autoUpdateCalendars: true,
    smartLockIntegration: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setCleaningSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Cleaning & Maintenance Scheduling</h2>
        <p className="text-gray-600">Configure your cleaning and maintenance operations</p>
      </div>

      {/* Cleaning Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Cleaning Schedule</span>
          </CardTitle>
          <CardDescription>Set up your cleaning schedule and turnover times</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cleaningWindow">Cleaning Window</Label>
              <Input
                id="cleaningWindow"
                value={cleaningSettings.cleaningWindow}
                onChange={(e) => handleSettingChange('cleaningWindow', e.target.value)}
                placeholder="11:00-15:00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bufferTime">Buffer Time (hours)</Label>
              <Select 
                value={cleaningSettings.bufferTime.toString()} 
                onValueChange={(value) => handleSettingChange('bufferTime', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 6, 8].map(hours => (
                    <SelectItem key={hours} value={hours.toString()}>
                      {hours} hour{hours > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deepCleanFrequency">Deep Clean Frequency (days)</Label>
              <Select 
                value={cleaningSettings.deepCleanFrequency.toString()} 
                onValueChange={(value) => handleSettingChange('deepCleanFrequency', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">Every 3 days</SelectItem>
                  <SelectItem value="7">Weekly</SelectItem>
                  <SelectItem value="14">Bi-weekly</SelectItem>
                  <SelectItem value="30">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linenChangeFrequency">Linen Change Frequency (days)</Label>
              <Select 
                value={cleaningSettings.linenChangeFrequency.toString()} 
                onValueChange={(value) => handleSettingChange('linenChangeFrequency', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Daily</SelectItem>
                  <SelectItem value="3">Every 3 days</SelectItem>
                  <SelectItem value="7">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameDayTurnover"
                checked={cleaningSettings.sameDayTurnover}
                onCheckedChange={(checked) => handleSettingChange('sameDayTurnover', checked)}
              />
              <Label htmlFor="sameDayTurnover">Allow same-day turnover</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cleaning Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Cleaning Services</span>
          </CardTitle>
          <CardDescription>Configure your cleaning service providers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="useProfessionalCleaners"
                checked={cleaningSettings.useProfessionalCleaners}
                onCheckedChange={(checked) => handleSettingChange('useProfessionalCleaners', checked)}
              />
              <Label htmlFor="useProfessionalCleaners">Use professional cleaning service</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="useInHouseCleaning"
                checked={cleaningSettings.useInHouseCleaning}
                onCheckedChange={(checked) => handleSettingChange('useInHouseCleaning', checked)}
              />
              <Label htmlFor="useInHouseCleaning">Use in-house cleaning staff</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emergencyCleaningAvailable"
                checked={cleaningSettings.emergencyCleaningAvailable}
                onCheckedChange={(checked) => handleSettingChange('emergencyCleaningAvailable', checked)}
              />
              <Label htmlFor="emergencyCleaningAvailable">Emergency cleaning available</Label>
            </div>
          </div>

          {cleaningSettings.useProfessionalCleaners && (
            <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium">Cleaning Service Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cleaningCompany">Cleaning Company</Label>
                  <Input
                    id="cleaningCompany"
                    value={cleaningSettings.cleaningCompany}
                    onChange={(e) => handleSettingChange('cleaningCompany', e.target.value)}
                    placeholder="Company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cleaningContact">Contact Person</Label>
                  <Input
                    id="cleaningContact"
                    value={cleaningSettings.cleaningContact}
                    onChange={(e) => handleSettingChange('cleaningContact', e.target.value)}
                    placeholder="Contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cleaningRate">Cleaning Rate ($)</Label>
                  <Input
                    id="cleaningRate"
                    type="number"
                    value={cleaningSettings.cleaningRate}
                    onChange={(e) => handleSettingChange('cleaningRate', parseInt(e.target.value))}
                    placeholder="75"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Maintenance & Repairs</span>
          </CardTitle>
          <CardDescription>Set up maintenance schedules and emergency procedures</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maintenanceCheckFrequency">Maintenance Check Frequency (days)</Label>
              <Select 
                value={cleaningSettings.maintenanceCheckFrequency.toString()} 
                onValueChange={(value) => handleSettingChange('maintenanceCheckFrequency', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Weekly</SelectItem>
                  <SelectItem value="14">Bi-weekly</SelectItem>
                  <SelectItem value="30">Monthly</SelectItem>
                  <SelectItem value="60">Bi-monthly</SelectItem>
                  <SelectItem value="90">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenanceContact">Maintenance Contact</Label>
              <Input
                id="maintenanceContact"
                value={cleaningSettings.maintenanceContact}
                onChange={(e) => handleSettingChange('maintenanceContact', e.target.value)}
                placeholder="Maintenance contact"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="preventiveMaintenance"
                checked={cleaningSettings.preventiveMaintenance}
                onCheckedChange={(checked) => handleSettingChange('preventiveMaintenance', checked)}
              />
              <Label htmlFor="preventiveMaintenance">Schedule preventive maintenance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emergencyMaintenance"
                checked={cleaningSettings.emergencyMaintenance}
                onCheckedChange={(checked) => handleSettingChange('emergencyMaintenance', checked)}
              />
              <Label htmlFor="emergencyMaintenance">24/7 emergency maintenance</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quality Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Quality Control</span>
          </CardTitle>
          <CardDescription>Ensure consistent cleaning and maintenance quality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireCleaningPhotos"
                checked={cleaningSettings.requireCleaningPhotos}
                onCheckedChange={(checked) => handleSettingChange('requireCleaningPhotos', checked)}
              />
              <Label htmlFor="requireCleaningPhotos">Require cleaning photos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireCleaningChecklist"
                checked={cleaningSettings.requireCleaningChecklist}
                onCheckedChange={(checked) => handleSettingChange('requireCleaningChecklist', checked)}
              />
              <Label htmlFor="requireCleaningChecklist">Require cleaning checklist completion</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="qualityInspection"
                checked={cleaningSettings.qualityInspection}
                onCheckedChange={(checked) => handleSettingChange('qualityInspection', checked)}
              />
              <Label htmlFor="qualityInspection">Regular quality inspections</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="guestFeedbackRequired"
                checked={cleaningSettings.guestFeedbackRequired}
                onCheckedChange={(checked) => handleSettingChange('guestFeedbackRequired', checked)}
              />
              <Label htmlFor="guestFeedbackRequired">Require guest feedback on cleanliness</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Automation & Integration</span>
          </CardTitle>
          <CardDescription>Automated scheduling and smart integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoScheduleCleaning"
                checked={cleaningSettings.autoScheduleCleaning}
                onCheckedChange={(checked) => handleSettingChange('autoScheduleCleaning', checked)}
              />
              <Label htmlFor="autoScheduleCleaning">Auto-schedule cleaning based on bookings</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoNotifyCleaners"
                checked={cleaningSettings.autoNotifyCleaners}
                onCheckedChange={(checked) => handleSettingChange('autoNotifyCleaners', checked)}
              />
              <Label htmlFor="autoNotifyCleaners">Auto-notify cleaners of schedule changes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoUpdateCalendars"
                checked={cleaningSettings.autoUpdateCalendars}
                onCheckedChange={(checked) => handleSettingChange('autoUpdateCalendars', checked)}
              />
              <Label htmlFor="autoUpdateCalendars">Auto-update booking calendars</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="smartLockIntegration"
                checked={cleaningSettings.smartLockIntegration}
                onCheckedChange={(checked) => handleSettingChange('smartLockIntegration', checked)}
              />
              <Label htmlFor="smartLockIntegration">Integrate with smart locks for cleaner access</Label>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-medium">Smart Automation Benefits</p>
                <p>Automated scheduling reduces double-bookings, ensures proper cleaning windows, and provides seamless guest experiences.</p>
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
          Next: Booking Integration
        </Button>
      </div>
    </div>
  );
}
