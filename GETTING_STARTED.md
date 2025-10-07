# 🚀 Getting Started with Vendoora Smart Hotel Platform

Welcome to the Vendoora Smart Hotel Experience Platform! This guide will help you get up and running in minutes.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** or **pnpm**
- **Git** ([Download](https://git-scm.com/))
- A code editor (we recommend [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.sh/))

---

## ⚡ Quick Start (5 Minutes)

### 1. Clone or Open the Repository

If you're reading this, you probably already have the project! If not:

```bash
git clone https://github.com/your-org/vendoora-mainsalesportal.git
cd vendoora-mainsalesportal
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys (optional for development):

```env
# Required for production only
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key

# Optional
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **Note:** The app works perfectly without these keys for local development. All features use mock data by default.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the Vendoora homepage! 🎉

---

## 🗂️ Project Structure

```
vendoora/mainsalesportal/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── setup/              # Property setup wizard
│   │   ├── kiosk/              # Kiosk selection
│   │   ├── locks/              # Smart lock configuration
│   │   ├── room-features/      # Room automation
│   │   ├── checkout/           # Checkout flow
│   │   └── admin/              # Admin dashboard
│   ├── components/             # React components
│   │   ├── forms/              # Multi-step wizards
│   │   ├── ui/                 # UI components (shadcn/ui)
│   │   └── providers/          # Context providers
│   ├── lib/                    # Core utilities
│   │   ├── regions.ts          # Regional management
│   │   ├── product-catalog.ts  # Catalog system
│   │   ├── recommendations.ts  # AI recommendations
│   │   └── seo.ts              # SEO utilities
│   ├── messages/               # Translation files (6 languages)
│   ├── store/                  # Zustand state stores
│   └── types/                  # TypeScript definitions
├── public/
│   ├── data/                   # Product catalogs (JSON)
│   └── vendoora-assets/        # Brand assets
└── references/                 # Supplier PDFs (local only)
```

---

## 🌍 Multi-Language Support

The platform supports 6 languages out of the box:

- 🇺🇸 **English** (en)
- 🇪🇸 **Spanish** (es)
- 🇨🇳 **Chinese** (zh)
- 🇩🇪 **German** (de)
- 🇫🇷 **French** (fr)
- 🇧🇷 **Portuguese** (pt)

### Change Language

Use the language selector in the header (top-right corner). The language preference is saved to `localStorage`.

### Add a New Language

1. Create a new translation file: `src/messages/[locale].json`
2. Copy the structure from `src/messages/en.json`
3. Translate all keys
4. Update `src/lib/i18n.ts` to include the new locale

---

## 🗺️ Regional Markets

The platform automatically detects your region and shows compatible products:

- 🇺🇸 **United States** - 110-120V, 60Hz, UL/FCC certified
- 🇪🇺 **European Union** - 220-240V, 50Hz, CE/RoHS certified
- 🇨🇳 **Asia Pacific** - 220-240V, 50Hz, CCC/PSE certified
- 🇲🇽 **Latin America** - 110-240V, 50-60Hz, NOM/INMETRO certified
- 🇿🇦 **Africa & Middle East** - 220-240V, 50Hz, SABS/SASO certified
- 🌐 **Global** - Universal compatibility

Regional detection is automatic, but you can override it in your user preferences (coming soon).

---

## 🛠️ Available Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Testing
```bash
npm test             # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
```

### Deployment
```bash
npm run deploy               # Deploy to Vercel
npm run deploy:staging       # Deploy to staging
npm run deploy:production    # Deploy to production
```

### Utilities
```bash
npm run analyze      # Analyze bundle size
npm run clean        # Clean build artifacts
```

---

## 📦 Product Catalogs

All product data is stored in JSON files under `public/data/`:

- **HidinTech Switches**: `hidintech-switches-us.json`, `hidintech-switches-eu.json`
- **Trinity-TAJ Locks**: `locks-trinity-taj.json`
- **Poyal Blinds**: `poyal-blinds.json`
- **E-Star Kiosks**: `estar-kiosks.json`

### Load a Catalog

```typescript
import { loadCatalog, getAllProducts } from '@/lib/product-catalog';

const catalog = await loadCatalog('/data/hidintech-switches-us.json');
const products = getAllProducts(catalog);
```

### Filter Products

```typescript
import { filterByPropertyType, filterByRegion } from '@/lib/product-catalog';

// Filter by property type
const hotelProducts = filterByPropertyType(products, 'hotel');

// Filter by region
const usProducts = filterByRegion(products, 'us');
```

---

## 🧠 Smart Recommendations

Get AI-powered product recommendations:

```typescript
import { getSmartRecommendations } from '@/lib/recommendations';

const recommendations = await getSmartRecommendations({
  propertyType: 'hotel',
  numberOfRooms: 120,
  region: 'us',
  budget: 50000,
  priorities: ['guest-experience', 'automation'],
});

// Returns:
// - Essential products (locks, kiosks)
// - Recommended products (switches, sensors)
// - Optional products (premium features)
// - Alternative products for each category
```

---

## 🎨 UI Components

We use [shadcn/ui](https://ui.shadcn.com/) for all UI components. Components are fully customizable and theme-aware.

### Add a New Component

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
```

Components are installed to `src/components/ui/` and can be customized.

---

## 🌙 Dark Mode

The platform supports light and dark themes. Toggle the theme using the theme switcher in the header.

### Customize Themes

Edit `tailwind.config.ts` to customize colors:

```typescript
theme: {
  extend: {
    colors: {
      primary: { ... },    // Your primary color
      secondary: { ... },  // Your secondary color
    }
  }
}
```

---

## 🔒 Authentication

The platform includes a complete authentication system using JWT tokens.

### Login

```typescript
import { useAuthStore } from '@/store/useAuthStore';

const { login } = useAuthStore();

await login('user@example.com', 'password');
```

### Protected Routes

Wrap pages with the `ProtectedRoute` component (coming soon).

---

## 📊 State Management

We use [Zustand](https://zustand-demo.pmnd.rs/) for global state management.

### Available Stores

- `useConfigurationStore` - Product configuration state
- `useUserStore` - User profile and preferences
- `useOrderStore` - Order and checkout state
- `useUIStore` - UI state (theme, notifications)
- `useAuthStore` - Authentication state
- `useGuestStore` - Guest management (short-term rentals)
- `useBookingIntegrationStore` - Booking platform integration
- `useCleaningStore` - Cleaning and maintenance

### Example Usage

```typescript
import { useConfigurationStore } from '@/store/useConfigurationStore';

const { currentConfig, updateConfig } = useConfigurationStore();

updateConfig({
  propertyType: 'hotel',
  numberOfRooms: 120,
});
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Add environment variables in Vercel dashboard

Or use the CLI:

```bash
npm run deploy:production
```

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Netlify Next.js plugin
- **AWS Amplify**: Follow the Next.js deployment guide
- **Docker**: Use the included `Dockerfile` (coming soon)

---

## 🧪 Testing

### Unit Tests

We use Jest and React Testing Library:

```bash
npm test
```

### End-to-End Tests

We use Playwright for E2E tests:

```bash
npm run test:e2e
```

---

## 📚 Additional Resources

- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)
- **Zustand**: [zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs/)
- **TypeScript**: [typescriptlang.org](https://www.typescriptlang.org/)

---

## 🆘 Need Help?

- **Documentation**: See `PHASE_A_COMPLETE.md` for architecture details
- **Deployment Guide**: See `DEPLOYMENT.md` for production setup
- **API Reference**: See `TRINITY_TAJ_INTEGRATION.md` for API contracts
- **Issues**: [GitHub Issues](https://github.com/your-org/vendoora-mainsalesportal/issues)

---

## 🎉 You're All Set!

Start building amazing smart hotel experiences! 🚀

Next steps:
1. Explore the demo pages at `/demo`, `/kiosk-showcase`, `/supplier-catalogs`
2. Configure your first property at `/setup`
3. Check out the admin dashboard at `/admin`
4. Review the product catalogs in `public/data/`

**Happy coding!** 💻✨

