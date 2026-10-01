import { MetadataRoute } from 'next';
import { BOOKS_DATA } from '@/data/booksData';
import { ALL_STORE_PRODUCTS } from '@/data/storeProducts';
import { generateStaticParams as articleParams } from './articles/[slug]/page';
import { generateStaticParams as scriptureParams } from './scriptures/[slug]/page';

// Only canonical, indexable URLs (trailing slash matches the served pages)
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sanatanroop.com';
  const now = new Date();

  const sections = [
    'scriptures',
    'shlokas',
    'aartis',
    'kathas',
    'books',
    'calendar',
    'festivals',
    'deities',
    'temples',
    'divine-vibrations',
    'videos',
    'articles',
    'blog',
    'store',
    'ai-guide',
    'community',
    'about',
    'contact',
    'privacy',
    'terms',
  ];

  const entry = (path: string, priority: number, changeFrequency: 'daily' | 'weekly' | 'monthly') => ({
    url: `${baseUrl}/${path}${path ? '/' : ''}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry('', 1.0, 'daily'),
    ...sections.map((s) => entry(s, 0.8, 'daily' as const)),
    ...scriptureParams().map((p) => entry(`scriptures/${p.slug}`, 0.9, 'weekly')),
    ...BOOKS_DATA.map((b) => entry(`books/${b.id}`, 0.9, 'weekly')),
    ...articleParams().map((p) => entry(`articles/${p.slug}`, 0.8, 'weekly')),
    ...ALL_STORE_PRODUCTS.map((p) => entry(`store/${p.slug}`, 0.6, 'weekly')),
  ];
}
