import type { Metadata } from 'next';
import AartisClient from './AartisClient';

export const metadata: Metadata = {
  title: 'सम्पूर्ण आरती संग्रह (Aarti Sangrah) हिंदी लिरिक्स व ऑडियो सहित',
  description:
    'भगवान गणेश, शिव, हनुमान, दुर्गा, विष्णु, राम और लक्ष्मी जी की प्रसिद्ध आरतियाँ हिंदी लिरिक्स, भावार्थ, ऑडियो भजन एवं वीडियो सहित। नित्य पाठ करें।',
  keywords: [
    'Aarti Sangrah',
    'आरती संग्रह',
    'Jai Ganesh Deva',
    'Om Jai Jagdish Hare',
    'Hanuman Aarti',
    'Shiv Aarti',
    'Durga Aarti',
    'Lakshmi Aarti',
    'आरती लिरिक्स हिंदी',
    'Devotional Aartis',
    'SanatanRoop Aartis',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/aartis',
  },
  openGraph: {
    title: 'सम्पूर्ण आरती संग्रह (Aarti Sangrah) हिंदी लिरिक्स व ऑडियो सहित | SanatanRoop',
    description:
      'भगवान गणेश, शिव, हनुमान, दुर्गा, विष्णु, राम और लक्ष्मी जी की प्रसिद्ध आरतियाँ हिंदी लिरिक्स, भावार्थ, ऑडियो भजन एवं वीडियो सहित।',
    url: 'https://sanatanroop.com/aartis',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Aarti Sangrah SanatanRoop' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'सम्पूर्ण आरती संग्रह (Aarti Sangrah) | SanatanRoop',
    description:
      'भगवान गणेश, शिव, हनुमान, दुर्गा, विष्णु, राम और लक्ष्मी जी की प्रसिद्ध आरतियाँ हिंदी लिरिक्स व ऑडियो सहित।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function AartisPage() {
  return <AartisClient />;
}
