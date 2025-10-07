# 📄 PDF Analysis & Image Extraction Tools

This directory contains tools to extract images and data from Trinity-TAJ PDF catalogs.

---

## 🔧 Available Tools

### **1. Python PDF Analyzer** (Recommended)
**File**: `pdf-analyzer.py`  
**Purpose**: Extract embedded images, convert pages to images, extract text

**Requirements**:
```bash
# Install Python packages
pip install PyPDF2 pdf2image Pillow

# Install poppler (required for pdf2image)
# macOS:
brew install poppler

# Linux:
sudo apt-get install poppler-utils

# Windows:
# Download from: https://github.com/oschwartz10612/poppler-windows
```

**Usage**:
```bash
# Analyze a single PDF
python scripts/pdf-analyzer.py references/pdf/Trinity-TAJ-Smart-Lock-2025.pdf

# Specify custom output directory
python scripts/pdf-analyzer.py references/pdf/Trinity-TAJ-Hotel-Lock-API.pdf references/extracted

# Make it executable (Unix/macOS)
chmod +x scripts/pdf-analyzer.py
./scripts/pdf-analyzer.py references/pdf/yourfile.pdf
```

**Output**:
```
references/extracted/
└── Trinity-TAJ-Smart-Lock-2025/
    ├── images/              # Embedded images from PDF
    │   ├── page1_img0.png
    │   ├── page2_img0.png
    │   └── ...
    ├── pages/               # Full page renders (300 DPI)
    │   ├── page1.png
    │   ├── page2.png
    │   └── ...
    ├── text/                # Extracted text content
    │   └── Trinity-TAJ-Smart-Lock-2025_text.json
    └── summary.json         # Analysis summary
```

---

### **2. Alternative: Node.js PDF Extractor**
If you prefer Node.js, you can use these packages (install separately):

```bash
# Create a separate Node project for PDF tools
mkdir pdf-tools && cd pdf-tools
npm init -y
npm install pdf-parse pdf-lib sharp
```

**Create `extract.js`**:
```javascript
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

async function extractPdfText(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdfParse(dataBuffer);
  
  console.log('Pages:', data.numpages);
  console.log('Text length:', data.text.length);
  
  // Save text to file
  const outputPath = pdfPath.replace('.pdf', '_text.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    filename: path.basename(pdfPath),
    pages: data.numpages,
    text: data.text,
    metadata: data.metadata
  }, null, 2));
  
  console.log('Text saved to:', outputPath);
}

// Usage: node extract.js path/to/file.pdf
extractPdfText(process.argv[2]);
```

---

### **3. Alternative: Online Tools** (No Installation Required)

#### **For Image Extraction**:
1. **PDF24 Tools**: https://tools.pdf24.org/en/extract-images
   - Upload PDF
   - Download extracted images as ZIP
   - Free, no registration

2. **iLovePDF**: https://www.ilovepdf.com/pdf_to_jpg
   - Convert pages to high-res JPG/PNG
   - Download individual pages
   - Free tier available

3. **SmallPDF**: https://smallpdf.com/pdf-to-jpg
   - High-quality page conversion
   - Free for 2 documents/day

#### **For Text Extraction**:
1. **Adobe Acrobat Reader** (Free):
   - File → Export To → Text
   - Preserves layout and structure

2. **Preview** (macOS built-in):
   - Open PDF
   - Tools → Text Selection
   - Copy/paste specific content

3. **PDF.js Express**: https://pdfjs.express/
   - Online PDF viewer
   - Extract text and images

---

## 🎯 Recommended Workflow for Trinity-TAJ PDFs

### **Step 1: Quick Visual Review**
1. Open PDFs in Preview/Adobe Reader
2. Identify key product images (locks, kiosks)
3. Screenshot individual product renders if needed

### **Step 2: Extract High-Quality Images**
**Option A - Python Script**:
```bash
# Extract from both PDFs
python scripts/pdf-analyzer.py references/pdf/Trinity-TAJ-Smart-Lock-2025.pdf
python scripts/pdf-analyzer.py references/pdf/Trinity-TAJ-Hotel-Lock-API.pdf

# Review extracted images
open references/extracted/Trinity-TAJ-Smart-Lock-2025/images/
open references/extracted/Trinity-TAJ-Hotel-Lock-API/images/
```

**Option B - Online Tool**:
1. Go to https://tools.pdf24.org/en/extract-images
2. Upload Trinity-TAJ PDFs
3. Download extracted images
4. Place in `references/images/trinity-taj/`

