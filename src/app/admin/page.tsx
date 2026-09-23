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
  CMSAartiItem,
  CMSKathaItem,
  CMSBookItem,
  CMSShlokaItem,
  StaticTemple,
  StaticFestival,
  StaticDeity,
  CMSVideoItem,
  CMSSEOConfig,
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
  MapPin,
  Film,
  Play,
} from 'lucide-react';

export default function WordPressAdminPanel() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const {
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
    temples,
    addTemple,
    updateTemple,
    deleteTemple,
    festivals,
    addFestival,
    updateFestival,
    deleteFestival,
    deities,
    addDeity,
    updateDeity,
    deleteDeity,
    videos,
    addVideo,
    updateVideo,
    deleteVideo,
    seoConfig,
    updateSEOConfig,
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
    statusMode: 'auto', // 'auto' | 'upcoming' | 'live'
    startDate: '2026-10-11',
    startDateDisplay: '11 अक्टूबर 2026',
    nameHi: 'शारदीय नवरात्रि महापर्व',
    nameEn: 'Maha Navratri Celebration',
    tagline: 'माँ जगदम्बा की असीम कृपा, शक्ति और भक्ति का पावन उत्सव शीघ्र आ रहा है',
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sanatan_live_festival');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLiveFestivalConfig((prev) => ({ ...prev, ...parsed }));
        } catch (e) {}
      }
    }
  }, []);

  // Aartis Admin State & Handlers
  const [aartiModalOpen, setAartiModalOpen] = useState(false);
  const [editingAartiId, setEditingAartiId] = useState<string | null>(null);
  const [aartiForm, setAartiForm] = useState<Partial<CMSAartiItem>>({
    titleHi: '',
    titleEn: '',
    deity: 'श्री गणेश जी',
    category: 'ganesha',
    tagline: '',
    youtubeId: '',
    singer: 'अनुराधा पौडवाल',
    duration: '5:00',
    lyricsHi: '',
    lyricsEn: '',
    meaning: '',
    status: 'Published',
  });

  const handleOpenAartiModal = (item?: CMSAartiItem) => {
    if (item) {
      setEditingAartiId(item.id);
      setAartiForm({
        titleHi: item.titleHi,
        titleEn: item.titleEn,
        deity: item.deity,
        category: item.category,
        tagline: item.tagline,
        youtubeId: item.youtubeId,
        singer: item.singer,
        duration: item.duration,
        lyricsHi: item.lyricsHi,
        lyricsEn: item.lyricsEn,
        meaning: item.meaning,
        status: item.status,
      });
    } else {
      setEditingAartiId(null);
      setAartiForm({
        titleHi: '',
        titleEn: '',
        deity: 'श्री गणेश जी',
        category: 'ganesha',
        tagline: '',
        youtubeId: '',
        singer: 'अनुराधा पौडवाल',
        duration: '5:00',
        lyricsHi: '',
        lyricsEn: '',
        meaning: '',
        status: 'Published',
      });
    }
    setAartiModalOpen(true);
  };

  const handleSaveAarti = () => {
    if (!aartiForm.titleHi?.trim()) {
      alert('कृपया आरती का शीर्षक (Title) दर्ज करें।');
      return;
    }
    if (editingAartiId) {
      updateAarti(editingAartiId, aartiForm);
      showNotice(`आरती "${aartiForm.titleHi}" अद्यतन (Updated) हो गई।`);
    } else {
      addAarti({
        titleHi: aartiForm.titleHi,
        titleEn: aartiForm.titleEn || aartiForm.titleHi,
        deity: aartiForm.deity || 'श्री गणेश जी',
        category: aartiForm.category || 'ganesha',
        tagline: aartiForm.tagline || '',
        youtubeId: aartiForm.youtubeId || 'Ll5Ccg1qWdc',
        singer: aartiForm.singer || 'अनुराधा पौडवाल',
        duration: aartiForm.duration || '5:00',
        lyricsHi: aartiForm.lyricsHi || '',
        lyricsEn: aartiForm.lyricsEn || '',
        meaning: aartiForm.meaning || '',
        status: aartiForm.status || 'Published',
        audioTrack: {
          id: `audio-${Date.now()}`,
          title: aartiForm.titleHi,
          audioUrl: '/audio/om_namah_shivaya.wav',
          subtitle: aartiForm.deity || 'Devotional Aarti',
        },
      });
      showNotice(`नई आरती "${aartiForm.titleHi}" सफलतापूर्वक जोड़ी गई।`);
    }
    setAartiModalOpen(false);
  };

  // Shlokas Admin State & Handlers
  const [shlokaModalOpen, setShlokaModalOpen] = useState(false);
  const [editingShlokaId, setEditingShlokaId] = useState<string | null>(null);
  const [shlokaForm, setShlokaForm] = useState<Partial<CMSShlokaItem>>({
    source: '',
    chapterVerse: '',
    sanskrit: '',
    transliteration: '',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: '',
    english: '',
    category: 'Gita Shlokas',
    scriptureSlug: 'bhagavad-gita',
    status: 'Published',
  });

  const handleOpenShlokaModal = (item?: CMSShlokaItem) => {
    if (item) {
      setEditingShlokaId(item.id);
      setShlokaForm({
        source: item.source,
        chapterVerse: item.chapterVerse,
        sanskrit: item.sanskrit,
        transliteration: item.transliteration,
        meter: item.meter,
        hindi: item.hindi,
        english: item.english,
        category: item.category,
        scriptureSlug: item.scriptureSlug,
        youtubeId: item.youtubeId || 'Vnz8rJX9w-E',
        status: item.status,
      });
    } else {
      setEditingShlokaId(null);
      setShlokaForm({
        source: '',
        chapterVerse: '',
        sanskrit: '',
        transliteration: '',
        meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
        hindi: '',
        english: '',
        category: 'Gita Shlokas',
        scriptureSlug: 'bhagavad-gita',
        youtubeId: 'Vnz8rJX9w-E',
        status: 'Published',
      });
    }
    setShlokaModalOpen(true);
  };

  const handleSaveShloka = () => {
    if (!shlokaForm.source?.trim() || !shlokaForm.sanskrit?.trim()) {
      alert('कृपया ग्रंथ का नाम (Source) और संस्कृत श्लोक (Sanskrit) दर्ज करें।');
      return;
    }
    if (editingShlokaId) {
      updateShloka(editingShlokaId, shlokaForm);
      showNotice(`श्लोक "${shlokaForm.source}" अद्यतन (Updated) हो गया।`);
    } else {
      addShloka({
        source: shlokaForm.source,
        chapterVerse: shlokaForm.chapterVerse || '',
        sanskrit: shlokaForm.sanskrit,
        transliteration: shlokaForm.transliteration || '',
        meter: shlokaForm.meter || 'अनुष्टुप् छन्द',
        hindi: shlokaForm.hindi || '',
        english: shlokaForm.english || '',
        category: shlokaForm.category || 'Gita Shlokas',
        scriptureSlug: shlokaForm.scriptureSlug || 'bhagavad-gita',
        youtubeId: shlokaForm.youtubeId || 'Vnz8rJX9w-E',
        status: shlokaForm.status || 'Published',
      });
      showNotice(`नया श्लोक सफलतापूर्वक जोड़ा गया।`);
    }
    setShlokaModalOpen(false);
  };

  // Kathas Admin State & Handlers
  const [kathaModalOpen, setKathaModalOpen] = useState(false);
  const [editingKathaId, setEditingKathaId] = useState<string | null>(null);
  const [kathaForm, setKathaForm] = useState<{
    titleHi: string;
    titleEn: string;
    category: string;
    deity: string;
    dayOrTithi: string;
    shortDesc: string;
    vidhiText: string;
    storyText: string;
    phalaShruti: string;
    status: 'Published' | 'Draft';
  }>({
    titleHi: '',
    titleEn: '',
    category: 'vrat',
    deity: 'भगवान शिव',
    dayOrTithi: 'सोमवार',
    shortDesc: '',
    vidhiText: '',
    storyText: '',
    phalaShruti: '',
    status: 'Published',
  });

  const handleOpenKathaModal = (item?: CMSKathaItem) => {
    if (item) {
      setEditingKathaId(item.id);
      setKathaForm({
        titleHi: item.titleHi,
        titleEn: item.titleEn,
        category: item.category,
        deity: item.deity,
        dayOrTithi: item.dayOrTithi,
        shortDesc: item.shortDesc,
        vidhiText: Array.isArray(item.vidhi) ? item.vidhi.join('\n') : '',
        storyText: Array.isArray(item.chapters)
          ? item.chapters.map((c) => `### ${c.title}\n${c.content}`).join('\n\n')
          : '',
        phalaShruti: item.phalaShruti || '',
        status: item.status,
      });
    } else {
      setEditingKathaId(null);
      setKathaForm({
        titleHi: '',
        titleEn: '',
        category: 'vrat',
        deity: 'भगवान शिव',
        dayOrTithi: 'सोमवार',
        shortDesc: '',
        vidhiText: '',
        storyText: '',
        phalaShruti: '',
        status: 'Published',
      });
    }
    setKathaModalOpen(true);
  };

  const handleSaveKatha = () => {
    if (!kathaForm.titleHi?.trim()) {
      alert('कृपया कथा का नाम दर्ज करें।');
      return;
    }
    const vidhiArray = kathaForm.vidhiText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const chapters = kathaForm.storyText
      .split('###')
      .filter((s) => s.trim().length > 0)
      .map((part) => {
        const lines = part.trim().split('\n');
        const title = lines[0]?.trim() || 'कथा अध्याय';
        const content = lines.slice(1).join('\n').trim();
        return { title, content };
      });

    const payload: Partial<CMSKathaItem> = {
      titleHi: kathaForm.titleHi,
      titleEn: kathaForm.titleEn || kathaForm.titleHi,
      category: kathaForm.category,
      deity: kathaForm.deity,
      dayOrTithi: kathaForm.dayOrTithi,
      shortDesc: kathaForm.shortDesc,
      vidhi: vidhiArray.length > 0 ? vidhiArray : ['स्नानादि कर शुद्ध भाव से कथा श्रवण करें।'],
      chapters: chapters.length > 0 ? chapters : [{ title: 'सम्पूर्ण कथा', content: kathaForm.storyText }],
      phalaShruti: kathaForm.phalaShruti,
      status: kathaForm.status,
    };

    if (editingKathaId) {
      updateKatha(editingKathaId, payload);
      showNotice(`कथा "${kathaForm.titleHi}" अद्यतन (Updated) हो गई।`);
    } else {
      addKatha(payload as any);
      showNotice(`नई कथा "${kathaForm.titleHi}" सफलतापूर्वक जोड़ी गई।`);
    }
    setKathaModalOpen(false);
  };

  // Spiritual Books Admin State & Handlers
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [pdfUploadLoading, setPdfUploadLoading] = useState(false);
  const [pdfUploadError, setPdfUploadError] = useState<string | null>(null);
  const [bookForm, setBookForm] = useState<Partial<CMSBookItem>>({
    titleHi: '',
    titleEn: '',
    category: 'gita',
    categoryLabel: 'श्रीमद्भगवद्गीता',
    author: 'महर्षि वेदव्यास',
    versesCount: '१८ अध्याय • ७०० श्लोक',
    colorCode: '#FF9933',
    shortSummary: '',
    fullOverview: '',
    sampleVerseSanskrit: '',
    sampleVerseHindi: '',
    sampleVerseEnglish: '',
    readOnlineUrl: '',
    pdfUrl: '',
    pdfFileName: '',
    pdfFileSize: '',
    status: 'Published',
  });

  const handleOpenBookModal = (item?: CMSBookItem) => {
    setPdfUploadError(null);
    setPdfUploadLoading(false);
    if (item) {
      setEditingBookId(item.id);
      setBookForm({
        titleHi: item.titleHi,
        titleEn: item.titleEn,
        category: item.category,
        categoryLabel: item.categoryLabel,
        author: item.author,
        versesCount: item.versesCount,
        colorCode: item.colorCode || '#FF9933',
        shortSummary: item.shortSummary,
        fullOverview: item.fullOverview,
        sampleVerseSanskrit: item.sampleVerseSanskrit,
        sampleVerseHindi: item.sampleVerseHindi,
        sampleVerseEnglish: item.sampleVerseEnglish,
        readOnlineUrl: item.readOnlineUrl,
        pdfUrl: item.pdfUrl || '',
        pdfFileName: item.pdfFileName || '',
        pdfFileSize: item.pdfFileSize || '',
        status: item.status,
      });
    } else {
      setEditingBookId(null);
      setBookForm({
        titleHi: '',
        titleEn: '',
        category: 'gita',
        categoryLabel: 'श्रीमद्भगवद्गीता',
        author: 'महर्षि वेदव्यास',
        versesCount: '१८ अध्याय • ७०० श्लोक',
        colorCode: '#FF9933',
        shortSummary: '',
        fullOverview: '',
        sampleVerseSanskrit: '',
        sampleVerseHindi: '',
        sampleVerseEnglish: '',
        readOnlineUrl: '',
        pdfUrl: '',
        pdfFileName: '',
        pdfFileSize: '',
        status: 'Published',
      });
    }
    setBookModalOpen(true);
  };

  const handlePdfFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('कृपया केवल PDF (.pdf) प्रारूप की फाइल चुनें।');
      return;
    }

    setPdfUploadLoading(true);
    setPdfUploadError(null);

    const fileSizeStr =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    if (file.size > 12 * 1024 * 1024) {
      const proceed = confirm(
        `यह PDF फाइल काफी बड़ी है (${fileSizeStr})। ब्राउज़र स्थानीय संग्रहण (Local Storage) की सीमा से बचने के लिए, आप सीधे Google Drive या सर्वर का PDF लिंक दर्ज करना पसंद कर सकते हैं। क्या आप फिर भी इसे अपलोड करना चाहते हैं?`
      );
      if (!proceed) {
        setPdfUploadLoading(false);
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setBookForm((prev) => ({
        ...prev,
        pdfUrl: dataUrl,
        pdfFileName: file.name,
        pdfFileSize: fileSizeStr,
      }));
      setPdfUploadLoading(false);
      showNotice(`PDF फाइल "${file.name}" (${fileSizeStr}) सफलतापूर्वक लोड हो गई।`);
    };
    reader.onerror = () => {
      setPdfUploadError('PDF लोड करने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
      setPdfUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBook = () => {
    if (!bookForm.titleHi?.trim()) {
      alert('कृपया ग्रंथ का नाम दर्ज करें।');
      return;
    }
    if (editingBookId) {
      updateBook(editingBookId, bookForm);
      showNotice(`ग्रंथ "${bookForm.titleHi}" अद्यतन (Updated) हो गया।`);
    } else {
      addBook({
        titleHi: bookForm.titleHi,
        titleEn: bookForm.titleEn || bookForm.titleHi,
        category: bookForm.category || 'gita',
        categoryLabel: bookForm.categoryLabel || 'श्रीमद्भगवद्गीता',
        author: bookForm.author || 'महर्षि वेदव्यास',
        versesCount: bookForm.versesCount || '१०० श्लोक',
        colorCode: bookForm.colorCode || '#FF9933',
        shortSummary: bookForm.shortSummary || '',
        fullOverview: bookForm.fullOverview || '',
        sampleVerseSanskrit: bookForm.sampleVerseSanskrit || '',
        sampleVerseHindi: bookForm.sampleVerseHindi || '',
        sampleVerseEnglish: bookForm.sampleVerseEnglish || '',
        readOnlineUrl: bookForm.readOnlineUrl || '/books',
        pdfUrl: bookForm.pdfUrl || '',
        pdfFileName: bookForm.pdfFileName || '',
        pdfFileSize: bookForm.pdfFileSize || '',
        status: bookForm.status || 'Published',
      });
      showNotice(`नया ग्रंथ "${bookForm.titleHi}" सफलतापूर्वक जोड़ा गया।`);
    }
    setBookModalOpen(false);
  };

  // Temples Admin State & Handlers
  const [templeModalOpen, setTempleModalOpen] = useState(false);
  const [editingTempleId, setEditingTempleId] = useState<string | null>(null);
  const [templeForm, setTempleForm] = useState<Partial<StaticTemple>>({
    nameHi: '',
    nameEn: '',
    nameSa: '',
    slug: '',
    deityName: 'Bhagavan Shiva',
    city: '',
    state: 'Uttar Pradesh',
    country: 'Bharat (India)',
    timings: '04:00 AM - 11:00 PM',
    significance: '',
    imageUrl: '/images/hero_diya.jpg',
    historyHi: '',
    historyEn: '',
  });

  const handleOpenTempleModal = (item?: StaticTemple) => {
    if (item) {
      setEditingTempleId(item.id);
      setTempleForm({ ...item });
    } else {
      setEditingTempleId(null);
      setTempleForm({
        nameHi: '',
        nameEn: '',
        nameSa: '',
        slug: '',
        deityName: 'Bhagavan Shiva',
        city: '',
        state: 'Uttar Pradesh',
        country: 'Bharat (India)',
        timings: '04:00 AM - 11:00 PM',
        significance: '',
        imageUrl: '/images/hero_diya.jpg',
        historyHi: '',
        historyEn: '',
      });
    }
    setTempleModalOpen(true);
  };

  const handleSaveTemple = () => {
    if (!templeForm.nameHi?.trim()) {
      alert('कृपया मंदिर का नाम (हिंदी) दर्ज करें।');
      return;
    }
    const slug =
      templeForm.slug?.trim() ||
      (templeForm.nameEn || templeForm.nameHi)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const payload: Partial<StaticTemple> = {
      ...templeForm,
      slug,
      nameEn: templeForm.nameEn || templeForm.nameHi,
      nameSa: templeForm.nameSa || templeForm.nameHi,
      country: templeForm.country || 'Bharat (India)',
    };

    if (editingTempleId) {
      updateTemple(editingTempleId, payload);
      showNotice(`तीर्थ/मंदिर "${templeForm.nameHi}" अद्यतन (Updated) हो गया।`);
    } else {
      addTemple(payload as any);
      showNotice(`नया तीर्थ/मंदिर "${templeForm.nameHi}" सफलतापूर्वक जोड़ा गया।`);
    }
    setTempleModalOpen(false);
  };

  // Festivals Admin State & Handlers
  const [festivalModalOpen, setFestivalModalOpen] = useState(false);
  const [editingFestivalId, setEditingFestivalId] = useState<string | null>(null);
  const [festivalForm, setFestivalForm] = useState<Partial<StaticFestival>>({
    nameHi: '',
    nameEn: '',
    nameSa: '',
    slug: '',
    lunarMonth: 'Kartika',
    tithi: 'Amavasya',
    associatedDeity: 'Bhagavan Shiva',
    isMajor: true,
    descriptionHi: '',
    descriptionEn: '',
    pujaVidhiHi: '',
    pujaVidhiEn: '',
  });

  const handleOpenFestivalModal = (item?: StaticFestival) => {
    if (item) {
      setEditingFestivalId(item.id);
      setFestivalForm({ ...item });
    } else {
      setEditingFestivalId(null);
      setFestivalForm({
        nameHi: '',
        nameEn: '',
        nameSa: '',
        slug: '',
        lunarMonth: 'Kartika',
        tithi: 'Amavasya',
        associatedDeity: 'Bhagavan Shiva',
        isMajor: true,
        descriptionHi: '',
        descriptionEn: '',
        pujaVidhiHi: '',
        pujaVidhiEn: '',
      });
    }
    setFestivalModalOpen(true);
  };

  const handleSaveFestival = () => {
    if (!festivalForm.nameHi?.trim()) {
      alert('कृपया पर्व/त्यौहार का नाम (हिंदी) दर्ज करें।');
      return;
    }
    const slug =
      festivalForm.slug?.trim() ||
      (festivalForm.nameEn || festivalForm.nameHi)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const payload: Partial<StaticFestival> = {
      ...festivalForm,
      slug,
      nameEn: festivalForm.nameEn || festivalForm.nameHi,
      nameSa: festivalForm.nameSa || festivalForm.nameHi,
    };

    if (editingFestivalId) {
      updateFestival(editingFestivalId, payload);
      showNotice(`पर्व "${festivalForm.nameHi}" अद्यतन (Updated) हो गया।`);
    } else {
      addFestival(payload as any);
      showNotice(`नया पर्व "${festivalForm.nameHi}" सफलतापूर्वक जोड़ा गया।`);
    }
    setFestivalModalOpen(false);
  };

  // Deities Admin State & Handlers
  const [deityModalOpen, setDeityModalOpen] = useState(false);
  const [editingDeityId, setEditingDeityId] = useState<string | null>(null);
  const [deityForm, setDeityForm] = useState<Partial<StaticDeity>>({
    nameHi: '',
    nameEn: '',
    nameSa: '',
    slug: '',
    mantra: '',
    iconography: '',
    significanceHi: '',
    significanceEn: '',
    significanceSa: '',
    storyHi: '',
    storyEn: '',
    imageUrl: '/images/hero_diya.jpg',
    popularTemples: '[]',
    festivals: '[]',
    scripturalRefs: '[]',
  });

  const handleOpenDeityModal = (item?: StaticDeity) => {
    if (item) {
      setEditingDeityId(item.id);
      setDeityForm({ ...item });
    } else {
      setEditingDeityId(null);
      setDeityForm({
        nameHi: '',
        nameEn: '',
        nameSa: '',
        slug: '',
        mantra: '',
        iconography: '',
        significanceHi: '',
        significanceEn: '',
        significanceSa: '',
        storyHi: '',
        storyEn: '',
        imageUrl: '/images/hero_diya.jpg',
        popularTemples: '[]',
        festivals: '[]',
        scripturalRefs: '[]',
      });
    }
    setDeityModalOpen(true);
  };

  const handleSaveDeity = () => {
    if (!deityForm.nameHi?.trim()) {
      alert('कृपया देवता/देवी का नाम (हिंदी) दर्ज करें।');
      return;
    }
    const slug =
      deityForm.slug?.trim() ||
      (deityForm.nameEn || deityForm.nameHi)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const payload: Partial<StaticDeity> = {
      ...deityForm,
      slug,
      nameEn: deityForm.nameEn || deityForm.nameHi,
      nameSa: deityForm.nameSa || deityForm.nameHi,
    };

    if (editingDeityId) {
      updateDeity(editingDeityId, payload);
      showNotice(`देवी/देवता "${deityForm.nameHi}" अद्यतन (Updated) हो गए।`);
    } else {
      addDeity(payload as any);
      showNotice(`नए देवी/देवता "${deityForm.nameHi}" सफलतापूर्वक जोड़े गए।`);
    }
    setDeityModalOpen(false);
  };

  // Devotional Videos Admin State & Handlers
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [videoPreviewId, setVideoPreviewId] = useState<string | null>(null);
  const [videoForm, setVideoForm] = useState<Partial<CMSVideoItem>>({
    title: '',
    category: 'Mantras',
    duration: '10:00',
    views: '100k',
    img: '/images/hero_shiva.jpg',
    youtubeId: '',
    description: '',
  });

  const handleOpenVideoModal = (item?: CMSVideoItem) => {
    if (item) {
      setEditingVideoId(item.id);
      setVideoForm({ ...item });
    } else {
      setEditingVideoId(null);
      setVideoForm({
        title: '',
        category: 'Mantras',
        duration: '10:00',
        views: '100k',
        img: '/images/hero_shiva.jpg',
        youtubeId: '',
        description: '',
      });
    }
    setVideoModalOpen(true);
  };

  const handleSaveVideo = () => {
    if (!videoForm.title?.trim() || !videoForm.youtubeId?.trim()) {
      alert('कृपया वीडियो शीर्षक और YouTube ID दर्ज करें।');
      return;
    }
    if (editingVideoId) {
      updateVideo(editingVideoId, videoForm);
      showNotice(`वीडियो "${videoForm.title}" अद्यतन (Updated) हो गया।`);
    } else {
      addVideo({
        title: videoForm.title,
        category: videoForm.category || 'Mantras',
        duration: videoForm.duration || '10:00',
        views: videoForm.views || '10k',
        img: videoForm.img || '/images/hero_shiva.jpg',
        youtubeId: videoForm.youtubeId,
        description: videoForm.description || '',
      });
      showNotice(`नया वीडियो "${videoForm.title}" सफलतापूर्वक जोड़ा गया।`);
    }
    setVideoModalOpen(false);
  };

  // SEO Form State & Handler
  const [seoForm, setSeoForm] = useState<CMSSEOConfig>(seoConfig);
  useEffect(() => {
    if (seoConfig) setSeoForm(seoConfig);
  }, [seoConfig]);

  const handleSaveSEO = (e: React.FormEvent) => {
    e.preventDefault();
    updateSEOConfig(seoForm);
    showNotice('SEO एवं Google Search Console सेटिंग्स सफलतापूर्वक सुरक्षित हो गई।');
  };

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
        { id: 'temples', label: 'Temples & Tirthas' },
        { id: 'festivals', label: 'Festivals Calendar' },
        { id: 'deities', label: 'Deities & Avatars' },
        { id: 'videos', label: 'Devotional Videos' },
        { id: 'seo', label: 'SEO & Search Console' },
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-stone-700">
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
                              {shlokas.length} Slokas & Mantras
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
                              {aartis.length} Aartis
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                            <button onClick={() => { setCurrentSection('sanatan'); setCurrentSubSection('books'); }} className="text-[#2271b1] hover:underline font-semibold">
                              {books.length} Spiritual Books
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-3.5 h-3.5 text-orange-600" />
                            <button onClick={() => { setCurrentSection('sanatan'); setCurrentSubSection('temples'); }} className="text-[#2271b1] hover:underline font-semibold">
                              {temples.length} Sacred Temples
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3.5 h-3.5 text-red-600" />
                            <button onClick={() => { setCurrentSection('sanatan'); setCurrentSubSection('festivals'); }} className="text-[#2271b1] hover:underline font-semibold">
                              {festivals.length} Sacred Festivals
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-600" />
                            <button onClick={() => { setCurrentSection('sanatan'); setCurrentSubSection('deities'); }} className="text-[#2271b1] hover:underline font-semibold">
                              {deities.length} Sacred Deities
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Film className="w-3.5 h-3.5 text-indigo-600" />
                            <button onClick={() => { setCurrentSection('sanatan'); setCurrentSubSection('videos'); }} className="text-[#2271b1] hover:underline font-semibold">
                              {videos.length} Devotional Videos
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="w-3.5 h-3.5 text-emerald-600" />
                            <button onClick={() => { setCurrentSection('sanatan'); setCurrentSubSection('seo'); }} className="text-[#2271b1] hover:underline font-semibold flex items-center space-x-1">
                              <span>SEO: Google Verified</span>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Package className="w-3.5 h-3.5 text-stone-400" />
                            <button onClick={() => setCurrentSection('products')} className="text-[#2271b1] hover:underline font-semibold">
                              {products.length} Products
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
                    : currentSubSection === 'temples'
                    ? 'Sacred Temples & Jyotirlingas'
                    : currentSubSection === 'festivals'
                    ? 'Sacred Festivals Calendar'
                    : currentSubSection === 'deities'
                    ? 'Sacred Deities & Avatars'
                    : currentSubSection === 'videos'
                    ? 'Devotional Videos'
                    : currentSubSection === 'seo'
                    ? 'SEO & Google Search Console'
                    : 'Slokas & Mantras'}
                </h1>

                {/* Quick Add Buttons based on active subtab */}
                {currentSubSection === 'temples' && (
                  <button
                    onClick={() => handleOpenTempleModal()}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add New Temple</span>
                  </button>
                )}

                {currentSubSection === 'festivals' && (
                  <button
                    onClick={() => handleOpenFestivalModal()}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add New Festival</span>
                  </button>
                )}

                {currentSubSection === 'deities' && (
                  <button
                    onClick={() => handleOpenDeityModal()}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add New Deity</span>
                  </button>
                )}

                {currentSubSection === 'videos' && (
                  <button
                    onClick={() => handleOpenVideoModal()}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Devotional Video</span>
                  </button>
                )}

                {currentSubSection === 'seo' && (
                  <div className="flex items-center space-x-2">
                    <Link
                      href="/sitemap.xml"
                      target="_blank"
                      className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-2.5 py-1.5 rounded text-xs font-semibold flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Sitemap.xml</span>
                    </Link>
                  </div>
                )}

                {currentSubSection === 'aartis' && (
                  <button
                    onClick={() => handleOpenAartiModal()}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add New Aarti</span>
                  </button>
                )}

                {currentSubSection === 'kathas' && (
                  <button
                    onClick={() => handleOpenKathaModal()}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add New Katha</span>
                  </button>
                )}

                {currentSubSection === 'books' && (
                  <button
                    onClick={() => handleOpenBookModal()}
                    className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add New Book</span>
                  </button>
                )}

                {(currentSubSection === 'shlokas' || currentSubSection === 'mantras') && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenShlokaModal()}
                      className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add New Shloka</span>
                    </button>
                    <button
                      onClick={() => setMantraModalOpen(true)}
                      className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-2.5 py-1.5 rounded text-xs font-semibold"
                    >
                      + Add Mantra
                    </button>
                  </div>
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
                  Slokas & Mantras ({shlokas.length})
                </button>
                <button
                  onClick={() => setCurrentSubSection('aartis')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'aartis'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Aarti Sangrah ({aartis.length})
                </button>
                <button
                  onClick={() => setCurrentSubSection('kathas')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'kathas'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Vrat Kathas ({kathas.length})
                </button>
                <button
                  onClick={() => setCurrentSubSection('books')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'books'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Spiritual Books ({books.length})
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
                <button
                  onClick={() => setCurrentSubSection('temples')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'temples'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Temples & Tirthas ({temples.length})
                </button>
                <button
                  onClick={() => setCurrentSubSection('festivals')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'festivals'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Festivals ({festivals.length})
                </button>
                <button
                  onClick={() => setCurrentSubSection('deities')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'deities'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Deities ({deities.length})
                </button>
                <button
                  onClick={() => setCurrentSubSection('videos')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap ${
                    currentSubSection === 'videos'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Videos ({videos.length})
                </button>
                <button
                  onClick={() => setCurrentSubSection('seo')}
                  className={`px-4 py-2 border-b-2 font-medium whitespace-nowrap flex items-center space-x-1 ${
                    currentSubSection === 'seo'
                      ? 'border-[#2271b1] text-[#2271b1] bg-white'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SEO & Search Console</span>
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

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <label className="text-xs font-semibold text-stone-700">Display Mode:</label>
                        <select
                          value={liveFestivalConfig.statusMode || 'auto'}
                          onChange={(e) =>
                            setLiveFestivalConfig({ ...liveFestivalConfig, statusMode: e.target.value })
                          }
                          className="border border-[#8c8f94] rounded px-2 py-1 text-xs bg-white font-medium"
                        >
                          <option value="auto">Auto (Countdown until start, then Live)</option>
                          <option value="upcoming">Force Upcoming Preview (आगामी महापर्व)</option>
                          <option value="live">Force Live Celebration (लाइव महापर्व)</option>
                        </select>
                      </div>

                      <label className="flex items-center space-x-2 cursor-pointer">
                        <span className="font-semibold text-stone-700">Banner:</span>
                        <input
                          type="checkbox"
                          checked={liveFestivalConfig.enabled}
                          onChange={(e) =>
                            setLiveFestivalConfig({ ...liveFestivalConfig, enabled: e.target.checked })
                          }
                          className="rounded border-[#8c8f94] text-[#2271b1] w-4 h-4"
                        />
                        <span className={`font-bold ${liveFestivalConfig.enabled ? 'text-emerald-700' : 'text-stone-400'}`}>
                          {liveFestivalConfig.enabled ? 'Enabled' : 'Paused'}
                        </span>
                      </label>
                    </div>
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
                      <label className="font-semibold text-stone-700 block mb-1">Upcoming Start Date (YYYY-MM-DD):</label>
                      <input
                        type="date"
                        value={liveFestivalConfig.startDate || '2026-10-11'}
                        onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, startDate: e.target.value })}
                        className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Start Date Display Text (Hindi):</label>
                      <input
                        type="text"
                        value={liveFestivalConfig.startDateDisplay || '11 अक्टूबर 2026'}
                        onChange={(e) => setLiveFestivalConfig({ ...liveFestivalConfig, startDateDisplay: e.target.value })}
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
                      onClick={() => {
                        try {
                          localStorage.setItem('sanatan_live_festival', JSON.stringify(liveFestivalConfig));
                          window.dispatchEvent(new Event('sanatan_live_festival_updated'));
                          showNotice('Live Festival settings updated & synchronized successfully.');
                        } catch (e) {
                          showNotice('Failed to save Live Festival settings.');
                        }
                      }}
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
                        <th className="p-2.5 font-bold">Source & Verse</th>
                        <th className="p-2.5 font-bold">Sanskrit Shloka</th>
                        <th className="p-2.5 font-bold">Hindi Meaning</th>
                        <th className="p-2.5 font-bold">Category</th>
                        <th className="p-2.5 font-bold">Status</th>
                        <th className="p-2.5 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {shlokas.map((shloka) => (
                        <tr key={shloka.id} className="hover:bg-amber-50/40 transition">
                          <td className="p-2.5">
                            <span className="font-bold text-[#2271b1] block">{shloka.source}</span>
                            <span className="text-[11px] text-stone-500">{shloka.chapterVerse}</span>
                          </td>
                          <td className="p-2.5 font-serif text-stone-800 text-sm max-w-sm whitespace-pre-line">{shloka.sanskrit}</td>
                          <td className="p-2.5 text-stone-700 max-w-xs truncate">{shloka.hindi}</td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">
                              {shloka.category}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              {shloka.status}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleOpenShlokaModal(shloka)}
                                className="text-[#2271b1] hover:text-[#135e96] font-semibold flex items-center space-x-1"
                                title="Edit Shloka"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <Link
                                href="/shlokas"
                                target="_blank"
                                className="text-stone-600 hover:text-stone-900 font-semibold flex items-center space-x-1"
                                title="View on website"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View</span>
                              </Link>
                              <button
                                onClick={() => {
                                  deleteShloka(shloka.id);
                                  showNotice(`Shloka "${shloka.source}" removed.`);
                                }}
                                className="text-red-600 hover:text-red-800 font-semibold flex items-center space-x-1"
                                title="Delete Shloka"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
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
                        <th className="p-2.5 font-bold">Singer & Duration</th>
                        <th className="p-2.5 font-bold">YouTube ID</th>
                        <th className="p-2.5 font-bold">Status</th>
                        <th className="p-2.5 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {aartis.map((aarti) => (
                        <tr key={aarti.id} className="hover:bg-amber-50/40 transition">
                          <td className="p-2.5">
                            <span className="font-bold text-[#2271b1] font-serif text-sm block">{aarti.titleHi}</span>
                            <span className="text-[11px] text-stone-500">{aarti.titleEn}</span>
                          </td>
                          <td className="p-2.5 font-semibold text-stone-800">{aarti.deity}</td>
                          <td className="p-2.5 text-stone-700">
                            <div>{aarti.singer}</div>
                            <span className="text-[10px] text-stone-500 font-mono">⏱ {aarti.duration}</span>
                          </td>
                          <td className="p-2.5 font-mono text-[11px] text-amber-800">
                            <span className="bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              {aarti.youtubeId || '—'}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              {aarti.status}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleOpenAartiModal(aarti)}
                                className="text-[#2271b1] hover:text-[#135e96] font-semibold flex items-center space-x-1"
                                title="Edit Aarti"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <Link
                                href="/aartis"
                                target="_blank"
                                className="text-stone-600 hover:text-stone-900 font-semibold flex items-center space-x-1"
                                title="View on website"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View</span>
                              </Link>
                              <button
                                onClick={() => {
                                  deleteAarti(aarti.id);
                                  showNotice(`Aarti "${aarti.titleHi}" removed.`);
                                }}
                                className="text-red-600 hover:text-red-800 font-semibold flex items-center space-x-1"
                                title="Delete Aarti"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
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
                      {kathas.map((katha) => (
                        <tr key={katha.id} className="hover:bg-amber-50/40 transition">
                          <td className="p-2.5">
                            <span className="font-bold text-[#2271b1] font-serif text-sm block">{katha.titleHi}</span>
                            <span className="text-[11px] text-stone-500">{katha.titleEn}</span>
                          </td>
                          <td className="p-2.5 font-semibold text-stone-800">{katha.deity}</td>
                          <td className="p-2.5 text-stone-600">{katha.dayOrTithi}</td>
                          <td className="p-2.5 font-bold text-amber-800">
                            {Array.isArray(katha.chapters) ? katha.chapters.length : 1} Chapters
                          </td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              {katha.status}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleOpenKathaModal(katha)}
                                className="text-[#2271b1] hover:text-[#135e96] font-semibold flex items-center space-x-1"
                                title="Edit Katha"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <Link
                                href="/kathas"
                                target="_blank"
                                className="text-stone-600 hover:text-stone-900 font-semibold flex items-center space-x-1"
                                title="View on website"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View</span>
                              </Link>
                              <button
                                onClick={() => {
                                  deleteKatha(katha.id);
                                  showNotice(`Katha "${katha.titleHi}" removed.`);
                                }}
                                className="text-red-600 hover:text-red-800 font-semibold flex items-center space-x-1"
                                title="Delete Katha"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
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
                        <th className="p-2.5 font-bold">PDF E-Book</th>
                        <th className="p-2.5 font-bold">Status</th>
                        <th className="p-2.5 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {books.map((book) => (
                        <tr key={book.id} className="hover:bg-amber-50/40 transition">
                          <td className="p-2.5">
                            <span className="font-bold text-[#2271b1] font-serif text-sm block">{book.titleHi}</span>
                            <span className="text-[11px] text-stone-500">{book.titleEn}</span>
                          </td>
                          <td className="p-2.5 text-stone-700">
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">
                              {book.categoryLabel || book.category}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FF9933]/15 text-[#b35900] border border-[#FF9933]/40">
                              <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: book.colorCode || '#FF9933' }} />
                              {book.colorCode || '#FF9933'}
                            </span>
                          </td>
                          <td className="p-2.5 text-stone-800 font-semibold">{book.author}</td>
                          <td className="p-2.5 font-serif text-stone-600">{book.versesCount}</td>
                          <td className="p-2.5">
                            {book.pdfUrl ? (
                              <a
                                href={book.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded border border-red-200 transition"
                                title={book.pdfFileName || 'PDF देखें'}
                              >
                                <FileText className="w-3.5 h-3.5 text-red-600" />
                                <span>PDF {book.pdfFileSize ? `(${book.pdfFileSize})` : 'उपलब्ध'}</span>
                              </a>
                            ) : (
                              <button
                                onClick={() => handleOpenBookModal(book)}
                                className="inline-flex items-center gap-1 text-[10px] font-semibold text-stone-500 hover:text-[#2271b1] hover:underline"
                                title="PDF अपलोड करें"
                              >
                                <Upload className="w-3 h-3" />
                                <span>+ Upload PDF</span>
                              </button>
                            )}
                          </td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              {book.status}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleOpenBookModal(book)}
                                className="text-[#2271b1] hover:text-[#135e96] font-semibold flex items-center space-x-1"
                                title="Edit Book"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <Link
                                href="/books"
                                target="_blank"
                                className="text-stone-600 hover:text-stone-900 font-semibold flex items-center space-x-1"
                                title="View on website"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View</span>
                              </Link>
                              <button
                                onClick={() => {
                                  deleteBook(book.id);
                                  showNotice(`Book "${book.titleHi}" removed.`);
                                }}
                                className="text-red-600 hover:text-red-800 font-semibold flex items-center space-x-1"
                                title="Delete Book"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
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

              {/* 7. TEMPLES & TIRTHAS TABLE */}
              {currentSubSection === 'temples' && (
                <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm space-y-4 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dcdcde] pb-3">
                    <div>
                      <h3 className="font-bold text-[#1d2327] text-sm flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        <span>Sacred Temples, Jyotirlingas & Pilgrimage Sites ({temples.length})</span>
                      </h3>
                      <p className="text-stone-500 text-xs mt-0.5">
                        Manage temple histories, darshan timings, locations, and presiding deities across Bharat.
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenTempleModal()}
                      className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Temple</span>
                    </button>
                  </div>

                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                        <th className="p-2.5 font-bold">Temple Name</th>
                        <th className="p-2.5 font-bold">Presiding Deity</th>
                        <th className="p-2.5 font-bold">Location</th>
                        <th className="p-2.5 font-bold">Darshan Timings</th>
                        <th className="p-2.5 font-bold">Significance</th>
                        <th className="p-2.5 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {temples.map((tm) => (
                        <tr key={tm.id} className="hover:bg-amber-50/40 transition">
                          <td className="p-2.5">
                            <span className="font-bold text-stone-900 block font-serif text-sm">{tm.nameHi}</span>
                            <span className="text-[11px] text-stone-500 block">{tm.nameEn}</span>
                            <span className="text-[10px] text-stone-400 font-mono">/{tm.slug}</span>
                          </td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-semibold text-[10px]">
                              {tm.deityName}
                            </span>
                          </td>
                          <td className="p-2.5 text-stone-700">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
                              <span>{tm.city}, {tm.state}</span>
                            </div>
                            <span className="text-[10px] text-stone-400 block">{tm.country}</span>
                          </td>
                          <td className="p-2.5 text-stone-600 font-mono text-[11px]">
                            {tm.timings || '04:00 AM - 11:00 PM'}
                          </td>
                          <td className="p-2.5 text-stone-600 max-w-xs truncate">
                            {tm.significance || tm.historyHi}
                          </td>
                          <td className="p-2.5">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleOpenTempleModal(tm)}
                                className="text-[#2271b1] hover:text-[#135e96] font-semibold flex items-center space-x-1"
                                title="Edit Temple"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <Link
                                href="/temples"
                                target="_blank"
                                className="text-stone-600 hover:text-stone-900 font-semibold flex items-center space-x-1"
                                title="View on website"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View</span>
                              </Link>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${tm.nameHi}"?`)) {
                                    deleteTemple(tm.id);
                                    showNotice(`Temple "${tm.nameHi}" removed.`);
                                  }
                                }}
                                className="text-red-600 hover:text-red-800 font-semibold flex items-center space-x-1"
                                title="Delete Temple"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 8. FESTIVALS CALENDAR TABLE */}
              {currentSubSection === 'festivals' && (
                <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm space-y-4 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dcdcde] pb-3">
                    <div>
                      <h3 className="font-bold text-[#1d2327] text-sm flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-red-600" />
                        <span>Sacred Hindu Festivals & Vrat Calendar ({festivals.length})</span>
                      </h3>
                      <p className="text-stone-500 text-xs mt-0.5">
                        Manage annual festivals, lunar tithis, associated deities, and sacred puja vidhis.
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenFestivalModal()}
                      className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Festival</span>
                    </button>
                  </div>

                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                        <th className="p-2.5 font-bold">Festival Name</th>
                        <th className="p-2.5 font-bold">Lunar Month & Tithi</th>
                        <th className="p-2.5 font-bold">Presiding Deity</th>
                        <th className="p-2.5 font-bold">Type</th>
                        <th className="p-2.5 font-bold">Puja Vidhi Preview</th>
                        <th className="p-2.5 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {festivals.map((f) => (
                        <tr key={f.id} className="hover:bg-amber-50/40 transition">
                          <td className="p-2.5">
                            <span className="font-bold text-stone-900 block font-serif text-sm">{f.nameHi}</span>
                            <span className="text-[11px] text-stone-500 block">{f.nameEn}</span>
                            {f.nameSa && <span className="text-[10px] text-stone-400 block font-serif">{f.nameSa}</span>}
                          </td>
                          <td className="p-2.5">
                            <span className="font-semibold text-stone-800 block">{f.lunarMonth}</span>
                            <span className="text-[11px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                              {f.tithi}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold text-[10px]">
                              {f.associatedDeity || 'Sanatan Devi/Devta'}
                            </span>
                          </td>
                          <td className="p-2.5">
                            {f.isMajor ? (
                              <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[10px]">
                                ★ Major Festival
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium text-[10px]">
                                Regular Vrat
                              </span>
                            )}
                          </td>
                          <td className="p-2.5 text-stone-600 max-w-xs truncate">
                            {f.pujaVidhiHi || f.descriptionHi}
                          </td>
                          <td className="p-2.5">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleOpenFestivalModal(f)}
                                className="text-[#2271b1] hover:text-[#135e96] font-semibold flex items-center space-x-1"
                                title="Edit Festival"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <Link
                                href="/festivals"
                                target="_blank"
                                className="text-stone-600 hover:text-stone-900 font-semibold flex items-center space-x-1"
                                title="View on website"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View</span>
                              </Link>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${f.nameHi}"?`)) {
                                    deleteFestival(f.id);
                                    showNotice(`Festival "${f.nameHi}" removed.`);
                                  }
                                }}
                                className="text-red-600 hover:text-red-800 font-semibold flex items-center space-x-1"
                                title="Delete Festival"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 9. DEITIES & AVATARS TABLE */}
              {currentSubSection === 'deities' && (
                <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm space-y-4 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dcdcde] pb-3">
                    <div>
                      <h3 className="font-bold text-[#1d2327] text-sm flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Sacred Deities & Divine Forms ({deities.length})</span>
                      </h3>
                      <p className="text-stone-500 text-xs mt-0.5">
                        Manage deity mantras, iconography, spiritual significance, and major tirthas.
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenDeityModal()}
                      className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Deity</span>
                    </button>
                  </div>

                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                        <th className="p-2.5 font-bold">Deity Name</th>
                        <th className="p-2.5 font-bold">Primary Mantra</th>
                        <th className="p-2.5 font-bold">Iconography</th>
                        <th className="p-2.5 font-bold">Significance</th>
                        <th className="p-2.5 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {deities.map((d) => (
                        <tr key={d.id} className="hover:bg-amber-50/40 transition">
                          <td className="p-2.5">
                            <span className="font-bold text-stone-900 block font-serif text-sm">{d.nameHi}</span>
                            <span className="text-[11px] text-stone-500 block">{d.nameEn}</span>
                            {d.nameSa && <span className="text-[10px] text-stone-400 block font-serif">{d.nameSa}</span>}
                          </td>
                          <td className="p-2.5">
                            <span className="font-serif font-bold text-amber-950 bg-amber-50 px-2 py-1 rounded border border-amber-200 block max-w-xs text-xs">
                              {d.mantra}
                            </span>
                          </td>
                          <td className="p-2.5 text-stone-700 max-w-xs truncate">
                            {d.iconography}
                          </td>
                          <td className="p-2.5 text-stone-600 max-w-xs truncate">
                            {d.significanceHi || d.significanceEn}
                          </td>
                          <td className="p-2.5">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleOpenDeityModal(d)}
                                className="text-[#2271b1] hover:text-[#135e96] font-semibold flex items-center space-x-1"
                                title="Edit Deity"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <Link
                                href="/deities"
                                target="_blank"
                                className="text-stone-600 hover:text-stone-900 font-semibold flex items-center space-x-1"
                                title="View on website"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View</span>
                              </Link>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${d.nameHi}"?`)) {
                                    deleteDeity(d.id);
                                    showNotice(`Deity "${d.nameHi}" removed.`);
                                  }
                                }}
                                className="text-red-600 hover:text-red-800 font-semibold flex items-center space-x-1"
                                title="Delete Deity"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 10. DEVOTIONAL VIDEOS TABLE */}
              {currentSubSection === 'videos' && (
                <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto shadow-sm space-y-4 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dcdcde] pb-3">
                    <div>
                      <h3 className="font-bold text-[#1d2327] text-sm flex items-center space-x-2">
                        <Film className="w-4 h-4 text-indigo-600" />
                        <span>Devotional & Scriptural Videos ({videos.length})</span>
                      </h3>
                      <p className="text-stone-500 text-xs mt-0.5">
                        Manage authentic human-voiced chanting, discourses, and verified embeddable YouTube videos.
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenVideoModal()}
                      className="bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 transition self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Video</span>
                    </button>
                  </div>

                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327]">
                        <th className="p-2.5 font-bold">Thumbnail</th>
                        <th className="p-2.5 font-bold">Video Title & Description</th>
                        <th className="p-2.5 font-bold">Category</th>
                        <th className="p-2.5 font-bold">Duration</th>
                        <th className="p-2.5 font-bold">Views</th>
                        <th className="p-2.5 font-bold">YouTube ID</th>
                        <th className="p-2.5 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dcdcde]">
                      {videos.map((vid) => (
                        <tr key={vid.id} className="hover:bg-amber-50/40 transition">
                          <td className="p-2.5 w-20">
                            <div className="relative w-16 h-10 rounded overflow-hidden bg-stone-100 border border-stone-200">
                              <Image
                                src={vid.img || '/images/hero_shiva.jpg'}
                                alt={vid.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </td>
                          <td className="p-2.5 max-w-sm">
                            <span className="font-bold text-stone-900 block">{vid.title}</span>
                            <span className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{vid.description}</span>
                          </td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-semibold text-[10px]">
                              {vid.category}
                            </span>
                          </td>
                          <td className="p-2.5 text-stone-600 font-mono text-[11px]">
                            {vid.duration}
                          </td>
                          <td className="p-2.5 text-stone-600 font-semibold text-[11px]">
                            {vid.views}
                          </td>
                          <td className="p-2.5">
                            <div className="flex items-center space-x-1.5">
                              <span className="font-mono text-[11px] bg-stone-100 px-1.5 py-0.5 rounded border border-stone-300">
                                {vid.youtubeId}
                              </span>
                              <button
                                onClick={() => setVideoPreviewId(vid.youtubeId)}
                                className="text-red-600 hover:text-red-700 p-1"
                                title="Preview Video"
                              >
                                <Play className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="p-2.5">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleOpenVideoModal(vid)}
                                className="text-[#2271b1] hover:text-[#135e96] font-semibold flex items-center space-x-1"
                                title="Edit Video"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <Link
                                href="/videos"
                                target="_blank"
                                className="text-stone-600 hover:text-stone-900 font-semibold flex items-center space-x-1"
                                title="View on website"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View</span>
                              </Link>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${vid.title}"?`)) {
                                    deleteVideo(vid.id);
                                    showNotice(`Video "${vid.title}" removed.`);
                                  }
                                }}
                                className="text-red-600 hover:text-red-800 font-semibold flex items-center space-x-1"
                                title="Delete Video"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 11. SEO & SEARCH CONSOLE COMMAND CENTER */}
              {currentSubSection === 'seo' && (
                <div className="bg-white border border-[#c3c4c7] rounded p-6 shadow-sm space-y-6 text-xs">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-emerald-600" />
                        <span>Google Search Console & Advanced SEO Command Center</span>
                      </h3>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        Manage Google Site Verification, XML Sitemaps, robots.txt, canonical URLs, and SERP snippet metadata.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>GSC Verified</span>
                      </span>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-900 text-xs">Google Site Verification</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-emerald-700 font-mono break-all">
                        {seoForm.googleSiteVerification}
                      </p>
                      <span className="text-[10px] text-emerald-600 block mt-1">Status: Active in &lt;head&gt; meta tag</span>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-900 text-xs">XML Sitemap Index</span>
                        <Link href="/sitemap.xml" target="_blank" className="text-blue-600 hover:underline">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <p className="text-[11px] text-blue-800 font-mono">
                        {seoForm.sitemapUrl || 'https://sanatanroop.com/sitemap.xml'}
                      </p>
                      <span className="text-[10px] text-blue-600 block mt-1">Status: 85+ Pages Indexed with Priority 1.0</span>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-900 text-xs">Robots.txt Engine</span>
                        <Link href="/robots.txt" target="_blank" className="text-amber-600 hover:underline">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <p className="text-[11px] text-amber-800">
                        Configured for Googlebot, Bingbot & Search Indexers
                      </p>
                      <span className="text-[10px] text-amber-700 block mt-1">Admin path protected, sitemap declared</span>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSaveSEO} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-stone-700 block mb-1">
                          Google Search Console Verification Tag (Meta Content):
                        </label>
                        <input
                          type="text"
                          value={seoForm.googleSiteVerification}
                          onChange={(e) => setSeoForm({ ...seoForm, googleSiteVerification: e.target.value })}
                          placeholder="e.g. 913wqbYQWYyRQMdP2NipyBMPrcAqhJSFeSVdikk7Lt4"
                          className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-mono text-xs focus:border-[#2271b1] focus:outline-none"
                        />
                        <span className="text-[10px] text-stone-500">
                          Google Search Console HTML tag verification code (site-verification)
                        </span>
                      </div>

                      <div>
                        <label className="font-semibold text-stone-700 block mb-1">Canonical Base URL:</label>
                        <input
                          type="text"
                          value={seoForm.canonicalBase}
                          onChange={(e) => setSeoForm({ ...seoForm, canonicalBase: e.target.value })}
                          placeholder="https://sanatanroop.com"
                          className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-mono text-xs focus:border-[#2271b1] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-stone-700 block mb-1">Default Meta Title (SERP):</label>
                        <input
                          type="text"
                          value={seoForm.defaultTitle}
                          onChange={(e) => setSeoForm({ ...seoForm, defaultTitle: e.target.value })}
                          className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs focus:border-[#2271b1] focus:outline-none"
                        />
                        <span className="text-[10px] text-stone-500">Characters: {seoForm.defaultTitle?.length || 0} / 60 optimal</span>
                      </div>

                      <div>
                        <label className="font-semibold text-stone-700 block mb-1">Twitter Handle:</label>
                        <input
                          type="text"
                          value={seoForm.twitterHandle}
                          onChange={(e) => setSeoForm({ ...seoForm, twitterHandle: e.target.value })}
                          placeholder="@SanatanRoop"
                          className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs focus:border-[#2271b1] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Default Meta Description:</label>
                      <textarea
                        rows={3}
                        value={seoForm.defaultDescription}
                        onChange={(e) => setSeoForm({ ...seoForm, defaultDescription: e.target.value })}
                        className="w-full border border-[#8c8f94] rounded p-2 text-xs focus:border-[#2271b1] focus:outline-none leading-relaxed"
                      />
                      <span className="text-[10px] text-stone-500">Characters: {seoForm.defaultDescription?.length || 0} / 160 optimal</span>
                    </div>

                    {/* Google SERP Live Snippet Preview */}
                    <div className="border border-stone-200 rounded-lg p-4 bg-stone-50 space-y-2">
                      <span className="font-bold text-stone-800 text-xs block">Google Search Result Preview (SERP Snippet):</span>
                      <div className="bg-white p-3 rounded border border-stone-200 max-w-xl space-y-1">
                        <div className="flex items-center space-x-2 text-[11px] text-stone-600">
                          <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[9px]">ॐ</span>
                          <span className="truncate">{seoForm.canonicalBase}</span>
                        </div>
                        <h4 className="text-[#1a0dab] font-medium text-sm hover:underline cursor-pointer">
                          {seoForm.defaultTitle}
                        </h4>
                        <p className="text-[#4d5156] text-xs leading-relaxed">
                          {seoForm.defaultDescription}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Robots.txt Directives:</label>
                      <textarea
                        rows={5}
                        value={seoForm.robotsTxt}
                        onChange={(e) => setSeoForm({ ...seoForm, robotsTxt: e.target.value })}
                        className="w-full border border-[#8c8f94] rounded p-2 text-xs font-mono bg-stone-900 text-emerald-400 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <a
                          href="https://search.google.com/search-console"
                          target="_blank"
                          rel="noreferrer"
                          className="bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[#2271b1] border border-[#2271b1] px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Open Google Search Console</span>
                        </a>
                      </div>

                      <button
                        type="submit"
                        className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-2 rounded-md font-bold text-xs shadow-sm transition"
                      >
                        Save SEO & Webmaster Settings
                      </button>
                    </div>
                  </form>
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
      {/* =========================================================================
          7. AARTI CREATION / EDIT MODAL (Full Sanatan Sync)
      ========================================================================= */}
      {aartiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up text-xs">
            {/* Modal Header */}
            <div className="px-6 py-3.5 border-b border-[#dcdcde] flex items-center justify-between bg-[#f6f7f7]">
              <h3 className="font-bold text-[#1d2327] text-sm">
                {editingAartiId ? 'आरती संपादित करें (Edit Aarti)' : 'नई आरती जोड़ें (Add New Aarti)'}
              </h3>
              <button onClick={() => setAartiModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    आरती शीर्षक (Hindi Title) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={aartiForm.titleHi || ''}
                    onChange={(e) => setAartiForm({ ...aartiForm, titleHi: e.target.value })}
                    placeholder="उदा. श्री गणेश जी की आरती"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">English Title</label>
                  <input
                    type="text"
                    value={aartiForm.titleEn || ''}
                    onChange={(e) => setAartiForm({ ...aartiForm, titleEn: e.target.value })}
                    placeholder="e.g. Shri Ganesh Aarti"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">आराध्य देव / देवी (Deity)</label>
                  <input
                    type="text"
                    value={aartiForm.deity || ''}
                    onChange={(e) => setAartiForm({ ...aartiForm, deity: e.target.value })}
                    placeholder="उदा. श्री गणेश जी"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Category (श्रेणी)</label>
                  <select
                    value={aartiForm.category || 'ganesha'}
                    onChange={(e) => setAartiForm({ ...aartiForm, category: e.target.value })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 bg-white focus:border-[#2271b1] focus:outline-none"
                  >
                    <option value="ganesha">गणेश जी (Ganesha)</option>
                    <option value="jagdish">जगदीश / विष्णु जी (Jagdish)</option>
                    <option value="shiv">शिव जी (Lord Shiva)</option>
                    <option value="durga">माँ दुर्गा (Maa Durga)</option>
                    <option value="hanuman">हनुमान जी (Hanuman Ji)</option>
                    <option value="laxmi">माँ लक्ष्मी (Maa Laxmi)</option>
                    <option value="krishna">श्री कृष्ण (Lord Krishna)</option>
                    <option value="ram">श्री राम (Lord Ram)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Status (स्थिति)</label>
                  <select
                    value={aartiForm.status || 'Published'}
                    onChange={(e) => setAartiForm({ ...aartiForm, status: e.target.value as any })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 bg-white focus:border-[#2271b1] focus:outline-none"
                  >
                    <option value="Published">Published (प्रकाशित)</option>
                    <option value="Draft">Draft (ड्राफ्ट)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">गायक / गायिका (Singer)</label>
                  <input
                    type="text"
                    value={aartiForm.singer || ''}
                    onChange={(e) => setAartiForm({ ...aartiForm, singer: e.target.value })}
                    placeholder="अनुराधा पौडवाल"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">अवधि (Duration)</label>
                  <input
                    type="text"
                    value={aartiForm.duration || ''}
                    onChange={(e) => setAartiForm({ ...aartiForm, duration: e.target.value })}
                    placeholder="5:12"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    YouTube Video ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={aartiForm.youtubeId || ''}
                    onChange={(e) => setAartiForm({ ...aartiForm, youtubeId: e.target.value })}
                    placeholder="e.g. Ll5Ccg1qWdc"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none font-mono"
                  />
                  <span className="text-[10px] text-stone-500">यूट्यूब लिंक से 11 अक्षरों का ID दर्ज करें</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">उपशीर्षक / मुख्य पंक्ति (Tagline)</label>
                <input
                  type="text"
                  value={aartiForm.tagline || ''}
                  onChange={(e) => setAartiForm({ ...aartiForm, tagline: e.target.value })}
                  placeholder="उदा. जय गणेश जय गणेश देवा, माता जाकी पार्वती पिता महादेवा..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">सम्पूर्ण आरती बोल (Hindi Lyrics)</label>
                <textarea
                  rows={6}
                  value={aartiForm.lyricsHi || ''}
                  onChange={(e) => setAartiForm({ ...aartiForm, lyricsHi: e.target.value })}
                  placeholder="यहाँ सम्पूर्ण आरती के बोल लिखें..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 font-serif text-sm focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">English Lyrics / Transliteration</label>
                  <textarea
                    rows={4}
                    value={aartiForm.lyricsEn || ''}
                    onChange={(e) => setAartiForm({ ...aartiForm, lyricsEn: e.target.value })}
                    placeholder="Jai Ganesh Jai Ganesh Deva..."
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">आध्यात्मिक भावार्थ (Spiritual Meaning)</label>
                  <textarea
                    rows={4}
                    value={aartiForm.meaning || ''}
                    onChange={(e) => setAartiForm({ ...aartiForm, meaning: e.target.value })}
                    placeholder="इस आरती का पावन अर्थ और महत्व..."
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[#dcdcde] bg-[#f6f7f7] flex items-center justify-between">
              <button
                onClick={() => setAartiModalOpen(false)}
                className="px-3 py-1.5 border border-[#8c8f94] rounded text-stone-600 hover:bg-stone-100 font-semibold"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={handleSaveAarti}
                className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-1.5 rounded font-semibold flex items-center space-x-1.5 shadow-sm"
              >
                <span>{editingAartiId ? 'आरती सुरक्षित करें (Save Aarti)' : 'आरती प्रकाशित करें (Publish Aarti)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          8. SHLOKA CREATION / EDIT MODAL (Full Sanatan Sync)
      ========================================================================= */}
      {shlokaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up text-xs">
            {/* Modal Header */}
            <div className="px-6 py-3.5 border-b border-[#dcdcde] flex items-center justify-between bg-[#f6f7f7]">
              <h3 className="font-bold text-[#1d2327] text-sm">
                {editingShlokaId ? 'श्लोक संपादित करें (Edit Shloka)' : 'नया श्लोक जोड़ें (Add New Shloka)'}
              </h3>
              <button onClick={() => setShlokaModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    ग्रंथ का नाम (Source) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shlokaForm.source || ''}
                    onChange={(e) => setShlokaForm({ ...shlokaForm, source: e.target.value })}
                    placeholder="उदा. श्रीमद्भगवद्गीता"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">अध्याय व श्लोक संख्या</label>
                  <input
                    type="text"
                    value={shlokaForm.chapterVerse || ''}
                    onChange={(e) => setShlokaForm({ ...shlokaForm, chapterVerse: e.target.value })}
                    placeholder="उदा. अध्याय २, श्लोक ४७"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">श्रेणी (Category)</label>
                  <select
                    value={shlokaForm.category || 'Gita Shlokas'}
                    onChange={(e) => setShlokaForm({ ...shlokaForm, category: e.target.value })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 bg-white focus:border-[#2271b1] focus:outline-none"
                  >
                    <option value="Gita Shlokas">गीता श्लोक (Gita Shlokas)</option>
                    <option value="Upanishad">उपनिषद् (Upanishads)</option>
                    <option value="Rigveda">ऋग्वेद (Rigveda)</option>
                    <option value="Peace Mantra">शान्ति मन्त्र (Peace Mantra)</option>
                    <option value="Subhashit">सुभाषित (Subhashit)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">छन्द (Meter)</label>
                  <input
                    type="text"
                    value={shlokaForm.meter || ''}
                    onChange={(e) => setShlokaForm({ ...shlokaForm, meter: e.target.value })}
                    placeholder="उदा. अनुष्टुप् छन्द (Anushtubh Meter)"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">YouTube Video / Song ID</label>
                  <input
                    type="text"
                    value={shlokaForm.youtubeId || ''}
                    onChange={(e) => setShlokaForm({ ...shlokaForm, youtubeId: e.target.value })}
                    placeholder="e.g. Vnz8rJX9w-E"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">स्थिति (Status)</label>
                  <select
                    value={shlokaForm.status || 'Published'}
                    onChange={(e) => setShlokaForm({ ...shlokaForm, status: e.target.value as any })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 bg-white focus:border-[#2271b1] focus:outline-none"
                  >
                    <option value="Published">Published (प्रकाशित)</option>
                    <option value="Draft">Draft (ड्राफ्ट)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">
                  मूल संस्कृत श्लोक (Sanskrit Shloka) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={shlokaForm.sanskrit || ''}
                  onChange={(e) => setShlokaForm({ ...shlokaForm, sanskrit: e.target.value })}
                  placeholder="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥"
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 font-serif text-sm focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Transliteration (IAST / English Phonetic)</label>
                <textarea
                  rows={2}
                  value={shlokaForm.transliteration || ''}
                  onChange={(e) => setShlokaForm({ ...shlokaForm, transliteration: e.target.value })}
                  placeholder="karmaṇy-evādhikāras te mā phaleṣu kadācana..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-mono text-xs focus:border-[#2271b1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">हिन्दी सरल भावार्थ (Hindi Meaning)</label>
                <textarea
                  rows={3}
                  value={shlokaForm.hindi || ''}
                  onChange={(e) => setShlokaForm({ ...shlokaForm, hindi: e.target.value })}
                  placeholder="तेरा कर्म करने में ही अधिकार है, उसके फलों में कभी नहीं..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">English Translation & Significance</label>
                <textarea
                  rows={3}
                  value={shlokaForm.english || ''}
                  onChange={(e) => setShlokaForm({ ...shlokaForm, english: e.target.value })}
                  placeholder="You have a right to perform your prescribed duties, but are not entitled to the fruits of your actions..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[#dcdcde] bg-[#f6f7f7] flex items-center justify-between">
              <button
                onClick={() => setShlokaModalOpen(false)}
                className="px-3 py-1.5 border border-[#8c8f94] rounded text-stone-600 hover:bg-stone-100 font-semibold"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={handleSaveShloka}
                className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-1.5 rounded font-semibold flex items-center space-x-1.5 shadow-sm"
              >
                <span>{editingShlokaId ? 'श्लोक सुरक्षित करें (Save Shloka)' : 'श्लोक प्रकाशित करें (Publish Shloka)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          9. KATHA CREATION / EDIT MODAL (Full Sanatan Sync)
      ========================================================================= */}
      {kathaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up text-xs">
            {/* Modal Header */}
            <div className="px-6 py-3.5 border-b border-[#dcdcde] flex items-center justify-between bg-[#f6f7f7]">
              <h3 className="font-bold text-[#1d2327] text-sm">
                {editingKathaId ? 'कथा संपादित करें (Edit Katha)' : 'नई पावन कथा जोड़ें (Add New Katha)'}
              </h3>
              <button onClick={() => setKathaModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    कथा शीर्षक (Hindi Title) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={kathaForm.titleHi}
                    onChange={(e) => setKathaForm({ ...kathaForm, titleHi: e.target.value })}
                    placeholder="उदा. सोमवार व्रत कथा"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">English Title</label>
                  <input
                    type="text"
                    value={kathaForm.titleEn}
                    onChange={(e) => setKathaForm({ ...kathaForm, titleEn: e.target.value })}
                    placeholder="e.g. Somwar Vrat Katha"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">आराध्य देव / देवी (Deity)</label>
                  <input
                    type="text"
                    value={kathaForm.deity}
                    onChange={(e) => setKathaForm({ ...kathaForm, deity: e.target.value })}
                    placeholder="उदा. भगवान शिव"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">दिन / तिथि (Day or Tithi)</label>
                  <input
                    type="text"
                    value={kathaForm.dayOrTithi}
                    onChange={(e) => setKathaForm({ ...kathaForm, dayOrTithi: e.target.value })}
                    placeholder="उदा. सोमवार या एकादशी"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">कथा श्रेणी (Category)</label>
                  <select
                    value={kathaForm.category}
                    onChange={(e) => setKathaForm({ ...kathaForm, category: e.target.value })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 bg-white focus:border-[#2271b1] focus:outline-none"
                  >
                    <option value="vrat">साप्ताहिक व विशिष्ट व्रत (Vrat Katha)</option>
                    <option value="ekadashi">एकादशी महात्म्य (Ekadashi)</option>
                    <option value="tyohar">पर्व एवं त्यौहार (Festivals)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">संक्षिप्त परिचय (Short Description)</label>
                <textarea
                  rows={2}
                  value={kathaForm.shortDesc}
                  onChange={(e) => setKathaForm({ ...kathaForm, shortDesc: e.target.value })}
                  placeholder="कथा का सार या संक्षिप्त परिचय..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">
                  पूजा एवं व्रत विधि (Fasting Vidhi — प्रत्येक नियम नई पंक्ति में लिखें)
                </label>
                <textarea
                  rows={4}
                  value={kathaForm.vidhiText}
                  onChange={(e) => setKathaForm({ ...kathaForm, vidhiText: e.target.value })}
                  placeholder="प्रातःकाल स्नानादि कर श्वेत वस्त्र धारण करें।&#10;भगवान शिव एवं माता पार्वती का पंचामृत से अभिषेक करें।&#10;बेलपत्र, धतूरा, श्वेत चन्दन और अक्षत अर्पित करें।"
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">
                  सम्पूर्ण पावन कथा (Story / Chapters — अध्याय विभाजन हेतु `### अध्याय शीर्षक` का उपयोग करें)
                </label>
                <textarea
                  rows={8}
                  value={kathaForm.storyText}
                  onChange={(e) => setKathaForm({ ...kathaForm, storyText: e.target.value })}
                  placeholder="### प्रथम अध्याय: साहुकार की भक्ति&#10;एक नगर में एक धनी साहूकार रहता था। उसके घर में धन-धान्य की कोई कमी नहीं थी, किन्तु कोई संतान न होने से वह सदैव दुखी रहता था...&#10;&#10;### द्वितीय अध्याय: शिव जी की कृपा&#10;माता पार्वती के आग्रह पर भगवान शिव ने साहूकार को पुत्र प्राप्ति का वरदान दिया..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 font-serif text-sm focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">फल श्रुति (Phala Shruti / व्रत का फल)</label>
                <textarea
                  rows={2}
                  value={kathaForm.phalaShruti}
                  onChange={(e) => setKathaForm({ ...kathaForm, phalaShruti: e.target.value })}
                  placeholder="जो भक्त श्रद्धापूर्वक यह पावन कथा सुनता अथवा पढ़ता है, उसके सभी मनोरथ पूर्ण होते हैं।"
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">स्थिति (Status)</label>
                <select
                  value={kathaForm.status}
                  onChange={(e) => setKathaForm({ ...kathaForm, status: e.target.value as any })}
                  className="w-48 border border-[#8c8f94] rounded px-3 py-1.5 bg-white focus:border-[#2271b1] focus:outline-none"
                >
                  <option value="Published">Published (प्रकाशित)</option>
                  <option value="Draft">Draft (ड्राफ्ट)</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[#dcdcde] bg-[#f6f7f7] flex items-center justify-between">
              <button
                onClick={() => setKathaModalOpen(false)}
                className="px-3 py-1.5 border border-[#8c8f94] rounded text-stone-600 hover:bg-stone-100 font-semibold"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={handleSaveKatha}
                className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-1.5 rounded font-semibold flex items-center space-x-1.5 shadow-sm"
              >
                <span>{editingKathaId ? 'कथा सुरक्षित करें (Save Katha)' : 'कथा प्रकाशित करें (Publish Katha)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          10. BOOK CREATION / EDIT MODAL (Full Sanatan Sync)
      ========================================================================= */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up text-xs">
            {/* Modal Header */}
            <div className="px-6 py-3.5 border-b border-[#dcdcde] flex items-center justify-between bg-[#f6f7f7]">
              <h3 className="font-bold text-[#1d2327] text-sm">
                {editingBookId ? 'धर्मग्रंथ संपादित करें (Edit Scripture Book)' : 'नया धर्मग्रंथ जोड़ें (Add New Book)'}
              </h3>
              <button onClick={() => setBookModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    ग्रंथ का नाम (Hindi Title) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={bookForm.titleHi || ''}
                    onChange={(e) => setBookForm({ ...bookForm, titleHi: e.target.value })}
                    placeholder="उदा. श्रीमद्भगवद्गीता"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">English Title</label>
                  <input
                    type="text"
                    value={bookForm.titleEn || ''}
                    onChange={(e) => setBookForm({ ...bookForm, titleEn: e.target.value })}
                    placeholder="e.g. Shrimad Bhagavad Gita"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">श्रेणी (Category)</label>
                  <select
                    value={bookForm.category || 'gita'}
                    onChange={(e) => setBookForm({ ...bookForm, category: e.target.value as any })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 bg-white focus:border-[#2271b1] focus:outline-none"
                  >
                    <option value="gita">भगवद्गीता (Gita)</option>
                    <option value="ramayan">रामायण / रामचरितमानस (Ramayan)</option>
                    <option value="vedas">चार वेद (Vedas)</option>
                    <option value="upanishad">१०८ उपनिषद् (Upanishads)</option>
                    <option value="purana">१८ महापुराण (Puranas)</option>
                    <option value="darshan">षड्दर्शन (Darshan)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Category Label</label>
                  <input
                    type="text"
                    value={bookForm.categoryLabel || ''}
                    onChange={(e) => setBookForm({ ...bookForm, categoryLabel: e.target.value })}
                    placeholder="उदा. श्रीमद्भगवद्गीता"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">रचयिता / महर्षि (Author)</label>
                  <input
                    type="text"
                    value={bookForm.author || ''}
                    onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                    placeholder="उदा. महर्षि वेदव्यास"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">अध्याय व श्लोक संख्या</label>
                  <input
                    type="text"
                    value={bookForm.versesCount || ''}
                    onChange={(e) => setBookForm({ ...bookForm, versesCount: e.target.value })}
                    placeholder="१८ अध्याय • ७०० श्लोक"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Cover Color Code</label>
                  <input
                    type="text"
                    value={bookForm.colorCode || '#FF9933'}
                    onChange={(e) => setBookForm({ ...bookForm, colorCode: e.target.value })}
                    placeholder="#FF9933"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-mono focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">स्थिति (Status)</label>
                  <select
                    value={bookForm.status || 'Published'}
                    onChange={(e) => setBookForm({ ...bookForm, status: e.target.value as any })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 bg-white focus:border-[#2271b1] focus:outline-none"
                  >
                    <option value="Published">Published (प्रकाशित)</option>
                    <option value="Draft">Draft (ड्राफ्ट)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">संक्षिप्त परिचय (Short Summary)</label>
                <textarea
                  rows={2}
                  value={bookForm.shortSummary || ''}
                  onChange={(e) => setBookForm({ ...bookForm, shortSummary: e.target.value })}
                  placeholder="कुरुक्षेत्र के रणक्षेत्र में भगवान श्रीकृष्ण द्वारा अर्जुन को दिया गया दिव्य कर्मयोग का उपदेश..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">सम्पूर्ण विस्तार एवं सार (Full Overview)</label>
                <textarea
                  rows={5}
                  value={bookForm.fullOverview || ''}
                  onChange={(e) => setBookForm({ ...bookForm, fullOverview: e.target.value })}
                  placeholder="ग्रंथ का गहन परिचय, महत्व, प्रमुख अध्याय एवं शिक्षाएँ..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="space-y-2 border border-stone-200 p-3 rounded bg-[#fdfaf5]">
                <h4 className="font-bold text-stone-800">प्रतिनिधि पावन श्लोक (Sample Verse)</h4>
                <div>
                  <label className="block font-medium text-stone-700 mb-0.5">संस्कृत श्लोक (Sanskrit)</label>
                  <textarea
                    rows={2}
                    value={bookForm.sampleVerseSanskrit || ''}
                    onChange={(e) => setBookForm({ ...bookForm, sampleVerseSanskrit: e.target.value })}
                    placeholder="यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1 font-serif text-sm focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-0.5">हिन्दी भावार्थ (Hindi Meaning)</label>
                  <textarea
                    rows={2}
                    value={bookForm.sampleVerseHindi || ''}
                    onChange={(e) => setBookForm({ ...bookForm, sampleVerseHindi: e.target.value })}
                    placeholder="हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं स्वयं को प्रकट करता हूँ।"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-700 mb-0.5">English Translation</label>
                  <textarea
                    rows={2}
                    value={bookForm.sampleVerseEnglish || ''}
                    onChange={(e) => setBookForm({ ...bookForm, sampleVerseEnglish: e.target.value })}
                    placeholder="Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest Myself on earth."
                    className="w-full border border-[#8c8f94] rounded px-3 py-1 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              {/* PDF UPLOAD & DIGITAL E-BOOK SECTION */}
              <div className="border border-amber-200 bg-amber-50/40 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-stone-800 text-xs sm:text-sm flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-amber-700" />
                    <span>धर्मग्रंथ PDF अपलोड एवं ई-बुक (Upload PDF / E-Book)</span>
                  </label>
                  {bookForm.pdfUrl && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> PDF संलग्न है
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-stone-600 leading-relaxed">
                  भक्तों एवं शोधार्थियों के लिए सम्पूर्ण धर्मग्रंथ की PDF फाइल अपलोड करें अथवा सीधा PDF लिंक प्रदान करें।
                </p>

                {/* Upload or Current PDF status */}
                {bookForm.pdfUrl ? (
                  <div className="bg-white border border-amber-300 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs border border-red-200">
                        PDF
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-stone-900 truncate text-xs">
                          {bookForm.pdfFileName || 'संलग्न PDF दस्तावेज'}
                        </p>
                        <p className="text-[10px] text-stone-500 flex items-center gap-2">
                          {bookForm.pdfFileSize && <span>आकार: {bookForm.pdfFileSize}</span>}
                          {bookForm.pdfUrl.startsWith('data:') ? (
                            <span className="text-amber-700 font-medium">स्थानिक फाइल (Base64)</span>
                          ) : (
                            <span className="text-blue-700 font-medium">वेब लिंक</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <a
                        href={bookForm.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded font-semibold text-[11px] flex items-center space-x-1 transition"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>PDF देखें (Preview)</span>
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          setBookForm((prev) => ({
                            ...prev,
                            pdfUrl: '',
                            pdfFileName: '',
                            pdfFileSize: '',
                          }))
                        }
                        className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded font-semibold text-[11px] flex items-center space-x-1 border border-red-200 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>हटाएं (Remove)</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* File Upload Box */}
                    <div className="border-2 border-dashed border-[#8c8f94]/60 hover:border-[#2271b1] bg-white rounded-lg p-4 text-center cursor-pointer transition flex flex-col items-center justify-center relative">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        disabled={pdfUploadLoading}
                      />
                      <Upload className="w-6 h-6 text-[#2271b1] mb-1.5" />
                      <span className="font-bold text-stone-800 text-xs">
                        {pdfUploadLoading ? 'PDF अपलोड हो रही है...' : 'PDF फाइल चुनें या यहाँ ड्रैग करें'}
                      </span>
                      <span className="text-[10px] text-stone-500 mt-0.5">
                        केवल .pdf फाइलें स्वीकार्य हैं
                      </span>
                    </div>

                    {/* Direct URL Input */}
                    <div className="bg-white border border-[#8c8f94]/60 rounded-lg p-3 flex flex-col justify-center">
                      <label className="block font-semibold text-stone-700 text-[11px] mb-1">
                        अथवा सीधा PDF URL दर्ज करें (Direct PDF Link)
                      </label>
                      <input
                        type="url"
                        value={bookForm.pdfUrl || ''}
                        onChange={(e) => {
                          const url = e.target.value;
                          const fileName = url ? url.split('/').pop()?.split('?')[0] || 'book.pdf' : '';
                          setBookForm((prev) => ({
                            ...prev,
                            pdfUrl: url,
                            pdfFileName: prev.pdfFileName || fileName,
                          }));
                        }}
                        placeholder="https://example.com/books/gita.pdf"
                        className="w-full border border-[#8c8f94] rounded px-3 py-1.5 text-xs focus:border-[#2271b1] focus:outline-none"
                      />
                      <span className="text-[10px] text-stone-400 mt-1">
                        उदा. Google Drive / Archive.org / CDN लिंक
                      </span>
                    </div>
                  </div>
                )}

                {pdfUploadError && (
                  <p className="text-xs text-red-600 font-medium">{pdfUploadError}</p>
                )}
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Online Reading URL (वैकल्पिक)</label>
                <input
                  type="text"
                  value={bookForm.readOnlineUrl || ''}
                  onChange={(e) => setBookForm({ ...bookForm, readOnlineUrl: e.target.value })}
                  placeholder="https://sanatanroop.com/scriptures/bhagavad-gita"
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[#dcdcde] bg-[#f6f7f7] flex items-center justify-between">
              <button
                onClick={() => setBookModalOpen(false)}
                className="px-3 py-1.5 border border-[#8c8f94] rounded text-stone-600 hover:bg-stone-100 font-semibold"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={handleSaveBook}
                className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-1.5 rounded font-semibold flex items-center space-x-1.5 shadow-sm"
              >
                <span>{editingBookId ? 'ग्रंथ सुरक्षित करें (Save Book)' : 'ग्रंथ प्रकाशित करें (Publish Book)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          11. TEMPLE CREATION / EDIT MODAL
      ========================================================================= */}
      {templeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up text-xs">
            <div className="px-6 py-3.5 border-b border-[#dcdcde] flex items-center justify-between bg-[#f6f7f7]">
              <h3 className="font-bold text-[#1d2327] text-sm">
                {editingTempleId ? 'तीर्थ / देवालय संपादित करें (Edit Temple)' : 'नया तीर्थ / देवालय जोड़ें (Add New Temple)'}
              </h3>
              <button onClick={() => setTempleModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    मंदिर का नाम (Hindi Title) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={templeForm.nameHi || ''}
                    onChange={(e) => setTempleForm({ ...templeForm, nameHi: e.target.value })}
                    placeholder="उदा. श्री काशी विश्वनाथ ज्योतिर्लिंग"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none font-serif text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">English Name</label>
                  <input
                    type="text"
                    value={templeForm.nameEn || ''}
                    onChange={(e) => setTempleForm({ ...templeForm, nameEn: e.target.value })}
                    placeholder="e.g. Kashi Vishwanath Temple"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">संस्कृत नाम (Sanskrit)</label>
                  <input
                    type="text"
                    value={templeForm.nameSa || ''}
                    onChange={(e) => setTempleForm({ ...templeForm, nameSa: e.target.value })}
                    placeholder="उदा. काशीविश्वनाथज्योतिर्लिङ्गम्"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none font-serif"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Presiding Deity (आराध्य देव)</label>
                  <input
                    type="text"
                    value={templeForm.deityName || ''}
                    onChange={(e) => setTempleForm({ ...templeForm, deityName: e.target.value })}
                    placeholder="उदा. भगवान शिव / महादेव"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={templeForm.slug || ''}
                    onChange={(e) => setTempleForm({ ...templeForm, slug: e.target.value })}
                    placeholder="kashi-vishwanath"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-mono focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">नगर / City</label>
                  <input
                    type="text"
                    value={templeForm.city || ''}
                    onChange={(e) => setTempleForm({ ...templeForm, city: e.target.value })}
                    placeholder="उदा. Varanasi"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">राज्य / State</label>
                  <input
                    type="text"
                    value={templeForm.state || ''}
                    onChange={(e) => setTempleForm({ ...templeForm, state: e.target.value })}
                    placeholder="उदा. Uttar Pradesh"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">देश / Country</label>
                  <input
                    type="text"
                    value={templeForm.country || 'Bharat (India)'}
                    onChange={(e) => setTempleForm({ ...templeForm, country: e.target.value })}
                    placeholder="Bharat (India)"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">दर्शन समय (Darshan Timings)</label>
                  <input
                    type="text"
                    value={templeForm.timings || ''}
                    onChange={(e) => setTempleForm({ ...templeForm, timings: e.target.value })}
                    placeholder="03:00 AM - 11:00 PM (Mangala to Shayan Aarti)"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={templeForm.imageUrl || ''}
                    onChange={(e) => setTempleForm({ ...templeForm, imageUrl: e.target.value })}
                    placeholder="/images/hero_diya.jpg"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-mono focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">धार्मिक महत्व (Significance)</label>
                <input
                  type="text"
                  value={templeForm.significance || ''}
                  onChange={(e) => setTempleForm({ ...templeForm, significance: e.target.value })}
                  placeholder="द्वादश ज्योतिर्लिंगों में प्रधान, मोक्षदायिनी काशी की पावन पीठ..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">मंदिर का इतिहास व विवरण (Hindi History)</label>
                <textarea
                  rows={4}
                  value={templeForm.historyHi || ''}
                  onChange={(e) => setTempleForm({ ...templeForm, historyHi: e.target.value })}
                  placeholder="द्वादश ज्योतिर्लिंगों में प्रमुख, मोक्षदायिनी काशी में पतितपावनी मां गंगा के पश्चिमी तट पर प्रतिष्ठित अनादि ज्योतिर्लिंग..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 font-serif focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">English History & Details</label>
                <textarea
                  rows={3}
                  value={templeForm.historyEn || ''}
                  onChange={(e) => setTempleForm({ ...templeForm, historyEn: e.target.value })}
                  placeholder="One of the twelve sacred Jyotirlingas, situated on the western bank of the holy Ganga..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            <div className="px-6 py-3 border-t border-[#dcdcde] bg-[#f6f7f7] flex items-center justify-between">
              <button
                onClick={() => setTempleModalOpen(false)}
                className="px-3 py-1.5 border border-[#8c8f94] rounded text-stone-600 hover:bg-stone-100 font-semibold"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={handleSaveTemple}
                className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-1.5 rounded font-semibold flex items-center space-x-1.5 shadow-sm"
              >
                <span>{editingTempleId ? 'तीर्थ सुरक्षित करें (Save Temple)' : 'तीर्थ प्रकाशित करें (Publish Temple)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          12. FESTIVAL CREATION / EDIT MODAL
      ========================================================================= */}
      {festivalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up text-xs">
            <div className="px-6 py-3.5 border-b border-[#dcdcde] flex items-center justify-between bg-[#f6f7f7]">
              <h3 className="font-bold text-[#1d2327] text-sm">
                {editingFestivalId ? 'पर्व / व्रत संपादित करें (Edit Festival)' : 'नया पर्व / व्रत जोड़ें (Add New Festival)'}
              </h3>
              <button onClick={() => setFestivalModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    पर्व का नाम (Hindi Title) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={festivalForm.nameHi || ''}
                    onChange={(e) => setFestivalForm({ ...festivalForm, nameHi: e.target.value })}
                    placeholder="उदा. महाशिवरात्रि"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none font-serif text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">English Title</label>
                  <input
                    type="text"
                    value={festivalForm.nameEn || ''}
                    onChange={(e) => setFestivalForm({ ...festivalForm, nameEn: e.target.value })}
                    placeholder="e.g. Maha Shivaratri"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">संस्कृत नाम (Sanskrit)</label>
                  <input
                    type="text"
                    value={festivalForm.nameSa || ''}
                    onChange={(e) => setFestivalForm({ ...festivalForm, nameSa: e.target.value })}
                    placeholder="महाशिवरात्रिव्रतम्"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none font-serif"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">चंद्र मास (Lunar Month)</label>
                  <input
                    type="text"
                    value={festivalForm.lunarMonth || ''}
                    onChange={(e) => setFestivalForm({ ...festivalForm, lunarMonth: e.target.value })}
                    placeholder="उदा. Phalguna / आश्विन"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">तिथि (Tithi)</label>
                  <input
                    type="text"
                    value={festivalForm.tithi || ''}
                    onChange={(e) => setFestivalForm({ ...festivalForm, tithi: e.target.value })}
                    placeholder="उदा. Krishna Chaturdashi"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">आराध्य देव / देवी (Associated Deity)</label>
                  <input
                    type="text"
                    value={festivalForm.associatedDeity || ''}
                    onChange={(e) => setFestivalForm({ ...festivalForm, associatedDeity: e.target.value })}
                    placeholder="उदा. भगवान शिव / माता पार्वती"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!festivalForm.isMajor}
                      onChange={(e) => setFestivalForm({ ...festivalForm, isMajor: e.target.checked })}
                      className="rounded border-[#8c8f94] text-[#2271b1] w-4 h-4"
                    />
                    <span className="font-bold text-stone-800">प्रमुख सनातन महापर्व (Major Festival)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">पर्व का महत्व (Hindi Description)</label>
                <textarea
                  rows={3}
                  value={festivalForm.descriptionHi || ''}
                  onChange={(e) => setFestivalForm({ ...festivalForm, descriptionHi: e.target.value })}
                  placeholder="भगवान शिव और माता पार्वती के दिव्य विवाह एवं सृष्टि के पावन प्राकट्य की महारात्रि..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 font-serif focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">पूजा विधि व नियम (Hindi Puja Vidhi)</label>
                <textarea
                  rows={3}
                  value={festivalForm.pujaVidhiHi || ''}
                  onChange={(e) => setFestivalForm({ ...festivalForm, pujaVidhiHi: e.target.value })}
                  placeholder="दिन-रात्रि उपवास रखें, चार प्रहर रुद्राभिषेक करें, बेलपत्र, गंगाजल, धतूरा और भस्म अर्पित करें..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 font-serif focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            <div className="px-6 py-3 border-t border-[#dcdcde] bg-[#f6f7f7] flex items-center justify-between">
              <button
                onClick={() => setFestivalModalOpen(false)}
                className="px-3 py-1.5 border border-[#8c8f94] rounded text-stone-600 hover:bg-stone-100 font-semibold"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={handleSaveFestival}
                className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-1.5 rounded font-semibold flex items-center space-x-1.5 shadow-sm"
              >
                <span>{editingFestivalId ? 'पर्व सुरक्षित करें (Save Festival)' : 'पर्व प्रकाशित करें (Publish Festival)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          13. DEITY CREATION / EDIT MODAL
      ========================================================================= */}
      {deityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up text-xs">
            <div className="px-6 py-3.5 border-b border-[#dcdcde] flex items-center justify-between bg-[#f6f7f7]">
              <h3 className="font-bold text-[#1d2327] text-sm">
                {editingDeityId ? 'देवी / देवता स्वरूप संपादित करें (Edit Deity)' : 'नए देवी / देवता जोड़ें (Add New Deity)'}
              </h3>
              <button onClick={() => setDeityModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    देवता / देवी का नाम (Hindi) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={deityForm.nameHi || ''}
                    onChange={(e) => setDeityForm({ ...deityForm, nameHi: e.target.value })}
                    placeholder="उदा. भगवान शिव (महादेव)"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none font-serif text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">English Name</label>
                  <input
                    type="text"
                    value={deityForm.nameEn || ''}
                    onChange={(e) => setDeityForm({ ...deityForm, nameEn: e.target.value })}
                    placeholder="e.g. Bhagavan Shiva (Mahadeva)"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">संस्कृत नाम (Sanskrit)</label>
                  <input
                    type="text"
                    value={deityForm.nameSa || ''}
                    onChange={(e) => setDeityForm({ ...deityForm, nameSa: e.target.value })}
                    placeholder="भगवान् शिवः (महादेवः)"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none font-serif"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={deityForm.slug || ''}
                    onChange={(e) => setDeityForm({ ...deityForm, slug: e.target.value })}
                    placeholder="bhagavan-shiva"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-mono focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={deityForm.imageUrl || ''}
                    onChange={(e) => setDeityForm({ ...deityForm, imageUrl: e.target.value })}
                    placeholder="/images/hero_diya.jpg"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-mono focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">पावन ध्यान मन्त्र (Primary Mantra)</label>
                <input
                  type="text"
                  value={deityForm.mantra || ''}
                  onChange={(e) => setDeityForm({ ...deityForm, mantra: e.target.value })}
                  placeholder="उदा. ॐ नमः शिवाय"
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none font-serif text-amber-950 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">स्वरूप एवं आयुध (Iconography & Symbols)</label>
                <input
                  type="text"
                  value={deityForm.iconography || ''}
                  onChange={(e) => setDeityForm({ ...deityForm, iconography: e.target.value })}
                  placeholder="त्रिशूल, डमरू, मस्तक पर अर्धचंद्र, जटा में गंगा, गले में वासुकि नाग..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">धार्मिक महत्व व दर्शन (Hindi Significance)</label>
                <textarea
                  rows={3}
                  value={deityForm.significanceHi || ''}
                  onChange={(e) => setDeityForm({ ...deityForm, significanceHi: e.target.value })}
                  placeholder="परम चेतना, अज्ञान व काम के संहारक, योगियों एवं ध्यानियों के परम आराध्य..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 font-serif focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">पौराणिक कथा व प्राकट्य (Hindi Katha)</label>
                <textarea
                  rows={3}
                  value={deityForm.storyHi || ''}
                  onChange={(e) => setDeityForm({ ...deityForm, storyHi: e.target.value })}
                  placeholder="भगवान शिव कल्याणकारी हैं। समुद्र मन्थन के समय सम्पूर्ण ब्रह्माण्ड की रक्षा हेतु उन्होंने कालकूट विष का पान किया..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 font-serif focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            <div className="px-6 py-3 border-t border-[#dcdcde] bg-[#f6f7f7] flex items-center justify-between">
              <button
                onClick={() => setDeityModalOpen(false)}
                className="px-3 py-1.5 border border-[#8c8f94] rounded text-stone-600 hover:bg-stone-100 font-semibold"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={handleSaveDeity}
                className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-1.5 rounded font-semibold flex items-center space-x-1.5 shadow-sm"
              >
                <span>{editingDeityId ? 'स्वरूप सुरक्षित करें (Save Deity)' : 'स्वरूप प्रकाशित करें (Publish Deity)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          14. DEVOTIONAL VIDEO CREATION / EDIT MODAL
      ========================================================================= */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-[#c3c4c7] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up text-xs">
            <div className="px-6 py-3.5 border-b border-[#dcdcde] flex items-center justify-between bg-[#f6f7f7]">
              <h3 className="font-bold text-[#1d2327] text-sm">
                {editingVideoId ? 'वीडियो विवरण संपादित करें (Edit Video)' : 'नया भक्ति वीडियो जोड़ें (Add Devotional Video)'}
              </h3>
              <button onClick={() => setVideoModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block font-bold text-stone-800 mb-1">
                  वीडियो शीर्षक (Video Title) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={videoForm.title || ''}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  placeholder="उदा. Shiv Tandav Stotram with Sanskrit Subtitles"
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">
                    YouTube Video ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={videoForm.youtubeId || ''}
                    onChange={(e) => setVideoForm({ ...videoForm, youtubeId: e.target.value })}
                    placeholder="e.g. KRhcTPKdmrk"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-mono focus:border-[#2271b1] focus:outline-none"
                  />
                  <span className="text-[10px] text-stone-500">YouTube URL से 11 अक्षरों का ID दर्ज करें</span>
                </div>

                <div>
                  <label className="block font-bold text-stone-800 mb-1">श्रेणी (Category)</label>
                  <select
                    value={videoForm.category || 'Mantras'}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 bg-white focus:border-[#2271b1] focus:outline-none"
                  >
                    <option value="Mantras">Mantras (मन्त्र जप)</option>
                    <option value="Bhajans">Bhajans (भजन व संकीर्तन)</option>
                    <option value="Discourses">Discourses (कथा व प्रवचन)</option>
                    <option value="Stories">Stories (पौराणिक कथाएं)</option>
                    <option value="Guided Meditation">Guided Meditation (ध्यान साधना)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-800 mb-1">अवधि (Duration)</label>
                  <input
                    type="text"
                    value={videoForm.duration || ''}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    placeholder="e.g. 09:14"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-800 mb-1">दृश्य संख्या (Views Count)</label>
                  <input
                    type="text"
                    value={videoForm.views || ''}
                    onChange={(e) => setVideoForm({ ...videoForm, views: e.target.value })}
                    placeholder="e.g. 240M"
                    className="w-full border border-[#8c8f94] rounded px-3 py-1.5 focus:border-[#2271b1] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">Thumbnail Image URL</label>
                <input
                  type="text"
                  value={videoForm.img || ''}
                  onChange={(e) => setVideoForm({ ...videoForm, img: e.target.value })}
                  placeholder="/images/hero_shiva.jpg"
                  className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-mono focus:border-[#2271b1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-800 mb-1">वीडियो विवरण (Description)</label>
                <textarea
                  rows={3}
                  value={videoForm.description || ''}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="Ravana's ecstatic Sanskrit hymn extolling the cosmic dance, matted locks, and supreme prowess of Lord Shiva..."
                  className="w-full border border-[#8c8f94] rounded px-3 py-2 focus:border-[#2271b1] focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            <div className="px-6 py-3 border-t border-[#dcdcde] bg-[#f6f7f7] flex items-center justify-between">
              <button
                onClick={() => setVideoModalOpen(false)}
                className="px-3 py-1.5 border border-[#8c8f94] rounded text-stone-600 hover:bg-stone-100 font-semibold"
              >
                रद्द करें (Cancel)
              </button>
              <button
                onClick={handleSaveVideo}
                className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-1.5 rounded font-semibold flex items-center space-x-1.5 shadow-sm"
              >
                <span>{editingVideoId ? 'वीडियो सुरक्षित करें (Save Video)' : 'वीडियो प्रकाशित करें (Publish Video)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          15. VIDEO EMBED PREVIEW MODAL
      ========================================================================= */}
      {videoPreviewId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-xl overflow-hidden shadow-2xl border border-stone-700 w-full max-w-3xl flex flex-col">
            <div className="px-4 py-3 bg-stone-850 flex items-center justify-between border-b border-stone-800 text-white text-xs">
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4 text-red-500" />
                <span className="font-bold">YouTube Video Embed Preview ({videoPreviewId})</span>
              </div>
              <button onClick={() => setVideoPreviewId(null)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoPreviewId}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
