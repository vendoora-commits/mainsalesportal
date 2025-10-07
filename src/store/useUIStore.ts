import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
  createdAt: Date;
}

interface UIState {
  // Theme and appearance
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: UIState['theme']) => void;
  
  // Sidebar and navigation
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  
  // Modal management
  modals: {
    [key: string]: {
      isOpen: boolean;
      data?: unknown;
    };
  };
  openModal: (modalId: string, data?: unknown) => void;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;
  
  // Notification system
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Loading states
  loadingStates: {
    [key: string]: boolean;
  };
  setLoading: (key: string, loading: boolean) => void;
  isLoading: (key: string) => boolean;
  
  // Toast messages
  toasts: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
    createdAt: Date;
  }>;
  addToast: (toast: Omit<UIState['toasts'][0], 'id' | 'createdAt'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  
  // Viewport and responsive state
  viewport: {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };
  setViewport: (viewport: Partial<UIState['viewport']>) => void;
  
  // Search and filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    [key: string]: unknown;
  };
  setFilter: (key: string, value: unknown) => void;
  clearFilters: () => void;
  
  // Error boundary state
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      sidebarOpen: false,
      modals: {},
      notifications: [],
      loadingStates: {},
      toasts: [],
      viewport: {
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      },
      searchQuery: '',
      filters: {},
      error: null,
      
      setTheme: (theme) => set({ theme }),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      openModal: (modalId, data) => set((state) => ({
        modals: {
          ...state.modals,
          [modalId]: { isOpen: true, data },
        },
      })),
      
      closeModal: (modalId) => set((state) => ({
        modals: {
          ...state.modals,
          [modalId]: { isOpen: false },
        },
      })),
      
      closeAllModals: () => set({ modals: {} }),
      
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: generateId(),
          createdAt: new Date(),
        };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));
        
        // Auto-remove notification after duration
        if (notification.duration && notification.duration > 0) {
          setTimeout(() => {
            get().removeNotification(newNotification.id);
          }, notification.duration);
        }
      },
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id),
      })),
      
      clearNotifications: () => set({ notifications: [] }),
      
      setLoading: (key, loading) => set((state) => ({
        loadingStates: {
          ...state.loadingStates,
          [key]: loading,
        },
      })),
      
      isLoading: (key) => {
        const { loadingStates } = get();
        return loadingStates[key] || false;
      },
      
      addToast: (toast) => {
        const newToast = {
          ...toast,
          id: generateId(),
          createdAt: new Date(),
        };
        
        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));
        
        // Auto-remove toast after duration
        const duration = toast.duration || 5000;
        setTimeout(() => {
          get().removeToast(newToast.id);
        }, duration);
      },
      
      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id),
      })),
      
      clearToasts: () => set({ toasts: [] }),
      
      setViewport: (viewport) => set((state) => ({
        viewport: { ...state.viewport, ...viewport },
      })),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setFilter: (key, value) => set((state) => ({
        filters: { ...state.filters, [key]: value },
      })),
      
      clearFilters: () => set({ filters: {} }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        viewport: state.viewport,
        filters: state.filters,
      }),
    }
  )
);
