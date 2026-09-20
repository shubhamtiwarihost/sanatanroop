import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { enforceAdminPermission } from '@/lib/api-auth';

export async function GET(req: NextRequest) {
  const check = enforceAdminPermission(req, 'AUDIT_LOGS', 'READ');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const logs = await prisma.auditLog.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true, role: true },
        },
      },
    });

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    console.error('Audit logs fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 });
  }
}