### **Step 3: Extract Product Data**
```bash
# Extract text content
python scripts/pdf-analyzer.py references/pdf/Trinity-TAJ-Smart-Lock-2025.pdf

# Review text JSON
cat references/extracted/Trinity-TAJ-Smart-Lock-2025/text/*_text.json
```

### **Step 4: Organize for Website**
```bash
# Create organized structure
mkdir -p public/vendoora-assets/images_4k/locks/extracted
mkdir -p public/vendoora-assets/images_4k/kiosks/extracted

# Copy best quality images
cp references/extracted/*/images/lock_*.png public/vendoora-assets/images_4k/locks/extracted/
cp references/extracted/*/images/kiosk_*.png public/vendoora-assets/images_4k/kiosks/extracted/
```

### **Step 5: Update Product Catalogs**
Use extracted text to update:
- `/public/data/locks-trinity-taj.json`
- `/public/data/kiosks-trinity-taj.json`

With actual:
- Product specifications
- Feature lists
- Pricing (if available)
- Model numbers
- Technical details

---

## 🖼️ Image Processing Tips

### **For Product Renders**:
1. **Look for**: Clean product shots without background text
2. **Ideal images**: Side views, front views, close-ups of features
3. **Resolution**: Aim for 1920×1080 minimum (for 4K upscaling)
4. **Background**: White or transparent backgrounds work best

### **If Images Need Cleanup**:
Use these free tools:
- **Remove.bg**: https://remove.bg (remove backgrounds)
- **Photopea**: https://photopea.com (free Photoshop alternative)
- **GIMP**: https://gimp.org (free image editor)

### **For Upscaling to 4K**:
- **Upscayl**: https://github.com/upscayl/upscayl (free AI upscaler)
- **Real-ESRGAN**: https://github.com/xinntao/Real-ESRGAN (command-line AI upscaler)
- **Topaz Gigapixel AI**: Commercial but excellent results

---

## 📊 What to Extract from Trinity-TAJ PDFs

### **Trinity-TAJ Smart Lock 2025.pdf** (Airbnb/VRBO Focus):
Extract:
- [ ] TAJ S-Series product images (silver/black finishes)
- [ ] TAJ KL-Series images (if included)
- [ ] Technical specifications
- [ ] Feature comparison tables
- [ ] Mobile app screenshots
- [ ] Installation diagrams
- [ ] Dimensions and weights
- [ ] Pricing information

### **Trinity-TAJ Hotel Lock & API.pdf** (Hotel Focus):
Extract:
- [ ] TAJ L-Series product images
- [ ] TAJ KL-Series images
- [ ] Kiosk integration diagrams
- [ ] API endpoint documentation
- [ ] PMS integration flowcharts
- [ ] Card encoding specifications
- [ ] Technical specifications
- [ ] Installation guides

---

## 🤖 AI-Powered Alternatives

If PDFs are image-heavy or text extraction fails, you can use:

### **GPT-4 Vision / Claude with Vision**:
1. Take screenshots of PDF pages
2. Upload to ChatGPT or Claude
3. Ask: "Extract all product specifications from this catalog page"
4. Get structured JSON output

### **Google Cloud Vision API**:
```bash
# Extract text from PDF images
gcloud ml vision detect-text image.png
```

### **Tesseract OCR** (Open Source):
```bash
# Install
brew install tesseract

# Convert PDF page to text
tesseract page1.png output
```

---

## 📝 Quick Reference Commands

```bash
# Python PDF Analyzer
python scripts/pdf-analyzer.py references/pdf/yourfile.pdf

# Check what PDFs are in references
ls -lh references/pdf/

# Check extracted images
ls -lh references/extracted/*/images/

# View extracted text
cat references/extracted/*/text/*.json | jq .

# Copy images to website
cp references/extracted/*/images/*.png public/vendoora-assets/images_4k/locks/
```

---

## ✨ Pro Tips

1. **High-Quality Extraction**: Use 300 DPI minimum for print-quality images
2. **Batch Processing**: Process all PDFs at once, then sort images manually
3. **AI Upscaling**: If extracted images are low-res, use Upscayl or Real-ESRGAN
4. **Background Removal**: Use Remove.bg for clean product shots
5. **Organize First**: Create clear folder structure before extraction
6. **Keep Originals**: Always keep original PDFs and extracted files separate

---

## 🚀 Ready to Go!

Once you have the Trinity-TAJ PDFs in `references/pdf/`, run:

```bash
python scripts/pdf-analyzer.py references/pdf/Trinity-TAJ-Smart-Lock-2025.pdf
python scripts/pdf-analyzer.py references/pdf/Trinity-TAJ-Hotel-Lock-API.pdf
```

Then review the extracted images and update the product catalogs with actual data! 🎨

