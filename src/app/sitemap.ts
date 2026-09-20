import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sanatanroop.com';

  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/privacy',
    '/terms',
    '/contact',
    '/scriptures',
    '/shlokas',
    '/books',
    '/aartis',
    '/kathas',
    '/divine-vibrations',
    '/deities',
    '/temples',
    '/festivals',
    '/calendar',
    '/articles',
    '/videos',
    '/search',
    '/ai-guide',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : (route === '/about' || route === '/blog' || route === '/contact' ? 0.9 : 0.8),
  }));

  try {
    const [scriptures, articles] = await Promise.all([
      prisma.scripture.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.post.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }),
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

    return [...staticRoutes, ...scriptureUrls, ...articleUrls];
  } catch {
    return staticRoutes;
  }
}
