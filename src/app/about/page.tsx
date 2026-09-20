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
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] pb-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#2a170e] via-[#1c110b] to-[#120d0a] text-amber-50 pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-900/40">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/images/temple_river_sunrise_1789306575821.jpg"
            alt="Sacred Varanasi Ghats"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120d0a] via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-5">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>सनातन ज्ञान की डिजिटल धरोहर</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 tracking-tight leading-tight">
            About Hindu Dharma Platform
          </h1>
          <p className="text-base sm:text-lg text-amber-200/80 font-serif leading-relaxed max-w-2xl mx-auto">
            Preserving and Sharing Ancient Wisdom for the Modern World — bringing the eternal light of Vedic knowledge to every home across the globe.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-16">
        {/* Sacred Shloka Card: Vasudhaiva Kutumbakam */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950/70 border border-amber-300/40 flex items-center justify-center font-serif text-3xl text-amber-700 dark:text-amber-300">
            ॐ
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400">
              महा उपनिषद् (Maha Upanishad 6.71)
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 text-saffron">
              अयं बन्धुरयं नेति गणना लघुचेतसाम् ।<br />
              उदारचरितानां तु वसुधैव कुटुम्बकम् ॥
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto italic pt-2">
              &quot;The narrow-minded perceive humanity as &apos;mine&apos; versus &apos;theirs&apos;. For those of elevated consciousness and noble spirit, the entire cosmos is one unified divine family.&quot;
            </p>
          </div>
        </div>

        {/* Mission & Vision (2-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 dark:from-stone-900 dark:to-stone-800/80 border border-amber-200 dark:border-stone-700 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Our Mission (हमारा ध्येय)
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              To digitally preserve, translate, and provide open access to authentic Sanatan Dharma scriptures, shlokas, temple histories, panchang calculations, and ritual procedures for spiritual seekers globally — with zero commercial adulteration and 100% shastric fidelity.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-stone-700 dark:text-stone-300 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Verified Vedic texts with word-by-word sandhi breakdown</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Audio chanting by trained traditional Vedic reciters</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Astronomically accurate Panchang calculations</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 dark:from-stone-900 dark:to-stone-800/80 border border-amber-200 dark:border-stone-700 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Our Vision (हमारा संकल्प)
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              A world where the timeless philosophical insights of Rishis inspire ethical daily living, inner peace, mental clarity, and harmonic coexistence across generations, cultures, and modern technology.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-stone-700 dark:text-stone-300 font-medium">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Seamless multilingual accessibility (Hindi, English, Sanskrit)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Connecting seekers with verified authentic spiritual masters</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Empowering traditional temple artisans and craft preservation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 Core Pillars of the Platform */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400">
              Fundamental Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
              The Four Pillars of Our Dharma
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Every shloka, article, product, and panchang metric is curated according to these four core tenets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Authenticity (प्रामाणिकता)',
                desc: 'Every verse is checked against authorized manuscripts and commentaries from Shankara, Ramanuja, and traditional sampradayas.',
              },
              {
                icon: BookOpen,
                title: 'Accessibility (सुलभता)',
                desc: 'Universal ease of study with Devanagari, IAST transliteration, English & Hindi word meanings, and sacred audio.',
              },
              {
                icon: Heart,
                title: 'Reverence (श्रद्धा एवं शुचिता)',
                desc: 'A pure, ad-free digital sanctuary created with sacred devotion, preserving the sanctity of Vedic contemplation.',
              },
              {
                icon: Users,
                title: 'Universal Satsang (सत्संग)',
                desc: 'Building an active, thoughtful community of practitioners, seekers, and scholars growing in mutual wisdom.',
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-sm hover:shadow-md hover:border-amber-400 transition space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform Milestones & Statistics */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#20150e] via-[#180e08] to-[#140b07] text-amber-100 shadow-xl border border-amber-500/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-amber-500/20">
            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-amber-400">
                1,000+
              </span>
              <span className="text-xs text-amber-200/80 font-medium">
                Sacred Mantras & Stotrams
              </span>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-amber-400">
                500+
              </span>
              <span className="text-xs text-amber-200/80 font-medium">
                Spiritual Articles & Guides
              </span>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-amber-400">
                50,000+
              </span>
              <span className="text-xs text-amber-200/80 font-medium">
                Devotees Worldwide
              </span>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-amber-400">
                108+
              </span>
              <span className="text-xs text-amber-200/80 font-medium">
                Authentic Puja Vidhis
              </span>
            </div>
          </div>
        </div>

        {/* Advisory Scholars & Contributors */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Vedic Advisory & Editorial Board
            </h3>
            <p className="text-xs text-stone-500">
              Guided by revered scholars, traditional pandits, and spiritual educators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: 'Acharya Vidyadhar Sharma',
                role: 'Head of Shastric Review',
                org: 'Varanasi Sanskrit Vishwavidyalaya',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
              },
              {
                name: 'Dr. Meenakshi Sundaram',
                role: 'Director of Sanskrit Research',
                org: 'Adyar Library & Research Centre',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
              },
              {
                name: 'Pandit Rameshwar Shastri',
                role: 'Panchang & Astronomical Lead',
                org: 'Ujjain Observatory Heritage Trust',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
              },
            ].map((person) => (
              <div
                key={person.name}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 text-center space-y-3"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-amber-400/60 shadow-md">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                    {person.name}
                  </h4>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                    {person.role}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{person.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-bold text-white">
              Begin Your Journey of Sacred Study
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 max-w-md">
              Explore our comprehensive repository of scriptures, chants, and Vedic panchang today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/scriptures/bhagavad-gita"
              className="px-6 py-3 rounded-xl bg-white text-stone-900 hover:bg-amber-50 text-xs font-bold shadow transition"
            >
              Read Bhagavad Gita
            </Link>
            <Link
              href="/community"
              className="px-6 py-3 rounded-xl bg-stone-900/40 hover:bg-stone-900/60 text-white text-xs font-bold border border-white/20 transition"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
