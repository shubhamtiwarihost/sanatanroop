import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'सनातन ई-पुस्तकें — PDF खरीदें (Sanatan E-Books)',
  description: 'सनातन धर्म के ग्रंथ, चालीसा एवं आध्यात्मिक पुस्तकें PDF में खरीदें और तुरंत डाउनलोड करें। PhonePe द्वारा सुरक्षित भुगतान।',
  alternates: { canonical: 'https://sanatanroop.com/ebooks' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
