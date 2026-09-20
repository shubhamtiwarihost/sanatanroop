import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const majorOnly = searchParams.get('major') === 'true';

    const where: any = {};
    if (majorOnly) {
      where.isMajor = true;
    }

    const festivals = await prisma.festival.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ success: true, festivals });
  } catch (error: any) {
    console.error('Festivals fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch festivals' }, { status: 500 });
  }
}
