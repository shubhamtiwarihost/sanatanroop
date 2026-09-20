import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { enforceAdminPermission } from '@/lib/api-auth';
import { logAuditAction } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const check = enforceAdminPermission(req, 'USERS', 'READ');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        preferredLocale: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, users });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const check = enforceAdminPermission(req, 'USERS', 'UPDATE');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { userId, role } = body;

    if (!userId || !role) {
      return NextResponse.json({ error: 'userId and role are required' }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'UPDATE',
      entityType: 'USER',
      entityId: userId,
      details: {
        name: updated.name,
        email: updated.email,
        newRole: role,
      },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 });
  }
}
