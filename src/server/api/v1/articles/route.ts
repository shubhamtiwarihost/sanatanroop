import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';

    const where: any = { status: 'PUBLISHED' };
    if (category) {
      where.category = { slug: category };
    }
    if (featured) {
      where.isFeatured = true;
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error('Articles fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
