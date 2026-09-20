'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { Search, ArrowRight, Calendar } from 'lucide-react';

export default function ArticlesPage() {
  const { locale, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const categories = [
    'All',
    'Spirituality',
    'Festivals',
    'Vrat & Upwas',
    'Scriptures',
    'Lifestyle',
  ];

  const articles = [
    {
      id: 'a1',
      title: 'Meditation: The Path to Inner Peace',
      date: '13 September 2026',
      category: 'Spirituality',
      slug: 'four-purusharthas',
      img: '/images/article_meditation.jpg',
    },
    {
      id: 'a2',
      title: 'Significance of Ekadashi Vrat',
      date: '11 September 2026',
      category: 'Vrat & Upwas',
      slug: 'four-purusharthas',
      img: '/images/article_ekadashi.jpg',
    },
    {
      id: 'a3',
      title: 'Life Lessons from Bhagavad Gita',
      date: '08 September 2026',
      category: 'Scriptures',
      slug: 'four-purusharthas',
      img: '/images/article_gita_lessons.jpg',
    },
    {
      id: 'a4',
      title: 'Benefits of Chanting Gayatri Mantra',
      date: '05 September 2026',
      category: 'Spirituality',
      slug: 'four-purusharthas',
      img: '/images/article_meditation.jpg',
    },
    {
      id: 'a5',
      title: 'Story of Lord Ganesha: Wisdom & Devotion',
      date: '02 September 2026',
      category: 'Festivals',
      slug: 'four-purusharthas',
      img: '/images/category_idols.jpg',
    },
    {
      id: 'a6',
      title: 'Navratri: Nine Forms of Divine Feminine',
      date: '01 September 2026',
      category: 'Festivals',
      slug: 'four-purusharthas',
      img: '/images/category_puja.jpg',
    },
    {
      id: 'a7',
      title: 'Importance of Rudraksha & Sacred Malas',
      date: '28 August 2026',
      category: 'Lifestyle',
      slug: 'four-purusharthas',
      img: '/images/category_rudraksha.jpg',
    },
    {
      id: 'a8',
      title: 'How to do Daily Vedic Puja at Home',
      date: '25 August 2026',
      category: 'Lifestyle',
      slug: 'four-purusharthas',
      img: '/images/category_puja.jpg',
    },
    {
      id: 'a9',
      title: 'Power of Hanuman Chalisa Chanting',
      date: '20 August 2026',
      category: 'Scriptures',
      slug: 'four-purusharthas',
      img: '/images/article_gita_lessons.jpg',
    },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      activeCategory === 'All' || art.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans pb-16">
      
      {/* =========================================================================
          HERO BANNER: SPIRITUAL ARTICLES
      ========================================================================= */}
      <section className="bg-gradient-to-r from-[#241711] via-[#3a2217] to-[#241711] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#4d3224]">
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-wide">
            Spiritual Articles
          </h1>
          <p className="text-sm sm:text-base text-amber-200/90 font-serif">
            Knowledge for a Meaningful Life
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-lg mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-white/95 text-stone-900 placeholder-stone-400 text-sm rounded-full py-2.5 pl-5 pr-11 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md"
            />
            <Search className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          CATEGORY FILTER TABS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                activeCategory === cat
                  ? 'bg-[#ea580c] text-white shadow-sm'
                  : 'bg-white dark:bg-[#1a1411] border border-stone-200/90 text-stone-700 dark:text-stone-300 hover:border-orange-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================================
          ARTICLE CARDS GRID (3 COLUMNS)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(0, visibleCount).map((art) => (
            <Link
              key={art.id}
              href={`/articles/${art.slug}`}
              className="bg-white dark:bg-[#1a1411] rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-md transition group flex flex-col justify-between"
            >
              <div className="w-full h-48 relative overflow-hidden bg-stone-100">
                <Image
                  src={art.img}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                  {art.category}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100 group-hover:text-[#ea580c] transition leading-snug">
                  {art.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{art.date}</span>
                  </span>
                  <span className="text-[#ea580c] font-semibold flex items-center space-x-0.5 group-hover:translate-x-0.5 transition">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredArticles.length && (
          <div className="text-center pt-10">
            <button
              onClick={() => setVisibleCount((c) => c + 3)}
              className="px-8 py-3 rounded-lg border border-stone-300 dark:border-stone-700 font-semibold text-xs text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition shadow-sm"
            >
              Load More Articles
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
