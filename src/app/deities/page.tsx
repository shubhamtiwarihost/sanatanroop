import type { Metadata } from 'next';
import DeitiesClient from './DeitiesClient';

export const metadata: Metadata = {
  title: 'सनातन धर्म के प्रमुख देवी-देवता (Sacred Deities of Sanatan Dharma)',
  description:
    'भगवान श्री गणेश, शिव, विष्णु, माँ दुर्गा, श्री राम, श्री कृष्ण एवं श्री हनुमान जी के स्वरूप, ध्यान मन्त्र, शास्त्रोक्त कथाएं एवं पावन तीर्थ।',
  keywords: [
    'Hindu Deities',
    'देवी देवता',
    'Lord Shiva',
    'Lord Vishnu',
    'Goddess Durga',
    'Lord Ganesha',
    'Lord Rama',
    'Lord Krishna',
    'Hanuman Ji',
    'SanatanRoop Deities',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/deities',
  },
  openGraph: {
    title: 'सनातन धर्म के प्रमुख देवी-देवता (Sacred Deities) | SanatanRoop',
    description:
      'भगवान श्री गणेश, शिव, विष्णु, माँ दुर्गा, श्री राम, कृष्ण एवं हनुमान जी के दिव्य स्वरूप, ध्यान मन्त्र एवं पौराणिक कथाएँ।',
    url: 'https://sanatanroop.com/deities',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Sacred Deities SanatanRoop' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'सनातन धर्म के प्रमुख देवी-देवता | SanatanRoop',
    description:
      'भगवान श्री गणेश, शिव, विष्णु, माँ दुर्गा, श्री राम, कृष्ण एवं हनुमान जी के दिव्य स्वरूप।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function DeitiesPage() {
  const deitiesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sacred Deities of Sanatan Dharma',
    description: 'Detailed profiles, mantras, and scriptural significance of Hindu deities.',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'भगवान शिव (Lord Shiva - Mahadeva)',
        description: 'सृष्टि के संहारक एवं कल्याणकारी देवाधिदेव, ओंकार स्वरूप एवं ध्यान के अधिष्ठाता।',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'भगवान श्री गणेश (Lord Ganesha)',
        description: 'प्रथम पूज्य, विघ्नहर्ता, बुद्धि एवं सिद्धि के प्रदाता।',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'भगवान श्री विष्णु (Lord Vishnu)',
        description: 'संसार के पालनहार, चतुर्भुज नारायण, धर्म के संरक्षक।',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'माँ दुर्गा (Goddess Durga)',
        description: 'आद्यशक्ति, दुष्टों का संहार करने वाली जगज्जननी भगवती।',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'श्री हनुमान जी (Lord Hanuman)',
        description: 'रुद्रावतार, रामभक्त, अष्टसिद्धि एवं नवनिधि के दाता, संकटमोचन।',
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
        name: 'देवी-देवता (Deities)',
        item: 'https://sanatanroop.com/deities',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(deitiesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DeitiesClient />
    </>
  );
}
