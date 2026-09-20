// Static content dataset for Sanatan Dharma platform

export interface StaticDeity {
  id: string;
  slug: string;
  nameEn: string;
  nameHi: string;
  nameSa: string;
  mantra: string;
  iconography: string;
  significanceEn: string;
  significanceHi: string;
  significanceSa: string;
  storyEn?: string;
  storyHi?: string;
  imageUrl?: string;
  popularTemples?: string;
  festivals?: string;
  scripturalRefs?: string;
}

export interface StaticTemple {
  id: string;
  slug: string;
  nameEn: string;
  nameHi: string;
  nameSa: string;
  deityName: string;
  state: string;
  country: string;
  city: string;
  historyEn: string;
  historyHi: string;
  timings?: string;
  significance?: string;
  imageUrl?: string;
}

export interface StaticFestival {
  id: string;
  slug: string;
  nameEn: string;
  nameHi: string;
  nameSa: string;
  lunarMonth: string;
  tithi: string;
  descriptionEn: string;
  descriptionHi: string;
  pujaVidhiEn?: string;
  pujaVidhiHi?: string;
  associatedDeity?: string;
  isMajor?: boolean;
}

export interface StaticScripture {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  titleSa: string;
  category: string;
  description: string;
  coverImage?: string;
  provenance?: string;
  chaptersCount?: number;
  totalVerses?: number;
}

