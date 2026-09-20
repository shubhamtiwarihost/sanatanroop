import type { Metadata } from 'next';
import TemplesClient from './TemplesClient';

export const metadata: Metadata = {
  title: 'पुण्य तीर्थ देवालय एवं १२ ज्योतिर्लिंग (Sacred Temples & Jyotirlingas of India)',
  description:
    'द्वादश ज्योतिर्लिंग, चार धाम, शक्तिपीठ एवं भारत के प्रमुख प्राचीन मन्दिरों का इतिहास, दर्शन समय, धार्मिक महत्व, निकटतम रेलवे स्टेशन व हवाई अड्डे की सम्पूर्ण जानकारी।',
  keywords: [
    'Jyotirlingas of India',
    '१२ ज्योतिर्लिंग',
    'Char Dham',
    'चार धाम',
    'Shaktipeeth',
    'Kashi Vishwanath',
    'Kedarnath',
    'Somnath',
    'Mahakaleshwar',
    'Hindu Temples India',
    'तीर्थ देवालय',
    'SanatanRoop Temples',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/temples',
  },
  openGraph: {
    title: 'पुण्य तीर्थ देवालय एवं १२ ज्योतिर्लिंग | SanatanRoop',
    description:
      'द्वादश ज्योतिर्लिंग, चार धाम, शक्तिपीठ एवं भारत के प्रमुख प्राचीन मन्दिरों का इतिहास, दर्शन समय एवं सम्पूर्ण यात्रा मार्गदर्शिका।',
    url: 'https://sanatanroop.com/temples',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Sacred Temples and Jyotirlingas' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'पुण्य तीर्थ देवालय एवं १२ ज्योतिर्लिंग | SanatanRoop',
    description:
      'द्वादश ज्योतिर्लिंग, चार धाम, शक्तिपीठ एवं भारत के प्रमुख प्राचीन मन्दिरों का प्रामाणिक विवरण।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function TemplesPage() {
  const templesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sacred Temples & Jyotirlingas of India',
    description: 'A curated directory of the 12 Jyotirlingas, Char Dham, and sacred Hindu temples.',
    numberOfItems: 6,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'HinduTemple',
          name: 'श्री काशी विश्वनाथ ज्योतिर्लिंग (Kashi Vishwanath)',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Varanasi',
            addressRegion: 'Uttar Pradesh',
            addressCountry: 'India',
          },
          description: 'द्वादश ज्योतिर्लिंगों में प्रधान, मोक्षदायिनी काशी में स्थित भगवान शिव का पावन धाम।',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'HinduTemple',
          name: 'श्री केदारनाथ ज्योतिर्लिंग (Kedarnath Dham)',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Rudraprayag',
            addressRegion: 'Uttarakhand',
            addressCountry: 'India',
          },
          description: 'हिमालय की गोद में स्थित पंच केदार एवं चार धामों में प्रमुख पावन ज्योतिर्लिंग।',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'HinduTemple',
          name: 'श्री सोमनाथ ज्योतिर्लिंग (Somnath Temple)',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Prabhas Patan',
            addressRegion: 'Gujarat',
            addressCountry: 'India',
          },
          description: 'प्रथम ज्योतिर्लिंग, सौराष्ट्र के प्रभास क्षेत्र में समुद्र तट पर स्थित भव्य देवालय।',
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'HinduTemple',
          name: 'श्री महाकालेश्वर ज्योतिर्लिंग (Mahakaleshwar Temple)',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Ujjain',
            addressRegion: 'Madhya Pradesh',
            addressCountry: 'India',
          },
          description: 'काल के भी काल महाकाल, एकमात्र दक्षिणमुखी ज्योतिर्लिंग जहां भस्म आरती होती है।',
        },
      },
      {
        '@type': 'ListItem',
        position: 5,
        item: {
          '@type': 'HinduTemple',
          name: 'श्री जगन्नाथ पुरी मन्दिर (Jagannath Temple)',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Puri',
            addressRegion: 'Odisha',
            addressCountry: 'India',
          },
          description: 'चार धामों में एक, पुरुषोत्तम क्षेत्र में भगवान जगन्नाथ, बलभद्र व सुभद्रा का पवित्र धाम।',
        },
      },
      {
        '@type': 'ListItem',
        position: 6,
        item: {
          '@type': 'HinduTemple',
          name: 'श्री तिरुपति बालाजी (Venkateswara Temple)',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Tirumala',
            addressRegion: 'Andhra Pradesh',
            addressCountry: 'India',
          },
          description: 'कलियुग के प्रत्यक्ष देव भगवान वेंकटेश्वर का पावन सप्तगिरि धाम।',
        },
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
        name: 'तीर्थ देवालय (Temples)',
        item: 'https://sanatanroop.com/temples',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(templesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TemplesClient />
    </>
  );
}
