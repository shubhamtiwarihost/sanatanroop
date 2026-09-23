'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCMS } from '@/context/CMSContext';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Search,
  BookOpen,
  Sparkles,
  ChevronRight,
  Filter,
  Check,
  X,
  FileText,
  Download,
  Info,
  ShieldCheck,
} from 'lucide-react';

import { BOOKS_DATA, BookItem } from '@/data/booksData';
import BookPayModal, { PayBookInfo } from '@/components/BookPayModal';

export type { BookItem };
export { BOOKS_DATA };

/**
 * Realistic 3D Hardcover Book Form Component
 * Displays an authentic Indian spiritual book format with:
 * - Color Code: #FF9933 (Sacred Saffron) for ALL books
 * - 3D Spine & embossed spine ribs
 * - Gold/white foil ornate filigree borders
 * - Sacred emblem & Devanagari typography
 * - Stacked paper edges on the right
 * - Saffron satin ribbon bookmark hanging out
 * - Realistic 3D depth, perspective, and hover animation
 */
function Book3DForm({ book, onOpen }: { book: BookItem; onOpen: () => void }) {
  const coverTheme = book.coverTheme || {
    bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
    accentColor: '#FF9933',
    borderColor: 'border-[#FF9933]',
    emblem: '🕉️',
    sacredHeader: '॥ ॐ श्री परमात्मने नमः ॥',
    spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
  };

  return (
    <div
      onClick={onOpen}
      className="relative group cursor-pointer perspective-[1200px] flex justify-center items-center py-6 select-none"
    >
      {/* Wooden / Pedestal Base Shadow */}
      <div className="absolute bottom-3 w-48 h-4 bg-black/35 rounded-full blur-md transform group-hover:scale-110 group-hover:blur-lg transition-all duration-500 pointer-events-none" />

      {/* Main 3D Book Container - ALL BOOKS USE #FF9933 */}
      <div
        className="relative w-[210px] sm:w-[230px] h-[310px] sm:h-[330px] rounded-r-xl transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:-translate-y-2 group-hover:-rotate-y-6 shadow-[14px_18px_30px_rgba(0,0,0,0.45),2px_4px_8px_rgba(0,0,0,0.2)] flex flex-col justify-between overflow-hidden"
        style={{
          backgroundColor: '#FF9933',
          backgroundImage: 'linear-gradient(135deg, #FF9933 0%, #f58418 50%, #d96e00 100%)',
          boxShadow:
            '16px 20px 32px rgba(0, 0, 0, 0.45), 2px 2px 4px rgba(0, 0, 0, 0.25), inset -2px 0 6px rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Subtle Silk / Leather Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/20 pointer-events-none" />

        {/* 3D Curved Left Spine with Saffron-Gold Leather Ribs */}
        <div className="absolute left-0 top-0 bottom-0 w-8 z-30 bg-gradient-to-r from-[#7a3800] via-[#a84d00] to-[#662f00] pointer-events-none">
          {/* Spine 3D Highlight & Shadow */}
          <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="absolute inset-y-0 left-2 w-[1px] bg-[#FF9933]/60" />
          <div className="absolute inset-y-0 left-3 w-[1px] bg-black/50" />

          {/* Golden Horizontal Embossed Ribs on Spine */}
          <div className="absolute top-10 left-1 right-2 h-[2px] bg-[#FF9933] shadow-sm" />
          <div className="absolute top-11 left-1 right-2 h-[1px] bg-black/60" />

          <div className="absolute top-1/2 left-1 right-2 h-[2px] bg-[#FF9933] shadow-sm" />
          <div className="absolute top-[calc(50%+1px)] left-1 right-2 h-[1px] bg-black/60" />

          <div className="absolute bottom-10 left-1 right-2 h-[2px] bg-[#FF9933] shadow-sm" />
          <div className="absolute bottom-9 left-1 right-2 h-[1px] bg-black/60" />
        </div>

        {/* Right Stacked Pages Edge (Realistic 3D Paper Layers) */}
        <div className="absolute -right-3 top-2.5 bottom-2.5 w-3 bg-gradient-to-r from-[#d1c6b2] via-[#ece5d8] to-[#bfb29c] rounded-r-sm z-0 flex flex-col justify-around py-2 shadow-inner">
          <div className="w-full h-[1px] bg-[#9e9079]/40" />
          <div className="w-full h-[1px] bg-[#9e9079]/30" />
          <div className="w-full h-[1px] bg-[#9e9079]/40" />
          <div className="w-full h-[1px] bg-[#9e9079]/30" />
          <div className="w-full h-[1px] bg-[#9e9079]/40" />
        </div>

        {/* Hanging Satin Bookmark Ribbon in #FF9933 */}
        <div className="absolute -bottom-4 right-7 w-4 h-9 bg-gradient-to-b from-[#b35900] via-[#FF9933] to-[#804000] z-40 shadow-md transform rotate-3">
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-transparent border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black/30" />
        </div>

        {/* PDF Badge if attached */}
        {book.pdfUrl && (
          <div className="absolute top-2.5 right-2.5 z-40 bg-red-600/95 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow flex items-center gap-1 border border-red-400/50">
            <FileText className="w-2.5 h-2.5" />
            <span>PDF ग्रंथ</span>
          </div>
        )}

        {/* Ornate Double-Line Border (Front Cover) */}
        <div className="relative z-10 m-2.5 ml-7 p-3 border-2 border-amber-100/90 rounded-r-lg h-[calc(100%-20px)] flex flex-col justify-between bg-black/10 backdrop-blur-[0.5px]">
          
          {/* Inner hairline border */}
          <div className="absolute inset-1 border border-white/50 rounded-r-md pointer-events-none" />

          {/* Corner Flourishes */}
          <span className="absolute top-1.5 left-1.5 text-white text-[9px]">❖</span>
          <span className="absolute top-1.5 right-1.5 text-white text-[9px]">❖</span>
          <span className="absolute bottom-1.5 left-1.5 text-white text-[9px]">❖</span>
          <span className="absolute bottom-1.5 right-1.5 text-white text-[9px]">❖</span>

          {/* Top Header Inscription */}
          <div className="text-center pt-1">
            <span className="text-[10px] font-serif font-bold tracking-widest text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] block truncate">
              {coverTheme.sacredHeader || '॥ ॐ नमः शिवाय ॥'}
            </span>
          </div>

          {/* Center Title & Emblem Area */}
          <div className="text-center my-auto space-y-2">
            {/* Sacred Emblem in Golden Circle */}
            <div className="mx-auto w-12 h-12 rounded-full border-2 border-amber-950/40 bg-white/25 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(255,153,51,0.5)]">
              <span>{coverTheme.emblem || '🕉️'}</span>
            </div>

            {/* Book Title in Heavy Embossed Devanagari */}
            <h4
              className="text-lg sm:text-xl font-serif font-bold text-stone-950 tracking-wide leading-snug drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)] line-clamp-2"
              style={{
                textShadow: '0 1px 2px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.4)',
              }}
            >
              {book.titleHi}
            </h4>

            {/* English Subtitle */}
            <span className="block text-[10px] font-serif font-bold tracking-wider text-stone-900/90 uppercase truncate">
              {book.titleEn}
            </span>
          </div>

          {/* Bottom Author info */}
          <div className="text-center pb-1 border-t border-amber-950/30 pt-1.5 space-y-0.5">
            <span className="block text-[9px] font-serif text-stone-950 font-bold truncate">
              {book.author}
            </span>
            <span className="block text-[8px] font-serif text-stone-900 font-semibold truncate">
              {book.categoryLabel || 'सनातन ग्रंथ'}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SpiritualBooksPage() {
  const { books } = useCMS();
  const allBooks = useMemo<BookItem[]>(() => {
    if (!books || books.length === 0) return BOOKS_DATA;
    return books.map((b) => {
      const existing = BOOKS_DATA.find((item) => item.id === b.id);
      return {
        id: b.id,
        titleHi: b.titleHi,
        titleEn: b.titleEn,
        category: (b.category as any) || 'gita',
        categoryLabel: b.categoryLabel || 'सनातन धर्मग्रंथ',
        author: b.author || 'महर्षि वेदव्यास',
        versesCount: b.versesCount || 'सम्पूर्ण पावन ग्रंथ',
        languages: existing?.languages || ['संस्कृत', 'हिन्दी', 'English'],
        coverTheme: existing?.coverTheme || {
          bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
          accentColor: b.colorCode || '#FF9933',
          borderColor: 'border-[#FF9933]',
          emblem: '🕉️',
          sacredHeader: '॥ ॐ श्री परमात्मने नमः ॥',
          spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
        },
        shortSummary: b.shortSummary || '',
        fullOverview: b.fullOverview || '',
        sampleChapterTitle: existing?.sampleChapterTitle || '',
        sampleVerseSanskrit: '',
        sampleVerseHindi: '',
        sampleVerseEnglish: '',
        readOnlineUrl: b.readOnlineUrl || `/books/${b.id}`,
        pdfUrl: b.pdfUrl,
        pdfFileName: b.pdfFileName,
        pdfFileSize: b.pdfFileSize,
      };
    });
  }, [books]);

  const { locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewBook, setPreviewBook] = useState<BookItem | null>(null);
  const [payBook, setPayBook] = useState<PayBookInfo | null>(null);

  const filteredBooks = useMemo(() => {
    return allBooks.filter((b) => {
      const matchesCategory =
        activeCategory === 'all' || b.category === activeCategory;
      const matchesSearch =
        b.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.shortSummary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allBooks, activeCategory, searchQuery]);

  const categories = [
    { id: 'all', label: locale === 'en' ? 'All Books' : locale === 'sa' ? 'सर्वे ग्रन्थाः' : 'सभी ग्रंथ (All Books)' },
    { id: 'gita', label: locale === 'en' ? 'Bhagavad Gita' : locale === 'sa' ? 'श्रीमद्भगवद्गीता' : 'श्रीमद्भगवद्गीता' },
    { id: 'itihasa', label: locale === 'en' ? 'Itihasa & Stotras' : locale === 'sa' ? 'इतिहासः' : 'रामायण, महाभारत व स्तोत्र' },
    { id: 'upanishads', label: locale === 'en' ? 'Upanishads' : locale === 'sa' ? 'उपनिषदः' : 'उपनिषद (Upanishads)' },
    { id: 'vedas', label: locale === 'en' ? 'Four Vedas' : locale === 'sa' ? 'चत्वारः वेदाः' : 'चार वेद (Vedas)' },
    { id: 'puranas', label: locale === 'en' ? 'Maha Puranas' : locale === 'sa' ? 'महापुराणानि' : 'महापुराण (Puranas)' },
    { id: 'darshana', label: locale === 'en' ? 'Philosophy' : locale === 'sa' ? 'दर्शनम्' : 'दर्शन व नीति (Philosophy)' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120b08] text-stone-900 dark:text-stone-100 pb-20 transition-colors">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 text-white py-14 sm:py-20 px-4 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-serif">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-amber-100">सनातन डिजिटल ग्रंथालय • Sanatan Digital Library</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-amber-50 drop-shadow-md">
            सनातन धर्मग्रंथ एवं पाण्डुलिपियां
          </h1>

          <p className="max-w-3xl mx-auto text-stone-200 font-serif text-sm sm:text-base leading-relaxed">
            वेद, उपनिषद, श्रीमद्भगवद्गीता, महाभारत, रामायण एवं नीति शास्त्रों की पावन डिजिटल पुस्तकें। 
            प्रत्येक ग्रंथ को डिजिटल बुक रीडर में दो-पृष्ठ दृश्य के साथ पढ़ें अथवा सम्पूर्ण मूल PDF डाउनलोड करें।
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ग्रंथ का नाम अथवा रचयिता खोजें (उदा. गीता, महाभारत, तुलसीदास)..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/95 dark:bg-[#1f1510]/95 text-stone-900 dark:text-amber-100 border border-amber-300/40 shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-serif placeholder:text-stone-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-semibold whitespace-nowrap transition ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-white dark:bg-[#1a1411] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-[#1a1411] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              
              {/* TOP: 3D REALISTIC HARDCOVER BOOK DISPLAY */}
              <div className="bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100/60 dark:from-[#211611] dark:via-[#19100c] dark:to-[#211611] pt-6 pb-2 border-b border-stone-200 dark:border-stone-800/80">
                <Book3DForm book={book} onOpen={() => setPreviewBook(book)} />
                <div className="text-center pb-2">
                  <span
                    className="text-[11px] font-serif text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition flex items-center justify-center space-x-1 cursor-pointer"
                    onClick={() => setPreviewBook(book)}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>स्पर्श करके विवरण देखें (Click for Book Info)</span>
                  </span>
                </div>
              </div>

              {/* BOTTOM: BOOK METADATA & ACTIONS */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-3">
                  {/* Badge Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-serif">
                      {book.categoryLabel || 'सनातन ग्रंथ'}
                    </span>
                    {book.pdfUrl && (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-serif font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> PDF उपलब्ध
                      </span>
                    )}
                  </div>

                  {/* Title and Author */}
                  <div>
                    <h3
                      onClick={() => setPreviewBook(book)}
                      className="font-serif font-bold text-xl text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition cursor-pointer"
                    >
                      {book.titleHi}
                    </h3>
                    <span className="text-xs text-stone-500 font-serif block mt-0.5">
                      रचयिता: <strong className="text-stone-700 dark:text-stone-300">{book.author}</strong>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif leading-relaxed line-clamp-3">
                    {book.shortSummary}
                  </p>

                  {/* Languages Available */}
                  <div className="flex items-center space-x-1.5 pt-1">
                    <span className="text-[10px] text-stone-400 font-semibold uppercase">भाषा:</span>
                    {book.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-serif bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-md"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* Primary Button: Read Book */}
                    <Link
                      href={`/books/${book.id}`}
                      className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-3.5 py-2.5 rounded-xl text-xs font-serif shadow-md transition transform hover:-translate-y-0.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>पुस्तक पढ़ें (Read)</span>
                    </Link>

                    {/* Secondary Button: Download PDF (Opens Pay Modal) */}
                    {book.pdfUrl && (
                      <button
                        onClick={() => setPayBook(book)}
                        className="inline-flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2.5 rounded-xl text-xs font-serif shadow-md transition transform hover:-translate-y-0.5"
                        title="PDF डाउनलोड करें (₹20 / $5)"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF (₹20)</span>
                      </button>
                    )}
                  </div>

                  {/* Tertiary: Preview / Details */}
                  <button
                    onClick={() => setPreviewBook(book)}
                    className="inline-flex items-center space-x-1 text-xs font-serif text-stone-600 dark:text-stone-400 hover:text-amber-600 py-2 px-2.5 rounded-xl border border-stone-200 dark:border-stone-700 transition"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>विवरण</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="p-12 text-center bg-white dark:bg-[#1a1411] rounded-3xl border border-stone-200 dark:border-stone-800 mt-6">
            <p className="font-serif text-stone-500 text-base">कोई ग्रंथ नहीं मिला। कृपया दूसरा शब्द खोजें।</p>
          </div>
        )}

      </div>

      {/* Book Detail & Overview Modal (NO SHLOKAS / SLOG - PURE BOOK INFORMATION) */}
      {previewBook && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#1c130e] rounded-3xl border border-amber-500/40 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 animate-scale-up relative text-stone-900 dark:text-stone-100">
            
            <button
              onClick={() => setPreviewBook(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Book Header in Modal */}
            <div className="flex items-start gap-4 pr-8">
              <div
                className="w-16 h-22 rounded-r-md border border-amber-300 p-2 flex flex-col justify-between shrink-0 shadow-md text-stone-950 font-serif font-bold text-center"
                style={{
                  backgroundColor: '#FF9933',
                  backgroundImage: 'linear-gradient(135deg, #FF9933 0%, #e67300 100%)',
                }}
              >
                <span className="text-sm">🕉️</span>
                <span className="text-[10px] leading-tight font-bold line-clamp-2">{previewBook.titleHi}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-serif">
                  {previewBook.categoryLabel || 'सनातन ग्रंथ'}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-amber-100">
                  {previewBook.titleHi}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                  {previewBook.titleEn}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-300 font-serif pt-1">
                  रचयिता: <strong className="text-amber-700 dark:text-amber-400">{previewBook.author}</strong>
                </p>
              </div>
            </div>

            {/* Short Summary Card */}
            <div className="bg-[#faf6ee] dark:bg-[#251912] border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 font-serif">
                संक्षिप्त सार (Short Summary)
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-serif leading-relaxed">
                {previewBook.shortSummary}
              </p>
            </div>

            {/* Full Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-serif">
                सम्पूर्ण ग्रंथ परिचय एवं महत्व (Book Overview)
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-serif leading-relaxed whitespace-pre-line">
                {previewBook.fullOverview || previewBook.shortSummary}
              </p>
            </div>

            {/* Languages and Availability */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs font-serif">
              <div className="flex items-center space-x-2 text-stone-500">
                <span>उपलब्ध भाषाएँ:</span>
                <div className="flex gap-1.5">
                  {previewBook.languages.map((l, i) => (
                    <span key={i} className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded text-[10px]">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              {previewBook.pdfFileSize && (
                <span className="text-stone-500 font-mono text-[11px]">
                  PDF आकार: {previewBook.pdfFileSize}
                </span>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/books/${previewBook.id}`}
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 px-6 py-2.5 rounded-xl text-xs font-bold font-serif shadow-md transition inline-flex items-center space-x-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>डिजिटल ग्रंथालय में पढ़ें (Read Book)</span>
              </Link>

              {previewBook.pdfUrl && (
                <button
                  onClick={() => {
                    const b = previewBook;
                    setPreviewBook(null);
                    setPayBook(b);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold font-serif shadow-md transition inline-flex items-center space-x-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF डाउनलोड करें (₹20 / $5)</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Pay & Download Modal (₹20 / $5 with UPI & QR methods) */}
      <BookPayModal
        isOpen={!!payBook}
        onClose={() => setPayBook(null)}
        book={payBook}
      />

      {/* Schema.org Book & ItemList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'सनातन डिजिटल पुस्तकालय - SanatanRoop Sacred Spiritual Books Library',
            description:
              'वेद, उपनिषद, श्रीमद्भगवद्गीता, रामायण, पुराण एवं दर्शन के प्रामाणिक डिजिटल ग्रन्थ सम्पूर्ण अर्थ एवं व्याख्या सहित।',
            url: 'https://sanatanroop.com/books',
            itemListElement: allBooks.map((book, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              item: {
                '@type': 'Book',
                name: book.titleHi,
                alternateName: book.titleEn,
                author: {
                  '@type': 'Person',
                  name: book.author,
                },
                description: book.shortSummary,
                inLanguage: ['hi', 'sa', 'en'],
                genre: book.categoryLabel,
                url: `https://sanatanroop.com${book.readOnlineUrl || '/books'}`,
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
                name: 'डिजिटल ग्रन्थालय (Spiritual Books)',
                item: 'https://sanatanroop.com/books',
              },
            ],
          }),
        }}
      />
    </div>
  );
}
