import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  CleaningTask,
  CleaningStaff,
  CleaningChecklist,
  MaintenanceRequest,
  CleaningSchedule,
  QualityInspection,
  CleaningTaskStatus
} from '@/types';

interface CleaningState {
  // Cleaning tasks
  tasks: CleaningTask[];
  currentTask: CleaningTask | null;
  
  // Staff management
  staff: CleaningStaff[];
  
  // Checklists
  checklists: CleaningChecklist[];
  
  // Maintenance
  maintenanceRequests: MaintenanceRequest[];
  
  // Schedules
  schedules: CleaningSchedule[];
  
  // Quality inspections
  inspections: QualityInspection[];
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Task management
  addTask: (task: Omit<CleaningTask, 'id' | 'createdAt' | 'updatedAt'>) => Promise<CleaningTask>;
  updateTask: (id: string, updates: Partial<CleaningTask>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTask: (id: string) => CleaningTask | null;
  getTasksByProperty: (propertyId: string) => CleaningTask[];
  getTasksByStatus: (status: CleaningTaskStatus) => CleaningTask[];
  getTasksByDate: (date: Date) => CleaningTask[];
  assignTask: (taskId: string, staffId: string) => Promise<void>;
  startTask: (taskId: string) => Promise<void>;
  completeTask: (taskId: string, completedBy: string) => Promise<void>;
  verifyTask: (taskId: string, reviewedBy: string, score: number) => Promise<void>;
  
  // Staff management
  addStaff: (staff: Omit<CleaningStaff, 'id' | 'createdAt' | 'updatedAt'>) => Promise<CleaningStaff>;
  updateStaff: (id: string, updates: Partial<CleaningStaff>) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
  getStaff: (id: string) => CleaningStaff | null;
  getAvailableStaff: (date: Date) => CleaningStaff[];
  getStaffByTeam: (team: string) => CleaningStaff[];
  
  // Checklist management
  addChecklist: (checklist: Omit<CleaningChecklist, 'id' | 'createdAt' | 'updatedAt'>) => Promise<CleaningChecklist>;
  updateChecklist: (id: string, updates: Partial<CleaningChecklist>) => Promise<void>;
  deleteChecklist: (id: string) => Promise<void>;
  getChecklists: (propertyId: string) => CleaningChecklist[];
  getDefaultChecklist: (propertyId: string, type: string) => CleaningChecklist | null;
  
  // Maintenance management
  addMaintenanceRequest: (request: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>) => Promise<MaintenanceRequest>;
  updateMaintenanceRequest: (id: string, updates: Partial<MaintenanceRequest>) => Promise<void>;
  getMaintenanceRequests: (propertyId: string) => MaintenanceRequest[];
  getOpenMaintenanceRequests: (propertyId: string) => MaintenanceRequest[];
  assignMaintenance: (requestId: string, staffId: string) => Promise<void>;
  completeMaintenance: (requestId: string, resolution: string, cost: number) => Promise<void>;
  
  // Schedule management
  addSchedule: (schedule: Omit<CleaningSchedule, 'id' | 'createdAt' | 'updatedAt'>) => Promise<CleaningSchedule>;
  updateSchedule: (id: string, updates: Partial<CleaningSchedule>) => Promise<void>;
  deleteSchedule: (id: string) => Promise<void>;
  getSchedules: (propertyId: string) => CleaningSchedule[];
  
  // Quality inspection
  addInspection: (inspection: Omit<QualityInspection, 'id' | 'createdAt' | 'updatedAt'>) => Promise<QualityInspection>;
  getInspections: (propertyId: string) => QualityInspection[];
  getInspectionsByTask: (taskId: string) => QualityInspection[];
  
  // Auto-scheduling
  autoScheduleTasks: (propertyId: string, startDate: Date, endDate: Date) => Promise<void>;
  optimizeSchedule: (propertyId: string, date: Date) => Promise<void>;
  
  // Analytics
  getCleaningStats: (propertyId: string) => {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    averageScore: number;
    averageCompletionTime: number;
    totalStaff: number;
    openMaintenanceRequests: number;
  };
  
  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  tasks: [],
  currentTask: null,
  staff: [],
  checklists: [],
  maintenanceRequests: [],
  schedules: [],
  inspections: [],
  isLoading: false,
  error: null,
};

export const useCleaningStore = create<CleaningState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Task management
      addTask: async (taskData) => {
        set({ isLoading: true, error: null });
        try {
          const newTask: CleaningTask = {
            ...taskData,
            id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            tasks: [...state.tasks, newTask],
            currentTask: newTask,
          }));
          
