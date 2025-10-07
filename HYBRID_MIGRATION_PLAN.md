# 🔄 Hybrid Migration Plan - Align to Specification Architecture

**Goal**: Keep all Phase A/B/C features while adding proper i18n routing, multilingual schemas, and hreflang support.

**Status**: Ready to Execute  
**Estimated Time**: 4-6 hours  
**Complexity**: Medium  

---

## 📋 **What We're Keeping (Our Enhancements)**

✅ SmartWizard with AI recommendations  
✅ 8 Configuration Templates  
✅ Template Selector  
✅ Product Comparison (up to 4)  
✅ Live Price Calculator  
✅ Advanced Product Filtering  
✅ Budget Tracker  
✅ Auto-Save System  
✅ Compatibility Warnings  
✅ All existing components  

---

## 🎯 **What We're Adding (From Spec)**

1. ✅ Route-based locales (`/[locale]/`)
2. ✅ next-intl integration
3. ✅ Multilingual product names  
4. ✅ Certification badges component
5. ✅ Electrical specs structure
6. ✅ Cookie-based region persistence
7. ✅ hreflang tags per route
8. ✅ Locale-specific sitemaps
9. ✅ Region codes alignment (asia→apac, add gcc)

---

## 🚀 **Migration Steps**

### **STEP 1: Fix Package Dependencies** (5 min)

The current setup has some React version conflicts. Let's resolve them first:

```bash
# Option A: Update package.json to fix conflicts
# Edit package.json and change lucide-react version
"lucide-react": "^0.400.0"  # Update to a more recent version

# Then install
npm install

# Option B: Use force flag (if needed)
npm install next-intl --force
```

**Alternative**: Since we already have a custom i18n system, we can enhance it instead of using next-intl. This avoids dependency hell.

---

### **STEP 2: Restructure to [locale] Routing** (30 min)

Create the new route structure while keeping existing pages:

```bash
# Create new directory structure
mkdir -p src/app/\\[locale\\]
mkdir -p src/app/\\[locale\\]/products
mkdir -p src/app/\\[locale\\]/products/\\[category\\]
mkdir -p src/app/\\[locale\\]/products/\\[category\\]/\\[slug\\]
mkdir -p src/app/\\[locale\\]/wizard

# We'll move existing pages in next steps
```

**Files to create**:

1. **`src/i18n/config.ts`** - i18n configuration
2. **`src/i18n/request.ts`** - Server-side i18n
3. **`src/middleware.ts`** - Locale detection middleware
4. **`src/app/[locale]/layout.tsx`** - Locale-aware layout
5. **`src/app/[locale]/page.tsx`** - Move homepage here

---

### **STEP 3: Create Enhanced i18n Config** (15 min)

Create `src/i18n/config.ts`:

```typescript
export const locales = ['en-US', 'zh-CN', 'es-419', 'pt-BR', 'de-DE', 'fr-FR', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en-US';

export const localeNames: Record<Locale, string> = {
  'en-US': 'English',
  'zh-CN': '中文',
  'es-419': 'Español',
  'pt-BR': 'Português',
  'de-DE': 'Deutsch',
  'fr-FR': 'Français',
  'ar': 'العربية',
};

// Market mapping as per spec
export const markets = ['us', 'eu', 'latam', 'afr', 'gcc', 'apac'] as const;
export type Market = (typeof markets)[number];

export const localeToMarket: Record<Locale, Market> = {
  'en-US': 'us',
  'zh-CN': 'apac',
  'es-419': 'latam',
  'pt-BR': 'latam',
  'de-DE': 'eu',
  'fr-FR': 'eu',
  'ar': 'gcc',
};
```

---

### **STEP 4: Create Locale-Aware Middleware** (15 min)

Create `src/middleware.ts`:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Get locale from cookie or Accept-Language header
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const acceptLanguage = request.headers.get('accept-language');
  
  let locale = defaultLocale;
  
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    locale = cookieLocale as any;
  } else if (acceptLanguage) {
    // Parse Accept-Language header
    const langs = acceptLanguage.split(',').map(l => l.split(';')[0].trim());
    locale = (locales.find(l => langs.includes(l)) || defaultLocale) as any;
  }

  // Redirect to locale-prefixed URL
  request.nextUrl.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  
  // Set cookie for future visits
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  
  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
