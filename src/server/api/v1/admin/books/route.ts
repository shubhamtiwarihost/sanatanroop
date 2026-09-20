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
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        chapters: {
          include: {
            verses: true,
          },
        },
      },
    });
    return NextResponse.json({ success: true, books });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
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
      author,
      tradition,
      category = 'Veda',
      description,
      rightsStatus = 'PUBLIC_DOMAIN',
      provenance,
      chapters = [],
    } = body;

    if (!titleEn || !slug || !description) {
      return NextResponse.json({ error: 'titleEn, slug, and description are required' }, { status: 400 });
    }

    const book = await prisma.book.create({
      data: {
        slug: slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
        titleEn,
        titleHi: titleHi || titleEn,
        titleSa: titleSa || titleEn,
        author: author || 'Maharshi Vyasa',
        tradition: tradition || 'Vedanta',
        category,
        description,
        rightsStatus,
        provenance: provenance || 'Classical Sanskrit Canon',
        published: true,
        totalChapters: Math.max(chapters.length, 1),
      },
    });

    // Also register in Scripture model for unified reader discovery
    await prisma.scripture.upsert({
      where: { slug: book.slug },
      update: {},
      create: {
        slug: book.slug,
        titleEn: book.titleEn,
        titleHi: book.titleHi,
        titleSa: book.titleSa,
        category: book.category,
        description: book.description,
        provenance: book.provenance,
        rightsStatus: book.rightsStatus,
        published: true,
      },
    });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'CREATE',
      entityType: 'BOOK',
      entityId: book.id,
      details: { titleEn: book.titleEn, slug: book.slug },
    });

    return NextResponse.json({ success: true, book }, { status: 201 });
  } catch (e: any) {
    console.error('Create book error:', e);
    return NextResponse.json({ error: e.message || 'Failed to create book' }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: 'Book ID required' }, { status: 400 });

    const deleted = await prisma.book.delete({ where: { id } });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'DELETE',
      entityType: 'BOOK',
      entityId: id,
      details: { titleEn: deleted.titleEn },
    });

    return NextResponse.json({ success: true, id });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}
