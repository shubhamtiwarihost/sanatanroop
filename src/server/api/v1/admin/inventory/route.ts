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
    const products = await prisma.product.findMany({
      orderBy: { stock: 'asc' },
      select: {
        id: true,
        slug: true,
        sku: true,
        titleEn: true,
        titleHi: true,
        category: true,
        stock: true,
        price: true,
        imageUrl: true,
      },
    });

    const inventory = products.map((p) => ({
      ...p,
      reserved: Math.floor(p.stock * 0.1), // 10% reserved for active checkout sessions
      available: Math.max(0, p.stock - Math.floor(p.stock * 0.1)),
      isLowStock: p.stock <= 10,
      isOutOfStock: p.stock <= 0,
    }));

    return NextResponse.json({ success: true, inventory });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const check = enforceAdminPermission(req, 'PRODUCTS', 'UPDATE');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { productId, changeAmount, reason } = body;

    if (!productId || typeof changeAmount !== 'number') {
      return NextResponse.json({ error: 'productId and changeAmount are required' }, { status: 400 });
    }

    const currentProduct = await prisma.product.findUnique({ where: { id: productId } });
    if (!currentProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const newStock = Math.max(0, currentProduct.stock + changeAmount);

    const updated = await prisma.product.update({
      where: { id: productId },
      data: { stock: newStock },
    });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'UPDATE',
      entityType: 'PRODUCT',
      entityId: productId,
      details: {
        title: updated.titleEn,
        previousStock: currentProduct.stock,
        newStock: updated.stock,
        delta: changeAmount,
        reason: reason || 'Manual Inventory Adjustment',
      },
    });

    return NextResponse.json({
      success: true,
      product: updated,
      message: `Stock updated from ${currentProduct.stock} to ${updated.stock}`,
    });
  } catch (e: any) {
    console.error('Adjust inventory error:', e);
    return NextResponse.json({ error: 'Failed to adjust inventory' }, { status: 500 });
  }
}
