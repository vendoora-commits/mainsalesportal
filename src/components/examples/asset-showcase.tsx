'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AssetShowcase() {
  const icons = [
    { name: 'Kiosk', src: '/vendoora-assets/icons/kiosk.svg', alt: 'Kiosk' },
    { name: 'Lock', src: '/vendoora-assets/icons/lock.svg', alt: 'Smart Lock' },
    { name: 'Keycard', src: '/vendoora-assets/icons/keycard.svg', alt: 'Keycard' },
    { name: 'Fingerprint', src: '/vendoora-assets/icons/fingerprint.svg', alt: 'Fingerprint' },
    { name: 'Face ID', src: '/vendoora-assets/icons/face-id.svg', alt: 'Face ID' },
    { name: 'Bluetooth', src: '/vendoora-assets/icons/bluetooth.svg', alt: 'Bluetooth' },
    { name: 'NFC', src: '/vendoora-assets/icons/nfc.svg', alt: 'NFC' },
    { name: 'Battery', src: '/vendoora-assets/icons/battery.svg', alt: 'Battery' },
    { name: 'Plug', src: '/vendoora-assets/icons/plug.svg', alt: 'Wired Power' },
    { name: 'Light Switch', src: '/vendoora-assets/icons/light-switch.svg', alt: 'Light Switch' },
    { name: 'Thermostat', src: '/vendoora-assets/icons/thermostat.svg', alt: 'Thermostat' },
    { name: 'Motion Sensor', src: '/vendoora-assets/icons/motion-sensor.svg', alt: 'Motion Sensor' },
    { name: 'Blinds', src: '/vendoora-assets/icons/blinds.svg', alt: 'Motorized Blinds' },
    { name: 'Printer', src: '/vendoora-assets/icons/printer.svg', alt: 'Printer' },
    { name: 'QR Code', src: '/vendoora-assets/icons/qr.svg', alt: 'QR Code' },
    { name: 'ID Scan', src: '/vendoora-assets/icons/id-scan.svg', alt: 'ID Scanner' },
  ];

  const logos = [
    { name: 'Vendoora Mark', src: '/vendoora-assets/logos/vendoora-mark.svg', alt: 'Vendoora Mark' },
    { name: 'Logo Light', src: '/vendoora-assets/logos/vendoora-logo-light.svg', alt: 'Vendoora Logo Light' },
    { name: 'Logo Dark', src: '/vendoora-assets/logos/vendoora-logo-dark.svg', alt: 'Vendoora Logo Dark' },
    { name: 'Smart Hotel Lockup', src: '/vendoora-assets/logos/vendoora-smart-hotel-lockup.svg', alt: 'Vendoora Smart Hotel Experience' },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Vendoora Asset Showcase</h1>
        <p className="text-gray-600 mt-2">
          Professional branding and icon system for the Smart Hotel Experience Platform
        </p>
      </div>

      {/* Logos Section */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Logos</CardTitle>
          <CardDescription>Complete logo system with light/dark variants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {logos.map((logo) => (
              <div key={logo.name} className="text-center space-y-2">
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center h-24">
                  <img 
                    src={logo.src} 
                    alt={logo.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="text-sm font-medium">{logo.name}</div>
                <div className="text-xs text-gray-500">{logo.alt}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Icons Section */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Hotel Icons</CardTitle>
          <CardDescription>24×24 SVG line icons with currentColor support</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {icons.map((icon) => (
              <div key={icon.name} className="text-center space-y-2">
                <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center h-16">
                  <img 
                    src={icon.src} 
                    alt={icon.alt}
                    className="w-6 h-6 text-gray-700 dark:text-gray-300"
                  />
                </div>
                <div className="text-xs font-medium">{icon.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Button Styles Section */}
      <Card>
        <CardHeader>
          <CardTitle>Button Styles</CardTitle>
          <CardDescription>Enterprise-grade CSS buttons with icon support</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button className="button">
                <img className="button__icon" src="/vendoora-assets/icons/arrow-next.svg" alt="" aria-hidden="true" />
                Primary Button
              </Button>
              <Button variant="outline" className="button button--secondary">
                <img className="button__icon" src="/vendoora-assets/icons/save.svg" alt="" aria-hidden="true" />
                Secondary Button
              </Button>
              <Button variant="ghost" className="button button--ghost">
                <img className="button__icon" src="/vendoora-assets/icons/email.svg" alt="" aria-hidden="true" />
                Ghost Button
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="sm" className="button">
                <img className="button__icon" src="/vendoora-assets/icons/download.svg" alt="" aria-hidden="true" />
                Small Button
              </Button>
              <Button size="lg" className="button">
                <img className="button__icon" src="/vendoora-assets/icons/kiosk.svg" alt="" aria-hidden="true" />
                Large Button
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Language Support</CardTitle>
          <CardDescription>Multilingual badges and icons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/vendoora-assets/icons/lang-en.svg" 
                alt="English" 
                className="w-6 h-6"
              />
              <span>English</span>
            </div>
            <div className="flex items-center space-x-2">
              <img 
                src="/vendoora-assets/icons/lang-zh.svg" 
                alt="中文" 
                className="w-6 h-6"
              />
              <span>中文</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PWA Assets */}
      <Card>
        <CardHeader>
          <CardTitle>PWA Assets</CardTitle>
          <CardDescription>Progressive Web App icons and manifest</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center h-24">
                <img 
                  src="/vendoora-assets/favicon-32.png" 
                  alt="Favicon"
                  className="w-8 h-8"
                />
              </div>
              <div className="text-sm font-medium">Favicon (32×32)</div>
            </div>
            <div className="text-center space-y-2">
              <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center h-24">
                <img 
                  src="/vendoora-assets/images/icon-192.png" 
                  alt="App Icon 192"
                  className="w-16 h-16"
                />
              </div>
              <div className="text-sm font-medium">App Icon (192×192)</div>
            </div>
            <div className="text-center space-y-2">
              <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center h-24">
                <img 
                  src="/vendoora-assets/images/icon-512.png" 
                  alt="App Icon 512"
                  className="w-20 h-20"
                />
              </div>
              <div className="text-sm font-medium">App Icon (512×512)</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm">
              <strong>Manifest:</strong> <code>/vendoora-assets/manifest.json</code>
              <br />
              <strong>CSS Buttons:</strong> <code>/vendoora-assets/css/ui-buttons.css</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Features */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Features</CardTitle>
          <CardDescription>Enterprise-ready accessibility and compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">SVG Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Semantic &lt;title&gt; and &lt;desc&gt; elements</li>
                <li>• currentColor support for theming</li>
                <li>• 24×24 consistent sizing</li>
                <li>• 2px stroke weight for clarity</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Compliance</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• WCAG AA color contrast</li>
                <li>• Screen reader optimized</li>
                <li>• Multilingual alt text support</li>
                <li>• No trademarked logos included</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
