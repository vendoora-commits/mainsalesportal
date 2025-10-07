'use client';

import { useState } from 'react';
import { useCleaningStore } from '@/store/useCleaningStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Users,
  ClipboardList,
  Wrench,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Activity,
  Settings
} from 'lucide-react';
import { CleaningTaskStatus } from '@/types';

export function CleaningDashboard() {
  const {
    tasks,
    staff,
    maintenanceRequests,
    inspections,
    isLoading,
    error,
    getCleaningStats,
    getTasksByStatus,
    getOpenMaintenanceRequests,
    startTask,
    completeTask,
  } = useCleaningStore();

  const [selectedTab, setSelectedTab] = useState<'overview' | 'tasks' | 'staff' | 'maintenance' | 'quality'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CleaningTaskStatus | 'all'>('all');

  // Mock property ID for demo
  const propertyId = 'demo-property-1';
  const stats = getCleaningStats(propertyId);
  const openMaintenance = getOpenMaintenanceRequests(propertyId);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: CleaningTaskStatus) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'verified': return 'bg-green-600 text-white';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Cleaning & Maintenance</h1>
          <p className="text-gray-600">Manage cleaning tasks, staff, and maintenance requests</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'tasks', label: 'Tasks', icon: ClipboardList },
          { id: 'staff', label: 'Staff', icon: Users },
          { id: 'maintenance', label: 'Maintenance', icon: Wrench },
          { id: 'quality', label: 'Quality', icon: Star },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as 'overview' | 'tasks' | 'staff' | 'maintenance' | 'quality')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              selectedTab === tab.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTasks}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.completedTasks} completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingTasks}</div>
                <p className="text-xs text-muted-foreground">
                  Scheduled tasks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.averageScore.toFixed(1)}/5.0
                </div>
                <p className="text-xs text-muted-foreground">
                  Average quality rating
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                <Wrench className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {stats.openMaintenanceRequests}
                </div>
                <p className="text-xs text-muted-foreground">
                  Open requests
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Cleaning Tasks</CardTitle>
              <CardDescription>Tasks scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.filter(t => t.scheduledDate.toDateString() === new Date().toDateString()).slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <ClipboardList className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Room {task.roomNumber || 'N/A'}</p>
                        <Badge variant="outline">{task.type.replace('_', ' ')}</Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {task.scheduledTime} • {task.estimatedDuration} min • {task.assignedTo || 'Unassigned'}
                      </p>
                    </div>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Open Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle>Open Maintenance Requests</CardTitle>
              <CardDescription>Urgent maintenance items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {openMaintenance.slice(0, 5).map((request) => (
                  <div key={request.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        request.priority === 'emergency' ? 'bg-red-100' :
                        request.priority === 'high' ? 'bg-orange-100' :
                        'bg-yellow-100'
                      }`}>
                        <Wrench className={`h-4 w-4 ${
                          request.priority === 'emergency' ? 'text-red-600' :
                          request.priority === 'high' ? 'text-orange-600' :
                          'text-yellow-600'
                        }`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{request.title}</p>
                      <p className="text-xs text-gray-500">
                        {request.type} • Room {request.roomNumber || 'N/A'} • {request.reportedAt.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tasks Tab */}
      {selectedTab === 'tasks' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as CleaningTaskStatus | 'all')}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="verified">Verified</option>
            </select>
          </div>

          {/* Tasks List */}
          <div className="grid gap-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {task.roomNumber || '?'}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">Room {task.roomNumber || 'N/A'}</h3>
                          <Badge variant="outline">{task.type.replace('_', ' ')}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {task.scheduledDate.toLocaleDateString()} at {task.scheduledTime}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {task.estimatedDuration} min
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {task.assignedTo || 'Unassigned'}
                      </p>
                      {task.qualityScore && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{task.qualityScore}/5</span>
                        </div>
                      )}
                      <div className="flex space-x-2 mt-2">
                        {task.status === 'scheduled' && (
                          <Button size="sm" onClick={() => startTask(task.id)}>
                            Start
                          </Button>
                        )}
                        {task.status === 'in_progress' && (
                          <Button size="sm" onClick={() => completeTask(task.id, 'Demo User')}>
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Staff Tab */}
      {selectedTab === 'staff' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cleaning Staff</CardTitle>
              <CardDescription>Manage your cleaning team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {staff.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{member.rating.toFixed(1)}/5</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Completed:</span>
                        <span className="font-medium">{member.completedTasks} tasks</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Avg Time:</span>
                        <span className="font-medium">{member.averageCompletionTime} min</span>
                      </div>
                      <Badge variant={member.isActive ? "default" : "outline"}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Maintenance Tab */}
      {selectedTab === 'maintenance' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
              <CardDescription>Track and manage property maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {maintenanceRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          request.priority === 'emergency' ? 'bg-red-100' :
                          request.priority === 'high' ? 'bg-orange-100' :
                          'bg-yellow-100'
                        }`}>
                          <Wrench className={`h-5 w-5 ${
                            request.priority === 'emergency' ? 'text-red-600' :
                            request.priority === 'high' ? 'text-orange-600' :
                            'text-yellow-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{request.title}</h3>
                          <p className="text-sm text-gray-600">{request.description}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                        <Badge variant="outline">
                          {request.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t">
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="font-medium">{request.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Room</p>
                        <p className="font-medium">{request.roomNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Reported</p>
                        <p className="font-medium">{request.reportedAt.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quality Tab */}
      {selectedTab === 'quality' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quality Inspections</CardTitle>
              <CardDescription>Review quality control inspections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inspections.map((inspection) => (
                  <div key={inspection.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          inspection.passedInspection ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {inspection.passedInspection ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">Room {inspection.roomNumber || 'N/A'}</h3>
                          <p className="text-sm text-gray-600">Inspector: {inspection.inspectorName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="text-xl font-bold">{inspection.overallScore.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 pt-3 border-t">
                      <div>
                        <p className="text-xs text-gray-500">Cleanliness</p>
                        <p className="font-medium">{inspection.categories.cleanliness}/5</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Organization</p>
                        <p className="font-medium">{inspection.categories.organization}/5</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Amenities</p>
                        <p className="font-medium">{inspection.categories.amenities}/5</p>
                      </div>
                    </div>
                    
                    {inspection.issues.length > 0 && (
                      <div className="mt-3 p-2 bg-yellow-50 rounded">
                        <p className="text-sm font-medium text-yellow-800">Issues Found:</p>
                        <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                          {inspection.issues.map((issue, index) => (
                            <li key={index}>• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
