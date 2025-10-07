# 📄 Trinity-TAJ PDF Extraction Guide

Complete guide to extract images and data from your Trinity-TAJ catalog PDFs.

---

## 🎯 Quick Answer: Best Tools for Your Use Case

### **Option 1: Python Script** (Most Automated) ⭐ RECOMMENDED
**Best for**: Batch extraction, automation, high-quality results

```bash
# 1. Install Python dependencies
pip install PyPDF2 pdf2image Pillow

# 2. Install poppler (required for page rendering)
brew install poppler  # macOS

# 3. Extract from PDF
python scripts/pdf-analyzer.py references/pdf/Trinity-TAJ-Smart-Lock-2025.pdf

# Output: references/extracted/ with images, pages, and text
```

---

### **Option 2: Online Tools** (No Installation) ⭐ EASIEST
**Best for**: Quick extraction, no setup required

**For Images**:
1. Go to: https://tools.pdf24.org/en/extract-images
2. Upload: `Trinity-TAJ-Smart-Lock-2025.pdf`
3. Click: "Extract images"
4. Download: ZIP file with all embedded images
5. Extract ZIP to: `references/images/trinity-taj/`

**For Full Pages** (as high-res PNGs):
1. Go to: https://www.ilovepdf.com/pdf_to_jpg
2. Upload PDF
3. Select: "Extract each page" + "High Quality"
4. Download images
5. Save to: `references/images/trinity-taj/pages/`

---

### **Option 3: macOS Preview** (Built-in, Simple)
**Best for**: Manual extraction of specific images

1. Open PDF in Preview
2. **View** → **Thumbnails** (shows all pages)
3. Find page with product image you want
4. **Tools** → **Rectangular Selection**
5. Draw box around image
6. **File** → **Export Selection** → Save as PNG
7. Repeat for each product image

---

### **Option 4: Adobe Acrobat** (If You Have It)
**Best for**: Professional extraction with metadata

1. Open PDF in Acrobat
2. **Tools** → **Export PDF** → **Image** → **PNG**
3. Select quality: "High" or "Maximum"
4. Export all pages or specific pages
5. Save to organized folder structure

---

## 📂 Recommended Extraction Workflow

### **Step 1: Place PDFs in References**
```bash
# Your PDF files should be here:
references/pdf/
├── Trinity-TAJ-Smart-Lock-2025.pdf         # Airbnb/VRBO locks
└── Trinity-TAJ-Hotel-Lock-API.pdf          # Hotel locks + kiosk integration
```

### **Step 2: Extract Using Online Tool** (Fastest)
1. Visit: https://tools.pdf24.org/en/extract-images
2. Upload both PDFs (one at a time)
3. Download extracted images for each
4. Organize in folders:
   ```
   references/images/trinity-taj/
   ├── smart-lock-2025/
   │   ├── taj-s-series-silver.jpg
   │   ├── taj-s-series-black.jpg
   │   ├── taj-kl-series-silver.jpg
   │   └── taj-kl-series-black.jpg
   └── hotel-lock-api/
       ├── taj-l-series-silver.jpg
       ├── taj-l-series-black.jpg
       ├── kiosk-desktop-19.jpg
       ├── kiosk-freestanding-32.jpg
       └── kiosk-wall-21.jpg
   ```

### **Step 3: Review and Select Best Images**
Look for:
- ✅ **Clean product shots** (no background clutter)
- ✅ **High resolution** (at least 1000px wide)
- ✅ **Good lighting** (professional product photography)
- ✅ **Multiple angles** (front, side, 3/4 view)
- ✅ **Detail shots** (keypad, card reader, camera lens)

### **Step 4: Process Images**
```bash
# Create processed output directory
mkdir -p references/images/processed

# For each good image:
# 1. Remove background (if needed): https://remove.bg
# 2. Resize/crop to consistent dimensions
# 3. Save as PNG with transparent background
# 4. Name consistently: lock_[series]_[finish].png
```

