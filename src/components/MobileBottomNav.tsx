'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Flame, BookOpen, PlaySquare } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const tabs = [
    { href: '/', labelHi: 'होम', labelEn: 'Home', icon: Home },
    { href: '/calendar', labelHi: 'पंचांग', labelEn: 'Panchang', icon: Calendar },
    { href: '/aartis', labelHi: 'आरती', labelEn: 'Aartis', icon: Flame },
    { href: '/books', labelHi: 'ग्रंथ', labelEn: 'Books', icon: BookOpen },
    { href: '/videos', labelHi: 'वीडियो', labelEn: 'Videos', icon: PlaySquare },
  ];

  return (
    <nav
      aria-label="Mobile Android Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#151210]/95 dark:bg-[#0f0d0b]/95 backdrop-blur-xl border-t border-amber-500/30 shadow-[0_-4px_25px_rgba(0,0,0,0.4)] pb-[max(env(safe-area-inset-bottom),0.4rem)] pt-1.5 px-3 select-none"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            pathname === tab.href ||
            (tab.href !== '/' && pathname?.startsWith(tab.href));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 group relative ${
                isActive ? 'text-amber-400' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {/* Android M3 Active Indicator Pill */}
              <div
                className={`flex items-center justify-center px-4 py-1 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/25 to-orange-500/25 border border-amber-500/40 shadow-sm shadow-amber-500/20'
                    : 'bg-transparent group-active:scale-95'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive
                      ? 'stroke-[2.5] text-amber-400 scale-110'
                      : 'stroke-[1.8] text-stone-400 group-hover:text-stone-200'
                  }`}
                />
              </div>

              {/* Tab Title */}
              <span
                className={`text-[11px] mt-0.5 tracking-tight font-serif transition-colors ${
                  isActive
                    ? 'font-bold text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                    : 'font-medium text-stone-400'
                }`}
              >
                {tab.labelHi}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
