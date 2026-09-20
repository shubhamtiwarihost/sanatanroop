import type { Metadata, Viewport } from 'next';
import { Marcellus, Noto_Serif_Devanagari, Cinzel } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { AudioProvider } from '@/context/AudioContext';
import { CMSProvider } from '@/context/CMSContext';
import IntroScreen from '@/components/IntroScreen';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-classic',
  display: 'swap',
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['devanagari', 'latin'],
  variable: '--font-devanagari',
  display: 'swap',
});

const cinzel = Cinzel({
  weight: ['500', '700'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FF9933',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://sanatanroop.com'),
  title: {
    default: 'SanatanRoop | सम्पूर्ण सनातन धर्म, पंचांग, आरती एवं ग्रंथ',
    template: '%s | SanatanRoop',
  },
  description:
    'सनातन ज्ञान की डिजिटल धरोहर - प्रामाणिक वेद, उपनिषद, श्रीमद्भगवद्गीता, नित्य पंचांग, पावन आरतियां, एवं आध्यात्मिक वीडियो।',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192x192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SanatanRoop',
  },
  alternates: {
    canonical: 'https://sanatanroop.com',
  },
  keywords: [
    'SanatanRoop',
    'सनातन रूप',
    'Sanatan Dharma',
    'सनातन धर्म',
    'Bhagavad Gita in Hindi',
    'श्रीमद्भगवद्गीता',
    'Upanishads',
    'उपनिषद',
    'Vedas',
    'वेद',
    'Shlokas with meaning',
    'श्लोक अर्थ सहित',
    'Hindu Panchang today',
    'आज का पंचांग',
    'Aartis sangrah',
    'आरती संग्रह',
    'Spiritual Videos',
    'हनुमान चालीसा',
    'शिव तांडव स्तोत्र',
    'Vrat Kathas',
    'व्रत कथाएं',
  ],
  authors: [{ name: 'Shubham Tiwari', url: 'https://sanatanroop.com/about' }],
  creator: 'Shubham Tiwari',
  publisher: 'SanatanRoop',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '913wqbYQWYyRQMdP2NipyBMPrcAqhJSFeSVdikk7Lt4',
  },
  other: {
    'google-site-verification': '913wqbYQWYyRQMdP2NipyBMPrcAqhJSFeSVdikk7Lt4',
  },
  openGraph: {
    title: 'SanatanRoop | सम्पूर्ण सनातन धर्म, पंचांग, आरती एवं ग्रंथ',
    description:
      'सनातन ज्ञान की डिजिटल धरोहर - प्रामाणिक वेद, उपनिषद, श्रीमद्भगवद्गीता, नित्य पंचांग, पावन आरतियां एवं आध्यात्मिक वीडियो।',
    url: 'https://sanatanroop.com',
    siteName: 'SanatanRoop',
    locale: 'hi_IN',
    type: 'website',
    images: [
      {
        url: 'https://sanatanroop.com/images/hero_shiva.jpg',
        width: 1200,
        height: 630,
        alt: 'SanatanRoop - सम्पूर्ण सनातन धर्म डिजिटल मंच',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SanatanRoop | सम्पूर्ण सनातन धर्म, पंचांग, आरती एवं ग्रंथ',
    description:
      'सनातन ज्ञान की डिजिटल धरोहर - प्रामाणिक वेद, उपनिषद, श्रीमद्भगवद्गीता, नित्य पंचांग, पावन आरतियां एवं आध्यात्मिक वीडियो।',
    images: ['https://sanatanroop.com/images/hero_shiva.jpg'],
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SanatanRoop',
  alternateName: 'सनातन रूप',
  url: 'https://sanatanroop.com',
  logo: 'https://sanatanroop.com/icons/icon-512x512.png',
  description:
    'डिजिटल सनातन धर्म मंच - सम्पूर्ण वेद, उपनिषद, श्रीमद्भगवद्गीता, नित्य पंचांग, पावन आरतियां एवं प्रामाणिक आध्यात्मिक ज्ञान।',
  founder: {
    '@type': 'Person',
    name: 'Shubham Tiwari',
    jobTitle: 'Founder',
    url: 'https://sanatanroop.com/about',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@sanatanroop.com',
    contactType: 'customer support',
  },
  sameAs: [
    'https://twitter.com/sanatanroop',
    'https://www.youtube.com/@sanatanroop',
  ],
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SanatanRoop',
  alternateName: 'सनातन रूप',
  url: 'https://sanatanroop.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://sanatanroop.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>SanatanRoop | सम्पूर्ण सनातन धर्म, पंचांग, आरती एवं ग्रंथ</title>
        <meta
          name="description"
          content="सनातन ज्ञान की डिजिटल धरोहर - प्रामाणिक वेद, उपनिषद, श्रीमद्भगवद्गीता, नित्य पंचांग, पावन आरतियां, एवं आध्यात्मिक वीडियो।"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="SanatanRoop" />
        <link rel="canonical" href="https://sanatanroop.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className={`min-h-screen flex flex-col font-serif selection:bg-amber-200 selection:text-stone-900 pb-20 md:pb-0 overscroll-none touch-manipulation ${notoSerifDevanagari.variable} ${marcellus.variable} ${cinzel.variable}`}>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <AudioProvider>
                <CMSProvider>
                  <IntroScreen />
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <MobileBottomNav />
                </CMSProvider>
              </AudioProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
