'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAudio } from '@/context/AudioContext';
import {
  Search,
  Play,
  Pause,
  Music,
  Share2,
  Sparkles,
  Volume2,
  ChevronRight,
  BookOpen,
  Heart,
  Flame,
  Check,
  Bell,
} from 'lucide-react';

interface Aarti {
  id: string;
  deity: string;
  category: 'all' | 'ganesha' | 'shiva' | 'durga' | 'hanuman' | 'vishnu' | 'lakshmi' | 'ram';
  titleHi: string;
  titleEn: string;
  tagline: string;
  lyricsHi: string;
  lyricsEn: string;
  meaning: string;
  audioTrack: {
    id: string;
    title: string;
    audioUrl: string;
    subtitle: string;
  };
}

const AARTIS_DATA: Aarti[] = [
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
Mata Jaki Parvati, Pita Mahadeva ||`,
    meaning: 'Glory to Lord Ganesha, son of Goddess Parvati and Lord Shiva. The one with a single tusk, compassionate, four-armed, adorned with vermilion on the forehead, riding a mouse. Devotees offer betel leaves, flowers, and sweets.',
    audioTrack: {
      id: 'audio-ganesh',
      title: 'श्री गणेश जी की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Lord Ganesha Devotional Aarti',
    },
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

दीनबन्धु दुखहर्ता, तुम ठाकुर मेरे ।
अपने हाथ उठाओ, द्वार पड़ा तेरे ॥ ॐ जय जगदीश हरे ॥

विषय विकार मिटाओ, पाप हरो देवा ।
श्रद्धा भक्ति बढ़ाओ, सन्तन की सेवा ॥ ॐ जय जगदीश हरे ॥

तन मन धन सब कुछ है तेरा, स्वामी सब कुछ है तेरा ।
तेरा तुझको अर्पण, क्या लागे मेरा ॥ ॐ जय जगदीश हरे ॥`,
    lyricsEn: `Om Jai Jagdish Hare, Swami Jai Jagdish Hare |
Bhakta Jano Ke Sankat, Daas Jano Ke Sankat,
Kshan Mein Door Kare || Om Jai Jagdish Hare ||

Jo Dhyave Phal Pave, Dukh Binase Man Ka |
Sukh Sampatti Ghar Aave, Kasht Mite Tan Ka || Om Jai Jagdish Hare ||

Maat Pita Tum Mere, Sharan Gahoon Kiski |
Tum Bin Aur Na Dooja, Aas Karoon Jiski || Om Jai Jagdish Hare ||

Tum Pooran Paramatma, Tum Antaryami |
Parabrahma Parameshwar, Tum Sab Ke Swami || Om Jai Jagdish Hare ||`,
    meaning: 'Glory to Lord Vishnu, the Lord of the Universe, who removes the troubles of devotees in an instant. You are Mother and Father, the Supreme Soul and Inner Dweller.',
    audioTrack: {
      id: 'audio-jagdish',
      title: 'श्री जगदीश जी की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Universal Aarti of Lord Vishnu',
    },
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
प्रणवाक्षर के मध्ये ये तीनों एका ॥ ॐ जय शिव ओंकारा ॥`,
    lyricsEn: `Om Jai Shiv Omkara, Swami Jai Shiv Omkara |
Brahma, Vishnu, Sadashiv, Ardhangi Dhara || Om Jai Shiv Omkara ||

Ekanan Chaturanan Panchanan Raje |
Hansasana Garudasana Vrishavahana Saje || Om Jai Shiv Omkara ||

Do Bhuja Chaar Chaturbhuja Dasabhuja Ati Sohe |
Teenon Roop Nirakhata Tribhuvana Jana Mohe || Om Jai Shiv Omkara ||`,
    meaning: 'Hail to Shiva, the sacred Omkara! Lord Brahma, Vishnu, and Sadashiva unite in you. You hold the trident, damru, and bring peace and liberation to all beings.',
    audioTrack: {
      id: 'audio-shiv',
      title: 'श्री शिव जी की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Maha Shiv Aarti',
    },
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
धूम्र विलोचन नैना, निशदिन मदमाती ॥ जय अम्बे गौरी ॥`,
    lyricsEn: `Jai Ambe Gauri, Maiya Jai Shyama Gauri |
Tumko Nisadin Dhyawat, Hari Brahma Shivri || Jai Ambe Gauri ||

Maang Sindoor Virajat, Teeko Mrigmad Ko |
Ujjwal Se Dou Naina, Chandravadan Neeko || Jai Ambe Gauri ||

Kehari Vahan Rajat, Khadga Khappar Dhari |
Sur-Nar-Muni-Jan Sewat, Tinke Dukhahari || Jai Ambe Gauri ||`,
    meaning: 'Hail to Mother Ambe Gauri! Whom Vishnu, Brahma, and Shiva worship constantly. Riding a lion, holding weapons to slay demonic forces and protect Her devotees.',
    audioTrack: {
      id: 'audio-durga',
      title: 'श्री अम्बे माता की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Maa Durga Aarti',
    },
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
आरती करत संजना माई ॥`,
    lyricsEn: `Aarti Kijai Hanuman Lala Ki |
Dusht Dalan Raghunath Kala Ki ||

Jaake Bal Se Girivar Kaapein |
Rog Dosh Jaake Nikat Na Jhaapein ||
Anjani Putra Mahabaladai |
Santan Ke Prabhu Sada Sahai ||`,
    meaning: 'Perform the aarti of beloved Hanuman, who subdues the wicked and represents Lord Rama’s prowess. His strength makes mountains tremble, and no afflictions dare approach his devotee.',
    audioTrack: {
      id: 'audio-hanuman',
      title: 'श्री हनुमान जी की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Sankatmochan Hanuman Aarti',
    },
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
खान-पान का वैभव, सब तुमसे आता ॥ ॐ जय लक्ष्मी माता ॥`,
    lyricsEn: `Om Jai Laxmi Mata, Maiya Jai Laxmi Mata |
Tumko Nisadin Sewat, Har Vishnu Vidhata || Om Jai Laxmi Mata ||

Uma, Rama, Brahmani, Tum Hi Jag-Mata |
Surya-Chandrama Dhyawat, Narad Rishi Gaata || Om Jai Laxmi Mata ||`,
    meaning: 'Glory to Mother Lakshmi, who bestows wealth, righteous prosperity, and peace upon homes where devotion and dharma reside.',
    audioTrack: {
      id: 'audio-laxmi',
      title: 'श्री लक्ष्मी माता की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Maa Lakshmi Aarti',
    },
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

जहं ते प्रगट भई गंगा, कलुष कलिहारिणी श्रीगंगा ।
स्मरन ते होत मोह भंगा, बसी शिव शीश जटा के संगा ॥
आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की ॥

श्री राधा-मुख-कमल-लोचन, भवाभय-दारुन-विमोचन ।
करन-रस-माधुरी-सीचन, कृपा-रस-वारिधि-उदंचन ॥
आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की ॥`,
    lyricsEn: `Aarti Kunj Bihari Ki, Shri Giridhar Krishna Murari Ki ||
Gale Mein Baijanti Mala, Bajavai Murli Madhur Baala |
Shravan Mein Kundal Jhalkata, Jugal Chhavi Dekhi Man Bhaata ||`,
    meaning: 'Aarti of Kunj Bihari, the bearer of Mount Govardhan, wearing the garland of wildflowers, playing the melodious flute that enchants all living beings.',
    audioTrack: {
      id: 'audio-krishna',
      title: 'श्री कुंजबिहारी जी की आरती',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Lord Krishna Aarti',
    },
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
मम हृदय कंज निवास कुरु, कामादि खल-दल-मंजनम् ॥`,
    lyricsEn: `Shri Ramachandra Kripalu Bhaju Man Harana Bhavabhaya Darunam |
Nava-Kanja Lochana, Kanj Mukha, Kara Kanja, Pada Kanj-Arunam ||

Kandarpa Aganita Amita Chhavi, Nava-Neela Neerada Sundaram |
Pata-Peeta Manahu Tadita Ruchi Shuchi Naumi Janaka Sutavaram ||`,
    meaning: 'O mind, worship the compassionate Lord Ramachandra, who dispels the terrifying fears of mundane life. He has eyes like fresh lotus petals, a lotus-like face, hands, and reddish lotus-like feet.',
    audioTrack: {
      id: 'audio-ram',
      title: 'श्री रामचन्द्र कृपालु भजु मन',
      audioUrl: '/audio/om_namah_shivaya.wav',
      subtitle: 'Goswami Tulsidas Shri Ram Stuti',
    },
  },
];

