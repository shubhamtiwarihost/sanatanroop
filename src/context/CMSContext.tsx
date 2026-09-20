'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CMSAartiItem,
  CMSKathaChapter,
  CMSKathaItem,
  CMSBookItem,
  CMSShlokaItem,
  DEFAULT_CMS_AARTIS,
  DEFAULT_CMS_KATHAS,
  DEFAULT_CMS_BOOKS,
  DEFAULT_CMS_SHLOKAS,
} from '@/data/cmsDefaults';

export type { CMSAartiItem, CMSKathaChapter, CMSKathaItem, CMSBookItem, CMSShlokaItem };
export { DEFAULT_CMS_AARTIS, DEFAULT_CMS_KATHAS, DEFAULT_CMS_BOOKS, DEFAULT_CMS_SHLOKAS };

// ==========================================
// 1. INTERFACES & TYPES
// ==========================================

export interface PageBlock {
  id: string;
  type:
    | 'announcement'
    | 'hero'
    | 'quick_categories'
    | 'panchang_gita'
    | 'shop_categories'
    | 'featured_products'
    | 'articles_mantras'
    | 'festivals'
    | 'videos'
    | 'community'
    | 'newsletter';
  title: string;
  enabled: boolean;
  order: number;
  data: Record<string, any>;
}

export interface CMSMenuItem {
  id: string;
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface CMSMantraItem {
  id: string;
  name: string;
  sanskrit: string;
  transliteration: string;
  hindiMeaning: string;
  englishMeaning: string;
  deity: string;
  category: string;
  benefits: string;
  chantCount: number;
  bestTime: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  audioUrl?: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  playCount: number;
}

export interface CMSProductItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  salePrice?: number;
  stock: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  category: string;
  image: string;
  shortDescription: string;
  status: 'Published' | 'Draft' | 'Archived';
}

export interface CMSArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  readingTime: string;
  image: string;
  publishedDate: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  views: number;
}

export interface CMSOrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: string;
  total: number;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  fulfillmentStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
}

export interface CMSCommentItem {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  entityTitle: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Spam';
}

export interface CMSPanchangConfig {
  autoUpdate: boolean;
  defaultCity: string;
  tithiOverride?: string;
  nakshatraOverride?: string;
  yogaOverride?: string;
  karanaOverride?: string;
  sunriseOverride?: string;
  sunsetOverride?: string;
  specialMessage?: string;
  festivalBanner?: string;
  lastUpdated?: string;
}

export interface DivineVibrationTrack {
  id: string;
  title: string;
  sanskritTitle: string;
  frequency: string;
  category: string;
  duration: string;
  benefits: string;
  sanskritVerse: string;
  verseMeaning: string;
  audioUrl: string;
  icon: string;
  enabled: boolean;
}

export interface DivineVibrationsConfig {
  pageTitle: string;
  pageSubtitle: string;
  sanskritMotto: string;
  introText: string;
  heroBannerImg?: string;
  tracks: DivineVibrationTrack[];
  lastUpdated?: string;
}

export interface CMSContextType {
  // Page Builder Blocks
  blocks: PageBlock[];
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  toggleBlock: (id: string) => void;
  updateBlockData: (id: string, data: Record<string, any>) => void;
  duplicateBlock: (id: string) => void;
  deleteBlock: (id: string) => void;
  addBlock: (type: PageBlock['type'], title: string) => void;

  // Header & Menu
  headerMenu: CMSMenuItem[];
  addMenuItem: (item: Omit<CMSMenuItem, 'id'>) => void;
  removeMenuItem: (id: string) => void;
  updateMenuItem: (id: string, item: Partial<CMSMenuItem>) => void;

  // Header & Footer settings
  siteIdentity: {
    brandName: string;
    tagline: string;
    announcementText: string;
    announcementLink: string;
    announcementActive: boolean;
    contactPhone: string;
    contactEmail: string;
    varanasiAddress: string;
    copyrightText: string;
  };
  updateSiteIdentity: (data: Partial<CMSContextType['siteIdentity']>) => void;

  // Mantras
  mantras: CMSMantraItem[];
  addMantra: (mantra: Omit<CMSMantraItem, 'id' | 'playCount'>) => void;
  updateMantra: (id: string, mantra: Partial<CMSMantraItem>) => void;
  deleteMantra: (id: string) => void;

  // Products
  products: CMSProductItem[];
  addProduct: (product: Omit<CMSProductItem, 'id'>) => void;
  updateProduct: (id: string, product: Partial<CMSProductItem>) => void;
  deleteProduct: (id: string) => void;

  // Articles
  articles: CMSArticleItem[];
  addArticle: (article: Omit<CMSArticleItem, 'id' | 'views'>) => void;
  updateArticle: (id: string, article: Partial<CMSArticleItem>) => void;
  deleteArticle: (id: string) => void;

  // Orders
  orders: CMSOrderItem[];
  addOrder: (order: Partial<CMSOrderItem> & { customerName: string; total: number }) => void;
  updateOrderStatus: (id: string, fulfillmentStatus: CMSOrderItem['fulfillmentStatus']) => void;

  // Comments
  comments: CMSCommentItem[];
  approveComment: (id: string) => void;
  spamComment: (id: string) => void;
  deleteComment: (id: string) => void;

  // Panchang Settings
  panchangConfig: CMSPanchangConfig;
  updatePanchangConfig: (data: Partial<CMSPanchangConfig>) => void;

  // Theme & Appearance
  themeSettings: {
    primaryColor: string;
    accentColor: string;
    fontFamily: string;
    borderRadius: string;
  };
  updateThemeSettings: (data: Partial<CMSContextType['themeSettings']>) => void;

