import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  BookingIntegration, 
  BookingCalendar, 
  PricingRule, 
  SyncLog, 
  PlatformBooking,
  BookingPlatform
} from '@/types';

interface BookingIntegrationState {
  // Integration data
  integrations: BookingIntegration[];
  currentIntegration: BookingIntegration | null;
  
  // Calendar data
  calendar: BookingCalendar[];
  
  // Pricing rules
  pricingRules: PricingRule[];
  
  // Sync logs
  syncLogs: SyncLog[];
  
  // Platform bookings
  platformBookings: PlatformBooking[];
  
  // Loading and error states
  isLoading: boolean;
  isSyncing: boolean;
  error: string | null;
  
  // Integration management
  addIntegration: (integration: Omit<BookingIntegration, 'id' | 'createdAt' | 'updatedAt'>) => Promise<BookingIntegration>;
  updateIntegration: (id: string, updates: Partial<BookingIntegration>) => Promise<void>;
  deleteIntegration: (id: string) => Promise<void>;
  getIntegration: (id: string) => BookingIntegration | null;
  getIntegrationsByProperty: (propertyId: string) => BookingIntegration[];
  getIntegrationByPlatform: (propertyId: string, platform: BookingPlatform) => BookingIntegration | null;
  toggleIntegration: (id: string) => Promise<void>;
  
  // Calendar management
  updateCalendar: (propertyId: string, dates: BookingCalendar[]) => Promise<void>;
  getCalendarForDateRange: (propertyId: string, startDate: Date, endDate: Date) => BookingCalendar[];
  blockDates: (propertyId: string, startDate: Date, endDate: Date, reason?: string) => Promise<void>;
  unblockDates: (propertyId: string, startDate: Date, endDate: Date) => Promise<void>;
  updatePrice: (propertyId: string, date: Date, price: number) => Promise<void>;
  
  // Pricing rules
  addPricingRule: (rule: Omit<PricingRule, 'id' | 'createdAt' | 'updatedAt'>) => Promise<PricingRule>;
  updatePricingRule: (id: string, updates: Partial<PricingRule>) => Promise<void>;
  deletePricingRule: (id: string) => Promise<void>;
  getPricingRules: (propertyId: string) => PricingRule[];
  togglePricingRule: (id: string) => Promise<void>;
  calculatePrice: (propertyId: string, date: Date, basePrice: number) => number;
  
  // Sync operations
  syncCalendar: (integrationId: string) => Promise<void>;
  syncPricing: (integrationId: string) => Promise<void>;
  syncBookings: (integrationId: string) => Promise<void>;
  syncAll: (integrationId: string) => Promise<void>;
  getSyncLogs: (integrationId: string) => SyncLog[];
  getRecentSyncLogs: (propertyId: string, limit?: number) => SyncLog[];
  
  // Platform bookings
  importBooking: (booking: Omit<PlatformBooking, 'id' | 'createdAt' | 'updatedAt'>) => Promise<PlatformBooking>;
  getBookingsByProperty: (propertyId: string) => PlatformBooking[];
  getBookingsByPlatform: (propertyId: string, platform: BookingPlatform) => PlatformBooking[];
  getUpcomingBookings: (propertyId: string) => PlatformBooking[];
  
