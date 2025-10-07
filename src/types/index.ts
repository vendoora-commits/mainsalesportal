// Property Types
export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  rooms: number;
  floors: number;
  location: string;
  address: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  // Short-term rental specific fields
  maxGuests?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertySize?: number; // in square feet
  checkInTime?: string;
  checkOutTime?: string;
  amenities?: string[];
  // Booking platform integration
  bookingPlatforms?: string[]; // ['airbnb', 'vrbo', 'booking.com', etc.]
  // Property management
  hasKitchen?: boolean;
  hasParking?: boolean;
  hasWiFi?: boolean;
  hasPool?: boolean;
  hasGym?: boolean;
  hasSpa?: boolean;
  hasRestaurant?: boolean;
  hasBar?: boolean;
  hasConcierge?: boolean;
  hasRoomService?: boolean;
  hasLaundry?: boolean;
  hasBusinessCenter?: boolean;
  hasConferenceRooms?: boolean;
  hasValet?: boolean;
  hasElevator?: boolean;
  hasAccessibility?: boolean;
  hasSecurity?: boolean;
  hasCCTV?: boolean;
  hasFireSafety?: boolean;
}

export type PropertyType = 
  | 'hotel'
  | 'motel'
  | 'resort'
  | 'boutique'
  | 'apartment'
  | 'hostel'
  | 'bed_and_breakfast'
  | 'airbnb'
  | 'vrbo'
  | 'timeshare'
  | 'vacation_rental'
  | 'luxury';

// Kiosk Types
export interface KioskOption {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  specifications: Record<string, unknown>;
  image: string;
  category: KioskCategory;
}

export type KioskCategory = 
  | 'passport_scanner'
  | 'printer'
  | 'key_dispenser'
  | 'payment_terminal'
  | 'self_check_in';

export interface KioskConfiguration {
  selectedOptions: KioskOption[];
  totalPrice: number;
  configurations?: Array<{
    kioskId: string;
    quantity: number;
    location: string;
    customizations: {
      language: string;
      branding: boolean;
      customLogo: boolean;
      additionalFeatures: string[];
    };
  }>;
}

// Smart Lock Types
export interface SmartLockOption {
  id: string;
  name: string;
  description: string;
  price: number;
  powerType: PowerType;
  accessMethods: AccessMethod[];
  features: string[];
  specifications: Record<string, unknown>;
  image: string;
}

export type PowerType = 'battery' | 'wired' | 'solar';
export type AccessMethod = 'mobile' | 'keycard' | 'fingerprint' | 'bluetooth' | 'wifi';

export interface SmartLockConfiguration {
  selectedOptions: SmartLockOption[];
  totalPrice: number;
  configurations?: Array<{
    lockId: string;
    quantity: number;
    roomNumbers: string;
    accessMethods: string[];
    customizations: {
      autoLockDelay: number;
      guestCodeExpiry: number;
      tamperAlerts: boolean;
      auditLogging: boolean;
      customBranding: boolean;
    };
  }>;
}

// Room Features Types
export interface RoomFeatureOption {
  id: string;
  name: string;
  description: string;
  price: number;
  category: RoomFeatureCategory;
  features: string[];
  specifications: Record<string, unknown>;
  image: string;
}

export type RoomFeatureCategory = 
  | 'switches'
  | 'motion_sensors'
  | 'blinds'
  | 'thermostat'
  | 'lighting'
  | 'tv_control'
  | 'security'
  | 'entertainment';

export interface RoomFeaturesConfiguration {
  selectedOptions: RoomFeatureOption[];
  totalPrice: number;
}

