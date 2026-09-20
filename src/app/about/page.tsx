import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'हमारे बारे में (About Us) - सनातन रूप का ध्येय एवं संकल्प',
  description:
    'SanatanRoop (सनातन रूप) - भारत की सनातन संस्कृति, वैदिक ज्ञान, वेद, उपनिषद, गीता, पंचांग, आरती और मन्दिर दर्शन को आधुनिक तकनीकी माध्यम से जन-जन तक पहुँचाने का एक पवित्र प्रयास। संस्थापक: शुभम तिवारी।',
  keywords: [
    'About SanatanRoop',
    'सनातन रूप परिचय',
    'Shubham Tiwari SanatanRoop',
    'Sanatan Dharma Mission',
    'वैदिक संस्कृति',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/about',
  },
  openGraph: {
    title: 'हमारे बारे में (About Us) | SanatanRoop',
    description:
      'SanatanRoop का ध्येय: वैदिक ज्ञान, वेद, उपनिषद, गीता, पंचांग और आरती को आधुनिक तकनीक से जन-जन तक पहुँचाना।',
    url: 'https://sanatanroop.com/about',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'About SanatanRoop' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'हमारे बारे में | SanatanRoop',
    description:
      'SanatanRoop का ध्येय एवं संकल्प - सनातन ज्ञान की डिजिटल धारा।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About SanatanRoop',
    description: 'SanatanRoop is a dedicated digital platform preserving and propagating the sacred knowledge of Sanatan Dharma.',
    mainEntity: {
      '@type': 'Organization',
      name: 'SanatanRoop',
      url: 'https://sanatanroop.com',
      logo: 'https://sanatanroop.com/images/hero_shiva.jpg',
      founder: {
        '@type': 'Person',
        name: 'Shubham Tiwari',
      },
      email: 'contact@sanatanroop.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'मुख्य पृष्ठ (Home)',
        item: 'https://sanatanroop.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'हमारे बारे में (About Us)',
        item: 'https://sanatanroop.com/about',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient />
    </>
  );
}
