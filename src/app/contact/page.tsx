import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'संपर्क करें (Contact Us) - सुझाव, सहयोग एवं सहायता',
  description:
    'SanatanRoop से संपर्क करें। किसी भी प्रश्न, सुझाव, त्रुटि सुधार अथवा सहयोग के लिए contact@sanatanroop.com पर संदेश भेजें।',
  keywords: [
    'Contact SanatanRoop',
    'सनातन रूप संपर्क',
    'contact@sanatanroop.com',
    'Sanatan Support',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/contact',
  },
  openGraph: {
    title: 'संपर्क करें (Contact Us) | SanatanRoop',
    description:
      'SanatanRoop से संपर्क करें। किसी भी प्रश्न, सुझाव अथवा सहयोग के लिए contact@sanatanroop.com पर संपर्क करें।',
    url: 'https://sanatanroop.com/contact',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Contact SanatanRoop' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'संपर्क करें | SanatanRoop',
    description:
      'किसी भी प्रश्न, सुझाव अथवा सहयोग के लिए हमसे संपर्क करें।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact SanatanRoop',
    description: 'Get in touch with the SanatanRoop team.',
    mainEntity: {
      '@type': 'Organization',
      name: 'SanatanRoop',
      url: 'https://sanatanroop.com',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contact@sanatanroop.com',
        contactType: 'customer support',
        availableLanguage: ['Hindi', 'English', 'Sanskrit'],
      },
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
        name: 'संपर्क करें (Contact Us)',
        item: 'https://sanatanroop.com/contact',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient />
    </>
  );
}
