import { useConfigurationStore } from '@/store/useConfigurationStore';
import { useUserStore } from '@/store/useUserStore';
import { useOrderStore } from '@/store/useOrderStore';
import { useUIStore } from '@/store/useUIStore';
import { useAuthStore } from '@/store/useAuthStore';

/**
 * Centralized hook for accessing all stores
 * This provides a single entry point for all state management
 */
export function useStores() {
  return {
    configuration: useConfigurationStore(),
    user: useUserStore(),
    order: useOrderStore(),
    ui: useUIStore(),
    auth: useAuthStore(),
  };
}

/**
 * Hook for accessing only the stores you need
 * This is more performant as it only subscribes to the stores you use
 */
export function useStoreSelector<T>(
  selector: (stores: ReturnType<typeof useStores>) => T
): T {
  const stores = useStores();
  return selector(stores);
}

/**
 * Hook for common store operations
 */
export function useStoreActions() {
  const stores = useStores();
  
  return {
    // Configuration actions
    saveConfiguration: stores.configuration.saveConfiguration,
    loadConfiguration: stores.configuration.loadConfiguration,
    resetConfiguration: stores.configuration.reset,
    
    // User actions
    login: stores.auth.login,
    logout: stores.user.logout,
    updateUserPreferences: stores.user.updatePreferences,
    
    // Order actions
    createOrder: stores.order.createOrder,
    processPayment: stores.order.processPayment,
    cancelOrder: stores.order.cancelOrder,
    
    // UI actions
    showNotification: stores.ui.addNotification,
    showToast: stores.ui.addToast,
    openModal: stores.ui.openModal,
    closeModal: stores.ui.closeModal,
    setLoading: stores.ui.setLoading,
    setError: stores.ui.setError,
  };
}

/**
 * Hook for accessing store state without subscribing to changes
 * Useful for one-time reads or in effects
 */
export function useStoreState() {
  const stores = useStores();
  
  return {
    // Configuration state
    configuration: stores.configuration.configuration,
    property: stores.configuration.property,
    stepProgress: stores.configuration.stepProgress,
    
    // User state
    user: stores.user.user,
    isAuthenticated: stores.user.isAuthenticated,
    userPreferences: stores.user.preferences,
    
    // Order state
    currentOrder: stores.order.currentOrder,
    orders: stores.order.orders,
    
    // UI state
    theme: stores.ui.theme,
    sidebarOpen: stores.ui.sidebarOpen,
    notifications: stores.ui.notifications,
    toasts: stores.ui.toasts,
    loadingStates: stores.ui.loadingStates,
    error: stores.ui.error,
  };
}

/**
 * Hook for common store selectors
 */
export function useStoreSelectors() {
  const stores = useStores();
  
  return {
    // Check if any store is loading
    isAnyLoading: () => {
      return stores.configuration.isLoading ||
             stores.user.isLoading ||
             stores.order.isLoading ||
             Object.values(stores.ui.loadingStates).some(Boolean);
    },
    
    // Get total configuration price
    getTotalPrice: () => {
      return stores.configuration.configuration?.totalPrice || 0;
    },
    
    // Check if user has completed setup
    hasCompletedSetup: () => {
      return stores.configuration.stepProgress.completedSteps.length >= 4;
    },
    
    // Get current step
    getCurrentStep: () => {
      return stores.configuration.stepProgress.currentStep;
    },
    
    // Check if user can proceed to next step
    canProceedToNextStep: () => {
      const { currentStep, completedSteps } = stores.configuration.stepProgress;
      return completedSteps.includes(currentStep);
    },
  };
}
