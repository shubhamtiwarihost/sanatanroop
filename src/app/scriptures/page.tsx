'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { BookOpen, ChevronRight, ShieldCheck, ArrowRight, Bookmark } from 'lucide-react';
import { DEFAULT_SCRIPTURES } from '@/data/sanatanContent';

export default function ScripturesIndexPage() {
  const { locale, t } = useLanguage();
  const [scriptures, setScriptures] = useState<any[]>(DEFAULT_SCRIPTURES);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchScriptures() {
      try {
        const res = await fetch('/api/v1/scriptures');
        if (res.ok) {
          const data = await res.json();
          if (data.scriptures && data.scriptures.length > 0) setScriptures(data.scriptures);
        }
      } catch (e) {
        // Fallback to DEFAULT_SCRIPTURES
      }
    }
    fetchScriptures();
  }, []);

  const getLocaleTitle = (item: any) => {
    if (locale === 'hi') return item.titleHi || item.titleEn;
    if (locale === 'sa') return item.titleSa || item.titleHi || item.titleEn;
    return item.titleEn;
  };

  const categories = [
    { key: 'ALL', label: locale === 'hi' ? 'समस्त ग्रंथ' : locale === 'sa' ? 'सर्वे ग्रन्थाः' : 'All Scriptures' },
    { key: 'Gita', label: locale === 'hi' ? 'श्रीमद्भगवद्गीता' : 'Bhagavad Gita' },
    { key: 'Upanishad', label: locale === 'hi' ? 'उपनिषद' : 'Upanishads' },
    { key: 'Veda', label: locale === 'hi' ? 'वेद संहिता' : 'Vedic Samhitas' },
    { key: 'Purana', label: locale === 'hi' ? 'पुराण' : 'Puranas' },
    { key: 'Darshana', label: locale === 'hi' ? 'दर्शन' : 'Darshanas' },
  ];

  const filtered = selectedCategory === 'ALL'
    ? scriptures
    : scriptures.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#e2d2b5] dark:border-[#382b1b] pb-6 space-y-2">
        <div className="flex items-center space-x-2 text-saffron-700 dark:text-gold-400 text-xs font-serif font-bold uppercase tracking-widest">
          <BookOpen className="w-4 h-4" />
          <span>{t.home.digitalShelves}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#26140b] dark:text-[#faf1e0]">
          {locale === 'hi' ? 'सनातन डिजिटल ग्रंथालय वीथिका' : locale === 'sa' ? 'सनातन-डिजिटल-ग्रन्थागारम्' : 'Sanatan Digital Scripture Library'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-3xl font-serif leading-relaxed">
          वेदों से उपनिषदों तक, श्रीमद्भगवद्गीता से पुराणों तक — प्रामाणिक पाठ, मूल संस्कृत, पदच्छेद, एवं आचार्यों के भाष्य का संपूर्ण डिजिटल संग्रह।
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition whitespace-nowrap ${
              selectedCategory === cat.key
                ? 'bg-gradient-to-r from-[#8e6d2b] via-[#c5a059] to-[#8e6d2b] text-[#120f08] shadow-sm border border-gold-300'
                : 'bg-[#faf6ed] dark:bg-charcoal-850 text-stone-700 dark:text-stone-300 border border-[#e5d5be] dark:border-charcoal-700 hover:bg-gold-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Digital Book Library Shelves Grid */}
      {loading ? (
        <div className="text-center py-24 font-serif text-stone-500">
          {t.common.loading}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="rounded-3xl bg-gradient-to-br from-[#fbf8f2] via-[#f7f0e3] to-[#ebdcc4] dark:from-[#1b1a23] dark:via-[#14131a] dark:to-[#0f0e13] border border-[#dfceb0] dark:border-[#382b1b] p-6 sm:p-8 shadow-[0_4px_25px_rgba(42,23,14,0.06)] hover:shadow-[0_8px_30px_rgba(197,160,89,0.22)] transition-all flex flex-col justify-between space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {/* 3D Book Cover Spine Visual */}
                <div className="w-28 h-40 rounded-r-xl rounded-l-sm bg-gradient-to-tr from-[#3a1b11] via-[#2a130c] to-[#1a0b06] border border-gold-500/70 book-spine-3d flex flex-col items-center justify-between p-3.5 text-center text-gold-200 select-none flex-shrink-0">
                  <span className="text-[9px] tracking-widest text-gold-400 font-serif uppercase">
                    {s.category}
                  </span>
                  <span className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fcf3dc] to-[#c5a059]">
                    ॐ
                  </span>
                  <span className="text-[9px] text-gold-300 font-serif">
                    {s.rightsStatus}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-serif font-bold bg-gold-100 dark:bg-charcoal-800 text-saffron-800 dark:text-gold-300 border border-gold-300/60">
                      {s.category}
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-serif font-semibold flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{s.rightsStatus ? s.rightsStatus.replace('_', ' ') : 'Public Domain'}</span>
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-[#26140b] dark:text-[#faf1e0]">
                    {getLocaleTitle(s)}
                  </h2>
                  <p className="text-xs text-saffron-700 dark:text-gold-400 font-serif">
                    {s.titleSa} • {s.titleHi}
                  </p>

                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-serif line-clamp-3">
                    {s.description}
                  </p>

                  {s.provenance && (
                    <p className="text-[11px] text-stone-500 italic font-serif border-l-2 border-gold-500 pl-2">
                      {s.provenance}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Action Ribbon */}
              <div className="pt-4 border-t border-[#e8dac1] dark:border-[#2f2317] flex items-center justify-between">
                <span className="text-xs font-serif text-stone-500">
                  {s.chapters?.length || 0} {t.reader.chapter}s Available
                </span>

                <Link
                  href={`/scriptures/${s.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8e6d2b] via-[#c5a059] to-[#8e6d2b] text-[#120f08] text-xs font-serif font-bold flex items-center space-x-1.5 shadow-sm hover:scale-105 transition"
                >
                  <span>{locale === 'hi' ? 'ग्रंथ पढ़ें' : 'Read Digital Book'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