  // Analytics
  getIntegrationStats: (propertyId: string) => {
    totalIntegrations: number;
    activeIntegrations: number;
    totalBookings: number;
    totalRevenue: number;
    lastSyncDate: Date | null;
    syncErrors: number;
  };
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  setSyncing: (syncing: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  integrations: [],
  currentIntegration: null,
  calendar: [],
  pricingRules: [],
  syncLogs: [],
  platformBookings: [],
  isLoading: false,
  isSyncing: false,
  error: null,
};

export const useBookingIntegrationStore = create<BookingIntegrationState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Integration management
      addIntegration: async (integrationData) => {
        set({ isLoading: true, error: null });
        try {
          const newIntegration: BookingIntegration = {
            ...integrationData,
            id: `integration_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            integrations: [...state.integrations, newIntegration],
            currentIntegration: newIntegration,
          }));
          
          // Auto-sync on first connection
          if (newIntegration.isActive) {
            await get().syncAll(newIntegration.id);
          }
          
          return newIntegration;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add integration' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateIntegration: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            integrations: state.integrations.map(integration =>
              integration.id === id
                ? { ...integration, ...updates, updatedAt: new Date() }
                : integration
            ),
            currentIntegration: state.currentIntegration?.id === id
              ? { ...state.currentIntegration, ...updates, updatedAt: new Date() }
              : state.currentIntegration,
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update integration' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      deleteIntegration: async (id) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            integrations: state.integrations.filter(integration => integration.id !== id),
            currentIntegration: state.currentIntegration?.id === id ? null : state.currentIntegration,
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete integration' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getIntegration: (id) => {
        return get().integrations.find(integration => integration.id === id) || null;
      },
      
      getIntegrationsByProperty: (propertyId) => {
        return get().integrations.filter(integration => integration.propertyId === propertyId);
      },
      
      getIntegrationByPlatform: (propertyId, platform) => {
        return get().integrations.find(
          integration => integration.propertyId === propertyId && integration.platform === platform
        ) || null;
      },
      
      toggleIntegration: async (id) => {
        const integration = get().getIntegration(id);
        if (integration) {
          await get().updateIntegration(id, { isActive: !integration.isActive });
        }
      },
      
      // Calendar management
      updateCalendar: async (propertyId, dates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => {
            // Remove existing entries for these dates
            const newCalendar = state.calendar.filter(
              entry => entry.propertyId !== propertyId || 
              !dates.some(d => d.date.getTime() === entry.date.getTime())
            );
            // Add new entries
            return { calendar: [...newCalendar, ...dates] };
          });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update calendar' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getCalendarForDateRange: (propertyId, startDate, endDate) => {
        return get().calendar.filter(
          entry => entry.propertyId === propertyId &&
          entry.date >= startDate &&
          entry.date <= endDate
        ).sort((a, b) => a.date.getTime() - b.date.getTime());
      },
      
      blockDates: async (propertyId, startDate, endDate, reason) => {
        const dates: BookingCalendar[] = [];
        const current = new Date(startDate);
        
        while (current <= endDate) {
          dates.push({
            id: `cal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            propertyId,
            date: new Date(current),
            isAvailable: false,
            price: 0,
            minStay: 1,
            maxStay: 30,
            notes: reason,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          current.setDate(current.getDate() + 1);
        }
        
        await get().updateCalendar(propertyId, dates);
      },
      
      unblockDates: async (propertyId, startDate, endDate) => {
        set((state) => ({
          calendar: state.calendar.filter(
            entry => !(entry.propertyId === propertyId &&
            entry.date >= startDate &&
            entry.date <= endDate &&
            !entry.bookingId)
          ),
        }));
      },
      
      updatePrice: async (propertyId, date, price) => {
        const existing = get().calendar.find(
          entry => entry.propertyId === propertyId && 
          entry.date.getTime() === date.getTime()
        );
        
        if (existing) {
          set((state) => ({
            calendar: state.calendar.map(entry =>
              entry.id === existing.id ? { ...entry, price, updatedAt: new Date() } : entry
            ),
          }));
        } else {
          await get().updateCalendar(propertyId, [{
            id: `cal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            propertyId,
            date,
            isAvailable: true,
            price,
            minStay: 1,
            maxStay: 30,
            createdAt: new Date(),
            updatedAt: new Date(),
          }]);
        }
      },
      
      // Pricing rules
      addPricingRule: async (ruleData) => {
        set({ isLoading: true, error: null });
        try {
          const newRule: PricingRule = {
            ...ruleData,
            id: `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            pricingRules: [...state.pricingRules, newRule],
          }));
          
          return newRule;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add pricing rule' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updatePricingRule: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            pricingRules: state.pricingRules.map(rule =>
              rule.id === id ? { ...rule, ...updates, updatedAt: new Date() } : rule
            ),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update pricing rule' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      deletePricingRule: async (id) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            pricingRules: state.pricingRules.filter(rule => rule.id !== id),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete pricing rule' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getPricingRules: (propertyId) => {
        return get().pricingRules
          .filter(rule => rule.propertyId === propertyId && rule.isActive)
          .sort((a, b) => b.priority - a.priority);
      },
      
      togglePricingRule: async (id) => {
        const rule = get().pricingRules.find(r => r.id === id);
        if (rule) {
          await get().updatePricingRule(id, { isActive: !rule.isActive });
        }
      },
      
      calculatePrice: (propertyId, date, basePrice) => {
        const rules = get().getPricingRules(propertyId);
        let finalPrice = basePrice;
        
        for (const rule of rules) {
          let applies = false;
          
          // Check date range
          if (rule.startDate && rule.endDate) {
            applies = date >= rule.startDate && date <= rule.endDate;
          }
          
          // Check day of week
          if (rule.daysOfWeek && rule.daysOfWeek.length > 0) {
            applies = rule.daysOfWeek.includes(date.getDay());
          }
          
          if (applies) {
            if (rule.adjustmentType === 'percentage') {
              finalPrice *= rule.adjustmentValue;
            } else {
              finalPrice += rule.adjustmentValue;
            }
          }
        }
        
        return Math.round(finalPrice * 100) / 100;
      },
      
      // Sync operations
      syncCalendar: async (integrationId) => {
        const integration = get().getIntegration(integrationId);
        if (!integration) throw new Error('Integration not found');
        
        set({ isSyncing: true });
        const startTime = new Date();
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const syncLog: SyncLog = {
            id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            integrationId,
            propertyId: integration.propertyId,
            platform: integration.platform,
            syncType: 'calendar',
            status: 'success',
            recordsProcessed: 365,
            recordsFailed: 0,
            message: 'Calendar synchronized successfully',
            startTime,
            endTime: new Date(),
            duration: Date.now() - startTime.getTime(),
          };
          
          set((state) => ({
            syncLogs: [syncLog, ...state.syncLogs],
          }));
          
          await get().updateIntegration(integrationId, { lastSyncDate: new Date() });
        } catch (error) {
          const errorLog: SyncLog = {
            id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            integrationId,
            propertyId: integration.propertyId,
            platform: integration.platform,
            syncType: 'calendar',
            status: 'failed',
            recordsProcessed: 0,
            recordsFailed: 0,
            message: error instanceof Error ? error.message : 'Sync failed',
            startTime,
            endTime: new Date(),
            duration: Date.now() - startTime.getTime(),
          };
          
          set((state) => ({
            syncLogs: [errorLog, ...state.syncLogs],
          }));
          
          throw error;
        } finally {
          set({ isSyncing: false });
        }
      },
      
      syncPricing: async (integrationId) => {
        const integration = get().getIntegration(integrationId);
        if (!integration) throw new Error('Integration not found');
        
        set({ isSyncing: true });
        const startTime = new Date();
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const syncLog: SyncLog = {
            id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            integrationId,
            propertyId: integration.propertyId,
            platform: integration.platform,
            syncType: 'pricing',
            status: 'success',
            recordsProcessed: 100,
            recordsFailed: 0,
            message: 'Pricing synchronized successfully',
            startTime,
            endTime: new Date(),
            duration: Date.now() - startTime.getTime(),
          };
          
          set((state) => ({
            syncLogs: [syncLog, ...state.syncLogs],
          }));
          
          await get().updateIntegration(integrationId, { lastSyncDate: new Date() });
        } finally {
          set({ isSyncing: false });
        }
      },
      
