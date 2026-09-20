import type { Metadata } from 'next';
import ArticleDetailClient from './ArticleDetailClient';

interface Props {
  params: { slug: string };
}

const ARTICLE_METADATA: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
    publishedDate: string;
  }
> = {
  'benefits-of-daily-mantra-meditation': {
    title: 'दैनिक मन्त्र जप व ध्यान के वैज्ञानिक एवं आध्यात्मिक लाभ | Mantra Meditation Benefits',
    description:
      'दैनिक ओंकार एवं गायत्री मन्त्र जप से मानसिक शांति, एकाग्रता, तनाव मुक्ति एवं आध्यात्मिक जागरण कैसे प्राप्त करें? जानें वैज्ञानिक व यौगिक दृष्टिकोण।',
    keywords: ['मन्त्र जप लाभ', 'Mantra Meditation', 'ध्यान के फायदे', 'ओंकार साधना', 'तनाव मुक्ति', 'चित्त शुद्धि'],
    publishedDate: '2026-08-15T06:00:00.000Z',
  },
  'significance-of-ekadashi-vrat': {
    title: 'एकादशी व्रत का आध्यात्मिक महत्व, पारण समय एवं सम्पूर्ण पूजा विधि | Ekadashi Vrat Vidhi',
    description:
      'एकादशी व्रत का पौराणिक महत्व, भगवान श्री हरि विष्णु की पूजा विधि, पारण का सही समय एवं नियम। जानें एकादशी व्रत करने के संपूर्ण पुण्य फल।',
    keywords: ['एकादशी व्रत', 'Ekadashi Vrat Vidhi', 'पारण समय', 'विष्णु पूजा', 'एकादशी व्रत कथा', 'मोक्षदा एकादशी'],
    publishedDate: '2026-08-18T06:00:00.000Z',
  },
  'life-lessons-from-bhagavad-gita': {
    title: 'श्रीमद्भगवद्गीता से जीवन जीने की १० अमूल्य सीख | Life Lessons from Bhagavad Gita',
    description:
      'श्रीमद्भगवद्गीता के वे दिव्य उपदेश जो आधुनिक जीवन के तनाव, अवसाद, असमंजस और असफलता के डर को समाप्त कर जीवन में सफलता और शांति लाते हैं।',
    keywords: ['भगवद्गीता सीख', 'Bhagavad Gita Lessons', 'कर्म योग', 'कृष्ण उपदेश', 'सफलता के नियम', 'गीता सार'],
    publishedDate: '2026-08-20T06:00:00.000Z',
  },
  'four-purusharthas': {
    title: 'सनातन धर्म के चार पुरुषार्थ: धर्म, अर्थ, काम और मोक्ष | Four Purusharthas in Sanatan Dharma',
    description:
      'मानव जीवन के चार परम लक्ष्य - धर्म, अर्थ, काम और मोक्ष का संतुलन कैसे बनाएं? सनातन दर्शन का व्यावहारिक मार्गदर्शन।',
    keywords: ['चार पुरुषार्थ', 'Dharma Artha Kama Moksha', 'सनातन दर्शन', 'जीवन का उद्देश्य', 'सनातन जीवन शैली'],
    publishedDate: '2026-08-22T06:00:00.000Z',
  },
  'ganesha-chaturthi-significance': {
    title: 'गणेश चतुर्थी पूजा विधि, शुभ मुहूर्त एवं कथा | Ganesh Chaturthi Significance & Puja',
    description:
      'विघ्नहर्ता भगवान श्री गणेश की स्थापना, षोडशोपचार पूजा विधि, मोदक भोग एवं विसर्जन का शास्त्रीय विधान।',
    keywords: ['गणेश चतुर्थी', 'Ganesh Chaturthi Puja', 'गणेश स्थापना विधि', 'गणपति बप्पा', 'मोदक भोग'],
    publishedDate: '2026-08-25T06:00:00.000Z',
  },
  'sharad-navratri-vidhi': {
    title: 'शारदीय नवरात्रि कलश स्थापना, नौ देवियों की पूजा विधि | Sharad Navratri Puja Vidhi',
    description:
      'माँ दुर्गा के नौ रूपों की पावन आराधना - शैलपुत्री से सिद्धिदात्री तक। घटस्थापना मुहूर्त, व्रत नियम, दुर्गा सप्तशती पाठ विधि।',
    keywords: ['शारदीय नवरात्रि', 'Navratri Puja Vidhi', 'कलश स्थापना', 'दुर्गा पूजा', 'नौ देवियां', 'दुर्गा सप्तशती'],
    publishedDate: '2026-08-28T06:00:00.000Z',
  },
  'rudraksha-spiritual-benefits': {
    title: 'रुद्राक्ष के आध्यात्मिक एवं वैज्ञानिक लाभ, धारण विधि | Rudraksha Benefits & Rules',
    description:
      'एक मुखी से चौदह मुखी रुद्राक्ष के लाभ, शिव पुराण के अनुसार धारण करने के नियम, प्राण-प्रतिष्ठा विधि एवं वैज्ञानिक प्रभाव।',
    keywords: ['रुद्राक्ष के लाभ', 'Rudraksha Benefits', 'रुद्राक्ष धारण विधि', 'शिव पुराण', 'पंचमुखी रुद्राक्ष'],
    publishedDate: '2026-09-01T06:00:00.000Z',
  },
  'daily-sandhyavandanam-guide': {
    title: 'नित्य संध्यावन्दन विधि एवं मन्त्र साधना मार्गदर्शन | Daily Sandhyavandanam Guide',
    description:
      'त्रिकाल संध्यावन्दन का महत्व, आचमन, प्राणायाम, गायत्री जप एवं अर्घ्य समर्पण की शास्त्रीय विधि।',
    keywords: ['संध्यावन्दन', 'Sandhyavandanam Vidhi', 'गायत्री जप', 'नित्य कर्म', 'आचमन विधि'],
    publishedDate: '2026-09-05T06:00:00.000Z',
  },
  'hanuman-chalisa-spiritual-power': {
    title: 'श्री हनुमान चालीसा का पाठ करने के चमत्कारी लाभ एवं फलश्रुति | Hanuman Chalisa Power',
    description:
      'गोस्वामी तुलसीदास जी विरचित श्री हनुमान चालीसा के नित्य पाठ से भय, संकट, रोग और बाधाओं से मुक्ति का दिव्य प्रभाव।',
    keywords: ['हनुमान चालीसा लाभ', 'Hanuman Chalisa Benefits', 'संकटमोचन', 'तुलसीदास चालीसा', 'हनुमान साधना'],
    publishedDate: '2026-09-10T06:00:00.000Z',
  },
};

