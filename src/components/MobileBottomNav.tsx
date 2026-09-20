'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { BookOpen, Sparkles, Music, Flame, Search, User } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const links = [
    { href: '/shlokas', label: 'Slokas', icon: Sparkles },
    { href: '/aartis', label: 'Aartis', icon: Music },
    { href: '/kathas', label: 'Kathas', icon: Flame },
    { href: '/books', label: 'Books', icon: BookOpen },
    { href: '/login', label: t.nav.account, icon: User },
  ];

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fdfaf3]/95 dark:bg-[#121216]/95 backdrop-blur-md border-t border-[#e5d4b8] dark:border-[#382b1b] px-2 py-2 flex items-center justify-around shadow-lg">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold transition ${
              isActive
                ? 'text-saffron-700 dark:text-gold-300 font-bold'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="truncate max-w-[60px]">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
