import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Transliteration / synonym dictionary for fuzzy and Devanagari matching
const SYNONYMS: Record<string, string[]> = {
  gita: ['geeta', 'bhagavad', 'भगवद्गीता', 'गीता'],
  shiva: ['siva', 'mahadev', 'mahadewa', 'शिव', 'महादेव', 'शंकर'],
  krishna: ['krsna', 'kanha', 'govinda', 'कृष्ण', 'गोविन्द'],
  durga: ['devi', 'shakti', 'mata', 'दुर्गा', 'शक्ति'],
  ganesha: ['ganpati', 'vinayaka', 'गणेश', 'विनायक'],
  upanishad: ['upanishat', 'vedanta', 'उपनिषद', 'उपनिषत्'],
  ram: ['rama', 'ramachandra', 'राम', 'श्रीराम'],
  moksha: ['mukti', 'liberation', 'मोक्ष', 'मुक्ति'],
  karma: ['action', 'karm', 'कर्म'],
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawQuery = (searchParams.get('q') || '').trim().toLowerCase();
    const typeFilter = searchParams.get('type') || 'ALL'; // ALL, SCRIPTURE, SHLOKA, DEITY, TEMPLE, FESTIVAL, ARTICLE, PRODUCT

    if (!rawQuery) {
      return NextResponse.json({ success: true, results: [], total: 0 });
    }

    // Expand search keywords with synonyms
    const queryTokens = rawQuery.split(/\s+/).filter(Boolean);
    const searchTerms = new Set<string>([rawQuery, ...queryTokens]);

    for (const token of queryTokens) {
      for (const [canonical, syns] of Object.entries(SYNONYMS)) {
        if (token === canonical || syns.includes(token)) {
          searchTerms.add(canonical);
          syns.forEach((s) => searchTerms.add(s.toLowerCase()));
        }
      }
    }

    const results: any[] = [];
    const termArray = Array.from(searchTerms);

    // Helper for multi-term or matching
    const matchesAny = (text: string | null | undefined): boolean => {
      if (!text) return false;
      const lower = text.toLowerCase();
      return termArray.some((t) => lower.includes(t));
    };

    // 1. Scriptures
    if (typeFilter === 'ALL' || typeFilter === 'SCRIPTURE') {
      const scriptures = await prisma.scripture.findMany({
        where: { published: true },
        include: {
          chapters: {
            include: {
              verses: true,
            },
          },
        },
      });

      for (const s of scriptures) {
        if (matchesAny(s.titleEn) || matchesAny(s.titleHi) || matchesAny(s.titleSa) || matchesAny(s.description)) {
          results.push({
            type: 'SCRIPTURE',
            id: s.id,
            slug: s.slug,
            url: `/scriptures/${s.slug}`,
            title: s.titleEn,
            subtitle: `${s.titleHi} (${s.titleSa})`,
            description: s.description,
            category: s.category,
          });
        }

        // Search inside book verses
        for (const ch of s.chapters) {
          for (const v of ch.verses) {
            if (
              matchesAny(v.sanskrit) ||
              matchesAny(v.transliteration) ||
              matchesAny(v.hindiMeaning) ||
              matchesAny(v.englishMeaning)
            ) {
              results.push({
                type: 'VERSE',
                id: v.id,
                slug: `${s.slug}?chapter=${ch.chapterNumber}&verse=${v.verseNumber}`,
                url: `/scriptures/${s.slug}?chapter=${ch.chapterNumber}&verse=${v.verseNumber}`,
                title: `${s.titleEn} - Chapter ${ch.chapterNumber}, Verse ${v.verseNumber}`,
                subtitle: v.sanskrit.split('\n')[0],
                description: v.englishMeaning,
                category: 'Sacred Verse',
              });
            }
          }
        }
      }
    }

    // 2. Shlokas
    if (typeFilter === 'ALL' || typeFilter === 'SHLOKA') {
      const shlokas = await prisma.shloka.findMany();
      for (const s of shlokas) {
        if (
          matchesAny(s.titleEn) ||
          matchesAny(s.titleHi) ||
          matchesAny(s.sanskrit) ||
          matchesAny(s.englishMeaning) ||
          matchesAny(s.hindiMeaning) ||
          matchesAny(s.tags)
        ) {
          results.push({
            type: 'SHLOKA',
            id: s.id,
            slug: s.slug,
            url: `/shlokas#${s.slug}`,
            title: s.titleEn,
            subtitle: s.titleHi,
            description: s.englishMeaning,
            category: 'Shloka',
          });
        }
      }
    }

    // 3. Deities
    if (typeFilter === 'ALL' || typeFilter === 'DEITY') {
      const deities = await prisma.deity.findMany();
      for (const d of deities) {
        if (
          matchesAny(d.nameEn) ||
          matchesAny(d.nameHi) ||
          matchesAny(d.nameSa) ||
          matchesAny(d.significanceEn) ||
          matchesAny(d.mantra)
        ) {
          results.push({
            type: 'DEITY',
            id: d.id,
            slug: d.slug,
            url: `/deities/${d.slug}`,
            title: d.nameEn,
            subtitle: d.nameHi,
            description: d.significanceEn,
            category: 'Deity Profile',
          });
        }
      }
    }

    // 4. Temples
    if (typeFilter === 'ALL' || typeFilter === 'TEMPLE') {
      const temples = await prisma.temple.findMany();
      for (const t of temples) {
        if (
          matchesAny(t.nameEn) ||
          matchesAny(t.nameHi) ||
          matchesAny(t.city) ||
          matchesAny(t.state) ||
          matchesAny(t.historyEn) ||
          matchesAny(t.deityName)
        ) {
          results.push({
            type: 'TEMPLE',
            id: t.id,
            slug: t.slug,
            url: `/temples/${t.slug}`,
            title: t.nameEn,
            subtitle: `${t.city}, ${t.state}`,
            description: t.historyEn,
            category: 'Sacred Temple',
          });
        }
      }
    }

    // 5. Festivals
    if (typeFilter === 'ALL' || typeFilter === 'FESTIVAL') {
      const festivals = await prisma.festival.findMany();
      for (const f of festivals) {
        if (
          matchesAny(f.nameEn) ||
          matchesAny(f.nameHi) ||
          matchesAny(f.descriptionEn) ||
          matchesAny(f.associatedDeity)
        ) {
          results.push({
            type: 'FESTIVAL',
            id: f.id,
            slug: f.slug,
            url: `/festivals/${f.slug}`,
            title: f.nameEn,
            subtitle: f.nameHi,
            description: f.descriptionEn,
            category: 'Sacred Festival',
          });
        }
      }
    }

    // 6. Articles
    if (typeFilter === 'ALL' || typeFilter === 'ARTICLE') {
      const articles = await prisma.post.findMany({ where: { status: 'PUBLISHED' } });
      for (const a of articles) {
        if (
          matchesAny(a.titleEn) ||
          matchesAny(a.titleHi) ||
          matchesAny(a.summaryEn) ||
          matchesAny(a.contentEn) ||
          matchesAny(a.tags)
        ) {
          results.push({
            type: 'ARTICLE',
            id: a.id,
            slug: a.slug,
            url: `/articles/${a.slug}`,
            title: a.titleEn,
            subtitle: a.titleHi,
            description: a.summaryEn,
            category: 'Dharma Article',
          });
        }
      }
    }

    // 7. Products
    if (typeFilter === 'ALL' || typeFilter === 'PRODUCT') {
      const products = await prisma.product.findMany();
      for (const p of products) {
        if (
          matchesAny(p.titleEn) ||
          matchesAny(p.titleHi) ||
          matchesAny(p.descriptionEn) ||
          matchesAny(p.category)
        ) {
          results.push({
            type: 'PRODUCT',
            id: p.id,
            slug: p.slug,
            url: `/store/${p.slug}`,
            title: p.titleEn,
            subtitle: `₹${p.price} (MRP: ₹${p.mrp})`,
            description: p.descriptionEn,
            category: 'Store Product',
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      query: rawQuery,
      total: results.length,
      results,
    });
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
