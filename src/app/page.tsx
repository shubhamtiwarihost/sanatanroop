'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAudio } from '@/context/AudioContext';
import { PanchangInfo, calculatePanchang } from '@/lib/panchang';
import {
  Calendar,
  Sparkles,
  Flame,
  BookOpen,
  FileText,
  ArrowRight,
  Sun,
  Sunset,
  Heart,
  Play,
  Pause,
  Star,
  Users,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import LiveFestival from '@/components/LiveFestival';

export default function HomePage() {
  const { locale, t } = useLanguage();
  const { isPlaying, toggleAudio, playAudio, pauseAudio } = useAudio();
  const { blocks, siteIdentity, mantras: cmsMantras, articles: cmsArticles, products: cmsProducts, panchangConfig } = useCMS();

  const [panchang, setPanchang] = useState<PanchangInfo | null>(null);
  const [activeMantra, setActiveMantra] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    m1: false,
    m2: true,
    m3: false,
    m4: true,
    m5: false,
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Live Panchang Auto-Loader & Daily Midnight Rollover Heartbeat
  useEffect(() => {
    let isMounted = true;
    function loadPanchang() {
      if (isMounted) {
        setPanchang(calculatePanchang(new Date()));
      }
    }
    loadPanchang();

    // Auto-check every 60 seconds for date changes (daily automatic rollover)
    const interval = setInterval(() => {
      const now = new Date();
      const currentDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      if (panchang && panchang.date !== currentDateStr) {
        loadPanchang();
      }
    }, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [panchangConfig?.defaultCity]);

  const handleMantraPlay = async (mantraId: string) => {
    if (activeMantra === mantraId && isPlaying) {
      pauseAudio();
      setActiveMantra(null);
    } else {
      setActiveMantra(mantraId);
      await playAudio();
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSuccess(false);
      }, 4000);
    }
  };

  // Popular Mantras List
  const popularMantras = [
    { id: 'm1', text: 'ॐ नमः शिवाय', meaning: 'Lord Shiva Panchakshari Mantra' },
    { id: 'm2', text: 'ॐ गं गणपतये नमः', meaning: 'Lord Ganesha Obstacle Remover Mantra' },
    { id: 'm3', text: 'ॐ नमो भगवते वासुदेवाय', meaning: 'Lord Vishnu Dwadasakshari Mantra' },
    { id: 'm4', text: 'ॐ श्रीं महालक्ष्म्यै नमः', meaning: 'Goddess Mahalakshmi Abundance Mantra' },
    { id: 'm5', text: 'ॐ ऐं सरस्वत्यै नमः', meaning: 'Goddess Saraswati Wisdom Mantra' },
  ];

  // Shop Categories
  const shopCategories = [
    { title: 'Spiritual Books', img: '/images/category_books.jpg', href: '/store?category=books' },
    { title: 'Puja Samagri', img: '/images/category_puja.jpg', href: '/store?category=puja' },
    { title: 'Rudraksha', img: '/images/category_rudraksha.jpg', href: '/store?category=rudraksha' },
    { title: 'Idols & Statues', img: '/images/category_idols.jpg', href: '/store?category=idols' },
    { title: 'Agarbatti & Dhoop', img: '/images/category_agarbatti.jpg', href: '/store?category=incense' },
    { title: 'Yantra', img: '/images/category_yantra.jpg', href: '/store?category=yantra' },
    { title: 'Spiritual Accessories', img: '/images/category_accessories.jpg', href: '/store?category=accessories' },
  ];

  // Latest Articles
  const latestArticles = [
    {
      id: 'a1',
      title: 'Meditation: The Path to Inner Peace',
      date: '12 September 2026',
      img: '/images/article_meditation.jpg',
      slug: 'benefits-of-daily-mantra-meditation',
    },
    {
      id: 'a2',
      title: 'Significance of Ekadashi Vrat',
      date: '10 September 2026',
      img: '/images/article_ekadashi.jpg',
      slug: 'significance-of-ekadashi-vrat',
    },
    {
      id: 'a3',
      title: 'Life Lessons from Bhagavad Gita',
      date: '08 September 2026',
      img: '/images/article_gita_lessons.jpg',
      slug: 'life-lessons-from-bhagavad-gita',
    },
  ];

  // Dynamic Live Date values for Panchang Card (auto-updates daily)
  const today = new Date();
  const HINDI_MONTHS = [
    'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर',
  ];
  const HINDI_DAYS = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const dateNumber = panchang?.dayNumber || String(today.getDate());
  const monthYear = panchang?.monthYear || `${HINDI_MONTHS[today.getMonth()]} ${today.getFullYear()}`;
  const dayOfWeek = panchang?.dayOfWeekHi || HINDI_DAYS[today.getDay()];

  // Dynamic CMS Block controls
  const heroBlock = blocks?.find((b) => b.type === 'hero');
  const heroData = heroBlock?.data || {};
  const isHeroEnabled = heroBlock ? heroBlock.enabled : true;

  const quickCategoriesBlock = blocks?.find((b) => b.type === 'quick_categories');
  const isQuickCategoriesEnabled = quickCategoriesBlock ? quickCategoriesBlock.enabled : true;

  const panchangGitaBlock = blocks?.find((b) => b.type === 'panchang_gita');
  const isPanchangGitaEnabled = panchangGitaBlock ? panchangGitaBlock.enabled : true;

  const shopCategoriesBlock = blocks?.find((b) => b.type === 'shop_categories');
  const isShopCategoriesEnabled = shopCategoriesBlock ? shopCategoriesBlock.enabled : true;

  const featuredProductsBlock = blocks?.find((b) => b.type === 'featured_products');
  const isFeaturedProductsEnabled = featuredProductsBlock ? featuredProductsBlock.enabled : true;

  const articlesMantrasBlock = blocks?.find((b) => b.type === 'articles_mantras');
  const isArticlesMantrasEnabled = articlesMantrasBlock ? articlesMantrasBlock.enabled : true;

  const newsletterBlock = blocks?.find((b) => b.type === 'newsletter');
  const isNewsletterEnabled = newsletterBlock ? newsletterBlock.enabled : true;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans selection:bg-orange-500/20">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION WITH SHIVA, HIMALAYAS & STATS BAR
      ========================================================================= */}
      {isHeroEnabled && (
      <section className="relative overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_shiva.jpg"
            alt="Lord Shiva meditating in the sacred Himalayas"
            fill
            priority
            className="object-cover object-center sm:object-right"
          />
          {/* Subtle Warm Gradient Overlay for text contrast on left while keeping Shiva radiant on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20 md:via-black/50 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] via-transparent to-black/30" />
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-12 w-full">
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            
            {/* Sacred Tagline Verse */}
            <div className="inline-flex items-center space-x-2 text-[#f97316] font-serif font-bold text-sm sm:text-base tracking-wider drop-shadow-sm">
              <span>{heroData.sanskritVerse || '|| धर्मो रक्षति रक्षितः ||'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-md">
              {heroData.heading || (
                <>
                  Discover the Eternal{' '}
                  <span className="block mt-1">
                    Wisdom of <span className="text-[#f97316]">Sanatan Dharma</span>
                  </span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <div className="text-base sm:text-lg md:text-xl text-stone-200 font-serif space-y-1 drop-shadow">
              <p>{heroData.subtitle || 'Mantras • Knowledge • Puja Items • Sacred Books'}</p>
              <p className="font-semibold text-white">All in One Place</p>
            </div>

            {/* Hindi Spiritual Quote */}
            <p className="italic text-stone-300 font-serif text-sm sm:text-base border-l-2 border-[#f97316] pl-3 py-0.5 max-w-xl">
              {heroData.descriptionHi || '“ अपने धर्म, अपनी संस्कृति, अपने मूल्यों से जुड़ें, और जीवन को करें अधिक शांत, सुखी और सफल। ”'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <Link
                href={heroData.btn1Url || '/shlokas#mantras'}
                className="inline-flex items-center space-x-2 bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium text-sm sm:text-base px-6 py-3 rounded-lg shadow-lg shadow-orange-600/30 transition transform hover:-translate-y-0.5"
              >
                <span>{heroData.btn1Text || 'Explore Mantras'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/books"
                className="inline-flex items-center space-x-2 bg-white hover:bg-stone-100 text-[#b43b08] font-semibold text-sm sm:text-base px-6 py-3 rounded-lg border border-stone-200 shadow-md transition transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4 text-[#b43b08]" />
                <span>सम्पूर्ण ग्रंथ एवं पुस्तकें</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Top-Right Floating Devanagari Calligraphy over Shiva */}
        <div className="hidden lg:block absolute top-12 right-12 z-10 text-right pointer-events-none select-none">
          <span className="text-2xl xl:text-3xl font-serif text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] block font-bold tracking-wide">
            “ॐ नमः शिवाय”
          </span>
          <span className="text-xl xl:text-2xl font-serif text-amber-200/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] block tracking-widest mt-1 font-semibold">
            शिवोऽहम्
          </span>
        </div>

        {/* Bottom Floating Stats Row Bar */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 w-full">
          <div className="bg-white/95 dark:bg-[#1a1411]/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-stone-200/90 dark:border-stone-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-x-0 md:divide-x divide-stone-200 dark:divide-stone-800">
              
              {/* Stat 1: Mantras */}
              <div className="flex items-center space-x-3 px-2">
                <div className="w-11 h-11 rounded-full bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center shrink-0">
                  <span className="text-orange-600 font-bold text-lg font-serif">🎯</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white leading-none">
                    {heroData.stat1Number || '1000+'}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    {heroData.stat1Label || 'Mantras'}
                  </span>
                </div>
              </div>

              {/* Stat 2: Articles */}
              <div className="flex items-center space-x-3 px-2 md:pl-6">
                <div className="w-11 h-11 rounded-full bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center shrink-0">
                  <span className="text-amber-600 font-bold text-lg font-serif">📖</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white leading-none">
                    {heroData.stat2Number || '500+'}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    {heroData.stat2Label || 'Articles'}
                  </span>
                </div>
              </div>

              {/* Stat 3: Devotees */}
              <div className="flex items-center space-x-3 px-2 md:pl-6">
                <div className="w-11 h-11 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center shrink-0">
                  <span className="text-rose-600 font-bold text-lg font-serif">👥</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white leading-none">
                    {heroData.stat3Number || '50K+'}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    {heroData.stat3Label || 'Happy Devotees'}
                  </span>
                </div>
              </div>

              {/* Stat 4: User Rating / Puja Vidhis */}
              <div className="flex items-center space-x-3 px-2 md:pl-6">
                <div className="w-11 h-11 rounded-full bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-[#ea580c] fill-[#ea580c]" />
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white leading-none">
                    {heroData.stat4Number || '108+'}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    {heroData.stat4Label || 'Puja Vidhis'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 2: TODAY'S PANCHANG + BHAGAVAD GITA SHLOKA
      ========================================================================= */}
      {isPanchangGitaEnabled && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 sm:pt-10 sm:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: आज का पावन पंचांग */}
          <div className="bg-gradient-to-br from-[#fcf7ed] via-[#f7efe0] to-[#ecd9be] border border-[#e5d2b3] rounded-3xl p-6 sm:p-7 shadow-sm relative overflow-hidden flex flex-col justify-between">
            {/* Subtle Temple Background Watermark */}
            <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none w-64 h-64">
              <span className="text-9xl font-serif select-none text-amber-900">ॐ</span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#854d0e] mb-5 flex items-center space-x-2">
                <span>आज का पावन पंचांग</span>
              </h2>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                {/* Big Date Card */}
                <div className="w-full sm:w-36 bg-white/95 dark:bg-[#1a1411]/90 rounded-2xl p-4 text-center border border-[#dfcaa7] shadow-sm shrink-0">
                  <span className="block text-4xl sm:text-5xl font-bold font-serif text-[#1c1917] dark:text-white leading-none">
                    {dateNumber}
                  </span>
                  <span className="block text-xs sm:text-sm font-serif font-semibold text-stone-600 dark:text-stone-300 mt-1">
                    {monthYear}
                  </span>
                  <span className="block text-xs font-serif text-amber-700 dark:text-amber-400 font-bold mt-0.5">
                    {dayOfWeek}
                  </span>
                </div>

                {/* Panchang Astrological Data Points */}
                <div className="space-y-2 text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-serif flex-1 w-full">
                  <div className="flex items-center justify-between sm:justify-start sm:space-x-4 border-b border-amber-200/60 pb-1.5">
                    <span className="text-stone-600 dark:text-stone-400 font-semibold flex items-center space-x-1.5 w-24">
                      <span>📅 तिथि</span>
                    </span>
                    <span className="font-bold text-stone-900 dark:text-white">
                      {panchangConfig?.tithiOverride || (panchang ? `${panchang.paksha.hi} ${panchang.tithiName.hi}` : 'शुक्ल पक्ष तृतीया (सु. 7:08 AM के बाद)')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start sm:space-x-4 border-b border-amber-200/60 pb-1.5">
                    <span className="text-stone-600 dark:text-stone-400 font-semibold flex items-center space-x-1.5 w-24">
                      <span>🕉️ नक्षत्र</span>
                    </span>
                    <span className="font-bold text-stone-900 dark:text-white">
                      {panchangConfig?.nakshatraOverride || (panchang?.nakshatra?.hi ? panchang.nakshatra.hi : 'चित्रा (दोपहर बाद)')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start sm:space-x-4 border-b border-amber-200/60 pb-1.5">
                    <span className="text-stone-600 dark:text-stone-400 font-semibold flex items-center space-x-1.5 w-24">
                      <span>🏵️ योग</span>
                    </span>
                    <span className="font-bold text-stone-900 dark:text-white">
                      {panchangConfig?.yogaOverride || (panchang?.yoga?.hi ? panchang.yoga.hi : 'शुभ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start sm:space-x-4 border-b border-amber-200/60 pb-1.5">
                    <span className="text-stone-600 dark:text-stone-400 font-semibold flex items-center space-x-1.5 w-24">
                      <span>📿 करण</span>
                    </span>
                    <span className="font-bold text-stone-900 dark:text-white">
                      {panchangConfig?.karanaOverride || (panchang?.karana?.hi ? panchang.karana.hi : 'तैतिल')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start sm:space-x-4 pt-0.5">
                    <span className="text-stone-600 dark:text-stone-400 font-semibold flex items-center space-x-1.5 w-24">
                      <span>☀️ सूर्योदय</span>
                    </span>
                    <span className="font-bold text-stone-900 dark:text-white">
                      {panchangConfig?.sunriseOverride || panchang?.sunrise || '06:02 AM'}
                    </span>
                    <span className="text-stone-400 px-2">|</span>
                    <span className="text-stone-600 dark:text-stone-400 font-semibold">🌅 सूर्यास्त:</span>
                    <span className="font-bold text-stone-900 dark:text-white">
                      {panchangConfig?.sunsetOverride || panchang?.sunset || '06:23 PM'}
                    </span>
                  </div>

                  {/* Special Vrat / Festival Alert if present */}
                  {(panchangConfig?.specialMessage || panchang?.vrat?.hi) && (
                    <div className="mt-2.5 pt-1 text-[11px] text-amber-900 font-serif flex items-center space-x-1.5 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      <span className="text-amber-700">🚩</span>
                      <span className="font-semibold">{panchangConfig?.specialMessage || panchang?.vrat?.hi}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-2">
              <Link
                href="/calendar"
                className="inline-flex items-center space-x-1.5 bg-[#854d0e] hover:bg-[#713f12] text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-md transition"
              >
                <span>View Full Panchang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Bhagavad Gita Sacred Shloka Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-sm border border-stone-200 flex flex-col justify-between min-h-[320px] p-6 sm:p-7">
            {/* Background Krishna Arjuna Chariot Painting */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/gita_krishna.jpg"
                alt="Lord Krishna and Arjuna on the chariot in Kurukshetra"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
            </div>

            <div className="relative z-10 max-w-md space-y-4">
              <blockquote className="text-2xl sm:text-3xl font-serif text-white font-bold leading-relaxed drop-shadow-md">
                {panchangGitaBlock?.data?.gitaSanskrit || (
                  <>“कर्मण्येवाधिकारस्ते<br />मा फलेषु कदाचन ।”</>
                )}
              </blockquote>
              <span className="text-amber-300 font-serif text-sm sm:text-base font-semibold block drop-shadow">
                — श्रीमद्भगवद्गीता ({panchangGitaBlock?.data?.gitaVerseNumber || '2.47'})
              </span>
            </div>

            <div className="relative z-10 mt-6">
              <Link
                href="/scriptures/bhagavad-gita"
                className="inline-flex items-center space-x-2 bg-[#9a3412] hover:bg-[#7c2d12] text-white px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-lg transition transform hover:-translate-y-0.5"
              >
                <span>Read Bhagavad Gita</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 3: LIVE FESTIVAL TODAY (पावन महापर्व एवं लाइव दर्शन/आरती)
      ========================================================================= */}
      <LiveFestival />


      {/* =========================================================================
          SECTION 4: SACRED SCRIPTURES & BOOKS (पवित्र आध्यात्मिक ग्रंथ संग्रह)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
              पवित्र आध्यात्मिक ग्रंथ संग्रह
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-serif mt-1">
              वेदों, उपनिषदों, श्रीमद्भगवद्गीता और रामायण का प्रामाणिक संकलन
            </p>
          </div>
          <Link
            href="/books"
            className="text-xs sm:text-sm font-semibold text-[#b43b08] hover:text-[#9a3412] flex items-center space-x-1 font-serif"
          >
            <span>सभी ग्रंथ देखें</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { title: 'श्रीमद्भगवद्गीता', href: '/scriptures/bhagavad-gita', emblem: '🕉️', count: '१८ अध्याय' },
            { title: 'श्रीरामचरितमानस', href: '/scriptures/ramcharitmanas', emblem: '🏹', count: '७ काण्ड' },
            { title: 'ईशावास्योपनिषद्', href: '/scriptures/isha-upanishad', emblem: '✨', count: '१८ मंत्र' },
            { title: 'कठोपनिषद्', href: '/scriptures/katha-upanishad', emblem: '🔥', count: '६ वल्लियाँ' },
            { title: 'ऋग्वेद संहिता', href: '/scriptures/rigveda-samhita', emblem: '☀️', count: '१० मण्डल' },
            { title: 'सम्पूर्ण आरतियां', href: '/aartis', emblem: '🪔', count: '८ प्रमुख आरती' },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-[#fffdf9] dark:bg-[#1a1411] border border-amber-500/30 hover:border-amber-500 rounded-2xl p-4 text-center group hover:shadow-lg hover:shadow-amber-500/10 transition flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition">
                {item.emblem}
              </div>
              <div>
                <span className="text-xs sm:text-sm font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#ea580c] transition block">
                  {item.title}
                </span>
                <span className="text-[11px] text-stone-500 font-serif mt-0.5 block">
                  {item.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TWO-COLUMN SPLIT (LATEST ARTICLES + POPULAR MANTRAS)
      ========================================================================= */}
      {isArticlesMantrasEnabled && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Latest Articles (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Latest Articles
              </h2>
              <Link
                href="/articles"
                className="text-xs sm:text-sm font-semibold text-[#b43b08] hover:text-[#9a3412] flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {latestArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/articles/${art.slug}`}
                  className="bg-white dark:bg-[#1a1411] rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-md transition group flex flex-col justify-between"
                >
                  <div className="w-full h-36 relative overflow-hidden bg-stone-100">
                    <Image
                      src={art.img}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 group-hover:text-[#ea580c] transition leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-100 dark:border-stone-800/80">
                      <span>{art.date}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Popular Mantras (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Popular Mantras
              </h2>
              <Link
                href="/shlokas#mantras"
                className="text-xs sm:text-sm font-semibold text-[#b43b08] hover:text-[#9a3412] flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {popularMantras.map((m) => {
                const isCurrentlyPlaying = activeMantra === m.id && isPlaying;
                const isFav = favorites[m.id];

                return (
                  <div
                    key={m.id}
                    className="bg-white dark:bg-[#1a1411] border border-stone-200/90 dark:border-stone-800 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm hover:border-orange-300 transition"
                  >
                    <div className="flex items-center space-x-3">
                      {/* Round Audio Play / Pause Button */}
                      <button
                        onClick={() => handleMantraPlay(m.id)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition ${
                          isCurrentlyPlaying
                            ? 'bg-[#ea580c] text-white shadow-md shadow-orange-500/30'
                            : 'bg-[#fff7ed] text-[#b43b08] hover:bg-[#ffedd5]'
                        }`}
                        title={isCurrentlyPlaying ? 'Pause Mantra' : 'Chant Mantra'}
                      >
                        {isCurrentlyPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>

                      {/* Mantra Devanagari Title */}
                      <div>
                        <span className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 block leading-tight">
                          {m.text}
                        </span>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400 font-sans">
                          {m.meaning}
                        </span>
                      </div>
                    </div>

                    {/* Wishlist Heart Icon */}
                    <button
                      onClick={() => toggleFavorite(m.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-500 transition"
                      title="Add to sacred favorites"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFav ? 'text-rose-500 fill-rose-500' : 'text-stone-400'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
      )}

      {/* =========================================================================
          SECTION 6: NEWSLETTER / COMMUNITY BANNER
      ========================================================================= */}
      {isNewsletterEnabled && (
      <section id="community" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[220px] sm:min-h-[260px] flex items-center">
          
          {/* Background Image: Varanasi Holy River Ghats Sunrise */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/community_banner.jpg"
              alt="Sacred Varanasi temple ghats on the river at golden sunrise"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/75" />
          </div>

          <div className="relative z-10 w-full p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left/Center Text & Input Box */}
            <div className="text-center lg:text-left space-y-3 max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight drop-shadow-md">
                {newsletterBlock?.data?.title || 'Join Our Spiritual Community'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 font-serif">
                {newsletterBlock?.data?.subtitle || 'Get daily mantras, festival updates, spiritual articles and exclusive offers.'}
              </p>

              {/* Email Form */}
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-2 pt-2"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full sm:w-80 bg-white/95 text-stone-900 text-xs sm:text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#ea580c] shadow-inner"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#b43b08] hover:bg-[#9a3412] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg shadow-md transition shrink-0"
                >
                  Subscribe
                </button>
              </form>

              {newsletterSuccess && (
                <div className="flex items-center space-x-1.5 text-xs text-emerald-300 font-medium animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>धन्यवाद! आप हमारे सनातन परिवार से जुड़ चुके हैं।</span>
                </div>
              )}
            </div>

            {/* Right Side Sacred Calligraphy Banner */}
            <div className="text-center lg:text-right hidden sm:block shrink-0 select-none">
              <div className="border border-amber-400/40 rounded-2xl p-4 sm:p-5 bg-black/40 backdrop-blur-sm">
                <span className="text-2xl sm:text-3xl font-serif text-amber-200 font-bold block leading-relaxed tracking-wide drop-shadow">
                  सनातन संस्कृति
                </span>
                <span className="text-xl sm:text-2xl font-serif text-white font-bold block leading-tight tracking-wider drop-shadow">
                  हमारी पहचान
                </span>
                <span className="text-xs text-amber-400/90 font-serif block mt-1 tracking-widest">
                  ॥ धर्मो रक्षति रक्षितः ॥
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
      )}

      {/* Schema.org FAQPage & ItemList Structured Data for Google First Page Search Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'सनातन रूप (SanatanRoop) क्या है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'सनातन रूप एक सम्पूर्ण डिजिटल सनातन धर्म मंच है, जहाँ प्रामाणिक वेद, उपनिषद, श्रीमद्भगवद्गीता, नित्य पंचांग, शुभ मुहूर्त, पावन आरती संग्रह, व्रत कथाएं और आध्यात्मिक वीडियो हिंदी अर्थ सहित नि:शुल्क उपलब्ध हैं।',
                },
              },
              {
                '@type': 'Question',
                name: 'आज का पंचांग और शुभ मुहूर्त कैसे देखें?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'सनातन रूप के पंचांग अनुभाग में आप प्रतिदिन का शुद्ध वैदिक पंचांग, तिथि, नक्षत्र, योग, करण, सूर्योदय-सूर्यास्त समय, राहुकाल और अभिजीत मुहूर्त वाराणसी एवं अन्य प्रमुख नगरों के अनुसार देख सकते हैं।',
                },
              },
              {
                '@type': 'Question',
                name: 'श्रीमद्भगवद्गीता का अध्ययन कैसे करें?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'सनातन रूप पर श्रीमद्भगवद्गीता के सभी १८ अध्यायों के ७०० श्लोक संस्कृत मूल पाठ, पदच्छेद, अन्वय और सरल हिंदी अनुवाद के साथ डिजिटल रूप में उपलब्ध हैं, जिन्हें आप किसी भी अध्याय अनुसार पढ़ सकते हैं।',
                },
              },
              {
                '@type': 'Question',
                name: 'दैनिक पूजा में आरती और मन्त्र जप का क्या महत्व है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'शास्त्रों के अनुसार नित्य आरती और मन्त्र जप से मन के विकार दूर होते हैं, सकारात्मक ऊर्जा का संचार होता है और परिवार में सुख, शांति एवं समृद्धि की वृद्धि होती है।',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
