import type { Metadata } from 'next';
import BooksClient from './BooksClient';

export const metadata: Metadata = {
  title: 'सनातन ग्रंथालय (Sacred Scriptures & Books) - वेद, उपनिषद्, गीता, रामायण',
  description:
    'श्रीमद्भगवद्गीता, श्रीरामचरितमानस, ईश-कठ-माण्डूक्य उपनिषद्, ऋग्वेद, श्रीमद्भागवतम्, पातञ्जल योगसूत्र एवं चाणक्य नीति का प्रामाणिक मूल संस्कृत पाठ एवं हिंदी अनुवाद।',
  keywords: [
    'Sanatan Books',
    'सनातन ग्रंथ',
    'Bhagavad Gita Hindi',
    'Ramcharitmanas Hindi',
    'Upanishads',
    'Rigveda',
    'Shrimad Bhagavatam',
    'Patanjali Yoga Sutras',
    'Chanakya Niti',
    'Hindu Scriptures',
    'SanatanRoop Books',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/books',
  },
  openGraph: {
    title: 'सनातन ग्रंथालय (Sacred Scriptures & Books) | SanatanRoop',
    description:
      'श्रीमद्भगवद्गीता, श्रीरामचरितमानस, उपनिषद्, ऋग्वेद, श्रीमद्भागवतम्, पातञ्जल योगसूत्र एवं चाणक्य नीति का प्रामाणिक पाठ एवं अनुवाद।',
    url: 'https://sanatanroop.com/books',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Sacred Scriptures SanatanRoop' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'सनातन ग्रंथालय (Sacred Scriptures & Books) | SanatanRoop',
    description:
      'वेद, उपनिषद्, गीता, रामायण, योगसूत्र एवं चाणक्य नीति का प्रामाणिक संग्रह।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function BooksPage() {
  return <BooksClient />;
}
