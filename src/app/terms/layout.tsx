import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'नियम एवं शर्तें (Terms of Service)',
  description:
    'SanatanRoop के उपयोग के नियम एवं शर्तें।',
  alternates: { canonical: 'https://sanatanroop.com/terms' },
  openGraph: { title: 'नियम एवं शर्तें (Terms of Service)', url: 'https://sanatanroop.com/terms', siteName: 'SanatanRoop', locale: 'hi_IN', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
