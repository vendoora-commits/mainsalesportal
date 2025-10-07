import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types';

interface UserState {
  // User data
  user: User | null;
  isAuthenticated: boolean;
  
  // Authentication actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  
  // User preferences
  preferences: {
    language: string;
    currency: string;
    timezone: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    theme: 'light' | 'dark' | 'system';
  };
  updatePreferences: (preferences: Partial<UserState['preferences']>) => void;
  
  // Session management
  session: {
    token: string | null;
    expiresAt: Date | null;
    refreshToken: string | null;
  };
  setSession: (session: Partial<UserState['session']>) => void;
  clearSession: () => void;
  
  // Loading and error states
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const defaultPreferences = {
  language: 'en',
  currency: 'USD',
  timezone: 'UTC',
  notifications: {
    email: true,
    sms: false,
    push: true,
  },
  theme: 'system' as const,
};

const defaultSession = {
  token: null,
  expiresAt: null,
  refreshToken: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      preferences: defaultPreferences,
      session: defaultSession,
      isLoading: false,
      error: null,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: true 
      }),
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),
      
      logout: () => set({
        user: null,
        isAuthenticated: false,
        session: defaultSession,
        error: null,
      }),
      
      updatePreferences: (newPreferences) => set((state) => ({
        preferences: { ...state.preferences, ...newPreferences },
      })),
      
      setSession: (sessionData) => set((state) => ({
        session: { ...state.session, ...sessionData },
      })),
      
      clearSession: () => set({
        session: defaultSession,
        isAuthenticated: false,
      }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        preferences: state.preferences,
        session: state.session,
      }),
    }
  )
);
