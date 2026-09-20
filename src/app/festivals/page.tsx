import type { Metadata } from 'next';
import FestivalsClient from './FestivalsClient';

export const metadata: Metadata = {
  title: 'हिन्दू व्रत, पर्व एवं त्यौहार (Hindu Festivals & Vrats Calendar)',
  description:
    'दीपावली, महाशिवरात्रि, नवरात्रि, श्री कृष्ण जन्माष्टमी, होली, एकादशी एवं प्रमुख हिन्दू पर्वों की तिथि, शुभ मुहूर्त, व्रत विधि एवं पौराणिक कथाएँ।',
  keywords: [
    'Hindu Festivals',
    'हिन्दू त्यौहार',
    'Vrat Calendar',
    'Diwali 2026',
    'Maha Shivratri',
    'Navratri Vrat Vidhi',
    'Krishna Janmashtami',
    'Ekadashi Vrat Dates',
    'SanatanRoop Festivals',
  ],
  alternates: {
    canonical: 'https://sanatanroop.com/festivals',
  },
  openGraph: {
    title: 'हिन्दू व्रत, पर्व एवं त्यौहार (Hindu Festivals & Vrats) | SanatanRoop',
    description:
      'दीपावली, महाशिवरात्रि, नवरात्रि, जन्माष्टमी, होली एवं एकादशी की पावन तिथियाँ, शुभ मुहूर्त एवं व्रत विधि।',
    url: 'https://sanatanroop.com/festivals',
    siteName: 'SanatanRoop',
    images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630, alt: 'Hindu Festivals Calendar' }],
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'हिन्दू व्रत, पर्व एवं त्यौहार | SanatanRoop',
    description:
      'प्रमुख हिन्दू पर्वों की तिथि, शुभ मुहूर्त, व्रत विधि एवं पौराणिक कथाएँ।',
    images: ['/images/hero_shiva.jpg'],
  },
};

export default function FestivalsPage() {
  const festivalsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Major Hindu Festivals and Vrats',
    description: 'Calendar of major Hindu festivals, vrata vidhis, and auspicious dates.',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Event',
          name: 'महाशिवरात्रि (Maha Shivratri)',
          description: 'फाल्गुन कृष्ण चतुर्दशी को देवाधिदेव महादेव एवं माता पार्वती के विवाह का महापर्व।',
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Event',
          name: 'श्री कृष्ण जन्माष्टमी (Krishna Janmashtami)',
          description: 'भाद्रपद कृष्ण अष्टमी को भगवान श्रीकृष्ण का प्राकट्य उत्सव।',
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Event',
          name: 'दीपावली (Diwali / Deepawali)',
          description: 'कार्तिक अमावस्या को माँ महालक्ष्मी पूजन एवं भगवान श्री राम के अयोध्या आगमन का प्रकाश पर्व।',
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Event',
          name: 'शारदीय नवरात्रि (Sharad Navratri)',
          description: 'आश्विन शुक्ल प्रतिपदा से नवमी तक माँ आद्यशक्ति दुर्गा के नौ रूपों की उपासना का पावन पर्व।',
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        },
      },
    ],
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
        name: 'पर्व एवं त्यौहार (Festivals)',
        item: 'https://sanatanroop.com/festivals',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(festivalsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FestivalsClient />
    </>
  );
}
