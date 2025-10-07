'use client';

import { useState } from 'react';
import { useBookingIntegrationStore } from '@/store/useBookingIntegrationStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Calendar, 
  DollarSign, 
  Activity,
  Plus,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  TrendingUp,
  Clock,
  Zap,
  Database,
  Link as LinkIcon,
  PlayCircle,
  PauseCircle
} from 'lucide-react';
import { BookingPlatform } from '@/types';

export function BookingIntegrationDashboard() {
  const {
    integrations,
    syncLogs,
    platformBookings,
    isLoading,
    isSyncing,
    error,
    getIntegrationStats,
    getRecentSyncLogs,
    syncAll,
    syncCalendar,
    syncPricing,
    syncBookings,
    toggleIntegration,
  } = useBookingIntegrationStore();

  const [selectedTab, setSelectedTab] = useState<'overview' | 'integrations' | 'calendar' | 'pricing' | 'sync-logs'>('overview');
  const [selectedPlatform, setSelectedPlatform] = useState<BookingPlatform | null>(null);

  // Mock property ID for demo
  const propertyId = 'demo-property-1';
  const stats = getIntegrationStats(propertyId);
  const recentLogs = getRecentSyncLogs(propertyId, 10);

  const platformInfo = [
    { platform: 'airbnb' as BookingPlatform, name: 'Airbnb', icon: '🏠', color: 'text-red-600' },
    { platform: 'vrbo' as BookingPlatform, name: 'VRBO', icon: '🏖️', color: 'text-blue-600' },
    { platform: 'booking_com' as BookingPlatform, name: 'Booking.com', icon: '🌐', color: 'text-blue-800' },
    { platform: 'expedia' as BookingPlatform, name: 'Expedia', icon: '✈️', color: 'text-yellow-600' },
    { platform: 'direct' as BookingPlatform, name: 'Direct', icon: '🔗', color: 'text-green-600' },
  ];

  const getPlatformInfo = (platform: BookingPlatform) => {
    return platformInfo.find(p => p.platform === platform) || platformInfo[4];
  };

  const handleSync = async (integrationId: string, type?: 'calendar' | 'pricing' | 'bookings') => {
    try {
      if (type === 'calendar') {
        await syncCalendar(integrationId);
      } else if (type === 'pricing') {
        await syncPricing(integrationId);
      } else if (type === 'bookings') {
        await syncBookings(integrationId);
      } else {
        await syncAll(integrationId);
      }
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  const getSyncStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Booking Platform Integration</h1>
          <p className="text-gray-600">Manage connections to Airbnb, VRBO, and other booking platforms</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'integrations', label: 'Integrations', icon: LinkIcon },
          { id: 'calendar', label: 'Calendar', icon: Calendar },
          { id: 'pricing', label: 'Pricing', icon: DollarSign },
          { id: 'sync-logs', label: 'Sync Logs', icon: Activity },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as 'overview' | 'calendar' | 'pricing' | 'logs')}
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
                <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalIntegrations}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.activeIntegrations} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.totalBookings}</div>
                <p className="text-xs text-muted-foreground">
                  From all platforms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${stats.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  All time revenue
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
                <Clock className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.lastSyncDate ? new Date(stats.lastSyncDate).toLocaleDateString() : 'Never'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.syncErrors} errors
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Connected Platforms */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Platforms</CardTitle>
              <CardDescription>Active booking platform integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {platformInfo.map((platform) => {
                  const integration = integrations.find(i => i.platform === platform.platform);
                  const isConnected = integration && integration.isActive;
                  
                  return (
                    <div
                      key={platform.platform}
                      className={`p-4 border rounded-lg transition-all ${
                        isConnected ? 'border-green-300 bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{platform.icon}</span>
                          <span className={`font-medium ${platform.color}`}>{platform.name}</span>
                        </div>
                        {isConnected ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      {isConnected && integration ? (
                        <div className="space-y-2">
                          <Badge className={getSyncStatusColor(integration.syncStatus)}>
                            {integration.syncStatus}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSync(integration.id)}
                              disabled={isSyncing}
                            >
                              {isSyncing ? (
                                <RefreshCw className="h-3 w-3 animate-spin" />
                              ) : (
                                <RefreshCw className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleIntegration(integration.id)}
                            >
                              {integration.isActive ? <PauseCircle className="h-3 w-3" /> : <PlayCircle className="h-3 w-3" />}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" className="w-full">
                          Connect
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Sync Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Sync Activity</CardTitle>
              <CardDescription>Latest synchronization events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.slice(0, 5).map((log) => {
                  const platformData = getPlatformInfo(log.platform);
                  return (
                    <div key={log.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          log.status === 'success' ? 'bg-green-100' :
                          log.status === 'failed' ? 'bg-red-100' :
                          'bg-yellow-100'
                        }`}>
                          {log.status === 'success' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : log.status === 'failed' ? (
                            <XCircle className="h-4 w-4 text-red-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{platformData.name}</span>
                          <Badge variant="outline">{log.syncType}</Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          {log.message} • {log.recordsProcessed} processed • {(log.duration / 1000).toFixed(1)}s
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {log.startTime.toLocaleTimeString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Integrations Tab */}
      {selectedTab === 'integrations' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Integrations</CardTitle>
              <CardDescription>Manage your booking platform connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration) => {
                  const platformData = getPlatformInfo(integration.platform);
                  return (
                    <div key={integration.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{platformData.icon}</span>
                          <div>
                            <h3 className={`font-semibold ${platformData.color}`}>{platformData.name}</h3>
                            <p className="text-sm text-gray-600">
                              Last synced: {integration.lastSyncDate?.toLocaleString() || 'Never'}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getSyncStatusColor(integration.syncStatus)}>
                            {integration.syncStatus}
                          </Badge>
                          <Badge variant={integration.isActive ? "default" : "outline"}>
                            {integration.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Base Price</p>
                          <p className="font-medium">${integration.settings.basePrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Min Stay</p>
                          <p className="font-medium">{integration.settings.minStay} nights</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Calendar Sync</p>
                          <p className="font-medium">{integration.calendarSyncEnabled ? 'On' : 'Off'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Auto Price Update</p>
                          <p className="font-medium">{integration.autoPriceUpdate ? 'On' : 'Off'}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleSync(integration.id)}
                          disabled={isSyncing}
                        >
                          {isSyncing ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4 mr-2" />
                          )}
                          Sync All
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSync(integration.id, 'calendar')}
                          disabled={isSyncing}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Calendar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSync(integration.id, 'pricing')}
                          disabled={isSyncing}
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Pricing
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSync(integration.id, 'bookings')}
                          disabled={isSyncing}
                        >
                          <Database className="h-4 w-4 mr-2" />
                          Bookings
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleIntegration(integration.id)}
                        >
                          {integration.isActive ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sync Logs Tab */}
      {selectedTab === 'sync-logs' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Synchronization Logs</CardTitle>
              <CardDescription>Complete history of sync operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {syncLogs.map((log) => {
                  const platformData = getPlatformInfo(log.platform);
                  return (
                    <div key={log.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            log.status === 'success' ? 'bg-green-100' :
                            log.status === 'failed' ? 'bg-red-100' :
                            'bg-yellow-100'
                          }`}>
                            {log.status === 'success' ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : log.status === 'failed' ? (
                              <XCircle className="h-5 w-5 text-red-600" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-yellow-600" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{platformData.name}</span>
                              <Badge variant="outline">{log.syncType}</Badge>
                              <Badge className={
                                log.status === 'success' ? 'bg-green-100 text-green-800' :
                                log.status === 'failed' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }>
                                {log.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{log.message}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {log.startTime.toLocaleDateString()} {log.startTime.toLocaleTimeString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            Duration: {(log.duration / 1000).toFixed(1)}s
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t">
                        <div>
                          <p className="text-xs text-gray-500">Processed</p>
                          <p className="font-medium">{log.recordsProcessed}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Failed</p>
                          <p className="font-medium text-red-600">{log.recordsFailed}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Success Rate</p>
                          <p className="font-medium">
                            {log.recordsProcessed > 0 
                              ? ((log.recordsProcessed - log.recordsFailed) / log.recordsProcessed * 100).toFixed(1)
                              : 0}%
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
