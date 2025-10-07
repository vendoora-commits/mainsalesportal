'use client';

import { useState, useEffect } from 'react';
import { useGuestStore } from '@/store/useGuestStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Star, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Activity
} from 'lucide-react';
import { Guest, GuestStatus, BookingPlatform } from '@/types';

export function GuestDashboard() {
  const {
    guests,
    communications,
    activities,
    reviews,
    isLoading,
    error,
    getGuestStats,
    getGuestsByStatus,
    getUnresolvedActivities,
    checkInGuest,
    checkOutGuest,
    sendWelcomeMessage,
    sendCheckoutReminder,
  } = useGuestStore();

  const [selectedTab, setSelectedTab] = useState<'overview' | 'guests' | 'communications' | 'activities' | 'reviews'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<GuestStatus | 'all'>('all');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  // Mock property ID for demo
  const propertyId = 'demo-property-1';
  const stats = getGuestStats(propertyId);
  const unresolvedActivities = getUnresolvedActivities();

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: GuestStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'checked_in': return 'bg-green-100 text-green-800';
      case 'checked_out': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no_show': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform: BookingPlatform) => {
    switch (platform) {
      case 'airbnb': return '🏠';
      case 'vrbo': return '🏖️';
      case 'booking_com': return '🌐';
      case 'expedia': return '✈️';
      case 'direct': return '🔗';
      default: return '📱';
    }
  };

  const handleCheckIn = async (guestId: string) => {
    try {
      await checkInGuest(guestId);
    } catch (error) {
      console.error('Failed to check in guest:', error);
    }
  };

  const handleCheckOut = async (guestId: string) => {
    try {
      await checkOutGuest(guestId);
    } catch (error) {
      console.error('Failed to check out guest:', error);
    }
  };

  const handleSendMessage = async (guestId: string, type: 'welcome' | 'checkout_reminder') => {
    try {
      if (type === 'welcome') {
        await sendWelcomeMessage(guestId);
      } else {
        await sendCheckoutReminder(guestId);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Guest Management</h1>
          <p className="text-gray-600">Manage your guests, communications, and activities</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Guest
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'guests', label: 'Guests', icon: Users },
          { id: 'communications', label: 'Messages', icon: MessageSquare },
          { id: 'activities', label: 'Activities', icon: Activity },
          { id: 'reviews', label: 'Reviews', icon: Star },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              selectedTab === tab.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalGuests}</div>
                <p className="text-xs text-muted-foreground">
                  All time guests
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Checked In</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.checkedIn}</div>
                <p className="text-xs text-muted-foreground">
                  Currently staying
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.averageRating.toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Out of 5.0 stars
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  ${stats.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  All time revenue
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest guest activities and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {unresolvedActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500">
                        {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <Badge variant={activity.resolved ? "default" : "destructive"}>
                      {activity.resolved ? "Resolved" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Guests Tab */}
      {selectedTab === 'guests' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search guests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as GuestStatus | 'all')}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Guests List */}
          <div className="grid gap-4">
            {filteredGuests.map((guest) => (
              <Card key={guest.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {guest.firstName[0]}{guest.lastName[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold">{guest.firstName} {guest.lastName}</h3>
                        <p className="text-sm text-gray-600">{guest.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(guest.status)}>
                            {guest.status.replace('_', ' ')}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {getPlatformIcon(guest.platform)} {guest.platform}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {guest.checkInDate.toLocaleDateString()} - {guest.checkOutDate.toLocaleDateString()}
                      </p>
                      <p className="font-semibold">${guest.totalAmount}</p>
                      <div className="flex space-x-2 mt-2">
                        {guest.status === 'confirmed' && (
                          <Button size="sm" onClick={() => handleCheckIn(guest.id)}>
                            Check In
                          </Button>
                        )}
                        {guest.status === 'checked_in' && (
                          <Button size="sm" variant="outline" onClick={() => handleCheckOut(guest.id)}>
                            Check Out
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleSendMessage(guest.id, 'welcome')}>
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Communications Tab */}
      {selectedTab === 'communications' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest Communications</CardTitle>
              <CardDescription>Messages sent to and received from guests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communications.slice(0, 10).map((comm) => (
                  <div key={comm.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{comm.subject}</p>
                      <p className="text-xs text-gray-500">
                        {comm.type.replace('_', ' ')} • {comm.channel} • {comm.sentAt.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={comm.status === 'sent' ? "default" : "secondary"}>
                      {comm.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Activities Tab */}
      {selectedTab === 'activities' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest Activities</CardTitle>
              <CardDescription>All guest activities and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.slice(0, 10).map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500">
                        {activity.type.replace('_', ' ')} • {activity.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={activity.resolved ? "default" : "destructive"}>
                      {activity.resolved ? "Resolved" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reviews Tab */}
      {selectedTab === 'reviews' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest Reviews</CardTitle>
              <CardDescription>Reviews and ratings from guests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.slice(0, 10).map((review) => (
                  <div key={review.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-yellow-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">{review.title || 'Guest Review'}</p>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {review.comment} • {review.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {review.platform}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
