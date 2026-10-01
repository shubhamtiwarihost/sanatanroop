import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'गोपनीयता नीति (Privacy Policy)',
  description:
    'SanatanRoop की गोपनीयता नीति — हम आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित करते हैं।',
  alternates: { canonical: 'https://sanatanroop.com/privacy' },
  openGraph: { title: 'गोपनीयता नीति (Privacy Policy)', url: 'https://sanatanroop.com/privacy', siteName: 'SanatanRoop', locale: 'hi_IN', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
