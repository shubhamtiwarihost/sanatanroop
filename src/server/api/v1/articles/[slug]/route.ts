import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export function generateStaticParams() {
  return [
    { slug: 'four-purusharthas' },
    { slug: 'benefits-of-daily-mantra-meditation' },
    { slug: 'significance-of-ekadashi-vrat' },
    { slug: 'life-lessons-from-bhagavad-gita' },
  ];
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error('Article detail error:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}
