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
  Users, 
  Calendar, 
  MessageSquare, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Settings
} from 'lucide-react';

interface GuestManagementStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function GuestManagementStep({ onNext, onPrevious }: GuestManagementStepProps) {
  const [guestSettings, setGuestSettings] = useState({
    autoCheckIn: true,
    requireIDVerification: true,
    sendWelcomeMessage: true,
    sendCheckoutReminder: true,
    allowEarlyCheckIn: false,
    allowLateCheckOut: false,
    maxGuestsPerBooking: 8,
    requireGuestRegistration: true,
    enableGuestCommunication: true,
    sendHouseRules: true,
    requireDamageDeposit: false,
    damageDepositAmount: 200,
    checkInWindow: '15:00-22:00',
    checkOutWindow: '10:00-11:00',
    lateCheckInFee: 25,
    earlyCheckInFee: 20,
    lateCheckOutFee: 30,
  });

  const handleSettingChange = (key: string, value: any) => {
    setGuestSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Guest Management Configuration</h2>
        <p className="text-gray-600">Set up how you want to manage your guests and their experience</p>
      </div>

      {/* Check-in/Check-out Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Check-in & Check-out Settings</span>
          </CardTitle>
          <CardDescription>Configure your check-in and check-out policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkInWindow">Check-in Window</Label>
              <Input
                id="checkInWindow"
                value={guestSettings.checkInWindow}
                onChange={(e) => handleSettingChange('checkInWindow', e.target.value)}
                placeholder="15:00-22:00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOutWindow">Check-out Window</Label>
              <Input
                id="checkOutWindow"
                value={guestSettings.checkOutWindow}
                onChange={(e) => handleSettingChange('checkOutWindow', e.target.value)}
                placeholder="10:00-11:00"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="earlyCheckInFee">Early Check-in Fee ($)</Label>
              <Input
                id="earlyCheckInFee"
                type="number"
                value={guestSettings.earlyCheckInFee}
                onChange={(e) => handleSettingChange('earlyCheckInFee', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lateCheckInFee">Late Check-in Fee ($)</Label>
              <Input
                id="lateCheckInFee"
                type="number"
                value={guestSettings.lateCheckInFee}
                onChange={(e) => handleSettingChange('lateCheckInFee', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lateCheckOutFee">Late Check-out Fee ($)</Label>
              <Input
                id="lateCheckOutFee"
                type="number"
                value={guestSettings.lateCheckOutFee}
                onChange={(e) => handleSettingChange('lateCheckOutFee', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowEarlyCheckIn"
                checked={guestSettings.allowEarlyCheckIn}
                onCheckedChange={(checked) => handleSettingChange('allowEarlyCheckIn', checked)}
              />
              <Label htmlFor="allowEarlyCheckIn">Allow early check-in (with fee)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowLateCheckOut"
                checked={guestSettings.allowLateCheckOut}
                onCheckedChange={(checked) => handleSettingChange('allowLateCheckOut', checked)}
              />
              <Label htmlFor="allowLateCheckOut">Allow late check-out (with fee)</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Verification & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Guest Verification & Security</span>
          </CardTitle>
          <CardDescription>Set up guest verification and security requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireIDVerification"
                checked={guestSettings.requireIDVerification}
                onCheckedChange={(checked) => handleSettingChange('requireIDVerification', checked)}
              />
              <Label htmlFor="requireIDVerification">Require ID verification at check-in</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireGuestRegistration"
                checked={guestSettings.requireGuestRegistration}
                onCheckedChange={(checked) => handleSettingChange('requireGuestRegistration', checked)}
              />
              <Label htmlFor="requireGuestRegistration">Require guest registration form</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireDamageDeposit"
                checked={guestSettings.requireDamageDeposit}
                onCheckedChange={(checked) => handleSettingChange('requireDamageDeposit', checked)}
              />
              <Label htmlFor="requireDamageDeposit">Require damage deposit</Label>
            </div>
          </div>

          {guestSettings.requireDamageDeposit && (
            <div className="space-y-2">
              <Label htmlFor="damageDepositAmount">Damage Deposit Amount ($)</Label>
              <Input
                id="damageDepositAmount"
                type="number"
                value={guestSettings.damageDepositAmount}
                onChange={(e) => handleSettingChange('damageDepositAmount', parseInt(e.target.value))}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="maxGuestsPerBooking">Maximum Guests per Booking</Label>
            <Select 
              value={guestSettings.maxGuestsPerBooking.toString()} 
              onValueChange={(value) => handleSettingChange('maxGuestsPerBooking', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2, 4, 6, 8, 10, 12, 16, 20].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} guests
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Guest Communication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Guest Communication</span>
          </CardTitle>
          <CardDescription>Automated messaging and communication settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sendWelcomeMessage"
                checked={guestSettings.sendWelcomeMessage}
                onCheckedChange={(checked) => handleSettingChange('sendWelcomeMessage', checked)}
              />
              <Label htmlFor="sendWelcomeMessage">Send welcome message upon booking</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sendCheckoutReminder"
                checked={guestSettings.sendCheckoutReminder}
                onCheckedChange={(checked) => handleSettingChange('sendCheckoutReminder', checked)}
              />
              <Label htmlFor="sendCheckoutReminder">Send checkout reminder</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sendHouseRules"
                checked={guestSettings.sendHouseRules}
                onCheckedChange={(checked) => handleSettingChange('sendHouseRules', checked)}
              />
              <Label htmlFor="sendHouseRules">Send house rules and guidelines</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableGuestCommunication"
                checked={guestSettings.enableGuestCommunication}
                onCheckedChange={(checked) => handleSettingChange('enableGuestCommunication', checked)}
              />
              <Label htmlFor="enableGuestCommunication">Enable guest communication portal</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Automation Settings</span>
          </CardTitle>
          <CardDescription>Automated processes and smart features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoCheckIn"
                checked={guestSettings.autoCheckIn}
                onCheckedChange={(checked) => handleSettingChange('autoCheckIn', checked)}
              />
              <Label htmlFor="autoCheckIn">Enable automatic check-in</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoCheckOut"
                checked={guestSettings.autoCheckOut}
                onCheckedChange={(checked) => handleSettingChange('autoCheckOut', checked)}
              />
              <Label htmlFor="autoCheckOut">Enable automatic check-out</Label>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Smart Automation Benefits</p>
                <p>Automated check-in/out reduces manual work and provides 24/7 guest access. Guests receive digital keys and can check in/out at any time.</p>
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
          Next: Cleaning & Maintenance
        </Button>
      </div>
    </div>
  );
}
