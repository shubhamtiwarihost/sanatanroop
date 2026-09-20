import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const deities = await prisma.deity.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        temples: {
          select: {
            id: true,
            slug: true,
            nameEn: true,
            nameHi: true,
            state: true,
            city: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, deities });
  } catch (error: any) {
    console.error('Deities fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch deities' }, { status: 500 });
  }
}
