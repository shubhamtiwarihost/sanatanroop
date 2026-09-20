import type { Metadata } from 'next';
import ShlokasClient from './ShlokasClient';

export const metadata: Metadata = {
  title: 'वैदिक श्लोक एवं मन्त्र संग्रह (Vedic Shlokas & Mantras) हिंदी अर्थ व ऑडियो सहित',
  description:
    'गायत्री मन्त्र, महामृत्युंजय मन्त्र, शान्ति पाठ एवं वैदिक ऋचाओं का शुद्ध संस्कृत उच्चारण, हिंदी व अंग्रेजी भावार्थ और दिव्य ऑडियो।',
  keywords: [
    'Vedic Shlokas',
    'वैदिक श्लोक',
    'Gayatri Mantra',
    'Mahamrityunjaya Mantra',
    'Shanti Mantra',
    'Sanskrit Mantras with Meaning',
    'मन्त्र संग्रह',
    'SanatanRoop Shlokas',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/shlokas',
  },
  openGraph: {
    title: 'वैदिक श्लोक एवं मन्त्र संग्रह (Vedic Shlokas & Mantras) | SanatanRoop',
    description:
      'गायत्री मन्त्र, महामृत्युंजय मन्त्र, शान्ति पाठ एवं वैदिक ऋचाओं का शुद्ध संस्कृत उच्चारण, हिंदी व अंग्रेजी भावार्थ और दिव्य ऑडियो।',
    url: 'https://sanatanroop.com/shlokas',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Vedic Shlokas and Mantras' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'वैदिक श्लोक एवं मन्त्र संग्रह | SanatanRoop',
    description:
      'गायत्री मन्त्र, महामृत्युंजय मन्त्र, शान्ति पाठ एवं वैदिक ऋचाओं का शुद्ध संस्कृत उच्चारण और भावार्थ।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function ShlokasPage() {
  return <ShlokasClient />;
}