          return newTask;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add task' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateTask: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            tasks: state.tasks.map(task =>
              task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
            ),
            currentTask: state.currentTask?.id === id
              ? { ...state.currentTask, ...updates, updatedAt: new Date() }
              : state.currentTask,
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update task' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      deleteTask: async (id) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id),
            currentTask: state.currentTask?.id === id ? null : state.currentTask,
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete task' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getTask: (id) => {
        return get().tasks.find(task => task.id === id) || null;
      },
      
      getTasksByProperty: (propertyId) => {
        return get().tasks.filter(task => task.propertyId === propertyId);
      },
      
      getTasksByStatus: (status) => {
        return get().tasks.filter(task => task.status === status);
      },
      
      getTasksByDate: (date) => {
        return get().tasks.filter(task => 
          task.scheduledDate.toDateString() === date.toDateString()
        );
      },
      
      assignTask: async (taskId, staffId) => {
        const staff = get().getStaff(staffId);
        if (!staff) throw new Error('Staff not found');
        
        await get().updateTask(taskId, {
          assignedTo: staffId,
          assignedTeam: staff.team,
        });
      },
      
      startTask: async (taskId) => {
        await get().updateTask(taskId, { status: 'in_progress' });
      },
      
      completeTask: async (taskId, completedBy) => {
        await get().updateTask(taskId, {
          status: 'completed',
          completedAt: new Date(),
          completedBy,
        });
      },
      
      verifyTask: async (taskId, reviewedBy, score) => {
        await get().updateTask(taskId, {
          status: 'verified',
          qualityScore: score,
          reviewedBy,
          reviewedAt: new Date(),
        });
      },
      
      // Staff management
      addStaff: async (staffData) => {
        set({ isLoading: true, error: null });
        try {
          const newStaff: CleaningStaff = {
            ...staffData,
            id: `staff_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            staff: [...state.staff, newStaff],
          }));
          
          return newStaff;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add staff' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateStaff: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            staff: state.staff.map(member =>
              member.id === id ? { ...member, ...updates, updatedAt: new Date() } : member
            ),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update staff' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      deleteStaff: async (id) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            staff: state.staff.filter(member => member.id !== id),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete staff' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getStaff: (id) => {
        return get().staff.find(member => member.id === id) || null;
      },
      
      getAvailableStaff: (date) => {
        const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()] as keyof CleaningStaff['availability'];
        return get().staff.filter(member => 
          member.isActive && member.availability[dayOfWeek]
        );
      },
      
      getStaffByTeam: (team) => {
        return get().staff.filter(member => member.team === team);
      },
      
      // Checklist management
      addChecklist: async (checklistData) => {
        set({ isLoading: true, error: null });
        try {
          const newChecklist: CleaningChecklist = {
            ...checklistData,
            id: `checklist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            checklists: [...state.checklists, newChecklist],
          }));
          
          return newChecklist;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add checklist' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateChecklist: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            checklists: state.checklists.map(checklist =>
              checklist.id === id ? { ...checklist, ...updates, updatedAt: new Date() } : checklist
            ),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update checklist' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      deleteChecklist: async (id) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            checklists: state.checklists.filter(checklist => checklist.id !== id),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete checklist' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getChecklists: (propertyId) => {
        return get().checklists.filter(checklist => checklist.propertyId === propertyId);
      },
      
      getDefaultChecklist: (propertyId, type) => {
        return get().checklists.find(
          checklist => checklist.propertyId === propertyId && 
          checklist.type === type && 
          checklist.isDefault
        ) || null;
      },
      
      // Maintenance management
      addMaintenanceRequest: async (requestData) => {
        set({ isLoading: true, error: null });
        try {
          const newRequest: MaintenanceRequest = {
            ...requestData,
            id: `maintenance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            maintenanceRequests: [...state.maintenanceRequests, newRequest],
          }));
          
          return newRequest;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add maintenance request' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateMaintenanceRequest: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            maintenanceRequests: state.maintenanceRequests.map(request =>
              request.id === id ? { ...request, ...updates, updatedAt: new Date() } : request
            ),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update maintenance request' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getMaintenanceRequests: (propertyId) => {
        return get().maintenanceRequests.filter(request => request.propertyId === propertyId);
      },
      
      getOpenMaintenanceRequests: (propertyId) => {
        return get().maintenanceRequests.filter(
          request => request.propertyId === propertyId && request.status !== 'completed' && request.status !== 'cancelled'
        );
      },
      
      assignMaintenance: async (requestId, staffId) => {
        await get().updateMaintenanceRequest(requestId, {
          assignedTo: staffId,
          status: 'assigned',
        });
      },
      
      completeMaintenance: async (requestId, resolution, cost) => {
        await get().updateMaintenanceRequest(requestId, {
          status: 'completed',
          resolution,
          cost,
          completedAt: new Date(),
        });
      },
      
      // Schedule management
      addSchedule: async (scheduleData) => {
        set({ isLoading: true, error: null });
        try {
          const newSchedule: CleaningSchedule = {
            ...scheduleData,
            id: `schedule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            schedules: [...state.schedules, newSchedule],
          }));
          
          return newSchedule;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add schedule' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateSchedule: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            schedules: state.schedules.map(schedule =>
              schedule.id === id ? { ...schedule, ...updates, updatedAt: new Date() } : schedule
            ),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update schedule' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      deleteSchedule: async (id) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            schedules: state.schedules.filter(schedule => schedule.id !== id),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete schedule' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getSchedules: (propertyId) => {
        return get().schedules.filter(schedule => schedule.propertyId === propertyId);
      },
      
      // Quality inspection
      addInspection: async (inspectionData) => {
        set({ isLoading: true, error: null });
        try {
          const newInspection: QualityInspection = {
            ...inspectionData,
            id: `inspection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            inspections: [...state.inspections, newInspection],
          }));
          
          // Update task with inspection score
          await get().verifyTask(
            inspectionData.cleaningTaskId,
            inspectionData.inspectorName,
            inspectionData.overallScore
          );
          
          return newInspection;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add inspection' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      getInspections: (propertyId) => {
        return get().inspections.filter(inspection => inspection.propertyId === propertyId);
      },
      
      getInspectionsByTask: (taskId) => {
        return get().inspections.filter(inspection => inspection.cleaningTaskId === taskId);
      },
      
      // Auto-scheduling
      autoScheduleTasks: async (propertyId, startDate, endDate) => {
        set({ isLoading: true, error: null });
        try {
          const current = new Date(startDate);
          const tasks: CleaningTask[] = [];
          
          while (current <= endDate) {
            // Create turnover cleaning task
            tasks.push({
              id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              propertyId,
              type: 'turnover',
              status: 'scheduled',
              priority: 'medium',
              scheduledDate: new Date(current),
              scheduledTime: '11:00',
              estimatedDuration: 120,
              checklistCompleted: false,
              photosRequired: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            
            current.setDate(current.getDate() + 1);
          }
          
          set((state) => ({
            tasks: [...state.tasks, ...tasks],
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to auto-schedule tasks' });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      optimizeSchedule: async (propertyId, date) => {
        // Placeholder for optimization algorithm
        console.log('Optimizing schedule for', propertyId, 'on', date);
      },
      
      // Analytics
      getCleaningStats: (propertyId) => {
        const tasks = get().getTasksByProperty(propertyId);
        const staff = get().staff.filter(member => member.propertyId === propertyId);
        const inspections = get().getInspections(propertyId);
        const maintenanceRequests = get().getOpenMaintenanceRequests(propertyId);
        
        const completedTasks = tasks.filter(t => t.status === 'completed' || t.status === 'verified');
        const avgScore = inspections.length > 0
          ? inspections.reduce((sum, i) => sum + i.overallScore, 0) / inspections.length
          : 0;
        const avgTime = completedTasks.length > 0
          ? completedTasks.reduce((sum, t) => sum + t.estimatedDuration, 0) / completedTasks.length
          : 0;
        
        return {
          totalTasks: tasks.length,
          completedTasks: completedTasks.length,
          pendingTasks: tasks.filter(t => t.status === 'scheduled').length,
          averageScore: avgScore,
          averageCompletionTime: avgTime,
          totalStaff: staff.length,
          openMaintenanceRequests: maintenanceRequests.length,
        };
      },
      
      // Utility actions
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      reset: () => set(initialState),
    }),
    {
      name: 'cleaning-store',
      partialize: (state) => ({
        tasks: state.tasks,
        staff: state.staff,
        checklists: state.checklists,
        maintenanceRequests: state.maintenanceRequests,
        schedules: state.schedules,
        inspections: state.inspections,
      }),
    }
  )
);
