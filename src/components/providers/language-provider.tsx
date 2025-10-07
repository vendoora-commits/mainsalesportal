'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation, type UseTranslationReturn } from '@/hooks/useTranslation';
import { type Locale, defaultLocale, detectLocale } from '@/lib/i18n';

interface LanguageContextType extends UseTranslationReturn {
  // Additional context methods can be added here
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || defaultLocale);
  const translation = useTranslation(locale);

  // Detect locale from browser on first load
  useEffect(() => {
    if (!initialLocale && typeof window !== 'undefined') {
      const detectedLocale = detectLocale(navigator.language);
      setLocaleState(detectedLocale);
    }
  }, [initialLocale]);

  // Save locale preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', locale);
    }
  }, [locale]);

  // Load locale preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('preferred-locale') as Locale;
      if (savedLocale && savedLocale !== locale) {
        setLocaleState(savedLocale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    translation.setLocale(newLocale);
  };

  const contextValue: LanguageContextType = {
    ...translation,
    locale,
    setLocale,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
