'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  Calendar,
  Clock,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  UserCheck,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { BLOG_POSTS } from '@/data/blogPosts';

interface BlogArticleDetail {
  title: string;
  category: string;
  date: string;
  readTime: string;
  img: string;
  author: string;
  authorBio: string;
  shloka?: {
    sanskrit: string;
    transliteration: string;
    translation: string;
    source: string;
  };
  content: {
    heading: string;
    body: string;
    bullets?: string[];
  }[];
}

const ARTICLE_CONTENTS: Record<string, BlogArticleDetail> = {
  'benefits-of-daily-mantra-meditation': {
    title: 'The Science of Mantra Chanting: How Vedic Vibrations Influence Consciousness',
    category: 'Mantras & Sadhana',
    date: '15 September 2026',
    readTime: '8 min read',
    img: '/images/article_meditation.jpg',
    author: 'Shubham Tiwari',
    authorBio:
      'Shubham Tiwari is the Founder & Editor-in-Chief of Sanatan Roop, dedicated to preserving and digitizing authentic Vedic wisdom, Sanskrit scriptures, and classical Dharmic philosophy for global seekers.',
    shloka: {
      sanskrit: 'मननात् त्रायते इति मन्त्रः।',
      transliteration: 'Mananāt trāyate iti mantraḥ.',
      translation:
        'A mantra is that sacred syllable or verse which protects and liberates the mind that constantly contemplates upon it.',
      source: 'Pingala Upanishad & Classical Tantra Shastra',
    },
    content: [
      {
        heading: '1. The Acoustic Architecture of Sanskrit',
        body: 'Unlike arbitrary vernacular vocabularies, Sanskrit is a primordial sound-code where each phoneme corresponds directly to subtle energetic frequencies (spanda) in the human nervous system. When chanted with correct Vedic intonation (Udatta, Anudatta, and Svarita), the tongue stimulates specific reflex points on the upper palate, harmonizing endocrine secretions and synchronizing the left and right cerebral hemispheres.',
      },
      {
        heading: '2. Clinical & Neuro-biological Benefits',
        body: 'Modern neuroimaging demonstrates that rhythmic mantra chanting significantly lowers cortisol levels, stimulates vagal tone, and enhances alpha and theta brainwave coherence. Key benefits include:',
        bullets: [
          'Immediate reduction in psychological anxiety and sympathetic nervous overactivity.',
          'Enhanced neuroplasticity and memory retention through structured acoustic repetition.',
          'Regulation of heart rate variability (HRV) during prolonged japa sessions.',
          'Awakening of higher intuitive cognition (Ritambhara Pragya).',
        ],
      },
      {
        heading: '3. A Practical Daily Japa Protocol',
        body: 'To establish a daily practice, sit facing East during the Brahma Muhurta (4:00 AM – 6:00 AM). Hold a consecrated Rudraksha or Tulsi mala in your right hand, resting the bead on the middle finger and rolling it inward with the thumb without letting the index finger touch the bead. Chant the Mahamrityunjaya or Gayatri Mantra for 108 repetitions with devotion and focused mindfulness.',
      },
    ],
  },
  'significance-of-ekadashi-vrat': {
    title: 'Ekadashi Vrat: Shastric Rules, Spiritual Significance, and Health Benefits',
    category: 'Vrat & Festivals',
    date: '12 September 2026',
    readTime: '10 min read',
    img: '/images/article_ekadashi.jpg',
    author: 'Shubham Tiwari',
    authorBio:
      'Shubham Tiwari is the Founder & Editor-in-Chief of Sanatan Roop, dedicated to preserving and digitizing authentic Vedic wisdom, Sanskrit scriptures, and classical Dharmic philosophy for global seekers.',
    shloka: {
      sanskrit: 'एकादश्यां न भुञ्जीत पक्षयोरुभयोरपि।',
      transliteration: 'Ekādaśyāṁ na bhuñjīta pakṣayorubhayorapi.',
      translation:
        'One should observe fast on the eleventh day of both the waxing (Shukla) and waning (Krishna) fortnights of every lunar month.',
      source: 'Padma Purana & Hari Bhakti Vilasa',
    },
    content: [
      {
        heading: '1. Cosmic Alignment & Lunar Gravitational Pull',
        body: 'The human body is composed of over 70% water, rendering it susceptible to the gravitational fluctuations exerted by the moon. On the 11th lunar day (Ekadashi), the moon’s electromagnetic attraction reaches an energetic tipping point before the Full Moon (Purnima) or New Moon (Amavasya). Fasting on this day mitigates physical sluggishness and directs biological energy inward.',
      },
      {
        heading: '2. Spiritual Merits Recorded in the Puranas',
        body: 'The Padma Purana and Skanda Purana explain that Ekadashi is named after the divine feminine energy manifested from Lord Vishnu to subdue demonic tendencies. Observing this sacred day with devotion purifies karmic impressions across lifetimes and grants spiritual liberation (Moksha).',
        bullets: [
          'Abstinence from grains and beans prevents tamasic dullness in consciousness.',
          'Observance of silent contemplation (Mauna) amplifies meditative focus.',
          'Reading the Srimad Bhagavatam or Vishnu Sahasranama brings peace to the household.',
        ],
      },
      {
        heading: '3. Proper Parana (Breaking the Fast)',
        body: 'The fast must be concluded during the precise Parana Muhurat on Dwadashi tithi. Breaking the fast too early or after Dwadashi terminates nullifies the spiritual fruit of the vrata. Parana should ideally begin with sacred charanamrita or fresh water followed by a light sattvic meal.',
      },
    ],
  },
  'life-lessons-from-bhagavad-gita': {
    title: 'Bhagavad Gita for Modern Living: 7 Timeless Principles from Kurukshetra',
    category: 'Vedic Philosophy',
    date: '08 September 2026',
    readTime: '12 min read',
    img: '/images/article_gita_lessons.jpg',
    author: 'Shubham Tiwari',
    authorBio:
      'Shubham Tiwari is the Founder & Editor-in-Chief of Sanatan Roop, dedicated to preserving and digitizing authentic Vedic wisdom, Sanskrit scriptures, and classical Dharmic philosophy for global seekers.',
    shloka: {
      sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      transliteration: 'Karmaṇy-evādhikāras te mā phaleṣu kadācana, mā karma-phala-hetur bhūr mā te saṅgo ’stv akarmaṇi.',
      translation:
        'You have a right only to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results of your activities, nor let yourself be attached to inaction.',
      source: 'Srimad Bhagavad Gita 2.47',
    },
    content: [
      {
        heading: '1. Mastering Nishkama Karma in the Modern Workplace',
        body: 'Anxiety in modern professional and personal endeavors stems from obsessive attachment to outcomes over which we have no ultimate control. Lord Krishna teaches that true mastery lies in 100% devotion to the excellence of the process (Yogaḥ karmasu kauśalam) while surrendering the results to the Divine Supreme.',
      },
      {
        heading: '2. The Chariot Allegory: Intellect as the Driver',
        body: 'In the Katha Upanishad and Gita, the body is compared to a chariot, the senses to restless horses, the mind to the reins, the intellect (Buddhi) to the charioteer, and the Soul (Atman) to the passenger. When the intellect is surrendered to Divine wisdom, the horses never stray into the abyss.',
        bullets: [
          'Dhyana Yoga cultivates an unwavering mind like a flame in a windless sanctuary.',
          'Samatvam (Equanimity) empowers one to remain untouched by praise or criticism.',
          'Devotion (Bhakti) transforms every mundane duty into a sacred offering (Yajna).',
        ],
      },
      {
        heading: '3. Transcending the Three Gunas',
        body: 'Every thought and action is shaped by Sattva (purity and light), Rajas (passion and agitation), and Tamas (inertia and darkness). By consciously cultivating sattvic food, pure company (Satsang), and truthful speech, one steadily ascends toward Gunatita—complete spiritual transcendence.',
      },
    ],
  },
  'four-purusharthas': {
    title: 'The Four Purusharthas: Balancing Dharma, Artha, Kama, and Moksha',
    category: 'Vedic Philosophy',
    date: '05 September 2026',
    readTime: '9 min read',
    img: '/images/article_meditation.jpg',
    author: 'Shubham Tiwari',
    authorBio:
      'Shubham Tiwari is the Founder & Editor-in-Chief of Sanatan Roop, dedicated to preserving and digitizing authentic Vedic wisdom, Sanskrit scriptures, and classical Dharmic philosophy for global seekers.',
    shloka: {
      sanskrit: 'धर्मे चार्थे च कामे च मोक्षे च भरतर्षभ। यदिहास्ति तदन्यत्र यन्नेहास्ति न तत्क्वचित्॥',
      transliteration: 'Dharme cārthe ca kāme ca mokṣe ca bharatarṣabha, yad ihāsti tad anyatra yan nehāsti na tat kvacit.',
      translation:
        'Whatever is found here concerning Dharma, Artha, Kama, and Moksha may be found elsewhere, but what is not found here cannot be found anywhere.',
      source: 'Mahabharata, Adi Parva',
    },
    content: [
      {
        heading: '1. The Holistic Architecture of Vedic Life',
        body: 'Sanatan Dharma never advocates world-negating asceticism for all. Instead, it lays down the fourfold goals of human life (Purusharthas) to ensure material fulfillment without spiritual degeneration.',
      },
      {
        heading: '2. The Interlocking Four Pillars',
        body: 'Each Purushartha must support the other in perfect equilibrium:',
        bullets: [
          'Dharma (Righteousness): The ethical foundation and cosmic order governing all transactions.',
          'Artha (Prosperity): The ethical acquisition of wealth, resources, and societal security.',
          'Kama (Pleasure): The refined appreciation of aesthetic beauty, family joy, and culture within Dharmic boundaries.',
          'Moksha (Liberation): The ultimate realization of the Soul’s immortal union with Brahman.',
        ],
      },
      {
        heading: '3. Integrating the Purusharthas Daily',
        body: 'When money is earned through Dharma, it brings peace rather than anxiety. When enjoyment is sanctified by Dharma, it elevates rather than degrades. And when life is lived with this understanding, every step becomes a pilgrimage toward Moksha.',
      },
    ],
  },
  'ganesha-chaturthi-significance': {
    title: 'Lord Ganesha: Esoteric Symbolism, Modaka Tattva, and Spiritual Awakening',
    category: 'Vrat & Festivals',
    date: '02 September 2026',
    readTime: '7 min read',
    img: '/images/category_idols.jpg',
    author: 'Shubham Tiwari',
    authorBio:
      'Shubham Tiwari is the Founder & Editor-in-Chief of Sanatan Roop, dedicated to preserving and digitizing authentic Vedic wisdom, Sanskrit scriptures, and classical Dharmic philosophy for global seekers.',
    shloka: {
      sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
      transliteration: 'Vakratuṇḍa mahākāya sūryakoṭi samaprabha, nirvighnaṁ kuru me deva sarvakāryeṣu sarvadā.',
      translation:
        'O Lord with the curved trunk and immense form, possessing the brilliance of ten million suns! Please remove all obstacles from my endeavors at all times.',
      source: 'Mudgala Purana & Ganapati Atharvashirsha',
    },
    content: [
      {
        heading: '1. The Deity of the Muladhara Chakra',
        body: 'In Kundalini Yoga, Lord Ganesha presides over the Muladhara (root) chakra, the foundational nexus anchoring physical existence. Without His grace, spiritual energy cannot ascend safely through Sushumna Nadi.',
      },
      {
        heading: '2. Deeper Allegories of His Iconography',
        body: 'Every visual attribute of Sri Ganesha conveys an esoteric Upanishadic truth:',
        bullets: [
          'Large Ears: Listen more, assimilate deep wisdom, and discard useless gossip.',
          'Single Tusk (Ekadanta): Beyond duality; retaining the good while discarding the ephemeral.',
          'Modaka in Hand: The ultimate sweet bliss of Self-realization (Ananda).',
          'Tiny Mouse (Mushaka): The restless human ego subdued under the disciplined grace of the Master.',
        ],
      },
      {
        heading: '3. Daily Remembrance for Unbroken Success',
        body: 'Invoking Sri Ganesha at the beginning of any study, travel, or venture attunes our intellect to harmony, eliminating subtle obstacles before they materialize in physical reality.',
      },
    ],
  },
  'sharad-navratri-vidhi': {
    title: 'Navratri & The Nine Forms of Maa Durga: Philosophy and Sadhana Vidhi',
    category: 'Vrat & Festivals',
    date: '30 August 2026',
    readTime: '14 min read',
    img: '/images/category_puja.jpg',
    author: 'Shubham Tiwari',
    authorBio:
      'Shubham Tiwari is the Founder & Editor-in-Chief of Sanatan Roop, dedicated to preserving and digitizing authentic Vedic wisdom, Sanskrit scriptures, and classical Dharmic philosophy for global seekers.',
    shloka: {
      sanskrit: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
      transliteration: 'Yā devī sarvabhūteṣu śaktirūpeṇa saṁsthitā, namas tasyai namas tasyai namas tasyai namo namaḥ.',
      translation:
        'To that Divine Mother who resides in all living beings as primal cosmic power (Shakti), salutations to Her, salutations to Her, repeated salutations.',
      source: 'Devi Mahatmyam (Durga Saptashati)',
    },
    content: [
      {
        heading: '1. The Battle Within: Mahishasura Mardini',
        body: 'The Durga Saptashati is not merely a mythological chronicle; it is an allegorical blueprint of spiritual warfare. Mahishasura represents primal delusion and inertia (Tamas). Madhu and Kaitabha symbolize greed and clinging. Chanda and Munda embody hypocrisy and malice. The Mother Goddess’s descent marks the illumination that destroys these inner afflictions.',
      },
      {
        heading: '2. The Nine Ascending Stages of Consciousness',
        body: 'The nine manifestations worshiped sequentially represent the ascent of the sadhaka:',
        bullets: [
          'Shailaputri: Grounding in spiritual determination and unshakeable resolve.',
          'Brahmacharini: Austerity, disciplined celibacy, and inner tapasya.',
          'Chandraghanta: Alertness and readiness to protect righteousness.',
          'Kushmanda: Radiant life-energy creating cosmic vibrancy.',
          'Skandamata: Nurturing compassion and maternal grace.',
          'Katyayani: Fierce destruction of entrenched negative conditioning.',
          'Kalaratri: Dissolution of the ego into primordial timelessness.',
          'Mahagauri: Supreme purification and crystalline inner peace.',
          'Siddhidatri: Bestowal of spiritual perfections and complete Moksha.',
        ],
      },
      {
        heading: '3. Practical Ghatasthapana and Fasting Guidelines',
        body: 'Ensure the Kalash is installed during the auspicious Choghadiya on Pratipada tithi. Sow sacred barley (Jowar) in clean soil, light the Akhand Jyot, and recite the Argala Stotra, Kilaka, and Devi Kavacha daily with pure devotion.',
      },
    ],
  },
  'rudraksha-spiritual-benefits': {
    title: 'The Mystical Power of Rudraksha: Types, Shastric Benefits, and Wearing Rules',
    category: 'Daily Lifestyle',
    date: '26 August 2026',
    readTime: '8 min read',
    img: '/images/category_rudraksha.jpg',
    author: 'Shubham Tiwari',
    authorBio:
      'Shubham Tiwari is the Founder & Editor-in-Chief of Sanatan Roop, dedicated to preserving and digitizing authentic Vedic wisdom, Sanskrit scriptures, and classical Dharmic philosophy for global seekers.',
    shloka: {
      sanskrit: 'रुद्राक्षधारणादेव मुच्यते सर्वपातकैः।',
      transliteration: 'Rudrākṣadhāraṇādeva mucyate sarvapātakaiḥ.',
      translation:
        'By merely wearing the sacred Rudraksha beads, a person is freed from sins and attains spiritual liberation.',
      source: 'Shiva Purana, Vidyeshvara Samhita',
    },
    content: [
      {
        heading: '1. Origin from the Tears of Lord Shiva',
        body: 'According to the Shiva Purana, after thousands of years of deep yogic meditation for the welfare of all living beings, Lord Shiva opened His eyes. Tears of compassion fell from His eyes onto the earth, growing into the sacred Elaeocarpus ganitrus tree, whose seeds are revered as Rudraksha.',
      },
      {
        heading: '2. Mukhi Classifications & Subtle Energy',
        body: 'Rudraksha beads are classified by the natural vertical clefts (Mukhis) dividing their surface:',
        bullets: [
          '1 Mukhi: Governed by Lord Shiva; grants supreme detachment and single-pointed focus.',
          '5 Mukhi: Governed by Kalagni Rudra; stabilizes blood pressure, calms intellect, and protects health.',
          '7 Mukhi: Governed by Goddess Mahalakshmi; removes financial obstacles and invites righteous abundance.',
          '11 Mukhi: Governed by Lord Hanuman; dispels fear, panic attacks, and physical vulnerability.',
        ],
      },
      {
        heading: '3. Care, Cleansing, and Consecration',
        body: 'Rudraksha should be cleansed periodically with pure water and conditioned with sandalwood oil or cow ghee. It is best consecrated on Mondays or Shivaratri by chanting the Panchakshari Mantra (Om Namah Shivaya) 108 times.',
      },
    ],
  },
  'daily-sandhyavandanam-guide': {
    title: 'Daily Sandhyavandanam & Vedic Puja: Practical Guide for the Modern Household',
    category: 'Daily Lifestyle',
    date: '22 August 2026',
    readTime: '11 min read',
    img: '/images/category_puja.jpg',
    author: 'Shubham Tiwari',
    authorBio:
      'Shubham Tiwari is the Founder & Editor-in-Chief of Sanatan Roop, dedicated to preserving and digitizing authentic Vedic wisdom, Sanskrit scriptures, and classical Dharmic philosophy for global seekers.',
    shloka: {
      sanskrit: 'सन्ध्या हीनोऽशुचिर्नित्यमनर्हः सर्वकर्मसु।',
      transliteration: 'Sandhyā hīno ’śucir nityam anarhaḥ sarvakarmasu.',
      translation:
        'One who neglects the sacred twilight communion (Sandhyavandanam) remains continually impure and unfit for Vedic rites.',
      source: 'Manu Smriti & Bodhayana Grihya Sutra',
    },
    content: [
      {
        heading: '1. The Science of the Twilight Junctions (Sandhis)',
        body: 'The human bio-rhythm is intimately tied to solar radiation. The junction points of day and night—Dawn (Pratah), Noon (Madhyahna), and Dusk (Sayam)—are moments when the Sushumna Nadi naturally activates, making spiritual meditation exceptionally potent.',
      },
      {
        heading: '2. The Core Sequential Steps',
        body: 'A complete Sandhyavandanam incorporates ancient Vedic science:',
        bullets: [
          'Achamana: Sip water with sacred names to purify the subtle energetic channels (Nadis).',
          'Pranayama: Rhythmic breath control to quiet emotional turbulence and still the pulse.',
          'Marjana: Sprinkling water with mantras to cleanse karmic debris from the auric field.',
          'Arghya Pradanam: Offering water to the Sun God (Surya) to dispel darkness and dullness.',
          'Gayatri Japa: Contemplating the Supreme Savita who illumines all intellects.',
        ],
      },
      {
        heading: '3. Adapting to Contemporary Schedules',
        body: 'Even 15 to 20 minutes spent in sincere Sandhya worship each morning can shield one from daily stresses, revitalize mental energy, and instill deep spiritual poise.',
      },
    ],
  },
  'hanuman-chalisa-spiritual-power': {
    title: 'Hanuman Chalisa: Verse-by-Verse Spiritual Science and Daily Sadhana',
    category: 'Mantras & Sadhana',
    date: '18 August 2026',
    readTime: '9 min read',
    img: '/images/article_gita_lessons.jpg',
    author: 'Shubham Tiwari',
    authorBio:
      'Shubham Tiwari is the Founder & Editor-in-Chief of Sanatan Roop, dedicated to preserving and digitizing authentic Vedic wisdom, Sanskrit scriptures, and classical Dharmic philosophy for global seekers.',
    shloka: {
      sanskrit: 'जो यह पढ़ै हनुमान चालीसा। होय सिद्धि साखी गौरीसा॥',
      transliteration: 'Jo yaha paṛhai Hanumāna Chālīsā, hoya siddhi sākhī Gaurīsā.',
      translation:
        'Whoever recites this Hanuman Chalisa with faith shall attain spiritual perfection (Siddhi), as Lord Shiva (Gaurisa) Himself bears witness.',
      source: 'Sri Hanuman Chalisa, Chaupai 38',
    },
    content: [
      {
        heading: '1. Composition in the Crucible of Faith',
        body: 'Composed by Goswami Tulsidas in Awadhi during his imprisonment in Delhi by Mughal Emperor Akbar, the forty verses (Chaupais) are charged with unconditional devotion and divine protection. It serves as an infallible spiritual armor against psychic fear, illnesses, and malefic astrological planetary influences.',
      },
      {
        heading: '2. Esoteric Powers Encapsulated in the Verses',
        body: 'Each verse possesses specific therapeutic and spiritual potencies:',
        bullets: [
          'Chaupai 17 (Bhima roop dhari asura samhare): Destroys deep-seated fear and obstacles.',
          'Chaupai 24 (Nase rog hare sab peera): Heals chronic ailments through focused repetition.',
          'Chaupai 31 (Ashta siddhi nava nidhi ke data): Grants intellectual clarity, memory, and righteous prosperity.',
          'Chaupai 36 (Sankat kate mite sab peera): Liberates one from recurring mental anxieties.',
        ],
      },
      {
        heading: '3. Ideal Method of Recitation',
        body: 'Recite after a bath wearing clean clothes, ideally on Tuesdays and Saturdays. Light a mustard or sesame oil lamp, offer red flowers or sindoor, and recite with a calm, devoted heart. The vibration creates an instant shield of sacred courage.',
      },
    ],
  },
};