```

---

### **STEP 5: Update Product JSON Schemas** (45 min)

Update all product JSONs to match the spec schema:

**Example: `public/data/locks-taj-hotel.json`**

```json
{
  "source": "Trinity-TAJ Hotel Lock & API",
  "region": "global",
  "families": [
    {
      "id": "TAJ-L-series",
      "name": {
        "en-US": "TAJ L-Series Hotel Lock",
        "zh-CN": "TAJ L系列酒店锁",
        "es-419": "Cerradura TAJ Serie L",
        "pt-BR": "Fechadura TAJ Série L",
        "de-DE": "TAJ L-Serie Hotelschloss",
        "fr-FR": "Serrure TAJ Série L",
        "ar": "قفل TAJ سلسلة L"
      },
      "short": {
        "en-US": "Slim hotel lock with mechanical backup",
        "zh-CN": "纤薄酒店锁带机械备份",
        "es-419": "Cerradura delgada con respaldo mecánico"
      },
      "sku": "TAJ-L",
      "audience": ["hotel", "resort", "casino", "motel"],
      "protocols": ["zigbee", "ble", "nfc"],
      "power": ["battery", "wired"],
      "authMethods": ["card", "mobile", "pin", "fp"],
      "features": ["mechanical-backup", "pms-integration", "offline-capable"],
      "regions": ["us", "eu", "latam", "afr", "gcc", "apac"],
      "certifications": ["FCC", "CE", "UL", "UKCA", "INMETRO", "SABS", "NOM", "CCC"],
      "electrical": {
        "voltage": "battery",
        "freq": "",
        "socket": ""
      },
      "integration": {
        "apps": ["TTLock", "Tuya"],
        "pms": ["API-ready"]
      },
      "requirements": [
        {
          "en-US": "Zigbee gateway recommended for multi-floor deployments",
          "zh-CN": "建议多楼层部署使用Zigbee网关"
        }
      ],
      "images": {
        "default": ["/vendoora-assets/images_4k/locks/lock_slim_silver.png"],
        "finishes": {
          "silver": "/vendoora-assets/images_4k/locks/lock_slim_silver.png",
          "black": "/vendoora-assets/images_4k/locks/lock_slim_black.png"
        },
        "alt": {
          "en-US": "Slim hotel smart lock in silver finish, battery-powered, Zigbee + BLE",
          "zh-CN": "银色纤薄智能酒店锁，电池供电，Zigbee + BLE"
        }
      },
      "availability": {
        "status": "available",
        "leadTimeDays": 30
      },
      "price": 189.99
    }
  ]
}
```

**Do this for all 5 catalog files:**
- `locks-taj-hotel.json`
- `locks-taj-smart-2025.json`  
- `kiosks-estar.json`
- `switches-us.json`, `switches-eu.json`, etc.
- `blinds-poyal.json`

---

### **STEP 6: Create Certification Badge Component** (20 min)

Create `src/components/ui/certification-badge.tsx`:

```typescript
'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CertificationBadgeProps {
  certification: string;
  className?: string;
  showLabel?: boolean;
}

const certificationLogos: Record<string, string> = {
  'FCC': '/vendoora-assets/certifications/fcc.svg',
  'UL': '/vendoora-assets/certifications/ul.svg',
  'CE': '/vendoora-assets/certifications/ce.svg',
  'UKCA': '/vendoora-assets/certifications/ukca.svg',
  'INMETRO': '/vendoora-assets/certifications/inmetro.svg',
  'SABS': '/vendoora-assets/certifications/sabs.svg',
  'NOM': '/vendoora-assets/certifications/nom.svg',
  'CCC': '/vendoora-assets/certifications/ccc.svg',
  'RoHS': '/vendoora-assets/certifications/rohs.svg',
  'WEEE': '/vendoora-assets/certifications/weee.svg',
};

export function CertificationBadge({ 
  certification, 
  className,
  showLabel = true 
}: CertificationBadgeProps) {
  const logo = certificationLogos[certification];

  if (!logo) {
    return showLabel ? (
      <Badge variant="outline" className={className}>
        {certification}
      </Badge>
    ) : null;
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="relative w-8 h-8">
        <Image
          src={logo}
          alt={`${certification} certified`}
          fill
          className="object-contain"
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground">
          {certification}
        </span>
      )}
    </div>
  );
}

// Group component for multiple certifications
export function CertificationBadges({ 
  certifications, 
  className 
}: { 
  certifications: string[]; 
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {certifications.map((cert) => (
        <CertificationBadge key={cert} certification={cert} />
      ))}
    </div>
  );
}
```

---

### **STEP 7: Add Cookie-Based Region Banner** (30 min)

Create `src/components/layout/region-banner.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Locale, Market } from '@/i18n/config';
import { locales, markets, localeNames, localeToMarket } from '@/i18n/config';

