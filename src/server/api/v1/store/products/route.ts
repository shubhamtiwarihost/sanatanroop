import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';

    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (featured) {
      where.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error('Products fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