export const DEFAULT_DEITIES: StaticDeity[] = [
  {
    id: 'd1',
    slug: 'bhagavan-shiva',
    nameEn: 'Bhagavan Shiva (Mahadeva)',
    nameHi: 'भगवान शिव (महादेव)',
    nameSa: 'भगवान् शिवः (महादेवः)',
    mantra: 'ॐ नमः शिवाय',
    iconography: 'Trishula, Damaru, Crescent Moon, Ganga in Jata, Vasuki Naga around neck, Bhasma',
    significanceEn: 'The Supreme Consciousness, destroyer of illusion, patron of yogis and meditators.',
    significanceHi: 'परम चेतना, अज्ञान व काम के संहारक, योगियों एवं ध्यानियों के परम आराध्य।',
    significanceSa: 'परमचेतना, कैवल्यप्रदाता, देवाधिदेवः महादेवः।',
    storyEn: 'Lord Shiva is the Auspicious One (Shivam), formless yet encompassing all forms. He drank the Halahala poison during the Samudra Manthan to save the universe.',
    storyHi: 'भगवान शिव कल्याणकारी हैं। समुद्र मन्थन के समय सम्पूर्ण ब्रह्माण्ड की रक्षा हेतु उन्होंने कालकूट विष का पान किया और नीलकंठ कहलाए।',
    imageUrl: '/images/hero_diya.jpg',
    popularTemples: JSON.stringify(['Kashi Vishwanath', 'Kedarnath', 'Mahakaleshwar', 'Somnath', 'Rameshwaram']),
    festivals: JSON.stringify(['Maha Shivaratri', 'Shravan Somvar', 'Pradosha Vrat']),
    scripturalRefs: JSON.stringify(['Shiva Purana', 'Shvetashvatara Upanishad', 'Yajurveda Shri Rudram']),
  },
  {
    id: 'd2',
    slug: 'bhagavan-shri-krishna',
    nameEn: 'Bhagavan Shri Krishna',
    nameHi: 'भगवान श्रीकृष्ण',
    nameSa: 'भगवान् श्रीकृष्णः',
    mantra: 'ॐ नमो भगवते वासुदेवाय',
    iconography: 'Peacock Feather (Mor Pankh), Flute (Bansuri), Pitambara, Vaijayanti Mala',
    significanceEn: 'The Supreme Personality of Godhead, revealer of Srimad Bhagavad Gita, embodiment of divine love and wisdom.',
    significanceHi: 'पूर्ण पुरुषोत्तम परमेश्वर, श्रीमद्भगवद्गीता के उद्गाता, ज्ञान, कर्म एवं प्रेम के परम स्वरूप।',
    significanceSa: 'कृष्णस्तु भगवान् स्वयम्, सर्ववेदान्तसारभूतगीताप्रदाता।',
    storyEn: 'Shri Krishna descended in the Dwapara Yuga to protect dharma, vanquish adharma, and guide humanity through eternal wisdom spoken to Arjuna in the Kurukshetra battlefield.',
    storyHi: 'द्वापर युग में धर्म की संस्थापना, अधर्म के विनाश और कुरुक्षेत्र के धर्मयुद्ध में अर्जुन को गीता का दिव्य उपदेश देने हेतु श्रीकृष्ण का पावन अवतरण हुआ।',
    imageUrl: '/images/category_shlokas.jpg',
    popularTemples: JSON.stringify(['Dwarkadhish', 'Banke Bihari Vrindavan', 'Jagannath Puri', 'Guruvayur']),
    festivals: JSON.stringify(['Krishna Janmashtami', 'Radhashtami', 'Gita Jayanti', 'Holi']),
    scripturalRefs: JSON.stringify(['Srimad Bhagavad Gita', 'Srimad Bhagavatam', 'Mahabharata']),
  },
  {
    id: 'd3',
    slug: 'devi-durga',
    nameEn: 'Maa Durga (Adishakti)',
    nameHi: 'माँ दुर्गा (आदिशक्ति)',
    nameSa: 'देवी दुर्गा (आदिशक्तिः)',
    mantra: 'ॐ दुं दुर्गायै नमः',
    iconography: 'Simha Vahana (Lion), Ashtabhuja (8 arms) holding weapons of the devas, Lotus',
    significanceEn: 'The primordial divine feminine energy (Shakti), invincible protector from evil and distress.',
    significanceHi: 'सृष्टि की आद्याशक्ति, दुर्गतिनाशिनी, समस्त दैवी शक्तियों का संयुक्त पावन स्वरूप।',
    significanceSa: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते।',
    storyEn: 'Manifested from the combined effulgence of all devas to slay Mahishasura and restore cosmic order, Maa Durga is the loving mother and fearless protector.',
    storyHi: 'समस्त देवताओं के सम्मिलित तेज से महिषासुर वध एवं धर्म की रक्षा हेतु भगवती दुर्गा का प्राकट्य हुआ।',
    imageUrl: '/images/category_kathas.jpg',
    popularTemples: JSON.stringify(['Vaishno Devi', 'Kamakhya Temple', 'Kalighat', 'Meenakshi Amman']),
    festivals: JSON.stringify(['Sharad Navratri', 'Chaitra Navratri', 'Durga Puja', 'Vijayadashami']),
    scripturalRefs: JSON.stringify(['Devi Mahatmyam', 'Devi Bhagavatam', 'Markandeya Purana']),
  },
  {
    id: 'd4',
    slug: 'shri-rama',
    nameEn: 'Maryada Purushottam Shri Rama',
    nameHi: 'मर्यादा पुरुषोत्तम श्रीराम',
    nameSa: 'मर्यादापुरुषोत्तमः श्रीरामः',
    mantra: 'श्री राम जय राम जय जय राम',
    iconography: 'Kodanda Bow, Arrow, Crown, Gentle smile, Calm blue hue',
    significanceEn: 'The seventh avatar of Vishnu, embodiment of righteousness, truth, and ideal duty (dharma).',
    significanceHi: 'श्रीहरि के सातवें पूर्णावतार, सत्य, धर्म, मर्यादा एवं आदर्श जीवन के सर्वोच्च प्रतिमान।',
    significanceSa: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।',
    storyEn: 'Shri Rama demonstrated the highest ideals of son, king, husband, and warrior, establishing Ramrajya based on righteousness.',
    storyHi: 'श्रीराम ने जीवन के प्रत्येक सम्बंध और कर्तव्य में मर्यादा का पालन कर रामराज्य की स्थापना की।',
    imageUrl: '/images/hero_diya.jpg',
    popularTemples: JSON.stringify(['Ram Mandir Ayodhya', 'Rameswaram', 'Bhadrachalam', 'Kalaram Mandir']),
    festivals: JSON.stringify(['Ram Navami', 'Diwali', 'Dussehra']),
    scripturalRefs: JSON.stringify(['Valmiki Ramayana', 'Ramcharitmanas', 'Adhyatma Ramayana']),
  },
  {
    id: 'd5',
    slug: 'bhagavan-ganesha',
    nameEn: 'Bhagavan Ganesha (Vighnaharta)',
    nameHi: 'भगवान गणेश (विघ्नहर्ता)',
    nameSa: 'भगवान् गणेशः (विघ्नहर्ता)',
    mantra: 'ॐ गं गणपतये नमः',
    iconography: 'Gajamukha (Elephant head), Ekadanta, Modaka, Pasha, Ankusha, Mushaka Vahana',
    significanceEn: 'The remover of all obstacles, master of intellect and wisdom, worshipped first before all undertakings.',
    significanceHi: 'समस्त विघ्नों के नाशक, बुद्धि एवं विवेक के दाता, प्रथम पूज्य देव।',
    significanceSa: 'वक्रतुण्ड महाकाय सूर्यकोटिसमप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    storyEn: 'Created by Devi Parvati and blessed by Lord Shiva to be revered first in all sacred ceremonies, bringing success and peace.',
    storyHi: 'माता पार्वती के पावन संकल्प से प्रकट, महादेव द्वारा प्रथम पूज्यता का वरदान प्राप्त।',
    imageUrl: '/images/category_aartis.jpg',
    popularTemples: JSON.stringify(['Siddhivinayak Mumbai', 'Ashtavinayak Temples', 'Trinetra Ganesha Ranthambore']),
    festivals: JSON.stringify(['Ganesh Chaturthi', 'Sankashti Chaturthi']),
    scripturalRefs: JSON.stringify(['Ganesha Purana', 'Mudgala Purana', 'Ganapati Atharvashirsha']),
  },
  {
    id: 'd6',
    slug: 'bhagavan-hanuman',
    nameEn: 'Bhagavan Hanuman (Sankat Mochan)',
    nameHi: 'भगवान हनुमान (संकट मोचन)',
    nameSa: 'भगवान् हनुमान् (सङ्कटमोचनः)',
    mantra: 'ॐ हं हनुमते नमः',
    iconography: 'Gada (Mace), Dronagiri Mountain, Sinduri color, Folded hands in devotion to Rama',
    significanceEn: 'The supreme embodiment of selfless devotion (bhakti), strength, courage, and unwavering faith.',
    significanceHi: 'परम रामभक्त, अष्टसिद्धि एवं नवनिधि के दाता, संकटमोचन एवं असीम पराक्रम के प्रतीक।',
    significanceSa: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्। वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
    storyEn: 'Rudravatara Hanuman leap across the ocean to Lanka, brought Sanjeevani herb to revive Lakshmana, and serves Lord Rama eternally.',
    storyHi: 'महाबलशाली हनुमान जी ने समुद्र पार कर सीताजी की खोज की और लक्ष्मण जी के प्राणों की रक्षा हेतु द्रोणागिरि पर्वत उठाया।',
    imageUrl: '/images/category_shlokas.jpg',
    popularTemples: JSON.stringify(['Sankat Mochan Varanasi', 'Hanumangarhi Ayodhya', 'Mehndipur Balaji', 'Salasar Balaji']),
    festivals: JSON.stringify(['Hanuman Jayanti', 'Tuesday & Saturday Vrat']),
    scripturalRefs: JSON.stringify(['Sundarakanda', 'Hanuman Chalisa', 'Shiva Purana']),
  },
];

