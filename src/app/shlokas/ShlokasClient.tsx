'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAudio } from '@/context/AudioContext';
import { useCMS } from '@/context/CMSContext';
import { speakVedicVoice, stopVedicVoice, isVoiceSupported } from '@/lib/voice';
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
  Volume2,
  X,
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
  youtubeId?: string;
}

const CANONICAL_SHLOKAS: ScriptureShloka[] = [
  // --- Bhagavad Gita ---
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
  },
  {
    id: 'gita-2-63',
    source: 'श्रीमद्भगवद्गीता (Bhagavad Gita)',
    chapterVerse: 'अध्याय २, श्लोक ६३ (Chapter 2, Verse 63)',
    sanskrit: 'क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः ।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥',
    transliteration: 'krodhād bhavati sammohaḥ sammohāt smṛiti-vibhramaḥ |\nsmṛiti-bhraṁśhād buddhi-nāśho buddhi-nāśhāt praṇaśhyati ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'क्रोध से मोह उत्पन्न होता है, मोह से स्मृति भ्रमित होती है, स्मृति भ्रम से बुद्धि नष्ट होती है और बुद्धि नष्ट होने पर मनुष्य का पतन हो जाता है।',
    english: 'From anger comes delusion, from delusion loss of memory, from loss of memory the ruin of reason, and from ruin of reason he perishes.',
    category: 'Gita Shlokas',
    scriptureSlug: 'bhagavad-gita',
    youtubeId: 'KOCublNlE-U',
  },
  {
    id: 'gita-3-21',
    source: 'श्रीमद्भगवद्गीता (Bhagavad Gita)',
    chapterVerse: 'अध्याय ३, श्लोक २१ (Chapter 3, Verse 21)',
    sanskrit: 'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः ।\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते ॥',
    transliteration: 'yad yad ācarati śreṣṭhas tat tad evetaro janaḥ |\nsa yat pramāṇaṁ kurute lokas tad anuvartate ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'श्रेष्ठ पुरुष जैसा आचरण करता है, अन्य लोग भी वैसा ही करते हैं। वह जो भी आदर्श स्थापित करता है, संसार उसी का अनुसरण करता है।',
    english: 'Whatever a great man does, others follow; whatever standard he sets, the world pursues.',
    category: 'Gita Shlokas',
    scriptureSlug: 'bhagavad-gita',
    youtubeId: 'KOCublNlE-U',
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
  },
  {
    id: 'gita-6-5',
    source: 'श्रीमद्भगवद्गीता (Bhagavad Gita)',
    chapterVerse: 'अध्याय ६, श्लोक ५ (Chapter 6, Verse 5)',
    sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत् ।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥',
    transliteration: 'uddhared ātmanātmānaṁ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'मनुष्य को चाहिए कि अपने द्वारा अपना उद्धार करे और अपने आपको अधोगति में न डाले, क्योंकि यह आत्मा ही अपना मित्र है और यही अपना शत्रु भी है।',
    english: 'One must elevate oneself by one\'s own mind, not degrade oneself. The mind alone is one\'s friend and also one\'s enemy.',
    category: 'Gita Shlokas',
    scriptureSlug: 'bhagavad-gita',
    youtubeId: 'KOCublNlE-U',
  },
  {
    id: 'gita-7-7',
    source: 'श्रीमद्भगवद्गीता (Bhagavad Gita)',
    chapterVerse: 'अध्याय ७, श्लोक ७ (Chapter 7, Verse 7)',
    sanskrit: 'मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय ।\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ॥',
    transliteration: 'mattaḥ parataraṁ nānyat kiñcid asti dhanañjaya |\nmayi sarvam idaṁ protaṁ sūtre maṇi-gaṇā iva ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'हे धनञ्जय! मुझसे बढ़कर अन्य कुछ भी नहीं है। जिस प्रकार धागे में मणियाँ पिरोई रहती हैं, उसी प्रकार यह सम्पूर्ण जगत मुझमें पिरोया हुआ है।',
    english: 'There is nothing higher than Me, O Arjuna. All this is strung on Me, like pearls on a thread.',
    category: 'Gita Shlokas',
    scriptureSlug: 'bhagavad-gita',
    youtubeId: 'KOCublNlE-U',
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
  },
  {
    id: 'gita-12-13',
    source: 'श्रीमद्भगवद्गीता (Bhagavad Gita)',
    chapterVerse: 'अध्याय १२, श्लोक १३ (Chapter 12, Verse 13)',
    sanskrit: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च ।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी ॥',
    transliteration: 'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca |\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'जो सब प्राणियों से द्वेष न रखने वाला, सबका मित्र और करुणायुक्त है, ममता और अहंकार से रहित है, सुख-दुःख में सम है और क्षमाशील है (वह भक्त मुझे प्रिय है)।',
    english: 'One who hates no creature, who is friendly and compassionate, free from possessiveness and ego, even-minded in joy and sorrow, and forgiving.',
    category: 'Gita Shlokas',
    scriptureSlug: 'bhagavad-gita',
    youtubeId: 'KOCublNlE-U',
  },
  {
    id: 'gita-15-7',
    source: 'श्रीमद्भगवद्गीता (Bhagavad Gita)',
    chapterVerse: 'अध्याय १५, श्लोक ७ (Chapter 15, Verse 7)',
    sanskrit: 'ममैवांशो जीवलोके जीवभूतः सनातनः ।\nमनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥',
    transliteration: 'mamaivāṁśho jīva-loke jīva-bhūtaḥ sanātanaḥ |\nmanaḥ-ṣaṣṭhānīndriyāṇi prakṛiti-sthāni karṣhati ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'इस जीवलोक में सनातन जीवात्मा मेरा ही अंश है, जो प्रकृति में स्थित मन सहित छह इन्द्रियों को आकर्षित करती है।',
    english: 'The eternal living entity in this world is a fragment of Me, struggling with the six senses including the mind, situated in material nature.',
    category: 'Gita Shlokas',
    scriptureSlug: 'bhagavad-gita',
    youtubeId: 'KOCublNlE-U',
  },
  {
    id: 'gita-18-66',
    source: 'श्रीमद्भगवद्गीता (Bhagavad Gita)',
    chapterVerse: 'अध्याय १८, श्लोक ६६ (Chapter 18, Verse 66)',
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥',
    transliteration: 'sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja |\nahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhucaḥ ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'सम्पूर्ण धर्मों को त्यागकर केवल मेरी शरण में आ जाओ। मैं तुम्हें सम्पूर्ण पापों से मुक्त कर दूँगा, शोक मत करो।',
    english: 'Abandon all varieties of duty and surrender unto Me alone. I shall liberate you from all sinful reactions; do not fear.',
    category: 'Gita Shlokas',
    scriptureSlug: 'bhagavad-gita',
    youtubeId: 'KOCublNlE-U',
  },

  // --- Upanishads ---
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
  },
  {
    id: 'katha-1-3-14',
    source: 'कठोपनिषद् (Katha Upanishad)',
    chapterVerse: 'अध्याय १, वल्ली ३, मन्त्र १४ (1.3.14)',
    sanskrit: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।\nक्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ॥',
    transliteration: 'uttiṣṭhata jāgrata prāpya varān nibodhata |\nkṣurasya dhārā niśitā duratyayā durgaṁ pathas tat kavayo vadanti ||',
    meter: 'त्रिष्टुप् छन्द (Trishtubh Meter)',
    hindi: 'उठो, जागो और श्रेष्ठ पुरुषों के पास जाकर ज्ञान प्राप्त करो। ज्ञानी कहते हैं कि यह मार्ग तलवार की तीखी धार के समान दुर्गम है।',
    english: 'Arise, awake, approach the wise and learn. The path is difficult, sharp as a razor\'s edge, so the wise declare.',
    category: 'Upanishad Shlokas',
    scriptureSlug: 'katha-upanishad',
    youtubeId: 'bD9sf88tM4g',
  },
  {
    id: 'mundaka-3-1-6',
    source: 'मुण्डकोपनिषद् (Mundaka Upanishad)',
    chapterVerse: 'मुण्डक ३, खण्ड १, मन्त्र ६ (3.1.6)',
    sanskrit: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः ।\nयेनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत्सत्यस्य परमं निधानम् ॥',
    transliteration: 'satyameva jayate nānṛitaṁ satyena panthā vitato devayānaḥ |\nyenākramantyṛṣayo hyāptakāmā yatra tatsatyasya paramaṁ nidhānam ||',
    meter: 'त्रिष्टुप् छन्द (Trishtubh Meter)',
    hindi: 'सत्य की ही विजय होती है, असत्य की नहीं। सत्य के द्वारा ही देवयान मार्ग बना है, जिससे सच्चे कामनारहित ऋषिगण उस परम सत्य के धाम तक पहुँचते हैं।',
    english: 'Truth alone triumphs, not falsehood. Through truth the divine path is spread out, by which the sages who have fulfilled their desires reach the supreme abode of Truth.',
    category: 'Upanishad Shlokas',
    scriptureSlug: 'upanishads',
    youtubeId: 'bD9sf88tM4g',
  },
  {
    id: 'taittiriya-1-11-1',
    source: 'तैत्तिरीयोपनिषद् (Taittiriya Upanishad)',
    chapterVerse: 'शिक्षावल्ली, अनुवाक ११, मन्त्र १ (1.11.1)',
    sanskrit: 'मातृदेवो भव । पितृदेवो भव ।\nआचार्यदेवो भव । अतिथिदेवो भव ॥',
    transliteration: 'mātṛi-devo bhava, pitṛi-devo bhava |\nācārya-devo bhava, atithi-devo bhava ||',
    meter: 'गद्य (Prose)',
    hindi: 'माता को देवता समान समझो, पिता को देवता समान समझो, आचार्य को देवता समान समझो, अतिथि को देवता समान समझो।',
    english: 'Let your mother be a god to you. Let your father be a god to you. Let your teacher be a god to you. Let your guest be a god to you.',
    category: 'Upanishad Shlokas',
    scriptureSlug: 'upanishads',
    youtubeId: 'bD9sf88tM4g',
  },
  {
    id: 'chandogya-6-8-7',
    source: 'छांदोग्योपनिषद् (Chandogya Upanishad)',
    chapterVerse: 'अध्याय ६, खण्ड ८, मन्त्र ७ (6.8.7)',
    sanskrit: 'तत्त्वमसि श्वेतकेतो ॥',
    transliteration: 'tat tvam asi śhvetaketo',
    meter: 'गद्य (Prose)',
    hindi: 'हे श्वेतकेतु! तुम वही (ब्रह्म) हो।',
    english: 'That thou art, O Shvetaketu — you are that ultimate reality.',
    category: 'Upanishad Shlokas',
    scriptureSlug: 'upanishads',
    youtubeId: 'bD9sf88tM4g',
  },
  {
    id: 'mandukya-2',
    source: 'माण्डूक्योपनिषद् (Mandukya Upanishad)',
    chapterVerse: 'मन्त्र २ (Verse 2)',
    sanskrit: 'अयमात्मा ब्रह्म ॥',
    transliteration: 'ayam ātmā brahma',
    meter: 'गद्य (Prose)',
    hindi: 'यह आत्मा ही ब्रह्म है।',
    english: 'This Self (Atman) is Brahman.',
    category: 'Upanishad Shlokas',
    scriptureSlug: 'mandukya-upanishad',
    youtubeId: 'bD9sf88tM4g',
  },
  {
    id: 'aitareya-3-1-3',
    source: 'ऐतरेयोपनिषद् (Aitareya Upanishad)',
    chapterVerse: 'अध्याय ३, खण्ड १, मन्त्र ३ (3.1.3)',
    sanskrit: 'प्रज्ञानं ब्रह्म ॥',
    transliteration: 'prajñānaṁ brahma',
    meter: 'गद्य (Prose)',
    hindi: 'प्रज्ञान (चेतना) ही ब्रह्म है।',
    english: 'Consciousness is Brahman.',
    category: 'Upanishad Shlokas',
    scriptureSlug: 'upanishads',
    youtubeId: 'bD9sf88tM4g',
  },

  // --- Rigveda ---
  {
    id: 'rigveda-1-1-1',
    source: 'ऋग्वेद संहिता (Rigveda Samhita)',
    chapterVerse: 'मण्डल १, सूक्त १, ऋचा १ (1.1.1)',
    sanskrit: 'अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ।\nहोतारं रत्नधातमम् ॥',
    transliteration: 'agnim īḷe purohitaṁ yajñasya devam ṛtvijam |\nhotāraṁ ratna-dhātamam ||',
    meter: 'गायत्री छन्द (Gayatri Meter)',
    hindi: 'मैं अग्नि की स्तुति करता हूँ, जो यज्ञ के पुरोहित, देवता और ऋत्विज हैं तथा जो श्रेष्ठ रत्न (धन) प्रदान करने वाले होता हैं।',
    english: 'I praise Agni, the priest of the sacrifice, the divine minister, the invoker, the greatest bestower of treasures.',
    category: 'Rigveda Shlokas',
    scriptureSlug: 'rigveda-samhita',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'rigveda-10-191-2',
    source: 'ऋग्वेद संहिता (Rigveda Samhita)',
    chapterVerse: 'मण्डल १०, सूक्त १९१, ऋचा २ (10.191.2)',
    sanskrit: 'सं गच्छध्वं सं वदध्वं सं वो मनांसि जानताम् ।\nदेवा भागं यथा पूर्वे सञ्जानाना उपासते ॥',
    transliteration: 'saṁ gacchadhvaṁ saṁ vadadhvaṁ saṁ vo manāṁsi jānatām |\ndevā bhāgaṁ yathā pūrve sañjānānā upāsate ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'तुम सब मिलकर चलो, मिलकर बोलो, तुम्हारे मन एक जैसे हों, जैसे पूर्वकाल में देवता एकजुट होकर अपने-अपने भाग को ग्रहण करते थे।',
    english: 'Assemble, speak together, let your minds be in harmony, as the ancient gods shared their portion in unity.',
    category: 'Rigveda Shlokas',
    scriptureSlug: 'rigveda-samhita',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'rigveda-3-62-10',
    source: 'ऋग्वेद संहिता (Rigveda Samhita)',
    chapterVerse: 'मण्डल ३, सूक्त ६२, ऋचा १० (Gayatri Mantra 3.62.10)',
    sanskrit: 'ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥',
    transliteration: 'oṁ bhūr bhuvaḥ svaḥ, tat savitur vareṇyaṁ\nbhargo devasya dhīmahi, dhiyo yo naḥ pracodayāt',
    meter: 'गायत्री छन्द (Gayatri Meter)',
    hindi: 'हम उस श्रेष्ठ, तेजस्वी सूर्यदेव के दिव्य प्रकाश का ध्यान करते हैं, जो हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करे।',
    english: 'We meditate on the glorious splendor of the Divine Light (Savitr); may it illuminate our intellect.',
    category: 'Rigveda Shlokas',
    scriptureSlug: 'rigveda-samhita',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'rigveda-1-89-1',
    source: 'ऋग्वेद संहिता (Rigveda Samhita)',
    chapterVerse: 'मण्डल १, सूक्त ८९, ऋचा १ (1.89.1)',
    sanskrit: 'आ नो भद्राः क्रतवो यन्तु विश्वतोऽदब्धासो अपरीतास उद्भिदः ।\nदेवा नो यथा सदमिद्वृधे असन्नप्रायुवो रक्षितारो दिवे-दिवे ॥',
    transliteration: 'ā no bhadrāḥ kratavo yantu viśhvato\'dabdhāso aparītāsa udbhidaḥ |\ndevā no yathā sadamidvṛdhe asannaprāyuvo rakṣitāro dive-dive ||',
    meter: 'जगती छन्द (Jagati Meter)',
    hindi: 'सभी दिशाओं से शुभ और कल्याणकारी विचार हमारे पास आएँ, जो निर्भय, अखण्ड और उन्नति देने वाले हों; देवगण सदैव हमारी उन्नति के लिए हमारी रक्षा करें।',
    english: 'Let noble thoughts come to us from every side, unbroken, unhindered, victorious; may the gods ever protect and guide us.',
    category: 'Rigveda Shlokas',
    scriptureSlug: 'rigveda-samhita',
    youtubeId: 'Vwyo62x9yC4',
  },

  // --- Peace Mantras (शान्ति मन्त्र) ---
  {
    id: 'shanti-mantra',
    source: 'बृहदारण्यकोपनिषद् (Brihadaranyaka Upanishad)',
    chapterVerse: 'शान्ति मन्त्र (Shanti Mantra)',
    sanskrit: 'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय ।\nमृत्योर्मा अमृतं गमय । ॐ शान्तिः शान्तिः शान्तिः ॥',
    transliteration: 'oṁ asato mā sad gamaya | tamaso mā jyotir gamaya |\nmṛtyor mā amṛtaṁ gamaya | oṁ śāntiḥ śāntiḥ śāntiḥ ||',
    meter: 'गद्य (Prose)',
    hindi: 'हे प्रभु! मुझे असत्य से सत्य की ओर ले चलें, अंधकार से प्रकाश की ओर ले चलें, और मृत्यु से अमरता की ओर ले चलें। ॐ शान्ति शान्ति शान्ति।',
    english: 'Lead me from the unreal to the real, lead me from darkness to light, lead me from death to immortality. Om Peace, Peace, Peace.',
    category: 'Shanti Mantras',
    scriptureSlug: 'upanishads',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'shanti-sahana-vavatu',
    source: 'तैत्तिरीयोपनिषद् (Taittiriya Upanishad)',
    chapterVerse: 'शान्ति मन्त्र (Shanti Mantra)',
    sanskrit: 'ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै ।\nतेजस्विनावधीतमस्तु मा विद्विषावहै ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
    transliteration: 'oṁ saha nāvavatu, saha nau bhunaktu, saha vīryaṁ karavāvahai |\ntejasvi nāvadhītam astu mā vidviṣāvahai || oṁ śāntiḥ śāntiḥ śāntiḥ ||',
    meter: 'गद्य (Prose)',
    hindi: 'हम दोनों (गुरु-शिष्य) की साथ रक्षा हो, साथ पालन हो, हम साथ मिलकर पराक्रम करें, हमारा अध्ययन तेजस्वी हो और हममें कभी द्वेष न हो।',
    english: 'May we both (teacher and student) be protected together, nourished together, work together with vigor; may our study be brilliant, and may we never hate each other.',
    category: 'Shanti Mantras',
    scriptureSlug: 'upanishads',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'shanti-dyauh',
    source: 'यजुर्वेद (Yajurveda)',
    chapterVerse: 'शान्ति मन्त्र (Shanti Mantra)',
    sanskrit: 'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः ।\nवनस्पतयः शान्तिर्विश्वेदेवाः शान्तिर्ब्रह्म शान्तिः सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
    transliteration: 'oṁ dyauḥ śhāntir antarikṣhaṁ śhāntiḥ pṛithivī śhāntir āpaḥ śhāntir oṣhadhayaḥ śhāntiḥ |\nvanaspatayaḥ śhāntir viśvedevāḥ śhāntir brahma śhāntiḥ sarvaṁ śhāntiḥ śhāntireva śhāntiḥ sā mā śhāntiredhi ||',
    meter: 'गद्य (Prose)',
    hindi: 'आकाश में शान्ति हो, अन्तरिक्ष में शान्ति हो, पृथ्वी पर शान्ति हो, जल में शान्ति हो, औषधियों में शान्ति हो, वनस्पतियों में शान्ति हो, सम्पूर्ण देवताओं में शान्ति हो, ब्रह्म में शान्ति हो, सर्वत्र शान्ति हो; वह शान्ति मुझे प्राप्त हो।',
    english: 'Peace in the sky, peace in the atmosphere, peace on earth, peace in water, peace in plants, peace among all beings — may that peace come to me.',
    category: 'Shanti Mantras',
    scriptureSlug: 'upanishads',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'shanti-sarvesham',
    source: 'सनातन शान्ति पाठ (Sanatan Shanti Path)',
    chapterVerse: 'शान्ति मन्त्र (Shanti Mantra)',
    sanskrit: 'ॐ सर्वेषां स्वस्तिर्भवतु । सर्वेषां शान्तिर्भवतु ।\nसर्वेषां पूर्णं भवतु । सर्वेषां मङ्गलं भवतु ॥',
    transliteration: 'oṁ sarveṣhāṁ svastir bhavatu, sarveṣhāṁ śhāntir bhavatu |\nsarveṣhāṁ pūrṇaṁ bhavatu, sarveṣhāṁ maṅgalaṁ bhavatu ||',
    meter: 'गद्य (Prose)',
    hindi: 'सभी का कल्याण हो, सभी को शान्ति मिले, सभी में पूर्णता हो, सभी का मंगल हो।',
    english: 'May there be well-being for all, peace for all, fullness for all, and auspiciousness for all.',
    category: 'Shanti Mantras',
    scriptureSlug: 'upanishads',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'shanti-purnamadah',
    source: 'ईशावास्योपनिषद् (Isha Upanishad)',
    chapterVerse: 'शान्ति मन्त्र (Shanti Mantra)',
    sanskrit: 'ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
    transliteration: 'oṁ pūrṇam adaḥ pūrṇam idaṁ pūrṇāt pūrṇam udacyate |\npūrṇasya pūrṇam ādāya pūrṇam evāvaśhiṣyate || oṁ śāntiḥ śāntiḥ śāntiḥ ||',
    meter: 'शिखरिणी छन्द (Shikharini Meter)',
    hindi: 'वह (ब्रह्म) पूर्ण है, यह (जगत) भी पूर्ण है; पूर्ण से पूर्ण उत्पन्न होता है। पूर्ण में से पूर्ण निकाल लेने पर भी पूर्ण ही शेष रहता है।',
    english: 'That is whole, this is whole; from wholeness comes wholeness. Taking wholeness from wholeness, wholeness alone remains.',
    category: 'Shanti Mantras',
    scriptureSlug: 'isha-upanishad',
    youtubeId: 'Vwyo62x9yC4',
  },

  // --- Subhashitani (सुभाषित) ---
  {
    id: 'subhashit-vasudhaiva',
    source: 'महोपनिषद् (Maha Upanishad)',
    chapterVerse: 'अध्याय ६, श्लोक ७१-७३ (6.71-73)',
    sanskrit: 'अयं निजः परो वेति गणना लघुचेतसाम् ।\nउदारचरितानां तु वसुधैव कुटुम्बकम् ॥',
    transliteration: 'ayaṁ nijaḥ paro veti gaṇanā laghu-cetasām |\nudāra-caritānāṁ tu vasudhaiva kuṭumbakam ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: '\'यह अपना है, यह पराया है\' — यह गणना संकीर्ण मन वालों की होती है। उदार हृदय वालों के लिए तो सम्पूर्ण पृथ्वी ही एक परिवार है।',
    english: '\'This is mine, this is another\'s\' — such thinking is for the small-minded. For the noble-hearted, the whole world is one family.',
    category: 'Subhashitani',
    scriptureSlug: 'upanishads',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'subhashit-vidya-dadati',
    source: 'हितोपदेश (Hitopadesha)',
    chapterVerse: 'प्रस्ताविका श्लोक ६ (Introductory Verse 6)',
    sanskrit: 'विद्या ददाति विनयं विनयाद्याति पात्रताम् ।\nपात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ॥',
    transliteration: 'vidyā dadāti vinayaṁ vinayād yāti pātratām |\npātratvād dhanam āpnoti dhanād dharmaṁ tataḥ sukham ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'विद्या विनम्रता देती है, विनम्रता से योग्यता आती है, योग्यता से धन प्राप्त होता है, धन से धर्म और धर्म से सुख मिलता है।',
    english: 'Knowledge gives humility, humility gives worth, worth gives wealth, wealth gives righteousness, and righteousness gives happiness.',
    category: 'Subhashitani',
    scriptureSlug: 'subhashitani',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'subhashit-satyam-bruyat',
    source: 'मनुस्मृति (Manusmriti)',
    chapterVerse: 'अध्याय ४, श्लोक १३८ (Chapter 4, Verse 138)',
    sanskrit: 'सत्यं ब्रूयात्प्रियं ब्रूयान्न ब्रूयात्सत्यमप्रियम् ।\nप्रियं च नानृतं ब्रूयादेष धर्मः सनातनः ॥',
    transliteration: 'satyaṁ brūyāt priyaṁ brūyān na brūyāt satyam apriyam |\npriyaṁ ca nānṛitaṁ brūyād eṣha dharmaḥ sanātanaḥ ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'सत्य बोलो, प्रिय बोलो, परन्तु अप्रिय सत्य मत बोलो; और प्रिय होने पर भी असत्य मत बोलो — यही सनातन धर्म है।',
    english: 'Speak the truth, speak pleasantly; do not speak unpleasant truths, nor speak pleasant falsehoods. This is the eternal law.',
    category: 'Subhashitani',
    scriptureSlug: 'subhashitani',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'subhashit-ahimsa',
    source: 'महाभारत (Mahabharata)',
    chapterVerse: 'आदि पर्व (Adi Parva)',
    sanskrit: 'अहिंसा परमो धर्मस्तथाहिंसा परं तपः ।\nअहिंसा परमं सत्यं यतो धर्मः प्रवर्तते ॥',
    transliteration: 'ahiṁsā paramo dharmas tathā ahiṁsā paraṁ tapaḥ |\nahiṁsā paramaṁ satyaṁ yato dharmaḥ pravartate ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'अहिंसा सबसे बड़ा धर्म है, अहिंसा ही सबसे बड़ी तपस्या है, अहिंसा ही परम सत्य है, जिससे धर्म की उत्पत्ति होती है।',
    english: 'Non-violence is the highest duty, the highest austerity, and the highest truth, from which all righteousness arises.',
    category: 'Subhashitani',
    scriptureSlug: 'mahabharat',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'subhashit-udyamena',
    source: 'सुभाषित रत्न भाण्डागार (Subhashita Ratna Bhandagara)',
    chapterVerse: 'उद्यम प्रशंसा (Praise of Effort)',
    sanskrit: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः ।\nन हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः ॥',
    transliteration: 'udyamena hi sidhyanti kāryāṇi na manorathaiḥ |\nna hi suptasya siṁhasya praviśhanti mukhe mṛigāḥ ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'कार्य परिश्रम से सिद्ध होते हैं, केवल कामना करने से नहीं; सोए हुए सिंह के मुख में हिरण स्वयं नहीं आ जाते।',
    english: 'Tasks are accomplished through effort, not mere wishing; deer do not walk into the mouth of a sleeping lion.',
    category: 'Subhashitani',
    scriptureSlug: 'subhashitani',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'subhashit-paropakara',
    source: 'सुभाषितानि (Subhashitani)',
    chapterVerse: 'परोपकार श्लोक (Verse on Benevolence)',
    sanskrit: 'श्लोकार्धेन प्रवक्ष्यामि यदुक्तं ग्रन्थकोटिभिः ।\nपरोपकारः पुण्याय पापाय परपीडनम् ॥',
    transliteration: 'ślokārdhena pravakṣyāmi yad uktaṁ grantha-koṭibhiḥ |\nparopakāraḥ puṇyāya pāpāya para-pīḍanam ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'जो करोड़ों ग्रन्थों में कहा गया है, वह मैं आधे श्लोक में कहता हूँ — दूसरों की भलाई करना पुण्य है और दूसरों को कष्ट देना पाप है।',
    english: 'What has been said in millions of scriptures, I say in half a verse — helping others is virtue, harming others is sin.',
    category: 'Subhashitani',
    scriptureSlug: 'subhashitani',
    youtubeId: 'Vwyo62x9yC4',
  },
  {
    id: 'subhashit-sarve-bhavantu',
    source: 'बृहदारण्यकोपनिषद् (Brihadaranyaka Upanishad)',
    chapterVerse: 'शान्ति मन्त्र / सुभाषित (Shanti Mantra)',
    sanskrit: 'ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
    transliteration: 'oṁ sarve bhavantu sukhinaḥ sarve santu nirāmayāḥ |\nsarve bhadrāṇi paśhyantu mā kaścid duḥkha-bhāg bhavet || oṁ śāntiḥ śāntiḥ śāntiḥ ||',
    meter: 'अनुष्टुप् छन्द (Anushtubh Meter)',
    hindi: 'सब सुखी हों, सब रोगमुक्त हों, सब कल्याण देखें, कोई भी दुःख का भागी न हो।',
    english: 'May all be happy, may all be free from illness, may all see auspiciousness, may none suffer.',
    category: 'Subhashitani',
    scriptureSlug: 'upanishads',
    youtubeId: 'Vwyo62x9yC4',
  },

  // --- Stotras ---
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
  },
];

