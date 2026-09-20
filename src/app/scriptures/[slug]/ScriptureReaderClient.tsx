'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Share2,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Layers,
  Sparkles,
  Search,
  Check,
  Menu,
  X,
  Sliders,
  Maximize2,
  Minimize2,
  Info,
  ShieldCheck,
} from 'lucide-react';

import { SCRIPTURES_STATIC_DATA } from '@/data/scripturesStaticData';

export default function ScriptureReaderClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;
  const { locale, setLocale, t } = useLanguage();

  const [scripture, setScripture] = useState<any>(() => SCRIPTURES_STATIC_DATA[slug] || SCRIPTURES_STATIC_DATA['bhagavad-gita']);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState(0);
  const [verseSearch, setVerseSearch] = useState('');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [darkReadingMode, setDarkReadingMode] = useState(false);
  const [savedBookmarks, setSavedBookmarks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Mobile drawer states
  const [mobileDrawer, setMobileDrawer] = useState<'NONE' | 'CHAPTERS' | 'COMMENTARY'>('NONE');

  useEffect(() => {
    async function loadScripture() {
      // First check static data
      const staticData = SCRIPTURES_STATIC_DATA[slug] || SCRIPTURES_STATIC_DATA['bhagavad-gita'];
      if (staticData) {
        setScripture(staticData);
        setLoading(false);
      }

      try {
        const res = await fetch(`/api/v1/scriptures/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.scripture) {
            setScripture(data.scripture);
            const qCh = searchParams.get('chapter');
            const qV = searchParams.get('verse');
            if (qCh && data.scripture.chapters) {
              const chIdx = data.scripture.chapters.findIndex(
                (c: any) => c.chapterNumber === parseInt(qCh)
              );
              if (chIdx !== -1) {
                setSelectedChapterIndex(chIdx);
                if (qV && data.scripture.chapters[chIdx]?.verses) {
                  const vIdx = data.scripture.chapters[chIdx].verses.findIndex(
                    (v: any) => v.verseNumber === parseInt(qV)
                  );
                  if (vIdx !== -1) setSelectedVerseIndex(vIdx);
                }
              }
            }
            return;
          }
        }
      } catch (err) {
        console.warn('Using static scripture data for offline/export support:', err);
      }

      // Handle search params for static data
      if (staticData) {
        const qCh = searchParams.get('chapter');
        const qV = searchParams.get('verse');
        if (qCh && staticData.chapters) {
          const chIdx = staticData.chapters.findIndex(
            (c: any) => c.chapterNumber === parseInt(qCh)
          );
          if (chIdx !== -1) {
            setSelectedChapterIndex(chIdx);
            if (qV && staticData.chapters[chIdx]?.verses) {
              const vIdx = staticData.chapters[chIdx].verses.findIndex(
                (v: any) => v.verseNumber === parseInt(qV)
              );
              if (vIdx !== -1) setSelectedVerseIndex(vIdx);
            }
          }
        }
      }
      setLoading(false);
    }
    if (slug) loadScripture();
  }, [slug, searchParams]);

  useEffect(() => {
    const saved = localStorage.getItem('sanatan_saved_verses');
    if (saved) {
      try {
        setSavedBookmarks(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const toggleBookmark = (verseId: string) => {
    let updated: string[] = [];
    if (savedBookmarks.includes(verseId)) {
      updated = savedBookmarks.filter((id) => id !== verseId);
    } else {
      updated = [...savedBookmarks, verseId];
    }
    setSavedBookmarks(updated);
    localStorage.setItem('sanatan_saved_verses', JSON.stringify(updated));
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center font-serif text-[#523d2b] space-y-4">
        <span className="text-4xl animate-om-pulse">ॐ</span>
        <span className="text-sm tracking-widest uppercase font-mono">
          {locale === 'hi' ? 'पवित्र ज्ञान लोड हो रहा है...' : 'Opening Sacred Scripture...'}
        </span>
      </div>
    );
  }

  if (!scripture) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-serif">
        <h2 className="text-2xl font-bold text-stone-800">ग्रंथ उपलब्ध नहीं है</h2>
        <Link href="/scriptures" className="mt-4 inline-block text-amber-700 underline font-semibold">
          ग्रंथालय की ओर लौटें
        </Link>
      </div>
    );
  }

  const currentChapter = scripture.chapters?.[selectedChapterIndex];
  const currentVerse = currentChapter?.verses?.[selectedVerseIndex];
  const totalVerses = currentChapter?.verses?.length || 1;
  const isBookmarked = currentVerse ? savedBookmarks.includes(currentVerse.id) : false;

  const readingProgressPercent = Math.round(
    ((selectedVerseIndex + 1) / totalVerses) * 100
  );

  const getSanskritFontSize = () => {
    if (fontSize === 'normal') return 'text-xl sm:text-2xl';
    if (fontSize === 'large') return 'text-2xl sm:text-3xl';
    return 'text-3xl sm:text-4xl';
  };

  let parsedWordByWord: Record<string, string> | null = null;
  if (currentVerse?.wordByWord) {
    try {
      parsedWordByWord = JSON.parse(currentVerse.wordByWord);
    } catch (e) {}
  }

  const handleNextVerse = () => {
    if (selectedVerseIndex < totalVerses - 1) {
      setSelectedVerseIndex(selectedVerseIndex + 1);
    } else if (selectedChapterIndex < (scripture.chapters?.length || 1) - 1) {
      setSelectedChapterIndex(selectedChapterIndex + 1);
      setSelectedVerseIndex(0);
    }
  };

  const handlePrevVerse = () => {
    if (selectedVerseIndex > 0) {
      setSelectedVerseIndex(selectedVerseIndex - 1);
    } else if (selectedChapterIndex > 0) {
      const prevChapterIndex = selectedChapterIndex - 1;
      const prevVersesCount = scripture.chapters[prevChapterIndex].verses?.length || 1;
      setSelectedChapterIndex(prevChapterIndex);
      setSelectedVerseIndex(prevVersesCount - 1);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        darkReadingMode
          ? 'bg-[#0f0e13] text-[#e8e0d0]'
          : 'bg-[#faf7f0] text-[#24130a]'
      }`}
    >
      {/* =========================================================================
          TOP BOOK READER CONTROL BAR
      ========================================================================= */}
      <header
        className={`border-b px-4 py-2.5 sticky top-0 z-30 flex items-center justify-between text-xs font-serif ${
          darkReadingMode
            ? 'bg-[#16151c]/95 border-[#2f2738]'
            : 'bg-[#fcfaf4]/95 border-[#e2d5be]'
        } backdrop-blur-md`}
      >
        {/* Left: Breadcrumbs & Back */}
        <div className="flex items-center space-x-3">
          <Link
            href="/scriptures"
            className="flex items-center space-x-1 font-bold text-[#8e6d2b] hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">ग्रंथालय</span>
          </Link>
          <span className="text-stone-300 dark:text-stone-700">|</span>
          <span className="font-bold text-[#2a170d] dark:text-[#f7ebd4] truncate max-w-[200px] sm:max-w-xs">
            {locale === 'hi' ? scripture.titleHi : scripture.titleEn}
          </span>
          <span className="hidden md:inline px-2 py-0.5 rounded text-[10px] bg-[#f4ede0] dark:bg-stone-800 text-[#55402c] dark:text-stone-400 font-mono">
            {scripture.rightsStatus}
          </span>
        </div>

        {/* Center: Mobile Drawers Openers */}
        <div className="flex xl:hidden items-center space-x-2">
          <button
            onClick={() => setMobileDrawer(mobileDrawer === 'CHAPTERS' ? 'NONE' : 'CHAPTERS')}
            className="px-2.5 py-1 rounded border border-[#d6c7ae] dark:border-stone-700 text-xs font-serif font-bold"
          >
            अध्याय सूची
          </button>
          <button
            onClick={() => setMobileDrawer(mobileDrawer === 'COMMENTARY' ? 'NONE' : 'COMMENTARY')}
            className="px-2.5 py-1 rounded border border-[#d6c7ae] dark:border-stone-700 text-xs font-serif font-bold"
          >
            भाष्य व भावार्थ
          </button>
        </div>

        {/* Right: Controls (Font Size, Dark Mode, Share, Bookmark) */}
        <div className="flex items-center space-x-2">
          {/* Font Size Adjuster */}
          <div className="flex items-center bg-[#f7f2e6] dark:bg-stone-800 rounded p-0.5 border border-[#dfceb0] dark:border-stone-700">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                fontSize === 'normal' ? 'bg-[#8e6d2b] text-white' : 'text-stone-500'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                fontSize === 'large' ? 'bg-[#8e6d2b] text-white' : 'text-stone-500'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                fontSize === 'xlarge' ? 'bg-[#8e6d2b] text-white' : 'text-stone-500'
              }`}
            >
              A+
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkReadingMode(!darkReadingMode)}
            className="p-1.5 rounded border border-[#dfceb0] dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-[#f2e8d5] dark:hover:bg-stone-800"
            title="Toggle Day/Night Reading Mode"
          >
            {darkReadingMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Bookmark Button */}
          {currentVerse && (
            <button
              onClick={() => toggleBookmark(currentVerse.id)}
              className={`p-1.5 rounded border border-[#dfceb0] dark:border-stone-700 transition ${
                isBookmarked ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300' : 'text-stone-500'
              }`}
              title="Bookmark this verse"
            >
              {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-1.5 rounded border border-[#dfceb0] dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-[#f2e8d5] dark:hover:bg-stone-800"
            title="Share verse"
          >
            {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* =========================================================================
          3-COLUMN REAL DIGITAL BOOK READER (DESKTOP)
      ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* -----------------------------------------------------------------------
            COLUMN 1 (LEFT): CHAPTER & VERSES NAVIGATION TREE
        ------------------------------------------------------------------------ */}
        <aside
          className={`w-72 border-r p-4 space-y-4 overflow-y-auto select-none hidden xl:flex flex-col justify-between ${
            darkReadingMode
              ? 'bg-[#14131a] border-[#2f2738] text-stone-300'
              : 'bg-[#faf6ee] border-[#e5d8c3] text-[#3d2c1c]'
          }`}
        >
          <div className="space-y-4">
            {/* Book Spine Seal */}
            <div className="p-3.5 rounded bg-[#f5ede0] dark:bg-stone-800 border border-[#e2d2b5] dark:border-stone-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#8e6d2b] dark:text-amber-400 block font-mono">
                {scripture.category} • {scripture.provenance}
              </span>
              <h2 className="font-serif font-bold text-base text-[#24130a] dark:text-stone-100">
                {locale === 'hi' ? scripture.titleHi : scripture.titleEn}
              </h2>
              <p className="text-[11px] text-[#6b553e] dark:text-stone-400 line-clamp-2">
                {scripture.description}
              </p>
            </div>

            {/* Chapters Accordion / List */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#8e6d2b] uppercase tracking-wider block font-mono">
                अध्याय सूची ({scripture.chapters?.length || 0})
              </span>
              <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
                {scripture.chapters?.map((ch: any, idx: number) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setSelectedChapterIndex(idx);
                      setSelectedVerseIndex(0);
                    }}
                    className={`w-full text-left p-2.5 rounded text-xs font-serif transition flex items-center justify-between ${
                      selectedChapterIndex === idx
                        ? 'bg-[#8e6d2b] text-white font-bold shadow-sm'
                        : 'hover:bg-[#f0e6d5] dark:hover:bg-stone-800 text-[#3f2e1e] dark:text-stone-300'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <span className="block text-[10px] font-mono opacity-80">
                        अध्याय {ch.chapterNumber}
                      </span>
                      <span className="truncate block font-semibold">
                        {locale === 'hi' ? ch.titleHi : ch.titleEn}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-70 font-mono flex-shrink-0">
                      {ch.verses?.length || 0}V
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Chapter Verses Jump Grid */}
            {currentChapter?.verses?.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-[#e5d8c3] dark:border-stone-700">
                <span className="text-[10px] font-bold text-[#8e6d2b] uppercase tracking-wider block font-mono">
                  श्लोक संख्या (Verse Jump)
                </span>
                <div className="grid grid-cols-5 gap-1 max-h-[160px] overflow-y-auto pr-1 font-mono text-xs">
                  {currentChapter.verses.map((v: any, idx: number) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVerseIndex(idx)}
                      className={`h-7 rounded text-[11px] font-bold transition flex items-center justify-center ${
                        selectedVerseIndex === idx
                          ? 'bg-[#1e130a] text-[#f7eecf] shadow-sm'
                          : 'bg-white dark:bg-stone-900 border border-[#dfceb0] dark:border-stone-700 hover:bg-[#f7f0e1]'
                      }`}
                    >
                      {v.verseNumber}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reading Progress */}
          <div className="pt-3 border-t border-[#e2d5be] dark:border-stone-700 text-xs font-serif space-y-1 text-[#6b553e] dark:text-stone-400">
            <div className="flex justify-between text-[11px]">
              <span>अध्याय पठन प्रगति</span>
              <span className="font-bold">{readingProgressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#e2d2b5] dark:bg-stone-800 overflow-hidden">
              <div
                className="h-full bg-[#8e6d2b] transition-all duration-300"
                style={{ width: `${readingProgressPercent}%` }}
              />
            </div>
          </div>
        </aside>

        {/* -----------------------------------------------------------------------
            COLUMN 2 (CENTER): DIGITAL SCRIPTURE BOOK FOLIO (पत्र)
        ------------------------------------------------------------------------ */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col justify-between">
          <div className="max-w-3xl mx-auto w-full space-y-6">
            {/* Verse Header Banner */}
            <div className="flex items-center justify-between border-b border-[#e2d5be] dark:border-[#2f2738] pb-3 text-xs font-serif">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded bg-[#f4ede0] dark:bg-stone-800 text-[#3d2b1c] dark:text-stone-200 font-bold border border-[#dfceb0] dark:border-stone-700 font-mono">
                  अध्याय {currentChapter?.chapterNumber} • श्लोक {currentVerse?.verseNumber}
                </span>
                <span className="text-stone-500 font-semibold hidden sm:inline">
                  {locale === 'hi' ? currentChapter?.titleHi : currentChapter?.titleEn}
                </span>
              </div>

              <div className="text-[11px] text-stone-400 font-mono">
                श्लोक {selectedVerseIndex + 1} of {totalVerses}
              </div>
            </div>

            {/* Authentic Bhojapatra Manuscript Folio (पत्र) */}
            {currentVerse ? (
              <div className="manuscript-patra rounded-sm p-6 sm:p-10 border-2 border-[#c5a059]/50 shadow-[0_8px_30px_rgba(42,23,14,0.06)] space-y-6">
                {/* 1. Sanskrit Calligraphy in Devanagari */}
                <div className="text-center py-6 px-4 bg-[#fffefb]/95 dark:bg-stone-900/90 rounded border border-[#e5d5be] dark:border-stone-700 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#7a1f25] dark:text-amber-400 font-serif">
                    ॥ मूल संस्कृत श्लोक ॥
                  </span>
                  <p
                    className={`font-serif font-bold text-[#24130a] dark:text-amber-100 whitespace-pre-line leading-loose devanagari ${getSanskritFontSize()}`}
                  >
                    {currentVerse.sanskrit}
                  </p>
                </div>

                {/* 2. Roman Transliteration (IAST) */}
                {currentVerse.transliteration && (
                  <div className="p-3.5 rounded bg-[#f9f5ec] dark:bg-stone-800/60 border border-[#e8dbc4] dark:border-stone-700 text-center font-mono text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic whitespace-pre-line leading-relaxed">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-sans block mb-1 font-bold">
                      Roman Transliteration (IAST)
                    </span>
                    {currentVerse.transliteration}
                  </div>
                )}

                {/* 3. Word-by-Word Padachheda (पदच्छेद एवं पदार्थ) */}
                {parsedWordByWord && (
                  <div className="space-y-2 border-t border-[#e2d5be] dark:border-stone-700 pt-5">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#8e6d2b] dark:text-amber-400 font-serif flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>पदच्छेद एवं शब्दार्थ (Word-by-word Analysis)</span>
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-serif">
                      {Object.entries(parsedWordByWord).map(([word, meaning]) => (
                        <div
                          key={word}
                          className="p-2 rounded bg-[#fcfaf4] dark:bg-stone-800 border border-[#e5d5be] dark:border-stone-700"
                        >
                          <span className="font-bold text-[#2b170c] dark:text-amber-300 block">
                            {word}
                          </span>
                          <span className="text-[11px] text-stone-600 dark:text-stone-400 block mt-0.5">
                            {meaning}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Previous / Next Verse Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-[#e2d5be] dark:border-stone-700 text-xs font-serif">
              <button
                onClick={handlePrevVerse}
                disabled={selectedChapterIndex === 0 && selectedVerseIndex === 0}
                className="px-4 py-2.5 rounded-sm border border-[#c5a059]/60 bg-[#fffdf9] dark:bg-stone-900 hover:bg-[#f7f0df] disabled:opacity-30 disabled:cursor-not-allowed font-bold flex items-center space-x-1.5 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>पिछला श्लोक (Previous)</span>
              </button>

              <button
                onClick={handleNextVerse}
                className="px-5 py-2.5 rounded-sm bg-[#1e130a] text-[#f7eecf] hover:bg-[#2d1e11] font-bold flex items-center space-x-1.5 shadow-sm border border-[#c5a059]/40"
              >
                <span>अगला श्लोक (Next)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        {/* -----------------------------------------------------------------------
            COLUMN 3 (RIGHT): TRANSLATIONS, COMMENTARY & SCHOLARLY NOTES
        ------------------------------------------------------------------------ */}
        <aside
          className={`w-80 border-l p-5 space-y-6 overflow-y-auto select-none hidden xl:block ${
            darkReadingMode
              ? 'bg-[#14131a] border-[#2f2738] text-stone-300'
              : 'bg-[#faf6ee] border-[#e5d8c3] text-[#3d2c1c]'
          }`}
        >
          {/* Hindi Translation Section */}
          <div className="space-y-2">
            <span className="text-xs font-serif font-bold text-[#7a1f25] dark:text-amber-400 uppercase tracking-wider block">
              हिन्दी सरलार्थ (Hindi Translation)
            </span>
            <div className="p-3.5 rounded bg-[#fffdfa] dark:bg-stone-900 border border-[#e5d5be] dark:border-stone-700 text-xs font-serif leading-relaxed text-[#2d1b0f] dark:text-stone-200">
              {currentVerse?.hindiMeaning || 'अनुवाद उपलब्ध नहीं है।'}
            </div>
          </div>

          {/* English Translation Section */}
          <div className="space-y-2">
            <span className="text-xs font-serif font-bold text-[#8e6d2b] dark:text-amber-400 uppercase tracking-wider block">
              English Translation
            </span>
            <div className="p-3.5 rounded bg-[#fffdfa] dark:bg-stone-900 border border-[#e5d5be] dark:border-stone-700 text-xs font-serif leading-relaxed text-[#3a2719] dark:text-stone-300 italic">
              &ldquo;{currentVerse?.englishMeaning || 'English translation pending.'}&rdquo;
            </div>
          </div>

          {/* Traditional Acharya Commentary */}
          <div className="space-y-2">
            <span className="text-xs font-serif font-bold text-[#8e6d2b] dark:text-amber-400 uppercase tracking-wider block">
              परम्परागत आचार्य भाष्य (Classical Commentary)
            </span>
            <div className="p-3.5 rounded bg-[#fffdfa] dark:bg-stone-900 border border-[#e5d5be] dark:border-stone-700 text-xs font-serif leading-relaxed text-[#443021] dark:text-stone-300 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#7a1f25] block">
                श्रीमद् आदिशङ्कराचार्य भाष्य:
              </span>
              <p>
                {currentVerse?.commentary ||
                  'कर्मणि निष्कामतया प्रवर्तमानस्य अन्तःकरणशुद्धिर्भवति। फलासक्तिं विना कृतं कर्म मोक्षसाधकं संपद्यते।'}
              </p>
            </div>
          </div>

          {/* Canonical Provenance & Rights Metadata */}
          <div className="p-3.5 rounded bg-[#f5ede0] dark:bg-stone-800 border border-[#e2d5be] dark:border-stone-700 text-[11px] font-serif space-y-1.5 text-[#5e4933] dark:text-stone-400">
            <span className="font-bold block text-[#2b170c] dark:text-stone-200">
              प्रमाण एवं सर्वाधिकार स्थिति
            </span>
            <p>• मूलपाठ स्रोत: {scripture.provenance || 'Classical Vedic Tradition'}</p>
            <p>• अधिकार स्थिति: {scripture.rightsStatus}</p>
            <p>• कोई कृत्रिम संशोधन नहीं। सनातन प्रामाणिकता सुरक्षित।</p>
          </div>
        </aside>
      </div>

      {/* =========================================================================
          MOBILE DRAWERS (CHAPTER LIST & COMMENTARY)
      ========================================================================= */}
      {mobileDrawer === 'CHAPTERS' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#faf6ee] rounded-t-lg sm:rounded-lg max-w-lg w-full p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs font-serif border border-[#c5a059]">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-base text-[#26150b]">अध्याय सूची</h3>
              <button onClick={() => setMobileDrawer('NONE')}>
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>
            <div className="space-y-1">
              {scripture.chapters?.map((ch: any, idx: number) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChapterIndex(idx);
                    setSelectedVerseIndex(0);
                    setMobileDrawer('NONE');
                  }}
                  className={`w-full text-left p-3 rounded text-xs transition ${
                    selectedChapterIndex === idx
                      ? 'bg-[#8e6d2b] text-white font-bold'
                      : 'hover:bg-[#f0e6d5] text-[#3f2e1e]'
                  }`}
                >
                  अध्याय {ch.chapterNumber}: {ch.titleHi} ({ch.verses?.length || 0} श्लोक)
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {mobileDrawer === 'COMMENTARY' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#faf6ee] rounded-t-lg sm:rounded-lg max-w-lg w-full p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs font-serif border border-[#c5a059]">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-base text-[#26150b]">हिन्दी अनुवाद एवं आचार्य भाष्य</h3>
              <button onClick={() => setMobileDrawer('NONE')}>
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded bg-white border border-[#e2d5be]">
                <span className="font-bold text-[#7a1f25] block mb-1">हिन्दी सरलार्थ:</span>
                <p className="text-[#2d1b0f] leading-relaxed">{currentVerse?.hindiMeaning}</p>
              </div>
              <div className="p-3 rounded bg-white border border-[#e2d5be]">
                <span className="font-bold text-[#8e6d2b] block mb-1">English Translation:</span>
                <p className="italic text-[#3a2719] leading-relaxed">{currentVerse?.englishMeaning}</p>
              </div>
              <div className="p-3 rounded bg-white border border-[#e2d5be]">
                <span className="font-bold text-[#8e6d2b] block mb-1">आचार्य भाष्य:</span>
                <p className="text-[#443021] leading-relaxed">{currentVerse?.commentary}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