  // Divine Vibrations
  divineVibrations: DivineVibrationsConfig;
  updateDivineVibrations: (data: Partial<DivineVibrationsConfig>) => void;
  updateVibrationTrack: (id: string, track: Partial<DivineVibrationTrack>) => void;
  addVibrationTrack: (track: Omit<DivineVibrationTrack, 'id'>) => void;
  deleteVibrationTrack: (id: string) => void;

  // Aartis
  aartis: CMSAartiItem[];
  addAarti: (aarti: Omit<CMSAartiItem, 'id'>) => void;
  updateAarti: (id: string, aarti: Partial<CMSAartiItem>) => void;
  deleteAarti: (id: string) => void;

  // Kathas
  kathas: CMSKathaItem[];
  addKatha: (katha: Omit<CMSKathaItem, 'id'>) => void;
  updateKatha: (id: string, katha: Partial<CMSKathaItem>) => void;
  deleteKatha: (id: string) => void;

  // Spiritual Books
  books: CMSBookItem[];
  addBook: (book: Omit<CMSBookItem, 'id'>) => void;
  updateBook: (id: string, book: Partial<CMSBookItem>) => void;
  deleteBook: (id: string) => void;

  // Shlokas
  shlokas: CMSShlokaItem[];
  addShloka: (shloka: Omit<CMSShlokaItem, 'id'>) => void;
  updateShloka: (id: string, shloka: Partial<CMSShlokaItem>) => void;
  deleteShloka: (id: string) => void;

  // Reset to default
  resetToDefaults: () => void;
}

// ==========================================
// 2. INITIAL DEFAULT DATA
// ==========================================

const DEFAULT_BLOCKS: PageBlock[] = [
  {
    id: 'block-announcement',
    type: 'announcement',
    title: 'Announcement Bar',
    enabled: false,
    order: 0,
    data: {
      text: '',
      link: '',
    },
  },
  {
    id: 'block-hero',
    type: 'hero',
    title: 'Hero Section',
    enabled: true,
    order: 1,
    data: {
      heading: 'SanatanRoop',
      subtitle: 'Sanatan Gyan, Har Ghar Tak',
      sanskritVerse: 'ॐ नमः शिवाय',
      descriptionEn:
        'There is no Dharma higher than Truth. Experience the eternal wisdom of Vedic scriptures, sacred mantras, and rituals.',
      descriptionHi:
        'सत्य से बड़ा कोई धर्म नहीं। वेदों, उपनिषदों, मन्त्रों एवं पावन अनुष्ठानों की सनातन धारा से अपने जीवन को आलोकित करें।',
      btn1Text: 'Explore Scriptures',
      btn1Url: '/scriptures/bhagavad-gita',
      btn2Text: 'Daily Panchang',
      btn2Url: '/calendar',
      bgImage: '/images/hero_shiva.jpg',
      stat1Number: '1,000+',
      stat1Label: 'Sacred Mantras',
      stat2Number: '500+',
      stat2Label: 'Vedic Articles',
      stat3Number: '50,000+',
      stat3Label: 'Devotee Community',
      stat4Number: '108+',
      stat4Label: 'Puja Vidhis',
    },
  },
  {
    id: 'block-quick-categories',
    type: 'quick_categories',
    title: 'Feature Navigation Tiles (6 Tiles)',
    enabled: true,
    order: 2,
    data: {},
  },
  {
    id: 'block-panchang-gita',
    type: 'panchang_gita',
    title: 'Daily Panchang & Shrimad Bhagavad Gita',
    enabled: true,
    order: 3,
    data: {
      gitaVerseNumber: '2.47',
      gitaSanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
      gitaMeaningHi:
        'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्मफल के आकांक्षी मत बनो और न ही कर्म त्यागने में तुम्हारी आसक्ति हो।',
    },
  },
  {
    id: 'block-shop-categories',
    type: 'shop_categories',
    title: 'Shop by Category (7 Item Ribbon)',
    enabled: true,
    order: 4,
    data: {
      title: 'Shop by Category',
      subtitle: 'Authentic handcrafted puja items, energized rudraksha, and sacred literature',
    },
  },
  {
    id: 'block-featured-products',
    type: 'featured_products',
    title: 'Featured Spiritual Products',
    enabled: true,
    order: 5,
    data: {
      title: 'Sacred Store Highlights',
    },
  },
  {
    id: 'block-articles-mantras',
    type: 'articles_mantras',
    title: 'Latest Articles & Popular Chanting Mantras',
    enabled: true,
    order: 6,
    data: {
      articlesTitle: 'Latest Spiritual Articles',
      mantrasTitle: 'Popular Mantras for Daily Japa',
    },
  },
  {
    id: 'block-newsletter',
    type: 'newsletter',
    title: 'Sacred Community Newsletter',
    enabled: true,
    order: 7,
    data: {
      title: 'सनातन ज्ञान से जुड़ें',
      subtitle: 'Get daily auspicious Panchang, festival alerts, and deep Vedic insights directly to your inbox.',
    },
  },
];

const DEFAULT_MENU_ITEMS: CMSMenuItem[] = [
  { id: 'menu-1', label: 'Home', url: '/' },
  { id: 'menu-2', label: 'Slokas', url: '/shlokas' },
  { id: 'menu-3', label: 'Aartis', url: '/aartis' },
  { id: 'menu-4', label: 'Kathas', url: '/kathas' },
  { id: 'menu-5', label: 'Spiritual Books', url: '/books' },
  { id: 'menu-6', label: 'Divine Vibrations', url: '/divine-vibrations' },
  { id: 'menu-7', label: 'Articles', url: '/articles' },
  { id: 'menu-9', label: 'Videos', url: '/videos' },
  { id: 'menu-10', label: 'Community', url: '/community' },
];

