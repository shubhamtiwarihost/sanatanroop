import { Suspense } from 'react';
import type { Metadata } from 'next';
import ScriptureReaderClient from './ScriptureReaderClient';

interface Props {
  params: { slug: string };
}

const SCRIPTURE_METADATA: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    originalLanguage: string;
  }
> = {
  'bhagavad-gita': {
    title: 'श्रीमद्भगवद्गीता सम्पूर्ण १८ अध्याय हिंदी अर्थ सहित | Shrimad Bhagavad Gita',
    description:
      'श्रीमद्भगवद्गीता के सभी १८ अध्यायों के ७०० श्लोक संस्कृत मूल पाठ, हिंदी अनुवाद एवं अन्वय सहित पढ़ें। कुरुक्षेत्र में भगवान श्रीकृष्ण द्वारा अर्जुन को दिया गया दिव्य उपदेश।',
    keywords: ['श्रीमद्भगवद्गीता', 'Bhagavad Gita in Hindi', 'Gita 18 Adhyay', 'कृष्ण अर्जुन संवाद', 'भगवद गीता श्लोक', 'कर्म योग'],
    author: 'भगवान वेदव्यास (प्रवक्ता: भगवान श्रीकृष्ण)',
    originalLanguage: 'संस्कृत (Sanskrit)',
  },
  'ramcharitmanas': {
    title: 'श्रीरामचरितमानस सम्पूर्ण सातों काण्ड अर्थ सहित | Ramcharitmanas Hindi',
    description:
      'गोस्वामी तुलसीदास जी विरचित श्रीरामचरितमानस के सातों काण्ड (बालकाण्ड, अयोध्याकाण्ड, अरण्यकाण्ड, किष्किन्धाकाण्ड, सुन्दरकाण्ड, लंकाकाण्ड, उत्तरकाण्ड) दोहे, चौपाई एवं हिंदी भावार्थ सहित पढ़ें।',
    keywords: ['श्रीरामचरितमानस', 'Ramcharitmanas Hindi', 'तुलसीदास रामायण', 'बालकाण्ड', 'सुन्दरकाण्ड', 'रामकथा'],
    author: 'गोस्वामी तुलसीदास',
    originalLanguage: 'अवधी (Awadhi / Sanskrit)',
  },
  'isha-upanishad': {
    title: 'ईशावास्योपनिषद् संस्कृत श्लोक एवं हिंदी अनुवाद | Isha Upanishad',
    description:
      'शुक्ल यजुर्वेद का पावन ईशावास्योपनिषद् सम्पूर्ण १८ मन्त्र, संस्कृत पाठ, सरल हिंदी अनुवाद एवं आत्मज्ञान व्याख्या। ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।',
    keywords: ['ईशावास्योपनिषद्', 'Isha Upanishad Hindi', 'ईशावास्यमिदं सर्वम्', 'उपनिषद श्लोक', 'अद्वैत वेदान्त'],
    author: 'वैदिक ऋषिगण',
    originalLanguage: 'वैदिक संस्कृत (Vedic Sanskrit)',
  },
  'katha-upanishad': {
    title: 'कठोपनिषद् यम-नचिकेता संवाद एवं आत्मतत्व | Katha Upanishad Hindi',
    description:
      'कृष्ण यजुर्वेद का प्रसिद्ध कठोपनिषद् - यमराज और नचिकेता के मध्य अमर संवाद, मृत्यु का रहस्य, आत्मज्ञान एवं मोक्ष का मार्ग सम्पूर्ण हिंदी अर्थ सहित।',
    keywords: ['कठोपनिषद्', 'Katha Upanishad', 'यम नचिकेता संवाद', 'आत्मज्ञान', 'उत्तिष्ठत जाग्रत'],
    author: 'वैदिक ऋषिगण',
    originalLanguage: 'वैदिक संस्कृत (Vedic Sanskrit)',
  },
  'mandukya-upanishad': {
    title: 'माण्डूक्योपनिषद् ओंकार नाद एवं चेतना की चार अवस्थाएं | Mandukya Upanishad',
    description:
      'अथर्ववेदीय माण्डूक्योपनिषद् - ॐकार की त्रिमात्रा (अ, उ, म) और अमात्र तुरीय अवस्था का सर्वोच्च अद्वैत दर्शन सम्पूर्ण १२ मन्त्रों की हिंदी व्याख्या।',
    keywords: ['माण्डूक्योपनिषद्', 'Mandukya Upanishad', 'अयमात्मा ब्रह्म', 'ओंकार साधना', 'तुरीय चेतना'],
    author: 'वैदिक ऋषिगण',
    originalLanguage: 'वैदिक संस्कृत (Vedic Sanskrit)',
  },
  'rigveda-samhita': {
    title: 'ऋग्वेद संहिता पवित्र वैदिक मन्त्र एवं सूक्त | Rigveda Samhita Hindi',
    description:
      'मानव जाति का सबसे प्राचीनतम आध्यात्मिक ग्रन्थ ऋग्वेद संहिता - गायत्री मन्त्र, पुरुष सूक्त, नासदीय सूक्त एवं महामृत्युंजय मन्त्र हिंदी अर्थ सहित।',
    keywords: ['ऋग्वेद', 'Rigveda Samhita Hindi', 'वैदिक मन्त्र', 'पुरुष सूक्त', 'नासदीय सूक्त'],
    author: 'सप्तर्षि एवं वैदिक द्रष्टा',
    originalLanguage: 'वैदिक संस्कृत (Vedic Sanskrit)',
  },
  'shrimad-bhagavatam': {
    title: 'श्रीमद्भागवत महापुराण सम्पूर्ण १२ स्कन्ध कथा | Shrimad Bhagavatam',
    description:
      'महर्षि वेदव्यास विरचित श्रीमद्भागवत महापुराण - भगवान श्रीकृष्ण की दिव्य बाल लीलाएं, गोपी प्रेम, उद्धव संवाद, भक्ति योग और मोक्ष मार्ग।',
    keywords: ['श्रीमद्भागवत', 'Shrimad Bhagavatam Hindi', 'भागवत पुराण कथा', 'कृष्ण लीला', 'द्वादश स्कन्ध'],
    author: 'महर्षि वेदव्यास (शुकदेव जी महाराज)',
    originalLanguage: 'संस्कृत (Sanskrit)',
  },
  'patanjali-yoga': {
    title: 'पातञ्जल योगसूत्र सम्पूर्ण चार पाद हिंदी व्याख्या | Patanjali Yoga Sutras',
    description:
      'महर्षि पतंजलि प्रणीत अष्टांग योग - यम, नियम, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान और समाधि पाद के १९६ सूत्र सरल हिंदी अनुवाद सहित।',
    keywords: ['योगसूत्र', 'Patanjali Yoga Sutras Hindi', 'अष्टांग योग', 'योगश्चित्तवृत्तिनिरोधः', 'समाधि पाद'],
    author: 'महर्षि पतंजलि',
    originalLanguage: 'संस्कृत (Sanskrit)',
  },
  'chanakya-niti': {
    title: 'चाणक्य नीति सम्पूर्ण १७ अध्याय हिंदी सूत्र | Chanakya Niti Hindi',
    description:
      'आचार्य चाणक्य के अमूल्य नीति सूत्र - राजनीति, कूटनीति, सफलता, धन प्रबन्धन, मित्र चयन एवं जीवन प्रबन्धन के व्यावहारिक नियम हिंदी अर्थ सहित।',
    keywords: ['चाणक्य नीति', 'Chanakya Niti in Hindi', 'आचार्य चाणक्य', 'नीतिशास्त्र', 'कौटिल्य अर्थशास्त्र'],
    author: 'आचार्य चाणक्य (विष्णुगुप्त कौटिल्य)',
    originalLanguage: 'संस्कृत (Sanskrit)',
  },
};

