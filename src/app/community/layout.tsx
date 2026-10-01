import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'सनातन समुदाय — सत्संग, चर्चा एवं भक्ति (Sanatan Community)',
  description:
    'सनातन धर्म के साधकों का समुदाय — सत्संग, आध्यात्मिक चर्चा एवं भक्ति अनुभव साझा करें।',
  alternates: { canonical: 'https://sanatanroop.com/community' },
  openGraph: { title: 'सनातन समुदाय — सत्संग, चर्चा एवं भक्ति (Sanatan Community)', url: 'https://sanatanroop.com/community', siteName: 'SanatanRoop', locale: 'hi_IN', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
