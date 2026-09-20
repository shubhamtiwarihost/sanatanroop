'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Locale, Dictionary } from './types';
import { getDictionary, SUPPORTED_LANGUAGES } from './index';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default language on first visit: HINDI
  const [locale, setLocaleState] = useState<Locale>('hi');

  useEffect(() => {
    // Load persisted locale preference from localStorage
    const saved = localStorage.getItem('sanatan_locale') as Locale;
    if (saved && ['hi', 'en', 'sa'].includes(saved)) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    } else {
      setLocaleState('hi');
      document.documentElement.lang = 'hi';
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('sanatan_locale', newLocale);
    document.cookie = `sanatan_locale=${newLocale}; path=/; max-age=31536000`;
    document.documentElement.lang = newLocale;
  };

  const t = getDictionary(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
