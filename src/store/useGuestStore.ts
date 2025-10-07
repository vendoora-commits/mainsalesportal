import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Guest, 
  GuestCommunication, 
  GuestActivity, 
  GuestReview, 
  GuestPreferences,
  GuestStatus,
  BookingPlatform
} from '@/types';

interface GuestState {
  // Guest data
  guests: Guest[];
  currentGuest: Guest | null;
  
  // Communication data
  communications: GuestCommunication[];
  
  // Activity data
  activities: GuestActivity[];
  
  // Review data
  reviews: GuestReview[];
  
  // Preferences data
  preferences: GuestPreferences[];
  
  // Loading and error states
  isLoading: boolean;
  error: string | null;
  
  // Actions
  // Guest management
  addGuest: (guest: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Guest>;
  updateGuest: (id: string, updates: Partial<Guest>) => Promise<void>;
  deleteGuest: (id: string) => Promise<void>;
  getGuest: (id: string) => Guest | null;
  getGuestsByProperty: (propertyId: string) => Guest[];
  getGuestsByStatus: (status: GuestStatus) => Guest[];
  getGuestsByDateRange: (startDate: Date, endDate: Date) => Guest[];
  
  // Communication management
  addCommunication: (communication: Omit<GuestCommunication, 'id' | 'sentAt'>) => Promise<GuestCommunication>;
  updateCommunication: (id: string, updates: Partial<GuestCommunication>) => Promise<void>;
  getCommunicationsByGuest: (guestId: string) => GuestCommunication[];
  sendWelcomeMessage: (guestId: string) => Promise<void>;
  sendCheckoutReminder: (guestId: string) => Promise<void>;
  sendHouseRules: (guestId: string) => Promise<void>;
  
  // Activity management
  addActivity: (activity: Omit<GuestActivity, 'id' | 'timestamp'>) => Promise<GuestActivity>;
  updateActivity: (id: string, updates: Partial<GuestActivity>) => Promise<void>;
  resolveActivity: (id: string, resolvedBy: string) => Promise<void>;
  getActivitiesByGuest: (guestId: string) => GuestActivity[];
  getUnresolvedActivities: () => GuestActivity[];
  
  // Review management
  addReview: (review: Omit<GuestReview, 'id' | 'createdAt' | 'updatedAt'>) => Promise<GuestReview>;
  updateReview: (id: string, updates: Partial<GuestReview>) => Promise<void>;
  getReviewsByProperty: (propertyId: string) => GuestReview[];
  getReviewsByGuest: (guestId: string) => GuestReview[];
  getAverageRating: (propertyId: string) => number;
  
  // Preferences management
  updatePreferences: (guestId: string, preferences: Partial<GuestPreferences>) => Promise<void>;
  getPreferences: (guestId: string) => GuestPreferences | null;
  
  // Check-in/Check-out
  checkInGuest: (guestId: string) => Promise<void>;
  checkOutGuest: (guestId: string) => Promise<void>;
  cancelGuest: (guestId: string, reason: string) => Promise<void>;
  
  // Analytics
  getGuestStats: (propertyId: string) => {
    totalGuests: number;
    checkedIn: number;
    checkedOut: number;
    pending: number;
    cancelled: number;
    averageRating: number;
    totalRevenue: number;
  };
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  guests: [],
  currentGuest: null,
  communications: [],
  activities: [],
  reviews: [],
  preferences: [],
  isLoading: false,
  error: null,
};

export const useGuestStore = create<GuestState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Guest management
      addGuest: async (guestData) => {
        set({ isLoading: true, error: null });
        try {
          const newGuest: Guest = {
            ...guestData,
            id: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            guests: [...state.guests, newGuest],
            currentGuest: newGuest,
          }));
          
          // Auto-send welcome message if configured
          if (guestData.status === 'confirmed') {
            await get().sendWelcomeMessage(newGuest.id);
          }
          
