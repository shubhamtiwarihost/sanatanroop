import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'सनातन पूजा सामग्री स्टोर — रुद्राक्ष, जप माला एवं पूजन सामग्री',
  description:
    'प्रामाणिक रुद्राक्ष, जप माला, यंत्र एवं पूजन सामग्री — सनातन रूप स्टोर।',
  alternates: { canonical: 'https://sanatanroop.com/store' },
  openGraph: { title: 'सनातन पूजा सामग्री स्टोर — रुद्राक्ष, जप माला एवं पूजन सामग्री', url: 'https://sanatanroop.com/store', siteName: 'SanatanRoop', locale: 'hi_IN', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
