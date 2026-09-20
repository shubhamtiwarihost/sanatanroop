import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'SANATAN GRANTH | सनातन ज्ञान की डिजिटल धरोहर',
  description:
    'A premier digital Sanatan Dharma library featuring authentic Vedas, Upanishads, Bhagavad Gita, Puranas, Sanskrit shlokas, and Hindu Panchang.',
  keywords: [
    'Sanatan Granth',
    'सनातन ग्रंथ',
    'Bhagavad Gita',
    'Upanishads',
    'Vedas',
    'Shlokas',
    'Hindu Panchang',
    'Sanskrit Library',
    'Sanatan Dharma',
  ],
  authors: [{ name: 'Sanatan Granth Digital Library' }],
  metadataBase: new URL('http://localhost:3001'),
  openGraph: {
    title: 'SANATAN GRANTH | सनातन ज्ञान की डिजिटल धरोहर',
    description: 'A premier digital library of canonical Sanatan Dharma scriptures and Sanskrit heritage.',
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
      <body className="min-h-screen flex flex-col font-serif selection:bg-gold-200 selection:text-charcoal-900 pb-16 xl:pb-0">
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
