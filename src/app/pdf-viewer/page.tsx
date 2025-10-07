'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, ExternalLink, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';

export default function PDFViewerPage() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const pdfFiles = [
    {
      name: 'Trinity-TAJ Smart Lock 2025.pdf',
      path: '/references/pdf/Trinity-TAJ-Smart-Lock-2025.pdf',
      description: 'Catalog for short-stay (Airbnb/VRBO) and timeshare properties',
      audience: 'Airbnb, VRBO, Timeshare',
      products: 'TAJ S-Series, KL-Series locks',
    },
    {
      name: 'Trinity-TAJ Hotel Lock & API.pdf',
      path: '/references/pdf/Trinity-TAJ-Hotel-Lock-API.pdf',
      description: 'Catalog + API for hotels/resorts/casinos and kiosk integration',
      audience: 'Hotels, Resorts, Casinos, Motels',
      products: 'TAJ L-Series, KL-Series locks + Kiosks',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Trinity-TAJ PDF Catalog Viewer</h1>
            <p className="text-xl text-gray-600">
              View and extract data from Trinity-TAJ smart lock catalogs
            </p>
          </div>

          {/* PDF Catalog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pdfFiles.map((pdf) => (
              <Card key={pdf.path} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {pdf.name}
                  </CardTitle>
                  <CardDescription>{pdf.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Target Audience:</p>
                      <p className="text-sm">{pdf.audience}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Products:</p>
                      <p className="text-sm">{pdf.products}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(pdf.path, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedPdf(pdf.path)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View in Browser
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* PDF Viewer (if selected) */}
          {selectedPdf && (
            <Card>
              <CardHeader>
                <CardTitle>PDF Viewer</CardTitle>
                <CardDescription>
                  Viewing: {pdfFiles.find(p => p.path === selectedPdf)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-4">
                  <iframe
                    src={selectedPdf}
                    className="w-full h-[800px] border-0 rounded"
                    title="PDF Viewer"
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSelectedPdf(null)}
                >
                  Close Viewer
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Extraction Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Image Extraction Tools
              </CardTitle>
              <CardDescription>Recommended tools to extract images from PDFs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Online Tools */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">🌐 Online Tools</h3>
                    <p className="text-sm text-gray-600 mb-3">No installation required</p>
                    <div className="space-y-2">
                      <a 
                        href="https://tools.pdf24.org/en/extract-images" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        → PDF24 Extract Images
                      </a>
                      <a 
                        href="https://www.ilovepdf.com/pdf_to_jpg" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        → iLovePDF to JPG
                      </a>
                      <a 
                        href="https://smallpdf.com/pdf-to-jpg" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        → SmallPDF Converter
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Python Script */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">🐍 Python Script</h3>
                    <p className="text-sm text-gray-600 mb-3">Automated extraction</p>
                    <div className="space-y-2 text-sm">
                      <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                        pip install PyPDF2 pdf2image Pillow
                      </p>
                      <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                        brew install poppler
                      </p>
                      <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                        python scripts/pdf-analyzer.py
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Manual */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">✂️ Manual Extraction</h3>
                    <p className="text-sm text-gray-600 mb-3">macOS Preview built-in</p>
                    <div className="space-y-1 text-sm">
                      <p>1. Open PDF in Preview</p>
                      <p>2. Tools → Rectangular Selection</p>
                      <p>3. Draw box around image</p>
                      <p>4. File → Export Selection</p>
                      <p>5. Save as PNG</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">How to Use</h3>
                  <ol className="text-sm space-y-2">
                    <li><strong>1. Place PDFs</strong>: Put Trinity-TAJ PDFs in <code className="bg-blue-100 px-1 py-0.5 rounded">references/pdf/</code></li>
                    <li><strong>2. Extract Images</strong>: Use any tool above to extract product images</li>
                    <li><strong>3. Process Images</strong>: Remove backgrounds, upscale if needed, rename consistently</li>
                    <li><strong>4. Upload to Website</strong>: Copy to <code className="bg-blue-100 px-1 py-0.5 rounded">public/vendoora-assets/images_4k/</code></li>
                    <li><strong>5. Update Data</strong>: Add specs to <code className="bg-blue-100 px-1 py-0.5 rounded">public/data/locks-trinity-taj.json</code></li>
                    <li><strong>6. Test</strong>: Visit <code className="bg-blue-100 px-1 py-0.5 rounded">/kiosk-showcase</code> to see interactive system!</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Interactive kiosk render system is ready for your images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">CSS animation system ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">JavaScript interactivity ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">React components ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Bilingual alt text ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm">Awaiting 4K renders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm">Awaiting lock images</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

