'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Sparkles,
  BookOpen,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogPosts';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const categories = [
    'All',
    'Vedic Philosophy',
    'Mantras & Sadhana',
    'Vrat & Festivals',
    'Daily Lifestyle',
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      activeCategory === 'All' || post.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] text-stone-900 dark:text-stone-100 font-sans pb-20">
      
      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#241711] via-[#2f1b12] to-[#120d0a] text-amber-50 pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-900/40">
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>सनातन ज्ञान वाटिका • Vedic Editorial</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 tracking-tight">
            Sanatan Roop Spiritual Blog
          </h1>

          <p className="text-sm sm:text-base text-amber-200/80 font-serif max-w-2xl mx-auto leading-relaxed">
            In-depth research, shastric commentaries, festival guidelines, and practical Vedic philosophy curated by Founder <strong>Shubham Tiwari</strong> and traditional scholars.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spiritual articles, mantras, vrat vidhi..."
              className="w-full bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-sm rounded-full py-3.5 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg border border-amber-300/40"
            />
            <Search className="w-5 h-5 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-12">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-amber-200/70 dark:border-stone-800 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-amber-600 hover:bg-amber-50/50 dark:hover:bg-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Editorial Post */}
        {activeCategory === 'All' && !searchQuery && (
          <div className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-amber-200/80 dark:border-stone-800 shadow-sm hover:shadow-md transition">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[320px]">
                <Image
                  src={featuredPost.img}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-bold shadow">
                  Featured Editorial
                </span>
              </div>
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-amber-700 dark:text-amber-400 font-semibold uppercase tracking-wider">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{featuredPost.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-amber-600 transition">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-serif font-bold text-xs flex items-center justify-center">
                      ST
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900 dark:text-stone-200">
                        {featuredPost.author}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        {featuredPost.authorRole} • {featuredPost.date}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              {activeCategory === 'All' ? 'Latest Publications' : `${activeCategory} Articles`}
            </h3>
            <span className="text-xs text-stone-500">
              Showing {filteredPosts.slice(0, visibleCount).length} of {filteredPosts.length} articles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(0, visibleCount).map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-amber-200/70 dark:border-stone-800 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-48 relative overflow-hidden bg-stone-100">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center space-x-2 text-[11px] text-stone-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 font-bold text-[10px] flex items-center justify-center">
                        ST
                      </div>
                      <span className="text-xs text-stone-700 dark:text-stone-300 font-medium">
                        {post.author}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center space-x-1 group-hover:translate-x-0.5 transition"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filteredPosts.length && (
            <div className="text-center pt-6">
              <button
                onClick={() => setVisibleCount((c) => c + 3)}
                className="px-8 py-3 rounded-xl border border-amber-300 dark:border-stone-700 font-bold text-xs text-stone-800 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 transition shadow-sm"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>

        {/* Editorial Trust Box for AdSense */}
        <section className="p-8 rounded-3xl bg-amber-50 dark:bg-stone-800/80 border border-amber-200/80 dark:border-stone-700 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center justify-center md:justify-start space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Authentic Vedic Scholarship</span>
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Every article references primary Sanskrit texts including the Vedas, Upanishads, and classical Darshanas.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center justify-center md:justify-start space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Founder &amp; Editorial Integrity</span>
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Published under the editorial direction of <strong>Shubham Tiwari</strong>, adhering to rigorous fact-checking and cultural fidelity.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center justify-center md:justify-start space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Free &amp; Open Spiritual Access</span>
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              All sacred teachings, mantras, and panchang commentaries are offered freely to devotees worldwide.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
