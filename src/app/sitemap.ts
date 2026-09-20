import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sanatan.org';

  const staticRoutes = [
    '',
    '/scriptures',
    '/shlokas',
    '/deities',
    '/temples',
    '/festivals',
    '/calendar',
    '/articles',
    '/store',
    '/search',
    '/ai-guide',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const [scriptures, articles, products] = await Promise.all([
      prisma.scripture.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.post.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }),
      prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
    ]);

    const scriptureUrls = scriptures.map((s) => ({
      url: `${baseUrl}/scriptures/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    const articleUrls = articles.map((a) => ({
      url: `${baseUrl}/articles/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const productUrls = products.map((p) => ({
      url: `${baseUrl}/store/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...scriptureUrls, ...articleUrls, ...productUrls];
  } catch {
    return staticRoutes;
  }
}
