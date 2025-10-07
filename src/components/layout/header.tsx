'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { LanguageSelector } from '@/components/ui/language-selector';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/store/useUIStore';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const { t, locale, setLocale } = useLanguage();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/vendoora-assets/logos/vendoora-mark.svg" 
              alt="Vendoora" 
              className="w-8 h-8"
            />
            <img 
              src="/vendoora-assets/logos/vendoora-logo-light.svg" 
              alt="Vendoora Smart Hotel Experience" 
              className="h-6 hidden dark:block"
            />
            <img 
              src="/vendoora-assets/logos/vendoora-logo-dark.svg" 
              alt="Vendoora Smart Hotel Experience" 
              className="h-6 block dark:hidden"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/setup" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('navigation.setup')}
          </Link>
          <Link 
            href="/product-catalog" 
            className="text-sm font-bold transition-colors hover:text-primary text-primary"
          >
            Product Catalog
          </Link>
          <Link 
            href="/short-term-rental" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Short-Term Rental
          </Link>
          <Link 
            href="/guest-management" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Guest Management
          </Link>
          <Link 
            href="/kiosk-showcase" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Kiosk Showcase
          </Link>
          <Link 
            href="/kiosk-selection" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('navigation.kiosk')}
          </Link>
          <Link 
            href="/smart-locks" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('navigation.locks')}
          </Link>
          <Link 
            href="/room-features" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('navigation.features')}
          </Link>
          <Link 
            href="/admin" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('navigation.admin')}
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <LanguageSelector 
            currentLocale={locale}
            onLocaleChange={setLocale}
          />
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {sidebarOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-2">
            <Link 
              href="/setup" 
              className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setSidebarOpen(false)}
            >
              {t('navigation.setup')}
            </Link>
            <Link 
              href="/short-term-rental" 
              className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setSidebarOpen(false)}
            >
              Short-Term Rental
            </Link>
            <Link 
              href="/guest-management" 
              className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setSidebarOpen(false)}
            >
              Guest Management
            </Link>
            <Link 
              href="/kiosk-selection" 
              className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setSidebarOpen(false)}
            >
              {t('navigation.kiosk')}
            </Link>
            <Link 
              href="/smart-locks" 
              className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setSidebarOpen(false)}
            >
              {t('navigation.locks')}
            </Link>
            <Link 
              href="/room-features" 
              className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setSidebarOpen(false)}
            >
              {t('navigation.features')}
            </Link>
            <Link 
              href="/admin" 
              className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setSidebarOpen(false)}
            >
              {t('navigation.admin')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
