import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const popularOnly = searchParams.get('popular') === 'true';

    const where: any = {};
    if (popularOnly) {
      where.isPopular = true;
    }

    const shlokas = await prisma.shloka.findMany({
      where,
      orderBy: { id: 'asc' },
    });

    return NextResponse.json({ success: true, shlokas });
  } catch (error: any) {
    console.error('Shlokas fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch shlokas' }, { status: 500 });
  }
}
