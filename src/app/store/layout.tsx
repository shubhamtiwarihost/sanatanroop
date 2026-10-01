import type { Metadata } from 'next';

// This index redirects to /books; child pages set their own canonical
export const metadata: Metadata = {
  title: 'सनातन पूजा सामग्री स्टोर — रुद्राक्ष, जप माला एवं पूजन सामग्री',
  description:
    'प्रामाणिक रुद्राक्ष, जप माला, यंत्र एवं पूजन सामग्री — सनातन रूप स्टोर।',
  alternates: { canonical: 'https://sanatanroop.com/books' },
  openGraph: { title: 'सनातन पूजा सामग्री स्टोर — रुद्राक्ष, जप माला एवं पूजन सामग्री', url: 'https://sanatanroop.com/books', siteName: 'SanatanRoop', locale: 'hi_IN', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
