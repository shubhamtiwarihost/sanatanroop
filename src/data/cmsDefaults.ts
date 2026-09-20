// Canonical CMS Initial Data for SanatanRoop Platform
// Provides default rich content for Aartis, Vrat Kathas, Spiritual Books, and Shlokas

export interface CMSAartiItem {
  id: string;
  deity: string;
  category: 'all' | 'ganesha' | 'shiva' | 'durga' | 'hanuman' | 'vishnu' | 'lakshmi' | 'ram' | string;
  titleHi: string;
  titleEn: string;
  tagline: string;
  lyricsHi: string;
  lyricsEn: string;
  meaning: string;
  youtubeId: string;
  singer: string;
  duration: string;
  audioTrack?: {
    id: string;
    title: string;
    audioUrl: string;
    subtitle: string;
  };
  status: 'Published' | 'Draft';
}

export interface CMSKathaChapter {
  title: string;
  content: string;
}

export interface CMSKathaItem {
  id: string;
  titleHi: string;
  titleEn: string;
  category: 'vrat' | 'ekadashi' | 'pauranik' | 'devi' | string;
  deity: string;
  dayOrTithi: string;
  shortDesc: string;
  vidhi: string[];
  chapters: CMSKathaChapter[];
  phalaShruti: string;
  status: 'Published' | 'Draft';
}

export interface CMSBookItem {
  id: string;
  titleHi: string;
  titleEn: string;
  category: 'all' | 'vedas' | 'upanishads' | 'itihasa' | 'gita' | 'puranas' | 'darshana' | string;
  categoryLabel: string;
  author: string;
  versesCount: string;
  languages?: string[];
  coverTheme?: {
    bgGradient: string;
    accentColor: string;
    borderColor: string;
    emblem: string;
    sacredHeader: string;
    spineGradient: string;
  };
  colorCode?: string;
  shortSummary: string;
  fullOverview: string;
  sampleChapterTitle?: string;
  sampleVerseSanskrit?: string;
  sampleVerseHindi?: string;
  sampleVerseEnglish?: string;
  readOnlineUrl?: string;
  status: 'Published' | 'Draft';
}

export interface CMSShlokaItem {
  id: string;
  source: string;
  chapterVerse: string;
  sanskrit: string;
  transliteration: string;
  meter: string;
  hindi: string;
  english: string;
  category: string;
  scriptureSlug: string;
  youtubeId?: string;
  status: 'Published' | 'Draft';
}

