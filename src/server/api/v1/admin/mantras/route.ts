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
    const mantras = await prisma.mantra.findMany({
      orderBy: { id: 'desc' },
      include: {
        scripture: { select: { titleEn: true, titleHi: true } },
      },
    });
    return NextResponse.json({ success: true, mantras });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch mantras' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const check = enforceAdminPermission(req, 'SCRIPTURES', 'CREATE');
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
      deityName,
      sanskrit,
      transliteration,
      hindiMeaning,
      englishMeaning,
      benefitsEn,
      benefitsHi,
      audioUrl,
      isPopular = false,
    } = body;

    if (!titleEn || !slug || !sanskrit || !hindiMeaning || !englishMeaning) {
      return NextResponse.json(
        { error: 'titleEn, slug, sanskrit, hindiMeaning, and englishMeaning are required.' },
        { status: 400 }
      );
    }

    const mantra = await prisma.mantra.create({
      data: {
        slug: slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
        titleEn,
        titleHi: titleHi || titleEn,
        titleSa: titleSa || titleEn,
        deityName: deityName || 'Shiva',
        sanskrit,
        transliteration,
        hindiMeaning,
        englishMeaning,
        benefitsEn,
        benefitsHi,
        audioUrl: audioUrl || '/audio/om_namah_shivaya.wav',
        isPopular: Boolean(isPopular),
      },
    });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'CREATE',
      entityType: 'SCRIPTURE',
      entityId: mantra.id,
      details: { titleEn, slug: mantra.slug, type: 'MANTRA' },
    });

    return NextResponse.json({ success: true, mantra }, { status: 201 });
  } catch (e: any) {
    console.error('Create mantra error:', e);
    return NextResponse.json({ error: e.message || 'Failed to create mantra' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const check = enforceAdminPermission(req, 'SCRIPTURES', 'DELETE');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Mantra ID required' }, { status: 400 });

    const deleted = await prisma.mantra.delete({ where: { id } });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'DELETE',
      entityType: 'SCRIPTURE',
      entityId: id,
      details: { titleEn: deleted.titleEn, type: 'MANTRA' },
    });

    return NextResponse.json({ success: true, id });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to delete mantra' }, { status: 500 });
  }
}
