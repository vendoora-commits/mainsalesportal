# 🖥️ Vendoora Interactive Kiosk Render System

## Overview

This system provides an interactive dual-finish experience for kiosk product showcases, allowing users to seamlessly switch between **Satin White + Aluminum** and **Matte Black + Stainless Steel** finishes.

---

## 🎯 Features

- **Dual-Finish System**: Smooth cross-fade between white and black finishes
- **Desktop Hover**: Automatic finish swap on hover (CSS-based)
- **Mobile Tap**: Toggle finish on tap/click (JavaScript-based)
- **Keyboard Support**: Accessible via Enter/Space keys
- **Lazy Loading**: Images load when scrolled into viewport
- **Preloading**: Both finishes preloaded for instant transitions
- **Responsive**: Adapts to all screen sizes
- **Print Optimized**: White finish for printing
- **Multilingual Alt Text**: English, Chinese, Spanish support

---

## 📁 File Structure

```
/public/vendoora-assets/
├── css/
│   └── kiosk-interactive.css        # Core CSS animations and styles
├── js/
│   └── kiosk-interactive.js         # JavaScript interactivity
├── images_4k/
│   └── kiosks/                      # 4K render directory (ready for images)
│       ├── kiosk_desktop19_white.png      # Desktop 19" - White finish
│       ├── kiosk_desktop19_black.png      # Desktop 19" - Black finish
│       ├── kiosk_freestanding32_white.png # Freestanding 32" - White finish
│       ├── kiosk_freestanding32_black.png # Freestanding 32" - Black finish
│       ├── kiosk_wall21_white.png         # Wall 21" - White finish
│       └── kiosk_wall21_black.png         # Wall 21" - Black finish
└── kiosk-alt-text.json              # Multilingual alt text manifest

/src/components/kiosk-showcase/
├── InteractiveKioskCard.tsx         # React component for single kiosk
└── KioskCatalog.tsx                 # Full kiosk catalog showcase

/src/app/
└── kiosk-showcase/
    └── page.tsx                     # Kiosk showcase page
```

---

## 🎨 Kiosk Models & Finishes

### Models to Render:

| Model                    | Screen Size | Form Factor    | Price   |
|--------------------------|-------------|----------------|---------|
| Desktop 19"              | 19"         | Countertop     | $1,200  |
| Freestanding 32"         | 32"         | Floor-standing | $2,500  |
| Wall-Mounted 21"         | 21"         | Wall-mounted   | $1,800  |

### Finishes:

Each model needs **2 finishes × 2 styles = 4 renders per model**:

**Variant A: Satin White + Aluminum**
- Main body: Satin white powder coat
- Accents: Brushed aluminum trim
- Shadow: Soft, subtle

**Variant B: Matte Black + Stainless Steel**
- Main body: Matte black powder coat
- Accents: Brushed stainless steel trim
- Shadow: Slightly deeper

---

## 💻 HTML Implementation

### Basic Usage

```html
<div class="kiosk-wrap">
  <img src="/vendoora-assets/images_4k/kiosks/kiosk_desktop19_white.png"
       alt="Desktop 19-inch self-check-in kiosk (white finish)"
       class="kiosk-img white active">
  <img src="/vendoora-assets/images_4k/kiosks/kiosk_desktop19_black.png"
       alt="Desktop 19-inch self-check-in kiosk (black finish)"
       class="kiosk-img black">
</div>
```

### With Finish Indicator

```html
<div class="kiosk-wrap">
  <img src="/vendoora-assets/images_4k/kiosks/kiosk_desktop19_white.png"
       alt="Desktop 19-inch kiosk (white)"
       class="kiosk-img white active">
  <img src="/vendoora-assets/images_4k/kiosks/kiosk_desktop19_black.png"
       alt="Desktop 19-inch kiosk (black)"
       class="kiosk-img black">
</div>
<div class="kiosk-finish-indicator">
  <span class="kiosk-finish-dot white"></span>
  <span>Hover or tap to swap finish</span>
  <span class="kiosk-finish-dot black"></span>
</div>
```

### React/Next.js Usage

```tsx
import { InteractiveKioskCard } from '@/components/kiosk-showcase/InteractiveKioskCard';

<InteractiveKioskCard
  model="desktop-19"
  title="Desktop 19\" Self Check-In Kiosk"
  description="Compact desktop kiosk perfect for reception counters"
  whiteImagePath="/vendoora-assets/images_4k/kiosks/kiosk_desktop19_white.png"
  blackImagePath="/vendoora-assets/images_4k/kiosks/kiosk_desktop19_black.png"
  whiteAlt="Desktop 19-inch kiosk in satin white finish"
  blackAlt="Desktop 19-inch kiosk in matte black finish"
  price={1200}
  features={['Passport Scanner', 'Thermal Printer', 'Card Reader']}
/>
```

