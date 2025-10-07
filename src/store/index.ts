// Centralized store exports
export { useConfigurationStore } from './useConfigurationStore';
export { useUserStore } from './useUserStore';
export { useOrderStore } from './useOrderStore';
export { useUIStore } from './useUIStore';
export { useAuthStore } from './useAuthStore';
export { useGuestStore } from './useGuestStore';
export { useBookingIntegrationStore } from './useBookingIntegrationStore';
export { useCleaningStore } from './useCleaningStore';

// Store hooks for common patterns
export const useStores = () => ({
  configuration: useConfigurationStore(),
  user: useUserStore(),
  order: useOrderStore(),
  ui: useUIStore(),
  auth: useAuthStore(),
  guest: useGuestStore(),
  bookingIntegration: useBookingIntegrationStore(),
  cleaning: useCleaningStore(),
});

// Type exports for store state
export type { ConfigurationState } from './useConfigurationStore';
export type { UserState } from './useUserStore';
export type { OrderState } from './useOrderStore';
export type { UIState } from './useUIStore';
export type { AuthState } from './useAuthStore';