export default function ShlokasPage() {
  const { locale } = useLanguage();
  const { shlokas } = useCMS();
  const { isPlaying, playAudio, pauseAudio } = useAudio();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => [
    { id: 'All', label: locale === 'en' ? 'All Shlokas' : locale === 'sa' ? 'सर्वे श्लोकाः' : 'सभी श्लोक (All)' },
    { id: 'Gita Shlokas', label: locale === 'en' ? 'Gita Shlokas' : locale === 'sa' ? 'गीता श्लोकाः' : 'गीता श्लोक (Gita)' },
    { id: 'Upanishad Shlokas', label: locale === 'en' ? 'Upanishad Shlokas' : locale === 'sa' ? 'उपनिषच्छ्लोकाः' : 'उपनिषद् श्लोक' },
    { id: 'Rigveda Shlokas', label: locale === 'en' ? 'Rigveda Mantras' : locale === 'sa' ? 'ऋग्वेद सूक्तानि' : 'ऋग्वेद मन्त्र' },
    { id: 'Shanti Mantras', label: locale === 'en' ? 'Shanti Mantras' : locale === 'sa' ? 'शान्तिमन्त्राः' : 'शान्ति मन्त्र' },
    { id: 'Subhashitani', label: locale === 'en' ? 'Subhashitani' : locale === 'sa' ? 'सुभाषितानि' : 'सुभाषित (Subhashit)' },
    { id: 'Stotras', label: locale === 'en' ? 'Stotras' : locale === 'sa' ? 'स्तोत्राणि' : 'स्तोत्र (Stotras)' },
  ], [locale]);

  // Active Shloka Devotional Song Player State
  const [activeSongShloka, setActiveSongShloka] = useState<ScriptureShloka | null>(null);

  // Vedic Swara Path (Speech Recitation) State
  const [speakingShlokaId, setSpeakingShlokaId] = useState<string | null>(null);

  const allShlokas = useMemo<ScriptureShloka[]>(() => {
    if (!shlokas || shlokas.length === 0) return CANONICAL_SHLOKAS;
    return shlokas.map((s) => {
      const canonical = CANONICAL_SHLOKAS.find((c) => c.id === s.id);
      const isBroken =
        !s.youtubeId ||
        s.youtubeId === '_jVVsBn2Fxc' ||
        s.youtubeId === 'vV1139l9g44';
      return {
        ...s,
        youtubeId: isBroken ? (canonical?.youtubeId || 'KOCublNlE-U') : s.youtubeId,
      };
    });
  }, [shlokas]);

  const stopVoiceRecitation = () => {
    stopVedicVoice();
    setSpeakingShlokaId(null);
  };

  const handleVoiceRecite = (shloka: ScriptureShloka) => {
    if (!isVoiceSupported()) {
      handlePlaySong(shloka);
      return;
    }

    if (speakingShlokaId === shloka.id) {
      stopVoiceRecitation();
      return;
    }

    setSpeakingShlokaId(shloka.id);

    // Clean text for natural Sanskrit recitation
    const textToSpeak = `${shloka.sanskrit}. ${shloka.hindi}`;
    speakVedicVoice(textToSpeak, {
      rate: 0.85,
      pitch: 1.0,
      onStart: () => setSpeakingShlokaId(shloka.id),
      onEnd: () => setSpeakingShlokaId(null),
      onError: () => setSpeakingShlokaId(null),
    });
  };

  const handlePlaySong = (shloka: ScriptureShloka) => {
    stopVoiceRecitation();
    if (activeSongShloka?.id === shloka.id) {
      setActiveSongShloka(null);
    } else {
      setActiveSongShloka(shloka);
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
            श्रीमद्भगवद्गीता, उपनिषदों एवं पावन स्तोत्रों के प्रामाणिक श्लोक, शुद्ध स्वर पाठ, गान एवं भावार्थ।
          </p>

          {/* Search */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="श्लोक, अर्थ या ग्रंथ द्वारा खोजें..."
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
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#ea580c] text-white shadow-sm font-bold'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Shlokas List */}
        <div className="space-y-6">
          {filtered.map((shloka) => {
            const isSongActive = activeSongShloka?.id === shloka.id;
            const isSpeaking = speakingShlokaId === shloka.id;

            return (
              <article
                key={shloka.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm hover:border-orange-300 transition space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider font-serif">
                      {shloka.source}
                    </span>
                    <h3 className="text-xs font-mono text-stone-500">{shloka.chapterVerse}</h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-full bg-stone-100 text-[11px] font-medium text-stone-600 font-serif">
                      {shloka.meter}
                    </span>
                    <button
                      onClick={() => handleCopy(shloka)}
                      className="p-1.5 rounded-lg border border-stone-200 hover:border-amber-400 text-stone-500 hover:text-amber-700 transition"
                      title="श्लोक कॉपी करें (Copy Shloka)"
                    >
                      {copiedId === shloka.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Sanskrit Devanagari & Action Buttons */}
                <div className="p-5 rounded-2xl bg-[#fdfcf9] border border-amber-200/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <pre className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#241711] leading-relaxed whitespace-pre-wrap">
                    {shloka.sanskrit}
                  </pre>

                  <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                    {/* Voice Recitation (स्वर पाठ) Button */}
                    <button
                      onClick={() => handleVoiceRecite(shloka)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold flex items-center space-x-1.5 transition ${
                        isSpeaking
                          ? 'bg-amber-600 text-white shadow-md animate-pulse'
                          : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                      }`}
                      title="श्लोक स्वर पाठ सुनें (Listen to Sanskrit Recitation)"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isSpeaking ? 'स्वर पाठ रोकें' : 'स्वर पाठ'}</span>
                    </button>

                    {/* Real Shloka Song / Video Play Button */}
                    <button
                      onClick={() => handlePlaySong(shloka)}
                      className={`px-4 py-2 rounded-xl text-xs font-serif font-bold flex items-center space-x-1.5 shadow-md transition transform hover:scale-105 ${
                        isSongActive
                          ? 'bg-[#ea580c] text-white shadow-orange-500/40 ring-2 ring-orange-400'
                          : 'bg-gradient-to-r from-[#ea580c] to-[#f97316] hover:from-[#c2410c] hover:to-[#ea580c] text-white'
                      }`}
                      title="श्लोक गान व वीडियो सुनें (Play Authentic Song & Chant)"
                    >
                      {isSongActive ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>गान चल रहा है</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 ml-0.5 fill-current" />
                          <span>श्लोक गान सुनें</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Transliteration */}
                <p className="text-xs text-stone-500 italic font-mono pl-1">
                  {shloka.transliteration}
                </p>

                {/* Translations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-1">
                    <span className="font-bold text-amber-800 text-[11px] uppercase tracking-wide font-serif">
                      हिन्दी अनुवाद (Hindi Meaning)
                    </span>
                    <p className="text-stone-800 font-serif leading-relaxed text-sm">
                      {shloka.hindi}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/60 space-y-1">
                    <span className="font-bold text-stone-700 text-[11px] uppercase tracking-wide font-serif">
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
                    className="inline-flex items-center space-x-1 text-xs text-amber-700 hover:text-amber-800 font-semibold hover:underline font-serif"
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

      {/* Active Shloka Song Player Modal */}
      {activeSongShloka && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1a1411] text-white rounded-3xl border border-amber-500/40 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Player Header */}
            <div className="px-6 py-4 border-b border-amber-950/60 bg-[#241711] flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-serif">
                    {activeSongShloka.source}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white">
                  {activeSongShloka.chapterVerse}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={`https://www.youtube.com/watch?v=${activeSongShloka.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-xs font-serif font-bold transition shadow-sm"
                  title="Watch directly on YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>यूट्यूब पर देखें</span>
                </a>
                <button
                  onClick={() => setActiveSongShloka(null)}
                  className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video / Audio Embed with Autoplay */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeSongShloka.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={activeSongShloka.source}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Shloka Text & Meaning in Player */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-[#19100c]">
              <div className="p-4 rounded-2xl bg-[#241711] border border-amber-500/20">
                <span className="text-[11px] uppercase tracking-wider text-amber-400/80 font-serif block mb-1">
                  मूल संस्कृत श्लोक (Sanskrit Shloka)
                </span>
                <pre className="font-serif text-lg sm:text-xl font-bold text-amber-100 whitespace-pre-wrap leading-relaxed">
                  {activeSongShloka.sanskrit}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800">
                  <span className="text-amber-300 font-bold block mb-1 font-serif">हिन्दी भावार्थ:</span>
                  <p className="text-stone-300 font-serif leading-relaxed">
                    {activeSongShloka.hindi}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800">
                  <span className="text-stone-300 font-bold block mb-1 font-serif">English Translation:</span>
                  <p className="text-stone-400 font-serif leading-relaxed">
                    {activeSongShloka.english}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'सनातन पावन श्लोक संग्रह - SanatanRoop Sacred Shlokas',
            description:
              'श्रीमद्भगवद्गीता, उपनिषद, वेद एवं स्तोत्रों के अमर श्लोक, संस्कृत मूल पाठ, अन्वय एवं हिंदी-अंग्रेजी भावार्थ सहित।',
            url: 'https://sanatanroop.com/shlokas',
            itemListElement: allShlokas.map((shloka, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              item: {
                '@type': 'CreativeWork',
                name: `${shloka.source} ${shloka.chapterVerse}`,
                text: shloka.sanskrit,
                description: shloka.hindi,
                inLanguage: ['sa', 'hi', 'en'],
                genre: 'Vedic Scripture / Sanskrit Shloka',
                url: `https://sanatanroop.com/shlokas#${shloka.id}`,
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
                name: 'पवित्र श्लोक (Shlokas)',
                item: 'https://sanatanroop.com/shlokas',
              },
            ],
          }),
        }}
      />
    </div>
  );
}

