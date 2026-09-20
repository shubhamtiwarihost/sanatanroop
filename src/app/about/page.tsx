'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  BookOpen,
  Sparkles,
  Heart,
  Globe2,
  ShieldCheck,
  Award,
  Users,
  Compass,
  ArrowRight,
  Flame,
  CheckCircle2,
  Mail,
  MapPin,
  Calendar,
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] pb-24 text-stone-900 dark:text-stone-100 font-sans">
      
      {/* =========================================================================
          HERO BANNER
      ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#2a170e] via-[#1c110b] to-[#120d0a] text-amber-50 pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-900/40">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/images/temple_river_sunrise_1789306575821.jpg"
            alt="Sacred Varanasi River Ghats"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120d0a] via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>सनातन ज्ञान की डिजिटल धरोहर</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 tracking-tight leading-tight">
            About Sanatan Roop
          </h1>
          <p className="text-base sm:text-lg text-amber-200/85 font-serif leading-relaxed max-w-2xl mx-auto">
            Preserving and Sharing the Eternal Wisdom of Sanatan Dharma for Modern Seekers Worldwide.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-16">
        
        {/* =========================================================================
            FOUNDER & LEADERSHIP SECTION (ADSENSE COMPLIANT)
        ========================================================================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/90 dark:border-stone-800 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Founder Avatar / Badge */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-1 shadow-xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-amber-950 flex flex-col items-center justify-center text-center p-3 text-white">
                  <span className="font-serif text-3xl sm:text-4xl font-bold">ॐ</span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 mt-1">Founder</span>
                </div>
              </div>
              <span className="absolute bottom-1 right-1 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow border-2 border-white dark:border-stone-900">
                Verified
              </span>
            </div>

            {/* Founder Bio */}
            <div className="space-y-3 text-center md:text-left flex-1">
              <div className="space-y-1">
                <span className="text-xs font-serif uppercase tracking-widest text-[#ea580c] font-bold">
                  Platform Founder & Editor-in-Chief
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Shubham Tiwari
                </h2>
                <p className="text-xs text-stone-500 font-mono">Founder, Sanatan Roop (sanatanroop.com)</p>
              </div>

              <p className="text-sm text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
                <strong>Shubham Tiwari</strong> founded <strong>Sanatan Roop</strong> with a sacred vision: to bridge the gap between ancient Vedic wisdom and the modern digital era. Having observed the widespread dispersion, misinterpretations, and commercialization of sacred scriptures on the internet, Shubham established Sanatan Roop as an authoritative, ad-supported, and open-access digital sanctuary.
              </p>

              <p className="text-sm text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
                Under Shubham&apos;s leadership, our editorial and research team collaborates with traditional Sanskrit scholars from Varanasi (Kashi), Haridwar, and Tirupati to verify each mantra, shloka, festival vidhi, and astronomical panchang calculation against authorized classical commentaries.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-stone-500">
                <span className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>contact@sanatanroop.com</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>Varanasi, Uttar Pradesh, India</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SACRED SHLOKA CARD: VASUDHAIVA KUTUMBAKAM
        ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#fdfaf5] dark:bg-stone-900/60 border border-amber-200/80 dark:border-stone-800 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950/70 border border-amber-300/40 flex items-center justify-center font-serif text-2xl text-amber-700 dark:text-amber-300">
            ॐ
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400">
              महा उपनिषद् (Maha Upanishad 6.71)
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
              अयं बन्धुरयं नेति गणना लघुचेतसाम् ।<br />
              उदारचरितानां तु वसुधैव कुटुम्बकम् ॥
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto italic pt-2 font-serif">
              &quot;The distinction between &apos;this is my kin and that is an outsider&apos; belongs only to the narrow-minded. For the noble-hearted of elevated consciousness, the entire universe is one divine family.&quot;
            </p>
          </div>
        </div>

        {/* =========================================================================
            MISSION & VISION (2-COLUMN GRID)
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ea580c] text-white flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Our Mission (हमारा ध्येय)
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              To digitally preserve, meticulously translate, and provide free, global access to authentic Sanatan Dharma scriptures, shlokas, temple histories, panchang calculations, and puja procedures with zero adulteration and 100% shastric fidelity.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-stone-700 dark:text-stone-300 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Word-by-word sandhi breakdown and English/Hindi meanings</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Daily automated astronomical Panchang based on Surya Siddhanta</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Authentic traditional commentaries from Adi Shankara, Ramanuja, and Madhva</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Our Vision (हमारा संकल्प)
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              A world where the timeless philosophical insights of ancient Rishis inspire ethical daily living, mental clarity, inner peace, and harmonic coexistence across generations, cultures, and modern technology.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-stone-700 dark:text-stone-300 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Multilingual accessibility in Sanskrit, Hindi, and English</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Comprehensive spiritual guides for meditation and chanting</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Connecting seekers with verified temples and authentic spiritual literature</span>
              </li>
            </ul>
          </div>
        </div>

        {/* =========================================================================
            EDITORIAL STANDARDS & TRANSPARENCY (ADSENSE CRITICAL)
        ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#ea580c]">
              Editorial Policy & Fact-Checking
            </span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
              Commitment to Truth & Shastric Integrity
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
              Sanatan Roop strictly adheres to rigorous editorial guidelines to maintain credibility and accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#ea580c]" />
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">Manuscript Verification</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                All scriptures published on the platform are cross-referenced with authorized Gita Press editions and canonical Sanskrit manuscripts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-2">
              <Award className="w-6 h-6 text-amber-600" />
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">Astronomical Accuracy</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Our Panchang calculations use precise mathematical algorithms for solar and lunar coordinates, ensuring authentic Tithi and Muhurat timings.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-2">
              <Users className="w-6 h-6 text-emerald-600" />
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">Correction & Feedback</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                We welcome scholarly peer reviews. Any scriptural or grammatical corrections are updated promptly by our editorial board.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CALL TO ACTION
        ========================================================================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#2a170e] via-[#3a2217] to-[#2a170e] text-white text-center space-y-5 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold">
            Connect With Sanatan Roop
          </h3>
          <p className="text-sm text-amber-200/90 max-w-xl mx-auto font-serif">
            Have questions about scriptures, partnerships, or editorial inquiries? Reach out to founder Shubham Tiwari and our team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold text-sm shadow-md transition"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition"
            >
              <span>Read Our Blog</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
