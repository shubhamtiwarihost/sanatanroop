'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Sparkles, BookOpen, Calendar, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const match = pathname.match(/^\/books\/([^/]+)/);
      if (match && match[1] && match[1] !== 'index.html') {
        window.location.replace(`/books/?read=${match[1]}`);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Spiritual background watermark */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image
          src="/images/hero_shiva.jpg"
          alt="Sacred Background"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-xl w-full text-center space-y-8 relative z-10 p-8 sm:p-12 rounded-3xl bg-white/90 dark:bg-stone-900/90 border border-amber-200/80 dark:border-stone-800 shadow-2xl backdrop-blur-md">
        {/* Om Logo & 404 Visual */}
        <div className="relative inline-block">
          <span className="font-serif text-8xl sm:text-9xl font-extrabold text-amber-500/20 select-none block leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center font-serif text-3xl font-bold shadow-lg border border-amber-300/40">
              ॐ
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
            मार्ग भटक गए हैं? (Page Not Found)
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif leading-relaxed max-w-md mx-auto">
            The sacred verse, article, or page you are seeking does not exist or may have been relocated.
          </p>
        </div>

        {/* Quick Links */}
        <div className="border-t border-b border-amber-100 dark:border-stone-800 py-6 space-y-3">
          <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block">
            Popular Sacred Destinations
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <Link
              href="/shlokas"
              className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-stone-800 hover:bg-amber-100 text-stone-800 dark:text-stone-200 border border-amber-200/60 transition flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Sacred Mantras</span>
            </Link>
            <Link
              href="/calendar"
              className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-stone-800 hover:bg-amber-100 text-stone-800 dark:text-stone-200 border border-amber-200/60 transition flex items-center space-x-1"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Vedic Panchang</span>
            </Link>
            <Link
              href="/scriptures/bhagavad-gita"
              className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-stone-800 hover:bg-amber-100 text-stone-800 dark:text-stone-200 border border-amber-200/60 transition flex items-center space-x-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Bhagavad Gita</span>
            </Link>
            <Link
              href="/store"
              className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-stone-800 hover:bg-amber-100 text-stone-800 dark:text-stone-200 border border-amber-200/60 transition flex items-center space-x-1"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
              <span>Sanatan Store</span>
            </Link>
          </div>
        </div>

        {/* Primary Return Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold shadow-lg hover:shadow-xl transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Sacred Home (मुख्य पृष्ठ)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
