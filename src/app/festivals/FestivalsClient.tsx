'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCMS } from '@/context/CMSContext';
import { Calendar, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { DEFAULT_FESTIVALS } from '@/data/sanatanContent';

export default function FestivalsPage() {
  const { locale, t } = useLanguage();
  const { festivals: cmsFestivals } = useCMS();
  const festivals = cmsFestivals && cmsFestivals.length > 0 ? cmsFestivals : DEFAULT_FESTIVALS;
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-amber-200 dark:border-amber-900/60 pb-6 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-2">
          <Calendar className="w-4 h-4" />
          <span>{t.nav.festivals}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50">
          {t.home.festivalsCalendar}
        </h1>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          Major Hindu festivals, vrata vidhis, puja procedures, and scriptural significance.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-stone-500 font-serif">{t.common.loading}</div>
      ) : (
        <div className="space-y-6">
          {festivals.map((f) => (
            <div
              key={f.id}
              className="rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-amber-900/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-100 dark:border-stone-800 pb-3 gap-2">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-800 dark:text-amber-400">
                    {f.lunarMonth} • {f.tithi}
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    {locale === 'hi' ? f.nameHi : locale === 'sa' ? f.nameSa : f.nameEn}
                  </h2>
                </div>
                {f.associatedDeity && (
                  <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    Deity: {f.associatedDeity}
                  </span>
                )}
              </div>

              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {locale === 'hi' ? f.descriptionHi : f.descriptionEn}
              </p>

              {(f.pujaVidhiEn || f.pujaVidhiHi) && (
                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-800/40 border border-amber-100 dark:border-stone-700 space-y-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-900 dark:text-amber-200 flex items-center space-x-1">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>Puja Vidhi & Ritual Observance:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    {locale === 'hi' ? f.pujaVidhiHi : f.pujaVidhiEn}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
