'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useCMS } from '@/context/CMSContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { Play, X, Clock, Eye, Sparkles, Film, CheckCircle2 } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  img: string;
  youtubeId: string;
  description: string;
}

const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'v-featured',
    title: 'Power of Om Mantra: Sacred Cosmic Sound (432Hz Meditation)',
    category: 'Mantras',
    duration: '15:20',
    views: '1.2M',
    img: '/images/hero_shiva.jpg',
    youtubeId: 'SBiwLibZqfw',
    description: 'Immerse in the primordial cosmic vibration of ॐ (AUM), tuned to 432Hz for deep nervous system calming and higher spiritual awareness.',
  },
  {
    id: 'v-1',
    title: 'Shri Hanuman Chalisa: Authentic Vedic Recitation by Hariharan',
    category: 'Mantras',
    duration: '09:48',
    views: '3.4B',
    img: '/images/article_gita_lessons.jpg',
    youtubeId: 'AETFvQonfV8',
    description: 'The world’s most listened-to rendition of Goswami Tulsidas’s 40 chaupais dedicated to Lord Hanuman.',
  },
  {
    id: 'v-2',
    title: 'Shiv Tandav Stotram with Sanskrit Subtitles: Shankar Mahadevan',
    category: 'Mantras',
    duration: '09:14',
    views: '240M',
    img: '/images/category_puja.jpg',
    youtubeId: 'KRhcTPKdmrk',
    description: 'Ravana’s ecstatic Sanskrit hymn extolling the cosmic dance, matted locks, and supreme prowess of Lord Shiva.',
  },
  {
    id: 'v-3',
    title: 'Aigiri Nandini • Mahishasura Mardini Stotram (Devi Stuti)',
    category: 'Bhajans',
    duration: '11:20',
    views: '85M',
    img: '/images/community_banner.jpg',
    youtubeId: '442ewPgXHQ0',
    description: 'Adi Shankaracharya’s rhythmic masterpiece celebrating the victory of the Divine Mother over inner ignorance and demonic forces.',
  },
  {
    id: 'v-4',
    title: 'Bhagavad Gita Wisdom: Overcoming Anxiety through Karma Yoga',
    category: 'Discourses',
    duration: '24:15',
    views: '450k',
    img: '/images/gita_krishna.jpg',
    youtubeId: 'FRTpI2Gu1KA',
    description: 'A profound philosophical discourse on how Lord Krishna’s teachings in Chapter 2 dissolve stress, anxiety, and fear of failure.',
  },
  {
    id: 'v-5',
    title: 'Maha Mrityunjaya Mantra 108 Times with Meaning',
    category: 'Mantras',
    duration: '32:10',
    views: '920k',
    img: '/images/article_meditation.jpg',
    youtubeId: 'q1uj3_rW7Uc',
    description: 'Rigvedic life-giving healing mantra for health, longevity, and liberation from mortal fears.',
  },
  {
    id: 'v-6',
    title: 'Achyutam Keshavam Rama Narayanam • Divine Krishna Bhajan',
    category: 'Bhajans',
    duration: '06:40',
    views: '15M',
    img: '/images/category_idols.jpg',
    youtubeId: 'pzzPowh241o',
    description: 'A sweet devotional melody celebrating the thousand divine names and loving presence of Lord Krishna.',
  },
  {
    id: 'v-7',
    title: 'The Story of Raja Harishchandra: Unwavering Truth & Dharma',
    category: 'Stories',
    duration: '18:50',
    views: '310k',
    img: '/images/temple_river_sunrise_1789306575821.jpg',
    youtubeId: 'qMAzUxWSPpc',
    description: 'The inspiring Pauranik legend of King Harishchandra demonstrating that adherence to Satya (Truth) triumphs over all adversity.',
  },
  {
    id: 'v-8',
    title: 'Vedic Guided Meditation for Inner Peace & Mind Stillness',
    category: 'Guided Meditation',
    duration: '20:00',
    views: '680k',
    img: '/images/category_rudraksha.jpg',
    youtubeId: '_XQCr5h81vI',
    description: 'A gentle step-by-step Dhyana session guiding awareness from breath observation to the sacred stillness of the Supreme Self.',
  },
];

