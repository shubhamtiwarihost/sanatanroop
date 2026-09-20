import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  themeColor: '#FF9933',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'SanatanRoop | सम्पूर्ण सनातन धर्म, पंचांग, आरती एवं ग्रंथ',
  description:
    'सनातन ज्ञान की डिजिटल धरोहर - प्रामाणिक वेद, उपनिषद, श्रीमद्भगवद्गीता, नित्य पंचांग, पावन आरतियां, एवं आध्यात्मिक वीडियो।',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SanatanRoop',
  },
  keywords: [
    'SanatanRoop',
    'सनातन रूप',
    'Sanatan Dharma',
    'सनातन धर्म',
    'Bhagavad Gita',
    'Upanishads',
    'Vedas',
    'Shlokas',
    'Hindu Panchang',
    'Aartis',
    'Spiritual Videos',
  ],
  authors: [{ name: 'SanatanRoop - Shubham Tiwari' }],
  metadataBase: new URL('https://sanatanroop.com'),
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
    type: 'website',
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="SanatanRoop" />
      </head>
      <body className="min-h-screen flex flex-col font-serif selection:bg-amber-200 selection:text-stone-900 pb-20 md:pb-0 overscroll-none touch-manipulation">
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
