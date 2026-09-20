export type Locale = 'en' | 'hi' | 'sa';

export interface LanguageOption {
  code: Locale;
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'sa', label: 'Sanskrit', nativeLabel: 'संस्कृतम्' },
];

export interface Dictionary {
  nav: {
    home: string;
    scriptures: string;
    books: string;
    shlokas: string;
    mantras: string;
    dharmaKnowledge: string;
    deities: string;
    temples: string;
    festivals: string;
    calendar: string;
    articles: string;
    store: string;
    search: string;
    account: string;
    admin: string;
    aiAssistant: string;
    cart: string;
    login: string;
    logout: string;
    register: string;
    profile: string;
    orders: string;
    bookmarks: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroHeading: string;
    heroSubheading: string;
    readScriptures: string;
    searchShlokas: string;
    digitalShelves: string;
    exploreScriptures: string;
    exploreBooks: string;
    todayPanchang: string;
    tithi: string;
    nakshatra: string;
    vrat: string;
    todayMantra: string;
    featuredScriptures: string;
    sacredShlokas: string;
    divineDeities: string;
    holyTemples: string;
    festivalsCalendar: string;
    storeHighlights: string;
    readMore: string;
    viewAll: string;
    verseOfDay: string;
  };
  reader: {
    originalSanskrit: string;
    transliteration: string;
    hindiTranslation: string;
    englishTranslation: string;
    wordByWord: string;
    commentary: string;
    fontSize: string;
    bookmark: string;
    bookmarked: string;
    share: string;
    chapter: string;
    verse: string;
    previous: string;
    next: string;
    provenance: string;
    rights: string;
    source: string;
    readingMode: string;
    darkReadingMode: string;
    lightReadingMode: string;
    readingProgress: string;
  };
  calendar: {
    title: string;
    subtitle: string;
    panchangDetails: string;
    paksha: string;
    shuklaPaksha: string;
    krishnaPaksha: string;
    yoga: string;
    karana: string;
    sunrise: string;
    sunset: string;
    upcomingFestivals: string;
    ekadashiDates: string;
    amavasya: string;
    purnima: string;
  };
  search: {
    placeholder: string;
    allCategories: string;
    scripturesFilter: string;
    booksFilter: string;
    shlokasFilter: string;
    deitiesFilter: string;
    templesFilter: string;
    articlesFilter: string;
    productsFilter: string;
    noResults: string;
    searching: string;
    resultsFound: string;
  };
  store: {
    title: string;
    subtitle: string;
    addToCart: string;
    inStock: string;
    outOfStock: string;
    price: string;
    mrp: string;
    discount: string;
    checkout: string;
    cartEmpty: string;
    orderPlaced: string;
    trackOrder: string;
    applyCoupon: string;
    subtotal: string;
    total: string;
    shipping: string;
    freeDelivery: string;
  };
  admin: {
    dashboard: string;
    contentCMS: string;
    scriptureManager: string;
    shlokaManager: string;
    storeManager: string;
    ordersManager: string;
    usersAndRoles: string;
    mediaLibrary: string;
    auditLogs: string;
    translationCompleteness: string;
    save: string;
    publish: string;
    draft: string;
    review: string;
    approved: string;
    delete: string;
    create: string;
    edit: string;
    status: string;
    action: string;
  };
  ai: {
    title: string;
    subtitle: string;
    askPrompt: string;
    disclaimer: string;
    sourceCitation: string;
    verifiedCanonOnly: string;
    send: string;
    exampleQuestions: string;
  };
  common: {
    brandName: string;
    brandTagline: string;
    enterSite: string;
    mantraAudio: string;
    mantraOn: string;
    mantraOff: string;
    skipIntro: string;
    loading: string;
    error: string;
    success: string;
    back: string;
    submit: string;
    cancel: string;
    viewDetails: string;
    allRightsReserved: string;
    sanatanDharmaPlatform: string;
  };
}
