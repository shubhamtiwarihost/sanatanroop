'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCMS } from '@/context/CMSContext';
import { PanchangInfo, calculatePanchang } from '@/lib/panchang';
import {
  Calendar as CalendarIcon,
  MapPin,
  ChevronDown,
  Sun,
  Sunset,
  Moon,
  Clock,
  Compass,
  AlertTriangle,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export default function PanchangPage() {
  const { locale, t } = useLanguage();
  const { panchangConfig } = useCMS();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [location, setLocation] = useState(panchangConfig?.defaultCity ? `${panchangConfig.defaultCity}, India` : 'Varanasi, India');
  const [panchang, setPanchang] = useState<PanchangInfo | null>(null);

  useEffect(() => {
    const p = calculatePanchang(selectedDate);
    setPanchang(p);
  }, [selectedDate]);

  // Generate 7-day horizontal strip centered on selected date
  const dateStrip = [-2, -1, 0, 1, 2, 3, 4].map((offset) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    return {
      date: d,
      dayNumber: d.getDate(),
      dayName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()],
      isCurrent: offset === 0,
    };
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans pb-16">
      
      {/* =========================================================================
          HERO BANNER: PANCHANG HEADER WITH DATE & LOCATION SELECTOR
      ========================================================================= */}
      <section className="bg-gradient-to-r from-[#241711] via-[#3a2217] to-[#241711] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#4d3224]">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-wide">
            आज का पावन पंचांग
          </h1>
          <p className="text-sm sm:text-base text-amber-200/90 font-serif">
            Accurate Panchang for a Blessed Day
          </p>

          {/* Date Picker & Location Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 max-w-lg mx-auto">
            {/* Date selector button */}
            <div className="bg-white/95 text-stone-900 rounded-lg px-4 py-2 text-xs font-semibold flex items-center space-x-2 shadow">
              <CalendarIcon className="w-4 h-4 text-orange-600" />
              <span>{selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </div>

            {/* City location selector button */}
            <div className="bg-white/95 text-stone-900 rounded-lg px-4 py-2 text-xs font-semibold flex items-center space-x-2 shadow">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>{location}</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HORIZONTAL DATE STRIP / SCROLLER
      ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-2">
          {dateStrip.map((item) => (
            <button
              key={item.dayNumber + item.dayName}
              onClick={() => setSelectedDate(item.date)}
              className={`flex flex-col items-center justify-center w-14 h-16 sm:w-16 sm:h-18 rounded-2xl transition shadow-sm ${
                item.isCurrent
                  ? 'bg-[#ea580c] text-white font-bold shadow-md shadow-orange-500/20 scale-105'
                  : 'bg-white dark:bg-[#1a1411] border border-stone-200/90 text-stone-700 dark:text-stone-300 hover:border-orange-300'
              }`}
            >
              <span className="text-lg sm:text-xl font-bold font-serif leading-none">
                {item.dayNumber}
              </span>
              <span className="text-[11px] font-serif uppercase tracking-wider mt-1 opacity-90">
                {item.dayName}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================================
          MAIN PANCHANG CARD (ACCORDING TO REFERENCE IMAGE)
      ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 pt-6">
        <div className="bg-white dark:bg-[#1a1411] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Top Row: Date Title + Sun/Moon Timings */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-100 dark:border-stone-800 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white">
                {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </h2>
              <span className="text-sm font-serif text-amber-700 dark:text-amber-400 font-semibold block mt-0.5">
                {panchang?.dayOfWeek || 'Sunday'}
              </span>
            </div>

            {/* Sun and Moon Timings Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center space-x-2">
                <span className="text-stone-500">Sunrise:</span>
                <span className="font-bold text-stone-900 dark:text-white font-mono">{panchang?.sunrise || '06:02 AM'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-stone-500">Sunset:</span>
                <span className="font-bold text-stone-900 dark:text-white font-mono">{panchang?.sunset || '06:23 PM'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-stone-500">Abhijit:</span>
                <span className="font-bold text-stone-900 dark:text-white font-mono">{panchang?.abhijitMuhurat || '11:48 AM - 12:38 PM'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-stone-500">Rahu Kaal:</span>
                <span className="font-bold text-stone-900 dark:text-white font-mono">{panchang?.rahuKaal || '04:30 PM - 06:00 PM'}</span>
              </div>
            </div>
          </div>

          {/* Detailed Astrological Table Rows */}
          <div className="divide-y divide-stone-100 dark:divide-stone-800 text-sm font-serif">
            
            <div className="py-2.5 flex items-center justify-between sm:justify-start">
              <span className="w-36 text-stone-500 font-semibold flex items-center space-x-2">
                <span>📅 Tithi</span>
              </span>
              <span className="font-bold text-stone-900 dark:text-white">
                {panchang ? `${panchang.paksha.en} ${panchang.tithiName.en} (${panchang.paksha.hi} ${panchang.tithiName.hi})` : 'Shukla Tritiya'}
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between sm:justify-start">
              <span className="w-36 text-stone-500 font-semibold flex items-center space-x-2">
                <span>🕉️ Nakshatra</span>
              </span>
              <span className="font-bold text-stone-900 dark:text-white">
                {panchang ? `${panchang.nakshatra.en} (${panchang.nakshatra.hi})` : 'Chitra'}
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between sm:justify-start">
              <span className="w-36 text-stone-500 font-semibold flex items-center space-x-2">
                <span>🏵️ Yoga</span>
              </span>
              <span className="font-bold text-stone-900 dark:text-white">
                {panchang ? `${panchang.yoga.en} (${panchang.yoga.hi})` : 'Priti'}
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between sm:justify-start">
              <span className="w-36 text-stone-500 font-semibold flex items-center space-x-2">
                <span>📿 Karana</span>
              </span>
              <span className="font-bold text-stone-900 dark:text-white">
                {panchang ? `${panchang.karana.en} (${panchang.karana.hi})` : 'Gara'}
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between sm:justify-start">
              <span className="w-36 text-stone-500 font-semibold flex items-center space-x-2">
                <span>☀️ Paksha</span>
              </span>
              <span className="font-bold text-stone-900 dark:text-white">
                {panchang ? `${panchang.paksha.en} (${panchang.paksha.hi})` : 'Shukla Paksha'}
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between sm:justify-start">
              <span className="w-36 text-stone-500 font-semibold flex items-center space-x-2">
                <span>🕉️ Vikram Samvat</span>
              </span>
              <span className="font-bold text-stone-900 dark:text-white">
                2083
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between sm:justify-start">
              <span className="w-36 text-stone-500 font-semibold flex items-center space-x-2">
                <span>📿 Shaka Samvat</span>
              </span>
              <span className="font-bold text-stone-900 dark:text-white">
                1948
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between sm:justify-start">
              <span className="w-36 text-stone-500 font-semibold flex items-center space-x-2">
                <span>🧭 Ayana</span>
              </span>
              <span className="font-bold text-stone-900 dark:text-white">
                Dakshinayana
              </span>
            </div>

            <div className="py-2.5 flex items-center justify-between sm:justify-start">
              <span className="w-36 text-stone-500 font-semibold flex items-center space-x-2">
                <span>🌸 Ritu</span>
              </span>
              <span className="font-bold text-stone-900 dark:text-white">
                Sharad
              </span>
            </div>

          </div>

          {/* 4 Auspicious / Inauspicious Muhurats Cards */}
          <div className="pt-4">
            <h3 className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-3">
              Auspicious & Inauspicious Timings
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              {/* Rahu Kaal */}
              <div className="bg-[#fef2f2] dark:bg-[#2c1818] border border-rose-200 dark:border-rose-900/40 rounded-xl p-3.5 text-center space-y-1">
                <span className="text-[11px] font-bold text-rose-800 dark:text-rose-300 block">
                  Rahu Kaal
                </span>
                <span className="text-xs font-mono font-bold text-stone-900 dark:text-white block">
                  05:07 PM - 06:36 PM
                </span>
                <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium block">
                  Varjya (Avoid)
                </span>
              </div>

              {/* Yamagandam */}
              <div className="bg-stone-50 dark:bg-[#201815] border border-stone-200 dark:border-stone-800 rounded-xl p-3.5 text-center space-y-1">
                <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block">
                  Yamagandam
                </span>
                <span className="text-xs font-mono font-bold text-stone-900 dark:text-white block">
                  12:15 PM - 01:42 PM
                </span>
                <span className="text-[10px] text-stone-500 block">
                  Inauspicious
                </span>
              </div>

              {/* Gulika Kaal */}
              <div className="bg-stone-50 dark:bg-[#201815] border border-stone-200 dark:border-stone-800 rounded-xl p-3.5 text-center space-y-1">
                <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block">
                  Gulika Kaal
                </span>
                <span className="text-xs font-mono font-bold text-stone-900 dark:text-white block">
                  03:21 PM - 05:06 PM
                </span>
                <span className="text-[10px] text-stone-500 block">
                  Moderate
                </span>
              </div>

              {/* Abhijit Muhurat */}
              <div className="bg-[#f0fdf4] dark:bg-[#142618] border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-3.5 text-center space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block">
                  Abhijit Muhurat
                </span>
                <span className="text-xs font-mono font-bold text-stone-900 dark:text-white block">
                  11:48 AM - 12:36 PM
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block">
                  Auspicious (Shubh)
                </span>
              </div>

            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 border-t border-stone-100 dark:border-stone-800">
            <button className="px-6 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-semibold hover:bg-stone-50 dark:hover:bg-stone-800 transition">
              Monthly Panchang
            </button>
            <button className="px-6 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-semibold hover:bg-stone-50 dark:hover:bg-stone-800 transition">
              Annual Panchang (2026)
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
