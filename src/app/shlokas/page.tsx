'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAudio } from '@/context/AudioContext';
import { useCMS } from '@/context/CMSContext';
import {
  Search,
  Play,
  Pause,
  BookOpen,
  Sparkles,
  Share2,
  Check,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface ScriptureShloka {
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
}

const CANONICAL_SHLOKAS: ScriptureShloka[] = [
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
  },
];

const CATEGORIES = ['All', 'Gita Shlokas', 'Upanishad Shlokas', 'Shanti Mantras', 'Stotras'];

export default function ShlokasPage() {
  const { shlokas } = useCMS();
  const { isPlaying, playAudio, pauseAudio } = useAudio();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const allShlokas = useMemo(() => {
    return (shlokas && shlokas.length > 0 ? shlokas : CANONICAL_SHLOKAS) as ScriptureShloka[];
  }, [shlokas]);

  const handleAudio = async (shloka: ScriptureShloka) => {
    if (playingId === shloka.id && isPlaying) {
      pauseAudio();
      setPlayingId(null);
    } else {
      setPlayingId(shloka.id);
      await playAudio({
        id: shloka.id,
        title: shloka.source,
        subtitle: shloka.chapterVerse,
        audioUrl: '/audio/om_namah_shivaya.wav',
      });
    }
  };

  const handleCopy = (shloka: ScriptureShloka) => {
    const text = `${shloka.sanskrit}\n\n${shloka.hindi}\n\n${shloka.english}\n— ${shloka.source} (${shloka.chapterVerse})`;
    navigator.clipboard.writeText(text);
    setCopiedId(shloka.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = allShlokas.filter((s) => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      s.sanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.hindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans pb-16">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#241711] via-[#3a2217] to-[#241711] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#4d3224]">
        <div className="max-w-4xl mx-auto text-center space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-serif mb-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>सनातन धर्मग्रंथ श्लोक संग्रह</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-wide">
            Sacred Sanskrit Shlokas & Stotras
          </h1>
          <p className="text-sm sm:text-base text-amber-200/90 font-serif max-w-2xl mx-auto">
            Canonical verses from the Bhagavad Gita, Upanishads, and classical Vedic hymns with authentic meters and translations.
          </p>

          {/* Search */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by verse, meaning, or scripture..."
              className="w-full bg-white/95 text-stone-900 placeholder-stone-400 text-sm rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
            />
            <Search className="w-5 h-5 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Banner to Divine Vibrations */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-stone-700">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Looking for mantra audio and sacred frequency vibrations? Explore our dedicated player.</span>
          </div>
          <Link
            href="/divine-vibrations"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold tracking-wide shadow-sm hover:shadow flex items-center space-x-1.5 transition whitespace-nowrap"
          >
            <span>Visit Divine Vibrations</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#ea580c] text-white shadow-sm font-bold'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Shlokas List */}
        <div className="space-y-6">
          {filtered.map((shloka) => {
            const isThisPlaying = playingId === shloka.id && isPlaying;

            return (
              <article
                key={shloka.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm hover:border-orange-300 transition space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {shloka.source}
                    </span>
                    <h3 className="text-xs font-mono text-stone-500">{shloka.chapterVerse}</h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-full bg-stone-100 text-[11px] font-medium text-stone-600">
                      {shloka.meter}
                    </span>
                    <button
                      onClick={() => handleCopy(shloka)}
                      className="p-1.5 rounded-lg border border-stone-200 hover:border-amber-400 text-stone-500 hover:text-amber-700 transition"
                      title="Copy Shloka"
                    >
                      {copiedId === shloka.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Sanskrit Devanagari */}
                <div className="p-5 rounded-2xl bg-[#fdfcf9] border border-amber-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <pre className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#241711] leading-relaxed whitespace-pre-wrap">
                    {shloka.sanskrit}
                  </pre>

                  <button
                    onClick={() => handleAudio(shloka)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md transition transform hover:scale-105 ${
                      isThisPlaying
                        ? 'bg-[#ea580c] text-white shadow-orange-500/40 animate-pulse'
                        : 'bg-gradient-to-tr from-[#ea580c] to-[#f97316] text-white'
                    }`}
                    title={isThisPlaying ? 'Pause Chanting' : 'Listen to Recitation'}
                  >
                    {isThisPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                </div>

                {/* Transliteration */}
                <p className="text-xs text-stone-500 italic font-mono pl-1">
                  {shloka.transliteration}
                </p>

                {/* Translations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-1">
                    <span className="font-bold text-amber-800 text-[11px] uppercase tracking-wide">
                      हिन्दी अनुवाद (Hindi Meaning)
                    </span>
                    <p className="text-stone-800 font-serif leading-relaxed text-sm">
                      {shloka.hindi}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-1">
                    <span className="font-bold text-stone-700 text-[11px] uppercase tracking-wide">
                      English Translation
                    </span>
                    <p className="text-stone-800 font-serif leading-relaxed text-sm">
                      {shloka.english}
                    </p>
                  </div>
                </div>

                {/* Read Full Scripture Chapter Link */}
                <div className="pt-2 flex justify-end">
                  <Link
                    href={`/scriptures/${shloka.scriptureSlug}`}
                    className="inline-flex items-center space-x-1 text-xs text-amber-700 hover:text-amber-800 font-semibold hover:underline"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read in Canonical Scripture Library</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
