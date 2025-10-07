# Smart Hotel Configurator

A future-forward, multilingual HTML application that allows hotel properties to customize their smart hotel experience with comprehensive configuration options for kiosks, smart locks, and smart room features.

## 🌟 Features

### Multi-Step Configuration Wizard
- **Property Setup**: Configure basic property details including rooms, floors, and inspection requirements
- **Kiosk Selection**: Choose and configure self-service kiosk features
  - Passport scanner with OCR and biometric verification
  - Printer options (thermal, inkjet, laser)
  - Key card dispenser with RFID/magnetic stripe encoding
  - Payment terminal with contactless and chip & PIN support
- **Smart Lock Configuration**: Comprehensive lock system setup
  - Power options: Battery, wired, or hybrid
  - Multiple access methods: Key card, mobile app, fingerprint, PIN, facial recognition
  - Advanced security features: Tamper alerts, audit trails, remote control, auto-lock
- **Smart Room Features**: Complete room automation configuration
  - Lighting control with scenes and motion activation
  - Environmental sensors (motion, occupancy, temperature, humidity, air quality)
  - Motorized window treatments with auto-adjustment
  - Climate control with smart thermostats and energy-saving modes
  - Entertainment and connectivity options

### 🌍 Multilingual Support
Built-in support for:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Chinese (zh)

Easy to extend with additional languages through the modular i18n system.

### 💾 Data Persistence
- Automatic saving to browser localStorage
- Export configuration as JSON
- Print-friendly formatting for documentation

### 🎨 Modern, Responsive Design
- Clean, professional UI with smooth animations
- Mobile-first responsive design
- Accessible form controls
- Progress tracking visualization

## 🚀 Getting Started

### Quick Start
Simply open `index.html` in a modern web browser. No build process or dependencies required!

```bash
# Clone the repository
git clone https://github.com/vendoora-commits/mainsalesportal.git

# Navigate to the directory
cd mainsalesportal

# Open in browser
open index.html
# or
start index.html
# or
xdg-open index.html
```

### File Structure
```
mainsalesportal/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with CSS variables
├── app.js              # Application logic and state management
├── i18n.js             # Internationalization module
└── README.md           # This file
```

## 🎯 Usage

1. **Select Language**: Choose your preferred language from the dropdown in the header
2. **Property Setup**: Fill in your property details (name, rooms, type, etc.)
3. **Configure Kiosks**: Toggle and customize kiosk features
4. **Setup Smart Locks**: Choose power type, access methods, and security features
5. **Configure Rooms**: Select smart room features across lighting, climate, entertainment, etc.
6. **Review & Export**: Review your configuration and export as JSON

## 🛠️ Technology Stack

### Current Implementation (HTML/CSS/JS)
- **HTML5**: Semantic markup with accessibility attributes
- **CSS3**: Modern features including CSS Grid, Flexbox, Custom Properties, Animations
- **Vanilla JavaScript**: ES6+ features, modular design, localStorage API
- **No dependencies**: Pure web standards implementation

### Design Patterns
- **MVC-inspired architecture**: Separation of data, view, and logic
- **Module pattern**: Encapsulated i18n and app logic
- **Event-driven**: Reactive UI updates
- **Progressive enhancement**: Works without JavaScript for basic content

## 📱 Browser Support

Tested and working on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔄 Migration to Next.js + Supabase

This project is structured for easy migration to a Next.js application. Here's the recommended approach:

### Phase 1: Next.js Setup
```bash
# Create Next.js app
npx create-next-app@latest smart-hotel-configurator --typescript --tailwind --app

# Install dependencies
cd smart-hotel-configurator
npm install
```

### Phase 2: Component Structure
Convert the HTML into React components:

```
app/
├── layout.tsx                 # Root layout with i18n provider
├── page.tsx                   # Main configurator page
├── components/
│   ├── Header.tsx            # Language selector & branding
│   ├── ProgressBar.tsx       # Step progress indicator
│   ├── steps/
│   │   ├── PropertySetup.tsx
│   │   ├── KioskSelection.tsx
│   │   ├── SmartLocks.tsx
│   │   ├── SmartRooms.tsx
│   │   └── Review.tsx
│   └── ui/
│       ├── FeatureCard.tsx
│       ├── ToggleSwitch.tsx
│       └── Button.tsx
├── lib/
│   ├── i18n/
│   │   ├── translations.ts   # Port from i18n.js
│   │   └── useTranslation.ts # React hook
│   └── supabase/
│       ├── client.ts         # Supabase client config
│       └── schema.sql        # Database schema
└── hooks/
    ├── useConfigurator.ts    # State management
    └── useLocalStorage.ts    # Persistence hook
```

