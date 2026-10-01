import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'सनातन धर्म ब्लॉग — व्रत, पर्व, मंत्र एवं गीता ज्ञान (Sanatan Dharma Blog)',
  description:
    'सनातन धर्म पर प्रामाणिक लेख: एकादशी व्रत, नवरात्रि पूजा विधि, मंत्र जप के लाभ, भगवद्गीता के जीवन सूत्र, रुद्राक्ष एवं हनुमान चालीसा का महत्व।',
  alternates: { canonical: 'https://sanatanroop.com/blog' },
  openGraph: { title: 'सनातन धर्म ब्लॉग — व्रत, पर्व, मंत्र एवं गीता ज्ञान (Sanatan Dharma Blog)', url: 'https://sanatanroop.com/blog', siteName: 'SanatanRoop', locale: 'hi_IN', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
