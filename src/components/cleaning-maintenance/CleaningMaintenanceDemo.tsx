'use client';

import { useState } from 'react';
import { useCleaningStore } from '@/store/useCleaningStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Database, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  ClipboardList,
  Users,
  Wrench,
  Star,
  Calendar,
  TrendingUp
} from 'lucide-react';

export function CleaningMaintenanceDemo() {
  const {
    tasks,
    staff,
    maintenanceRequests,
    inspections,
    checklists,
    addTask,
    addStaff,
    addMaintenanceRequest,
    addInspection,
    addChecklist,
    autoScheduleTasks,
    isLoading,
    error,
    getCleaningStats,
  } = useCleaningStore();

  const propertyId = 'demo-property-1';
  const stats = getCleaningStats(propertyId);

  const createDemoStaff = async () => {
    const staffMembers = [
      { name: 'Maria Garcia', role: 'cleaner' as const, team: 'Team A', rating: 4.8 },
      { name: 'John Smith', role: 'cleaner' as const, team: 'Team A', rating: 4.6 },
      { name: 'Lisa Chen', role: 'supervisor' as const, team: 'Team A', rating: 4.9 },
      { name: 'David Johnson', role: 'inspector' as const, team: null, rating: 4.7 },
      { name: 'Sarah Williams', role: 'maintenance' as const, team: null, rating: 4.5 },
    ];

    for (const member of staffMembers) {
      await addStaff({
        propertyId,
        name: member.name,
        email: `${member.name.toLowerCase().replace(' ', '.')}@example.com`,
        phone: `+1 555 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
        role: member.role,
        team: member.team || undefined,
        isActive: true,
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: member.role !== 'supervisor',
          sunday: member.role !== 'supervisor',
        },
        skills: member.role === 'maintenance' 
          ? ['plumbing', 'electrical', 'hvac']
          : ['deep_cleaning', 'turnover', 'inspection'],
        rating: member.rating,
        completedTasks: Math.floor(Math.random() * 100) + 50,
        averageCompletionTime: Math.floor(Math.random() * 30) + 90,
      });
    }
  };

  const createDemoTasks = async () => {
    const today = new Date();
    const taskTypes: Array<'turnover' | 'deep_clean' | 'inspection' | 'maintenance' | 'emergency'> = 
      ['turnover', 'deep_clean', 'inspection', 'maintenance', 'emergency'];
    
    for (let i = 0; i < 10; i++) {
      const scheduledDate = new Date(today);
      scheduledDate.setDate(today.getDate() + Math.floor(Math.random() * 7));
      
      await addTask({
        propertyId,
        roomNumber: `${Math.floor(Math.random() * 3) + 1}0${Math.floor(Math.random() * 10) + 1}`,
        type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
        status: (['scheduled', 'in_progress', 'completed'][Math.floor(Math.random() * 3)] as 'scheduled' | 'in_progress' | 'completed'),
        priority: (['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)] as 'low' | 'medium' | 'high' | 'urgent'),
        scheduledDate,
        scheduledTime: `${Math.floor(Math.random() * 6) + 9}:00`,
        estimatedDuration: Math.floor(Math.random() * 60) + 60,
        checklistCompleted: false,
        photosRequired: true,
      });
    }
  };

  const createDemoMaintenanceRequests = async () => {
    const requestTypes: Array<'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'cosmetic' | 'other'> =
      ['plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'cosmetic', 'other'];
    
    const titles = [
      'Leaky faucet in bathroom',
      'AC not cooling properly',
      'Light fixture not working',
      'Refrigerator making noise',
      'Door handle loose',
      'Paint chipping on wall',
    ];

    for (let i = 0; i < 5; i++) {
      await addMaintenanceRequest({
        propertyId,
        roomNumber: `${Math.floor(Math.random() * 3) + 1}0${Math.floor(Math.random() * 10) + 1}`,
        type: requestTypes[Math.floor(Math.random() * requestTypes.length)],
        priority: (['low', 'medium', 'high', 'emergency'][Math.floor(Math.random() * 4)] as 'low' | 'medium' | 'high' | 'emergency'),
        status: (['open', 'assigned', 'in_progress'][Math.floor(Math.random() * 3)] as 'open' | 'assigned' | 'in_progress'),
        title: titles[i % titles.length],
        description: 'Guest reported issue during their stay. Requires immediate attention.',
        reportedBy: 'Guest Services',
        reportedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      });
    }
  };

  const createDemoChecklist = async () => {
    await addChecklist({
      propertyId,
      name: 'Standard Turnover Checklist',
      type: 'turnover',
      items: [
        { id: '1', category: 'Bedroom', task: 'Change bed linens', isRequired: true, requiresPhoto: true, order: 1 },
        { id: '2', category: 'Bedroom', task: 'Vacuum and mop floors', isRequired: true, requiresPhoto: false, order: 2 },
        { id: '3', category: 'Bathroom', task: 'Clean toilet and sink', isRequired: true, requiresPhoto: true, order: 3 },
        { id: '4', category: 'Bathroom', task: 'Restock toiletries', isRequired: true, requiresPhoto: false, order: 4 },
        { id: '5', category: 'Kitchen', task: 'Clean refrigerator', isRequired: true, requiresPhoto: false, order: 5 },
        { id: '6', category: 'Kitchen', task: 'Wipe countertops', isRequired: true, requiresPhoto: false, order: 6 },
        { id: '7', category: 'General', task: 'Empty all trash', isRequired: true, requiresPhoto: false, order: 7 },
        { id: '8', category: 'General', task: 'Check all amenities', isRequired: true, requiresPhoto: false, order: 8 },
      ],
      estimatedDuration: 90,
      isDefault: true,
    });
  };

  const createDemoInspections = async () => {
    const completedTasks = tasks.filter(t => t.status === 'completed');
    
    for (const task of completedTasks.slice(0, 3)) {
      await addInspection({
        propertyId,
        cleaningTaskId: task.id,
        roomNumber: task.roomNumber,
        inspectorId: 'inspector_1',
        inspectorName: 'David Johnson',
        date: new Date(),
        overallScore: 4.5 + Math.random() * 0.5,
        categories: {
          cleanliness: 4.5,
          organization: 4.7,
          amenities: 4.6,
          bathroom: 4.8,
          bedroom: 4.5,
          kitchen: 4.3,
        },
        passedInspection: true,
        issues: [],
      });
    }
  };

  const createAllDemoData = async () => {
    await createDemoStaff();
    await createDemoTasks();
    await createDemoMaintenanceRequests();
    await createDemoChecklist();
    await createDemoInspections();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Cleaning & Maintenance System Demo</h1>
        <p className="text-gray-600 mt-2">Comprehensive cleaning scheduling and maintenance management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5" />
              <span>Total Tasks</span>
            </CardTitle>
            <CardDescription>Cleaning tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalTasks}</div>
            <div className="flex space-x-2 mt-2">
              <Badge variant="outline">Completed: {stats.completedTasks}</Badge>
              <Badge variant="outline">Pending: {stats.pendingTasks}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Staff Members</span>
            </CardTitle>
            <CardDescription>Cleaning team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalStaff}</div>
            <p className="text-sm text-gray-600 mt-2">
              Active team members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Quality Score</span>
            </CardTitle>
            <CardDescription>Average rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {stats.averageScore.toFixed(1)}/5
            </div>
            <p className="text-sm text-gray-600 mt-2">
              From quality inspections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="h-5 w-5" />
              <span>Maintenance</span>
            </CardTitle>
            <CardDescription>Open requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {stats.openMaintenanceRequests}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Pending maintenance items
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Demo Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Demo Actions</CardTitle>
          <CardDescription>Create sample cleaning and maintenance data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={createDemoStaff} 
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Users className="h-4 w-4" />
              )}
              <span>Create Demo Staff</span>
            </Button>
            
            <Button 
              onClick={createDemoTasks} 
              disabled={isLoading}
              variant="outline"
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ClipboardList className="h-4 w-4" />
              )}
              <span>Create Demo Tasks</span>
            </Button>
            
            <Button 
              onClick={createDemoMaintenanceRequests} 
              disabled={isLoading}
              variant="outline"
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Wrench className="h-4 w-4" />
              )}
              <span>Create Maintenance Requests</span>
            </Button>
            
            <Button 
              onClick={createAllDemoData} 
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Database className="h-4 w-4" />
              )}
              <span>Create All Demo Data</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-medium">Cleaning Management Features</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Automated task scheduling</li>
                    <li>• Staff assignment and tracking</li>
                    <li>• Quality control inspections</li>
                    <li>• Photo documentation</li>
                    <li>• Checklist management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Maintenance Features</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Maintenance request tracking</li>
                    <li>• Priority-based assignment</li>
                    <li>• Cost tracking and reporting</li>
                    <li>• Resolution documentation</li>
                    <li>• Emergency response system</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current status of cleaning and maintenance features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Task Scheduling Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Staff Management Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Quality Control Enabled</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Maintenance Tracking Active</span>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