export const DEFAULT_CMS_AARTIS: CMSAartiItem[] = [
  {
    id: 'aarti-ganesh',
    deity: 'श्री गणेश जी',
    category: 'ganesha',
    titleHi: 'श्री गणेश जी की आरती (Jai Ganesh Deva)',
    titleEn: 'Shri Ganesh Aarti',
    tagline: 'विघ्नहर्ता भगवान श्री गणेश की पावन आरती',
    lyricsHi: `जय गणेश, जय गणेश, जय गणेश देवा ।
माता जाकी पार्वती, पिता महादेवा ॥

एक दन्त, दयावन्त, चार भुजाधारी ।
माथे सिन्दूर सोहे, मूसे की सवारी ॥
पान चढ़े, फूल चढ़े और चढ़े मेवा ।
लड्डुअन का भोग लगे, सन्त करें सेवा ॥

जय गणेश, जय गणेश, जय गणेश देवा ।
माता जाकी पार्वती, पिता महादेवा ॥

अन्धन को आँख देत, कोढ़िन को काया ।
बाँझन को पुत्र देत, निर्धन को माया ॥
'सूर' श्याम शरण आए, सफल कीजे सेवा ।
माता जाकी पार्वती, पिता महादेवा ॥

दीनन की लाज राखो, शम्भु सुत वारी ।
कामना को पूर्ण करो, जग बलिहारी ॥
जय गणेश, जय गणेश, जय गणेश देवा ।
माता जाकी पार्वती, पिता महादेवा ॥`,
    lyricsEn: `Jai Ganesh, Jai Ganesh, Jai Ganesh Deva |
Mata Jaki Parvati, Pita Mahadeva ||

Ek Dant, Dayawant, Chaar Bhujadhari |
Mathe Sindoor Sohe, Muse Ki Sawari ||
Paan Chadhe, Phool Chadhe Aur Chadhe Mewa |
Ladduan Ka Bhog Lage, Sant Karein Sewa ||

Jai Ganesh, Jai Ganesh, Jai Ganesh Deva |
Mata Jaki Parvati, Pita Mahadeva ||

Andhan Ko Aankh Det, Kodhin Ko Kaya |
Banjhan Ko Putra Det, Nirdhan Ko Maya ||
'Sur' Shyam Sharan Aaye, Safal Kije Sewa |
Mata Jaki Parvati, Pita Mahadeva ||

Deenan Ki Laaj Rakho, Shambhu Sut Vaari |
Kamana Ko Pooran Karo, Jag Balihari ||
Jai Ganesh, Jai Ganesh, Jai Ganesh Deva |
Mata Jaki Parvati, Pita Mahadeva ||`,
    meaning: 'Glory to Lord Ganesha, son of Goddess Parvati and Lord Shiva. The compassionate one with a single tusk, four arms, adorned with vermilion on the forehead, riding the mouse. Devotees offer betel leaves, flowers, and sweets. He bestows sight to the blind, health to the sick, children to the childless, and wealth to the impoverished. Protect our honor, O son of Shambhu!',
    youtubeId: 'Ll5Ccg1qWdc',
    singer: 'अनुराधा पौडवाल (Anuradha Paudwal)',
    duration: '4:21',
    audioTrack: {
      id: 'audio-ganesh',
      title: 'श्री गणेश जी की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Lord Ganesha Devotional Aarti',
    },
    status: 'Published',
  },
  {
    id: 'aarti-jagdish',
    deity: 'भगवान श्री विष्णु',
    category: 'vishnu',
    titleHi: 'श्री जगदीश जी की आरती (Om Jai Jagdish Hare)',
    titleEn: 'Shri Jagdish Aarti',
    tagline: 'सर्वव्यापी प्रभु श्री हरि विष्णु की विश्वप्रसिद्ध आरती',
    lyricsHi: `ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे ।
भक्त जनों के संकट, दास जनों के संकट,
क्षण में दूर करे ॥ ॐ जय जगदीश हरे ॥

जो ध्यावे फल पावे, दुःख बिनसे मन का ।
सुख सम्पत्ति घर आवे, कष्ट मिटे तन का ॥ ॐ जय जगदीश हरे ॥

मात पिता तुम मेरे, शरण गहूं किसकी ।
तुम बिन और न दूजा, आस करूं जिसकी ॥ ॐ जय जगदीश हरे ॥

तुम पूरण परमात्मा, तुम अन्तर्यामी ।
पारब्रह्म परमेश्वर, तुम सब के स्वामी ॥ ॐ जय जगदीश हरे ॥

तुम करुणा के सागर, तुम पालनकर्ता ।
मैं मूरख खल कामी, कृपा करो भर्ता ॥ ॐ जय जगदीश हरे ॥

तुम हो एक अगोचर, सब के प्राणपति ।
किस विधि मिलूं दयामय, तुमको मैं कुमति ॥ ॐ जय जगदीश हरे ॥

दीनबन्धु दुखहर्ता, तुम ठाकुर मेरे ।
अपने हाथ उठाओ, द्वार पड़ा तेरे ॥ ॐ जय जगदीश हरे ॥

विषय विकार मिटाओ, पाप हरो देवा ।
श्रद्धा भक्ति बढ़ाओ, सन्तन की सेवा ॥ ॐ जय जगदीश हरे ॥

तन मन धन सब कुछ है तेरा, स्वामी सब कुछ है तेरा ।
तेरा तुझको अर्पण, क्या लागे मेरा ॥ ॐ जय जगदीश हरे ॥

श्री जगदीश जी की आरती, जो कोई नर गावे ।
कहत शिवानन्द स्वामी, मनवांछित फल पावे ॥ ॐ जय जगदीश हरे ॥`,
    lyricsEn: `Om Jai Jagdish Hare, Swami Jai Jagdish Hare |
Bhakta Jano Ke Sankat, Daas Jano Ke Sankat,
Kshan Mein Door Kare || Om Jai Jagdish Hare ||

Jo Dhyave Phal Pave, Dukh Binase Man Ka |
Sukh Sampatti Ghar Aave, Kasht Mite Tan Ka || Om Jai Jagdish Hare ||

Maat Pita Tum Mere, Sharan Gahoon Kiski |
Tum Bin Aur Na Dooja, Aas Karoon Jiski || Om Jai Jagdish Hare ||

Tum Pooran Paramatma, Tum Antaryami |
Parabrahma Parameshwar, Tum Sab Ke Swami || Om Jai Jagdish Hare ||

Tum Karuna Ke Sagar, Tum Palanakarta |
Main Moorakh Khal Kami, Kripa Karo Bharta || Om Jai Jagdish Hare ||

Tum Ho Ek Agochar, Sab Ke Pranapati |
Kis Vidhi Miloon Dayamaya, Tumko Main Kumati || Om Jai Jagdish Hare ||

Deenabandhu Dukhaharta, Tum Thakur Mere |
Apne Haath Uthao, Dwaar Pada Tere || Om Jai Jagdish Hare ||

Vishaya Vikaar Mitao, Paap Haro Deva |
Shraddha Bhakti Badhao, Santan Ki Sewa || Om Jai Jagdish Hare ||

Tan Man Dhan Sab Kuch Hai Tera, Swami Sab Kuch Hai Tera |
Tera Tujhko Arpan, Kya Lage Mera || Om Jai Jagdish Hare ||

Shri Jagdish Ji Ki Aarti, Jo Koi Nar Gave |
Kahat Shivananda Swami, Manvaanchhit Phal Paave || Om Jai Jagdish Hare ||`,
    meaning: 'Glory to Lord Vishnu, the Lord of the Universe, who removes the troubles of devotees in an instant. You are Mother and Father, the Supreme Soul and Inner Dweller. You are the Ocean of Compassion and the Sustainer of all. I surrender body, mind, and wealth to You, for everything belongs to You.',
    youtubeId: 'rRYbHX0DUGo',
    singer: 'लखबीर सिंह लक्खा व अनुराधा पौडवाल',
    duration: '6:12',
    audioTrack: {
      id: 'audio-jagdish',
      title: 'श्री जगदीश जी की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Universal Aarti of Lord Vishnu',
    },
    status: 'Published',
  },
  {
    id: 'aarti-shiv',
    deity: 'भगवान शिव',
    category: 'shiva',
    titleHi: 'श्री शिव जी की आरती (Om Jai Shiv Omkara)',
    titleEn: 'Shri Shiv Aarti',
    tagline: 'देवाधिदेव महादेव शिव शंकर की दिव्य आरती',
    lyricsHi: `ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा ।
ब्रह्मा, विष्णु, सदाशिव, अर्द्धांगी धारा ॥ ॐ जय शिव ओंकारा ॥

एकानन चतुरानन पञ्चानन राजे ।
हंसासन गरुड़ासन वृषवाहन साजे ॥ ॐ जय शिव ओंकारा ॥

दो भुज चार चतुर्भुज दसभुज अति सोहे ।
तीनों रूप निरखता त्रिभुवन जन मोहे ॥ ॐ जय शिव ओंकारा ॥

अक्षमाला वनमाला मुण्डमालाधारी ।
त्रिपुरारी कंसारी करमाला धारी ॥ ॐ जय शिव ओंकारा ॥

श्वेताम्बर पीताम्बर बाघम्बर अंगे ।
सनकादिक गरुड़ादिक भूतादिक संगे ॥ ॐ जय शिव ओंकारा ॥

कर के मध्य कमण्डलु चक्र त्रिशूलधारी ।
सुखकारी दुखहारी जगपालनकारी ॥ ॐ जय शिव ओंकारा ॥

ब्रह्मा विष्णु सदाशिव जानत अविवेका ।
प्रणवाक्षर के मध्ये ये तीनों एका ॥ ॐ जय शिव ओंकारा ॥

त्रिगुण शिवजी की आरती जो कोई नर गावे ।
कहत शिवानन्द स्वामी, मनवांछित फल पावे ॥ ॐ जय शिव ओंकारा ॥`,
    lyricsEn: `Om Jai Shiv Omkara, Swami Jai Shiv Omkara |
Brahma, Vishnu, Sadashiv, Ardhangi Dhara || Om Jai Shiv Omkara ||

Ekanan Chaturanan Panchanan Raje |
Hansasana Garudasana Vrishavahana Saje || Om Jai Shiv Omkara ||

Do Bhuja Chaar Chaturbhuja Dasabhuja Ati Sohe |
Teenon Roop Nirakhata Tribhuvana Jana Mohe || Om Jai Shiv Omkara ||

Akshamala Vanamala Mundamala Dhari |
Tripurari Kansari Karmala Dhari || Om Jai Shiv Omkara ||

Shwetambar Peetambar Baghambar Ange |
Sanakadik Garudadik Bhootadik Sange || Om Jai Shiv Omkara ||

Kar Ke Madhye Kamandalu Chakra Trishuldhari |
Sukhakari Dukhahari Jagapalanakari || Om Jai Shiv Omkara ||

Brahma Vishnu Sadashiv Jaanat Aviveka |
Pranavakshara Ke Madhye Ye Teeno Eka || Om Jai Shiv Omkara ||

Trigun Shivji Ki Aarti Jo Koi Nar Gave |
Kahat Shivananda Swami, Manvaanchhit Phal Paave || Om Jai Shiv Omkara ||`,
    meaning: 'Hail to Lord Shiva, the sacred Omkara! Brahma, Vishnu, and Sadashiva are undivided in You. Holding the trident, kamandalu, and damru, You bring peace and liberation. Within the sacred syllable AUM, the holy trinity is one.',
    youtubeId: 'Yb2GMwJyGnE',
    singer: 'अनुराधा पौडवाल (Anuradha Paudwal)',
    duration: '6:44',
    audioTrack: {
      id: 'audio-shiv',
      title: 'श्री शिव जी की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Maha Shiv Aarti',
    },
    status: 'Published',
  },
  {
    id: 'aarti-durga',
    deity: 'माँ दुर्गा',
    category: 'durga',
    titleHi: 'श्री अम्बे माता की आरती (Jai Ambe Gauri)',
    titleEn: 'Shri Durga Aarti',
    tagline: 'माँ जगदम्बा, भगवती आद्यशक्ति की पावन आरती',
    lyricsHi: `जय अम्बे गौरी, मैया जय श्यामा गौरी ।
तुमको निसदिन ध्यावत, हरि ब्रह्मा शिवरी ॥ जय अम्बे गौरी ॥

मांग सिन्दूर विराजत, टीको मृगमद को ।
उज्ज्वल से दोउ नैना, चन्द्रवदन नीको ॥ जय अम्बे गौरी ॥

कनक समान कलेवर, रक्ताम्बर राजे ।
रक्तपुष्प गलमाला, कण्ठन पर साजे ॥ जय अम्बे गौरी ॥

केहरि वाहन राजत, खड्ग खप्पर धारी ।
सुर-नर-मुनिजन सेवत, तिनके दुखहारी ॥ जय अम्बे गौरी ॥

कानन कुण्डल शोभित, नासाग्रे मोती ।
कोटिक चन्द्र दिवाकर, सम राजत ज्योति ॥ जय अम्बे गौरी ॥

शुम्भ-निशुम्भ बिदारे, महिषासुर घाती ।
धूम्र विलोचन नैना, निशदिन मदमाती ॥ जय अम्बे गौरी ॥

चण्ड-मुण्ड संहारे, शोणित बीज हरे ।
मधु-कैटभ दोउ मारे, सुर भयहीन करे ॥ जय अम्बे गौरी ॥

ब्रह्माणी, रुद्राणी, तुम कमला रानी ।
आगम निगम बखानी, तुम शिव पटरानी ॥ जय अम्बे गौरी ॥

चौंसठ योगिनी गावत, नृत्य करत भैरों ।
बाजत ताल मृदंगा, और बाजत डमरू ॥ जय अम्बे गौरी ॥

तुम ही जग की माता, तुम ही हो भरता ।
भक्तन की दुःख हरता, सुख सम्पति करता ॥ जय अम्बे गौरी ॥

भुजा चार अति शोभित, वरमुद्रा धारी ।
मनवांछित फल पावत, सेवत नर नारी ॥ जय अम्बे गौरी ॥

कंचन थाल विराजत, अगर कपूर बाती ।
श्री मालकेतु में राजत, कोटि रतन ज्योती ॥ जय अम्बे गौरी ॥

श्री अम्बेजी की आरती जो कोई नर गावे ।
कहत शिवानन्द स्वामी, सुख-सम्पति पावे ॥ जय अम्बे गौरी ॥`,
    lyricsEn: `Jai Ambe Gauri, Maiya Jai Shyama Gauri |
Tumko Nisadin Dhyawat, Hari Brahma Shivri || Jai Ambe Gauri ||

Maang Sindoor Virajat, Teeko Mrigamad Ko |
Ujjwal Se Dou Naina, Chandravadan Neeko || Jai Ambe Gauri ||

Kanak Samaan Kalevar, Raktambar Raje |
Raktapushpa Galmala, Kanthan Par Saaje || Jai Ambe Gauri ||

Kehari Vahan Rajat, Khadga Khappar Dhari |
Sur-Nar-Muni-Jan Sewat, Tinke Dukhahari || Jai Ambe Gauri ||

Kanan Kundal Shobhit, Nasagre Moti |
Kotik Chandra Divakar, Sam Rajat Jyoti || Jai Ambe Gauri ||

Shumbha-Nishumbha Bidaare, Mahishasura Ghati |
Dhoomra Vilochan Naina, Nishadin Madamati || Jai Ambe Gauri ||

Chanda-Munda Sanhare, Shonita Beeja Hare |
Madhu-Kaitabha Dou Maare, Sura Bhayheen Kare || Jai Ambe Gauri ||

Brahmani, Rudrani, Tum Kamala Rani |
Agam Nigam Bakhani, Tum Shiva Patrani || Jai Ambe Gauri ||

Chausath Yogini Gawat, Nritya Karat Bhairo |
Baajat Taal Mridanga, Aur Baajat Damroo || Jai Ambe Gauri ||

Tum Hi Jag Ki Mata, Tum Hi Ho Bharta |
Bhaktan Ki Dukh Harta, Sukh Sampati Karta || Jai Ambe Gauri ||

Bhuja Chaar Ati Shobhit, Var-Mudra Dhari |
Manvaanchhit Phal Paavat, Sewat Nar Naari || Jai Ambe Gauri ||

Kanchan Thaal Virajat, Agar Kapoor Baati |
Shri Maalketu Mein Rajat, Koti Ratan Jyoti || Jai Ambe Gauri ||

Shri Ambe Ji Ki Aarti Jo Koi Nar Gaave |
Kahat Shivananda Swami, Sukh-Sampati Paave || Jai Ambe Gauri ||`,
    meaning: 'Hail to Mother Ambe Gauri! Whom Vishnu, Brahma, and Shiva worship constantly. Riding a majestic lion, wielding sacred weapons to destroy Mahishasura, Shumbha, and Nishumbha. You are Brahmani, Rudrani, and Lakshmi, removing the fears of all celestial beings and humans.',
    youtubeId: 'RY1jmTTjvhI',
    singer: 'अनुराधा पौडवाल (Anuradha Paudwal)',
    duration: '5:45',
    audioTrack: {
      id: 'audio-durga',
      title: 'श्री अम्बे माता की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Maa Durga Aarti',
    },
    status: 'Published',
  },
  {
    id: 'aarti-hanuman',
    deity: 'श्री हनुमान जी',
    category: 'hanuman',
    titleHi: 'श्री हनुमान जी की आरती (Aarti Kije Hanuman Lala Ki)',
    titleEn: 'Shri Hanuman Aarti',
    tagline: 'संकटमोचन पवनसुत हनुमान लला की आरती',
    lyricsHi: `आरती कीजै हनुमान लला की ।
दुष्ट दलन रघुनाथ कला की ॥

जाके बल से गिरिवर कांपै ।
रोग दोष जाके निकट न झांपै ॥
अंजनि पुत्र महाबलदाई ।
सन्तन के प्रभु सदा सहाई ॥

दे बीड़ा रघुनाथ पठाए ।
लंका जारि सीय सुधि लाए ॥
लंका सो कोट समुद्र सी खाई ।
जात पवनसुत बार न लाई ॥

लंका जारि असुर संहारे ।
सियारामजी के काज संवारे ॥
लक्ष्मण मूर्छित पड़े सकारे ।
आनि संजीवन प्रान उबारे ॥

पैठि पाताल तोरि जम-कारे ।
अहिरावण की भुजा उखारे ॥
बाएं भुजा असुर दल मारे ।
दाहिने भुजा संतजन तारे ॥

सुर नर मुनि जन आरती उतारें ।
जय जय जय हनुमान उचारें ॥
कंचन थार कपूर लौ छाई ।
आरती करत संजना माई ॥

लंकविध्वंस कीन्ह रघुराई ।
तुलसीदास प्रभु कीरति गाई ॥
जो हनुमान जी की आरती गावै ।
बसि बैकुण्ठ परम पद पावै ॥`,
    lyricsEn: `Aarti Kijai Hanuman Lala Ki |
Dusht Dalan Raghunath Kala Ki ||

Jaake Bal Se Girivar Kaapein |
Rog Dosh Jaake Nikat Na Jhaapein ||
Anjani Putra Mahabaladai |
Santan Ke Prabhu Sada Sahai ||

De Beeda Raghunath Pathaye |
Lanka Jaari Siya Sudhi Laaye ||
Lanka So Kot Samudra Si Khaai |
Jaat Pawansut Baar Na Laai ||

Lanka Jaari Asur Sanhaare |
Siyaramji Ke Kaaj Sanwaare ||
Lakshman Moorchhit Pade Sakaare |
Aani Sanjeevan Praan Ubaare ||

Paithi Pataal Tori Jam-Kaare |
Ahiravan Ki Bhuja Ukhaare ||
Baayein Bhuja Asur Dal Maare |
Daahine Bhuja Santjan Taare ||

Sur Nar Muni Jan Aarti Utaarein |
Jai Jai Jai Hanuman Uchaarein ||
Kanchan Thaar Kapoor Lau Chhaai |
Aarti Karat Sanjana Maai ||

Lank-Vidhvans Keenh Raghuraai |
Tulsidas Prabhu Keerati Gaai ||
Jo Hanuman Ji Ki Aarti Gaavai |
Basi Baikunth Param Pad Paavai ||`,
    meaning: 'Perform the aarti of beloved Hanuman, who subdues the wicked and represents Lord Rama’s prowess. His strength makes mountains tremble, and no afflictions dare approach his devotee. He burnt Lanka, brought Sanjeevani to save Lakshmana, and killed Ahiravana in Patala.',
    youtubeId: 'HfHkBEjofqk',
    singer: 'हरिहरन (Hariharan)',
    duration: '5:02',
    audioTrack: {
      id: 'audio-hanuman',
      title: 'श्री हनुमान जी की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Sankatmochan Hanuman Aarti',
    },
    status: 'Published',
  },
  {
    id: 'aarti-laxmi',
    deity: 'माँ लक्ष्मी',
    category: 'lakshmi',
    titleHi: 'श्री लक्ष्मी माता की आरती (Om Jai Laxmi Mata)',
    titleEn: 'Shri Laxmi Aarti',
    tagline: 'धन, धान्य, समृद्धि एवं वैभव दायिनी माँ लक्ष्मी की आरती',
    lyricsHi: `ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता ।
तुमको निसदिन सेवत, हर विष्णु विधाता ॥ ॐ जय लक्ष्मी माता ॥

उमा, रमा, ब्रह्माणी, तुम ही जग-माता ।
सूर्य-चन्द्रमा ध्यावत, नारद ऋषि गाता ॥ ॐ जय लक्ष्मी माता ॥

दुर्गा रूप निरंजनि, सुख सम्पति दाता ।
जो कोई तुमको ध्यावत, ऋद्धि-सिद्धि धन पाता ॥ ॐ जय लक्ष्मी माता ॥

तुम पाताल-निवासिनि, तुम ही शुभदाता ।
कर्म-प्रभाव-प्रकाशिनी, भवनिधि की त्राता ॥ ॐ जय लक्ष्मी माता ॥

जिस घर में तुम रहतीं, सब सद्गुण आता ।
सब सम्भव हो जाता, मन नहीं घबराता ॥ ॐ जय लक्ष्मी माता ॥

तुम बिन यज्ञ न होते, वस्त्र न कोई पाता ।
खान-पान का वैभव, सब तुमसे आता ॥ ॐ जय लक्ष्मी माता ॥

शुभ-गुण मंदिर सुंदर, क्षीरोदधि-जाता ।
रत्न चतुर्दश तुम बिन, कोई नहीं पाता ॥ ॐ जय लक्ष्मी माता ॥

महालक्ष्मी जी की आरती, जो कोई नर गावे ।
उर आनन्द समावे, पाप उतर जावे ॥ ॐ जय लक्ष्मी माता ॥`,
    lyricsEn: `Om Jai Laxmi Mata, Maiya Jai Laxmi Mata |
Tumko Nisadin Sewat, Har Vishnu Vidhata || Om Jai Laxmi Mata ||

Uma, Rama, Brahmani, Tum Hi Jag-Mata |
Surya-Chandrama Dhyawat, Narad Rishi Gaata || Om Jai Laxmi Mata ||

Durga Roop Niranjani, Sukh Sampati Data |
Jo Koi Tumko Dhyawat, Riddhi-Siddhi Dhan Paata || Om Jai Laxmi Mata ||

Tum Paatal-Nivasini, Tum Hi Shubhdata |
Karma-Prabhav-Prakashini, Bhavanidhi Ki Traata || Om Jai Laxmi Mata ||

Jis Ghar Mein Tum Rahteen, Sab Sadguna Aata |
Sab Sambhav Ho Jaata, Man Nahin Ghabraata || Om Jai Laxmi Mata ||

Tum Bin Yajna Na Hote, Vastra Na Koi Paata |
Khaan-Paan Ka Vaibhav, Sab Tumse Aata || Om Jai Laxmi Mata ||

Shubh-Guna Mandir Sundar, Ksheerodadhi-Jaata |
Ratna Chaturdash Tum Bin, Koi Nahin Paata || Om Jai Laxmi Mata ||

Mahalaxmi Ji Ki Aarti, Jo Koi Nar Gaave |
Ur Aanand Samaave, Paap Utar Jaave || Om Jai Laxmi Mata ||`,
    meaning: 'Glory to Mother Lakshmi, who bestows wealth, righteous prosperity, and peace upon homes where devotion and dharma reside. She is the daughter of the cosmic ocean of milk (Ksheerasagara), and without Her grace, noble deeds, feasts, and sacred yajnas cannot flourish.',
    youtubeId: 'Ydd0cSY3I8s',
    singer: 'अनुराधा पौडवाल (Anuradha Paudwal)',
    duration: '5:30',
    audioTrack: {
      id: 'audio-laxmi',
      title: 'श्री लक्ष्मी माता की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Maa Lakshmi Aarti',
    },
    status: 'Published',
  },
  {
    id: 'aarti-krishna',
    deity: 'श्री कृष्ण',
    category: 'vishnu',
    titleHi: 'श्री कुंजबिहारी जी की आरती (Aarti Kunj Bihari Ki)',
    titleEn: 'Shri Kunj Bihari Aarti',
    tagline: 'मुरलीधर भगवान श्री कृष्ण की मधुर व मनोरम आरती',
    lyricsHi: `आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की ॥
गले में बैजंती माला, बजावै मुरली मधुर बाला ।
श्रवण में कुण्डल झलकाता, जुगल छवि देखि मन भाता ॥

कनकमय मुकुट बिराजे, लटक मुख घुंघुरारी काजे ।
मृगमद तिलक ललाट सुहावै, अलक कस्तूरी महकावै ॥
आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की ॥

वंशी मधुर बजावै, सबही के मन को लुभावै ।
मन्द-मन्द मुसुकावै, प्रेम रस बरसै अमृत बरसावै ॥
आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की ॥

जहं ते प्रगट भई गंगा, कलुष कलिहारिणी श्रीगंगा ।
स्मरन ते होत मोह भंगा, बसी शिव शीश जटा के संगा ॥
आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की ॥

श्री राधा-मुख-कमल-लोचन, भवाभय-दारुन-विमोचन ।
करन-रस-माधुरी-सीचन, कृपा-रस-वारिधि-उदंचन ॥
आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की ॥

चरण छवि श्री बलिहारी, जहां सुख पावत नर-नारी ।
आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की ॥`,
    lyricsEn: `Aarti Kunj Bihari Ki, Shri Giridhar Krishna Murari Ki ||
Gale Mein Baijanti Mala, Bajavai Murli Madhur Baala |
Shravan Mein Kundal Jhalkata, Jugal Chhavi Dekhi Man Bhaata ||

Kanakmaya Mukut Biraaje, Latak Mukh Ghunghuraari Kaaje |
Mrigamad Tilak Lalaat Suhaavai, Alak Kastoori Mahkaavai ||
Aarti Kunj Bihari Ki, Shri Giridhar Krishna Murari Ki ||

Banshi Madhur Bajaavai, Sabahi Ke Man Ko Lubhaavai |
Mand-Mand Musukaavai, Prem Ras Barsai Amrit Barsaavai ||
Aarti Kunj Bihari Ki, Shri Giridhar Krishna Murari Ki ||

Jahan Te Pragat Bhai Ganga, Kalush Kalihaarini Shri Ganga |
Smaran Te Hot Moh Bhanga, Basi Shiv Sheesh Jata Ke Sanga ||
Aarti Kunj Bihari Ki, Shri Giridhar Krishna Murari Ki ||

Shri Radha-Mukh-Kamal-Lochan, Bhava-Bhaya-Daarun-Vimochan |
Karan-Ras-Madhuri-Seechan, Kripa-Ras-Vaaridhi-Udancahan ||
Aarti Kunj Bihari Ki, Shri Giridhar Krishna Murari Ki ||

Charan Chhavi Shri Balihari, Jahan Sukh Paavat Nar-Naari |
Aarti Kunj Bihari Ki, Shri Giridhar Krishna Murari Ki ||`,
    meaning: 'Aarti of Kunj Bihari, the bearer of Mount Govardhan, wearing the garland of wildflowers, playing the melodious flute that enchants all living beings. His feet from which Mother Ganga emanated cleanse all sins, and His enchanting smile showers divine nectar.',
    youtubeId: 'FEMR5alT7CY',
    singer: 'अनुराधा पौडवाल व साथी (Anuradha Paudwal)',
    duration: '5:18',
    audioTrack: {
      id: 'audio-krishna',
      title: 'श्री कुंजबिहारी जी की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Lord Krishna Aarti',
    },
    status: 'Published',
  },
  {
    id: 'aarti-ram',
    deity: 'श्री रामचन्द्र जी',
    category: 'ram',
    titleHi: 'श्री रामचन्द्र कृपालु भजु मन (Shri Ram Stuti)',
    titleEn: 'Shri Ramachandra Kripalu',
    tagline: 'गोस्वामी तुलसीदास जी विरचित मर्यादा पुरुषोत्तम श्री राम की स्तुति',
    lyricsHi: `श्रीरामचन्द्र कृपालु भजु मन हरण भवभय दारुणम् ।
नवकंज लोचन, कंज मुख, कर कंज, पद कंजारुणम् ॥

कंदर्प अगणित अमित छवि, नवनील नीरद सुन्दरम् ।
पटपीत मानहु तड़ित रुचि शुचि नौमि जनक सुतावरम् ॥

भजु दीनबन्धु दिनेश दानव दैत्य वंश निकन्दनम् ।
रघुनन्द आनन्दकन्द कोशल चन्द दशरथ नन्दनम् ॥

सिर मुकुट कुण्डल तिलक चारु उदारु अंग विभूषणम् ।
आजानुभुज शर चाप धर, संग्राम-जित-खरदूषणम् ॥

इति वदति तुलसीदास शंकर शेष मुनि-मन-रंजनम् ।
मम हृदय कंज निवास कुरु, कामादि खल-दल-मंजनम् ॥

मनु जाहिं राचेउ मिलिहि सो बरु सहज सुंदर सांवरो ।
करुना निधान सुजान सीलु सनेहु जानत रावरो ॥

एहि भांति गौरि असीस सुनि सिय सहित हियं हरषीं अली ।
तुलसी भवानिहि पूजि पुनि पुनि मुदित मन मंदिर चली ॥`,
    lyricsEn: `Shri Ramachandra Kripalu Bhaju Man Harana Bhavabhaya Darunam |
Nava-Kanja Lochana, Kanj Mukha, Kara Kanja, Pada Kanj-Arunam ||

Kandarpa Aganita Amita Chhavi, Nava-Neela Neerada Sundaram |
Pata-Peeta Manahu Tadita Ruchi Shuchi Naumi Janaka Sutavaram ||

Bhaju Deenabandhu Dinesha Danava Daitya Vamsha Nikandanam |
Raghunanda Anandakanda Koshala Chanda Dasharatha Nandanam ||

Sira Mukuta Kundala Tilaka Chaaru Udaaru Anga Vibhooshanam |
Aajaanubhuja Shara Chaapa Dhara, Sangraama-Jita-Kharadooshanam ||

Iti Vadati Tulsidas Shankara Shesha Muni-Mana-Ranjanam |
Mama Hridaya Kanja Nivaasa Kuru, Kaamaadi Khala-Dala-Manjanam ||

Manu Jaahin Raacheu Milihi So Baru Sahaja Sundara Saanvaro |
Karuna Nidhaana Sujaana Seelu Sanehu Jaanata Raavaro ||

Ehi Bhaanti Gauri Aseesa Suni Siya Sahita Hiyan Harasheen Alee |
Tulasi Bhavaanihi Pooji Puni Puni Mudita Mana Mandira Chalee ||`,
    meaning: 'O mind, worship the compassionate Lord Ramachandra, who dispels the terrifying fears of mundane life. He has eyes like fresh lotus petals, a lotus-like face, hands, and reddish lotus-like feet. His beauty surpasses millions of Cupids. Tulsidas prays: O Lord, dwell forever in the lotus of my heart, destroying all inner vices.',
    youtubeId: 'Jb4p7X-t6-c',
    singer: 'अनुराधा पौडवाल (Anuradha Paudwal)',
    duration: '5:10',
    audioTrack: {
      id: 'audio-ram',
      title: 'श्री रामचन्द्र कृपालु भजु मन',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Goswami Tulsidas Shri Ram Stuti',
    },
    status: 'Published',
  },
];