export function RegionBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<Locale>('en-US');
  const [selectedMarket, setSelectedMarket] = useState<Market>('us');
  const router = useRouter();

  useEffect(() => {
    const dismissed = localStorage.getItem('region-banner-dismissed');
    const savedRegion = document.cookie.match(/NEXT_LOCALE=([^;]+)/)?.[1];
    
    if (!dismissed && !savedRegion) {
      setIsVisible(true);
    }
  }, []);

  const handleConfirm = () => {
    // Set cookies
    document.cookie = `NEXT_LOCALE=${selectedLocale}; max-age=${60 * 60 * 24 * 365}; path=/`;
    document.cookie = `NEXT_MARKET=${selectedMarket}; max-age=${60 * 60 * 24 * 365}; path=/`;
    
    localStorage.setItem('region-banner-dismissed', 'true');
    setIsVisible(false);
    
    // Redirect to selected locale
    const currentPath = window.location.pathname;
    const newPath = `/${selectedLocale}${currentPath.replace(/^\/[^/]+/, '')}`;
    router.push(newPath);
  };

  const handleDismiss = () => {
    localStorage.setItem('region-banner-dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto">
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Globe className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-lg mb-1">Welcome to Vendoora!</h3>
                <p className="text-sm text-muted-foreground">
                  Select your region and language to see products available in your market with the right certifications and specifications.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium mb-1 block">Language</label>
                  <Select value={selectedLocale} onValueChange={(v) => {
                    setSelectedLocale(v as Locale);
                    setSelectedMarket(localeToMarket[v as Locale]);
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locales.map((locale) => (
                        <SelectItem key={locale} value={locale}>
                          {localeNames[locale]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-xs font-medium mb-1 block">Market</label>
                  <Select value={selectedMarket} onValueChange={(v) => setSelectedMarket(v as Market)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {markets.map((market) => (
                        <SelectItem key={market} value={market}>
                          {market.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={handleConfirm} size="sm" className="flex-1">
                  Confirm Selection
                </Button>
                <Button onClick={handleDismiss} size="sm" variant="ghost">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

### **STEP 8: Add hreflang Tags** (20 min)

Update `src/app/[locale]/layout.tsx`:

```typescript
import { locales } from '@/i18n/config';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vendoora.com';
  const currentPath = '/'; // Get from route context in real implementation
  
  const alternates = {
    canonical: `${baseUrl}/${params.locale}${currentPath}`,
    languages: Object.fromEntries(
      locales.map(locale => [
        locale,
        `${baseUrl}/${locale}${currentPath}`
      ])
    ),
  };

  return {
    title: 'Vendoora Smart Hotel Platform',
    description: 'Transform your property with intelligent kiosks, smart locks, and automation',
    alternates,
  };
}
```

---

### **STEP 9: Create Locale-Specific Sitemaps** (25 min)

Update `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

const baseUrl = 'https://vendoora.com';

const routes = [
  '',
  '/products',
  '/products/locks',
  '/products/kiosks',
  '/products/switches',
  '/products/blinds',
  '/wizard',
  '/product-catalog',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${baseUrl}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
```

---

## 📊 **Progress Tracking**

| Step | Task | Time | Status |
|------|------|------|--------|
| 1 | Fix dependencies | 5 min | ⏳ Pending |
| 2 | Create [locale] structure | 30 min | ⏳ Pending |
| 3 | Enhanced i18n config | 15 min | ⏳ Pending |
| 4 | Locale middleware | 15 min | ⏳ Pending |
| 5 | Update product schemas | 45 min | ⏳ Pending |
| 6 | Certification badges | 20 min | ⏳ Pending |
| 7 | Region banner | 30 min | ⏳ Pending |
| 8 | hreflang tags | 20 min | ⏳ Pending |
| 9 | Locale sitemaps | 25 min | ⏳ Pending |

**Total Estimated Time**: 4 hours 25 minutes

---

## ✅ **After Migration Checklist**

- [ ] All existing pages work at `/[locale]/` routes
- [ ] Language switcher updates URL
- [ ] Product names show in selected language
- [ ] Certifications display as badges with logos
- [ ] Region banner shows on first visit
- [ ] Cookies persist locale + market selection
- [ ] hreflang tags present in page source
- [ ] Sitemap includes all locale variants
- [ ] All Phase A/B/C features still work
- [ ] SmartWizard, templates, comparison still functional

---

## 🎯 **Testing Plan**

```bash
# 1. Start dev server
npm run dev

# 2. Visit root
# → Should redirect to /en-US/

# 3. Change language
# → URL should change to /zh-CN/ etc.

# 4. Check region banner
# → Should show on first visit

# 5. Test product catalog
# → Products should show multilingual names

# 6. Verify hreflang
# View source, look for:
# <link rel="alternate" hreflang="zh-CN" href="..." />

# 7. Check sitemap
# Visit /sitemap.xml
# → Should have entries for all locales

# 8. Test existing features
# - SmartWizard still works
# - Product comparison still works
# - Price calculator still works
# - Templates still work
```

---

## 📝 **Notes**

- **Backward Compatibility**: Existing URLs without locale will redirect
- **Feature Preservation**: All Phase A/B/C components remain unchanged
- **Data Migration**: Only JSON files need updating for multilingual names
- **Gradual Rollout**: Can implement step-by-step, testing at each stage

---

## 🚀 **Ready to Execute?**

This plan allows you to:
1. Keep all the amazing features we built
2. Add proper i18n architecture from the spec
3. Support multilingual product names
4. Implement hreflang for SEO
5. Add certification badges
6. Enable cookie-based region persistence

**Start with Step 1 and work through sequentially. Each step is independent and testable.**

---

**Need help with any specific step?** Let me know and I'll provide the complete code! 💪

