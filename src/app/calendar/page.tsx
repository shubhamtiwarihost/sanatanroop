import type { Metadata } from 'next';
import CalendarClient from './CalendarClient';

export const metadata: Metadata = {
  title: 'आज का पंचांग, शुभ मुहूर्त, राहुकाल व चौघड़िया (Today\'s Panchang & Muhurat)',
  description:
    'दैनिक वैदिक पंचांग, तिथि, वार, नक्षत्र, योग, करण, सूर्योदय-सूर्यास्त समय, शुभ अभिजीत मुहूर्त, राहुकाल, यमगंड एवं दिन-रात का चौघड़िया।',
  keywords: [
    'Today Panchang',
    'आज का पंचांग',
    'Shubh Muhurat',
    'शुभ मुहूर्त',
    'Rahu Kaal',
    'राहुकाल',
    'Choghadiya',
    'चौघड़िया',
    'Abhijit Muhurat',
    'Vedic Calendar',
    'SanatanRoop Panchang',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/calendar',
  },
  openGraph: {
    title: 'आज का पंचांग, शुभ मुहूर्त, राहुकाल व चौघड़िया | SanatanRoop',
    description:
      'दैनिक वैदिक पंचांग, तिथि, नक्षत्र, सूर्योदय समय, शुभ मुहूर्त, राहुकाल एवं चौघड़िया मुहूर्त।',
    url: 'https://sanatanroop.com/calendar',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Daily Vedic Panchang' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'आज का पंचांग, शुभ मुहूर्त व चौघड़िया | SanatanRoop',
    description:
      'दैनिक वैदिक पंचांग, तिथि, नक्षत्र, राहुकाल एवं शुभ मुहूर्त।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function CalendarPage() {
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
        name: 'दैनिक पंचांग (Panchang)',
        item: 'https://sanatanroop.com/calendar',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CalendarClient />
    </>
  );
}
