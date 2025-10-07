'use client';

import { useState } from 'react';
import { useBookingIntegrationStore } from '@/store/useBookingIntegrationStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Plus, 
  Database, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Calendar,
  DollarSign,
  RefreshCw,
  Link as LinkIcon,
  Activity,
  TrendingUp
} from 'lucide-react';
import { BookingIntegration, BookingPlatform } from '@/types';

export function BookingIntegrationDemo() {
  const {
    integrations,
    syncLogs,
    platformBookings,
    pricingRules,
    addIntegration,
    addPricingRule,
    importBooking,
    syncAll,
    isLoading,
    isSyncing,
    error,
    getIntegrationStats,
  } = useBookingIntegrationStore();

  const propertyId = 'demo-property-1';
  const stats = getIntegrationStats(propertyId);

  const createDemoIntegration = async (platform: BookingPlatform) => {
    const platformSettings = {
      airbnb: { basePrice: 150, minStay: 2, maxStay: 30 },
      vrbo: { basePrice: 180, minStay: 3, maxStay: 14 },
      booking_com: { basePrice: 160, minStay: 1, maxStay: 30 },
      expedia: { basePrice: 165, minStay: 1, maxStay: 21 },
      direct: { basePrice: 140, minStay: 1, maxStay: 60 },
    };

    const settings = platformSettings[platform] || platformSettings.direct;

    const integrationData: Omit<BookingIntegration, 'id' | 'createdAt' | 'updatedAt'> = {
      propertyId,
      platform,
      isActive: true,
      apiKey: `demo_api_key_${Date.now()}`,
      apiSecret: `demo_api_secret_${Date.now()}`,
      webhookUrl: `https://vendoora.com/webhooks/${platform}`,
      calendarSyncEnabled: true,
      autoPriceUpdate: true,
      autoAvailabilitySync: true,
      syncStatus: 'active',
      settings: {
        basePrice: settings.basePrice,
        currency: 'USD',
        minStay: settings.minStay,
        maxStay: settings.maxStay,
        checkInTime: '15:00',
        checkOutTime: '11:00',
        instantBooking: platform === 'airbnb' || platform === 'booking_com',
        requireApproval: platform === 'vrbo' || platform === 'direct',
      },
    };

    try {
      const newIntegration = await addIntegration(integrationData);
      
      // Create demo pricing rules
      await addPricingRule({
        propertyId,
        name: `${platform} Weekend Pricing`,
        type: 'weekend',
        daysOfWeek: [5, 6], // Friday, Saturday
        adjustmentType: 'percentage',
        adjustmentValue: 1.5,
        priority: 10,
        isActive: true,
      });
      
      await addPricingRule({
        propertyId,
        name: `${platform} Holiday Pricing`,
        type: 'holiday',
        adjustmentType: 'percentage',
        adjustmentValue: 2.0,
        priority: 20,
        isActive: true,
      });
      
      // Import demo bookings
      for (let i = 0; i < 3; i++) {
        const checkIn = new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000);
        const checkOut = new Date(checkIn.getTime() + 3 * 24 * 60 * 60 * 1000);
        
        await importBooking({
          integrationId: newIntegration.id,
          propertyId,
          platform,
          platformBookingId: `${platform}_booking_${Date.now()}_${i}`,
          guestName: `Demo Guest ${i + 1}`,
          guestEmail: `guest${i + 1}@example.com`,
          guestPhone: `+1 555 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          numberOfGuests: Math.floor(Math.random() * 4) + 1,
          totalAmount: settings.basePrice * 3,
          currency: 'USD',
          status: 'confirmed',
          paymentStatus: 'paid',
          syncedAt: new Date(),
        });
      }
      
      return newIntegration;
    } catch (error) {
      console.error('Failed to create demo integration:', error);
      throw error;
    }
  };

  const createAllDemoIntegrations = async () => {
    const platforms: BookingPlatform[] = ['airbnb', 'vrbo', 'booking_com', 'expedia', 'direct'];
    
    for (const platform of platforms) {
      try {
        await createDemoIntegration(platform);
      } catch (error) {
        console.error(`Failed to create ${platform} integration:`, error);
      }
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Booking Platform Integration Demo</h1>
        <p className="text-gray-600 mt-2">Connect to Airbnb, VRBO, and other platforms for automated booking management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Integrations</span>
            </CardTitle>
            <CardDescription>Connected platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalIntegrations}</div>
            <div className="flex space-x-2 mt-2">
              <Badge variant="outline">Active: {stats.activeIntegrations}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Bookings</span>
            </CardTitle>
            <CardDescription>Platform bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalBookings}</div>
            <p className="text-sm text-gray-600 mt-2">
              From all connected platforms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Revenue</span>
            </CardTitle>
            <CardDescription>Total booking revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              All time revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Sync Logs</span>
            </CardTitle>
            <CardDescription>Synchronization activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{syncLogs.length}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline">Errors: {stats.syncErrors}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Demo Actions</CardTitle>
          <CardDescription>Create sample integrations and bookings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => createDemoIntegration('airbnb')} 
              disabled={isLoading || isSyncing}
              className="flex items-center space-x-2"
            >
              {isLoading || isSyncing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="text-lg">🏠</span>
              )}
              <span>Connect Airbnb</span>
            </Button>
            
            <Button 
              onClick={() => createDemoIntegration('vrbo')} 
              disabled={isLoading || isSyncing}
              variant="outline"
              className="flex items-center space-x-2"
            >
              {isLoading || isSyncing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="text-lg">🏖️</span>
              )}
              <span>Connect VRBO</span>
            </Button>
            
            <Button 
              onClick={() => createDemoIntegration('booking_com')} 
              disabled={isLoading || isSyncing}
              variant="outline"
              className="flex items-center space-x-2"
            >
              {isLoading || isSyncing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="text-lg">🌐</span>
              )}
              <span>Connect Booking.com</span>
            </Button>
            
            <Button 
              onClick={createAllDemoIntegrations} 
              disabled={isLoading || isSyncing}
              className="flex items-center space-x-2"
            >
              {isLoading || isSyncing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Database className="h-4 w-4" />
              )}
              <span>Connect All Platforms</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-medium">Integration Features</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Multi-platform API connections</li>
                    <li>• Real-time calendar synchronization</li>
                    <li>• Automated pricing updates</li>
                    <li>• Booking import and management</li>
                    <li>• Comprehensive sync logging</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Revenue Optimization</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Dynamic pricing rules</li>
                    <li>• Weekend & holiday multipliers</li>
                    <li>• Seasonal pricing strategies</li>
                    <li>• Last-minute discounts</li>
                    <li>• Length-of-stay adjustments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current status of booking integration features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Multi-Platform Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Calendar Sync Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Pricing Rules Enabled</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Booking Import Ready</span>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
