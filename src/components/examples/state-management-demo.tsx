'use client';

import { useState } from 'react';
import { useStores, useStoreActions, useStoreSelectors } from '@/hooks/useStores';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

/**
 * Example component demonstrating the enhanced state management system
 * This shows how to use all the stores together in a real application
 */
export function StateManagementDemo() {
  const stores = useStores();
  const actions = useStoreActions();
  const selectors = useStoreSelectors();
  const [demoData, setDemoData] = useState({
    notificationTitle: 'Demo Notification',
    notificationMessage: 'This is a demo notification message',
    toastMessage: 'This is a demo toast message',
  });

  const handleShowNotification = () => {
    actions.showNotification({
      type: 'success',
      title: demoData.notificationTitle,
      message: demoData.notificationMessage,
      duration: 5000,
      actions: [
        {
          label: 'Action 1',
          action: () => console.log('Action 1 clicked'),
        },
        {
          label: 'Action 2',
          action: () => console.log('Action 2 clicked'),
        },
      ],
    });
  };

  const handleShowToast = () => {
    actions.showToast({
      type: 'info',
      message: demoData.toastMessage,
      duration: 3000,
    });
  };

  const handleCreateOrder = async () => {
    try {
      const order = await actions.createOrder('config_123', 'user_456');
      actions.showToast({
        type: 'success',
        message: `Order created: ${order.id}`,
      });
    } catch (error) {
      actions.showToast({
        type: 'error',
        message: 'Failed to create order',
      });
    }
  };

  const handleProcessPayment = async () => {
    try {
      await actions.processPayment('order_123', 'pm_123');
      actions.showToast({
        type: 'success',
        message: 'Payment processed successfully',
      });
    } catch (error) {
      actions.showToast({
        type: 'error',
        message: 'Payment processing failed',
      });
    }
  };

  const handleToggleSidebar = () => {
    stores.ui.toggleSidebar();
  };

  const handleSetLoading = () => {
    actions.setLoading('demo', true);
    setTimeout(() => {
      actions.setLoading('demo', false);
    }, 3000);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">State Management Demo</h1>
        <p className="text-gray-600 mt-2">
          This demonstrates the enhanced Zustand state management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Configuration Store Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration Store</CardTitle>
            <CardDescription>Property and configuration management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Step</Label>
              <Badge variant="outline">
                Step {stores.configuration.stepProgress.currentStep} of {stores.configuration.stepProgress.totalSteps}
              </Badge>
            </div>
            <div className="space-y-2">
              <Label>Completed Steps</Label>
              <div className="flex flex-wrap gap-1">
                {stores.configuration.stepProgress.completedSteps.map((step) => (
                  <Badge key={step} variant="secondary">
                    Step {step}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Total Price</Label>
              <Badge variant="outline">
                ${selectors.getTotalPrice()}
              </Badge>
            </div>
            <Button 
              onClick={() => stores.configuration.completeStep(stores.configuration.stepProgress.currentStep)}
              className="w-full"
            >
              Complete Current Step
            </Button>
          </CardContent>
        </Card>

        {/* User Store Demo */}
        <Card>
          <CardHeader>
            <CardTitle>User Store</CardTitle>
            <CardDescription>User authentication and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Authentication Status</Label>
              <Badge variant={stores.user.isAuthenticated ? "default" : "secondary"}>
                {stores.user.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </Badge>
            </div>
            <div className="space-y-2">
              <Label>Theme Preference</Label>
              <Badge variant="outline">
                {stores.user.preferences.theme}
              </Badge>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Badge variant="outline">
                {stores.user.preferences.language}
              </Badge>
            </div>
            <Button 
              onClick={() => stores.user.updatePreferences({ theme: 'dark' })}
              className="w-full"
            >
              Switch to Dark Theme
            </Button>
          </CardContent>
        </Card>

        {/* Order Store Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Order Store</CardTitle>
            <CardDescription>Order management and payment processing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Order</Label>
              <Badge variant="outline">
                {stores.order.currentOrder?.id || 'No active order'}
              </Badge>
            </div>
            <div className="space-y-2">
              <Label>Total Orders</Label>
              <Badge variant="outline">
                {stores.order.orders.length} orders
              </Badge>
            </div>
            <div className="space-y-2">
              <Label>Loading State</Label>
              <Badge variant={stores.order.isLoading ? "default" : "secondary"}>
                {stores.order.isLoading ? 'Processing...' : 'Ready'}
              </Badge>
            </div>
            <div className="space-y-2">
              <Button onClick={handleCreateOrder} className="w-full">
                Create Demo Order
              </Button>
              <Button onClick={handleProcessPayment} variant="outline" className="w-full">
                Process Payment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* UI Store Demo */}
        <Card>
          <CardHeader>
            <CardTitle>UI Store</CardTitle>
            <CardDescription>UI state and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Sidebar State</Label>
              <Badge variant="outline">
                {stores.ui.sidebarOpen ? 'Open' : 'Closed'}
              </Badge>
            </div>
            <div className="space-y-2">
              <Label>Active Notifications</Label>
              <Badge variant="outline">
                {stores.ui.notifications.length} notifications
              </Badge>
            </div>
            <div className="space-y-2">
              <Label>Active Toasts</Label>
              <Badge variant="outline">
                {stores.ui.toasts.length} toasts
              </Badge>
            </div>
            <div className="space-y-2">
              <Button onClick={handleToggleSidebar} className="w-full">
                Toggle Sidebar
              </Button>
              <Button onClick={handleSetLoading} variant="outline" className="w-full">
                Set Loading State
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Notification System</CardTitle>
            <CardDescription>Show notifications and toasts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notification-title">Notification Title</Label>
              <Input
                id="notification-title"
                value={demoData.notificationTitle}
                onChange={(e) => setDemoData(prev => ({ ...prev, notificationTitle: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-message">Notification Message</Label>
              <Input
                id="notification-message"
                value={demoData.notificationMessage}
                onChange={(e) => setDemoData(prev => ({ ...prev, notificationMessage: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toast-message">Toast Message</Label>
              <Input
                id="toast-message"
                value={demoData.toastMessage}
                onChange={(e) => setDemoData(prev => ({ ...prev, toastMessage: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Button onClick={handleShowNotification} className="w-full">
                Show Notification
              </Button>
              <Button onClick={handleShowToast} variant="outline" className="w-full">
                Show Toast
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Store Selectors Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Store Selectors</CardTitle>
            <CardDescription>Computed values and derived state</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Any Store Loading</Label>
              <Badge variant={selectors.isAnyLoading() ? "default" : "secondary"}>
                {selectors.isAnyLoading() ? 'Loading...' : 'Ready'}
              </Badge>
            </div>
            <div className="space-y-2">
              <Label>Setup Complete</Label>
              <Badge variant={selectors.hasCompletedSetup() ? "default" : "secondary"}>
                {selectors.hasCompletedSetup() ? 'Complete' : 'In Progress'}
              </Badge>
            </div>
            <div className="space-y-2">
              <Label>Can Proceed</Label>
              <Badge variant={selectors.canProceedToNextStep() ? "default" : "secondary"}>
                {selectors.canProceedToNextStep() ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="space-y-2">
              <Label>Current Step</Label>
              <Badge variant="outline">
                Step {selectors.getCurrentStep()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store State Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Store State Summary</CardTitle>
          <CardDescription>Current state of all stores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-medium">Configuration</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                {JSON.stringify({
                  currentStep: stores.configuration.stepProgress.currentStep,
                  completedSteps: stores.configuration.stepProgress.completedSteps,
                  totalPrice: selectors.getTotalPrice(),
                }, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">User</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                {JSON.stringify({
                  isAuthenticated: stores.user.isAuthenticated,
                  theme: stores.user.preferences.theme,
                  language: stores.user.preferences.language,
                }, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">Order</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                {JSON.stringify({
                  currentOrder: stores.order.currentOrder?.id || null,
                  totalOrders: stores.order.orders.length,
                  isLoading: stores.order.isLoading,
                }, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">UI</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                {JSON.stringify({
                  sidebarOpen: stores.ui.sidebarOpen,
                  notifications: stores.ui.notifications.length,
                  toasts: stores.ui.toasts.length,
                  theme: stores.ui.theme,
                }, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