### **Step 5: Prepare for Website**
```bash
# Copy final images to website assets
cp references/images/processed/lock_*.png public/vendoora-assets/images_4k/locks/
cp references/images/processed/kiosk_*.png public/vendoora-assets/images_4k/kiosks/

# Verify they're there
ls -lh public/vendoora-assets/images_4k/locks/
ls -lh public/vendoora-assets/images_4k/kiosks/
```

---

## 🖼️ Image Naming Convention

### **For Locks**:
```
lock_[series]_[finish].png

Examples:
- lock_l_series_silver.png       # TAJ L-Series, silver finish
- lock_l_series_black.png        # TAJ L-Series, black finish
- lock_kl_series_silver.png      # TAJ KL-Series with camera, silver
- lock_kl_series_black.png       # TAJ KL-Series with camera, black
- lock_s_series_silver.png       # TAJ S-Series slimline, silver
- lock_s_series_black.png        # TAJ S-Series slimline, black
```

### **For Kiosks** (Already configured):
```
kiosk_[model]_[finish].png

Examples:
- kiosk_desktop19_white.png      # Desktop 19", satin white
- kiosk_desktop19_black.png      # Desktop 19", matte black
- kiosk_freestanding32_white.png # Freestanding 32", white
- kiosk_freestanding32_black.png # Freestanding 32", black
- kiosk_wall21_white.png         # Wall 21", white
- kiosk_wall21_black.png         # Wall 21", black
```

---

## 📊 Data Extraction for Product Catalogs

### **What to Extract from PDFs**:

#### **Lock Specifications**:
- [ ] Product name and model number
- [ ] Dimensions (W × D × H)
- [ ] Weight
- [ ] Power requirements (battery type, wired specs)
- [ ] Authentication methods supported
- [ ] Wireless protocols (BLE, NFC, Zigbee, etc.)
- [ ] Card types supported (MIFARE, EM, etc.)
- [ ] App compatibility (TTLock, Tuya, etc.)
- [ ] Pricing (if available)
- [ ] Installation type (mortise, rim, etc.)
- [ ] Material and finish options

#### **Kiosk Specifications**:
- [ ] Screen size and type (capacitive touch, etc.)
- [ ] Dimensions and weight
- [ ] Peripherals included (printer, scanner, card dispenser)
- [ ] OS platform (Windows, Android)
- [ ] Network connectivity
- [ ] Power requirements
- [ ] Pricing
- [ ] Mounting options

### **Manual Data Entry**:
Update `/public/data/locks-trinity-taj.json` with actual specs:

```json
{
  "id": "TAJ-L-series",
  "name": "TAJ L-Series Hotel Lock",
  "specifications": {
    "dimensions": "Extract from PDF",
    "weight": "Extract from PDF",
    "battery": "Extract from PDF",
    "card_types": ["MIFARE Classic", "MIFARE Plus", "etc"],
    "wireless": ["BLE 5.0", "NFC"],
    "installation": "European mortise",
    "material": "Zinc alloy",
    "finish_options": ["Brushed silver", "Matte black"]
  }
}
```

---

## 🤖 AI-Assisted Extraction (Advanced)

If PDFs are complex or image-heavy, you can use AI vision:

### **Method 1: ChatGPT/Claude with Vision**
1. Take screenshots of PDF pages showing products
2. Upload to ChatGPT or Claude
3. Prompt: 
   ```
   "Extract all product specifications from this catalog page and return as JSON.
   Include: model name, dimensions, features, pricing, and any technical specs."
   ```
4. Copy JSON response directly into your data files

### **Method 2: Google Gemini**
1. Upload entire PDF
2. Ask: "List all lock models shown with their specifications"
3. Extract structured data from response

---

## 🎨 Image Enhancement Pipeline

Once you have extracted images:

### **1. Background Removal** (if needed):
```bash
# Online: https://remove.bg (drag & drop, instant results)
# Or use GIMP/Photoshop for manual masking
```