export const DEFAULT_TEMPLES: StaticTemple[] = [
  {
    id: 't1',
    slug: 'kashi-vishwanath',
    nameEn: 'Kashi Vishwanath Temple',
    nameHi: 'काशी विश्वनाथ ज्योतिर्लिंग',
    nameSa: 'काशीविश्वनाथज्योतिर्लिङ्गम्',
    deityName: 'Bhagavan Shiva',
    state: 'Uttar Pradesh',
    country: 'Bharat (India)',
    city: 'Varanasi',
    historyEn: 'One of the twelve sacred Jyotirlingas, situated on the western bank of the holy Ganga in Varanasi, the oldest living city of the world.',
    historyHi: 'द्वादश ज्योतिर्लिंगों में प्रमुख, मोक्षदायिनी काशी में पतितपावनी मां गंगा के पश्चिमी तट पर प्रतिष्ठित अनादि ज्योतिर्लिंग।',
    timings: '03:00 AM - 11:00 PM (Mangala Aarti to Shayan Aarti)',
    significance: 'Liberation (Moksha) is granted to any living being departing their physical body in Kashi.',
    imageUrl: '/images/hero_diya.jpg',
  },
  {
    id: 't2',
    slug: 'kedarnath-dham',
    nameEn: 'Kedarnath Dham',
    nameHi: 'श्री केदारनाथ धाम',
    nameSa: 'केदारनाथधाम',
    deityName: 'Bhagavan Shiva',
    state: 'Uttarakhand',
    country: 'Bharat (India)',
    city: 'Rudraprayag',
    historyEn: 'Perched in the majestic Garhwal Himalayas near the Mandakini river at an elevation of 3,583 meters, established by the Pandavas and Adi Shankara.',
    historyHi: 'हिमालय की सुरम्य वादियों में मंदाकिनी नदी के तट पर ३५८३ मीटर की ऊंचाई पर स्थित द्वादश ज्योतिर्लिंगों में सर्वोच्च धाम।',
    timings: '05:00 AM - 09:00 PM (Opens Akshay Tritiya to Kartik Purnima)',
    significance: 'Highest of the 12 Jyotirlingas and part of Chota Char Dham.',
    imageUrl: '/images/category_kathas.jpg',
  },
  {
    id: 't3',
    slug: 'tirupati-balaji',
    nameEn: 'Tirupati Sri Venkateswara Temple',
    nameHi: 'तिरुपति श्री वेंकटेश्वर मन्दिर',
    nameSa: 'श्रीवेङ्कटेश्वरमन्दिरम् (तिरुमल)',
    deityName: 'Bhagavan Vishnu / Venkateswara',
    state: 'Andhra Pradesh',
    country: 'Bharat (India)',
    city: 'Tirupati (Tirumala)',
    historyEn: 'Located on the Seventh Peak of Tirumala Hills (Venkatadri), Sri Venkateswara is celebrated as the Kaliyuga Varada, granting boons to devotees in the present age.',
    historyHi: 'सप्तगिरि पर्वतों के वेंकटाद्रि शिखर पर प्रतिष्ठित कलियुग प्रत्यक्ष देव भगवान श्री वेंकटेश्वर का पावन महातीर्थ।',
    timings: '02:30 AM - 01:30 AM (Suprabhatam to Ekanta Seva)',
    significance: 'Foremost pilgrimage destination attracting millions of seekers worldwide.',
    imageUrl: '/images/category_aartis.jpg',
  },
  {
    id: 't4',
    slug: 'mahakaleshwar-ujjain',
    nameEn: 'Shri Mahakaleshwar Jyotirlinga',
    nameHi: 'श्री महाकालेश्वर ज्योतिर्लिंग (उज्जैन)',
    nameSa: 'महाकालेश्वरज्योतिर्लिङ्गम्',
    deityName: 'Bhagavan Shiva',
    state: 'Madhya Pradesh',
    country: 'Bharat (India)',
    city: 'Ujjain',
    historyEn: 'The only south-facing (Dakshinmukhi) Jyotirlinga, situated on the banks of river Shipra in the ancient sacred city of Avantika (Ujjain).',
    historyHi: 'शिप्रा के पावन तट पर स्थित एकमात्र दक्षिणमुखी ज्योतिर्लिंग, जहां काल के भी काल महाकाल का नित्य भस्म आरती से पूजन होता है।',
    timings: '04:00 AM - 11:00 PM (Bhasma Aarti at 04:00 AM)',
    significance: 'Presiding deity of Time and Death, liberating seekers from fear of mortality.',
    imageUrl: '/images/hero_diya.jpg',
  },
];

