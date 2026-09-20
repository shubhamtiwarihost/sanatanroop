'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAudio } from '@/context/AudioContext';
import { Sparkles, Volume2 } from 'lucide-react';

export default function IntroScreen() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { playAudio } = useAudio();

  const [visible, setVisible] = useState(false);
  const [animStage, setAnimStage] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect crawlers / Lighthouse / bots to preserve 100% SEO indexing and instant Core Web Vitals
    const isBot =
      /bot|crawler|spider|crawling|lighthouse|chrome-lighthouse|headless/i.test(
        navigator.userAgent
      );
    if (isBot) {
      return;
    }

    // Check if intro was already experienced in this session
    const viewed = sessionStorage.getItem('sanatan_intro_viewed');
    if (!viewed) {
      setVisible(true);

      // Controlled cinematic progression:
      const t1 = setTimeout(() => setAnimStage(1), 150);
      const t2 = setTimeout(() => setAnimStage(2), 400);
      const t3 = setTimeout(() => setAnimStage(3), 700);
      const t4 = setTimeout(() => setAnimStage(4), 1000);
      const t5 = setTimeout(() => setAnimStage(5), 1300);
      const t6 = setTimeout(() => setAnimStage(6), 1600);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        clearTimeout(t6);
      };
    }
  }, []);

  const handleEnter = async () => {
    sessionStorage.setItem('sanatan_intro_viewed', 'true');
    // Start authentic self-hosted mantra audio upon user gesture
    await playAudio();
    setIsFadingOut(true);
    setTimeout(() => {
      setVisible(false);
    }, 700);
  };

  const handleSkip = () => {
    sessionStorage.setItem('sanatan_intro_viewed', 'true');
    setIsFadingOut(true);
    setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090c] text-ivory-100 select-none overflow-hidden transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Sacred Geometric Mandala & Particle Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient deep golden glow */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[620px] h-[420px] sm:h-[620px] rounded-full bg-gradient-to-tr from-amber-600/15 via-gold-500/20 to-transparent blur-3xl transition-opacity duration-1000 ${
            animStage >= 2 ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle expanding light wave ripple from Om */}
        {animStage >= 4 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-gold-400/30 animate-light-wave" />
        )}

        {/* Subtle star particles */}
        <div
          className={`absolute inset-0 opacity-40 transition-opacity duration-1000 ${
            animStage >= 1 ? 'opacity-40' : 'opacity-0'
          }`}
        >
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold-200 rounded-full animate-ping duration-1000" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-amber-100 rounded-full" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gold-300 rounded-full opacity-60" />
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-amber-200 rounded-full" />
        </div>
      </div>

      {/* Skip Button (Accessibility friendly) */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-xs text-stone-400 hover:text-gold-300 transition tracking-wider uppercase font-medium z-10 px-3 py-1 rounded-md border border-stone-800 hover:border-gold-700/60"
      >
        {t.common.skipIntro}
      </button>

      {/* Central Experience: The Majestic Om Symbol & Brand */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg px-4 space-y-6">
        {/* Large ॐ (Om) Symbol */}
        <div
          className={`relative transition-all duration-1000 transform ${
            animStage >= 3
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90'
          }`}
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center relative">
            {/* Outer golden halo */}
            <div className="absolute inset-0 rounded-full border border-gold-500/30 animate-spin [animation-duration:40s]" />
            <div className="absolute inset-2 rounded-full border border-dashed border-gold-400/25" />

            <span className="font-serif text-7xl sm:text-8xl font-normal text-transparent bg-clip-text bg-gradient-to-b from-[#fef0cd] via-[#d8b965] to-[#9e7a2b] filter drop-shadow-[0_0_35px_rgba(216,185,101,0.55)] animate-om-pulse">
              ॐ
            </span>
          </div>
        </div>

        {/* Logo and Tagline */}
        <div
          className={`space-y-3 transition-all duration-1000 transform ${
            animStage >= 5
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-widest text-[#fcf6e7] drop-shadow-sm">
            {t.common.brandName}
          </h1>

          <p className="text-sm sm:text-base text-gold-300/90 font-serif tracking-wide">
            &ldquo;{t.common.brandTagline}&rdquo;
          </p>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-500/80 to-transparent mx-auto pt-1" />
        </div>

        {/* Enter Button ("प्रवेश करें") */}
        <div
          className={`pt-4 transition-all duration-700 transform ${
            animStage >= 6
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={handleEnter}
            className="group relative px-9 py-3.5 rounded-full bg-gradient-to-r from-[#8e6d2b] via-[#c5a059] to-[#8e6d2b] text-[#120f08] font-bold text-sm sm:text-base tracking-wider shadow-[0_0_30px_rgba(197,160,89,0.4)] hover:shadow-[0_0_45px_rgba(216,185,101,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center space-x-2.5 border border-gold-200/60"
          >
            <span className="font-serif">॥</span>
            <span>{t.common.enterSite}</span>
            <span className="font-serif">॥</span>
          </button>

          <p className="text-[11px] text-stone-400 mt-3 flex items-center justify-center space-x-1 font-light">
            <Volume2 className="w-3 h-3 text-gold-400" />
            <span>Om Namah Shivaya meditative audio will play</span>
          </p>
        </div>
      </div>
    </div>
  );
}
