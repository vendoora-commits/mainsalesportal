// Supabase client configuration and database utilities
// This provides a foundation for database integration

import { createClient } from '@supabase/supabase-js';

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'user' | 'manager';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: 'admin' | 'user' | 'manager';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'admin' | 'user' | 'manager';
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          address: string;
          property_type: string;
          room_count: number;
          floor_count: number;
          check_in_time: string;
          check_out_time: string;
          amenities: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          address: string;
          property_type: string;
          room_count: number;
          floor_count: number;
          check_in_time: string;
          check_out_time: string;
          amenities?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          address?: string;
          property_type?: string;
          room_count?: number;
          floor_count?: number;
          check_in_time?: string;
          check_out_time?: string;
          amenities?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      configurations: {
        Row: {
          id: string;
          property_id: string;
          kiosk_config: unknown;
          smart_lock_config: unknown;
          room_features_config: unknown;
          total_price: number;
          status: 'draft' | 'completed' | 'processing' | 'installed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          kiosk_config?: unknown;
          smart_lock_config?: unknown;
          room_features_config?: unknown;
          total_price?: number;
          status?: 'draft' | 'completed' | 'processing' | 'installed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          kiosk_config?: unknown;
          smart_lock_config?: unknown;
          room_features_config?: unknown;
          total_price?: number;
          status?: 'draft' | 'completed' | 'processing' | 'installed';
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          configuration_id: string;
          status: 'pending' | 'processing' | 'completed' | 'cancelled';
          total_amount: number;
          stripe_payment_intent_id: string | null;
          billing_address: unknown;
          shipping_address: unknown;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          configuration_id: string;
          status?: 'pending' | 'processing' | 'completed' | 'cancelled';
          total_amount: number;
          stripe_payment_intent_id?: string | null;
          billing_address?: unknown;
          shipping_address?: unknown;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          configuration_id?: string;
          status?: 'pending' | 'processing' | 'completed' | 'cancelled';
          total_amount?: number;
          stripe_payment_intent_id?: string | null;
          billing_address?: unknown;
          shipping_address?: unknown;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          category: 'kiosk' | 'smart_lock' | 'room_features';
          price: number;
          specifications: unknown;
          features: string[];
          images: string[];
          stock: number;
          status: 'active' | 'inactive' | 'discontinued';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          category: 'kiosk' | 'smart_lock' | 'room_features';
          price: number;
          specifications?: unknown;
          features?: string[];
          images?: string[];
          stock?: number;
          status?: 'active' | 'inactive' | 'discontinued';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          category?: 'kiosk' | 'smart_lock' | 'room_features';
          price?: number;
          specifications?: unknown;
          features?: string[];
          images?: string[];
          stock?: number;
          status?: 'active' | 'inactive' | 'discontinued';
          created_at?: string;
          updated_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          resource_type: string;
          resource_id: string;
          details: unknown;
          ip_address: string;
          user_agent: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action: string;
          resource_type: string;
          resource_id: string;
          details?: unknown;
          ip_address: string;
          user_agent: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action?: string;
          resource_type?: string;
          resource_id?: string;
          details?: unknown;
          ip_address?: string;
          user_agent?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Database utility functions
export class DatabaseService {
  // User management
  static async createUser(userData: Database['public']['Tables']['users']['Insert']) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateUser(id: string, updates: Database['public']['Tables']['users']['Update']) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Property management
  static async createProperty(propertyData: Database['public']['Tables']['properties']['Insert']) {
    const { data, error } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getPropertyById(id: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getPropertiesByUserId(userId: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Configuration management
  static async createConfiguration(configData: Database['public']['Tables']['configurations']['Insert']) {
    const { data, error } = await supabase
      .from('configurations')
      .insert(configData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getConfigurationById(id: string) {
    const { data, error } = await supabase
      .from('configurations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateConfiguration(id: string, updates: Database['public']['Tables']['configurations']['Update']) {
    const { data, error } = await supabase
      .from('configurations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Order management
  static async createOrder(orderData: Database['public']['Tables']['orders']['Insert']) {
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getOrderById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getOrdersByUserId(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async updateOrderStatus(id: string, status: Database['public']['Tables']['orders']['Row']['status']) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Product management
  static async getProducts(category?: Database['public']['Tables']['products']['Row']['category']) {
    let query = supabase
      .from('products')
      .select('*')
      .eq('status', 'active');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('name');
    
    if (error) throw error;
    return data;
  }

  static async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Audit logging
  static async logAction(
    userId: string,
    action: string,
    resourceType: string,
    resourceId: string,
    details?: unknown
  ) {
    const { data, error } = await supabase
      .from('audit_logs')
      .insert({
        user_id: userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        details,
        ip_address: '127.0.0.1', // This would be extracted from request in real implementation
        user_agent: 'web-app', // This would be extracted from request in real implementation
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Analytics and reporting
  static async getOrderAnalytics(startDate?: string, endDate?: string) {
    let query = supabase
      .from('orders')
      .select('status, total_amount, created_at');
    
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getProductSales(category?: Database['public']['Tables']['products']['Row']['category']) {
    // This would be a more complex query in a real implementation
    // For now, we'll return mock data structure
    const { data, error } = await supabase
      .from('products')
      .select('id, name, category, price')
      .eq('status', 'active');
    
    if (error) throw error;
    return data;
  }
}

// Mock data for development (when Supabase is not configured)
export const mockDatabaseService = {
  async createUser(userData: any) {
    console.log('Mock: Creating user', userData);
    return { id: 'mock-user-id', ...userData, created_at: new Date().toISOString() };
  },

  async getUserById(id: string) {
    console.log('Mock: Getting user', id);
    return {
      id,
      email: 'mock@example.com',
      name: 'Mock User',
      role: 'user' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  },

  async createProperty(propertyData: any) {
    console.log('Mock: Creating property', propertyData);
    return { id: 'mock-property-id', ...propertyData, created_at: new Date().toISOString() };
  },

  async createConfiguration(configData: any) {
    console.log('Mock: Creating configuration', configData);
    return { id: 'mock-config-id', ...configData, created_at: new Date().toISOString() };
  },

  async createOrder(orderData: any) {
    console.log('Mock: Creating order', orderData);
    return { id: 'mock-order-id', ...orderData, created_at: new Date().toISOString() };
  },

  async getProducts(category?: string) {
    console.log('Mock: Getting products', category);
    return [
      {
        id: 'kiosk-basic',
        name: 'Basic Kiosk',
        description: 'Entry-level self-service kiosk',
        category: 'kiosk' as const,
        price: 2500,
        stock: 45,
        status: 'active' as const,
        created_at: new Date().toISOString(),
      },
      {
        id: 'lock-basic',
        name: 'Basic Smart Lock',
        description: 'Entry-level smart lock',
        category: 'smart_lock' as const,
        price: 180,
        stock: 234,
        status: 'active' as const,
        created_at: new Date().toISOString(),
      },
    ];
  },
};

// Use mock service if Supabase is not configured
export const db = process.env.NEXT_PUBLIC_SUPABASE_URL ? DatabaseService : mockDatabaseService;
