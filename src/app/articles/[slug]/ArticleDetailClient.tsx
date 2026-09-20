'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Calendar,
  Clock,
  Eye,
  Share2,
  Check,
  Facebook,
  Twitter,
  ChevronLeft,
} from 'lucide-react';

export default function ArticleDetailClient() {
  const { locale, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans pb-16">
      
      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/articles"
          className="inline-flex items-center space-x-1 text-xs font-semibold text-stone-500 hover:text-[#ea580c] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#1a1411] border border-stone-200/90 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm">
          
          {/* Hero Banner Image */}
          <div className="w-full h-64 sm:h-80 md:h-96 relative bg-stone-100">
            <Image
              src="/images/article_meditation.jpg"
              alt="Meditation: The Path to Inner Peace"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Article Header & Metadata */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-950/50 text-[#ea580c] text-xs font-bold rounded-md">
                Spirituality
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-white leading-tight">
                Meditation: The Path to Inner Peace
              </h1>

              {/* Metadata Row matching reference image */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 font-serif pt-1">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>12 September 2026</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>10 min read</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>3.2k views</span>
                </span>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center space-x-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                <span className="text-xs text-stone-400 font-medium mr-1">Share:</span>
                <button
                  onClick={handleShare}
                  className="p-1.5 rounded-full border border-stone-200 hover:border-orange-400 text-stone-600 hover:text-[#ea580c] transition"
                  title="Copy link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Formatted Article Body matching screenshot */}
            <div className="pt-4 space-y-6 text-sm sm:text-base text-stone-700 dark:text-stone-300 font-serif leading-relaxed">
              <p className="text-base sm:text-lg font-serif italic text-stone-800 dark:text-stone-200 border-l-4 border-[#ea580c] pl-4 py-1">
                “In the stillness of the mind lies the discovery of the Supreme Self. Dhyana (Meditation) is not merely a practice, but a sacred journey from restlessness to eternal tranquility.”
              </p>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
                  1. What is Meditation?
                </h2>
                <p>
                  In the Vedic tradition, meditation is known as <em>Dhyana</em>, the seventh limb of Ashtanga Yoga described by Maharshi Patanjali. It is the unbroken flow of awareness toward the divine core of your true consciousness. When the fluctuations of the mind cease (*chitta vritti nirodha*), one rests in their true nature of pure peace and bliss.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
                  2. Benefits of Meditation
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Reduces stress and anxiety:</strong> Calms the nervous system and dissolves accumulated mental tension.</li>
                  <li><strong>Improves concentration:</strong> Sharpens intellect (*buddhi*) and improves cognitive focus.</li>
                  <li><strong>Brings inner peace:</strong> Creates an emotional anchor that remains unshaken amidst worldly changes.</li>
                  <li><strong>Enhances self-awareness:</strong> Connects you directly with your inner spiritual divinity.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
                  3. How to Practice Daily Meditation
                </h2>
                <p>
                  Sit in a comfortable posture with the spine upright. Close your eyes gently and take five slow, deep breaths. Silently align your awareness with the sacred sound of <strong>ॐ (Om)</strong>. Allow any thoughts to arise and pass without judgment, continually resting in the quiet space between breaths.
                </p>
              </div>
            </div>

            {/* Author Attribution Box */}
            <div className="mt-10 p-5 rounded-2xl bg-stone-50 dark:bg-[#201814] border border-stone-200/80 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-serif font-bold text-xl">
                ॐ
              </div>
              <div>
                <span className="font-serif font-bold text-stone-900 dark:text-white block text-sm">
                  Acharya Vidyadhar
                </span>
                <span className="text-xs text-stone-500 font-sans">
                  Vedic Scholar &amp; Spiritual Teacher • SanatanRoop Library
                </span>
              </div>
            </div>

          </div>
        </div>
      </article>

    </div>
  );
}
