import type { Metadata } from 'next';

// This index redirects to /books; child pages set their own canonical
export const metadata: Metadata = {
  title: 'सनातन धर्म ग्रंथ — भगवद्गीता, रामचरितमानस, महाभारत, उपनिषद (Hindu Scriptures in Hindi)',
  description:
    'श्रीमद्भगवद्गीता, रामचरितमानस, महाभारत एवं प्रमुख उपनिषद — मूल संस्कृत श्लोक, हिंदी अर्थ और सरल व्याख्या सहित निःशुल्क ऑनलाइन पढ़ें।',
  alternates: { canonical: 'https://sanatanroop.com/books' },
  openGraph: { title: 'सनातन धर्म ग्रंथ — भगवद्गीता, रामचरितमानस, महाभारत, उपनिषद (Hindu Scriptures in Hindi)', url: 'https://sanatanroop.com/books', siteName: 'SanatanRoop', locale: 'hi_IN', type: 'website' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
