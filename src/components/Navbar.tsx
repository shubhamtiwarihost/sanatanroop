'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { SUPPORTED_LANGUAGES, Locale } from '@/i18n';
import { useAudio } from '@/context/AudioContext';
import { useCMS } from '@/context/CMSContext';
import {
  Search,
  Heart,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Globe,
  Volume2,
  VolumeX,
  BookOpen,
  Layers,
  Flame,
  Calendar,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, setLocale, t } = useLanguage();
  const { isPlaying, toggleAudio } = useAudio();
  const { headerMenu, siteIdentity } = useCMS();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mantrasDropdownOpen, setMantrasDropdownOpen] = useState(false);
  const [scripturesDropdownOpen, setScripturesDropdownOpen] = useState(false);
  const [inspirationModalOpen, setInspirationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistCount, setWishlistCount] = useState(3);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const dailyInspiration = {
    shloka: 'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥',
    transliteration: 'oṁ asato mā sadgamaya | tamaso mā jyotirgamaya | mṛtyormā amṛtaṁ gamaya ||',
    source: 'बृहदारण्यकोपनिषद् (1.3.28)',
    meaningHi: 'हे ईश्वर, हमें असत्य से सत्य की ओर ले चलें, अंधकार से प्रकाश की ओर ले चलें, और मृत्यु से अमरता की ओर ले चलें।',
    meaningEn: 'Lead us from the unreal to the real, from darkness to light, and from mortality to immortality.',
    contemplation: 'Today, focus on finding peace through inner awareness and righteous action. Every moment is an opportunity to practice Dharma.',
  };

  return (
    <>
      <header className="sticky top-0 z-50 shadow-md transition-colors font-sans">
        {/* Dynamic CMS Announcement Bar */}
        {siteIdentity?.announcementActive && siteIdentity?.announcementText && (
          <div className="bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#d97706] text-white text-[11px] font-semibold py-1.5 px-4 text-center tracking-wide shadow-sm flex items-center justify-center space-x-2">
            <span>{siteIdentity.announcementText}</span>
            {siteIdentity.announcementLink && (
              <Link href={siteIdentity.announcementLink} className="underline font-bold hover:text-amber-100">
                View Now →
              </Link>
            )}
          </div>
        )}

        {/* =========================================================================
            TIER 1: TOP WHITE ROW (Brand Logo, Search Bar, Account & Cart Actions)
        ========================================================================= */}
        <div className="bg-[#fffdfa] dark:bg-[#151210] border-b border-[#ebdcca] dark:border-[#2a201b] px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* 1. Brand Logo: Om badge + "SanatanRoop" + "Sanatan Gyan, Har Ghar Tak" */}
            <Link href="/" className="flex items-center space-x-3 shrink-0 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#ea580c] via-[#f97316] to-[#fb923c] flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <span className="font-serif text-2xl font-bold leading-none select-none">ॐ</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1c1917] dark:text-[#fbf8f2]">
                  <span className="text-[#ea580c]">Sanatan</span>Roop
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-sans tracking-tight">
                  Sanatan Gyan, Har Ghar Tak
                </span>
              </div>
            </Link>

            {/* 2. Center Pill Search Bar */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xl mx-4 relative items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mantras, shlokas, aartis, books, videos..."
                className="w-full bg-[#f6f3ed] dark:bg-[#201914] text-stone-800 dark:text-stone-100 placeholder-stone-400 text-sm rounded-full py-2.5 pl-5 pr-11 border border-[#e5dcce] dark:border-[#382b22] focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] shadow-inner transition"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-3.5 text-stone-400 hover:text-[#ea580c] transition"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* 3. Right Quick Actions: Audio, Language, Wishlist, Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              
              {/* Mantra Audio Ambient Player Toggle */}
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-full border transition ${
                  isPlaying
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-600 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 text-stone-500 hover:border-orange-400'
                }`}
                title={isPlaying ? 'Pause Vedic Chants' : 'Play Vedic Chants'}
              >
                {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Language Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:border-orange-400 transition"
                  title="Switch Language (हिन्दी / English / संस्कृतम्)"
                >
                  <Globe className="w-3.5 h-3.5 text-orange-600" />
                  <span className="uppercase text-[11px] font-mono">{locale}</span>
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-[#1e1713] rounded-lg shadow-xl border border-stone-200 dark:border-stone-700 py-1.5 z-50 text-xs">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLocale(lang.code as Locale);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 font-medium transition ${
                          locale === lang.code
                            ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 font-bold'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                        }`}
                      >
                        {lang.nativeLabel}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist Heart Icon */}
              <Link
                href="/shlokas?wishlist=true"
                className="p-2 text-stone-600 dark:text-stone-300 hover:text-[#ea580c] transition relative hidden sm:flex items-center justify-center"
                title="Sacred Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-700 dark:text-stone-300 hover:text-orange-600 xl:hidden"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TIER 2: SECOND DARK RIBBON (Nav Links + Daily Inspiration Button)
        ========================================================================= */}
        <div className="bg-[#1c1410] border-b border-[#2d221c] text-stone-200 text-xs font-medium px-4 sm:px-6 lg:px-8 hidden xl:block shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-11">
            
            {/* Navigation Category Links */}
            <nav className="flex items-center space-x-6 tracking-wide font-serif">
              <Link
                href="/"
                className={`transition hover:text-amber-400 font-semibold ${
                  pathname === '/' ? 'text-amber-400' : 'text-stone-200'
                }`}
              >
                Home
              </Link>

              {/* Slokas */}
              <Link
                href="/shlokas"
                className={`transition hover:text-amber-400 font-semibold ${
                  pathname === '/shlokas' ? 'text-amber-400' : 'text-stone-200'
                }`}
              >
                Slokas
              </Link>

              {/* Aartis */}
              <Link
                href="/aartis"
                className={`transition hover:text-amber-400 font-semibold ${
                  pathname === '/aartis' ? 'text-amber-400' : 'text-stone-200'
                }`}
              >
                Aartis
              </Link>

              {/* Kathas */}
              <Link
                href="/kathas"
                className={`transition hover:text-amber-400 font-semibold ${
                  pathname === '/kathas' ? 'text-amber-400' : 'text-stone-200'
                }`}
              >
                Kathas
              </Link>

              {/* Spiritual Books */}
              <Link
                href="/books"
                className={`transition hover:text-amber-400 font-semibold ${
                  pathname === '/books' ? 'text-amber-400' : 'text-stone-200'
                }`}
              >
                Spiritual Books
              </Link>

              {/* Divine Vibrations */}
              <Link
                href="/divine-vibrations"
                className={`transition hover:text-amber-400 font-semibold flex items-center space-x-1.5 ${
                  pathname === '/divine-vibrations' ? 'text-amber-400' : 'text-stone-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Divine Vibrations</span>
              </Link>

              <Link href="/blog" className="transition hover:text-amber-400 font-medium">
                Blog
              </Link>
              <Link href="/videos" className="transition hover:text-amber-400 font-medium">
                Videos
              </Link>
              <Link href="/community" className="transition hover:text-amber-400 font-medium">
                Community
              </Link>
              <Link href="/about" className="transition hover:text-amber-400 font-medium">
                About
              </Link>
              <Link href="/contact" className="transition hover:text-amber-400 font-medium">
                Contact
              </Link>
            </nav>

            {/* Right: Golden Daily Inspiration Button */}
            <button
              onClick={() => setInspirationModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs tracking-wide shadow-sm hover:shadow transition transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-900 fill-stone-900" />
              <span>Daily Inspiration</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#1c1410] text-stone-200 border-b border-stone-800 p-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search slokas, aartis, books, videos..."
                className="w-full bg-[#2a201a] text-stone-100 text-xs rounded-lg py-2 px-3 pr-8 border border-stone-700"
              />
              <button type="submit" className="absolute right-2.5 top-2.5 text-stone-400">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-stone-900/60 hover:text-amber-400"
              >
                Home
              </Link>
              <Link
                href="/shlokas"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-stone-900/60 hover:text-amber-400"
              >
                Slokas
              </Link>
              <Link
                href="/aartis"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-stone-900/60 hover:text-amber-400"
              >
                Aartis
              </Link>
              <Link
                href="/kathas"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-stone-900/60 hover:text-amber-400"
              >
                Kathas
              </Link>
              <Link
                href="/books"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-stone-900/60 hover:text-amber-400"
              >
                Spiritual Books
              </Link>
              <Link
                href="/divine-vibrations"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-stone-900/60 text-amber-300 font-medium hover:text-amber-400 flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Divine Vibrations</span>
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-stone-900/60 hover:text-amber-400"
              >
                Blog
              </Link>
              <Link
                href="/videos"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-stone-900/60 hover:text-amber-400"
              >
                Videos
              </Link>
              <Link
                href="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-stone-900/60 hover:text-amber-400"
              >
                Community
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-stone-900/60 hover:text-amber-400"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded bg-stone-900/60 hover:text-amber-400"
              >
                Contact
              </Link>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setInspirationModalOpen(true);
              }}
              className="w-full py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-lg flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daily Inspiration</span>
            </button>
          </div>
        )}
      </header>

      {/* =========================================================================
          DAILY INSPIRATION POPUP MODAL
      ========================================================================= */}
      {inspirationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in font-sans">
          <div className="bg-[#fffdfa] dark:bg-[#1a1411] border-2 border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            
            {/* Top Close Button */}
            <button
              onClick={() => setInspirationModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-serif">
              <Sparkles className="w-5 h-5 fill-amber-500" />
              <span className="font-bold text-sm tracking-wider uppercase">आज की पावन प्रेरणा • Daily Inspiration</span>
            </div>

            {/* Sacred Shloka Card */}
            <div className="bg-[#fcf8f0] dark:bg-[#231a15] p-5 rounded-xl border border-amber-200 dark:border-amber-900/50 text-center space-y-3">
              <span className="text-2xl font-serif text-amber-700 dark:text-amber-300 font-bold block leading-relaxed">
                {dailyInspiration.shloka}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 italic block font-mono">
                {dailyInspiration.transliteration}
              </span>
              <span className="text-[11px] text-amber-800/80 dark:text-amber-200/80 font-serif block font-semibold">
                — {dailyInspiration.source}
              </span>
            </div>

            {/* Meaning in Hindi and English */}
            <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <p className="font-serif">
                <span className="font-bold text-amber-700 dark:text-amber-400">भावार्थ: </span>
                {dailyInspiration.meaningHi}
              </p>
              <p className="font-serif">
                <span className="font-bold text-amber-700 dark:text-amber-400">Meaning: </span>
                {dailyInspiration.meaningEn}
              </p>
            </div>

            {/* Practical Contemplation */}
            <div className="bg-amber-500/10 p-3 rounded-lg border-l-4 border-amber-500 text-xs text-stone-800 dark:text-stone-200 font-serif">
              <span className="font-bold block mb-1">दैनिक विचार (Daily Contemplation):</span>
              {dailyInspiration.contemplation}
            </div>

            {/* Bottom Dismiss Button */}
            <button
              onClick={() => setInspirationModalOpen(false)}
              className="w-full py-2.5 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold text-xs transition shadow-md"
            >
              शुभ विचार आत्मसात करें (Accept & Close)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
