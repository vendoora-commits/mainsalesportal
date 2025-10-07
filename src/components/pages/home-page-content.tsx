'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/providers/language-provider';
import Link from 'next/link';

export function HomePageContent() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Property with Smart Technology
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Whether you run a hotel, Airbnb, VRBO, or timeshare property, customize your accommodation with intelligent kiosks, smart locks, and automated features. Create the perfect guest experience with our comprehensive smart property solutions.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link href="/setup">{t('home.startConfiguration')}</Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              {t('home.viewSolutions')}
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complete Smart Property Solutions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to modernize your hotel, Airbnb, VRBO, or timeshare property
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Smart Kiosks</CardTitle>
              <CardDescription>
                Self-service check-in, passport scanning, and key dispensing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Passport & ID scanning</li>
                <li>• Self check-in/check-out</li>
                <li>• Key card dispensing</li>
                <li>• Payment processing</li>
                <li>• Multi-language support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Smart Locks</CardTitle>
              <CardDescription>
                Secure, convenient access with multiple authentication methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Mobile app access</li>
                <li>• Fingerprint recognition</li>
                <li>• Key card compatibility</li>
                <li>• Battery & wired options</li>
                <li>• Remote management</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Room Automation</CardTitle>
              <CardDescription>
                Intelligent room controls for enhanced guest comfort
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Smart lighting control</li>
                <li>• Climate automation</li>
                <li>• Motorized blinds</li>
                <li>• Motion sensors</li>
                <li>• Voice control ready</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Short-Term Rentals</CardTitle>
              <CardDescription>
                Specialized solutions for Airbnb, VRBO, and vacation rentals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Booking platform integration</li>
                <li>• Guest communication tools</li>
                <li>• Cleaning scheduling</li>
                <li>• Property management</li>
                <li>• Revenue optimization</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.configurationProcess')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('home.processDescription')}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Property Setup</h3>
              <p className="text-gray-600">
                Tell us about your hotel property, room count, and requirements
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Kiosk Selection</h3>
              <p className="text-gray-600">
                Choose the right kiosk solutions for your front desk needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Locks</h3>
              <p className="text-gray-600">
                Configure smart locks with your preferred access methods
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Room Features</h3>
              <p className="text-gray-600">
                Select smart room automation features for guest comfort
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="px-8">
              <Link href="/setup">{t('home.startYourConfiguration')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