const DEFAULT_MANTRAS: CMSMantraItem[] = [
  {
    id: 'm-1',
    name: 'Maha Mrityunjaya Mantra',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥',
    transliteration: 'oṁ tryambakaṁ yajāmahe sugandhiṁ puṣṭi-vardhanam | urvārukam-iva bandhanān mṛtyor-mukṣīya māmṛtāt ||',
    hindiMeaning: 'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं जो प्रत्येक श्वास में सुगंध एवं पुष्टि का पोषण करते हैं।',
    englishMeaning: 'We worship the Three-Eyed Lord Shiva who nourishes all beings. May He liberate us from death for the sake of immortality.',
    deity: 'Lord Shiva',
    category: 'Healing & Protection',
    benefits: 'Overcomes severe ailments, dispels fear of untimely demise, and bestows inner peace.',
    chantCount: 108,
    bestTime: 'Brahma Muhurat (4:30 AM - 6:00 AM)',
    difficulty: 'Medium',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=tibetan-chanting-105232.mp3',
    status: 'Published',
    playCount: 14200,
  },
  {
    id: 'm-2',
    name: 'Gayatri Mantra',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    transliteration: 'oṁ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṁ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt ||',
    hindiMeaning: 'हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा का ध्यान करते हैं।',
    englishMeaning: 'May the brilliant divine light of the Creator illuminate our intellect and dispel all darkness.',
    deity: 'Surya / Gayatri Devi',
    category: 'Wisdom & Enlightenment',
    benefits: 'Sharpens memory, cultivates profound mental focus, and cleanses the subtle prana.',
    chantCount: 108,
    bestTime: 'Pratah Sandhya & Madhyahna',
    difficulty: 'Easy',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=meditation-bell-chant-110077.mp3',
    status: 'Published',
    playCount: 28400,
  },
  {
    id: 'm-3',
    name: 'Shiva Tandava Stotram',
    sanskrit: 'जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ॥',
    transliteration: 'jaṭā-ṭavī-galaj-jala-pravāha-pāvita-sthale gale avalambya lambitāṁ bhujaṅga-tuṅga-mālikām ||',
    hindiMeaning: 'जिनके जटा रूपी वन से बहने वाली गंगा की तरंगों से पवित्र गले में सर्पों की विशाल माला सुशोभित है।',
    englishMeaning: 'Whose throat is purified by the torrent of the holy Ganga flowing from the forest of his matted hair.',
    deity: 'Lord Shiva',
    category: 'Strength & Bhakti',
    benefits: 'Eliminates ego, bestows supreme courage, and fills the consciousness with cosmic energy.',
    chantCount: 1,
    bestTime: 'Pradosham Kaal (Evening Twilight)',
    difficulty: 'Advanced',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=meditation-bell-chant-110077.mp3',
    status: 'Published',
    playCount: 9850,
  },
];

const DEFAULT_PRODUCTS: CMSProductItem[] = [
  {
    id: 'prod-1',
    name: 'Authentic 5-Mukhi Indonesian Rudraksha Mala (108 Beads)',
    sku: 'RUD-IND-108',
    price: 899,
    salePrice: 699,
    stock: 45,
    stockStatus: 'In Stock',
    category: 'Rudraksha',
    image: '/images/category_rudraksha.jpg',
    shortDescription: 'Natural 5 Mukhi Indonesian Rudraksha beads strung in pure yellow silk thread with certificate of authenticity.',
    status: 'Published',
  },
  {
    id: 'prod-2',
    name: 'Handcrafted Brass Ganesha Idol (7-Inch)',
    sku: 'IDL-GAN-BR7',
    price: 2499,
    salePrice: 1999,
    stock: 12,
    stockStatus: 'In Stock',
    category: 'Idols & Statues',
    image: '/images/category_idols.jpg',
    shortDescription: 'Solid brass hand-carved Vighnaharta Ganesha idol with ornate antique polish by traditional Kashi artisans.',
    status: 'Published',
  },
  {
    id: 'prod-3',
    name: 'Shrimad Bhagavad Gita (Hardcover Deluxe Edition)',
    sku: 'BK-GITA-DLX',
    price: 599,
    salePrice: 499,
    stock: 120,
    stockStatus: 'In Stock',
    category: 'Spiritual Books',
    image: '/images/category_books.jpg',
    shortDescription: 'Complete 700 verses with original Sanskrit, Devanagari, English transliteration, and exhaustive Hindi/English commentary.',
    status: 'Published',
  },
  {
    id: 'prod-4',
    name: 'Pure Sandalwood Puja Incense Sticks (Pack of 6)',
    sku: 'INC-SND-06',
    price: 349,
    salePrice: 299,
    stock: 4,
    stockStatus: 'Low Stock',
    category: 'Agarbatti & Dhoop',
    image: '/images/category_agarbatti.jpg',
    shortDescription: 'Charcoal-free pure sandalwood and camphor dhoop sticks for divine temple aroma during daily puja.',
    status: 'Published',
  },
];

