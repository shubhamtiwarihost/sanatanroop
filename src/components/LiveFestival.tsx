'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAudio } from '@/context/AudioContext';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Flame,
  Sparkles,
  Play,
  Pause,
  Clock,
  Share2,
  ChevronRight,
  BookOpen,
  Music,
} from 'lucide-react';

interface FestivalData {
  id: string;
  nameHi: string;
  nameEn: string;
  nameSa?: string;
  taglineHi: string;
  taglineEn: string;
  taglineSa?: string;
  tithiHi: string;
  tithiEn: string;
  tithiSa?: string;
  bannerImage: string;
  deityHi: string;
  deityEn: string;
  deitySa?: string;
  deityRoleHi: string;
  deityRoleEn: string;
  deityRoleSa?: string;
  shubhMuhurat: {
    titleHi: string;
    titleEn: string;
    titleSa?: string;
    timeHi: string;
    timeEn: string;
    timeSa?: string;
    noteHi: string;
    noteEn: string;
    noteSa?: string;
  }[];
  primaryMantra: {
    sanskrit: string;
    transliteration: string;
    meaningHi: string;
    meaningEn: string;
    meaningSa?: string;
  };
  todaysColor: {
    nameHi: string;
    nameEn: string;
    nameSa?: string;
    hex: string;
  };
  todaysPrasadHi: string;
  todaysPrasadEn: string;
  todaysPrasadSa?: string;
  audioTrack: {
    id: string;
    titleHi: string;
    titleEn: string;
    audioUrl: string;
    subtitleHi: string;
    subtitleEn: string;
  };
}

