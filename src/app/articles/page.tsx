import type { Metadata } from 'next';
import ArticlesClient from './ArticlesClient';

export const metadata: Metadata = {
  title: 'सनातन धर्म लेख, दर्शन एवं आध्यात्मिक ब्लॉग (Spiritual Articles & Insights)',
  description:
    'सनातन धर्म का रहस्य, ध्यान साधना के लाभ, एकादशी व्रत महिमा, भगवद्गीता के जीवन सूत्र एवं चार पुरुषार्थ (धर्म, अर्थ, काम, मोक्ष) पर शोधपरक एवं प्रामाणिक लेख।',
  keywords: [
    'Sanatan Articles',
    'आध्यात्मिक लेख',
    'Spiritual Blog',
    'Bhagavad Gita Lessons',
    'Ekadashi Significance',
    'Meditation Benefits',
    'Four Purusharthas',
    'Sanatan Dharma Philosophy',
    'SanatanRoop Articles',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/articles',
  },
  openGraph: {
    title: 'सनातन धर्म लेख, दर्शन एवं आध्यात्मिक ब्लॉग | SanatanRoop',
    description:
      'सनातन धर्म का रहस्य, ध्यान साधना के लाभ, एकादशी व्रत महिमा, भगवद्गीता के जीवन सूत्र पर प्रामाणिक लेख।',
    url: 'https://sanatanroop.com/articles',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Spiritual Articles SanatanRoop' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'सनातन धर्म लेख एवं आध्यात्मिक ब्लॉग | SanatanRoop',
    description:
      'सनातन धर्म का रहस्य, ध्यान साधना, भगवद्गीता सूत्र एवं चार पुरुषार्थ पर लेख।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function ArticlesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'मुख्य पृष्ठ (Home)',
        item: 'https://sanatanroop.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'आध्यात्मिक लेख (Articles)',
        item: 'https://sanatanroop.com/articles',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticlesClient />
    </>
  );
}