export const DEFAULT_CMS_KATHAS: CMSKathaItem[] = [
  {
    id: 'satyanarayan',
    titleHi: 'श्री सत्यनारायण व्रत कथा',
    titleEn: 'Shri Satyanarayan Vrat Katha',
    category: 'vrat',
    deity: 'भगवान श्री सत्यनारायण (विष्णु)',
    dayOrTithi: 'पूर्णिमा, गुरुवार, संक्रांति या शुभ मुहूर्त',
    shortDesc: 'कलिकाल में सबसे कल्याणकारी और सर्वमनोकामना पूर्ण करने वाली भगवान विष्णु की पावन व्रत कथा।',
    vidhi: [
      'प्रातःकाल स्नानादि से निवृत्त होकर सत्यनारायण व्रत का संकल्प लें।',
      'चौकी पर पीला वस्त्र बिछाकर भगवान सत्यनारायण एवं शालिग्राम जी की स्थापना करें।',
      'पंचामृत (दूध, दही, घी, शहद, गंगाजल) और पंजीरी (गेहूं का भुना आटा, चीनी, केले व तुलसीदल) का नैवेद्य तैयार करें।',
      'कथा श्रवण के पश्चात आरती करें और सभी भक्तों में चरणामृत व पंजीरी का प्रसाद वितरित करें।',
    ],
    chapters: [
      {
        title: 'प्रथम अध्याय (First Chapter) - कथा की महिमा एवं नारद जी की प्रार्थना',
        content: `एक समय नैमिषारण्य तीर्थ में शौनकादिक अठ्यासी हजार ऋषियों ने परम ज्ञानी सूत जी से पूछा — हे सूत जी महाराज! इस कलयुग में कौन सा ऐसा व्रत अथवा तप है जिससे मानव जाति को सभी कष्टों से मुक्ति मिले और परम शांति व मोक्ष प्राप्त हो?

सूत जी ने कहा — हे मुनियों! एक बार भगवान नारायण के अनन्य भक्त देवर्षि नारद जी ने तीनों लोकों का भ्रमण करते हुए देखा कि मृत्युलोक के सभी प्राणी अपने पूर्व जन्म के कर्मों के फलवश अनेक प्रकार के कष्टों से पीड़ित हैं।

नारद जी ने करुणावश क्षीरसागर में विराजमान भगवान श्रीमन नारायण से प्रार्थना की — हे प्रभु! मृत्युलोक के प्राणियों के उद्धार का कोई सरल उपाय बताएं। तब भगवान नारायण ने कहा — हे नारद! सत्यनारायण व्रत तीनों लोकों में दुर्लभ और अत्यंत पुण्यप्रद है। जो भी मनुष्य श्रद्धा और भक्ति से यह व्रत करता है, वह इस लोक में सुख भोगकर अंत में मोक्ष पद प्राप्त करता है।`,
      },
      {
        title: 'द्वितीय अध्याय (Second Chapter) - निर्धन ब्राह्मण एवं शतानंद जी की कथा',
        content: `सूत जी ने आगे कहा — प्राचीन काल में काशी नगरी में एक अत्यंत दरिद्र, भिक्षाजीवी ब्राह्मण निवास करता था। उसकी दयनीय दशा देखकर स्वयं भगवान विष्णु ने वृद्ध ब्राह्मण का वेश धारण कर दर्शन दिया।

भगवान ने पूछा — हे विप्रवर! आप इतने दुःखी क्यों हैं? ब्राह्मण ने अपनी निर्धनता व्यक्त की। तब वृद्ध रूपी प्रभु ने कहा — हे ब्राह्मण! भगवान सत्यनारायण का व्रत करो। इससे तुम्हारी समस्त दरिद्रता समाप्त हो जाएगी और जीवन सुखमय हो जाएगा।

ब्राह्मण ने अत्यंत भक्ति से सत्यनारायण व्रत का संकल्प लिया और उसी रात स्वप्न में प्रभु के दर्शन हुए। अगले दिन उसने श्रद्धापूर्वक सपरिवार व्रत किया। व्रत के प्रभाव से उसकी दरिद्रता नष्ट हो गई और वह परम ऐश्वर्यवान होकर धर्मपूर्वक जीवन बिताने लगा।`,
      },
      {
        title: 'तृतीय अध्याय (Third Chapter) - साधु वैश्य की कथा',
        content: `इसके बाद सूत जी ने एक अन्य कथा सुनाई — एक समय उल्कामुख नाम का धर्मात्मा राजा अपनी पत्नी सहित सत्यनारायण का पूजन कर रहा था। वहां एक साधु नामक वैश्य आया और उसने राजा से पूछा — राजन! आप किसका पूजन कर रहे हैं?

राजा ने कहा — मैं संतान और समृद्धि प्रदाता भगवान सत्यनारायण का व्रत कर रहा हूँ। साधु वैश्य ने भी संतान प्राप्ति हेतु व्रत का संकल्प लिया। घर जाकर उसने अपनी पत्नी लीलावती को यह बात बताई। समय आने पर लीलावती ने एक कन्या को जन्म दिया जिसका नाम कलावती रखा गया।

परंतु वैश्य ने कन्या के विवाह तक व्रत टाल दिया। विवाह के समय भी लोभवश व्रत नहीं किया। फलस्वरूप व्यापार के समय राजा चंद्रकेतु के राज्य में साधु वैश्य और उसके दामाद पर चोरी का झूठा आरोप लगा और दोनों कारागार में डाल दिए गए।`,
      },
      {
        title: 'चतुर्थ अध्याय (Fourth Chapter) - संकट निवारण एवं सत्य की विजय',
        content: `कारागार में कष्ट भोगते हुए साधु वैश्य को अपने अपराध का स्मरण हुआ। उसने पश्चाताप करते हुए कारागार में ही भगवान सत्यनारायण की मानसिक स्तुति की।

उधर लीलावती और कलावती भी निर्धनता से त्रस्त हो गईं। एक दिन कलावती ने एक ब्राह्मण के घर सत्यनारायण की कथा सुनी और प्रसाद ग्रहण कर घर लौटी। माता-पुत्री ने मिलकर नियमपूर्वक सत्यनारायण का व्रत किया।

प्रभु सत्यनारायण प्रसन्न हुए और उन्होंने राजा चंद्रकेतु को स्वप्न में आदेश दिया कि दोनों निर्दोष व्यापारियों को मुक्त करो और उनका धन लौटाओ। राजा ने प्रातः दोनों को मुक्त कर उनका सम्पूर्ण धन दुगुने सम्मान के साथ लौटा दिया।`,
      },
      {
        title: 'पंचम अध्याय (Fifth Chapter) - राजा तुंगध्वज एवं प्रसाद का महात्म्य',
        content: `सूत जी ने आगे बताया — एक समय राजा तुंगध्वज वन में शिकार खेलने गए। वहां वट वृक्ष के नीचे कुछ गोप बालक भक्तिभाव से भगवान सत्यनारायण की पूजा कर रहे थे।

राजा ने अहंकारवश न तो बालकों को प्रणाम किया और न ही दिया गया प्रसाद ग्रहण किया। जब राजा अपने महल लौटा, तो देखा कि उसका राज्य नष्ट हो चुका है और पुत्र भी संकट में हैं।

राजा को अपनी भूल का भान हुआ। वह तुरंत उसी वट वृक्ष के पास लौटा और गोप बालकों के साथ बैठकर विधिवत भगवान सत्यनारायण का पूजन किया और साष्टांग प्रणाम कर प्रसाद ग्रहण किया। प्रभु की कृपा से राजा का राज्य, संपत्ति और पुत्र पुनः सुरक्षित हो गए।

अतः जो भी मनुष्य निष्कपट भाव से इस व्रत को करता है, वह इस संसार में समस्त सुख भोगकर वैकुंठ धाम को प्राप्त करता है।`,
      },
    ],
    phalaShruti: 'सत्यनारायण कथा के श्रवण मात्र से भय, दरिद्रता, रोग और पापों का नाश होता है तथा मनोवांछित फल की प्राप्ति होती है।',
    status: 'Published',
  },
  {
    id: 'shivratri',
    titleHi: 'महाशिवरात्रि व्रत कथा',
    titleEn: 'Maha Shivratri Vrat Katha',
    category: 'vrat',
    deity: 'भगवान शिव (महादेव)',
    dayOrTithi: 'फाल्गुन कृष्ण चतुर्दशी',
    shortDesc: 'अज्ञान के अंधकार से मोक्ष के प्रकाश की ओर ले जाने वाली भगवान आशुतोष शिव की पावन कथा।',
    vidhi: [
      'महाशिवरात्रि के दिन सूर्योदय से पूर्व उठकर पवित्र नदी या घर पर गंगाजल युक्त जल से स्नान करें।',
      'शिवलिंग पर कच्चा दूध, दही, घी, शहद और शर्करा (पंचामृत) से अभिषेक करें।',
      'त्रिदल विल्वपत्र, धतूरा, भांग, भस्म और अक्षत अर्पित करें।',
      'चारों प्रहर में ‘ॐ नमः शिवाय’ का अनवरत जप करें और रात्रि जागरण करें।',
    ],
    chapters: [
      {
        title: 'व्याध (शिकारी) और बेलपत्र की अमर कथा',
        content: `प्राचीन काल में चित्रभानु नामक एक शिकारी (व्याध) था। वह वन्य पशुओं की हत्या कर अपना और परिवार का पेट भरता था। एक बार उसने किसी साहूकार से ऋण लिया जिसे वह समय पर न चुका सका। साहूकार ने उसे शिव मठ में बंदी बना लिया।

उस दिन संयोग से फाल्गुन कृष्ण चतुर्दशी थी और मठ में शिवरात्रि की पूजा हो रही थी। शिकारी दिन भर भूखा-प्यासा रहा और अनजाने में ही शिव नाम सुनता रहा। सायंकाल साहूकार ने उसे यह कहकर छोड़ दिया कि कल ऋण चुकाना होगा।

शिकारी शिकार की खोज में वन में गया और एक जलाशय के किनारे बेल के पेड़ पर चढ़कर बैठ गया। उसने नीचे एक शिवलिंग देखा जो पत्तों से ढका हुआ था। शिकारी रात भर जागता रहा और टहनियां तोड़कर नीचे फेंकता रहा। संयोगवश वे बेलपत्र नीचे स्थापित शिवलिंग पर गिरते रहे।`,
      },
      {
        title: 'मृग परिवार का सत्य और शिव साक्षात्कार',
        content: `रात्रि के प्रथम प्रहर में एक गर्भिणी हिरणी जल पीने आई। शिकारी ने धनुष पर बाण चढ़ाया। हिरणी ने विनम्रता से कहा — हे व्याध! मैं अभी गर्भिणी हूँ, अपने शावकों को जन्म देकर लौट आऊंगी। शिकारी ने उसकी सत्यवादिता पर विश्वास कर उसे जाने दिया। इस प्रक्रिया में उसके हाथ से अनजाने में फिर बेलपत्र शिवलिंग पर गिरे।

दूसरे प्रहर में दूसरी हिरणी आई और तीसरे प्रहर में एक मृग आया। सभी ने अपनी जिम्मेदारियां पूरी कर वापस लौटने का वचन दिया। शिकारी ने दयावश सबको छोड़ दिया और निरंतर बेलपत्र नीचे गिरते रहे।

चौथे प्रहर में वह पूरा मृग परिवार एक साथ शिकारी के समक्ष उपस्थित हो गया ताकि वह अपना शिकार कर सके। मृगों की सत्यनिष्ठा और त्याग देखकर शिकारी का हृदय पिघल गया। उसकी आंखों से अश्रुधारा बह निकली।

उसके इस भाव से प्रसन्न होकर स्वयं देवाधिदेव महादेव प्रकट हुए और उन्होंने शिकारी व मृग परिवार दोनों को दिव्य विमान से शिवलोक भेज दिया। इस प्रकार अनजाने में किए गए शिवरात्रि व्रत से भी परम पद मिल गया।`,
      },
    ],
    phalaShruti: 'महाशिवरात्रि व्रत से जाने-अनजाने में हुए सभी पाप नष्ट हो जाते हैं और साधक को शिव सान्निध्य प्राप्त होता है।',
    status: 'Published',
  },
  {
    id: 'nirjala-ekadashi',
    titleHi: 'निर्जला एकादशी व्रत कथा',
    titleEn: 'Nirjala Ekadashi Vrat Katha',
    category: 'ekadashi',
    deity: 'भगवान श्री विष्णु',
    dayOrTithi: 'ज्येष्ठ शुक्ल एकादशी',
    shortDesc: 'वर्ष भर की सभी २४ एकादशियों का पुण्य अकेले देने वाली परम तपमयी एकादशी।',
    vidhi: [
      'दशमी तिथि की रात्रि से ही सात्विक आचरण रखें।',
      'एकादशी के दिन सूर्योदय से लेकर द्वादशी के सूर्योदय तक जल और अन्न का त्याग करें।',
      'भगवान विष्णु का षोडशोपचार पूजन करें और ॐ नमो भगवते वासुदेवाय का जप करें।',
      'द्वादशी के दिन ब्राह्मणों को जल से भरे कलश, छाता, पंखा और अन्न का दान देकर पारण करें।',
    ],
    chapters: [
      {
        title: 'भीमसेन की व्यथा एवं महर्षि वेदव्यास जी का उपदेश',
        content: `महाभारत काल में जब धर्मराज युधिष्ठिर, माता कुंती, द्रौपदी, अर्जुन, नकुल और सहदेव नियमपूर्वक प्रत्येक एकादशी का व्रत रखते थे, तब महाबली भीमसेन अत्यंत चिंतित रहते थे।

भीमसेन ने महर्षि वेदव्यास जी से कहा — हे पितामह! मेरे पेट में ‘वृक’ नामक अग्नि निरंतर प्रज्वलित रहती है जो अधिक अन्न खाने पर ही शांत होती है। मेरे परिवार के सभी लोग एकादशी व्रत करते हैं, परंतु मैं भूख सहन नहीं कर पाता। क्या कोई ऐसा उपाय है जिससे मुझे बिना भूखे रहे वर्ष की सभी एकादशियों का फल प्राप्त हो सके?

महर्षि वेदव्यास जी ने मुस्कुराकर कहा — हे वृकोदर! ज्येष्ठ मास के शुक्ल पक्ष में जो एकादशी आती है, उसे ‘निर्जला एकादशी’ कहते हैं। इस दिन आचमन के अतिरिक्त जल की एक बूंद भी ग्रहण नहीं की जाती। यदि तुम इस एक एकादशी का पूर्ण निर्जल व्रत कर लो, तो तुम्हें वर्ष की सभी चौबीस एकादशियों का पूर्ण पुण्य प्राप्त हो जाएगा।`,
      },
      {
        title: 'भीम का कठिन संकल्प और मोक्ष प्राप्ति',
        content: `महर्षि व्यास के वचन सुनकर महाबली भीमसेन ने निर्जला एकादशी का कठोर व्रत करने का संकल्प लिया। निर्जल रहने के कारण मध्याह्न तक भीमसेन की स्थिति व्याकुल होने लगी, परंतु उन्होंने अपने अदम्य मनोबल से व्रत पूर्ण किया।

द्वादशी के दिन प्रातः भीमसेन ने भगवान विष्णु का पूजन किया, ब्राह्मणों को कलश, वस्त्र और मिष्ठान दान दिया और गंगाजल से पारण किया। इसी कारण इस एकादशी को ‘भीमसेनी एकादशी’ या ‘पांडव एकादशी’ भी कहा जाता है।`,
      },
    ],
    phalaShruti: 'निर्जला एकादशी का व्रत करने से साधक को दीर्घायु, आरोग्य, अक्षय पुण्य और अंत में वैकुंठ धाम की प्राप्ति होती है।',
    status: 'Published',
  },
  {
    id: 'karwa-chauth',
    titleHi: 'करवा चौथ व्रत कथा',
    titleEn: 'Karwa Chauth Vrat Katha',
    category: 'vrat',
    deity: 'माँ गौरी एवं भगवान शिव',
    dayOrTithi: 'कार्तिक कृष्ण चतुर्थी',
    shortDesc: 'अखंड सौभाग्य, सुहाग की दीर्घायु एवं दांपत्य सुख की पावन पारंपरिक व्रत कथा।',
    vidhi: [
      'प्रातःकाल सरगी ग्रहण करने के पश्चात निर्जल व्रत का संकल्प लें।',
      'सायंकाल करवा माता, शिव-पार्वती और गणेश जी का चित्र बनाकर पूजन करें।',
      'करवे में जल भरकर कथा सुनें और बड़ों का आशीर्वाद लें।',
      'रात्रि में चंद्रोदय होने पर छलनी से चंद्रमा और पतिदेव का दर्शन कर अर्घ्य दें।',
    ],
    chapters: [
      {
        title: 'रानी वीरवती और सात भाइयों का स्नेह',
        content: `प्राचीन काल में एक धर्मात्मा ब्राह्मण के सात पुत्र और एक रूपवती कन्या थी जिसका नाम वीरवती था। सात भाइयों की वह इकलौती लाडली बहन थी। वीरवती का विवाह एक राजा के साथ हुआ।

विवाह के बाद प्रथम करवा चौथ पर वीरवती मायके आई हुई थी। उसने निर्जल व्रत रखा। दिनभर भूखी-प्यासी रहने के कारण सायंकाल भूख से उसकी चेतना क्षीण होने लगी। भाइयों से अपनी बहन की यह दशा देखी न गई।

भाइयों ने वन में जाकर एक ऊंचे वट वृक्ष पर दीपक जलाकर छलनी की आड़ में रख दिया और बहन से कहा — देखो वीरवती! चंद्रमा निकल आया है, तुम अर्घ्य देकर भोजन कर लो। वीरवती ने भाइयों की बात पर विश्वास कर नकली चंद्रमा को अर्घ्य देकर भोजन का पहला ग्रास मुख में डाला तो उसमें बाल निकला, दूसरे में छींक आई और तीसरे ग्रास पर समाचार आया कि उसका पति अचानक गंभीर रूप से अस्वस्थ हो गया है।`,
      },
      {
        title: 'माँ इंद्राणी की कृपा और अखंड सौभाग्य',
        content: `वीरवती अपने पति के पास पहुंची और उसने निरंतर एक वर्ष तक भगवान शिव और माँ पार्वती की तपस्या की। अगले वर्ष कार्तिक कृष्ण चतुर्थी को माँ इंद्राणी (शची) प्रकट हुईं।

माँ इंद्राणी ने वीरवती को उसकी भूल का स्मरण कराया और विधिपूर्वक करवा चौथ का व्रत करने का उपदेश दिया। वीरवती ने अत्यंत श्रद्धा, नियम और निष्ठा से करवा चौथ का निर्जल व्रत किया।

रात्रि में चंद्रमा के दर्शन कर उसने पति के चरणों का स्पर्श किया। माँ पार्वती और शिव जी की कृपा से उसका पति पूर्णतः स्वस्थ और दीर्घायु हो गया।`,
      },
    ],
    phalaShruti: 'करवा चौथ का व्रत करने से अखंड सौभाग्य की प्राप्ति होती है और दांपत्य जीवन में सुख, शांति और प्रेम बढ़ता है।',
    status: 'Published',
  },
  {
    id: 'somwar-vrat',
    titleHi: 'सोमवार व्रत कथा',
    titleEn: 'Somwar Vrat Katha',
    category: 'vrat',
    deity: 'भगवान शिव एवं माता पार्वती',
    dayOrTithi: 'प्रत्येक सोमवार / श्रावण सोमवार',
    shortDesc: 'मनोवांछित जीवनसाथी, मानसिक शांति और कष्ट निवारण हेतु भगवान आशुतोष का प्रिय सोमवार व्रत।',
    vidhi: [
      'प्रातःकाल स्नानादि के पश्चात भगवान शिव और माता पार्वती का ध्यान करें।',
      'शिवलिंग पर गंगाजल, श्वेत पुष्प, बेलपत्र और चंदन अर्पित करें।',
      'दोपहर या सायंकाल सोमवार व्रत कथा सुनें और आरती करें।',
      'सायंकाल एक समय सात्विक भोजन (बिना नमक या सेंधा नमक युक्त) ग्रहण करें।',
    ],
    chapters: [
      {
        title: 'धनी साहूकार और पुत्र की अल्पायु की कथा',
        content: `एक नगर में एक धनी साहूकार रहता था। उसके पास अपार धन-संपत्ति थी, परंतु कोई संतान न थी। वह प्रतिदिन शिव मंदिर जाकर दीपक जलाता और पुत्र प्राप्ति की प्रार्थना करता।

उसकी भक्ति देखकर माता पार्वती ने भगवान शिव से कहा — हे प्रभु! इस भक्त की मनोकामना अवश्य पूर्ण कीजिए। शिव जी ने कहा — हे देवी! इसके भाग्य में पुत्र का योग नहीं है, यदि इसे पुत्र प्राप्त हुआ भी तो वह मात्र बारह वर्ष की आयु तक ही जीवित रहेगा।

माता पार्वती के विशेष आग्रह पर शिव जी ने साहूकार को पुत्र का वरदान दे दिया। समय आने पर साहूकार की पत्नी ने एक सुंदर पुत्र को जन्म दिया। साहूकार ने उसका नाम अमर रखा, परंतु वह जानता था कि बालक की आयु केवल १२ वर्ष है। अतः उसने किसी को प्रसन्नता में नहीं बांधा और निरंतर सोमवार का व्रत करता रहा।`,
      },
      {
        title: 'काशी यात्रा, विवाह और शिव जी का अमर वरदान',
        content: `जब बालक ११ वर्ष का हुआ, तो साहूकार ने उसे उसके मामा के साथ विद्या अध्ययन हेतु काशी भेज दिया और मार्ग में यज्ञ व दान करने का निर्देश दिया।

मार्ग में एक राजकुमारी का विवाह हो रहा था, जहां वर का एक नेत्र दोषपूर्ण था। वर पक्ष ने छल से साहूकार के सुंदर पुत्र से फेरे करवा दिए। परंतु बालक ने राजकुमारी की चुनरी पर लिख दिया कि फेरे मेरे साथ हुए हैं, जबकि तुम्हें जिसके साथ भेजा जा रहा है वह काना है। राजकुमारी ने उस धूर्त वर को अस्वीकार कर दिया।

इसके बाद बालक काशी पहुंचा। बारहवें वर्ष के दिन बालक की अचानक मृत्यु हो गई। मामा का विलाप सुनकर वहां से गुजर रहे भगवान शिव और माता पार्वती वहां पहुंचे। माता पार्वती की प्रार्थना पर भगवान शिव ने बालक को पुनर्जीवित कर दीर्घायु प्रदान की। लौटते समय वह राजकुमारी को विदा कराकर सकुशल अपने माता-पिता के पास लौटा।`,
      },
    ],
    phalaShruti: 'सोमवार व्रत करने से भगवान शिव की असीम अनुकंपा प्राप्त होती है और समस्त संतापों का अंत होता है।',
    status: 'Published',
  },
];