      syncBookings: async (integrationId) => {
        const integration = get().getIntegration(integrationId);
        if (!integration) throw new Error('Integration not found');
        
        set({ isSyncing: true });
        const startTime = new Date();
        
        try {
          await new Promise(resolve => setTimeout(resolve, 2500));
          
          const syncLog: SyncLog = {
            id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            integrationId,
            propertyId: integration.propertyId,
            platform: integration.platform,
            syncType: 'booking',
            status: 'success',
            recordsProcessed: 25,
            recordsFailed: 0,
            message: 'Bookings synchronized successfully',
            startTime,
            endTime: new Date(),
            duration: Date.now() - startTime.getTime(),
          };
          
          set((state) => ({
            syncLogs: [syncLog, ...state.syncLogs],
          }));
          
          await get().updateIntegration(integrationId, { lastSyncDate: new Date() });
        } finally {
          set({ isSyncing: false });
        }
      },
      
      syncAll: async (integrationId) => {
        await get().syncCalendar(integrationId);
        await get().syncPricing(integrationId);
        await get().syncBookings(integrationId);
      },
      
      getSyncLogs: (integrationId) => {
        return get().syncLogs.filter(log => log.integrationId === integrationId)
          .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
      },
      
      getRecentSyncLogs: (propertyId, limit = 10) => {
        return get().syncLogs
          .filter(log => log.propertyId === propertyId)
          .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
          .slice(0, limit);
      },
      
      // Platform bookings
      importBooking: async (bookingData) => {
        set({ isLoading: true, error: null });
        try {
          const newBooking: PlatformBooking = {
            ...bookingData,
            id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            platformBookings: [...state.platformBookings, newBooking],
          }));
          
          return newBooking;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to import booking' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getBookingsByProperty: (propertyId) => {
        return get().platformBookings.filter(booking => booking.propertyId === propertyId);
      },
      
      getBookingsByPlatform: (propertyId, platform) => {
        return get().platformBookings.filter(
          booking => booking.propertyId === propertyId && booking.platform === platform
        );
      },
      
      getUpcomingBookings: (propertyId) => {
        const now = new Date();
        return get().platformBookings
          .filter(booking => 
            booking.propertyId === propertyId && 
            booking.checkInDate >= now &&
            (booking.status === 'confirmed' || booking.status === 'pending')
          )
          .sort((a, b) => a.checkInDate.getTime() - b.checkInDate.getTime());
      },
      
      // Analytics
      getIntegrationStats: (propertyId) => {
        const integrations = get().getIntegrationsByProperty(propertyId);
        const bookings = get().getBookingsByProperty(propertyId);
        const logs = get().syncLogs.filter(log => log.propertyId === propertyId);
        
        return {
          totalIntegrations: integrations.length,
          activeIntegrations: integrations.filter(i => i.isActive).length,
          totalBookings: bookings.length,
          totalRevenue: bookings.reduce((sum, booking) => sum + booking.totalAmount, 0),
          lastSyncDate: integrations.reduce<Date | null>((latest, integration) => {
            if (!integration.lastSyncDate) return latest;
            if (!latest || integration.lastSyncDate > latest) return integration.lastSyncDate;
            return latest;
          }, null),
          syncErrors: logs.filter(log => log.status === 'failed').length,
        };
      },
      
      // Utility actions
      setLoading: (loading) => set({ isLoading: loading }),
      setSyncing: (syncing) => set({ isSyncing: syncing }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      reset: () => set(initialState),
    }),
    {
      name: 'booking-integration-store',
      partialize: (state) => ({
        integrations: state.integrations,
        calendar: state.calendar,
        pricingRules: state.pricingRules,
        syncLogs: state.syncLogs,
        platformBookings: state.platformBookings,
      }),
    }
  )
);