// Configuration Types
export interface Configuration {
  id: string;
  propertyId: string;
  kioskConfig: KioskConfiguration;
  smartLockConfig: SmartLockConfiguration;
  roomFeaturesConfig: RoomFeaturesConfiguration;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export interface Order {
  id: string;
  configurationId: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  stripePaymentIntentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'cancelled'
  | 'refunded';

// Guest Management Types
export interface Guest {
  id: string;
  propertyId: string;
  bookingId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  nationality?: string;
  idType?: 'passport' | 'drivers_license' | 'national_id';
  idNumber?: string;
  idExpiryDate?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences?: {
    language: string;
    specialRequests?: string;
    accessibilityNeeds?: string[];
  };
  status: GuestStatus;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  totalAmount: number;
  depositAmount?: number;
  damageDeposit?: number;
  platform: BookingPlatform;
  platformBookingId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type GuestStatus = 
  | 'pending'
  | 'confirmed'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled'
  | 'no_show';

export type BookingPlatform = 
  | 'airbnb'
  | 'vrbo'
  | 'booking_com'
  | 'expedia'
  | 'direct'
  | 'other';

export interface GuestCommunication {
  id: string;
  guestId: string;
  type: 'welcome' | 'checkin_instructions' | 'checkout_reminder' | 'house_rules' | 'emergency' | 'custom';
  subject: string;
  message: string;
  sentAt: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  channel: 'email' | 'sms' | 'app_notification';
  response?: string;
  responseAt?: Date;
}

export interface GuestActivity {
  id: string;
  guestId: string;
  type: 'check_in' | 'check_out' | 'key_access' | 'amenity_use' | 'maintenance_request' | 'complaint' | 'compliment';
  description: string;
  timestamp: Date;
  location?: string;
  metadata?: Record<string, unknown>;
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
}

export interface GuestReview {
  id: string;
  guestId: string;
  propertyId: string;
  rating: number; // 1-5
  title?: string;
  comment?: string;
  categories: {
    cleanliness: number;
    communication: number;
    checkIn: number;
    accuracy: number;
    location: number;
    value: number;
  };
  platform: BookingPlatform;
  platformReviewId?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GuestPreferences {
  id: string;
  guestId: string;
  language: string;
  currency: string;
  timezone: string;
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    appNotifications: boolean;
    marketing: boolean;
  };
  accessibilityNeeds: string[];
  dietaryRestrictions?: string[];
  allergies?: string[];
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Booking Platform Integration Types
export interface BookingIntegration {
  id: string;
  propertyId: string;
  platform: BookingPlatform;
  isActive: boolean;
  apiKey: string;
  apiSecret?: string;
  webhookUrl?: string;
  calendarSyncEnabled: boolean;
  autoPriceUpdate: boolean;
  autoAvailabilitySync: boolean;
  lastSyncDate?: Date;
  syncStatus: 'active' | 'paused' | 'error';
  syncError?: string;
  settings: {
    basePrice: number;
    currency: string;
    minStay: number;
    maxStay: number;
    checkInTime: string;
    checkOutTime: string;
    instantBooking: boolean;
    requireApproval: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingCalendar {
  id: string;
  propertyId: string;
  date: Date;
  isAvailable: boolean;
  price: number;
  minStay: number;
  maxStay: number;
  bookingId?: string;
  platform?: BookingPlatform;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PricingRule {
  id: string;
  propertyId: string;
  name: string;
  type: 'weekend' | 'holiday' | 'seasonal' | 'last_minute' | 'early_bird' | 'length_of_stay' | 'custom';
  startDate?: Date;
  endDate?: Date;
  daysOfWeek?: number[]; // 0-6, Sunday-Saturday
  adjustmentType: 'percentage' | 'fixed';
  adjustmentValue: number; // percentage (1.5 = 150%) or fixed amount
  minStay?: number;
  maxStay?: number;
  priority: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SyncLog {
  id: string;
  integrationId: string;
  propertyId: string;
  platform: BookingPlatform;
  syncType: 'calendar' | 'pricing' | 'availability' | 'booking' | 'guest';
  status: 'success' | 'failed' | 'partial';
  recordsProcessed: number;
  recordsFailed: number;
  message: string;
  details?: Record<string, unknown>;
  startTime: Date;
  endTime: Date;
  duration: number; // milliseconds
}

export interface PlatformBooking {
  id: string;
  integrationId: string;
  propertyId: string;
  platform: BookingPlatform;
  platformBookingId: string;
  guestId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkInDate: Date;
  checkOutDate: Date;
  numberOfGuests: number;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  specialRequests?: string;
  platformData?: Record<string, unknown>;
  syncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Cleaning & Maintenance Types
export interface CleaningTask {
  id: string;
  propertyId: string;
  roomNumber?: string;
  bookingId?: string;
  type: 'turnover' | 'deep_clean' | 'inspection' | 'maintenance' | 'emergency';
  status: CleaningTaskStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledDate: Date;
  scheduledTime: string;
  estimatedDuration: number; // minutes
  assignedTo?: string;
  assignedTeam?: string;
  completedAt?: Date;
  completedBy?: string;
  checklistCompleted: boolean;
  photosRequired: boolean;
  photos?: string[];
  notes?: string;
  issues?: string[];
  qualityScore?: number; // 1-5
  reviewedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CleaningTaskStatus = 
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'verified'
  | 'failed'
  | 'cancelled';

export interface CleaningStaff {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  role: 'cleaner' | 'supervisor' | 'inspector' | 'maintenance';
  team?: string;
  isActive: boolean;
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  skills: string[];
  rating: number;
  completedTasks: number;
  averageCompletionTime: number; // minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface CleaningChecklist {
  id: string;
  propertyId: string;
  name: string;
  type: 'turnover' | 'deep_clean' | 'inspection' | 'maintenance';
  items: ChecklistItem[];
  estimatedDuration: number; // minutes
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistItem {
  id: string;
  category: string;
  task: string;
  isRequired: boolean;
  requiresPhoto: boolean;
  order: number;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  roomNumber?: string;
  type: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'cosmetic' | 'other';
  priority: 'low' | 'medium' | 'high' | 'emergency';
  status: 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  title: string;
  description: string;
  reportedBy: string;
  reportedAt: Date;
  assignedTo?: string;
  scheduledDate?: Date;
  completedAt?: Date;
  cost?: number;
  photos?: string[];
  notes?: string;
  resolution?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CleaningSchedule {
  id: string;
  propertyId: string;
  dayOfWeek: number; // 0-6, Sunday-Saturday
  startTime: string;
  endTime: string;
  maxTasks: number;
  assignedTeam?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface QualityInspection {
  id: string;
  propertyId: string;
  cleaningTaskId: string;
  roomNumber?: string;
  inspectorId: string;
  inspectorName: string;
  date: Date;
  overallScore: number; // 1-5
  categories: {
    cleanliness: number;
    organization: number;
    amenities: number;
    bathroom: number;
    bedroom: number;
    kitchen?: number;
  };
  passedInspection: boolean;
  issues: string[];
  photos?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'customer' | 'admin' | 'super_admin';

// Form Types
export interface PropertySetupForm {
  name: string;
  type: PropertyType;
  rooms: number;
  floors: number;
  location: string;
  address: string;
  phone: string;
  email: string;
}

export interface StepProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Localization Types
export interface LocaleConfig {
  code: string;
  name: string;
  flag: string;
  rtl: boolean;
}
