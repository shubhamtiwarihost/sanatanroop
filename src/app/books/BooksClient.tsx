'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCMS } from '@/context/CMSContext';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Search,
  BookOpen,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Star,
  Check,
  X,
  Bookmark,
  Layers,
  Volume2,
  FileText,
  Download,
} from 'lucide-react';
import { SCRIPTURES_STATIC_DATA } from '@/data/scripturesStaticData';
import { speakVedicVoice, stopVedicVoice, isVoiceSupported } from '@/lib/voice';

interface BookItem {
  id: string;
  titleHi: string;
  titleEn: string;
  category: 'all' | 'vedas' | 'upanishads' | 'itihasa' | 'gita' | 'puranas' | 'darshana';
  categoryLabel: string;
  author: string;
  versesCount: string;
  languages: string[];
  coverTheme: {
    bgGradient: string;
    accentColor: string;
    borderColor: string;
    emblem: string;
    sacredHeader: string;
    spineGradient: string;
  };
  shortSummary: string;
  fullOverview: string;
  sampleChapterTitle: string;
  sampleVerseSanskrit: string;
  sampleVerseHindi: string;
  sampleVerseEnglish: string;
  readOnlineUrl?: string;
  pdfUrl?: string;
  pdfFileName?: string;
  pdfFileSize?: string;
}

