'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { Cookie, ShieldCheck, X, Check } from 'lucide-react';

export default function CookieConsent() {
  const { locale } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('sanatan_cookie_consent');
      if (!consent) {
        // Show after a subtle delay for smooth user experience
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may be unavailable in private browsing
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('sanatan_cookie_consent', 'all');
      localStorage.setItem('sanatan_cookie_consent_date', new Date().toISOString());
    } catch {}
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('sanatan_cookie_consent', 'essential');
      localStorage.setItem('sanatan_cookie_consent_date', new Date().toISOString());
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const content = {
    hi: {
      title: 'कुकीज़ और गोपनीयता प्राथमिकताएं',
      desc: 'सनातन रूप आपके स्वाध्याय, पठन प्रगति, भाषा प्राथमिकताओं और भजन अनुभव को सहेजने के लिए आवश्यक कुकीज़ का उपयोग करता है।',
      accept: 'सभी स्वीकार करें',
      essential: 'केवल आवश्यक',
      policy: 'गोपनीयता नीति पढ़ें',
    },
    en: {
      title: 'Cookies & Privacy Preferences',
      desc: 'SanatanRoop uses cookies to enhance your spiritual journey, remember reading progress, save language settings, and optimize audio performance.',
      accept: 'Accept All',
      essential: 'Essential Only',
      policy: 'Read Privacy Policy',
    },
    sa: {
      title: 'कुकी-नीतिः गोपनीयता च',
      desc: 'सनातनरूपम् भवतां स्वाध्यायप्रगतिं, भाषाप्राथमिकतां, भजनस्मृतिं च रक्षितुं कुकी-सञ्चिकानाम् उपयोगं करोति।',
      accept: 'सर्वं स्वीकरोतु',
      essential: 'केवलं आवश्यकम्',
      policy: 'गोपनीयता-नीतिः',
    },
  }[locale] || {
    title: 'कुकीज़ और गोपनीयता प्राथमिकताएं',
    desc: 'सनातन रूप आपके स्वाध्याय, पठन प्रगति, भाषा प्राथमिकताओं और भजन अनुभव को सहेजने के लिए आवश्यक कुकीज़ का उपयोग करता है।',
    accept: 'सभी स्वीकार करें',
    essential: 'केवल आवश्यक',
    policy: 'गोपनीयता नीति पढ़ें',
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      className="fixed z-50 bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-[#fffdfa]/95 dark:bg-[#1a1411]/95 text-[#241711] dark:text-stone-100 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-amber-500/40 shadow-2xl shadow-black/25 space-y-4">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-700 dark:text-amber-400">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base leading-tight">
                {content.title}
              </h3>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-serif font-semibold tracking-wider uppercase">
                SanatanRoop Privacy
              </span>
            </div>
          </div>

          <button
            onClick={handleEssentialOnly}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1 rounded-lg transition"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
          {content.desc}{' '}
          <Link
            href="/privacy"
            className="text-amber-700 dark:text-amber-400 underline font-semibold hover:text-amber-800 transition"
          >
            {content.policy}
          </Link>
          .
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <button
            onClick={handleAcceptAll}
            className="w-full sm:flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2.5 rounded-xl text-xs font-serif font-bold shadow-md shadow-amber-600/25 transition flex items-center justify-center space-x-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{content.accept}</span>
          </button>

          <button
            onClick={handleEssentialOnly}
            className="w-full sm:w-auto bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 border border-stone-300/80 dark:border-stone-700 px-4 py-2.5 rounded-xl text-xs font-serif font-semibold transition"
          >
            <span>{content.essential}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
