import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { enforceAdminPermission } from '@/lib/api-auth';
import { logAuditAction } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const check = enforceAdminPermission(req, 'PRODUCTS', 'CREATE');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      titleEn,
      titleHi,
      titleSa,
      slug,
      category = 'BOOKS',
      descriptionEn,
      descriptionHi,
      price,
      mrp,
      stock = 10,
      sku,
      imageUrl,
      specifications,
      isFeatured = false,
    } = body;

    if (!titleEn || !slug || !price || !sku) {
      return NextResponse.json({ error: 'titleEn, slug, price, and sku are required' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        slug: slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
        titleEn,
        titleHi: titleHi || titleEn,
        titleSa: titleSa || titleEn,
        category,
        descriptionEn: descriptionEn || titleEn,
        descriptionHi: descriptionHi || descriptionEn || titleEn,
        price: Number(price),
        mrp: Number(mrp || price),
        stock: Number(stock),
        sku: sku.toUpperCase().trim(),
        imageUrl: imageUrl || '/images/products/placeholder.jpg',
        specifications: typeof specifications === 'object' ? JSON.stringify(specifications) : specifications,
        isFeatured: Boolean(isFeatured),
      },
    });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'CREATE',
      entityType: 'PRODUCT',
      entityId: product.id,
      details: {
        titleEn: product.titleEn,
        sku: product.sku,
        price: product.price,
        stock: product.stock,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (e: any) {
    console.error('Create product error:', e);
    return NextResponse.json({ error: e.message || 'Failed to create product' }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

    const deleted = await prisma.product.delete({ where: { id } });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'DELETE',
      entityType: 'PRODUCT',
      entityId: id,
      details: {
        titleEn: deleted.titleEn,
        sku: deleted.sku,
      },
    });

    return NextResponse.json({ success: true, id });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
