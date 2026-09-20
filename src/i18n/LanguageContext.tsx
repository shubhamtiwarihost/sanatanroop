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

  const TITLES: Record<Locale, string> = {
    hi: 'SanatanRoop | सम्पूर्ण सनातन धर्म, पंचांग, आरती एवं ग्रंथ',
    en: 'SanatanRoop | Eternal Sanatan Dharma, Panchang, Aartis & Scriptures',
    sa: 'सनातनरूपम् | सम्पूर्ण सनातनधर्मः, पञ्चाङ्गम्, आरती एवं ग्रन्थाः',
  };

  useEffect(() => {
    // Load persisted locale preference from localStorage
    const saved = localStorage.getItem('sanatan_locale') as Locale;
    const activeLocale = saved && ['hi', 'en', 'sa'].includes(saved) ? saved : 'hi';
    setLocaleState(activeLocale);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = activeLocale;
      document.title = TITLES[activeLocale];
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('sanatan_locale', newLocale);
    document.cookie = `sanatan_locale=${newLocale}; path=/; max-age=31536000`;
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
      document.title = TITLES[newLocale];
    }
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
