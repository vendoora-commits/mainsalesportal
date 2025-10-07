'use client';

import { useState } from 'react';
import { useGuestStore } from '@/store/useGuestStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard, 
  Shield, 
  MessageSquare,
  Activity,
  Star,
  Edit,
  Save,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  Globe
} from 'lucide-react';
import { Guest, GuestStatus } from '@/types';

interface GuestDetailsProps {
  guestId: string;
  onClose: () => void;
}

export function GuestDetails({ guestId, onClose }: GuestDetailsProps) {
  const {
    getGuest,
    getCommunicationsByGuest,
    getActivitiesByGuest,
    getReviewsByGuest,
    getPreferences,
    updateGuest,
    checkInGuest,
    checkOutGuest,
    sendWelcomeMessage,
    sendCheckoutReminder,
    sendHouseRules,
  } = useGuestStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editedGuest, setEditedGuest] = useState<Partial<Guest>>({});

  const guest = getGuest(guestId);
  const communications = getCommunicationsByGuest(guestId);
  const activities = getActivitiesByGuest(guestId);
  const reviews = getReviewsByGuest(guestId);
  const preferences = getPreferences(guestId);

  if (!guest) {
    return (
      <div className="p-6">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Guest Not Found</h3>
          <p className="text-gray-600">The requested guest could not be found.</p>
          <Button onClick={onClose} className="mt-4">
            Close
          </Button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditedGuest(guest);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateGuest(guestId, editedGuest);
      setIsEditing(false);
      setEditedGuest({});
    } catch (error) {
      console.error('Failed to update guest:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedGuest({});
  };

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

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'airbnb': return '🏠';
      case 'vrbo': return '🏖️';
      case 'booking_com': return '🌐';
      case 'expedia': return '✈️';
      case 'direct': return '🔗';
      default: return '📱';
    }
  };

  const currentGuest = isEditing ? { ...guest, ...editedGuest } : guest;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
            {currentGuest.firstName[0]}{currentGuest.lastName[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {isEditing ? (
                <Input
                  value={editedGuest.firstName || ''}
                  onChange={(e) => setEditedGuest({ ...editedGuest, firstName: e.target.value })}
                  className="text-2xl font-bold border-none p-0 h-auto"
                />
              ) : (
                `${currentGuest.firstName} ${currentGuest.lastName}`
              )}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className={getStatusColor(currentGuest.status)}>
                {currentGuest.status.replace('_', ' ')}
              </Badge>
              <span className="text-sm text-gray-500">
                {getPlatformIcon(currentGuest.platform)} {currentGuest.platform}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleEdit} variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              {currentGuest.status === 'confirmed' && (
                <Button onClick={() => checkInGuest(guestId)} size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Check In
                </Button>
              )}
              {currentGuest.status === 'checked_in' && (
                <Button onClick={() => checkOutGuest(guestId)} variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Check Out
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedGuest.email || ''}
                      onChange={(e) => setEditedGuest({ ...editedGuest, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{currentGuest.email}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editedGuest.phone || ''}
                      onChange={(e) => setEditedGuest({ ...editedGuest, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{currentGuest.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {currentGuest.emergencyContact && (
                <div className="space-y-2">
                  <Label>Emergency Contact</Label>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="font-medium">{currentGuest.emergencyContact.name}</p>
                    <p className="text-sm text-gray-600">{currentGuest.emergencyContact.phone}</p>
                    <p className="text-sm text-gray-500">{currentGuest.emergencyContact.relationship}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Booking Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Check-in Date</Label>
                  <div className="p-2 bg-gray-50 rounded">
                    {currentGuest.checkInDate.toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Check-out Date</Label>
                  <div className="p-2 bg-gray-50 rounded">
                    {currentGuest.checkOutDate.toLocaleDateString()}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Number of Guests</Label>
                  <div className="p-2 bg-gray-50 rounded">
                    {currentGuest.numberOfGuests} guests
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Total Amount</Label>
                  <div className="p-2 bg-gray-50 rounded font-semibold">
                    ${currentGuest.totalAmount}
                  </div>
                </div>
              </div>

              {currentGuest.damageDeposit && (
                <div className="space-y-2">
                  <Label>Damage Deposit</Label>
                  <div className="p-2 bg-gray-50 rounded">
                    ${currentGuest.damageDeposit}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ID Information */}
          {currentGuest.idType && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>ID Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ID Type</Label>
                    <div className="p-2 bg-gray-50 rounded">
                      {currentGuest.idType?.replace('_', ' ')}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>ID Number</Label>
                    <div className="p-2 bg-gray-50 rounded">
                      {currentGuest.idNumber}
                    </div>
                  </div>
                  
                  {currentGuest.idExpiryDate && (
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <div className="p-2 bg-gray-50 rounded">
                        {new Date(currentGuest.idExpiryDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  
                  {currentGuest.nationality && (
                    <div className="space-y-2">
                      <Label>Nationality</Label>
                      <div className="p-2 bg-gray-50 rounded">
                        {currentGuest.nationality}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4 text-blue-600" />
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => sendWelcomeMessage(guestId)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Welcome Message
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => sendCheckoutReminder(guestId)}
              >
                <Clock className="h-4 w-4 mr-2" />
                Send Checkout Reminder
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => sendHouseRules(guestId)}
              >
                <Shield className="h-4 w-4 mr-2" />
                Send House Rules
              </Button>
            </CardContent>
          </Card>

          {/* Communications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Communications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communications.slice(0, 3).map((comm) => (
                  <div key={comm.id} className="p-3 border rounded-lg">
                    <p className="text-sm font-medium">{comm.subject}</p>
                    <p className="text-xs text-gray-500">
                      {comm.type.replace('_', ' ')} • {comm.sentAt.toLocaleDateString()}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {comm.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          {reviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Reviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="p-3 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
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
                        <span className="text-sm font-medium">{review.rating}/5</span>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {review.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preferences */}
          {preferences && (
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Language: {preferences.language}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Currency: {preferences.currency}</span>
                </div>
                {preferences.accessibilityNeeds.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-sm font-medium">Accessibility Needs:</span>
                    <div className="flex flex-wrap gap-1">
                      {preferences.accessibilityNeeds.map((need, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
