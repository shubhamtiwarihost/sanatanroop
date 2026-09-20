import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { enforceAdminPermission } from '@/lib/api-auth';
import { logAuditAction } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const check = enforceAdminPermission(req, 'SETTINGS', 'READ');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Default seeded media assets if empty
    if (media.length === 0) {
      const defaults = [
        {
          id: 'med-1',
          fileName: 'gita_hardbound_front.jpg',
          url: '/images/books/gita.jpg',
          mimeType: 'image/jpeg',
          sizeBytes: 1420000,
          altText: 'Srimad Bhagavad Gita Devanagari Hardbound Cover',
          license: 'PUBLIC_DOMAIN',
        },
        {
          id: 'med-2',
          fileName: 'om_namah_shivaya.wav',
          url: '/audio/om_namah_shivaya.wav',
          mimeType: 'audio/wav',
          sizeBytes: 1058444,
          altText: 'Om Namah Shivaya 136.1Hz Cosmic Meditation Sound',
          license: 'ADMIN_OWNED',
        },
        {
          id: 'med-3',
          fileName: 'kashi_vishwanath_mandapa.jpg',
          url: '/images/temples/kashi.jpg',
          mimeType: 'image/jpeg',
          sizeBytes: 2150000,
          altText: 'Kashi Vishwanath Mandir Golden Shikhara',
          license: 'CREATIVE_COMMONS',
        },
        {
          id: 'med-4',
          fileName: 'puja_thali_brass.jpg',
          url: '/images/products/thali.jpg',
          mimeType: 'image/jpeg',
          sizeBytes: 980000,
          altText: 'Handcrafted Brass Aarti Plate with Diya',
          license: 'STORE_OWNED',
        },
      ];
      return NextResponse.json({ success: true, media: defaults });
    }

    return NextResponse.json({ success: true, media });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const check = enforceAdminPermission(req, 'SETTINGS', 'CREATE');
  if (!check.authorized) {
    return NextResponse.json({ error: check.error }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { fileName, url, mimeType, sizeBytes = 102400, altText, license = 'PUBLIC_DOMAIN' } = body;

    if (!fileName || !url) {
      return NextResponse.json({ error: 'fileName and url are required' }, { status: 400 });
    }

    const created = await prisma.media.create({
      data: {
        fileName,
        url,
        mimeType: mimeType || 'image/jpeg',
        sizeBytes: Number(sizeBytes),
        altText: altText || fileName,
        license,
      },
    });

    await logAuditAction({
      userId: check.user?.userId,
      action: 'CREATE',
      entityType: 'SETTING',
      entityId: created.id,
      details: {
        fileName: created.fileName,
        type: 'MEDIA_UPLOAD',
      },
    });

    return NextResponse.json({ success: true, media: created }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 });
  }
}
