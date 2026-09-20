'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { MapPin, Clock, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { DEFAULT_TEMPLES } from '@/data/sanatanContent';

export default function TemplesPage() {
  const { locale, t } = useLanguage();
  const [temples, setTemples] = useState<any[]>(DEFAULT_TEMPLES);
  const [selectedState, setSelectedState] = useState('ALL');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadTemples() {
      try {
        const res = await fetch('/api/v1/temples');
        if (res.ok) {
          const data = await res.json();
          if (data.temples && data.temples.length > 0) setTemples(data.temples);
        }
      } catch (e) {
        // Fallback to DEFAULT_TEMPLES
      }
    }
    loadTemples();
  }, []);

  const states = ['ALL', 'Uttar Pradesh', 'Uttarakhand', 'Andhra Pradesh', 'Tamil Nadu', 'Odisha'];

  const filtered = selectedState === 'ALL'
    ? temples
    : temples.filter((tm) => tm.state === selectedState);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-[#e2d2b5] dark:border-[#382b1b] pb-6 text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-serif font-bold text-saffron-700 dark:text-gold-400 uppercase tracking-widest">
          <MapPin className="w-4 h-4" />
          <span>{t.nav.temples}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#26140b] dark:text-[#faf1e0]">
          {locale === 'hi' ? 'पुण्य तीर्थ देवालय एवं ज्योतिर्लिंग' : locale === 'sa' ? 'पुण्यतीर्थानि मन्दिराणि च' : 'Sacred Temples & Jyotirlingas'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif leading-relaxed">
          द्वादश ज्योतिर्लिंग, चार धाम, शक्तिपीठ एवं भारत की पावन मंदिर स्थापत्य धरोहर का प्रामाणिक विवरण।
        </p>
      </div>

      {/* State Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {states.map((st) => (
          <button
            key={st}
            onClick={() => setSelectedState(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition whitespace-nowrap ${
              selectedState === st
                ? 'bg-gradient-to-r from-[#8e6d2b] via-[#c5a059] to-[#8e6d2b] text-[#120f08] shadow-sm'
                : 'bg-[#faf6ed] dark:bg-charcoal-850 text-stone-700 dark:text-stone-300 border border-[#e5d5be] dark:border-charcoal-700 hover:bg-gold-50'
            }`}
          >
            {st === 'ALL' ? (locale === 'hi' ? 'समस्त राज्य' : 'All States') : st}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-24 font-serif text-stone-500">
          {t.common.loading}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((tm) => (
            <div
              key={tm.id}
              className="rounded-3xl bg-gradient-to-br from-[#fbf8f2] via-[#f7f0e3] to-[#ebdcc4] dark:from-[#1b1a23] dark:via-[#14131a] dark:to-[#0f0e13] border border-[#dfceb0] dark:border-[#382b1b] p-6 shadow-[0_4px_25px_rgba(42,23,14,0.05)] hover:shadow-[0_8px_30px_rgba(197,160,89,0.2)] transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-serif">
                  <span className="font-bold text-saffron-700 dark:text-gold-400 uppercase bg-gold-100 dark:bg-charcoal-800 px-2.5 py-0.5 rounded-full border border-gold-300/50">
                    {tm.deityName}
                  </span>
                  <span className="text-stone-500">{tm.state}</span>
                </div>

                <h2 className="font-serif text-xl font-bold text-[#26140b] dark:text-[#faf1e0]">
                  {locale === 'hi' ? tm.nameHi : locale === 'sa' ? tm.nameSa : tm.nameEn}
                </h2>

                <div className="flex items-center space-x-1.5 text-xs text-stone-600 dark:text-stone-400 font-serif">
                  <MapPin className="w-3.5 h-3.5 text-saffron-600 flex-shrink-0" />
                  <span>
                    {tm.city}, {tm.state}, {tm.country}
                  </span>
                </div>

                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-serif line-clamp-4">
                  {locale === 'hi' ? tm.historyHi : tm.historyEn}
                </p>

                {tm.timings && (
                  <div className="p-3 bg-[#fdfbf6] dark:bg-charcoal-850 rounded-xl border border-[#ebdcc3] dark:border-charcoal-700 flex items-start space-x-2 text-[11px] font-serif text-stone-700 dark:text-stone-300">
                    <Clock className="w-3.5 h-3.5 text-saffron-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold">दर्शन समय:</span> {tm.timings}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#e8dac1] dark:border-[#2f2317] flex justify-between items-center text-xs font-serif font-bold text-saffron-700 dark:text-gold-400">
                <Link href="/scriptures" className="hover:underline flex items-center space-x-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{locale === 'hi' ? 'स्थल पुराण व शास्त्र' : 'Scriptures & Mahatmya'}</span>
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