### **2. Upscaling to 4K** (if images are low-res):
```bash
# Install Upscayl (free, GPU-accelerated)
# Download: https://github.com/upscayl/upscayl/releases

# Upscale to 4K
# - Open Upscayl
# - Select image
# - Choose model: "Ultrasharp" or "Remacri"
# - Output size: 3840×2160 or proportional
# - Save to processed folder
```

### **3. Consistency Check**:
- ✅ All locks same angle/perspective
- ✅ All kiosks same lighting
- ✅ Transparent backgrounds (if possible)
- ✅ Consistent shadows
- ✅ Same resolution category (all 4K or all HD)

---

## 📋 Extraction Checklist

### **Before Starting**:
- [ ] PDFs placed in `references/pdf/`
- [ ] `references/images/` directory created
- [ ] Chosen extraction method (Python, online, manual)

### **During Extraction**:
- [ ] Extract all product images
- [ ] Save original extractions (don't overwrite)
- [ ] Organize by product type (locks, kiosks)
- [ ] Note any missing images

### **After Extraction**:
- [ ] Remove backgrounds (if needed)
- [ ] Upscale to 4K (if needed)
- [ ] Rename to convention (lock_[series]_[finish].png)
- [ ] Copy to website assets folder
- [ ] Update product JSON catalogs with real specs
- [ ] Test interactive system at `/kiosk-showcase`

---

## ✨ Pro Tips from Experience

1. **Extract First, Process Later**: Get all images out of PDFs first, then decide which to use
2. **Keep Originals**: Always keep original extracted files separate from processed versions
3. **Use AI for Text**: If PDF text is locked or image-based, use ChatGPT Vision to extract specs
4. **Batch Process**: Extract from all PDFs at once, then organize
5. **Check Quality**: Zoom to 100% to verify image quality before upscaling
6. **Consistent Naming**: Follow naming convention strictly for automatic integration
7. **Test Immediately**: Copy one image pair to website and test the interactive system

---

## 🚀 Quick Start (Recommended Path)

### **For Non-Technical Users**:
```
1. Go to: https://tools.pdf24.org/en/extract-images
2. Upload: Trinity-TAJ-Smart-Lock-2025.pdf
3. Download: ZIP with all images
4. Repeat for: Trinity-TAJ-Hotel-Lock-API.pdf
5. Extract ZIPs to: references/images/trinity-taj/
6. Review images and select best ones
7. Rename and copy to: public/vendoora-assets/images_4k/
8. Visit: http://localhost:3000/kiosk-showcase
9. See interactive system come alive! ✨
```

### **For Technical Users**:
```bash
# Install dependencies
pip install PyPDF2 pdf2image Pillow
brew install poppler  # macOS

# Extract everything
python scripts/pdf-analyzer.py references/pdf/Trinity-TAJ-Smart-Lock-2025.pdf
python scripts/pdf-analyzer.py references/pdf/Trinity-TAJ-Hotel-Lock-API.pdf

# Review extractions
open references/extracted/

# Process and copy best images
# ... (manual selection and processing)

# Copy to website
cp references/images/processed/*.png public/vendoora-assets/images_4k/locks/
cp references/images/processed/*.png public/vendoora-assets/images_4k/kiosks/
```

---

## 📞 Need Help?

If you encounter issues:

1. **Missing poppler**: Install with `brew install poppler` (macOS)
2. **Python errors**: Try online tools instead (no installation needed)
3. **Low quality images**: Use AI upscaling (Upscayl is free and excellent)
4. **Can't extract text**: Take screenshots and use ChatGPT Vision
5. **Complex layouts**: Manual screenshot + crop may be faster

---

## ✅ Expected Results

After extraction, you should have:
- **12-20 product images** total (locks + kiosks in both finishes)
- **Text JSON files** with all specifications
- **Page renders** for reference and documentation
- **Summary JSON** with extraction metadata

These images and specs will then power:
- Interactive kiosk showcase (hover/tap finish swap)
- Smart lock selection wizard
- Product comparison tables
- Technical specification sheets
- Sales and marketing materials

---

🎨 **Ready to extract? Just place your Trinity-TAJ PDFs in `references/pdf/` and run the tool!**

