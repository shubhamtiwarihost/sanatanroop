'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Clock, Eye, Sparkles } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export default function VideosPage() {
  const { isPlaying, playAudio, pauseAudio } = useAudio();
  const [activeCategory, setActiveCategory] = useState('Mantras');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const categories = ['Mantras', 'Discourses', 'Bhajans', 'Stories', 'Guided Meditation'];

  const featuredVideo = {
    id: 'v-featured',
    title: 'Power of Om Mantra: Sacred Cosmic Sound',
    duration: '15:20',
    views: '45k',
    img: '/images/hero_shiva.jpg',
  };

  const videoList = [
    {
      id: 'v-1',
      title: 'Hanuman Chalisa: Authentic Vedic Recitation',
      duration: '11:45',
      views: '82k',
      img: '/images/article_gita_lessons.jpg',
    },
    {
      id: 'v-2',
      title: 'Shiv Tandav Stotram with Sanskrit Subtitles',
      duration: '09:30',
      views: '120k',
      img: '/images/category_puja.jpg',
    },
    {
      id: 'v-3',
      title: 'Devi Stuti & Navratri Sacred Bhajans',
      duration: '18:10',
      views: '34k',
      img: '/images/community_banner.jpg',
    },
    {
      id: 'v-4',
      title: 'Gita Wisdom: Overcoming Anxiety through Karma Yoga',
      duration: '22:05',
      views: '65k',
      img: '/images/gita_krishna.jpg',
    },
  ];

  const handleTogglePlay = async (id: string) => {
    if (playingVideoId === id && isPlaying) {
      pauseAudio();
      setPlayingVideoId(null);
    } else {
      setPlayingVideoId(id);
      await playAudio();
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans pb-16">
      
      {/* =========================================================================
          HERO BANNER: SPIRITUAL VIDEOS
      ========================================================================= */}
      <section className="bg-gradient-to-r from-[#241711] via-[#3a2217] to-[#241711] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#4d3224]">
        <div className="max-w-4xl mx-auto text-center space-y-3 relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-wide">
            Spiritual Videos
          </h1>
          <p className="text-sm sm:text-base text-amber-200/90 font-serif">
            Watch, Learn and Grow
          </p>
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
          MAIN FEATURED LARGE VIDEO CARD
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white dark:bg-[#1a1411] border border-stone-200/90 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="relative w-full h-72 sm:h-96 lg:h-[450px] bg-stone-900 flex items-center justify-center group cursor-pointer"
               onClick={() => handleTogglePlay(featuredVideo.id)}>
            <Image
              src={featuredVideo.img}
              alt={featuredVideo.title}
              fill
              priority
              className="object-cover opacity-80 group-hover:opacity-90 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Big Play Button in Center */}
            <div className={`w-20 h-20 rounded-full bg-[#ea580c]/90 text-white flex items-center justify-center shadow-2xl transition transform group-hover:scale-110 ${
              playingVideoId === featuredVideo.id && isPlaying ? 'ring-4 ring-orange-400' : ''
            }`}>
              {playingVideoId === featuredVideo.id && isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </div>

            {/* Bottom Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="px-2.5 py-1 rounded bg-[#ea580c] text-[10px] font-bold uppercase tracking-wider">
                Featured Chanting
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md">
                {featuredVideo.title}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          GRID OF VIDEO CARDS (4 CARDS MATCHING REFERENCE IMAGE)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-6">
          Popular Spiritual Videos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoList.map((vid) => {
            const isThisPlaying = playingVideoId === vid.id && isPlaying;

            return (
              <div
                key={vid.id}
                onClick={() => handleTogglePlay(vid.id)}
                className="bg-white dark:bg-[#1a1411] rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
              >
                <div className="w-full h-44 relative bg-stone-900">
                  <Image
                    src={vid.img}
                    alt={vid.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-[#ea580c]/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
                      {isThisPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </div>
                  </div>

                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-[#ea580c] transition line-clamp-2">
                    {vid.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-[11px] text-stone-400">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{vid.views} views</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
