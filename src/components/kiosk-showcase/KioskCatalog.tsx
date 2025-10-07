'use client';

import { InteractiveKioskCard } from './InteractiveKioskCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

export function KioskCatalog() {
  // Kiosk product data
  const kioskModels = [
    {
      model: 'desktop-19',
      title: 'Desktop 19" Self Check-In Kiosk',
      description: 'Compact desktop kiosk perfect for reception counters and limited spaces',
      whiteImagePath: '/vendoora-assets/images_4k/kiosks/kiosk_desktop19_white.png',
      blackImagePath: '/vendoora-assets/images_4k/kiosks/kiosk_desktop19_black.png',
      whiteAlt: 'Desktop 19-inch self-check-in kiosk in satin white finish with aluminum accents',
      blackAlt: 'Desktop 19-inch self-check-in kiosk in matte black finish with stainless steel accents',
      whiteAltZh: '19英寸桌面自助入住机，缎面白色外观配铝制点缀',
      blackAltZh: '19英寸桌面自助入住机，哑光黑色外观配不锈钢点缀',
      price: 1200,
      features: ['Passport Scanner', 'Thermal Printer', 'Card Reader', 'Touch Screen', 'Compact Design'],
      specs: {
        display: '19" Capacitive Touch',
        dimensions: '18" W × 14" D × 22" H',
        weight: '25 lbs',
        power: '110-240V AC',
      }
    },
    {
      model: 'freestanding-32',
      title: 'Freestanding 32" Lobby Kiosk',
      description: 'Premium freestanding kiosk for hotel lobbies and high-traffic areas',
      whiteImagePath: '/vendoora-assets/images_4k/kiosks/kiosk_freestanding32_white.png',
      blackImagePath: '/vendoora-assets/images_4k/kiosks/kiosk_freestanding32_black.png',
      whiteAlt: 'Freestanding 32-inch lobby kiosk in satin white finish with aluminum accents',
      blackAlt: 'Freestanding 32-inch lobby kiosk in matte black finish with stainless steel accents',
      whiteAltZh: '32英寸独立大厅自助机，缎面白色外观配铝制点缀',
      blackAltZh: '32英寸独立大厅自助机，哑光黑色外观配不锈钢点缀',
      price: 2500,
      features: ['Large Display', 'Key Dispenser', 'Receipt Printer', 'Passport Scanner', 'ADA Compliant'],
      specs: {
        display: '32" Capacitive Touch',
        dimensions: '24" W × 20" D × 65" H',
        weight: '85 lbs',
        power: '110-240V AC',
      }
    },
    {
      model: 'wall-21',
      title: 'Wall-Mounted 21" Kiosk',
      description: 'Space-saving wall-mounted kiosk ideal for boutique properties',
      whiteImagePath: '/vendoora-assets/images_4k/kiosks/kiosk_wall21_white.png',
      blackImagePath: '/vendoora-assets/images_4k/kiosks/kiosk_wall21_black.png',
      whiteAlt: 'Wall-mounted 21-inch kiosk in satin white finish with aluminum accents',
      blackAlt: 'Wall-mounted 21-inch kiosk in matte black finish with stainless steel accents',
      whiteAltZh: '21英寸壁挂式自助机，缎面白色外观配铝制点缀',
      blackAltZh: '21英寸壁挂式自助机，哑光黑色外观配不锈钢点缀',
      price: 1800,
      features: ['Wall Mount', 'Card Reader', 'Touch Screen', 'Space Saving', 'Modern Design'],
      specs: {
        display: '21" Capacitive Touch',
        dimensions: '20" W × 4" D × 28" H',
        weight: '35 lbs',
        power: '110-240V AC',
      }
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Interactive Kiosk Showcase
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Experience our premium kiosks in dual finishes - hover or tap to switch between satin white and matte black
        </p>
        <div className="flex items-center justify-center gap-3 mb-8">
          <Badge variant="outline" className="text-sm">
            <Sparkles className="h-3 w-3 mr-1" />
            4K Renders
          </Badge>
          <Badge variant="outline" className="text-sm">
            Dual Finish Options
          </Badge>
          <Badge variant="outline" className="text-sm">
            Interactive Experience
          </Badge>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Photorealistic 4K Renders</h3>
                <p className="text-sm text-gray-600">
                  High-resolution transparent PNGs with soft shadows for depth and realism
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Dual Finish System</h3>
                <p className="text-sm text-gray-600">
                  Satin white with aluminum or matte black with stainless steel - interactive switching
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Smooth Animations</h3>
                <p className="text-sm text-gray-600">
                  0.4s cross-fade transition for professional, premium feel on all devices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kiosk Models Grid */}
      <div className="kiosk-catalog-grid">
        {kioskModels.map((kiosk) => (
          <InteractiveKioskCard
            key={kiosk.model}
            model={kiosk.model}
            title={kiosk.title}
            description={kiosk.description}
            whiteImagePath={kiosk.whiteImagePath}
            blackImagePath={kiosk.blackImagePath}
            whiteAlt={kiosk.whiteAlt}
            blackAlt={kiosk.blackAlt}
            price={kiosk.price}
            features={kiosk.features}
          />
        ))}
      </div>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Specifications</CardTitle>
          <CardDescription>Complete specifications for each kiosk model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {kioskModels.map((kiosk) => (
              <div key={kiosk.model} className="border-b pb-6 last:border-b-0">
                <h3 className="font-semibold mb-3">{kiosk.title}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(kiosk.specs).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-xs text-gray-500 uppercase">{key}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {kiosk.features.map((feature, index) => (
                    <Badge key={index} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Notice */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">Implementation Ready</h3>
              <p className="text-sm text-gray-600 mb-3">
                The interactive kiosk system is fully implemented with CSS animations and JavaScript controls. 
                When you provide the 4K renders, simply place them in the following structure:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                <p>/vendoora-assets/images_4k/kiosks/</p>
                <p className="ml-4">├── kiosk_desktop19_white.png</p>
                <p className="ml-4">├── kiosk_desktop19_black.png</p>
                <p className="ml-4">├── kiosk_freestanding32_white.png</p>
                <p className="ml-4">├── kiosk_freestanding32_black.png</p>
                <p className="ml-4">├── kiosk_wall21_white.png</p>
                <p className="ml-4">└── kiosk_wall21_black.png</p>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                The system automatically supports:
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• <strong>Desktop hover:</strong> Smooth 0.4s cross-fade to black finish</li>
                <li>• <strong>Mobile tap:</strong> Toggle between white and black finishes</li>
                <li>• <strong>Keyboard navigation:</strong> Enter/Space to toggle (accessibility)</li>
                <li>• <strong>Lazy loading:</strong> Images load when scrolled into view</li>
                <li>• <strong>Preloading:</strong> Both finishes preloaded for instant transitions</li>
                <li>• <strong>Print optimization:</strong> White finish for printing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder Images Notice */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">Placeholder Images Currently Shown</h3>
              <p className="text-sm text-gray-700">
                The image paths above are configured for your 4K renders. Currently showing placeholder paths.
                Once you upload the actual 4K transparent PNG renders to <code className="bg-yellow-100 px-1 py-0.5 rounded">/public/vendoora-assets/images_4k/kiosks/</code>,
                the interactive system will automatically display them with the beautiful hover/tap finish swap effect.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

