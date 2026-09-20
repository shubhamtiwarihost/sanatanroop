'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  ExternalLink,
  X,
  Volume2,
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
  youtubeId: string;
  chantCount?: string;
}

const DEFAULT_MANTRAS_LIST: DisplayMantra[] = [
  {
    id: 'm-1',
    sanskrit: 'ॐ नमः शिवाय',
    titleEn: 'Om Namah Shivaya',
    deity: 'Shiva',
    tags: ['Shiva', 'Peace', 'Spiritual Growth'],
    meaning: 'I bow to Lord Shiva, the auspicious, infinite consciousness within.',
    youtubeId: 'R95AJddCgmI',
    chantCount: '108 Times',
  },
  {
    id: 'm-2',
    sanskrit: 'ॐ गं गणपतये नमः',
    titleEn: 'Om Gam Ganapataye Namah',
    deity: 'Ganesha',
    tags: ['Ganesha', 'Success', 'Remove Obstacles'],
    meaning: 'Salutations to Lord Ganesha, the remover of all obstacles and harbinger of wisdom.',
    youtubeId: '1_LNjAVeFwU',
    chantCount: '108 Times',
  },
  {
    id: 'm-3',
    sanskrit: 'ॐ नमो भगवते वासुदेवाय',
    titleEn: 'Om Namo Bhagavate Vasudevaya',
    deity: 'Vishnu',
    tags: ['Vishnu', 'Devotion', 'Inner Peace'],
    meaning: 'I offer my reverent obeisances to Lord Vasudeva, the all-pervading Supreme Being.',
    youtubeId: 'HgUu_0rk0Ug',
    chantCount: '108 Times',
  },
  {
    id: 'm-4',
    sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
    titleEn: 'Om Shreem Mahalakshmyai Namah',
    deity: 'Lakshmi',
    tags: ['Lakshmi', 'Wealth', 'Prosperity'],
    meaning: 'Salutations to the Supreme Goddess Mahalakshmi, the source of auspiciousness and spiritual abundance.',
    youtubeId: 'yWRakiwquiU',
    chantCount: '108 Times',
  },
  {
    id: 'm-5',
    sanskrit: 'ॐ दुं दुर्गायै नमः',
    titleEn: 'Om Durgayai Namah',
    deity: 'Durga',
    tags: ['Durga', 'Protection', 'Strength'],
    meaning: 'Reverence to Goddess Durga, who protects her devotees from all inner and outer turmoil.',
    youtubeId: 'W8lLootyGqg',
    chantCount: '108 Times',
  },
  {
    id: 'm-6',
    sanskrit: 'ॐ हनुमते नमः',
    titleEn: 'Om Hanumate Namah',
    deity: 'Hanuman',
    tags: ['Hanuman', 'Courage', 'Remove Fear'],
    meaning: 'Salutations to Lord Hanuman, the embodiment of selfless service, strength, and unwavering devotion.',
    youtubeId: 'N0rh-K-59EQ',
    chantCount: '108 Times',
  },
  {
    id: 'm-7',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    titleEn: 'Gayatri Mantra',
    deity: 'Gayatri',
    tags: ['Gayatri', 'Wisdom', 'Illumination'],
    meaning: 'We meditate upon the radiant divine light of Savitur. May that illumine our intellect and guide our consciousness.',
    youtubeId: 'MCoYe0-gD2k',
    chantCount: '108 Times',
  },
  {
    id: 'm-8',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥',
    titleEn: 'Maha Mrityunjaya Mantra',
    deity: 'Shiva',
    tags: ['Healing', 'Immortal Peace', 'Protection'],
    meaning: 'We worship the Three-Eyed Lord Shiva. May He liberate us from death for the sake of immortality.',
    youtubeId: 'AETFvQonfV8',
    chantCount: '108 Times',
  },
  {
    id: 'm-9',
    sanskrit: 'ॐ ऐं सरस्वत्यै नमः',
    titleEn: 'Om Aim Saraswatyai Namah',
    deity: 'Saraswati',
    tags: ['Saraswati', 'Knowledge', 'Arts'],
    meaning: 'Salutations to Goddess Saraswati, the patroness of divine knowledge, speech, and sacred learning.',
    youtubeId: 'KRZGrdzW4LU',
    chantCount: '108 Times',
  },
  {
    id: 'm-10',
    sanskrit: 'ॐ नमोऽस्तु अनन्ताय सहस्रमूर्तये',
    titleEn: 'Cosmic Om Resonator (136.1 Hz)',
    deity: 'Cosmic',
    tags: ['136.1 Hz', 'Cosmic Om', 'Divine Vibration'],
    meaning: 'Cosmic Primordial Sound Frequency aligning the subtle energy centers of the body.',
    youtubeId: 'AL3D5rhOJ9w',
    chantCount: '108 Times',
    frequency: '136.1 Hz',
  },
  {
    id: 'm-11',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि',
    titleEn: 'Gayatri Mantra Solfeggio (432 Hz)',
    deity: 'Gayatri',
    tags: ['432 Hz', 'Vedic Chants', 'Divine Vibration'],
    meaning: 'Vedic harmony tuned to 432 Hz natural cosmic vibration for cellular rejuvenation and mental peace.',
    youtubeId: 'MCoYe0-gD2k',
    chantCount: '432 Hz Chanting',
    frequency: '432 Hz',
  },
  {
    id: 'm-12',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
    titleEn: 'Mahamrityunjaya Shiva Resonance (528 Hz)',
    deity: 'Shiva',
    tags: ['528 Hz', 'Healing & Vitality', 'Divine Vibration'],
    meaning: 'Miracle tone 528 Hz frequency infused with the life-giving Mahamrityunjaya mantra.',
    youtubeId: 'AETFvQonfV8',
    chantCount: '528 Hz Resonance',
    frequency: '528 Hz',
  },
  {
    id: 'm-13',
    sanskrit: 'आगमार्थं तु देवानां गमनार्थं तु रक्षसाम् । कुर्याद् घण्टारवं तत्र देवताह्वानलक्षणम् ॥',
    titleEn: 'Sacred Shankha & Varanasi Temple Bells',
    deity: 'Temple',
    tags: ['Harmonic Spectrum', 'Temple Acoustics', 'Divine Vibration'],
    meaning: 'Authentic conch shell vibrations and pure bronze temple bells purifying the surrounding atmosphere.',
    youtubeId: '1RPPBQ7AsVE',
    chantCount: 'Acoustic Sound',
  },
  {
    id: 'm-14',
    sanskrit: 'सहस्रारे महापद्मे चन्द्रमण्डलसंस्थितम् । परात्परतरं ब्रह्म ध्यायेच्चित्तं स्थिरं कुरु ॥',
    titleEn: 'Sahasrara Crown Chakra Solfeggio (963 Hz)',
    deity: 'Chakra',
    tags: ['963 Hz', 'Chakra Awakening', 'Divine Vibration'],
    meaning: 'Pineal gland activation frequency for higher spiritual awareness and oneness with cosmic consciousness.',
    youtubeId: 'AL3D5rhOJ9w',
    chantCount: '963 Hz Frequency',
    frequency: '963 Hz',
  },
];

