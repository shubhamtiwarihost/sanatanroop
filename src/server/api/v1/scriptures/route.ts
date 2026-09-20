import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const where: any = { published: true };
    if (category) {
      where.category = category;
    }

    const scriptures = await prisma.scripture.findMany({
      where,
      include: {
        collection: true,
        chapters: {
          select: {
            id: true,
            chapterNumber: true,
            titleEn: true,
            titleHi: true,
            titleSa: true,
            summaryEn: true,
            versesCount: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    const collections = await prisma.scriptureCollection.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, collections, scriptures });
  } catch (error: any) {
    console.error('Scriptures fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch scriptures' }, { status: 500 });
  }
}