export default function VideosPage() {
  const { locale } = useLanguage();
  const { videos: cmsVideos } = useCMS();
  const videosList = cmsVideos && cmsVideos.length > 0 ? cmsVideos : VIDEOS_DATA;
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const categories = useMemo(() => [
    { id: 'All', label: locale === 'en' ? 'All' : locale === 'sa' ? 'सर्वाणि' : 'सभी (All)' },
    { id: 'Mantras', label: locale === 'en' ? 'Mantras' : locale === 'sa' ? 'मन्त्राः' : 'मन्त्र (Mantras)' },
    { id: 'Discourses', label: locale === 'en' ? 'Discourses' : locale === 'sa' ? 'प्रवचनानि' : 'प्रवचन (Discourses)' },
    { id: 'Bhajans', label: locale === 'en' ? 'Bhajans' : locale === 'sa' ? 'भजनानि' : 'भजन (Bhajans)' },
    { id: 'Stories', label: locale === 'en' ? 'Stories' : locale === 'sa' ? 'कथाः' : 'कथाएं (Stories)' },
    { id: 'Guided Meditation', label: locale === 'en' ? 'Guided Meditation' : locale === 'sa' ? 'ध्यानम्' : 'ध्यान (Meditation)' },
  ], [locale]);

  const filteredVideos = videosList.filter((vid) => {
    if (activeCategory === 'All') return true;
    return vid.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const featuredVideo = videosList[0] || VIDEOS_DATA[0];

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] text-stone-900 dark:text-stone-100 font-sans pb-24">
      
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-[#241711] via-[#2f1b12] to-[#120d0a] text-amber-50 pt-14 pb-18 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-900/40">
        <div className="max-w-4xl mx-auto text-center space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Film className="w-3.5 h-3.5" />
            <span>सनातन दृश्य दर्शन • Sacred Video Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 tracking-tight">
            Spiritual Videos &amp; Discourses
          </h1>
          <p className="text-sm sm:text-base text-amber-200/80 font-serif max-w-xl mx-auto leading-relaxed">
            Watch authenticated Vedic mantra chants, classical discourses, sacred bhajans, and guided spiritual practices.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Featured Video */}
      {activeCategory === 'All' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 rounded-3xl overflow-hidden shadow-md">
            <div
              className="relative w-full h-72 sm:h-96 lg:h-[460px] bg-stone-900 flex items-center justify-center group cursor-pointer"
              onClick={() => setActiveVideo(featuredVideo)}
            >
              <Image
                src={featuredVideo.img}
                alt={featuredVideo.title}
                fill
                priority
                className="object-cover opacity-80 group-hover:opacity-90 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Big Play Button in Center */}
              <div className="w-20 h-20 rounded-full bg-amber-600/95 text-white flex items-center justify-center shadow-2xl transition transform group-hover:scale-110 group-hover:bg-amber-500">
                <Play className="w-8 h-8 ml-1 fill-current" />
              </div>

              {/* Bottom Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3 py-1 rounded-full bg-amber-600 text-xs font-bold uppercase tracking-wider">
                  Featured Meditation
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md">
                  {featuredVideo.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-200 font-serif max-w-2xl line-clamp-2">
                  {featuredVideo.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Video Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-6">
          {activeCategory === 'All' ? 'Popular Spiritual Videos' : `${activeCategory} Videos`}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-amber-200/80 dark:border-stone-800 shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col justify-between"
            >
              <div className="w-full h-44 relative bg-stone-900 overflow-hidden">
                <Image
                  src={vid.img}
                  alt={vid.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-600/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-amber-500 transition">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>

                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono">
                  {vid.duration}
                </span>

                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-amber-300 text-[10px] font-semibold">
                  {vid.category}
                </span>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition line-clamp-2 leading-snug">
                    {vid.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 font-serif line-clamp-2 mt-1">
                    {vid.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{vid.views} views</span>
                  </span>
                  <span className="text-amber-600 font-bold flex items-center space-x-0.5">
                    <span>Play Now</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-950 rounded-3xl border border-amber-500/40 shadow-2xl max-w-4xl w-full overflow-hidden animate-in fade-in zoom-in duration-200 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-amber-600 flex items-center justify-center transition"
              title="Close Video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Embedded YouTube Player */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {/* Video Details Bar */}
            <div className="p-6 bg-[#16100c] text-stone-200 space-y-2 border-t border-stone-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-600/30 text-amber-300 text-xs font-semibold">
                    {activeVideo.category}
                  </span>
                  <span className="text-xs text-stone-400">• {activeVideo.duration} • {activeVideo.views} views</span>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold shadow-sm transition"
                  title="Open video in YouTube app"
                >
                  <span>▶ YouTube ऐप में देखें</span>
                </a>
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                {activeVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-serif leading-relaxed">
                {activeVideo.description}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Schema.org VideoObject and ItemList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'सनातन दृश्य दर्शन - SanatanRoop Spiritual Video Gallery',
            description:
              'प्रामाणिक वैदिक मन्त्र जप, शास्त्रीय प्रवचन, पावन भजन एवं निर्देशित ध्यान अभ्यास वीडियो।',
            url: 'https://sanatanroop.com/videos',
            itemListElement: VIDEOS_DATA.map((vid, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              item: {
                '@type': 'VideoObject',
                name: vid.title,
                description: vid.description,
                thumbnailUrl: [
                  `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`,
                  `https://sanatanroop.com${vid.img}`,
                ],
                uploadDate: '2026-08-01T08:00:00+05:30',
                duration: `PT${vid.duration.replace(':', 'M')}S`,
                embedUrl: `https://www.youtube-nocookie.com/embed/${vid.youtubeId}`,
                publisher: {
                  '@type': 'Organization',
                  name: 'SanatanRoop',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://sanatanroop.com/icons/icon-512x512.png',
                  },
                },
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'मुख्य पृष्ठ (Home)',
                item: 'https://sanatanroop.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'आध्यात्मिक वीडियो (Videos)',
                item: 'https://sanatanroop.com/videos',
              },
            ],
          }),
        }}
      />
    </div>
  );
}
