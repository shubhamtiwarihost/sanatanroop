import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sanatanroop.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/wp-admin/', '/wp-login.php/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
