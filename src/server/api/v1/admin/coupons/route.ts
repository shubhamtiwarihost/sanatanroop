import { NextRequest, NextResponse } from 'next/server';
import { enforceAdminPermission } from '@/lib/api-auth';
import { logAuditAction } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// In-memory / persistent active coupons store for Sanatan Granth
let activeCoupons = [
  {
    id: 'c-1',
    code: 'SANATAN10',
    discountPercent: 10,
    minOrder: 500,
    maxDiscount: 200,
    validUntil: '2027-12-31',
    usageCount: 42,
    status: 'ACTIVE',
  },
  {
    id: 'c-2',
    code: 'GITA20',
    discountPercent: 20,
    minOrder: 1000,
    maxDiscount: 500,
    validUntil: '2027-12-31',
    usageCount: 88,
    status: 'ACTIVE',
  },
  {
    id: 'c-3',
    code: 'DIWALI25',
    discountPercent: 25,
    minOrder: 1500,
    maxDiscount: 750,
    validUntil: '2026-11-15',
    usageCount: 15,
    status: 'ACTIVE',
  },
];

export async function GET(req: NextRequest) {
  const check = enforceAdminPermission(req, 'PRODUCTS', 'READ');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  return NextResponse.json({ success: true, coupons: activeCoupons });
}

export async function POST(req: NextRequest) {
  const check = enforceAdminPermission(req, 'PRODUCTS', 'CREATE');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { code, discountPercent, minOrder = 0, maxDiscount = 500, validUntil } = body;

    if (!code || !discountPercent) {
      return NextResponse.json({ error: 'Coupon code and discountPercent are required' }, { status: 400 });
    }

    const newCoupon = {
      id: `c-${Date.now()}`,
      code: code.toUpperCase().trim(),
      discountPercent: Number(discountPercent),
      minOrder: Number(minOrder),
      maxDiscount: Number(maxDiscount),
      validUntil: validUntil || '2027-12-31',
      usageCount: 0,
      status: 'ACTIVE',
    };

    activeCoupons = [newCoupon, ...activeCoupons];

    await logAuditAction({
      userId: check.user?.userId,
      action: 'CREATE',
      entityType: 'SETTING',
      entityId: newCoupon.id,
      details: {
        code: newCoupon.code,
        discountPercent: newCoupon.discountPercent,
      },
    });

    return NextResponse.json({ success: true, coupon: newCoupon }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
  }
}
