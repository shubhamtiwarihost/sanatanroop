import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { enforceAdminPermission } from '@/lib/api-auth';
import { logAuditAction } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const check = enforceAdminPermission(req, 'PRODUCTS', 'READ');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        product: { select: { titleEn: true, imageUrl: true } },
      },
    });

    const formatted = reviews.map((r) => ({
      ...r,
      status: 'APPROVED',
    }));

    return NextResponse.json({ success: true, reviews: formatted });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const check = enforceAdminPermission(req, 'PRODUCTS', 'DELETE');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Review ID required' }, { status: 400 });

    await prisma.review.delete({ where: { id } });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'DELETE',
      entityType: 'PRODUCT',
      entityId: id,
      details: { type: 'REVIEW_MODERATION' },
    });

    return NextResponse.json({ success: true, id });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
