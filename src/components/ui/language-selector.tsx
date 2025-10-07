'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLocale?: Locale;
  onLocaleChange?: (locale: Locale) => void;
  className?: string;
}

export function LanguageSelector({ 
  currentLocale = 'en', 
  onLocaleChange,
  className 
}: LanguageSelectorProps) {
  const [selectedLocale, setSelectedLocale] = useState<Locale>(currentLocale);

  const handleLocaleChange = (locale: Locale) => {
    setSelectedLocale(locale);
    onLocaleChange?.(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Globe className="h-4 w-4 mr-2" />
          <span className="mr-2">{localeFlags[selectedLocale]}</span>
          {localeNames[selectedLocale]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <span className="text-lg">{localeFlags[locale]}</span>
            <span className="flex-1">{localeNames[locale]}</span>
            {selectedLocale === locale && (
              <span className="text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
