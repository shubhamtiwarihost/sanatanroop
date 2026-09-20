import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sanatanroop.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/v1/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
