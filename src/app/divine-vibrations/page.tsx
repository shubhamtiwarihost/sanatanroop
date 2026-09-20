import type { Metadata } from 'next';
import DivineVibrationsClient from './DivineVibrationsClient';

export const metadata: Metadata = {
  title: 'दिव्य वैदिक मन्त्र एवं नाद अनुसंधान (Divine Vibrations & Sacred Mantras)',
  description:
    '१०८ बार प्रामाणिक वैदिक मन्त्र जप, ॐ नाद, गायत्री मन्त्र, महामृत्युंजय मन्त्र, सोल्फेगियो फ्रिक्वेन्सी (432Hz, 528Hz, 963Hz) एवं मन्दिर शंख-घण्ट नाद का प्रामाणिक दिव्य अनुभव।',
  keywords: [
    'Divine Vibrations',
    'वैदिक मन्त्र',
    'Mantra Chanting 108 Times',
    'Om Namah Shivaya 108',
    'Gayatri Mantra 108',
    'Mahamrityunjaya Mantra 108',
    '432Hz Solfeggio',
    '528Hz DNA Repair',
    'Temple Bells Sound',
    'SanatanRoop Vibrations',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/divine-vibrations',
  },
  openGraph: {
    title: 'दिव्य वैदिक मन्त्र एवं नाद अनुसंधान (Divine Vibrations) | SanatanRoop',
    description:
      '१०८ बार प्रामाणिक वैदिक मन्त्र जप, ॐ नाद, गायत्री मन्त्र, महामृत्युंजय मन्त्र एवं सोल्फेगियो फ्रिक्वेन्सी।',
    url: 'https://sanatanroop.com/divine-vibrations',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Divine Vibrations SanatanRoop' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'दिव्य वैदिक मन्त्र एवं नाद अनुसंधान | SanatanRoop',
    description:
      '१०८ बार प्रामाणिक वैदिक मन्त्र जप एवं सोल्फेगियो फ्रिक्वेन्सी का दिव्य अनुभव।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function DivineVibrationsPage() {
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
        name: 'दिव्य नाद (Divine Vibrations)',
        item: 'https://sanatanroop.com/divine-vibrations',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <DivineVibrationsClient />
    </>
  );
}
