'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';
import {
  Flame,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Clock,
  Sun,
  Moon,
  Heart,
  Share2,
  ChevronRight,
  BookOpen,
  Music,
  ShoppingBag,
} from 'lucide-react';

interface FestivalData {
  id: string;
  nameHi: string;
  nameEn: string;
  tagline: string;
  tithi: string;
  dateStr: string;
  bannerImage: string;
  deity: string;
  deityRole: string;
  shubhMuhurat: {
    title: string;
    time: string;
    note: string;
  }[];
  primaryMantra: {
    sanskrit: string;
    transliteration: string;
    meaning: string;
  };
  significance: string;
  todaysColor: {
    name: string;
    hex: string;
  };
  todaysPrasad: string;
  audioTrack: {
    id: string;
    title: string;
    audioUrl: string;
    subtitle: string;
  };
}

const DEFAULT_FESTIVAL: FestivalData = {
  id: 'navratri-live',
  nameHi: 'शारदीय नवरात्रि महापर्व',
  nameEn: 'Maha Navratri Celebration',
  tagline: 'माँ जगदम्बा की असीम कृपा, शक्ति और भक्ति का पावन उत्सव',
  tithi: 'आश्विन शुक्ल प्रतिपदा • प्रथम नवरात्र',
  dateStr: 'Live Today',
  bannerImage: '/images/hero_shiva.jpg',
  deity: 'माँ शैलपुत्री (Maa Shailaputri)',
  deityRole: 'हिमालय पुत्री, नवदुर्गा का प्रथम स्वरूप • शक्ति एवं स्थिरता की अधिष्ठात्री',
  shubhMuhurat: [
    { title: 'घटस्थापना शुभ मुहूर्त', time: 'प्रातः 06:15 AM - 10:18 AM', note: 'अभिजीत मुहूर्त: 11:48 AM - 12:36 PM' },
    { title: 'मध्याह्न पूजा काल', time: 'दोपहर 12:05 PM - 02:45 PM', note: 'सर्वार्थ सिद्धि योग सहित' },
    { title: 'महा संध्या आरती', time: 'सायं 06:45 PM - 07:30 PM', note: 'दीपदान एवं पुष्पवृष्टि काल' },
  ],
  primaryMantra: {
    sanskrit: 'वन्दे वाञ्छितलाभाय चन्द्रार्धकृतशेखराम् ।\nवृषारूढां शूलधरां शैलपुत्रीं यशस्विनीम् ॥',
    transliteration: 'vande vāñchitalābhāya candrārdhakṛtaśekharām |\nvṛṣārūḍhāṁ śūladharāṁ śailaputrīṁ yaśasvinīm ||',
    meaning: 'मनोवांछित फल की प्राप्ति के लिए, मस्तक पर अर्धचंद्र धारण करने वाली, वृषभ पर सवार और त्रिशूल धारण करने वाली परम तेजस्वी माँ शैलपुत्री की हम वंदना करते हैं।',
  },
  significance: 'नवरात्रि का प्रथम दिन माँ शैलपुत्री की उपासना के लिए समर्पित है। माँ शैलपुत्री चेतना, तपस्या और आत्मबल का प्रतीक हैं। आज के दिन घटस्थापना (कलश स्थापना) के साथ अखंड ज्योति प्रज्वलित की जाती है।',
  todaysColor: {
    name: 'पीला (Royal Yellow - ज्ञान व तेज)',
    hex: '#f59e0b',
  },
  todaysPrasad: 'शुद्ध देशी गाय का घी, पंचामृत एवं श्वेत मिष्ठान',
  audioTrack: {
    id: 'aarti-durga',
    title: 'श्री अम्बे जी की आरती (Jai Ambe Gauri)',
    audioUrl: '/audio/om_namah_shivaya.wav',
    subtitle: 'Navratri Special Devotional Chanting',
  },
};