const BOOKS_DATA: BookItem[] = [
  {
    id: 'bhagavad-gita',
    titleHi: 'श्रीमद्भगवद्गीता',
    titleEn: 'Shrimad Bhagavad Gita',
    category: 'gita',
    categoryLabel: 'श्रीमद्भगवद्गीता',
    author: 'महर्षि वेदव्यास / भगवान श्री कृष्ण',
    versesCount: '१८ अध्याय • ७०० श्लोक',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    coverTheme: {
      bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
      accentColor: '#FF9933',
      borderColor: 'border-[#FF9933]',
      emblem: '🕉️',
      sacredHeader: '॥ ॐ श्री परमात्मने नमः ॥',
      spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
    },
    shortSummary: 'कुरुक्षेत्र की रणभूमि में भगवान श्री कृष्ण द्वारा अर्जुन को दिया गया कर्म, ज्ञान और भक्तियोग का शाश्वत उपदेश।',
    fullOverview: 'श्रीमद्भगवद्गीता महाभारत के भीष्म पर्व का एक अंश है। यह समस्त उपनिषदों का सार (दधिखंड) है। जीवन की हर दुविधा, कर्तव्य, कर्मण्यता, अनासक्ति और परमात्मा से मिलन के गूढ़ रहस्यों को सरल रूप में उद्घाटित करने वाला यह विश्वप्रसिद्ध ग्रंथ है।',
    sampleChapterTitle: 'अध्याय २, श्लोक ४७ - निष्काम कर्मयोग',
    sampleVerseSanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
    sampleVerseHindi: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्म के फल के हेतु मत बनो और न ही अकर्मण्यता में तुम्हारी आसक्ति हो।',
    sampleVerseEnglish: 'You have a right only to work, never to its fruits; let not the fruits of action be your motive, nor let your attachment be to inaction.',
    readOnlineUrl: '/scriptures/bhagavad-gita',
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
    coverTheme: {
      bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
      accentColor: '#FF9933',
      borderColor: 'border-[#FF9933]',
      emblem: '🏹',
      sacredHeader: '॥ श्री सीतारामचन्द्राभ्यां नमः ॥',
      spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
    },
    shortSummary: 'अवधी भाषा में गोस्वामी तुलसीदास जी द्वारा रचित मर्यादा पुरुषोत्तम भगवान श्री राम के जीवन का परम पावन चरित्र।',
    fullOverview: 'श्रीरामचरितमानस सनातन संस्कृति की आत्मा है। बालकाण्ड, अयोध्याकाण्ड, अरण्यकाण्ड, किष्किन्धाकाण्ड, सुंदरकाण्ड, लंकाकाण्ड और उत्तरकाण्ड—इन सातों सोपानों के माध्यम से धर्म, मर्यादा, भ्रातृ-प्रेम, भक्ति और शरणागति का अनुपम दर्शन कराया गया है।',
    sampleChapterTitle: 'सुंदरकाण्ड - मंगलाचरण',
    sampleVerseSanskrit: 'शान्तं शाश्वतमप्रमेयमनघं निर्वाणशान्तिप्रदं\nब्रह्माशम्भुफणीन्द्रसेव्यमनिशं वेदान्तवेद्यं विभुम् ।\nरामाख्यं जगदीश्वरं सुरगुरुं मायामनुष्यं हरिं\nवन्देऽहं करुणाकरं रघुवरं भूपालचूडामणिम् ॥',
    sampleVerseHindi: 'शांत, सनातन, अप्रमेय, निष्पाप, मोक्षरूप परम शांति देने वाले, ब्रह्मा, शम्भु और शेषनाग द्वारा नित्य सेवित, रघुश्रेष्ठ श्री राम को मैं नमस्कार करता हूँ।',
    sampleVerseEnglish: 'I bow to the jewel of kings, the Lord of the universe known as Rama, who is calm, eternal, immeasurable, sinless, and the giver of eternal peace.',
    readOnlineUrl: '/scriptures/ramcharitmanas',
    pdfUrl: '/books/ramcharitmanas.pdf',
    pdfFileName: 'ramcharitmanas-full.pdf',
    pdfFileSize: '4.6 MB',
  },
  {
    id: 'mahabharat',
    titleHi: 'महाभारत',
    titleEn: 'Mahabharata',
    category: 'itihasa',
    categoryLabel: 'इतिहास एवं महाकाव्य',
    author: 'महर्षि कृष्ण द्वैपायन वेदव्यास',
    versesCount: '१८ पर्व • १,००,०००+ श्लोक',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    coverTheme: {
      bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
      accentColor: '#FF9933',
      borderColor: 'border-[#FF9933]',
      emblem: '🏹',
      sacredHeader: '॥ नारायणं नमस्कृत्य नरं चैव नरोत्तमम् ॥',
      spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
    },
    shortSummary: 'धर्म, अर्थ, काम और मोक्ष का विश्वप्रसिद्ध महाग्रंथ जिसमें कौरव-पाण्डव वंश, कुरुक्षेत्र महायुद्ध और शाश्वत मानवीय मूल्यों का विस्तृत वर्णन है।',
    fullOverview: 'महाभारत महर्षि वेदव्यास द्वारा रचित विश्व का सबसे विशाल और गहन महाकाव्य है। इसमें १८ पर्व (आदि, सभा, वन, विराट, उद्योग, भीष्म, द्रोण, कर्ण, शल्य, सौप्तिक, स्त्री, शांति, अनुशासन, अश्वमेधिक, आश्रमवासिक, मौसल, महाप्रस्थानिक और स्वर्गारोहण पर्व) तथा १ लाख से अधिक श्लोक सम्मिलित हैं। कहा गया है कि "यन्नेहास्ति न तत्क्वचित्" (जो इस महाभारत में नहीं है, वह कहीं नहीं है)। इसी महाग्रंथ के भीष्म पर्व में जगत्प्रसिद्ध श्रीमद्भगवद्गीता समाहित है।',
    sampleChapterTitle: 'मंगलाचरण एवं आदि पर्व',
    sampleVerseSanskrit: 'नारायणं नमस्कृत्य नरं चैव नरोत्तमम् ।\nदेवीं सरस्वतीं व्यासं ततो जयमुदीरयेत् ॥',
    sampleVerseHindi: 'भगवान नारायण, नर-श्रेष्ठ अर्जुन, भगवती सरस्वती और महर्षि वेदव्यास को नमस्कार करके "जय" (महाभारत) नामक इतिहास का पाठ करना चाहिए।',
    sampleVerseEnglish: 'Having bowed down to Lord Narayana, and to Nara the foremost of beings, and to Goddess Saraswati, and to Sage Vyasa, one should recite the sacred history named Jaya (Mahabharata).',
    readOnlineUrl: '/scriptures/mahabharat',
    pdfUrl: '/books/mahabharat.pdf',
    pdfFileName: 'mahabharat-full.pdf',
    pdfFileSize: '35 MB',
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
    coverTheme: {
      bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
      accentColor: '#FF9933',
      borderColor: 'border-[#FF9933]',
      emblem: '✨',
      sacredHeader: '॥ ॐ पूर्णमदः पूर्णमिदम् ॥',
      spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
    },
    shortSummary: 'समस्त चराचर जगत में ईश्वर की उपस्थिति और त्यागपूर्वक उपभोग का सर्वोच्च वेदान्त सूत्र।',
    fullOverview: 'ईशावास्योपनिषद् शुक्ल यजुर्वेद का चालीसवां अध्याय है। यह ज्ञान, कर्म और उपासना के समन्वय का अद्वितीय ग्रंथ है। इसका पहला ही श्लोक बताता है कि यह सारा संसार परमात्मा से आच्छादित है, इसलिए किसी के धन का लोभ न करते हुए त्यागभाव से जीवन का आनंद लो।',
    sampleChapterTitle: 'शांति पाठ एवं प्रथम मंत्र',
    sampleVerseSanskrit: 'ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥\n\nईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥',
    sampleVerseHindi: 'यह सम्पूर्ण जगत परमात्मा से व्याप्त है। इसलिए त्यागपूर्वक इसका उपभोग करो, किसी के धन की लालसा मत करो।',
    sampleVerseEnglish: 'All this, whatever moves in this moving world, is enveloped by God. Therefore, find your enjoyment in renunciation; do not covet anyone’s wealth.',
    readOnlineUrl: '/scriptures/isha-upanishad',
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
    coverTheme: {
      bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
      accentColor: '#FF9933',
      borderColor: 'border-[#FF9933]',
      emblem: '🔥',
      sacredHeader: '॥ उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ॥',
      spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
    },
    shortSummary: 'बालक नचिकेता और मृत्यु के देवता यमराज के मध्य अमर आत्मा और आत्मज्ञान का अत्यंत रोमांचक संवाद।',
    fullOverview: 'कठोपनिषद् में नचिकेता द्वारा यमराज से मांगे गए तीसरे वरदान (मृत्यु के पश्चात आत्मा के अस्तित्व) पर गूढ़ दार्शनिक विवेचन है। श्रेयस (कल्याणकारी) और प्रेयस (सुखकर) का भेद इसी उपनिषद में विशद रूप से समझाया गया है।',
    sampleChapterTitle: 'प्रथम अध्याय, तृतीय वल्ली, मंत्र १४',
    sampleVerseSanskrit: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।\nक्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ॥',
    sampleVerseHindi: 'उठो! जागो! और श्रेष्ठ महापुरुषों के समीप जाकर ज्ञान प्राप्त करो। ज्ञानियों का कहना है कि यह आत्मज्ञान का मार्ग छुरे की तीक्ष्ण धार के समान अत्यंत दुर्गम है।',
    sampleVerseEnglish: 'Arise, awake, and learn by approaching the excellent teachers! The sharp edge of a razor is difficult to cross; thus the wise say the path to spiritual truth is hard.',
    readOnlineUrl: '/scriptures/katha-upanishad',
  },
  {
    id: 'mandukya-upanishad',
    titleHi: 'माण्डूक्योपनिषद्',
    titleEn: 'Mandukya Upanishad',
    category: 'upanishads',
    categoryLabel: 'उपनिषद',
    author: 'अथर्ववेद',
    versesCount: '१२ मंत्र',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    coverTheme: {
      bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
      accentColor: '#FF9933',
      borderColor: 'border-[#FF9933]',
      emblem: '🕉️',
      sacredHeader: '॥ अयमात्मा ब्रह्म ॥',
      spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
    },
    shortSummary: 'ॐकार के तीन पादों और तुरीय अवस्था का विश्लेषण करने वाली अत्यंत गहन वेदान्त उपनिषद।',
    fullOverview: 'माण्डूक्योपनिषद् अथर्ववेद की लघु किंतु सर्वाधिक प्रभावशाली उपनिषद है। यह चेतना की चार अवस्थाओं—जाग्रत, स्वप्न, सुषुप्ति और तुरीय—का प्रत्यक्ष विश्लेषण करती है।',
    sampleChapterTitle: 'प्रथम मंत्र - ॐकार की व्याख्या',
    sampleVerseSanskrit: 'ॐ इत्येतदक्षरमिदꣳ सर्वं तस्योपव्याख्यानं भूतं भवद् भविष्यदिति सर्वमोङ्कार एव ।\nयच्चान्यत् त्रिकालातीतं तदप्योङ्कार एव ॥',
    sampleVerseHindi: 'ॐ—यह अविनाशी अक्षर ही यह सब कुछ है। जो बीत चुका है, जो वर्तमान है और जो भविष्य में होगा, वह सब ॐकार ही है।',
    sampleVerseEnglish: 'OM—this imperishable syllable is all this. What was, what is, and what shall be, all is verily OM.',
    readOnlineUrl: '/scriptures/mandukya-upanishad',
  },
  {
    id: 'rigveda',
    titleHi: 'ऋग्वेद संहिता',
    titleEn: 'Rigveda Samhita',
    category: 'vedas',
    categoryLabel: 'वेद संहिता',
    author: 'अनादि / अपौरुषेय (ब्रह्म ऋषि)',
    versesCount: '१० मण्डल • १०२८ सूक्त',
    languages: ['वैदिक संस्कृत', 'हिन्दी', 'English'],
    coverTheme: {
      bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
      accentColor: '#FF9933',
      borderColor: 'border-[#FF9933]',
      emblem: '☀️',
      sacredHeader: '॥ अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ॥',
      spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
    },
    shortSummary: 'संसार का प्राचीनतम ज्ञानकोश जिसमें प्रकृति, देवता, सृष्टि उत्पत्ति और परम सत्य का गायन है।',
    fullOverview: 'ऋग्वेद सनातन धर्म का मूल स्तम्भ है। गायत्री महामंत्र, नासदीय सूक्त (सृष्टि उत्पत्ति), पुरुष सूक्त और महामृत्युंजय मंत्र जैसे सर्वोच्च आध्यात्मिक सूत्र इसी पावन संहिता से उद्भूत हुए हैं।',
    sampleChapterTitle: 'नासदीय सूक्त (मण्डल १०, सूक्त १२९)',
    sampleVerseSanskrit: 'नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् ।\nकिमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥',
    sampleVerseHindi: 'सृष्टि के पूर्व न असत था, न सत था। न अंतरिक्ष था, न उससे परे आकाश था। उस समय कौन किसको आच्छादित कर रहा था? कहाँ किसकी शरण में गहन गंभीर जल था?',
    sampleVerseEnglish: 'Then was not non-existence nor existence; there was no realm of air, no sky beyond it. What covered in, and where? And what gave shelter? Was water there, unfathomed depth of water?',
    readOnlineUrl: '/scriptures/rigveda-samhita',
  },
  {
    id: 'shrimad-bhagavatam',
    titleHi: 'श्रीमद्भागवत महापुराण',
    titleEn: 'Shrimad Bhagavatam',
    category: 'puranas',
    categoryLabel: 'महापुराण',
    author: 'महर्षि वेदव्यास / श्री शुकदेव जी',
    versesCount: '१२ स्कंध • १८,००० श्लोक',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    coverTheme: {
      bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
      accentColor: '#FF9933',
      borderColor: 'border-[#FF9933]',
      emblem: '🪈',
      sacredHeader: '॥ कृष्णाय वासुदेवाय हरये परमात्मने ॥',
      spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
    },
    shortSummary: 'भगवान श्री कृष्ण के दिव्य अवतार, रासलीला, प्रह्लाद, ध्रुव और राजा परीक्षित के उद्धार की परम पावन भागवत कथा।',
    fullOverview: 'श्रीमद्भागवत महापुराण को निगम कल्पतरु का पका हुआ फल कहा गया है। यह भक्ति रस का अमृत सरोवर है। राजा परीक्षित को तक्षक दंश से पूर्व शुकदेव जी द्वारा सात दिनों में सुनाई गई यह अमर कथा जीव को अभय पद प्रदान करती है।',
    sampleChapterTitle: 'प्रथम स्कंध, द्वितीय अध्याय - भक्ति योग',
    sampleVerseSanskrit: 'स वै पुंसां परो धर्मो यतो भक्तिरधोक्षजे ।\nअहैतुकी प्रतिहता ययात्मा सम्प्रसीदति ॥',
    sampleVerseHindi: 'मनुष्यों के लिए वही सर्वश्रेष्ठ परम धर्म है जिससे इंद्रियातीत परमात्मा श्री कृष्ण में अहैतुकी (निःस्वार्थ) और निष्काम भक्ति उत्पन्न हो, जिससे आत्मा परम प्रसन्न होती है।',
    sampleVerseEnglish: 'The supreme occupation for all humanity is that by which men can attain to loving devotional service unto the transcendent Lord. Such devotional service must be unmotivated and uninterrupted to completely satisfy the self.',
    readOnlineUrl: '/scriptures/shrimad-bhagavatam',
  },
  {
    id: 'patanjali-yoga',
    titleHi: 'पतंजलि योगसूत्र',
    titleEn: 'Patanjali Yoga Sutras',
    category: 'darshana',
    categoryLabel: 'दर्शन एवं योग',
    author: 'महर्षि पतंजलि',
    versesCount: '४ पाद • १९६ सूत्र',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    coverTheme: {
      bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
      accentColor: '#FF9933',
      borderColor: 'border-[#FF9933]',
      emblem: '🧘',
      sacredHeader: '॥ अथ योगानुशासनम् ॥',
      spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
    },
    shortSummary: 'यम, नियम, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान और समाधि (अष्टांग योग) का वैज्ञानिक एवं आध्यात्मिक मार्ग।',
    fullOverview: 'महर्षि पतंजलि द्वारा प्रणीत योगसूत्र चित्त की वृत्तियों को शांत कर आत्मा को उसके मूल स्वरूप में प्रतिष्ठित करने का सर्वोच्च मार्गदर्शक ग्रंथ है। यह शारीरिक, मानसिक और आध्यात्मिक स्वास्थ्य का अनुपम विज्ञान प्रस्तुत करता है।',
    sampleChapterTitle: 'समाधि पाद, सूत्र २',
    sampleVerseSanskrit: 'योगश्चित्तवृत्तिनिरोधः ॥\nतदा द्रष्टुः स्वरूपेऽवस्थानम् ॥',
    sampleVerseHindi: 'चित्त की वृत्तियों का पूर्ण निरोध (शांत हो जाना) ही योग है। उस समय द्रष्टा (आत्मा) अपने वास्तविक स्वरूप में स्थित हो जाता है।',
    sampleVerseEnglish: 'Yoga is the stilling of the changing states of the mind. Then the witness abides in its own true nature.',
    readOnlineUrl: '/scriptures/patanjali-yoga',
  },
  {
    id: 'chanakya-niti',
    titleHi: 'चाणक्य नीति',
    titleEn: 'Chanakya Niti',
    category: 'darshana',
    categoryLabel: 'दर्शन एवं नीति',
    author: 'आचार्य चाणक्य (विष्णुगुप्त)',
    versesCount: '१७ अध्याय • ३५०+ श्लोक',
    languages: ['संस्कृत', 'हिन्दी', 'English'],
    coverTheme: {
      bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
      accentColor: '#FF9933',
      borderColor: 'border-[#FF9933]',
      emblem: '📜',
      sacredHeader: '॥ राजनीतिसमुच्चयः ॥',
      spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
    },
    shortSummary: 'आचार्य चाणक्य द्वारा व्यावहारिक जीवन, मित्रता, राजनीति, अर्थ और धर्म सम्बन्धी अमूल्य नीति सूत्र।',
    fullOverview: 'चाणक्य नीति मानव को जीवन के प्रत्येक क्षेत्र में विवेकपूर्ण निर्णय लेने की कला सिखाती है। विद्या, धन, मित्र, परिवार और समाज के प्रति मनुष्य के आचरण के विषय में आचार्य चाणक्य के विचार आज भी शत-प्रतिशत प्रासंगिक हैं।',
    sampleChapterTitle: 'प्रथम अध्याय, सूत्र १',
    sampleVerseSanskrit: 'प्रणम्य शिरसा विष्णुं त्रैलोक्याधिपतिं प्रभुम् ।\nनानाशास्त्रोद्धृतं वक्ष्ये राजनीतिसमुच्चयम् ॥',
    sampleVerseHindi: 'तीनों लोकों के स्वामी भगवान श्री विष्णु को सिर झुकाकर प्रणाम करते हुए, मैं अनेक शास्त्रों से निकाले गए राजनीति और नीति सूत्रों का सार कहता हूँ।',
    sampleVerseEnglish: 'Humbly bowing down before the almighty Lord Vishnu, the Lord of the three worlds, I recite maxims of the science of political ethics selected from various ancient scriptures.',
    readOnlineUrl: '/scriptures/chanakya-niti',
  },
];

