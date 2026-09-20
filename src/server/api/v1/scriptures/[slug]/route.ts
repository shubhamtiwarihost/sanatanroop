import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export function generateStaticParams() {
  return [
    { slug: 'bhagavad-gita' },
    { slug: 'isha-upanishad' },
    { slug: 'mandukya-upanishad' },
    { slug: 'rigveda-samhita' },
  ];
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const scripture = await prisma.scripture.findUnique({
      where: { slug },
      include: {
        collection: true,
        chapters: {
          orderBy: { chapterNumber: 'asc' },
          include: {
            verses: {
              orderBy: { verseNumber: 'asc' },
            },
          },
        },
      },
    });

    if (!scripture) {
      return NextResponse.json({ error: 'Scripture not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, scripture });
  } catch (error: any) {
    console.error('Scripture detail fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch scripture' }, { status: 500 });
  }
}
