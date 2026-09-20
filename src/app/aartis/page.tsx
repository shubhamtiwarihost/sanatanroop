'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAudio } from '@/context/AudioContext';
import { useCMS } from '@/context/CMSContext';
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
  Sliders,
  RotateCcw,
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
  youtubeId: string;
  singer: string;
  duration: string;
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
    singer: 'अनुराधा पौडवाल व लखबीर सिंह लक्खा',
    duration: '6:12',
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
    youtubeId: 'kYJq0689bYk',
    singer: 'अनुराधा पौडवाल (Anuradha Paudwal)',
    duration: '6:44',
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
  },
];

export default function AartisPage() {
  const { aartis } = useCMS();
  const { isPlaying, currentTrack, playAudio, pauseAudio } = useAudio();

  const allAartis = useMemo(() => {
    return (aartis && aartis.length > 0 ? aartis : AARTIS_DATA) as Aarti[];
  }, [aartis]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAarti, setSelectedAarti] = useState<Aarti>(allAartis[0] || AARTIS_DATA[0]);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bellChime, setBellChime] = useState(false);

  // Sync selectedAarti if CMS updates it
  useEffect(() => {
    if (allAartis && allAartis.length > 0) {
      const current = allAartis.find((a) => a.id === selectedAarti.id);
      if (current) {
        setSelectedAarti(current);
      } else {
        setSelectedAarti(allAartis[0]);
      }
    }
  }, [allAartis]);

  // Real Aarti Song Player State (Plays authentic song by renowned devotional singers)
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  // Hindi Voice Synthesis States (Secondary spoken recitation mode)
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(0.88);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check speech synthesis support on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
      setVoiceSupported(false);
    }
  }, []);

  // Stop voice when switching aarti or on unmount
  useEffect(() => {
    stopVoice();
  }, [selectedAarti]);

  const stopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsVoiceActive(false);
  };

  const handlePlayRealSong = (aarti: Aarti) => {
    stopVoice();
    if (playingSongId === aarti.id) {
      setPlayingSongId(null);
    } else {
      setSelectedAarti(aarti);
      setPlayingSongId(aarti.id);
    }
  };

  const startVoiceRecitation = (aarti: Aarti) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      handleToggleAudio(aarti);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean text for natural Hindi recitation
    const textToSpeak = `${aarti.titleHi}. ${aarti.lyricsHi.replace(/[॥।]/g, ', ')}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Pick Hindi voice if available
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(
      (v) => v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi')
    );
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    utterance.lang = 'hi-IN';
    utterance.rate = voiceSpeed;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsVoiceActive(true);
      // Simultaneously play soft background devotional music
      playAudio(aarti.audioTrack);
    };

    utterance.onend = () => {
      setIsVoiceActive(false);
    };

    utterance.onerror = () => {
      setIsVoiceActive(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleToggleVoice = (aarti: Aarti) => {
    if (isVoiceActive) {
      stopVoice();
      pauseAudio();
    } else {
      startVoiceRecitation(aarti);
    }
  };

  const handleToggleAudio = (aarti: Aarti) => {
    if (isPlaying && currentTrack?.id === aarti.audioTrack.id) {
      pauseAudio();
      stopVoice();
    } else {
      handleToggleVoice(aarti);
    }
  };

  // Filtered list based on category & search
  const filteredAartis = useMemo(() => {
    return allAartis.filter((item) => {
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

  const handleCopy = (aarti: Aarti) => {
    navigator.clipboard.writeText(`${aarti.titleHi}\n\n${aarti.lyricsHi}\n\nभावार्थ:\n${aarti.meaning}`);
    setCopiedId(aarti.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const ringBell = () => {
    setBellChime(true);
    setTimeout(() => setBellChime(false), 800);
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 1.2);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      // AudioContext not allowed or unsupported
    }
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
            सनातन देवी-देवताओं की पावन आरतियां, स्तुतियां, हिंदी अर्थ और भावार्थ सहित। असली भक्ति आरती गीत (Original Devotional Songs) और पावन स्वर पाठ के साथ।
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-7 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="आरती, देवता अथवा बोल खोजें..."
              className="w-full bg-black/40 border border-amber-500/40 text-white rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 backdrop-blur-md placeholder:text-stone-400"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Filters */}
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

        {/* Aarti Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Left: Aarti Selector List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 px-1 font-serif">
              उपलब्ध आरतियां ({filteredAartis.length})
            </span>

            <div className="space-y-2.5">
              {filteredAartis.map((aarti) => {
                const isSelected = selectedAarti.id === aarti.id;
                const isSongActive = playingSongId === aarti.id;

                return (
                  <div
                    key={aarti.id}
                    onClick={() => setSelectedAarti(aarti)}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-amber-50/90 dark:bg-[#231812] border-amber-500 shadow-md shadow-amber-500/15 ring-1 ring-amber-500/50'
                        : 'bg-white dark:bg-[#1a1411] border-stone-200 dark:border-stone-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="space-y-1.5 pr-3 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-serif">
                          {aarti.deity}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-serif">
                          ⏱️ {aarti.duration}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition truncate">
                        {aarti.titleHi}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-serif line-clamp-1">
                        स्वर: <span className="font-semibold text-stone-700 dark:text-stone-300">{aarti.singer.split(' (')[0]}</span>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayRealSong(aarti);
                        }}
                        className={`px-3 py-1.5 rounded-xl flex items-center space-x-1.5 text-xs font-serif font-bold transition shadow-sm ${
                          isSongActive
                            ? 'bg-amber-600 text-white shadow-md animate-pulse ring-2 ring-amber-400'
                            : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/80'
                        }`}
                        title={isSongActive ? 'आरती गीत बंद करें' : 'असली आरती गीत सुनें'}
                      >
                        {isSongActive ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>गीत चालू</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            <span>गीत सुनें</span>
                          </>
                        )}
                      </button>
                      <ChevronRight className={`w-4 h-4 text-stone-400 ${isSelected ? 'text-amber-600' : ''}`} />
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

              {/* 1. Authentic Real Aarti Devotional Song Player Box */}
              <div className="bg-gradient-to-br from-[#2a1306] via-[#3d1a08] to-[#1c0c04] border-2 border-amber-500/60 rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center shadow-lg shrink-0">
                      <Music className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-amber-500/25 text-amber-300 border border-amber-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full font-serif">
                          ✨ प्रामाणिक आरती गीत (Original Devotional Song)
                        </span>
                        <span className="text-amber-200/80 text-xs font-serif">
                          ⏱️ {selectedAarti.duration}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-amber-100 mt-1">
                        {selectedAarti.titleHi}
                      </h4>
                      <p className="text-xs text-amber-200/90 font-serif">
                        स्वर (Singer): <span className="text-white font-semibold">{selectedAarti.singer}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handlePlayRealSong(selectedAarti)}
                      className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-xl font-serif font-bold text-sm shadow-lg shadow-amber-600/30 transition flex items-center justify-center space-x-2"
                    >
                      {playingSongId === selectedAarti.id ? (
                        <>
                          <Pause className="w-4 h-4 fill-current" />
                          <span>गीत रोकें (Pause Song)</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>आरती गीत सुनें (Play Real Song)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Real Aarti Song Video / Audio Embed */}
                {playingSongId === selectedAarti.id && (
                  <div className="mt-4 pt-4 border-t border-amber-500/30 space-y-3">
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video max-h-[360px] border border-amber-500/40">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedAarti.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        title={`${selectedAarti.titleHi} - ${selectedAarti.singer}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-amber-200/80 font-serif px-1">
                      <span>✨ पावन आरती सुनते हुए नीचे दिए गए संपूर्ण पदों का पाठ करें।</span>
                      <button
                        onClick={ringBell}
                        className="hover:text-amber-300 transition flex items-center space-x-1 font-semibold"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>मंदिर घंटी बजाएं</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Secondary Voice Recitation Mode (Text to speech) */}
              <div className="flex items-center justify-between bg-stone-50 dark:bg-stone-900/60 rounded-xl px-4 py-2.5 border border-stone-200 dark:border-stone-800 text-xs">
                <div className="flex items-center space-x-2 text-stone-600 dark:text-stone-400 font-serif">
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>धीमे स्वर में पाठ (Voice Recitation mode)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={voiceSpeed}
                    onChange={(e) => {
                      const newSpeed = parseFloat(e.target.value);
                      setVoiceSpeed(newSpeed);
                      if (isVoiceActive) {
                        stopVoice();
                        setTimeout(() => startVoiceRecitation(selectedAarti), 100);
                      }
                    }}
                    className="bg-white dark:bg-stone-800 border border-amber-400/40 rounded-lg px-2 py-1 text-[11px] font-serif font-semibold text-stone-800 dark:text-stone-200"
                    title="स्वर गति (Voice Speed)"
                  >
                    <option value="0.8">0.8x</option>
                    <option value="0.88">1.0x</option>
                    <option value="1.05">1.2x</option>
                  </select>

                  <button
                    onClick={() => handleToggleVoice(selectedAarti)}
                    className="text-amber-700 dark:text-amber-400 hover:text-amber-800 font-serif font-bold text-xs flex items-center space-x-1"
                  >
                    {isVoiceActive ? (
                      <>
                        <Pause className="w-3 h-3 fill-current" />
                        <span>स्वर पाठ रोकें</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>स्वर पाठ सुनें</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Aarti Sacred Lyrics Content - 100% Complete */}
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