---

## ⚙️ CSS Animation Details

### Transition Timing
- **Duration**: 0.4s (smooth, professional feel)
- **Easing**: ease (natural acceleration/deceleration)
- **Property**: opacity (GPU-accelerated)

### Hover Behavior (Desktop)
```css
.kiosk-wrap:hover .white { opacity: 0; }
.kiosk-wrap:hover .black { opacity: 1; }
```

### Touch Behavior (Mobile)
- Handled by JavaScript
- Simple tap toggles between finishes
- Visual feedback with scale transform

---

## 🔧 JavaScript API

The system exposes a global `VendooraKiosk` object with methods:

```javascript
// Reset all kiosks to white finish
VendooraKiosk.reset();

// Get current finish of a kiosk
const finish = VendooraKiosk.getCurrentFinish(kioskElement);
// Returns: 'white' or 'black'

// Set specific finish programmatically
VendooraKiosk.setFinish(kioskElement, 'black');

// Re-initialize after dynamic content load
VendooraKiosk.init();
```

### Example Usage:

```javascript
// Show all kiosks in black finish
document.querySelectorAll('.kiosk-wrap').forEach(wrap => {
  VendooraKiosk.setFinish(wrap, 'black');
});

// Toggle finish on button click
document.getElementById('toggle-finish').addEventListener('click', () => {
  const kiosk = document.querySelector('.kiosk-wrap');
  const current = VendooraKiosk.getCurrentFinish(kiosk);
  VendooraKiosk.setFinish(kiosk, current === 'white' ? 'black' : 'white');
});
```

---

## 🌐 Accessibility Features

### ARIA Attributes
```html
<div class="kiosk-wrap" 
     role="button" 
     aria-pressed="false" 
     tabindex="0">
```

### Keyboard Navigation
- **Enter**: Toggle finish
- **Space**: Toggle finish
- **Tab**: Navigate between kiosks

### Screen Reader Support
- Descriptive alt text for both finishes
- ARIA pressed state indicates current finish
- Focus indicators for keyboard navigation

### Multilingual Alt Text
```json
{
  "alt_en": "Desktop 19-inch kiosk in satin white finish",
  "alt_zh": "19英寸桌面自助入住机，缎面白色外观",
  "alt_es": "Kiosko de escritorio de 19 pulgadas en acabado blanco"
}
```

---

## 📱 Responsive Behavior

### Mobile (< 640px)
- Full width images
- Tap to toggle
- Optimized touch targets

### Tablet (641px - 1024px)
- Max width: 400px
- Both hover and tap supported

### Desktop (> 1025px)
- Max width: 480px
- Hover for instant preview
- Click still toggles for persistence

---

## 🖼️ Image Requirements

### File Format
- **Format**: PNG (transparent background)
- **Resolution**: 4K (3840×2160 or equivalent aspect ratio)
- **Color Space**: sRGB
- **Bit Depth**: 24-bit with alpha channel

### Image Specifications
- **Background**: Transparent
- **Shadow**: Soft drop shadow baked into PNG
- **Orientation**: Front-facing, slight 3/4 angle
- **Lighting**: Consistent studio lighting
- **Quality**: Photorealistic with material detail

### File Naming Convention
```
kiosk_{model}_{finish}.png

Examples:
- kiosk_desktop19_white.png
- kiosk_desktop19_black.png
- kiosk_freestanding32_white.png
- kiosk_freestanding32_black.png
- kiosk_wall21_white.png
- kiosk_wall21_black.png
```

---

## 🚀 Implementation Checklist

### Phase 1: Infrastructure (✅ COMPLETED)
- [x] CSS animation system created
- [x] JavaScript interactivity implemented
- [x] React components built
- [x] Showcase page created
- [x] Alt text manifest prepared
- [x] Responsive design implemented
- [x] Accessibility features added

### Phase 2: Content (⏳ AWAITING 4K RENDERS)
- [ ] Receive 4K renders (white + black for each model)
- [ ] Place images in `/public/vendoora-assets/images_4k/kiosks/`
- [ ] Verify image quality and transparency
- [ ] Test cross-fade transitions
- [ ] Validate alt text across languages
- [ ] Optimize image compression if needed

### Phase 3: Integration (📋 READY)
- [ ] Update kiosk selection wizard with interactive cards
- [ ] Add to product catalog pages
- [ ] Integrate with shopping cart
- [ ] Add to checkout summary
- [ ] Update admin product management

---

## 🎓 Usage Guide

### For Developers