export function generateStaticParams() {
  return [
    { slug: 'bhagavad-gita' },
    { slug: 'ramcharitmanas' },
    { slug: 'isha-upanishad' },
    { slug: 'katha-upanishad' },
    { slug: 'mandukya-upanishad' },
    { slug: 'rigveda-samhita' },
    { slug: 'shrimad-bhagavatam' },
    { slug: 'patanjali-yoga' },
    { slug: 'chanakya-niti' },
  ];
}

export function generateMetadata({ params }: Props): Metadata {
  const meta = SCRIPTURE_METADATA[params.slug] || {
    title: 'सनातन पवित्र ग्रन्थ | Sanatan Sacred Scriptures',
    description: 'सनातन धर्म के पावन ग्रन्थ, वेद, उपनिषद एवं पुराण हिंदी अनुवाद सहित।',
    keywords: ['सनातन ग्रन्थ', 'Sanatan Scriptures', 'Hindu Sacred Texts'],
    author: 'सनातन ऋषि परंपरा',
    originalLanguage: 'संस्कृत',
  };

  const url = `https://sanatanroop.com/scriptures/${params.slug}`;

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

export default function ScriptureReaderPage({ params }: Props) {
  const meta = SCRIPTURE_METADATA[params.slug];

  const jsonLd = meta
    ? {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: meta.title,
        description: meta.description,
        author: {
          '@type': 'Person',
          name: meta.author,
        },
        inLanguage: 'hi',
        url: `https://sanatanroop.com/scriptures/${params.slug}`,
        publisher: {
          '@type': 'Organization',
          name: 'SanatanRoop',
          url: 'https://sanatanroop.com',
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
        name: 'पवित्र ग्रन्थ (Scriptures)',
        item: 'https://sanatanroop.com/scriptures',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: meta?.title || params.slug,
        item: `https://sanatanroop.com/scriptures/${params.slug}`,
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
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#faf8f5] p-8 text-center font-serif text-stone-600">
            Loading Scripture...
          </div>
        }
      >
        <ScriptureReaderClient />
      </Suspense>
    </>
  );
}
