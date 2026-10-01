import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'धर्म AI मार्गदर्शक — सनातन धर्म के प्रश्नों के उत्तर (Dharma AI Guide)',
  description:
    'सनातन धर्म, वेद, गीता, व्रत-पर्व एवं पूजा विधि से जुड़े प्रश्न पूछें और शास्त्र-आधारित उत्तर पाएं।',
  alternates: { canonical: 'https://sanatanroop.com/ai-guide' },
  openGraph: { title: 'धर्म AI मार्गदर्शक — सनातन धर्म के प्रश्नों के उत्तर (Dharma AI Guide)', url: 'https://sanatanroop.com/ai-guide', siteName: 'SanatanRoop', locale: 'hi_IN', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