1. **Add kiosk to any page:**
   ```tsx
   import { InteractiveKioskCard } from '@/components/kiosk-showcase/InteractiveKioskCard';
   ```

2. **Include in layout:**
   - CSS and JS are already included in root layout
   - Components work automatically on any page

3. **Customize styling:**
   - Override `.kiosk-wrap` max-width for different sizes
   - Adjust transition duration in CSS if needed

### For Content Creators

1. **Upload 4K renders to:**
   ```
   /public/vendoora-assets/images_4k/kiosks/
   ```

2. **File naming must match:**
   - `kiosk_{model}_{finish}.png`
   - Example: `kiosk_desktop19_white.png`

3. **Alt text automatically loaded from:**
   - `/public/vendoora-assets/kiosk-alt-text.json`

---

## 🔍 Testing

### Visual Testing
1. Navigate to `/kiosk-showcase`
2. On desktop: Hover over kiosks to see black finish
3. On mobile: Tap kiosks to toggle finishes
4. Verify smooth 0.4s cross-fade transition
5. Check finish indicator updates correctly

### Accessibility Testing
1. Use keyboard (Tab + Enter) to navigate and toggle
2. Test with screen reader (should announce finish state)
3. Verify ARIA attributes are correct
4. Check focus indicators are visible

### Performance Testing
1. Check images are lazy-loaded (Network tab)
2. Verify both finishes are preloaded after first load
3. Monitor for smooth 60fps transitions
4. Test on slower mobile devices

---

## 📊 Performance Optimizations

### Image Optimization
- **Lazy Loading**: Images load when scrolled into view
- **Preloading**: Both finishes preloaded after initial load
- **GPU Acceleration**: Opacity transitions use GPU
- **Will-Change**: Optimized for transition performance

### Network Optimization
- **Deferred JavaScript**: Script loads with `defer` attribute
- **Resource Hints**: Preload links for images
- **Compression**: PNG optimization recommended (TinyPNG, etc.)

---

## 🎨 Customization

### Change Transition Duration
```css
.kiosk-img {
  transition: opacity 0.6s ease; /* Change from 0.4s to 0.6s */
}
```

### Change Hover Behavior
```css
/* Reverse hover (show white on hover instead) */
.kiosk-wrap:hover .kiosk-img.white { opacity: 1; }
.kiosk-wrap:hover .kiosk-img.black { opacity: 0; }
```

### Adjust Image Size
```css
.kiosk-wrap {
  max-width: 600px; /* Increase from 480px */
}
```

---

## 🐛 Troubleshooting

### Images Not Swapping
- Verify both images have correct class names (`white`, `black`)
- Check JavaScript is loaded (look for `VendooraKiosk` in console)
- Ensure images are inside `.kiosk-wrap` container

### Transition Not Smooth
- Verify `transition: opacity 0.4s ease` is applied
- Check images are same dimensions
- Ensure no conflicting CSS transitions

### Touch Not Working on Mobile
- Verify JavaScript is loaded and initialized
- Check browser console for errors
- Ensure click event listeners are attached

---

## 📚 Browser Support

- **Chrome/Edge**: 88+ ✅
- **Firefox**: 85+ ✅
- **Safari**: 14+ ✅
- **Mobile Safari**: 14+ ✅
- **Chrome Android**: 88+ ✅

---

## 🎯 Next Steps

1. **Receive 4K Renders**: White + black finish for each model
2. **Upload Images**: Place in `/public/vendoora-assets/images_4k/kiosks/`
3. **Test Showcase**: Navigate to `/kiosk-showcase` and verify
4. **Integrate Catalog**: Update kiosk selection wizard
5. **Deploy**: Push to production with optimized images

---

## 💡 Advanced Features (Future)

- **3D View Toggle**: Add 3D illustrative style renders
- **360° Rotation**: Interactive rotation view
- **AR Preview**: Augmented reality placement
- **Size Comparison**: Side-by-side model comparison
- **Color Customization**: Additional finish options
- **Video Demo**: Embedded product demonstrations

---

## ✨ Design Tokens

### Colors
- **White Finish**: `#ffffff` (satin texture)
- **Black Finish**: `#1f2937` (matte texture)
- **Aluminum**: `#d1d5db` (brushed metal)
- **Stainless**: `#374151` (brushed metal)

### Spacing
- **Card Padding**: 2rem
- **Image Spacing**: Auto-calculated
- **Grid Gap**: 2rem

### Typography
- **Title**: 1.25rem, font-weight 600
- **Description**: 0.875rem, color gray-600
- **Price**: 2rem, font-weight bold

---

This system is **production-ready** and awaiting only your 4K renders to come alive! 🚀

