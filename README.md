# 🏨 Vendoora - Smart Hotel Experience Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Deploy](https://img.shields.io/badge/deploy-Vercel-black)](https://vercel.com)

A comprehensive enterprise-grade platform for hotel, Airbnb, VRBO, and timeshare properties to configure and customize their complete smart hotel experience. Built with Next.js 14, TypeScript, and modern web technologies.

**Transform your property with intelligent kiosks, smart locks, automated room features, and complete guest management.**

---

## ✨ What Makes Vendoora Special

- 🌍 **Multi-Region Support** - 6 regional markets with auto-detection (US, EU, Asia, LATAM, Africa, Global)
- 🗣️ **6 Languages** - English, Spanish, Chinese, German, French, Portuguese
- 🤖 **AI Recommendations** - Smart product suggestions based on property type and budget
- 📦 **4 Supplier Catalogs** - HidinTech, Trinity-TAJ, Poyal, E-Star fully integrated
- 🎯 **Property Type Aware** - Hotels, Resorts, Airbnb, VRBO, Timeshare, Casinos, Motels
- 🔌 **Regional Compatibility** - Automatic voltage, frequency, and certification filtering
- 🚀 **Production Ready** - SEO optimized, PWA ready, accessibility compliant

## 🚀 Features

### 🏗️ Complete Property Configuration
- **Property Setup Wizard** - Multi-step configuration for all property types
- **Short-Term Rental Module** - Airbnb/VRBO specific features and workflows
- **Guest Management System** - Complete guest lifecycle management
- **Booking Integration** - Connect Airbnb, VRBO, Booking.com APIs
- **Cleaning & Maintenance** - Staff scheduling, task management, QA inspections

### 🖥️ Self Check-in Kiosks
- **E-Star Desktop 19"** - Compact countertop model
- **E-Star Freestanding 32"** - Full-featured lobby kiosk
- **E-Star Wall-Mounted 21"** - Space-saving wall unit
- **Interactive Finish Swaps** - Hover/tap to preview white/black finishes
- **Kiosk → Lock Integration** - Trinity-TAJ API compatibility

### 🔐 Smart Lock Systems
- **TAJ L-Series** - Hotel/resort battery or wired locks
- **TAJ KL-Series** - Camera-enabled locks with face recognition
- **TAJ S-Series** - Slimline locks for short-term rentals
- **Multiple Auth Methods** - Card, mobile, PIN, fingerprint, face
- **Mobile Wallet Keys** - Apple Wallet, Google Pay integration

### 🏠 Room Automation
- **HidinTech Switches** - Regional variants (US 110V, EU 220V)
- **Smart Dimmers** - Scene control and scheduling
- **Motion Sensors** - Occupancy detection and energy savings
- **Poyal Blinds** - Interior/exterior motorized blinds
- **Thermostat Control** - Climate automation

### 💳 Checkout & Orders
- **Stripe Integration** - Secure payment processing
- **Volume Discounts** - Tiered pricing (5-15% off)
- **Per-Room Cost Analysis** - Real-time cost calculator
- **Configuration Export** - JSON download for procurement

### 📊 Admin Dashboard
- **Order Management** - Track and manage all orders
- **Product Catalog** - Manage inventory and pricing
- **Analytics** - Revenue, conversion, popular products
- **User Management** - Roles and permissions (coming soon)

### 🌐 Multilingual & Regional
- **6 Languages** - EN, ES, ZH, DE, FR, PT
- **Auto Region Detection** - Based on browser locale
- **Regional Catalogs** - Voltage/frequency/certification filtering
- **Currency Formatting** - USD, EUR, and more
- **Date/Time Localization** - Regional formats

### 🔍 SEO & Performance
- **Meta Tags** - Dynamic generation for all pages
- **Structured Data** - Product, Organization, Breadcrumb schemas
- **Sitemap & Robots** - Automatic generation
- **hreflang Tags** - Multilingual SEO
- **PWA Ready** - Installable as mobile/desktop app
- **Lighthouse 95+** - Performance, SEO, Accessibility

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 14 (App Router) | React framework with SSR/ISR |
| **Language** | TypeScript 5.0 | Type-safe development |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first CSS + components |
| **State** | Zustand | Lightweight global state |
| **i18n** | Custom system | 6-language support |
| **Database** | Supabase (PostgreSQL) | Backend as a service |
| **Payments** | Stripe | Payment processing |
| **Deployment** | Vercel | Edge-optimized hosting |
| **CI/CD** | GitHub Actions | Automated testing & deployment |
| **Testing** | Jest + Playwright | Unit & E2E tests |
| **Linting** | ESLint + Prettier | Code quality |