export const DEFAULT_CMS_BOOKS: CMSBookItem[] = [
  {
    id: 'bhagavad-gita',
    titleHi: 'श्रीमद्भगवद्गीता',
    titleEn: 'Shrimad Bhagavad Gita',
    category: 'gita',
    categoryLabel: 'श्रीमद्भगवद्गीता',
    author: 'महर्षि वेदव्यास / भगवान श्री कृष्ण',
    versesCount: '१८ अध्याय • ७०० श्लोक',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    colorCode: '#FF9933',
    shortSummary: 'कुरुक्षेत्र की रणभूमि में भगवान श्री कृष्ण द्वारा अर्जुन को दिया गया कर्म, ज्ञान और भक्तियोग का शाश्वत उपदेश।',
    fullOverview: 'श्रीमद्भगवद्गीता महाभारत के भीष्म पर्व का एक अंश है। यह समस्त उपनिषदों का सार (दधिखंड) है। जीवन की हर दुविधा, कर्तव्य, कर्मण्यता, अनासक्ति और परमात्मा से मिलन के गूढ़ रहस्यों को सरल रूप में उद्घाटित करने वाला यह विश्वप्रसिद्ध ग्रंथ है।',
    sampleChapterTitle: 'अध्याय २, श्लोक ४७ - निष्काम कर्मयोग',
    sampleVerseSanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    sampleVerseHindi: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्म के फल के हेतु मत बनो और न ही अकर्मण्यता में तुम्हारी आसक्ति हो।',
    sampleVerseEnglish: 'You have a right only to work, never to its fruits; let not the fruits of action be your motive, nor let your attachment be to inaction.',
    readOnlineUrl: '/scriptures/bhagavad-gita',
    status: 'Published',
  },
  {
    id: 'ramcharitmanas',
    titleHi: 'श्रीरामचरितमानस',
    titleEn: 'Shri Ramcharitmanas',
    category: 'itihasa',
    categoryLabel: 'इतिहास एवं काव्य',
    author: 'गोस्वामी तुलसीदास जी',
    versesCount: '७ काण्ड • चौपाई, दोहा, सोरठा',
    languages: ['अवधी', 'हिन्दी', 'English'],
    colorCode: '#FF9933',
    shortSummary: 'अवधी भाषा में गोस्वामी तुलसीदास जी द्वारा रचित मर्यादा पुरुषोत्तम भगवान श्री राम के जीवन का परम पावन चरित्र।',
    fullOverview: 'श्रीरामचरितमानस सनातन संस्कृति की आत्मा है। बालकाण्ड, अयोध्याकाण्ड, अरण्यकाण्ड, किष्किन्धाकाण्ड, सुंदरकाण्ड, लंकाकाण्ड और उत्तरकाण्ड—इन सातों सोपानों के माध्यम से धर्म, मर्यादा, भ्रातृ-प्रेम, भक्ति और शरणागति का अनुपम दर्शन कराया गया है।',
    sampleChapterTitle: 'सुंदरकाण्ड - मंगलाचरण',
    sampleVerseSanskrit: 'शान्तं शाश्वतमप्रमेयमनघं निर्वाणशान्तिप्रदं\nब्रह्माशम्भुफणीन्द्रसेव्यमनिशं वेदान्तवेद्यं विभुम् ।\nरामाख्यं जगदीश्वरं सुरगुरुं मायामनुष्यं हरिं\nवन्देऽहं करुणाकरं रघुवरं भूपालचूडामणिम् ॥',
    sampleVerseHindi: 'शांत, सनातन, अप्रमेय, निष्पाप, मोक्षरूप परम शांति देने वाले, ब्रह्मा, शम्भु और शेषनाग द्वारा नित्य सेवित, रघुश्रेष्ठ श्री राम को मैं नमस्कार करता हूँ।',
    sampleVerseEnglish: 'I bow to the jewel of kings, the Lord of the universe known as Rama, who is calm, eternal, immeasurable, sinless, and the giver of eternal peace.',
    readOnlineUrl: '/scriptures/ramcharitmanas',
    status: 'Published',
  },
  {
    id: 'isha-upanishad',
    titleHi: 'ईशावास्योपनिषद्',
    titleEn: 'Ishavasya Upanishad',
    category: 'upanishads',
    categoryLabel: 'उपनिषद',
    author: 'शुक्ल यजुर्वेद (वाजसनेयि)',
    versesCount: '१८ मंत्र',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    colorCode: '#FF9933',
    shortSummary: 'समस्त चराचर जगत में ईश्वर की उपस्थिति और त्यागपूर्वक उपभोग का सर्वोच्च वेदान्त सूत्र।',
    fullOverview: 'ईशावास्योपनिषद् शुक्ल यजुर्वेद का चालीसवां अध्याय है। यह ज्ञान, कर्म और उपासना के समन्वय का अद्वितीय ग्रंथ है। इसका पहला ही श्लोक बताता है कि यह सारा संसार परमात्मा से आच्छादित है, इसलिए किसी के धन का लोभ न करते हुए त्यागभाव से जीवन का आनंद लो।',
    sampleChapterTitle: 'शांति पाठ एवं प्रथम मंत्र',
    sampleVerseSanskrit: 'ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥\n\nईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥',
    sampleVerseHindi: 'यह सम्पूर्ण जगत परमात्मा से व्याप्त है। इसलिए त्यागपूर्वक इसका उपभोग करो, किसी के धन की लालसा मत करो।',
    sampleVerseEnglish: 'All this, whatever moves in this moving world, is enveloped by God. Therefore, find your enjoyment in renunciation; do not covet anyone’s wealth.',
    readOnlineUrl: '/scriptures/isha-upanishad',
    status: 'Published',
  },
  {
    id: 'katha-upanishad',
    titleHi: 'कठोपनिषद्',
    titleEn: 'Katha Upanishad',
    category: 'upanishads',
    categoryLabel: 'उपनिषद',
    author: 'कृष्ण यजुर्वेद',
    versesCount: '२ अध्याय • ६ वल्लियाँ',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    colorCode: '#FF9933',
    shortSummary: 'बालक नचिकेता और मृत्यु के देवता यमराज के मध्य अमर आत्मा और आत्मज्ञान का अत्यंत रोमांचक संवाद।',
    fullOverview: 'कठोपनिषद् में नचिकेता द्वारा यमराज से मांगे गए तीसरे वरदान (मृत्यु के पश्चात आत्मा के अस्तित्व) पर गूढ़ दार्शनिक विवेचन है। श्रेयस (कल्याणकारी) और प्रेयस (सुखकर) का भेद इसी उपनिषद में विशद रूप से समझाया गया है।',
    sampleChapterTitle: 'प्रथम अध्याय, तृतीय वल्ली, मंत्र १४',
    sampleVerseSanskrit: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।\nक्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ॥',
    sampleVerseHindi: 'उठो! जागो! और श्रेष्ठ महापुरुषों के समीप जाकर ज्ञान प्राप्त करो। ज्ञानियों का कहना है कि यह आत्मज्ञान का मार्ग छुरे की तीक्ष्ण धार के समान अत्यंत दुर्गम है।',
    sampleVerseEnglish: 'Arise, awake, and learn by approaching the excellent teachers! The sharp edge of a razor is difficult to cross; thus the wise say the path to spiritual truth is hard.',
    readOnlineUrl: '/scriptures/katha-upanishad',
    status: 'Published',
  },
  {
    id: 'mandukya-upanishad',
    titleHi: 'माण्डूक्योपनिषद्',
    titleEn: 'Mandukya Upanishad',
    category: 'upanishads',
    categoryLabel: 'उपनिषद',
    author: 'अथर्ववेद',
    versesCount: '१२ कारिका / मंत्र',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    colorCode: '#FF9933',
    shortSummary: 'ॐकार (AUM) के चार पादों—जाग्रत, स्वप्न, सुषुप्ति और तुरीय (परम शुद्ध चेतना) का संक्षिप्ततम व गूढ़तम विवेचन।',
    fullOverview: 'माण्डूक्योपनिषद् आकार में सबसे छोटा किंतु ज्ञान की दृष्टि से उपनिषदों का मुकुटमणि है। इसमें स्पष्ट किया गया है कि सम्पूर्ण दृश्य जगत ॐकार का ही विस्तार है और चेतना की चौथी अवस्था (तुरीय) ही ब्रह्म साक्षात्कार है।',
    sampleChapterTitle: 'मंत्र ७ - तुरीय अवस्था का लक्षण',
    sampleVerseSanskrit: 'नान्तःप्रज्ञं न बहिष्प्रज्ञं नोभयतःप्रज्ञं न प्रज्ञानघनं न प्रज्ञं नाप्रज्ञम् ।\nअदृष्टमव्यवहार्यमग्राह्यमलक्षणमचिन्त्यमव्यपदेश्यमेकात्मप्रत्ययसारं प्रपञ्चोपशमं शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः ॥',
    sampleVerseHindi: 'जो न भीतर की ओर प्रज्ञ है, न बाहर की ओर, जो अदृश्य, अव्यवहार्य, अगम्य, शांत, कल्याणकारी और अद्वैत है—वही तुरीय आत्मा है, उसी को जानना चाहिए।',
    sampleVerseEnglish: 'That which is neither inward-conscious nor outward-conscious, ungraspable, tranquil, auspicious, and non-dual—that is considered the Fourth (Turiya). It is the Atman; that is to be realized.',
    readOnlineUrl: '/scriptures/mandukya-upanishad',
    status: 'Published',
  },
  {
    id: 'rigveda-samhita',
    titleHi: 'ऋग्वेद संहिता',
    titleEn: 'Rigveda Samhita',
    category: 'vedas',
    categoryLabel: 'वेद संहिता',
    author: 'अनादि / अपौरुषेय (ऋषिगण)',
    versesCount: '१० मण्डल • १०२८ सूक्त • १०,५५२ ऋचाएं',
    languages: ['वैदिक संस्कृत', 'हिन्दी', 'English'],
    colorCode: '#FF9933',
    shortSummary: 'सृष्टि का प्राचीनतम ज्ञान ग्रंथ, जिसमें प्रकृति, देवगण, ब्रह्माण्डीय व्यवस्था (ऋत) और सत्य की दिव्य स्तुतियां हैं।',
    fullOverview: 'ऋग्वेद मानव जाति का प्राचीनतम साहित्य है। इसमें अग्नि, इन्द्र, वरुण, सूर्य, सोम और उषा आदि वैदिक देवों की स्तुति के साथ-साथ नासदीय सूक्त और पुरुष सूक्त जैसे ब्रह्माण्ड की उत्पत्ति संबंधी सर्वोच्च दार्शनिक विचार समाहित हैं।',
    sampleChapterTitle: 'मण्डल १, सूक्त १, ऋचा १ - अग्नि सूक्त',
    sampleVerseSanskrit: 'ॐ अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ।\nहोतारं रत्नधातमम् ॥',
    sampleVerseHindi: 'यज्ञ के पुरोहित, दिव्य ज्योतिर्मय, ऋतु अनुसार यज्ञ कराने वाले, हवि ग्रहण करने वाले और परम रत्नों को धारण करने वाले अग्निदेव की हम स्तुति करते हैं।',
    sampleVerseEnglish: 'I praise Agni, the chosen priest, god, minister of sacrifice, the hotar, the bestower of treasures.',
    readOnlineUrl: '/scriptures/rigveda-samhita',
    status: 'Published',
  },
  {
    id: 'shrimad-bhagavatam',
    titleHi: 'श्रीमद्भागवत महापुराण',
    titleEn: 'Srimad Bhagavatam',
    category: 'puranas',
    categoryLabel: 'महापुराण',
    author: 'श्री शुकदेव जी / महर्षि वेदव्यास',
    versesCount: '१२ स्कंध • ३३५ अध्याय • १८,००० श्लोक',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    colorCode: '#FF9933',
    shortSummary: 'परम हंसों की संहिता, जिसमें भगवान विष्णु के चौबीस अवतारों और विशेषतः श्रीकृष्ण की दिव्य लीलाओं का रसपूर्ण वर्णन है।',
    fullOverview: 'श्रीमद्भागवत पुराण समस्त वेदान्त का परिपक्व फल (अमृतरस) माना गया है। राजा परीक्षित को शुकदेव जी द्वारा गंगा तट पर सुनाया गया यह ज्ञान जीव को मृत्यु के भय से मुक्त कर भगवान के परम धाम की प्राप्ति कराता है।',
    sampleChapterTitle: 'प्रथम स्कंध, प्रथम अध्याय, श्लोक १ - मंगलाचरण',
    sampleVerseSanskrit: 'जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट्\nतेने ब्रह्म हृदा य आदिकवये मुह्यन्ति यत्सूरयः ।\nतेजोवारिमृदां यथा विनिमयो यत्र त्रिसर्गोऽमृषा\nधाम्ना स्वेन सदा निरस्तकुहकं सत्यं परं धीमहि ॥',
    sampleVerseHindi: 'जिससे इस जगत की सृष्टि, स्थिति और प्रलय होते हैं, जो स्वयं प्रकाश स्वरूप हैं, जिन्होंने ब्रह्मा जी के हृदय में वेद का ज्ञान प्रकाशित किया, उस परम सत्य परमात्मा का हम ध्यान करते हैं।',
    sampleVerseEnglish: 'We meditate upon that Supreme Truth from whom the creation, sustenance, and destruction of this universe proceed, who revealed the Vedic knowledge to Brahma.',
    readOnlineUrl: '/scriptures/shrimad-bhagavatam',
    status: 'Published',
  },
  {
    id: 'patanjali-yoga-sutra',
    titleHi: 'पतंजलि योगसूत्र',
    titleEn: 'Patanjali Yoga Sutras',
    category: 'darshana',
    categoryLabel: 'दर्शन एवं योग',
    author: 'महर्षि पतंजलि',
    versesCount: '४ पाद • १९६ सूत्र',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    colorCode: '#FF9933',
    shortSummary: 'मन के नियंत्रण, अष्टांग योग (यम, नियम, आसन, प्राणायाम आदि) और कैवल्य (मोक्ष) की प्राप्ति का वैज्ञानिक मार्गदर्शन।',
    fullOverview: 'पतंजलि योगसूत्र सनातन दर्शन के षड्दर्शनों में से योग दर्शन का मूल ग्रंथ है। समाधि पाद, साधन पाद, विभूति पाद और कैवल्य पाद—इन चार अध्यायों में मन की वृत्तियों के निरोध और आत्म-स्वरूप में स्थिर होने का सूत्रबद्ध विवेचन है।',
    sampleChapterTitle: 'समाधि पाद - सूत्र १-२',
    sampleVerseSanskrit: 'अथ योगानुशासनम् ॥\nयोगश्चित्तवृत्तिनिरोधः ॥',
    sampleVerseHindi: 'अब योग का अनुशासन आरम्भ होता है। चित्त की वृत्तियों (विचारों व तरंगों) का पूर्ण निरोध ही योग है।',
    sampleVerseEnglish: 'Now begins the authoritative instruction on Yoga. Yoga is the restraint of the fluctuations of consciousness.',
    readOnlineUrl: '/scriptures/patanjali-yoga-sutra',
    status: 'Published',
  },
  {
    id: 'chanakya-niti',
    titleHi: 'चाणक्य नीति',
    titleEn: 'Chanakya Niti',
    category: 'darshana',
    categoryLabel: 'दर्शन एवं नीति',
    author: 'आचार्य चाणक्य (कौटिल्य / विष्णुगुप्त)',
    versesCount: '१७ अध्याय • ३५०+ नीति श्लोक',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    colorCode: '#FF9933',
    shortSummary: 'जीवन प्रबंधन, राजनीति, मित्रता, अर्थ, कर्तव्य और सफलता के लिए आचार्य चाणक्य के व्यावहारिक एवं तीक्ष्ण सूत्र।',
    fullOverview: 'चाणक्य नीति तक्षशिला के महान आचार्य चाणक्य द्वारा रचित नीतिग्रंथ है। इसमें व्यक्तिगत आचरण, समाज में व्यवहार, शत्रु-मित्र की पहचान, विद्या का महत्व और जीवन की समस्याओं से निपटने की अचूक युक्तियां सरल श्लोकों में प्रस्तुत की गई हैं।',
    sampleChapterTitle: 'प्रथम अध्याय, श्लोक १',
    sampleVerseSanskrit: 'प्रणम्य शिरसा विष्णुं त्रैलोक्याधिपतिं प्रभुम् ।\nनानाशास्त्रोद्धृतं वक्ष्ये राजनीतिसमुच्चयम् ॥',
    sampleVerseHindi: 'तीनों लोकों के स्वामी भगवान विष्णु को सिर झुकाकर प्रणाम करते हुए मैं अनेक शास्त्रों से संकलित नीति और राजनीति के ज्ञान का वर्णन करता हूँ।',
    sampleVerseEnglish: 'Humbly bowing before Lord Vishnu, the master of the three worlds, I recite maxims of the science of political ethics selected from various shastras.',
    readOnlineUrl: '/scriptures/chanakya-niti',
    status: 'Published',
  },
];