export const DEFAULT_FESTIVALS: StaticFestival[] = [
  {
    id: 'f1',
    slug: 'maha-shivaratri',
    nameEn: 'Maha Shivaratri',
    nameHi: 'महाशिवरात्रि',
    nameSa: 'महाशिवरात्रिव्रतम्',
    lunarMonth: 'Phalguna',
    tithi: 'Krishna Chaturdashi',
    descriptionEn: 'The Great Night of Shiva, celebrating the convergence of Shiva and Shakti and the cosmic dance of creation.',
    descriptionHi: 'भगवान शिव और माता पार्वती के दिव्य विवाह एवं सृष्टि के पावन प्राकट्य की महारात्रि।',
    pujaVidhiEn: 'Observe day-and-night fast, offer continuous Bilva patra, Ganga water, milk, and perform four-prahara Rudrabhishek.',
    pujaVidhiHi: 'दिन-रात्रि उपवास रखें, चार प्रहर रुद्राभिषेक करें, बेलपत्र, गंगाजल, धतूरा और भस्म अर्पित करें।',
    associatedDeity: 'Bhagavan Shiva',
    isMajor: true,
  },
  {
    id: 'f2',
    slug: 'deepavali',
    nameEn: 'Deepavali (Diwali)',
    nameHi: 'दीपावली (प्रकाश पर्व)',
    nameSa: 'दीपावली (महालक्ष्मीपूजनम्)',
    lunarMonth: 'Kartika',
    tithi: 'Amavasya',
    descriptionEn: 'The Festival of Lights symbolizing the victory of light over darkness, knowledge over ignorance, and truth over falsehood.',
    descriptionHi: 'अंधकार पर प्रकाश और अधर्म पर धर्म की विजय का महापर्व, श्रीराम के अयोध्या आगमन एवं महालक्ष्मी का पूजन।',
    pujaVidhiEn: 'Cleanse and illuminate homes with earthen oil lamps (diyas), perform Shri Lakshmi-Ganesha puja in Pradosh/Nishita Kaal.',
    pujaVidhiHi: 'मिट्टी के दीपकों से गृह को आलोकित करें, प्रदोष काल में शुभ मुहूर्त में श्रीलक्ष्मी-गणेश पूजन करें।',
    associatedDeity: 'Maa Lakshmi & Shri Ganesha',
    isMajor: true,
  },
  {
    id: 'f3',
    slug: 'krishna-janmashtami',
    nameEn: 'Krishna Janmashtami',
    nameHi: 'श्रीकृष्ण जन्माष्टमी',
    nameSa: 'श्रीकृष्णजन्माष्टमी',
    lunarMonth: 'Bhadrapada',
    tithi: 'Krishna Ashtami (Rohini Nakshatra)',
    descriptionEn: 'Celebration of the midnight birth of Bhagavan Shri Krishna in Mathura to vanquish evil and establish eternal dharma.',
    descriptionHi: 'रोहिणी नक्षत्र में आधी रात को पूर्णब्रह्म भगवान श्रीकृष्ण के पावन अवतरण का महापर्व।',
    pujaVidhiEn: 'Nirjala/Phalahar fast until midnight, swing Laddu Gopal in Jhula, offer Makhan-Mishri and 56 Bhog.',
    pujaVidhiHi: 'मध्यरात्रि तक उपवास, लड्डू गोपाल का पंचामृत अभिषेक, झूला झुलाना एवं माखन-मिश्री का भोग लगाना।',
    associatedDeity: 'Bhagavan Shri Krishna',
    isMajor: true,
  },
  {
    id: 'f4',
    slug: 'sharad-navratri',
    nameEn: 'Sharad Navratri',
    nameHi: 'शारदीय नवरात्रि',
    nameSa: 'शारदीयनवरात्रम्',
    lunarMonth: 'Ashwin',
    tithi: 'Shukla Pratipada to Navami',
    descriptionEn: 'Nine sacred nights dedicated to the nine forms of Maa Durga (Navadurga), invoking divine protection and spiritual renewal.',
    descriptionHi: 'माँ जगदम्बा के नौ पावन स्वरूपों (नवदुर्गा) की आराधना, घटस्थापना एवं कन्या पूजन का दिव्य पर्व।',
    pujaVidhiEn: 'Ghatasthapana on Pratipada, daily recitation of Durga Saptashati, Akhand Jyot, Kanya Pujan on Ashtami/Navami.',
    pujaVidhiHi: 'घटस्थापना, अखण्ड ज्योति, दुर्गा सप्तशती का नित्य पाठ एवं अष्टमी-नवमी को कन्या पूजन।',
    associatedDeity: 'Maa Durga (Navadurga)',
    isMajor: true,
  },
];