export default function LiveFestival() {
  const { isPlaying, currentTrack, playAudio, pauseAudio } = useAudio();
  const [diyaCount, setDiyaCount] = useState(14850);
  const [isDiyaLit, setIsDiyaLit] = useState(false);
  const [flowerCount, setFlowerCount] = useState(8920);
  const [isFlowerOffered, setIsFlowerOffered] = useState(false);
  const [copiedMantra, setCopiedMantra] = useState(false);

  // Initialize random count or restore from session
  useEffect(() => {
    const savedDiya = localStorage.getItem('sanatan_diya_lit');
    if (savedDiya === 'true') {
      setIsDiyaLit(true);
    }
  }, []);

  const handleLightDiya = () => {
    if (!isDiyaLit) {
      setIsDiyaLit(true);
      setDiyaCount((prev) => prev + 1);
      localStorage.setItem('sanatan_diya_lit', 'true');
    }
  };

  const handleOfferFlowers = () => {
    setIsFlowerOffered(true);
    setFlowerCount((prev) => prev + 1);
    setTimeout(() => {
      setIsFlowerOffered(false);
    }, 2500);
  };

  const handleToggleAudio = () => {
    if (isPlaying && currentTrack?.id === DEFAULT_FESTIVAL.audioTrack.id) {
      pauseAudio();
    } else {
      playAudio(DEFAULT_FESTIVAL.audioTrack);
    }
  };

  const copyMantra = () => {
    navigator.clipboard.writeText(
      `${DEFAULT_FESTIVAL.primaryMantra.sanskrit}\n\n${DEFAULT_FESTIVAL.primaryMantra.meaning}`
    );
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 3000);
  };

  const isCurrentAudioPlaying = isPlaying && currentTrack?.id === DEFAULT_FESTIVAL.audioTrack.id;

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
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 font-serif flex items-center space-x-1.5">
                <span>🔴 लाइव पावन महापर्व • LIVE FESTIVAL TODAY</span>
              </span>
            </div>

            <div className="flex items-center space-x-4 text-xs font-serif text-amber-200/90">
              <span className="flex items-center space-x-1 bg-black/40 px-3 py-1 rounded-full border border-amber-500/20">
                <Clock className="w-3.5 h-3.5 text-amber-400 mr-1" />
                <span>{DEFAULT_FESTIVAL.tithi}</span>
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
                    <span>{DEFAULT_FESTIVAL.deity}</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-wide leading-tight">
                    {DEFAULT_FESTIVAL.nameHi}
                  </h2>
                  <p className="text-amber-200/90 font-serif text-base sm:text-lg mt-1 font-medium">
                    {DEFAULT_FESTIVAL.tagline}
                  </p>
                  <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    {DEFAULT_FESTIVAL.deityRole}
                  </p>
                </div>

                {/* Primary Sacred Mantra Box */}
                <div className="bg-black/50 border border-amber-500/40 rounded-2xl p-5 sm:p-6 backdrop-blur-sm relative group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-serif">
                      ॥ आज का विशेष ध्यान मंत्र ॥
                    </span>
                    <button
                      onClick={copyMantra}
                      className="text-stone-400 hover:text-amber-300 transition text-xs flex items-center space-x-1 bg-stone-800/80 hover:bg-stone-700/80 px-2.5 py-1 rounded-md"
                      title="मंत्र कॉपी करें"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>{copiedMantra ? 'कॉपी हो गया ✓' : 'शेयर / कॉपी'}</span>
                    </button>
                  </div>

                  <blockquote className="text-lg sm:text-xl font-serif font-bold text-amber-100 leading-relaxed whitespace-pre-line drop-shadow">
                    {DEFAULT_FESTIVAL.primaryMantra.sanskrit}
                  </blockquote>

                  <p className="text-xs text-amber-200/80 italic font-serif mt-2">
                    {DEFAULT_FESTIVAL.primaryMantra.transliteration}
                  </p>

                  <div className="mt-3 pt-3 border-t border-amber-900/50 text-xs text-stone-300 font-serif">
                    <strong className="text-amber-300">भावार्थ: </strong>
                    {DEFAULT_FESTIVAL.primaryMantra.meaning}
                  </div>
                </div>

                {/* Quick Details Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#24140b] border border-amber-900/60 rounded-xl p-3 flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                      <span className="text-base">🎨</span>
                    </div>
                    <div>
                      <span className="block text-stone-400 text-[10px] font-medium">आज का पावन रंग</span>
                      <span className="font-bold text-amber-200">{DEFAULT_FESTIVAL.todaysColor.name}</span>
                    </div>
                  </div>

                  <div className="bg-[#24140b] border border-amber-900/60 rounded-xl p-3 flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                      <span className="text-base">🍯</span>
                    </div>
                    <div>
                      <span className="block text-stone-400 text-[10px] font-medium">आज का पावन भोग/प्रसाद</span>
                      <span className="font-bold text-amber-200 truncate block">{DEFAULT_FESTIVAL.todaysPrasad}</span>
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
                    <span>आरती संग्रह (Aartis)</span>
                  </Link>

                  <Link
                    href="/kathas"
                    className="inline-flex items-center space-x-2 bg-stone-900/90 hover:bg-stone-800 text-amber-200 border border-amber-500/40 font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition transform hover:-translate-y-0.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>पर्व कथा पढ़ें (Kathas)</span>
                  </Link>

                  <Link
                    href="/books"
                    className="inline-flex items-center space-x-2 bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition hover:text-amber-300"
                  >
                    <span>Spiritual Books</span>
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
                    <span>डिजिटल दीपदान एवं पुष्पांजलि</span>
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
                        {isDiyaLit ? '🪔' : '🪔'}
                      </span>
                      {isDiyaLit && (
                        <div className="absolute -top-3 animate-bounce">
                          <Sparkles className="w-6 h-6 text-yellow-200 fill-yellow-200" />
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-amber-200 font-serif mt-3 font-semibold">
                      {isDiyaLit ? '✨ आपका पावन दीप प्रज्वलित है!' : '👆 स्पर्श करके आज का पावन दीप प्रज्वलित करें'}
                    </p>
                    <span className="text-[11px] text-stone-400 mt-0.5">
                      आज कुल <strong className="text-amber-300">{diyaCount.toLocaleString()}</strong> श्रद्धालुओं ने दीप जलाया
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
                      <span>{isDiyaLit ? 'दीप जल चुका ✓' : 'दीप जलाएं'}</span>
                    </button>

                    <button
                      onClick={handleOfferFlowers}
                      className="py-2 px-3 rounded-xl font-serif text-xs font-bold bg-stone-800/90 hover:bg-stone-700/90 text-amber-200 border border-amber-500/30 transition flex items-center justify-center space-x-1.5 relative overflow-hidden"
                    >
                      <span className="text-sm">🌸</span>
                      <span>पुष्प अर्पित करें ({flowerCount.toLocaleString()})</span>
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
                        {DEFAULT_FESTIVAL.audioTrack.title}
                      </span>
                      <span className="block text-[10px] text-amber-300/80 font-serif">
                        {DEFAULT_FESTIVAL.audioTrack.subtitle}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleToggleAudio}
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95 shrink-0"
                    title={isCurrentAudioPlaying ? 'आरती रोकें' : 'आरती सुनें'}
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
                    <span>आज के पावन शुभ मुहूर्त (Shubh Muhurat)</span>
                  </h3>

                  <div className="space-y-2.5">
                    {DEFAULT_FESTIVAL.shubhMuhurat.map((m, idx) => (
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