export const DEFAULT_CMS_SHLOKAS: CMSShlokaItem[] = [
  {
    id: 'gita-2-47',
    source: 'श्रीमद्भगवद्गीता (Bhagavad Gita)',
    chapterVerse: 'अध्याय २, श्लोक ४७ (Chapter 2, Verse 47)',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo \'stvakarmaṇi ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्म के फल के हेतु मत बनो और न ही अकर्मण्यता में तुम्हारी आसक्ति हो।',
    english: 'You have a right only to work, never to its fruits; let not the fruits of action be your motive, nor let your attachment be to inaction.',
    category: 'Gita Shlokas',
    scriptureSlug: 'bhagavad-gita',
    youtubeId: 'Vnz8rJX9w-E',
    status: 'Published',
  },
  {
    id: 'gita-4-7',
    source: 'श्रीमद्भगवद्गीता (Bhagavad Gita)',
    chapterVerse: 'अध्याय ४, श्लोक ७ (Chapter 4, Verse 7)',
    sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥',
    transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'हे भारत (अर्जुन)! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं अपने रूप को रचता हूँ अर्थात साकार रूप में प्रकट होता हूँ।',
    english: 'Whenever and wherever there is a decline in righteousness and a rise of unrighteousness, at that time I manifest Myself on Earth.',
    category: 'Gita Shlokas',
    scriptureSlug: 'bhagavad-gita',
    youtubeId: 'Ua4d4RIPME8',
    status: 'Published',
  },
  {
    id: 'gita-9-22',
    source: 'श्रीमद्भगवद्गीता (Bhagavad Gita)',
    chapterVerse: 'अध्याय ९, श्लोक २२ (Chapter 9, Verse 22)',
    sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते ।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥',
    transliteration: 'ananyāś cintayanto māṁ ye janāḥ paryupāsate |\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'जो अनन्य भक्त केवल मेरा चिन्तन करते हुए मेरी उपासना करते हैं, उन नित्य युक्त भक्तों के योग और क्षेम का वहन मैं स्वयं करता हूँ।',
    english: 'For those who always worship Me with exclusive devotion, meditating on My transcendental form, to them I carry what they lack and preserve what they have.',
    category: 'Gita Shlokas',
    scriptureSlug: 'bhagavad-gita',
    youtubeId: 'KOCublNlE-U',
    status: 'Published',
  },
  {
    id: 'isha-1',
    source: 'ईशावास्योपनिषद् (Isha Upanishad)',
    chapterVerse: 'श्लोक १ (Verse 1)',
    sanskrit: 'ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥',
    transliteration: 'īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat |\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'इस अखिल ब्रह्माण्ड में जो कुछ भी जड़-चेतन जगत है, वह सब ईश्वर से व्याप्त है। अतः त्यागभाव से उसका उपभोग करो, किसी के धन का लोभ मत करो।',
    english: 'All this, whatsoever moves in this universe, is enveloped by the Lord. Enjoy through detachment; do not covet anyone’s wealth.',
    category: 'Upanishad Shlokas',
    scriptureSlug: 'isha-upanishad',
    youtubeId: 'bD9sf88tM4g',
    status: 'Published',
  },
  {
    id: 'shanti-mantra',
    source: 'बृहदारण्यकोपनिषद् (Brihadaranyaka Upanishad)',
    chapterVerse: 'शान्ति मन्त्र (Shanti Mantra)',
    sanskrit: 'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय ।\nमृत्योर्मा अमृतं गमय । ॐ शान्तिः शान्तिः शान्तिः ॥',
    transliteration: 'oṁ asato mā sad gamaya | tamaso mā jyotir gamaya |\nmṛtyor mā amṛtaṁ gamaya | oṁ śāntiḥ śāntiḥ śāntiḥ ||',
    meter: 'वैदिक मन्त्र (Vedic Chhanda)',
    hindi: 'हे प्रभु! मुझे असत्य से सत्य की ओर ले चलें, अंधकार से प्रकाश की ओर ले चलें, और मृत्यु से अमरता की ओर ले चलें। ॐ शान्ति शान्ति शान्ति।',
    english: 'Lead me from the unreal to the real, lead me from darkness to light, lead me from death to immortality. Om Peace, Peace, Peace.',
    category: 'Shanti Mantras',
    scriptureSlug: 'upanishads',
    youtubeId: 'Vwyo62x9yC4',
    status: 'Published',
  },
  {
    id: 'shiva-tandava-1',
    source: 'शिवताण्डवस्तोत्रम् (Shiva Tandava Stotram)',
    chapterVerse: 'श्लोक १ (Verse 1)',
    sanskrit: 'जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥',
    transliteration: 'jaṭā-ṭavī-galaj-jala-pravāha-pāvita-sthale\ngale \'valambya lambitāṁ bhujaṅga-tuṅga-mālikām |\nḍamad-ḍamad-ḍamad-ḍaman-ninādavad-ḍamarvayaṁ\ncakāra caṇḍa-tāṇḍavaṁ tanotu naḥ śivaḥ śivam ||',
    meter: 'पञ्चचामर छन्द (Panchachamara Meter)',
    hindi: 'जिनके जटा रूपी वन से बहने वाली गंगा की तरंगों से पवित्र गले में सर्पों की विशाल माला सुशोभित है, जो डमरू की डम-डम ध्वनि के साथ प्रचण्ड ताण्डव करते हैं, वे भगवान शिव हमारा कल्याण करें।',
    english: 'With His neck consecrated by the holy stream of the Ganga flowing from His matted forest hair, He who dances the fierce cosmic Tandava to the rhythmic sound of His damaru, may Lord Shiva bestow auspiciousness upon us.',
    category: 'Stotras',
    scriptureSlug: 'shiva-stotras',
    youtubeId: 'KRhcTPKdmrk',
    status: 'Published',
  },
];