const DEFAULT_ARTICLES: CMSArticleItem[] = [
  {
    id: 'art-1',
    title: 'Meditation: The Path to Inner Peace',
    slug: 'benefits-of-daily-mantra-meditation',
    excerpt: 'Discover the ancient Vedic science of dhyana, breathing pranayama, and how sacred vibrations calm the wandering mind.',
    author: 'Acharya Vidyadhar',
    category: 'Meditation',
    readingTime: '6 min read',
    image: '/images/article_meditation.jpg',
    publishedDate: '12 Sep 2026',
    status: 'Published',
    views: 12450,
  },
  {
    id: 'art-2',
    title: 'Significance of Ekadashi Vrat & Fasting Rules',
    slug: 'significance-of-ekadashi-vrat',
    excerpt: 'Scientific and shastric breakdown of why Ekadashi fasting cleanses the bodily doshas and awakens sattvic consciousness.',
    author: 'Pandit Rameshwar Jha',
    category: 'Rituals',
    readingTime: '8 min read',
    image: '/images/article_ekadashi.jpg',
    publishedDate: '10 Sep 2026',
    status: 'Published',
    views: 9842,
  },
  {
    id: 'art-3',
    title: 'Life Lessons from Bhagavad Gita for Modern Stress',
    slug: 'life-lessons-from-bhagavad-gita',
    excerpt: 'Practical wisdom from Chapter 2 and 4 on detachment, mindful duty, and navigating modern workplace burnout.',
    author: 'Dr. Meenakshi Sundaram',
    category: 'Philosophy',
    readingTime: '10 min read',
    image: '/images/article_gita_lessons.jpg',
    publishedDate: '08 Sep 2026',
    status: 'Published',
    views: 8672,
  },
];

const DEFAULT_ORDERS: CMSOrderItem[] = [
  {
    id: 'ord-1',
    orderNumber: 'HD8921',
    customerName: 'Aarti Sharma',
    customerEmail: 'aarti@example.com',
    items: 'Rudraksha Mala (108 Beads)',
    total: 1299,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Processing',
    date: '13 Sep 2026',
  },
  {
    id: 'ord-2',
    orderNumber: 'HD8920',
    customerName: 'Rahul Verma',
    customerEmail: 'rahul@example.com',
    items: 'Brass Pooja Set (Thali, Diya, Bell)',
    total: 799,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Processing',
    date: '13 Sep 2026',
  },
  {
    id: 'ord-3',
    orderNumber: 'HD8919',
    customerName: 'Devavrata Shastri',
    customerEmail: 'devavrata@example.com',
    items: 'Bhagavad Gita (Hardcover Edition)',
    total: 399,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Delivered',
    date: '12 Sep 2026',
  },
  {
    id: 'ord-4',
    orderNumber: 'HD8918',
    customerName: 'Meera Joshi',
    customerEmail: 'meera@example.com',
    items: 'Sandalwood Incense (Pack of 6)',
    total: 299,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Delivered',
    date: '12 Sep 2026',
  },
  {
    id: 'ord-5',
    orderNumber: 'HD8917',
    customerName: 'Vikram Singh',
    customerEmail: 'vikram@example.com',
    items: 'Shiva Statue (9 Inch Brass)',
    total: 1499,
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Processing',
    date: '12 Sep 2026',
  },
];

const DEFAULT_COMMENTS: CMSCommentItem[] = [
  {
    id: 'comm-1',
    author: 'Amit Sharma',
    content: 'Very powerful article. Chanting Om at dawn has noticeably alleviated my daily work stress. 🙏',
    entityTitle: 'The Path to Inner Peace',
    date: '2 hours ago',
    status: 'Approved',
  },
  {
    id: 'comm-2',
    author: 'Neha Verma',
    content: 'Such divine knowledge! Clear explanation on the parana timing for Ekadashi vrat.',
    entityTitle: 'Significance of Ekadashi Vrat',
    date: '4 hours ago',
    status: 'Approved',
  },
  {
    id: 'comm-3',
    author: 'Rohit Gupta',
    content: 'Beautiful explanation of the word-by-word meaning. Gratitude to the scholars.',
    entityTitle: 'Shri Hanuman Chalisa',
    date: '6 hours ago',
    status: 'Approved',
  },
];

const DEFAULT_VIBRATION_TRACKS: DivineVibrationTrack[] = [
  {
    id: 'vib-1',
    title: 'Cosmic Om Resonator (136.1 Hz)',
    sanskritTitle: 'ॐ प्रणव नाद ब्रह्म',
    frequency: '136.1 Hz',
    category: 'Cosmic Om',
    duration: '21:00',
    benefits: 'Calms the nervous system, harmonizes heart rhythm, connects with universal vibration',
    sanskritVerse: 'ओमित्येकाक्षरं ब्रह्म व्याहरन् मामनुस्मरन् । यः प्रयाति त्यजन्देहं स याति परमां गतिम् ॥',
    verseMeaning: 'Uttering the sacred syllable Om and meditating upon the Supreme Reality leads to liberation.',
    audioUrl: '/audio/om-chant.mp3',
    icon: 'ॐ',
    enabled: true,
  },
  {
    id: 'vib-2',
    title: 'Gayatri Mahamantra Solfeggio (432 Hz)',
    sanskritTitle: 'गायत्री महामन्त्र प्राण स्पन्दन',
    frequency: '432 Hz',
    category: 'Vedic Chants',
    duration: '15:00',
    benefits: 'Clears mental fog, stimulates solar intellect, enhances cellular regeneration',
    sanskritVerse: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    verseMeaning: 'We meditate on the supreme radiant effulgence of the divine Creator. May it awaken our intellect.',
    audioUrl: '/audio/om-chant.mp3',
    icon: '☀️',
    enabled: true,
  },
  {
    id: 'vib-3',
    title: 'Mahamrityunjaya Shiva Resonance (528 Hz)',
    sanskritTitle: 'महामृत्युंजय मन्त्र अमृत धारा',
    frequency: '528 Hz',
    category: 'Healing & Vitality',
    duration: '18:00',
    benefits: 'Miracle healing frequency, releases deep-seated fear and emotional blockages',
    sanskritVerse: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥',
    verseMeaning: 'We worship the fragrant three-eyed Lord who nourishes all beings. May we be liberated from mortality.',
    audioUrl: '/audio/om-chant.mp3',
    icon: '🔱',
    enabled: true,
  },
  {
    id: 'vib-4',
    title: 'Sacred Shankha & Varanasi Temple Bells',
    sanskritTitle: 'शंखनाद एवं काशी मन्दिर घण्टा ध्वनि',
    frequency: 'Harmonic Spectrum',
    category: 'Temple Acoustics',
    duration: '12:00',
    benefits: 'Disperses negative energies, purifies household space, elevates devotional mood',
    sanskritVerse: 'आगमार्थं तु देवानां गमनार्थं तु रक्षसाम् । कुर्याद् घण्टारवं तत्र देवताह्वानलक्षणम् ॥',
    verseMeaning: 'The sacred sound of the temple bell invites the deities and dispels negative forces.',
    audioUrl: '/audio/om-chant.mp3',
    icon: '🔔',
    enabled: true,
  },
  {
    id: 'vib-5',
    title: 'Sahasrara Crown Chakra Solfeggio (963 Hz)',
    sanskritTitle: 'सहस्रार चक्र दिव्य ज्योति नाद',
    frequency: '963 Hz',
    category: 'Chakra Awakening',
    duration: '24:00',
    benefits: 'Direct connection to divine spiritual awareness, deep transcendent meditative absorption',
    sanskritVerse: 'सहस्रारे महापद्मे चन्द्रमण्डलसंस्थितम् । परात्परतरं ब्रह्म ध्यायेच्चित्तं स्थिरं कुरु ॥',
    verseMeaning: 'Meditate in the thousand-petaled lotus on the supreme Brahman to establish unwavering silence.',
    audioUrl: '/audio/om-chant.mp3',
    icon: '🌸',
    enabled: true,
  },
];