/**
 * Realistic 3D Hardcover Book Form Component
 * Displays an authentic Indian spiritual book format with:
 * - Color Code: #FF9933 (Sacred Saffron) for ALL books
 * - 3D Spine & embossed spine ribs
 * - Gold/white foil ornate filigree borders
 * - Sacred emblem & Devanagari typography
 * - Stacked paper edges on the right
 * - Saffron satin ribbon bookmark hanging out
 * - Realistic 3D depth, perspective, and hover animation
 */
function Book3DForm({ book, onOpen }: { book: BookItem; onOpen: () => void }) {
  const coverTheme = book.coverTheme || {
    bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
    accentColor: '#FF9933',
    borderColor: 'border-[#FF9933]',
    emblem: '🕉️',
    sacredHeader: '॥ ॐ श्री परमात्मने नमः ॥',
    spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
  };

  return (
    <div
      onClick={onOpen}
      className="relative group cursor-pointer perspective-[1200px] flex justify-center items-center py-6 select-none"
    >
      {/* Wooden / Pedestal Base Shadow */}
      <div className="absolute bottom-3 w-48 h-4 bg-black/35 rounded-full blur-md transform group-hover:scale-110 group-hover:blur-lg transition-all duration-500 pointer-events-none" />

      {/* Main 3D Book Container - ALL BOOKS USE #FF9933 */}
      <div
        className="relative w-[210px] sm:w-[230px] h-[310px] sm:h-[330px] rounded-r-xl transition-all duration-500 ease-out transform group-hover:scale-105 group-hover:-translate-y-2 group-hover:-rotate-y-6 shadow-[14px_18px_30px_rgba(0,0,0,0.45),2px_4px_8px_rgba(0,0,0,0.2)] flex flex-col justify-between overflow-hidden"
        style={{
          backgroundColor: '#FF9933',
          backgroundImage: 'linear-gradient(135deg, #FF9933 0%, #f58418 50%, #d96e00 100%)',
          boxShadow:
            '16px 20px 32px rgba(0, 0, 0, 0.45), 2px 2px 4px rgba(0, 0, 0, 0.25), inset -2px 0 6px rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Subtle Silk / Leather Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/20 pointer-events-none" />

        {/* 3D Curved Left Spine with Saffron-Gold Leather Ribs */}
        <div className="absolute left-0 top-0 bottom-0 w-8 z-30 bg-gradient-to-r from-[#7a3800] via-[#a84d00] to-[#662f00] pointer-events-none">
          {/* Spine 3D Highlight & Shadow */}
          <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="absolute inset-y-0 left-2 w-[1px] bg-[#FF9933]/60" />
          <div className="absolute inset-y-0 left-3 w-[1px] bg-black/50" />

          {/* Golden Horizontal Embossed Ribs on Spine */}
          <div className="absolute top-10 left-1 right-2 h-[2px] bg-[#FF9933] shadow-sm" />
          <div className="absolute top-11 left-1 right-2 h-[1px] bg-black/60" />

          <div className="absolute top-1/2 left-1 right-2 h-[2px] bg-[#FF9933] shadow-sm" />
          <div className="absolute top-[calc(50%+1px)] left-1 right-2 h-[1px] bg-black/60" />

          <div className="absolute bottom-10 left-1 right-2 h-[2px] bg-[#FF9933] shadow-sm" />
          <div className="absolute bottom-9 left-1 right-2 h-[1px] bg-black/60" />
        </div>

        {/* Right Stacked Pages Edge (Realistic 3D Paper Layers) */}
        <div className="absolute -right-3 top-2.5 bottom-2.5 w-3 bg-gradient-to-r from-[#d1c6b2] via-[#ece5d8] to-[#bfb29c] rounded-r-sm z-0 flex flex-col justify-around py-2 shadow-inner">
          <div className="w-full h-[1px] bg-[#9e9079]/40" />
          <div className="w-full h-[1px] bg-[#9e9079]/30" />
          <div className="w-full h-[1px] bg-[#9e9079]/40" />
          <div className="w-full h-[1px] bg-[#9e9079]/30" />
          <div className="w-full h-[1px] bg-[#9e9079]/40" />
        </div>

        {/* Hanging Satin Bookmark Ribbon in #FF9933 */}
        <div className="absolute -bottom-4 right-7 w-4 h-9 bg-gradient-to-b from-[#b35900] via-[#FF9933] to-[#804000] z-40 shadow-md transform rotate-3">
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-transparent border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black/30" />
        </div>

        {/* PDF Badge if attached */}
        {book.pdfUrl && (
          <div className="absolute top-2.5 right-2.5 z-40 bg-red-600/95 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow flex items-center gap-1 border border-red-400/50">
            <FileText className="w-2.5 h-2.5" />
            <span>PDF</span>
          </div>
        )}

        {/* Ornate Double-Line Border (Front Cover) */}
        <div className="relative z-10 m-2.5 ml-7 p-3 border-2 border-amber-100/90 rounded-r-lg h-[calc(100%-20px)] flex flex-col justify-between bg-black/10 backdrop-blur-[0.5px]">
          
          {/* Inner hairline border */}
          <div className="absolute inset-1 border border-white/50 rounded-r-md pointer-events-none" />

          {/* Corner Flourishes */}
          <span className="absolute top-1.5 left-1.5 text-white text-[9px]">❖</span>
          <span className="absolute top-1.5 right-1.5 text-white text-[9px]">❖</span>
          <span className="absolute bottom-1.5 left-1.5 text-white text-[9px]">❖</span>
          <span className="absolute bottom-1.5 right-1.5 text-white text-[9px]">❖</span>

          {/* Top Header Inscription */}
          <div className="text-center pt-1">
            <span className="text-[10px] font-serif font-bold tracking-widest text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] block">
              {coverTheme.sacredHeader}
            </span>
          </div>

          {/* Center Title & Emblem Area */}
          <div className="text-center my-auto space-y-2">
            {/* Sacred Emblem in Golden Circle */}
            <div className="mx-auto w-12 h-12 rounded-full border-2 border-amber-950/40 bg-white/25 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(255,153,51,0.5)]">
              <span>{coverTheme.emblem}</span>
            </div>

            {/* Book Title in Heavy Embossed Devanagari */}
            <h4
              className="text-lg sm:text-xl font-serif font-bold text-stone-950 tracking-wide leading-snug drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
              style={{
                textShadow: '0 1px 2px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.4)',
              }}
            >
              {book.titleHi}
            </h4>

            {/* English Subtitle */}
            <span className="block text-[10px] font-serif font-bold tracking-wider text-stone-900/90 uppercase">
              {book.titleEn}
            </span>
          </div>

          {/* Bottom Author & Granthakara info */}
          <div className="text-center pb-1 border-t border-amber-950/30 pt-1.5 space-y-0.5">
            <span className="block text-[9px] font-serif text-stone-950 font-bold">
              {book.author}
            </span>
            <span className="block text-[8px] font-serif text-stone-900 font-semibold">
              {book.versesCount}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function SpiritualBooksPage() {
  const { books } = useCMS();
  const allBooks = useMemo<BookItem[]>(() => {
    if (!books || books.length === 0) return BOOKS_DATA;
    return books.map((b) => {
      const existing = BOOKS_DATA.find((item) => item.id === b.id);
      return {
        id: b.id,
        titleHi: b.titleHi,
        titleEn: b.titleEn,
        category: (b.category as any) || 'gita',
        categoryLabel: b.categoryLabel || 'सनातन धर्मग्रंथ',
        author: b.author || 'महर्षि वेदव्यास',
        versesCount: b.versesCount || 'सम्पूर्ण पावन ग्रंथ',
        languages: existing?.languages || ['संस्कृत', 'हिन्दी', 'English'],
        coverTheme: existing?.coverTheme || {
          bgGradient: 'from-[#FF9933] via-[#ff881a] to-[#e67300]',
          accentColor: b.colorCode || '#FF9933',
          borderColor: 'border-[#FF9933]',
          emblem: '🕉️',
          sacredHeader: '॥ ॐ श्री परमात्मने नमः ॥',
          spineGradient: 'from-[#8c4300] via-[#b35600] to-[#733700]',
        },
        shortSummary: b.shortSummary || '',
        fullOverview: b.fullOverview || '',
        sampleChapterTitle: existing?.sampleChapterTitle || 'प्रतिनिधि पावन श्लोक',
        sampleVerseSanskrit: b.sampleVerseSanskrit || '',
        sampleVerseHindi: b.sampleVerseHindi || '',
        sampleVerseEnglish: b.sampleVerseEnglish || '',
        readOnlineUrl: b.readOnlineUrl || `/scriptures/${b.id}`,
        pdfUrl: b.pdfUrl,
        pdfFileName: b.pdfFileName,
        pdfFileSize: b.pdfFileSize,
      };
    });
  }, [books]);

  const { locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewBook, setPreviewBook] = useState<BookItem | null>(null);
  const [modalTab, setModalTab] = useState<'CHAPTERS' | 'SAMPLE'>('CHAPTERS');
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);

  const stopVoice = () => {
    stopVedicVoice();
    setIsVoiceSpeaking(false);
  };

  const handleSpeakVerse = (sanskrit: string, hindi: string) => {
    if (!isVoiceSupported()) return;
    if (isVoiceSpeaking) {
      stopVoice();
      return;
    }
    const cleanText = `${sanskrit}. हिन्दी अनुवाद: ${hindi}`;
    speakVedicVoice(cleanText, {
      rate: 0.85,
      pitch: 1.0,
      onStart: () => setIsVoiceSpeaking(true),
      onEnd: () => setIsVoiceSpeaking(false),
      onError: () => setIsVoiceSpeaking(false),
    });
  };

  const filteredBooks = useMemo(() => {
    return allBooks.filter((b) => {
      const matchesCategory =
        activeCategory === 'all' || b.category === activeCategory;
      const matchesSearch =
        b.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.shortSummary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allBooks, activeCategory, searchQuery]);

  const categories = useMemo(() => [
    { id: 'all', label: locale === 'en' ? 'All Books' : locale === 'sa' ? 'सर्वे ग्रन्थाः' : 'सभी ग्रंथ (All Books)' },
    { id: 'gita', label: locale === 'en' ? 'Bhagavad Gita' : locale === 'sa' ? 'श्रीमद्भगवद्गीता' : 'श्रीमद्भगवद्गीता' },
    { id: 'itihasa', label: locale === 'en' ? 'Itihasa (Epics)' : locale === 'sa' ? 'इतिहासः' : 'रामायण व महाभारत' },
    { id: 'upanishads', label: locale === 'en' ? 'Upanishads' : locale === 'sa' ? 'उपनिषदः' : 'उपनिषद (Upanishads)' },
    { id: 'vedas', label: locale === 'en' ? 'Four Vedas' : locale === 'sa' ? 'चत्वारः वेदाः' : 'चार वेद (Vedas)' },
    { id: 'puranas', label: locale === 'en' ? 'Maha Puranas' : locale === 'sa' ? 'महापुराणानि' : 'महापुराण (Puranas)' },
    { id: 'darshana', label: locale === 'en' ? 'Philosophy' : locale === 'sa' ? 'दर्शनम्' : 'दर्शन व नीति (Philosophy)' },
  ], [locale]);

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#121216] text-[#1c1917] dark:text-stone-100 font-sans pb-24">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#24130b] via-[#331b0f] to-[#1a0e08] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-600/40">
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-amber-500/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>॥ स्वाध्यायान्मा प्रमदः — स्वाध्याय में प्रमाद न करें ॥</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-wide text-amber-100">
            सनातन ग्रंथालय • Spiritual Books
          </h1>

          <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base font-serif leading-relaxed">
            वेद, उपनिषद, श्रीमद्भगवद्गीता, रामायण, पुराण एवं नीति ग्रंथों का संपूर्ण डिजिटल पुस्तकालय। भौतिक ग्रंथ रूप में सजे पावन शास्त्र।
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-7 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ग्रंथ का नाम, रचयिता अथवा विषय खोजें..."
              className="w-full bg-black/40 border border-amber-500/40 text-white rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 backdrop-blur-md placeholder:text-stone-400"
            />
          </div>
        </div>
      </div>

      {/* Main Container */}
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

        {/* Books Grid - ALL BOOKS ARE IN 3D BOOK FORMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-[#1a1411] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              
              {/* TOP: 3D REALISTIC HARDCOVER BOOK DISPLAY */}
              <div className="bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100/60 dark:from-[#211611] dark:via-[#19100c] dark:to-[#211611] pt-6 pb-2 border-b border-stone-200 dark:border-stone-800/80">
                <Book3DForm book={book} onOpen={() => setPreviewBook(book)} />
                <div className="text-center pb-2">
                  <span className="text-[11px] font-serif text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition flex items-center justify-center space-x-1 cursor-pointer" onClick={() => setPreviewBook(book)}>
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>स्पर्श करके ग्रंथ खोलें (Click to Open Book)</span>
                  </span>
                </div>
              </div>

              {/* BOTTOM: BOOK METADATA & ACTIONS */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                
                <div className="space-y-3">
                  {/* Badge Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-serif">
                      {book.categoryLabel}
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-serif font-semibold">
                      {book.versesCount}
                    </span>
                  </div>

                  {/* Title and Author */}
                  <div>
                    <h3
                      onClick={() => setPreviewBook(book)}
                      className="font-serif font-bold text-xl text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition cursor-pointer"
                    >
                      {book.titleHi}
                    </h3>
                    <span className="text-xs text-stone-500 font-serif block mt-0.5">
                      रचयिता: <strong className="text-stone-700 dark:text-stone-300">{book.author}</strong>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif leading-relaxed line-clamp-2">
                    {book.shortSummary}
                  </p>

                  {/* Languages Available */}
                  <div className="flex items-center space-x-1.5 pt-1">
                    <span className="text-[10px] text-stone-400 font-semibold uppercase">भाषा:</span>
                    {book.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-serif bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-md"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2">
                  <Link
                    href={book.readOnlineUrl || `/scriptures/${book.id}`}
                    className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs font-serif shadow-md transition transform hover:-translate-y-0.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>सम्पूर्ण ग्रंथ पढ़ें</span>
                  </Link>

                  <button
                    onClick={() => setPreviewBook(book)}
                    className="inline-flex items-center space-x-1 text-xs font-serif text-stone-600 dark:text-stone-400 hover:text-amber-600 py-2 px-3 rounded-xl border border-stone-200 dark:border-stone-700 transition"
                  >
                    <span>झलक (Preview)</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="p-12 text-center bg-white dark:bg-[#1a1411] rounded-3xl border border-stone-200 dark:border-stone-800 mt-6">
            <p className="font-serif text-stone-500 text-base">कोई ग्रंथ नहीं मिला। कृपया दूसरा शब्द खोजें।</p>
          </div>
        )}

      </div>

      {/* Reader / Sample Chapter Modal Preview */}
      {previewBook && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a1411] rounded-3xl border border-amber-500/40 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in duration-200 relative">
            
            <button
              onClick={() => {
                stopVoice();
                setPreviewBook(null);
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div
                className="w-16 h-22 rounded-r-md border border-amber-300 p-1.5 flex flex-col justify-between shrink-0 shadow-md"
                style={{
                  backgroundColor: '#FF9933',
                  backgroundImage: 'linear-gradient(135deg, #FF9933 0%, #e67300 100%)',
                }}
              >
                <span className="text-[7px] text-amber-300 text-center block">
                  {previewBook.coverTheme?.sacredHeader || '॥ ॐ श्री परमात्मने नमः ॥'}
                </span>
                <span className="text-center text-lg">{previewBook.coverTheme?.emblem || '🕉️'}</span>
                <span className="text-[8px] text-amber-100 font-serif font-bold text-center block leading-tight">
                  {previewBook.titleHi}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-serif">
                  {previewBook.categoryLabel}
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">
                  {previewBook.titleHi}
                </h2>
                <span className="text-xs text-stone-500 font-serif block">
                  रचयिता: {previewBook.author} • {previewBook.versesCount}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-serif leading-relaxed">
              {previewBook.fullOverview}
            </p>

            {(() => {
              const scriptureData =
                SCRIPTURES_STATIC_DATA[previewBook.id] ||
                (previewBook.readOnlineUrl
                  ? SCRIPTURES_STATIC_DATA[
                      previewBook.readOnlineUrl.replace('/scriptures/', '')
                    ]
                  : null);
              const chaptersCount = scriptureData?.chapters?.length || 0;
              const totalVerses = scriptureData?.totalVerses || 0;

              return (
                <>
                  {/* Modal Tabs */}
                  <div className="flex items-center space-x-2 border-b border-stone-200 dark:border-stone-800 pb-2">
                    <button
                      onClick={() => setModalTab('CHAPTERS')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition flex items-center space-x-1.5 ${
                        modalTab === 'CHAPTERS'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>सम्पूर्ण विषय-सूची ({chaptersCount} अध्याय/काण्ड)</span>
                    </button>
                    <button
                      onClick={() => setModalTab('SAMPLE')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition flex items-center space-x-1.5 ${
                        modalTab === 'SAMPLE'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>प्रतिनिधि पावन श्लोक</span>
                    </button>
                  </div>

                  {/* Tab 1: Full Chapters List */}
                  {modalTab === 'CHAPTERS' && (
                    <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                      {scriptureData?.chapters && scriptureData.chapters.length > 0 ? (
                        scriptureData.chapters.map((ch: any) => (
                          <div
                            key={ch.id}
                            className="p-3.5 rounded-2xl bg-[#faf6ee] dark:bg-[#20150d] border border-amber-300/60 dark:border-amber-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-500 transition"
                          >
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 dark:text-amber-300">
                                  अध्याय {ch.chapterNumber}
                                </span>
                                <span className="text-xs font-serif font-bold text-stone-900 dark:text-white">
                                  {ch.titleHi || ch.titleEn}
                                </span>
                              </div>
                              <p className="text-[11px] font-serif text-stone-600 dark:text-stone-400 line-clamp-2">
                                {ch.summaryHi || ch.summaryEn}
                              </p>
                            </div>
                            <Link
                              href={`/scriptures/${scriptureData.slug || previewBook.id}?chapter=${ch.chapterNumber}`}
                              className="inline-flex items-center space-x-1 bg-amber-600 hover:bg-amber-500 text-white text-xs font-serif font-bold px-3 py-1.5 rounded-xl shadow-sm shrink-0 self-start sm:self-center transition"
                            >
                              <span>अध्याय पढ़ें ({ch.verses?.length || 0} श्लोक)</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs font-serif text-stone-500">
                          सम्पूर्ण ग्रंथ का पाठ ऑनलाइन उपलब्ध है।
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 2: Sample Verse Preview */}
                  {modalTab === 'SAMPLE' && (
                    <div className="bg-[#faf6ee] dark:bg-[#23170e] border border-amber-300 dark:border-amber-900/60 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 font-serif block">
                          📖 {previewBook.sampleChapterTitle}
                        </span>
                        <button
                          onClick={() => handleSpeakVerse(previewBook.sampleVerseSanskrit, previewBook.sampleVerseHindi)}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-600/15 text-amber-900 dark:text-amber-300 text-xs font-serif font-bold hover:bg-amber-600/25 transition"
                          title="श्लोक स्वर पाठ सुनें"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isVoiceSpeaking ? 'स्वर रोकें' : 'स्वर पाठ'}</span>
                        </button>
                      </div>

                      <blockquote className="text-base sm:text-lg font-serif font-bold text-amber-950 dark:text-amber-100 whitespace-pre-line leading-relaxed">
                        {previewBook.sampleVerseSanskrit}
                      </blockquote>

                      <div className="border-t border-amber-200 dark:border-amber-900/50 pt-2 space-y-2 text-xs sm:text-sm font-serif">
                        <p className="text-stone-800 dark:text-stone-200 leading-relaxed">
                          <strong className="text-amber-800 dark:text-amber-300">हिन्दी अनुवाद: </strong>
                          {previewBook.sampleVerseHindi}
                        </p>
                        <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                          <strong className="text-stone-700 dark:text-stone-300">English: </strong>
                          {previewBook.sampleVerseEnglish}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200 dark:border-stone-800">
                    <div className="text-xs font-serif text-stone-500">
                      {chaptersCount > 0
                        ? `सम्पूर्ण ${chaptersCount} अध्याय • ${totalVerses} पावन श्लोक`
                        : previewBook.versesCount}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {previewBook.pdfUrl && (
                        <a
                          href={previewBook.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={previewBook.pdfFileName || `${previewBook.titleEn || 'scripture'}.pdf`}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold font-serif shadow-md transition inline-flex items-center space-x-1.5"
                        >
                          <FileText className="w-4 h-4" />
                          <span>
                            {locale === 'en'
                              ? 'Download PDF'
                              : locale === 'sa'
                              ? 'PDF डाउनलोडं कुर्वन्तु'
                              : 'PDF डाउनलोड करें'}
                            {previewBook.pdfFileSize ? ` (${previewBook.pdfFileSize})` : ''}
                          </span>
                        </a>
                      )}
                      <Link
                        href={previewBook.readOnlineUrl || `/scriptures/${previewBook.id}`}
                        className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold font-serif shadow-md transition inline-flex items-center space-x-1.5"
                      >
                        <span>
                          {locale === 'en'
                            ? 'Read Complete Book'
                            : locale === 'sa'
                            ? 'सम्पूर्णग्रन्थं पठ्यताम्'
                            : 'सम्पूर्ण ग्रंथ ऑनलाइन पढ़ें'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </>
              );
            })()}

          </div>
        </div>
      )}

      {/* Schema.org Book & ItemList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'सनातन डिजिटल पुस्तकालय - SanatanRoop Sacred Spiritual Books Library',
            description:
              'वेद, उपनिषद, श्रीमद्भगवद्गीता, रामायण, पुराण एवं दर्शन के प्रामाणिक डिजिटल ग्रन्थ सम्पूर्ण अर्थ एवं व्याख्या सहित।',
            url: 'https://sanatanroop.com/books',
            itemListElement: allBooks.map((book, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              item: {
                '@type': 'Book',
                name: book.titleHi,
                alternateName: book.titleEn,
                author: {
                  '@type': 'Person',
                  name: book.author,
                },
                description: book.shortSummary,
                inLanguage: ['hi', 'sa', 'en'],
                genre: book.categoryLabel,
                url: `https://sanatanroop.com${book.readOnlineUrl || '/books'}`,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'मुख्य पृष्ठ (Home)',
                item: 'https://sanatanroop.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'डिजिटल ग्रन्थालय (Spiritual Books)',
                item: 'https://sanatanroop.com/books',
              },
            ],
          }),
        }}
      />
    </div>
  );
}
