import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { enforceAdminPermission } from '@/lib/api-auth';
import { logAuditAction } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const check = enforceAdminPermission(req, 'SCRIPTURES', 'READ');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const [deities, temples, festivals] = await Promise.all([
      prisma.deity.findMany({ orderBy: { nameEn: 'asc' } }),
      prisma.temple.findMany({ orderBy: { nameEn: 'asc' } }),
      prisma.festival.findMany({ orderBy: { nameEn: 'asc' } }),
    ]);

    return NextResponse.json({ success: true, deities, temples, festivals });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch heritage data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const check = enforceAdminPermission(req, 'SCRIPTURES', 'CREATE');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { type, data } = body;

    if (type === 'DEITY') {
      const deity = await prisma.deity.create({
        data: {
          slug: data.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
          nameEn: data.nameEn,
          nameHi: data.nameHi || data.nameEn,
          nameSa: data.nameSa || data.nameEn,
          mantra: data.mantra || '',
          significanceEn: data.significanceEn,
          significanceHi: data.significanceHi || data.significanceEn,
          significanceSa: data.significanceSa || data.significanceEn,
          iconography: data.iconography || '',
          imageUrl: data.imageUrl || '',
        },
      });

      await logAuditAction({
        userId: check.user?.userId,
        action: 'CREATE',
        entityType: 'SETTING',
        entityId: deity.id,
        details: { name: deity.nameEn, type: 'DEITY' },
      });

      return NextResponse.json({ success: true, deity }, { status: 201 });
    }

    if (type === 'TEMPLE') {
      const temple = await prisma.temple.create({
        data: {
          slug: data.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
          nameEn: data.nameEn,
          nameHi: data.nameHi || data.nameEn,
          nameSa: data.nameSa || data.nameEn,
          deityName: data.deityName || 'Lord Shiva',
          state: data.state || 'Uttar Pradesh',
          city: data.city || 'Varanasi',
          historyEn: data.historyEn,
          historyHi: data.historyHi || data.historyEn,
          timings: data.timings || '04:00 AM - 11:00 PM',
          significance: data.significance || '',
          imageUrl: data.imageUrl || '',
        },
      });

      await logAuditAction({
        userId: check.user?.userId,
        action: 'CREATE',
        entityType: 'SETTING',
        entityId: temple.id,
        details: { name: temple.nameEn, type: 'TEMPLE' },
      });

      return NextResponse.json({ success: true, temple }, { status: 201 });
    }

    if (type === 'FESTIVAL') {
      const festival = await prisma.festival.create({
        data: {
          slug: data.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
          nameEn: data.nameEn,
          nameHi: data.nameHi || data.nameEn,
          nameSa: data.nameSa || data.nameEn,
          lunarMonth: data.lunarMonth || 'Chaitra',
          tithi: data.tithi || 'Pratipada',
          descriptionEn: data.descriptionEn,
          descriptionHi: data.descriptionHi || data.descriptionEn,
          pujaVidhiEn: data.pujaVidhiEn || '',
          pujaVidhiHi: data.pujaVidhiHi || '',
          isMajor: Boolean(data.isMajor),
        },
      });

      await logAuditAction({
        userId: check.user?.userId,
        action: 'CREATE',
        entityType: 'SETTING',
        entityId: festival.id,
        details: { name: festival.nameEn, type: 'FESTIVAL' },
      });

      return NextResponse.json({ success: true, festival }, { status: 201 });
    }

    return NextResponse.json({ error: 'Invalid heritage type' }, { status: 400 });
  } catch (e: any) {
    console.error('Create heritage item error:', e);
    return NextResponse.json({ error: e.message || 'Failed to create heritage item' }, { status: 500 });
  }
}