const DEFAULT_FESTIVAL: FestivalData = {
  id: 'navratri-live',
  nameHi: 'शारदीय नवरात्रि महापर्व',
  nameEn: 'Shardiya Navratri Mahotsav',
  nameSa: 'शारदीयनवरात्रमहापर्व',
  taglineHi: 'माँ जगदम्बा की असीम कृपा, शक्ति और भक्ति का पावन उत्सव',
  taglineEn: 'Sacred celebration of divine grace, supreme strength, and devotion of Maa Jagadamba',
  taglineSa: 'जगदम्बायाः असीमकृपायाः शक्तेः भक्तेश्च पावनोत्सवः',
  tithiHi: 'आश्विन शुक्ल प्रतिपदा • प्रथम नवरात्र',
  tithiEn: 'Ashwin Shukla Pratipada • Day 1 of Navratri',
  tithiSa: 'आश्विनशुक्लप्रतिपदा • प्रथमं नवरात्रम्',
  bannerImage: '/images/hero_shiva.jpg',
  deityHi: 'माँ शैलपुत्री (Maa Shailaputri)',
  deityEn: 'Maa Shailaputri',
  deitySa: 'माता शैलपुत्री',
  deityRoleHi: 'हिमालय पुत्री, नवदुर्गा का प्रथम स्वरूप • शक्ति एवं स्थिरता की अधिष्ठात्री',
  deityRoleEn: 'Daughter of the Himalayas, first form of Navadurga • Presiding deity of strength & stability',
  deityRoleSa: 'हिमालयपुत्री, नवदुर्गायाः प्रथमं स्वरूपम् • शक्तिस्थैर्ययोरधिष्ठात्री',
  shubhMuhurat: [
    {
      titleHi: 'घटस्थापना शुभ मुहूर्त',
      titleEn: 'Ghatasthapana Auspicious Time',
      titleSa: 'घटस्थापनाशुभमुहूर्तः',
      timeHi: 'प्रातः 06:15 AM - 10:18 AM',
      timeEn: 'Morning 06:15 AM - 10:18 AM',
      timeSa: 'प्रातः 06:15 AM - 10:18 AM',
      noteHi: 'अभिजीत मुहूर्त: 11:48 AM - 12:36 PM',
      noteEn: 'Abhijit Muhurat: 11:48 AM - 12:36 PM',
      noteSa: 'अभिजित् मुहूर्तः: 11:48 AM - 12:36 PM',
    },
    {
      titleHi: 'मध्याह्न पूजा काल',
      titleEn: 'Midday Puja Time',
      titleSa: 'मध्याह्नपूजाकालः',
      timeHi: 'दोपहर 12:05 PM - 02:45 PM',
      timeEn: 'Afternoon 12:05 PM - 02:45 PM',
      timeSa: 'मध्याह्ने 12:05 PM - 02:45 PM',
      noteHi: 'सर्वार्थ सिद्धि योग सहित',
      noteEn: 'With Sarvartha Siddhi Yoga',
      noteSa: 'सर्वार्थसिद्धियोगसहितम्',
    },
    {
      titleHi: 'महा संध्या आरती',
      titleEn: 'Maha Sandhya Aarti',
      titleSa: 'महासन्ध्यारार्तिकम्',
      timeHi: 'सायं 06:45 PM - 07:30 PM',
      timeEn: 'Evening 06:45 PM - 07:30 PM',
      timeSa: 'सायं 06:45 PM - 07:30 PM',
      noteHi: 'दीपदान एवं पुष्पवृष्टि काल',
      noteEn: 'Diya & Flower Offering Period',
      noteSa: 'दीपदानं पुष्पवृष्टिकालश्च',
    },
  ],
  primaryMantra: {
    sanskrit: 'वन्दे वाञ्छितलाभाय चन्द्रार्धकृतशेखराम् ।\nवृषारूढां शूलधरां शैलपुत्रीं यशस्विनीम् ॥',
    transliteration: 'vande vāñchitalābhāya candrārdhakṛtaśekharām |\nvṛṣārūḍhāṁ śūladharāṁ śailaputrīṁ yaśasvinīm ||',
    meaningHi: 'मनोवांछित फल की प्राप्ति के लिए, मस्तक पर अर्धचंद्र धारण करने वाली, वृषभ पर सवार और त्रिशूल धारण करने वाली परम तेजस्वी माँ शैलपुत्री की हम वंदना करते हैं।',
    meaningEn: 'To attain all righteous desires, we worship the illustrious Goddess Shailaputri, who rides a sacred bull, holds a trident, and is adorned with the crescent moon on Her forehead.',
    meaningSa: 'मनोवाञ्छितफलप्राप्तये, भालदेशे चन्द्रार्धधारिणीं, वृषभारूढां त्रिशूलहस्तां यशस्विनीं भगवतीं शैलपुत्रीं वन्दे।',
  },
  todaysColor: {
    nameHi: 'पीला (Royal Yellow - ज्ञान व तेज)',
    nameEn: 'Royal Yellow (Wisdom & Radiance)',
    nameSa: 'पीतः (ज्ञानं तेजश्च)',
    hex: '#f59e0b',
  },
  todaysPrasadHi: 'शुद्ध देशी गाय का घी, पंचामृत एवं श्वेत मिष्ठान',
  todaysPrasadEn: 'Pure Cow Desi Ghee, Panchamrit & White Sweets',
  todaysPrasadSa: 'शुद्धगोघृतम्, पञ्चामृतं श्वेतमिष्टान्नं च',
  audioTrack: {
    id: 'aarti-durga',
    titleHi: 'श्री अम्बे जी की आरती (Jai Ambe Gauri)',
    titleEn: 'Shri Ambe Ji Ki Aarti (Jai Ambe Gauri)',
    audioUrl: '/audio/om_namah_shivaya.wav',
    subtitleHi: 'नवरात्रि पावन संकीर्तन',
    subtitleEn: 'Navratri Special Devotional Chanting',
  },
};

