import type { Metadata } from 'next';
import VideosClient from './VideosClient';

export const metadata: Metadata = {
  title: 'सनातन वीडियो दर्शन (Devotional Videos) - आरती, भजन, मन्त्र एवं दर्शन',
  description:
    'भगवान शिव, हनुमान जी, माँ दुर्गा एवं श्री गणेश की पावन आरतियों, भजनों, मन्त्र जप एवं तीर्थ दर्शन के प्रमाणिक भक्ति वीडियो देखें।',
  keywords: [
    'Sanatan Videos',
    'भक्ति वीडियो',
    'Aarti Videos',
    'Bhajan Videos',
    'Mantra Videos',
    'Temple Darshan',
    'हनुमान चालीसा वीडियो',
    'SanatanRoop Videos',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/videos',
  },
  openGraph: {
    title: 'सनातन वीडियो दर्शन (Devotional Videos) | SanatanRoop',
    description:
      'भगवान शिव, हनुमान जी, माँ दुर्गा एवं श्री गणेश की पावन आरतियों, भजनों, मन्त्र जप एवं तीर्थ दर्शन के प्रमाणिक भक्ति वीडियो।',
    url: 'https://sanatanroop.com/videos',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Devotional Videos SanatanRoop' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'सनातन वीडियो दर्शन | SanatanRoop',
    description:
      'पावन आरतियों, भजनों, मन्त्र जप एवं तीर्थ दर्शन के प्रमाणिक भक्ति वीडियो।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function VideosPage() {
  return <VideosClient />;
}
