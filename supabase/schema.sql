-- Vendoora Smart Hotel Platform Database Schema
-- This file contains the complete database schema for the Supabase integration

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'manager')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Properties table
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    property_type VARCHAR(100) NOT NULL,
    room_count INTEGER NOT NULL,
    floor_count INTEGER NOT NULL,
    check_in_time TIME NOT NULL,
    check_out_time TIME NOT NULL,
    amenities TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurations table
CREATE TABLE configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    kiosk_config JSONB DEFAULT '{}',
    smart_lock_config JSONB DEFAULT '{}',
    room_features_config JSONB DEFAULT '{}',
    total_price DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'processing', 'installed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    configuration_id UUID NOT NULL REFERENCES configurations(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    total_amount DECIMAL(10,2) NOT NULL,
    stripe_payment_intent_id VARCHAR(255),
    billing_address JSONB,
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('kiosk', 'smart_lock', 'room_features')),
    price DECIMAL(10,2) NOT NULL,
    specifications JSONB DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    stock INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'discontinued')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(255) NOT NULL,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_properties_user_id ON properties(user_id);
CREATE INDEX idx_configurations_property_id ON configurations(property_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_configuration_id ON orders(configuration_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Properties policies
CREATE POLICY "Users can view their own properties" ON properties
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own properties" ON properties
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own properties" ON properties
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all properties" ON properties
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Configurations policies
CREATE POLICY "Users can view configurations for their properties" ON configurations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM properties 
            WHERE id = configurations.property_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create configurations for their properties" ON configurations
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM properties 
            WHERE id = configurations.property_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update configurations for their properties" ON configurations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM properties 
            WHERE id = configurations.property_id AND user_id = auth.uid()
        )
    );

-- Orders policies
CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own orders" ON orders
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all orders" ON orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Products policies (public read access)
CREATE POLICY "Anyone can view active products" ON products
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage products" ON products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Audit logs policies
CREATE POLICY "Users can view their own audit logs" ON audit_logs
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can create audit logs" ON audit_logs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configurations_updated_at BEFORE UPDATE ON configurations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data for development
INSERT INTO products (id, name, description, category, price, features, stock) VALUES
('kiosk-basic', 'Basic Kiosk', 'Entry-level self-service kiosk with essential features', 'kiosk', 2500.00, 
 ARRAY['Passport scanning', 'Self check-in/check-out', 'Key card dispensing', 'Payment processing'], 45),

('kiosk-premium', 'Premium Kiosk', 'Advanced self-service kiosk with premium features', 'kiosk', 4500.00,
 ARRAY['Passport scanning', 'Self check-in/check-out', 'Key card dispensing', 'Payment processing', 'Multi-language support', 'Touch display'], 23),

('kiosk-enterprise', 'Enterprise Kiosk', 'Enterprise-grade kiosk with advanced capabilities', 'kiosk', 6500.00,
 ARRAY['Passport scanning', 'Self check-in/check-out', 'Key card dispensing', 'Payment processing', 'Multi-language support', 'Touch display', 'Facial recognition', 'Document printing'], 12),

('lock-basic', 'Basic Smart Lock', 'Entry-level smart lock with key card and mobile access', 'smart_lock', 180.00,
 ARRAY['Key card access', 'Mobile app access', 'Battery powered', 'Easy installation'], 234),

('lock-premium', 'Premium Smart Lock', 'Advanced smart lock with multiple access methods', 'smart_lock', 320.00,
 ARRAY['Key card access', 'Mobile app access', 'Fingerprint recognition', 'Battery powered', 'WiFi connectivity'], 67),

('lock-enterprise', 'Enterprise Smart Lock', 'Enterprise-grade smart lock with advanced security', 'smart_lock', 450.00,
 ARRAY['Key card access', 'Mobile app access', 'Fingerprint recognition', 'Facial recognition', 'Wired power', 'Advanced encryption'], 34),

('features-basic', 'Basic Room Features', 'Essential room automation features', 'room_features', 1200.00,
 ARRAY['Smart lighting', 'Climate control', 'Motion sensors', 'Basic automation'], 89),

('features-premium', 'Premium Room Features', 'Advanced room automation with premium features', 'room_features', 2200.00,
 ARRAY['Smart lighting', 'Climate control', 'Motion sensors', 'Motorized blinds', 'Voice control', 'Advanced automation'], 45),

('features-enterprise', 'Enterprise Room Features', 'Complete room automation suite', 'room_features', 3500.00,
 ARRAY['Smart lighting', 'Climate control', 'Motion sensors', 'Motorized blinds', 'Voice control', 'Advanced automation', 'Entertainment control', 'Security integration'], 23);

-- Create a sample admin user
INSERT INTO users (id, email, name, role) VALUES
('00000000-0000-0000-0000-000000000000', 'admin@vendoora.com', 'Admin User', 'admin');

-- Create a sample regular user
INSERT INTO users (id, email, name, role) VALUES
('11111111-1111-1111-1111-111111111111', 'user@example.com', 'Sample User', 'user');
