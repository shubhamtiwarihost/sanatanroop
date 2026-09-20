'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  useCMS,
  CMSMantraItem,
  CMSProductItem,
  CMSArticleItem,
  CMSOrderItem,
  CMSCommentItem,
  DivineVibrationTrack,
} from '@/context/CMSContext';
import {
  LayoutDashboard,
  Pin,
  FileText,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  ShoppingBag,
  Package,
  Sparkles,
  Palette,
  Plug,
  Users,
  Wrench,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  RotateCcw,
  Upload,
  Calendar,
  Volume2,
  Flame,
  Globe,
  DollarSign,
  HelpCircle,
  Sliders,
  Bell,
  RefreshCw,
  Folder,
  Tag,
  Star,
  Clock,
  X,
  Menu,
  FileCode,
  Link2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  BookOpen,
  Music,
} from 'lucide-react';

export default function WordPressAdminPanel() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const {
    mantras,
    addMantra,
    updateMantra,
    deleteMantra,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    orders,
    updateOrderStatus,
    comments,
    approveComment,
    spamComment,
    deleteComment,
    siteIdentity,
    updateSiteIdentity,
    panchangConfig,
    updatePanchangConfig,
    divineVibrations,
    updateDivineVibrations,
    addVibrationTrack,
    updateVibrationTrack,
    deleteVibrationTrack,
  } = useCMS();

  // Navigation State
  const [currentSection, setCurrentSection] = useState<string>('dashboard');
  const [currentSubSection, setCurrentSubSection] = useState<string>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Top Bar Dropdowns
  const [wpLogoDropdown, setWpLogoDropdown] = useState(false);
  const [newDropdown, setNewDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  // Pull-down Drawers
  const [screenOptionsOpen, setScreenOptionsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpTab, setHelpTab] = useState<'overview' | 'navigation' | 'layout' | 'content'>('overview');

  // Screen Options Widget Toggles
  const [showWelcome, setShowWelcome] = useState(true);
  const [showGlance, setShowGlance] = useState(true);
  const [showQuickDraft, setShowQuickDraft] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [showWooCommerce, setShowWooCommerce] = useState(true);
  const [showSiteHealth, setShowSiteHealth] = useState(true);
  const [showNews, setShowNews] = useState(true);

  // Dismissible Notices
  const [dismissedNotices, setDismissedNotices] = useState<Record<string, boolean>>({});
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Quick Draft State
  const [quickDraftTitle, setQuickDraftTitle] = useState('');
  const [quickDraftContent, setQuickDraftContent] = useState('');
  const [recentDrafts, setRecentDrafts] = useState([
    { id: 'd-1', title: 'Significance of Shravan Somwar Vrat', date: 'September 18, 2026', content: 'Detailed analysis of fasting rituals and Shiva Puja vidhi.' },
    { id: 'd-2', title: 'Navratri 9 Forms of Maa Durga', date: 'September 15, 2026', content: 'Exploring Shailaputri to Siddhidatri with Vedic shlokas.' },
  ]);

  // Posts State
  const [postsTab, setPostsTab] = useState<'all' | 'published' | 'draft' | 'trash'>('all');
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
  const [postSearch, setPostSearch] = useState('');
  const [postCategoryFilter, setPostCategoryFilter] = useState('all');
  const [quickEditPostId, setQuickEditPostId] = useState<string | null>(null);
  const [quickEditData, setQuickEditData] = useState({ title: '', slug: '', category: 'Philosophy', status: 'Published' });

  // Post Editor State (Add / Edit Post)
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'visual' | 'text'>('visual');
  const [postForm, setPostForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    author: 'Acharya Vidyadhar',
    category: 'Philosophy',
    readingTime: '5 min read',
    image: '/images/article_meditation.jpg',
    status: 'Published' as 'Published' | 'Draft' | 'Scheduled',
    content: 'Sanatan Dharma is the eternal cosmic order that upholds all beings with righteousness, wisdom, and devotion.\n\nClassical Upanishads affirm that Truth is One, though the wise speak of it in various ways. Daily contemplation and adherence to Dharma leads the seeker to peace and inner liberation.',
  });

  // Media Library State
  const [mediaViewMode, setMediaViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [mediaTypeFilter, setMediaTypeFilter] = useState('all');
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaItems, setMediaItems] = useState([
    { id: 'm-1', title: 'Gita Krishna Guidance', file: 'gita_krishna.jpg', type: 'image/jpeg', date: 'September 13, 2026', size: '1.04 MB', url: '/images/gita_krishna.jpg', dimensions: '1920 × 1080' },
    { id: 'm-2', title: 'Lord Shiva Meditative Artwork', file: 'hero_shiva.jpg', type: 'image/jpeg', date: 'September 13, 2026', size: '843 KB', url: '/images/hero_shiva.jpg', dimensions: '1920 × 1080' },
    { id: 'm-3', title: 'Vedic Meditation & Mind', file: 'article_meditation.jpg', type: 'image/jpeg', date: 'September 13, 2026', size: '114 KB', url: '/images/article_meditation.jpg', dimensions: '1200 × 800' },
    { id: 'm-4', title: 'Ekadashi Vrat Rules', file: 'article_ekadashi.jpg', type: 'image/jpeg', date: 'September 13, 2026', size: '19 KB', url: '/images/article_ekadashi.jpg', dimensions: '800 × 600' },
    { id: 'm-5', title: 'Bhagavad Gita Lessons', file: 'article_gita_lessons.jpg', type: 'image/jpeg', date: 'September 13, 2026', size: '38 KB', url: '/images/article_gita_lessons.jpg', dimensions: '800 × 600' },
    { id: 'm-6', title: 'Puja Samagri Sacred Collection', file: 'category_puja.jpg', type: 'image/jpeg', date: 'September 13, 2026', size: '704 KB', url: '/images/category_puja.jpg', dimensions: '1000 × 1000' },
    { id: 'm-7', title: 'Spiritual Books & Shastras', file: 'category_books.jpg', type: 'image/jpeg', date: 'September 13, 2026', size: '810 KB', url: '/images/category_books.jpg', dimensions: '1000 × 1000' },
    { id: 'm-8', title: 'Sacred Rudraksha Beads', file: 'category_rudraksha.jpg', type: 'image/jpeg', date: 'September 13, 2026', size: '39 KB', url: '/images/category_rudraksha.jpg', dimensions: '1000 × 1000' },
  ]);

  // Mantra Modal State
  const [mantraModalOpen, setMantraModalOpen] = useState(false);
  const [editingMantraId, setEditingMantraId] = useState<string | null>(null);
  const [mantraForm, setMantraForm] = useState<Partial<CMSMantraItem>>({
    name: '',
    sanskrit: '',
    transliteration: '',
    hindiMeaning: '',
    englishMeaning: '',
    deity: 'Lord Shiva',
    category: 'Sadhana',
    benefits: '',
    chantCount: 108,
    bestTime: 'Brahma Muhurat',
    difficulty: 'Easy',
    status: 'Published',
  });

  // Product Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState<Partial<CMSProductItem>>({
    name: '',
    sku: '',
    price: 999,
    salePrice: 799,
    stock: 25,
    stockStatus: 'In Stock',
    category: 'Puja Samagri',
    image: '/images/category_puja.jpg',
    shortDescription: '',
    status: 'Published',
  });

  // Plugins State
  const [pluginsList, setPluginsList] = useState([
    { id: 'p-seo', name: 'Sanatan SEO Pro', description: 'Advanced Schema.org markup for Hindu scriptures, deities, and rich Google snippets.', version: '2.4.1', author: 'Sanatan Tech Foundation', active: true, updateAvailable: false },
    { id: 'p-panchang', name: 'Panchang Astrological Engine', description: 'High-precision Surya Siddhanta & NASA JPL ephemeris calculation for tithis and muhurats.', version: '3.1.0', author: 'Vedic Astronomy Lab', active: true, updateAvailable: true },
    { id: 'p-woo', name: 'WooCommerce Sanatan Store', description: 'Complete Vedic merchandise, dhoop, rudraksha, and puja kit ecommerce platform.', version: '8.9.2', author: 'Automattic & Sanatan Team', active: true, updateAvailable: false },
    { id: 'p-audio', name: 'Divine Vibrations Audio Streamer', description: '432 Hz and sacred frequency ambient player with gapless looping.', version: '1.2.5', author: 'Deva Vani Media', active: true, updateAvailable: false },
    { id: 'p-cache', name: 'WP Super Cache', description: 'Ultra-fast static HTML caching for high concurrency during festival surges.', version: '1.9.4', author: 'Automattic', active: true, updateAvailable: false },
    { id: 'p-akismet', name: 'Akismet Anti-Spam', description: 'Protects temple questions, comments, and community discussions from spam.', version: '5.3.3', author: 'Automattic', active: true, updateAvailable: false },
  ]);

  // Settings State
  const [settingsTab, setSettingsTab] = useState<'general' | 'reading' | 'writing' | 'discussion' | 'permalinks'>('general');
  const [generalSettings, setGeneralSettings] = useState({
    siteTitle: siteIdentity.brandName || 'SanatanRoop Platform',
    tagline: siteIdentity.tagline || 'Sanatan Gyan, Har Ghar Tak',
    wpUrl: 'http://localhost:3000',
    siteUrl: 'http://localhost:3000',
    adminEmail: 'superadmin@sanatan.org',
    anyoneCanRegister: true,
    defaultRole: 'Subscriber',
    language: 'English (United States)',
    timezone: 'UTC+5:30 (Asia/Kolkata)',
    dateFormat: 'F j, Y',
    timeFormat: 'g:i a',
    permalinkStructure: '/%year%/%monthnum%/%postname%/',
  });

  // Pages State
  const [pageModalOpen, setPageModalOpen] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [pageForm, setPageForm] = useState({ title: '', slug: '', content: '', status: 'Published' });
  const [pagesList, setPagesList] = useState([
    { id: 'p-1', title: 'Home', slug: '', author: 'Shubham Tiwari', date: 'Published 2026/09/13', isFrontPage: true, status: 'Published' },
    { id: 'p-aartis', title: 'Aartis Sangrah', slug: 'aartis', author: 'Pandit Devavrata', date: 'Published 2026/09/20', status: 'Published' },
    { id: 'p-kathas', title: 'Vrat & Pauranik Kathas', slug: 'kathas', author: 'Acharya Vidyadhar', date: 'Published 2026/09/20', status: 'Published' },
    { id: 'p-books', title: 'Spiritual Books Library', slug: 'books', author: 'Acharya Vidyadhar', date: 'Published 2026/09/20', status: 'Published' },
    { id: 'p-9', title: 'Daily Shlokas & Stotras', slug: 'shlokas', author: 'Pandit Devavrata', date: 'Published 2026/09/13', status: 'Published' },
    { id: 'p-5', title: 'Divine Vibrations (432 Hz)', slug: 'divine-vibrations', author: 'Deva Vani', date: 'Published 2026/09/13', status: 'Published' },
    { id: 'p-2', title: 'About Sanatan Dharma', slug: 'about', author: 'Acharya Vidyadhar', date: 'Published 2026/09/13', status: 'Published' },
    { id: 'p-3', title: 'Sacred Temples Directory', slug: 'temples', author: 'Dr. Raghavan Shastri', date: 'Published 2026/09/13', status: 'Published' },
    { id: 'p-7', title: 'Store & Puja Samagri', slug: 'store', author: 'Govind Das', date: 'Published 2026/09/13', status: 'Published' },
    { id: 'p-8', title: 'Devotee Sangha Community', slug: 'community', author: 'Pooja Sharma', date: 'Published 2026/09/13', status: 'Published' },
    { id: 'p-11', title: 'Contact & Temple Inquiries', slug: 'contact', author: 'Shubham Tiwari', date: 'Published 2026/09/13', status: 'Published' },
    { id: 'p-12', title: 'Privacy Policy & Terms', slug: 'privacy', author: 'Shubham Tiwari', date: 'Draft', isPrivacyPage: true, status: 'Draft' },
  ]);

  // Live Festival Admin State
  const [liveFestivalConfig, setLiveFestivalConfig] = useState({
    enabled: true,
    nameHi: 'शारदीय नवरात्रि महापर्व',
    nameEn: 'Maha Navratri Celebration',
    tagline: 'माँ जगदम्बा की असीम कृपा, शक्ति और भक्ति का पावन उत्सव',
    tithi: 'आश्विन शुक्ल प्रतिपदा • प्रथम नवरात्र',
    deity: 'माँ शैलपुत्री (Maa Shailaputri)',
    deityRole: 'हिमालय पुत्री, नवदुर्गा का प्रथम स्वरूप • शक्ति एवं स्थिरता की अधिष्ठात्री',
    todaysColor: 'पीला (Royal Yellow - ज्ञान व तेज)',
    todaysPrasad: 'शुद्ध देशी गाय का घी, पंचामृत एवं श्वेत मिष्ठान',
    primaryMantraSanskrit: 'वन्दे वाञ्छितलाभाय चन्द्रार्धकृतशेखराम् ।\nवृषारूढां शूलधरां शैलपुत्रीं यशस्विनीम् ॥',
    primaryMantraMeaning: 'मनोवांछित फल की प्राप्ति के लिए, मस्तक पर अर्धचंद्र धारण करने वाली, वृषभ पर सवार और त्रिशूल धारण करने वाली परम तेजस्वी माँ शैलपुत्री की हम वंदना करते हैं।',
    diyaCount: 14850,
    flowerCount: 8920,
    shubhMuhurats: [
      { title: 'घटस्थापना शुभ मुहूर्त', time: 'प्रातः 06:15 AM - 10:18 AM', note: 'अभिजीत मुहूर्त: 11:48 AM - 12:36 PM' },
      { title: 'मध्याह्न पूजा काल', time: 'दोपहर 12:05 PM - 02:45 PM', note: 'सर्वार्थ सिद्धि योग सहित' },
      { title: 'महा संध्या आरती', time: 'सायं 06:45 PM - 07:30 PM', note: 'दीपदान एवं पुष्पवृष्टि काल' },
    ],
  });

  // Aartis Admin State
  const [aartisList, setAartisList] = useState([
    { id: 'art-1', titleHi: 'श्री गणेश जी की आरती', deity: 'श्री गणेश', lyricsPreview: 'जय गणेश जय गणेश जय गणेश देवा...', audio: 'om_namah_shivaya.wav', status: 'Published' },
    { id: 'art-2', titleHi: 'श्री जगदीश जी की आरती', deity: 'श्री विष्णु', lyricsPreview: 'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे...', audio: 'om_namah_shivaya.wav', status: 'Published' },
    { id: 'art-3', titleHi: 'श्री शिव जी की आरती', deity: 'भगवान शिव', lyricsPreview: 'ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा...', audio: 'om_namah_shivaya.wav', status: 'Published' },
    { id: 'art-4', titleHi: 'श्री अम्बे माता की आरती', deity: 'माँ दुर्गा', lyricsPreview: 'जय अम्बे गौरी मैया जय श्यामा गौरी...', audio: 'om_namah_shivaya.wav', status: 'Published' },
    { id: 'art-5', titleHi: 'श्री हनुमान जी की आरती', deity: 'श्री हनुमान', lyricsPreview: 'आरती कीजै हनुमान लला की, दुष्ट दलन...', audio: 'om_namah_shivaya.wav', status: 'Published' },
    { id: 'art-6', titleHi: 'श्री लक्ष्मी माता की आरती', deity: 'माँ लक्ष्मी', lyricsPreview: 'ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता...', audio: 'om_namah_shivaya.wav', status: 'Published' },
    { id: 'art-7', titleHi: 'श्री कुंजबिहारी जी की आरती', deity: 'श्री कृष्ण', lyricsPreview: 'आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की...', audio: 'om_namah_shivaya.wav', status: 'Published' },
    { id: 'art-8', titleHi: 'श्री रामचन्द्र कृपालु भजु मन', deity: 'श्री राम', lyricsPreview: 'श्रीरामचन्द्र कृपालु भजु मन हरण भवभय...', audio: 'om_namah_shivaya.wav', status: 'Published' },
  ]);
  const [aartiModalOpen, setAartiModalOpen] = useState(false);
  const [aartiForm, setAartiForm] = useState({ titleHi: '', deity: 'श्री गणेश', lyricsPreview: '', audio: 'om_namah_shivaya.wav' });

  // Kathas Admin State
  const [kathasList, setKathasList] = useState([
    { id: 'kth-1', titleHi: 'श्री सत्यनारायण व्रत कथा', deity: 'श्री विष्णु', dayOrTithi: 'पूर्णिमा / गुरुवार', chaptersCount: 5, status: 'Published' },
    { id: 'kth-2', titleHi: 'महाशिवरात्रि व्रत कथा', deity: 'भगवान शिव', dayOrTithi: 'फाल्गुन कृष्ण चतुर्दशी', chaptersCount: 2, status: 'Published' },
    { id: 'kth-3', titleHi: 'निर्जला एकादशी व्रत कथा', deity: 'श्री विष्णु', dayOrTithi: 'ज्येष्ठ शुक्ल एकादशी', chaptersCount: 2, status: 'Published' },
    { id: 'kth-4', titleHi: 'करवा चौथ व्रत कथा', deity: 'माँ गौरी व शिव', dayOrTithi: 'कार्तिक कृष्ण चतुर्थी', chaptersCount: 2, status: 'Published' },
    { id: 'kth-5', titleHi: 'सोमवार व्रत कथा', deity: 'भगवान शिव', dayOrTithi: 'प्रत्येक सोमवार', chaptersCount: 2, status: 'Published' },
  ]);
  const [kathaModalOpen, setKathaModalOpen] = useState(false);
  const [kathaForm, setKathaForm] = useState({ titleHi: '', deity: 'भगवान शिव', dayOrTithi: 'सोमवार', chaptersCount: 1 });

  // Spiritual Books Admin State
  const [booksList, setBooksList] = useState([
    { id: 'bk-1', titleHi: 'श्रीमद्भगवद्गीता', category: 'श्रीमद्भगवद्गीता', author: 'महर्षि वेदव्यास / श्री कृष्ण', verses: '१८ अध्याय • ७०० श्लोक', colorCode: '#FF9933', status: 'Published' },
    { id: 'bk-2', titleHi: 'श्रीरामचरितमानस', category: 'इतिहास एवं काव्य', author: 'गोस्वामी तुलसीदास जी', verses: '७ काण्ड • चौपाई, दोहा', colorCode: '#FF9933', status: 'Published' },
    { id: 'bk-3', titleHi: 'ईशावास्योपनिषद्', category: 'उपनिषद', author: 'शुक्ल यजुर्वेद', verses: '१८ मंत्र', colorCode: '#FF9933', status: 'Published' },
    { id: 'bk-4', titleHi: 'कठोपनिषद्', category: 'उपनिषद', author: 'कृष्ण यजुर्वेद', verses: '२ अध्याय • ६ वल्लियाँ', colorCode: '#FF9933', status: 'Published' },
    { id: 'bk-5', titleHi: 'ऋग्वेद संहिता', category: 'वेद संहिता', author: 'अनादि / अपौरुषेय', verses: '१० मण्डल • १०२८ सूक्त', colorCode: '#FF9933', status: 'Published' },
    { id: 'bk-6', titleHi: 'श्रीमद्भागवत महापुराण', category: 'महापुराण', author: 'श्री शुकदेव जी / वेदव्यास', verses: '१२ स्कंध • १८,००० श्लोक', colorCode: '#FF9933', status: 'Published' },
    { id: 'bk-7', titleHi: 'पतंजलि योगसूत्र', category: 'दर्शन एवं योग', author: 'महर्षि पतंजलि', verses: '४ पाद • १९६ सूत्र', colorCode: '#FF9933', status: 'Published' },
    { id: 'bk-8', titleHi: 'चाणक्य नीति', category: 'दर्शन एवं नीति', author: 'आचार्य चाणक्य', verses: '१७ अध्याय • ३५०+ श्लोक', colorCode: '#FF9933', status: 'Published' },
  ]);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookForm, setBookForm] = useState({ titleHi: '', category: 'श्रीमद्भगवद्गीता', author: '', verses: '', colorCode: '#FF9933' });

  // Categories & Tags State
  const [categoriesList, setCategoriesList] = useState([
    { id: 'c-1', name: 'Philosophy', slug: 'philosophy', description: 'Vedic Darshana, Advaita, and spiritual commentaries', count: 18 },
    { id: 'c-2', name: 'Rituals', slug: 'rituals', description: 'Puja vidhi, havan, and samskaras', count: 12 },
    { id: 'c-3', name: 'Meditation', slug: 'meditation', description: 'Dhyana, pranayama, and yogic practices', count: 8 },
    { id: 'c-4', name: 'Festivals', slug: 'festivals', description: 'Diwali, Navratri, Shivratri, and sacred vrat dates', count: 15 },
    { id: 'c-5', name: 'Veda', slug: 'veda', description: 'Rigveda, Samaveda, Yajurveda, and Atharvaveda samhitās', count: 9 },
  ]);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });

  const [tagsList, setTagsList] = useState([
    { id: 't-1', name: 'Shiva', slug: 'shiva', description: 'Lord Shiva stotras and meditative sadhana', count: 14 },
    { id: 't-2', name: 'Krishna', slug: 'krishna', description: 'Bhagavad Gita, Bhakti Yoga, and lilas', count: 22 },
    { id: 't-3', name: 'Navratri', slug: 'navratri', description: 'Durga Saptashati and 9 devis', count: 11 },
    { id: 't-4', name: 'Mantra', slug: 'mantra', description: 'Sacred seed syllables and chanting rules', count: 35 },
    { id: 't-5', name: 'Panchang', slug: 'panchang', description: 'Tithi, nakshatra, and shubh muhurat', count: 19 },
  ]);
  const [newTag, setNewTag] = useState({ name: '', slug: '', description: '' });

  // Notice helper
  const showNotice = (msg: string) => {
    setNoticeMessage(msg);
    setTimeout(() => setNoticeMessage(null), 4000);
  };

  // Quick Draft Save
  const handleSaveQuickDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickDraftTitle.trim()) return;
    const newDraft = {
      id: `draft-${Date.now()}`,
      title: quickDraftTitle,
      date: 'Just now',
      content: quickDraftContent,
    };
    setRecentDrafts([newDraft, ...recentDrafts]);
    setQuickDraftTitle('');
    setQuickDraftContent('');
    showNotice(`Draft "${newDraft.title}" saved successfully.`);
  };

  // Open Post Editor
  const handleOpenPostEditor = (post?: CMSArticleItem) => {
    if (post) {
      setEditingPostId(post.id);
      setPostForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        author: post.author,
        category: post.category,
        readingTime: post.readingTime,
        image: post.image,
        status: post.status,
        content: `Sanatan Dharma exploration of ${post.title}.\n\nClassical wisdom teaches righteousness, devotion, and alignment with the cosmic order.`,
      });
    } else {
      setEditingPostId(null);
      setPostForm({
        title: '',
        slug: '',
        excerpt: '',
        author: 'Acharya Vidyadhar',
        category: 'Philosophy',
        readingTime: '5 min read',
        image: '/images/article_meditation.jpg',
        status: 'Draft',
        content: '',
      });
    }
    setEditorOpen(true);
  };

  // Save Post
  const handleSavePost = () => {
    if (!postForm.title.trim()) {
      alert('Please provide a title for the post.');
      return;
    }
    if (editingPostId) {
      updateArticle(editingPostId, postForm);
      showNotice(`Post "${postForm.title}" updated.`);
    } else {
      addArticle({
        ...postForm,
        publishedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      });
      showNotice(`Post "${postForm.title}" published.`);
    }
    setEditorOpen(false);
  };

  // Quick Edit Save
  const handleSaveQuickEdit = (postId: string) => {
    updateArticle(postId, {
      title: quickEditData.title,
      slug: quickEditData.slug,
      category: quickEditData.category,
      status: quickEditData.status as any,
    });
    setQuickEditPostId(null);
    showNotice('Post updated via Quick Edit.');
  };

  // Save General Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteIdentity({
      brandName: generalSettings.siteTitle,
      tagline: generalSettings.tagline,
    });
    showNotice('Settings saved.');
  };

  // Toggle Plugin
  const handleTogglePlugin = (id: string) => {
    setPluginsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
    const p = pluginsList.find((x) => x.id === id);
    showNotice(`Plugin "${p?.name}" ${p?.active ? 'deactivated' : 'activated'}.`);
  };

  // Menu structure matching WordPress
  const wpMenu = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      subItems: [
        { id: 'home', label: 'Home' },
        { id: 'updates', label: 'Updates', count: 2 },
      ],
    },
    {
      id: 'posts',
      label: 'Posts',
      icon: Pin,
      badge: null,
      subItems: [
        { id: 'all-posts', label: 'All Posts' },
        { id: 'add-post', label: 'Add New Post' },
        { id: 'categories', label: 'Categories' },
        { id: 'tags', label: 'Tags' },
      ],
    },
    {
      id: 'media',
      label: 'Media',
      icon: ImageIcon,
      badge: null,
      subItems: [
        { id: 'library', label: 'Library' },
        { id: 'add-media', label: 'Add New Media' },
      ],
    },
    {
      id: 'pages',
      label: 'Pages',
      icon: Layers,
      badge: null,
      subItems: [
        { id: 'all-pages', label: 'All Pages' },
        { id: 'add-page', label: 'Add New Page' },
      ],
    },
    {
      id: 'comments',
      label: 'Comments',
      icon: MessageSquare,
      badge: comments.length.toString(),
      subItems: [
        { id: 'all-comments', label: 'All Comments' },
      ],
    },
    {
      id: 'woocommerce',
      label: 'WooCommerce',
      icon: ShoppingBag,
      badge: orders.length.toString(),
      subItems: [
        { id: 'woo-home', label: 'Home' },
        { id: 'orders', label: 'Orders', count: orders.length },
        { id: 'customers', label: 'Customers' },
        { id: 'coupons', label: 'Coupons' },
        { id: 'reports', label: 'Reports' },
        { id: 'woo-settings', label: 'Settings' },
      ],
    },
    {
      id: 'products',
      label: 'Products',
      icon: Package,
      badge: null,
      subItems: [
        { id: 'all-products', label: 'All Products' },
        { id: 'add-product', label: 'Add New' },
        { id: 'product-categories', label: 'Categories' },
        { id: 'product-tags', label: 'Tags' },
      ],
    },
    {
      id: 'sanatan',
      label: 'Sanatan Dharma',
      icon: Sparkles,
      badge: 'LIVE',
      subItems: [
        { id: 'live-festival', label: 'Live Festival' },
        { id: 'shlokas', label: 'Slokas & Mantras' },
        { id: 'aartis', label: 'Aarti Sangrah' },
        { id: 'kathas', label: 'Vrat Kathas' },
        { id: 'books', label: 'Spiritual Books' },
        { id: 'divine-vibrations', label: 'Divine Vibrations' },
      ],
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: Palette,
      badge: null,
      subItems: [
        { id: 'themes', label: 'Themes' },
        { id: 'customize', label: 'Customize' },
        { id: 'widgets', label: 'Widgets' },
        { id: 'menus', label: 'Menus' },
        { id: 'theme-editor', label: 'Theme File Editor' },
      ],
    },
    {
      id: 'plugins',
      label: 'Plugins',
      icon: Plug,
      badge: '1',
      subItems: [
        { id: 'installed-plugins', label: 'Installed Plugins' },
        { id: 'add-plugin', label: 'Add New Plugin' },
        { id: 'plugin-editor', label: 'Plugin File Editor' },
      ],
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      badge: null,
      subItems: [
        { id: 'all-users', label: 'All Users' },
        { id: 'add-user', label: 'Add New User' },
        { id: 'profile', label: 'Profile' },
      ],
    },
    {
      id: 'tools',
      label: 'Tools',
      icon: Wrench,
      badge: null,
      subItems: [
        { id: 'available-tools', label: 'Available Tools' },
        { id: 'import', label: 'Import' },
        { id: 'export', label: 'Export' },
        { id: 'site-health', label: 'Site Health' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
      subItems: [
        { id: 'general', label: 'General' },
        { id: 'writing', label: 'Writing' },
        { id: 'reading', label: 'Reading' },
        { id: 'discussion', label: 'Discussion' },
        { id: 'permalinks', label: 'Permalinks' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#2c3338] font-sans antialiased text-[13px] flex flex-col selection:bg-[#2271b1] selection:text-white">
      {/* =========================================================================
          1. TOP WORDPRESS ADMIN BAR (#wpadminbar) - Height 32px
      ========================================================================= */}
      <header className="h-8 bg-[#1d2327] text-[#c3c4c7] fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-2 text-[13px] select-none border-b border-[#2c3338]">
        {/* Left Bar Items */}
        <div className="flex items-center space-x-1 h-full">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden px-2 py-1 text-white hover:bg-[#2c3338] rounded"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* WordPress W / Om Logo Dropdown */}
          <div className="relative h-full flex items-center">
            <button
              onClick={() => setWpLogoDropdown(!wpLogoDropdown)}
              className="h-full px-2.5 flex items-center space-x-1.5 hover:bg-[#2271b1] hover:text-white transition"
              title="About WordPress Clone"
            >
              <span className="font-serif font-bold text-base text-amber-400">ॐ</span>
            </button>
            {wpLogoDropdown && (
              <div
                onMouseLeave={() => setWpLogoDropdown(false)}
                className="absolute left-0 top-8 w-48 bg-[#2c3338] text-[#c3c4c7] py-1 shadow-2xl z-50 text-[13px] border border-[#3c434a]"
              >
                <a href="#about" className="block px-4 py-1.5 hover:bg-[#2271b1] hover:text-white">About Sanatan WP</a>
                <a href="https://wordpress.org" target="_blank" rel="noreferrer" className="block px-4 py-1.5 hover:bg-[#2271b1] hover:text-white">WordPress.org</a>
                <a href="#doc" className="block px-4 py-1.5 hover:bg-[#2271b1] hover:text-white">Documentation</a>
                <a href="#support" className="block px-4 py-1.5 hover:bg-[#2271b1] hover:text-white">Support Forums</a>
                <a href="#feedback" className="block px-4 py-1.5 hover:bg-[#2271b1] hover:text-white">Feedback</a>
              </div>
            )}
          </div>

          {/* Site Name & Visit Site */}
          <Link
            href="/"
            target="_blank"
            className="h-full px-3 flex items-center space-x-1.5 hover:bg-[#2271b1] hover:text-white transition group"
            title="Visit Site"
          >
            <Globe className="w-3.5 h-3.5 text-stone-400 group-hover:text-white" />
            <span className="font-semibold text-white truncate max-w-[150px] sm:max-w-none">
              {siteIdentity.brandName || 'Sanatan Dharma Platform'}
            </span>
          </Link>

          {/* Updates icon */}
          <button
            onClick={() => {
              setCurrentSection('dashboard');
              setCurrentSubSection('updates');
            }}
            className="hidden sm:flex h-full px-2.5 items-center space-x-1 hover:bg-[#2271b1] hover:text-white transition"
            title="2 Updates Available"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
            <span className="bg-[#d63638] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight">2</span>
          </button>

          {/* Comments count */}
          <button
            onClick={() => {
              setCurrentSection('comments');
              setCurrentSubSection('all-comments');
            }}
            className="hidden sm:flex h-full px-2.5 items-center space-x-1 hover:bg-[#2271b1] hover:text-white transition"
            title="Comments Queue"
          >
            <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
            <span className="bg-[#2271b1] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight">
              {comments.length}
            </span>
          </button>

          {/* + New Dropdown */}
          <div className="relative h-full flex items-center">
            <button
              onClick={() => setNewDropdown(!newDropdown)}
              className="h-full px-2.5 flex items-center space-x-1 hover:bg-[#2271b1] hover:text-white transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New</span>
            </button>
            {newDropdown && (
              <div
                onMouseLeave={() => setNewDropdown(false)}
                className="absolute left-0 top-8 w-40 bg-[#2c3338] text-[#c3c4c7] py-1 shadow-2xl z-50 text-[13px] border border-[#3c434a]"
              >
                <button
                  onClick={() => {
                    setNewDropdown(false);
                    handleOpenPostEditor();
                  }}
                  className="w-full text-left px-4 py-1.5 hover:bg-[#2271b1] hover:text-white"
                >
                  Post
                </button>
                <button
                  onClick={() => {
                    setNewDropdown(false);
                    setCurrentSection('media');
                    setCurrentSubSection('add-media');
                  }}
                  className="w-full text-left px-4 py-1.5 hover:bg-[#2271b1] hover:text-white"
                >
                  Media
                </button>
                <button
                  onClick={() => {
                    setNewDropdown(false);
                    setCurrentSection('pages');
                    setCurrentSubSection('add-page');
                  }}
                  className="w-full text-left px-4 py-1.5 hover:bg-[#2271b1] hover:text-white"
                >
                  Page
                </button>
                <button
                  onClick={() => {
                    setNewDropdown(false);
                    setProductModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-1.5 hover:bg-[#2271b1] hover:text-white"
                >
                  Product
                </button>
                <button
                  onClick={() => {
                    setNewDropdown(false);
                    setMantraModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-1.5 hover:bg-[#2271b1] hover:text-white"
                >
                  Mantra
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Bar Items */}
        <div className="flex items-center space-x-2 h-full">
          {/* User Profile dropdown */}
          <div className="relative h-full flex items-center">
            <button
              onClick={() => setUserDropdown(!userDropdown)}
              className="h-full px-2.5 flex items-center space-x-2 hover:bg-[#2271b1] hover:text-white transition"
            >
              <span className="text-stone-300 hidden sm:inline">Howdy,</span>
              <span className="font-semibold text-white">{user?.name ? user.name.split(' ')[0] : 'Shubham'}</span>
              <div className="w-5 h-5 rounded bg-amber-600 text-white font-bold flex items-center justify-center text-[10px]">
                {user?.name ? user.name[0] : 'S'}
              </div>
            </button>
            {userDropdown && (
              <div
                onMouseLeave={() => setUserDropdown(false)}
                className="absolute right-0 top-8 w-56 bg-[#2c3338] text-[#c3c4c7] p-3 shadow-2xl z-50 text-[13px] border border-[#3c434a] space-y-2"
              >
                <div className="flex items-center space-x-3 pb-2 border-b border-stone-700">
                  <div className="w-10 h-10 rounded bg-gradient-to-tr from-amber-600 to-orange-500 text-white font-bold flex items-center justify-center text-sm">
                    ST
                  </div>
                  <div>
                    <span className="font-bold block text-white">{user?.name || 'Shubham Tiwari'}</span>
                    <span className="text-[11px] text-stone-400 block">{user?.email || 'superadmin@sanatan.org'}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setUserDropdown(false);
                    setCurrentSection('users');
                    setCurrentSubSection('profile');
                  }}
                  className="w-full text-left px-2 py-1 hover:bg-[#2271b1] hover:text-white rounded"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    router.push('/login');
                  }}
                  className="w-full text-left px-2 py-1 text-red-400 hover:bg-red-900/40 hover:text-red-200 rounded font-semibold"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN WRAPPER (Left Sidebar + Content Canvas)
      ========================================================================= */}
      <div className="flex-1 flex pt-8 min-h-screen">
        {/* =========================================================================
            LEFT WORDPRESS NAVIGATION SIDEBAR (#adminmenu) - Width 160px / Collapsed 36px
        ========================================================================= */}
        <aside
          className={`${
            mobileMenuOpen ? 'block fixed z-40 top-8 bottom-0 left-0 shadow-2xl' : 'hidden md:block'
          } ${
            sidebarCollapsed ? 'w-10' : 'w-40'
          } bg-[#1d2327] text-[#c3c4c7] flex-shrink-0 transition-all duration-150 select-none flex flex-col justify-between border-r border-[#1d2327]`}
        >
          {/* Menu Items List */}
          <div className="py-2 overflow-y-auto max-h-[calc(100vh-80px)] custom-scrollbar">
            {wpMenu.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => {
                      setCurrentSection(item.id);
                      if (item.subItems && item.subItems.length > 0) {
                        setCurrentSubSection(item.subItems[0].id);
                      }
                      if (mobileMenuOpen) setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 text-[13px] font-normal transition text-left ${
                      isActive
                        ? 'bg-[#2271b1] text-white font-semibold'
                        : 'hover:bg-[#2c3338] hover:text-[#72aee6]'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-[#c3c4c7] group-hover:text-[#72aee6]'}`} />
                    {!sidebarCollapsed && (
                      <span className="ml-2.5 truncate flex-1">{item.label}</span>
                    )}
                    {!sidebarCollapsed && item.badge && (
                      <span className="bg-[#2271b1] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Submenu Accordion / Flyout */}
                  {isActive && !sidebarCollapsed && item.subItems && item.subItems.length > 0 && (
                    <div className="bg-[#2c3338] py-1 text-[12px]">
                      {item.subItems.map((sub) => {
                        const isSubActive = currentSubSection === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => setCurrentSubSection(sub.id)}
                            className={`w-full text-left pl-8 pr-3 py-1.5 block transition ${
                              isSubActive
                                ? 'text-white font-bold bg-[#1d2327]/60'
                                : 'text-[#c3c4c7] hover:text-[#72aee6]'
                            }`}
                          >
                            <span>{sub.label}</span>
                            {'count' in sub && sub.count !== undefined && (
                              <span className="ml-1.5 bg-[#d63638] text-white text-[9px] px-1 rounded-full font-bold">
                                {sub.count}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Collapse Menu Button at bottom */}
          <div className="p-2 border-t border-[#2c3338] hidden md:block">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center space-x-2 text-[12px] text-[#c3c4c7] hover:text-[#72aee6] py-1.5 px-2 rounded hover:bg-[#2c3338] transition"
              title="Collapse menu"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 mx-auto" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span>Collapse menu</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* =========================================================================
            3. MAIN WORDPRESS CONTENT CANVAS (#wpcontent / #wpbody)
        ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#f0f0f1] text-[#2c3338] p-4 sm:p-6 overflow-y-auto">
          {/* SCREEN OPTIONS & HELP TABS (Classic WP pull-downs) */}
          <div className="relative flex justify-end items-start -mt-2 mb-3 select-none">
            <div className="flex space-x-0 border-b border-transparent">
              <button
                onClick={() => {
                  setHelpOpen(!helpOpen);
                  setScreenOptionsOpen(false);
                }}
                className={`text-[12px] px-3 py-1 bg-white border border-[#c3c4c7] border-t-0 rounded-b shadow-sm font-medium text-[#2271b1] hover:text-[#135e96] flex items-center space-x-1 ${
                  helpOpen ? 'bg-[#f6f7f7] font-bold' : ''
                }`}
              >
                <span>Help</span>
                <ChevronDown className={`w-3 h-3 transform transition-transform ${helpOpen ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => {
                  setScreenOptionsOpen(!screenOptionsOpen);
                  setHelpOpen(false);
                }}
                className={`text-[12px] px-3 py-1 bg-white border border-l-0 border-[#c3c4c7] border-t-0 rounded-b shadow-sm font-medium text-[#2271b1] hover:text-[#135e96] flex items-center space-x-1 ${
                  screenOptionsOpen ? 'bg-[#f6f7f7] font-bold' : ''
                }`}
              >
                <span>Screen Options</span>
                <ChevronDown className={`w-3 h-3 transform transition-transform ${screenOptionsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* SCREEN OPTIONS PULL-DOWN DRAWER */}
          {screenOptionsOpen && (
            <div className="bg-white border border-[#c3c4c7] p-4 rounded mb-5 shadow-sm text-xs space-y-3 animate-slide-down">
              <h4 className="font-bold text-[#1d2327]">Screen Elements</h4>
              <p className="text-stone-600">Toggle display of WordPress dashboard widgets and panel elements.</p>
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showWelcome}
                    onChange={(e) => setShowWelcome(e.target.checked)}
                    className="rounded border-[#8c8f94] text-[#2271b1]"
                  />
                  <span>Welcome</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showGlance}
                    onChange={(e) => setShowGlance(e.target.checked)}
                    className="rounded border-[#8c8f94] text-[#2271b1]"
                  />
                  <span>At a Glance</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showActivity}
                    onChange={(e) => setShowActivity(e.target.checked)}
                    className="rounded border-[#8c8f94] text-[#2271b1]"
                  />
                  <span>Activity</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showQuickDraft}
                    onChange={(e) => setShowQuickDraft(e.target.checked)}
                    className="rounded border-[#8c8f94] text-[#2271b1]"
                  />
                  <span>Quick Draft</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showWooCommerce}
                    onChange={(e) => setShowWooCommerce(e.target.checked)}
                    className="rounded border-[#8c8f94] text-[#2271b1]"
                  />
                  <span>WooCommerce Status</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSiteHealth}
                    onChange={(e) => setShowSiteHealth(e.target.checked)}
                    className="rounded border-[#8c8f94] text-[#2271b1]"
                  />
                  <span>Site Health Status</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showNews}
                    onChange={(e) => setShowNews(e.target.checked)}
                    className="rounded border-[#8c8f94] text-[#2271b1]"
                  />
                  <span>Sanatan Platform News</span>
                </label>
              </div>
            </div>
          )}

          {/* HELP PULL-DOWN DRAWER */}
          {helpOpen && (
            <div className="bg-white border border-[#c3c4c7] p-4 rounded mb-5 shadow-sm text-xs grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-down">
              <div className="border-r border-[#dcdcde] pr-4 space-y-1">
                <button
                  onClick={() => setHelpTab('overview')}
                  className={`w-full text-left px-2 py-1.5 rounded ${helpTab === 'overview' ? 'bg-[#f0f0f1] font-bold text-[#2271b1]' : 'hover:bg-stone-50'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setHelpTab('navigation')}
                  className={`w-full text-left px-2 py-1.5 rounded ${helpTab === 'navigation' ? 'bg-[#f0f0f1] font-bold text-[#2271b1]' : 'hover:bg-stone-50'}`}
                >
                  Navigation
                </button>
                <button
                  onClick={() => setHelpTab('layout')}
                  className={`w-full text-left px-2 py-1.5 rounded ${helpTab === 'layout' ? 'bg-[#f0f0f1] font-bold text-[#2271b1]' : 'hover:bg-stone-50'}`}
                >
                  Layout
                </button>
                <button
                  onClick={() => setHelpTab('content')}
                  className={`w-full text-left px-2 py-1.5 rounded ${helpTab === 'content' ? 'bg-[#f0f0f1] font-bold text-[#2271b1]' : 'hover:bg-stone-50'}`}
                >
                  Content
                </button>
              </div>
              <div className="md:col-span-3 space-y-2 text-stone-700">
                {helpTab === 'overview' && (
                  <div>
                    <h4 className="font-bold text-[#1d2327] mb-1">WordPress Admin Dashboard Overview</h4>
                    <p>Welcome to your complete WordPress Admin Panel Clone. This interface allows managing articles, sacred scriptures, mantras, WooCommerce store items, devotee comments, and system settings directly.</p>
                  </div>
                )}
                {helpTab === 'navigation' && (
                  <div>
                    <h4 className="font-bold text-[#1d2327] mb-1">Navigation Instructions</h4>
                    <p>Click on any left-hand menu item to navigate. Hovering or clicking reveals sub-menus like All Posts, Add New, Categories, and Tags.</p>
                  </div>
                )}
                {helpTab === 'layout' && (
                  <div>
                    <h4 className="font-bold text-[#1d2327] mb-1">Customizing the Screen</h4>
                    <p>Use the Screen Options tab at the top right to customize which widgets and columns are visible.</p>
                  </div>
                )}
                {helpTab === 'content' && (
                  <div>
                    <h4 className="font-bold text-[#1d2327] mb-1">Content Management</h4>
                    <p>Use the Classic WordPress Editor to compose articles and scriptures with instant publishing to the live website.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FLASH NOTICES */}
          {noticeMessage && (
            <div className="bg-white border-l-4 border-[#00a32a] px-4 py-3 shadow-sm rounded-r mb-4 text-xs flex justify-between items-center text-[#1d2327]">
              <span>{noticeMessage}</span>
              <button onClick={() => setNoticeMessage(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* =========================================================================
              VIEW 1: WORDPRESS DASHBOARD HOME
          ========================================================================= */}
          {currentSection === 'dashboard' && (
            <div className="space-y-5">
              {/* Heading */}
              <div className="flex items-center justify-between pb-1">
                <h1 className="text-2xl font-normal text-[#1d2327]">Dashboard</h1>
              </div>

              {/* WELCOME PANEL */}
              {showWelcome && !dismissedNotices['welcome'] && (
                <div className="bg-white border border-[#c3c4c7] p-6 rounded shadow-sm relative">
                  <button
                    onClick={() => setDismissedNotices({ ...dismissedNotices, welcome: true })}
                    className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-xs flex items-center space-x-1"
                  >
                    <span>Dismiss</span>
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <h2 className="text-xl font-normal text-[#1d2327]">
                    Welcome to WordPress Admin Clone — Sanatan Platform!
                  </h2>
                  <p className="text-stone-600 text-xs mt-1">
                    We&apos;ve assembled some links to get you started:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 text-xs">
                    <div>
                      <h3 className="font-bold text-[#1d2327] mb-2">Get Started</h3>
                      <button
                        onClick={() => {
                          setCurrentSection('appearance');
                          setCurrentSubSection('themes');
                        }}
                        className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3.5 py-1.5 rounded font-semibold transition"
                      >
                        Customize Your Site
                      </button>
                      <p className="text-stone-500 text-[11px] mt-2">
                        or,{' '}
                        <button
                          onClick={() => {
                            setCurrentSection('appearance');
                            setCurrentSubSection('themes');
                          }}
                          className="text-[#2271b1] hover:underline"
                        >
                          change your theme completely
                        </button>
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#1d2327] mb-2">Next Steps</h3>
                      <ul className="space-y-1.5 text-[#2271b1]">
                        <li>
                          <button onClick={() => handleOpenPostEditor()} className="hover:underline flex items-center space-x-1">
                            <Pin className="w-3.5 h-3.5 text-stone-500" />
                            <span>Write your first blog post</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setCurrentSection('pages');
                              setCurrentSubSection('add-page');
                            }}
                            className="hover:underline flex items-center space-x-1"
                          >
                            <Layers className="w-3.5 h-3.5 text-stone-500" />
                            <span>Add an About or Temple page</span>
                          </button>
                        </li>
                        <li>
                          <Link href="/" target="_blank" className="hover:underline flex items-center space-x-1">
                            <Eye className="w-3.5 h-3.5 text-stone-500" />
                            <span>View your live website</span>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#1d2327] mb-2">More Actions</h3>
                      <ul className="space-y-1.5 text-[#2271b1]">
                        <li>
                          <button
                            onClick={() => {
                              setCurrentSection('appearance');
                              setCurrentSubSection('widgets');
                            }}
                            className="hover:underline"
                          >
                            Manage widgets or menus
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setCurrentSection('settings');
                              setCurrentSubSection('discussion');
                            }}
                            className="hover:underline"
                          >
                            Turn comments on or off
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setCurrentSection('sanatan');
                              setCurrentSubSection('panchang');
                            }}
                            className="hover:underline"
                          >
                            Configure Panchang & Tithis
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* 2-COLUMN WORDPRESS METABOX GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* LEFT COLUMN */}
                <div className="space-y-5">
                  {/* AT A GLANCE WIDGET */}
                  {showGlance && (
                    <div className="bg-white border border-[#c3c4c7] rounded shadow-sm">
                      <div className="px-4 py-3 border-b border-[#dcdcde] flex items-center justify-between">
                        <h2 className="font-bold text-[#1d2327] text-sm">At a Glance</h2>
                        <button className="text-stone-400 hover:text-stone-600">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4 space-y-3 text-xs">
                        <div className="grid grid-cols-2 gap-2 text-stone-700">
                          <div className="flex items-center space-x-2">
                            <Pin className="w-3.5 h-3.5 text-stone-400" />
                            <button onClick={() => setCurrentSection('posts')} className="text-[#2271b1] hover:underline font-semibold">
                              {articles.length} Posts
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Layers className="w-3.5 h-3.5 text-stone-400" />
                            <button onClick={() => setCurrentSection('pages')} className="text-[#2271b1] hover:underline font-semibold">
                              {pagesList.length} Pages
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <button onClick={() => { setCurrentSection('sanatan'); setCurrentSubSection('shlokas'); }} className="text-[#2271b1] hover:underline font-semibold">
                              {mantras.length} Slokas & Mantras
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Flame className="w-3.5 h-3.5 text-red-500" />
                            <button onClick={() => { setCurrentSection('sanatan'); setCurrentSubSection('live-festival'); }} className="text-[#2271b1] hover:underline font-semibold">
                              🔴 Live Festival Active
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Music className="w-3.5 h-3.5 text-amber-600" />
                            <button onClick={() => { setCurrentSection('sanatan'); setCurrentSubSection('aartis'); }} className="text-[#2271b1] hover:underline font-semibold">
                              {aartisList.length} Aartis
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                            <button onClick={() => { setCurrentSection('sanatan'); setCurrentSubSection('books'); }} className="text-[#2271b1] hover:underline font-semibold">
                              {booksList.length} Spiritual Books
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Package className="w-3.5 h-3.5 text-stone-400" />
                            <button onClick={() => setCurrentSection('products')} className="text-[#2271b1] hover:underline font-semibold">
                              {products.length} Products
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ShoppingBag className="w-3.5 h-3.5 text-stone-400" />
                            <button onClick={() => setCurrentSection('woocommerce')} className="text-[#2271b1] hover:underline font-semibold">
                              {orders.length} Orders
                            </button>
                          </div>
                        </div>
                        <div className="border-t border-[#f0f0f1] pt-3 text-stone-500 text-[11px]">
                          WordPress 6.6.2 running{' '}
                          <button onClick={() => setCurrentSection('appearance')} className="text-[#2271b1] hover:underline font-semibold">
                            Vedic Sanatan Pro
                          </button>{' '}
                          theme. Search engine visibility is active.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACTIVITY WIDGET */}
                  {showActivity && (
                    <div className="bg-white border border-[#c3c4c7] rounded shadow-sm">
                      <div className="px-4 py-3 border-b border-[#dcdcde] flex items-center justify-between">
                        <h2 className="font-bold text-[#1d2327] text-sm">Activity</h2>
                        <button className="text-stone-400 hover:text-stone-600">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4 space-y-4 text-xs">
                        <div>
                          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                            Recently Published
                          </span>
                          <ul className="space-y-1 text-stone-700">
                            {articles.slice(0, 3).map((art) => (
                              <li key={art.id} className="flex justify-between items-center py-1 border-b border-stone-100 last:border-0">
                                <div>
                                  <span className="text-stone-400 text-[11px] mr-2">{art.publishedDate}</span>
                                  <button onClick={() => handleOpenPostEditor(art)} className="text-[#2271b1] hover:underline font-medium">
                                    {art.title}
                                  </button>
                                </div>
                                <span className="text-[10px] text-stone-400">{art.category}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                            Recent Comments
                          </span>
                          <div className="space-y-3">
                            {comments.slice(0, 2).map((c) => (
                              <div key={c.id} className="p-2.5 rounded bg-stone-50 border border-stone-200 text-[12px] space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-[#1d2327]">{c.author}</span>
                                  <span className="text-[10px] text-stone-400">{c.date}</span>
                                </div>
                                <p className="text-stone-600 line-clamp-2 italic">&ldquo;{c.content}&rdquo;</p>
                                <div className="flex space-x-2 text-[11px] pt-1 text-[#2271b1]">
                                  <button onClick={() => { approveComment(c.id); showNotice('Comment approved.'); }} className="hover:underline">Approve</button>
                                  <span>|</span>
                                  <button onClick={() => { spamComment(c.id); showNotice('Marked as spam.'); }} className="text-amber-700 hover:underline">Spam</button>
                                  <span>|</span>
                                  <button onClick={() => { deleteComment(c.id); showNotice('Moved to trash.'); }} className="text-red-600 hover:underline">Trash</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SITE HEALTH STATUS WIDGET */}
                  {showSiteHealth && (
                    <div className="bg-white border border-[#c3c4c7] rounded shadow-sm">
                      <div className="px-4 py-3 border-b border-[#dcdcde] flex items-center justify-between">
                        <h2 className="font-bold text-[#1d2327] text-sm">Site Health Status</h2>
                        <button className="text-stone-400 hover:text-stone-600">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4 space-y-3 text-xs">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-emerald-700 text-xs">
                            Good
                          </div>
                          <div>
                            <p className="font-semibold text-stone-800">Your site&apos;s health is looking good!</p>
                            <p className="text-stone-500 text-[11px]">0 critical issues, 2 recommended improvements detected.</p>
                          </div>
                        </div>
                        <div className="border-t border-[#f0f0f1] pt-2">
                          <button
                            onClick={() => {
                              setCurrentSection('tools');
                              setCurrentSubSection('site-health');
                            }}
                            className="text-[#2271b1] hover:underline font-semibold"
                          >
                            Site Health Screen →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-5">
                  {/* QUICK DRAFT WIDGET */}
                  {showQuickDraft && (
                    <div className="bg-white border border-[#c3c4c7] rounded shadow-sm">
                      <div className="px-4 py-3 border-b border-[#dcdcde] flex items-center justify-between">
                        <h2 className="font-bold text-[#1d2327] text-sm">Quick Draft</h2>
                        <button className="text-stone-400 hover:text-stone-600">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <form onSubmit={handleSaveQuickDraft} className="p-4 space-y-3 text-xs">
                        <div>
                          <label className="block text-stone-700 font-medium mb-1">Title</label>
                          <input
                            type="text"
                            value={quickDraftTitle}
                            onChange={(e) => setQuickDraftTitle(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full border border-[#8c8f94] rounded px-2.5 py-1.5 text-xs focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-700 font-medium mb-1">Content</label>
                          <textarea
                            rows={3}
                            value={quickDraftContent}
                            onChange={(e) => setQuickDraftContent(e.target.value)}
                            placeholder="Write draft content or spiritual revelation..."
                            className="w-full border border-[#8c8f94] rounded px-2.5 py-1.5 text-xs focus:border-[#2271b1] focus:outline-none focus:ring-1 focus:ring-[#2271b1]"
                          />
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <button
                            type="submit"
                            className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1 rounded font-semibold transition"
                          >
                            Save Draft
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentSection('posts')}
                            className="text-[#2271b1] hover:underline"
                          >
                            View all drafts
                          </button>
                        </div>

                        {/* Recent Drafts List */}
                        <div className="border-t border-[#f0f0f1] pt-3">
                          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                            Recent Drafts
                          </span>
                          <ul className="space-y-1.5">
                            {recentDrafts.map((d) => (
                              <li key={d.id} className="text-[11px]">
                                <span className="font-semibold text-stone-800">{d.title}</span>
                                <span className="text-stone-400 block">{d.date}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* WOOCOMMERCE STATUS WIDGET */}
                  {showWooCommerce && (
                    <div className="bg-white border border-[#c3c4c7] rounded shadow-sm">
                      <div className="px-4 py-3 border-b border-[#dcdcde] flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ShoppingBag className="w-4 h-4 text-purple-700" />
                          <h2 className="font-bold text-[#1d2327] text-sm">WooCommerce Status</h2>
                        </div>
                        <button className="text-stone-400 hover:text-stone-600">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4 space-y-3 text-xs">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-2.5 rounded bg-purple-50/50 border border-purple-100">
                            <span className="text-[11px] text-stone-500 block">Net Sales This Month</span>
                            <span className="text-lg font-bold text-purple-900">₹1,24,560</span>
                          </div>
                          <div className="p-2.5 rounded bg-emerald-50/50 border border-emerald-100">
                            <span className="text-[11px] text-stone-500 block">Awaiting Processing</span>
                            <span className="text-lg font-bold text-emerald-800">{orders.length} orders</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-[11px] pt-1">
                          <span className="text-stone-600">Low in stock: 2 items (Rudraksha Mala)</span>
                          <button onClick={() => setCurrentSection('products')} className="text-[#2271b1] hover:underline font-semibold">
                            Manage stock →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SANATAN DHARMA NEWS WIDGET */}
                  {showNews && (
                    <div className="bg-white border border-[#c3c4c7] rounded shadow-sm">
                      <div className="px-4 py-3 border-b border-[#dcdcde] flex items-center justify-between">
                        <h2 className="font-bold text-[#1d2327] text-sm">Sanatan Dharma Platform & Community News</h2>
                        <button className="text-stone-400 hover:text-stone-600">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4 space-y-3 text-xs text-stone-700">
                        <div>
                          <a href="#diwali" className="text-[#2271b1] font-bold hover:underline block">
                            Special Deepotsav 2026 Puja Vidhi & Mantra Updates Released
                          </a>
                          <p className="text-stone-500 text-[11px] mt-0.5">
                            Comprehensive guidelines for Lakshmi-Ganesha pujan with Sanskrit audio recitations.
                          </p>
                        </div>
                        <div>
                          <a href="#gita" className="text-[#2271b1] font-bold hover:underline block">
                            Gita Jayanti 18 Chapters Sanskrit Commentaries Now Searchable
                          </a>
                          <p className="text-stone-500 text-[11px] mt-0.5">
                            Shankaracharya & Ramanujacharya bhasya indexed for all 700 shlokas.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 2: POSTS (ALL POSTS / QUICK EDIT)
          ========================================================================= */}
          {currentSection === 'posts' && (
            <div className="space-y-4">
              {currentSubSection !== 'categories' && currentSubSection !== 'tags' && (
                <>
                  {/* Header with Title and "Add New" Button */}
                  <div className="flex items-center space-x-3 pb-1">
                <h1 className="text-2xl font-normal text-[#1d2327]">Posts</h1>
                <button
                  onClick={() => handleOpenPostEditor()}
                  className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-2.5 py-1 rounded text-xs font-semibold transition"
                >
                  Add New Post
                </button>
              </div>

              {/* Subsubsub Filters (All | Published | Drafts | Trash) */}
              <div className="flex items-center space-x-2 text-xs text-stone-600">
                <button
                  onClick={() => setPostsTab('all')}
                  className={`${postsTab === 'all' ? 'font-bold text-stone-900' : 'text-[#2271b1] hover:underline'}`}
                >
                  All <span className="text-stone-400">({articles.length})</span>
                </button>
                <span>|</span>
                <button
                  onClick={() => setPostsTab('published')}
                  className={`${postsTab === 'published' ? 'font-bold text-stone-900' : 'text-[#2271b1] hover:underline'}`}
                >
                  Published <span className="text-stone-400">({articles.filter((a) => a.status === 'Published').length})</span>
                </button>
                <span>|</span>
                <button
                  onClick={() => setPostsTab('draft')}
                  className={`${postsTab === 'draft' ? 'font-bold text-stone-900' : 'text-[#2271b1] hover:underline'}`}
                >
                  Drafts <span className="text-stone-400">({articles.filter((a) => a.status === 'Draft').length + recentDrafts.length})</span>
                </button>
              </div>

              {/* Filter Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs bg-white p-2.5 border border-[#c3c4c7] rounded">
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <select className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white">
                    <option>Bulk actions</option>
                    <option>Edit</option>
                    <option>Move to Trash</option>
                  </select>
                  <button className="bg-[#f6f7f7] border border-[#8c8f94] px-2 py-1 rounded hover:bg-stone-100 font-medium">
                    Apply
                  </button>

                  <select
                    value={postCategoryFilter}
                    onChange={(e) => setPostCategoryFilter(e.target.value)}
                    className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white hidden md:block"
                  >
                    <option value="all">All Categories</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Rituals">Rituals</option>
                    <option value="Meditation">Meditation</option>
                    <option value="Festivals">Festivals</option>
                  </select>

                  <button className="bg-[#f6f7f7] border border-[#8c8f94] px-2 py-1 rounded hover:bg-stone-100 font-medium hidden md:block">
                    Filter
                  </button>
                </div>

                {/* Search */}
                <div className="flex items-center space-x-1 w-full sm:w-auto justify-end">
                  <input
                    type="text"
                    value={postSearch}
                    onChange={(e) => setPostSearch(e.target.value)}
                    placeholder="Search Posts..."
                    className="border border-[#8c8f94] rounded px-2 py-1 text-xs w-full sm:w-48 focus:border-[#2271b1] focus:outline-none"
                  />
                  <button className="bg-[#f6f7f7] border border-[#8c8f94] px-2.5 py-1 rounded hover:bg-stone-100 font-medium">
                    Search
                  </button>
                </div>
              </div>

              {/* CLASSIC WORDPRESS POSTS TABLE */}
              <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                      <th className="p-2.5 w-8">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPostIds(articles.map((a) => a.id));
                            } else {
                              setSelectedPostIds([]);
                            }
                          }}
                          checked={selectedPostIds.length === articles.length && articles.length > 0}
                          className="rounded border-[#8c8f94]"
                        />
                      </th>
                      <th className="p-2.5 font-bold">Title</th>
                      <th className="p-2.5 font-bold">Author</th>
                      <th className="p-2.5 font-bold">Categories</th>
                      <th className="p-2.5 font-bold">Tags</th>
                      <th className="p-2.5 font-bold text-center">
                        <MessageSquare className="w-3.5 h-3.5 mx-auto" />
                      </th>
                      <th className="p-2.5 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dcdcde]">
                    {articles
                      .filter((a) => {
                        if (postsTab === 'published') return a.status === 'Published';
                        if (postsTab === 'draft') return a.status === 'Draft';
                        return true;
                      })
                      .filter((a) => (postCategoryFilter === 'all' ? true : a.category === postCategoryFilter))
                      .filter((a) => (postSearch ? a.title.toLowerCase().includes(postSearch.toLowerCase()) : true))
                      .map((post) => {
                        const isSelected = selectedPostIds.includes(post.id);
                        const isQuickEditing = quickEditPostId === post.id;
                        return (
                          <React.Fragment key={post.id}>
                            <tr className="hover:bg-amber-50/40 group">
                              <td className="p-2.5">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {
                                    if (isSelected) {
                                      setSelectedPostIds(selectedPostIds.filter((id) => id !== post.id));
                                    } else {
                                      setSelectedPostIds([...selectedPostIds, post.id]);
                                    }
                                  }}
                                  className="rounded border-[#8c8f94]"
                                />
                              </td>
                              <td className="p-2.5 font-medium">
                                <button
                                  onClick={() => handleOpenPostEditor(post)}
                                  className="text-[#2271b1] hover:underline font-semibold block text-left"
                                >
                                  {post.title}
                                </button>
                                {/* Hover Row Actions */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 text-[11px] text-[#2271b1] mt-0.5">
                                  <button onClick={() => handleOpenPostEditor(post)} className="hover:underline">
                                    Edit
                                  </button>
                                  <span>|</span>
                                  <button
                                    onClick={() => {
                                      setQuickEditPostId(post.id);
                                      setQuickEditData({
                                        title: post.title,
                                        slug: post.slug,
                                        category: post.category,
                                        status: post.status,
                                      });
                                    }}
                                    className="hover:underline"
                                  >
                                    Quick Edit
                                  </button>
                                  <span>|</span>
                                  <button
                                    onClick={() => {
                                      deleteArticle(post.id);
                                      showNotice(`Post "${post.title}" moved to trash.`);
                                    }}
                                    className="text-red-600 hover:underline"
                                  >
                                    Trash
                                  </button>
                                  <span>|</span>
                                  <Link href={`/articles/${post.slug}`} target="_blank" className="hover:underline">
                                    View
                                  </Link>
                                </div>
                              </td>
                              <td className="p-2.5 text-stone-600">{post.author}</td>
                              <td className="p-2.5 text-[#2271b1] hover:underline cursor-pointer">{post.category}</td>
                              <td className="p-2.5 text-stone-500">—</td>
                              <td className="p-2.5 text-center">
                                <span className="bg-[#2271b1] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                                  2
                                </span>
                              </td>
                              <td className="p-2.5 text-stone-600">
                                <span className="block font-medium">{post.status}</span>
                                <span className="text-[11px] text-stone-400">{post.publishedDate}</span>
                              </td>
                            </tr>

                            {/* INLINE QUICK EDIT ROW */}
                            {isQuickEditing && (
                              <tr className="bg-[#f6f7f7] border-y-2 border-[#2271b1]">
                                <td colSpan={7} className="p-4">
                                  <div className="space-y-3">
                                    <h4 className="font-bold text-[#1d2327] uppercase text-[11px]">Quick Edit</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      <div>
                                        <label className="block text-stone-700 font-medium mb-1">Title</label>
                                        <input
                                          type="text"
                                          value={quickEditData.title}
                                          onChange={(e) => setQuickEditData({ ...quickEditData, title: e.target.value })}
                                          className="w-full border border-[#8c8f94] rounded px-2.5 py-1 text-xs bg-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-stone-700 font-medium mb-1">Slug</label>
                                        <input
                                          type="text"
                                          value={quickEditData.slug}
                                          onChange={(e) => setQuickEditData({ ...quickEditData, slug: e.target.value })}
                                          className="w-full border border-[#8c8f94] rounded px-2.5 py-1 text-xs bg-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-stone-700 font-medium mb-1">Category</label>
                                        <select
                                          value={quickEditData.category}
                                          onChange={(e) => setQuickEditData({ ...quickEditData, category: e.target.value })}
                                          className="w-full border border-[#8c8f94] rounded px-2.5 py-1 text-xs bg-white"
                                        >
                                          <option value="Philosophy">Philosophy</option>
                                          <option value="Rituals">Rituals</option>
                                          <option value="Meditation">Meditation</option>
                                          <option value="Festivals">Festivals</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                      <button
                                        onClick={() => setQuickEditPostId(null)}
                                        className="bg-[#f6f7f7] border border-[#8c8f94] px-3 py-1 rounded text-xs hover:bg-stone-200"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={() => handleSaveQuickEdit(post.id)}
                                        className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1 rounded text-xs font-semibold"
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          )}

            {/* =========================================================================
                POSTS: CATEGORIES SUB-SECTION
            ========================================================================= */}
            {currentSubSection === 'categories' && (
              <div className="space-y-4">
                <h1 className="text-2xl font-normal text-[#1d2327]">Categories</h1>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Column: Add New Category */}
                  <div className="md:col-span-5 bg-white border border-[#c3c4c7] p-5 rounded shadow-sm space-y-4 text-xs">
                    <h2 className="font-bold text-[#1d2327] text-sm">Add New Category</h2>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">Name</label>
                      <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        placeholder="e.g. Upanishads"
                        className="w-full border border-[#8c8f94] rounded px-2.5 py-1.5 focus:border-[#2271b1] focus:outline-none"
                      />
                      <p className="text-stone-500 text-[11px] mt-1">The name is how it appears on your site.</p>
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">Slug</label>
                      <input
                        type="text"
                        value={newCategory.slug}
                        onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                        placeholder="e.g. upanishads"
                        className="w-full border border-[#8c8f94] rounded px-2.5 py-1.5 focus:border-[#2271b1] focus:outline-none"
                      />
                      <p className="text-stone-500 text-[11px] mt-1">The &ldquo;slug&rdquo; is the URL-friendly version of the name.</p>
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">Description</label>
                      <textarea
                        rows={4}
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        placeholder="Description of the category..."
                        className="w-full border border-[#8c8f94] rounded px-2.5 py-1.5 focus:border-[#2271b1] focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (!newCategory.name) return;
                        setCategoriesList([
                          ...categoriesList,
                          {
                            id: `c-${Date.now()}`,
                            name: newCategory.name,
                            slug: newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, '-'),
                            description: newCategory.description,
                            count: 0,
                          },
                        ]);
                        setNewCategory({ name: '', slug: '', description: '' });
                        showNotice(`Category "${newCategory.name}" added.`);
                      }}
                      className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3.5 py-1.5 rounded font-semibold transition"
                    >
                      Add New Category
                    </button>
                  </div>

                  {/* Right Column: Categories Table */}
                  <div className="md:col-span-7 bg-white border border-[#c3c4c7] rounded overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                          <th className="p-2.5 w-8"><input type="checkbox" className="rounded border-[#8c8f94]" /></th>
                          <th className="p-2.5 font-bold">Name</th>
                          <th className="p-2.5 font-bold">Description</th>
                          <th className="p-2.5 font-bold">Slug</th>
                          <th className="p-2.5 font-bold text-center">Count</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#dcdcde]">
                        {categoriesList.map((cat) => (
                          <tr key={cat.id} className="hover:bg-amber-50/40 group">
                            <td className="p-2.5"><input type="checkbox" className="rounded border-[#8c8f94]" /></td>
                            <td className="p-2.5 font-semibold text-[#2271b1]">
                              {cat.name}
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 text-[11px] text-[#2271b1] mt-0.5 font-normal">
                                <button className="hover:underline">Edit</button>
                                <span>|</span>
                                <button
                                  onClick={() => {
                                    setCategoriesList(categoriesList.filter((c) => c.id !== cat.id));
                                    showNotice(`Category "${cat.name}" deleted.`);
                                  }}
                                  className="text-red-600 hover:underline"
                                >
                                  Delete
                                </button>
                                <span>|</span>
                                <button className="hover:underline">View</button>
                              </div>
                            </td>
                            <td className="p-2.5 text-stone-600">{cat.description}</td>
                            <td className="p-2.5 text-stone-500">{cat.slug}</td>
                            <td className="p-2.5 text-center font-bold text-[#2271b1]">{cat.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                POSTS: TAGS SUB-SECTION
            ========================================================================= */}
            {currentSubSection === 'tags' && (
              <div className="space-y-4">
                <h1 className="text-2xl font-normal text-[#1d2327]">Tags</h1>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Column: Add New Tag */}
                  <div className="md:col-span-5 bg-white border border-[#c3c4c7] p-5 rounded shadow-sm space-y-4 text-xs">
                    <h2 className="font-bold text-[#1d2327] text-sm">Add New Tag</h2>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">Name</label>
                      <input
                        type="text"
                        value={newTag.name}
                        onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                        placeholder="e.g. Advaita"
                        className="w-full border border-[#8c8f94] rounded px-2.5 py-1.5 focus:border-[#2271b1] focus:outline-none"
                      />
                      <p className="text-stone-500 text-[11px] mt-1">The name is how it appears on your site.</p>
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">Slug</label>
                      <input
                        type="text"
                        value={newTag.slug}
                        onChange={(e) => setNewTag({ ...newTag, slug: e.target.value })}
                        placeholder="e.g. advaita"
                        className="w-full border border-[#8c8f94] rounded px-2.5 py-1.5 focus:border-[#2271b1] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-800 mb-1">Description</label>
                      <textarea
                        rows={4}
                        value={newTag.description}
                        onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
                        placeholder="Description of the tag..."
                        className="w-full border border-[#8c8f94] rounded px-2.5 py-1.5 focus:border-[#2271b1] focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (!newTag.name) return;
                        setTagsList([
                          ...tagsList,
                          {
                            id: `t-${Date.now()}`,
                            name: newTag.name,
                            slug: newTag.slug || newTag.name.toLowerCase().replace(/\s+/g, '-'),
                            description: newTag.description,
                            count: 0,
                          },
                        ]);
                        setNewTag({ name: '', slug: '', description: '' });
                        showNotice(`Tag "${newTag.name}" added.`);
                      }}
                      className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3.5 py-1.5 rounded font-semibold transition"
                    >
                      Add New Tag
                    </button>
                  </div>

                  {/* Right Column: Tags Table */}
                  <div className="md:col-span-7 bg-white border border-[#c3c4c7] rounded overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                          <th className="p-2.5 w-8"><input type="checkbox" className="rounded border-[#8c8f94]" /></th>
                          <th className="p-2.5 font-bold">Name</th>
                          <th className="p-2.5 font-bold">Description</th>
                          <th className="p-2.5 font-bold">Slug</th>
                          <th className="p-2.5 font-bold text-center">Count</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#dcdcde]">
                        {tagsList.map((tag) => (
                          <tr key={tag.id} className="hover:bg-amber-50/40 group">
                            <td className="p-2.5"><input type="checkbox" className="rounded border-[#8c8f94]" /></td>
                            <td className="p-2.5 font-semibold text-[#2271b1]">
                              {tag.name}
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 text-[11px] text-[#2271b1] mt-0.5 font-normal">
                                <button className="hover:underline">Edit</button>
                                <span>|</span>
                                <button
                                  onClick={() => {
                                    setTagsList(tagsList.filter((t) => t.id !== tag.id));
                                    showNotice(`Tag "${tag.name}" deleted.`);
                                  }}
                                  className="text-red-600 hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                            <td className="p-2.5 text-stone-600">{tag.description}</td>
                            <td className="p-2.5 text-stone-500">{tag.slug}</td>
                            <td className="p-2.5 text-center font-bold text-[#2271b1]">{tag.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          )}

          {/* =========================================================================
              VIEW 3: MEDIA LIBRARY
          ========================================================================= */}
          {currentSection === 'media' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-normal text-[#1d2327]">Media Library</h1>
                  <button className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-2.5 py-1 rounded text-xs font-semibold">
                    Add New Media File
                  </button>
                </div>

                {/* Grid / List view toggle */}
                <div className="flex items-center space-x-1 border border-[#8c8f94] rounded bg-white p-0.5">
                  <button
                    onClick={() => setMediaViewMode('grid')}
                    className={`p-1 rounded ${mediaViewMode === 'grid' ? 'bg-[#2271b1] text-white' : 'text-stone-600 hover:bg-stone-100'}`}
                    title="Grid View"
                  >
                    <Folder className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setMediaViewMode('list')}
                    className={`p-1 rounded ${mediaViewMode === 'list' ? 'bg-[#2271b1] text-white' : 'text-stone-600 hover:bg-stone-100'}`}
                    title="List View"
                  >
                    <Layers className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs bg-white p-2.5 border border-[#c3c4c7] rounded">
                <div className="flex items-center space-x-2">
                  <select
                    value={mediaTypeFilter}
                    onChange={(e) => setMediaTypeFilter(e.target.value)}
                    className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white"
                  >
                    <option value="all">All media items</option>
                    <option value="images">Images</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                  </select>
                  <select className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white">
                    <option>All dates</option>
                    <option>September 2026</option>
                  </select>
                  <button className="bg-[#f6f7f7] border border-[#8c8f94] px-2 py-1 rounded hover:bg-stone-100 font-medium">
                    Filter
                  </button>
                </div>
                <div className="flex items-center space-x-1 w-full sm:w-auto">
                  <input
                    type="text"
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    placeholder="Search media..."
                    className="border border-[#8c8f94] rounded px-2 py-1 text-xs w-full sm:w-48 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              {/* MEDIA GRID DISPLAY */}
              {mediaViewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {mediaItems.map((media) => (
                    <div
                      key={media.id}
                      onClick={() => setSelectedMedia(media)}
                      className="bg-white border border-[#c3c4c7] rounded overflow-hidden shadow-sm group hover:border-[#2271b1] transition flex flex-col cursor-pointer"
                    >
                      <div className="relative aspect-square bg-stone-100 overflow-hidden">
                        <Image
                          src={media.url}
                          alt={media.title}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <div className="p-2 text-[11px] bg-white">
                        <span className="font-semibold text-stone-800 truncate block">{media.title}</span>
                        <span className="text-stone-400 text-[10px] block">{media.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* MEDIA LIST DISPLAY */
                <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                        <th className="p-2.5 w-12">File</th>
                        <th className="p-2.5 font-bold">Title</th>
                        <th className="p-2.5 font-bold">Author</th>
                        <th className="p-2.5 font-bold">Uploaded to</th>
                        <th className="p-2.5 font-bold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {mediaItems.map((media) => (
                        <tr
                          key={media.id}
                          onClick={() => setSelectedMedia(media)}
                          className="hover:bg-amber-50/40 cursor-pointer"
                        >
                          <td className="p-2.5">
                            <div className="w-10 h-10 relative rounded overflow-hidden bg-stone-100">
                              <Image src={media.url} alt={media.title} fill className="object-cover" />
                            </div>
                          </td>
                          <td className="p-2.5 font-semibold text-[#2271b1] hover:underline">
                            {media.title}
                          </td>
                          <td className="p-2.5 text-stone-600">Acharya Vidyadhar</td>
                          <td className="p-2.5 text-stone-500">—</td>
                          <td className="p-2.5 text-stone-500">{media.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* MEDIA ATTACHMENT DETAILS MODAL */}
              {selectedMedia && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-3xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]">
                    <div className="w-full md:w-1/2 bg-stone-100 relative min-h-[260px] flex items-center justify-center p-4">
                      <Image
                        src={selectedMedia.url}
                        alt={selectedMedia.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-5 text-xs space-y-3 overflow-y-auto">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[#1d2327] text-sm">{selectedMedia.title}</h3>
                          <span className="text-stone-400 text-[11px] block">{selectedMedia.file}</span>
                        </div>
                        <button onClick={() => setSelectedMedia(null)} className="text-stone-400 hover:text-stone-700">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 border-y border-[#dcdcde] py-2 space-y-1">
                        <div>Uploaded on: <span className="text-stone-800 font-medium">{selectedMedia.date}</span></div>
                        <div>File size: <span className="text-stone-800 font-medium">{selectedMedia.size}</span></div>
                        <div>Dimensions: <span className="text-stone-800 font-medium">{selectedMedia.dimensions || '1200 × 800'}</span></div>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-bold mb-1">Alt Text</label>
                        <input
                          type="text"
                          defaultValue={selectedMedia.title}
                          className="w-full border border-[#8c8f94] rounded px-2.5 py-1 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-700 font-bold mb-1">File URL</label>
                        <input
                          type="text"
                          readOnly
                          value={selectedMedia.url}
                          className="w-full border border-[#8c8f94] rounded px-2.5 py-1 text-xs bg-stone-50"
                        />
                      </div>

                      <div className="pt-2 flex justify-between items-center">
                        <button
                          onClick={() => {
                            setSelectedMedia(null);
                            showNotice('Media item deleted.');
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Delete permanently
                        </button>
                        <button
                          onClick={() => setSelectedMedia(null)}
                          className="bg-[#2271b1] text-white px-3 py-1 rounded font-semibold"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW: PAGES (ALL PAGES / ADD NEW PAGE)
          ========================================================================= */}
          {currentSection === 'pages' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-1">
                <h1 className="text-2xl font-normal text-[#1d2327]">Pages</h1>
                <button
                  onClick={() => {
                    setEditingPageId(null);
                    setPageForm({ title: '', slug: '', content: '', status: 'Published' });
                    setPageModalOpen(true);
                  }}
                  className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-2.5 py-1 rounded text-xs font-semibold"
                >
                  Add New Page
                </button>
              </div>

              {/* Subsubsub Filters */}
              <div className="flex items-center space-x-2 text-xs text-stone-600">
                <button className="font-bold text-stone-900">
                  All <span className="text-stone-400">({pagesList.length})</span>
                </button>
                <span>|</span>
                <button className="text-[#2271b1] hover:underline">
                  Published <span className="text-stone-400">({pagesList.filter((p) => p.status === 'Published').length})</span>
                </button>
                <span>|</span>
                <button className="text-[#2271b1] hover:underline">
                  Drafts <span className="text-stone-400">({pagesList.filter((p) => p.status === 'Draft').length})</span>
                </button>
              </div>

              {/* Filter Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs bg-white p-2.5 border border-[#c3c4c7] rounded">
                <div className="flex items-center space-x-2">
                  <select className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white">
                    <option>Bulk actions</option>
                    <option>Edit</option>
                    <option>Move to Trash</option>
                  </select>
                  <button className="bg-[#f6f7f7] border border-[#8c8f94] px-2 py-1 rounded hover:bg-stone-100 font-medium">
                    Apply
                  </button>
                  <select className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white hidden md:block">
                    <option>All dates</option>
                    <option>September 2026</option>
                  </select>
                  <button className="bg-[#f6f7f7] border border-[#8c8f94] px-2 py-1 rounded hover:bg-stone-100 font-medium hidden md:block">
                    Filter
                  </button>
                </div>
                <div className="flex items-center space-x-1 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search Pages..."
                    className="border border-[#8c8f94] rounded px-2 py-1 text-xs w-full sm:w-48 focus:border-[#2271b1] focus:outline-none"
                  />
                  <button className="bg-[#f6f7f7] border border-[#8c8f94] px-2.5 py-1 rounded hover:bg-stone-100 font-medium">
                    Search
                  </button>
                </div>
              </div>

              {/* Pages Table */}
              <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                      <th className="p-2.5 w-8">
                        <input type="checkbox" className="rounded border-[#8c8f94]" />
                      </th>
                      <th className="p-2.5 font-bold">Title</th>
                      <th className="p-2.5 font-bold">Author</th>
                      <th className="p-2.5 font-bold text-center">
                        <MessageSquare className="w-3.5 h-3.5 mx-auto" />
                      </th>
                      <th className="p-2.5 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dcdcde]">
                    {pagesList.map((page) => (
                      <tr key={page.id} className="hover:bg-amber-50/40 group">
                        <td className="p-2.5">
                          <input type="checkbox" className="rounded border-[#8c8f94]" />
                        </td>
                        <td className="p-2.5 font-medium">
                          <button
                            onClick={() => {
                              setEditingPageId(page.id);
                              setPageForm({ title: page.title, slug: page.slug, content: `Content for ${page.title}`, status: page.status });
                              setPageModalOpen(true);
                            }}
                            className="text-[#2271b1] hover:underline font-semibold text-left"
                          >
                            {page.title}
                          </button>
                          {page.isFrontPage && (
                            <span className="ml-1.5 text-stone-500 font-normal">— Front Page</span>
                          )}
                          {page.isPrivacyPage && (
                            <span className="ml-1.5 text-stone-500 font-normal">— Privacy Policy Page</span>
                          )}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 text-[11px] text-[#2271b1] mt-0.5 font-normal">
                            <button
                              onClick={() => {
                                setEditingPageId(page.id);
                                setPageForm({ title: page.title, slug: page.slug, content: `Content for ${page.title}`, status: page.status });
                                setPageModalOpen(true);
                              }}
                              className="hover:underline"
                            >
                              Edit
                            </button>
                            <span>|</span>
                            <button
                              onClick={() => {
                                setPagesList(pagesList.filter((p) => p.id !== page.id));
                                showNotice(`Page "${page.title}" moved to trash.`);
                              }}
                              className="text-red-600 hover:underline"
                            >
                              Trash
                            </button>
                            <span>|</span>
                            <Link href={`/${page.slug}`} target="_blank" className="hover:underline">
                              View
                            </Link>
                          </div>
                        </td>
                        <td className="p-2.5 text-stone-600">{page.author}</td>
                        <td className="p-2.5 text-center text-stone-400">—</td>
                        <td className="p-2.5 text-stone-500">
                          <span className="block font-medium">{page.status}</span>
                          <span className="text-[11px] text-stone-400">{page.date}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW: COMMENTS (MODERATION QUEUE)
          ========================================================================= */}
          {currentSection === 'comments' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-1">
                <h1 className="text-2xl font-normal text-[#1d2327]">Comments</h1>
              </div>

              {/* Subsubsub Filters */}
              <div className="flex items-center space-x-2 text-xs text-stone-600">
                <button className="font-bold text-stone-900">
                  All <span className="text-stone-400">({comments.length})</span>
                </button>
                <span>|</span>
                <button className="text-[#2271b1] hover:underline">
                  Pending <span className="text-stone-400">({comments.filter((c) => c.status === 'Pending').length})</span>
                </button>
                <span>|</span>
                <button className="text-[#2271b1] hover:underline">
                  Approved <span className="text-stone-400">({comments.filter((c) => c.status === 'Approved').length})</span>
                </button>
                <span>|</span>
                <button className="text-[#2271b1] hover:underline">
                  Spam <span className="text-stone-400">({comments.filter((c) => c.status === 'Spam').length})</span>
                </button>
              </div>

              {/* Filter Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs bg-white p-2.5 border border-[#c3c4c7] rounded">
                <div className="flex items-center space-x-2">
                  <select className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white">
                    <option>Bulk actions</option>
                    <option>Approve</option>
                    <option>Mark as Spam</option>
                    <option>Move to Trash</option>
                  </select>
                  <button className="bg-[#f6f7f7] border border-[#8c8f94] px-2 py-1 rounded hover:bg-stone-100 font-medium">
                    Apply
                  </button>
                  <select className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white hidden md:block">
                    <option>All comment types</option>
                    <option>Comments</option>
                    <option>Pings</option>
                  </select>
                  <button className="bg-[#f6f7f7] border border-[#8c8f94] px-2 py-1 rounded hover:bg-stone-100 font-medium hidden md:block">
                    Filter
                  </button>
                </div>
                <div className="flex items-center space-x-1 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search Comments..."
                    className="border border-[#8c8f94] rounded px-2 py-1 text-xs w-full sm:w-48 focus:border-[#2271b1] focus:outline-none"
                  />
                  <button className="bg-[#f6f7f7] border border-[#8c8f94] px-2.5 py-1 rounded hover:bg-stone-100 font-medium">
                    Search
                  </button>
                </div>
              </div>

              {/* Comments Table */}
              <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                      <th className="p-2.5 w-8">
                        <input type="checkbox" className="rounded border-[#8c8f94]" />
                      </th>
                      <th className="p-2.5 font-bold w-48">Author</th>
                      <th className="p-2.5 font-bold">Comment</th>
                      <th className="p-2.5 font-bold w-48">In response to</th>
                      <th className="p-2.5 font-bold w-32">Submitted on</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dcdcde]">
                    {comments.map((comment) => (
                      <tr key={comment.id} className="hover:bg-amber-50/40 group">
                        <td className="p-2.5 align-top">
                          <input type="checkbox" className="rounded border-[#8c8f94]" />
                        </td>
                        <td className="p-2.5 align-top space-y-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded bg-gradient-to-tr from-amber-600 to-orange-500 text-white font-bold flex items-center justify-center text-xs">
                              {comment.author[0]}
                            </div>
                            <div>
                              <span className="font-bold text-stone-900 block">{comment.author}</span>
                              <span className="text-[11px] text-[#2271b1] hover:underline cursor-pointer">devotee@sanatan.org</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-2.5 align-top space-y-1.5">
                          <p className="text-stone-800 leading-relaxed">{comment.content}</p>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 text-[11px] text-[#2271b1] font-semibold">
                            <button
                              onClick={() => {
                                approveComment(comment.id);
                                showNotice('Comment approved.');
                              }}
                              className="hover:underline"
                            >
                              Approve
                            </button>
                            <span>|</span>
                            <button
                              onClick={() => showNotice('Reply opened.')}
                              className="hover:underline"
                            >
                              Reply
                            </button>
                            <span>|</span>
                            <button
                              onClick={() => {
                                spamComment(comment.id);
                                showNotice('Comment marked as spam.');
                              }}
                              className="text-amber-700 hover:underline"
                            >
                              Spam
                            </button>
                            <span>|</span>
                            <button
                              onClick={() => {
                                deleteComment(comment.id);
                                showNotice('Comment moved to trash.');
                              }}
                              className="text-red-600 hover:underline"
                            >
                              Trash
                            </button>
                          </div>
                        </td>
                        <td className="p-2.5 align-top text-stone-600">
                          <span className="font-semibold text-[#2271b1] hover:underline cursor-pointer block">
                            {comment.entityTitle}
                          </span>
                          <span className="text-[11px] text-stone-400 block mt-0.5">View Post</span>
                        </td>
                        <td className="p-2.5 align-top text-stone-500 text-[11px]">
                          {comment.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 4: WOOCOMMERCE / PRODUCTS
          ========================================================================= */}
          {currentSection === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-1">
                <h1 className="text-2xl font-normal text-[#1d2327]">Products</h1>
                <button
                  onClick={() => setProductModalOpen(true)}
                  className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-2.5 py-1 rounded text-xs font-semibold"
                >
                  Add Product
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                      <th className="p-2.5 w-8">
                        <input type="checkbox" className="rounded border-[#8c8f94]" />
                      </th>
                      <th className="p-2.5 w-12">Image</th>
                      <th className="p-2.5 font-bold">Name</th>
                      <th className="p-2.5 font-bold">SKU</th>
                      <th className="p-2.5 font-bold">Stock</th>
                      <th className="p-2.5 font-bold">Price</th>
                      <th className="p-2.5 font-bold">Categories</th>
                      <th className="p-2.5 font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dcdcde]">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-amber-50/40 group">
                        <td className="p-2.5">
                          <input type="checkbox" className="rounded border-[#8c8f94]" />
                        </td>
                        <td className="p-2.5">
                          <div className="w-10 h-10 relative rounded overflow-hidden bg-stone-100">
                            <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                          </div>
                        </td>
                        <td className="p-2.5 font-semibold text-[#2271b1] hover:underline cursor-pointer">
                          {prod.name}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 text-[11px] text-[#2271b1] mt-0.5 font-normal">
                            <button className="hover:underline">Edit</button>
                            <span>|</span>
                            <button onClick={() => deleteProduct(prod.id)} className="text-red-600 hover:underline">Trash</button>
                            <span>|</span>
                            <button className="hover:underline">View</button>
                          </div>
                        </td>
                        <td className="p-2.5 text-stone-500">{prod.sku}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            prod.stockStatus === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {prod.stockStatus} ({prod.stock})
                          </span>
                        </td>
                        <td className="p-2.5 font-bold text-stone-900">
                          ₹{prod.salePrice || prod.price}
                        </td>
                        <td className="p-2.5 text-[#2271b1]">{prod.category}</td>
                        <td className="p-2.5 text-stone-500">Published</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 5: WOOCOMMERCE / ORDERS
          ========================================================================= */}
          {currentSection === 'woocommerce' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h1 className="text-2xl font-normal text-[#1d2327]">Orders</h1>
                <span className="text-xs text-stone-500">{orders.length} orders total</span>
              </div>

              <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                      <th className="p-2.5 w-8">
                        <input type="checkbox" className="rounded border-[#8c8f94]" />
                      </th>
                      <th className="p-2.5 font-bold">Order</th>
                      <th className="p-2.5 font-bold">Date</th>
                      <th className="p-2.5 font-bold">Status</th>
                      <th className="p-2.5 font-bold">Billing</th>
                      <th className="p-2.5 font-bold">Items</th>
                      <th className="p-2.5 font-bold">Total</th>
                      <th className="p-2.5 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dcdcde]">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-amber-50/40">
                        <td className="p-2.5">
                          <input type="checkbox" className="rounded border-[#8c8f94]" />
                        </td>
                        <td className="p-2.5 font-bold text-[#2271b1] hover:underline cursor-pointer">
                          #{order.orderNumber}
                        </td>
                        <td className="p-2.5 text-stone-500">{order.date}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            order.fulfillmentStatus === 'Processing'
                              ? 'bg-amber-100 text-amber-800'
                              : order.fulfillmentStatus === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.fulfillmentStatus}
                          </span>
                        </td>
                        <td className="p-2.5 text-stone-700">
                          <span className="font-semibold block">{order.customerName}</span>
                          <span className="text-stone-400 text-[11px]">{order.customerEmail}</span>
                        </td>
                        <td className="p-2.5 text-stone-600">{order.items}</td>
                        <td className="p-2.5 font-bold text-stone-900">₹{order.total}</td>
                        <td className="p-2.5">
                          <select
                            value={order.fulfillmentStatus}
                            onChange={(e: any) => {
                              updateOrderStatus(order.id, e.target.value);
                              showNotice(`Order #${order.orderNumber} status updated.`);
                            }}
                            className="border border-[#8c8f94] rounded px-1.5 py-0.5 text-xs bg-white"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 6: SANATAN DHARMA (LIVE FESTIVAL / SLOKAS / AARTIS / KATHAS / BOOKS / VIBRATIONS)
          ========================================================================= */}
          {currentSection === 'sanatan' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h1 className="text-2xl font-normal text-[#1d2327]">
                  Sanatan Dharma —{' '}
                  {currentSubSection === 'live-festival'
                    ? 'Live Festival Today'
                    : currentSubSection === 'aartis'
                    ? 'Aarti Sangrah'
                    : currentSubSection === 'kathas'
                    ? 'Vrat & Pauranik Kathas'
                    : currentSubSection === 'books'
                    ? 'Spiritual Books Library'
                    : currentSubSection === 'divine-vibrations'
                    ? 'Divine Vibrations'
                    : 'Slokas & Mantras'}
                </h1>

                {/* Quick Add Buttons based on active subtab */}
                {currentSubSection === 'aartis' && (
                  <button
                    onClick={() => {
                      const newAarti = {
                        id: `art-${Date.now()}`,
                        titleHi: 'नई आरती (New Aarti)',
                        deity: 'श्री गणेश',
                        lyricsPreview: 'आरती कीजै...',
                        audio: 'om_namah_shivaya.wav',
                        status: 'Published',
                      };
                      setAartisList([newAarti, ...aartisList]);
                      showNotice('New Aarti added to Aarti Sangrah.');
                    }}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Aarti</span>
                  </button>
                )}

                {currentSubSection === 'kathas' && (
                  <button
                    onClick={() => {
                      const newKatha = {
                        id: `kth-${Date.now()}`,
                        titleHi: 'नई व्रत कथा (New Vrat Katha)',
                        deity: 'भगवान शिव',
                        dayOrTithi: 'सोमवार',
                        chaptersCount: 1,
                        status: 'Published',
                      };
                      setKathasList([newKatha, ...kathasList]);
                      showNotice('New Katha added to Vrat Kathas.');
                    }}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Katha</span>
                  </button>
                )}

                {currentSubSection === 'books' && (
                  <button
                    onClick={() => {
                      const newBook = {
                        id: `bk-${Date.now()}`,
                        titleHi: 'नया शास्त्र / ग्रंथ (New Scripture)',
                        category: 'दर्शन एवं नीति',
                        author: 'सनातन ऋषि',
                        verses: '१०० श्लोक',
                        colorCode: '#FF9933',
                        status: 'Published',
                      };
                      setBooksList([newBook, ...booksList]);
                      showNotice('New Spiritual Book added to Library (#FF9933 Saffron).');
                    }}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Book</span>
                  </button>
                )}

                {(currentSubSection === 'shlokas' || currentSubSection === 'mantras') && (
                  <button
                    onClick={() => setMantraModalOpen(true)}
                    className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-2.5 py-1 rounded text-xs font-semibold"
                  >
                    Add New Mantra
                  </button>
                )}
              </div>

              {/* Subtabs for Sanatan Content */}
              <div className="flex border-b border-[#c3c4c7] text-xs overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setCurrentSubSection('live-festival')}
                  className={`px-4 py-2 border-b-2 font-medium flex items-center space-x-1.5 whitespace-nowrap ${
                    currentSubSection === 'live-festival'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Live Festival Today</span>
                </button>
                <button
                  onClick={() => setCurrentSubSection('shlokas')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'shlokas' || currentSubSection === 'mantras'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Slokas & Mantras ({mantras.length})
                </button>
                <button
                  onClick={() => setCurrentSubSection('aartis')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'aartis'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Aarti Sangrah ({aartisList.length})
                </button>
                <button
                  onClick={() => setCurrentSubSection('kathas')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'kathas'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Vrat Kathas ({kathasList.length})
                </button>
                <button
                  onClick={() => setCurrentSubSection('books')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'books'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Spiritual Books ({booksList.length})
                </button>
                <button
                  onClick={() => setCurrentSubSection('divine-vibrations')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'divine-vibrations'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Divine Vibrations ({divineVibrations.tracks.length})
                </button>
              </div>

              {/* 1. LIVE FESTIVAL MANAGER */}
              {currentSubSection === 'live-festival' && (
                <div className="bg-white border border-[#c3c4c7] rounded p-6 shadow-sm space-y-6 text-xs">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
                        <Flame className="w-4 h-4 text-red-600" />
                        <span>Home Page Live Festival Banner & Devotion Controls</span>
                      </h3>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        Manage today's active festival, shubh muhurat, presiding deity, mantra, and digital diya counts shown on the home page.
                      </p>
                    </div>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <span className="font-semibold text-stone-700">Festival Banner:</span>
                      <input
                        type="checkbox"
                        checked={liveFestivalConfig.enabled}
                        onChange={(e) =>
                          setLiveFestivalConfig({ ...liveFestivalConfig, enabled: e.target.checked })
                        }
                        className="rounded border-[#8c8f94] text-[#2271b1] w-4 h-4"
                      />
                      <span className={`font-bold ${liveFestivalConfig.enabled ? 'text-emerald-700' : 'text-stone-400'}`}>
                        {liveFestivalConfig.enabled ? 'Active (Live)' : 'Paused'}
                      </span>
                    </label>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Festival Name (Hindi):</label>
                      <input
                        type="text"
                        value={liveFestivalConfig.nameHi}
                        onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, nameHi: e.target.value })}
                        className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white font-serif font-bold text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Festival Name (English):</label>
                      <input
                        type="text"
                        value={liveFestivalConfig.nameEn}
                        onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, nameEn: e.target.value })}
                        className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Tagline & Subtitle:</label>
                      <input
                        type="text"
                        value={liveFestivalConfig.tagline}
                        onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, tagline: e.target.value })}
                        className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white font-serif"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Active Tithi:</label>
                      <input
                        type="text"
                        value={liveFestivalConfig.tithi}
                        onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, tithi: e.target.value })}
                        className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white font-serif"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Presiding Deity (आज का स्वरूप):</label>
                      <input
                        type="text"
                        value={liveFestivalConfig.deity}
                        onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, deity: e.target.value })}
                        className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white font-serif"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Deity Role & Attributes:</label>
                      <input
                        type="text"
                        value={liveFestivalConfig.deityRole}
                        onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, deityRole: e.target.value })}
                        className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Today's Auspicious Color (पावन रंग):</label>
                      <input
                        type="text"
                        value={liveFestivalConfig.todaysColor}
                        onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, todaysColor: e.target.value })}
                        className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Today's Sacred Bhog / Prasad (पावन भोग):</label>
                      <input
                        type="text"
                        value={liveFestivalConfig.todaysPrasad}
                        onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, todaysPrasad: e.target.value })}
                        className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white font-serif"
                      />
                    </div>
                  </div>

                  {/* Primary Mantra */}
                  <div className="space-y-2 border-t border-stone-200 pt-4">
                    <label className="font-semibold text-stone-700 block">Primary Festival Mantra (Sanskrit):</label>
                    <textarea
                      rows={2}
                      value={liveFestivalConfig.primaryMantraSanskrit}
                      onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, primaryMantraSanskrit: e.target.value })}
                      className="w-full border border-[#8c8f94] rounded p-2 text-xs bg-white font-serif font-bold text-amber-950"
                    />
                    <label className="font-semibold text-stone-700 block mt-2">Mantra Meaning (Hindi भावार्थ):</label>
                    <textarea
                      rows={2}
                      value={liveFestivalConfig.primaryMantraMeaning}
                      onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, primaryMantraMeaning: e.target.value })}
                      className="w-full border border-[#8c8f94] rounded p-2 text-xs bg-white font-serif text-stone-700"
                    />
                  </div>

                  {/* Shubh Muhurats List */}
                  <div className="space-y-3 border-t border-stone-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">Today's Shubh Muhurat Schedule</span>
                      <button
                        type="button"
                        onClick={() => {
                          setLiveFestivalConfig({
                            ...liveFestivalConfig,
                            shubhMuhurats: [
                              ...liveFestivalConfig.shubhMuhurats,
                              { title: 'नया मुहूर्त (New Muhurat)', time: '10:00 AM - 11:30 AM', note: 'शुभ काल' },
                            ],
                          });
                        }}
                        className="text-[#2271b1] hover:underline font-semibold flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Muhurat</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {liveFestivalConfig.shubhMuhurats.map((m, idx) => (
                        <div key={idx} className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-between gap-3">
                          <input
                            type="text"
                            value={m.title}
                            onChange={(e) => {
                              const updated = [...liveFestivalConfig.shubhMuhurats];
                              updated[idx].title = e.target.value;
                              setLiveFestivalConfig({ ...liveFestivalConfig, shubhMuhurats: updated });
                            }}
                            className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white flex-1 font-semibold"
                          />
                          <input
                            type="text"
                            value={m.time}
                            onChange={(e) => {
                              const updated = [...liveFestivalConfig.shubhMuhurats];
                              updated[idx].time = e.target.value;
                              setLiveFestivalConfig({ ...liveFestivalConfig, shubhMuhurats: updated });
                            }}
                            className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white w-48 font-bold text-amber-800"
                          />
                          <input
                            type="text"
                            value={m.note}
                            onChange={(e) => {
                              const updated = [...liveFestivalConfig.shubhMuhurats];
                              updated[idx].note = e.target.value;
                              setLiveFestivalConfig({ ...liveFestivalConfig, shubhMuhurats: updated });
                            }}
                            className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white flex-1 text-stone-600"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = liveFestivalConfig.shubhMuhurats.filter((_, i) => i !== idx);
                              setLiveFestivalConfig({ ...liveFestivalConfig, shubhMuhurats: updated });
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Devotional Counters */}
                  <div className="border-t border-stone-200 pt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-6">
                      <div>
                        <span className="text-stone-500 block text-[11px]">🪔 Diyas Lit Today:</span>
                        <span className="text-lg font-bold text-stone-900">{liveFestivalConfig.diyaCount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[11px]">🌸 Flowers Offered:</span>
                        <span className="text-lg font-bold text-stone-900">{liveFestivalConfig.flowerCount.toLocaleString()}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setLiveFestivalConfig({
                            ...liveFestivalConfig,
                            diyaCount: liveFestivalConfig.diyaCount + 500,
                            flowerCount: liveFestivalConfig.flowerCount + 500,
                          });
                          showNotice('Counter boosted by +500.');
                        }}
                        className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1 rounded font-semibold border border-stone-300"
                      >
                        +500 Boost Counters
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => showNotice('Live Festival settings updated successfully.')}
                      className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-2 rounded-md font-bold text-xs shadow-sm transition"
                    >
                      Save Live Festival Settings
                    </button>
                  </div>
                </div>
              )}

              {/* 2. SLOKAS & MANTRAS TABLE */}
              {(currentSubSection === 'shlokas' || currentSubSection === 'mantras') && (
                <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                        <th className="p-2.5 font-bold">Mantra Name</th>
                        <th className="p-2.5 font-bold">Sanskrit Shloka</th>
                        <th className="p-2.5 font-bold">Deity</th>
                        <th className="p-2.5 font-bold">Chant Count</th>
                        <th className="p-2.5 font-bold">Best Time</th>
                        <th className="p-2.5 font-bold">Status</th>
                        <th className="p-2.5 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {mantras.map((mantra) => (
                        <tr key={mantra.id} className="hover:bg-amber-50/40">
                          <td className="p-2.5 font-bold text-[#2271b1] hover:underline cursor-pointer">
                            {mantra.name}
                          </td>
                          <td className="p-2.5 font-serif text-stone-800 text-sm">{mantra.sanskrit}</td>
                          <td className="p-2.5 text-stone-700">{mantra.deity}</td>
                          <td className="p-2.5 font-bold text-amber-800">{mantra.chantCount} Reps</td>
                          <td className="p-2.5 text-stone-600">{mantra.bestTime}</td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              {mantra.status}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <button
                              onClick={() => {
                                deleteMantra(mantra.id);
                                showNotice(`Mantra "${mantra.name}" removed.`);
                              }}
                              className="text-red-600 hover:underline text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 3. AARTI SANGRAH TABLE */}
              {currentSubSection === 'aartis' && (
                <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                        <th className="p-2.5 font-bold">Aarti Title</th>
                        <th className="p-2.5 font-bold">Deity (देवी/देवता)</th>
                        <th className="p-2.5 font-bold">Opening Lines</th>
                        <th className="p-2.5 font-bold">Audio File</th>
                        <th className="p-2.5 font-bold">Status</th>
                        <th className="p-2.5 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {aartisList.map((aarti) => (
                        <tr key={aarti.id} className="hover:bg-amber-50/40">
                          <td className="p-2.5 font-bold text-[#2271b1] hover:underline cursor-pointer font-serif text-sm">
                            {aarti.titleHi}
                          </td>
                          <td className="p-2.5 font-semibold text-stone-800">{aarti.deity}</td>
                          <td className="p-2.5 font-serif text-stone-600 max-w-xs truncate">{aarti.lyricsPreview}</td>
                          <td className="p-2.5 text-stone-500 font-mono text-[11px]">{aarti.audio}</td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              {aarti.status}
                            </span>
                          </td>
                          <td className="p-2.5 space-x-2">
                            <Link href="/aartis" target="_blank" className="text-[#2271b1] hover:underline text-xs">
                              View
                            </Link>
                            <button
                              onClick={() => {
                                setAartisList(aartisList.filter((x) => x.id !== aarti.id));
                                showNotice(`Aarti "${aarti.titleHi}" removed.`);
                              }}
                              className="text-red-600 hover:underline text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 4. VRAT KATHAS TABLE */}
              {currentSubSection === 'kathas' && (
                <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                        <th className="p-2.5 font-bold">Katha Title</th>
                        <th className="p-2.5 font-bold">Deity</th>
                        <th className="p-2.5 font-bold">Day / Tithi</th>
                        <th className="p-2.5 font-bold">Chapters</th>
                        <th className="p-2.5 font-bold">Status</th>
                        <th className="p-2.5 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {kathasList.map((katha) => (
                        <tr key={katha.id} className="hover:bg-amber-50/40">
                          <td className="p-2.5 font-bold text-[#2271b1] hover:underline cursor-pointer font-serif text-sm">
                            {katha.titleHi}
                          </td>
                          <td className="p-2.5 font-semibold text-stone-800">{katha.deity}</td>
                          <td className="p-2.5 text-stone-600">{katha.dayOrTithi}</td>
                          <td className="p-2.5 font-bold text-amber-800">{katha.chaptersCount} Chapters</td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              {katha.status}
                            </span>
                          </td>
                          <td className="p-2.5 space-x-2">
                            <Link href="/kathas" target="_blank" className="text-[#2271b1] hover:underline text-xs">
                              View
                            </Link>
                            <button
                              onClick={() => {
                                setKathasList(kathasList.filter((x) => x.id !== katha.id));
                                showNotice(`Katha "${katha.titleHi}" removed.`);
                              }}
                              className="text-red-600 hover:underline text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 5. SPIRITUAL BOOKS TABLE */}
              {currentSubSection === 'books' && (
                <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                        <th className="p-2.5 font-bold">Scripture Title</th>
                        <th className="p-2.5 font-bold">Category</th>
                        <th className="p-2.5 font-bold">Cover Color</th>
                        <th className="p-2.5 font-bold">Author / Sage</th>
                        <th className="p-2.5 font-bold">Verses / Chapters</th>
                        <th className="p-2.5 font-bold">Status</th>
                        <th className="p-2.5 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {booksList.map((book) => (
                        <tr key={book.id} className="hover:bg-amber-50/40">
                          <td className="p-2.5 font-bold text-[#2271b1] hover:underline cursor-pointer font-serif text-sm">
                            {book.titleHi}
                          </td>
                          <td className="p-2.5 text-stone-700">
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">
                              {book.category}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FF9933]/15 text-[#b35900] border border-[#FF9933]/40">
                              <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: book.colorCode || '#FF9933' }} />
                              {book.colorCode || '#FF9933'}
                            </span>
                          </td>
                          <td className="p-2.5 text-stone-800 font-semibold">{book.author}</td>
                          <td className="p-2.5 font-serif text-stone-600">{book.verses}</td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              {book.status}
                            </span>
                          </td>
                          <td className="p-2.5 space-x-2">
                            <Link href="/books" target="_blank" className="text-[#2271b1] hover:underline text-xs">
                              View
                            </Link>
                            <button
                              onClick={() => {
                                setBooksList(booksList.filter((x) => x.id !== book.id));
                                showNotice(`Book "${book.titleHi}" removed.`);
                              }}
                              className="text-red-600 hover:underline text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 6. DIVINE VIBRATIONS LIST */}
              {currentSubSection === 'divine-vibrations' && (
                <div className="bg-white border border-[#c3c4c7] rounded p-4 space-y-4">
                  <h3 className="font-bold text-stone-900 text-sm">Divine Vibrations Frequency Tracks</h3>
                  <div className="divide-y divide-[#dcdcde]">
                    {divineVibrations.tracks.map((track) => (
                      <div key={track.id} className="py-3 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#1d2327] block text-sm">{track.title} ({track.frequency})</span>
                          <span className="text-stone-500 text-xs font-serif">{track.sanskritVerse}</span>
                          <p className="text-stone-600 text-[11px] mt-0.5">{track.benefits}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
                            {track.duration}
                          </span>
                          <button
                            onClick={() => {
                              updateVibrationTrack(track.id, { enabled: !track.enabled });
                              showNotice(`Track ${track.title} toggled.`);
                            }}
                            className={`px-3 py-1 rounded text-xs font-semibold ${track.enabled ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-700'}`}
                          >
                            {track.enabled ? 'Active' : 'Disabled'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW 7: APPEARANCE (THEMES / MENUS / WIDGETS)
          ========================================================================= */}
          {currentSection === 'appearance' && (
            <div className="space-y-4">
              {/* THEMES SUB-SECTION */}
              {currentSubSection !== 'menus' && currentSubSection !== 'widgets' && (
                <>
                  <div className="flex items-center space-x-3 pb-1">
                    <h1 className="text-2xl font-normal text-[#1d2327]">Themes</h1>
                    <button className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-2.5 py-1 rounded text-xs font-semibold">
                      Add New Theme
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Active Theme */}
                    <div className="bg-white border-2 border-[#2271b1] rounded overflow-hidden shadow-md relative">
                      <div className="h-44 relative bg-gradient-to-tr from-amber-900 to-orange-700 flex items-center justify-center p-6 text-center text-white">
                        <div>
                          <span className="text-4xl font-serif">ॐ</span>
                          <h3 className="font-serif font-bold text-lg mt-2">Vedic Sanatan Pro</h3>
                          <p className="text-xs text-amber-200">Devotional & Scripture Theme</p>
                        </div>
                      </div>
                      <div className="p-3 bg-white flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-stone-400 block">Active Theme</span>
                          <span className="font-bold text-sm text-[#1d2327]">Vedic Sanatan Pro 2.0</span>
                        </div>
                        <button
                          onClick={() => showNotice('Theme customizer loaded.')}
                          className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1 rounded text-xs font-semibold transition"
                        >
                          Customize
                        </button>
                      </div>
                    </div>

                    {/* Theme 2 */}
                    <div className="bg-white border border-[#c3c4c7] rounded overflow-hidden shadow-sm hover:shadow-md transition">
                      <div className="h-44 bg-stone-200 flex items-center justify-center text-stone-500 font-serif text-xl font-bold">
                        Twenty Twenty-Four
                      </div>
                      <div className="p-3 bg-white flex items-center justify-between">
                        <span className="font-bold text-sm text-[#1d2327]">Twenty Twenty-Four</span>
                        <button
                          onClick={() => showNotice('Theme Twenty Twenty-Four activated.')}
                          className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#8c8f94] px-2.5 py-1 rounded text-xs font-semibold"
                        >
                          Activate
                        </button>
                      </div>
                    </div>

                    {/* Theme 3 */}
                    <div className="bg-white border border-[#c3c4c7] rounded overflow-hidden shadow-sm hover:shadow-md transition">
                      <div className="h-44 bg-orange-100 flex items-center justify-center text-orange-800 font-serif text-xl font-bold">
                        Astra Dharma
                      </div>
                      <div className="p-3 bg-white flex items-center justify-between">
                        <span className="font-bold text-sm text-[#1d2327]">Astra Dharma</span>
                        <button
                          onClick={() => showNotice('Theme Astra Dharma activated.')}
                          className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#8c8f94] px-2.5 py-1 rounded text-xs font-semibold"
                        >
                          Activate
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* MENUS SUB-SECTION */}
              {currentSubSection === 'menus' && (
                <div className="space-y-4">
                  <h1 className="text-2xl font-normal text-[#1d2327]">Menus</h1>
                  <div className="bg-[#f6f7f7] border border-[#c3c4c7] p-3 rounded flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-stone-800">Select a menu to edit:</span>
                      <select className="border border-[#8c8f94] rounded px-2 py-1 bg-white">
                        <option>Main Header Navigation (Primary)</option>
                        <option>Footer Navigation</option>
                      </select>
                      <button className="bg-[#f6f7f7] border border-[#8c8f94] px-2 py-1 rounded font-medium">Select</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Add Menu Items */}
                    <div className="md:col-span-4 bg-white border border-[#c3c4c7] p-4 rounded shadow-sm space-y-3 text-xs">
                      <h3 className="font-bold text-stone-900 text-sm">Add menu items</h3>
                      <div className="border border-[#dcdcde] rounded p-3 space-y-2">
                        <span className="font-bold block text-stone-800">Pages</span>
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                          {pagesList.map((p) => (
                            <label key={p.id} className="flex items-center space-x-1.5">
                              <input type="checkbox" className="rounded border-[#8c8f94]" />
                              <span>{p.title}</span>
                            </label>
                          ))}
                        </div>
                        <button
                          onClick={() => showNotice('Added selected pages to menu.')}
                          className="bg-[#f6f7f7] border border-[#8c8f94] px-2.5 py-1 rounded text-xs hover:bg-stone-100 font-semibold"
                        >
                          Add to Menu
                        </button>
                      </div>
                    </div>

                    {/* Menu Structure */}
                    <div className="md:col-span-8 bg-white border border-[#c3c4c7] p-5 rounded shadow-sm space-y-4 text-xs">
                      <div className="flex justify-between items-center border-b border-[#dcdcde] pb-3">
                        <h3 className="font-bold text-stone-900 text-sm">Menu Structure</h3>
                        <button
                          onClick={() => showNotice('Menu saved.')}
                          className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3.5 py-1.5 rounded font-semibold text-xs transition"
                        >
                          Save Menu
                        </button>
                      </div>
                      <p className="text-stone-500 text-[11px]">
                        Drag each item into the order you prefer. Click the arrow on the right of the item to reveal additional configuration options.
                      </p>
                      <div className="space-y-2">
                        {[
                          'Home',
                          'Slokas',
                          'Aartis',
                          'Kathas',
                          'Spiritual Books',
                          'Divine Vibrations',
                          'Articles',
                          'Store',
                          'Videos',
                          'Community',
                        ].map((item, idx) => (
                          <div key={idx} className="p-3 bg-[#f6f7f7] border border-[#c3c4c7] rounded flex items-center justify-between">
                            <span className="font-bold text-stone-800">{item}</span>
                            <span className="text-[10px] text-stone-400 uppercase font-semibold">Primary Menu Link</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* WIDGETS SUB-SECTION */}
              {currentSubSection === 'widgets' && (
                <div className="space-y-4">
                  <h1 className="text-2xl font-normal text-[#1d2327]">Widgets</h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-[#c3c4c7] p-4 rounded shadow-sm space-y-3 text-xs">
                      <h3 className="font-bold text-[#1d2327] text-sm">Primary Sidebar</h3>
                      <p className="text-stone-500 text-[11px]">Widgets shown on scripture & blog pages.</p>
                      <div className="space-y-2">
                        <div className="p-2.5 bg-stone-50 border border-stone-200 rounded font-semibold">🔍 Search Widget</div>
                        <div className="p-2.5 bg-stone-50 border border-stone-200 rounded font-semibold">📅 Panchang Today Widget</div>
                        <div className="p-2.5 bg-stone-50 border border-stone-200 rounded font-semibold">✨ Daily Shloka Widget</div>
                      </div>
                    </div>
                    <div className="bg-white border border-[#c3c4c7] p-4 rounded shadow-sm space-y-3 text-xs">
                      <h3 className="font-bold text-[#1d2327] text-sm">Footer Column 1</h3>
                      <p className="text-stone-500 text-[11px]">Shown on all site footers.</p>
                      <div className="space-y-2">
                        <div className="p-2.5 bg-stone-50 border border-stone-200 rounded font-semibold">ॐ Sacred Mantra Player</div>
                      </div>
                    </div>
                    <div className="bg-white border border-[#c3c4c7] p-4 rounded shadow-sm space-y-3 text-xs">
                      <h3 className="font-bold text-[#1d2327] text-sm">Footer Column 2</h3>
                      <p className="text-stone-500 text-[11px]">Links & spiritual newsletter.</p>
                      <div className="space-y-2">
                        <div className="p-2.5 bg-stone-50 border border-stone-200 rounded font-semibold">📬 Spiritual Newsletter Form</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW 8: PLUGINS
          ========================================================================= */}
          {currentSection === 'plugins' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-1">
                <h1 className="text-2xl font-normal text-[#1d2327]">Plugins</h1>
                <button className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-2.5 py-1 rounded text-xs font-semibold">
                  Add New Plugin
                </button>
              </div>

              {/* Plugins Table */}
              <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                      <th className="p-2.5 w-8">
                        <input type="checkbox" className="rounded border-[#8c8f94]" />
                      </th>
                      <th className="p-2.5 font-bold">Plugin</th>
                      <th className="p-2.5 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dcdcde]">
                    {pluginsList.map((plugin) => (
                      <tr
                        key={plugin.id}
                        className={`${plugin.active ? 'bg-white' : 'bg-stone-50/70'} hover:bg-amber-50/40`}
                      >
                        <td className="p-2.5 align-top">
                          <input type="checkbox" className="rounded border-[#8c8f94]" />
                        </td>
                        <td className="p-2.5 align-top w-56">
                          <span className="font-bold text-stone-900 block text-sm">{plugin.name}</span>
                          <div className="flex items-center space-x-1.5 text-[11px] text-[#2271b1] mt-1 font-semibold">
                            <button
                              onClick={() => handleTogglePlugin(plugin.id)}
                              className={`${plugin.active ? 'text-red-700' : 'text-[#2271b1]'} hover:underline`}
                            >
                              {plugin.active ? 'Deactivate' : 'Activate'}
                            </button>
                            <span>|</span>
                            <button className="hover:underline">Settings</button>
                          </div>
                        </td>
                        <td className="p-2.5 align-top space-y-1">
                          <p className="text-stone-700">{plugin.description}</p>
                          <div className="text-[11px] text-stone-400">
                            Version {plugin.version} | By{' '}
                            <span className="text-[#2271b1] hover:underline cursor-pointer">{plugin.author}</span> |{' '}
                            <span className="text-[#2271b1] hover:underline cursor-pointer">View details</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 9: SETTINGS (GENERAL / WRITING / READING / DISCUSSION / PERMALINKS)
          ========================================================================= */}
          {currentSection === 'settings' && (
            <div className="space-y-4 max-w-4xl">
              {/* Subtabs for Settings */}
              <div className="flex border-b border-[#c3c4c7] text-xs">
                <button
                  onClick={() => setCurrentSubSection('general')}
                  className={`px-4 py-2 border-b-2 font-medium ${
                    currentSubSection === 'general'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => setCurrentSubSection('writing')}
                  className={`px-4 py-2 border-b-2 font-medium ${
                    currentSubSection === 'writing'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Writing
                </button>
                <button
                  onClick={() => setCurrentSubSection('reading')}
                  className={`px-4 py-2 border-b-2 font-medium ${
                    currentSubSection === 'reading'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Reading
                </button>
                <button
                  onClick={() => setCurrentSubSection('discussion')}
                  className={`px-4 py-2 border-b-2 font-medium ${
                    currentSubSection === 'discussion'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Discussion
                </button>
                <button
                  onClick={() => setCurrentSubSection('permalinks')}
                  className={`px-4 py-2 border-b-2 font-medium ${
                    currentSubSection === 'permalinks'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Permalinks
                </button>
              </div>

              {/* GENERAL SETTINGS */}
              {(currentSubSection === 'general' || !currentSubSection) && (
                <>
                  <h1 className="text-2xl font-normal text-[#1d2327]">General Settings</h1>
                  <form onSubmit={handleSaveSettings} className="bg-white border border-[#c3c4c7] p-6 rounded shadow-sm space-y-6 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-center">
                      <label className="font-bold text-stone-800 text-right sm:text-right">Site Title</label>
                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          value={generalSettings.siteTitle}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, siteTitle: e.target.value })}
                          className="w-full max-w-md border border-[#8c8f94] rounded px-3 py-1.5 text-xs focus:border-[#2271b1] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-start">
                      <label className="font-bold text-stone-800 sm:text-right pt-2">Tagline</label>
                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          value={generalSettings.tagline}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, tagline: e.target.value })}
                          className="w-full max-w-md border border-[#8c8f94] rounded px-3 py-1.5 text-xs focus:border-[#2271b1] focus:outline-none"
                        />
                        <p className="text-stone-500 text-[11px] mt-1">In a few words, explain what this site is about.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-center">
                      <label className="font-bold text-stone-800 sm:text-right">WordPress Address (URL)</label>
                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          value={generalSettings.wpUrl}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, wpUrl: e.target.value })}
                          className="w-full max-w-md border border-[#8c8f94] rounded px-3 py-1.5 text-xs focus:border-[#2271b1] focus:outline-none bg-stone-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-center">
                      <label className="font-bold text-stone-800 sm:text-right">Site Address (URL)</label>
                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          value={generalSettings.siteUrl}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, siteUrl: e.target.value })}
                          className="w-full max-w-md border border-[#8c8f94] rounded px-3 py-1.5 text-xs focus:border-[#2271b1] focus:outline-none bg-stone-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-start">
                      <label className="font-bold text-stone-800 sm:text-right pt-2">Administration Email Address</label>
                      <div className="sm:col-span-3">
                        <input
                          type="email"
                          value={generalSettings.adminEmail}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, adminEmail: e.target.value })}
                          className="w-full max-w-md border border-[#8c8f94] rounded px-3 py-1.5 text-xs focus:border-[#2271b1] focus:outline-none"
                        />
                        <p className="text-stone-500 text-[11px] mt-1">This address is used for admin purposes, like new user notifications.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-center">
                      <label className="font-bold text-stone-800 sm:text-right">Membership</label>
                      <div className="sm:col-span-3">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={generalSettings.anyoneCanRegister}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, anyoneCanRegister: e.target.checked })}
                            className="rounded border-[#8c8f94] text-[#2271b1]"
                          />
                          <span>Anyone can register</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-start">
                      <label className="font-bold text-stone-800 sm:text-right pt-2">Timezone</label>
                      <div className="sm:col-span-3">
                        <select
                          value={generalSettings.timezone}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                          className="border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white"
                        >
                          <option value="UTC+5:30 (Asia/Kolkata)">UTC+5:30 (Asia/Kolkata) - India Standard Time</option>
                          <option value="UTC+0">UTC+0</option>
                          <option value="UTC-5">UTC-5 (New York)</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-[#f0f0f1] pt-4">
                      <button
                        type="submit"
                        className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-2 rounded font-semibold text-xs transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* WRITING SETTINGS */}
              {currentSubSection === 'writing' && (
                <>
                  <h1 className="text-2xl font-normal text-[#1d2327]">Writing Settings</h1>
                  <form onSubmit={(e) => { e.preventDefault(); showNotice('Writing settings saved.'); }} className="bg-white border border-[#c3c4c7] p-6 rounded shadow-sm space-y-6 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-center">
                      <label className="font-bold text-stone-800 sm:text-right">Default Post Category</label>
                      <div className="sm:col-span-3">
                        <select className="border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white">
                          <option>Philosophy</option>
                          <option>Rituals</option>
                          <option>Meditation</option>
                          <option>Festivals</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-center">
                      <label className="font-bold text-stone-800 sm:text-right">Default Post Format</label>
                      <div className="sm:col-span-3">
                        <select className="border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white">
                          <option>Standard</option>
                          <option>Aside</option>
                          <option>Image</option>
                          <option>Video</option>
                          <option>Quote</option>
                        </select>
                      </div>
                    </div>
                    <div className="border-t border-[#f0f0f1] pt-4">
                      <button type="submit" className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-2 rounded font-semibold text-xs transition">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* READING SETTINGS */}
              {currentSubSection === 'reading' && (
                <>
                  <h1 className="text-2xl font-normal text-[#1d2327]">Reading Settings</h1>
                  <form onSubmit={(e) => { e.preventDefault(); showNotice('Reading settings saved.'); }} className="bg-white border border-[#c3c4c7] p-6 rounded shadow-sm space-y-6 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-start">
                      <label className="font-bold text-stone-800 sm:text-right pt-1">Your homepage displays</label>
                      <div className="sm:col-span-3 space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="homepageDisplay" defaultChecked className="text-[#2271b1]" />
                          <span>A static page (select below)</span>
                        </label>
                        <div className="pl-6 text-stone-600">
                          Homepage: <span className="font-bold text-stone-800">Home</span> (Vedic Front Page)
                        </div>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="homepageDisplay" className="text-[#2271b1]" />
                          <span>Your latest posts</span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-center">
                      <label className="font-bold text-stone-800 sm:text-right">Blog pages show at most</label>
                      <div className="sm:col-span-3">
                        <input type="number" defaultValue={10} className="border border-[#8c8f94] rounded px-3 py-1.5 text-xs w-20" />
                        <span className="ml-2 text-stone-600">posts</span>
                      </div>
                    </div>
                    <div className="border-t border-[#f0f0f1] pt-4">
                      <button type="submit" className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-2 rounded font-semibold text-xs transition">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* DISCUSSION SETTINGS */}
              {currentSubSection === 'discussion' && (
                <>
                  <h1 className="text-2xl font-normal text-[#1d2327]">Discussion Settings</h1>
                  <form onSubmit={(e) => { e.preventDefault(); showNotice('Discussion settings saved.'); }} className="bg-white border border-[#c3c4c7] p-6 rounded shadow-sm space-y-6 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-start">
                      <label className="font-bold text-stone-800 sm:text-right pt-1">Default post settings</label>
                      <div className="sm:col-span-3 space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded border-[#8c8f94] text-[#2271b1]" />
                          <span>Allow people to submit comments on new posts</span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 items-start">
                      <label className="font-bold text-stone-800 sm:text-right pt-1">Before a comment appears</label>
                      <div className="sm:col-span-3 space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded border-[#8c8f94] text-[#2271b1]" />
                          <span>Comment must be manually approved</span>
                        </label>
                      </div>
                    </div>
                    <div className="border-t border-[#f0f0f1] pt-4">
                      <button type="submit" className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-2 rounded font-semibold text-xs transition">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* PERMALINK SETTINGS */}
              {currentSubSection === 'permalinks' && (
                <>
                  <h1 className="text-2xl font-normal text-[#1d2327]">Permalink Settings</h1>
                  <form onSubmit={(e) => { e.preventDefault(); showNotice('Permalink structure updated.'); }} className="bg-white border border-[#c3c4c7] p-6 rounded shadow-sm space-y-6 text-xs">
                    <div className="space-y-3">
                      <h3 className="font-bold text-stone-900">Common Settings</h3>
                      <div className="space-y-2.5 text-stone-700">
                        <label className="flex items-center space-x-2.5">
                          <input type="radio" name="permalink" className="text-[#2271b1]" />
                          <span>Plain</span>
                          <code className="text-stone-400 text-[11px]">http://localhost:3000/?p=123</code>
                        </label>
                        <label className="flex items-center space-x-2.5">
                          <input type="radio" name="permalink" className="text-[#2271b1]" />
                          <span>Day and name</span>
                          <code className="text-stone-400 text-[11px]">http://localhost:3000/2026/09/20/sample-post/</code>
                        </label>
                        <label className="flex items-center space-x-2.5">
                          <input type="radio" name="permalink" defaultChecked className="text-[#2271b1]" />
                          <span className="font-bold text-[#1d2327]">Post name</span>
                          <code className="text-stone-500 text-[11px]">http://localhost:3000/sample-post/</code>
                        </label>
                      </div>
                    </div>
                    <div className="border-t border-[#f0f0f1] pt-4">
                      <button type="submit" className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-2 rounded font-semibold text-xs transition">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW 10: USERS / PROFILE
          ========================================================================= */}
          {currentSection === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-1">
                <h1 className="text-2xl font-normal text-[#1d2327]">Users</h1>
                <button className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-2.5 py-1 rounded text-xs font-semibold">
                  Add New User
                </button>
              </div>

              <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                      <th className="p-2.5 w-8">
                        <input type="checkbox" className="rounded border-[#8c8f94]" />
                      </th>
                      <th className="p-2.5 font-bold">Username</th>
                      <th className="p-2.5 font-bold">Name</th>
                      <th className="p-2.5 font-bold">Email</th>
                      <th className="p-2.5 font-bold">Role</th>
                      <th className="p-2.5 font-bold">Posts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dcdcde]">
                    <tr className="hover:bg-amber-50/40">
                      <td className="p-2.5"><input type="checkbox" className="rounded border-[#8c8f94]" /></td>
                      <td className="p-2.5 font-bold text-[#2271b1] flex items-center space-x-2">
                        <div className="w-6 h-6 rounded bg-amber-600 text-white flex items-center justify-center font-bold text-[10px]">ST</div>
                        <span>shubham</span>
                      </td>
                      <td className="p-2.5 font-semibold text-stone-900">Shubham Tiwari</td>
                      <td className="p-2.5 text-[#2271b1]">superadmin@sanatan.org</td>
                      <td className="p-2.5 font-bold text-amber-800">Super Administrator</td>
                      <td className="p-2.5 text-stone-600">42</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40">
                      <td className="p-2.5"><input type="checkbox" className="rounded border-[#8c8f94]" /></td>
                      <td className="p-2.5 font-bold text-[#2271b1] flex items-center space-x-2">
                        <div className="w-6 h-6 rounded bg-orange-500 text-white flex items-center justify-center font-bold text-[10px]">AV</div>
                        <span>acharya_vidyadhar</span>
                      </td>
                      <td className="p-2.5 font-semibold text-stone-900">Acharya Vidyadhar</td>
                      <td className="p-2.5 text-[#2271b1]">vidyadhar@sanatan.org</td>
                      <td className="p-2.5 text-stone-700">Editor</td>
                      <td className="p-2.5 text-stone-600">18</td>
                    </tr>
                    <tr className="hover:bg-amber-50/40">
                      <td className="p-2.5"><input type="checkbox" className="rounded border-[#8c8f94]" /></td>
                      <td className="p-2.5 font-bold text-[#2271b1] flex items-center space-x-2">
                        <div className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">GD</div>
                        <span>govind_das</span>
                      </td>
                      <td className="p-2.5 font-semibold text-stone-900">Govind Das</td>
                      <td className="p-2.5 text-[#2271b1]">storeadmin@sanatan.org</td>
                      <td className="p-2.5 text-stone-700">Shop Manager</td>
                      <td className="p-2.5 text-stone-600">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW: TOOLS (SITE HEALTH / IMPORT / EXPORT)
          ========================================================================= */}
          {currentSection === 'tools' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-1">
                <h1 className="text-2xl font-normal text-[#1d2327]">Tools</h1>
              </div>

              {/* Subtabs for Tools */}
              <div className="flex border-b border-[#c3c4c7] text-xs">
                <button
                  onClick={() => setCurrentSubSection('site-health')}
                  className={`px-4 py-2 border-b-2 font-medium ${
                    currentSubSection === 'site-health'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Site Health
                </button>
                <button
                  onClick={() => setCurrentSubSection('import')}
                  className={`px-4 py-2 border-b-2 font-medium ${
                    currentSubSection === 'import'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Import
                </button>
                <button
                  onClick={() => setCurrentSubSection('export')}
                  className={`px-4 py-2 border-b-2 font-medium ${
                    currentSubSection === 'export'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Export
                </button>
              </div>

              {/* SITE HEALTH STATUS */}
              {currentSubSection === 'site-health' && (
                <div className="bg-white border border-[#c3c4c7] p-6 rounded shadow-sm space-y-6 text-xs">
                  <div className="flex items-center space-x-4 border-b border-[#dcdcde] pb-5">
                    <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-emerald-700 text-base shadow-sm">
                      Good
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm">Your site&apos;s health is looking good!</h3>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        A health check gathers information about your WordPress configuration and items that may need your attention.
                      </p>
                    </div>
                  </div>

                  {/* Test items */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-[#1d2327]">Passed Tests (7)</h4>
                    <div className="divide-y divide-[#dcdcde] border border-[#dcdcde] rounded overflow-hidden">
                      <div className="p-3 flex items-center justify-between bg-white">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-stone-800">Your site is running the current version of Next.js & React</span>
                        </div>
                        <span className="text-stone-400 text-[11px]">Security</span>
                      </div>
                      <div className="p-3 flex items-center justify-between bg-white">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-stone-800">SQLite Database server is responsive & optimized</span>
                        </div>
                        <span className="text-stone-400 text-[11px]">Performance</span>
                      </div>
                      <div className="p-3 flex items-center justify-between bg-white">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-stone-800">UTF-8 Devanagari Sanskrit character set supported</span>
                        </div>
                        <span className="text-stone-400 text-[11px]">Compatibility</span>
                      </div>
                      <div className="p-3 flex items-center justify-between bg-white">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-stone-800">REST APIs responding with status 200 OK</span>
                        </div>
                        <span className="text-stone-400 text-[11px]">API</span>
                      </div>
                      <div className="p-3 flex items-center justify-between bg-white">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-stone-800">Communication with WordPress.org is working</span>
                        </div>
                        <span className="text-stone-400 text-[11px]">Network</span>
                      </div>
                      <div className="p-3 flex items-center justify-between bg-white">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-stone-800">Scheduled events / Panchang calculations are running</span>
                        </div>
                        <span className="text-stone-400 text-[11px]">Cron</span>
                      </div>
                      <div className="p-3 flex items-center justify-between bg-white">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium text-stone-800">HTTPS / Localhost transport layer is secure</span>
                        </div>
                        <span className="text-stone-400 text-[11px]">Security</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* IMPORT */}
              {currentSubSection === 'import' && (
                <div className="bg-white border border-[#c3c4c7] p-6 rounded shadow-sm space-y-4 text-xs">
                  <p className="text-stone-700">If you have posts or comments in another system, WordPress can import those into this site.</p>
                  <div className="border border-[#dcdcde] rounded divide-y divide-[#dcdcde]">
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#1d2327] block">Blogger</span>
                        <span className="text-stone-500 text-[11px]">Import posts, comments, and users from a Blogger blog.</span>
                      </div>
                      <button onClick={() => showNotice('Blogger importer initialized.')} className="text-[#2271b1] hover:underline font-semibold">
                        Install Now
                      </button>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#1d2327] block">WordPress</span>
                        <span className="text-stone-500 text-[11px]">Import posts, pages, comments, custom fields, categories, and tags from a WordPress export file.</span>
                      </div>
                      <button onClick={() => showNotice('WordPress importer ready.')} className="text-[#2271b1] hover:underline font-semibold">
                        Run Importer
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* EXPORT */}
              {currentSubSection === 'export' && (
                <div className="bg-white border border-[#c3c4c7] p-6 rounded shadow-sm space-y-4 text-xs">
                  <h3 className="font-bold text-sm text-[#1d2327]">Choose what to export</h3>
                  <div className="space-y-2 text-stone-700">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="exportChoice" defaultChecked className="text-[#2271b1]" />
                      <span>All content (This will contain all of your posts, pages, comments, mantras, and products)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="exportChoice" className="text-[#2271b1]" />
                      <span>Posts</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="exportChoice" className="text-[#2271b1]" />
                      <span>Pages</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="exportChoice" className="text-[#2271b1]" />
                      <span>Mantras & Divine Vibrations</span>
                    </label>
                  </div>
                  <button
                    onClick={() => showNotice('Export file generated: sanatan-wordpress-export.xml')}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-2 rounded font-semibold transition"
                  >
                    Download Export File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          WORDPRESS PAGE EDITOR MODAL
      ========================================================================= */}
      {pageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-2xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-[#dcdcde] pb-3">
              <h3 className="font-bold text-[#1d2327] text-sm">
                {editingPageId ? 'Edit Page' : 'Add New Page'} — WordPress Classic Page Editor
              </h3>
              <button onClick={() => setPageModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Page Title</label>
                <input
                  type="text"
                  value={pageForm.title}
                  onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                  placeholder="e.g. About Us"
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-800 mb-1">Page Slug (URL)</label>
                <input
                  type="text"
                  value={pageForm.slug}
                  onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })}
                  placeholder="e.g. about"
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-800 mb-1">Page Content</label>
                <textarea
                  rows={6}
                  value={pageForm.content}
                  onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })}
                  placeholder="Write page content here..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-3 border-t border-[#dcdcde]">
              <button
                onClick={() => setPageModalOpen(false)}
                className="px-3 py-1.5 border border-[#8c8f94] rounded text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!pageForm.title) return;
                  if (editingPageId) {
                    setPagesList(pagesList.map((p) => (p.id === editingPageId ? { ...p, title: pageForm.title, slug: pageForm.slug } : p)));
                    showNotice(`Page "${pageForm.title}" updated.`);
                  } else {
                    const newP = {
                      id: `p-${Date.now()}`,
                      title: pageForm.title,
                      slug: pageForm.slug,
                      author: user?.name || 'Shubham Tiwari',
                      date: 'Published just now',
                      status: 'Published',
                    };
                    setPagesList([...pagesList, newP]);
                    showNotice(`Page "${pageForm.title}" published.`);
                  }
                  setPageModalOpen(false);
                }}
                className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-1.5 rounded font-semibold"
              >
                Publish Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          4. WORDPRESS CLASSIC EDITOR MODAL (Add / Edit Post)
      ========================================================================= */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="px-6 py-3.5 border-b border-[#dcdcde] flex items-center justify-between bg-[#f6f7f7]">
              <h3 className="font-bold text-[#1d2327] text-base">
                {editingPostId ? 'Edit Post' : 'Add New Post'} — WordPress Classic Editor
              </h3>
              <button onClick={() => setEditorOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Title</label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  placeholder="Enter title here..."
                  className="w-full text-base font-medium border border-[#8c8f94] rounded px-3 py-2 focus:border-[#2271b1] focus:outline-none"
                />
              </div>

              {/* Permalink Preview */}
              <div className="text-[11px] text-stone-500 flex items-center space-x-1">
                <span>Permalink:</span>
                <span className="text-[#2271b1] underline">http://localhost:3000/articles/{postForm.slug || 'post-title'}</span>
              </div>

              {/* Classic Editor Formatting Toolbar */}
              <div className="border border-[#c3c4c7] rounded overflow-hidden">
                <div className="bg-[#f6f7f7] border-b border-[#c3c4c7] p-2 flex flex-wrap gap-1 items-center">
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => setEditorTab('visual')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded ${editorTab === 'visual' ? 'bg-white border border-[#8c8f94] shadow-sm' : 'text-stone-600'}`}
                    >
                      Visual
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab('text')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded ${editorTab === 'text' ? 'bg-white border border-[#8c8f94] shadow-sm' : 'text-stone-600'}`}
                    >
                      Text
                    </button>
                  </div>
                  <span className="w-px h-5 bg-stone-300 mx-2"></span>
                  <button type="button" className="px-2 py-1 font-bold border border-[#8c8f94] rounded bg-white hover:bg-stone-100">B</button>
                  <button type="button" className="px-2 py-1 italic border border-[#8c8f94] rounded bg-white hover:bg-stone-100">I</button>
                  <button type="button" className="px-2 py-1 underline border border-[#8c8f94] rounded bg-white hover:bg-stone-100">U</button>
                  <span className="w-px h-5 bg-stone-300 mx-1"></span>
                  <button type="button" className="px-2 py-1 border border-[#8c8f94] rounded bg-white hover:bg-stone-100">• Bullet</button>
                  <button type="button" className="px-2 py-1 border border-[#8c8f94] rounded bg-white hover:bg-stone-100">1. Number</button>
                  <span className="w-px h-5 bg-stone-300 mx-1"></span>
                  <button type="button" className="px-2 py-1 border border-[#8c8f94] rounded bg-white hover:bg-stone-100">Link</button>
                  <button type="button" className="px-2 py-1 border border-[#8c8f94] rounded bg-white hover:bg-stone-100">Add Media</button>
                </div>
                <textarea
                  rows={8}
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  placeholder="Type your spiritual content or commentary here..."
                  className="w-full p-3 focus:outline-none font-sans text-stone-800"
                />
                <div className="bg-[#f6f7f7] border-t border-[#c3c4c7] px-3 py-1.5 text-[11px] text-stone-500">
                  Word count: {postForm.content.split(/\s+/).filter(Boolean).length}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Category</label>
                  <select
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 bg-white"
                  >
                    <option value="Philosophy">Philosophy (दर्शन)</option>
                    <option value="Rituals">Rituals (कर्मकाण्ड)</option>
                    <option value="Meditation">Meditation (ध्यान)</option>
                    <option value="Festivals">Festivals (पर्व एवं उत्सव)</option>
                    <option value="Veda">Vedic Shastras (वेद व उपनिषद्)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Author</label>
                  <input
                    type="text"
                    value={postForm.author}
                    onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[#dcdcde] bg-[#f6f7f7] flex items-center justify-between">
              <button
                onClick={() => setEditorOpen(false)}
                className="text-stone-600 hover:text-stone-900 font-semibold"
              >
                Cancel
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setPostForm({ ...postForm, status: 'Draft' });
                    handleSavePost();
                  }}
                  className="bg-[#f6f7f7] border border-[#2271b1] text-[#2271b1] hover:bg-stone-100 px-3 py-1.5 rounded font-semibold text-xs"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => {
                    setPostForm({ ...postForm, status: 'Published' });
                    handleSavePost();
                  }}
                  className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-1.5 rounded font-semibold text-xs"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. MANTRA CREATION MODAL
      ========================================================================= */}
      {mantraModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-[#dcdcde] pb-3">
              <h3 className="font-bold text-[#1d2327] text-sm">Add New Mantra (Custom Post Type)</h3>
              <button onClick={() => setMantraModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Mantra Name</label>
                <input
                  type="text"
                  value={mantraForm.name}
                  onChange={(e) => setMantraForm({ ...mantraForm, name: e.target.value })}
                  placeholder="e.g. Maha Mrityunjaya Mantra"
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-800 mb-1">Sanskrit Shloka (Devanagari)</label>
                <textarea
                  rows={2}
                  value={mantraForm.sanskrit}
                  onChange={(e) => setMantraForm({ ...mantraForm, sanskrit: e.target.value })}
                  placeholder="ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-serif"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Deity</label>
                  <input
                    type="text"
                    value={mantraForm.deity}
                    onChange={(e) => setMantraForm({ ...mantraForm, deity: e.target.value })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Chant Count</label>
                  <input
                    type="number"
                    value={mantraForm.chantCount}
                    onChange={(e) => setMantraForm({ ...mantraForm, chantCount: Number(e.target.value) })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-3 border-t border-[#dcdcde]">
              <button
                onClick={() => setMantraModalOpen(false)}
                className="px-3 py-1.5 border border-[#8c8f94] rounded text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!mantraForm.name) return;
                  addMantra({
                    name: mantraForm.name!,
                    sanskrit: mantraForm.sanskrit || '',
                    transliteration: mantraForm.transliteration || '',
                    hindiMeaning: mantraForm.hindiMeaning || '',
                    englishMeaning: mantraForm.englishMeaning || '',
                    deity: mantraForm.deity || 'Lord Shiva',
                    category: mantraForm.category || 'Sadhana',
                    benefits: mantraForm.benefits || '',
                    chantCount: mantraForm.chantCount || 108,
                    bestTime: mantraForm.bestTime || 'Brahma Muhurat',
                    difficulty: mantraForm.difficulty || 'Easy',
                    status: 'Published',
                  });
                  setMantraModalOpen(false);
                  showNotice(`Mantra "${mantraForm.name}" added successfully.`);
                }}
                className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-1.5 rounded font-semibold"
              >
                Save Mantra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          6. PRODUCT CREATION MODAL
      ========================================================================= */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-[#dcdcde] pb-3">
              <h3 className="font-bold text-[#1d2327] text-sm">Add New Product (WooCommerce)</h3>
              <button onClick={() => setProductModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-stone-800 mb-1">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Pure Sandalwood Dhoop Batti"
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">SKU</label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    placeholder="SAN-PUJA-091"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Category</label>
                  <input
                    type="text"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    placeholder="Puja Samagri"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Regular Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.salePrice}
                    onChange={(e) => setProductForm({ ...productForm, salePrice: Number(e.target.value) })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Stock Qty</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-3 border-t border-[#dcdcde]">
              <button
                onClick={() => setProductModalOpen(false)}
                className="px-3 py-1.5 border border-[#8c8f94] rounded text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!productForm.name) return;
                  addProduct({
                    name: productForm.name!,
                    sku: productForm.sku || `SKU-${Date.now()}`,
                    price: productForm.price || 999,
                    salePrice: productForm.salePrice || 799,
                    stock: productForm.stock || 25,
                    stockStatus: 'In Stock',
                    category: productForm.category || 'Puja Samagri',
                    image: productForm.image || '/images/category_puja.jpg',
                    shortDescription: productForm.shortDescription || '',
                    status: 'Published',
                  });
                  setProductModalOpen(false);
                  showNotice(`Product "${productForm.name}" created successfully.`);
                }}
                className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-1.5 rounded font-semibold"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