### Phase 3: Tailwind CSS Migration
The current CSS uses custom properties that map well to Tailwind:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        success: '#10b981',
      },
    },
  },
}
```

### Phase 4: Supabase Integration

#### Database Schema
```sql
-- configurations table
CREATE TABLE configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  property_name TEXT,
  config_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE configurations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own configurations"
  ON configurations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create configurations"
  ON configurations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own configurations"
  ON configurations FOR UPDATE
  USING (auth.uid() = user_id);
```

#### Client Integration
```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Save configuration
export async function saveConfiguration(configData: any) {
  const { data, error } = await supabase
    .from('configurations')
    .insert([{ config_data: configData }])
  
  if (error) throw error
  return data
}

// Load configurations
export async function loadConfigurations() {
  const { data, error } = await supabase
    .from('configurations')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}
```

### Phase 5: State Management
Use React Context or Zustand for global state:

```typescript
// hooks/useConfigurator.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ConfiguratorStore {
  currentStep: number
  formData: Record<string, any>
  setCurrentStep: (step: number) => void
  updateFormData: (stepKey: string, data: any) => void
  resetConfiguration: () => void
}

export const useConfigurator = create<ConfiguratorStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {},
      setCurrentStep: (step) => set({ currentStep: step }),
      updateFormData: (stepKey, data) =>
        set((state) => ({
          formData: { ...state.formData, [stepKey]: data },
        })),
      resetConfiguration: () => set({ currentStep: 1, formData: {} }),
    }),
    { name: 'smart-hotel-config' }
  )
)
```

### Phase 6: i18n with next-intl
```bash
npm install next-intl
```

```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

const locales = ['en', 'es', 'fr', 'de', 'zh']

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale)) notFound()

  const messages = await import(`@/messages/${locale}.json`)

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
```

## 🎨 Customization

### Theming
Modify CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Brand color */
    --primary-hover: #1d4ed8;      /* Hover state */
    --secondary-color: #64748b;    /* Secondary actions */
    --success-color: #10b981;      /* Success states */
    /* ... more variables ... */
}
```

### Adding Languages
Edit `i18n.js` to add new translations:

```javascript
translations: {
  // ... existing languages ...
  it: {
    app: {
      title: 'Configuratore Smart Hotel'
    },
    // ... add all translation keys ...
  }
}
```

### Adding Features
1. Add HTML markup in the appropriate step section
2. Update corresponding section in `generateSummary()` in `app.js`
3. Add translation keys to all languages in `i18n.js`
4. Update CSS if custom styling is needed

## 📝 Configuration Export Format

The JSON export follows this structure:

```json
{
  "version": "1.0",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "language": "en",
  "configuration": {
    "step1": {
      "propertyName": "Grand Hotel",
      "numberOfRooms": "150",
      "propertyType": "hotel",
      "inspection": ["checkin", "checkout"],
      "floors": "10"
    },
    "step2": {
      "kiosk": ["passport-scanner", "key-dispenser"],
      "passport-features": ["ocr"],
      "key-features": ["rfid"]
    },
    "step3": {
      "lock-power": "battery",
      "lock-access": ["keycard", "mobile"],
      "lock-security": ["audit", "auto"]
    },
    "step4": {
      "room-lighting": ["smart-switches", "scenes"],
      "room-sensors": ["motion", "occupancy"],
      "room-climate": ["smart-thermostat", "energy-saving"]
    }
  }
}
```

## 🤝 Contributing

This is a foundational prototype. Future enhancements:
- [ ] Backend integration with Supabase
- [ ] User authentication
- [ ] Multi-property management
- [ ] Configuration templates
- [ ] Cost estimation calculator
- [ ] Installation timeline planner
- [ ] Vendor integration options

## 📄 License

MIT License - feel free to use this for your projects!

## 🙏 Acknowledgments

Built with modern web standards and best practices for easy deployment and maintenance. Designed for seamless migration to Next.js ecosystem.