export function generateStaticParams() {
  return [
    { slug: 'benefits-of-daily-mantra-meditation' },
    { slug: 'significance-of-ekadashi-vrat' },
    { slug: 'life-lessons-from-bhagavad-gita' },
    { slug: 'four-purusharthas' },
    { slug: 'ganesha-chaturthi-significance' },
    { slug: 'sharad-navratri-vidhi' },
    { slug: 'rudraksha-spiritual-benefits' },
    { slug: 'daily-sandhyavandanam-guide' },
    { slug: 'hanuman-chalisa-spiritual-power' },
  ];
}

export function generateMetadata({ params }: Props): Metadata {
  const meta = ARTICLE_METADATA[params.slug] || {
    title: 'सनातन आध्यात्मिक लेख | Sanatan Spiritual Articles',
    description: 'सनातन धर्म, व्रत, पर्व, ध्यान और दर्शन पर प्रामाणिक आध्यात्मिक लेख।',
    keywords: ['सनातन लेख', 'Spiritual Articles', 'Hindu Dharma Wisdom'],
    publishedDate: '2026-08-01T06:00:00.000Z',
  };

  const url = `https://sanatanroop.com/articles/${params.slug}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: 'SanatanRoop',
      locale: 'hi_IN',
      type: 'article',
      publishedTime: meta.publishedDate,
      authors: ['Shubham Tiwari'],
      images: [
        {
          url: 'https://sanatanroop.com/images/hero_shiva.jpg',
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['https://sanatanroop.com/images/hero_shiva.jpg'],
    },
  };
}

export default function ArticleDetailPage({ params }: Props) {
  const meta = ARTICLE_METADATA[params.slug];

  const jsonLd = meta
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: meta.title,
        description: meta.description,
        datePublished: meta.publishedDate,
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: 'Shubham Tiwari',
          url: 'https://sanatanroop.com/about',
        },
        publisher: {
          '@type': 'Organization',
          name: 'SanatanRoop',
          url: 'https://sanatanroop.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://sanatanroop.com/icons/icon-512x512.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://sanatanroop.com/articles/${params.slug}`,
        },
      }
    : null;

  const breadcrumbsLd = {
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
        name: 'आध्यात्मिक लेख (Articles)',
        item: 'https://sanatanroop.com/articles',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: meta?.title || params.slug,
        item: `https://sanatanroop.com/articles/${params.slug}`,
      },
    ],
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <ArticleDetailClient />
    </>
  );
}