export default function AartisPage() {
  const { isPlaying, currentTrack, playAudio, pauseAudio } = useAudio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAarti, setSelectedAarti] = useState<Aarti>(AARTIS_DATA[0]);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bellChime, setBellChime] = useState(false);

  // Filtered list based on category & search
  const filteredAartis = useMemo(() => {
    return AARTIS_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lyricsHi.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleTogglePlay = (aarti: Aarti) => {
    if (isPlaying && currentTrack?.id === aarti.audioTrack.id) {
      pauseAudio();
    } else {
      playAudio(aarti.audioTrack);
    }
  };

  const handleCopy = (aarti: Aarti) => {
    navigator.clipboard.writeText(`${aarti.titleHi}\n\n${aarti.lyricsHi}\n\nभावार्थ:\n${aarti.meaning}`);
    setCopiedId(aarti.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const ringBell = () => {
    setBellChime(true);
    setTimeout(() => setBellChime(false), 800);
  };

  const categories = [
    { id: 'all', label: 'सभी आरती (All)' },
    { id: 'ganesha', label: 'श्री गणेश' },
    { id: 'shiva', label: 'भगवान शिव' },
    { id: 'durga', label: 'माँ दुर्गा' },
    { id: 'hanuman', label: 'श्री हनुमान' },
    { id: 'vishnu', label: 'श्री विष्णु / कृष्ण' },
    { id: 'lakshmi', label: 'माँ लक्ष्मी' },
    { id: 'ram', label: 'श्री राम' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#121216] text-[#1c1917] dark:text-stone-100 font-sans pb-20">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2c1306] via-[#3a1a09] to-[#1e0d04] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-600/40">
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-amber-500/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>॥ नमो देव्यै महादेव्यै शिवायै सततं नमः ॥</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-wide text-amber-100">
            सम्पूर्ण आरती संग्रह (Sacred Aartis)
          </h1>

          <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base font-serif">
            सनातन देवी-देवताओं की पावन आरतियां, स्तुतियां, हिंदी अर्थ और भावार्थ सहित। नित्य पाठ करें और प्रभु कृपा पाएं।
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-7 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="आरती या देवी-देवता का नाम खोजें..."
              className="w-full bg-black/40 border border-amber-500/40 text-white rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 backdrop-blur-md placeholder:text-stone-400"
            />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Pill Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-semibold whitespace-nowrap transition ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-white dark:bg-[#1a1411] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Two Columns: Aarti List & Active Reader */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Left: Aarti Cards List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-sm font-serif font-bold text-stone-500 uppercase tracking-wider px-1">
              आरती सूची ({filteredAartis.length})
            </h2>

            <div className="space-y-3">
              {filteredAartis.map((aarti) => {
                const isSelected = selectedAarti.id === aarti.id;
                const isAudioPlaying = isPlaying && currentTrack?.id === aarti.audioTrack.id;

                return (
                  <div
                    key={aarti.id}
                    onClick={() => setSelectedAarti(aarti)}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-[#27170c] border-amber-500/70 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-white dark:bg-[#1a1411] border-stone-200 dark:border-stone-800 hover:border-amber-400/50 shadow-sm'
                    }`}
                  >
                    <div className="space-y-1 pr-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-serif">
                          {aarti.deity}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                        {aarti.titleHi}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-serif line-clamp-1">
                        {aarti.tagline}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePlay(aarti);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                          isAudioPlaying
                            ? 'bg-amber-600 text-white shadow-md animate-pulse'
                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200'
                        }`}
                        title={isAudioPlaying ? 'Pause Aarti' : 'Play Aarti'}
                      >
                        {isAudioPlaying ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                      </button>
                      <ChevronRight className={`w-4 h-4 text-stone-400 ${isSelected ? 'rotate-90 sm:rotate-0 text-amber-600' : ''}`} />
                    </div>
                  </div>
                );
              })}

              {filteredAartis.length === 0 && (
                <div className="p-8 text-center bg-white dark:bg-[#1a1411] rounded-2xl border border-stone-200 dark:border-stone-800">
                  <p className="font-serif text-stone-500">कोई आरती नहीं मिली। कृपया दूसरा शब्द खोजें।</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Selected Aarti Full Reader View (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 bg-white dark:bg-[#1a1411] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl p-6 sm:p-8 space-y-6">
              
              {/* Reader Top Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-serif uppercase tracking-wider block">
                    {selectedAarti.deity}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-white mt-0.5">
                    {selectedAarti.titleHi}
                  </h2>
                  <span className="text-xs text-stone-500 font-serif">{selectedAarti.titleEn}</span>
                </div>

                {/* Font Size & Action Buttons */}
                <div className="flex items-center space-x-2">
                  {/* Virtual Temple Bell */}
                  <button
                    onClick={ringBell}
                    className={`p-2.5 rounded-xl border border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition ${
                      bellChime ? 'scale-125 rotate-12 text-amber-500' : ''
                    }`}
                    title="घंटी बजाएं (Ring Temple Bell)"
                  >
                    <Bell className="w-4 h-4" />
                  </button>

                  {/* Font Size Selector */}
                  <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 text-xs font-serif font-bold">
                    <button
                      onClick={() => setFontSize('normal')}
                      className={`px-2.5 py-1 rounded-lg transition ${
                        fontSize === 'normal' ? 'bg-white dark:bg-stone-700 shadow-sm text-amber-600' : 'text-stone-500'
                      }`}
                    >
                      अ
                    </button>
                    <button
                      onClick={() => setFontSize('large')}
                      className={`px-2.5 py-1 rounded-lg transition text-sm ${
                        fontSize === 'large' ? 'bg-white dark:bg-stone-700 shadow-sm text-amber-600' : 'text-stone-500'
                      }`}
                    >
                      अ+
                    </button>
                    <button
                      onClick={() => setFontSize('xlarge')}
                      className={`px-2.5 py-1 rounded-lg transition text-base ${
                        fontSize === 'xlarge' ? 'bg-white dark:bg-stone-700 shadow-sm text-amber-600' : 'text-stone-500'
                      }`}
                    >
                      अ++
                    </button>
                  </div>

                  {/* Share/Copy */}
                  <button
                    onClick={() => handleCopy(selectedAarti)}
                    className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition text-xs flex items-center space-x-1"
                    title="आरती कॉपी करें"
                  >
                    {copiedId === selectedAarti.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Audio Banner Bar */}
              <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-white">
                      आरती की मधुर धुन सुनें
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      भक्तिमय आरती गायन एवं वाद्य
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleTogglePlay(selectedAarti)}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-bold font-serif shadow-md transition flex items-center space-x-1.5"
                >
                  {isPlaying && currentTrack?.id === selectedAarti.audioTrack.id ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>आरती रोकें</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>आरती सुनें</span>
                    </>
                  )}
                </button>
              </div>

              {/* Aarti Sacred Lyrics Content */}
              <div
                className={`font-serif leading-loose whitespace-pre-line text-stone-800 dark:text-stone-100 transition-all ${
                  fontSize === 'normal'
                    ? 'text-base sm:text-lg'
                    : fontSize === 'large'
                    ? 'text-lg sm:text-xl font-medium'
                    : 'text-xl sm:text-2xl font-semibold'
                }`}
              >
                {selectedAarti.lyricsHi}
              </div>

              {/* Transliteration & Meaning Box */}
              <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                <div className="bg-[#faf6ee] dark:bg-[#1f1610] rounded-2xl p-4 sm:p-5 border border-amber-200 dark:border-amber-900/60 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 font-serif">
                    English Transliteration
                  </span>
                  <p className="text-xs sm:text-sm font-serif text-stone-700 dark:text-stone-300 whitespace-pre-line leading-relaxed">
                    {selectedAarti.lyricsEn}
                  </p>
                </div>

                <div className="bg-stone-50 dark:bg-stone-900/60 rounded-2xl p-4 sm:p-5 border border-stone-200 dark:border-stone-800 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 font-serif">
                    आरती का पावन भावार्थ (Spiritual Meaning)
                  </span>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
                    {selectedAarti.meaning}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
