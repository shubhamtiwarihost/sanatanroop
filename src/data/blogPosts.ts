export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  category: string;
  readTime: string;
  img: string;
  featured: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'benefits-of-daily-mantra-meditation',
    title: 'The Science of Mantra Chanting: How Vedic Vibrations Influence Consciousness',
    excerpt:
      'Explore the neuro-acoustic and spiritual mechanisms of Sanskrit mantras, including Gayatri and Maha Mrityunjaya, as expounded in the Upanishads and modern neurobiology.',
    author: 'Shubham Tiwari',
    authorRole: 'Founder & Editor-in-Chief',
    date: '15 September 2026',
    category: 'Mantras & Sadhana',
    readTime: '8 min read',
    img: '/images/article_meditation.jpg',
    featured: true,
  },
  {
    id: 'b2',
    slug: 'significance-of-ekadashi-vrat',
    title: 'Ekadashi Vrat: Shastric Rules, Spiritual Significance, and Health Benefits',
    excerpt:
      'A comprehensive guide to the eleventh tithi of each lunar fortnight, its alignment with lunar cycles, physiological detoxification, and deep spiritual merits.',
    author: 'Shubham Tiwari',
    authorRole: 'Founder & Editor-in-Chief',
    date: '12 September 2026',
    category: 'Vrat & Festivals',
    readTime: '10 min read',
    img: '/images/article_ekadashi.jpg',
    featured: false,
  },
  {
    id: 'b3',
    slug: 'life-lessons-from-bhagavad-gita',
    title: 'Bhagavad Gita for Modern Living: 7 Timeless Principles from Kurukshetra',
    excerpt:
      'How Lord Krishna’s teachings on Nishkama Karma (selfless action), mental discipline, and detached devotion provide solace in the complexities of modern corporate and family life.',
    author: 'Shubham Tiwari',
    authorRole: 'Founder & Editor-in-Chief',
    date: '08 September 2026',
    category: 'Vedic Philosophy',
    readTime: '12 min read',
    img: '/images/article_gita_lessons.jpg',
    featured: true,
  },
  {
    id: 'b4',
    slug: 'four-purusharthas',
    title: 'The Four Purusharthas: Balancing Dharma, Artha, Kama, and Moksha',
    excerpt:
      'An authentic analysis of the holistic Vedic framework for human life, balancing righteous wealth and legitimate desires while remaining anchored in spiritual liberation.',
    author: 'Shubham Tiwari',
    authorRole: 'Founder & Editor-in-Chief',
    date: '05 September 2026',
    category: 'Vedic Philosophy',
    readTime: '9 min read',
    img: '/images/article_meditation.jpg',
    featured: false,
  },
  {
    id: 'b5',
    slug: 'ganesha-chaturthi-significance',
    title: 'Lord Ganesha: Esoteric Symbolism, Modaka Tattva, and Spiritual Awakening',
    excerpt:
      'Decoding the profound symbolism of Lord Vighnaharta—from the elephant head representing macrocosmic intellect to the single tusk of non-duality (Advaita).',
    author: 'Shubham Tiwari',
    authorRole: 'Founder & Editor-in-Chief',
    date: '02 September 2026',
    category: 'Vrat & Festivals',
    readTime: '7 min read',
    img: '/images/category_idols.jpg',
    featured: false,
  },
  {
    id: 'b6',
    slug: 'sharad-navratri-vidhi',
    title: 'Navratri & The Nine Forms of Maa Durga: Philosophy and Sadhana Vidhi',
    excerpt:
      'Step-by-step guidance on Navratri Ghatasthapana, daily puja protocols for Shailaputri through Siddhidatri, and the deeper allegorical conquest of the inner demons.',
    author: 'Shubham Tiwari',
    authorRole: 'Founder & Editor-in-Chief',
    date: '30 August 2026',
    category: 'Vrat & Festivals',
    readTime: '14 min read',
    img: '/images/category_puja.jpg',
    featured: false,
  },
  {
    id: 'b7',
    slug: 'rudraksha-spiritual-benefits',
    title: 'The Mystical Power of Rudraksha: Types, Shastric Benefits, and Wearing Rules',
    excerpt:
      'What the Shiva Purana and Padma Purana reveal about Rudraksha beads, their electromagnetic properties, Mukhi classifications, and proper consecration (Prana Pratishtha).',
    author: 'Shubham Tiwari',
    authorRole: 'Founder & Editor-in-Chief',
    date: '26 August 2026',
    category: 'Daily Lifestyle',
    readTime: '8 min read',
    img: '/images/category_rudraksha.jpg',
    featured: false,
  },
  {
    id: 'b8',
    slug: 'daily-sandhyavandanam-guide',
    title: 'Daily Sandhyavandanam & Vedic Puja: Practical Guide for the Modern Household',
    excerpt:
      'Why the transition points of day and night hold supreme energetic potency, and how anyone can practice daily Gayatri japa, Achamana, and Pranayama at home.',
    author: 'Shubham Tiwari',
    authorRole: 'Founder & Editor-in-Chief',
    date: '22 August 2026',
    category: 'Daily Lifestyle',
    readTime: '11 min read',
    img: '/images/category_puja.jpg',
    featured: false,
  },
  {
    id: 'b9',
    slug: 'hanuman-chalisa-spiritual-power',
    title: 'Hanuman Chalisa: Verse-by-Verse Spiritual Science and Daily Sadhana',
    excerpt:
      'Goswami Tulsidas’s 40 chaupais examined as an esoteric map of spiritual devotion, dispelling fear, granting intellectual prowess, and invoking Ashta Siddhi.',
    author: 'Shubham Tiwari',
    authorRole: 'Founder & Editor-in-Chief',
    date: '18 August 2026',
    category: 'Mantras & Sadhana',
    readTime: '9 min read',
    img: '/images/article_gita_lessons.jpg',
    featured: false,
  },
];