export default function BlogDetailClient() {
  const params = useParams();
  const slug = (params?.slug as string) || 'benefits-of-daily-mantra-meditation';
  const article = ARTICLE_CONTENTS[slug] || ARTICLE_CONTENTS['benefits-of-daily-mantra-meditation'];
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedArticles = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] text-stone-900 dark:text-stone-100 font-sans pb-20">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center space-x-2 text-xs text-stone-500 dark:text-stone-400">
          <Link href="/" className="hover:text-amber-600 transition">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-amber-600 transition">
            Blog
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-stone-800 dark:text-stone-200 truncate max-w-xs sm:max-w-md">
            {article.title}
          </span>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm">
          
          {/* Hero Banner Image */}
          <div className="w-full h-64 sm:h-80 md:h-96 relative bg-stone-100 dark:bg-stone-800">
            <Image
              src={article.img}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs font-semibold">
              {article.category}
            </span>
          </div>

          {/* Article Header & Metadata */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight">
                {article.title}
              </h1>

              {/* Author & Publication Details */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 font-serif pt-1 border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-center">
                    ST
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 dark:text-stone-200">
                      {article.author}
                    </span>
                    <span className="text-[11px] text-stone-400 block">Founder &amp; Editor-in-Chief</span>
                  </div>
                </div>

                <span>•</span>

                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </div>

                <span>•</span>

                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </div>

                <div className="ml-auto flex items-center space-x-2">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-amber-500 text-stone-600 dark:text-stone-300 hover:text-amber-600 transition text-xs"
                    title="Copy article link"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Shloka Highlight Box if present */}
            {article.shloka && (
              <div className="p-6 rounded-2xl bg-amber-500/10 border-l-4 border-amber-600 dark:bg-amber-950/20 dark:border-amber-500 space-y-3">
                <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>प्रमाण श्लोक • Sacred Shastric Citation</span>
                </div>
                <p className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-amber-100">
                  {article.shloka.sanskrit}
                </p>
                <p className="font-serif italic text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  {article.shloka.transliteration}
                </p>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-serif pt-1 border-t border-amber-200/50 dark:border-stone-800">
                  <strong>Meaning:</strong> {article.shloka.translation}
                </p>
                <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
                  Source: {article.shloka.source}
                </p>
              </div>
            )}

            {/* Article Content Sections */}
            <div className="space-y-8 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-serif pt-2">
              {article.content.map((sec, idx) => (
                <section key={idx} className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    {sec.heading}
                  </h2>
                  <p>{sec.body}</p>
                  {sec.bullets && (
                    <ul className="list-disc pl-5 space-y-2 pt-1 font-sans text-xs sm:text-sm">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Comprehensive Author Bio Box for AdSense Transparency */}
            <div className="mt-12 p-6 rounded-3xl bg-amber-50/70 dark:bg-stone-800/80 border border-amber-200/80 dark:border-stone-700 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-600 text-white font-serif font-bold text-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                ST
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    {article.author}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-semibold w-fit mx-auto sm:mx-0">
                    Founder &amp; Editor-in-Chief
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {article.authorBio}
                </p>
                <div className="pt-1 flex items-center justify-center sm:justify-start space-x-3 text-xs text-amber-700 dark:text-amber-400 font-semibold">
                  <Link href="/about" className="hover:underline">
                    About Founder
                  </Link>
                  <span>•</span>
                  <Link href="/contact" className="hover:underline">
                    Contact Editor
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Articles */}
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Related Spiritual Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm hover:shadow-md transition space-y-2 group"
              >
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  {rel.category}
                </span>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-[11px] text-stone-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{rel.readTime}</span>
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to Blog Button */}
        <div className="text-center pt-4">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl border border-amber-300 dark:border-stone-700 font-bold text-xs text-stone-800 dark:text-stone-200 hover:bg-amber-50 dark:hover:bg-stone-800 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>

      </article>

    </div>
  );
}
