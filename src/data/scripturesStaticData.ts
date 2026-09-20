export interface StaticVerse {
  id: string;
  verseNumber: number;
  sanskritText: string;
  transliteration: string;
  wordByWord?: Record<string, string>;
  translationHi: string;
  translationEn: string;
  commentary?: string;
}

export interface StaticChapter {
  id: string;
  chapterNumber: number;
  titleHi: string;
  titleEn: string;
  summaryHi: string;
  summaryEn: string;
  verses: StaticVerse[];
}

export interface StaticScripture {
  id: string;
  slug: string;
  titleHi: string;
  titleEn: string;
  author: string;
  category: string;
  descriptionHi: string;
  descriptionEn: string;
  totalVerses: number;
  totalChapters: number;
  chapters: StaticChapter[];
}

export const SCRIPTURES_STATIC_DATA: Record<string, StaticScripture> = {
  'bhagavad-gita': {
    id: 'sc-gita',
    slug: 'bhagavad-gita',
    titleHi: 'श्रीमद्भगवद्गीता',
    titleEn: 'Shrimad Bhagavad Gita',
    author: 'महर्षि वेदव्यास / भगवान श्री कृष्ण',
    category: 'स्मृति एवं इतिहास',
    descriptionHi:
      'महाभारत के भीष्म पर्व का वह परम पावन अंश जिसमें योगेश्वर श्री कृष्ण ने कुरुक्षेत्र के रणक्षेत्र में धनुर्धर अर्जुन को कर्म, ज्ञान और भक्तियोग का शाश्वत अमर ज्ञान प्रदान किया।',
    descriptionEn:
      'The timeless 700-verse spiritual masterwork spoken by Lord Krishna to warrior Arjuna on the battlefield of Kurukshetra, illuminating the pathways of Nishkama Karma, Jnana, and Bhakti.',
    totalVerses: 700,
    totalChapters: 18,
    chapters: [
      {
        id: 'gita-ch-1',
        chapterNumber: 1,
        titleHi: 'प्रथम अध्याय: अर्जुनविषादयोग',
        titleEn: 'Chapter 1: Arjuna Vishada Yoga',
        summaryHi: 'कुरुक्षेत्र के मैदान में दोनों सेनाओं का निरीक्षण और अपने बंधु-बांधवों को देखकर अर्जुन के मन में उत्पन्न मोह और विषाद का वर्णन।',
        summaryEn: 'The distress of Arjuna as he surveys the opposing armies comprising his relatives, elders, and teachers.',
        verses: [
          {
            id: 'gita-1-1',
            verseNumber: 1,
            sanskritText: 'धृतराष्ट्र उवाच\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥',
            transliteration: 'dhṛtarāṣṭra uvāca\ndharmakṣetre kurukṣetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāścaiva kimakurvata sañjaya',
            translationHi: 'धृतराष्ट्र ने पूछा: हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे और पाण्डु के पुत्रों ने क्या किया?',
            translationEn: 'Dhritarashtra said: O Sanjaya, assembled on the holy plain of Kurukshetra and eager to fight, what did my sons and the sons of Pandu do?',
            commentary: 'कुरुक्षेत्र को धर्मक्षेत्र कहा गया है क्योंकि यहाँ किया गया प्रत्येक कर्म धर्म की कसौटी पर परखा जाता है। धृतराष्ट्र का प्रश्न उनके भीतर के संशय और पक्षपात को उजागर करता है।',
          },
          {
            id: 'gita-1-47',
            verseNumber: 47,
            sanskritText: 'सञ्जय उवाच\nएवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत् ।\nविसृज्य सशरं चापं शोकसंविग्नमानसः ॥',
            transliteration: 'sañjaya uvāca\nevam uktvārjunaḥ saṅkhye rathopastha upāviśat\nvisṛjya sa-śaraṁ cāpaṁ śoka-saṁvigna-mānasaḥ',
            translationHi: 'संजय ने कहा: रणभूमि में इस प्रकार कहकर शोकमग्न मन वाले अर्जुन बाण सहित धनुष को त्यागकर रथ के पिछले भाग में बैठ गए।',
            translationEn: 'Sanjaya said: Having spoken thus on the battlefield, Arjuna cast aside his bow and arrow and sat down on the chariot, his mind overwhelmed with grief.',
            commentary: 'अर्जुन का यह विषाद सांसारिक कमजोरी नहीं, बल्कि आत्म-मंथन की वह अवस्था है जहाँ से दिव्य ज्ञान की पिपासा जागृत होती है।',
          },
        ],
      },
      {
        id: 'gita-ch-2',
        chapterNumber: 2,
        titleHi: 'द्वितीय अध्याय: सांख्ययोग',
        titleEn: 'Chapter 2: Sankhya Yoga',
        summaryHi: 'आत्मा की अमरता, निष्काम कर्मयोग का सिद्धांत और स्थितप्रज्ञ मुनि के लक्षण। गीता का संपूर्ण सार इस अध्याय में समाहित है।',
        summaryEn: 'The immortality of the soul, the core principle of selfless action (Nishkama Karma), and the characteristics of a self-realized sage (Sthitaprajna).',
        verses: [
          {
            id: 'gita-2-20',
            verseNumber: 20,
            sanskritText: 'न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः ।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे ॥',
            transliteration: 'na jāyate mriyate vā kadācin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ\najo nityaḥ śāśvato ’yaṁ purāṇo\nna hanyate hanyamāne śarīre',
            translationHi: 'यह आत्मा न कभी जन्म लेती है और न कभी मरती है। यह न उत्पन्न होकर फिर कभी अभाव को प्राप्त होने वाली है। यह अजन्मा, नित्य, सनातन और पुरातन है; शरीर के नष्ट होने पर भी इसका नाश नहीं होता।',
            translationEn: 'The soul is neither born, nor does it ever die; nor having once existed, does it ever cease to be. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.',
            commentary: 'भगवान श्री कृष्ण यहाँ आत्मा के शाश्वत सत्य को स्पष्ट करते हुए अर्जुन के मृत्यु के भय का समूल नाश करते हैं।',
          },
          {
            id: 'gita-2-47',
            verseNumber: 47,
            sanskritText: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
            transliteration: 'karmaṇy-evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo ’stv akarmaṇi',
            translationHi: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए तुम कर्मफल के हेतु मत बनो और न ही तुम्हारी आसक्ति अकर्म (कर्म न करने) में हो।',
            translationEn: 'You have a right only to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results of your activities, nor be attached to inaction.',
            commentary: 'यह श्लोक कर्मयोग का महावाक्य है। फल की चिंता मानसिक अशांति का कारण बनती है, जबकि निष्काम भाव से किया गया कर्म चित्त शुद्धि और मुक्ति प्रदान करता है।',
          },
          {
            id: 'gita-2-71',
            verseNumber: 71,
            sanskritText: 'विहाय कामान्यः सर्वान्पुमांश्चरति निःस्पृहः ।\nनिर्ममो निरहङ्कारः स शान्तिमधिगच्छति ॥',
            transliteration: 'vihāya kāmān yaḥ sarvān pumāṁś carati niḥspṛhaḥ\nnirmamo nirahaṅkāraḥ sa śāntim adhigacchati',
            translationHi: 'जो मनुष्य संपूर्ण कामनाओं को त्यागकर ममतारहित, अहंकाररहित और स्पृहारहित होकर आचरण करता है, वही परम शांति को प्राप्त होता है।',
            translationEn: 'A person who has given up all desires for sense gratification, who lives free from desires, who has given up all sense of proprietorship and is devoid of false ego—he alone attains real peace.',
            commentary: 'स्थितप्रज्ञ की यह परिभाषा बताती है कि सच्ची शांति बाह्य परिस्थितियों में नहीं, बल्कि आंतरिक वासनाओं के शमन में है।',
          },
        ],
      },
      {
        id: 'gita-ch-3',
        chapterNumber: 3,
        titleHi: 'तृतीय अध्याय: कर्मयोग',
        titleEn: 'Chapter 3: Karma Yoga',
        summaryHi: 'यज्ञ की उत्पत्ति, लोकसंग्रह का सिद्धांत और श्रेष्ठ पुरुषों के आचरण का समाज पर प्रभाव।',
        summaryEn: 'The necessity of selfless action for cosmic balance, and the leadership responsibility of noble individuals in guiding society.',
        verses: [
          {
            id: 'gita-3-21',
            verseNumber: 21,
            sanskritText: 'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः ।\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते ॥',
            transliteration: 'yad yad ācarati śreṣṭhas tat tad evetaro janaḥ\nsa yat pramāṇaṁ kurute lokas tad anuvartate',
            translationHi: 'श्रेष्ठ पुरुष जो-जो आचरण करता है, अन्य मनुष्य भी वैसा ही आचरण करते हैं। वह जो कुछ प्रमाण प्रस्तुत कर देता है, सारा संसार उसी का अनुसरण करता है।',
            translationEn: 'Whatever action a great man performs, common men follow. And whatever standards he sets by exemplary acts, all the world pursues.',
            commentary: 'सच्चे नेतृत्व का मूल मंत्र चरित्र और आचरण है। समाज सिद्धांतों से नहीं, नेताओं के क्रियात्मक उदाहरण से सीखता है।',
          },
        ],
      },
      {
        id: 'gita-ch-4',
        chapterNumber: 4,
        titleHi: 'चतुर्थ अध्याय: ज्ञानकर्मसंन्यासयोग',
        titleEn: 'Chapter 4: Jnana Karma Sannyasa Yoga',
        summaryHi: 'परमात्मा के दिव्य अवतार का रहस्य, कर्म में अकर्म की स्थिति और ज्ञानरूपी अग्नि द्वारा समस्त पापों का दहन।',
        summaryEn: 'The mystery of divine incarnation, transcendent action, and the purifying fire of spiritual wisdom.',
        verses: [
          {
            id: 'gita-4-7',
            verseNumber: 7,
            sanskritText: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥',
            transliteration: 'yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham',
            translationHi: 'हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं स्वयं अपने रूप को प्रकट करता हूँ।',
            translationEn: 'Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I manifest Myself.',
            commentary: 'सृष्टि के संतुलन और सत्य की पुनर्प्रतिष्ठा के लिए ईश्वर का सगुण साकार रूप में अवतरण सनातन आस्था का केंद्रीय स्तम्भ है।',
          },
          {
            id: 'gita-4-8',
            verseNumber: 8,
            sanskritText: 'परित्राणाय साधूनां विनाशाय च दुष्कृताम् ।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥',
            transliteration: 'paritrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge',
            translationHi: 'साधु पुरुषों के उद्धार, पापकर्मियों के विनाश और धर्म की भली-भांति स्थापना के लिए मैं युग-युग में प्रकट होता हूँ।',
            translationEn: 'To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of righteousness, I appear millennium after millennium.',
            commentary: 'ईश्वरीय अवतार का त्रिविध उद्देश्य: संतों की रक्षा, दुष्टों का संहार और धर्म की स्थापना।',
          },
        ],
      },
      {
        id: 'gita-ch-9',
        chapterNumber: 9,
        titleHi: 'नवम अध्याय: राजविद्याराजगुह्ययोग',
        titleEn: 'Chapter 9: Raja Vidya Guhya Yoga',
        summaryHi: 'सर्वोच्च गोपनीय आध्यात्मिक ज्ञान, प्रकृति और परमात्मा का सम्बन्ध, और अनन्य भक्ति की महिमा।',
        summaryEn: 'The sovereign science and secret wisdom, highlighting the supreme grace of single-minded devotion.',
        verses: [
          {
            id: 'gita-9-22',
            verseNumber: 22,
            sanskritText: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते ।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥',
            transliteration: 'ananyāś cintayanto māṁ ye janāḥ paryupāsate\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham',
            translationHi: 'जो अनन्य भक्त केवल मेरा ही चिंतन करते हुए निष्काम भाव से मेरी उपासना करते हैं, उन नित्य युक्त भक्तों के योग (अप्राप्त की प्राप्ति) और क्षेम (प्राप्त की रक्षा) का वहन मैं स्वयं करता हूँ।',
            translationEn: 'To those who are constantly devoted and who worship Me with unswerving love, I provide what they lack and preserve what they have.',
            commentary: 'भगवान का यह अमर वचन शरणागति के महात्म्य को दर्शाता है। जो पूर्णतः परमात्मा पर आश्रित हो जाता है, उसकी समस्त आवश्यकताओं का भार ईश्वर स्वयं वहन करते हैं।',
          },
          {
            id: 'gita-9-26',
            verseNumber: 26,
            sanskritText: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति ।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥',
            transliteration: 'patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ',
            translationHi: 'जो कोई भक्त मेरे लिए प्रेमपूर्वक एक पत्ता, फूल, फल अथवा जल भी अर्पित करता है, उस शुद्ध मन वाले निष्काम भक्त के द्वारा प्रेम से भेंट किए गए उस उपहार को मैं स्वीकार करता हूँ।',
            translationEn: 'Whoever offers Me with devotion a leaf, a flower, a fruit, or even water—that offering of love from a pure-hearted devotee I affectionately accept.',
            commentary: 'पूजा में वस्तु का मूल्य नहीं, बल्कि हृदय के भाव और निष्कपट प्रेम की प्रधानता होती है।',
          },
        ],
      },
      {
        id: 'gita-ch-18',
        chapterNumber: 18,
        titleHi: 'अष्टादश अध्याय: मोक्षसंन्यासयोग',
        titleEn: 'Chapter 18: Moksha Sannyasa Yoga',
        summaryHi: 'त्याग और संन्यास का यथार्थ भेद, अठारह अध्यायों का उपसंहार और भगवान का चरम संदेश—सर्वधर्मान्परित्यज्य।',
        summaryEn: 'The ultimate synthesis of renunciation, duty, and complete surrender unto the Supreme Divine.',
        verses: [
          {
            id: 'gita-18-65',
            verseNumber: 65,
            sanskritText: 'मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु ।\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे ॥',
            transliteration: 'man-manā bhava mad-bhakto mad-yājī māṁ namaskuru\nmām evaiṣyasi satyaṁ te pratijāne priyo ’si me',
            translationHi: 'मुझमें मन लगाने वाला हो, मेरा भक्त बन, मेरा पूजन कर और मुझे ही नमस्कार कर। ऐसा करने पर तू निश्चित रूप से मुझे ही प्राप्त होगा—यह मेरा सत्य प्रतिज्ञा है, क्योंकि तू मेरा अत्यंत प्रिय सखा है।',
            translationEn: 'Fix your mind on Me, be devoted to Me, worship Me, and offer obeisance unto Me. In this way, you will certainly come to Me. I promise you this truly, for you are very dear to Me.',
            commentary: 'भगवान का यह प्रत्यक्ष आश्वासन जीव को समस्त सांसारिक भयों से मुक्त कर परम अभय प्रदान करता है।',
          },
          {
            id: 'gita-18-66',
            verseNumber: 66,
            sanskritText: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥',
            transliteration: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ',
            translationHi: 'समस्त धर्मों (विधियों, बंधनों और चिंताओं) को मुझमें समर्पित करके केवल मेरी ही शरण में आ जाओ। मैं तुम्हें समस्त पापों से मुक्त कर दूंगा, शोक मत करो।',
            translationEn: 'Abandon all varieties of dharmas and simply surrender unto Me alone. I shall liberate you from all sinful reactions. Do not grieve.',
            commentary: 'यह भगवद्गीता का चरम उपदेश (चरम श्लोक) है। पूर्ण शरणागति ही मुक्ति का सबसे सहज और सर्वोच्च सोपान है।',
          },
        ],
      },
    ],
  },
  'ramcharitmanas': {
    id: 'sc-ramcharitmanas',
    slug: 'ramcharitmanas',
    titleHi: 'श्रीरामचरितमानस',
    titleEn: 'Shri Ramcharitmanas',
    author: 'गोस्वामी तुलसीदास जी',
    category: 'इतिहास एवं भक्ति काव्य',
    descriptionHi:
      'अवधी भाषा में गोस्वामी तुलसीदास जी द्वारा रचित मर्यादा पुरुषोत्तम भगवान श्री राम के जीवन का परम पावन चरित्र, जिसमें सात काण्डों में धर्म, मर्यादा, और भक्ति का अनुपम दर्शन कराया गया है।',
    descriptionEn:
      'The sacred epic poem composed in Awadhi by Goswami Tulsidas narrating the divine life, righteous conduct, and profound surrender unto Lord Rama across seven Kaands.',
    totalVerses: 1073,
    totalChapters: 7,
    chapters: [
      {
        id: 'rcm-ch-1',
        chapterNumber: 1,
        titleHi: 'प्रथम सोपान: बालकाण्ड (मंगलाचरण एवं वंदना)',
        titleEn: 'Kaand 1: Bal Kaand (Invocation & Prologue)',
        summaryHi: 'वर्ण, अर्थ, रस और छंदों की देवी सरस्वती और विघ्नहर्ता गणेश जी की वंदना तथा गुरु पद रज की महिमा।',
        summaryEn: 'The auspicious invocation to Goddess Saraswati, Lord Ganesha, Lord Shiva, and the purifying lotus feet of the Guru.',
        verses: [
          {
            id: 'rcm-1-1',
            verseNumber: 1,
            sanskritText: 'वर्णानामर्थसंघानां रसानां छन्दसामपि ।\nमङ्गलानां च कर्त्तारौ वन्दे वाणीविनायकौ ॥',
            transliteration: 'varṇānām artha-saṅghānāṁ rasānāṁ chandasām api\nmaṅgalānāṁ ca karttārau vande vāṇī-vināyakau',
            translationHi: 'अक्षरों, अर्थ-समूहों, रसों, छन्दों और मंगलों को करने वाली वाणी (सरस्वती जी) और विनायक (गणेश जी) की मैं वंदना करता हूँ।',
            translationEn: 'I bow to Goddess Saraswati and Lord Ganesha, the authors of letters, meanings, sentiments, metres, and all auspiciousness.',
            commentary: 'श्रीरामचरितमानस का प्रारंभ वाणी और बुद्धि के अधिष्ठाता देवों की वंदना से होता है, जिससे ग्रंथ निर्विघ्न संपन्न हो।',
          },
          {
            id: 'rcm-1-2',
            verseNumber: 2,
            sanskritText: 'भवानीशङ्करौ वन्दे श्रद्धाविश्वासरूपिणौ ।\nयाभ्यां विना न पश्यन्ति सिद्धाः स्वान्तःस्थमीश्वरम् ॥',
            transliteration: 'bhavānī-śaṅkarau vande śraddhā-viśvāsa-rūpiṇau\nyābhyāṁ vinā na paśyanti siddhāḥ svāntaḥ-stham īśvaram',
            translationHi: 'श्रद्धा और विश्वास के स्वरूप पार्वती जी और भगवान शंकर की मैं वंदना करता हूँ, जिनके बिना सिद्धजन भी अपने अंतःकरण में स्थित ईश्वर को नहीं देख पाते।',
            translationEn: 'I venerate Bhavani and Shankara, the personifications of faith and trust, without whom even the perfected sages cannot perceive God abiding within their own hearts.',
            commentary: 'पार्वती जी श्रद्धा की मूर्ति हैं और शंकर जी विश्वास के। श्रद्धा और विश्वास के बिना अंतर में परमात्मा का साक्षात्कार असंभव है।',
          },
        ],
      },
      {
        id: 'rcm-ch-5',
        chapterNumber: 5,
        titleHi: 'पंचम सोपान: सुंदरकाण्ड (हनुमान जी की समुद्र लंघन व लंका विजय)',
        titleEn: 'Kaand 5: Sundar Kaand (Hanuman Ji in Lanka)',
        summaryHi: 'जाम्बवंत के स्मरण कराने पर हनुमान जी का विशाल रूप धारण करना, समुद्र लंघन, माता सीता की खोज और लंका दहन।',
        summaryEn: 'Hanuman awakens to his divine strength, crosses the ocean, reassures Mother Sita in Ashoka Vatika, and sets Lanka ablaze.',
        verses: [
          {
            id: 'rcm-5-1',
            verseNumber: 1,
            sanskritText: 'शान्तं शाश्वतमप्रमेयमनघं निर्वाणशान्तिप्रदं\nब्रह्माशम्भुफणीन्द्रसेव्यमनिशं वेदान्तवेद्यं विभुम् ।\nरामाख्यं जगदीश्वरं सुरगुरुं मायामनुष्यं हरिं\nवन्देऽहं करुणाकरं रघुवरं भूपालचूडामणिम् ॥',
            transliteration: 'śāntaṁ śāśvatam aprameyam anaghaṁ nirvāṇa-śānti-pradaṁ\nbrahmā-śambhu-phaṇīndra-sevyam aniśaṁ vedānta-vedyaṁ vibhum\nrāmākhyaṁ jagad-īśvaraṁ sura-guruṁ māyā-manuṣyaṁ hariṁ\nvande ’haṁ karuṇākaraṁ raghu-varaṁ bhūpāla-cūḍāmaṇim',
            translationHi: 'शांत, सनातन, अप्रमेय, निष्पाप, मोक्षरूप परम शांति देने वाले, ब्रह्मा, शम्भु और शेषनाग द्वारा नित्य सेवित, वेदान्त द्वारा जानने योग्य, माया से मनुष्य रूप धारण करने वाले, करुणा की खान, राजाओं के मुकुटमणि श्री राम को मैं नमस्कार करता हूँ।',
            translationEn: 'I adore Lord Rama, the crest-jewel of kings, who is peaceful, eternal, boundless, sinless, the bestower of supreme liberation, worshiped unceasingly by Brahma, Shiva, and Shesha.',
            commentary: 'सुंदरकाण्ड का यह मंगलाचरण भगवान श्री राम के निर्गुण और सगुण दोनों स्वरूपों की अनुपम स्तुति है।',
          },
          {
            id: 'rcm-5-chaupai',
            verseNumber: 2,
            sanskritText: 'कवन सो काज कठिन जग माहीं । जो नहिं तात होत तुम्ह पाहीं ॥\nराम काज लगि तव अवतारा । सुनतहिं भयउ पर्बताकारा ॥',
            transliteration: 'kavana so kāja kaṭhina jaga māhīṁ, jo nahiṁ tāta hota tumha pāhīṁ\nrāma kāja lagi tava avatārā, sunatahiṁ bhayau parbatākārā',
            translationHi: 'जाम्बवंत जी ने कहा: हे तात! इस संसार में ऐसा कौन सा कठिन काम है जो आपसे न हो सके? आपका अवतार तो श्री राम जी के कार्यों की सिद्धि के लिए ही हुआ है! यह सुनते ही हनुमान जी पर्वत के समान विशालकाय हो गए।',
            translationEn: 'Jambavan said: What difficult task is there in this world, dear friend, that cannot be accomplished by you? Your very incarnation is for Lord Rama’s mission! Hearing this, Hanuman expanded into the likeness of a mountain.',
            commentary: 'यह चौपाई साधक के भीतर सोई हुई असीम आत्म-शक्ति को जगाने का परम मंत्र है।',
          },
        ],
      },
    ],
  },
  'isha-upanishad': {
    id: 'sc-isha',
    slug: 'isha-upanishad',
    titleHi: 'ईशावास्योपनिषद्',
    titleEn: 'Ishavasya Upanishad',
    author: 'शुक्ल यजुर्वेद (वाजसनेयि)',
    category: 'श्रुति एवं उपनिषद',
    descriptionHi:
      'शुक्ल यजुर्वेद का चालीसवां पावन अध्याय, जिसमें ज्ञान, कर्म और त्यागपूर्वक उपभोग के सामंजस्य का सर्वोच्च वेदान्त सूत्र उद्घाटित हुआ है।',
    descriptionEn:
      'The foundational 18-mantra Upanishad from the Shukla Yajurveda declaring that the Divine permeates every particle of existence, advocating enjoyment through renunciation.',
    totalVerses: 18,
    totalChapters: 1,
    chapters: [
      {
        id: 'isha-ch-1',
        chapterNumber: 1,
        titleHi: 'ईशावास्य सम्पूर्ण उपनिषद् (१८ मंत्र)',
        titleEn: 'Ishavasya Complete Upanishad (18 Mantras)',
        summaryHi: 'शांति पाठ, त्यागपूर्वक उपभोग का सूत्र, आत्मज्ञान की महिमा, और अंत समय की दिव्य प्रार्थना।',
        summaryEn: 'The peace chant, the doctrine of detachment, and the prayer to Surya and Agni at the moment of dissolution.',
        verses: [
          {
            id: 'isha-v-0',
            verseNumber: 0,
            sanskritText: 'ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥\nॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration: 'oṁ pūrṇam adaḥ pūrṇam idaṁ pūrṇāt pūrṇam udacyate\npūrṇasya pūrṇam ādāya pūrṇam evāvaśiṣyate\noṁ śāntiḥ śāntiḥ śāntiḥ',
            translationHi: 'वह (परब्रह्म) पूर्ण है, यह (सृष्टि) भी पूर्ण है। पूर्ण से ही पूर्ण की उत्पत्ति होती है। पूर्ण में से पूर्ण को निकाल लेने पर भी पूर्ण ही शेष रहता है।',
            translationEn: 'That is Whole, this is Whole. From the Whole, the Whole emanates. Taking away the Whole from the Whole, the Whole alone remains. Om Peace, Peace, Peace.',
            commentary: 'यह वेदान्त का विस्मयकारी गणित है—अनंत में से अनंत घटाने पर भी अनंत ही बचता है। परमात्मा अखंड और अविकारी हैं।',
          },
          {
            id: 'isha-v-1',
            verseNumber: 1,
            sanskritText: 'ॐ ईशा वास्यमिदꣳ सर्वं यत्किञ्च जगत्यां जगत् ।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥ १ ॥',
            transliteration: 'oṁ īśā vāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam || 1 ||',
            translationHi: 'इस परिवर्तनशील संसार में जो कुछ भी चराचर जगत है, वह सब ईश्वर से व्याप्त है। अतः त्यागभाव से इसका उपभोग करो; किसी के धन की लालसा मत करो।',
            translationEn: 'All this, whatsoever moves in this moving world, is enveloped by God. Therefore, find your enjoyment in renunciation; do not covet anyone’s wealth.',
            commentary: 'ईशावास्योपनिषद् का यह प्रथम मंत्र मानव जीवन के जीने की सर्वोच्च कला सिखाता है—अनासक्ति पूर्वक कर्तव्य निर्वाह।',
          },
          {
            id: 'isha-v-2',
            verseNumber: 2,
            sanskritText: 'कुर्वन्नेवेह कर्माणि जिजीविषेच्छतं समाः ।\nएवं त्वयि नान्यथेतोऽस्ति न कर्म लिप्यते नरे ॥ २ ॥',
            transliteration: 'kurvann eveha karmāṇi jijīviṣec chataṁ samāḥ\nevaṁ tvayi nānyatheto ’sti na karma lipyate nare || 2 ||',
            translationHi: 'इस संसार में शास्त्रविहित निष्काम कर्म करते हुए ही सौ वर्ष जीने की इच्छा करनी चाहिए। तुम्हारे लिए इससे भिन्न कोई मार्ग नहीं है, जिससे कर्म मनुष्य में लिप्त न हों।',
            translationEn: 'Performing prescribed works in this world, one should wish to live a hundred years. Thus it is for you, not otherwise; works do not cling to a man who acts without desire.',
            commentary: 'कर्म से भागना संन्यास नहीं, बल्कि फल की इच्छा त्यागकर निष्काम कर्म करना ही सच्चा संन्यास है।',
          },
          {
            id: 'isha-v-6',
            verseNumber: 6,
            sanskritText: 'यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति ।\nसर्वभूतेषु चात्मानं ततो न विजुगुप्सते ॥ ६ ॥',
            transliteration: 'yas tu sarvāṇi bhūtāny ātmany evānupaśyati\nsarva-bhūteṣu cātmānaṁ tato na vijugupsate || 6 ||',
            translationHi: 'जो मनुष्य संपूर्ण प्राणियों को अपनी आत्मा में ही देखता है और संपूर्ण प्राणियों में अपनी आत्मा को देखता है, वह किसी से घृणा नहीं करता।',
            translationEn: 'He who sees all beings in the Self, and the Self in all beings, feels no hatred by virtue of that realization.',
            commentary: 'सच्चा अद्वैत बोध समस्त भेदभाव और घृणा को समाप्त कर सार्वभौमिक प्रेम और करुणा को जन्म देता है।',
          },
        ],
      },
    ],
  },
  'katha-upanishad': {
    id: 'sc-katha',
    slug: 'katha-upanishad',
    titleHi: 'कठोपनिषद्',
    titleEn: 'Katha Upanishad',
    author: 'कृष्ण यजुर्वेद (कठ शाखा)',
    category: 'श्रुति एवं उपनिषद',
    descriptionHi:
      'बालक नचिकेता और मृत्यु के देवता यमराज के मध्य अमर आत्मा, श्रेयस-प्रेयस और आत्मज्ञान का अत्यंत रोमांचक एवं गूढ़ दार्शनिक संवाद।',
    descriptionEn:
      'The legendary dialogue between young seeker Nachiketa and Yamaraja (the Lord of Death) revealing the immortality of the Atman, the distinction between Shreyas and Preyas, and the razor-sharp path of Self-realization.',
    totalVerses: 119,
    totalChapters: 2,
    chapters: [
      {
        id: 'katha-ch-1',
        chapterNumber: 1,
        titleHi: 'प्रथम अध्याय: श्रेयस और प्रेयस का भेद',
        titleEn: 'Chapter 1: The Choice of Shreyas vs Preyas',
        summaryHi: 'यमराज द्वारा नचिकेता को सांसारिक प्रलोभनों की निःसारता और कल्याणकारी मार्ग (श्रेयस) की श्रेष्ठता का प्रतिपादन।',
        summaryEn: 'Yamaraja tests Nachiketa with worldly riches and explains why the wise choose the path of eternal good over transient pleasure.',
        verses: [
          {
            id: 'katha-1-2-1',
            verseNumber: 1,
            sanskritText: 'अन्यच्छ्रेयोऽन्यदुतैव प्रेयस्ते उभे नानार्थे पुरुषꣳ सिनीतः ।\nतयोः श्रेय आददानस्य साधु भवति हीयतेऽर्थाद्य उ प्रेयो वृणीते ॥',
            transliteration: 'anyac chreyo ’nyad utaiva preyas te ubhe nānārthe puruṣaṁ sinītaḥ\ntayoḥ śreya ādadānasya sādhu bhavati hīyate ’rthād ya u preyo vrṇīte',
            translationHi: 'यमराज ने कहा: कल्याणकारी (श्रेयस) मार्ग अलग है और प्रिय लगने वाला (प्रेयस) मार्ग अलग है। ये दोनों भिन्न-भिन्न प्रयोजनों वाले होकर मनुष्य को बांधते हैं। इनमें से जो श्रेयस को ग्रहण करता है, उसका कल्याण होता है; और जो केवल प्रेयस (क्षणिक सुख) को चुनता है, वह अपने वास्तविक लक्ष्य से भ्रष्ट हो जाता है।',
            translationEn: 'Yamaraja said: The good (Shreyas) is one thing; the pleasant (Preyas) is quite another. Both bind humans with different motives. Blessed is he who chooses the good; he who prefers the merely pleasant misses his true goal.',
            commentary: 'मानव जीवन का सबसे बड़ा धर्म संकट श्रेयस (जो आत्मा के लिए कल्याणकारी है) और प्रेयस (जो इंद्रियों को केवल क्षणिक सुख देता है) के चुनाव में है।',
          },
          {
            id: 'katha-1-3-14',
            verseNumber: 14,
            sanskritText: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।\nक्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ॥',
            transliteration: 'uttiṣṭhata jāgrata prāpya varān nibodhata\nkṣurasya dhārā niśitā duratyayā durgaṁ pathas tat kavayo vadanti',
            translationHi: 'उठो! जागो! और श्रेष्ठ ज्ञानियों के समीप जाकर आत्मज्ञान को प्राप्त करो। तत्ववेत्ता ऋषियों का कहना है कि आत्मज्ञान का यह मार्ग छुरे की तीक्ष्ण धार के समान अत्यंत दुर्गम और पार करने में कठिन है।',
            translationEn: 'Arise, awake, and learn by approaching the exalted teachers! The sharp edge of a razor is difficult to cross; thus the wise declare the path to Truth is arduous.',
            commentary: 'स्वामी विवेकानंद का यह प्रियतम सूत्र हर साधक को प्रमाद त्यागकर सतत पुरुषार्थ की प्रेरणा देता है।',
          },
        ],
      },
    ],
  },
  'mandukya-upanishad': {
    id: 'sc-mandukya',
    slug: 'mandukya-upanishad',
    titleHi: 'माण्डूक्योपनिषद्',
    titleEn: 'Mandukya Upanishad',
    author: 'अथर्ववेद',
    category: 'श्रुति एवं उपनिषद',
    descriptionHi:
      'अथर्ववेद की केवल १२ मंत्रों वाली यह लघु उपनिषद चेतना की चार अवस्थाओं (जाग्रत, स्वप्न, सुषुप्ति एवं तुरीय) और ॐकार के रहस्य का अचूक विश्लेषण करती है।',
    descriptionEn:
      'The concise 12-mantra masterpiece of the Atharvaveda expounding the four states of consciousness (waking, dreaming, deep sleep, and Turiya) through the sacred syllable AUM.',
    totalVerses: 12,
    totalChapters: 1,
    chapters: [
      {
        id: 'mandukya-ch-1',
        chapterNumber: 1,
        titleHi: 'माण्डूक्य सम्पूर्ण उपनिषद् (१२ मंत्र)',
        titleEn: 'Mandukya Complete Upanishad (12 Mantras)',
        summaryHi: 'ॐकार की तीन मात्राएं (अ, उ, म) और अमात्र तुरीय अवस्था का विशद दार्शनिक निरूपण।',
        summaryEn: 'The three phonetic elements of A-U-M corresponding to the three relative states, culminating in the transcendent fourth (Turiya).',
        verses: [
          {
            id: 'mandukya-v-1',
            verseNumber: 1,
            sanskritText: 'ॐ इत्येतदक्षरमिदꣳ सर्वं तस्योपव्याख्यानं भूतं भवद् भविष्यदिति सर्वमोङ्कार एव ।\nयच्चान्यत् त्रिकालातीतं तदप्योङ्कार एव ॥ १ ॥',
            transliteration: 'oṁ ity etad akṣaram idaṁ sarvaṁ tasyopavyākhyānaṁ bhūtaṁ bhavad bhaviṣyad iti sarvam oṅkāra eva\nyac cānyat trikālātītaṁ tad apy oṅkāra eva || 1 ||',
            translationHi: 'ॐ—यह अविनाशी अक्षर ही यह सब कुछ है। उसी का यह विशद व्याख्यान है: जो बीत चुका है, जो वर्तमान है और जो भविष्य में होगा, वह सब ॐकार ही है। और जो तीनों कालों से अतीत है, वह भी ॐकार ही है।',
            translationEn: 'OM—this imperishable syllable is all this. Its further explanation is: what was, what is, and what shall be, all is verily OM. And whatever else is beyond the three divisions of time, that too is verily OM.',
            commentary: 'समस्त ब्रह्मांडीय ध्वनि और चेतना ॐकार में ही समाहित है। समय, दिक् और कारणता की सीमाएं ॐ में विलीन हो जाती हैं।',
          },
          {
            id: 'mandukya-v-2',
            verseNumber: 2,
            sanskritText: 'सर्वं ह्येतद् ब्रह्मायमात्मा ब्रह्म सोऽयमात्मा चतुष्पात् ॥ २ ॥',
            transliteration: 'sarvaṁ hyetad brahmāyam ātmā brahma so ’yam ātmā catuṣpāt || 2 ||',
            translationHi: 'यह सब कुछ निश्चय ही ब्रह्म है। यह आत्मा भी ब्रह्म है। वह यह आत्मा चार पादों (अवस्थाओं) वाला है।',
            translationEn: 'All this is verily Brahman. This Self (Atman) is Brahman. That Self has four quarters (states of consciousness).',
            commentary: 'अयमात्मा ब्रह्म—यह उपनिषदों का प्रसिद्ध महावाक्य है, जो जीव और ब्रह्म की तात्विक एकता को सिद्ध करता है।',
          },
          {
            id: 'mandukya-v-7',
            verseNumber: 7,
            sanskritText: 'नान्तप्रज्ञं न बहिष्प्रज्ञं नोभयतःप्रज्ञं न प्रज्ञानघनं न प्रज्ञं नाप्रज्ञम् ।\nअदृष्टमव्यवहार्यमग्राह्यमलक्षणमचिन्त्यमव्यपदेश्यमेकात्मप्रत्ययसारं प्रपञ्चोपशमं शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः ॥ ७ ॥',
            transliteration: 'nāntaḥ-prajñaṁ na bahiṣ-prajñaṁ nobhayataḥ-prajñaṁ na prajñāna-ghanaṁ na prajñaṁ nāprajñam\nadṛṣṭam avyavahāryam agrāhyam alakṣaṇam acintyam avyapadeśyam ekātma-pratyaya-sāraṁ prapañcopaśamaṁ śāntaṁ śivam advaitaṁ caturthaṁ manyante sa ātmā sa vijñeyaḥ || 7 ||',
            translationHi: 'जो न अंतःप्रज्ञ है, न बहिष्प्रज्ञ है, न दोनों ओर प्रज्ञ है, न प्रज्ञानघन है, न जानने वाला है और न न-जानने वाला है। जो अदृश्य, अव्यवहार्य, अग्राह्य, लक्षणरहित, अचिन्त्य, अकथनीय, केवल एक आत्म-प्रतीति का सार, समस्त प्रपंचों से शांत, परम मंगलमय (शिव) और अद्वैत है—उसे चतुर्थ (तुरीय) मानते हैं। वही आत्मा है, वही जानने योग्य है।',
            translationEn: 'Neither internally conscious, nor externally conscious, neither having consciousness of both, nor a mass of consciousness; neither knowing, nor unknowing. Unseen, beyond empirical dealings, intangible, devoid of distinguishing marks, unthinkable, indescribable, the essence of the single conviction of the Self, the cessation of all phenomena, peaceful, auspicious, non-dual—such is considered the Fourth (Turiya). That is the Self, that is to be realized.',
            commentary: 'यह श्लोक वेदान्त दर्शन का शिखर है। तुरीय अवस्था जाग्रत, स्वप्न और सुषुप्ति तीनों की साक्षी और आधारभूत शुद्ध चेतना है।',
          },
        ],
      },
    ],
  },
  'rigveda-samhita': {
    id: 'sc-rigveda',
    slug: 'rigveda-samhita',
    titleHi: 'ऋग्वेद संहिता',
    titleEn: 'Rigveda Samhita',
    author: 'अनादि / अपौरुषेय (ब्रह्म ऋषि)',
    category: 'श्रुति एवं वेद',
    descriptionHi:
      'संसार का प्राचीनतम पवित्र ज्ञानकोश जिसमें प्रकृति के दिव्य स्वरूपों, अग्नि, इंद्र, वरुण, गायत्री मंत्र और सृष्टि उत्पत्ति (नासदीय सूक्त) का उदात्त गायन है।',
    descriptionEn:
      'The oldest monument of human wisdom containing 10,552 mantras across 10 Mandalas, preserving the original Vedic acoustic frequencies of cosmic harmony and devotion.',
    totalVerses: 10552,
    totalChapters: 10,
    chapters: [
      {
        id: 'rig-ch-1',
        chapterNumber: 1,
        titleHi: 'प्रथम मण्डल: अग्नि सूक्त (सूक्त १)',
        titleEn: 'Mandala 1: Agni Sukta (Hymn 1)',
        summaryHi: 'ऋग्वेद का प्रथम सूक्त, महर्षि मधुच्छन्दा वैश्वामित्र द्वारा दृष्ट, जिसमें अग्नि देव की पुरोहित एवं ज्ञानदाता के रूप में स्तुति है।',
        summaryEn: 'The opening hymn of the Rigveda invoking Agni, the divine priest and illuminator of cosmic order.',
        verses: [
          {
            id: 'rig-1-1-1',
            verseNumber: 1,
            sanskritText: 'ॐ अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ।\nहोतारं रत्नधातमम् ॥ १ ॥',
            transliteration: 'oṁ agnim īḷe purohitaṁ yajñasya devam ṛtvijam\nhotāraṁ ratnadhātamam || 1 ||',
            translationHi: 'मैं यज्ञ के पुरोहित, प्रकाशमान देव, ऋत्विज (समय पर यज्ञ कराने वाले), देवताओं का आह्वान करने वाले और अपार रत्नों (आध्यात्मिक सम्पदाओं) को धारण करने वाले अग्निदेव की स्तुति करता हूँ।',
            translationEn: 'I praise Agni, the chosen priest, god, minister of sacrifice, the invoker, the best bestower of treasures.',
            commentary: 'ऋग्वेद का यह प्रथम मंत्र अग्नि को भौतिक ज्वाला मात्र नहीं, बल्कि चेतना की वह प्रदीप्त अग्नि मानता है जो साधक के भीतर दिव्यता का संचार करती है।',
          },
        ],
      },
      {
        id: 'rig-ch-3',
        chapterNumber: 3,
        titleHi: 'तृतीय मण्डल: गायत्री महामंत्र (सूक्त ६२, मंत्र १०)',
        titleEn: 'Mandala 3: Gayatri Mahamantra (Sukta 62, Mantra 10)',
        summaryHi: 'महर्षि विश्वामित्र द्वारा अनुभूत परम पवित्र गायत्री महामंत्र, जो साधक की बुद्धि को दिव्य प्रकाश से आलोकित करता है।',
        summaryEn: 'The supreme Gayatri Mantra revealed through Sage Vishwamitra, praying for the illumination of intellect by the Divine Solar Consciousness.',
        verses: [
          {
            id: 'rig-3-62-10',
            verseNumber: 10,
            sanskritText: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
            transliteration: 'oṁ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṁ\nbhargo devasya dhīmahi dhiyo yo naḥ pracodayāt',
            translationHi: 'हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा (सविता) के ध्यान को धारण करते हैं, जो हमारी बुद्धि को सन्मार्ग पर प्रेरित करे।',
            translationEn: 'We meditate upon that adorable effulgence of the Divine Source (Savita); may that Supreme Light illuminate and inspire our intellects.',
            commentary: 'गायत्री मंत्र समस्त वेदों की माता है। यह केवल एक प्रार्थना नहीं, बल्कि चेतना के उच्चतम रूपांतरण का वैज्ञानिक ध्वनि-सूत्र है।',
          },
        ],
      },
      {
        id: 'rig-ch-10',
        chapterNumber: 10,
        titleHi: 'दशम मण्डल: नासदीय सूक्त (सूक्त १२९ - सृष्टि उत्पत्ति)',
        titleEn: 'Mandala 10: Nasadiya Sukta (Creation Hymn)',
        summaryHi: 'सृष्टि की उत्पत्ति से पूर्व की गूढ़ अवस्था का आश्चर्यजनक दार्शनिक अन्वेषण।',
        summaryEn: 'The profound Vedic contemplation on the origin of the cosmos before the emergence of existence and non-existence.',
        verses: [
          {
            id: 'rig-10-129-1',
            verseNumber: 1,
            sanskritText: 'नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् ।\nकिमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ॥ १ ॥',
            transliteration: 'nāsad āsīn no sad āsīt tadānīṁ nāsīd rajo no vyomā paro yat\nkim āvarīvaḥ kuha kasya śarmann ambhaḥ kim āsīd gahanaṁ gabhīram || 1 ||',
            translationHi: 'सृष्टि के पूर्व न असत (अभाव) था और न सत (भाव) था। न कोई लोक था, न उससे परे आकाश था। उस समय कौन किसको आच्छादित कर रहा था? कहाँ किसकी शरण में गहन और अथाह जल था?',
            translationEn: 'Then was not non-existence nor existence; there was no realm of air, no sky beyond it. What covered in, and where? And what gave shelter? Was water there, unfathomed depth of water?',
            commentary: 'नासदीय सूक्त आधुनिक कॉस्मोलॉजी (बिग बैंग) से भी आगे जाकर उस मूल तत्व की ओर संकेत करता है जो द्वंद्व और समय से परे है।',
          },
        ],
      },
    ],
  },
  'shrimad-bhagavatam': {
    id: 'sc-bhagavatam',
    slug: 'shrimad-bhagavatam',
    titleHi: 'श्रीमद्भागवत महापुराण',
    titleEn: 'Shrimad Bhagavatam',
    author: 'महर्षि वेदव्यास / श्री शुकदेव जी',
    category: 'महापुराण',
    descriptionHi:
      'निगम कल्पतरु का अमृतमय फल, जिसमें भगवान श्री कृष्ण की दिव्य लीलाओं, भक्ति योग, और राजा परीक्षित को दिए गए आत्मज्ञान का विशद वर्णन है।',
    descriptionEn:
      'The ripe nectarine fruit of the tree of Vedic knowledge, expounding pure devotional love (Prema Bhakti) and Self-realization narrated by Sage Shukadeva to King Parikshit.',
    totalVerses: 18000,
    totalChapters: 12,
    chapters: [
      {
        id: 'sb-ch-1',
        chapterNumber: 1,
        titleHi: 'प्रथम स्कंध: मंगलाचरण एवं भक्ति का स्वरूप',
        titleEn: 'Canto 1: The Inherent Nature of Pure Devotion',
        summaryHi: 'परम सत्य का ध्यान, श्रीमद्भागवत का आविर्भाव और निःस्वार्थ भक्ति की महिमा।',
        summaryEn: 'Meditation on the Absolute Truth and the supreme duty of human beings to cultivate unmotivated love for the Transcendent Lord.',
        verses: [
          {
            id: 'sb-1-1-1',
            verseNumber: 1,
            sanskritText: 'जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट्\nतेने ब्रह्म हृदा य आदिकवये मुह्यन्ति यत्सूरयः ।\nतेजोवारिमृदां यथा विनिमयो यत्र त्रिसर्गोऽमृषा\nधाम्ना स्वेन सदा निरस्तकुहकं सत्यं परं धीमहि ॥',
            transliteration: 'janmādy asya yato ’nvayād itarataś cārtheṣv abhijñaḥ sva-rāṭ\ntene brahma hṛdā ya ādi-kavaye muhyanti yat sūrayaḥ\ntejo-vāri-mṛdāṁ yathā vinimayo yatra tri-sargo ’mṛṣā\ndhāmnā svena sadā nirasta-kuhakaṁ satyaṁ paraṁ dhīmahi',
            translationHi: 'जिनसे इस जगत की सृष्टि, स्थिति और प्रलय होते हैं; जो समस्त पदार्थों में अन्वय और व्यतिरेक रूप से स्थित हैं; जो पूर्ण रूप से स्वराट् (स्वतंत्र) हैं; जिन्होंने आदि कवि ब्रह्मा के हृदय में वेदज्ञान का विस्तार किया; जिनके विषय में बड़े-बड़े मुनि भी मोहित हो जाते हैं; जिन परमात्मा में त्रिगुणमयी सृष्टि सत्य प्रतीत होती है—उन माया से रहित परम सत्य स्वरूप भगवान का हम ध्यान करते हैं।',
            translationEn: 'We meditate upon Him, the Supreme Truth, from whom proceeds the creation, preservation, and dissolution of the universe, who is directly and indirectly cognizant of all manifestations, independent, and who imparted Vedic knowledge into the heart of Brahma.',
            commentary: 'भागवत का यह प्रथम श्लोक अद्वैत, सगुण और निर्गुण के समन्वय से परम सत्य की पराकाष्ठा का ध्यान कराता है।',
          },
          {
            id: 'sb-1-2-6',
            verseNumber: 6,
            sanskritText: 'स वै पुंसां परो धर्मो यतो भक्तिरधोक्षजे ।\nअहैतुकी प्रतिहता ययात्मा सम्प्रसीदति ॥',
            transliteration: 'sa vai puṁsāṁ paro dharmo yato bhaktir adhokṣaje\nahaituky apratihatā yayātmā samprasīdati',
            translationHi: 'मनुष्यों के लिए वही सर्वश्रेष्ठ परम धर्म है, जिससे इंद्रियातीत भगवान श्री कृष्ण में ऐसी भक्ति उत्पन्न हो जो अहैतुकी (निःस्वार्थ) और अप्रतिहता (अविच्छिन्न) हो, जिससे आत्मा पूर्ण रूप से प्रसन्न हो जाती है।',
            translationEn: 'The supreme occupation for all humanity is that by which men can attain to loving devotional service unto the transcendent Lord. Such devotional service must be unmotivated and uninterrupted to completely satisfy the self.',
            commentary: 'बिना किसी सांसारिक स्वार्थ के ईश्वर से प्रेम करना ही जीव का सर्वोच्च स्वभाव (परम धर्म) है।',
          },
        ],
      },
    ],
  },
  'patanjali-yoga': {
    id: 'sc-yoga',
    slug: 'patanjali-yoga',
    titleHi: 'पतंजलि योगसूत्र',
    titleEn: 'Patanjali Yoga Sutras',
    author: 'महर्षि पतंजलि',
    category: 'षड्दर्शन एवं योग',
    descriptionHi:
      'चित्त की वृत्तियों के निरोध, अष्टांग योग (यम, नियम, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान, समाधि) और कैवल्य (मोक्ष) का प्रामाणिक वैज्ञानिक मार्गदर्शक ग्रंथ।',
    descriptionEn:
      'The foundational text of classical Raja Yoga consisting of 196 aphorisms outlining the eight limbs of yoga and the direct cessation of mental fluctuations to abide in the Self.',
    totalVerses: 196,
    totalChapters: 4,
    chapters: [
      {
        id: 'yoga-ch-1',
        chapterNumber: 1,
        titleHi: 'प्रथम पाद: समाधि पाद',
        titleEn: 'Chapter 1: Samadhi Pada',
        summaryHi: 'योग की परिभाषा, चित्त की वृत्तियों के प्रकार, अभ्यास और वैराग्य के द्वारा समाधि की प्राप्ति।',
        summaryEn: 'The core definition of yoga, classifications of mental vrittis, and the attainment of samadhi through practice and detachment.',
        verses: [
          {
            id: 'yoga-1-1',
            verseNumber: 1,
            sanskritText: 'अथ योगानुशासनम् ॥ १ ॥',
            transliteration: 'atha yogānuśāsanam || 1 ||',
            translationHi: 'अब योग के अनुशासन का आरंभ होता है।',
            translationEn: 'Now, the authoritative exposition of Yoga begins.',
            commentary: 'अनुशासन शब्द यह सूचित करता है कि योग केवल बौद्धिक चर्चा नहीं, बल्कि जीवन में क्रियान्वित करने योग्य कठोर आध्यात्मिक अनुशासन है।',
          },
          {
            id: 'yoga-1-2',
            verseNumber: 2,
            sanskritText: 'योगश्चित्तवृत्तिनिरोधः ॥ २ ॥',
            transliteration: 'yogaś citta-vṛtti-nirodhaḥ || 2 ||',
            translationHi: 'चित्त की वृत्तियों (मानसिक तरंगों और विचारों) का पूर्ण निरोध ही योग है।',
            translationEn: 'Yoga is the cessation of the modifications and fluctuations of the mind-stuff.',
            commentary: 'जब मन की लहरें शांत हो जाती हैं, तब चेतना अपने वास्तविक शांत, निर्मल स्वरूप को प्रकट करती है।',
          },
          {
            id: 'yoga-1-3',
            verseNumber: 3,
            sanskritText: 'तदा द्रष्टुः स्वरूपेऽवस्थानम् ॥ ३ ॥',
            transliteration: 'tadā draṣṭuḥ svarūpe ’vasthānam || 3 ||',
            translationHi: 'उस समय द्रष्टा (साक्षी आत्मा) अपने वास्तविक स्वरूप में प्रतिष्ठित हो जाता है।',
            translationEn: 'Then the Seer abides in its own true nature.',
            commentary: 'मन के शांत होने पर आत्मा का भ्रांतिपूर्ण तादात्म्य समाप्त हो जाता है और वह अपने शुद्ध सच्चिदानंद स्वरूप में स्थित हो जाती है।',
          },
        ],
      },
      {
        id: 'yoga-ch-2',
        chapterNumber: 2,
        titleHi: 'द्वितीय पाद: साधन पाद (अष्टांग योग)',
        titleEn: 'Chapter 2: Sadhana Pada (Eight Limbs of Yoga)',
        summaryHi: 'क्रिया योग, क्लेशों का निवारण, और अष्टांग योग के आठ अंगों का विशद वर्णन।',
        summaryEn: 'Kriya Yoga, the elimination of inner afflictions (kleshas), and the eightfold limbs from Yama to Samadhi.',
        verses: [
          {
            id: 'yoga-2-28',
            verseNumber: 28,
            sanskritText: 'योगाङ्गानुष्ठानादशुद्धिक्षये ज्ञानदीप्तिराविवेकख्यातेः ॥ २८ ॥',
            transliteration: 'yogāṅgānuṣṭhānād aśuddhi-kṣaye jñāna-dīptir ā-viveka-khyāteḥ',
            translationHi: 'योग के अंगों का निरंतर अनुष्ठान करने से अशुद्धियों का क्षय होने पर ज्ञान का प्रकाश विवेकख्याति (सत्य के प्रत्यक्ष ज्ञान) तक बढ़ जाता है।',
            translationEn: 'By the practice of the limbs of Yoga, the impurities being destroyed, there dawns the light of wisdom, leading to discriminative discernment.',
            commentary: 'अष्टांग योग का नियमित अभ्यास अंतःकरण के समस्त मल और विक्षेपों को मिटाकर प्रज्ञा को उद्भासित करता है।',
          },
          {
            id: 'yoga-2-29',
            verseNumber: 29,
            sanskritText: 'यमनियमासनप्राणायामप्रत्याहारधारणाध्यानसमाधयोऽष्टावङ्गानि ॥ २९ ॥',
            transliteration: 'yama-niyamāsana-prāṇāyāma-pratyāhāra-dhāraṇā-dhyāna-samādhayo ’ṣṭāv aṅgāni',
            translationHi: 'यम, नियम, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान और समाधि—ये योग के आठ अंग हैं।',
            translationEn: 'Yama (restraints), Niyama (observances), Asana (posture), Pranayama (breath regulation), Pratyahara (withdrawal of senses), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption) are the eight limbs.',
            commentary: 'यह अष्टांग योग मानव व्यक्तित्व के शारीरिक, नैतिक, मानसिक और आध्यात्मिक सभी आयामों का समग्र विकास करता है।',
          },
        ],
      },
    ],
  },
  'chanakya-niti': {
    id: 'sc-chanakya',
    slug: 'chanakya-niti',
    titleHi: 'चाणक्य नीति',
    titleEn: 'Chanakya Niti',
    author: 'आचार्य चाणक्य (विष्णुगुप्त कौटिल्य)',
    category: 'नीति एवं राजनीति शास्त्र',
    descriptionHi:
      'आचार्य चाणक्य द्वारा व्यावहारिक जीवन, मित्रता, राजनीति, अर्थ, चरित्र निर्माण और धर्म सम्बन्धी अमूल्य नीति सूत्रों का कालजयी संग्रह।',
    descriptionEn:
      'The pragmatic treatise on ethical leadership, political acumen, human psychology, and personal conduct by master strategist Acharya Chanakya.',
    totalVerses: 350,
    totalChapters: 17,
    chapters: [
      {
        id: 'cn-ch-1',
        chapterNumber: 1,
        titleHi: 'प्रथम अध्याय: नीति सार एवं विद्या की महिमा',
        titleEn: 'Chapter 1: The Essence of Wisdom & Education',
        summaryHi: 'भगवान विष्णु को नमन, शास्त्रों के सार का संकलन, और मनुष्य के विवेकपूर्ण आचरण का महत्व।',
        summaryEn: 'Salutations to Lord Vishnu, the synthesis of ancient political sciences, and discerning right action from wrong.',
        verses: [
          {
            id: 'cn-1-1',
            verseNumber: 1,
            sanskritText: 'प्रणम्य शिरसा विष्णुं त्रैलोक्याधिपतिं प्रभुम् ।\nनानाशास्त्रोद्धृतं वक्ष्ये राजनीतिसमुच्चयम् ॥ १ ॥',
            transliteration: 'praṇamya śirasā viṣṇuṁ trailokyādhipatiṁ prabhum\nnānā-śāstroddhṛtaṁ vakṣye rāja-nīti-samuccayam || 1 ||',
            translationHi: 'तीनों लोकों के स्वामी भगवान श्री विष्णु को सिर झुकाकर प्रणाम करते हुए, मैं अनेक शास्त्रों से उद्धृत राजनीति और नीति सूत्रों का सार कहता हूँ।',
            translationEn: 'Humbly bowing down before the almighty Lord Vishnu, the Lord of the three worlds, I recite maxims of the science of ethics and governance selected from various scriptures.',
            commentary: 'आचार्य चाणक्य ने प्राचीन संहिताओं से व्यावहारिक ज्ञान का दोहन कर जनसामान्य के कल्याण हेतु यह ग्रंथ प्रस्तुत किया।',
          },
          {
            id: 'cn-1-12',
            verseNumber: 12,
            sanskritText: 'आपदर्थे धनं रक्षेद्दारान् रक्षेद्धनैरपि ।\nनत्मानं सततं रक्षेद्दारैरपि धनैरपि ॥ १२ ॥',
            transliteration: 'āpad-arthe dhanaṁ rakṣed dārān rakṣed dhanair api\nātmānaṁ satataṁ rakṣed dārair api dhanair api || 12 ||',
            translationHi: 'संकट के समय के लिए धन की रक्षा करनी चाहिए। धन खर्च करके भी पत्नी और परिवार की रक्षा करनी चाहिए। परंतु अपनी आत्मा (धर्म और जीवन) की रक्षा धन और परिवार दोनों से पहले निरंतर करनी चाहिए।',
            translationEn: 'One should save wealth against times of calamity; protect family even at the cost of wealth; but one should continually protect the Self and Dharma above both wealth and possessions.',
            commentary: 'यह सूत्र प्राथमिकताओं का स्पष्ट निर्धारण करता है: धन भौतिक है, परिवार उससे श्रेष्ठ है, किंतु धर्म और आत्मा का विनाश किसी भी मूल्य पर नहीं होना चाहिए।',
          },
        ],
      },
    ],
  },
};
