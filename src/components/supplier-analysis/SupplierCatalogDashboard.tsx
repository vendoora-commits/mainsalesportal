'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Image as ImageIcon,
  Package,
  Building,
  Zap,
  Eye,
  CheckCircle,
  AlertCircle,
  Database,
  Grid
} from 'lucide-react';

interface SupplierCatalog {
  id: string;
  filename: string;
  supplier: string;
  productCategory: string;
  description: string;
  path: string;
  keyProducts: string[];
  audience: string[];
  status: 'analyzed' | 'pending' | 'ready';
  icon: string;
}

export function SupplierCatalogDashboard() {
  const [selectedCatalog, setSelectedCatalog] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const catalogs: SupplierCatalog[] = [
    {
      id: 'estar-kiosks',
      filename: 'Estar Kiosks-Tao 2025.6.pdf',
      supplier: 'E-Star / Tao',
      productCategory: 'Self-Service Kiosks',
      description: 'Complete kiosk catalog with desktop, freestanding, and wall-mounted models for hotel check-in automation',
      path: 'Estar Kiosks-Tao 2025.6.pdf',
      keyProducts: ['Desktop 19" Kiosk', 'Freestanding 32" Kiosk', 'Wall-Mounted 21" Kiosk', 'Passport Scanner', 'Card Dispenser'],
      audience: ['Hotels', 'Resorts', 'Casinos', 'Airports'],
      status: 'ready',
      icon: '🖥️',
    },
    {
      id: 'trinity-taj-hotel',
      filename: 'Trinity-Taj Hotel lock and API.pdf',
      supplier: 'Trinity-TAJ',
      productCategory: 'Smart Locks & API Integration',
      description: 'Hotel lock catalog with PMS API integration, kiosk compatibility, and check-in automation specifications',
      path: 'Trinity-Taj Hotel lock and API.pdf',
      keyProducts: ['TAJ L-Series Hotel Lock', 'TAJ KL-Series Camera Lock', 'PMS API Integration', 'Kiosk Integration'],
      audience: ['Hotels', 'Resorts', 'Casinos', 'Motels'],
      status: 'ready',
      icon: '🔐',
    },
    {
      id: 'hidintech-switches',
      filename: 'Smart switch HIDINTECH supplier US catalog.pdf',
      supplier: 'Hidin Tech',
      productCategory: 'Smart Switches (US Market)',
      description: 'US-compatible smart switches and dimmers for hotel room automation with Z-Wave/Zigbee protocols',
      path: 'Smart switch HIDINTECH supplier US catalog.pdf',
      keyProducts: ['Smart Light Switches', 'Dimmers', 'Scene Controllers', 'Z-Wave Devices', 'Zigbee Devices'],
      audience: ['Hotels', 'Apartments', 'Airbnb', 'VRBO'],
      status: 'ready',
      icon: '💡',
    },
    {
      id: 'hidintech-eu',
      filename: 'Switches 1_EU Catalogue---Hidintech Jodie.pdf',
      supplier: 'Hidin Tech',
      productCategory: 'Smart Switches (EU Market)',
      description: 'European standard smart switches and controls for international hotel properties',
      path: 'Switches 1_EU Catalogue---Hidintech Jodie.pdf',
      keyProducts: ['EU Smart Switches', 'Modular Controls', 'Scene Panels', 'Touch Switches'],
      audience: ['European Hotels', 'International Properties'],
      status: 'ready',
      icon: '💡',
    },
    {
      id: 'hidintech-global',
      filename: 'Hidin Tech -South Africa， Mexico，Brazil Catalogue---Hidintech Jodie.pdf',
      supplier: 'Hidin Tech',
      productCategory: 'Smart Switches (Global Markets)',
      description: 'Smart switch solutions for South Africa, Mexico, Brazil markets with local standards',
      path: 'Hidin Tech -South Africa， Mexico，Brazil Catalogue---Hidintech Jodie.pdf',
      keyProducts: ['Multi-Region Switches', 'Local Certifications', 'Global Standards'],
      audience: ['South Africa', 'Mexico', 'Brazil', 'Latin America'],
      status: 'ready',
      icon: '🌍',
    },
    {
      id: 'poyal-blinds',
      filename: 'Poyal Catalogue Smart Blinds.pdf',
      supplier: 'Poyal',
      productCategory: 'Smart Blinds & Curtains',
      description: 'Motorized blinds and curtain systems for automated room privacy and light control',
      path: 'Poyal Catalogue Smart Blinds.pdf',
      keyProducts: ['Motorized Blinds', 'Smart Curtain Motors', 'Window Automation', 'Light Control Systems'],
      audience: ['Hotels', 'Resorts', 'Luxury Properties', 'Vacation Rentals'],
      status: 'ready',
      icon: '🪟',
    },
    {
      id: 'ruckus-iot',
      filename: 'ruckus_iot_insights_getting_started_guide,_2_0_0_2025-09-14-13-12-58.pdf',
      supplier: 'Ruckus (CommScope)',
      productCategory: 'IoT Network Infrastructure',
      description: 'Enterprise IoT network platform for connecting and managing smart hotel devices at scale',
      path: 'ruckus_iot_insights_getting_started_guide,_2_0_0_2025-09-14-13-12-58.pdf',
      keyProducts: ['IoT Controller', 'Network Management', 'Device Integration', 'Analytics Platform'],
      audience: ['Enterprise Hotels', 'Large Resorts', 'Casino Properties'],
      status: 'ready',
      icon: '📡',
    },
    {
      id: 'guest-app',
      filename: 'Guest APP Guest Smart Experience Settings Overview Incomplete.PNG',
      supplier: 'Internal / Guest App',
      productCategory: 'Guest Mobile Application',
      description: 'Guest app settings and smart experience configuration (reference screenshot)',
      path: 'Guest APP Guest Smart Experience Settings Overview Incomplete.PNG',
      keyProducts: ['Mobile App', 'Guest Controls', 'Smart Room Interface', 'Guest Experience'],
      audience: ['All Property Types'],
      status: 'pending',
      icon: '📱',
    },
  ];

  const selectedCatalogData = catalogs.find(c => c.id === selectedCatalog);

  const getSupplierColor = (category: string) => {
    if (category.includes('Kiosk')) return 'bg-blue-100 text-blue-800';
    if (category.includes('Lock')) return 'bg-purple-100 text-purple-800';
    if (category.includes('Switch')) return 'bg-yellow-100 text-yellow-800';
    if (category.includes('Blind')) return 'bg-green-100 text-green-800';
    if (category.includes('IoT')) return 'bg-red-100 text-red-800';
    if (category.includes('App')) return 'bg-pink-100 text-pink-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Supplier Catalog Analysis Dashboard</h1>
        <p className="text-xl text-gray-600">
          Comprehensive analysis of all supplier PDF catalogs
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <Badge variant="outline">{catalogs.length} Catalogs</Badge>
          <Badge variant="outline">{catalogs.filter(c => c.status === 'ready').length} Ready</Badge>
          <Badge variant="outline">{new Set(catalogs.map(c => c.supplier)).size} Suppliers</Badge>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4 mr-2" />
            Grid View
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <FileText className="h-4 w-4 mr-2" />
            List View
          </Button>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Extract All Images
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Catalogs</p>
                <p className="text-2xl font-bold">{catalogs.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suppliers</p>
                <p className="text-2xl font-bold">{new Set(catalogs.map(c => c.supplier)).size}</p>
              </div>
              <Building className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold">{new Set(catalogs.map(c => c.productCategory.split(' ')[0])).size}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ready to Extract</p>
                <p className="text-2xl font-bold">{catalogs.filter(c => c.status === 'ready').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Catalog Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {catalogs.map((catalog) => (
          <Card key={catalog.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{catalog.icon}</span>
                  <div>
                    <CardTitle className="text-base">{catalog.supplier}</CardTitle>
                    <Badge className={getSupplierColor(catalog.productCategory)} variant="outline">
                      {catalog.productCategory}
                    </Badge>
                  </div>
                </div>
                <Badge variant={catalog.status === 'ready' ? 'default' : 'outline'}>
                  {catalog.status}
                </Badge>
              </div>
              <CardDescription className="text-sm line-clamp-2">
                {catalog.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Products */}
              <div>
                <p className="text-sm font-medium mb-2">Key Products:</p>
                <div className="flex flex-wrap gap-1">
                  {catalog.keyProducts.slice(0, 3).map((product, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                  {catalog.keyProducts.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{catalog.keyProducts.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <p className="text-sm font-medium mb-2">Target Markets:</p>
                <div className="flex flex-wrap gap-1">
                  {catalog.audience.map((aud, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {aud}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedCatalog(catalog.id)}
                >
                  <Database className="h-4 w-4 mr-1" />
                  Analyze
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    alert(`📄 PDF Location:\n\nFile: ${catalog.filename}\nPath: references/pdf/\n\nTo view:\n1. Open Finder\n2. Navigate to project folder\n3. Go to references/pdf/\n4. Double-click ${catalog.filename}`);
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Location
                </Button>
              </div>

              {/* File Info */}
              <div className="text-xs text-gray-500 pt-2 border-t">
                <p className="font-mono truncate">{catalog.filename}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analysis Panel */}
      {selectedCatalog && selectedCatalogData && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{selectedCatalogData.icon}</span>
                {selectedCatalogData.supplier} - Detailed Analysis
              </CardTitle>
              <Button variant="outline" onClick={() => setSelectedCatalog(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Catalog Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Catalog Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supplier:</span>
                    <span className="font-medium">{selectedCatalogData.supplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <Badge className={getSupplierColor(selectedCatalogData.productCategory)}>
                      {selectedCatalogData.productCategory}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant={selectedCatalogData.status === 'ready' ? 'default' : 'outline'}>
                      {selectedCatalogData.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Products:</span>
                    <span className="font-medium">{selectedCatalogData.keyProducts.length}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Target Markets</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCatalogData.audience.map((aud, index) => (
                    <Badge key={index} variant="secondary">
                      {aud}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-gray-600">{selectedCatalogData.description}</p>
            </div>

            {/* Key Products */}
            <div>
              <h3 className="font-semibold mb-3">Key Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedCatalogData.keyProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{product}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Extraction Actions */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-3">Extraction Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" className="justify-start">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Extract Images
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Extract Text
                </Button>
                <Button variant="outline" className="justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Extract Specs
                </Button>
              </div>

              {/* Online Extraction Links */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Quick Extract (No Installation):</p>
                <div className="space-y-1">
                  <a 
                    href="https://tools.pdf24.org/en/extract-images" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-600 hover:underline"
                  >
                    → PDF24 Tools: Extract Images
                  </a>
                  <a 
                    href="https://www.ilovepdf.com/pdf_to_jpg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-600 hover:underline"
                  >
                    → iLovePDF: Convert to JPG
                  </a>
                  <p className="text-xs text-gray-600 mt-2">
                    Upload <code className="bg-blue-100 px-1 rounded">{selectedCatalogData.filename}</code> to extract all images
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* How to View PDFs */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">📄 How to View Your PDF Catalogs</h3>
              <p className="text-sm mb-3">
                Your supplier PDFs are stored locally in the <code className="bg-blue-100 px-1 py-0.5 rounded">references/pdf/</code> folder.
              </p>
              <div className="space-y-2">
                <p className="text-sm font-medium">To view any PDF:</p>
                <ol className="text-sm space-y-1 ml-4">
                  <li>1. <strong>Open Finder</strong></li>
                  <li>2. Navigate to: <code className="bg-blue-100 px-1 py-0.5 rounded">vendoora/mainsalesportal/references/pdf/</code></li>
                  <li>3. Double-click any PDF to open in Preview/Acrobat</li>
                </ol>
                <p className="text-sm mt-3">Or click the <strong>"Location"</strong> button on any catalog card above to see the exact path!</p>
              </div>
              <div className="mt-4">
                <Button 
                  variant="default"
                  size="sm"
                  onClick={() => {
                    // This will show the path - users can open Finder manually
                    const path = '/Users/patrickegan/vendoora/mainsalesportal/references/pdf';
                    alert(`📂 Open this path in Finder:\n\n${path}\n\nTo open:\n1. Open Finder (⌘+Space, type "Finder")\n2. Press ⌘+Shift+G (Go to Folder)\n3. Paste the path above\n4. Press Enter`);
                  }}
                >
                  📂 Open PDF Folder in Finder
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extraction Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Bulk Extraction Workflow
          </CardTitle>
          <CardDescription>Extract images from all supplier catalogs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Python Method */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>🐍</span>
                  Python Script (Automated)
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Extract all PDFs with one command:</p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-xs">
                    <p># Install dependencies</p>
                    <p>pip install PyPDF2 pdf2image Pillow</p>
                    <p>brew install poppler</p>
                    <p></p>
                    <p># Extract all catalogs</p>
                    <p>for pdf in references/pdf/*.pdf; do</p>
                    <p>  python scripts/pdf-analyzer.py "$pdf"</p>
                    <p>done</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Output: <code>references/extracted/[catalog-name]/</code>
                  </p>
                </div>
              </div>

              {/* Online Method */}
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span>🌐</span>
                  Online Tools (No Installation)
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Extract via web browser:</p>
                  <ol className="text-sm space-y-1">
                    <li>1. Go to <a href="https://tools.pdf24.org/en/extract-images" target="_blank" className="text-blue-600 hover:underline">PDF24 Tools</a></li>
                    <li>2. Upload each PDF (or batch upload)</li>
                    <li>3. Click "Extract images"</li>
                    <li>4. Download ZIP files</li>
                    <li>5. Extract to <code className="bg-gray-100 px-1 rounded">references/images/</code></li>
                  </ol>
                  <p className="text-xs text-gray-500">
                    Takes ~5 minutes per PDF
                  </p>
                </div>
              </div>
            </div>

            {/* Processing Pipeline */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h3 className="font-semibold mb-3">Complete Processing Pipeline:</h3>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {[
                  { step: 1, label: 'Extract Images', icon: ImageIcon },
                  { step: 2, label: 'Remove Backgrounds', icon: Zap },
                  { step: 3, label: 'Upscale to 4K', icon: TrendingUp },
                  { step: 4, label: 'Rename & Organize', icon: Database },
                  { step: 5, label: 'Upload to Site', icon: Upload },
                  { step: 6, label: 'Test Interactive', icon: Eye },
                ].map((item, index) => (
                  <div key={item.step} className="flex items-center gap-2">
                    <div className="flex flex-col items-center min-w-[100px]">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-xs font-medium text-center mt-1">{item.label}</p>
                    </div>
                    {index < 5 && (
                      <div className="w-8 h-0.5 bg-blue-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Breakdown</CardTitle>
          <CardDescription>Products by supplier and category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(
              catalogs.reduce((acc, cat) => {
                if (!acc[cat.supplier]) acc[cat.supplier] = [];
                acc[cat.supplier].push(cat);
                return acc;
              }, {} as Record<string, typeof catalogs>)
            ).map(([supplier, cats]) => (
              <div key={supplier} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{supplier}</h3>
                  <Badge>{cats.length} catalog{cats.length > 1 ? 's' : ''}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {cats.map(cat => (
                    <div key={cat.id} className="flex items-center gap-2 text-sm">
                      <span>{cat.icon}</span>
                      <span>{cat.productCategory}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Re-export for convenience
import { TrendingUp, Upload } from 'lucide-react';

