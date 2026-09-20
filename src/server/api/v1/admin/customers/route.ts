import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { enforceAdminPermission } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const check = enforceAdminPermission(req, 'USERS', 'READ');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const customers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        preferredLocale: true,
        createdAt: true,
        orders: {
          select: {
            id: true,
            totalAmount: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    const formatted = customers.map((c) => {
      const totalSpent = c.orders.reduce((sum, o) => sum + o.totalAmount, 0);
      return {
        id: c.id,
        name: c.name,
        email: c.email,
        role: c.role,
        preferredLocale: c.preferredLocale,
        createdAt: c.createdAt,
        ordersCount: c.orders.length,
        totalSpent,
        status: 'Active',
      };
    });

    return NextResponse.json({ success: true, customers: formatted });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}
