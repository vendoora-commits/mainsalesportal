import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus } from '@/types';

interface OrderState {
  // Current order
  currentOrder: Order | null;
  orders: Order[];
  
  // Order management
  createOrder: (configurationId: string, userId: string) => Promise<Order>;
  updateOrder: (orderId: string, updates: Partial<Order>) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  getOrder: (orderId: string) => Order | null;
  getOrdersByUser: (userId: string) => Order[];
  
  // Payment processing
  processPayment: (orderId: string, paymentMethodId: string) => Promise<void>;
  refundOrder: (orderId: string, amount?: number) => Promise<void>;
  
  // Order status tracking
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getOrderHistory: (orderId: string) => Promise<Order[]>;
  
  // Loading and error states
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      currentOrder: null,
      orders: [],
      isLoading: false,
      error: null,
      
      createOrder: async (configurationId: string, userId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implement API call to create order
          const newOrder: Order = {
            id: `order_${Date.now()}`,
            configurationId,
            userId,
            status: 'pending',
            totalAmount: 0, // Will be calculated from configuration
            stripePaymentIntentId: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          set((state) => ({
            currentOrder: newOrder,
            orders: [...state.orders, newOrder],
            isLoading: false,
          }));
          
          return newOrder;
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create order',
            isLoading: false 
          });
          throw error;
        }
      },
      
      updateOrder: async (orderId: string, updates: Partial<Order>) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implement API call to update order
          set((state) => ({
            orders: state.orders.map(order => 
              order.id === orderId 
                ? { ...order, ...updates, updatedAt: new Date() }
                : order
            ),
            currentOrder: state.currentOrder?.id === orderId 
              ? { ...state.currentOrder, ...updates, updatedAt: new Date() }
              : state.currentOrder,
            isLoading: false,
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update order',
            isLoading: false 
          });
          throw error;
        }
      },
      
      cancelOrder: async (orderId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implement API call to cancel order
          await get().updateOrder(orderId, { status: 'cancelled' });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to cancel order',
            isLoading: false 
          });
          throw error;
        }
      },
      
      getOrder: (orderId: string) => {
        const { orders } = get();
        return orders.find(order => order.id === orderId) || null;
      },
      
      getOrdersByUser: (userId: string) => {
        const { orders } = get();
        return orders.filter(order => order.userId === userId);
      },
      
      processPayment: async (orderId: string, paymentMethodId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implement Stripe payment processing
          console.log('Processing payment for order:', orderId, 'with method:', paymentMethodId);
          
          await get().updateOrder(orderId, { 
            status: 'processing',
            stripePaymentIntentId: `pi_${Date.now()}`,
          });
          
          // Simulate payment processing
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          await get().updateOrder(orderId, { status: 'completed' });
        } catch (error) {
          await get().updateOrder(orderId, { status: 'pending' });
          set({ 
            error: error instanceof Error ? error.message : 'Payment processing failed',
            isLoading: false 
          });
          throw error;
        }
      },
      
      refundOrder: async (orderId: string, amount?: number) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implement Stripe refund processing
          console.log('Processing refund for order:', orderId, 'amount:', amount);
          
          await get().updateOrder(orderId, { status: 'refunded' });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Refund processing failed',
            isLoading: false 
          });
          throw error;
        }
      },
      
      updateOrderStatus: async (orderId: string, status: OrderStatus) => {
        await get().updateOrder(orderId, { status });
      },
      
      getOrderHistory: async (orderId: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implement API call to get order history
          console.log('Getting order history for:', orderId);
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const order = get().getOrder(orderId);
          return order ? [order] : [];
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to get order history',
            isLoading: false 
          });
          return [];
        }
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
    }),
    {
      name: 'order-store',
      partialize: (state) => ({
        currentOrder: state.currentOrder,
        orders: state.orders,
      }),
    }
  )
);