export const DEFAULT_SCRIPTURES: StaticScripture[] = [
  {
    id: 's1',
    slug: 'bhagavad-gita',
    titleEn: 'Srimad Bhagavad Gita',
    titleHi: 'श्रीमद्भगवद्गीता',
    titleSa: 'श्रीमद्भगवद्गीता',
    category: 'Gita',
    description: 'The supreme dialogue between Bhagavan Shri Krishna and Arjuna on the sacred battlefield of Kurukshetra, encompassing Karma, Bhakti, and Jnana Yoga.',
    coverImage: '/images/hero_diya.jpg',
    provenance: 'Mahabharata Bhishma Parva, Vedavyasa',
    chaptersCount: 18,
    totalVerses: 700,
  },
  {
    id: 's2',
    slug: 'isha-upanishad',
    titleEn: 'Isha Upanishad',
    titleHi: 'ईशावास्योपनिषद्',
    titleSa: 'ईशावास्योपनिषत्',
    category: 'Upanishad',
    description: 'The foundational Upanishad of the Shukla Yajurveda, opening with the magnificent realization: Īśā vāsyam idaṁ sarvam (All this is enveloped by the Divine).',
    coverImage: '/images/category_shlokas.jpg',
    provenance: 'Shukla Yajurveda, Kanva/Madhyandina Shakha',
    chaptersCount: 1,
    totalVerses: 18,
  },
  {
    id: 's3',
    slug: 'mandukya-upanishad',
    titleEn: 'Mandukya Upanishad',
    titleHi: 'माण्डूक्योपनिषद्',
    titleSa: 'माण्डूक्योपनिषत्',
    category: 'Upanishad',
    description: 'The shortest yet most profound Upanishad, expounding the sacred syllable Om (A-U-M) and the four states of consciousness culminating in Turiya (Pure Consciousness).',
    coverImage: '/images/category_aartis.jpg',
    provenance: 'Atharvaveda, Shaunaka Shakha',
    chaptersCount: 1,
    totalVerses: 12,
  },
  {
    id: 's4',
    slug: 'rigveda-samhita',
    titleEn: 'Rigveda Samhita (Selected Suktas)',
    titleHi: 'ऋग्वेद संहिता (प्रमुख सूक्त)',
    titleSa: 'ऋग्वेदसंहिता',
    category: 'Veda',
    description: 'The oldest sacred scripture of humanity, containing divine poetic revelations of the ancient Vedic Rishis praising Agni, Indra, Varuna, and the Cosmic Order (Rta).',
    coverImage: '/images/category_kathas.jpg',
    provenance: 'Rigveda, Shakala Shakha',
    chaptersCount: 10,
    totalVerses: 1028,
  },
];
