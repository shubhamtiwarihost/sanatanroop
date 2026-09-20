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
    const shlokas = await prisma.shloka.findMany({
      orderBy: { id: 'desc' },
      include: {
        scripture: { select: { titleEn: true, titleHi: true } },
      },
    });
    return NextResponse.json({ success: true, shlokas });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch shlokas' }, { status: 500 });
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
      sanskrit,
      transliteration,
      hindiMeaning,
      englishMeaning,
      sourceChapter,
      sourceVerse,
      audioUrl,
      tags,
      isPopular = false,
      scriptureId,
    } = body;

    if (!titleEn || !slug || !sanskrit || !hindiMeaning || !englishMeaning) {
      return NextResponse.json(
        { error: 'titleEn, slug, sanskrit, hindiMeaning, and englishMeaning are required.' },
        { status: 400 }
      );
    }

    const shloka = await prisma.shloka.create({
      data: {
        slug: slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
        titleEn,
        titleHi: titleHi || titleEn,
        titleSa: titleSa || titleEn,
        sanskrit,
        transliteration,
        hindiMeaning,
        englishMeaning,
        sourceChapter: sourceChapter || '1',
        sourceVerse: sourceVerse || '1',
        audioUrl: audioUrl || '/audio/om_namah_shivaya.wav',
        tags: tags || 'Gita, Karma, Dharma',
        isPopular: Boolean(isPopular),
        scriptureId: scriptureId || undefined,
      },
    });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'CREATE',
      entityType: 'SCRIPTURE',
      entityId: shloka.id,
      details: { titleEn, slug: shloka.slug, type: 'SHLOKA' },
    });

    return NextResponse.json({ success: true, shloka }, { status: 201 });
  } catch (e: any) {
    console.error('Create shloka error:', e);
    return NextResponse.json({ error: e.message || 'Failed to create shloka' }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: 'Shloka ID required' }, { status: 400 });

    const deleted = await prisma.shloka.delete({ where: { id } });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'DELETE',
      entityType: 'SCRIPTURE',
      entityId: id,
      details: { titleEn: deleted.titleEn, type: 'SHLOKA' },
    });

    return NextResponse.json({ success: true, id });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to delete shloka' }, { status: 500 });
  }
}
