'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCMS } from '@/context/CMSContext';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { siteIdentity } = useCMS();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const brandName = siteIdentity?.brandName || 'Hindu Dharma';
  const tagline = siteIdentity?.tagline || 'Sanatan Gyan, Har Ghar Tak';

  return (
    <footer className="bg-[#111111] text-stone-300 border-t border-neutral-800 relative z-20">
      {/* Upper Main Footer Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand Identity */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-500 drop-shadow-sm group-hover:scale-105 transition-transform">
              ॐ
            </span>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wide text-white block leading-tight">
                {brandName}
              </span>
              <span className="text-[11px] tracking-wider text-stone-400 font-serif block">
                {tagline}
              </span>
            </div>
          </Link>

          {/* Middle 1: Navigation Links */}
          <nav className="flex items-center flex-wrap justify-center gap-5 sm:gap-7 text-xs sm:text-sm font-medium text-stone-300">
            <Link href="/about" className="hover:text-amber-400 transition-colors">
              About Us
            </Link>
            <Link href="/articles" className="hover:text-amber-400 transition-colors">
              Blog
            </Link>
            <Link href="/about#privacy" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about#terms" className="hover:text-amber-400 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Middle 2: Dharmic Trust Seal / Badge */}
          <div className="flex items-center space-x-2.5 shrink-0 px-2">
            <div className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-amber-500 bg-neutral-900 shadow-inner">
              <svg
                className="w-6 h-6 stroke-current text-amber-400"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeDasharray="2 2" />
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" />
                <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </div>
            <div className="text-[10px] sm:text-[11px] font-serif leading-tight text-stone-400">
              <p className="text-stone-200 font-medium">Spreading Dharma</p>
              <p>Spreading Positivity</p>
              <p>Spreading Humanity</p>
            </div>
          </div>

          {/* Right: Social Media Icons + Scroll to Top */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-[#242424] hover:bg-amber-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-[#242424] hover:bg-amber-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-[#242424] hover:bg-amber-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-8 h-8 rounded-full bg-[#242424] hover:bg-amber-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="w-8 h-8 rounded-full bg-[#242424] hover:bg-amber-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.94-.13-2.39.03-3.42l1.1-4.66s-.28-.56-.28-1.39c0-1.3.76-2.28 1.7-2.28.8 0 1.19.6 1.19 1.33 0 .81-.52 2.01-.78 3.13-.22.94.47 1.7 1.4 1.7 1.68 0 2.97-1.77 2.97-4.33 0-2.26-1.63-3.85-3.95-3.85-2.7 0-4.28 2.02-4.28 4.11 0 .81.31 1.68.71 2.16.08.09.09.18.06.32l-.27 1.09c-.04.18-.15.22-.34.13-1.27-.59-2.06-2.45-2.06-3.95 0-3.21 2.33-6.16 6.73-6.16 3.53 0 6.28 2.52 6.28 5.88 0 3.51-2.21 6.34-5.28 6.34-1.03 0-2-.54-2.34-1.17l-.63 2.42c-.23.88-.86 1.99-1.28 2.67A11.99 11.99 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
              </svg>
            </a>

            {/* Scroll-to-Top Button */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-[#242424] hover:bg-amber-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer ml-1.5 group"
              title="Scroll to Top"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* Lower Sub-Footer Bar */}
      <div className="border-t border-neutral-800/80 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2">
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <p className="flex items-center space-x-1 font-serif text-stone-400">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>for a Better World</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
