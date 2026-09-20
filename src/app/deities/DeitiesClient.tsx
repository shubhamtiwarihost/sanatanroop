'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCMS } from '@/context/CMSContext';
import { Sparkles, MapPin, Calendar, BookOpen, ChevronRight } from 'lucide-react';
import { DEFAULT_DEITIES } from '@/data/sanatanContent';

export default function DeitiesPage() {
  const { locale, t } = useLanguage();
  const { deities: cmsDeities } = useCMS();
  const deities = cmsDeities && cmsDeities.length > 0 ? cmsDeities : DEFAULT_DEITIES;
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-[#e2d2b5] dark:border-[#382b1b] pb-6 text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-serif font-bold text-saffron-700 dark:text-gold-400 uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>{t.nav.deities}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#26140b] dark:text-[#faf1e0]">
          {locale === 'hi' ? 'पूज्य देवी-देवता एवं दिव्य स्वरूप' : locale === 'sa' ? 'पूज्याः देवाः देव्यश्च' : 'Sacred Deities of Sanatan Dharma'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif leading-relaxed">
          सगुण ब्रह्म के पावन स्वरूप, ध्यान मन्त्र, शास्त्रोक्त कथाएं, एवं तीर्थ महात्म्य।
        </p>
      </div>

      {loading ? (
        <div className="text-center py-24 font-serif text-stone-500">
          {t.common.loading}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deities.map((d) => {
            let temples: string[] = [];
            let festivals: string[] = [];
            let scripturalRefs: string[] = [];
            try {
              if (d.popularTemples) temples = JSON.parse(d.popularTemples);
              if (d.festivals) festivals = JSON.parse(d.festivals);
              if (d.scripturalRefs) scripturalRefs = JSON.parse(d.scripturalRefs);
            } catch (e) {}

            return (
              <div
                key={d.id}
                className="rounded-3xl bg-gradient-to-br from-[#fbf8f2] via-[#f7f0e3] to-[#ebdcc4] dark:from-[#1b1a23] dark:via-[#14131a] dark:to-[#0f0e13] border border-[#dfceb0] dark:border-[#382b1b] p-6 sm:p-7 shadow-[0_4px_25px_rgba(42,23,14,0.05)] hover:shadow-[0_8px_30px_rgba(197,160,89,0.2)] transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Sanctum Icon & Mantra Header */}
                  <div className="flex items-center justify-between border-b border-[#e8dac1] dark:border-[#2f2317] pb-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3a2012] via-[#24150b] to-[#150c06] text-gold-300 flex items-center justify-center font-serif text-2xl font-bold shadow-md border border-gold-500/60">
                      ॐ
                    </div>
                    <span className="text-[10px] font-serif font-bold text-saffron-700 dark:text-gold-400 uppercase tracking-widest">
                      ॥ ध्यान मन्त्र ॥
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#26140b] dark:text-[#faf1e0]">
                      {locale === 'hi' ? d.nameHi : locale === 'sa' ? d.nameSa : d.nameEn}
                    </h2>
                    {d.mantra && (
                      <p className="text-xs font-serif font-semibold text-saffron-700 dark:text-gold-400 mt-1">
                        {d.mantra}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
                    {locale === 'hi' ? d.significanceHi : d.significanceEn}
                  </p>

                  {/* Sacred Katha Box */}
                  {d.storyEn && (
                    <div className="bg-[#fefdfb]/80 dark:bg-charcoal-850/60 p-3.5 rounded-xl border border-[#e8dac2] dark:border-[#342718] text-xs font-serif text-stone-700 dark:text-stone-300 space-y-1">
                      <span className="font-bold text-[#2a170e] dark:text-gold-300 block">
                        ॥ पौराणिक आख्यान ॥
                      </span>
                      <p className="line-clamp-3 italic leading-relaxed">
                        {locale === 'hi' ? d.storyHi : d.storyEn}
                      </p>
                    </div>
                  )}

                  {/* Major Temples & Shrines */}
                  {temples.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-serif font-bold text-stone-500 uppercase tracking-wider flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-saffron-600" />
                        <span>{locale === 'hi' ? 'प्रमुख तीर्थ व देवालय:' : 'Prominent Temples:'}</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {temples.map((tm) => (
                          <span
                            key={tm}
                            className="text-[10px] font-serif px-2 py-0.5 rounded-md bg-[#fdfbf6] dark:bg-charcoal-800 text-stone-800 dark:text-stone-200 border border-[#e8dac1] dark:border-charcoal-700"
                          >
                            {tm}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Scriptural References */}
                  {scripturalRefs.length > 0 && (
                    <div className="space-y-1 text-[11px] text-stone-500 font-serif pt-1">
                      <span className="font-semibold block">शास्त्र संदर्भ:</span>
                      <p className="italic text-stone-600 dark:text-stone-400">
                        {scripturalRefs.join(' • ')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#e8dac1] dark:border-[#2f2317] flex justify-between items-center text-xs font-serif font-bold text-saffron-700 dark:text-gold-400">
                  <Link href={`/scriptures?category=${d.slug.includes('krishna') ? 'Gita' : 'Purana'}`} className="hover:underline flex items-center space-x-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{locale === 'hi' ? 'सम्बन्धित ग्रंथ देखें' : 'Related Scriptures'}</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
