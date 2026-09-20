import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { enforceAdminPermission } from '@/lib/api-auth';
import { logAuditAction } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const check = enforceAdminPermission(req, 'ORDERS', 'READ');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        items: {
          include: {
            product: { select: { titleEn: true, imageUrl: true } },
          },
        },
      },
    });
    return NextResponse.json({ success: true, orders });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const check = enforceAdminPermission(req, 'ORDERS', 'UPDATE');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { orderId, status, trackingNumber } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'orderId and status are required' }, { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        ...(trackingNumber ? { trackingNumber } : {}),
      },
      include: { user: true },
    });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'UPDATE',
      entityType: 'ORDER',
      entityId: orderId,
      details: {
        orderNumber: updated.orderNumber,
        status: updated.status,
        trackingNumber: updated.trackingNumber,
      },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (e: any) {
    console.error('Update order error:', e);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}
