'use client';

import { useState } from 'react';
import { useGuestStore } from '@/store/useGuestStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Plus, 
  Database, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Star,
  MessageSquare,
  Activity
} from 'lucide-react';
import { Guest, GuestCommunication, GuestActivity, GuestReview } from '@/types';

export function GuestManagementDemo() {
  const {
    guests,
    communications,
    activities,
    reviews,
    addGuest,
    addCommunication,
    addActivity,
    addReview,
    isLoading,
    error,
    getGuestStats,
  } = useGuestStore();

  const [demoData, setDemoData] = useState({
    guests: 0,
    communications: 0,
    activities: 0,
    reviews: 0,
  });

  const propertyId = 'demo-property-1';
  const stats = getGuestStats(propertyId);

  const createDemoGuest = async () => {
    const guestData: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'> = {
      propertyId,
      bookingId: `booking_${Date.now()}`,
      firstName: 'John',
      lastName: 'Doe',
      email: `john.doe.${Date.now()}@example.com`,
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1985-06-15',
      nationality: 'US',
      idType: 'passport',
      idNumber: 'AB1234567',
      idExpiryDate: '2025-06-15',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+1 (555) 987-6543',
        relationship: 'Spouse',
      },
      preferences: {
        language: 'en',
        specialRequests: 'Late check-in requested',
        accessibilityNeeds: ['Wheelchair accessible'],
      },
      status: 'confirmed',
      checkInDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      checkOutDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      numberOfGuests: 2,
      totalAmount: 450,
      depositAmount: 100,
      damageDeposit: 200,
      platform: 'airbnb',
      platformBookingId: `airbnb_${Date.now()}`,
    };

    try {
      const newGuest = await addGuest(guestData);
      setDemoData(prev => ({ ...prev, guests: prev.guests + 1 }));
      
      // Add demo communication
      await addCommunication({
        guestId: newGuest.id,
        type: 'welcome',
        subject: 'Welcome to your stay!',
        message: 'Hi John, welcome to your stay! We\'re excited to host you. Check-in instructions will be sent separately.',
        status: 'sent',
        channel: 'email',
      });
      setDemoData(prev => ({ ...prev, communications: prev.communications + 1 }));

      // Add demo activity
      await addActivity({
        guestId: newGuest.id,
        type: 'check_in',
        description: 'Guest confirmed booking',
        resolved: true,
        resolvedAt: new Date(),
        resolvedBy: 'system',
      });
      setDemoData(prev => ({ ...prev, activities: prev.activities + 1 }));

      // Add demo review
      await addReview({
        guestId: newGuest.id,
        propertyId,
        rating: 5,
        title: 'Excellent stay!',
        comment: 'Great location, clean property, and excellent communication from the host.',
        categories: {
          cleanliness: 5,
          communication: 5,
          checkIn: 5,
          accuracy: 5,
          location: 5,
          value: 5,
        },
        platform: 'airbnb',
        platformReviewId: `review_${Date.now()}`,
        isPublic: true,
      });
      setDemoData(prev => ({ ...prev, reviews: prev.reviews + 1 }));

    } catch (error) {
      console.error('Failed to create demo guest:', error);
    }
  };

  const createMultipleDemoGuests = async () => {
    const guestNames = [
      { firstName: 'Sarah', lastName: 'Johnson' },
      { firstName: 'Michael', lastName: 'Chen' },
      { firstName: 'Emily', lastName: 'Rodriguez' },
      { firstName: 'David', lastName: 'Wilson' },
      { firstName: 'Lisa', lastName: 'Anderson' },
    ];

    for (const name of guestNames) {
      const guestData: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'> = {
        propertyId,
        bookingId: `booking_${Date.now()}_${Math.random()}`,
        firstName: name.firstName,
        lastName: name.lastName,
        email: `${name.firstName.toLowerCase()}.${name.lastName.toLowerCase()}@example.com`,
        phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        status: ['pending', 'confirmed', 'checked_in', 'checked_out'][Math.floor(Math.random() * 4)] as any,
        checkInDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
        checkOutDate: new Date(Date.now() + (Math.random() * 30 + 1) * 24 * 60 * 60 * 1000),
        numberOfGuests: Math.floor(Math.random() * 4) + 1,
        totalAmount: Math.floor(Math.random() * 500) + 200,
        platform: ['airbnb', 'vrbo', 'booking_com', 'direct'][Math.floor(Math.random() * 4)] as any,
        platformBookingId: `booking_${Date.now()}_${Math.random()}`,
      };

      try {
        await addGuest(guestData);
        setDemoData(prev => ({ ...prev, guests: prev.guests + 1 }));
      } catch (error) {
        console.error('Failed to create demo guest:', error);
      }
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Guest Management System Demo</h1>
        <p className="text-gray-600 mt-2">This demonstrates the comprehensive guest management system with real-time data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Total Guests</span>
            </CardTitle>
            <CardDescription>All registered guests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalGuests}</div>
            <div className="flex space-x-2 mt-2">
              <Badge variant="outline">Checked In: {stats.checkedIn}</Badge>
              <Badge variant="outline">Pending: {stats.pending}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Communications</span>
            </CardTitle>
            <CardDescription>Messages sent to guests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{communications.length}</div>
            <p className="text-sm text-gray-600 mt-2">
              Welcome messages, reminders, and updates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Activities</span>
            </CardTitle>
            <CardDescription>Guest activities and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activities.length}</div>
            <p className="text-sm text-gray-600 mt-2">
              Check-ins, check-outs, and interactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Reviews</span>
            </CardTitle>
            <CardDescription>Guest reviews and ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{reviews.length}</div>
            <div className="flex items-center space-x-2 mt-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{stats.averageRating.toFixed(1)}/5.0</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demo Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Demo Actions</CardTitle>
          <CardDescription>Create sample data to test the guest management system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={createDemoGuest} 
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span>Create Single Demo Guest</span>
            </Button>
            
            <Button 
              onClick={createMultipleDemoGuests} 
              disabled={isLoading}
              variant="outline"
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Database className="h-4 w-4" />
              )}
              <span>Create Multiple Demo Guests</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-medium">Guest Management Features</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Complete guest profiles with ID verification</li>
                    <li>• Automated communication system</li>
                    <li>• Activity tracking and logging</li>
                    <li>• Review and rating management</li>
                    <li>• Check-in/check-out automation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Database className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Data Management</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Persistent storage with Zustand</li>
                    <li>• Real-time state updates</li>
                    <li>• Comprehensive guest analytics</li>
                    <li>• Multi-platform booking support</li>
                    <li>• Emergency contact management</li>
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
          <CardDescription>Current status of guest management features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Guest Profiles Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Communication System Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Activity Tracking Enabled</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Review System Active</span>
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
