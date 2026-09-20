import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const payload = getAuthenticatedUser(req);
    if (!payload) {
      return NextResponse.json({ user: null });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        preferredLocale: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('Me endpoint error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