const STATIC_CATEGORIES = [
  { name: 'All', label: 'All Mantras', count: '14' },
  { name: 'Shiva', label: 'Shiva Mantras', count: '3' },
  { name: 'Vishnu', label: 'Vishnu Mantras', count: '1' },
  { name: 'Ganesha', label: 'Ganesha Mantras', count: '1' },
  { name: 'Durga', label: 'Durga Mantras', count: '1' },
  { name: 'Lakshmi', label: 'Lakshmi Mantras', count: '1' },
  { name: 'Hanuman', label: 'Hanuman Mantras', count: '1' },
  { name: 'Gayatri', label: 'Gayatri Mantras', count: '2' },
  { name: 'Saraswati', label: 'Saraswati Mantras', count: '1' },
  { name: 'Cosmic', label: 'Cosmic & Frequencies', count: '3' },
];

const ITEMS_PER_PAGE = 6;

export default function DivineVibrationsClient() {
  const { divineVibrations, mantras: cmsMantras } = useCMS();

  const [activeModalMantra, setActiveModalMantra] = useState<DisplayMantra | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'm-1': true,
    'm-3': true,
    'm-7': true,
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
            youtubeId: (cm as any).youtubeId || 'R95AJddCgmI',
            chantCount: `${cm.chantCount} Times`,
          });
        }
      });
    }

    return list;
  }, [cmsMantras]);

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

  // Reset to page 1 whenever category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Accurate Pagination Calculation
  const totalPages = Math.max(1, Math.ceil(filteredMantras.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedMantras = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredMantras.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMantras, safeCurrentPage]);

  const toggleFav = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (m: DisplayMantra) => {
    if (typeof window !== 'undefined') {
      const text = `${m.sanskrit} (${m.titleEn})\n${m.meaning}\n\nShared via SanatanRoop Divine Vibrations: https://sanatanroop.com/divine-vibrations`;
      navigator.clipboard.writeText(text);
      setCopiedId(m.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const startMantra = (m: DisplayMantra) => {
    setActiveModalMantra(m);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] text-[#1c1917] dark:text-stone-100 font-sans">
      {/* =========================================================================
          HERO BANNER
      ========================================================================= */}
      <section className="bg-gradient-to-r from-[#241711] via-[#3a2217] to-[#241711] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#4d3224]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-serif mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{divineVibrations?.sanskritMotto || 'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय ।'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-wide text-amber-100">
            {divineVibrations?.pageTitle || 'Divine Vibrations & Sacred Vedic Resonances'}
          </h1>
          <p className="text-sm sm:text-base text-amber-200/90 font-serif max-w-2xl mx-auto">
            {divineVibrations?.pageSubtitle || '१०८ बार प्रामाणिक वैदिक मन्त्र जप, सोल्फेगियो फ्रिक्वेन्सी एवं दिव्य नाद अनुसंधान'}
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mantras (e.g., Gayatri, Shiva, Ganesha, 108...)"
              className="w-full bg-white/95 dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-sm rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg border border-amber-500/20"
            />
            <Search className="w-5 h-5 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN 2-COLUMN SECTION: CATEGORIES + MANTRA CARDS LIST
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
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pb-1">
              <span>
                {filteredMantras.length === 0
                  ? 'Showing 0 divine mantras'
                  : `Showing ${(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1} – ${Math.min(
                      safeCurrentPage * ITEMS_PER_PAGE,
                      filteredMantras.length
                    )} of ${filteredMantras.length} divine mantras`}
              </span>
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
              {paginatedMantras.map((m) => {
                const isFav = favorites[m.id];
                const isThisOpen = activeModalMantra?.id === m.id;

                return (
                  <div
                    key={m.id}
                    className="bg-white dark:bg-[#1a1411] border border-stone-200/90 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-amber-400 dark:hover:border-amber-600 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center space-x-4">
                      {/* Big Orange Play Button: Launches Real Devotional Chanting */}
                      <button
                        onClick={() => startMantra(m)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md transition transform hover:scale-105 ${
                          isThisOpen
                            ? 'bg-[#ea580c] text-white shadow-orange-500/40 animate-pulse'
                            : 'bg-gradient-to-tr from-[#ea580c] to-[#f97316] text-white hover:shadow-orange-500/30'
                        }`}
                        title="Listen to Authentic Human Voice Chanting"
                      >
                        <Play className="w-5 h-5 ml-0.5 fill-white" />
                      </button>

                      {/* Titles & Tags */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            onClick={() => startMantra(m)}
                            className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 cursor-pointer hover:text-[#ea580c] transition"
                          >
                            {m.sanskrit}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif">
                          {m.titleEn} {m.chantCount && `• ${m.chantCount}`}
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
                        onClick={() => startMantra(m)}
                        className="px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-[#ea580c] dark:text-amber-300 text-xs font-serif font-bold transition flex items-center space-x-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>जाप सुनें</span>
                      </button>

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
                <div className="text-center py-12 bg-white dark:bg-[#1a1411] rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-500 text-sm">
                  No mantras found matching your search. Try another query or category.
                </div>
              )}
            </div>

            {/* Accurate Dynamic Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-8">
                <button
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition ${
                    safeCurrentPage === 1
                      ? 'border-stone-200 dark:border-stone-800 text-stone-300 dark:text-stone-700 cursor-not-allowed'
                      : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-xs font-semibold transition ${
                      safeCurrentPage === page
                        ? 'bg-[#ea580c] text-white font-bold shadow-sm'
                        : 'border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition ${
                    safeCurrentPage === totalPages
                      ? 'border-stone-200 dark:border-stone-800 text-stone-300 dark:text-stone-700 cursor-not-allowed'
                      : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* =========================================================================
          REAL DEVOTIONAL CHANTING PLAYER MODAL
      ========================================================================= */}
      {activeModalMantra && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1a1411] text-white rounded-3xl border border-amber-500/40 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-amber-950/60 bg-[#241711] flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-serif">
                    {activeModalMantra.deity} • {activeModalMantra.chantCount || 'Authentic Chanting'}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white">
                  {activeModalMantra.titleEn}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={`https://www.youtube.com/watch?v=${activeModalMantra.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-serif font-bold transition shadow-sm"
                  title="Watch directly on YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>यूट्यूब पर देखें</span>
                </a>
                <button
                  onClick={() => setActiveModalMantra(null)}
                  className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Authentic Real Devotional Chanting Video/Audio Embed */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeModalMantra.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeModalMantra.titleEn}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Mantra Sanskrit Text & Meaning */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-[#19100c]">
              <div className="p-4 rounded-2xl bg-[#241711] border border-amber-500/20">
                <span className="text-[11px] uppercase tracking-wider text-amber-400/80 font-serif block mb-1">
                  मूल संस्कृत मन्त्र (Sacred Sanskrit Mantra)
                </span>
                <pre className="font-serif text-xl sm:text-2xl font-bold text-amber-100 whitespace-pre-wrap leading-relaxed">
                  {activeModalMantra.sanskrit}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1">
                <span className="text-amber-300 font-bold block text-xs font-serif">
                  Spiritual Significance & Meaning:
                </span>
                <p className="text-stone-300 text-xs sm:text-sm font-serif leading-relaxed">
                  {activeModalMantra.meaning}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