export default function LiveFestival() {
  const { locale } = useLanguage();
  const { isPlaying, currentTrack, playAudio, pauseAudio } = useAudio();
  const [diyaCount, setDiyaCount] = useState(14850);
  const [isDiyaLit, setIsDiyaLit] = useState(false);
  const [flowerCount, setFlowerCount] = useState(8920);
  const [isFlowerOffered, setIsFlowerOffered] = useState(false);
  const [copiedMantra, setCopiedMantra] = useState(false);
  const [adminConfig, setAdminConfig] = useState<any>(null);

  // Initialize from session and load admin festival overrides
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDiya = localStorage.getItem('sanatan_diya_lit');
      if (savedDiya === 'true') {
        setIsDiyaLit(true);
      }

      const loadAdminConfig = () => {
        const saved = localStorage.getItem('sanatan_live_festival');
        if (saved) {
          try {
            setAdminConfig(JSON.parse(saved));
          } catch (e) {}
        }
      };

      loadAdminConfig();
      window.addEventListener('sanatan_live_festival_updated', loadAdminConfig);
      return () => {
        window.removeEventListener('sanatan_live_festival_updated', loadAdminConfig);
      };
    }
  }, []);

  // If disabled by admin, don't render
  if (adminConfig && adminConfig.enabled === false) {
    return null;
  }

  const handleLightDiya = () => {
    if (!isDiyaLit) {
      setIsDiyaLit(true);
      setDiyaCount((prev) => prev + 1);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sanatan_diya_lit', 'true');
      }
    }
  };

  const handleOfferFlowers = () => {
    setIsFlowerOffered(true);
    setFlowerCount((prev) => prev + 1);
    setTimeout(() => {
      setIsFlowerOffered(false);
    }, 2500);
  };

  const audioTrackPayload = {
    id: DEFAULT_FESTIVAL.audioTrack.id,
    title: locale === 'en' ? DEFAULT_FESTIVAL.audioTrack.titleEn : DEFAULT_FESTIVAL.audioTrack.titleHi,
    audioUrl: DEFAULT_FESTIVAL.audioTrack.audioUrl,
    subtitle: locale === 'en' ? DEFAULT_FESTIVAL.audioTrack.subtitleEn : DEFAULT_FESTIVAL.audioTrack.subtitleHi,
  };

  const handleToggleAudio = () => {
    if (isPlaying && currentTrack?.id === DEFAULT_FESTIVAL.audioTrack.id) {
      pauseAudio();
    } else {
      playAudio(audioTrackPayload);
    }
  };

  // Localized getters
  const getFestivalName = () => {
    if (adminConfig?.nameHi && locale === 'hi') return adminConfig.nameHi;
    if (adminConfig?.nameEn && locale === 'en') return adminConfig.nameEn;
    if (locale === 'en') return DEFAULT_FESTIVAL.nameEn;
    if (locale === 'sa') return DEFAULT_FESTIVAL.nameSa || DEFAULT_FESTIVAL.nameHi;
    return DEFAULT_FESTIVAL.nameHi;
  };

  const getTagline = () => {
    if (adminConfig?.tagline && locale === 'hi') return adminConfig.tagline;
    if (locale === 'en') return DEFAULT_FESTIVAL.taglineEn;
    if (locale === 'sa') return DEFAULT_FESTIVAL.taglineSa || DEFAULT_FESTIVAL.taglineHi;
    return DEFAULT_FESTIVAL.taglineHi;
  };

  const getTithi = () => {
    if (adminConfig?.tithi && locale === 'hi') return adminConfig.tithi;
    if (locale === 'en') return DEFAULT_FESTIVAL.tithiEn;
    if (locale === 'sa') return DEFAULT_FESTIVAL.tithiSa || DEFAULT_FESTIVAL.tithiHi;
    return DEFAULT_FESTIVAL.tithiHi;
  };

  const getDeity = () => {
    if (adminConfig?.deity && locale === 'hi') return adminConfig.deity;
    if (locale === 'en') return DEFAULT_FESTIVAL.deityEn;
    if (locale === 'sa') return DEFAULT_FESTIVAL.deitySa || DEFAULT_FESTIVAL.deityHi;
    return DEFAULT_FESTIVAL.deityHi;
  };

  const getDeityRole = () => {
    if (adminConfig?.deityRole && locale === 'hi') return adminConfig.deityRole;
    if (locale === 'en') return DEFAULT_FESTIVAL.deityRoleEn;
    if (locale === 'sa') return DEFAULT_FESTIVAL.deityRoleSa || DEFAULT_FESTIVAL.deityRoleHi;
    return DEFAULT_FESTIVAL.deityRoleHi;
  };

  const getMantraMeaning = () => {
    if (adminConfig?.primaryMantraMeaning && locale === 'hi') return adminConfig.primaryMantraMeaning;
    if (locale === 'en') return DEFAULT_FESTIVAL.primaryMantra.meaningEn;
    if (locale === 'sa') return DEFAULT_FESTIVAL.primaryMantra.meaningSa || DEFAULT_FESTIVAL.primaryMantra.meaningHi;
    return DEFAULT_FESTIVAL.primaryMantra.meaningHi;
  };

  const getColorName = () => {
    if (adminConfig?.todaysColor && locale === 'hi') return adminConfig.todaysColor;
    if (locale === 'en') return DEFAULT_FESTIVAL.todaysColor.nameEn;
    if (locale === 'sa') return DEFAULT_FESTIVAL.todaysColor.nameSa || DEFAULT_FESTIVAL.todaysColor.nameHi;
    return DEFAULT_FESTIVAL.todaysColor.nameHi;
  };

  const getPrasadName = () => {
    if (adminConfig?.todaysPrasad && locale === 'hi') return adminConfig.todaysPrasad;
    if (locale === 'en') return DEFAULT_FESTIVAL.todaysPrasadEn;
    if (locale === 'sa') return DEFAULT_FESTIVAL.todaysPrasadSa || DEFAULT_FESTIVAL.todaysPrasadHi;
    return DEFAULT_FESTIVAL.todaysPrasadHi;
  };

  const copyMantra = () => {
    navigator.clipboard.writeText(
      `${DEFAULT_FESTIVAL.primaryMantra.sanskrit}\n\n${getMantraMeaning()}`
    );
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 3000);
  };

  const isCurrentAudioPlaying = isPlaying && currentTrack?.id === DEFAULT_FESTIVAL.audioTrack.id;

  // Localized UI strings
  const L = {
    topLiveBanner:
      locale === 'en'
        ? 'LIVE SACRED FESTIVAL • TODAY\'S CELEBRATION'
        : locale === 'sa'
        ? 'प्रत्यक्षं पावनमहापर्व • अद्यतनमहोत्सवः'
        : 'लाइव पावन महापर्व • आज का विशेष उत्सव',
    mantraTitle:
      locale === 'en'
        ? '॥ Today\'s Sacred Dhyana Mantra ॥'
        : locale === 'sa'
        ? '॥ अद्यतनं विशेषध्यानमन्त्रम् ॥'
        : '॥ आज का विशेष ध्यान मंत्र ॥',
    shareCopy:
      locale === 'en' ? 'Share / Copy' : locale === 'sa' ? 'प्रतिलिपिः' : 'शेयर / कॉपी',
    copied:
      locale === 'en' ? 'Copied ✓' : locale === 'sa' ? 'प्रतिलिपितम् ✓' : 'कॉपी हो गया ✓',
    meaningLabel:
      locale === 'en' ? 'Meaning: ' : locale === 'sa' ? 'भावार्थः ' : 'भावार्थ: ',
    colorLabel:
      locale === 'en'
        ? 'Auspicious Color Today'
        : locale === 'sa'
        ? 'अद्यतनपावनवर्णः'
        : 'आज का पावन रंग',
    prasadLabel:
      locale === 'en'
        ? 'Sacred Prasad / Offering'
        : locale === 'sa'
        ? 'अद्यतनपावनभोगः'
        : 'आज का पावन भोग/प्रसाद',
    btnAartis:
      locale === 'en'
        ? 'Aarti Sangrah'
        : locale === 'sa'
        ? 'आरतीसङ्ग्रहः (Aartis)'
        : 'आरती संग्रह (Aartis)',
    btnKathas:
      locale === 'en'
        ? 'Read Festival Kathas'
        : locale === 'sa'
        ? 'पर्वकथा पठ्यताम् (Kathas)'
        : 'पर्व कथा पढ़ें (Kathas)',
    btnBooks:
      locale === 'en'
        ? 'Spiritual Books'
        : locale === 'sa'
        ? 'धर्मग्रन्थपुस्तकालयः (Books)'
        : 'धर्मग्रंथ पुस्तकालय (Books)',
    virtualDiyaHeader:
      locale === 'en'
        ? 'Virtual Diya & Flower Offering'
        : locale === 'sa'
        ? 'डिजिटल दीपदानं पुष्पाञ्जलिश्च'
        : 'डिजिटल दीपदान एवं पुष्पांजलि',
    diyaPrompt:
      locale === 'en'
        ? '👆 Tap to light today\'s sacred diya'
        : locale === 'sa'
        ? '👆 स्पृष्ट्वा अद्यतनपावनदीपं प्रज्वालयतु'
        : '👆 स्पर्श करके आज का पावन दीप प्रज्वलित करें',
    diyaLitText:
      locale === 'en'
        ? '✨ Your sacred diya is lit!'
        : locale === 'sa'
        ? '✨ भवतः पावनदीपः प्रज्वलितः!'
        : '✨ आपका पावन दीप प्रज्वलित है!',
    devoteesCountPrefix:
      locale === 'en'
        ? ''
        : locale === 'sa'
        ? 'अद्य आहत्य '
        : 'आज कुल ',
    devoteesCountSuffix:
      locale === 'en'
        ? ' devotees lit a diya today'
        : locale === 'sa'
        ? ' भक्तैः दीपः प्रज्वलितः'
        : ' श्रद्धालुओं ने दीप जलाया',
    diyaBtnLit:
      locale === 'en' ? 'Diya Lit ✓' : locale === 'sa' ? 'दीपः प्रज्वलितः ✓' : 'दीप जल चुका ✓',
    diyaBtnUnlit:
      locale === 'en' ? 'Light Diya' : locale === 'sa' ? 'दीपं प्रज्वालयतु' : 'दीप जलाएं',
    flowersBtn:
      locale === 'en' ? 'Offer Flowers' : locale === 'sa' ? 'पुष्पं समर्पयतु' : 'पुष्प अर्पित करें',
    shubhMuhuratHeader:
      locale === 'en'
        ? 'Auspicious Timings Today (Shubh Muhurat)'
        : locale === 'sa'
        ? 'अद्यतनपावनशुभमुहूर्ताः (Shubh Muhurat)'
        : 'आज के पावन शुभ मुहूर्त (Shubh Muhurat)',
  };

  const muhurats = DEFAULT_FESTIVAL.shubhMuhurat.map((m, idx) => {
    if (adminConfig?.shubhMuhurats?.[idx]) {
      const adminM = adminConfig.shubhMuhurats[idx];
      return {
        title: adminM.title,
        time: adminM.time,
        note: adminM.note,
      };
    }
    return {
      title: locale === 'en' ? m.titleEn : locale === 'sa' ? m.titleSa || m.titleHi : m.titleHi,
      time: locale === 'en' ? m.timeEn : locale === 'sa' ? m.timeSa || m.timeHi : m.timeHi,
      note: locale === 'en' ? m.noteEn : locale === 'sa' ? m.noteSa || m.noteHi : m.noteHi,
    };
  });

  return (
    <section className="relative overflow-hidden my-8 sm:my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card Container */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2a1308] via-[#1c0c05] to-[#120703] border-2 border-amber-600/40 shadow-2xl">
          {/* Subtle Golden Glow / Shimmer Background Aura */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar: LIVE BADGE + TITHI */}
          <div className="bg-gradient-to-r from-red-900/80 via-amber-900/60 to-red-900/80 border-b border-amber-500/30 px-5 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              {/* Pulsing Live indicator */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 font-serif">
                {L.topLiveBanner}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-xs font-serif text-amber-200/90">
              <span className="flex items-center space-x-1 bg-black/40 px-3 py-1 rounded-full border border-amber-500/20">
                <Clock className="w-3.5 h-3.5 text-amber-400 mr-1" />
                <span>{getTithi()}</span>
              </span>
            </div>
          </div>

          {/* Body Content Grid */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Festival Info & Mantra (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-2 bg-amber-500/15 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/30 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{getDeity()}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-wide leading-tight">
                    {getFestivalName()}
                  </h2>
                  <p className="text-amber-200/90 font-serif text-base sm:text-lg mt-1 font-medium">
                    {getTagline()}
                  </p>
                  <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    {getDeityRole()}
                  </p>
                </div>

                {/* Primary Sacred Mantra Box */}
                <div className="bg-black/50 border border-amber-500/40 rounded-2xl p-5 sm:p-6 backdrop-blur-sm relative group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-serif">
                      {L.mantraTitle}
                    </span>
                    <button
                      onClick={copyMantra}
                      className="text-stone-400 hover:text-amber-300 transition text-xs flex items-center space-x-1 bg-stone-800/80 hover:bg-stone-700/80 px-2.5 py-1 rounded-md"
                      title={L.shareCopy}
                    >
                      <Share2 className="w-3 h-3" />
                      <span>{copiedMantra ? L.copied : L.shareCopy}</span>
                    </button>
                  </div>

                  <blockquote className="text-lg sm:text-xl font-serif font-bold text-amber-100 leading-relaxed whitespace-pre-line drop-shadow">
                    {adminConfig?.primaryMantraSanskrit || DEFAULT_FESTIVAL.primaryMantra.sanskrit}
                  </blockquote>

                  <p className="text-xs text-amber-200/80 italic font-serif mt-2">
                    {DEFAULT_FESTIVAL.primaryMantra.transliteration}
                  </p>

                  <div className="mt-3 pt-3 border-t border-amber-900/50 text-xs text-stone-300 font-serif">
                    <strong className="text-amber-300">{L.meaningLabel}</strong>
                    {getMantraMeaning()}
                  </div>
                </div>

                {/* Quick Details Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#24140b] border border-amber-900/60 rounded-xl p-3 flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                      <span className="text-base">🎨</span>
                    </div>
                    <div>
                      <span className="block text-stone-400 text-[10px] font-medium">{L.colorLabel}</span>
                      <span className="font-bold text-amber-200">{getColorName()}</span>
                    </div>
                  </div>

                  <div className="bg-[#24140b] border border-amber-900/60 rounded-xl p-3 flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                      <span className="text-base">🍯</span>
                    </div>
                    <div>
                      <span className="block text-stone-400 text-[10px] font-medium">{L.prasadLabel}</span>
                      <span className="font-bold text-amber-200 truncate block">{getPrasadName()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Links Row */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/aartis"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-600/20 transition transform hover:-translate-y-0.5"
                  >
                    <Music className="w-4 h-4" />
                    <span>{L.btnAartis}</span>
                  </Link>

                  <Link
                    href="/kathas"
                    className="inline-flex items-center space-x-2 bg-stone-900/90 hover:bg-stone-800 text-amber-200 border border-amber-500/40 font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition transform hover:-translate-y-0.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{L.btnKathas}</span>
                  </Link>

                  <Link
                    href="/books"
                    className="inline-flex items-center space-x-2 bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition hover:text-amber-300"
                  >
                    <span>{L.btnBooks}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Interactive Devotion & Muhurat (5 Cols) */}
              <div className="lg:col-span-5 space-y-5">
                {/* Interactive Virtual Puja & Diya Lighting Card */}
                <div className="bg-gradient-to-b from-[#351a0d] to-[#200f07] border-2 border-amber-500/50 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden text-center">
                  <div className="inline-flex items-center space-x-1.5 text-xs text-amber-300 font-serif font-bold uppercase tracking-wider mb-2">
                    <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                    <span>{L.virtualDiyaHeader}</span>
                  </div>

                  {/* Animated Diya Display */}
                  <div className="relative my-4 flex flex-col items-center justify-center">
                    <div
                      onClick={handleLightDiya}
                      className={`cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 relative w-24 h-24 rounded-full flex items-center justify-center ${
                        isDiyaLit
                          ? 'bg-gradient-to-t from-orange-600 via-amber-500 to-yellow-300 shadow-[0_0_45px_rgba(245,158,11,0.8)]'
                          : 'bg-stone-800 border-2 border-amber-600/40'
                      }`}
                    >
                      <span className="text-4xl select-none filter drop-shadow">
                        🪔
                      </span>
                      {isDiyaLit && (
                        <div className="absolute -top-3 animate-bounce">
                          <Sparkles className="w-6 h-6 text-yellow-200 fill-yellow-200" />
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-amber-200 font-serif mt-3 font-semibold">
                      {isDiyaLit ? L.diyaLitText : L.diyaPrompt}
                    </p>
                    <span className="text-[11px] text-stone-400 mt-0.5">
                      {L.devoteesCountPrefix}
                      <strong className="text-amber-300">{diyaCount.toLocaleString()}</strong>
                      {L.devoteesCountSuffix}
                    </span>
                  </div>

                  {/* Two Quick Devotional Buttons: Diya & Flowers */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      onClick={handleLightDiya}
                      disabled={isDiyaLit}
                      className={`py-2 px-3 rounded-xl font-serif text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        isDiyaLit
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-default'
                          : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-stone-950 shadow-md'
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span>{isDiyaLit ? L.diyaBtnLit : L.diyaBtnUnlit}</span>
                    </button>

                    <button
                      onClick={handleOfferFlowers}
                      className="py-2 px-3 rounded-xl font-serif text-xs font-bold bg-stone-800/90 hover:bg-stone-700/90 text-amber-200 border border-amber-500/30 transition flex items-center justify-center space-x-1.5 relative overflow-hidden"
                    >
                      <span className="text-sm">🌸</span>
                      <span>{L.flowersBtn} ({flowerCount.toLocaleString()})</span>
                      {isFlowerOffered && (
                        <span className="absolute inset-0 bg-amber-400/20 flex items-center justify-center text-amber-200 text-xs animate-ping">
                          🌸
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Live Festival Aarti Audio Player */}
                <div className="bg-[#1e0e06] border border-amber-600/40 rounded-2xl p-4 flex items-center justify-between shadow-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                      <Music className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-serif font-bold text-white">
                        {locale === 'en'
                          ? DEFAULT_FESTIVAL.audioTrack.titleEn
                          : DEFAULT_FESTIVAL.audioTrack.titleHi}
                      </span>
                      <span className="block text-[10px] text-amber-300/80 font-serif">
                        {locale === 'en'
                          ? DEFAULT_FESTIVAL.audioTrack.subtitleEn
                          : DEFAULT_FESTIVAL.audioTrack.subtitleHi}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleToggleAudio}
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95 shrink-0"
                    title={isCurrentAudioPlaying ? 'Pause Aarti' : 'Play Aarti'}
                  >
                    {isCurrentAudioPlaying ? (
                      <Pause className="w-4 h-4 fill-stone-950" />
                    ) : (
                      <Play className="w-4 h-4 fill-stone-950 ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Shubh Muhurat Schedule Card */}
                <div className="bg-black/60 border border-amber-900/80 rounded-2xl p-4 sm:p-5 space-y-3">
                  <h3 className="text-xs font-serif font-bold text-amber-300 flex items-center space-x-1.5 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{L.shubhMuhuratHeader}</span>
                  </h3>

                  <div className="space-y-2.5">
                    {muhurats.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-[#211007] border border-amber-900/40 rounded-xl p-2.5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="block font-serif font-bold text-stone-100">{m.title}</span>
                          <span className="text-[10px] text-stone-400">{m.note}</span>
                        </div>
                        <span className="font-serif font-bold text-amber-400 text-right shrink-0">
                          {m.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