## ⚡ Quick Start

### Prerequisites
- **Node.js** 18.x or higher
- **npm** / **yarn** / **pnpm**
- **Git**

### Installation (5 Minutes)

```bash
# 1. Clone the repository
git clone https://github.com/vendoora/mainsalesportal.git
cd mainsalesportal

# 2. Install dependencies
npm install

# 3. Copy environment template (optional for dev)
cp .env.example .env.local

# 4. Start development server
npm run dev

# 5. Open browser
# → http://localhost:3000
```

**That's it!** 🎉 The app works perfectly without environment variables in development mode (uses mock data).

### Environment Variables (Production Only)

```env
# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (Payments)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# App Configuration
NEXT_PUBLIC_BASE_URL=https://vendoora.com
```

## 🚀 Deployment

### Vercel (Recommended - One Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vendoora/mainsalesportal)

**Or via CLI:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
npm run deploy:production
```

### Other Platforms

- **Netlify**: Use the Next.js plugin
- **AWS Amplify**: Follow Next.js deployment guide
- **Docker**: Use the included Dockerfile (coming soon)

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for detailed deployment instructions.

2. **Follow the interactive prompts**

### GitHub Actions (CI/CD)

The project includes GitHub Actions workflows for automated testing and deployment:

- **Test Suite**: Runs on every push and PR
- **Staging Deployment**: Deploys to staging on `develop` branch
- **Production Deployment**: Deploys to production on `main` branch

## 🔧 Configuration

### Environment Variables

#### Required Variables
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### Optional Variables
```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_nextauth_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_email_password
NEXT_PUBLIC_GA_ID=your_google_analytics_id
SENTRY_DSN=your_sentry_dsn
```

### Vercel Configuration

The project includes a `vercel.json` configuration file with:
- Security headers
- CORS configuration
- Function timeouts
- Redirects and rewrites

## 📊 Project Structure

```
vendoora/mainsalesportal/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Home page
│   │   ├── setup/                    # Property setup wizard
│   │   ├── kiosk/                    # Kiosk selection
│   │   ├── locks/                    # Smart lock configuration
│   │   ├── room-features/            # Room automation
│   │   ├── checkout/                 # Checkout flow
│   │   ├── short-term-rental/        # Airbnb/VRBO module
│   │   ├── guest-management/         # Guest lifecycle
│   │   ├── booking-integration/      # Platform APIs
│   │   ├── cleaning-maintenance/     # Staff scheduling
│   │   ├── admin/                    # Admin dashboard
│   │   ├── kiosk-showcase/           # Interactive product demo
│   │   ├── supplier-catalogs/        # Supplier PDF viewer
│   │   ├── trinity-taj-builder/      # TAJ integration wizard
│   │   ├── sitemap.ts                # Dynamic sitemap
│   │   └── robots.ts                 # SEO robots.txt
│   ├── components/                   # React components
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── forms/                    # Multi-step wizards
│   │   ├── admin/                    # Admin UI
│   │   ├── guest-management/         # Guest UI
│   │   ├── booking-integration/      # Integration UI
│   │   ├── cleaning-maintenance/     # Cleaning UI
│   │   ├── kiosk-showcase/           # Interactive kiosk cards
│   │   ├── supplier-analysis/        # Catalog dashboards
│   │   ├── trinity-taj/              # TAJ components
│   │   ├── providers/                # Context providers
│   │   ├── layout/                   # Layout components
│   │   └── pages/                    # Page-specific components
│   ├── lib/                          # Core utilities
│   │   ├── regions.ts                # Regional configuration
│   │   ├── product-catalog.ts        # Catalog management
│   │   ├── recommendations.ts        # AI recommendations
│   │   ├── seo.ts                    # SEO utilities
│   │   ├── i18n.ts                   # Internationalization
│   │   ├── supabase.ts               # Database client
│   │   └── utils.ts                  # Helper functions
│   ├── messages/                     # Translation files
│   │   ├── en.json                   # English
│   │   ├── es.json                   # Spanish
│   │   ├── zh.json                   # Chinese
│   │   ├── de.json                   # German
│   │   ├── fr.json                   # French
│   │   └── pt.json                   # Portuguese
│   ├── store/                        # Zustand state stores
│   │   ├── useConfigurationStore.ts  # Configuration state
│   │   ├── useUserStore.ts           # User state
│   │   ├── useOrderStore.ts          # Order state
│   │   ├── useAuthStore.ts           # Auth state
│   │   ├── useGuestStore.ts          # Guest state
│   │   ├── useBookingIntegrationStore.ts # Booking state
│   │   ├── useCleaningStore.ts       # Cleaning state
│   │   └── useUIStore.ts             # UI state
│   ├── types/                        # TypeScript definitions
│   │   └── index.ts                  # Core types
│   └── hooks/                        # Custom React hooks
│       ├── useTranslation.ts         # Translation hook
│       └── useStores.ts              # Store access hook
├── public/
│   ├── data/                         # Product catalogs (JSON)
│   │   ├── hidintech-switches-us.json
│   │   ├── hidintech-switches-eu.json
│   │   ├── poyal-blinds.json
│   │   ├── estar-kiosks.json
│   │   ├── locks-trinity-taj.json
│   │   └── kiosks-trinity-taj.json
│   ├── vendoora-assets/              # Brand assets
│   │   ├── logos/                    # SVG logos
│   │   ├── icons/                    # UI icons
│   │   ├── css/                      # Custom CSS
│   │   ├── js/                       # Custom JS
│   │   └── images_4k/                # Product renders
│   └── manifest.json                 # PWA manifest
├── references/                       # Supplier PDFs (local)
│   ├── pdf/                          # Supplier catalogs
│   ├── zip/                          # Asset archives
│   └── extracted_data/               # PDF extraction output
├── scripts/                          # Utility scripts
│   ├── pdf-analyzer.py               # PDF extraction
│   └── open-pdfs.sh                  # Open PDF folder
├── supabase/                         # Database schema
│   └── schema.sql                    # SQL schema
├── .github/                          # GitHub Actions
│   └── workflows/                    # CI/CD workflows
│       ├── deploy.yml                # Deployment
│       └── test.yml                  # Testing
└── docs/                             # Documentation
    ├── GETTING_STARTED.md            # Quick start guide
    ├── PHASE_A_COMPLETE.md           # Architecture docs
    ├── DEPLOYMENT.md                 # Deployment guide
    ├── TRINITY_TAJ_INTEGRATION.md    # API integration
    ├── KIOSK_RENDER_SYSTEM.md        # Interactive UI docs
    ├── PDF_EXTRACTION_GUIDE.md       # PDF extraction
    ├── SUPPLIER_ANALYSIS.md          # Catalog analysis
    └── CONTRIBUTING.md               # Contribution guide
```

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## 🔍 Code Quality

### Linting
```bash
npm run lint
npm run lint:fix
```

### Type Checking
```bash
npm run type-check
```

### Formatting
```bash
npm run format
npm run format:check
```

## 📈 Performance

### Bundle Analysis
```bash
npm run analyze
```

### Build Optimization
The project is optimized for production with:
- Code splitting
- Image optimization
- Tree shaking
- Minification
- Compression

## 🔒 Security

### Security Features
- CSRF protection
- XSS protection
- Content Security Policy
- Secure headers
- Input validation
- Rate limiting

### Security Headers
The application includes comprehensive security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: origin-when-cross-origin`

## 🌐 Internationalization

The platform is designed to support multiple languages:
- English (default)
- Spanish
- French
- German
- Italian
- Portuguese
- Japanese
- Korean
- Chinese
- Arabic

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly interfaces
- Mobile-optimized forms
- Progressive Web App (PWA) ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@vendoora.com or join our Slack channel.

## 🗺️ Roadmap

- [ ] Multilingual system implementation
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] API documentation
- [ ] Performance monitoring
- [ ] Advanced security features

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first CSS framework
- shadcn/ui for the component library
- All contributors and supporters

---

Built with ❤️ by the Vendoora team