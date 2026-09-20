'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import { useAudio } from '@/context/AudioContext';
import {
  Search,
  Play,
  Pause,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
} from 'lucide-react';

interface DisplayMantra {
  id: string;
  sanskrit: string;
  titleEn: string;
  deity: string;
  tags: string[];
  meaning: string;
  audioUrl?: string;
  frequency?: string;
}

const DEFAULT_MANTRAS_LIST: DisplayMantra[] = [
  {
    id: 'm-1',
    sanskrit: 'ॐ नमः शिवाय',
    titleEn: 'Om Namah Shivaya',
    deity: 'Shiva',
    tags: ['Shiva', 'Peace', 'Spiritual Growth'],
    meaning: 'I bow to Lord Shiva, the auspicious, infinite consciousness within.',
  },
  {
    id: 'm-2',
    sanskrit: 'ॐ गं गणपतये नमः',
    titleEn: 'Om Gam Ganapataye Namah',
    deity: 'Ganesha',
    tags: ['Ganesha', 'Success', 'Remove Obstacles'],
    meaning: 'Salutations to Lord Ganesha, the remover of all obstacles and harbinger of wisdom.',
  },
  {
    id: 'm-3',
    sanskrit: 'ॐ नमो भगवते वासुदेवाय',
    titleEn: 'Om Namo Bhagavate Vasudevaya',
    deity: 'Vishnu',
    tags: ['Vishnu', 'Devotion', 'Inner Peace'],
    meaning: 'I offer my reverent obeisances to Lord Vasudeva, the all-pervading Supreme Being.',
  },
  {
    id: 'm-4',
    sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
    titleEn: 'Om Shreem Mahalakshmyai Namah',
    deity: 'Lakshmi',
    tags: ['Lakshmi', 'Wealth', 'Prosperity'],
    meaning: 'Salutations to the Supreme Goddess Mahalakshmi, the source of auspiciousness and spiritual abundance.',
  },
  {
    id: 'm-5',
    sanskrit: 'ॐ दुं दुर्गायै नमः',
    titleEn: 'Om Durgayai Namah',
    deity: 'Durga',
    tags: ['Durga', 'Protection', 'Strength'],
    meaning: 'Reverence to Goddess Durga, who protects her devotees from all inner and outer turmoil.',
  },
  {
    id: 'm-6',
    sanskrit: 'ॐ हनुमते नमः',
    titleEn: 'Om Hanumate Namah',
    deity: 'Hanuman',
    tags: ['Hanuman', 'Courage', 'Remove Fear'],
    meaning: 'Salutations to Lord Hanuman, the embodiment of selfless service, strength, and unwavering devotion.',
  },
  {
    id: 'm-7',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    titleEn: 'Gayatri Mantra',
    deity: 'Gayatri',
    tags: ['Gayatri', 'Wisdom', 'Illumination'],
    meaning: 'We meditate upon the radiant divine light of Savitur. May that illumine our intellect and guide our consciousness.',
  },
  {
    id: 'm-8',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥',
    titleEn: 'Maha Mrityunjaya Mantra',
    deity: 'Shiva',
    tags: ['Healing', 'Immortal Peace', 'Protection'],
    meaning: 'We worship the Three-Eyed Lord Shiva. May He liberate us from death for the sake of immortality.',
  },
  {
    id: 'm-9',
    sanskrit: 'ॐ ऐं सरस्वत्यै नमः',
    titleEn: 'Om Aim Saraswatyai Namah',
    deity: 'Saraswati',
    tags: ['Saraswati', 'Knowledge', 'Arts'],
    meaning: 'Salutations to Goddess Saraswati, the patroness of divine knowledge, speech, and sacred learning.',
  },
];

