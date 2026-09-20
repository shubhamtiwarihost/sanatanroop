import type { Metadata } from 'next';
import KathasClient from './KathasClient';

export const metadata: Metadata = {
  title: 'सम्पूर्ण व्रत कथाएँ एवं पौराणिक प्रसंग (Vrat Kathas & Divine Stories)',
  description:
    'सत्यनारायण व्रत कथा, करवा चौथ, एकादशी, प्रदोष, वैभव लक्ष्मी, महाशिवरात्रि एवं सोलह सोमवार व्रत की प्रामाणिक कथाएँ, विधि एवं उद्यापन विधि।',
  keywords: [
    'Vrat Kathas',
    'व्रत कथाएँ',
    'Satyanarayan Katha',
    'Karwa Chauth Katha',
    'Ekadashi Vrat Katha',
    'Pradosh Vrat Katha',
    'Vaibhav Lakshmi Katha',
    'Somwar Vrat Katha',
    'SanatanRoop Kathas',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/kathas',
  },
  openGraph: {
    title: 'सम्पूर्ण व्रत कथाएँ एवं पौराणिक प्रसंग (Vrat Kathas) | SanatanRoop',
    description:
      'सत्यनारायण, एकादशी, प्रदोष, करवा चौथ एवं वैभव लक्ष्मी व्रत की प्रामाणिक कथाएँ व पूजन विधि।',
    url: 'https://sanatanroop.com/kathas',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Vrat Kathas SanatanRoop' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'सम्पूर्ण व्रत कथाएँ एवं पौराणिक प्रसंग | SanatanRoop',
    description:
      'सत्यनारायण, एकादशी, प्रदोष एवं वैभव लक्ष्मी व्रत की प्रामाणिक कथाएँ व विधि।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function KathasPage() {
  const kathasSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vrat Kathas & Divine Stories',
    description: 'Authentic Hindu vrat kathas and spiritual stories with puja vidhi.',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'श्री सत्यनारायण व्रत कथा (Satyanarayan Vrat Katha)',
        description: 'स्कन्द पुराण के रेवाखण्ड से संकलित भगवान सत्यनारायण की महिमा व कथा।',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'एकादशी व्रत महात्म्य एवं कथा (Ekadashi Vrat Katha)',
        description: 'प्रत्येक मास के कृष्ण एवं शुक्ल पक्ष की एकादशी का महात्म्य एवं फल।',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'प्रदोष व्रत कथा (Pradosh Vrat Katha)',
        description: 'भगवान शिव की कृपा प्राप्त करने वाले पावन त्रयोदशी प्रदोष व्रत की कथा व विधि।',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'वैभव लक्ष्मी व्रत कथा (Vaibhav Lakshmi Vrat Katha)',
        description: 'सुख, समृद्धि और ऐश्वर्य प्रदाता माता वैभव लक्ष्मी का पावन शुक्रवार व्रत।',
      },
    ],
  };

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
        name: 'व्रत कथाएँ (Kathas)',
        item: 'https://sanatanroop.com/kathas',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kathasSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <KathasClient />
    </>
  );
}
