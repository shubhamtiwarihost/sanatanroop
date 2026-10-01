import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'गोपनीयता नीति (Privacy Policy)',
  alternates: { canonical: 'https://sanatanroop.com/privacy' },
  openGraph: { title: 'गोपनीयता नीति (Privacy Policy)', url: 'https://sanatanroop.com/privacy', siteName: 'SanatanRoop', locale: 'hi_IN', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
