import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { enforceAdminPermission } from '@/lib/api-auth';
import { logAuditAction } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const check = enforceAdminPermission(req, 'ARTICLES', 'READ');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { name: true, email: true } },
        category: true,
      },
    });

    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error('Admin posts fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const check = enforceAdminPermission(req, 'ARTICLES', 'CREATE');
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
      summaryEn,
      summaryHi,
      summarySa,
      contentEn,
      contentHi,
      contentSa,
      status = 'DRAFT',
      isFeatured = false,
      seoTitleEn,
      seoDescEn,
      tags,
    } = body;

    if (!titleEn || !slug || !contentEn) {
      return NextResponse.json({ error: 'titleEn, slug, and contentEn are required' }, { status: 400 });
    }

    // Check status transitions and permissions
    if (status === 'PUBLISHED') {
      const publishCheck = enforceAdminPermission(req, 'ARTICLES', 'PUBLISH');
      if (!publishCheck.authorized) {
        return NextResponse.json({ error: publishCheck.error }, { status: 403 });
      }
    }

    const post = await prisma.post.create({
      data: {
        slug: slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-'),
        titleEn,
        titleHi: titleHi || titleEn,
        titleSa: titleSa || titleEn,
        summaryEn: summaryEn || '',
        summaryHi: summaryHi || '',
        summarySa: summarySa || '',
        contentEn,
        contentHi: contentHi || contentEn,
        contentSa: contentSa || contentEn,
        status,
        isFeatured: Boolean(isFeatured),
        seoTitleEn,
        seoDescEn,
        tags,
        authorId: check.user!.userId,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    });

    await logAuditAction({
      userId: check.user!.userId,
      action: 'CREATE_POST',
      entityType: 'POST',
      entityId: post.id,
      details: { slug: post.slug, status: post.status },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error('Admin create post error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create post' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const check = enforceAdminPermission(req, 'ARTICLES', 'UPDATE');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, status, titleEn, titleHi, titleSa, contentEn, contentHi, contentSa } = body;

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    if (status === 'PUBLISHED') {
      const pubCheck = enforceAdminPermission(req, 'ARTICLES', 'PUBLISH');
      if (!pubCheck.authorized) {
        return NextResponse.json({ error: pubCheck.error }, { status: 403 });
      }
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        ...(status && {
          status,
          publishedAt: status === 'PUBLISHED' ? new Date() : undefined,
        }),
        ...(titleEn && { titleEn }),
        ...(titleHi && { titleHi }),
        ...(titleSa && { titleSa }),
        ...(contentEn && { contentEn }),
        ...(contentHi && { contentHi }),
        ...(contentSa && { contentSa }),
      },
    });

    await logAuditAction({
      userId: check.user!.userId,
      action: 'UPDATE_POST',
      entityType: 'POST',
      entityId: id,
      details: { newStatus: status },
    });

    return NextResponse.json({ success: true, post: updated });
  } catch (error: any) {
    console.error('Admin update post error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update post' }, { status: 500 });
  }
}