const DEFAULT_DIVINE_VIBRATIONS: DivineVibrationsConfig = {
  pageTitle: 'Divine Vibrations & Sacred Vedic Resonances',
  pageSubtitle: 'नादब्रह्म: ब्रह्माण्डीय ध्वनि तरंगें, 432Hz ओंकार एवं वैदिक स्वर साधना',
  sanskritMotto: 'नादरूपः स्मृतो ब्रह्मा नादरूपो जनार्दनः । नादरूपा पराशक्तिर्नादरूपो महेश्वरः ॥',
  introText: 'Sound (Naad) is the fundamental fabric of existence in Vedic cosmology. From the primordial resonance of Om emerged space, elements, and consciousness. Immerse your spirit in these authentic sacred frequencies designed to balance your bio-energetic chakras and cultivate profound inner stillness.',
  heroBannerImg: '/images/hero_shiva.jpg',
  tracks: DEFAULT_VIBRATION_TRACKS,
  lastUpdated: '2026-09-13T12:00:00.000Z',
};

// ==========================================
// 3. CONTEXT & PROVIDER
// ==========================================

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [blocks, setBlocks] = useState<PageBlock[]>(DEFAULT_BLOCKS);
  const [headerMenu, setHeaderMenu] = useState<CMSMenuItem[]>(DEFAULT_MENU_ITEMS);
  const [siteIdentity, setSiteIdentity] = useState({
    brandName: 'SanatanRoop',
    tagline: 'Sanatan Gyan, Har Ghar Tak',
    announcementText: '',
    announcementLink: '',
    announcementActive: false,
    contactPhone: '',
    contactEmail: 'contact@sanatanroop.com',
    varanasiAddress: '',
    copyrightText: '© 2026 SanatanRoop. All rights reserved. Sanatan Gyan, Har Ghar Tak.',
  });

  const [mantras, setMantras] = useState<CMSMantraItem[]>(DEFAULT_MANTRAS);
  const [aartis, setAartis] = useState<CMSAartiItem[]>(DEFAULT_CMS_AARTIS);
  const [kathas, setKathas] = useState<CMSKathaItem[]>(DEFAULT_CMS_KATHAS);
  const [books, setBooks] = useState<CMSBookItem[]>(DEFAULT_CMS_BOOKS);
  const [shlokas, setShlokas] = useState<CMSShlokaItem[]>(DEFAULT_CMS_SHLOKAS);
  const [products, setProducts] = useState<CMSProductItem[]>(DEFAULT_PRODUCTS);
  const [articles, setArticles] = useState<CMSArticleItem[]>(DEFAULT_ARTICLES);
  const [orders, setOrders] = useState<CMSOrderItem[]>(DEFAULT_ORDERS);
  const [comments, setComments] = useState<CMSCommentItem[]>(DEFAULT_COMMENTS);
  const [panchangConfig, setPanchangConfig] = useState<CMSPanchangConfig>({
    autoUpdate: true,
    defaultCity: 'Varanasi',
    specialMessage: 'आज का पावन दिन: शुभ मुहूर्त में जप एवं स्वाध्याय करें।',
    festivalBanner: '',
    lastUpdated: new Date().toISOString(),
  });
  const [divineVibrations, setDivineVibrations] = useState<DivineVibrationsConfig>(DEFAULT_DIVINE_VIBRATIONS);
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#ea580c',
    accentColor: '#f59e0b',
    fontFamily: 'serif',
    borderRadius: '1rem',
  });

  // Load from LocalStorage once on mount
  useEffect(() => {
    try {
      const savedBlocks = localStorage.getItem('hindu_dharma_cms_blocks');
      if (savedBlocks) setBlocks(JSON.parse(savedBlocks));

      const savedMenu = localStorage.getItem('hindu_dharma_cms_menu');
      if (savedMenu) setHeaderMenu(JSON.parse(savedMenu));

      const savedIdentity = localStorage.getItem('hindu_dharma_cms_identity');
      if (savedIdentity) {
        const parsed = JSON.parse(savedIdentity);
        if (parsed.announcementText && parsed.announcementText.includes('SHUBH25')) {
          parsed.announcementText = '';
          parsed.announcementActive = false;
          localStorage.setItem('hindu_dharma_cms_identity', JSON.stringify(parsed));
        }
        setSiteIdentity(parsed);
      }

      const savedMantras = localStorage.getItem('hindu_dharma_cms_mantras');
      if (savedMantras) setMantras(JSON.parse(savedMantras));

      const savedAartis = localStorage.getItem('sanatan_cms_aartis');
      if (savedAartis) setAartis(JSON.parse(savedAartis));

      const savedKathas = localStorage.getItem('sanatan_cms_kathas');
      if (savedKathas) setKathas(JSON.parse(savedKathas));

      const savedBooks = localStorage.getItem('sanatan_cms_books');
      if (savedBooks) setBooks(JSON.parse(savedBooks));

      const savedShlokas = localStorage.getItem('sanatan_cms_shlokas');
      if (savedShlokas) setShlokas(JSON.parse(savedShlokas));

      const savedProducts = localStorage.getItem('hindu_dharma_cms_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedArticles = localStorage.getItem('hindu_dharma_cms_articles');
      if (savedArticles) setArticles(JSON.parse(savedArticles));

      const savedOrders = localStorage.getItem('hindu_dharma_cms_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedPanchang = localStorage.getItem('hindu_dharma_cms_panchang');
      if (savedPanchang) setPanchangConfig(JSON.parse(savedPanchang));

      const savedVibrations = localStorage.getItem('hindu_dharma_cms_divine_vibrations');
      if (savedVibrations) setDivineVibrations(JSON.parse(savedVibrations));

      const savedTheme = localStorage.getItem('hindu_dharma_cms_theme');
      if (savedTheme) setThemeSettings(JSON.parse(savedTheme));
    } catch (e) {
      console.warn('Could not load CMS storage', e);
    }
  }, []);

  // Cross-Tab Real-time Synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.newValue) return;
      try {
        if (e.key === 'hindu_dharma_cms_blocks') setBlocks(JSON.parse(e.newValue));
        if (e.key === 'hindu_dharma_cms_panchang') setPanchangConfig(JSON.parse(e.newValue));
        if (e.key === 'hindu_dharma_cms_divine_vibrations') setDivineVibrations(JSON.parse(e.newValue));
        if (e.key === 'hindu_dharma_cms_identity') setSiteIdentity(JSON.parse(e.newValue));
        if (e.key === 'hindu_dharma_cms_mantras') setMantras(JSON.parse(e.newValue));
        if (e.key === 'sanatan_cms_aartis') setAartis(JSON.parse(e.newValue));
        if (e.key === 'sanatan_cms_kathas') setKathas(JSON.parse(e.newValue));
        if (e.key === 'sanatan_cms_books') setBooks(JSON.parse(e.newValue));
        if (e.key === 'sanatan_cms_shlokas') setShlokas(JSON.parse(e.newValue));
        if (e.key === 'hindu_dharma_cms_products') setProducts(JSON.parse(e.newValue));
        if (e.key === 'hindu_dharma_cms_articles') setArticles(JSON.parse(e.newValue));
        if (e.key === 'hindu_dharma_cms_menu') setHeaderMenu(JSON.parse(e.newValue));
        if (e.key === 'hindu_dharma_cms_orders') setOrders(JSON.parse(e.newValue));
      } catch (err) {
        console.warn('Cross-tab sync error', err);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync to LocalStorage
  const saveBlocks = (newBlocks: PageBlock[]) => {
    setBlocks(newBlocks);
    try {
      localStorage.setItem('hindu_dharma_cms_blocks', JSON.stringify(newBlocks));
    } catch (e) {}
  };

  const reorderBlocks = (startIndex: number, endIndex: number) => {
    const next = [...blocks];
    const [removed] = next.splice(startIndex, 1);
    next.splice(endIndex, 0, removed);
    const updated = next.map((b, idx) => ({ ...b, order: idx }));
    saveBlocks(updated);
  };

  const toggleBlock = (id: string) => {
    const updated = blocks.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b));
    saveBlocks(updated);
  };

  const updateBlockData = (id: string, data: Record<string, any>) => {
    const updated = blocks.map((b) => (b.id === id ? { ...b, data: { ...b.data, ...data } } : b));
    saveBlocks(updated);
  };

  const duplicateBlock = (id: string) => {
    const target = blocks.find((b) => b.id === id);
    if (!target) return;
    const cloned: PageBlock = {
      ...target,
      id: `block-${Date.now()}`,
      title: `${target.title} (Copy)`,
      order: blocks.length,
    };
    saveBlocks([...blocks, cloned]);
  };

  const deleteBlock = (id: string) => {
    const updated = blocks.filter((b) => b.id !== id);
    saveBlocks(updated);
  };

  const addBlock = (type: PageBlock['type'], title: string) => {
    const newBlock: PageBlock = {
      id: `block-${Date.now()}`,
      type,
      title,
      enabled: true,
      order: blocks.length,
      data: {},
    };
    saveBlocks([...blocks, newBlock]);
  };

  // Header Menu
  const saveMenu = (newMenu: CMSMenuItem[]) => {
    setHeaderMenu(newMenu);
    try {
      localStorage.setItem('hindu_dharma_cms_menu', JSON.stringify(newMenu));
    } catch (e) {}
  };

  const addMenuItem = (item: Omit<CMSMenuItem, 'id'>) => {
    const updated = [...headerMenu, { ...item, id: `menu-${Date.now()}` }];
    saveMenu(updated);
  };

  const removeMenuItem = (id: string) => {
    const updated = headerMenu.filter((m) => m.id !== id);
    saveMenu(updated);
  };

  const updateMenuItem = (id: string, item: Partial<CMSMenuItem>) => {
    const updated = headerMenu.map((m) => (m.id === id ? { ...m, ...item } : m));
    saveMenu(updated);
  };

  // Site Identity
  const updateSiteIdentity = (data: Partial<CMSContextType['siteIdentity']>) => {
    const updated = { ...siteIdentity, ...data };
    setSiteIdentity(updated);
    try {
      localStorage.setItem('hindu_dharma_cms_identity', JSON.stringify(updated));
    } catch (e) {}
  };

  // Mantras
  const saveMantras = (items: CMSMantraItem[]) => {
    setMantras(items);
    try {
      localStorage.setItem('hindu_dharma_cms_mantras', JSON.stringify(items));
    } catch (e) {}
  };

  const addMantra = (mantra: Omit<CMSMantraItem, 'id' | 'playCount'>) => {
    const newMantra: CMSMantraItem = {
      ...mantra,
      id: `m-${Date.now()}`,
      playCount: 0,
    };
    saveMantras([newMantra, ...mantras]);
  };

  const updateMantra = (id: string, partial: Partial<CMSMantraItem>) => {
    const updated = mantras.map((m) => (m.id === id ? { ...m, ...partial } : m));
    saveMantras(updated);
  };

  const deleteMantra = (id: string) => {
    const updated = mantras.filter((m) => m.id !== id);
    saveMantras(updated);
  };

  // Aartis
  const saveAartis = (items: CMSAartiItem[]) => {
    setAartis(items);
    try {
      localStorage.setItem('sanatan_cms_aartis', JSON.stringify(items));
    } catch (e) {}
  };

  const addAarti = (aarti: Omit<CMSAartiItem, 'id'>) => {
    const newAarti: CMSAartiItem = {
      ...aarti,
      id: `aarti-${Date.now()}`,
    };
    saveAartis([newAarti, ...aartis]);
  };

  const updateAarti = (id: string, partial: Partial<CMSAartiItem>) => {
    const updated = aartis.map((a) => (a.id === id ? { ...a, ...partial } : a));
    saveAartis(updated);
  };

  const deleteAarti = (id: string) => {
    const updated = aartis.filter((a) => a.id !== id);
    saveAartis(updated);
  };

  // Kathas
  const saveKathas = (items: CMSKathaItem[]) => {
    setKathas(items);
    try {
      localStorage.setItem('sanatan_cms_kathas', JSON.stringify(items));
    } catch (e) {}
  };

  const addKatha = (katha: Omit<CMSKathaItem, 'id'>) => {
    const newKatha: CMSKathaItem = {
      ...katha,
      id: `katha-${Date.now()}`,
    };
    saveKathas([newKatha, ...kathas]);
  };

  const updateKatha = (id: string, partial: Partial<CMSKathaItem>) => {
    const updated = kathas.map((k) => (k.id === id ? { ...k, ...partial } : k));
    saveKathas(updated);
  };

  const deleteKatha = (id: string) => {
    const updated = kathas.filter((k) => k.id !== id);
    saveKathas(updated);
  };

  // Spiritual Books
  const saveBooks = (items: CMSBookItem[]) => {
    setBooks(items);
    try {
      localStorage.setItem('sanatan_cms_books', JSON.stringify(items));
    } catch (e) {}
  };

  const addBook = (book: Omit<CMSBookItem, 'id'>) => {
    const newBook: CMSBookItem = {
      ...book,
      id: `book-${Date.now()}`,
    };
    saveBooks([newBook, ...books]);
  };

  const updateBook = (id: string, partial: Partial<CMSBookItem>) => {
    const updated = books.map((b) => (b.id === id ? { ...b, ...partial } : b));
    saveBooks(updated);
  };

  const deleteBook = (id: string) => {
    const updated = books.filter((b) => b.id !== id);
    saveBooks(updated);
  };

  // Shlokas
  const saveShlokas = (items: CMSShlokaItem[]) => {
    setShlokas(items);
    try {
      localStorage.setItem('sanatan_cms_shlokas', JSON.stringify(items));
    } catch (e) {}
  };

  const addShloka = (shloka: Omit<CMSShlokaItem, 'id'>) => {
    const newShloka: CMSShlokaItem = {
      ...shloka,
      id: `shloka-${Date.now()}`,
    };
    saveShlokas([newShloka, ...shlokas]);
  };

  const updateShloka = (id: string, partial: Partial<CMSShlokaItem>) => {
    const updated = shlokas.map((s) => (s.id === id ? { ...s, ...partial } : s));
    saveShlokas(updated);
  };

  const deleteShloka = (id: string) => {
    const updated = shlokas.filter((s) => s.id !== id);
    saveShlokas(updated);
  };

  // Products
  const saveProducts = (items: CMSProductItem[]) => {
    setProducts(items);
    try {
      localStorage.setItem('hindu_dharma_cms_products', JSON.stringify(items));
    } catch (e) {}
  };

  const addProduct = (prod: Omit<CMSProductItem, 'id'>) => {
    const newProd: CMSProductItem = {
      ...prod,
      id: `prod-${Date.now()}`,
    };
    saveProducts([newProd, ...products]);
  };

  const updateProduct = (id: string, partial: Partial<CMSProductItem>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...partial } : p));
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  // Articles
  const saveArticles = (items: CMSArticleItem[]) => {
    setArticles(items);
    try {
      localStorage.setItem('hindu_dharma_cms_articles', JSON.stringify(items));
    } catch (e) {}
  };

  const addArticle = (art: Omit<CMSArticleItem, 'id' | 'views'>) => {
    const newArt: CMSArticleItem = {
      ...art,
      id: `art-${Date.now()}`,
      views: 0,
    };
    saveArticles([newArt, ...articles]);
  };

  const updateArticle = (id: string, partial: Partial<CMSArticleItem>) => {
    const updated = articles.map((a) => (a.id === id ? { ...a, ...partial } : a));
    saveArticles(updated);
  };

  const deleteArticle = (id: string) => {
    const updated = articles.filter((a) => a.id !== id);
    saveArticles(updated);
  };

  // Orders
  const addOrder = (orderData: Partial<CMSOrderItem> & { customerName: string; total: number }) => {
    const newOrder: CMSOrderItem = {
      id: orderData.id || `ord-${Date.now().toString().slice(-6)}`,
      orderNumber: orderData.orderNumber || orderData.id || `SANATAN-${Date.now().toString().slice(-6)}`,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail || 'devotee@sanatan.org',
      items: orderData.items || 'Sacred Devotional Items',
      total: orderData.total,
      paymentStatus: orderData.paymentStatus || 'Paid',
      fulfillmentStatus: orderData.fulfillmentStatus || 'Processing',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem('hindu_dharma_cms_orders', JSON.stringify(updated));
    } catch (e) {}
  };

  const updateOrderStatus = (id: string, fulfillmentStatus: CMSOrderItem['fulfillmentStatus']) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, fulfillmentStatus } : o));
    setOrders(updated);
    try {
      localStorage.setItem('hindu_dharma_cms_orders', JSON.stringify(updated));
    } catch (e) {}
  };

  // Comments
  const approveComment = (id: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, status: 'Approved' } : c)));
  };

  const spamComment = (id: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, status: 'Spam' } : c)));
  };

  const deleteComment = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  // Panchang
  const updatePanchangConfig = (data: Partial<CMSPanchangConfig>) => {
    setPanchangConfig((prev) => {
      const next = { ...prev, ...data, lastUpdated: new Date().toISOString() };
      try {
        localStorage.setItem('hindu_dharma_cms_panchang', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Theme
  const updateThemeSettings = (data: Partial<CMSContextType['themeSettings']>) => {
    const updated = { ...themeSettings, ...data };
    setThemeSettings(updated);
    try {
      localStorage.setItem('hindu_dharma_cms_theme', JSON.stringify(updated));
    } catch (e) {}
  };

  const resetToDefaults = () => {
    try {
      localStorage.clear();
    } catch (e) {}
    setBlocks(DEFAULT_BLOCKS);
    setHeaderMenu(DEFAULT_MENU_ITEMS);
    setMantras(DEFAULT_MANTRAS);
    setAartis(DEFAULT_CMS_AARTIS);
    setKathas(DEFAULT_CMS_KATHAS);
    setBooks(DEFAULT_CMS_BOOKS);
    setShlokas(DEFAULT_CMS_SHLOKAS);
    setProducts(DEFAULT_PRODUCTS);
    setArticles(DEFAULT_ARTICLES);
    setOrders(DEFAULT_ORDERS);
    setDivineVibrations(DEFAULT_DIVINE_VIBRATIONS);
  };

  // Divine Vibrations Handlers
  const updateDivineVibrations = (data: Partial<DivineVibrationsConfig>) => {
    setDivineVibrations((prev) => {
      const next = { ...prev, ...data, lastUpdated: new Date().toISOString() };
      try {
        localStorage.setItem('hindu_dharma_cms_divine_vibrations', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const updateVibrationTrack = (id: string, trackData: Partial<DivineVibrationTrack>) => {
    setDivineVibrations((prev) => {
      const updatedTracks = prev.tracks.map((t) => (t.id === id ? { ...t, ...trackData } : t));
      const next = { ...prev, tracks: updatedTracks, lastUpdated: new Date().toISOString() };
      try {
        localStorage.setItem('hindu_dharma_cms_divine_vibrations', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const addVibrationTrack = (trackData: Omit<DivineVibrationTrack, 'id'>) => {
    const newTrack: DivineVibrationTrack = {
      ...trackData,
      id: `vib-${Date.now()}`,
    };
    setDivineVibrations((prev) => {
      const next = { ...prev, tracks: [newTrack, ...prev.tracks], lastUpdated: new Date().toISOString() };
      try {
        localStorage.setItem('hindu_dharma_cms_divine_vibrations', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const deleteVibrationTrack = (id: string) => {
    setDivineVibrations((prev) => {
      const next = { ...prev, tracks: prev.tracks.filter((t) => t.id !== id), lastUpdated: new Date().toISOString() };
      try {
        localStorage.setItem('hindu_dharma_cms_divine_vibrations', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  return (
    <CMSContext.Provider
      value={{
        blocks,
        reorderBlocks,
        toggleBlock,
        updateBlockData,
        duplicateBlock,
        deleteBlock,
        addBlock,
        headerMenu,
        addMenuItem,
        removeMenuItem,
        updateMenuItem,
        siteIdentity,
        updateSiteIdentity,
        mantras,
        addMantra,
        updateMantra,
        deleteMantra,
        aartis,
        addAarti,
        updateAarti,
        deleteAarti,
        kathas,
        addKatha,
        updateKatha,
        deleteKatha,
        books,
        addBook,
        updateBook,
        deleteBook,
        shlokas,
        addShloka,
        updateShloka,
        deleteShloka,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        orders,
        addOrder,
        updateOrderStatus,
        comments,
        approveComment,
        spamComment,
        deleteComment,
        panchangConfig,
        updatePanchangConfig,
        divineVibrations,
        updateDivineVibrations,
        updateVibrationTrack,
        addVibrationTrack,
        deleteVibrationTrack,
        themeSettings,
        updateThemeSettings,
        resetToDefaults,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return ctx;
}