const STATIC_CATEGORIES = [
  { name: 'All', label: 'All Mantras', count: '1000+' },
  { name: 'Shiva', label: 'Shiva Mantras', count: '120' },
  { name: 'Vishnu', label: 'Vishnu Mantras', count: '110' },
  { name: 'Ganesha', label: 'Ganesha Mantras', count: '80' },
  { name: 'Durga', label: 'Durga Mantras', count: '90' },
  { name: 'Lakshmi', label: 'Lakshmi Mantras', count: '70' },
  { name: 'Hanuman', label: 'Hanuman Mantras', count: '65' },
  { name: 'Gayatri', label: 'Gayatri Mantras', count: '45' },
  { name: 'Saraswati', label: 'Saraswati Mantras', count: '40' },
  { name: 'Navagraha', label: 'Navagraha Mantras', count: '50' },
  { name: 'Healing', label: 'Healing Mantras', count: '35' },
  { name: 'Peace', label: 'Peace Mantras', count: '80' },
  { name: 'Wealth', label: 'Wealth Mantras', count: '45' },
  { name: 'Protection', label: 'Protection Mantras', count: '40' },
];

export default function DivineVibrationsPage() {
  const { divineVibrations, mantras: cmsMantras } = useCMS();
  const { isPlaying, playAudio, pauseAudio } = useAudio();

  const [activeMantra, setActiveMantra] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'm-1': true,
    'm-3': true,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Combine default mantras with CMS mantras and divine vibration tracks
  const combinedList = useMemo<DisplayMantra[]>(() => {
    const list: DisplayMantra[] = [...DEFAULT_MANTRAS_LIST];

    // Merge CMS Mantras
    if (cmsMantras && cmsMantras.length > 0) {
      cmsMantras.forEach((cm) => {
        if (!list.some((item) => item.id === cm.id)) {
          list.push({
            id: cm.id,
            sanskrit: cm.sanskrit,
            titleEn: cm.name,
            deity: cm.deity,
            tags: [cm.deity, cm.category, `${cm.chantCount}x`],
            meaning: cm.englishMeaning || cm.hindiMeaning,
            audioUrl: cm.audioUrl,
          });
        }
      });
    }

    // Merge Divine Vibration Tracks from Dashboard
    if (divineVibrations.tracks && divineVibrations.tracks.length > 0) {
      divineVibrations.tracks
        .filter((t) => t.enabled)
        .forEach((vt) => {
          if (!list.some((item) => item.id === vt.id)) {
            list.push({
              id: vt.id,
              sanskrit: vt.sanskritVerse || vt.sanskritTitle,
              titleEn: vt.title,
              deity: vt.category,
              tags: [vt.frequency, vt.category, 'Divine Vibration'],
              meaning: vt.verseMeaning || vt.benefits,
              frequency: vt.frequency,
              audioUrl: vt.audioUrl,
            });
          }
        });
    }

    return list;
  }, [cmsMantras, divineVibrations]);

  // Filter based on search query and category
  const filteredMantras = useMemo(() => {
    return combinedList.filter((m) => {
      const matchesCategory =
        activeCategory === 'All' ||
        m.deity.toLowerCase() === activeCategory.toLowerCase() ||
        m.tags.some((t) => t.toLowerCase() === activeCategory.toLowerCase());

      const matchesSearch =
        searchQuery === '' ||
        m.sanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [combinedList, activeCategory, searchQuery]);

  const handleMantraAudio = async (m: DisplayMantra) => {
    if (activeMantra === m.id && isPlaying) {
      pauseAudio();
      setActiveMantra(null);
    } else {
      setActiveMantra(m.id);
      await playAudio({
        id: m.id,
        title: m.titleEn,
        subtitle: m.sanskrit,
        audioUrl: m.audioUrl || '/audio/om_namah_shivaya.wav',
      });
    }
  };

  const toggleFav = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (m: DisplayMantra) => {
    if (typeof window !== 'undefined') {
      const text = `${m.sanskrit} (${m.titleEn})\n${m.meaning}\n\nShared via SanatanRoop Divine Vibrations`;
      navigator.clipboard.writeText(text);
      setCopiedId(m.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans">
      {/* =========================================================================
          HERO BANNER: SACRED MANTRAS & DIVINE VIBRATIONS (CMS SYNCED)
      ========================================================================= */}
      <section className="bg-gradient-to-r from-[#241711] via-[#3a2217] to-[#241711] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#4d3224]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-3 relative z-10">
          {divineVibrations.sanskritMotto && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-serif mb-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{divineVibrations.sanskritMotto}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-wide">
            {divineVibrations.pageTitle || 'Sacred Mantras'}
          </h1>
          <p className="text-sm sm:text-base text-amber-200/90 font-serif">
            {divineVibrations.pageSubtitle || 'Divine Vibrations for a Better Life'}
          </p>

          {/* Search Bar inside Hero */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mantras (e.g., Gayatri, Shiva, Ganesha...)"
              className="w-full bg-white/95 text-stone-900 placeholder-stone-400 text-sm rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
            />
            <Search className="w-5 h-5 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN 2-COLUMN SECTION: CATEGORIES SIDEBAR + MANTRA CARDS LIST
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDEBAR: CATEGORIES */}
          <aside className="lg:col-span-3 bg-white dark:bg-[#1a1411] border border-stone-200/90 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2 sticky top-24">
            <h2 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 px-3 pb-2 border-b border-stone-100 dark:border-stone-800">
              Categories
            </h2>
            <div className="space-y-1 text-xs font-medium max-h-[500px] overflow-y-auto pr-1">
              {STATIC_CATEGORIES.map((c) => {
                const isActive = activeCategory === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setActiveCategory(c.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                      isActive
                        ? 'bg-[#ea580c] text-white font-bold shadow-sm'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{c.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-orange-800 text-white'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                      }`}
                    >
                      {c.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* RIGHT CONTENT: MANTRA CARDS */}
          <main className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
              <span>Showing {filteredMantras.length} divine mantras</span>
              {activeCategory !== 'All' && (
                <button
                  onClick={() => setActiveCategory('All')}
                  className="text-[#ea580c] font-semibold hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div className="space-y-3.5">
              {filteredMantras.map((m) => {
                const isThisPlaying = activeMantra === m.id && isPlaying;
                const isFav = favorites[m.id];

                return (
                  <div
                    key={m.id}
                    className="bg-white dark:bg-[#1a1411] border border-stone-200/90 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-orange-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center space-x-4">
                      {/* Big Orange Play Button */}
                      <button
                        onClick={() => handleMantraAudio(m)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md transition transform hover:scale-105 ${
                          isThisPlaying
                            ? 'bg-[#ea580c] text-white shadow-orange-500/40 animate-pulse'
                            : 'bg-gradient-to-tr from-[#ea580c] to-[#f97316] text-white'
                        }`}
                        title={isThisPlaying ? 'Pause Chanting' : 'Play Chanting'}
                      >
                        {isThisPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </button>

                      {/* Titles & Tags */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                            {m.sanskrit}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif">
                          {m.titleEn}
                        </p>

                        {/* Badges / Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {m.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 bg-[#fbf5eb] dark:bg-[#251d18] text-[#9a3412] dark:text-amber-300 text-[10px] font-semibold rounded-md border border-[#ebd8bc] dark:border-stone-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Actions: Favorite Heart & Share */}
                    <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => toggleFav(m.id)}
                        className="p-2 rounded-full border border-stone-200 dark:border-stone-800 hover:border-rose-400 text-stone-500 hover:text-rose-500 transition"
                        title="Add to sacred favorites"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFav ? 'text-rose-500 fill-rose-500' : 'text-stone-400'
                          }`}
                        />
                      </button>

                      <button
                        onClick={() => handleShare(m)}
                        className="p-2 rounded-full border border-stone-200 dark:border-stone-800 hover:border-orange-400 text-stone-500 hover:text-[#ea580c] transition"
                        title="Copy and Share Mantra"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredMantras.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 text-stone-500 text-sm">
                  No mantras found matching your search. Try another query or category.
                </div>
              )}
            </div>

            {/* Pagination Controls matching Screenshot */}
            <div className="flex items-center justify-center space-x-2 pt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-lg border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 hover:bg-stone-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-xs font-semibold ${
                    currentPage === page
                      ? 'bg-[#ea580c] text-white font-bold'
                      : 'border border-stone-300 dark:border-stone-700 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-stone-400 px-1">...</span>
              <button
                onClick={() => setCurrentPage(50)}
                className={`w-9 h-9 rounded-lg text-xs font-semibold ${
                  currentPage === 50
                    ? 'bg-[#ea580c] text-white font-bold'
                    : 'border border-stone-300 dark:border-stone-700 text-stone-700 hover:bg-stone-50'
                }`}
              >
                50
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(50, p + 1))}
                className="w-9 h-9 rounded-lg border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 hover:bg-stone-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
