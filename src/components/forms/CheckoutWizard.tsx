'use client';

import { useState } from 'react';
import { useConfigurationStore, useOrderStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckoutSummary } from './checkout/CheckoutSummary';
import { BillingInformation } from './checkout/BillingInformation';
import { PaymentMethod } from './checkout/PaymentMethod';
import { OrderConfirmation } from './checkout/OrderConfirmation';

export function CheckoutWizard() {
  const { configuration } = useConfigurationStore();
  const { createOrder, processPayment } = useOrderStore();
  const { addNotification, addToast } = useUIStore();
  const [currentStep, setCurrentStep] = useState<'summary' | 'billing' | 'payment' | 'confirmation'>('summary');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProceedToBilling = () => {
    if (!configuration) {
      addNotification({
        type: 'error',
        title: 'Configuration Required',
        message: 'Please complete your configuration before proceeding to checkout.',
      });
      return;
    }
    setCurrentStep('billing');
  };

  const handleProceedToPayment = () => {
    setCurrentStep('payment');
  };

  const handleCreateOrder = async () => {
    if (!configuration) return;

    setIsProcessing(true);
    try {
      const order = await createOrder(configuration.id, 'user_123'); // Mock user ID
      setOrderId(order.id);
      addToast({
        type: 'success',
        message: 'Order created successfully!',
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Order Creation Failed',
        message: 'Failed to create order. Please try again.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessPayment = async (paymentMethodId: string) => {
    if (!orderId) return;

    setIsProcessing(true);
    try {
      await processPayment(orderId, paymentMethodId);
      setCurrentStep('confirmation');
      addToast({
        type: 'success',
        message: 'Payment processed successfully!',
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Payment Failed',
        message: 'Payment processing failed. Please try again.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToSummary = () => {
    setCurrentStep('summary');
  };

  const handleBackToBilling = () => {
    setCurrentStep('billing');
  };

  if (!configuration) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Configuration Found</h2>
        <p className="text-gray-600 mb-6">
          Please complete your smart hotel configuration before proceeding to checkout.
        </p>
        <Button onClick={() => window.location.href = '/setup'}>
          Start Configuration
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            ✓
          </div>
          <span className="text-sm font-medium text-green-600">Property Setup</span>
        </div>
        <div className="w-16 h-0.5 bg-green-500"></div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            ✓
          </div>
          <span className="text-sm font-medium text-green-600">Kiosk Selection</span>
        </div>
        <div className="w-16 h-0.5 bg-green-500"></div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            ✓
          </div>
          <span className="text-sm font-medium text-green-600">Smart Locks</span>
        </div>
        <div className="w-16 h-0.5 bg-green-500"></div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            ✓
          </div>
          <span className="text-sm font-medium text-green-600">Room Features</span>
        </div>
        <div className="w-16 h-0.5 bg-green-500"></div>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'summary' ? 'bg-primary text-white' : 
            currentStep === 'billing' || currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-primary text-white' : 
            'bg-gray-200 text-gray-600'
          }`}>
            {currentStep === 'summary' ? '5' : '✓'}
          </div>
          <span className="text-sm font-medium text-primary">Checkout</span>
        </div>
      </div>

      {/* Content */}
      {currentStep === 'summary' && (
        <CheckoutSummary 
          configuration={configuration}
          onProceed={handleProceedToBilling}
        />
      )}

      {currentStep === 'billing' && (
        <BillingInformation
          onBack={handleBackToSummary}
          onProceed={handleProceedToPayment}
        />
      )}

      {currentStep === 'payment' && (
        <PaymentMethod
          orderId={orderId}
          totalAmount={configuration.totalPrice}
          onBack={handleBackToBilling}
          onProcessPayment={handleProcessPayment}
          onCreateOrder={handleCreateOrder}
          isProcessing={isProcessing}
        />
      )}

      {currentStep === 'confirmation' && orderId && (
        <OrderConfirmation
          orderId={orderId}
          configuration={configuration}
        />
      )}
    </div>
  );
}