          return newGuest;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add guest' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateGuest: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            guests: state.guests.map(guest =>
              guest.id === id
                ? { ...guest, ...updates, updatedAt: new Date() }
                : guest
            ),
            currentGuest: state.currentGuest?.id === id
              ? { ...state.currentGuest, ...updates, updatedAt: new Date() }
              : state.currentGuest,
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update guest' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      deleteGuest: async (id) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            guests: state.guests.filter(guest => guest.id !== id),
            currentGuest: state.currentGuest?.id === id ? null : state.currentGuest,
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete guest' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getGuest: (id) => {
        return get().guests.find(guest => guest.id === id) || null;
      },
      
      getGuestsByProperty: (propertyId) => {
        return get().guests.filter(guest => guest.propertyId === propertyId);
      },
      
      getGuestsByStatus: (status) => {
        return get().guests.filter(guest => guest.status === status);
      },
      
      getGuestsByDateRange: (startDate, endDate) => {
        return get().guests.filter(guest =>
          guest.checkInDate >= startDate && guest.checkOutDate <= endDate
        );
      },
      
      // Communication management
      addCommunication: async (communicationData) => {
        set({ isLoading: true, error: null });
        try {
          const newCommunication: GuestCommunication = {
            ...communicationData,
            id: `comm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            sentAt: new Date(),
          };
          
          set((state) => ({
            communications: [...state.communications, newCommunication],
          }));
          
          return newCommunication;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add communication' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateCommunication: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            communications: state.communications.map(comm =>
              comm.id === id ? { ...comm, ...updates } : comm
            ),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update communication' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getCommunicationsByGuest: (guestId) => {
        return get().communications.filter(comm => comm.guestId === guestId);
      },
      
      sendWelcomeMessage: async (guestId) => {
        const guest = get().getGuest(guestId);
        if (!guest) throw new Error('Guest not found');
        
        await get().addCommunication({
          guestId,
          type: 'welcome',
          subject: `Welcome to ${guest.firstName}!`,
          message: `Hi ${guest.firstName}, welcome to your stay! We're excited to host you. Check-in instructions will be sent separately.`,
          status: 'sent',
          channel: 'email',
        });
      },
      
      sendCheckoutReminder: async (guestId) => {
        const guest = get().getGuest(guestId);
        if (!guest) throw new Error('Guest not found');
        
        await get().addCommunication({
          guestId,
          type: 'checkout_reminder',
          subject: 'Checkout Reminder',
          message: `Hi ${guest.firstName}, this is a reminder that checkout is at 11:00 AM. Please ensure all belongings are collected.`,
          status: 'sent',
          channel: 'email',
        });
      },
      
      sendHouseRules: async (guestId) => {
        const guest = get().getGuest(guestId);
        if (!guest) throw new Error('Guest not found');
        
        await get().addCommunication({
          guestId,
          type: 'house_rules',
          subject: 'House Rules and Guidelines',
          message: `Hi ${guest.firstName}, please review our house rules: No smoking, no parties, quiet hours 10 PM - 8 AM, etc.`,
          status: 'sent',
          channel: 'email',
        });
      },
      
      // Activity management
      addActivity: async (activityData) => {
        set({ isLoading: true, error: null });
        try {
          const newActivity: GuestActivity = {
            ...activityData,
            id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
          };
          
          set((state) => ({
            activities: [...state.activities, newActivity],
          }));
          
          return newActivity;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add activity' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateActivity: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            activities: state.activities.map(activity =>
              activity.id === id ? { ...activity, ...updates } : activity
            ),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update activity' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      resolveActivity: async (id, resolvedBy) => {
        await get().updateActivity(id, {
          resolved: true,
          resolvedAt: new Date(),
          resolvedBy,
        });
      },
      
      getActivitiesByGuest: (guestId) => {
        return get().activities.filter(activity => activity.guestId === guestId);
      },
      
      getUnresolvedActivities: () => {
        return get().activities.filter(activity => !activity.resolved);
      },
      
      // Review management
      addReview: async (reviewData) => {
        set({ isLoading: true, error: null });
        try {
          const newReview: GuestReview = {
            ...reviewData,
            id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            reviews: [...state.reviews, newReview],
          }));
          
          return newReview;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add review' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateReview: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            reviews: state.reviews.map(review =>
              review.id === id ? { ...review, ...updates, updatedAt: new Date() } : review
            ),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update review' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getReviewsByProperty: (propertyId) => {
        return get().reviews.filter(review => review.propertyId === propertyId);
      },
      
      getReviewsByGuest: (guestId) => {
        return get().reviews.filter(review => review.guestId === guestId);
      },
      
      getAverageRating: (propertyId) => {
        const reviews = get().getReviewsByProperty(propertyId);
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        return total / reviews.length;
      },
      
      // Preferences management
      updatePreferences: async (guestId, preferencesData) => {
        set({ isLoading: true, error: null });
        try {
          const existing = get().preferences.find(p => p.guestId === guestId);
          if (existing) {
            set((state) => ({
              preferences: state.preferences.map(p =>
                p.guestId === guestId
                  ? { ...p, ...preferencesData, updatedAt: new Date() }
                  : p
              ),
            }));
          } else {
            const newPreferences: GuestPreferences = {
              id: `pref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              guestId,
              language: 'en',
              currency: 'USD',
              timezone: 'UTC',
              communicationPreferences: {
                email: true,
                sms: false,
                appNotifications: true,
                marketing: false,
              },
              accessibilityNeeds: [],
              ...preferencesData,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            
            set((state) => ({
              preferences: [...state.preferences, newPreferences],
            }));
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update preferences' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getPreferences: (guestId) => {
        return get().preferences.find(p => p.guestId === guestId) || null;
      },
      
      // Check-in/Check-out
      checkInGuest: async (guestId) => {
        await get().updateGuest(guestId, { status: 'checked_in' });
        await get().addActivity({
          guestId,
          type: 'check_in',
          description: 'Guest checked in',
          resolved: true,
          resolvedAt: new Date(),
          resolvedBy: 'system',
        });
      },
      
      checkOutGuest: async (guestId) => {
        await get().updateGuest(guestId, { status: 'checked_out' });
        await get().addActivity({
          guestId,
          type: 'check_out',
          description: 'Guest checked out',
          resolved: true,
          resolvedAt: new Date(),
          resolvedBy: 'system',
        });
      },
      
      cancelGuest: async (guestId, reason) => {
        await get().updateGuest(guestId, { status: 'cancelled' });
        await get().addActivity({
          guestId,
          type: 'complaint',
          description: `Booking cancelled: ${reason}`,
          resolved: true,
          resolvedAt: new Date(),
          resolvedBy: 'system',
        });
      },
      
      // Analytics
      getGuestStats: (propertyId) => {
        const guests = get().getGuestsByProperty(propertyId);
        const reviews = get().getReviewsByProperty(propertyId);
        
        return {
          totalGuests: guests.length,
          checkedIn: guests.filter(g => g.status === 'checked_in').length,
          checkedOut: guests.filter(g => g.status === 'checked_out').length,
          pending: guests.filter(g => g.status === 'pending').length,
          cancelled: guests.filter(g => g.status === 'cancelled').length,
          averageRating: get().getAverageRating(propertyId),
          totalRevenue: guests.reduce((sum, guest) => sum + guest.totalAmount, 0),
        };
      },
      
      // Utility actions
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      reset: () => set(initialState),
    }),
    {
      name: 'guest-store',
      partialize: (state) => ({
        guests: state.guests,
        communications: state.communications,
        activities: state.activities,
        reviews: state.reviews,
        preferences: state.preferences,
      }),
    }
  )
);
