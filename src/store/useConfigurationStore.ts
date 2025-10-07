import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Property, 
  Configuration, 
  KioskConfiguration, 
  SmartLockConfiguration, 
  RoomFeaturesConfiguration,
  StepProgress 
} from '@/types';

interface ConfigurationState {
  // Property data
  property: Property | null;
  setProperty: (property: Property) => void;
  updateProperty: (updates: Partial<Property>) => void;
  
  // Configuration data
  configuration: Configuration | null;
  setConfiguration: (configuration: Configuration) => void;
  updateKioskConfig: (config: KioskConfiguration) => void;
  updateSmartLockConfig: (config: SmartLockConfiguration) => void;
  updateRoomFeaturesConfig: (config: RoomFeaturesConfiguration) => void;
  
  // Step progress
  stepProgress: StepProgress;
  setCurrentStep: (step: number) => void;
  completeStep: (step: number) => void;
  resetProgress: () => void;
  
  // UI state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  
  // Actions
  reset: () => void;
  saveConfiguration: () => Promise<void>;
  loadConfiguration: (id: string) => Promise<void>;
}

const initialState = {
  property: null,
  configuration: null,
  stepProgress: {
    currentStep: 1,
    totalSteps: 4,
    completedSteps: [],
  },
  isLoading: false,
  error: null,
};

export const useConfigurationStore = create<ConfigurationState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setProperty: (property) => set({ property }),
      
      updateProperty: (updates) => set((state) => ({
        property: state.property ? { ...state.property, ...updates } : null,
      })),
      
      setConfiguration: (configuration) => set({ configuration }),
      
      updateKioskConfig: (config) => set((state) => {
        const currentConfig = state.configuration || {
          id: '',
          propertyId: '',
          kioskConfig: { selectedOptions: [], totalPrice: 0 },
          smartLockConfig: { selectedOptions: [], totalPrice: 0 },
          roomFeaturesConfig: { selectedOptions: [], totalPrice: 0 },
          totalPrice: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        return {
          configuration: {
            ...currentConfig,
            kioskConfig: config,
            totalPrice: (currentConfig.smartLockConfig?.totalPrice || 0) + 
                       (currentConfig.roomFeaturesConfig?.totalPrice || 0) + 
                       config.totalPrice,
            updatedAt: new Date(),
          },
        };
      }),
      
      updateSmartLockConfig: (config) => set((state) => {
        const currentConfig = state.configuration || {
          id: '',
          propertyId: '',
          kioskConfig: { selectedOptions: [], totalPrice: 0 },
          smartLockConfig: { selectedOptions: [], totalPrice: 0 },
          roomFeaturesConfig: { selectedOptions: [], totalPrice: 0 },
          totalPrice: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        return {
          configuration: {
            ...currentConfig,
            smartLockConfig: config,
            totalPrice: (currentConfig.kioskConfig?.totalPrice || 0) + 
                       (currentConfig.roomFeaturesConfig?.totalPrice || 0) + 
                       config.totalPrice,
            updatedAt: new Date(),
          },
        };
      }),
      
      updateRoomFeaturesConfig: (config) => set((state) => {
        const currentConfig = state.configuration || {
          id: '',
          propertyId: '',
          kioskConfig: { selectedOptions: [], totalPrice: 0 },
          smartLockConfig: { selectedOptions: [], totalPrice: 0 },
          roomFeaturesConfig: { selectedOptions: [], totalPrice: 0 },
          totalPrice: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        return {
          configuration: {
            ...currentConfig,
            roomFeaturesConfig: config,
            totalPrice: (currentConfig.kioskConfig?.totalPrice || 0) + 
                       (currentConfig.smartLockConfig?.totalPrice || 0) + 
                       config.totalPrice,
            updatedAt: new Date(),
          },
        };
      }),
      
      setCurrentStep: (step) => set((state) => ({
        stepProgress: {
          ...state.stepProgress,
          currentStep: step,
        },
      })),
      
      completeStep: (step) => set((state) => ({
        stepProgress: {
          ...state.stepProgress,
          completedSteps: [...state.stepProgress.completedSteps, step],
        },
      })),
      
      resetProgress: () => set((state) => ({
        stepProgress: {
          ...state.stepProgress,
          currentStep: 1,
          completedSteps: [],
        },
      })),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      reset: () => set(initialState),
      
          saveConfiguration: async () => {
            const { configuration, property } = get();
            if (!configuration || !property) return;

            set({ isLoading: true, error: null });

            try {
              const response = await fetch('/api/configurations', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  propertyId: property.id,
                  kioskConfig: configuration.kioskConfig,
                  smartLockConfig: configuration.smartLockConfig,
                  roomFeaturesConfig: configuration.roomFeaturesConfig,
                  totalPrice: configuration.totalPrice,
                }),
              });

              const result = await response.json();
              
              if (!result.success) {
                throw new Error(result.error || 'Failed to save configuration');
              }

              // Update configuration with saved data
              set({ configuration: { ...configuration, id: result.data.id } });
            } catch (error) {
              set({ error: error instanceof Error ? error.message : 'Failed to save configuration' });
            } finally {
              set({ isLoading: false });
            }
          },
      
      loadConfiguration: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implement API call to load configuration
          console.log('Loading configuration:', id);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to load configuration' });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'configuration-store',
      partialize: (state) => ({
        property: state.property,
        configuration: state.configuration,
        stepProgress: state.stepProgress,
      }),
    }
  )
);
