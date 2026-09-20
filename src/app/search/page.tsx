'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAudio } from '@/context/AudioContext';
import {
  Search as SearchIcon,
  Filter,
  BookOpen,
  Sparkles,
  MapPin,
  Calendar,
  Feather,
  Flame,
  ArrowRight,
  Play,
  Pause,
  ShoppingBag,
  Video,
  X,
} from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams?.get('q') || 'Shiva';
  const { t } = useLanguage();
  const { playAudio, currentTrack, isPlaying } = useAudio();

  const [query, setQuery] = useState(initialQ);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Preloaded rich mock items for instant snappy search matching the mockup
  const MOCK_RESULTS = [
    {
      id: 'res-1',
      type: 'SHLOKA',
      category: 'Mantra',
      title: 'Shiva Tandava Stotram (शिवताण्डवस्तोत्रम्)',
      subtitle: 'जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्॥',
      description:
        'The ecstatic hymn sung by Ravana extolling Lord Shiva’s cosmic dance of rhythm, destruction of ego, and grace of ultimate liberation.',
      url: '/shlokas',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=meditation-bell-chant-110077.mp3',
    },
    {
      id: 'res-2',
      type: 'SHLOKA',
      category: 'Mantra',
      title: 'Maha Mrityunjaya Mantra (महामृत्युंजय मन्त्र)',
      subtitle: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥',
      description:
        'Rigvedic prayer to Tryambaka (the three-eyed Lord Shiva) granting liberation from fear of mortality and bestowed with healing vitality.',
      url: '/shlokas',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=tibetan-chanting-105232.mp3',
    },
    {
      id: 'res-3',
      type: 'SCRIPTURE',
      category: 'Scripture',
      title: 'Shiva Purana — Vidyeshvara Samhita',
      subtitle: 'शिवपुराणम् — प्रथम संहिता',
      description:
        'Foundational scripture detailing the cosmology of Shiva, the genesis of the Jyotirlingas, and the efficacy of Bhasma and Rudraksha.',
      url: '/scriptures',
    },
    {
      id: 'res-4',
      type: 'ARTICLE',
      category: 'Article',
      title: 'Maha Shivratri 2026: Fasting Rituals, Timings & Sacred Significance',
      subtitle: 'महाशिवरात्रि व्रत विधि एवं चार प्रहर पूजा',
      description:
        'Complete shastric guide on the four Nishita Kaal prahar pujas, abhishek samagri order, bilva patra offerings, and jagran benefits.',
      url: '/articles/maha-shivratri-rituals',
    },
    {
      id: 'res-5',
      type: 'PRODUCT',
      category: 'Store',
      title: 'Handcrafted Brass Panchamukhi Shiva Idol (9 Inch)',
      subtitle: 'पंचमुखी शिव पीतल विग्रह • 1.8 kg Solid Brass',
      description:
        'Authentic solid brass idol handcrafted by skilled hereditary artisans of Aligarh and Kashi. Consecrated with sacred Vedic chantings.',
      url: '/store/brass-shiva-idol',
      price: '₹2,499',
    },
    {
      id: 'res-6',
      type: 'PRODUCT',
      category: 'Store',
      title: 'Authentic 5-Mukhi Indonesian Rudraksha Mala (108+1 Beads)',
      subtitle: 'मूल पंचमुखी रुद्राक्ष माला • Certified Lab Origin',
      description:
        'Natural beads hand-knotted in sacred yellow silk thread, traditionally used for Shiva japa and mental equilibrium.',
      url: '/store/rudraksha-mala',
      price: '₹899',
    },
    {
      id: 'res-7',
      type: 'VIDEO',
      category: 'Video',
      title: 'Kashi Vishwanath Temple: Complete History & Spiritual Geography',
      subtitle: '18 min Documentary & Darshan Walkthrough',
      description:
        'Explore the timeless spiritual axis of Anandavan (Kashi), from the ancient Svayambhu lingam to the sacred Ganga Aarti rituals.',
      url: '/videos',
    },
  ];

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;
    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(
        `/api/v1/search?q=${encodeURIComponent(term)}&type=${activeCategory}`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        // Filter mock items as fallback
        const filtered = MOCK_RESULTS.filter((item) => {
          const matchesTerm =
            item.title.toLowerCase().includes(term.toLowerCase()) ||
            item.description.toLowerCase().includes(term.toLowerCase()) ||
            (item.subtitle && item.subtitle.toLowerCase().includes(term.toLowerCase()));
          return matchesTerm;
        });
        setResults(filtered.length > 0 ? filtered : MOCK_RESULTS);
      }
    } catch (err) {
      setResults(MOCK_RESULTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(query);
  }, [activeCategory]);

  const categories = [
    { key: 'ALL', label: 'All Results' },
    { key: 'SHLOKA', label: 'Mantras' },
    { key: 'SCRIPTURE', label: 'Scriptures' },
    { key: 'ARTICLE', label: 'Articles' },
    { key: 'PRODUCT', label: 'Store Products' },
    { key: 'VIDEO', label: 'Videos' },
  ];

  const filteredResults = results.filter((r) => {
    if (activeCategory === 'ALL') return true;
    return r.type === activeCategory || r.category?.toUpperCase() === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] pb-24">
      {/* Search Header Banner */}
      <section className="bg-gradient-to-b from-[#25150d] to-[#170e08] text-amber-50 pt-16 pb-16 px-4 sm:px-6 lg:px-8 border-b border-amber-900/40">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>वैदिक ज्ञान अन्वेषण</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
            Search Results for &quot;{query}&quot;
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 font-serif">
            Multilingual canonical search across scriptures, shlokas, articles, store items, and sacred videos.
          </p>

          {/* Search Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="relative max-w-2xl mx-auto pt-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by deity, mantra, scripture, ritual or topic..."
              className="w-full pl-12 pr-28 py-4 rounded-2xl border-2 border-amber-500/40 bg-white/95 text-stone-900 placeholder:text-stone-400 font-medium text-sm shadow-xl focus:outline-none focus:border-amber-500"
            />
            <SearchIcon className="w-5 h-5 text-amber-600 absolute left-4 top-6" />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-24 top-6 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 top-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold shadow-md transition"
            >
              Search
            </button>
          </form>

          {/* Popular Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-amber-300/70 font-medium">Quick Searches:</span>
            {['Shiva', 'Gayatri Mantra', 'Bhagavad Gita', 'Ekadashi', 'Rudraksha', 'Kashi'].map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setQuery(tag);
                    handleSearch(tag);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/10 transition"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Main Results Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-6">
        {/* Category Tabs with Counts */}
        <div className="flex items-center justify-between p-2 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-sm overflow-x-auto">
          <div className="flex space-x-1">
            {categories.map((cat) => {
              const count =
                cat.key === 'ALL'
                  ? results.length
                  : results.filter(
                      (r) => r.type === cat.key || r.category?.toUpperCase() === cat.key
                    ).length;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center space-x-1.5 ${
                    activeCategory === cat.key
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-amber-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      activeCategory === cat.key ? 'bg-amber-700 text-white' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-16 text-stone-500 font-serif">
              Searching canonical database...
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/60 text-stone-600">
              <p className="text-base font-serif font-bold">No results found for &quot;{query}&quot;</p>
              <p className="text-xs text-stone-400 mt-1">
                Try searching for &quot;Shiva&quot;, &quot;Gita&quot;, or &quot;Gayatri&quot;
              </p>
            </div>
          ) : (
            filteredResults.map((item) => {
              const isChanting = item.audioUrl && currentTrack?.id === item.id && isPlaying;

              return (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 hover:border-amber-400/80 shadow-sm hover:shadow-md transition space-y-3 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200/60">
                          {item.category || item.type}
                        </span>
                        {item.price && (
                          <span className="text-xs font-serif font-bold text-amber-700">
                            {item.price}
                          </span>
                        )}
                      </div>

                      <Link href={item.url} className="block">
                        <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 transition">
                          {item.title}
                        </h3>
                      </Link>

                      {item.subtitle && (
                        <p className="font-serif text-xs text-amber-800 dark:text-amber-400 italic">
                          {item.subtitle}
                        </p>
                      )}

                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Action on right */}
                    <div className="flex items-center space-x-2 self-center flex-shrink-0">
                      {item.audioUrl && (
                        <button
                          onClick={() =>
                            playAudio({
                              id: item.id,
                              title: item.title,
                              audioUrl: item.audioUrl,
                              subtitle: item.subtitle,
                            })
                          }
                          className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950/70 hover:bg-amber-200 text-amber-800 dark:text-amber-300 transition flex items-center space-x-1.5 border border-amber-300/50"
                          title="Listen to Chant"
                        >
                          {isChanting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          <span className="text-xs font-bold">{isChanting ? 'Pause' : 'Chant'}</span>
                        </button>
                      )}

                      <Link
                        href={item.url}
                        className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-600 hover:text-white text-stone-700 dark:text-stone-300 transition group-hover:bg-amber-600 group-hover:text-white"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] flex items-center justify-center p-12 text-stone-500 font-serif">
          Loading Sacred Search...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
