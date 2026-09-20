import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get('state');

    const where: any = {};
    if (state) {
      where.state = state;
    }

    const temples = await prisma.temple.findMany({
      where,
      orderBy: { createdAt: 'asc' },
      include: {
        primaryDeity: {
          select: {
            id: true,
            slug: true,
            nameEn: true,
            nameHi: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, temples });
  } catch (error: any) {
    console.error('Temples fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch temples' }, { status: 500 });
  }
}
