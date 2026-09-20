export interface StaticVerse {
  id: string;
  verseNumber: number;
  sanskritText: string;
  sanskrit?: string;
  transliteration: string;
  wordByWord?: Record<string, string>;
  translationHi: string;
  hindiMeaning?: string;
  translationEn: string;
  englishMeaning?: string;
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
  "bhagavad-gita": {
    "id": "bhagavad-gita",
    "slug": "bhagavad-gita",
    "titleHi": "श्रीमद्भगवद्गीता",
    "titleEn": "Shrimad Bhagavad Gita",
    "author": "भगवान वेदव्यास (प्रवक्ता: भगवान श्रीकृष्ण)",
    "category": "gita",
    "descriptionHi": "महाभारत के भीष्म पर्व का वह पावन अंश जिसमें भगवान श्रीकृष्ण ने अर्जुन को मोह-निवारण, निष्काम कर्म, ज्ञान, भक्ति और शरणागति का शाश्वत उपदेश दिया।",
    "descriptionEn": "The eternal divine song of God delivered by Lord Sri Krishna to Arjuna on the battlefield of Kurukshetra, illuminating the paths of Karma, Jnana, and Bhakti Yoga.",
    "totalVerses": 55,
    "totalChapters": 18,
    "chapters": [
      {
        "id": "bg-ch-1",
        "chapterNumber": 1,
        "titleHi": "अध्याय १: अर्जुनविषादयोग",
        "titleEn": "Chapter 1: Arjuna Vishada Yoga",
        "summaryHi": "कुरुक्षेत्र के धर्मक्षेत्र में दोनों सेनाओं की उपस्थिति, परिजनों को सम्मुख देखकर अर्जुन का मोह, विषाद एवं गाण्डीव त्याग।",
        "summaryEn": "The lamentation of Arjuna on the battlefield of Kurukshetra upon seeing his revered elders, teachers, and kinsmen ready to fight.",
        "verses": [
          {
            "id": "bg-1-1",
            "verseNumber": 1,
            "sanskritText": "धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय || १-१ ||",
            "sanskrit": "धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय || १-१ ||",
            "transliteration": "dhṛtarāṣṭra uvāca |\ndharmakṣetre kurukṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāścaiva kimakurvata sañjaya || 1-1 ||",
            "translationHi": "धृतराष्ट्र ने कहा: हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे और पाण्डु के पुत्रों ने क्या किया?",
            "hindiMeaning": "धृतराष्ट्र ने कहा: हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे और पाण्डु के पुत्रों ने क्या किया?",
            "translationEn": "Dhritarashtra said: O Sanjaya, assembled on the holy plain of Kurukshetra, desirous of fighting, what did my sons and the sons of Pandu do?",
            "englishMeaning": "Dhritarashtra said: O Sanjaya, assembled on the holy plain of Kurukshetra, desirous of fighting, what did my sons and the sons of Pandu do?",
            "commentary": "भगवद्गीता का प्रारम्भ धृतराष्ट्र के प्रश्न से होता है। 'धर्मक्षेत्रे' शब्द संकेत करता है कि यह केवल एक भौगोलिक युद्ध नहीं, बल्कि अंतरात्मा में सत्य और असत्य, धर्म और अधर्म का सनातन संघर्ष है।"
          },
          {
            "id": "bg-1-2",
            "verseNumber": 2,
            "sanskritText": "सञ्जय उवाच |\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा |\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत् || १-२ ||",
            "sanskrit": "सञ्जय उवाच |\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा |\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत् || १-२ ||",
            "transliteration": "sañjaya uvāca |\ndṛṣṭvā tu pāṇḍavānīkaṁ vyūḍhaṁ duryodhanastadā |\nācāryamupasaṅgamya rājā vacanamabravīt || 1-2 ||",
            "translationHi": "संजय ने कहा: उस समय राजा दुर्योधन ने व्यूहरचनायुक्त पाण्डवों की सेना को देखकर द्रोणाचार्य के पास जाकर ये वचन कहे।",
            "hindiMeaning": "संजय ने कहा: उस समय राजा दुर्योधन ने व्यूहरचनायुक्त पाण्डवों की सेना को देखकर द्रोणाचार्य के पास जाकर ये वचन कहे।",
            "translationEn": "Sanjaya said: Having seen the army of the Pandavas drawn up in battle array, King Duryodhana approached his teacher Drona and spoke these words.",
            "englishMeaning": "Sanjaya said: Having seen the army of the Pandavas drawn up in battle array, King Duryodhana approached his teacher Drona and spoke these words.",
            "commentary": "दुर्योधन पाण्डवों की सुव्यवस्थित सेना को देखकर अंदर से विचलित हो उठा और अपने गुरु द्रोणाचार्य को सतर्क करने पहुँचा।"
          },
          {
            "id": "bg-1-21",
            "verseNumber": 21,
            "sanskritText": "अर्जुन उवाच |\nसेनयोरुभयोर्मध्ये रथं स्थापय मेऽच्युत |\nयावदेतान्निरीक्षेऽहं योद्धुकामानवस्थितान् || १-२१ ||",
            "sanskrit": "अर्जुन उवाच |\nसेनयोरुभयोर्मध्ये रथं स्थापय मेऽच्युत |\nयावदेतान्निरीक्षेऽहं योद्धुकामानवस्थितान् || १-२१ ||",
            "transliteration": "arjuna uvāca |\nsenayorubhayormadhye rathaṁ sthāpaya me'cyuta |\nyāvaddetānnirīkṣe'haṁ yoddhukāmānavasthitān || 1-21 ||",
            "translationHi": "अर्जुन ने कहा: हे अच्युत! दोनों सेनाओं के बीच में मेरे रथ को खड़ा कीजिए, जिससे कि मैं युद्ध की इच्छा से खड़े हुए इन विपक्षियों का निरीक्षण कर सकूँ।",
            "hindiMeaning": "अर्जुन ने कहा: हे अच्युत! दोनों सेनाओं के बीच में मेरे रथ को खड़ा कीजिए, जिससे कि मैं युद्ध की इच्छा से खड़े हुए इन विपक्षियों का निरीक्षण कर सकूँ।",
            "translationEn": "Arjuna said: O Infallible One (Achyuta), please place my chariot between the two armies so that I may behold those who stand here longing for battle.",
            "englishMeaning": "Arjuna said: O Infallible One (Achyuta), please place my chariot between the two armies so that I may behold those who stand here longing for battle.",
            "commentary": "अर्जुन भगवान कृष्ण को 'अच्युत' (जो अपने स्वरूप और कृपा से कभी नहीं डिगते) कहकर सम्बोधित करते हैं।"
          },
          {
            "id": "bg-1-28",
            "verseNumber": 28,
            "sanskritText": "दृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम् |\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति || १-२८ ||",
            "sanskrit": "दृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम् |\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति || १-२८ ||",
            "transliteration": "dṛṣṭvemaṁ svajanaṁ kṛṣṇa yuyutsuṁ samupasthitam |\nsīdanti mama gātrāṇi mukhaṁ ca pariśuṣyati || 1-28 ||",
            "translationHi": "अर्जुन ने कहा: हे कृष्ण! युद्ध की इच्छा से उपस्थित इस स्वजन समुदाय को देखकर मेरे अंग शिथिल हो रहे हैं और मुख सूख रहा है।",
            "hindiMeaning": "अर्जुन ने कहा: हे कृष्ण! युद्ध की इच्छा से उपस्थित इस स्वजन समुदाय को देखकर मेरे अंग शिथिल हो रहे हैं और मुख सूख रहा है।",
            "translationEn": "Arjuna said: Seeing these my kinsmen, O Krishna, drawn up and eager to fight, my limbs give way and my mouth is parched.",
            "englishMeaning": "Arjuna said: Seeing these my kinsmen, O Krishna, drawn up and eager to fight, my limbs give way and my mouth is parched.",
            "commentary": "मोह और अज्ञान व्यक्ति के बल, पराक्रम और विवेक को हर लेते हैं। अर्जुन जैसे अद्वितीय वीर भी संबंधियों के मोह में पड़कर व्याकुल हो गए।"
          },
          {
            "id": "bg-1-47",
            "verseNumber": 47,
            "sanskritText": "एवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत् |\nविसृज्य सशरं चापं शोकसंविग्नमानसः || १-४७ ||",
            "sanskrit": "एवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत् |\nविसृज्य सशरं चापं शोकसंविग्नमानसः || १-४७ ||",
            "transliteration": "evamuktvārjunaḥ saṅkhye rathopastha upāviśat |\nvisṛjya saśaraṁ cāpaṁ śokasaṁvignamānasaḥ || 1-47 ||",
            "translationHi": "संजय ने कहा: युद्धभूमि में इस प्रकार कहकर शोक से व्याकुल मन वाले अर्जुन बाण सहित धनुष को त्यागकर रथ के पिछले भाग में बैठ गए।",
            "hindiMeaning": "संजय ने कहा: युद्धभूमि में इस प्रकार कहकर शोक से व्याकुल मन वाले अर्जुन बाण सहित धनुष को त्यागकर रथ के पिछले भाग में बैठ गए।",
            "translationEn": "Sanjaya said: Having spoken thus on the battlefield, Arjuna cast aside his bow and arrows and sat down on the chariot, his mind overwhelmed with sorrow.",
            "englishMeaning": "Sanjaya said: Having spoken thus on the battlefield, Arjuna cast aside his bow and arrows and sat down on the chariot, his mind overwhelmed with sorrow.",
            "commentary": "प्रथम अध्याय का समापन अर्जुन के संपूर्ण समर्पण और विषाद से होता है, जो ज्ञान और उपदेश की प्राप्ति की प्रथम सीढ़ी बनती है।"
          }
        ]
      },
      {
        "id": "bg-ch-2",
        "chapterNumber": 2,
        "titleHi": "अध्याय २: साङ्ख्ययोग",
        "titleEn": "Chapter 2: Sankhya Yoga",
        "summaryHi": "आत्मा की अमरता, देह की नश्वरता, स्वधर्म पालन, निष्काम कर्मयोग एवं स्थितप्रज्ञ के लक्षण।",
        "summaryEn": "The immortal nature of the soul, transience of the physical body, the gospel of selfless action (Karma Yoga), and characteristics of the enlightened sage (Sthitaprajna).",
        "verses": [
          {
            "id": "bg-2-7",
            "verseNumber": 7,
            "sanskritText": "कार्पण्यदोषोपहतस्वभावः पृच्छामि त्वां धर्मसम्मूढचेताः |\nयच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे शिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम् || २-७ ||",
            "sanskrit": "कार्पण्यदोषोपहतस्वभावः पृच्छामि त्वां धर्मसम्मूढचेताः |\nयच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे शिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम् || २-७ ||",
            "transliteration": "kārpaṇyadoṣopahatasvabhāvaḥ pṛcchāmi tvāṁ dharmasammūḍhacetāḥ |\nyacchreyaḥ syānniścitaṁ brūhi tanme śiṣyaste'haṁ śādhi māṁ tvāṁ prapannam || 2-7 ||",
            "translationHi": "कायरतारूप दोष से उपहत स्वभाव वाला और धर्म के विषय में मोहितचित्त हुआ मैं आपसे पूछता हूँ कि जो निश्चित श्रेयस्कर हो, वह मुझे बतलाइए। मैं आपका शिष्य हूँ, आपकी शरण में आए मुझे उपदेश दीजिए।",
            "hindiMeaning": "कायरतारूप दोष से उपहत स्वभाव वाला और धर्म के विषय में मोहितचित्त हुआ मैं आपसे पूछता हूँ कि जो निश्चित श्रेयस्कर हो, वह मुझे बतलाइए। मैं आपका शिष्य हूँ, आपकी शरण में आए मुझे उपदेश दीजिए।",
            "translationEn": "My heart is burdened with the flaw of pity, my mind is bewildered about duty. I ask You: tell me clearly what is best for me. I am Your disciple; teach me, who have surrendered unto You.",
            "englishMeaning": "My heart is burdened with the flaw of pity, my mind is bewildered about duty. I ask You: tell me clearly what is best for me. I am Your disciple; teach me, who have surrendered unto You.",
            "commentary": "यह गीता का मुख्य मोड़ है जहाँ अर्जुन मित्र-भाव को त्यागकर शिष्यत्व स्वीकार करता है और श्रीकृष्ण जगद्गुरु के रूप में प्रकट होते हैं।"
          },
          {
            "id": "bg-2-11",
            "verseNumber": 11,
            "sanskritText": "श्रीभगवानुवाच |\nअशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे |\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः || २-११ ||",
            "sanskrit": "श्रीभगवानुवाच |\nअशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे |\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः || २-११ ||",
            "transliteration": "śrībhagavānuvāca |\naśocyānanvaśocastvaṁ prajñāvādāṁśca bhāṣase |\ngatāsūnagatāsūṁśca nānuśocanti paṇḍitāḥ || 2-11 ||",
            "translationHi": "श्रीभगवान् ने कहा: हे अर्जुन! तुम न शोक करने योग्य मनुष्यों के लिए शोक करते हो और पण्डितों के समान वचन कहते हो; परन्तु जो बुद्धिमान हैं, वे न जीवितों के लिए शोक करते हैं और न मृतकों के लिए।",
            "hindiMeaning": "श्रीभगवान् ने कहा: हे अर्जुन! तुम न शोक करने योग्य मनुष्यों के लिए शोक करते हो और पण्डितों के समान वचन कहते हो; परन्तु जो बुद्धिमान हैं, वे न जीवितों के लिए शोक करते हैं और न मृतकों के लिए।",
            "translationEn": "The Supreme Lord said: You grieve for those who are not worthy of grief, yet you speak words of wisdom. The wise grieve neither for the living nor for the dead.",
            "englishMeaning": "The Supreme Lord said: You grieve for those who are not worthy of grief, yet you speak words of wisdom. The wise grieve neither for the living nor for the dead.",
            "commentary": "सच्चा ज्ञान वही है जो देह और आत्मा के भेद को समझे। आत्मा शाश्वत है, देह विनाशी है, अतः शोक अकारण है।"
          },
          {
            "id": "bg-2-20",
            "verseNumber": 20,
            "sanskritText": "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः |\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे || २-२० ||",
            "sanskrit": "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः |\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे || २-२० ||",
            "transliteration": "na jāyate mriyate vā kadācinnāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato'yaṁ purāṇo na hanyate hanyamāne śarīre || 2-20 ||",
            "translationHi": "यह आत्मा न कभी जन्म लेता है और न कभी मरता है; न यह उत्पन्न होकर फिर होने वाला ही है। यह अजन्मा, नित्य, सनातन और पुरातन है; शरीर के मारे जाने पर भी यह नहीं मारा जाता।",
            "hindiMeaning": "यह आत्मा न कभी जन्म लेता है और न कभी मरता है; न यह उत्पन्न होकर फिर होने वाला ही है। यह अजन्मा, नित्य, सनातन और पुरातन है; शरीर के मारे जाने पर भी यह नहीं मारा जाता।",
            "translationEn": "The soul is never born nor dies at any time; nor having once been, does it ever cease to be. Unborn, eternal, ever-existing, and primeval, it is not slain when the body is slain.",
            "englishMeaning": "The soul is never born nor dies at any time; nor having once been, does it ever cease to be. Unborn, eternal, ever-existing, and primeval, it is not slain when the body is slain.",
            "commentary": "आत्म-तत्व की अजरता और अमरता का यह श्लोक उपनिषदों का महावाक्य है।"
          },
          {
            "id": "bg-2-22",
            "verseNumber": 22,
            "sanskritText": "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि |\nतथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही || २-२२ ||",
            "sanskrit": "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि |\nतथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही || २-२२ ||",
            "transliteration": "vāsāṁsi jīrṇāni yathā vihāya navāni gṛhṇāti naro'parāṇi |\ntathā śarīrāṇi vihāya jīrṇānyanyāni saṁyāti navāni dehī || 2-22 ||",
            "translationHi": "जैसे मनुष्य पुराने वस्त्रों को त्यागकर दूसरे नए वस्त्रों को ग्रहण करता है, वैसे ही जीवात्मा पुराने शरीरों को त्यागकर दूसरे नए शरीरों को प्राप्त होता है।",
            "hindiMeaning": "जैसे मनुष्य पुराने वस्त्रों को त्यागकर दूसरे नए वस्त्रों को ग्रहण करता है, वैसे ही जीवात्मा पुराने शरीरों को त्यागकर दूसरे नए शरीरों को प्राप्त होता है।",
            "translationEn": "Just as a person casts off worn-out garments and puts on others that are new, so does the embodied soul cast off worn-out bodies and enter into others that are new.",
            "englishMeaning": "Just as a person casts off worn-out garments and puts on others that are new, so does the embodied soul cast off worn-out bodies and enter into others that are new.",
            "commentary": "पुनर्जन्म और देह परिवर्तन का यह सर्वाधिक प्रसिद्ध और दृष्टान्तपरक श्लोक है।"
          },
          {
            "id": "bg-2-47",
            "verseNumber": 47,
            "sanskritText": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि || २-४७ ||",
            "sanskrit": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि || २-४७ ||",
            "transliteration": "karmaṇyevādhikāraste mā phaleṣu kadācana |\nmā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi || 2-47 ||",
            "translationHi": "तुम्हारा अधिकार केवल कर्म करने में ही है, फलों में कभी नहीं। अतः तुम कर्म के फल की वासना वाले मत बनो और न ही तुम्हारी अकर्मण्यता में आसक्ति हो।",
            "hindiMeaning": "तुम्हारा अधिकार केवल कर्म करने में ही है, फलों में कभी नहीं। अतः तुम कर्म के फल की वासना वाले मत बनो और न ही तुम्हारी अकर्मण्यता में आसक्ति हो।",
            "translationEn": "You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
            "englishMeaning": "You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
            "commentary": "यह श्लोक सनातन निष्काम कर्मयोग का आधार स्तम्भ है। फल की चिंता से मुक्त होकर कर्तव्य पालन ही चित्तशुद्धि और मोक्ष का साधन है।"
          },
          {
            "id": "bg-2-62",
            "verseNumber": 62,
            "sanskritText": "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते |\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते || २-६२ ||",
            "sanskrit": "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते |\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते || २-६२ ||",
            "transliteration": "dhyāyato viṣayānpuṁsaḥ saṅgasteṣūpajāyate |\nsaṅgātsañjāyate kāmaḥ kāmātkrodho'bhijāyate || 2-62 ||",
            "translationHi": "विषयों का निरन्तर ध्यान करने वाले पुरुष की उनमें आसक्ति हो जाती है; आसक्ति से कामना उत्पन्न होती है और कामना में बाधा पड़ने से क्रोध उत्पन्न होता है।",
            "hindiMeaning": "विषयों का निरन्तर ध्यान करने वाले पुरुष की उनमें आसक्ति हो जाती है; आसक्ति से कामना उत्पन्न होती है और कामना में बाधा पड़ने से क्रोध उत्पन्न होता है।",
            "translationEn": "While contemplating the objects of the senses, a person develops attachment for them, and from such attachment lust develops, and from lust anger arises.",
            "englishMeaning": "While contemplating the objects of the senses, a person develops attachment for them, and from such attachment lust develops, and from lust anger arises.",
            "commentary": "मानव मन के पतन की शृंखला का मनोवैज्ञानिक विश्लेषण: विषय चिन्तन -> आसक्ति -> काम -> क्रोध -> सम्मोह -> स्मृतिभ्रंश -> बुद्धिनाश -> विनाश।"
          }
        ]
      },
      {
        "id": "bg-ch-3",
        "chapterNumber": 3,
        "titleHi": "अध्याय ३: कर्मयोग",
        "titleEn": "Chapter 3: Karma Yoga",
        "summaryHi": "यज्ञार्थ कर्म का सिद्धांत, कर्म चक्र, लोकसंग्रह, अहंकार से मुक्त होकर कर्तव्य पालन एवं काम-क्रोध पर विजय।",
        "summaryEn": "The philosophy of action dedicated as sacrifice (Yajna), leading by example for societal harmony (Lokasangraha), and overcoming lust and anger.",
        "verses": [
          {
            "id": "bg-3-9",
            "verseNumber": 9,
            "sanskritText": "यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः |\nतदर्थं कर्म कौन्तेय मुक्तसङ्गः समाचर || ३-९ ||",
            "sanskrit": "यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः |\nतदर्थं कर्म कौन्तेय मुक्तसङ्गः समाचर || ३-९ ||",
            "transliteration": "yajñārthātkarmaṇo'nyatra loko'yaṁ karmabandhanaḥ |\ntadarthaṁ karma kaunteya muktasaṅgaḥ samācara || 3-9 ||",
            "translationHi": "यज्ञ के निमित्त किए जाने वाले कर्मों के अतिरिक्त अन्य कर्मों में लगा हुआ यह मनुष्य समुदाय कर्मों के बन्धन में बंधता है। इसलिए हे कुन्तीपुत्र! आसक्ति से रहित होकर उस परमेश्वर के निमित्त भली-भाँति कर्म कर।",
            "hindiMeaning": "यज्ञ के निमित्त किए जाने वाले कर्मों के अतिरिक्त अन्य कर्मों में लगा हुआ यह मनुष्य समुदाय कर्मों के बन्धन में बंधता है। इसलिए हे कुन्तीपुत्र! आसक्ति से रहित होकर उस परमेश्वर के निमित्त भली-भाँति कर्म कर।",
            "translationEn": "Work done as a sacrifice for God has to be performed; otherwise, work causes bondage in this material world. Therefore, O son of Kunti, perform your prescribed duties for His satisfaction, untainted by attachment.",
            "englishMeaning": "Work done as a sacrifice for God has to be performed; otherwise, work causes bondage in this material world. Therefore, O son of Kunti, perform your prescribed duties for His satisfaction, untainted by attachment.",
            "commentary": "यज्ञ का अर्थ केवल अग्निहोत्र नहीं, अपितु समाज, प्रकृति और ईश्वर के प्रति समर्पित प्रत्येक शुभ कर्म यज्ञ है।"
          },
          {
            "id": "bg-3-19",
            "verseNumber": 19,
            "sanskritText": "तस्मादसक्तः सततं कार्यं कर्म समाचर |\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः || ३-१९ ||",
            "sanskrit": "तस्मादसक्तः सततं कार्यं कर्म समाचर |\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः || ३-१९ ||",
            "transliteration": "tasmādasaktaḥ satataṁ kāryaṁ karma samācara |\nasakto hyācarankarma paramāpnoti pūruṣaḥ || 3-19 ||",
            "translationHi": "इसलिए तू निरन्तर आसक्ति से रहित होकर कर्तव्य कर्म का भली-भाँति आचरण कर; क्योंकि आसक्ति से रहित होकर कर्म करता हुआ मनुष्य परम पद को प्राप्त होता है।",
            "hindiMeaning": "इसलिए तू निरन्तर आसक्ति से रहित होकर कर्तव्य कर्म का भली-भाँति आचरण कर; क्योंकि आसक्ति से रहित होकर कर्म करता हुआ मनुष्य परम पद को प्राप्त होता है।",
            "translationEn": "Therefore, without being attached to the fruits of activities, one should act as a matter of duty, for by working without attachment one attains the Supreme.",
            "englishMeaning": "Therefore, without being attached to the fruits of activities, one should act as a matter of duty, for by working without attachment one attains the Supreme.",
            "commentary": "अनासक्ति ही समस्त योगों की कुञ्जी है।"
          },
          {
            "id": "bg-3-21",
            "verseNumber": 21,
            "sanskritText": "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरोजनः |\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते || ३-२१ ||",
            "sanskrit": "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरोजनः |\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते || ३-२१ ||",
            "transliteration": "yadyadācarati śreṣṭhastattadevetaro janaḥ |\nsa yatpramāṇaṁ kurute lokastadanuvartate || 3-21 ||",
            "translationHi": "श्रेष्ठ पुरुष जैसा-जैसा आचरण करता है, अन्य पुरुष भी वैसा-वैसा ही आचरण करते हैं। वह जो कुछ प्रमाण प्रस्तुत कर देता है, समस्त संसार उसी का अनुसरण करता है।",
            "hindiMeaning": "श्रेष्ठ पुरुष जैसा-जैसा आचरण करता है, अन्य पुरुष भी वैसा-वैसा ही आचरण करते हैं। वह जो कुछ प्रमाण प्रस्तुत कर देता है, समस्त संसार उसी का अनुसरण करता है।",
            "translationEn": "Whatever actions a great man performs, common men follow. Whatever standards he sets by exemplary acts, all the world pursues.",
            "englishMeaning": "Whatever actions a great man performs, common men follow. Whatever standards he sets by exemplary acts, all the world pursues.",
            "commentary": "नेतृत्व और समाज सुधार का यह सर्वोच्च सनातन सूत्र है।"
          },
          {
            "id": "bg-3-27",
            "verseNumber": 27,
            "sanskritText": "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः |\nअहङ्कारविमूढात्मा कर्ताहमिति मन्यते || ३-२७ ||",
            "sanskrit": "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः |\nअहङ्कारविमूढात्मा कर्ताहमिति मन्यते || ३-२७ ||",
            "transliteration": "prakṛteḥ kriyamāṇāni guṇaiḥ karmāṇi sarvaśaḥ |\nahaṅkāravimūḍhātmā kartāhamiti manyate || 3-27 ||",
            "translationHi": "सम्पूर्ण कर्म सब प्रकार से प्रकृति के गुणों द्वारा ही किए जाते हैं, फिर भी जिसका अन्तःकरण अहंकार से मोहित है, वह अज्ञानी 'मैं कर्ता हूँ' ऐसा मानता है।",
            "hindiMeaning": "सम्पूर्ण कर्म सब प्रकार से प्रकृति के गुणों द्वारा ही किए जाते हैं, फिर भी जिसका अन्तःकरण अहंकार से मोहित है, वह अज्ञानी 'मैं कर्ता हूँ' ऐसा मानता है।",
            "translationEn": "All actions are in fact performed by the modes of material nature, but the person bewildered by false ego imagines himself to be the doer.",
            "englishMeaning": "All actions are in fact performed by the modes of material nature, but the person bewildered by false ego imagines himself to be the doer.",
            "commentary": "अहंकार का विसर्जन ही शांति का मार्ग है।"
          },
          {
            "id": "bg-3-35",
            "verseNumber": 35,
            "sanskritText": "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् |\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः || ३-३५ ||",
            "sanskrit": "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् |\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः || ३-३५ ||",
            "transliteration": "śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt |\nsvadharme nidhanaṁ śreyaḥ paradharmo bhayāvahaḥ || 3-35 ||",
            "translationHi": "अच्छी प्रकार आचरण में लाए हुए दूसरे के धर्म की अपेक्षा गुणरहित भी अपना धर्म श्रेष्ठ है। अपने धर्म में मरना भी कल्याणकारक है और दूसरे का धर्म भय को देने वाला है।",
            "hindiMeaning": "अच्छी प्रकार आचरण में लाए हुए दूसरे के धर्म की अपेक्षा गुणरहित भी अपना धर्म श्रेष्ठ है। अपने धर्म में मरना भी कल्याणकारक है और दूसरे का धर्म भय को देने वाला है।",
            "translationEn": "It is far better to discharge one's own prescribed duty, even if flawed, than another's duty performed perfectly. Death in the performance of one's own duty is preferable; following another's path is fraught with fear.",
            "englishMeaning": "It is far better to discharge one's own prescribed duty, even if flawed, than another's duty performed perfectly. Death in the performance of one's own duty is preferable; following another's path is fraught with fear.",
            "commentary": "स्वधर्म का तात्पर्य व्यक्ति के स्वाभाविक स्वभाव, योग्यता और कर्तव्य से है।"
          }
        ]
      },
      {
        "id": "bg-ch-4",
        "chapterNumber": 4,
        "titleHi": "अध्याय ४: ज्ञानकर्मसंन्यासयोग",
        "titleEn": "Chapter 4: Jnana Karma Sannyasa Yoga",
        "summaryHi": "अवतार का रहस्य, वर्णव्यवस्था का वैज्ञानिक आधार, ज्ञान की अग्नि द्वारा कर्मों का भस्म होना एवं गुरु सेवा से ज्ञान प्राप्ति।",
        "summaryEn": "The mystery of Divine Incarnation (Avatara), the fire of spiritual wisdom that burns all karma to ashes, and attaining knowledge through humble service to the Guru.",
        "verses": [
          {
            "id": "bg-4-7",
            "verseNumber": 7,
            "sanskritText": "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत |\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् || ४-७ ||",
            "sanskrit": "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत |\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् || ४-७ ||",
            "transliteration": "yadā yadā hi dharmasya glānirbhavati bhārata |\nabhyutthānamadharmasya tadātmānaṁ sṛjāmyaham || 4-7 ||",
            "translationHi": "हे भारत (अर्जुन)! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं अपने रूप को रचता हूँ अर्थात प्रकट होता हूँ।",
            "hindiMeaning": "हे भारत (अर्जुन)! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं अपने रूप को रचता हूँ अर्थात प्रकट होता हूँ।",
            "translationEn": "Whenever there is a decline in righteousness, O Bharata, and a rise of unrighteousness, at that time I manifest Myself.",
            "englishMeaning": "Whenever there is a decline in righteousness, O Bharata, and a rise of unrighteousness, at that time I manifest Myself.",
            "commentary": "अवतारवाद का यह सनातन घोषणापत्र है कि परमात्मा सृष्टि में संतुलन और सत्य की पुनर्स्थापना हेतु युग-युग में प्रकट होते हैं।"
          },
          {
            "id": "bg-4-8",
            "verseNumber": 8,
            "sanskritText": "परित्राणाय साधूनां विनाशाय च दुष्कृताम् |\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे || ४-८ ||",
            "sanskrit": "परित्राणाय साधूनां विनाशाय च दुष्कृताम् |\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे || ४-८ ||",
            "transliteration": "paritrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām |\ndharmasaṁsthāpanārthāya sambhavāmi yuge yuge || 4-8 ||",
            "translationHi": "साधु पुरुषों के उद्धार के लिए, पापकर्म करने वालों के विनाश के लिए और धर्म की भली-भाँति स्थापना करने के लिए मैं युग-युग में प्रकट होता हूँ।",
            "hindiMeaning": "साधु पुरुषों के उद्धार के लिए, पापकर्म करने वालों के विनाश के लिए और धर्म की भली-भाँति स्थापना करने के लिए मैं युग-युग में प्रकट होता हूँ।",
            "translationEn": "To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of righteousness, I appear era after era.",
            "englishMeaning": "To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of righteousness, I appear era after era.",
            "commentary": "अवतार का त्रिविध उद्देश्य: सज्जनों का रक्षण, दुष्टों का विनाश और धर्म की प्रतिष्ठा।"
          },
          {
            "id": "bg-4-13",
            "verseNumber": 13,
            "sanskritText": "चातुर्वर्ण्यं मया सृष्टं गुणकर्मविभागशः |\nतस्य कर्तारमपि मां विद्ध्यकर्तारमव्ययम् || ४-१३ ||",
            "sanskrit": "चातुर्वर्ण्यं मया सृष्टं गुणकर्मविभागशः |\nतस्य कर्तारमपि मां विद्ध्यकर्तारमव्ययम् || ४-१३ ||",
            "transliteration": "cāturvarṇyaṁ mayā sṛṣṭaṁ guṇakarmavibhāgaśaḥ |\ntasya kartāramapi māṁ viddhyakartāramavyayam || 4-13 ||",
            "translationHi": "गुण और कर्मों के विभाग के अनुसार चारों वर्णों की रचना मेरे द्वारा की गई है। यद्यपि मैं उस व्यवस्था का कर्ता हूँ, फिर भी मुझे अविनाशी परमेश्वर को अकर्ता ही जान।",
            "hindiMeaning": "गुण और कर्मों के विभाग के अनुसार चारों वर्णों की रचना मेरे द्वारा की गई है। यद्यपि मैं उस व्यवस्था का कर्ता हूँ, फिर भी मुझे अविनाशी परमेश्वर को अकर्ता ही जान।",
            "translationEn": "According to the three modes of material nature and the work associated with them, the four divisions of human society were created by Me. And although I am the creator of this system, know Me to be the non-doer, being unchangeable.",
            "englishMeaning": "According to the three modes of material nature and the work associated with them, the four divisions of human society were created by Me. And although I am the creator of this system, know Me to be the non-doer, being unchangeable.",
            "commentary": "सनातन व्यवस्था में वर्ण का निर्धारण जन्म से नहीं, अपितु व्यक्ति के 'गुण और कर्म' से होता है।"
          },
          {
            "id": "bg-4-34",
            "verseNumber": 34,
            "sanskritText": "तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया |\nउपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः || ४-३४ ||",
            "sanskrit": "तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया |\nउपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः || ४-३४ ||",
            "transliteration": "tadviddhi praṇipātena paripraśnena sevayā |\nupadekṣyanti te jñānaṁ jñāninastattvadarśinaḥ || 4-34 ||",
            "translationHi": "उस ज्ञान को तू तत्वदर्शी ज्ञानियों के पास जाकर समझ। उनको भली-भाँति दण्डवत प्रणाम करने से, उनकी सेवा करने से और निष्कपट भाव से प्रश्न करने से वे ज्ञानी पुरुष तुझे उस ज्ञान का उपदेश करेंगे।",
            "hindiMeaning": "उस ज्ञान को तू तत्वदर्शी ज्ञानियों के पास जाकर समझ। उनको भली-भाँति दण्डवत प्रणाम करने से, उनकी सेवा करने से और निष्कपट भाव से प्रश्न करने से वे ज्ञानी पुरुष तुझे उस ज्ञान का उपदेश करेंगे।",
            "translationEn": "Just try to learn the truth by approaching a spiritual master. Inquire from him submissively and render service unto him. The self-realized souls can impart knowledge unto you because they have seen the truth.",
            "englishMeaning": "Just try to learn the truth by approaching a spiritual master. Inquire from him submissively and render service unto him. The self-realized souls can impart knowledge unto you because they have seen the truth.",
            "commentary": "ज्ञान प्राप्ति के तीन साधन: प्रणिपात (विनम्रता), परिप्रश्न (जिज्ञासा), और सेवा।"
          },
          {
            "id": "bg-4-38",
            "verseNumber": 38,
            "sanskritText": "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते |\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति || ४-३८ ||",
            "sanskrit": "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते |\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति || ४-३८ ||",
            "transliteration": "na hi jñānena sadṛśaṁ pavitramiha vidyate |\ntatsvayaṁ yogasaṁsiddhaḥ kālenātmani vindati || 4-38 ||",
            "translationHi": "इस संसार में ज्ञान के समान पवित्र करने वाला निःसंदेह कुछ भी नहीं है। उस ज्ञान को कितने ही काल से कर्मयोग द्वारा शुद्धान्तःकरण हुआ मनुष्य अपने-आप ही आत्मा में पा लेता है।",
            "hindiMeaning": "इस संसार में ज्ञान के समान पवित्र करने वाला निःसंदेह कुछ भी नहीं है। उस ज्ञान को कितने ही काल से कर्मयोग द्वारा शुद्धान्तःकरण हुआ मनुष्य अपने-आप ही आत्मा में पा लेता है।",
            "translationEn": "In this world, there is nothing so sublime and pure as transcendental knowledge. Such knowledge is the mature fruit of all mysticism. And one who has become accomplished in the practice of devotional service enjoys this knowledge within himself in due course of time.",
            "englishMeaning": "In this world, there is nothing so sublime and pure as transcendental knowledge. Such knowledge is the mature fruit of all mysticism. And one who has become accomplished in the practice of devotional service enjoys this knowledge within himself in due course of time.",
            "commentary": "आत्मज्ञान ही समस्त मलों और अज्ञान का अन्तिम शोधक है।"
          }
        ]
      },
      {
        "id": "bg-ch-5",
        "chapterNumber": 5,
        "titleHi": "अध्याय ५: कर्मसंन्यासयोग",
        "titleEn": "Chapter 5: Karma Sannyasa Yoga",
        "summaryHi": "संन्यास और कर्मयोग का समन्वय, कमल-पत्र की भाँति अनासक्त भाव से कर्म, समदर्शिता एवं ब्रह्मनिर्वाण।",
        "summaryEn": "Action in Krishna Consciousness; renunciation vs devotional action; equal vision towards all living entities.",
        "verses": [
          {
            "id": "bg-5-2",
            "verseNumber": 2,
            "sanskritText": "श्रीभगवानुवाच |\nसंन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ |\nतयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते || ५-२ ||",
            "sanskrit": "श्रीभगवानुवाच |\nसंन्यासः कर्मयोगश्च निःश्रेयसकरावुभौ |\nतयोस्तु कर्मसंन्यासात्कर्मयोगो विशिष्यते || ५-२ ||",
            "transliteration": "śrībhagavānuvāca |\nsannyāsaḥ karmayogaśca niḥśreyasakarāvubhau |\ntayostu karmasannyāsātkarmayogo viśiṣyate || 5-2 ||",
            "translationHi": "श्रीभगवान् ने कहा: कर्मसंन्यास (सांख्ययोग) और कर्मयोग—ये दोनों ही परम कल्याण करने वाले हैं; परन्तु उन दोनों में भी कर्मसंन्यास की अपेक्षा कर्मयोग श्रेष्ठ है।",
            "hindiMeaning": "श्रीभगवान् ने कहा: कर्मसंन्यास (सांख्ययोग) और कर्मयोग—ये दोनों ही परम कल्याण करने वाले हैं; परन्तु उन दोनों में भी कर्मसंन्यास की अपेक्षा कर्मयोग श्रेष्ठ है।",
            "translationEn": "The Supreme Lord said: Both renunciation of work and work in devotion are good for liberation. But, of the two, work in devotional service is better than renunciation of work.",
            "englishMeaning": "The Supreme Lord said: Both renunciation of work and work in devotion are good for liberation. But, of the two, work in devotional service is better than renunciation of work.",
            "commentary": "कर्म से भागना संन्यास नहीं, बल्कि कर्मफल की आसक्ति का त्याग ही सच्चा संन्यास है।"
          },
          {
            "id": "bg-5-10",
            "verseNumber": 10,
            "sanskritText": "ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः |\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा || ५-१० ||",
            "sanskrit": "ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः |\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा || ५-१० ||",
            "transliteration": "brahmaṇyādhāya karmāṇi saṅgaṁ tyaktvā karoti yaḥ |\nlipyate na sa pāpena padmapatramivāmbhasā || 5-10 ||",
            "translationHi": "जो पुरुष सब कर्मों को परमात्मा में अर्पण करके और आसक्ति को त्यागकर कर्म करता है, वह जल में कमल के पत्ते की भाँति पाप से कभी लिप्त नहीं होता।",
            "hindiMeaning": "जो पुरुष सब कर्मों को परमात्मा में अर्पण करके और आसक्ति को त्यागकर कर्म करता है, वह जल में कमल के पत्ते की भाँति पाप से कभी लिप्त नहीं होता।",
            "translationEn": "One who performs his duty without attachment, surrendering the results unto the Supreme Lord, is unaffected by sinful action, as the lotus leaf is untouched by water.",
            "englishMeaning": "One who performs his duty without attachment, surrendering the results unto the Supreme Lord, is unaffected by sinful action, as the lotus leaf is untouched by water.",
            "commentary": "संसार में रहते हुए भी संसारी न होना—जैसे कमल का पत्ता जल में रहते हुए भी भीगता नहीं।"
          },
          {
            "id": "bg-5-18",
            "verseNumber": 18,
            "sanskritText": "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि |\nशुनि चैव श्वपाके च पण्डिताः समदर्शिनः || ५-१८ ||",
            "sanskrit": "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि |\nशुनि चैव श्वपाके च पण्डिताः समदर्शिनः || ५-१८ ||",
            "transliteration": "vidyāvinayasampanne brāhmaṇe gavi hastini |\nśuni caiva śvapāke ca paṇḍitāḥ samadarśinaḥ || 5-18 ||",
            "translationHi": "ज्ञानीजन विद्या और विनययुक्त ब्राह्मण में तथा गौ, हाथी, कुत्ते और चाण्डाल में भी समदर्शी (एक ही आत्म-तत्व को देखने वाले) होते हैं।",
            "hindiMeaning": "ज्ञानीजन विद्या और विनययुक्त ब्राह्मण में तथा गौ, हाथी, कुत्ते और चाण्डाल में भी समदर्शी (एक ही आत्म-तत्व को देखने वाले) होते हैं।",
            "translationEn": "The humble sages, by virtue of true knowledge, see with equal vision a learned and gentle brahmana, a cow, an elephant, a dog and a dog-eater (outcaste).",
            "englishMeaning": "The humble sages, by virtue of true knowledge, see with equal vision a learned and gentle brahmana, a cow, an elephant, a dog and a dog-eater (outcaste).",
            "commentary": "अद्वैत दृष्टि की पराकाष्ठा: बाह्य देह और उपाधि के भेद से परे सबके भीतर एक ही परमात्मा का दर्शन।"
          },
          {
            "id": "bg-5-29",
            "verseNumber": 29,
            "sanskritText": "भोक्तारं यज्ञतपसां सर्वलोकमहेश्वरम् |\nसुहृदं सर्वभूतानां ज्ञात्वा मां शान्तिमृच्छति || ५-२९ ||",
            "sanskrit": "भोक्तारं यज्ञतपसां सर्वलोकमहेश्वरम् |\nसुहृदं सर्वभूतानां ज्ञात्वा मां शान्तिमृच्छति || ५-२९ ||",
            "transliteration": "bhoktāraṁ yajñatapasāṁ sarvalokamaheśvaram |\nsuhṛdaṁ sarvabhūtānāṁ jñātvā māṁ śāntimṛcchati || 5-29 ||",
            "translationHi": "मुझे सब यज्ञों और तपों का भोगने वाला, सम्पूर्ण लोकों का महान ईश्वर और समस्त प्राणियों का परम हितैषी (मित्र) जानकर मनुष्य परम शान्ति को प्राप्त होता है।",
            "hindiMeaning": "मुझे सब यज्ञों और तपों का भोगने वाला, सम्पूर्ण लोकों का महान ईश्वर और समस्त प्राणियों का परम हितैषी (मित्र) जानकर मनुष्य परम शान्ति को प्राप्त होता है।",
            "translationEn": "A person in full consciousness of Me, knowing Me to be the ultimate beneficiary of all sacrifices and austerities, the Supreme Lord of all planets and demigods, and the benefactor and well-wisher of all living entities, attains peace from the pangs of material miseries.",
            "englishMeaning": "A person in full consciousness of Me, knowing Me to be the ultimate beneficiary of all sacrifices and austerities, the Supreme Lord of all planets and demigods, and the benefactor and well-wisher of all living entities, attains peace from the pangs of material miseries.",
            "commentary": "शांति का मूल मंत्र: परमात्मा ही परम भोक्ता, परम स्वामी और हमारे अंतरंग सखा हैं।"
          }
        ]
      },
      {
        "id": "bg-ch-6",
        "chapterNumber": 6,
        "titleHi": "अध्याय ६: आत्मसंयमयोग (ध्यानयोग)",
        "titleEn": "Chapter 6: Dhyana Yoga",
        "summaryHi": "मन पर नियंत्रण, ध्यान की विधि, योगाभ्यास के नियम, मन की चंचलता का समाधान एवं योगी का स्थान।",
        "summaryEn": "The science of meditation; conquering the restless mind through practice (Abhyasa) and detachment (Vairagya); the sublime path of the Yogi.",
        "verses": [
          {
            "id": "bg-6-5",
            "verseNumber": 5,
            "sanskritText": "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् |\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः || ६-५ ||",
            "sanskrit": "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् |\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः || ६-५ ||",
            "transliteration": "uddharedātmanātmānaṁ nātmānamavasādayet |\nātmaiva hyātmano bandhurātmaiva ripurātmanaḥ || 6-5 ||",
            "translationHi": "मनुष्य को चाहिए कि वह अपने द्वारा अपना उद्धार करे, अपना पतन न करे; क्योंकि मनुष्य स्वयं ही अपना मित्र है और स्वयं ही अपना शत्रु है।",
            "hindiMeaning": "मनुष्य को चाहिए कि वह अपने द्वारा अपना उद्धार करे, अपना पतन न करे; क्योंकि मनुष्य स्वयं ही अपना मित्र है और स्वयं ही अपना शत्रु है।",
            "translationEn": "One must deliver oneself with the help of his mind, and not degrade oneself. The mind is the friend of the conditioned soul, and his enemy as well.",
            "englishMeaning": "One must deliver oneself with the help of his mind, and not degrade oneself. The mind is the friend of the conditioned soul, and his enemy as well.",
            "commentary": "आत्म-निर्भरता और आत्म-नियंत्रण का सनातन दर्शन। वश में किया हुआ मन मित्र है, अनियंत्रित मन परम शत्रु।"
          },
          {
            "id": "bg-6-26",
            "verseNumber": 26,
            "sanskritText": "यतो यतो निश्चरति मनश्चञ्चलमस्थिरम् |\nततस्ततो नियम्यैतदात्मन्येव वशं नयेत् || ६-२६ ||",
            "sanskrit": "यतो यतो निश्चरति मनश्चञ्चलमस्थिरम् |\nततस्ततो नियम्यैतदात्मन्येव वशं नयेत् || ६-२६ ||",
            "transliteration": "yato yato niścarati manaścañcalamasthiram |\ntatastato niyamyaitadātmanyeva vaśaṁ nayet || 6-26 ||",
            "translationHi": "यह चंचल और अस्थिर मन जहाँ-जहाँ विचरण करता है, वहाँ-वहाँ से इसे रोककर बार-बार आत्मा के ही वश में लाना चाहिए।",
            "hindiMeaning": "यह चंचल और अस्थिर मन जहाँ-जहाँ विचरण करता है, वहाँ-वहाँ से इसे रोककर बार-बार आत्मा के ही वश में लाना चाहिए।",
            "translationEn": "From wherever the mind wanders due to its flickering and unsteady nature, one must certainly withdraw it and bring it back under the control of the Self.",
            "englishMeaning": "From wherever the mind wanders due to its flickering and unsteady nature, one must certainly withdraw it and bring it back under the control of the Self.",
            "commentary": "ध्यान की व्यावहारिक विधि: मन भटके तो निराश न हों, प्रेमपूर्वक उसे पुनः अंतरात्मा में प्रतिष्ठित करें।"
          },
          {
            "id": "bg-6-34",
            "verseNumber": 34,
            "sanskritText": "चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम् |\nतस्याहं निग्रहं मन्ये वायोरिव सुदुष्करम् || ६-३४ ||",
            "sanskrit": "चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम् |\nतस्याहं निग्रहं मन्ये वायोरिव सुदुष्करम् || ६-३४ ||",
            "transliteration": "cañcalaṁ hi manaḥ kṛṣṇa pramāthi balavaddṛḍham |\ntasyāhaṁ nigrahaṁ manye vāyoriva suduṣkaram || 6-34 ||",
            "translationHi": "अर्जुन ने कहा: हे कृष्ण! यह मन बड़ा चंचल, प्रमथनशील, बलवान और दृढ़ है। इसलिए उसका वश में करना मैं वायु को रोकने की भाँति अत्यंत दुष्कर मानता हूँ।",
            "hindiMeaning": "अर्जुन ने कहा: हे कृष्ण! यह मन बड़ा चंचल, प्रमथनशील, बलवान और दृढ़ है। इसलिए उसका वश में करना मैं वायु को रोकने की भाँति अत्यंत दुष्कर मानता हूँ।",
            "translationEn": "Arjuna said: The mind is restless, turbulent, obstinate and very strong, O Krishna, and to subdue it, I think, is more difficult than controlling the wind.",
            "englishMeaning": "Arjuna said: The mind is restless, turbulent, obstinate and very strong, O Krishna, and to subdue it, I think, is more difficult than controlling the wind.",
            "commentary": "अर्जुन प्रत्येक साधक की पीड़ा को व्यक्त करते हैं कि मन को साधना सहज नहीं है।"
          },
          {
            "id": "bg-6-35",
            "verseNumber": 35,
            "sanskritText": "श्रीभगवानुवाच |\nअसंशयं महाबाहो मनो दुर्निग्रहं चलम् |\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते || ६-३५ ||",
            "sanskrit": "श्रीभगवानुवाच |\nअसंशयं महाबाहो मनो दुर्निग्रहं चलम् |\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते || ६-३५ ||",
            "transliteration": "śrībhagavānuvāca |\nasaṁśayaṁ mahābāho mano durnigrahaṁ calam |\nabhyāsena tu kaunteya vairāgyeṇa ca gṛhyate || 6-35 ||",
            "translationHi": "श्रीभगवान् ने कहा: हे महाबाहो! निःसंदेह मन चंचल और कठिनता से वश में होने वाला है; परन्तु हे कुन्तीपुत्र! यह अभ्यास और वैराग्य से वश में हो जाता है।",
            "hindiMeaning": "श्रीभगवान् ने कहा: हे महाबाहो! निःसंदेह मन चंचल और कठिनता से वश में होने वाला है; परन्तु हे कुन्तीपुत्र! यह अभ्यास और वैराग्य से वश में हो जाता है।",
            "translationEn": "Lord Sri Krishna said: O mighty-armed son of Kunti, it is undoubtedly very difficult to curb the restless mind, but it is possible by suitable practice and by detachment.",
            "englishMeaning": "Lord Sri Krishna said: O mighty-armed son of Kunti, it is undoubtedly very difficult to curb the restless mind, but it is possible by suitable practice and by detachment.",
            "commentary": "अभ्यास (निरंतर प्रयत्न) और वैराग्य (अनुचित इच्छाओं से विरक्ति) ही मन को साधने के दो अचूक अस्त्र हैं।"
          },
          {
            "id": "bg-6-47",
            "verseNumber": 47,
            "sanskritText": "योगिनापि सर्वेषां मद्गतेनान्तरात्मना |\nश्रद्धावान् भजते यो मां स मे युक्ततमो मतः || ६-४७ ||",
            "sanskrit": "योगिनापि सर्वेषां मद्गतेनान्तरात्मना |\nश्रद्धावान् भजते यो मां स मे युक्ततमो मतः || ६-४७ ||",
            "transliteration": "yogināmapi sarveṣāṁ madgatenāntarātmanā |\nśraddhāvān bhajate yo māṁ sa me yuktatamo mataḥ || 6-47 ||",
            "translationHi": "समस्त योगियों में भी जो मुझमें लगे हुए अन्तरात्मा से श्रद्धापूर्वक मेरा भजन करता है, वह योगी मुझे परम श्रेष्ठ मान्य है।",
            "hindiMeaning": "समस्त योगियों में भी जो मुझमें लगे हुए अन्तरात्मा से श्रद्धापूर्वक मेरा भजन करता है, वह योगी मुझे परम श्रेष्ठ मान्य है।",
            "translationEn": "And of all yogis, the one with great faith who always abides in Me, thinks of Me within himself, and renders transcendental loving service to Me—he is the most intimately united with Me in yoga and is the highest of all.",
            "englishMeaning": "And of all yogis, the one with great faith who always abides in Me, thinks of Me within himself, and renders transcendental loving service to Me—he is the most intimately united with Me in yoga and is the highest of all.",
            "commentary": "भक्ति-युक्त योगी को समस्त योगियों में सर्वोच्च बताया गया है।"
          }
        ]
      },
      {
        "id": "bg-ch-7",
        "chapterNumber": 7,
        "titleHi": "अध्याय ७: ज्ञानविज्ञानयोग",
        "titleEn": "Chapter 7: Jnana Vijnana Yoga",
        "summaryHi": "परा और अपरा प्रकृति, चारों प्रकार के भक्त (आर्त, जिज्ञासु, अर्थार्थी, ज्ञानी), दैवी माया एवं वासुदेव सर्वमिति की अनुभूति।",
        "summaryEn": "Knowledge of the Ultimate Truth; the material and spiritual energies; the four classes of devotees; overcoming Maya through surrender.",
        "verses": [
          {
            "id": "bg-7-4",
            "verseNumber": 4,
            "sanskritText": "भूमिरापोऽनलो वायुः खं मनो बुद्धिरेव च |\nअहङ्कार इतीयं मे भिन्ना प्रकृतिरष्टधा || ७-४ ||",
            "sanskrit": "भूमिरापोऽनलो वायुः खं मनो बुद्धिरेव च |\nअहङ्कार इतीयं मे भिन्ना प्रकृतिरष्टधा || ७-४ ||",
            "transliteration": "bhūmirāpo'nalo vāyuḥ khaṁ mano buddhireva ca |\nahaṅkāra itīyaṁ me bhinnā prakṛtiraṣṭadhā || 7-4 ||",
            "translationHi": "पृथ्वी, जल, अग्नि, वायु, आकाश, मन, बुद्धि और अहंकार—इस प्रकार आठ भेदों वाली यह मेरी अपरा (जड़) प्रकृति है।",
            "hindiMeaning": "पृथ्वी, जल, अग्नि, वायु, आकाश, मन, बुद्धि और अहंकार—इस प्रकार आठ भेदों वाली यह मेरी अपरा (जड़) प्रकृति है।",
            "translationEn": "Earth, water, fire, air, ether, mind, intelligence and false ego—all together these eight constitute My separated material energies.",
            "englishMeaning": "Earth, water, fire, air, ether, mind, intelligence and false ego—all together these eight constitute My separated material energies.",
            "commentary": "सृष्टि का भौतिक और सूक्ष्म आधार आठ प्रकार की अपरा प्रकृति है, जबकि जीवात्मा परा (चेतन) प्रकृति है।"
          },
          {
            "id": "bg-7-7",
            "verseNumber": 7,
            "sanskritText": "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय |\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव || ७-७ ||",
            "sanskrit": "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय |\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव || ७-७ ||",
            "transliteration": "mattaḥ parataraṁ nānyatkiñcidasti dhanañjaya |\nmayi sarvamidaṁ protaṁ sūtre maṇigaṇā iva || 7-7 ||",
            "translationHi": "हे धनंजय! मुझसे परे दूसरा कुछ भी नहीं है। यह सम्पूर्ण जगत सूत्र में मणियों के सदृश मुझमें ही पिरोया हुआ है।",
            "hindiMeaning": "हे धनंजय! मुझसे परे दूसरा कुछ भी नहीं है। यह सम्पूर्ण जगत सूत्र में मणियों के सदृश मुझमें ही पिरोया हुआ है।",
            "translationEn": "O conqueror of wealth, there is no truth superior to Me. Everything rests upon Me, as pearls are strung on a thread.",
            "englishMeaning": "O conqueror of wealth, there is no truth superior to Me. Everything rests upon Me, as pearls are strung on a thread.",
            "commentary": "माला में धागा अदृश्य रहकर भी मोतियों को धारण करता है; वैसे ही परमात्मा समस्त ब्रह्माण्ड का अदृश्य अधिष्ठान हैं।"
          },
          {
            "id": "bg-7-14",
            "verseNumber": 14,
            "sanskritText": "दैवी ह्येषा गुणमयी मम माया दुरत्यया |\nमामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते || ७-१४ ||",
            "sanskrit": "दैवी ह्येषा गुणमयी मम माया दुरत्यया |\nमामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते || ७-१४ ||",
            "transliteration": "daivī hyeṣā guṇamayī mama māyā duratyayā |\nmāmeva ye prapadyante māyāmetāṁ taranti te || 7-14 ||",
            "translationHi": "क्योंकि यह अलौकिक अर्थात अति अद्भुत त्रिगुणमयी मेरी माया बड़ी दुस्तर है; परन्तु जो पुरुष केवल मेरी ही शरण लेते हैं, वे इस माया को पार कर जाते हैं।",
            "hindiMeaning": "क्योंकि यह अलौकिक अर्थात अति अद्भुत त्रिगुणमयी मेरी माया बड़ी दुस्तर है; परन्तु जो पुरुष केवल मेरी ही शरण लेते हैं, वे इस माया को पार कर जाते हैं।",
            "translationEn": "This divine energy of Mine, consisting of the three modes of material nature, is difficult to overcome. But those who have surrendered unto Me can easily cross beyond it.",
            "englishMeaning": "This divine energy of Mine, consisting of the three modes of material nature, is difficult to overcome. But those who have surrendered unto Me can easily cross beyond it.",
            "commentary": "माया को अपने बल पर जीतना असम्भव है; शरणागति ही इसे पार करने की एकमात्र नौका है।"
          },
          {
            "id": "bg-7-19",
            "verseNumber": 19,
            "sanskritText": "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते |\nवासुदेवः सर्वमिति स महात्मा सुदुर्लभः || ७-१९ ||",
            "sanskrit": "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते |\nवासुदेवः सर्वमिति स महात्मा सुदुर्लभः || ७-१९ ||",
            "transliteration": "bahūnāṁ janmanāmante jñānavānmāṁ prapadyate |\nvāsudevaḥ sarvamiti sa mahātmā sudurlabhaḥ || 7-19 ||",
            "translationHi": "बहुत जन्मों के अन्त में ज्ञानवान पुरुष 'सब कुछ वासुदेव ही हैं'—इस प्रकार मुझे भजता है; वह महात्मा अत्यन्त दुर्लभ है।",
            "hindiMeaning": "बहुत जन्मों के अन्त में ज्ञानवान पुरुष 'सब कुछ वासुदेव ही हैं'—इस प्रकार मुझे भजता है; वह महात्मा अत्यन्त दुर्लभ है।",
            "translationEn": "After many births and deaths, he who is actually in knowledge surrenders unto Me, knowing Me to be the cause of all causes and all that is. Such a great soul is very rare.",
            "englishMeaning": "After many births and deaths, he who is actually in knowledge surrenders unto Me, knowing Me to be the cause of all causes and all that is. Such a great soul is very rare.",
            "commentary": "'वासुदेवः सर्वम्'—यही सनातन ज्ञान का शिखर है जहाँ साधक को कण-कण में परमात्मा का ही विलास दिखता है।"
          }
        ]
      },
      {
        "id": "bg-ch-8",
        "chapterNumber": 8,
        "titleHi": "अध्याय ८: अक्षरब्रह्मयोग",
        "titleEn": "Chapter 8: Akshara Brahma Yoga",
        "summaryHi": "ब्रह्म, अध्यात्म, कर्म, अधिभूत, अधिदैव और अधियज्ञ का स्वरूप; अंतकाल में भगवत्स्मरण की महिमा एवं शुक्ल-कृष्ण गति।",
        "summaryEn": "Attaining the Supreme; the power of meditation at the moment of death; the cyclical nature of cosmic creation and the two paths of departure.",
        "verses": [
          {
            "id": "bg-8-5",
            "verseNumber": 5,
            "sanskritText": "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम् |\nयः प्रयाति स मद्भावं याति नास्त्यत्र संशयः || ८-५ ||",
            "sanskrit": "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम् |\nयः प्रयाति स मद्भावं याति नास्त्यत्र संशयः || ८-५ ||",
            "transliteration": "antakāle ca māmeva smaranmuktvā kalevaram |\nyaḥ prayāti sa madbhāvaṁ yāti nāstyatra saṁśayaḥ || 8-5 ||",
            "translationHi": "जो मनुष्य अन्तकाल में भी मुझको ही स्मरण करता हुआ शरीर को त्याग कर जाता है, वह मेरे साक्षात् स्वरूप को प्राप्त होता है—इसमें कुछ भी संशय नहीं है।",
            "hindiMeaning": "जो मनुष्य अन्तकाल में भी मुझको ही स्मरण करता हुआ शरीर को त्याग कर जाता है, वह मेरे साक्षात् स्वरूप को प्राप्त होता है—इसमें कुछ भी संशय नहीं है।",
            "translationEn": "And whoever, at the end of his life, quits his body remembering Me alone at once attains My nature. Of this there is no doubt.",
            "englishMeaning": "And whoever, at the end of his life, quits his body remembering Me alone at once attains My nature. Of this there is no doubt.",
            "commentary": "अंत समय में वही विचार आता है जिसका जीवन भर अभ्यास किया गया हो; अतः सतत भगवत्स्मरण ही जीवन की साधना होनी चाहिए।"
          },
          {
            "id": "bg-8-7",
            "verseNumber": 7,
            "sanskritText": "तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च |\nमय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयम् || ८-७ ||",
            "sanskrit": "तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च |\nमय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयम् || ८-७ ||",
            "transliteration": "tasmātsarveṣu kāleṣu māmanusmara yudhya ca |\nmayyarpitamanobuddhirmāmevaiṣyasyasaṁśayam || 8-7 ||",
            "translationHi": "इसलिए तू सब समय में मेरा स्मरण कर और युद्ध भी कर। इस प्रकार मुझमें अर्पण किए हुए मन-बुद्धि से युक्त होकर तू निःसंदेह मुझको ही प्राप्त होगा।",
            "hindiMeaning": "इसलिए तू सब समय में मेरा स्मरण कर और युद्ध भी कर। इस प्रकार मुझमें अर्पण किए हुए मन-बुद्धि से युक्त होकर तू निःसंदेह मुझको ही प्राप्त होगा।",
            "translationEn": "Therefore, at all times, remember Me and perform your duty of fighting. With your mind and intellect surrender unto Me, you will surely attain Me without doubt.",
            "englishMeaning": "Therefore, at all times, remember Me and perform your duty of fighting. With your mind and intellect surrender unto Me, you will surely attain Me without doubt.",
            "commentary": "'माम अनुस्मर युध्य च'—हाथ में कर्म और हृदय में परमात्मा, यही गृहस्थ और कर्मयोगी का आदर्श है।"
          }
        ]
      },
      {
        "id": "bg-ch-9",
        "chapterNumber": 9,
        "titleHi": "अध्याय ९: राजविद्याराजगुह्ययोग",
        "titleEn": "Chapter 9: Raja Vidya Raja Guhya Yoga",
        "summaryHi": "परम गुह्य ज्ञान, अनन्य भक्ति का प्रभाव, 'पत्रं पुष्पं फलं तोयम्', और 'योगक्षेमं वहाम्यहम्' का पावन आश्वासन।",
        "summaryEn": "The Sovereign Science and King of Secrets; how the Lord bears the burden of those devoted solely to Him; accepting simple offerings made with love.",
        "verses": [
          {
            "id": "bg-9-22",
            "verseNumber": 22,
            "sanskritText": "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते |\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् || ९-२२ ||",
            "sanskrit": "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते |\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् || ९-२२ ||",
            "transliteration": "ananyāścintayanto māṁ ye janāḥ paryupāsate |\nteṣāṁ nityābhiyuktānāṁ yogakṣemaṁ vahāmyaham || 9-22 ||",
            "translationHi": "जो अनन्य भक्तजन मेरा चिन्तन करते हुए मेरी निष्काम उपासना करते हैं, उन नित्य युक्त पुरुषों के योग (अप्राप्त की प्राप्ति) और क्षेम (प्राप्त की रक्षा) का वहन मैं स्वयं करता हूँ।",
            "hindiMeaning": "जो अनन्य भक्तजन मेरा चिन्तन करते हुए मेरी निष्काम उपासना करते हैं, उन नित्य युक्त पुरुषों के योग (अप्राप्त की प्राप्ति) और क्षेम (प्राप्त की रक्षा) का वहन मैं स्वयं करता हूँ।",
            "translationEn": "To those who are constantly devoted and who worship Me with love, I provide what they lack and preserve what they have.",
            "englishMeaning": "To those who are constantly devoted and who worship Me with love, I provide what they lack and preserve what they have.",
            "commentary": "भगवान् का यह अभय वचन है कि अनन्य भक्त की समस्त आवश्यकताओं और आध्यात्मिक सुरक्षा का भार स्वयं प्रभु उठाते हैं।"
          },
          {
            "id": "bg-9-26",
            "verseNumber": 26,
            "sanskritText": "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति |\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः || ९-२६ ||",
            "sanskrit": "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति |\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः || ९-२६ ||",
            "transliteration": "patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati |\ntadahaṁ bhaktyupahṛtamaśnāmi prayatātmanaḥ || 9-26 ||",
            "translationHi": "जो कोई भक्त मेरे लिए प्रेम से पत्र, पुष्प, फल अथवा जल भेंट करता है, उस शुद्ध बुद्धि निष्काम प्रेमी भक्त का प्रेमपूर्वक लाया हुआ वह उपहार मैं सहर्ष स्वीकार करता हूँ।",
            "hindiMeaning": "जो कोई भक्त मेरे लिए प्रेम से पत्र, पुष्प, फल अथवा जल भेंट करता है, उस शुद्ध बुद्धि निष्काम प्रेमी भक्त का प्रेमपूर्वक लाया हुआ वह उपहार मैं सहर्ष स्वीकार करता हूँ।",
            "translationEn": "If one offers Me with love and devotion a leaf, a flower, a fruit or water, I will accept it.",
            "englishMeaning": "If one offers Me with love and devotion a leaf, a flower, a fruit or water, I will accept it.",
            "commentary": "भगवान् वस्तु के मूल्य के नहीं, भक्त के भाव और प्रेम के भूखे हैं।"
          },
          {
            "id": "bg-9-27",
            "verseNumber": 27,
            "sanskritText": "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत् |\nयत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम् || ९-२७ ||",
            "sanskrit": "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत् |\nयत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम् || ९-२७ ||",
            "transliteration": "yatkaroṣi yadaśnāsi yadjuhoṣi dadāsi yat |\nyattapasyasi kaunteya tatkuruṣva madarpaṇam || 9-27 ||",
            "translationHi": "हे कुन्तीपुत्र! तू जो कुछ करता है, जो कुछ खाता है, जो कुछ हवन करता है, जो कुछ दान देता है और जो कुछ तप करता है, वह सब मुझे अर्पण कर।",
            "hindiMeaning": "हे कुन्तीपुत्र! तू जो कुछ करता है, जो कुछ खाता है, जो कुछ हवन करता है, जो कुछ दान देता है और जो कुछ तप करता है, वह सब मुझे अर्पण कर।",
            "translationEn": "Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform—do that, O son of Kunti, as an offering unto Me.",
            "englishMeaning": "Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform—do that, O son of Kunti, as an offering unto Me.",
            "commentary": "जीवन के प्रत्येक कर्म को प्रभु की पूजा बना देना ही ईश्वरार्पण बुद्धि है।"
          }
        ]
      },
      {
        "id": "bg-ch-10",
        "chapterNumber": 10,
        "titleHi": "अध्याय १०: विभूतियोग",
        "titleEn": "Chapter 10: Vibhuti Yoga",
        "summaryHi": "समस्त सृष्टि में भगवान् की दिव्य विभूतियों का वर्णन; वेदों में सामवेद, देवों में वासुदेव, तेजस्वियों में सूर्य रूप।",
        "summaryEn": "The Opulence of the Absolute; how the Supreme Lord permeates the universe through magnificent manifestations.",
        "verses": [
          {
            "id": "bg-10-8",
            "verseNumber": 8,
            "sanskritText": "अहं सर्वस्य प्रभवो मत्तः सर्वं प्रवर्तते |\nइति मत्वा भजन्ते मां बुधा भावसमन्विताः || १०-८ ||",
            "sanskrit": "अहं सर्वस्य प्रभवो मत्तः सर्वं प्रवर्तते |\nइति मत्वा भजन्ते मां बुधा भावसमन्विताः || १०-८ ||",
            "transliteration": "ahaṁ sarvasya prabhavo mattaḥ sarvaṁ pravartate |\niti matvā bhajante māṁ budhā bhāvasamanvitāḥ || 10-8 ||",
            "translationHi": "मैं सब जगत की उत्पत्ति का मूल कारण हूँ और मुझसे ही सब जगत प्रवृत्त होता है—इस प्रकार मानकर बुद्धिमान जन अनन्य श्रद्धा और भक्ति से मेरा भजन करते हैं।",
            "hindiMeaning": "मैं सब जगत की उत्पत्ति का मूल कारण हूँ और मुझसे ही सब जगत प्रवृत्त होता है—इस प्रकार मानकर बुद्धिमान जन अनन्य श्रद्धा और भक्ति से मेरा भजन करते हैं।",
            "translationEn": "I am the source of all spiritual and material worlds. Everything emanates from Me. The wise who perfectly know this engage in My devotional service with all their hearts.",
            "englishMeaning": "I am the source of all spiritual and material worlds. Everything emanates from Me. The wise who perfectly know this engage in My devotional service with all their hearts.",
            "commentary": "चतुःश्लोकी गीता का यह प्रथम श्लोक है जो परमात्मा को समस्त कारणों का परम कारण उद्घोषित करता है।"
          },
          {
            "id": "bg-10-20",
            "verseNumber": 20,
            "sanskritText": "अहमात्मा गुडाकेश सर्वभूताशयस्थितः |\nअहमादिश्च मध्यं च भूतानामन्त एव च || १०-२० ||",
            "sanskrit": "अहमात्मा गुडाकेश सर्वभूताशयस्थितः |\nअहमादिश्च मध्यं च भूतानामन्त एव च || १०-२० ||",
            "transliteration": "ahamātmā guḍākeśa sarvabhūtāśayasthitaḥ |\nahamādiśca madhyaṁ ca bhūtānāmanta eva ca || 10-20 ||",
            "translationHi": "हे गुड़ाकेश (अर्जुन)! मैं सब भूतों के हृदय में स्थित सबका अंतर्यामी आत्मा हूँ तथा सम्पूर्ण भूतों का आदि, मध्य और अन्त भी मैं ही हूँ।",
            "hindiMeaning": "हे गुड़ाकेश (अर्जुन)! मैं सब भूतों के हृदय में स्थित सबका अंतर्यामी आत्मा हूँ तथा सम्पूर्ण भूतों का आदि, मध्य और अन्त भी मैं ही हूँ।",
            "translationEn": "I am the Self, O Gudakesha, situated in the hearts of all living beings. I am the beginning, the middle and the end of all entities.",
            "englishMeaning": "I am the Self, O Gudakesha, situated in the hearts of all living beings. I am the beginning, the middle and the end of all entities.",
            "commentary": "प्रत्येक हृदय में विराजमान चैतन्य ही साक्षात परमात्मा है।"
          }
        ]
      },
      {
        "id": "bg-ch-11",
        "chapterNumber": 11,
        "titleHi": "अध्याय ११: विश्वरूपदर्शनयोग",
        "titleEn": "Chapter 11: Vishwarupa Darshana Yoga",
        "summaryHi": "अर्जुन को दिव्य दृष्टि की प्राप्ति, भगवान् का अनंतकोटि ब्रह्माण्डव्यापी विराट् रूप, कालोऽस्मि का उद्घोष एवं अनन्य भक्ति का संदेश।",
        "summaryEn": "The Universal Cosmic Form; Arjuna witnesses all creations, gods, suns, and galaxies within the Lord; time the destroyer of worlds.",
        "verses": [
          {
            "id": "bg-11-12",
            "verseNumber": 12,
            "sanskritText": "दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता |\nयदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः || ११-१२ ||",
            "sanskrit": "दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता |\nयदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः || ११-१२ ||",
            "transliteration": "divi sūryasahasrasya bhavedyugapadutthitā |\nyadi bhāḥ sadṛśī sā syādbhāsastasya mahātmanaḥ || 11-12 ||",
            "translationHi": "आकाश में एक साथ सहस्र सूर्यों के उदय होने से जो प्रकाश उत्पन्न हो, वह भी उस महामनस्वी परमात्मा के प्रकाश के सदृश शायद ही हो सके।",
            "hindiMeaning": "आकाश में एक साथ सहस्र सूर्यों के उदय होने से जो प्रकाश उत्पन्न हो, वह भी उस महामनस्वी परमात्मा के प्रकाश के सदृश शायद ही हो सके।",
            "translationEn": "If hundreds of thousands of suns were to rise at once into the sky, their radiance might resemble the effulgence of that Supreme Person in His universal form.",
            "englishMeaning": "If hundreds of thousands of suns were to rise at once into the sky, their radiance might resemble the effulgence of that Supreme Person in His universal form.",
            "commentary": "विराट् रूप के असीम और अवर्णनीय तेज की यह अनुपम उपमा है।"
          },
          {
            "id": "bg-11-32",
            "verseNumber": 32,
            "sanskritText": "कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्ततः |\nऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः || ११-३२ ||",
            "sanskrit": "कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्ततः |\nऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः || ११-३२ ||",
            "transliteration": "kālo'smi lokakṣayakṛtpravṛddho lokānsamāhartumiha pravṛttaḥ |\nṛte'pi tvāṁ na bhaviṣyanti sarve ye'vasthitāḥ pratyanīkeṣu yodhāḥ || 11-32 ||",
            "translationHi": "श्रीभगवान् ने कहा: मैं लोकों का नाश करने वाला बढ़ा हुआ महाकाल हूँ। इस समय इन लोकों को समेटने के लिए प्रवृत्त हुआ हूँ। तुम्हारे युद्ध न करने पर भी प्रतिपक्षी सेनाओं में स्थित ये समस्त योद्धा जीवित नहीं रहेंगे।",
            "hindiMeaning": "श्रीभगवान् ने कहा: मैं लोकों का नाश करने वाला बढ़ा हुआ महाकाल हूँ। इस समय इन लोकों को समेटने के लिए प्रवृत्त हुआ हूँ। तुम्हारे युद्ध न करने पर भी प्रतिपक्षी सेनाओं में स्थित ये समस्त योद्धा जीवित नहीं रहेंगे।",
            "translationEn": "The Supreme Lord said: Time I am, the great destroyer of the worlds, and I have come here to destroy all people. Even without your participation, all the warriors standing on opposite sides shall cease to exist.",
            "englishMeaning": "The Supreme Lord said: Time I am, the great destroyer of the worlds, and I have come here to destroy all people. Even without your participation, all the warriors standing on opposite sides shall cease to exist.",
            "commentary": "काल (समय) के रूप में भगवान् ही परिवर्तन और न्याय के संचालक हैं।"
          }
        ]
      },
      {
        "id": "bg-ch-12",
        "chapterNumber": 12,
        "titleHi": "अध्याय १२: भक्तियोग",
        "titleEn": "Chapter 12: Bhakti Yoga",
        "summaryHi": "सगुण और निर्गुण उपासना की तुलना, भक्त के ३५ परम पावन लक्षण, अद्वेष, करुणा, क्षमा एवं समभाव की महिमा।",
        "summaryEn": "The Yoga of Devotion; pure loving devotion vs unmanifest meditation; divine qualities that make a devotee dearest to the Lord.",
        "verses": [
          {
            "id": "bg-12-13",
            "verseNumber": 13,
            "sanskritText": "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च |\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी || १२-१३ ||",
            "sanskrit": "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च |\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी || १२-१३ ||",
            "transliteration": "adveṣṭā sarvabhūtānāṁ maitraḥ karuṇa eva ca |\nnirmamo nirahaṅkāraḥ samaduḥkhasukhaḥ kṣamī || 12-13 ||",
            "translationHi": "जो पुरुष सब भूतों में द्वेषभाव से रहित, सबका प्रेमी और दयालु है तथा ममता और अहंकार से रहित, सुख-दुःख की प्राप्ति में सम और क्षमावान है—वह भक्त मुझे प्रिय है।",
            "hindiMeaning": "जो पुरुष सब भूतों में द्वेषभाव से रहित, सबका प्रेमी और दयालु है तथा ममता और अहंकार से रहित, सुख-दुःख की प्राप्ति में सम और क्षमावान है—वह भक्त मुझे प्रिय है।",
            "translationEn": "One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in happiness and distress, and who is forgiving—such a devotee is very dear to Me.",
            "englishMeaning": "One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in happiness and distress, and who is forgiving—such a devotee is very dear to Me.",
            "commentary": "सच्ची भक्ति कर्मकांड में नहीं, चरित्र और अंतःकरण की पवित्रता में है।"
          }
        ]
      },
      {
        "id": "bg-ch-13",
        "chapterNumber": 13,
        "titleHi": "अध्याय १३: क्षेत्रक्षेत्रज्ञविभागयोग",
        "titleEn": "Chapter 13: Kshetra Kshetrajna Vibhaga Yoga",
        "summaryHi": "शरीर रूपी क्षेत्र और आत्मा रूपी क्षेत्रज्ञ का भेद, ज्ञान के २० लक्षण, प्रकृति और पुरुष का संबंध।",
        "summaryEn": "Nature, the Enjoyer, and Consciousness; discriminating between the field (body) and the knower of the field (soul).",
        "verses": [
          {
            "id": "bg-13-2",
            "verseNumber": 2,
            "sanskritText": "क्षेत्रज्ञं चापि मां विद्धि सर्वक्षेत्रेषु भारत |\nक्षेत्रक्षेत्रज्ञयोर्ज्ञानं यत्तज्ज्ञानं मतं मम || १३-२ ||",
            "sanskrit": "क्षेत्रज्ञं चापि मां विद्धि सर्वक्षेत्रेषु भारत |\nक्षेत्रक्षेत्रज्ञयोर्ज्ञानं यत्तज्ज्ञानं मतं मम || १३-२ ||",
            "transliteration": "kṣetrajñaṁ cāpi māṁ viddhi sarvakṣetreṣu bhārata |\nkṣetrakṣetrajñayorjñānaṁ yattajjñānaṁ mataṁ mama || 13-2 ||",
            "translationHi": "हे भारत! सब क्षेत्रों में क्षेत्रज्ञ (जीवात्मा का साक्षी) भी तू मुझे ही जान और क्षेत्र तथा क्षेत्रज्ञ को जो तत्व से जानना है, वही सच्चा ज्ञान है—ऐसा मेरा मत है।",
            "hindiMeaning": "हे भारत! सब क्षेत्रों में क्षेत्रज्ञ (जीवात्मा का साक्षी) भी तू मुझे ही जान और क्षेत्र तथा क्षेत्रज्ञ को जो तत्व से जानना है, वही सच्चा ज्ञान है—ऐसा मेरा मत है।",
            "translationEn": "O scion of Bharata, you should understand that I am also the knower in all bodies, and to understand this body and its knower is called knowledge. That is My opinion.",
            "englishMeaning": "O scion of Bharata, you should understand that I am also the knower in all bodies, and to understand this body and its knower is called knowledge. That is My opinion.",
            "commentary": "यह देह एक खेत के समान है जिसमें बोए गए कर्मों का फल काटा जाता है; आत्मा इसका स्वामी और परमात्मा इसका परम साक्षी है।"
          }
        ]
      },
      {
        "id": "bg-ch-14",
        "chapterNumber": 14,
        "titleHi": "अध्याय १४: गुणत्रयविभागयोग",
        "titleEn": "Chapter 14: Gunatraya Vibhaga Yoga",
        "summaryHi": "सत्त्व, रज और तम तीनों गुणों का स्वरूप, उनका बंधनकारी प्रभाव, गुणातीत बनने के लक्षण और उपाय।",
        "summaryEn": "The Three Modes of Material Nature (Sattva, Rajas, Tamas); how they bind the soul, and how to transcend them (Gunatita).",
        "verses": [
          {
            "id": "bg-14-6",
            "verseNumber": 6,
            "sanskritText": "तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम् |\nसुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ || १४-६ ||",
            "sanskrit": "तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम् |\nसुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ || १४-६ ||",
            "transliteration": "tatra sattvaṁ nirmalatvātprakāśakamanāmayam |\nsukhasaṅgena badhnāti jñānasaṅgena cānagha || 14-6 ||",
            "translationHi": "हे निष्पाप! उन तीनों गुणों में सत्त्वगुण निर्मल होने के कारण प्रकाशक और विकाररहित है, वह सुख की आसक्ति से और ज्ञान की आसक्ति से मनुष्य को बाँधता है।",
            "hindiMeaning": "हे निष्पाप! उन तीनों गुणों में सत्त्वगुण निर्मल होने के कारण प्रकाशक और विकाररहित है, वह सुख की आसक्ति से और ज्ञान की आसक्ति से मनुष्य को बाँधता है।",
            "translationEn": "O sinless one, the mode of goodness, being purer than the others, is illuminating, and it frees one from all sinful reactions. Those situated in that mode become conditioned by a sense of happiness and knowledge.",
            "englishMeaning": "O sinless one, the mode of goodness, being purer than the others, is illuminating, and it frees one from all sinful reactions. Those situated in that mode become conditioned by a sense of happiness and knowledge.",
            "commentary": "सत्त्वगुण श्रेष्ठ है, किंतु मोक्ष हेतु साधक को सत्त्व के भी अहंकार से पार होकर गुणातीत होना पड़ता है।"
          }
        ]
      },
      {
        "id": "bg-ch-15",
        "chapterNumber": 15,
        "titleHi": "अध्याय १५: पुरुषोत्तमयोग",
        "titleEn": "Chapter 15: Purushottama Yoga",
        "summaryHi": "उलटे अश्वत्थ वृक्ष का रूपक, क्षर और अक्षर पुरुष, क्षर और अक्षर से परे पुरुषोत्तम स्वरूप का प्रतिपादन।",
        "summaryEn": "The Yoga of the Supreme Person; the cosmic inverted banyan tree; Kshara (fallible), Akshara (infallible), and Uttama Purusha (the Supreme).",
        "verses": [
          {
            "id": "bg-15-1",
            "verseNumber": 1,
            "sanskritText": "श्रीभगवानुवाच |\nऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम् |\nछन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित् || १५-१ ||",
            "sanskrit": "श्रीभगवानुवाच |\nऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम् |\nछन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित् || १५-१ ||",
            "transliteration": "śrībhagavānuvāca |\nūrdhvamūlamadhaḥśākhamaśvatthaṁ prāhuravyayam |\nchandāṁsi yasya parṇāni yastaṁ veda sa vedavit || 15-1 ||",
            "translationHi": "श्रीभगवान् ने कहा: ऊपर की ओर मूल वाले तथा नीचे की ओर शाखाओं वाले जिस संसार रूपी अश्वत्थ वृक्ष को अविनाशी कहते हैं, वेद जिसके पत्ते हैं—उस वृक्ष को जो जानता है, वही वेद का ज्ञाता है।",
            "hindiMeaning": "श्रीभगवान् ने कहा: ऊपर की ओर मूल वाले तथा नीचे की ओर शाखाओं वाले जिस संसार रूपी अश्वत्थ वृक्ष को अविनाशी कहते हैं, वेद जिसके पत्ते हैं—उस वृक्ष को जो जानता है, वही वेद का ज्ञाता है।",
            "translationEn": "The Supreme Lord said: There is a banyan tree which has its roots upward and its branches down and whose leaves are the Vedic hymns. One who knows this tree is the knower of the Vedas.",
            "englishMeaning": "The Supreme Lord said: There is a banyan tree which has its roots upward and its branches down and whose leaves are the Vedic hymns. One who knows this tree is the knower of the Vedas.",
            "commentary": "संसार रूपी वृक्ष का मूल परमात्मा (ऊर्ध्व) में है; वैराग्य रूपी कुल्हाड़ी से इसकी आसक्ति को काटकर परम पद की खोज करनी चाहिए।"
          },
          {
            "id": "bg-15-15",
            "verseNumber": 15,
            "sanskritText": "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च |\nवेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् || १५-१५ ||",
            "sanskrit": "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च |\nवेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् || १५-१५ ||",
            "transliteration": "sarvasya cāhaṁ hṛdi sanniviṣṭo mattaḥ smṛtirjñānamapohanaṁ ca |\nvedaiśca sarvairahameva vedyo vedāntakṛdvedavideva cāham || 15-15 ||",
            "translationHi": "मैं ही सब प्राणियों के हृदय में स्थित हूँ; मुझसे ही स्मृति, ज्ञान और अपोहन (विस्मृति) होते हैं। सब वेदों द्वारा मैं ही जानने योग्य हूँ तथा वेदान्त का कर्ता और वेदों का ज्ञाता भी मैं ही हूँ।",
            "hindiMeaning": "मैं ही सब प्राणियों के हृदय में स्थित हूँ; मुझसे ही स्मृति, ज्ञान और अपोहन (विस्मृति) होते हैं। सब वेदों द्वारा मैं ही जानने योग्य हूँ तथा वेदान्त का कर्ता और वेदों का ज्ञाता भी मैं ही हूँ।",
            "translationEn": "I am seated in everyone's heart, and from Me come remembrance, knowledge and forgetfulness. By all the Vedas, I am to be known. Indeed, I am the compiler of Vedanta, and I am the knower of the Vedas.",
            "englishMeaning": "I am seated in everyone's heart, and from Me come remembrance, knowledge and forgetfulness. By all the Vedas, I am to be known. Indeed, I am the compiler of Vedanta, and I am the knower of the Vedas.",
            "commentary": "समस्त ज्ञान और चेतना का मूल स्रोत परमात्मा ही हैं।"
          }
        ]
      },
      {
        "id": "bg-ch-16",
        "chapterNumber": 16,
        "titleHi": "अध्याय १६: दैवासुरसम्पद्विभागयोग",
        "titleEn": "Chapter 16: Daivasura Sampad Vibhaga Yoga",
        "summaryHi": "दैवी संपदा (अभय, सत्य, अहिंसा, दान आदि) और आसुरी संपदा (दम्भ, दर्प, क्रोध, अज्ञान); नरक के तीन द्वार: काम, क्रोध और लोभ।",
        "summaryEn": "The Divine and Demoniac Natures; virtue leading to liberation and vice leading to bondage; the three gates to hell: lust, anger, and greed.",
        "verses": [
          {
            "id": "bg-16-1",
            "verseNumber": 1,
            "sanskritText": "श्रीभगवानुवाच |\nअभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः |\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् || १६-१ ||",
            "sanskrit": "श्रीभगवानुवाच |\nअभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः |\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् || १६-१ ||",
            "transliteration": "śrībhagavānuvāca |\nabhayaṁ sattvasaṁśuddhijñānayogavyavasthitiḥ |\ndānaṁ damaśca yajñaśca svādhyāyastapa ārjavam || 16-1 ||",
            "translationHi": "श्रीभगवान् ने कहा: भय का सर्वथा अभाव, अन्तःकरण की शुद्धि, ज्ञानयोग में निरंतर स्थिति, दान, इन्द्रियदमन, यज्ञ, स्वाध्याय, तप और सरलता—ये सब दैवी सम्पदा के लक्षण हैं।",
            "hindiMeaning": "श्रीभगवान् ने कहा: भय का सर्वथा अभाव, अन्तःकरण की शुद्धि, ज्ञानयोग में निरंतर स्थिति, दान, इन्द्रियदमन, यज्ञ, स्वाध्याय, तप और सरलता—ये सब दैवी सम्पदा के लक्षण हैं।",
            "translationEn": "The Supreme Lord said: Fearlessness, purification of one's existence, cultivation of spiritual knowledge, charity, self-control, sacrifice, Vedic study, austerity, simplicity—these are transcendental qualities.",
            "englishMeaning": "The Supreme Lord said: Fearlessness, purification of one's existence, cultivation of spiritual knowledge, charity, self-control, sacrifice, Vedic study, austerity, simplicity—these are transcendental qualities.",
            "commentary": "दैवी गुणों का प्रथम गुण 'अभय' (निडरता) है, क्योंकि भयमुक्त मन ही सत्य का आचरण कर सकता है।"
          },
          {
            "id": "bg-16-21",
            "verseNumber": 21,
            "sanskritText": "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः |\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् || १६-२१ ||",
            "sanskrit": "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः |\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् || १६-२१ ||",
            "transliteration": "trividhaṁ narakasyedaṁ dvāraṁ nāśanamātmanaḥ |\nkāmaḥ krodhastathā lobhastasmādetattrayaṁ tyajet || 16-21 ||",
            "translationHi": "काम, क्रोध तथा लोभ—यह तीन प्रकार का नरक का द्वार आत्मा का नाश करने वाला है, इसलिए इन तीनों का त्याग कर देना चाहिए।",
            "hindiMeaning": "काम, क्रोध तथा लोभ—यह तीन प्रकार का नरक का द्वार आत्मा का नाश करने वाला है, इसलिए इन तीनों का त्याग कर देना चाहिए।",
            "translationEn": "There are three gates leading to this hell—lust, anger and greed. Every sane man should give these up, for they lead to the degradation of the soul.",
            "englishMeaning": "There are three gates leading to this hell—lust, anger and greed. Every sane man should give these up, for they lead to the degradation of the soul.",
            "commentary": "काम, क्रोध और लोभ ही मानव के पतन के तीन मुख्य कारण हैं।"
          }
        ]
      },
      {
        "id": "bg-ch-17",
        "chapterNumber": 17,
        "titleHi": "अध्याय १७: श्रद्धात्रयविभागयोग",
        "titleEn": "Chapter 17: Shraddhatraya Vibhaga Yoga",
        "summaryHi": "सात्त्विक, राजसिक और तामसिक श्रद्धा, आहार, यज्ञ, तप और दान का त्रिविध स्वरूप; 'ॐ तत् सत्' का पावन रहस्य।",
        "summaryEn": "The Divisions of Faith; threefold nature of faith, food, sacrifice, austerity, and charity; the transcendental vibration 'Om Tat Sat'.",
        "verses": [
          {
            "id": "bg-17-3",
            "verseNumber": 3,
            "sanskritText": "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत |\nश्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः || १७-३ ||",
            "sanskrit": "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत |\nश्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः || १७-३ ||",
            "transliteration": "sattvānurūpā sarvasya śraddhā bhavati bhārata |\nśraddhāmayo'yaṁ puruṣo yo yacchraddhaḥ sa eva saḥ || 17-3 ||",
            "translationHi": "हे भारत! सभी मनुष्यों की श्रद्धा उनके अन्तःकरण के अनुरूप होती है। यह पुरुष श्रद्धामय है; इसलिए जो जैसी श्रद्धा वाला है, वह स्वयं भी वही है।",
            "hindiMeaning": "हे भारत! सभी मनुष्यों की श्रद्धा उनके अन्तःकरण के अनुरूप होती है। यह पुरुष श्रद्धामय है; इसलिए जो जैसी श्रद्धा वाला है, वह स्वयं भी वही है।",
            "translationEn": "O son of Bharata, according to one's existence under the various modes of nature, one evolves a particular kind of faith. The living being is said to be of a particular faith according to the modes he has acquired.",
            "englishMeaning": "O son of Bharata, according to one's existence under the various modes of nature, one evolves a particular kind of faith. The living being is said to be of a particular faith according to the modes he has acquired.",
            "commentary": "मनुष्य वैसा ही बन जाता है जैसी उसकी गहरी श्रद्धा और आस्था होती है।"
          },
          {
            "id": "bg-17-23",
            "verseNumber": 23,
            "sanskritText": "ॐ तत्सदिति निर्देशो ब्रह्मणस्त्रिविधः स्मृतः |\nब्राह्मणास्तेन वेदाश्च यज्ञाश्च विहिताः पुरा || १७-२३ ||",
            "sanskrit": "ॐ तत्सदिति निर्देशो ब्रह्मणस्त्रिविधः स्मृतः |\nब्राह्मणास्तेन वेदाश्च यज्ञाश्च विहिताः पुरा || १७-२३ ||",
            "transliteration": "oṁ tatsaditi nirdeśo brahmaṇastrividhaḥ smṛtaḥ |\nbrāhmaṇāstena vedāśca yajñāśca vihitāḥ purā || 17-23 ||",
            "translationHi": "'ॐ तत् सत्'—यह तीन प्रकार का सच्चिदानन्दघन ब्रह्म का नाम कहा गया है। उसी से सृष्टि के आदि में वेदों तथा यज्ञों की रचना हुई।",
            "hindiMeaning": "'ॐ तत् सत्'—यह तीन प्रकार का सच्चिदानन्दघन ब्रह्म का नाम कहा गया है। उसी से सृष्टि के आदि में वेदों तथा यज्ञों की रचना हुई।",
            "translationEn": "From the beginning of creation, the three words 'Om Tat Sat' were used to indicate the Supreme Absolute Truth.",
            "englishMeaning": "From the beginning of creation, the three words 'Om Tat Sat' were used to indicate the Supreme Absolute Truth.",
            "commentary": "'ॐ तत् सत्' समस्त वैदिक कर्मों और यज्ञों को पूर्णता और दिव्यता प्रदान करता है।"
          }
        ]
      },
      {
        "id": "bg-ch-18",
        "chapterNumber": 18,
        "titleHi": "अध्याय १८: मोक्षसंन्यासयोग",
        "titleEn": "Chapter 18: Moksha Sannyasa Yoga",
        "summaryHi": "त्याग और संन्यास का यथार्थ स्वरूप, कर्म के पाँच हेतु, सर्वधर्मान्परित्यज्य की चरम शरणागति, गीता का उपसंहार एवं विजय उद्घोष।",
        "summaryEn": "Conclusion—The Perfection of Renunciation; complete surrender to the Supreme Will; 'Sarva Dharman Parityajya'; eternal victory where Krishna and Arjuna unite.",
        "verses": [
          {
            "id": "bg-18-65",
            "verseNumber": 65,
            "sanskritText": "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु |\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे || १८-६५ ||",
            "sanskrit": "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु |\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे || १८-६५ ||",
            "transliteration": "manmanā bhava madbhakto madyājī māṁ namaskuru |\nmāmevaiṣyasi satyaṁ te pratijāne priyo'si me || 18-65 ||",
            "translationHi": "मुझमें मन वाला हो, मेरा भक्त बन, मेरा पूजन करने वाला हो और मुझे नमस्कार कर। ऐसा करने से तू मुझे ही प्राप्त होगा, यह मैं तुझसे सत्य प्रतिज्ञा करता हूँ, क्योंकि तू मेरा परम प्रिय है।",
            "hindiMeaning": "मुझमें मन वाला हो, मेरा भक्त बन, मेरा पूजन करने वाला हो और मुझे नमस्कार कर। ऐसा करने से तू मुझे ही प्राप्त होगा, यह मैं तुझसे सत्य प्रतिज्ञा करता हूँ, क्योंकि तू मेरा परम प्रिय है।",
            "translationEn": "Always think of Me, become My devotee, worship Me and offer your homage unto Me. Thus you will come to Me without fail. I promise you this because you are My very dear friend.",
            "englishMeaning": "Always think of Me, become My devotee, worship Me and offer your homage unto Me. Thus you will come to Me without fail. I promise you this because you are My very dear friend.",
            "commentary": "भगवान् अपने भक्त को सत्य प्रतिज्ञापूर्वक अपनी प्राप्ति का वरदान देते हैं।"
          },
          {
            "id": "bg-18-66",
            "verseNumber": 66,
            "sanskritText": "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज |\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः || १८-६६ ||",
            "sanskrit": "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज |\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः || १८-६६ ||",
            "transliteration": "sarvadharmānparityajya māmekaṁ śaraṇaṁ vraja |\nahaṁ tvāṁ sarvapāpebhyo mokṣayiṣyāmi mā śucaḥ || 18-66 ||",
            "translationHi": "सम्पूर्ण धर्मों को अर्थात सब कर्तव्य-कर्मों के अहंकार को त्यागकर केवल मेरी ही शरण में आ जा। मैं तुझे समस्त पापों से मुक्त कर दूँगा, तू शोक मत कर।",
            "hindiMeaning": "सम्पूर्ण धर्मों को अर्थात सब कर्तव्य-कर्मों के अहंकार को त्यागकर केवल मेरी ही शरण में आ जा। मैं तुझे समस्त पापों से मुक्त कर दूँगा, तू शोक मत कर।",
            "translationEn": "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
            "englishMeaning": "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
            "commentary": "यह गीता का 'चरम श्लोक' है—सम्पूर्ण शास्त्रों का सार। अहंकार-रहित पूर्ण शरणागति ही मुक्ति का सर्वोच्च द्वार है।"
          },
          {
            "id": "bg-18-78",
            "verseNumber": 78,
            "sanskritText": "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः |\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम || १८-७८ ||",
            "sanskrit": "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः |\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम || १८-७८ ||",
            "transliteration": "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanurdharaḥ |\ntatra śrīrvijayo bhūtirdhruvā nītirmatirmama || 18-78 ||",
            "translationHi": "संजय ने कहा: जहाँ योगेश्वर भगवान् श्रीकृष्ण हैं और जहाँ गाण्डीवधारी अर्जुन है, वहीं श्री (ऐश्वर्य), विजय, विभूति और अचल नीति है—ऐसा मेरा निश्चित मत है।",
            "hindiMeaning": "संजय ने कहा: जहाँ योगेश्वर भगवान् श्रीकृष्ण हैं और जहाँ गाण्डीवधारी अर्जुन है, वहीं श्री (ऐश्वर्य), विजय, विभूति और अचल नीति है—ऐसा मेरा निश्चित मत है।",
            "translationEn": "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality. That is my opinion.",
            "englishMeaning": "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality. That is my opinion.",
            "commentary": "गीता का मंगलकारी समापन: जहाँ ईश्वर का मार्गदर्शन (योगेश्वर कृष्ण) और मनुष्य का पुरुषार्थ (धनुर्धर पार्थ) एक साथ होते हैं, वहाँ विजय सुनिश्चित है।"
          }
        ]
      }
    ]
  },
  "ramcharitmanas": {
    "id": "ramcharitmanas",
    "slug": "ramcharitmanas",
    "titleHi": "श्रीरामचरितमानस",
    "titleEn": "Shri Ramcharitmanas",
    "author": "गोस्वामी तुलसीदास जी",
    "category": "itihasa",
    "descriptionHi": "अवधी भाषा में गोस्वामी तुलसीदास जी द्वारा रचित मर्यादा पुरुषोत्तम भगवान श्री राम के जीवन का परम पावन चरित्र। सातों काण्डों में धर्म, मर्यादा, भ्रातृ-प्रेम, और शरणागति का अनुपम दर्शन।",
    "descriptionEn": "The immortal epic composed in Awadhi by Goswami Tulsidas, celebrating the virtuous life of Lord Rama across all seven Kandas.",
    "totalVerses": 18,
    "totalChapters": 7,
    "chapters": [
      {
        "id": "rcm-ch-1",
        "chapterNumber": 1,
        "titleHi": "काण्ड १: बालकाण्ड",
        "titleEn": "Kanda 1: Bala Kanda",
        "summaryHi": "मंगलाचरण, गुरु वन्दना, नाम महिमा, शिव-पार्वती विवाह, श्रीराम जन्म, विश्वामित्र यज्ञ रक्षा, धनुष भंग एवं श्रीसीता-राम विवाह।",
        "summaryEn": "The invocation, glory of the Divine Name, marriage of Lord Shiva and Parvati, birth of Lord Rama, protection of sage Vishvamitra's sacrifice, and the divine marriage of Rama and Sita.",
        "verses": [
          {
            "id": "rcm-1-1",
            "verseNumber": 1,
            "sanskritText": "वर्णानामर्थसङ्घानां रसानां छन्दसामपि |\nमङ्गलानां च कर्त्तारौ वन्दै वाणीविनायकौ ||",
            "sanskrit": "वर्णानामर्थसङ्घानां रसानां छन्दसामपि |\nमङ्गलानां च कर्त्तारौ वन्दै वाणीविनायकौ ||",
            "transliteration": "varṇānāmarthasaṅghānāṁ rasānāṁ chandasāmapi |\nmaṅgalānāṁ ca karttārau vande vāṇīvināyakau ||",
            "translationHi": "अक्षरों, अर्थसमूहों, रसों, छन्दों और मंगलों को करने वाली सरस्वती जी और गणेश जी की मैं वन्दना करता हूँ।",
            "hindiMeaning": "अक्षरों, अर्थसमूहों, रसों, छन्दों और मंगलों को करने वाली सरस्वती जी और गणेश जी की मैं वन्दना करता हूँ।",
            "translationEn": "I venerate Goddess Sarasvati and Lord Ganesha, the creators of letters, of meanings, of sentiments, of metres, and of all auspicious blessings.",
            "englishMeaning": "I venerate Goddess Sarasvati and Lord Ganesha, the creators of letters, of meanings, of sentiments, of metres, and of all auspicious blessings.",
            "commentary": "गोस्वामी तुलसीदास जी ने श्रीरामचरितमानस का शुभारम्भ ज्ञान और विघ्नविनाशक शक्तियों की वन्दना से किया है।"
          },
          {
            "id": "rcm-1-2",
            "verseNumber": 2,
            "sanskritText": "बन्दउँ गुरु पद पदुम परागा | सुरुचि सुबास सरस अनुरागा ||\nअमिअ मूरिमय चूरन चारू | समन सकल भव रुज परिवारू ||",
            "sanskrit": "बन्दउँ गुरु पद पदुम परागा | सुरुचि सुबास सरस अनुरागा ||\nअमिअ मूरिमय चूरन चारू | समन सकल भव रुज परिवारू ||",
            "transliteration": "banda'u guru pada paduma parāgā | suruci subāsa sarasa anurāgā ||\namia mūrimaya cūrana cārū | samana sakala bhava ruja parivārū ||",
            "translationHi": "मैं गुरु महाराज के चरण कमलों की रज की वन्दना करता हूँ, जो सुरुचि, सुगन्ध और अनुराग रूपी रस से परिपूर्ण है। वह अमर मूल का सुन्दर चूर्ण है जो सम्पूर्ण भवरोगों का नाश करने वाला है।",
            "hindiMeaning": "मैं गुरु महाराज के चरण कमलों की रज की वन्दना करता हूँ, जो सुरुचि, सुगन्ध और अनुराग रूपी रस से परिपूर्ण है। वह अमर मूल का सुन्दर चूर्ण है जो सम्पूर्ण भवरोगों का नाश करने वाला है।",
            "translationEn": "I revere the pollen of the lotus feet of the Guru, full of spiritual beauty, sweet fragrance, and love. It is the divine medicinal dust that cures the disease of mundane existence.",
            "englishMeaning": "I revere the pollen of the lotus feet of the Guru, full of spiritual beauty, sweet fragrance, and love. It is the divine medicinal dust that cures the disease of mundane existence.",
            "commentary": "गुरु-कृपा ही भक्ति और ज्ञान के पथ पर अग्रसर होने की प्रथम कुंजी है।"
          },
          {
            "id": "rcm-1-3",
            "verseNumber": 3,
            "sanskritText": "भए प्रगट कृपाला दीनदयाला कौसल्या हितकारी |\nहरषित महतारी मुनि मन हारी अद्भुत रूप बिचारी ||",
            "sanskrit": "भए प्रगट कृपाला दीनदयाला कौसल्या हितकारी |\nहरषित महतारी मुनि मन हारी अद्भुत रूप बिचारी ||",
            "transliteration": "bhae pragaṭa kṛpālā dīnadayālā kausalyā hitakārī |\nharaṣita mahatārī muni mana hārī adbhuta rūpa bicārī ||",
            "translationHi": "दीनों पर दया करने वाले, कौसल्या जी के हितकारी कृपालु प्रभु प्रकट हुए। मुनियों के मन को हरने वाले उनके अद्भुत रूप का विचार करके माता हर्ष से भर गईं।",
            "hindiMeaning": "दीनों पर दया करने वाले, कौसल्या जी के हितकारी कृपालु प्रभु प्रकट हुए। मुनियों के मन को हरने वाले उनके अद्भुत रूप का विचार करके माता हर्ष से भर गईं।",
            "translationEn": "The compassionate Lord, benefactor of Kausalya and merciful to the meek, manifested Himself. Beholding His wondrous form which enchants the minds of sages, Mother Kausalya was filled with supreme joy.",
            "englishMeaning": "The compassionate Lord, benefactor of Kausalya and merciful to the meek, manifested Himself. Beholding His wondrous form which enchants the minds of sages, Mother Kausalya was filled with supreme joy.",
            "commentary": "रामनवमी के पावन अवसर पर गाई जाने वाली भगवान् के प्राकट्य की विश्वप्रसिद्ध पावन स्तुति।"
          },
          {
            "id": "rcm-1-4",
            "verseNumber": 4,
            "sanskritText": "उदित उदयगिरि मंच पर रघुबर बालपतंग |\nबिकसे संत सरोज सब हरषे लोचन भृंग ||",
            "sanskrit": "उदित उदयगिरि मंच पर रघुबर बालपतंग |\nबिकसे संत सरोज सब हरषे लोचन भृंग ||",
            "transliteration": "udita udayagiri mañca para raghubara bālapatanga |\nbikase santa saroja saba haraṣe locana bhṛṅga ||",
            "translationHi": "उदयाचल रूपी मंच पर रघुकुल शिरोमणि श्री राम रूपी बाल सूर्य के उदित होते ही संत रूपी सभी कमल खिल उठे और उनके नेत्र रूपी भौंरे हर्षित हो गए।",
            "hindiMeaning": "उदयाचल रूपी मंच पर रघुकुल शिरोमणि श्री राम रूपी बाल सूर्य के उदित होते ही संत रूपी सभी कमल खिल उठे और उनके नेत्र रूपी भौंरे हर्षित हो गए।",
            "translationEn": "As Sri Rama, like the rising young sun, mounted the stage representing the eastern mountain, all the saints blossomed like lotuses, and their eyes rejoiced like bees.",
            "englishMeaning": "As Sri Rama, like the rising young sun, mounted the stage representing the eastern mountain, all the saints blossomed like lotuses, and their eyes rejoiced like bees.",
            "commentary": "जनकपुर में शिवधनुष भंजन के समय श्रीराम के दिव्य तेज का रूपक।"
          }
        ]
      },
      {
        "id": "rcm-ch-2",
        "chapterNumber": 2,
        "titleHi": "काण्ड २: अयोध्याकाण्ड",
        "titleEn": "Kanda 2: Ayodhya Kanda",
        "summaryHi": "राज्याभिषेक की तैयारी, कैकेयी वरदान, श्रीराम वनगमन, केवट संवाद, चित्रकूट निवास, भरत जी का आगमन एवं पादुका प्रदान।",
        "summaryEn": "The preparations for Rama's coronation, Kaikeyi's boons, departure to the forest, the Kevata boat episode, stay at Chitrakoot, Bharata's boundless devotion and receiving the holy sandals (Padukas).",
        "verses": [
          {
            "id": "rcm-2-1",
            "verseNumber": 1,
            "sanskritText": "मागी नाव न केवटु आना | कहइ तुम्हार मरमु मैं जाना ||\nचरन कमल रज कहुं सबु कहई | मानुष करनि मूरि कछु अहई ||",
            "sanskrit": "मागी नाव न केवटु आना | कहइ तुम्हार मरमु मैं जाना ||\nचरन कमल रज कहुं सबु कहई | मानुष करनि मूरि कछु अहई ||",
            "transliteration": "māgī nāva na kevaṭu ānā | kahai tumhāra maramu maiṁ jānā ||\ncarana kamala raja kahuṁ sabu kahaī | mānuṣa karani mūri kachu ahaī ||",
            "translationHi": "प्रभु श्री राम ने नाव माँगी, पर केवट लाता नहीं। वह कहने लगा—मैंने आपका मर्म जान लिया है! सब लोग कहते हैं कि आपके चरण कमलों की रज में मनुष्य बना देने वाली कोई जड़ी-बूटी है।",
            "hindiMeaning": "प्रभु श्री राम ने नाव माँगी, पर केवट लाता नहीं। वह कहने लगा—मैंने आपका मर्म जान लिया है! सब लोग कहते हैं कि आपके चरण कमलों की रज में मनुष्य बना देने वाली कोई जड़ी-बूटी है।",
            "translationEn": "The Lord asked for a boat, but the boatman Kevata would not bring it. He said: 'I know Your secret! Everyone says that the dust of Your lotus feet has some herb that turns things into humans.'",
            "englishMeaning": "The Lord asked for a boat, but the boatman Kevata would not bring it. He said: 'I know Your secret! Everyone says that the dust of Your lotus feet has some herb that turns things into humans.'",
            "commentary": "केवट का भोला और अनन्य प्रेम, जहाँ भक्त भगवान् को अपनी नाव में बैठाने से पूर्व उनके चरण धोने का सौभाग्य प्राप्त करता है।"
          },
          {
            "id": "rcm-2-2",
            "verseNumber": 2,
            "sanskritText": "भरतहि होई न राजमदु बिधि हरि हर पद पाइ |\nकबहुँ कि काँजी सीकरनि छीरसिंधु बिनसाइ ||",
            "sanskrit": "भरतहि होई न राजमदु बिधि हरि हर पद पाइ |\nकबहुँ कि काँजी सीकरनि छीरसिंधु बिनसाइ ||",
            "transliteration": "bharatahi hoī na rājamadu bidhi hari hara pada pāi |\nkabahu~ ki kā~jī sīkarani chīrasindhu binasāi ||",
            "translationHi": "ब्रह्मा, विष्णु और शिव का पद पाकर भी भरत जी को कभी राज्य का मद नहीं हो सकता। क्या कभी कांजी की बूँदों से क्षीरसागर नष्ट हो सकता है?",
            "hindiMeaning": "ब्रह्मा, विष्णु और शिव का पद पाकर भी भरत जी को कभी राज्य का मद नहीं हो सकता। क्या कभी कांजी की बूँदों से क्षीरसागर नष्ट हो सकता है?",
            "translationEn": "Even if Bharata were to attain the positions of Brahma, Vishnu, and Shiva, the arrogance of sovereignty could never touch him. Can drops of sour gruel ever spoil the ocean of milk?",
            "englishMeaning": "Even if Bharata were to attain the positions of Brahma, Vishnu, and Shiva, the arrogance of sovereignty could never touch him. Can drops of sour gruel ever spoil the ocean of milk?",
            "commentary": "श्रीराम स्वयं अपने भ्राता भरत के निष्कलंक प्रेम और त्याग की महिमा का बखान करते हैं।"
          },
          {
            "id": "rcm-2-3",
            "verseNumber": 3,
            "sanskritText": "प्रभु करि कृपा पाँवरीं दीन्हीं | सादर भरत सीस धरि लीन्हीं ||\nचरनपीठ करुनानिधान के | जनु जुग जामिक प्रजा प्रान के ||",
            "sanskrit": "प्रभु करि कृपा पाँवरीं दीन्हीं | सादर भरत सीस धरि लीन्हीं ||\nचरनपीठ करुनानिधान के | जनु जुग जामिक प्रजा प्रान के ||",
            "transliteration": "prabhu kari kṛpā pā~varīṁ dīnhīṁ | sādara bharata sīsa dhari līnhīṁ ||\ncaranapīṭha karunānidhāna ke | janu juga jāmika prajā prāna ke ||",
            "translationHi": "प्रभु श्री राम ने कृपा करके अपनी चरण पादुकाएं दीं, जिन्हें भरत जी ने आदरपूर्वक सिर पर धारण किया। करुानिधान की वे दोनों खड़ाऊँ प्रजा के प्राणों की रक्षा करने वाले दो पहरेदार के समान थीं।",
            "hindiMeaning": "प्रभु श्री राम ने कृपा करके अपनी चरण पादुकाएं दीं, जिन्हें भरत जी ने आदरपूर्वक सिर पर धारण किया। करुानिधान की वे दोनों खड़ाऊँ प्रजा के प्राणों की रक्षा करने वाले दो पहरेदार के समान थीं।",
            "translationEn": "The merciful Lord graciously gave His sandals, which Bharata reverently placed upon his head. Those sandals of the compassionate Lord were like two sentinels protecting the lives of the citizens.",
            "englishMeaning": "The merciful Lord graciously gave His sandals, which Bharata reverently placed upon his head. Those sandals of the compassionate Lord were like two sentinels protecting the lives of the citizens.",
            "commentary": "भरत जी ने १४ वर्ष तक पादुका को सिंहासन पर रखकर सेवक भाव से अयोध्या का संचालन किया।"
          }
        ]
      },
      {
        "id": "rcm-ch-3",
        "chapterNumber": 3,
        "titleHi": "काण्ड ३: अरण्यकाण्ड",
        "titleEn": "Kanda 3: Aranya Kanda",
        "summaryHi": "जयंत प्रसंग, अत्रि-अनसूया मिलन, पंचवटी निवास, लक्ष्मण गीता, शूर्पणखा प्रसंग, मारीच वध, सीता हरण, जटायु उद्धार एवं शबरी की नवधा भक्ति।",
        "summaryEn": "The forest life at Panchavati, Lakshmana Gita, the abduction of Sita, the liberation of the noble eagle Jatayu, and the ninefold devotion (Navadha Bhakti) imparted to Shabari.",
        "verses": [
          {
            "id": "rcm-3-1",
            "verseNumber": 1,
            "sanskritText": "नवधा भगति कहउँ तोहि पाहीं | सावधान सुनु धरु मन माहीं ||\nप्रथम भगति संतन्ह कर संगा | दूसरि रति मम कथा प्रसंगा ||",
            "sanskrit": "नवधा भगति कहउँ तोहि पाहीं | सावधान सुनु धरु मन माहीं ||\nप्रथम भगति संतन्ह कर संगा | दूसरि रति मम कथा प्रसंगा ||",
            "transliteration": "navadhā bhagati kahau~ tohi pāhīṁ | sāvadhāna sunu dharu mana māhīṁ ||\nprathama bhagati santanha kara saṅgā | dūsari rati mama kathā prasaṅgā ||",
            "translationHi": "श्री राम ने शबरी से कहा: हे भामिनि! मैं तुझसे नवधा (नौ प्रकार की) भक्ति कहता हूँ, सावधान होकर सुन और मन में धारण कर। पहली भक्ति संतों का संग है और दूसरी भक्ति मेरी कथा-प्रसंग में प्रेम होना है।",
            "hindiMeaning": "श्री राम ने शबरी से कहा: हे भामिनि! मैं तुझसे नवधा (नौ प्रकार की) भक्ति कहता हूँ, सावधान होकर सुन और मन में धारण कर। पहली भक्ति संतों का संग है और दूसरी भक्ति मेरी कथा-प्रसंग में प्रेम होना है।",
            "translationEn": "Sri Rama said to Shabari: Listen attentively, I describe unto you the nine forms of devotion. The first is association with saints, and the second is a delight in hearing My divine discourses.",
            "englishMeaning": "Sri Rama said to Shabari: Listen attentively, I describe unto you the nine forms of devotion. The first is association with saints, and the second is a delight in hearing My divine discourses.",
            "commentary": "नवधा भक्ति सनातन धर्म में ईश्वर प्राप्ति की नौ व्यावहारिक सीढ़ियों का सरल और प्रामाणिक विधान है।"
          },
          {
            "id": "rcm-3-2",
            "verseNumber": 2,
            "sanskritText": "मंत्र जाप मम दृढ़ बिस्वासा | पंचम भजन सो बेद प्रकासा ||\nछठ दम सील बिरति बहु करमा | निरत निरंतर सज्जन धरमा ||",
            "sanskrit": "मंत्र जाप मम दृढ़ बिस्वासा | पंचम भजन सो बेद प्रकासा ||\nछठ दम सील बिरति बहु करमा | निरत निरंतर सज्जन धरमा ||",
            "transliteration": "mantra jāpa mama dṛḍha bisvāsā | pañcama bhajana so beda prakāsā ||\nchaṭha dama sīla birati bahu karamā | nirata nirantara sajjana dharamā ||",
            "translationHi": "मेरे मन्त्र का जप और मुझमें दृढ़ विश्वास—यह पाँचवीं भक्ति है, जो वेदों में प्रसिद्ध है। छठी भक्ति इन्द्रिय दमन, उत्तम शील, बहुत कर्मों से विरक्ति और निरन्तर संत-धर्म में लगे रहना है।",
            "hindiMeaning": "मेरे मन्त्र का जप और मुझमें दृढ़ विश्वास—यह पाँचवीं भक्ति है, जो वेदों में प्रसिद्ध है। छठी भक्ति इन्द्रिय दमन, उत्तम शील, बहुत कर्मों से विरक्ति और निरन्तर संत-धर्म में लगे रहना है।",
            "translationEn": "Repetition of My mantra with firm faith is the fifth devotion. The sixth is control of the senses, good character, dispassion from excessive worldly activities, and constant practice of righteous virtue.",
            "englishMeaning": "Repetition of My mantra with firm faith is the fifth devotion. The sixth is control of the senses, good character, dispassion from excessive worldly activities, and constant practice of righteous virtue.",
            "commentary": "नवधा भक्ति का यह क्रम साधक को अंतःकरण की पूर्ण शुद्धि प्रदान करता है।"
          }
        ]
      },
      {
        "id": "rcm-ch-4",
        "chapterNumber": 4,
        "titleHi": "काण्ड ४: किष्किन्धाकाण्ड",
        "titleEn": "Kanda 4: Kishkindha Kanda",
        "summaryHi": "पंपा सरोवर, श्रीराम-हनुमान जी का प्रथम मिलन, सुग्रीव से मित्रता, बालि वध, वर्षा एवं शरद ऋतु वर्णन, और सीता जी की खोज का संकल्प।",
        "summaryEn": "The first meeting with Hanuman at Lake Pampa, friendship with Sugriva, slaying of Vali, vivid description of the rainy season, and the expedition to search for Sita.",
        "verses": [
          {
            "id": "rcm-4-1",
            "verseNumber": 1,
            "sanskritText": "को तुम्ह स्यामल गौर सरीरा | छत्रिय रूप फिरहु बन बीरा ||\nकठिन भूमि कोमल पद गामी | कवन हेतु बिचरहु बन स्वामी ||",
            "sanskrit": "को तुम्ह स्यामल गौर सरीरा | छत्रिय रूप फिरहु बन बीरा ||\nकठिन भूमि कोमल पद गामी | कवन हेतु बिचरहु बन स्वामी ||",
            "transliteration": "ko tumha syāmala gaura sarīrā | chatriya rūpa phirahu bana bīrā ||\nkaṭhina bhūmi komala pada gāmī | kavana hetu bicarahu bana svāmī ||",
            "translationHi": "विप्र रूप धारी हनुमान जी ने पूछा: हे वीर! श्याम और गौर वर्ण के शरीर वाले आप कौन हैं, जो क्षत्रिय रूप में वन में विचर रहे हैं? इस कठोर भूमि पर कोमल चरणों से चलने वाले हे स्वामी! आप किस कारण वन में घूम रहे हैं?",
            "hindiMeaning": "विप्र रूप धारी हनुमान जी ने पूछा: हे वीर! श्याम और गौर वर्ण के शरीर वाले आप कौन हैं, जो क्षत्रिय रूप में वन में विचर रहे हैं? इस कठोर भूमि पर कोमल चरणों से चलने वाले हे स्वामी! आप किस कारण वन में घूम रहे हैं?",
            "translationEn": "Disguised as a brahmana, Hanuman inquired: 'Who are you, O heroes of dark and fair complexions, wandering in the woods in the garb of warriors? Tender are your feet for this harsh terrain; for what purpose do you wander here?'",
            "englishMeaning": "Disguised as a brahmana, Hanuman inquired: 'Who are you, O heroes of dark and fair complexions, wandering in the woods in the garb of warriors? Tender are your feet for this harsh terrain; for what purpose do you wander here?'",
            "commentary": "सेवक और सेव्य का यह मिलन रामायण का परम पावन प्रसंग है।"
          },
          {
            "id": "rcm-4-2",
            "verseNumber": 2,
            "sanskritText": "जे न मित्र दुख होहिं दुखारी | तिन्हहि बिलोकत पातक भारी ||\nनिज दुख गिरि सम रज करि जाना | मित्रक दुख रज मेरु समाना ||",
            "sanskrit": "जे न मित्र दुख होहिं दुखारी | तिन्हहि बिलोकत पातक भारी ||\nनिज दुख गिरि सम रज करि जाना | मित्रक दुख रज मेरु समाना ||",
            "transliteration": "je na mitra dukha hohiṁ dukhārī | tinhahi bilokata pātaka bhārī ||\nnija dukha giri sama raja kari jānā | mitraka dukha raja meru samānā ||",
            "translationHi": "जो लोग मित्र के दुःख से दुःखी नहीं होते, उन्हें देखने से भी बड़ा पाप लगता है। अपने पर्वत के समान बड़े दुःख को धूल के कण के समान समझे और मित्र के धूल के समान छोटे दुःख को सुमेरु पर्वत के समान बड़ा जाने।",
            "hindiMeaning": "जो लोग मित्र के दुःख से दुःखी नहीं होते, उन्हें देखने से भी बड़ा पाप लगता है। अपने पर्वत के समान बड़े दुःख को धूल के कण के समान समझे और मित्र के धूल के समान छोटे दुःख को सुमेरु पर्वत के समान बड़ा जाने।",
            "translationEn": "Those who do not grieve at the sorrow of a friend commit great sin merely by being seen. One should consider one's own mountain-like grief as tiny as a speck of dust, and regard a friend's tiny speck of grief as vast as Mount Meru.",
            "englishMeaning": "Those who do not grieve at the sorrow of a friend commit great sin merely by being seen. One should consider one's own mountain-like grief as tiny as a speck of dust, and regard a friend's tiny speck of grief as vast as Mount Meru.",
            "commentary": "सनातन संस्कृति में सच्ची मित्रता के आदर्श का यह अनुपम नीति-वचन है।"
          }
        ]
      },
      {
        "id": "rcm-ch-5",
        "chapterNumber": 5,
        "titleHi": "काण्ड ५: सुन्दरकाण्ड",
        "titleEn": "Kanda 5: Sundara Kanda",
        "summaryHi": "हनुमान जी का समुद्र लंघन, विभीषण मिलन, अशोक वाटिका में सीता दर्शन, अक्षय कुमार वध, लंका दहन, चूड़ामणि समर्पण एवं समुद्र पर प्रभु का क्रोध।",
        "summaryEn": "Hanuman's leap across the ocean, meeting Vibhishana, consoling Mother Sita in the Ashoka grove, destruction of the garden, burning of Lanka, and returning with Sita's crest-jewel.",
        "verses": [
          {
            "id": "rcm-5-1",
            "verseNumber": 1,
            "sanskritText": "शान्तं शाश्वतमप्रमेयमनघं निर्वाणशान्तिप्रदं\nब्रह्माशम्भुफणीन्द्रसेव्यमनिशं वेदान्तवेद्यं विभुम् |\nरामाख्यं जगदीश्वरं सुरगुरुं मायामनुष्यं हरिं\nवन्देऽहं करुणाकरं रघुवरं भूपालचूडामणिम् ||",
            "sanskrit": "शान्तं शाश्वतमप्रमेयमनघं निर्वाणशान्तिप्रदं\nब्रह्माशम्भुफणीन्द्रसेव्यमनिशं वेदान्तवेद्यं विभुम् |\nरामाख्यं जगदीश्वरं सुरगुरुं मायामनुष्यं हरिं\nवन्देऽहं करुणाकरं रघुवरं भूपालचूडामणिम् ||",
            "transliteration": "śāntaṁ śāśvatamaprameyamanaghaṁ nirvāṇaśāntipradaṁ\nbrahmāśambhuphaṇīndrasevyamaniśaṁ vedāntavedyaṁ vibhum |\nrāmākhyaṁ jagadīśvaraṁ suraguruṁ māyāmanuṣyaṁ hariṁ\nvande'haṁ karuṇākaraṁ raghuvaraṁ bhūpālacūḍāmaṇim ||",
            "translationHi": "शांत, सनातन, अप्रमेय, निष्पाप, मोक्षरूप परम शांति देने वाले, ब्रह्मा, शम्भु और शेषनाग द्वारा नित्य सेवित, वेदान्त द्वारा जानने योग्य, माया से मनुष्य रूप धारण करने वाले, करुणा की खान रघुश्रेष्ठ श्री राम को मैं नमस्कार करता हूँ।",
            "hindiMeaning": "शांत, सनातन, अप्रमेय, निष्पाप, मोक्षरूप परम शांति देने वाले, ब्रह्मा, शम्भु और शेषनाग द्वारा नित्य सेवित, वेदान्त द्वारा जानने योग्य, माया से मनुष्य रूप धारण करने वाले, करुणा की खान रघुश्रेष्ठ श्री राम को मैं नमस्कार करता हूँ।",
            "translationEn": "I adore Sri Rama, the jewel among kings, of tranquil, eternal, immeasurable, and sinless form, who grants the supreme peace of liberation, whom Brahma, Shiva, and the Serpent King continually revere.",
            "englishMeaning": "I adore Sri Rama, the jewel among kings, of tranquil, eternal, immeasurable, and sinless form, who grants the supreme peace of liberation, whom Brahma, Shiva, and the Serpent King continually revere.",
            "commentary": "सुन्दरकाण्ड का मंगलाचरण सम्पूर्ण आध्यात्मिक शांति और संकट निवारण का महामंत्र है।"
          },
          {
            "id": "rcm-5-2",
            "verseNumber": 2,
            "sanskritText": "प्रबिसि नगर कीजे सब काजा | हृदयँ राखि कोसलपुर राजा ||\nगरल सुधा रिपु करहिं मिताई | गोपद सिंधु अनल सितलाई ||",
            "sanskrit": "प्रबिसि नगर कीजे सब काजा | हृदयँ राखि कोसलपुर राजा ||\nगरल सुधा रिपु करहिं मिताई | गोपद सिंधु अनल सितलाई ||",
            "transliteration": "prabisi nagara kīje saba kājā | hṛdaya~ rākhi kosalapura rājā ||\ngarala sudhā ripu karahiṁ mitāī | gopada sindhu anala sitalāī ||",
            "translationHi": "अयोध्यापुरी के राजा श्री रघुनाथ जी को हृदय में रखकर लंका नगर में प्रवेश करके सब काम कीजिए। ऐसा करने से विष अमृत बन जाता है, शत्रु मित्रता करने लगते हैं, समुद्र गाय के खुर के समान हो जाता है और अग्नि में शीतलता आ जाती है।",
            "hindiMeaning": "अयोध्यापुरी के राजा श्री रघुनाथ जी को हृदय में रखकर लंका नगर में प्रवेश करके सब काम कीजिए। ऐसा करने से विष अमृत बन जाता है, शत्रु मित्रता करने लगते हैं, समुद्र गाय के खुर के समान हो जाता है और अग्नि में शीतलता आ जाती है।",
            "translationEn": "Enter the city and accomplish all your tasks, keeping the King of Ayodhya enshrined in your heart. For one who does so, poison turns to nectar, enemies turn to friends, the ocean shrinks to a cow's hoof-print, and fire becomes pleasantly cool.",
            "englishMeaning": "Enter the city and accomplish all your tasks, keeping the King of Ayodhya enshrined in your heart. For one who does so, poison turns to nectar, enemies turn to friends, the ocean shrinks to a cow's hoof-print, and fire becomes pleasantly cool.",
            "commentary": "लंकिनी राक्षसी द्वारा हनुमान जी को दिया गया यह आशीर्वाद प्रत्येक कार्य की निर्विघ्न सिद्धि का विश्वास दिलाता है।"
          },
          {
            "id": "rcm-5-3",
            "verseNumber": 3,
            "sanskritText": "बिनय न मानत जलधि जड़ गए तीन दिन बीति |\nबोले राम सकोप तब भय बिनु होइ न प्रीति ||",
            "sanskrit": "बिनय न मानत जलधि जड़ गए तीन दिन बीति |\nबोले राम सकोप तब भय बिनु होइ न प्रीति ||",
            "transliteration": "binaya na mānata jaladhi jaḍa gae tīna dina bīti |\nbole rāma sakopa taba bhaya binu hoi na prīti ||",
            "translationHi": "तीन दिन बीत गए, किंतु जड़ समुद्र विनय नहीं मानता। तब श्री राम क्रोधयुक्त होकर बोले—बिना भय के प्रीति नहीं होती!",
            "hindiMeaning": "तीन दिन बीत गए, किंतु जड़ समुद्र विनय नहीं मानता। तब श्री राम क्रोधयुक्त होकर बोले—बिना भय के प्रीति नहीं होती!",
            "translationEn": "Three days elapsed, yet the senseless ocean would not heed gentle prayer. Then Rama spoke with righteous anger: 'Without awe and fear, true respect and affection are not possible!'",
            "englishMeaning": "Three days elapsed, yet the senseless ocean would not heed gentle prayer. Then Rama spoke with righteous anger: 'Without awe and fear, true respect and affection are not possible!'",
            "commentary": "मर्यादा और नीति का अनुपम समन्वय—जहाँ विनम्रता निष्फल हो, वहाँ धर्म की रक्षा हेतु शौर्य और शक्ति का प्रदर्शन अनिवार्य हो जाता है।"
          }
        ]
      },
      {
        "id": "rcm-ch-6",
        "chapterNumber": 6,
        "titleHi": "काण्ड ६: लंकाकाण्ड",
        "titleEn": "Kanda 6: Lanka Kanda",
        "summaryHi": "नल-नील द्वारा सेतु निर्माण, अंगद-रावण संवाद, महासंग्राम, लक्ष्मण शक्ति, संजीवनी बूटी, कुंभकर्ण व मेघनाद वध, रावण वध एवं श्रीराम विजय।",
        "summaryEn": "Construction of the ocean bridge by Nala and Nila, Angada's mission of peace, the great war, reviving Lakshmana with Sanjeevani, slaying of Kumbhakarna, Meghanada, and Ravana, and the victory of Dharma.",
        "verses": [
          {
            "id": "rcm-6-1",
            "verseNumber": 1,
            "sanskritText": "जय राम रमारमनं समनं | भवताप भयाकुल पाहि जनम् ||\nअवधेश सुरेस रमेश बिभो | सरनागत मागत पाहि प्रभो ||",
            "sanskrit": "जय राम रमारमनं समनं | भवताप भयाकुल पाहि जनम् ||\nअवधेश सुरेस रमेश बिभो | सरनागत मागत पाहि प्रभो ||",
            "transliteration": "jaya rāma ramāramanaṁ samanaṁ | bhavatāpa bhayākula pāhi janam ||\navadheśa suresa rameśa bibho | saranāgata māgata pāhi prabho ||",
            "translationHi": "लक्ष्मीकान्त, संसार के तापों का नाश करने वाले श्री राम की जय हो! हे नाथ! भय से व्याकुल इस जन की रक्षा कीजिए। हे अवधेश, हे सुरेन्द्र, हे सर्वव्यापी प्रभु! अपनी शरण में आए हुए मुझ याचक की रक्षा कीजिए।",
            "hindiMeaning": "लक्ष्मीकान्त, संसार के तापों का नाश करने वाले श्री राम की जय हो! हे नाथ! भय से व्याकुल इस जन की रक्षा कीजिए। हे अवधेश, हे सुरेन्द्र, हे सर्वव्यापी प्रभु! अपनी शरण में आए हुए मुझ याचक की रक्षा कीजिए।",
            "translationEn": "Glory to Sri Rama, beloved of Lakshmi, dispeller of worldly sorrows! Protect this servant distraught with fear. O King of Ayodhya, Supreme Ruler, all-pervading Lord, save me who have taken shelter in You.",
            "englishMeaning": "Glory to Sri Rama, beloved of Lakshmi, dispeller of worldly sorrows! Protect this servant distraught with fear. O King of Ayodhya, Supreme Ruler, all-pervading Lord, save me who have taken shelter in You.",
            "commentary": "युद्ध के मध्य शरणागति और विजय के विश्वास की पावन स्तुति।"
          },
          {
            "id": "rcm-6-2",
            "verseNumber": 2,
            "sanskritText": "तानि सरासन श्रवण लगि छांड़े बिसिख कराल |\nराम बान अहि गन सरिस बिपुल परेउ दसभाल ||",
            "sanskrit": "तानि सरासन श्रवण लगि छांड़े बिसिख कराल |\nराम बान अहि गन सरिस बिपुल परेउ दसभाल ||",
            "transliteration": "tāni sarāsana śravaṇa lagi chā~ḍe bisikha karāla |\nrāma bāna ahi gana sarisa bipula pareu dasabhāla ||",
            "translationHi": "धनुष को कान तक खींचकर श्री राम ने भयानक बाण छोड़े। राम के बाण सर्पों के समूह के समान जाकर लगे और दशानन रावण के मस्तक कट-कट कर धरती पर गिर पड़े।",
            "hindiMeaning": "धनुष को कान तक खींचकर श्री राम ने भयानक बाण छोड़े। राम के बाण सर्पों के समूह के समान जाकर लगे और दशानन रावण के मस्तक कट-कट कर धरती पर गिर पड़े।",
            "translationEn": "Drawing His bowstring back to His ear, Sri Rama released terrifying arrows. Like a flight of divine serpents, Rama's shafts struck, and the ten heads of Ravana fell to the ground.",
            "englishMeaning": "Drawing His bowstring back to His ear, Sri Rama released terrifying arrows. Like a flight of divine serpents, Rama's shafts struck, and the ten heads of Ravana fell to the ground.",
            "commentary": "अधर्म, अहंकार और अत्याचार पर सत्य और धर्म की शाश्वत विजय का क्षण।"
          }
        ]
      },
      {
        "id": "rcm-ch-7",
        "chapterNumber": 7,
        "titleHi": "काण्ड ७: उत्तरकाण्ड",
        "titleEn": "Kanda 7: Uttara Kanda",
        "summaryHi": "प्रभु श्री राम का अयोध्या आगमन, भव्य राज्याभिषेक, रामराज्य का आदर्श वर्णन, कागभुशुण्डि-गरुड़ संवाद एवं मानस रोगों का निदान।",
        "summaryEn": "Return to Ayodhya, glorious coronation of Lord Rama, the golden era of Ramrajya, the philosophical dialogue between Kakabhushundi and Garuda, and the remedy for spiritual diseases.",
        "verses": [
          {
            "id": "rcm-7-1",
            "verseNumber": 1,
            "sanskritText": "दैहिक दैविक भौतिक तापा | राम राज नहिं काहुहि ब्यापा ||\nसब नर करहिं परस्पर प्रीती | चलहिं स्वधर्म निरत श्रुति नीती ||",
            "sanskrit": "दैहिक दैविक भौतिक तापा | राम राज नहिं काहुहि ब्यापा ||\nसब नर करहिं परस्पर प्रीती | चलहिं स्वधर्म निरत श्रुति नीती ||",
            "transliteration": "daihika daivika bhautika tāpā | rāma rāja nahiṁ kāhuhi byāpā ||\nsaba nara karahiṁ paraspara prītī | calahiṁ svadharma nirata śruti nītī ||",
            "translationHi": "रामराज्य में दैहिक (शारीरिक), दैविक (प्राकृतिक प्रकोप) और भौतिक (आपसी कलह) तीनों प्रकार के ताप किसी को भी नहीं व्यापते थे। सब मनुष्य परस्पर प्रेम करते थे और वेदों में बताई हुई नीति के अनुसार अपने-अपने धर्म में तत्पर रहते थे।",
            "hindiMeaning": "रामराज्य में दैहिक (शारीरिक), दैविक (प्राकृतिक प्रकोप) और भौतिक (आपसी कलह) तीनों प्रकार के ताप किसी को भी नहीं व्यापते थे। सब मनुष्य परस्पर प्रेम करते थे और वेदों में बताई हुई नीति के अनुसार अपने-अपने धर्म में तत्पर रहते थे।",
            "translationEn": "In the kingdom of Rama, none suffered from physical ailments, celestial calamities, or material troubles. All people loved one another and walked the path of righteousness according to the Vedic precepts.",
            "englishMeaning": "In the kingdom of Rama, none suffered from physical ailments, celestial calamities, or material troubles. All people loved one another and walked the path of righteousness according to the Vedic precepts.",
            "commentary": "रामराज्य विश्व के लिए सुशासन, शांति, समृद्धि और सामाजिक सौहार्द का सनातन आदर्श है।"
          },
          {
            "id": "rcm-7-2",
            "verseNumber": 2,
            "sanskritText": "अल्पमृत्यु नहिं कवनिउ पीरा | सब सुंदर सब बिरुज सरीरा ||\nनहिं दरिद्र कोउ दुखी न दीना | नहिं कोउ अबुध न लच्छन हीना ||",
            "sanskrit": "अल्पमृत्यु नहिं कवनिउ पीरा | सब सुंदर सब बिरुज सरीरा ||\nनहिं दरिद्र कोउ दुखी न दीना | नहिं कोउ अबुध न लच्छन हीना ||",
            "transliteration": "alpamṛtyu nahiṁ kavaniu pīrā | saba sundara saba biruja sarīrā ||\nnahiṁ daridra kou dukhī na dīnā | nahiṁ kou abudha na lacchana hīnā ||",
            "translationHi": "रामराज्य में किसी की भी अकाल मृत्यु नहीं होती थी, न कोई पीड़ा थी; सब लोग सुन्दर और नीरोगी शरीर वाले थे। न कोई दरिद्र था, न कोई दुःखी या दीन था; न कोई मूर्ख था और न कोई शुभ लक्षणों से हीन था।",
            "hindiMeaning": "रामराज्य में किसी की भी अकाल मृत्यु नहीं होती थी, न कोई पीड़ा थी; सब लोग सुन्दर और नीरोगी शरीर वाले थे। न कोई दरिद्र था, न कोई दुःखी या दीन था; न कोई मूर्ख था और न कोई शुभ लक्षणों से हीन था।",
            "translationEn": "There was no untimely death nor any suffering; everyone possessed a healthy and attractive body. No one was impoverished, miserable, or destitute; none were ignorant or devoid of virtue.",
            "englishMeaning": "There was no untimely death nor any suffering; everyone possessed a healthy and attractive body. No one was impoverished, miserable, or destitute; none were ignorant or devoid of virtue.",
            "commentary": "सम्पूर्ण रामचरितमानस का यह चरम फलश्रुति और आदर्श राज्य की पराकाष्ठा है।"
          }
        ]
      }
    ]
  },
  "isha-upanishad": {
    "id": "isha-upanishad",
    "slug": "isha-upanishad",
    "titleHi": "ईशावास्योपनिषद्",
    "titleEn": "Isha Upanishad",
    "author": "शुक्ल यजुर्वेद (वैदिक ऋषिगण)",
    "category": "upanishad",
    "descriptionHi": "सम्पूर्ण १८ मन्त्रों से युक्त शुक्ल यजुर्वेद का पावन उपनिषद्। 'ईशा वास्यमिदं सर्वम्' के महामंत्र से प्रारम्भ होकर आत्मज्ञान और अमरत्व का बोध कराता है।",
    "descriptionEn": "The foundational scripture of Vedanta consisting of 18 sacred mantras revealing the omnipresence of the Divine and the path of non-attachment.",
    "totalVerses": 18,
    "totalChapters": 1,
    "chapters": [
      {
        "id": "isha-ch-1",
        "chapterNumber": 1,
        "titleHi": "ईशावास्योपनिषद् सम्पूर्ण १८ मन्त्र",
        "titleEn": "Isha Upanishad (Complete 18 Mantras)",
        "summaryHi": "शुक्ल यजुर्वेद का पावन ईशावास्योपनिषद्—ईशा वास्यमिदं सर्वम्, त्यागपूर्वक भोग, कर्मनिष्ठा, आत्मज्ञान एवं सोऽहमस्मि की पूर्ण अनुभूति।",
        "summaryEn": "The complete 18 verses of Isha Upanishad: spiritual oneness, selfless action, transcending mortality, and realizing 'I am He'.",
        "verses": [
          {
            "id": "isha-1",
            "verseNumber": 1,
            "sanskritText": "ॐ ईशा वास्यमिदꣳ सर्वं यत्किञ्च जगत्यां जगत् |\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् || १ ||",
            "sanskrit": "ॐ ईशा वास्यमिदꣳ सर्वं यत्किञ्च जगत्यां जगत् |\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् || १ ||",
            "transliteration": "oṁ īśā vāsyamidaṁ sarvaṁ yatkiñca jagatyāṁ jagat |\ntena tyaktena bhuñjīthā mā gṛdhaḥ kasyasviddhanam || 1 ||",
            "translationHi": "इस चराचर जगत में जो कुछ भी गतिशील संसार है, वह सब ईश्वर से व्याप्त (आच्छादित) है। उस ईश्वर को साथ रखते हुए त्यागभाव से उसका उपभोग करो; किसी के भी धन का लोभ मत करो।",
            "hindiMeaning": "इस चराचर जगत में जो कुछ भी गतिशील संसार है, वह सब ईश्वर से व्याप्त (आच्छादित) है। उस ईश्वर को साथ रखते हुए त्यागभाव से उसका उपभोग करो; किसी के भी धन का लोभ मत करो।",
            "translationEn": "All this, whatever moves in this moving world, is enveloped by the Lord. Through renunciation of possessiveness, find joy in it. Do not covet anyone's wealth.",
            "englishMeaning": "All this, whatever moves in this moving world, is enveloped by the Lord. Through renunciation of possessiveness, find joy in it. Do not covet anyone's wealth.",
            "commentary": "ईशावास्योपनिषद् का यह प्रथम मन्त्र सम्पूर्ण वेदान्त का हृदय है। संसार में रहते हुए त्यागपूर्वक भोग करना ही जीवन की सच्ची कला है।"
          },
          {
            "id": "isha-2",
            "verseNumber": 2,
            "sanskritText": "कुर्वन्नेवेह कर्माणि जिजीविषेच्छतꣳ समाः |\nएवं त्वयि नान्यथेतोऽस्ति न कर्म लिप्यते नरे || २ ||",
            "sanskrit": "कुर्वन्नेवेह कर्माणि जिजीविषेच्छतꣳ समाः |\nएवं त्वयि नान्यथेतोऽस्ति न कर्म लिप्यते नरे || २ ||",
            "transliteration": "kurvanneveha karmāṇi jijīviṣecchataṁ samāḥ |\nevaṁ tvayi nānyatheto'sti na karma lipyate nare || 2 ||",
            "translationHi": "संसार में निष्काम भाव से शास्त्रविहित कर्म करते हुए ही सौ वर्ष जीने की इच्छा करनी चाहिए। तुम्हारे लिए इससे भिन्न कोई अन्य मार्ग नहीं है, जिससे मनुष्य में कर्म लिप्त न हों।",
            "hindiMeaning": "संसार में निष्काम भाव से शास्त्रविहित कर्म करते हुए ही सौ वर्ष जीने की इच्छा करनी चाहिए। तुम्हारे लिए इससे भिन्न कोई अन्य मार्ग नहीं है, जिससे मनुष्य में कर्म लिप्त न हों।",
            "translationEn": "Only performing selfless actions here should one desire to live a hundred years. Thus for you, a human being, there is no other way by which action does not adhere to you.",
            "englishMeaning": "Only performing selfless actions here should one desire to live a hundred years. Thus for you, a human being, there is no other way by which action does not adhere to you.",
            "commentary": "कर्मों से पलायन नहीं, बल्कि अनासक्त भाव से कर्तव्य कर्म करते हुए दीर्घायु प्राप्त करना वैदिक आदर्श है।"
          },
          {
            "id": "isha-3",
            "verseNumber": 3,
            "sanskritText": "असुर्या नाम ते लोका अन्धेन तमसाऽऽवृताः |\nताꣳस्ते प्रेत्याभिगच्छन्ति ये के चात्महनो जनाः || ३ ||",
            "sanskrit": "असुर्या नाम ते लोका अन्धेन तमसाऽऽवृताः |\nताꣳस्ते प्रेत्याभिगच्छन्ति ये के चात्महनो जनाः || ३ ||",
            "transliteration": "asuryā nāma te lokā andhena tamasā''vṛtāḥ |\ntāṁste pretyābhigacchanti ye ke cātmahano janāḥ || 3 ||",
            "translationHi": "वे लोक 'असुर्य' (असुरों के योग्य) कहे जाते हैं जो घोर अज्ञान रूपी अंधकार से आच्छादित हैं। जो कोई भी अपनी आत्मा का हनन करने वाले (आत्मघाती/अज्ञानी) हैं, वे मरने के बाद उन्हीं लोकों में जाते हैं।",
            "hindiMeaning": "वे लोक 'असुर्य' (असुरों के योग्य) कहे जाते हैं जो घोर अज्ञान रूपी अंधकार से आच्छादित हैं। जो कोई भी अपनी आत्मा का हनन करने वाले (आत्मघाती/अज्ञानी) हैं, वे मरने के बाद उन्हीं लोकों में जाते हैं।",
            "translationEn": "Sunless are those worlds, enveloped in blinding darkness, unto which go after death all those who are slayers of their own soul (ignorant of the Self).",
            "englishMeaning": "Sunless are those worlds, enveloped in blinding darkness, unto which go after death all those who are slayers of their own soul (ignorant of the Self).",
            "commentary": "जो मनुष्य शरीर पाकर भी आत्मज्ञान प्राप्त नहीं करता, वह वस्तुतः अपनी आत्मा की उपेक्षा करके आत्मघात कर रहा है।"
          },
          {
            "id": "isha-4",
            "verseNumber": 4,
            "sanskritText": "अनेजदेकं मनसो जवीयो नैनद्देवा आप्नुवन्पूर्वमर्षत् |\nतद्धावतोऽन्यानत्येति तिष्ठत्तस्मिन्नपो मातरिश्वा दधाति || ४ ||",
            "sanskrit": "अनेजदेकं मनसो जवीयो नैनद्देवा आप्नुवन्पूर्वमर्षत् |\nतद्धावतोऽन्यानत्येति तिष्ठत्तस्मिन्नपो मातरिश्वा दधाति || ४ ||",
            "transliteration": "anejadekaṁ manaso javīyo nainaddevā āpnuvanpūrvamarṣat |\ntaddhāvato'nyānatyeti tiṣṭhattasminnapo mātariśvā dadhāti || 4 ||",
            "translationHi": "वह आत्म-तत्व गतिरहित (अचल) होने पर भी मन से भी अधिक तीव्रगामी है। इन्द्रियाँ (देवगण) उस तक पहले नहीं पहुँच सकतीं क्योंकि वह उनसे पहले से ही सर्वत्र विद्यमान है। वह स्थिर रहता हुआ भी दौड़ने वाले सबको पीछे छोड़ देता है।",
            "hindiMeaning": "वह आत्म-तत्व गतिरहित (अचल) होने पर भी मन से भी अधिक तीव्रगामी है। इन्द्रियाँ (देवगण) उस तक पहले नहीं पहुँच सकतीं क्योंकि वह उनसे पहले से ही सर्वत्र विद्यमान है। वह स्थिर रहता हुआ भी दौड़ने वाले सबको पीछे छोड़ देता है।",
            "translationEn": "The Self is unmoving, one, swifter than the mind. The senses could never overtake It, for It ran before them. Standing still, It overtakes those who run.",
            "englishMeaning": "The Self is unmoving, one, swifter than the mind. The senses could never overtake It, for It ran before them. Standing still, It overtakes those who run.",
            "commentary": "परमात्मा की सर्वव्यापकता का यह विलक्षण विरोधाभासी वर्णन है—जो सर्वत्र है, उसे कहीं जाने की आवश्यकता नहीं।"
          },
          {
            "id": "isha-5",
            "verseNumber": 5,
            "sanskritText": "तदेजति तन्नैजति तद्दूरे तद्वन्तिके |\nतदन्तरस्य सर्वस्य तदु सर्वस्यास्य बाह्यतः || ५ ||",
            "sanskrit": "तदेजति तन्नैजति तद्दूरे तद्वन्तिके |\nतदन्तरस्य सर्वस्य तदु सर्वस्यास्य बाह्यतः || ५ ||",
            "transliteration": "tadejati tannaijati taddūre tadvantike |\ntadantarasya sarvasya tadu sarvasyāsya bāhyataḥ || 5 ||",
            "translationHi": "वह तत्व चलता है और नहीं भी चलता; वह अत्यन्त दूर है और अत्यन्त समीप भी है; वह इस सम्पूर्ण जगत के भीतर है और वही इस सबके बाहर भी है।",
            "hindiMeaning": "वह तत्व चलता है और नहीं भी चलता; वह अत्यन्त दूर है और अत्यन्त समीप भी है; वह इस सम्पूर्ण जगत के भीतर है और वही इस सबके बाहर भी है।",
            "translationEn": "It moves, and It moves not; It is far, and It is near; It is inside all this, and It is outside all this.",
            "englishMeaning": "It moves, and It moves not; It is far, and It is near; It is inside all this, and It is outside all this.",
            "commentary": "अज्ञानियों के लिए परमात्मा दूर है, ज्ञानियों के लिए अपने हृदय में साक्षात् समीप है।"
          },
          {
            "id": "isha-6",
            "verseNumber": 6,
            "sanskritText": "यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति |\nसर्वभूतेषु चात्मानं ततो न विजुगुप्सते || ६ ||",
            "sanskrit": "यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति |\nसर्वभूतेषु चात्मानं ततो न विजुगुप्सते || ६ ||",
            "transliteration": "yastu sarvāṇi bhūtānyātmanyevānupaśyati |\nsarvabhūteṣu cātmānaṁ tato na vijugupsate || 6 ||",
            "translationHi": "जो मनुष्य सम्पूर्ण प्राणियों को अपनी आत्मा में ही देखता है और समस्त प्राणियों में भी अपनी ही आत्मा को देखता है, वह किसी से भी घृणा नहीं करता।",
            "hindiMeaning": "जो मनुष्य सम्पूर्ण प्राणियों को अपनी आत्मा में ही देखता है और समस्त प्राणियों में भी अपनी ही आत्मा को देखता है, वह किसी से भी घृणा नहीं करता।",
            "translationEn": "He who sees all beings in the Self and the Self in all beings never turns away with hatred from anything.",
            "englishMeaning": "He who sees all beings in the Self and the Self in all beings never turns away with hatred from anything.",
            "commentary": "अद्वैत वेदान्त का सर्वोच्च सामाजिक एवं आध्यात्मिक सूत्र—जब सबमें एक ही आत्म-तत्व है, तो घृणा किसके प्रति?"
          },
          {
            "id": "isha-7",
            "verseNumber": 7,
            "sanskritText": "यस्मिन्सर्वाणि भूतान्यात्मैवाभूद्विजानतः |\nतत्र को मोहः कः शोक एकत्वमनुपश्यतः || ७ ||",
            "sanskrit": "यस्मिन्सर्वाणि भूतान्यात्मैवाभूद्विजानतः |\nतत्र को मोहः कः शोक एकत्वमनुपश्यतः || ७ ||",
            "transliteration": "yasminsarvāṇi bhūtānyātmaivābhūdvijānataḥ |\ntatra ko mohaḥ kaḥ śoka ekatvamanupaśyataḥ || 7 ||",
            "translationHi": "जिस अवस्था में तत्ववेत्ता ज्ञानी के लिए सम्पूर्ण प्राणी आत्मारूप ही हो जाते हैं, उस समय उस एकत्व (अद्वैत) का दर्शन करने वाले को कहाँ मोह और कहाँ शोक?",
            "hindiMeaning": "जिस अवस्था में तत्ववेत्ता ज्ञानी के लिए सम्पूर्ण प्राणी आत्मारूप ही हो जाते हैं, उस समय उस एकत्व (अद्वैत) का दर्शन करने वाले को कहाँ मोह और कहाँ शोक?",
            "translationEn": "When to the knower all beings have become one in the Self, what delusion, what sorrow can there be for him who sees that oneness?",
            "englishMeaning": "When to the knower all beings have become one in the Self, what delusion, what sorrow can there be for him who sees that oneness?",
            "commentary": "एकत्व की अनुभूति ही समस्त दुःखों, मोह और भय का समूल नाश कर देती है।"
          },
          {
            "id": "isha-8",
            "verseNumber": 8,
            "sanskritText": "स पर्यगाच्छुक्रमकायमव्रणमस्नाविरꣳ शुद्धमपापविद्धम् |\nकविर्मनीषी परिभूः स्वयम्भूर्याथातथ्यतोऽर्थान् व्यदधाच्छाश्वतीभ्यः समाभ्यः || ८ ||",
            "sanskrit": "स पर्यगाच्छुक्रमकायमव्रणमस्नाविरꣳ शुद्धमपापविद्धम् |\nकविर्मनीषी परिभूः स्वयम्भूर्याथातथ्यतोऽर्थान् व्यदधाच्छाश्वतीभ्यः समाभ्यः || ८ ||",
            "transliteration": "sa paryagācchukramakāyamavraṇamasnāviraṁ śuddhamapāpaviddham |\nkavirmanīṣī paribhūḥ svayambhūryāthātathyato'rthān vyadadhācchāśvatībhyaḥ samābhyaḥ || 8 ||",
            "translationHi": "वह परमात्मा सर्वव्यापी, ज्योतिर्मय, देहरहित, छिद्ररहित, नाड़ीरहित, परम शुद्ध और पाप से अस्पृष्ट है। वह सर्वज्ञ, मन का स्वामी, सर्वोपरि और स्वयंभू है; उसी ने नित्य प्रजा के लिए यथायोग्य पदार्थों का विधान किया है।",
            "hindiMeaning": "वह परमात्मा सर्वव्यापी, ज्योतिर्मय, देहरहित, छिद्ररहित, नाड़ीरहित, परम शुद्ध और पाप से अस्पृष्ट है। वह सर्वज्ञ, मन का स्वामी, सर्वोपरि और स्वयंभू है; उसी ने नित्य प्रजा के लिए यथायोग्य पदार्थों का विधान किया है।",
            "translationEn": "He is all-pervading, radiant, bodiless, without wounds, without sinews, pure, untouched by sin. The Seer, the Thinker, the Transcendent, Self-existent, He has ordered things suitably for eternal ages.",
            "englishMeaning": "He is all-pervading, radiant, bodiless, without wounds, without sinews, pure, untouched by sin. The Seer, the Thinker, the Transcendent, Self-existent, He has ordered things suitably for eternal ages.",
            "commentary": "परमात्मा के निर्गुण-निराकार और सर्वज्ञ स्वरूप की पूर्ण व्याख्या।"
          },
          {
            "id": "isha-9",
            "verseNumber": 9,
            "sanskritText": "अन्धं तमः प्रविशन्ति येऽविद्यामुपासते |\nततो भूय इव ते तमो य उ विद्यायां रताः || ९ ||",
            "sanskrit": "अन्धं तमः प्रविशन्ति येऽविद्यामुपासते |\nततो भूय इव ते तमो य उ विद्यायां रताः || ९ ||",
            "transliteration": "andhaṁ tamaḥ praviśanti ye'vidyāmupāsate |\ntato bhūya iva te tamo ya u vidyāyāṁ ratāḥ || 9 ||",
            "translationHi": "जो केवल अविद्या (भौतिक कर्मकांड/सांसारिक ज्ञान) की उपासना करते हैं, वे घोर अन्धकार में प्रवेश करते हैं; और जो केवल शुष्क विद्या (बिना साधना के केवल बौद्धिक ज्ञान) में रत रहते हैं, वे मानो उससे भी अधिक अन्धकार में पड़ते हैं।",
            "hindiMeaning": "जो केवल अविद्या (भौतिक कर्मकांड/सांसारिक ज्ञान) की उपासना करते हैं, वे घोर अन्धकार में प्रवेश करते हैं; और जो केवल शुष्क विद्या (बिना साधना के केवल बौद्धिक ज्ञान) में रत रहते हैं, वे मानो उससे भी अधिक अन्धकार में पड़ते हैं।",
            "translationEn": "Into blinding darkness enter those who worship ignorance (mere material rites), and into greater darkness than that, as it were, go those who delight solely in intellectual knowledge.",
            "englishMeaning": "Into blinding darkness enter those who worship ignorance (mere material rites), and into greater darkness than that, as it were, go those who delight solely in intellectual knowledge.",
            "commentary": "केवल भौतिकता अथवा केवल शुष्क पांडित्य दोनों ही अपूर्ण हैं; जीवन में दोनों का संतुलन चाहिए।"
          },
          {
            "id": "isha-10",
            "verseNumber": 10,
            "sanskritText": "अन्यदेवाहुर्विद्ययाऽन्यदाहुरविद्यया |\nइति शुश्रुम धीराणां ये नस्तद्विचचक्षिरे || १० ||",
            "sanskrit": "अन्यदेवाहुर्विद्ययाऽन्यदाहुरविद्यया |\nइति शुश्रुम धीराणां ये नस्तद्विचचक्षिरे || १० ||",
            "transliteration": "anyadevāhurvidyayā'nyadāhuravidyayā |\niti śuśruma dhīrāṇāṁ ye nastadvicacakṣire || 10 ||",
            "translationHi": "विद्या से कुछ और ही फल कहा गया है तथा अविद्या से कुछ और ही फल बताया गया है। ऐसा हमने उन धैर्यवान ज्ञानी पुरुषों से सुना है जिन्होंने हमारे प्रति उसकी स्पष्ट व्याख्या की थी।",
            "hindiMeaning": "विद्या से कुछ और ही फल कहा गया है तथा अविद्या से कुछ और ही फल बताया गया है। ऐसा हमने उन धैर्यवान ज्ञानी पुरुषों से सुना है जिन्होंने हमारे प्रति उसकी स्पष्ट व्याख्या की थी।",
            "translationEn": "Different, they say, is the fruit of knowledge, and different, they say, is the fruit of ignorance. Thus have we heard from the wise who explained it to us.",
            "englishMeaning": "Different, they say, is the fruit of knowledge, and different, they say, is the fruit of ignorance. Thus have we heard from the wise who explained it to us.",
            "commentary": "ऋषि-परंपरा से प्राप्त प्रामाणिक उपदेश की महत्ता।"
          },
          {
            "id": "isha-11",
            "verseNumber": 11,
            "sanskritText": "विद्यां चाविद्यां च यस्तद्वेदोभयं सह |\nअविद्यया मृत्युं तीर्त्वा विद्ययाऽमृतमश्नुते || ११ ||",
            "sanskrit": "विद्यां चाविद्यां च यस्तद्वेदोभयं सह |\nअविद्यया मृत्युं तीर्त्वा विद्ययाऽमृतमश्नुते || ११ ||",
            "transliteration": "vidyāṁ cāvidyāṁ ca yastadvedobhayaṁ saha |\navidyayā mṛtyuṁ tīrtvā vidyayā'mṛtamaśnute || 11 ||",
            "translationHi": "जो विद्या (आत्मज्ञान) और अविद्या (कर्म/कर्तव्य) दोनों को एक साथ भली-भाँति जान लेता है, वह अविद्या से मृत्यु को पार करके विद्या से अमृत (मोक्ष) का उपभोग करता है।",
            "hindiMeaning": "जो विद्या (आत्मज्ञान) और अविद्या (कर्म/कर्तव्य) दोनों को एक साथ भली-भाँति जान लेता है, वह अविद्या से मृत्यु को पार करके विद्या से अमृत (मोक्ष) का उपभोग करता है।",
            "translationEn": "He who knows both knowledge and action together crosses over death through action and attains immortality through knowledge.",
            "englishMeaning": "He who knows both knowledge and action together crosses over death through action and attains immortality through knowledge.",
            "commentary": "कर्म और ज्ञान का अद्भुत समन्वय: कर्म से सांसारिक बाधाओं को पार करो और आत्मज्ञान से अमरता को प्राप्त करो।"
          },
          {
            "id": "isha-12",
            "verseNumber": 12,
            "sanskritText": "अन्धं तमः प्रविशन्ति येऽसम्भूतिमुपासते |\nततो भूय इव ते तमो य उ सम्भूत्यां रताः || १२ ||",
            "sanskrit": "अन्धं तमः प्रविशन्ति येऽसम्भूतिमुपासते |\nततो भूय इव ते तमो य उ सम्भूत्यां रताः || १२ ||",
            "transliteration": "andhaṁ tamaḥ praviśanti ye'sambhūtimupāsate |\ntato bhūya iva te tamo ya u sambhūtyāṁ ratāḥ || 12 ||",
            "translationHi": "जो असम्भूति (अव्यक्त कारण प्रकृति) की उपासना करते हैं, वे घोर अन्धकार में प्रवेश करते हैं; और जो केवल सम्भूति (कार्य ब्रह्म/संसार) में ही रत रहते हैं, वे मानो उससे भी अधिक अन्धकार में पड़ते हैं।",
            "hindiMeaning": "जो असम्भूति (अव्यक्त कारण प्रकृति) की उपासना करते हैं, वे घोर अन्धकार में प्रवेश करते हैं; और जो केवल सम्भूति (कार्य ब्रह्म/संसार) में ही रत रहते हैं, वे मानो उससे भी अधिक अन्धकार में पड़ते हैं।",
            "translationEn": "Into blinding darkness enter those who worship the unmanifested cause, and into greater darkness than that, as it were, go those who delight in the manifested world.",
            "englishMeaning": "Into blinding darkness enter those who worship the unmanifested cause, and into greater darkness than that, as it were, go those who delight in the manifested world.",
            "commentary": "कारण और कार्य दोनों का यथार्थ ज्ञान होना अनिवार्य है।"
          },
          {
            "id": "isha-13",
            "verseNumber": 13,
            "sanskritText": "अन्यदेवाहुः सम्भवादन्यदाहुरसम्भवात् |\nइति शुश्रुम धीराणां ये नस्तद्विचचक्षिरे || १३ ||",
            "sanskrit": "अन्यदेवाहुः सम्भवादन्यदाहुरसम्भवात् |\nइति शुश्रुम धीराणां ये नस्तद्विचचक्षिरे || १३ ||",
            "transliteration": "anyadevāhuḥ sambhavādanyadāhurasambhavāt |\niti śuśruma dhīrāṇāṁ ye nastadvicacakṣire || 13 ||",
            "translationHi": "सम्भूति (व्यक्त) से कुछ और ही परिणाम बतलाया गया है और असम्भूति (अव्यक्त) से कुछ और ही परिणाम बताया गया है। ऐसा हमने ज्ञानी पुरुषों से सुना है।",
            "hindiMeaning": "सम्भूति (व्यक्त) से कुछ और ही परिणाम बतलाया गया है और असम्भूति (अव्यक्त) से कुछ और ही परिणाम बताया गया है। ऐसा हमने ज्ञानी पुरुषों से सुना है।",
            "translationEn": "Different, they say, is the result of the manifest, and different, they say, is the result of the unmanifest. Thus have we heard from the wise who explained it to us.",
            "englishMeaning": "Different, they say, is the result of the manifest, and different, they say, is the result of the unmanifest. Thus have we heard from the wise who explained it to us.",
            "commentary": "आध्यात्मिक विज्ञान की दोनों शाखाओं का यथार्थ बोध।"
          },
          {
            "id": "isha-14",
            "verseNumber": 14,
            "sanskritText": "सम्भूतिं च विनाशं च यस्तद्वेदोभयं सह |\nविनाशेन मृत्युं तीर्त्वा सम्भूत्याऽमृतमश्नुते || १४ ||",
            "sanskrit": "सम्भूतिं च विनाशं च यस्तद्वेदोभयं सह |\nविनाशेन मृत्युं तीर्त्वा सम्भूत्याऽमृतमश्नुते || १४ ||",
            "transliteration": "sambhūtiṁ ca vināśaṁ ca yastadvedobhayaṁ saha |\nvināśena mṛtyuṁ tīrtvā sambhūtyā'mṛtamaśnute || 14 ||",
            "translationHi": "जो सम्भूति (अविनाशी परमात्मा) और विनाशशील (प्रकृति के कार्य) दोनों को एक साथ जान लेता है, वह विनाशी शरीर द्वारा मृत्यु को पार करके सम्भूति (परमात्मा) द्वारा अमरत्व का अनुभव करता है।",
            "hindiMeaning": "जो सम्भूति (अविनाशी परमात्मा) और विनाशशील (प्रकृति के कार्य) दोनों को एक साथ जान लेता है, वह विनाशी शरीर द्वारा मृत्यु को पार करके सम्भूति (परमात्मा) द्वारा अमरत्व का अनुभव करता है।",
            "translationEn": "He who knows both the manifest creation and the perishable body together overcomes death through the mortal and attains immortality through the Divine.",
            "englishMeaning": "He who knows both the manifest creation and the perishable body together overcomes death through the mortal and attains immortality through the Divine.",
            "commentary": "नश्वर देह और शाश्वत परमात्मा के संबंध का अंतिम ज्ञान।"
          },
          {
            "id": "isha-15",
            "verseNumber": 15,
            "sanskritText": "हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम् |\nतत्त्वं पूषन्नपावृणु सत्यधर्माय दृष्टये || १५ ||",
            "sanskrit": "हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम् |\nतत्त्वं पूषन्नपावृणु सत्यधर्माय दृष्टये || १५ ||",
            "transliteration": "hiraṇmayena pātreṇa satyasyāpihitaṁ mukham |\ntattvaṁ pūṣannapāvṛṇu satyadharmāya dṛṣṭaye || 15 ||",
            "translationHi": "सत्य का मुख ज्योतिर्मय (स्वर्णमय) पात्र से ढका हुआ है। हे पूषन् (सूर्य/पोषक देव)! मुझ सत्यधर्मा को उस परम सत्य के दर्शन कराने के लिए आप उस आवरण को हटा दीजिए।",
            "hindiMeaning": "सत्य का मुख ज्योतिर्मय (स्वर्णमय) पात्र से ढका हुआ है। हे पूषन् (सूर्य/पोषक देव)! मुझ सत्यधर्मा को उस परम सत्य के दर्शन कराने के लिए आप उस आवरण को हटा दीजिए।",
            "translationEn": "The face of Truth is covered with a golden vessel. O Sun, do you unveil that for me, a seeker of Truth, that I may behold It.",
            "englishMeaning": "The face of Truth is covered with a golden vessel. O Sun, do you unveil that for me, a seeker of Truth, that I may behold It.",
            "commentary": "संसार की बाह्य चमक-दमक सत्य को छुपा देती है; उस चमक के पार जाकर ही परम सत्य का साक्षात्कार सम्भव है।"
          },
          {
            "id": "isha-16",
            "verseNumber": 16,
            "sanskritText": "पूषन्नेकर्षे यम सूर्य प्राजापत्य व्यूह रश्मीन् समूह तेजः |\nयत्ते रूपं कल्याणतमं तत्ते पश्यामि योऽसावसौ पुरुषः सोऽहमस्मि || १६ ||",
            "sanskrit": "पूषन्नेकर्षे यम सूर्य प्राजापत्य व्यूह रश्मीन् समूह तेजः |\nयत्ते रूपं कल्याणतमं तत्ते पश्यामि योऽसावसौ पुरुषः सोऽहमस्मि || १६ ||",
            "transliteration": "pūṣannekarṣe yama sūrya prājāpatya vyūha raśmīn samūha tejaḥ |\nyatte rūpaṁ kalyāṇatamaṁ tatte paśyāmi yo'sāvasau puruṣaḥ so'hamasmi || 16 ||",
            "translationHi": "हे सबका पोषण करने वाले, हे एक मात्र ऋषि (सर्वद्रष्टा), हे यम, हे सूर्य, हे प्रजापति के पुत्र! आप अपनी किरणों को समेट लीजिए, अपने तेज को शांत कीजिए। आपका जो परम कल्याणमय रूप है, उसे मैं देखता हूँ। वह जो आदित्यमण्डल में स्थित पुरुष है, 'सोऽहमस्मि'—वही मैं हूँ!",
            "hindiMeaning": "हे सबका पोषण करने वाले, हे एक मात्र ऋषि (सर्वद्रष्टा), हे यम, हे सूर्य, हे प्रजापति के पुत्र! आप अपनी किरणों को समेट लीजिए, अपने तेज को शांत कीजिए। आपका जो परम कल्याणमय रूप है, उसे मैं देखता हूँ। वह जो आदित्यमण्डल में स्थित पुरुष है, 'सोऽहमस्मि'—वही मैं हूँ!",
            "translationEn": "O Nourisher, solitary Seer, Controller, Sun, offspring of Prajapati! Gather Your rays, withdraw Your blinding luster. That most gracious form of Yours I behold. He who is that Person—I am He!",
            "englishMeaning": "O Nourisher, solitary Seer, Controller, Sun, offspring of Prajapati! Gather Your rays, withdraw Your blinding luster. That most gracious form of Yours I behold. He who is that Person—I am He!",
            "commentary": "'सोऽहमस्मि'—जीव और ब्रह्म की अभिन्नता का यह सर्वोच्च वैदिक साक्षात्कार है।"
          },
          {
            "id": "isha-17",
            "verseNumber": 17,
            "sanskritText": "वायुरनिलममृतमथेदं भस्मान्तꣳ शरीरम् |\nॐ क्रतो स्मर कृतꣳ स्मर क्रतो स्मर कृतꣳ स्मर || १७ ||",
            "sanskrit": "वायुरनिलममृतमथेदं भस्मान्तꣳ शरीरम् |\nॐ क्रतो स्मर कृतꣳ स्मर क्रतो स्मर कृतꣳ स्मर || १७ ||",
            "transliteration": "vāyuranilamamṛtamathedaṁ bhasmāntaṁ śarīram |\noṁ krato smara kṛtaṁ smara krato smara kṛtaṁ smara || 17 ||",
            "translationHi": "मेरा प्राण वायु अमर सूत्रात्मा को प्राप्त हो और यह शरीर भस्म में समाप्त होने वाला है। हे ॐ स्वरूप संकल्पमय जीवात्मा! अपने किए हुए शुभ कर्मों का स्मरण कर, स्मरण कर!",
            "hindiMeaning": "मेरा प्राण वायु अमर सूत्रात्मा को प्राप्त हो और यह शरीर भस्म में समाप्त होने वाला है। हे ॐ स्वरूप संकल्पमय जीवात्मा! अपने किए हुए शुभ कर्मों का स्मरण कर, स्मरण कर!",
            "translationEn": "May my life-breath enter into the immortal air, and this body end in ashes. OM! O Mind, remember! Remember what you have done; remember, O Mind, remember!",
            "englishMeaning": "May my life-breath enter into the immortal air, and this body end in ashes. OM! O Mind, remember! Remember what you have done; remember, O Mind, remember!",
            "commentary": "अंत समय में जीवात्मा की प्रार्थना और देह की नश्वरता का उद्घोष।"
          },
          {
            "id": "isha-18",
            "verseNumber": 18,
            "sanskritText": "अग्ने नय सुपथा राये अस्मान् विश्वानि देव वयुनानि विद्वान् |\nयुयोध्यस्मज्जुहुराणमेनो भूयिष्ठां ते नमउक्तिं विधेम || १८ ||",
            "sanskrit": "अग्ने नय सुपथा राये अस्मान् विश्वानि देव वयुनानि विद्वान् |\nयुयोध्यस्मज्जुहुराणमेनो भूयिष्ठां ते नमउक्तिं विधेम || १८ ||",
            "transliteration": "agne naya supathā rāye asmān viśvāni deva vayunāni vidvān |\nyuyodhyasmajjuhurāṇameno bhūyiṣṭhāṁ te namauktiṁ vidhema || 18 ||",
            "translationHi": "हे प्रकाशस्वरूप अग्निदेव! आप हमारे सम्पूर्ण कर्मों को जानने वाले हैं। हमें सन्मार्ग (सुपथ) पर ले चलिए जिससे हम परम कल्याण को प्राप्त हों। हमारे कुटिल पापों को हमसे दूर कीजिए। हम आपको बारम्बार नमस्कार करते हैं।",
            "hindiMeaning": "हे प्रकाशस्वरूप अग्निदेव! आप हमारे सम्पूर्ण कर्मों को जानने वाले हैं। हमें सन्मार्ग (सुपथ) पर ले चलिए जिससे हम परम कल्याण को प्राप्त हों। हमारे कुटिल पापों को हमसे दूर कीजिए। हम आपको बारम्बार नमस्कार करते हैं।",
            "translationEn": "O Agni, radiant Lord, knower of all our deeds! Lead us by the good path to true wealth and fulfillment. Remove from us all crooked sin. To You we offer our repeated salutations.",
            "englishMeaning": "O Agni, radiant Lord, knower of all our deeds! Lead us by the good path to true wealth and fulfillment. Remove from us all crooked sin. To You we offer our repeated salutations.",
            "commentary": "ईशावास्योपनिषद् की यह अंतिम प्रार्थना सन्मार्ग, निष्पापता और ईश्वर-समर्पण की अमर याचना है।"
          }
        ]
      }
    ]
  },
  "mandukya-upanishad": {
    "id": "mandukya-upanishad",
    "slug": "mandukya-upanishad",
    "titleHi": "माण्डूक्योपनिषद्",
    "titleEn": "Mandukya Upanishad",
    "author": "अथर्ववेद (वैदिक ऋषिगण)",
    "category": "upanishad",
    "descriptionHi": "सम्पूर्ण १२ मन्त्रों में चेतना के चार स्तरों (जाग्रत, स्वप्न, सुषुप्ति और तुरीय) तथा ॐकार के वैज्ञानिक स्वरूप का निरूपण करने वाला सर्वाधिक संक्षिप्त व गहन उपनिषद्।",
    "descriptionEn": "The shortest yet most profound Upanishad containing 12 verses expounding the four states of consciousness and the metaphysics of OM.",
    "totalVerses": 12,
    "totalChapters": 1,
    "chapters": [
      {
        "id": "man-ch-1",
        "chapterNumber": 1,
        "titleHi": "माण्डूक्योपनिषद् सम्पूर्ण १२ मन्त्र",
        "titleEn": "Mandukya Upanishad (Complete 12 Mantras)",
        "summaryHi": "अथर्ववेद का माण्डूक्योपनिषद्—अयमात्मा ब्रह्म, ॐकार के चार पाद (अकार-जागृत, उकार-स्वप्न, मकार-सुषुप्ति, अमात्र-तुरीय) एवं अद्वैत मोक्ष।",
        "summaryEn": "The complete 12 verses of Mandukya Upanishad: The 4 states of consciousness (Waking, Dream, Deep Sleep, and Turiya) and the sacred OM.",
        "verses": [
          {
            "id": "man-1",
            "verseNumber": 1,
            "sanskritText": "ॐ इत्येतदक्षरमिदं सर्वं तस्योपव्याख्यानं भूतं भवद् भविष्यदिति सर्वमोंकार एव |\nयच्चान्यत् त्रिकालातीतं तदपि ओंकार एव || १ ||",
            "sanskrit": "ॐ इत्येतदक्षरमिदं सर्वं तस्योपव्याख्यानं भूतं भवद् भविष्यदिति सर्वमोंकार एव |\nयच्चान्यत् त्रिकालातीतं तदपि ओंकार एव || १ ||",
            "transliteration": "oṁ ityetedakṣaramidaṁ sarvaṁ tasyopavyākhyānaṁ bhūtaṁ bhavad bhaviṣyaditi sarvamoṁkāra eva |\nyaccānyat trikālātītaṁ tadapi oṁkāra eva || 1 ||",
            "translationHi": "'ॐ' यह अविनाशी अक्षर ही यह सब कुछ है। भूत, वर्तमान और भविष्य—जो कुछ भी है, वह सब ओंकार ही है; और जो तीनों कालों से परे त्रिकालातीत तत्व है, वह भी ओंकार ही है।",
            "hindiMeaning": "'ॐ' यह अविनाशी अक्षर ही यह सब कुछ है। भूत, वर्तमान और भविष्य—जो कुछ भी है, वह सब ओंकार ही है; और जो तीनों कालों से परे त्रिकालातीत तत्व है, वह भी ओंकार ही है।",
            "translationEn": "OM: this syllable is all this. A clear explanation of it is: what was, what is, and what shall be—all is indeed the syllable OM. And whatever else is beyond the three divisions of time, that also is indeed OM.",
            "englishMeaning": "OM: this syllable is all this. A clear explanation of it is: what was, what is, and what shall be—all is indeed the syllable OM. And whatever else is beyond the three divisions of time, that also is indeed OM.",
            "commentary": "माण्डूक्योपनिषद् का प्रारम्भ ही प्रणव (ॐ) की सार्वभौमिकता और कालातीत स्वरूप से होता है।"
          },
          {
            "id": "man-2",
            "verseNumber": 2,
            "sanskritText": "सर्वं ह्येतद् ब्रह्मायमात्मा ब्रह्म सोऽयमात्मा चतुष्पात् || २ ||",
            "sanskrit": "सर्वं ह्येतद् ब्रह्मायमात्मा ब्रह्म सोऽयमात्मा चतुष्पात् || २ ||",
            "transliteration": "sarvaṁ hyetad brahmāyamātmā brahma so'yamātmā catuṣpāt || 2 ||",
            "translationHi": "यह सब कुछ निःसंदेह ब्रह्म है। यह आत्मा ही ब्रह्म है (अयमात्मा ब्रह्म)। उस इस आत्मा के चार पाद (चरण/अवस्थाएं) हैं।",
            "hindiMeaning": "यह सब कुछ निःसंदेह ब्रह्म है। यह आत्मा ही ब्रह्म है (अयमात्मा ब्रह्म)। उस इस आत्मा के चार पाद (चरण/अवस्थाएं) हैं।",
            "translationEn": "All this is verily Brahman. This Atman (Self) is Brahman. This Self has four quarters (states of consciousness).",
            "englishMeaning": "All this is verily Brahman. This Atman (Self) is Brahman. This Self has four quarters (states of consciousness).",
            "commentary": "'अयमात्मा ब्रह्म' अथर्ववेद का प्रसिद्ध महावाक्य है जो जीव और ब्रह्म की पूर्ण एकता का प्रतिपादन करता है।"
          },
          {
            "id": "man-3",
            "verseNumber": 3,
            "sanskritText": "जागरितस्थानो बहिष्प्रज्ञः सप्ताङ्ग एकोनविंशतिमुखः स्थूलभुग्वैश्वानरः प्रथमः पादः || ३ ||",
            "sanskrit": "जागरितस्थानो बहिष्प्रज्ञः सप्ताङ्ग एकोनविंशतिमुखः स्थूलभुग्वैश्वानरः प्रथमः पादः || ३ ||",
            "transliteration": "jāgaritasthāno bahiṣprajñaḥ saptāṅga ekonaviṁśatimukhaḥ sthūlabhugvaiśvānaraḥ prathamaḥ pādaḥ || 3 ||",
            "translationHi": "जागृत अवस्था में रहने वाला, बाह्य विषयों का ज्ञान रखने वाला, सात अंगों और उन्नीस मुखों वाला, स्थूल विषयों का भोग करने वाला 'वैश्वानर' आत्मा का प्रथम पाद है।",
            "hindiMeaning": "जागृत अवस्था में रहने वाला, बाह्य विषयों का ज्ञान रखने वाला, सात अंगों और उन्नीस मुखों वाला, स्थूल विषयों का भोग करने वाला 'वैश्वानर' आत्मा का प्रथम पाद है।",
            "translationEn": "The first quarter is Vaishvanara, whose sphere is the waking state, conscious of external objects, having seven limbs and nineteen mouths, and experiencing the gross world.",
            "englishMeaning": "The first quarter is Vaishvanara, whose sphere is the waking state, conscious of external objects, having seven limbs and nineteen mouths, and experiencing the gross world.",
            "commentary": "जाग्रत अवस्था: ५ ज्ञानेन्द्रियाँ, ५ कर्मेन्द्रियाँ, ५ प्राण, मन, बुद्धि, चित्त और अहंकार—ये १९ मुख हैं जिनके द्वारा आत्मा स्थूल जगत का अनुभव करता है।"
          },
          {
            "id": "man-4",
            "verseNumber": 4,
            "sanskritText": "स्वप्नस्थानोऽन्तःप्रज्ञः सप्ताङ्ग एकोनविंशतिमुखः प्रविविक्तभुक्तैजसो द्वितीयः पादः || ४ ||",
            "sanskrit": "स्वप्नस्थानोऽन्तःप्रज्ञः सप्ताङ्ग एकोनविंशतिमुखः प्रविविक्तभुक्तैजसो द्वितीयः पादः || ४ ||",
            "transliteration": "svapnasthāno'ntaḥprajñaḥ saptāṅga ekonaviṁśatimukhaḥ praviviktabhuktaijaso dvitīyaḥ pādaḥ || 4 ||",
            "translationHi": "स्वप्न अवस्था में रहने वाला, अन्तःकरण के विषयों का ज्ञान रखने वाला, सात अंगों और उन्नीस मुखों वाला, सूक्ष्म वासनाओं का भोग करने वाला 'तैजस' आत्मा का द्वितीय पाद है।",
            "hindiMeaning": "स्वप्न अवस्था में रहने वाला, अन्तःकरण के विषयों का ज्ञान रखने वाला, सात अंगों और उन्नीस मुखों वाला, सूक्ष्म वासनाओं का भोग करने वाला 'तैजस' आत्मा का द्वितीय पाद है।",
            "translationEn": "The second quarter is Taijasa, whose sphere is the dream state, conscious of internal objects, having seven limbs and nineteen mouths, and experiencing the subtle world.",
            "englishMeaning": "The second quarter is Taijasa, whose sphere is the dream state, conscious of internal objects, having seven limbs and nineteen mouths, and experiencing the subtle world.",
            "commentary": "स्वप्न अवस्था में बाह्य इन्द्रियाँ लीन हो जाती हैं और मन अपनी ही वासनाओं से निर्मित सूक्ष्म संसार का अनुभव करता है।"
          },
          {
            "id": "man-5",
            "verseNumber": 5,
            "sanskritText": "यत्र सुप्तो न कञ्चन कामं कामयते न कञ्चन स्वप्नं पश्यति तत् सुषुप्तम् |\nसुषुप्तस्थान एकीभूतः प्रज्ञानघन एवानन्दमयो ह्यानन्दभुक् चेतोमुखः प्राज्ञस्तृतीया पादः || ५ ||",
            "sanskrit": "यत्र सुप्तो न कञ्चन कामं कामयते न कञ्चन स्वप्नं पश्यति तत् सुषुप्तम् |\nसुषुप्तस्थान एकीभूतः प्रज्ञानघन एवानन्दमयो ह्यानन्दभुक् चेतोमुखः प्राज्ञस्तृतीया पादः || ५ ||",
            "transliteration": "yatra supto na kañcana kāmaṁ kāmayate na kañcana svapnaṁ paśyati tat suṣuptam |\nsuṣuptasthāna ekībhūtaḥ prajñānaghana evānandamayo hyānandabhuk cetomukhaḥ prājñastṛtīyā pādaḥ || 5 ||",
            "translationHi": "जहाँ सोया हुआ पुरुष न किसी भोग की कामना करता है और न कोई स्वप्न देखता है, वह सुषुप्ति (गाढ़ निद्रा) है। सुषुप्ति स्थान वाला, अभिन्न, केवल प्रज्ञानघन, आनन्दमय, आनन्द का भोक्ता और चेतना का द्वार 'प्राज्ञ' आत्मा का तृतीय पाद है।",
            "hindiMeaning": "जहाँ सोया हुआ पुरुष न किसी भोग की कामना करता है और न कोई स्वप्न देखता है, वह सुषुप्ति (गाढ़ निद्रा) है। सुषुप्ति स्थान वाला, अभिन्न, केवल प्रज्ञानघन, आनन्दमय, आनन्द का भोक्ता और चेतना का द्वार 'प्राज्ञ' आत्मा का तृतीय पाद है।",
            "translationEn": "Where one sleeping desires no desire and sees no dream, that is deep sleep. The third quarter is Prajna, whose sphere is deep sleep, unified, a mass of pure consciousness, full of bliss, experiencing bliss, and the gateway to awareness.",
            "englishMeaning": "Where one sleeping desires no desire and sees no dream, that is deep sleep. The third quarter is Prajna, whose sphere is deep sleep, unified, a mass of pure consciousness, full of bliss, experiencing bliss, and the gateway to awareness.",
            "commentary": "सुषुप्ति में समस्त द्वैत मिट जाता है और व्यक्ति असीम विश्राम व शांति का अनुभव करता है।"
          },
          {
            "id": "man-6",
            "verseNumber": 6,
            "sanskritText": "एष सर्वेश्वर एष सर्वज्ञ एषोऽन्तर्याम्येष योनिः सर्वस्य प्रभवाप्ययौ हि भूतानाम् || ६ ||",
            "sanskrit": "एष सर्वेश्वर एष सर्वज्ञ एषोऽन्तर्याम्येष योनिः सर्वस्य प्रभवाप्ययौ हि भूतानाम् || ६ ||",
            "transliteration": "eṣa sarveśvara eṣa sarvajña eṣo'ntaryāmyeṣa yoniḥ sarvasya prabhavāpyayau hi bhūtānām || 6 ||",
            "translationHi": "यह सबका स्वामी (सर्वेश्वर) है, यह सर्वज्ञ है, यह अन्तःकरण में रहने वाला अंतर्यामी है, यह सबका मूल कारण (योनि) है और समस्त प्राणियों की उत्पत्ति और लय का स्थान है।",
            "hindiMeaning": "यह सबका स्वामी (सर्वेश्वर) है, यह सर्वज्ञ है, यह अन्तःकरण में रहने वाला अंतर्यामी है, यह सबका मूल कारण (योनि) है और समस्त प्राणियों की उत्पत्ति और लय का स्थान है।",
            "translationEn": "This is the Lord of all, this is the knower of all, this is the inner ruler, this is the source of all, the origin and dissolution of all beings.",
            "englishMeaning": "This is the Lord of all, this is the knower of all, this is the inner ruler, this is the source of all, the origin and dissolution of all beings.",
            "commentary": "ईश्वर ही समष्टि रूप से समस्त चेतनता और सृष्टि का मूल आधार है।"
          },
          {
            "id": "man-7",
            "verseNumber": 7,
            "sanskritText": "नान्तःप्रज्ञं न बहिष्प्रज्ञं नोभयतःप्रज्ञं न प्रज्ञानघनं न प्रज्ञं नाप्रज्ञम् |\nअदृष्टमव्यवहार्यमग्राह्यमलक्षणमचिन्त्यमव्यपदेश्यमेकात्मप्रत्ययसारं प्रपञ्चोपशमं शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः || ७ ||",
            "sanskrit": "नान्तःप्रज्ञं न बहिष्प्रज्ञं नोभयतःप्रज्ञं न प्रज्ञानघनं न प्रज्ञं नाप्रज्ञम् |\nअदृष्टमव्यवहार्यमग्राह्यमलक्षणमचिन्त्यमव्यपदेश्यमेकात्मप्रत्ययसारं प्रपञ्चोपशमं शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः || ७ ||",
            "transliteration": "nāntaḥprajñaṁ na bahiṣprajñaṁ nobhayataḥprajñaṁ na prajñānaghanaṁ na prajñaṁ nāprajñam |\nadṛṣṭamavyavahāryamagrāhyamalakṣaṇamacintyamavyapadeśyamekātmapratyayasāraṁ prapañcopaśamaṁ śāntaṁ śivamadvaitaṁ caturthaṁ manyante sa ātmā sa vijñeyaḥ || 7 ||",
            "translationHi": "जो न अन्तःप्रज्ञ (स्वप्नावस्था) है, न बहिष्प्रज्ञ (जाग्रतावस्था) है, न दोनों प्रकार का प्रज्ञ है, न प्रज्ञानघन (सुषुप्ति) है, न जानने वाला है और न अज्ञानी है; जो अदृश्य, अव्यवहार्य, अग्राह्य, लक्षणहीन, अचिन्त्य, अकथनीय, एकमात्र आत्म-अनुभूति का सार, प्रपञ्च से सर्वथा शांत, कल्याणमय और अद्वैत है—उसे 'तुरीय' (चतुर्थ पाद) मानते हैं। वही आत्मा है, वही जानने योग्य है।",
            "hindiMeaning": "जो न अन्तःप्रज्ञ (स्वप्नावस्था) है, न बहिष्प्रज्ञ (जाग्रतावस्था) है, न दोनों प्रकार का प्रज्ञ है, न प्रज्ञानघन (सुषुप्ति) है, न जानने वाला है और न अज्ञानी है; जो अदृश्य, अव्यवहार्य, अग्राह्य, लक्षणहीन, अचिन्त्य, अकथनीय, एकमात्र आत्म-अनुभूति का सार, प्रपञ्च से सर्वथा शांत, कल्याणमय और अद्वैत है—उसे 'तुरीय' (चतुर्थ पाद) मानते हैं। वही आत्मा है, वही जानने योग्य है।",
            "translationEn": "Not conscious of internal objects, not conscious of external objects, not conscious of both, not a mass of consciousness, not cognitive, not non-cognitive; unseen, beyond worldly interaction, ungraspable, without signs, unthinkable, indescribable, the essence of the consciousness of the single Self, the cessation of the world, peaceful, auspicious, non-dual—they consider this the Fourth (Turiya). That is the Self, that is to be known.",
            "englishMeaning": "Not conscious of internal objects, not conscious of external objects, not conscious of both, not a mass of consciousness, not cognitive, not non-cognitive; unseen, beyond worldly interaction, ungraspable, without signs, unthinkable, indescribable, the essence of the consciousness of the single Self, the cessation of the world, peaceful, auspicious, non-dual—they consider this the Fourth (Turiya). That is the Self, that is to be known.",
            "commentary": "यह सम्पूर्ण उपनिषद वाङ्मय का सबसे गहरा और भव्य मन्त्र है, जो 'तुरीय' (शुद्ध आत्मचेतना) का प्रत्यक्ष निरूपण करता है।"
          },
          {
            "id": "man-8",
            "verseNumber": 8,
            "sanskritText": "सोऽयमात्माध्यक्षरमोंकारोऽधिमात्रं पादा मात्रा मात्राश्च पादा अकार उकारो मकार इति || ८ ||",
            "sanskrit": "सोऽयमात्माध्यक्षरमोंकारोऽधिमात्रं पादा मात्रा मात्राश्च पादा अकार उकारो मकार इति || ८ ||",
            "transliteration": "so'yamātmādhyakṣaramoṁkāro'dhimātraṁ pādā mātrā mātrāśca pādā akāra ukāro makāra iti || 8 ||",
            "translationHi": "वही यह आत्मा अक्षरों में ओंकार है और मात्राओं के रूप में प्रतिष्ठित है। आत्मा के जो पाद हैं, वे ही ओंकार की मात्राएं हैं और जो मात्राएं हैं, वे ही पाद हैं—अर्थात 'अ', 'उ', और 'म्'।",
            "hindiMeaning": "वही यह आत्मा अक्षरों में ओंकार है और मात्राओं के रूप में प्रतिष्ठित है। आत्मा के जो पाद हैं, वे ही ओंकार की मात्राएं हैं और जो मात्राएं हैं, वे ही पाद हैं—अर्थात 'अ', 'उ', और 'म्'।",
            "translationEn": "That same Self is, in the realm of syllables, the syllable OM, and in the realm of measures, its quarters are the measures and the measures are the quarters: the letter A, the letter U, and the letter M.",
            "englishMeaning": "That same Self is, in the realm of syllables, the syllable OM, and in the realm of measures, its quarters are the measures and the measures are the quarters: the letter A, the letter U, and the letter M.",
            "commentary": "आत्मा की चार अवस्थाओं और ॐकार की ध्वनियों का अभेद।"
          },
          {
            "id": "man-9",
            "verseNumber": 9,
            "sanskritText": "जागरितस्थानो वैश्वानरोऽकारः प्रथमा मात्राऽऽप्तेरादिमत्त्वाद्वाऽऽप्नोति ह वै सर्वान् कामानादिश्च भवति य एवं वेद || ९ ||",
            "sanskrit": "जागरितस्थानो वैश्वानरोऽकारः प्रथमा मात्राऽऽप्तेरादिमत्त्वाद्वाऽऽप्नोति ह वै सर्वान् कामानादिश्च भवति य एवं वेद || ९ ||",
            "transliteration": "jāgaritasthāno vaiśvānaro'kāraḥ prathamā mātrā''pterādimattvādvā''pnoti ha vai sarvān kāmānādiśca bhavati ya evaṁ veda || 9 ||",
            "translationHi": "जागृत अवस्था वाला वैश्वानर ओंकार की प्रथम मात्रा 'अकार' है, क्योंकि यह सर्वव्यापक है और सब वर्णों का आदि है। जो पुरुष इस प्रकार जानता है, वह सब कामनाओं को प्राप्त कर लेता है और श्रेष्ठ (आदि) बन जाता है।",
            "hindiMeaning": "जागृत अवस्था वाला वैश्वानर ओंकार की प्रथम मात्रा 'अकार' है, क्योंकि यह सर्वव्यापक है और सब वर्णों का आदि है। जो पुरुष इस प्रकार जानता है, वह सब कामनाओं को प्राप्त कर लेता है और श्रेष्ठ (आदि) बन जाता है।",
            "translationEn": "Vaishvanara, in the waking state, is the letter A, the first measure, because of all-pervasiveness or being first. He who knows this attains all desires and becomes foremost.",
            "englishMeaning": "Vaishvanara, in the waking state, is the letter A, the first measure, because of all-pervasiveness or being first. He who knows this attains all desires and becomes foremost.",
            "commentary": "'अ' वर्ण समस्त ध्वनियों का मूल और जागृत चेतना का प्रतीक है।"
          },
          {
            "id": "man-10",
            "verseNumber": 10,
            "sanskritText": "स्वप्नस्थानस्तैजस उकारो द्वितीया मात्रोत्कर्षादुभयत्वाद्वोत्कर्षति ह वै ज्ञानसन्ततिं समानश्च भवति नास्याब्रह्मवित्कुले भवति य एवं वेद || १० ||",
            "sanskrit": "स्वप्नस्थानस्तैजस उकारो द्वितीया मात्रोत्कर्षादुभयत्वाद्वोत्कर्षति ह वै ज्ञानसन्ततिं समानश्च भवति नास्याब्रह्मवित्कुले भवति य एवं वेद || १० ||",
            "transliteration": "svapnasthānastaijasa ukāro dvitīyā mātrotkarṣādubhayatvādvotkarṣati ha vai jñānasantatiṁ samānaśca bhavati nāsyābrahmavitkule bhavati ya evaṁ veda || 10 ||",
            "translationHi": "स्वप्न अवस्था वाला तैजस ओंकार की दूसरी मात्रा 'उकार' है, क्योंकि यह अकार और मकार के बीच में उत्कृष्ट और उभयरूप है। जो पुरुष इस प्रकार जानता है, वह ज्ञान की परम्परा को बढ़ाता है, समदर्शी होता है और उसके कुल में कोई अब्रह्मज्ञानी नहीं होता।",
            "hindiMeaning": "स्वप्न अवस्था वाला तैजस ओंकार की दूसरी मात्रा 'उकार' है, क्योंकि यह अकार और मकार के बीच में उत्कृष्ट और उभयरूप है। जो पुरुष इस प्रकार जानता है, वह ज्ञान की परम्परा को बढ़ाता है, समदर्शी होता है और उसके कुल में कोई अब्रह्मज्ञानी नहीं होता।",
            "translationEn": "Taijasa, in the dream state, is the letter U, the second measure, from its excellence or intermediate state. He who knows this elevates knowledge and maintains equilibrium.",
            "englishMeaning": "Taijasa, in the dream state, is the letter U, the second measure, from its excellence or intermediate state. He who knows this elevates knowledge and maintains equilibrium.",
            "commentary": "'उ' वर्ण अंतश्चेतना और सूक्ष्म जगत का परिचायक है।"
          },
          {
            "id": "man-11",
            "verseNumber": 11,
            "sanskritText": "सुषुप्तस्थानः प्राज्ञो मकारस्तृतीया मात्रा मितेरपीतेर्वा मिनोति ह वा इदं सर्वमपीतिश्च भवति य एवं वेद || ११ ||",
            "sanskrit": "सुषुप्तस्थानः प्राज्ञो मकारस्तृतीया मात्रा मितेरपीतेर्वा मिनोति ह वा इदं सर्वमपीतिश्च भवति य एवं वेद || ११ ||",
            "transliteration": "suṣuptasthānaḥ prājño makārastṛtīyā mātrā miterapītervā minoti ha vā idaṁ sarvamapītiśca bhavati ya evaṁ veda || 11 ||",
            "translationHi": "सुषुप्ति अवस्था वाला प्राज्ञ ओंकार की तीसरी मात्रा 'मकार' है, क्योंकि यह मान करने वाला (मापने वाला) और अपने में सबको लीन (लय) करने वाला है। जो इस प्रकार जानता है, वह इस सम्पूर्ण जगत को जान लेता है और सबका लयस्थान बन जाता है।",
            "hindiMeaning": "सुषुप्ति अवस्था वाला प्राज्ञ ओंकार की तीसरी मात्रा 'मकार' है, क्योंकि यह मान करने वाला (मापने वाला) और अपने में सबको लीन (लय) करने वाला है। जो इस प्रकार जानता है, वह इस सम्पूर्ण जगत को जान लेता है और सबका लयस्थान बन जाता है।",
            "translationEn": "Prajna, in deep sleep, is the letter M, the third measure, because of measuring or dissolving. He who knows this measures all this and becomes the place of dissolution.",
            "englishMeaning": "Prajna, in deep sleep, is the letter M, the third measure, because of measuring or dissolving. He who knows this measures all this and becomes the place of dissolution.",
            "commentary": "'म्' वर्ण प्रलय और विश्राम का प्रतीक है।"
          },
          {
            "id": "man-12",
            "verseNumber": 12,
            "sanskritText": "अमात्रश्चतुर्थोऽव्यवहार्यः प्रपञ्चोपशमः शिवोऽद्वैत एवमोंकार आत्मैव संविशत्यात्मनाऽऽत्मानं य एवं वेद || १२ ||",
            "sanskrit": "अमात्रश्चतुर्थोऽव्यवहार्यः प्रपञ्चोपशमः शिवोऽद्वैत एवमोंकार आत्मैव संविशत्यात्मनाऽऽत्मानं य एवं वेद || १२ ||",
            "transliteration": "amātraścaturtho'vyavahāryaḥ prapañcopaśamaḥ śivo'dvaita evamoṁkāra ātmaiva saṁviśatyātmanā''tmānaṁ ya evaṁ veda || 12 ||",
            "translationHi": "मात्रा-रहित (अमात्र), चतुर्थ, वाणी और व्यवहार से परे, प्रपञ्च से सर्वथा शांत, कल्याणमय और अद्वैत—इस प्रकार ओंकार ही साक्षात् आत्मा है। जो पुरुष ऐसा जानता है, वह अपनी अंतरात्मा द्वारा स्वयं परम आत्मा में लीन हो जाता है।",
            "hindiMeaning": "मात्रा-रहित (अमात्र), चतुर्थ, वाणी और व्यवहार से परे, प्रपञ्च से सर्वथा शांत, कल्याणमय और अद्वैत—इस प्रकार ओंकार ही साक्षात् आत्मा है। जो पुरुष ऐसा जानता है, वह अपनी अंतरात्मा द्वारा स्वयं परम आत्मा में लीन हो जाता है।",
            "translationEn": "Without measure is the Fourth, beyond interaction, the cessation of phenomenal existence, auspicious and non-dual. Thus OM is verily the Self. He who knows this enters the Supreme Self with his own self.",
            "englishMeaning": "Without measure is the Fourth, beyond interaction, the cessation of phenomenal existence, auspicious and non-dual. Thus OM is verily the Self. He who knows this enters the Supreme Self with his own self.",
            "commentary": "ओंकार की गूंज के बाद का जो अगाध मौन (अमात्र) है, वही साक्षात परब्रह्म परमात्मा है।"
          }
        ]
      }
    ]
  },
  "katha-upanishad": {
    "id": "katha-upanishad",
    "slug": "katha-upanishad",
    "titleHi": "कठोपनिषद्",
    "titleEn": "Katha Upanishad",
    "author": "कृष्ण यजुर्वेद (वैदिक ऋषिगण)",
    "category": "upanishad",
    "descriptionHi": "यमराज और बालक नचिकेता के मध्य अमर संवाद। मृत्यु का रहस्य, श्रेयस्-प्रेयस् विवेक, रथ-सारथी रूपक और 'उत्तिष्ठत जाग्रत' का अमर उद्घोष।",
    "descriptionEn": "The legendary dialogue between the god of Death (Yama) and the young seeker Nachiketa on the mystery of mortality, the eternal soul, and self-realization.",
    "totalVerses": 10,
    "totalChapters": 6,
    "chapters": [
      {
        "id": "katha-valli-1",
        "chapterNumber": 1,
        "titleHi": "प्रथमा वल्ली (अध्याय १, वल्ली १)",
        "titleEn": "Valli 1: The Sacrifice of Vajasravas",
        "summaryHi": "वाजश्रवस का सर्वमेध यज्ञ, नचिकेता की पितृभक्ति, यमलोक गमन, यमराज की प्रतीक्षा और प्रथम दो वरदान।",
        "summaryEn": "Nachiketa's journey to the realm of Death (Yama), his three-day fast at Yama's abode, and receiving the first two boons.",
        "verses": [
          {
            "id": "katha-1-1-1",
            "verseNumber": 1,
            "sanskritText": "ॐ उशन् ह वै वाजश्रवसः सर्ववेदसं ददौ |\nतस्य ह नचिकेता नाम पुत्र आस ||",
            "sanskrit": "ॐ उशन् ह वै वाजश्रवसः सर्ववेदसं ददौ |\nतस्य ह नचिकेता नाम पुत्र आस ||",
            "transliteration": "oṁ uśan ha vai vājaśravasaḥ sarvavedasaṁ dadau |\ntasya ha naciketā nāma putra āsa ||",
            "translationHi": "स्वर्गफल की इच्छा से वाजश्रवा के पुत्र उद्दालक ने 'सर्वमेध' यज्ञ में अपना सम्पूर्ण धन दान कर दिया। उनका 'नचिकेता' नाम का एक यशस्वी पुत्र था।",
            "hindiMeaning": "स्वर्गफल की इच्छा से वाजश्रवा के पुत्र उद्दालक ने 'सर्वमेध' यज्ञ में अपना सम्पूर्ण धन दान कर दिया। उनका 'नचिकेता' नाम का एक यशस्वी पुत्र था।",
            "translationEn": "Desirous of heavenly rewards, Vajashravasa gave away all his possessions in a sacrifice. He had a son named Nachiketa.",
            "englishMeaning": "Desirous of heavenly rewards, Vajashravasa gave away all his possessions in a sacrifice. He had a son named Nachiketa.",
            "commentary": "कठोपनिषद् का प्रारम्भ एक बालक की सत्यनिष्ठा और जिज्ञासा से होता है।"
          },
          {
            "id": "katha-1-1-20",
            "verseNumber": 20,
            "sanskritText": "येयं प्रेते विचिकित्सा मनुष्येऽस्तीत्येके नायमस्तीति चैके |\nएतद्विद्यामनुशिष्टस्त्वयाऽहं वराणामेष वरस्तृतीयः ||",
            "sanskrit": "येयं प्रेते विचिकित्सा मनुष्येऽस्तीत्येके नायमस्तीति चैके |\nएतद्विद्यामनुशिष्टस्त्वयाऽहं वराणामेष वरस्तृतीयः ||",
            "transliteration": "yeyaṁ prete vicikitsā manuṣye'stītyeke nāyamastīti caike |\netadvidyāmanuśiṣṭastvayā'haṁ varāṇāmeṣa varastṛtīyaḥ ||",
            "translationHi": "नचिकेता ने कहा: मनुष्य के मरने पर यह जो संशय होता है—कोई कहते हैं कि आत्मा रहता है और कोई कहते हैं कि नहीं रहता। आपके द्वारा शिक्षित होकर मैं इस आत्म-तत्व को जानना चाहता हूँ; वरों में यह मेरा तीसरा वर है।",
            "hindiMeaning": "नचिकेता ने कहा: मनुष्य के मरने पर यह जो संशय होता है—कोई कहते हैं कि आत्मा रहता है और कोई कहते हैं कि नहीं रहता। आपके द्वारा शिक्षित होकर मैं इस आत्म-तत्व को जानना चाहता हूँ; वरों में यह मेरा तीसरा वर है।",
            "translationEn": "Nachiketa said: There is this doubt regarding a deceased person: some say 'he exists', and others say 'he does not exist'. Instructed by you, I would know this. Of all boons, this is the third boon.",
            "englishMeaning": "Nachiketa said: There is this doubt regarding a deceased person: some say 'he exists', and others say 'he does not exist'. Instructed by you, I would know this. Of all boons, this is the third boon.",
            "commentary": "मृत्यु के रहस्य और आत्मा की अमरता पर विश्व साहित्य का यह पहला और सबसे प्रखर दार्शनिक प्रश्न है।"
          }
        ]
      },
      {
        "id": "katha-valli-2",
        "chapterNumber": 2,
        "titleHi": "द्वितीया वल्ली (अध्याय १, वल्ली २)",
        "titleEn": "Valli 2: Shreyas vs Preyas",
        "summaryHi": "श्रेयस् (कल्याण) और प्रेयस् (प्रिय) का भेद, ॐकार का परम पद, आत्मा की अजरता-अमरता एवं अणु से सूक्ष्म, महान से महान स्वरूप।",
        "summaryEn": "The distinction between the good (Shreyas) and the pleasant (Preyas); the sacred syllable OM; the unborn and deathless nature of the Self.",
        "verses": [
          {
            "id": "katha-1-2-1",
            "verseNumber": 1,
            "sanskritText": "अन्यच्छ्रेयोऽन्यदुतैव प्रेयस्ते उभे नानार्थे पुरुषꣳ सिनीतः |\nतयोः श्रेय आददानस्य साधु भवति हीयतेऽर्थाद्य उ प्रेयो वृणीते ||",
            "sanskrit": "अन्यच्छ्रेयोऽन्यदुतैव प्रेयस्ते उभे नानार्थे पुरुषꣳ सिनीतः |\nतयोः श्रेय आददानस्य साधु भवति हीयतेऽर्थाद्य उ प्रेयो वृणीते ||",
            "transliteration": "anyacchreyo'nyadutaiva preyaste ubhe nānārthe puruṣaṁ sinītaḥ |\ntayoḥ śreya ādadānasya sādhu bhavati hīyate'rthādya u preyo vṛṇīte ||",
            "translationHi": "यमराज ने कहा: 'श्रेयस्' (परम कल्याण) भिन्न है और 'प्रेयस्' (सांसारिक सुख) भिन्न है। ये दोनों भिन्न-भिन्न प्रयोजन वाले होकर मनुष्य को बांधते हैं। इनमें से श्रेय को ग्रहण करने वाले का कल्याण होता है, और जो प्रेय को चुनता है, वह परम पुरुषार्थ से च्युत हो जाता है।",
            "hindiMeaning": "यमराज ने कहा: 'श्रेयस्' (परम कल्याण) भिन्न है और 'प्रेयस्' (सांसारिक सुख) भिन्न है। ये दोनों भिन्न-भिन्न प्रयोजन वाले होकर मनुष्य को बांधते हैं। इनमें से श्रेय को ग्रहण करने वाले का कल्याण होता है, और जो प्रेय को चुनता है, वह परम पुरुषार्थ से च्युत हो जाता है।",
            "translationEn": "Yama said: The good (Shreyas) is one thing, and the pleasant (Preyas) is quite another. Both bind humans to different ends. Well is it for him who embraces the good, but he who chooses the pleasant misses the true goal of life.",
            "englishMeaning": "Yama said: The good (Shreyas) is one thing, and the pleasant (Preyas) is quite another. Both bind humans to different ends. Well is it for him who embraces the good, but he who chooses the pleasant misses the true goal of life.",
            "commentary": "प्रत्येक मनुष्य के सम्मुख दो मार्ग आते हैं: क्षणिक सुख (प्रेय) अथवा शाश्वत कल्याण (श्रेय)। विवेकशील श्रेय को चुनते हैं।"
          },
          {
            "id": "katha-1-2-18",
            "verseNumber": 18,
            "sanskritText": "न जायते म्रियते वा विपश्चिन्नायं कुतश्चिन्न बभूव कश्चित् |\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ||",
            "sanskrit": "न जायते म्रियते वा विपश्चिन्नायं कुतश्चिन्न बभूव कश्चित् |\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ||",
            "transliteration": "na jāyate mriyate vā vipaścinnāyaṁ kutaścinna babhūva kaścit |\najo nityaḥ śāśvato'yaṁ purāṇo na hanyate hanyamāne śarīre ||",
            "translationHi": "यह ज्ञानस्वरूप आत्मा न कभी जन्म लेता है और न मरता है। यह न किसी से उत्पन्न हुआ है और न कोई इससे उत्पन्न हुआ है। यह अजन्मा, नित्य, शाश्वत और पुरातन है; शरीर के मारे जाने पर भी यह नहीं मारा जाता।",
            "hindiMeaning": "यह ज्ञानस्वरूप आत्मा न कभी जन्म लेता है और न मरता है। यह न किसी से उत्पन्न हुआ है और न कोई इससे उत्पन्न हुआ है। यह अजन्मा, नित्य, शाश्वत और पुरातन है; शरीर के मारे जाने पर भी यह नहीं मारा जाता।",
            "translationEn": "The knowing Self is never born; nor does It die at any time. It sprang from nothing, and nothing sprang from It. Unborn, eternal, everlasting, primeval, It is not destroyed when the body is destroyed.",
            "englishMeaning": "The knowing Self is never born; nor does It die at any time. It sprang from nothing, and nothing sprang from It. Unborn, eternal, everlasting, primeval, It is not destroyed when the body is destroyed.",
            "commentary": "गीता (२.२०) में भगवान श्रीकृष्ण ने इसी मन्त्र को उद्धृत किया है।"
          }
        ]
      },
      {
        "id": "katha-valli-3",
        "chapterNumber": 3,
        "titleHi": "तृतीया वल्ली (अध्याय १, वल्ली ३)",
        "titleEn": "Valli 3: The Parable of the Chariot",
        "summaryHi": "शरीर रूपी रथ, आत्मा रूपी रथी, बुद्धि रूपी सारथी, मन रूपी लगाम, इन्द्रिय रूपी घोड़े; 'उत्तिष्ठत जाग्रत' का महाघोष।",
        "summaryEn": "The Chariot metaphor; the self as the lord of the chariot, the body as the vehicle, intellect as the driver, mind as reins, and senses as horses; the clarion call 'Arise, Awake!'.",
        "verses": [
          {
            "id": "katha-1-3-3",
            "verseNumber": 3,
            "sanskritText": "आत्मानꣳ रथिनं विद्धि शरीरꣳ रथमेव तु |\nबुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ||",
            "sanskrit": "आत्मानꣳ रथिनं विद्धि शरीरꣳ रथमेव तु |\nबुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ||",
            "transliteration": "ātmānaṁ rathinaṁ viddhi śarīraṁ rathameva tu |\nbuddhiṁ tu sārathiṁ viddhi manaḥ pragrahameva ca ||",
            "translationHi": "आत्मा को रथी (रथ का स्वामी) जानो और शरीर को रथ समझो; बुद्धि को सारथी (चालक) जानो और मन को लगाम समझो।",
            "hindiMeaning": "आत्मा को रथी (रथ का स्वामी) जानो और शरीर को रथ समझो; बुद्धि को सारथी (चालक) जानो और मन को लगाम समझो।",
            "translationEn": "Know the Self as the lord of the chariot, and the body as the chariot itself. Know the intellect as the charioteer, and the mind as the reins.",
            "englishMeaning": "Know the Self as the lord of the chariot, and the body as the chariot itself. Know the intellect as the charioteer, and the mind as the reins.",
            "commentary": "जीवन-यात्रा का यह अद्भुत रूपक समझाता है कि जब बुद्धि जागृत हो और मन को वश में रखे, तभी जीवन रूपी रथ परम धाम तक पहुँचता है।"
          },
          {
            "id": "katha-1-3-14",
            "verseNumber": 14,
            "sanskritText": "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत |\nक्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ||",
            "sanskrit": "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत |\nक्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ||",
            "transliteration": "uttiṣṭhata jāgrata prāpya varānnibodhata |\nkṣurasya dhārā niśitā duratyayā durgaṁ pathastatkavayo vadanti ||",
            "translationHi": "उठो! जागो! और श्रेष्ठ (महापुरुषों) के समीप जाकर उस आत्म-तत्व को जानो। ज्ञानीजन कहते हैं कि वह मार्ग छुरे की तीक्ष्ण धार के समान दुर्गम और कठिन है।",
            "hindiMeaning": "उठो! जागो! और श्रेष्ठ (महापुरुषों) के समीप जाकर उस आत्म-तत्व को जानो। ज्ञानीजन कहते हैं कि वह मार्ग छुरे की तीक्ष्ण धार के समान दुर्गम और कठिन है।",
            "translationEn": "Arise! Awake! Approach the great teachers and realize the Self! The path is sharp as the edge of a razor, hard to tread and difficult to traverse—so the wise say.",
            "englishMeaning": "Arise! Awake! Approach the great teachers and realize the Self! The path is sharp as the edge of a razor, hard to tread and difficult to traverse—so the wise say.",
            "commentary": "स्वामी विवेकानन्द ने इसी मन्त्र को आधुनिक विश्व के जागरण का जयघोष बनाया: 'उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए!'"
          }
        ]
      },
      {
        "id": "katha-valli-4",
        "chapterNumber": 4,
        "titleHi": "चतुर्थी वल्ली (अध्याय २, वल्ली १)",
        "titleEn": "Valli 4: The Inward Vision",
        "summaryHi": "इन्द्रियों का बहिर्मुखी स्वभाव, आत्मदर्शी का अंतर्मुखी होना, जो यहाँ है वही वहाँ है (अद्वैत का सूत्र)।",
        "summaryEn": "Why the senses look outward; turning the gaze inward to realize the immortal Self; unity of the microcosm and macrocosm.",
        "verses": [
          {
            "id": "katha-2-1-1",
            "verseNumber": 1,
            "sanskritText": "पराञ्चि खानि व्यतृणत् स्वयम्भूस्तस्मात्पराङ्पश्यति नान्तरात्मन् |\nकश्चिद्धीरः प्रत्यगात्मानमैक्षदावृत्तचक्षुरमृतत्वमिच्छन् ||",
            "sanskrit": "पराञ्चि खानि व्यतृणत् स्वयम्भूस्तस्मात्पराङ्पश्यति नान्तरात्मन् |\nकश्चिद्धीरः प्रत्यगात्मानमैक्षदावृत्तचक्षुरमृतत्वमिच्छन् ||",
            "transliteration": "parāñci khāni vyatṛṇat svayambhūstasmātparāṅpaśyati nāntarātman |\nkaściddhīraḥ pratyagātmānamaikṣadāvṛttacakṣuramṛtatvamicchan ||",
            "translationHi": "स्वयम्भू ब्रह्मा ने इन्द्रियों के द्वारों को बाहर की ओर मुख वाला बनाया, इसलिए मनुष्य बाहर देखता है, अंतरात्मा को नहीं। कोई विरला धैर्यवान पुरुष ही अमरत्व की इच्छा से अपनी दृष्टि को भीतर मोड़कर अंतरात्मा का साक्षात्कार करता है।",
            "hindiMeaning": "स्वयम्भू ब्रह्मा ने इन्द्रियों के द्वारों को बाहर की ओर मुख वाला बनाया, इसलिए मनुष्य बाहर देखता है, अंतरात्मा को नहीं। कोई विरला धैर्यवान पुरुष ही अमरत्व की इच्छा से अपनी दृष्टि को भीतर मोड़कर अंतरात्मा का साक्षात्कार करता है।",
            "translationEn": "The Self-existent Creator pierced the senses outward; therefore one looks outward and not inward into the Self. Some rare wise seeker, longing for immortality, turned his eyes inward and beheld the inner Self.",
            "englishMeaning": "The Self-existent Creator pierced the senses outward; therefore one looks outward and not inward into the Self. Some rare wise seeker, longing for immortality, turned his eyes inward and beheld the inner Self.",
            "commentary": "साधना का मूल सूत्र: बाह्य विषयों से दृष्टि हटाकर अंतरात्मा में प्रतिष्ठित होना।"
          }
        ]
      },
      {
        "id": "katha-valli-5",
        "chapterNumber": 5,
        "titleHi": "पञ्चमी वल्ली (अध्याय २, वल्ली २)",
        "titleEn": "Valli 5: The City of Eleven Gates",
        "summaryHi": "एकादश द्वारों वाला देह-नगर, सर्वभूतांतरात्मा की एकता, सूर्य सदृश निष्कलंक आत्मा एवं 'तमेव भान्तमनुभाति सर्वम्'।",
        "summaryEn": "The body as an eleven-gated citadel; the one inner ruler manifest in many forms; the supreme self-luminous Light of the cosmos.",
        "verses": [
          {
            "id": "katha-2-2-15",
            "verseNumber": 15,
            "sanskritText": "न तत्र सूर्यो भाति न चन्द्रतारकं नेमा विद्युतो भान्ति कुतोऽयमग्निः |\nतमेव भान्तमनुभाति सर्वं तस्य भासा सर्वमिदं विभाति ||",
            "sanskrit": "न तत्र सूर्यो भाति न चन्द्रतारकं नेमा विद्युतो भान्ति कुतोऽयमग्निः |\nतमेव भान्तमनुभाति सर्वं तस्य भासा सर्वमिदं विभाति ||",
            "transliteration": "na tatra sūryo bhāti na candratārakaṁ nemā vidyuto bhānti kuto'yamagniḥ |\ntameva bhāntamanubhāti sarvaṁ tasya bhāsā sarvamidaṁ vibhāti ||",
            "translationHi": "वहाँ न सूर्य प्रकाशित होता है, न चन्द्रमा और तारे, न ये बिजलियाँ ही चमकती हैं, फिर यह लौकिक अग्नि कैसे प्रकाशित हो सकती है? उस परमात्मा के प्रकाशित होने पर ही यह सब कुछ प्रकाशित होता है; उसी के प्रकाश से यह सम्पूर्ण संसार आलोकित है।",
            "hindiMeaning": "वहाँ न सूर्य प्रकाशित होता है, न चन्द्रमा और तारे, न ये बिजलियाँ ही चमकती हैं, फिर यह लौकिक अग्नि कैसे प्रकाशित हो सकती है? उस परमात्मा के प्रकाशित होने पर ही यह सब कुछ प्रकाशित होता है; उसी के प्रकाश से यह सम्पूर्ण संसार आलोकित है।",
            "translationEn": "There the sun does not shine, nor the moon and stars, nor do these flashes of lightning shine, much less this earthly fire. Following Him alone as He shines, does everything shine; by His light all this universe is illumined.",
            "englishMeaning": "There the sun does not shine, nor the moon and stars, nor do these flashes of lightning shine, much less this earthly fire. Following Him alone as He shines, does everything shine; by His light all this universe is illumined.",
            "commentary": "आरती और उपासना में उच्चारित होने वाला यह वेदान्त का सर्वाधिक प्रकाशमय मन्त्र है।"
          }
        ]
      },
      {
        "id": "katha-valli-6",
        "chapterNumber": 6,
        "titleHi": "षष्ठी वल्ली (अध्याय २, वल्ली ३)",
        "titleEn": "Valli 6: The Eternal Tree and Immortality",
        "summaryHi": "सनातन अश्वत्थ वृक्ष, योग की परिभाषा, मन और इन्द्रियों की स्थिरता, हृदय की समस्त ग्रंथियों का भेदन एवं अमरत्व की प्राप्ति।",
        "summaryEn": "The Cosmic Tree with roots above; the definition of Yoga as the steady control of the senses; severing the knots of the heart and attaining immortality.",
        "verses": [
          {
            "id": "katha-2-3-1",
            "verseNumber": 1,
            "sanskritText": "ऊर्ध्वमूलोऽवाक्शाख एषोऽश्वत्थः सनातनः |\nतदेव शुक्रं तद् ब्रह्म तदेवामृतमुच्यते |\nतस्मिंल्लोकाः श्रिताः सर्वे तदु नात्येति कश्चन ||",
            "sanskrit": "ऊर्ध्वमूलोऽवाक्शाख एषोऽश्वत्थः सनातनः |\nतदेव शुक्रं तद् ब्रह्म तदेवामृतमुच्यते |\nतस्मिंल्लोकाः श्रिताः सर्वे तदु नात्येति कश्चन ||",
            "transliteration": "ūrdhvamūlo'vākśākha eṣo'śvatthaḥ sanātanaḥ |\ntadeva śukraṁ tad brahma tadevāmṛtamucyate |\ntasmi~llokāḥ śritāḥ sarve tadu nātyeti kaścana ||",
            "translationHi": "ऊपर की ओर मूल वाला और नीचे की ओर शाखाओं वाला यह सनातन अश्वत्थ (पीपल) वृक्ष है। वही परम शुद्ध है, वही ब्रह्म है और वही अमृत कहा जाता है। समस्त लोक उसी के आश्रित हैं, कोई भी उसका अतिक्रमण नहीं कर सकता।",
            "hindiMeaning": "ऊपर की ओर मूल वाला और नीचे की ओर शाखाओं वाला यह सनातन अश्वत्थ (पीपल) वृक्ष है। वही परम शुद्ध है, वही ब्रह्म है और वही अमृत कहा जाता है। समस्त लोक उसी के आश्रित हैं, कोई भी उसका अतिक्रमण नहीं कर सकता।",
            "translationEn": "This is that eternal Asvattha tree whose roots are above and branches below. That alone is pure, that is Brahman, that indeed is called the Immortal. In It all the worlds rest, and none can transcend It.",
            "englishMeaning": "This is that eternal Asvattha tree whose roots are above and branches below. That alone is pure, that is Brahman, that indeed is called the Immortal. In It all the worlds rest, and none can transcend It.",
            "commentary": "सृष्टि का मूल परमपिता परमात्मा में है, शाखाएं सांसारिक जीवन में फैली हैं।"
          },
          {
            "id": "katha-2-3-14",
            "verseNumber": 14,
            "sanskritText": "यदा सर्वे प्रमुच्यन्ते कामा येऽस्य हृदि श्रिताः |\nअथ मर्त्योऽमृतो भवत्यत्र ब्रह्म समश्नुते ||",
            "sanskrit": "यदा सर्वे प्रमुच्यन्ते कामा येऽस्य हृदि श्रिताः |\nअथ मर्त्योऽमृतो भवत्यत्र ब्रह्म समश्नुते ||",
            "transliteration": "yadā sarve pramucyante kāmā ye'sya hṛdi śritāḥ |\natha martyo'mṛto bhavatyatra brahma samaśnute ||",
            "translationHi": "जब मनुष्य के हृदय में स्थित सम्पूर्ण कामनाएं छूट जाती हैं, तब मरणधर्मा मनुष्य इसी जीवन में अमर हो जाता है और यहीं ब्रह्म का साक्षात्कार कर लेता है।",
            "hindiMeaning": "जब मनुष्य के हृदय में स्थित सम्पूर्ण कामनाएं छूट जाती हैं, तब मरणधर्मा मनुष्य इसी जीवन में अमर हो जाता है और यहीं ब्रह्म का साक्षात्कार कर लेता है।",
            "translationEn": "When all the desires that dwell in the human heart are cast away, then does the mortal become immortal, and here in this very life attains Brahman.",
            "englishMeaning": "When all the desires that dwell in the human heart are cast away, then does the mortal become immortal, and here in this very life attains Brahman.",
            "commentary": "जीवन्मुक्ति का अमर उपदेश: वासनाओं का अंत ही अमरत्व का साक्षात्कार है।"
          }
        ]
      }
    ]
  },
  "rigveda-samhita": {
    "id": "rigveda-samhita",
    "slug": "rigveda-samhita",
    "titleHi": "ऋग्वेद संहिता",
    "titleEn": "Rigveda Samhita",
    "author": "वैदिक महर्षिगण (विश्वामित्र, वशिष्ठ, दीर्घतमा आदि)",
    "category": "veda",
    "descriptionHi": "मानव इतिहास का प्राचीनतम पावन ग्रन्थ। अग्नि सूक्त, गायत्री महामन्त्र, महामृत्युंजय मन्त्र, पुरुष सूक्त, नासदीय सूक्त और विश्व एकता का संज्ञान सूक्त।",
    "descriptionEn": "The most ancient sacred text of humanity containing foundational hymns to Agni, the Gayatri Mantra, Mahamrityunjaya, Purusha Sukta, Nasadiya, and Samjnana Suktas.",
    "totalVerses": 7,
    "totalChapters": 6,
    "chapters": [
      {
        "id": "rv-mandala-1",
        "chapterNumber": 1,
        "titleHi": "मण्डल १: अग्नि सूक्त (ऋग्वेद १.१)",
        "titleEn": "Mandala 1: Agni Sukta (RV 1.1)",
        "summaryHi": "ऋग्वेद का प्रथम सूक्त—यज्ञ के पुरोहित, प्रकाशमान अग्निदेव की वन्दना एवं दिव्य तेज की प्रार्थना।",
        "summaryEn": "The inaugural hymn of the Rigveda dedicated to Agni, the divine priest of the cosmic sacrifice and illuminator of wisdom.",
        "verses": [
          {
            "id": "rv-1-1-1",
            "verseNumber": 1,
            "sanskritText": "ॐ अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् |\nहोतारं रत्नधातमम् ||",
            "sanskrit": "ॐ अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् |\nहोतारं रत्नधातमम् ||",
            "transliteration": "oṁ agnimīḷe purohitaṁ yajñasya devamṛtvijam |\nhotāraṁ ratnadhātamam ||",
            "translationHi": "मैं यज्ञ के पुरोहित, दिव्य प्रकाश से युक्त देव, ऋतु अनुसार यज्ञ कराने वाले ऋत्विज, देवताओं का आह्वान करने वाले होता और सर्वश्रेष्ठ रत्नों को धारण करने वाले अग्निदेव की स्तुति करता हूँ।",
            "hindiMeaning": "मैं यज्ञ के पुरोहित, दिव्य प्रकाश से युक्त देव, ऋतु अनुसार यज्ञ कराने वाले ऋत्विज, देवताओं का आह्वान करने वाले होता और सर्वश्रेष्ठ रत्नों को धारण करने वाले अग्निदेव की स्तुति करता हूँ।",
            "translationEn": "I praise Agni, the priest of the sacrifice, the divine minister, the invoker of deities, and the supreme bestower of treasures.",
            "englishMeaning": "I praise Agni, the priest of the sacrifice, the divine minister, the invoker of deities, and the supreme bestower of treasures.",
            "commentary": "यह सम्पूर्ण मानव इतिहास और वैदिक वाङ्मय का सबसे प्रथम उच्चारित मन्त्र है।"
          }
        ]
      },
      {
        "id": "rv-mandala-3",
        "chapterNumber": 2,
        "titleHi": "मण्डल ३: गायत्री महामन्त्र / सविता सूक्त (ऋग्वेद ३.६२.१०)",
        "titleEn": "Mandala 3: Gayatri Mahamantra (RV 3.62.10)",
        "summaryHi": "ऋषि विश्वामित्र द्वारा दृष्ट वेदों का माता स्वरूप गायत्री महामन्त्र—सविता देव के दिव्य तेज का ध्यान एवं बुद्धि की प्रेरणा।",
        "summaryEn": "The supreme Vedic prayer revealed by Sage Vishvamitra, meditating on the radiant splendour of the Sun to illumine the intellect.",
        "verses": [
          {
            "id": "rv-3-62-10",
            "verseNumber": 1,
            "sanskritText": "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ||",
            "sanskrit": "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ||",
            "transliteration": "oṁ bhūrbhuvaḥ svaḥ tatsaviturvareṇyaṁ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt ||",
            "translationHi": "हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा (सविता) के तेज का ध्यान करते हैं; वह परमात्मा हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करे।",
            "hindiMeaning": "हम उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा (सविता) के तेज का ध्यान करते हैं; वह परमात्मा हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करे।",
            "translationEn": "We meditate upon the supreme, adorable radiance of the Divine Sun (Savitr). May He inspire and guide our intellect towards truth.",
            "englishMeaning": "We meditate upon the supreme, adorable radiance of the Divine Sun (Savitr). May He inspire and guide our intellect towards truth.",
            "commentary": "गायत्री मन्त्र समस्त वेदों का सार और सद्बुद्धि की प्राप्ति की सनातन प्रार्थना है।"
          }
        ]
      },
      {
        "id": "rv-mandala-7",
        "chapterNumber": 3,
        "titleHi": "मण्डल ७: महामृत्युंजय मन्त्र / रुद्र सूक्त (ऋग्वेद ७.५९.१२)",
        "titleEn": "Mandala 7: Mahamrityunjaya Mantra (RV 7.59.12)",
        "summaryHi": "ऋषि वशिष्ठ द्वारा दृष्ट त्र्यम्बक भगवान् शिव का महामृत्युंजय मन्त्र—मृत्यु के भय से मुक्ति एवं अमृतत्व की प्राप्ति।",
        "summaryEn": "The great death-conquering prayer revealed by Sage Vasishtha, seeking liberation from mortality and spiritual immortality.",
        "verses": [
          {
            "id": "rv-7-59-12",
            "verseNumber": 1,
            "sanskritText": "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् |\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ||",
            "sanskrit": "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् |\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ||",
            "transliteration": "oṁ tryambakaṁ yajāmahe sugandhiṁ puṣṭivardhanam |\nurvārukamiva bandhanānmṛtyormukṣīya māmṛtāt ||",
            "translationHi": "हम त्रिनेत्रधारी भगवान् शिव की आराधना करते हैं, जो सुगन्धित हैं और समस्त प्राणियों का पोषण करने वाले हैं। जैसे पका हुआ खरबूजा अपनी बेल के बन्धन से स्वतः मुक्त हो जाता है, वैसे ही हम मृत्यु के पाश से मुक्त हों, अमृतत्व (मोक्ष) से कभी वंचित न हों।",
            "hindiMeaning": "हम त्रिनेत्रधारी भगवान् शिव की आराधना करते हैं, जो सुगन्धित हैं और समस्त प्राणियों का पोषण करने वाले हैं। जैसे पका हुआ खरबूजा अपनी बेल के बन्धन से स्वतः मुक्त हो जाता है, वैसे ही हम मृत्यु के पाश से मुक्त हों, अमृतत्व (मोक्ष) से कभी वंचित न हों।",
            "translationEn": "We worship the Three-Eyed Lord Shiva, the fragrant nourisher of all life. Even as a ripe cucumber is severed from its vine, may we be released from the bond of death, but not from immortality.",
            "englishMeaning": "We worship the Three-Eyed Lord Shiva, the fragrant nourisher of all life. Even as a ripe cucumber is severed from its vine, may we be released from the bond of death, but not from immortality.",
            "commentary": "यह मन्त्र अकाल मृत्यु निवारण, आरोग्य और आत्मिक अमरता का महामंत्र है।"
          }
        ]
      },
      {
        "id": "rv-mandala-10-purusha",
        "chapterNumber": 4,
        "titleHi": "मण्डल १०: पुरुष सूक्त (ऋग्वेद १०.९०)",
        "titleEn": "Mandala 10: Purusha Sukta (RV 10.90)",
        "summaryHi": "विराट् पुरुष का ब्रह्माण्डीय स्वरूप, सहस्रों सिर और नेत्र, यज्ञ से सृष्टि की उत्पत्ति एवं चारों वर्णों का प्रतीकात्मक प्राकट्य।",
        "summaryEn": "The Cosmic Person with thousands of heads and eyes; the cosmic sacrifice from which the entire universe and society manifest.",
        "verses": [
          {
            "id": "rv-10-90-1",
            "verseNumber": 1,
            "sanskritText": "ॐ सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात् |\nस भूमिं विश्वतो वृत्वात्यतिष्ठद्दशाङ्गुलम् ||",
            "sanskrit": "ॐ सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात् |\nस भूमिं विश्वतो वृत्वात्यतिष्ठद्दशाङ्गुलम् ||",
            "transliteration": "oṁ sahasraśīrṣā puruṣaḥ sahasrākṣaḥ sahasrapāt |\nsa bhūmiṁ viśvato vṛtvātyatiṣṭhaddaśāṅgulam ||",
            "translationHi": "वह विराट् पुरुष सहस्रों (अनंत) सिरों वाले, सहस्रों नेत्रों वाले और सहस्रों चरणों वाले हैं। वे इस सम्पूर्ण ब्रह्माण्ड को सब ओर से व्याप्त करके दस अंगुल परिमाण (अनंतता) से परे भी स्थित हैं।",
            "hindiMeaning": "वह विराट् पुरुष सहस्रों (अनंत) सिरों वाले, सहस्रों नेत्रों वाले और सहस्रों चरणों वाले हैं। वे इस सम्पूर्ण ब्रह्माण्ड को सब ओर से व्याप्त करके दस अंगुल परिमाण (अनंतता) से परे भी स्थित हैं।",
            "translationEn": "The Cosmic Person has thousands of heads, thousands of eyes, and thousands of feet. Pervading the universe on every side, He extends beyond it into infinity.",
            "englishMeaning": "The Cosmic Person has thousands of heads, thousands of eyes, and thousands of feet. Pervading the universe on every side, He extends beyond it into infinity.",
            "commentary": "पुरुष सूक्त समस्त वैदिक यज्ञों और पूजाओं का हृदय है।"
          }
        ]
      },
      {
        "id": "rv-mandala-10-nasadiya",
        "chapterNumber": 5,
        "titleHi": "मण्डल १०: नासदीय सूक्त (ऋग्वेद १०.१२९)",
        "titleEn": "Mandala 10: Nasadiya Sukta (RV 10.129)",
        "summaryHi": "सृष्टि उत्पत्ति का गहनतम दार्शनिक चिंतन—सृष्टि से पूर्व न सत् था न असत्; केवल वह एक तत्व अपनी ही शक्ति से स्पंदित था।",
        "summaryEn": "The profound Hymn of Creation exploring the mystery of what existed before time and space; the cosmic question of existence.",
        "verses": [
          {
            "id": "rv-10-129-1",
            "verseNumber": 1,
            "sanskritText": "नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् |\nकिमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ||",
            "sanskrit": "नासदासीन्नो सदासीत्तदानीं नासीद्रजो नो व्योमा परो यत् |\nकिमावरीवः कुह कस्य शर्मन्नम्भः किमासीद्गहनं गभीरम् ||",
            "transliteration": "nāsadāsīnno sadāsīttadānīṁ nāsīdrajo no vyomā paro yat |\nkimāvarīvaḥ kuha kasya śarmannambhaḥ kimāsīdgahanaṁ gabhīram ||",
            "translationHi": "सृष्टि से पूर्व न असत् (शून्य) था और न सत् (पदार्थ); न कोई लोक था और न उससे परे आकाश। तब किस आवरण ने किसको ढँका था? कहाँ और किसके आश्रय में क्या अथाह गहरा जल था?",
            "hindiMeaning": "सृष्टि से पूर्व न असत् (शून्य) था और न सत् (पदार्थ); न कोई लोक था और न उससे परे आकाश। तब किस आवरण ने किसको ढँका था? कहाँ और किसके आश्रय में क्या अथाह गहरा जल था?",
            "translationEn": "Then there was neither non-existence nor existence; there was neither space nor the sky beyond. What covered it, and where? Under whose protection? Was there water, deep and fathomless?",
            "englishMeaning": "Then there was neither non-existence nor existence; there was neither space nor the sky beyond. What covered it, and where? Under whose protection? Was there water, deep and fathomless?",
            "commentary": "विश्व साहित्य की प्राचीनतम और सर्वाधिक वैज्ञानिक कॉस्मोलॉजिकल कविता।"
          }
        ]
      },
      {
        "id": "rv-mandala-10-samjnana",
        "chapterNumber": 6,
        "titleHi": "मण्डल १०: संज्ञान सूक्त (ऋग्वेद १०.१९१)",
        "titleEn": "Mandala 10: Samjnana Sukta (RV 10.191)",
        "summaryHi": "ऋग्वेद का अंतिम सूक्त—विश्व एकता, समन्वय, समान विचार और अखंड शांति का महाघोष (सङ्गच्छध्वं संवदध्वम्)।",
        "summaryEn": "The concluding hymn of the Rigveda; the eternal charter of human unity, harmony, collective thought, and shared goodwill.",
        "verses": [
          {
            "id": "rv-10-191-2",
            "verseNumber": 1,
            "sanskritText": "सङ्गच्छध्वं संवदध्वं सं वो मनांसि जानताम् |\nदेवा भागं यथा पूर्वे सञ्जानाना उपासते ||",
            "sanskrit": "सङ्गच्छध्वं संवदध्वं सं वो मनांसि जानताम् |\nदेवा भागं यथा पूर्वे सञ्जानाना उपासते ||",
            "transliteration": "saṅgacchadhvaṁ saṁvadadhvaṁ saṁ vo manāṁsi jānatām |\ndevā bhāgaṁ yathā pūrve sañjānānā upāsate ||",
            "translationHi": "तुम सब एक साथ मिलकर चलो, एक स्वर में बोलो, तुम्हारे मन एक समान विचार करें; जैसे प्राचीन काल में ज्ञानी देवता एकमत होकर अपने यज्ञ-भाग को ग्रहण करते थे।",
            "hindiMeaning": "तुम सब एक साथ मिलकर चलो, एक स्वर में बोलो, तुम्हारे मन एक समान विचार करें; जैसे प्राचीन काल में ज्ञानी देवता एकमत होकर अपने यज्ञ-भाग को ग्रहण करते थे।",
            "translationEn": "Walk together, speak with one voice, let your minds harmonize in knowledge; even as the ancient sages united in concord to receive their offerings.",
            "englishMeaning": "Walk together, speak with one voice, let your minds harmonize in knowledge; even as the ancient sages united in concord to receive their offerings.",
            "commentary": "'सङ्गच्छध्वं संवदध्वम्' भारत का वैश्विक शांति और विश्वबन्धुत्व का सनातन उद्घोष है।"
          },
          {
            "id": "rv-10-191-4",
            "verseNumber": 2,
            "sanskritText": "समानी व आकूतिः समाना हृदयानि वः |\nसमानमस्तु वो मनो यथा वः सुसहासति ||",
            "sanskrit": "समानी व आकूतिः समाना हृदयानि वः |\nसमानमस्तु वो मनो यथा वः सुसहासति ||",
            "transliteration": "samānī va ākūtiḥ samānā hṛdayāni vaḥ |\nsamānamastu vo mano yathā vaḥ susahāsati ||",
            "translationHi": "तुम्हारे संकल्प एक समान हों, तुम्हारे हृदय एक समान हों, तुम्हारे मन एक समान हों, जिससे कि तुम्हारा संगठन सुदृढ़ और कल्याणकारी बना रहे।",
            "hindiMeaning": "तुम्हारे संकल्प एक समान हों, तुम्हारे हृदय एक समान हों, तुम्हारे मन एक समान हों, जिससे कि तुम्हारा संगठन सुदृढ़ और कल्याणकारी बना रहे।",
            "translationEn": "United be your resolve, united be your hearts, united be your minds—so that you may live together in perfect harmony.",
            "englishMeaning": "United be your resolve, united be your hearts, united be your minds—so that you may live together in perfect harmony.",
            "commentary": "ऋग्वेद का अंतिम मन्त्र सम्पूर्ण मानव जाति को अखंड एकता और प्रेम का आशीर्वाद देता है।"
          }
        ]
      }
    ]
  },
  "shrimad-bhagavatam": {
    "id": "shrimad-bhagavatam",
    "slug": "shrimad-bhagavatam",
    "titleHi": "श्रीमद्भागवत महापुराण",
    "titleEn": "Shrimad Bhagavatam",
    "author": "महर्षि वेदव्यास / शुकदेव जी",
    "category": "purana",
    "descriptionHi": "अठारह पुराणों का मुकुटमणि ग्रंथ। बारह स्कन्धों में भगवान् के चौबीस अवतार, भक्त प्रह्लाद, ध्रुव, गजेन्द्र मोक्ष, श्रीकृष्ण बाललीला, गोपीगीत एवं उद्धव गीता का रसामृत।",
    "descriptionEn": "The crown jewel of Puranic literature detailing the 12 Cantos of divine incarnations, supreme devotion, and the transcendental pastimes of Lord Krishna.",
    "totalVerses": 12,
    "totalChapters": 12,
    "chapters": [
      {
        "id": "sb-skandha-1",
        "chapterNumber": 1,
        "titleHi": "प्रथम स्कन्ध: अधिकार लीला",
        "titleEn": "Canto 1: Creation and Inception",
        "summaryHi": "श्रीमद्भागवत महापुराण के प्रथम स्कन्ध: अधिकार लीला का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 1: Creation and Inception.",
        "verses": [
          {
            "id": "sb-1-1",
            "verseNumber": 1,
            "sanskritText": "जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट्\nतेने ब्रह्म हृदा य आदिकवये मुह्यन्ति यत्सूरयः |\nतेजोवारिमृदां यथा विनिमयो यत्र त्रिसर्गोऽमृषा\nधाम्ना स्वेन सदा निरस्तकुहकं सत्यं परं धीमहि || १-१-१ ||",
            "sanskrit": "जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट्\nतेने ब्रह्म हृदा य आदिकवये मुह्यन्ति यत्सूरयः |\nतेजोवारिमृदां यथा विनिमयो यत्र त्रिसर्गोऽमृषा\nधाम्ना स्वेन सदा निरस्तकुहकं सत्यं परं धीमहि || १-१-१ ||",
            "transliteration": "janmādyasya yato'nvayāditarataścārtheṣvabhijñaḥ svarāṭ\ntene brahma hṛdā ya ādikavaye muhyanti yatsūrayaḥ |\ntejovārimṛdāṁ yathā vinimayo yatra trisargo'mṛṣā\ndhāmnā svena sadā nirastakuhakaṁ satyaṁ paraṁ dhīmahi || 1-1-1 ||",
            "translationHi": "जिससे इस जगत की सृष्टि, स्थिति और प्रलय होते हैं; जो अन्वय और व्यतिरेक रूप से समस्त पदार्थों में विद्यमान और सर्वज्ञ है; जिन्होंने आदि कवि ब्रह्मा के हृदय में वेदों का ज्ञान प्रकाशित किया; उस परम सत्य परमात्मा का हम ध्यान करते हैं।",
            "hindiMeaning": "जिससे इस जगत की सृष्टि, स्थिति और प्रलय होते हैं; जो अन्वय और व्यतिरेक रूप से समस्त पदार्थों में विद्यमान और सर्वज्ञ है; जिन्होंने आदि कवि ब्रह्मा के हृदय में वेदों का ज्ञान प्रकाशित किया; उस परम सत्य परमात्मा का हम ध्यान करते हैं।",
            "translationEn": "We meditate upon Him, the Supreme Truth, from whom proceeds the creation, preservation and dissolution of this universe; who is directly and indirectly conscious of all manifestations, and who imparted Vedic knowledge into the heart of Brahma.",
            "englishMeaning": "We meditate upon Him, the Supreme Truth, from whom proceeds the creation, preservation and dissolution of this universe; who is directly and indirectly conscious of all manifestations, and who imparted Vedic knowledge into the heart of Brahma.",
            "commentary": "श्रीमद्भागवत का यह मंगलाचरण परम सत्य (सत्यं परं धीमहि) को समर्पित है।"
          }
        ]
      },
      {
        "id": "sb-skandha-2",
        "chapterNumber": 2,
        "titleHi": "द्वितीय स्कन्ध: साधन लीला",
        "titleEn": "Canto 2: The Cosmic Manifestation",
        "summaryHi": "श्रीमद्भागवत महापुराण के द्वितीय स्कन्ध: साधन लीला का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 2: The Cosmic Manifestation.",
        "verses": [
          {
            "id": "sb-2-1",
            "verseNumber": 1,
            "sanskritText": "अहमेवासमेवाग्रे नान्यद् यत् सदसत्परम् |\nपश्चादहं यदेतच्च योऽवशिष्येत सोऽस्म्यहम् || २-९-३३ ||",
            "sanskrit": "अहमेवासमेवाग्रे नान्यद् यत् सदसत्परम् |\nपश्चादहं यदेतच्च योऽवशिष्येत सोऽस्म्यहम् || २-९-३३ ||",
            "transliteration": "ahamevāsamevāgre nānyad yat sadasatparam |\npaścādahaṁ yadētacca yo'vaśiṣyeta so'smyaham || 2-9-33 ||",
            "translationHi": "सृष्टि से पूर्व केवल मैं ही था, मेरे अतिरिक्त न सत् था न असत् और न उनसे परे कुछ था। सृष्टि के पश्चात् भी जो यह जगत है, वह भी मैं ही हूँ; और प्रलय के बाद जो शेष रहेगा, वह भी मैं ही हूँ।",
            "hindiMeaning": "सृष्टि से पूर्व केवल मैं ही था, मेरे अतिरिक्त न सत् था न असत् और न उनसे परे कुछ था। सृष्टि के पश्चात् भी जो यह जगत है, वह भी मैं ही हूँ; और प्रलय के बाद जो शेष रहेगा, वह भी मैं ही हूँ।",
            "translationEn": "I alone existed prior to the creation, and nothing else was there, neither the gross nor the subtle. After creation, whatever is this universe is also Myself; and whatever remains after dissolution, that also am I.",
            "englishMeaning": "I alone existed prior to the creation, and nothing else was there, neither the gross nor the subtle. After creation, whatever is this universe is also Myself; and whatever remains after dissolution, that also am I.",
            "commentary": "चतुःश्लोकी भागवत का यह प्रथम श्लोक अद्वैत तत्व की पराकाष्ठा है।"
          }
        ]
      },
      {
        "id": "sb-skandha-3",
        "chapterNumber": 3,
        "titleHi": "तृतीय स्कन्ध: सर्ग लीला",
        "titleEn": "Canto 3: The Status Quo",
        "summaryHi": "श्रीमद्भागवत महापुराण के तृतीय स्कन्ध: सर्ग लीला का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 3: The Status Quo.",
        "verses": [
          {
            "id": "sb-3-1",
            "verseNumber": 1,
            "sanskritText": "यथा खनन् खनित्रेण नरो वार्यधिगच्छति |\nतथा गुरुगतां विद्यां शुश्रूषुरधिगच्छति || ३-२५-२५ ||",
            "sanskrit": "यथा खनन् खनित्रेण नरो वार्यधिगच्छति |\nतथा गुरुगतां विद्यां शुश्रूषुरधिगच्छति || ३-२५-२५ ||",
            "transliteration": "yathā khanan khanitreṇa naro vāryadhigacchati |\ntathā gurugatāṁ vidyāṁ śuśrūṣuradhigacchati || 3-25-25 ||",
            "translationHi": "जैसे कुदाल से खोदने वाला मनुष्य भूमि से जल प्राप्त कर लेता है, वैसे ही गुरु की सेवा करने वाला जिज्ञासु शिष्य उनके हृदय में स्थित आत्मविद्या को प्राप्त कर लेता है।",
            "hindiMeaning": "जैसे कुदाल से खोदने वाला मनुष्य भूमि से जल प्राप्त कर लेता है, वैसे ही गुरु की सेवा करने वाला जिज्ञासु शिष्य उनके हृदय में स्थित आत्मविद्या को प्राप्त कर लेता है।",
            "translationEn": "Just as a person digging with a spade obtains water from the earth, so does an earnest disciple serving the Guru obtain the spiritual wisdom dwelling in him.",
            "englishMeaning": "Just as a person digging with a spade obtains water from the earth, so does an earnest disciple serving the Guru obtain the spiritual wisdom dwelling in him.",
            "commentary": "भगवान् कपिल द्वारा माता देवहूति को सांख्य और भक्तियोग का दिव्य उपदेश।"
          }
        ]
      },
      {
        "id": "sb-skandha-4",
        "chapterNumber": 4,
        "titleHi": "चतुर्थ स्कन्ध: विसर्ग लीला",
        "titleEn": "Canto 4: The Creation of the Fourth Order",
        "summaryHi": "श्रीमद्भागवत महापुराण के चतुर्थ स्कन्ध: विसर्ग लीला का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 4: The Creation of the Fourth Order.",
        "verses": [
          {
            "id": "sb-4-1",
            "verseNumber": 1,
            "sanskritText": "ध्रुवं त्वां कुरुते राजा सर्वसत्त्वसुखावहम् |\nआराधय जगन्नाथं निश्चलेन च चेतसा || ४-८-४५ ||",
            "sanskrit": "ध्रुवं त्वां कुरुते राजा सर्वसत्त्वसुखावहम् |\nआराधय जगन्नाथं निश्चलेन च चेतसा || ४-८-४५ ||",
            "transliteration": "dhruvaṁ tvāṁ kurute rājā sarvasattvasukhāvaham |\nārādhaya jagannāthaṁ niścalena ca cetasā || 4-8-45 ||",
            "translationHi": "नारद जी ने ध्रुव से कहा: हे बालक ध्रुव! तुम निश्चल चित्त से जगन्नाथ श्रीहरि की आराधना करो; वे तुम्हारे सम्पूर्ण संकल्पों को पूर्ण करेंगे।",
            "hindiMeaning": "नारद जी ने ध्रुव से कहा: हे बालक ध्रुव! तुम निश्चल चित्त से जगन्नाथ श्रीहरि की आराधना करो; वे तुम्हारे सम्पूर्ण संकल्पों को पूर्ण करेंगे।",
            "translationEn": "Sage Narada instructed child Dhruva: Worship the Lord of the universe with unwavering consciousness; He shall grant you an eternal and peaceful position.",
            "englishMeaning": "Sage Narada instructed child Dhruva: Worship the Lord of the universe with unwavering consciousness; He shall grant you an eternal and peaceful position.",
            "commentary": "भक्त ध्रुव की बाल्यकाल की निष्काम तपस्या और अटूट भगवत्कृपा।"
          }
        ]
      },
      {
        "id": "sb-skandha-5",
        "chapterNumber": 5,
        "titleHi": "पञ्चम स्कन्ध: स्थान लीला",
        "titleEn": "Canto 5: The Creative Impetus",
        "summaryHi": "श्रीमद्भागवत महापुराण के पञ्चम स्कन्ध: स्थान लीला का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 5: The Creative Impetus.",
        "verses": [
          {
            "id": "sb-5-1",
            "verseNumber": 1,
            "sanskritText": "नायं देहो देहभाजां नृलोके कष्टान् कामानर्हते विड्भुजां ये |\nतपो दिव्यं पुत्रका येन सत्त्वं शुद्ध्येद्यस्माद् ब्रह्मसौख्यं त्वनन्तम् || ५-५-१ ||",
            "sanskrit": "नायं देहो देहभाजां नृलोके कष्टान् कामानर्हते विड्भुजां ये |\nतपो दिव्यं पुत्रका येन सत्त्वं शुद्ध्येद्यस्माद् ब्रह्मसौख्यं त्वनन्तम् || ५-५-१ ||",
            "transliteration": "nāyaṁ deho dehabhājāṁ nṛloke kaṣṭān kāmānarhate viḍbhujāṁ ye |\ntapo divyaṁ putrakā yena sattvaṁ śuddhyedyasmād brahmasaukhyaṁ tvanantam || 5-5-1 ||",
            "translationHi": "भगवान् ऋषभदेव ने अपने पुत्रों से कहा: इस मनुष्य लोक में यह शरीर केवल विष्ठा खाने वाले पशु-पक्षियों के समान तुच्छ विषय-भोगों के लिए नहीं मिला है। हे पुत्रो! इसके द्वारा दिव्य तप करना चाहिए जिससे अंतःकरण शुद्ध हो और अनंत ब्रह्मानन्द की प्राप्ति हो।",
            "hindiMeaning": "भगवान् ऋषभदेव ने अपने पुत्रों से कहा: इस मनुष्य लोक में यह शरीर केवल विष्ठा खाने वाले पशु-पक्षियों के समान तुच्छ विषय-भोगों के लिए नहीं मिला है। हे पुत्रो! इसके द्वारा दिव्य तप करना चाहिए जिससे अंतःकरण शुद्ध हो और अनंत ब्रह्मानन्द की प्राप्ति हो।",
            "translationEn": "Lord Rishabhadeva told his sons: This human form is not meant for degrading sensory indulgence like that of beasts. It is meant for divine austerity, through which the heart is purified and unending spiritual bliss is attained.",
            "englishMeaning": "Lord Rishabhadeva told his sons: This human form is not meant for degrading sensory indulgence like that of beasts. It is meant for divine austerity, through which the heart is purified and unending spiritual bliss is attained.",
            "commentary": "मानव जन्म का सच्चा उद्देश्य विषय-भोग नहीं, आत्म-साक्षात्कार है।"
          }
        ]
      },
      {
        "id": "sb-skandha-6",
        "chapterNumber": 6,
        "titleHi": "षष्ठ स्कन्ध: पोषण लीला",
        "titleEn": "Canto 6: Prescribed Duties for Mankind",
        "summaryHi": "श्रीमद्भागवत महापुराण के षष्ठ स्कन्ध: पोषण लीला का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 6: Prescribed Duties for Mankind.",
        "verses": [
          {
            "id": "sb-6-1",
            "verseNumber": 1,
            "sanskritText": "साङ्केत्यं पारिहास्यं वा स्तोभं हेलनमेव वा |\nवैकुण्ठनामग्रहणमशेषाघहरं विदुः || ६-२-१४ ||",
            "sanskrit": "साङ्केत्यं पारिहास्यं वा स्तोभं हेलनमेव वा |\nवैकुण्ठनामग्रहणमशेषाघहरं विदुः || ६-२-१४ ||",
            "transliteration": "sāṅketyaṁ pārihāsyaṁ vā stobhaṁ helanameva vā |\nvaikuṇṭhanāmagrahaṇamaśeṣāghaharaṁ viduḥ || 6-2-14 ||",
            "translationHi": "संकेत से, परिहास (मजाक) में, किसी के नाम के बहाने अथवा उपेक्षा से भी यदि श्रीहरि के पावन नाम का उच्चारण हो जाए, तो वह मनुष्य के समस्त पापों को हर लेता है।",
            "hindiMeaning": "संकेत से, परिहास (मजाक) में, किसी के नाम के बहाने अथवा उपेक्षा से भी यदि श्रीहरि के पावन नाम का उच्चारण हो जाए, तो वह मनुष्य के समस्त पापों को हर लेता है।",
            "translationEn": "Pronouncing the holy name of the Lord—even inadvertently, jokingly, or casually—is known to obliterate countless sins.",
            "englishMeaning": "Pronouncing the holy name of the Lord—even inadvertently, jokingly, or casually—is known to obliterate countless sins.",
            "commentary": "अजामिल उपाख्यान में भगवान् के नाम की अगाध सामर्थ्य का निरूपण।"
          }
        ]
      },
      {
        "id": "sb-skandha-7",
        "chapterNumber": 7,
        "titleHi": "सप्तम स्कन्ध: ऊति लीला",
        "titleEn": "Canto 7: The Science of God",
        "summaryHi": "श्रीमद्भागवत महापुराण के सप्तम स्कन्ध: ऊति लीला का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 7: The Science of God.",
        "verses": [
          {
            "id": "sb-7-1",
            "verseNumber": 1,
            "sanskritText": "श्रवणं कीर्तनं विष्णोः स्मरणं पादसेवनम् |\nअर्चनं वन्दनं दास्यं सख्यमात्मनिवेदनम् || ७-५-२३ ||",
            "sanskrit": "श्रवणं कीर्तनं विष्णोः स्मरणं पादसेवनम् |\nअर्चनं वन्दनं दास्यं सख्यमात्मनिवेदनम् || ७-५-२३ ||",
            "transliteration": "śravaṇaṁ kīrtanaṁ viṣṇoḥ smaraṇaṁ pādasevanam |\narcanaṁ vandanaṁ dāsyaṁ sakhyamātmanivedanam || 7-5-23 ||",
            "translationHi": "प्रह्लाद जी ने कहा: भगवान् विष्णु के गुण-लीलाओं का श्रवण, कीर्तन, स्मरण, उनके चरणों की सेवा, अर्चन (पूजा), वन्दन, दास्यभाव, सख्यभाव और आत्मनिवेदन (पूर्ण समर्पण)—यह नवधा भक्ति कहलाती है।",
            "hindiMeaning": "प्रह्लाद जी ने कहा: भगवान् विष्णु के गुण-लीलाओं का श्रवण, कीर्तन, स्मरण, उनके चरणों की सेवा, अर्चन (पूजा), वन्दन, दास्यभाव, सख्यभाव और आत्मनिवेदन (पूर्ण समर्पण)—यह नवधा भक्ति कहलाती है।",
            "translationEn": "Prahlada said: Hearing, chanting, remembering Lord Vishnu, serving His lotus feet, offering worship, praying, becoming His servant, cultivating friendship with Him, and surrendering oneself completely—this is the ninefold devotion.",
            "englishMeaning": "Prahlada said: Hearing, chanting, remembering Lord Vishnu, serving His lotus feet, offering worship, praying, becoming His servant, cultivating friendship with Him, and surrendering oneself completely—this is the ninefold devotion.",
            "commentary": "भक्त प्रह्लाद द्वारा प्रतिपादित नवधा भक्ति का अमर स्वरूप।"
          }
        ]
      },
      {
        "id": "sb-skandha-8",
        "chapterNumber": 8,
        "titleHi": "अष्टम स्कन्ध: मन्वन्तर लीला",
        "titleEn": "Canto 8: Creation of the Manvantaras",
        "summaryHi": "श्रीमद्भागवत महापुराण के अष्टम स्कन्ध: मन्वन्तर लीला का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 8: Creation of the Manvantaras.",
        "verses": [
          {
            "id": "sb-8-1",
            "verseNumber": 1,
            "sanskritText": "ॐ नमो भगवते तस्मै यत एतच्चिदात्मकम् |\nपुरुषायादिबीजाय परेशायाभिधीमहि || ८-३-२ ||",
            "sanskrit": "ॐ नमो भगवते तस्मै यत एतच्चिदात्मकम् |\nपुरुषायादिबीजाय परेशायाभिधीमहि || ८-३-२ ||",
            "transliteration": "oṁ namo bhagavate tasmai yata etaccidātmakam |\npuruṣāyādibījāya pareśāyābhidhīmahi || 8-3-2 ||",
            "translationHi": "गजेन्द्र ने स्तुति की: उन परमपिता परमात्मा को नमस्कार है, जिनसे यह सम्पूर्ण जगत चैतन्यमय बना है। जो सबके आदि कारण और सर्वोपरि परमेश्वर हैं, उनका हम ध्यान करते हैं।",
            "hindiMeaning": "गजेन्द्र ने स्तुति की: उन परमपिता परमात्मा को नमस्कार है, जिनसे यह सम्पूर्ण जगत चैतन्यमय बना है। जो सबके आदि कारण और सर्वोपरि परमेश्वर हैं, उनका हम ध्यान करते हैं।",
            "translationEn": "Gajendra prayed: Salutations unto that Supreme Lord by whose light this world becomes conscious. We meditate upon the Primeval Being, the Cause of all causes.",
            "englishMeaning": "Gajendra prayed: Salutations unto that Supreme Lord by whose light this world becomes conscious. We meditate upon the Primeval Being, the Cause of all causes.",
            "commentary": "संकटमोचक 'गजेन्द्र मोक्ष' स्तोत्र का पावन शुभारम्भ।"
          }
        ]
      },
      {
        "id": "sb-skandha-9",
        "chapterNumber": 9,
        "titleHi": "नवम स्कन्ध: ईशानुकथा",
        "titleEn": "Canto 9: Liberation",
        "summaryHi": "श्रीमद्भागवत महापुराण के नवम स्कन्ध: ईशानुकथा का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 9: Liberation.",
        "verses": [
          {
            "id": "sb-9-1",
            "verseNumber": 1,
            "sanskritText": "रामो दाशरथिर्भूत्वा चकार जनरञ्जनम् |\nसेतुं बबन्ध जलधौ हत्वा रक्षःपतिं रणे || ९-१०-१ ||",
            "sanskrit": "रामो दाशरथिर्भूत्वा चकार जनरञ्जनम् |\nसेतुं बबन्ध जलधौ हत्वा रक्षःपतिं रणे || ९-१०-१ ||",
            "transliteration": "rāmo dāśarathirbhūtvā cakāra janarañjanam |\nsetuṁ babandha jaladhau hatvā rakṣaḥpatiṁ raṇe || 9-10-1 ||",
            "translationHi": "दशरथनंदन भगवान् श्रीराम ने अवतार लेकर समस्त संसार को आनंदित किया; समुद्र पर सेतु बाँधा और रणभूमि में राक्षसों के राजा रावण का संहार कर धर्म की रक्षा की।",
            "hindiMeaning": "दशरथनंदन भगवान् श्रीराम ने अवतार लेकर समस्त संसार को आनंदित किया; समुद्र पर सेतु बाँधा और रणभूमि में राक्षसों के राजा रावण का संहार कर धर्म की रक्षा की।",
            "translationEn": "Appearing as the son of Dasharatha, Lord Rama delighted all humanity; He bridged the ocean and slew the king of demons in battle.",
            "englishMeaning": "Appearing as the son of Dasharatha, Lord Rama delighted all humanity; He bridged the ocean and slew the king of demons in battle.",
            "commentary": "मर्यादा पुरुषोत्तम श्रीराम के चरित्र का पावन स्मरण।"
          }
        ]
      },
      {
        "id": "sb-skandha-10",
        "chapterNumber": 10,
        "titleHi": "दशम स्कन्ध: निरोध लीला",
        "titleEn": "Canto 10: The Summum Bonum",
        "summaryHi": "श्रीमद्भागवत महापुराण के दशम स्कन्ध: निरोध लीला का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 10: The Summum Bonum.",
        "verses": [
          {
            "id": "sb-10-1",
            "verseNumber": 1,
            "sanskritText": "जयति तेऽधिकं जन्मना व्रजः श्रयत इन्दिरा शश्वदत्र हि |\nदयित दृश्यतां दिक्षु तावकास्त्वयि धृतासवास्त्वां विचिन्वते || १०-३१-१ ||",
            "sanskrit": "जयति तेऽधिकं जन्मना व्रजः श्रयत इन्दिरा शश्वदत्र हि |\nदयित दृश्यतां दिक्षु तावकास्त्वयि धृतासवास्त्वां विचिन्वते || १०-३१-१ ||",
            "transliteration": "jayati te'dhikaṁ janmanā vrajaḥ śrayata indirā śaśvadatra hi |\ndayita dṛśyatāṁ dikṣu tāvakāstvayi dhṛtāsavāstvāṁ vicinvate || 10-31-1 ||",
            "translationHi": "गोपियों ने कहा: हे प्रियतम! आपके जन्म लेने से यह ब्रजमंडल परम पावन और गौरवान्वित हो उठा है; यहाँ लक्ष्मी जी नित्य निवास करने लगी हैं। हे प्राणनाथ! हम आपके लिए ही प्राण धारण करने वाली आपको चारों दिशाओं में खोज रही हैं, हमें दर्शन दीजिए!",
            "hindiMeaning": "गोपियों ने कहा: हे प्रियतम! आपके जन्म लेने से यह ब्रजमंडल परम पावन और गौरवान्वित हो उठा है; यहाँ लक्ष्मी जी नित्य निवास करने लगी हैं। हे प्राणनाथ! हम आपके लिए ही प्राण धारण करने वाली आपको चारों दिशाओं में खोज रही हैं, हमें दर्शन दीजिए!",
            "translationEn": "The Gopis sang: O Beloved! By Your birth Vraja is supremely glorified, and Goddess Lakshmi abides here eternally. Please reveal Yourself to us, whose very life-breath is held solely for You!",
            "englishMeaning": "The Gopis sang: O Beloved! By Your birth Vraja is supremely glorified, and Goddess Lakshmi abides here eternally. Please reveal Yourself to us, whose very life-breath is held solely for You!",
            "commentary": "गोपी गीत का यह श्लोक पराभक्ति और ईश्वर-प्रेम का सर्वोच्च शिखर है।"
          }
        ]
      },
      {
        "id": "sb-skandha-11",
        "chapterNumber": 11,
        "titleHi": "एकादश स्कन्ध: मुक्ति लीला",
        "titleEn": "Canto 11: General History",
        "summaryHi": "श्रीमद्भागवत महापुराण के एकादश स्कन्ध: मुक्ति लीला का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 11: General History.",
        "verses": [
          {
            "id": "sb-11-1",
            "verseNumber": 1,
            "sanskritText": "न रोधयति मां योगो न साङ्ख्यं धर्म एव च |\nन स्वाध्यायस्तपस्त्यागो नेष्टापूर्तं न दक्षिणा ||\nयथावरुन्धे सत्सङ्गः सर्वसङ्गापहो हि माम् || ११-१२-१ ||",
            "sanskrit": "न रोधयति मां योगो न साङ्ख्यं धर्म एव च |\nन स्वाध्यायस्तपस्त्यागो नेष्टापूर्तं न दक्षिणा ||\nयथावरुन्धे सत्सङ्गः सर्वसङ्गापहो हि माम् || ११-१२-१ ||",
            "transliteration": "na rodhayati māṁ yogo na sāṅkhyaṁ dharma eva ca |\nna svādhyāyastapastyāgo neṣṭāpūrtaṁ na dakṣiṇā ||\nyathāvarundhe satsaṅgaḥ sarvasaṅgāpaho hi mām || 11-12-1 ||",
            "translationHi": "भगवान् श्रीकृष्ण ने उद्धव जी से कहा: योग, सांख्य दर्शन, धर्म, स्वाध्याय, तप, त्याग, यज्ञ अथवा दान मुझे उस प्रकार अपने वश में नहीं कर सकते, जिस प्रकार समस्त आसक्तियों को हरने वाला 'सत्संग' मुझे वश में कर लेता है।",
            "hindiMeaning": "भगवान् श्रीकृष्ण ने उद्धव जी से कहा: योग, सांख्य दर्शन, धर्म, स्वाध्याय, तप, त्याग, यज्ञ अथवा दान मुझे उस प्रकार अपने वश में नहीं कर सकते, जिस प्रकार समस्त आसक्तियों को हरने वाला 'सत्संग' मुझे वश में कर लेता है।",
            "translationEn": "Lord Krishna said to Uddhava: Neither Yoga, nor Sankhya, nor pious duties, Vedic study, austerities, charity, or ritual offerings bind Me as does holy association (Satsanga), which removes all worldly attachments.",
            "englishMeaning": "Lord Krishna said to Uddhava: Neither Yoga, nor Sankhya, nor pious duties, Vedic study, austerities, charity, or ritual offerings bind Me as does holy association (Satsanga), which removes all worldly attachments.",
            "commentary": "उद्धव गीता का यह महावाक्य सत्संग को समस्त साधनाओं में शिरोमणि बताता है।"
          }
        ]
      },
      {
        "id": "sb-skandha-12",
        "chapterNumber": 12,
        "titleHi": "द्वादश स्कन्ध: आश्रय लीला",
        "titleEn": "Canto 12: The Age of Deterioration",
        "summaryHi": "श्रीमद्भागवत महापुराण के द्वादश स्कन्ध: आश्रय लीला का सारगर्भित दिव्य चरित्र एवं दार्शनिक रहस्य।",
        "summaryEn": "The transcendental wisdom and lila from Canto 12: The Age of Deterioration.",
        "verses": [
          {
            "id": "sb-12-1",
            "verseNumber": 1,
            "sanskritText": "कलेर्दोषनिधे राजन्नस्ति ह्येको महान् गुणः |\nकीर्तनादेव कृष्णस्य मुक्तसङ्गः परं व्रजेत् || १२-३-५१ ||",
            "sanskrit": "कलेर्दोषनिधे राजन्नस्ति ह्येको महान् गुणः |\nकीर्तनादेव कृष्णस्य मुक्तसङ्गः परं व्रजेत् || १२-३-५१ ||",
            "transliteration": "kalerdoṣanidhe rājannasti hyeko mahān guṇaḥ |\nkīrtanādeva kṛṣṇasya muktasaṅgaḥ paraṁ vrajet || 12-3-51 ||",
            "translationHi": "शुकदेव जी ने कहा: हे राजन् परीक्षित! यद्यपि कलियुग दोषों का खजाना है, फिर भी इसमें एक बहुत बड़ा महान गुण है—केवल श्रीकृष्ण के नाम-संकीर्तन से ही मनुष्य संसार के समस्त बंधनों से मुक्त होकर परम पद को प्राप्त हो जाता है।",
            "hindiMeaning": "शुकदेव जी ने कहा: हे राजन् परीक्षित! यद्यपि कलियुग दोषों का खजाना है, फिर भी इसमें एक बहुत बड़ा महान गुण है—केवल श्रीकृष्ण के नाम-संकीर्तन से ही मनुष्य संसार के समस्त बंधनों से मुक्त होकर परम पद को प्राप्त हो जाता है।",
            "translationEn": "Shukadeva said: O King Parikshit, although the age of Kali is an ocean of faults, there is still one magnificent virtue: simply by chanting the holy names of Krishna, one becomes free from bondage and attains the Supreme.",
            "englishMeaning": "Shukadeva said: O King Parikshit, although the age of Kali is an ocean of faults, there is still one magnificent virtue: simply by chanting the holy names of Krishna, one becomes free from bondage and attains the Supreme.",
            "commentary": "श्रीमद्भागवत का परम फलश्रुति वचन: कलियुग में केवल हरिनाम संकीर्तन ही मुक्ति का सरलतम मार्ग है।"
          }
        ]
      }
    ]
  },
  "patanjali-yoga": {
    "id": "patanjali-yoga",
    "slug": "patanjali-yoga",
    "titleHi": "पतंजलि योगसूत्र",
    "titleEn": "Patanjali Yoga Sutras",
    "author": "महर्षि पतंजलि",
    "category": "darshana",
    "descriptionHi": "चारों पादों (समाधि, साधन, विभूति, कैवल्य) में अष्टाङ्ग योग (यम, नियम, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान, समाधि) का पूर्ण वैज्ञानिक दर्शन।",
    "descriptionEn": "The classical guide to mind mastery and self-realization in 4 Padas, outlining the Eight Limbs of Yoga (Ashtanga Yoga) leading to Kaivalya.",
    "totalVerses": 15,
    "totalChapters": 4,
    "chapters": [
      {
        "id": "pys-pada-1",
        "chapterNumber": 1,
        "titleHi": "पाद १: समाधि पाद",
        "titleEn": "Pada 1: Samadhi Pada",
        "summaryHi": "योग का लक्षण, चित्त की वृत्तियाँ और उनका निरोध, अभ्यास और वैराग्य, ईश्वरप्रणिधान, प्रणव ॐ एवं समाधि के भेद।",
        "summaryEn": "The definition of Yoga; silencing the modifications of the mind; practice and detachment; surrender to Ishvara; meditation on OM.",
        "verses": [
          {
            "id": "pys-1-1",
            "verseNumber": 1,
            "sanskritText": "अथ योगानुशासनम् ॥ १-१ ॥",
            "sanskrit": "अथ योगानुशासनम् ॥ १-१ ॥",
            "transliteration": "atha yogānuśāsanam || 1-1 ||",
            "translationHi": "अब योग के अनुशासन (मार्गदर्शन) का शुभारम्भ होता है।",
            "hindiMeaning": "अब योग के अनुशासन (मार्गदर्शन) का शुभारम्भ होता है।",
            "translationEn": "Now, the authoritative instruction on Yoga begins.",
            "englishMeaning": "Now, the authoritative instruction on Yoga begins.",
            "commentary": "'अथ' शब्द मंगल, अधिकार और प्रारम्भ का सूचक है। योग कोई कोरी कल्पना नहीं, एक वैज्ञानिक अनुशासन है।"
          },
          {
            "id": "pys-1-2",
            "verseNumber": 2,
            "sanskritText": "योगश्चित्तवृत्तिनिरोधः ॥ १-२ ॥",
            "sanskrit": "योगश्चित्तवृत्तिनिरोधः ॥ १-२ ॥",
            "transliteration": "yogaścittavṛttinirodhaḥ || 1-2 ||",
            "translationHi": "चित्त (मन, बुद्धि, अहंकार) की वृत्तियों (लहरों/विकारों) का पूर्ण निरोध (शांत होना) ही योग है।",
            "hindiMeaning": "चित्त (मन, बुद्धि, अहंकार) की वृत्तियों (लहरों/विकारों) का पूर्ण निरोध (शांत होना) ही योग है।",
            "translationEn": "Yoga is the restraint of the modifications and fluctuations of the mind-stuff.",
            "englishMeaning": "Yoga is the restraint of the modifications and fluctuations of the mind-stuff.",
            "commentary": "पतंजलि योगसूत्र का यह सर्वाधिक प्रसिद्ध मूल सूत्र है जो योग के स्वरूप को परिभाषित करता है।"
          },
          {
            "id": "pys-1-3",
            "verseNumber": 3,
            "sanskritText": "तदा द्रष्टुः स्वरूपेऽवस्थानम् ॥ १-३ ॥",
            "sanskrit": "तदा द्रष्टुः स्वरूपेऽवस्थानम् ॥ १-३ ॥",
            "transliteration": "tadā draṣṭuḥ svarūpe'vasthānam || 1-3 ||",
            "translationHi": "उस समय (चित्तवृत्ति निरोध होने पर) द्रष्टा (जीवात्मा) अपने वास्तविक स्वरूप में प्रतिष्ठित हो जाता है।",
            "hindiMeaning": "उस समय (चित्तवृत्ति निरोध होने पर) द्रष्टा (जीवात्मा) अपने वास्तविक स्वरूप में प्रतिष्ठित हो जाता है।",
            "translationEn": "Then the Seer (Self) abides in its own true nature.",
            "englishMeaning": "Then the Seer (Self) abides in its own true nature.",
            "commentary": "जब मन का जल शांत होता है, तभी तलहटी में स्थित सत्य का बिम्ब स्पष्ट दिखाई देता है।"
          },
          {
            "id": "pys-1-12",
            "verseNumber": 12,
            "sanskritText": "अभ्यासवैराग्याभ्यां तन्निरोधः ॥ १-१२ ॥",
            "sanskrit": "अभ्यासवैराग्याभ्यां तन्निरोधः ॥ १-१२ ॥",
            "transliteration": "abhyāsavairāgyābhyāṁ tannirodhaḥ || 1-12 ||",
            "translationHi": "उन चित्त की वृत्तियों का निरोध 'अभ्यास' (निरंतर यत्न) और 'वैराग्य' (अनासक्ति) द्वारा होता है।",
            "hindiMeaning": "उन चित्त की वृत्तियों का निरोध 'अभ्यास' (निरंतर यत्न) और 'वैराग्य' (अनासक्ति) द्वारा होता है।",
            "translationEn": "The control of the fluctuations of the mind is achieved through practice and non-attachment.",
            "englishMeaning": "The control of the fluctuations of the mind is achieved through practice and non-attachment.",
            "commentary": "अभ्यास मन को अंतर्मुख करता है और वैराग्य उसे बाह्य आकर्षणों से बचाता है।"
          },
          {
            "id": "pys-1-27",
            "verseNumber": 27,
            "sanskritText": "तस्य वाचकः प्रणवः ॥ १-२७ ॥",
            "sanskrit": "तस्य वाचकः प्रणवः ॥ १-२७ ॥",
            "transliteration": "tasya vācakaḥ praṇavaḥ || 1-27 ||",
            "translationHi": "उस ईश्वर का बोधक (वाचक) नाम 'प्रणव' (ॐ) है।",
            "hindiMeaning": "उस ईश्वर का बोधक (वाचक) नाम 'प्रणव' (ॐ) है।",
            "translationEn": "His signifying word is the sacred syllable OM (Pranava).",
            "englishMeaning": "His signifying word is the sacred syllable OM (Pranava).",
            "commentary": "परमात्मा का सनातन नाद-ब्रह्म स्वरूप ॐकार है।"
          },
          {
            "id": "pys-1-28",
            "verseNumber": 28,
            "sanskritText": "तज्जपस्तदर्थभावनम् ॥ १-२८ ॥",
            "sanskrit": "तज्जपस्तदर्थभावनम् ॥ १-२८ ॥",
            "transliteration": "tajjapastadarthabhāvanam || 1-28 ||",
            "translationHi": "उस ॐकार का जप करना चाहिए और उसके अर्थ (परमात्मा) की भावना (ध्यान) करनी चाहिए।",
            "hindiMeaning": "उस ॐकार का जप करना चाहिए और उसके अर्थ (परमात्मा) की भावना (ध्यान) करनी चाहिए।",
            "translationEn": "To repeat OM and contemplate its profound meaning leads to spiritual illumination.",
            "englishMeaning": "To repeat OM and contemplate its profound meaning leads to spiritual illumination.",
            "commentary": "केवल वाणी से जप नहीं, हृदय में उसके अर्थ का ध्यान ही वास्तविक जप है।"
          }
        ]
      },
      {
        "id": "pys-pada-2",
        "chapterNumber": 2,
        "titleHi": "पाद २: साधन पाद",
        "titleEn": "Pada 2: Sadhana Pada",
        "summaryHi": "क्रियायोग (तप, स्वाध्याय, ईश्वरप्रणिधान), पञ्च क्लेश, अष्टाङ्ग योग के प्रथम पाँच बहिरंग अंग (यम, नियम, आसन, प्राणायाम, प्रत्याहार)।",
        "summaryEn": "The practice of Yoga; Kriya Yoga; the five afflictions (Kleshas); the eight limbs of Yoga with the external five: Yama, Niyama, Asana, Pranayama, Pratyahara.",
        "verses": [
          {
            "id": "pys-2-1",
            "verseNumber": 1,
            "sanskritText": "तपःस्वाध्यायेश्वरप्रणिधानानि क्रियायोगः ॥ २-१ ॥",
            "sanskrit": "तपःस्वाध्यायेश्वरप्रणिधानानि क्रियायोगः ॥ २-१ ॥",
            "transliteration": "tapaḥsvādhyāyeśvarapraṇidhānāni kriyāyogaḥ || 2-1 ||",
            "translationHi": "तप (अनुशासन), स्वाध्याय (सद्ग्रंथों व आत्म-निरीक्षण) और ईश्वरप्रणिधान (ईश्वर-समर्पण)—ये तीनों मिलकर 'क्रियायोग' कहलाते हैं।",
            "hindiMeaning": "तप (अनुशासन), स्वाध्याय (सद्ग्रंथों व आत्म-निरीक्षण) और ईश्वरप्रणिधान (ईश्वर-समर्पण)—ये तीनों मिलकर 'क्रियायोग' कहलाते हैं।",
            "translationEn": "Austerity, self-study, and devotion to God constitute Kriya Yoga (practical yoga).",
            "englishMeaning": "Austerity, self-study, and devotion to God constitute Kriya Yoga (practical yoga).",
            "commentary": "साधना पाद का प्रारम्भ व्यावहारिक क्रियायोग से होता है जो क्लेशों को शिथिल करता है।"
          },
          {
            "id": "pys-2-29",
            "verseNumber": 29,
            "sanskritText": "यमनियमासनप्राणायामप्रत्याहारधारणाध्यानसमाधयोऽष्टावङ्गानि ॥ २-२९ ॥",
            "sanskrit": "यमनियमासनप्राणायामप्रत्याहारधारणाध्यानसमाधयोऽष्टावङ्गानि ॥ २-२९ ॥",
            "transliteration": "yamaniyamāsanaprāṇāyāmapratyāhāradhāraṇādhyānasamādhayo'ṣṭāvaṅgāni || 2-29 ||",
            "translationHi": "यम, नियम, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान और समाधि—ये योग के आठ अंग (अष्टाङ्ग योग) हैं।",
            "hindiMeaning": "यम, नियम, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान और समाधि—ये योग के आठ अंग (अष्टाङ्ग योग) हैं।",
            "translationEn": "The eight limbs of Yoga are Yama (restraints), Niyama (observances), Asana (posture), Pranayama (breath control), Pratyahara (withdrawal of senses), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption).",
            "englishMeaning": "The eight limbs of Yoga are Yama (restraints), Niyama (observances), Asana (posture), Pranayama (breath control), Pratyahara (withdrawal of senses), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption).",
            "commentary": "अष्टाङ्ग योग मानव चेतना के सर्वांगीण विकास का विश्वप्रसिद्ध वैज्ञानिक सोपान है।"
          },
          {
            "id": "pys-2-30",
            "verseNumber": 30,
            "sanskritText": "अहिंसासत्यास्तेयब्रह्मचर्यापरिग्रहा यमाः ॥ २-३० ॥",
            "sanskrit": "अहिंसासत्यास्तेयब्रह्मचर्यापरिग्रहा यमाः ॥ २-३० ॥",
            "transliteration": "ahiṁsāsatyāsteyabrahmacaryāparigrahā yamāḥ || 2-30 ||",
            "translationHi": "अहिंसा (किसी को कष्ट न देना), सत्य, अस्तेय (चोरी न करना), ब्रह्मचर्य (इन्द्रिय-संयम) और अपरिग्रह (अनावश्यक संग्रह न करना)—ये पाँच 'यम' हैं।",
            "hindiMeaning": "अहिंसा (किसी को कष्ट न देना), सत्य, अस्तेय (चोरी न करना), ब्रह्मचर्य (इन्द्रिय-संयम) और अपरिग्रह (अनावश्यक संग्रह न करना)—ये पाँच 'यम' हैं।",
            "translationEn": "Non-violence, truthfulness, non-stealing, celibacy/continence, and non-possessiveness are the Yamas (universal moral vows).",
            "englishMeaning": "Non-violence, truthfulness, non-stealing, celibacy/continence, and non-possessiveness are the Yamas (universal moral vows).",
            "commentary": "यम सामाजिक और नैतिक जीवन की शुद्धि के सार्वभौम महाव्रत हैं।"
          },
          {
            "id": "pys-2-46",
            "verseNumber": 46,
            "sanskritText": "स्थिरसुखमासनम् ॥ २-४६ ॥",
            "sanskrit": "स्थिरसुखमासनम् ॥ २-४६ ॥",
            "transliteration": "sthirasukhamāsanam || 2-46 ||",
            "translationHi": "स्थिर और सुखपूर्वक (कष्टरहित) बैठने का नाम 'आसन' है।",
            "hindiMeaning": "स्थिर और सुखपूर्वक (कष्टरहित) बैठने का नाम 'आसन' है।",
            "translationEn": "Posture (Asana) should be steady and comfortable.",
            "englishMeaning": "Posture (Asana) should be steady and comfortable.",
            "commentary": "आसन का उद्देश्य देह को स्थिर और शांत करना है जिससे ध्यान में विक्षेप न हो।"
          }
        ]
      },
      {
        "id": "pys-pada-3",
        "chapterNumber": 3,
        "titleHi": "पाद ३: विभूति पाद",
        "titleEn": "Pada 3: Vibhuti Pada",
        "summaryHi": "अंतरंग योग (धारणा, ध्यान, समाधि), संयम का स्वरूप, विभिन्न सिद्धियाँ व विभूतियाँ, और विवेकख्याति द्वारा कैवल्य की तैयारी।",
        "summaryEn": "The internal limbs of Yoga: Dharana, Dhyana, Samadhi; Samyama and higher intuitive faculties; spiritual power and discriminating wisdom.",
        "verses": [
          {
            "id": "pys-3-1",
            "verseNumber": 1,
            "sanskritText": "देशबन्धश्चित्तस्य धारणा ॥ ३-१ ॥",
            "sanskrit": "देशबन्धश्चित्तस्य धारणा ॥ ३-१ ॥",
            "transliteration": "deśabandhaścittasya dhāraṇā || 3-1 ||",
            "translationHi": "चित्त को किसी एक स्थान (हृदय, भ्रूमध्य, नाभि आदि) पर बांधना (स्थिर करना) 'धारणा' है।",
            "hindiMeaning": "चित्त को किसी एक स्थान (हृदय, भ्रूमध्य, नाभि आदि) पर बांधना (स्थिर करना) 'धारणा' है।",
            "translationEn": "Dharana is the fixing of the mind on a single chosen spot or point of focus.",
            "englishMeaning": "Dharana is the fixing of the mind on a single chosen spot or point of focus.",
            "commentary": "अंतरंग योग का प्रथम चरण धारणा (एकाग्रता) है।"
          },
          {
            "id": "pys-3-2",
            "verseNumber": 2,
            "sanskritText": "तत्र प्रत्ययैकतानता ध्यानम् ॥ ३-२ ॥",
            "sanskrit": "तत्र प्रत्ययैकतानता ध्यानम् ॥ ३-२ ॥",
            "transliteration": "tatra pratyayaikatānatā dhyānam || 3-2 ||",
            "translationHi": "वहाँ (धारणा के स्थान पर) ध्येय वस्तु के ज्ञान का एक तार (अविच्छिन्न प्रवाह) बने रहना 'ध्यान' है।",
            "hindiMeaning": "वहाँ (धारणा के स्थान पर) ध्येय वस्तु के ज्ञान का एक तार (अविच्छिन्न प्रवाह) बने रहना 'ध्यान' है।",
            "translationEn": "An unbroken, continuous flow of awareness towards that focal object is Dhyana (meditation).",
            "englishMeaning": "An unbroken, continuous flow of awareness towards that focal object is Dhyana (meditation).",
            "commentary": "जैसे तेल को एक पात्र से दूसरे पात्र में डालते समय अखंड धारा बहती है, वैसे ही ध्यान में चेतना का अखंड प्रवाह होता है।"
          },
          {
            "id": "pys-3-3",
            "verseNumber": 3,
            "sanskritText": "तदेवार्थमात्रनिर्भासं स्वरूपशून्यमिव समाधिः ॥ ३-३ ॥",
            "sanskrit": "तदेवार्थमात्रनिर्भासं स्वरूपशून्यमिव समाधिः ॥ ३-३ ॥",
            "transliteration": "tadevārthamātranirbhāsaṁ svarūpaśūnyamiva samādhiḥ || 3-3 ||",
            "translationHi": "वही ध्यान जब केवल ध्येय वस्तु के रूप में ही प्रकाशित होता है और अपने स्वरूप से मानो शून्य हो जाता है, तब वह 'समाधि' कहलाता है।",
            "hindiMeaning": "वही ध्यान जब केवल ध्येय वस्तु के रूप में ही प्रकाशित होता है और अपने स्वरूप से मानो शून्य हो जाता है, तब वह 'समाधि' कहलाता है।",
            "translationEn": "When that same meditation shines forth as the object alone, as if devoid of its own reflective nature, that is Samadhi.",
            "englishMeaning": "When that same meditation shines forth as the object alone, as if devoid of its own reflective nature, that is Samadhi.",
            "commentary": "ज्ञाता, ज्ञान और ज्ञेय का भेद मिटकर एक हो जाना ही समाधि है।"
          }
        ]
      },
      {
        "id": "pys-pada-4",
        "chapterNumber": 4,
        "titleHi": "पाद ४: कैवल्य पाद",
        "titleEn": "Pada 4: Kaivalya Pada",
        "summaryHi": "सिद्धियों के मूल कारण, संस्कारों की गति, चित्त का स्वभाव, धर्ममेघ समाधि एवं कैवल्य (परम मोक्ष) का स्वरूप।",
        "summaryEn": "Liberation (Kaivalya); origin of higher powers; latent karmic impressions; the cloud of virtue (Dharmamegha Samadhi); pure freedom of consciousness.",
        "verses": [
          {
            "id": "pys-4-1",
            "verseNumber": 1,
            "sanskritText": "जन्मौषधिमन्त्रतपःसमाधिजाः सिद्धयः ॥ ४-१ ॥",
            "sanskrit": "जन्मौषधिमन्त्रतपःसमाधिजाः सिद्धयः ॥ ४-१ ॥",
            "transliteration": "janmauṣadhimantratapaḥsamādhijāḥ siddhayaḥ || 4-1 ||",
            "translationHi": "सिद्धियाँ जन्म से, दिव्य औषधियों से, मन्त्र जप से, तपस्या से और समाधि से उत्पन्न होती हैं।",
            "hindiMeaning": "सिद्धियाँ जन्म से, दिव्य औषधियों से, मन्त्र जप से, तपस्या से और समाधि से उत्पन्न होती हैं।",
            "translationEn": "The mystical perfections (Siddhis) arise from birth, sacred herbs, mantras, austerities, or through Samadhi.",
            "englishMeaning": "The mystical perfections (Siddhis) arise from birth, sacred herbs, mantras, austerities, or through Samadhi.",
            "commentary": "इनमें समाधि से उत्पन्न सिद्धि ही स्थायी और मोक्षदायिनी होती है।"
          },
          {
            "id": "pys-4-34",
            "verseNumber": 34,
            "sanskritText": "पुरुषार्थशून्यानां गुणानां प्रतिप्रसवः कैवल्यं स्वरूपप्रतिष्ठा वा चितिशक्तिरिति ॥ ४-३४ ॥",
            "sanskrit": "पुरुषार्थशून्यानां गुणानां प्रतिप्रसवः कैवल्यं स्वरूपप्रतिष्ठा वा चितिशक्तिरिति ॥ ४-३४ ॥",
            "transliteration": "puruṣārthaśūnyānāṁ guṇānāṁ pratiprasavaḥ kaivalyaṁ svarūpapratiṣṭhā vā citiśaktiriti || 4-34 ||",
            "translationHi": "पुरुष (आत्मा) के प्रयोजन से रहित हुए तीनों गुणों का अपने मूल कारण (प्रकृति) में विलीन हो जाना अथवा चेतना शक्ति (चितिशक्ति) का अपने वास्तविक स्वरूप में प्रतिष्ठित हो जाना ही 'कैवल्य' (मोक्ष) है।",
            "hindiMeaning": "पुरुष (आत्मा) के प्रयोजन से रहित हुए तीनों गुणों का अपने मूल कारण (प्रकृति) में विलीन हो जाना अथवा चेतना शक्ति (चितिशक्ति) का अपने वास्तविक स्वरूप में प्रतिष्ठित हो जाना ही 'कैवल्य' (मोक्ष) है।",
            "translationEn": "Kaivalya (Liberation) is the resolution of the Gunas back into their primal cause, having accomplished the soul's purpose; or it is the establishment of the power of Consciousness in Its own true nature.",
            "englishMeaning": "Kaivalya (Liberation) is the resolution of the Gunas back into their primal cause, having accomplished the soul's purpose; or it is the establishment of the power of Consciousness in Its own true nature.",
            "commentary": "पतंजलि योगसूत्र का यह अंतिम सूत्र है जो योग के परम फल 'कैवल्य' (परम स्वतंत्रता व मुक्ति) की घोषणा करता है।"
          }
        ]
      }
    ]
  },
  "chanakya-niti": {
    "id": "chanakya-niti",
    "slug": "chanakya-niti",
    "titleHi": "चाणक्य नीति",
    "titleEn": "Chanakya Niti",
    "author": "आचार्य चाणक्य (विष्णुगुप्त / कौटिल्य)",
    "category": "niti",
    "descriptionHi": "सम्पूर्ण सत्रह अध्यायों में आचार्य चाणक्य द्वारा उपदिष्ट जीवन, धर्म, विद्या, मित्रता, परिवार, कर्म, और राष्ट्र-धर्म का अमर व्यावहारिक मार्गदर्शन।",
    "descriptionEn": "The complete seventeen chapters of practical aphorisms by Acharya Chanakya on ethics, leadership, education, family life, and character building.",
    "totalVerses": 17,
    "totalChapters": 17,
    "chapters": [
      {
        "id": "cn-ch-1",
        "chapterNumber": 1,
        "titleHi": "अध्याय १: धर्म, नीति और विद्या का महत्व",
        "titleEn": "Chapter 1: Dharma, Policy and Learning",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय १: धर्म, नीति और विद्या का महत्व का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 1: Dharma, Policy and Learning.",
        "verses": [
          {
            "id": "cn-1-1",
            "verseNumber": 1,
            "sanskritText": "प्रणम्य शिरसा विष्णुं त्रैलोक्याधिपतिं प्रभुम् |\nनानाशास्त्रोद्धृतं वक्ष्ये राजनीतिसमुच्चयम् || १-१ ||",
            "sanskrit": "प्रणम्य शिरसा विष्णुं त्रैलोक्याधिपतिं प्रभुम् |\nनानाशास्त्रोद्धृतं वक्ष्ये राजनीतिसमुच्चयम् || १-१ ||",
            "transliteration": "praṇamya śirasā viṣṇuṁ trailokyādhipatiṁ prabhum |\nnānāśāstroddhṛtaṁ vakṣye rājanītisamuccayam || 1-1 ||",
            "translationHi": "तीनों लोकों के स्वामी भगवान् विष्णु को सिर झुकाकर प्रणाम करते हुए मैं अनेक शास्त्रों से उद्धृत नीति और राजनीति के नियमों का संग्रह कहता हूँ।",
            "hindiMeaning": "तीनों लोकों के स्वामी भगवान् विष्णु को सिर झुकाकर प्रणाम करते हुए मैं अनेक शास्त्रों से उद्धृत नीति और राजनीति के नियमों का संग्रह कहता हूँ।",
            "translationEn": "Bowing my head in reverence to Lord Vishnu, the master of the three worlds, I present this compendium of wisdom and statecraft drawn from numerous scriptures.",
            "englishMeaning": "Bowing my head in reverence to Lord Vishnu, the master of the three worlds, I present this compendium of wisdom and statecraft drawn from numerous scriptures.",
            "commentary": "आचार्य चाणक्य ने नीतिशास्त्र का प्रारम्भ ईश्वर वन्दना और जीवन के व्यावहारिक सूत्रों के संकलन से किया है।"
          }
        ]
      },
      {
        "id": "cn-ch-2",
        "chapterNumber": 2,
        "titleHi": "अध्याय २: गृहस्थ जीवन, वाणी और सत्संग",
        "titleEn": "Chapter 2: Domestic Life, Speech and Company",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय २: गृहस्थ जीवन, वाणी और सत्संग का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 2: Domestic Life, Speech and Company.",
        "verses": [
          {
            "id": "cn-2-1",
            "verseNumber": 1,
            "sanskritText": "अनृतं साहसं माया मूर्खत्वमतिलोभिता |\nअशौचत्वं निर्दयत्वं स्त्रीणां दोषाः स्वभावजाः || २-१ ||",
            "sanskrit": "अनृतं साहसं माया मूर्खत्वमतिलोभिता |\nअशौचत्वं निर्दयत्वं स्त्रीणां दोषाः स्वभावजाः || २-१ ||",
            "transliteration": "anṛtaṁ sāhasaṁ māyā mūrkatvamatilobhitā |\naśaucatvaṁ nirdayatvaṁ strīṇāṁ doṣāḥ svabhāvajāḥ || 2-1 ||",
            "translationHi": "झूठ बोलना, बिना सोचे साहस करना, छल, मूर्खता, अत्यधिक लोभ, अपवित्रता और निर्दयता—ये सामान्य अविवेकी स्वभाव के स्वाभाविक दोष हैं।",
            "hindiMeaning": "झूठ बोलना, बिना सोचे साहस करना, छल, मूर्खता, अत्यधिक लोभ, अपवित्रता और निर्दयता—ये सामान्य अविवेकी स्वभाव के स्वाभाविक दोष हैं।",
            "translationEn": "Untruthfulness, rashness, deceit, foolishness, extreme greed, impurity and cruelty are flaws arising from an unrefined, undisciplined nature.",
            "englishMeaning": "Untruthfulness, rashness, deceit, foolishness, extreme greed, impurity and cruelty are flaws arising from an unrefined, undisciplined nature.",
            "commentary": "चाणक्य नीति में मानव स्वभाव की कमजोरियों को पहचानकर उनसे सतर्क रहने का उपदेश है।"
          }
        ]
      },
      {
        "id": "cn-ch-3",
        "chapterNumber": 3,
        "titleHi": "अध्याय ३: कुल, शील और श्रेष्ठ संगति",
        "titleEn": "Chapter 3: Lineage, Character and Noble Association",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय ३: कुल, शील और श्रेष्ठ संगति का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 3: Lineage, Character and Noble Association.",
        "verses": [
          {
            "id": "cn-3-1",
            "verseNumber": 1,
            "sanskritText": "कस्य दोषः कुले नास्ति व्याधिना को न पीडितः |\nव्यसनं केन न प्राप्तं कस्य सौख्यं निरन्तरम् || ३-१ ||",
            "sanskrit": "कस्य दोषः कुले नास्ति व्याधिना को न पीडितः |\nव्यसनं केन न प्राप्तं कस्य सौख्यं निरन्तरम् || ३-१ ||",
            "transliteration": "kasya doṣaḥ kule nāsti vyādhinā ko na pīḍitaḥ |\nvyasanaṁ kena na prāptaṁ kasya saukhyaṁ nirantaram || 3-1 ||",
            "translationHi": "संसार में ऐसा किसका कुल है जिसमें कोई दोष न हो? ऐसा कौन है जिसे कभी कोई रोग न हुआ हो? किसे कभी संकट न मिला हो और किसे निरन्तर सुख रहा हो?",
            "hindiMeaning": "संसार में ऐसा किसका कुल है जिसमें कोई दोष न हो? ऐसा कौन है जिसे कभी कोई रोग न हुआ हो? किसे कभी संकट न मिला हो और किसे निरन्तर सुख रहा हो?",
            "translationEn": "Whose lineage is without blemish? Who has never suffered from disease? Who has never faced adversity, and who enjoys unbroken happiness?",
            "englishMeaning": "Whose lineage is without blemish? Who has never suffered from disease? Who has never faced adversity, and who enjoys unbroken happiness?",
            "commentary": "संसार का स्वभाव परिवर्तनशील है; कोई भी परिवार या व्यक्ति पूर्णतः कष्टमुक्त नहीं है, अतः धैर्यपूर्वक जीना चाहिए।"
          }
        ]
      },
      {
        "id": "cn-ch-4",
        "chapterNumber": 4,
        "titleHi": "अध्याय ४: विद्या, विनय और गुरु महिमा",
        "titleEn": "Chapter 4: Knowledge, Humility and the Teacher",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय ४: विद्या, विनय और गुरु महिमा का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 4: Knowledge, Humility and the Teacher.",
        "verses": [
          {
            "id": "cn-4-1",
            "verseNumber": 1,
            "sanskritText": "आयुः कर्म च वित्तं च विद्या निधनमेव च |\nपञ्चैतानि हि सृज्यन्ते गर्भस्थस्यैव देहिनः || ४-१ ||",
            "sanskrit": "आयुः कर्म च वित्तं च विद्या निधनमेव च |\nपञ्चैतानि हि सृज्यन्ते गर्भस्थस्यैव देहिनः || ४-१ ||",
            "transliteration": "āyuḥ karma ca vittaṁ ca vidyā nidhanameva ca |\npañcaitāni hi sṛjyante garbhasthasyaiva dehinaḥ || 4-1 ||",
            "translationHi": "आयु, कर्म, धन-संपत्ति, विद्या और मृत्यु—ये पाँच बातें मनुष्य के गर्भ में स्थित होते समय ही निश्चित हो जाती हैं।",
            "hindiMeaning": "आयु, कर्म, धन-संपत्ति, विद्या और मृत्यु—ये पाँच बातें मनुष्य के गर्भ में स्थित होते समय ही निश्चित हो जाती हैं।",
            "translationEn": "Lifespan, destiny of work, wealth, learning, and the manner of death—these five are determined while the embodied soul is still in the womb.",
            "englishMeaning": "Lifespan, destiny of work, wealth, learning, and the manner of death—these five are determined while the embodied soul is still in the womb.",
            "commentary": "प्रारब्ध और पुरुषार्थ के संबंध को रेखांकित करता चाणक्य का यह प्रसिद्ध नीति-सूत्र है।"
          }
        ]
      },
      {
        "id": "cn-ch-5",
        "chapterNumber": 5,
        "titleHi": "अध्याय ५: सत्य, तप और परोपकार",
        "titleEn": "Chapter 5: Truthfulness, Austerity and Benevolence",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय ५: सत्य, तप और परोपकार का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 5: Truthfulness, Austerity and Benevolence.",
        "verses": [
          {
            "id": "cn-5-1",
            "verseNumber": 1,
            "sanskritText": "माता यस्य गृहे नास्ति भार्या चाप्रियवादिनी |\nअरण्यं तेन गन्तव्यं यथाऽरण्यं तथा गृहम् || ५-१ ||",
            "sanskrit": "माता यस्य गृहे नास्ति भार्या चाप्रियवादिनी |\nअरण्यं तेन गन्तव्यं यथाऽरण्यं तथा गृहम् || ५-१ ||",
            "transliteration": "mātā yasya gṛhe nāsti bhāryā cāpriyavādinī |\naraṇyaṁ tena gantavyaṁ yathā'raṇyaṁ tathā gṛham || 5-1 ||",
            "translationHi": "जिसके घर में प्रेम करने वाली माता न हो और पत्नी कटु बोलने वाली हो, उसे वन चले जाना चाहिए; क्योंकि उसके लिए जैसा घर है वैसा ही वन है।",
            "hindiMeaning": "जिसके घर में प्रेम करने वाली माता न हो और पत्नी कटु बोलने वाली हो, उसे वन चले जाना चाहिए; क्योंकि उसके लिए जैसा घर है वैसा ही वन है।",
            "translationEn": "He in whose home there is no loving mother and whose wife speaks unkindly should retreat to the forest, for to him the forest and home are alike.",
            "englishMeaning": "He in whose home there is no loving mother and whose wife speaks unkindly should retreat to the forest, for to him the forest and home are alike.",
            "commentary": "गृहस्थ आश्रम की मधुरता और आपसी सद्भाव की अनिवार्यता।"
          }
        ]
      },
      {
        "id": "cn-ch-6",
        "chapterNumber": 6,
        "titleHi": "अध्याय ६: समय, विवेक और एकाग्रता",
        "titleEn": "Chapter 6: Time, Discernment and Concentration",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय ६: समय, विवेक और एकाग्रता का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 6: Time, Discernment and Concentration.",
        "verses": [
          {
            "id": "cn-6-1",
            "verseNumber": 1,
            "sanskritText": "श्रुत्वा धर्मं विजानाति श्रुत्वा त्यजति दुर्मतिम् |\nश्रुत्वा ज्ञानमवाप्नोति श्रुत्वा मोक्षमवाप्नुयात् || ६-१ ||",
            "sanskrit": "श्रुत्वा धर्मं विजानाति श्रुत्वा त्यजति दुर्मतिम् |\nश्रुत्वा ज्ञानमवाप्नोति श्रुत्वा मोक्षमवाप्नुयात् || ६-१ ||",
            "transliteration": "śrutvā dharmaṁ vijānāti śrutvā tyajati durmatim |\nśrutvā jñānamavāpnoti śrutvā mokṣamavāpnuyāt || 6-1 ||",
            "translationHi": "सत्पुरुषों से सुनकर मनुष्य धर्म को जानता है, सुनकर दुर्बुद्धि को त्यागता है, सुनकर ज्ञान प्राप्त करता है और सुनकर ही मोक्ष को प्राप्त होता है।",
            "hindiMeaning": "सत्पुरुषों से सुनकर मनुष्य धर्म को जानता है, सुनकर दुर्बुद्धि को त्यागता है, सुनकर ज्ञान प्राप्त करता है और सुनकर ही मोक्ष को प्राप्त होता है।",
            "translationEn": "By hearing righteous teachings one understands virtue, abandons wickedness, gains wisdom, and attains liberation.",
            "englishMeaning": "By hearing righteous teachings one understands virtue, abandons wickedness, gains wisdom, and attains liberation.",
            "commentary": "सत्संग और श्रवण की महिमा जीवन में विवेक का संचार करती है।"
          }
        ]
      },
      {
        "id": "cn-ch-7",
        "chapterNumber": 7,
        "titleHi": "अध्याय ७: बुद्धिमान व्यक्ति के लक्षण",
        "titleEn": "Chapter 7: Traits of a Wise Person",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय ७: बुद्धिमान व्यक्ति के लक्षण का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 7: Traits of a Wise Person.",
        "verses": [
          {
            "id": "cn-7-1",
            "verseNumber": 1,
            "sanskritText": "दृष्टिपूतं न्यसेत्पादं वस्त्रपूतं जलं पिबेत् |\nशास्त्रपूतं वदेद्वाक्यं मनःपूतं समाचरेत् || ७-१ ||",
            "sanskrit": "दृष्टिपूतं न्यसेत्पादं वस्त्रपूतं जलं पिबेत् |\nशास्त्रपूतं वदेद्वाक्यं मनःपूतं समाचरेत् || ७-१ ||",
            "transliteration": "dṛṣṭipūtaṁ nyasetpādaṁ vastrapūtaṁ jalaṁ pibet |\nśāstrapūtaṁ vadedvākyaṁ manaḥpūtaṁ samācaret || 7-1 ||",
            "translationHi": "मार्ग को भली-भाँति देखकर पैर रखे, वस्त्र से छानकर जल पिए, शास्त्रसम्मत सत्य वाणी बोले और मन से शुद्ध समझकर ही कोई आचरण करे।",
            "hindiMeaning": "मार्ग को भली-भाँति देखकर पैर रखे, वस्त्र से छानकर जल पिए, शास्त्रसम्मत सत्य वाणी बोले और मन से शुद्ध समझकर ही कोई आचरण करे।",
            "translationEn": "One should step forward after looking carefully, drink water strained through a cloth, speak words verified by the scriptures, and act only upon that which conscience approves.",
            "englishMeaning": "One should step forward after looking carefully, drink water strained through a cloth, speak words verified by the scriptures, and act only upon that which conscience approves.",
            "commentary": "सतर्कता, शुचिता और सद्विवेक का सार्वकालिक नियम।"
          }
        ]
      },
      {
        "id": "cn-ch-8",
        "chapterNumber": 8,
        "titleHi": "अध्याय ८: धन, यश और धैर्य की परीक्षा",
        "titleEn": "Chapter 8: Wealth, Honor and Fortitude",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय ८: धन, यश और धैर्य की परीक्षा का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 8: Wealth, Honor and Fortitude.",
        "verses": [
          {
            "id": "cn-8-1",
            "verseNumber": 1,
            "sanskritText": "अधमा धनमिच्छन्ति धनं मानं च मध्यमाः |\nउत्तमा मानमिच्छन्ति मानो हि महतां धनम् || ८-१ ||",
            "sanskrit": "अधमा धनमिच्छन्ति धनं मानं च मध्यमाः |\nउत्तमा मानमिच्छन्ति मानो हि महतां धनम् || ८-१ ||",
            "transliteration": "adhamā dhanamicchanti dhanaṁ mānaṁ ca madhyamāḥ |\nuttamā mānamicchanti māno hi mahatāṁ dhanam || 8-1 ||",
            "translationHi": "निम्न श्रेणी के मनुष्य केवल धन चाहते हैं; मध्यम श्रेणी के मनुष्य धन और मान दोनों चाहते हैं; परन्तु उत्तम श्रेणी के महापुरुष केवल मान (सम्मान) चाहते हैं, क्योंकि महापुरुषों का सच्चा धन मान ही है।",
            "hindiMeaning": "निम्न श्रेणी के मनुष्य केवल धन चाहते हैं; मध्यम श्रेणी के मनुष्य धन और मान दोनों चाहते हैं; परन्तु उत्तम श्रेणी के महापुरुष केवल मान (सम्मान) चाहते हैं, क्योंकि महापुरुषों का सच्चा धन मान ही है।",
            "translationEn": "The lowly desire only wealth; the mediocre desire both wealth and honor; but the noble desire honor alone, for honor is truly the wealth of the great.",
            "englishMeaning": "The lowly desire only wealth; the mediocre desire both wealth and honor; but the noble desire honor alone, for honor is truly the wealth of the great.",
            "commentary": "स्वाभिमान और चारित्रिक मर्यादा को धन से श्रेष्ठ स्थान दिया गया है।"
          }
        ]
      },
      {
        "id": "cn-ch-9",
        "chapterNumber": 9,
        "titleHi": "अध्याय ९: जीवन में त्याग और सन्तोष",
        "titleEn": "Chapter 9: Renunciation and Contentment",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय ९: जीवन में त्याग और सन्तोष का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 9: Renunciation and Contentment.",
        "verses": [
          {
            "id": "cn-9-1",
            "verseNumber": 1,
            "sanskritText": "मुक्तिमिच्छसि चेत्तात विषयान् विषवत् त्यज |\nक्षमार्जवदयाशौचं सत्यं पीयूषवत् पिब || ९-१ ||",
            "sanskrit": "मुक्तिमिच्छसि चेत्तात विषयान् विषवत् त्यज |\nक्षमार्जवदयाशौचं सत्यं पीयूषवत् पिब || ९-१ ||",
            "transliteration": "muktimicchasi cettāta viṣayān viṣavat tyaja |\nkṣamārjavadayāśaucaṁ satyaṁ pīyūṣavat piba || 9-1 ||",
            "translationHi": "हे तात! यदि तुम मुक्ति चाहते हो तो सांसारिक वासनाओं को विष के समान त्याग दो; और क्षमा, सरलता, दया, पवित्रता तथा सत्य का अमृत के समान पान करो।",
            "hindiMeaning": "हे तात! यदि तुम मुक्ति चाहते हो तो सांसारिक वासनाओं को विष के समान त्याग दो; और क्षमा, सरलता, दया, पवित्रता तथा सत्य का अमृत के समान पान करो।",
            "translationEn": "If you seek liberation, dear one, cast aside sensual cravings like poison; and drink deep of forgiveness, straightforwardness, compassion, purity and truth like nectar.",
            "englishMeaning": "If you seek liberation, dear one, cast aside sensual cravings like poison; and drink deep of forgiveness, straightforwardness, compassion, purity and truth like nectar.",
            "commentary": "आत्मोद्धार का सरल और व्यावहारिक मार्ग।"
          }
        ]
      },
      {
        "id": "cn-ch-10",
        "chapterNumber": 10,
        "titleHi": "अध्याय १०: राजा, राज्य और राष्ट्र धर्म",
        "titleEn": "Chapter 10: Governance and Civic Duty",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय १०: राजा, राज्य और राष्ट्र धर्म का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 10: Governance and Civic Duty.",
        "verses": [
          {
            "id": "cn-10-1",
            "verseNumber": 1,
            "sanskritText": "भोज्यं भोजनशक्तिश्च रतिशक्तिर्वरस्त्रियः |\nविभवो दानशक्तिश्च नाल्पस्य तपसः फलम् || १०-१ ||",
            "sanskrit": "भोज्यं भोजनशक्तिश्च रतिशक्तिर्वरस्त्रियः |\nविभवो दानशक्तिश्च नाल्पस्य तपसः फलम् || १०-१ ||",
            "transliteration": "bhojyaṁ bhojanaśaktiśca ratiśaktirvarastriyaḥ |\nvibhavo dānaśaktiśca nālpasya tapasaḥ phalam || 10-1 ||",
            "translationHi": "उत्तम भोजन और उसे पचाने की शक्ति, वैभव और दान देने की शक्ति—यह किसी थोड़े तपस्या का फल नहीं है, बल्कि पूर्वजन्मों के महान पुण्यों से मिलता है।",
            "hindiMeaning": "उत्तम भोजन और उसे पचाने की शक्ति, वैभव और दान देने की शक्ति—यह किसी थोड़े तपस्या का फल नहीं है, बल्कि पूर्वजन्मों के महान पुण्यों से मिलता है।",
            "translationEn": "Good food and the capacity to digest it, abundance of wealth and the willingness to give in charity—these are fruits of no small spiritual merit.",
            "englishMeaning": "Good food and the capacity to digest it, abundance of wealth and the willingness to give in charity—these are fruits of no small spiritual merit.",
            "commentary": "दान और सामर्थ्य का उचित उपयोग ही धन की सार्थकता है।"
          }
        ]
      },
      {
        "id": "cn-ch-11",
        "chapterNumber": 11,
        "titleHi": "अध्याय ११: दान, दया और उदारता",
        "titleEn": "Chapter 11: Charity, Compassion and Generosity",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय ११: दान, दया और उदारता का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 11: Charity, Compassion and Generosity.",
        "verses": [
          {
            "id": "cn-11-1",
            "verseNumber": 1,
            "sanskritText": "दानं भोगो नाशस्तिस्रो गतयो भवन्ति वित्तस्य |\nयो न ददाति न भुङ्क्ते तस्य तृतीया गतिर्भवति || ११-१ ||",
            "sanskrit": "दानं भोगो नाशस्तिस्रो गतयो भवन्ति वित्तस्य |\nयो न ददाति न भुङ्क्ते तस्य तृतीया गतिर्भवति || ११-१ ||",
            "transliteration": "dānaṁ bhogo nāśastisro gatayo bhavanti vittasya |\nyo na dadāti na bhuṅkte tasya tṛtīyā gatirbhavati || 11-1 ||",
            "translationHi": "धन की तीन ही गतियाँ होती हैं: दान, भोग और नाश। जो मनुष्य न तो दान देता है और न भोग करता है, उसके धन की तीसरी गति (नाश) हो जाती है।",
            "hindiMeaning": "धन की तीन ही गतियाँ होती हैं: दान, भोग और नाश। जो मनुष्य न तो दान देता है और न भोग करता है, उसके धन की तीसरी गति (नाश) हो जाती है।",
            "translationEn": "Wealth has only three destinies: charity, enjoyment, and destruction. He who neither gives away nor enjoys his wealth sees its third fate—destruction.",
            "englishMeaning": "Wealth has only three destinies: charity, enjoyment, and destruction. He who neither gives away nor enjoys his wealth sees its third fate—destruction.",
            "commentary": "धन की उपयोगिता पर चाणक्य का विश्वप्रसिद्ध आर्थिक एवं नैतिक दर्शन।"
          }
        ]
      },
      {
        "id": "cn-ch-12",
        "chapterNumber": 12,
        "titleHi": "अध्याय १२: सद्गुण, सत्य और आत्मा",
        "titleEn": "Chapter 12: Virtue, Truth and Soul",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय १२: सद्गुण, सत्य और आत्मा का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 12: Virtue, Truth and Soul.",
        "verses": [
          {
            "id": "cn-12-1",
            "verseNumber": 1,
            "sanskritText": "सानन्दं सदनं सुताश्च सुधियः कान्ता न दुर्भाषिणी |\nसन्मित्रं सुधनं स्वयोषिति रतिश्चाज्ञापराः सेवकाः || १२-१ ||",
            "sanskrit": "सानन्दं सदनं सुताश्च सुधियः कान्ता न दुर्भाषिणी |\nसन्मित्रं सुधनं स्वयोषिति रतिश्चाज्ञापराः सेवकाः || १२-१ ||",
            "transliteration": "sānandaṁ sadanaṁ sutāśca sudhiyaḥ kāntā na durbhāṣiṇī |\nsanmitraṁ sudhanaṁ svayoṣiti ratiścājñāparāḥ sevakāḥ || 12-1 ||",
            "translationHi": "जिसका घर आनंद से भरा हो, संतान बुद्धिमान हो, पत्नी मीठी वाणी बोलने वाली हो, सच्चे मित्र हों, न्यायोपार्जित धन हो और आज्ञाकारी सेवक हों—वह मनुष्य पृथ्वी पर ही स्वर्ग का सुख भोगता है।",
            "hindiMeaning": "जिसका घर आनंद से भरा हो, संतान बुद्धिमान हो, पत्नी मीठी वाणी बोलने वाली हो, सच्चे मित्र हों, न्यायोपार्जित धन हो और आज्ञाकारी सेवक हों—वह मनुष्य पृथ्वी पर ही स्वर्ग का सुख भोगता है।",
            "translationEn": "He whose home is filled with joy, whose children are wise, whose spouse is gentle of speech, who has faithful friends and honest wealth—verily lives in heaven upon this earth.",
            "englishMeaning": "He whose home is filled with joy, whose children are wise, whose spouse is gentle of speech, who has faithful friends and honest wealth—verily lives in heaven upon this earth.",
            "commentary": "धरती पर ही स्वर्ग के सुख का अनुभव करने वाले सद्गृहस्थ का चित्रण।"
          }
        ]
      },
      {
        "id": "cn-ch-13",
        "chapterNumber": 13,
        "titleHi": "अध्याय १३: क्षणभंगुर संसार और मोक्ष",
        "titleEn": "Chapter 13: The Transience of the World",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय १३: क्षणभंगुर संसार और मोक्ष का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 13: The Transience of the World.",
        "verses": [
          {
            "id": "cn-13-1",
            "verseNumber": 1,
            "sanskritText": "मुहूर्तमपि जीवेच्च नरः शुक्लेन कर्मणा |\nन कल्पमपि कष्टेन लोकद्वयविरोधिना || १३-१ ||",
            "sanskrit": "मुहूर्तमपि जीवेच्च नरः शुक्लेन कर्मणा |\nन कल्पमपि कष्टेन लोकद्वयविरोधिना || १३-१ ||",
            "transliteration": "muhūrtamapi jīvecca naraḥ śuklena karmaṇā |\nna kalpamapi kaṣṭena lokadvayavirodhinā || 13-1 ||",
            "translationHi": "मनुष्य यदि श्रेष्ठ और पवित्र कर्म करते हुए एक क्षण भी जिए तो वह श्रेष्ठ है; दोनों लोकों के विरुद्ध पापकर्म करते हुए कल्प भर जीना भी व्यर्थ है।",
            "hindiMeaning": "मनुष्य यदि श्रेष्ठ और पवित्र कर्म करते हुए एक क्षण भी जिए तो वह श्रेष्ठ है; दोनों लोकों के विरुद्ध पापकर्म करते हुए कल्प भर जीना भी व्यर्थ है।",
            "translationEn": "Better is a single moment lived in purity and righteousness than living an entire cosmic age in sin and sorrow destructive to both worlds.",
            "englishMeaning": "Better is a single moment lived in purity and righteousness than living an entire cosmic age in sin and sorrow destructive to both worlds.",
            "commentary": "जीवन की सार्थकता वर्षों की संख्या में नहीं, कर्मों की दिव्यता में है।"
          }
        ]
      },
      {
        "id": "cn-ch-14",
        "chapterNumber": 14,
        "titleHi": "अध्याय १४: कर्म की प्रधानता और प्रारब्ध",
        "titleEn": "Chapter 14: Supremacy of Right Action",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय १४: कर्म की प्रधानता और प्रारब्ध का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 14: Supremacy of Right Action.",
        "verses": [
          {
            "id": "cn-14-1",
            "verseNumber": 1,
            "sanskritText": "पृथिव्यां त्रीणि रत्नानि जलमन्नं सुभाषितम् |\nमूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते || १४-१ ||",
            "sanskrit": "पृथिव्यां त्रीणि रत्नानि जलमन्नं सुभाषितम् |\nमूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते || १४-१ ||",
            "transliteration": "pṛthivyāṁ trīṇi ratnāni jalamannaṁ subhāṣitam |\nmūḍhaiḥ pāṣāṇakhaṇḍeṣu ratnasaṁjñā vidhīyate || 14-1 ||",
            "translationHi": "पृथ्वी पर तीन ही वास्तविक रत्न हैं—जल, अन्न और सुंदर हितकारी वचन (सुभाषित)। मूर्ख लोग पत्थर के टुकड़ों (हीरे-जवाहरात) को रत्न कहते हैं।",
            "hindiMeaning": "पृथ्वी पर तीन ही वास्तविक रत्न हैं—जल, अन्न और सुंदर हितकारी वचन (सुभाषित)। मूर्ख लोग पत्थर के टुकड़ों (हीरे-जवाहरात) को रत्न कहते हैं।",
            "translationEn": "There are only three true jewels on earth: water, food, and wise sayings. Fools mistake mere pieces of stone for jewels.",
            "englishMeaning": "There are only three true jewels on earth: water, food, and wise sayings. Fools mistake mere pieces of stone for jewels.",
            "commentary": "जीवन की सच्ची आवश्यकताओं और ज्ञान की महत्ता का मर्मस्पर्शी उद्घाटन।"
          }
        ]
      },
      {
        "id": "cn-ch-15",
        "chapterNumber": 15,
        "titleHi": "अध्याय १५: स्वभाव, चरित्र और मर्यादा",
        "titleEn": "Chapter 15: Character, Nature and Decorum",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय १५: स्वभाव, चरित्र और मर्यादा का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 15: Character, Nature and Decorum.",
        "verses": [
          {
            "id": "cn-15-1",
            "verseNumber": 1,
            "sanskritText": "अनन्तपारं किल शब्दशास्त्रं स्वल्पं तथायुर्बहवश्च विघ्नाः |\nसारं ततो ग्राह्यमपास्य फल्गु हंसो यथा क्षीरमिवाम्बुमध्यात् || १५-१ ||",
            "sanskrit": "अनन्तपारं किल शब्दशास्त्रं स्वल्पं तथायुर्बहवश्च विघ्नाः |\nसारं ततो ग्राह्यमपास्य फल्गु हंसो यथा क्षीरमिवाम्बुमध्यात् || १५-१ ||",
            "transliteration": "anantapāraṁ kila śabdaśāstraṁ svalpaṁ tathāyurbahavaśca vighnāḥ |\nsāraṁ tato grāhyamapāsya phalgu haṁso yathā kṣīramivāmbumadhyāt || 15-1 ||",
            "translationHi": "शास्त्रों का कोई अंत नहीं है, विद्या असीम है, आयु बहुत थोड़ी है और विघ्न बहुत हैं। इसलिए जैसे हंस जल के बीच में से केवल दूध को ग्रहण कर लेता है, वैसे ही सारभूत तत्व को ग्रहण कर लेना चाहिए।",
            "hindiMeaning": "शास्त्रों का कोई अंत नहीं है, विद्या असीम है, आयु बहुत थोड़ी है और विघ्न बहुत हैं। इसलिए जैसे हंस जल के बीच में से केवल दूध को ग्रहण कर लेता है, वैसे ही सारभूत तत्व को ग्रहण कर लेना चाहिए।",
            "translationEn": "Scriptures are infinite, knowledge is boundless, life is short, and obstacles are many. Therefore, just as a swan takes only milk from a mixture of milk and water, one should extract the essential core of wisdom.",
            "englishMeaning": "Scriptures are infinite, knowledge is boundless, life is short, and obstacles are many. Therefore, just as a swan takes only milk from a mixture of milk and water, one should extract the essential core of wisdom.",
            "commentary": "ज्ञान की अगाधता में से 'हंस-वृत्ति' अपनाकर केवल सार को ग्रहण करने का महामंत्र।"
          }
        ]
      },
      {
        "id": "cn-ch-16",
        "chapterNumber": 16,
        "titleHi": "अध्याय १६: आत्म-निर्भरता और पुरुषार्थ",
        "titleEn": "Chapter 16: Self-Reliance and Enterprise",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय १६: आत्म-निर्भरता और पुरुषार्थ का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 16: Self-Reliance and Enterprise.",
        "verses": [
          {
            "id": "cn-16-1",
            "verseNumber": 1,
            "sanskritText": "सुभाषितेन गीतेन युवतीनां च लीलया |\nमनो न भिद्यते यस्य स वै मुक्तोऽथवा पशुः || १६-१ ||",
            "sanskrit": "सुभाषितेन गीतेन युवतीनां च लीलया |\nमनो न भिद्यते यस्य स वै मुक्तोऽथवा पशुः || १६-१ ||",
            "transliteration": "subhāṣitena gītena yuvatīnāṁ ca līlayā |\nmano na bhidyate yasya sa vai mukto'thavā paśuḥ || 16-1 ||",
            "translationHi": "सुंदर वचनों, मधुर संगीत और प्रकृति के सौन्दर्य से जिसका मन द्रवित नहीं होता, वह पुरुष या तो पूर्ण वीतराग मुक्त पुरुष है अथवा पशु समान है।",
            "hindiMeaning": "सुंदर वचनों, मधुर संगीत और प्रकृति के सौन्दर्य से जिसका मन द्रवित नहीं होता, वह पुरुष या तो पूर्ण वीतराग मुक्त पुरुष है अथवा पशु समान है।",
            "translationEn": "One whose heart is not stirred by noble verse, sweet music, and natural beauty is either an enlightened, detached sage or a beast.",
            "englishMeaning": "One whose heart is not stirred by noble verse, sweet music, and natural beauty is either an enlightened, detached sage or a beast.",
            "commentary": "संवेदनशील हृदय और कला के प्रति अनुराग मनुष्यता का लक्षण है।"
          }
        ]
      },
      {
        "id": "cn-ch-17",
        "chapterNumber": 17,
        "titleHi": "अध्याय १७: परम सत्य और ईश्वर निष्ठा",
        "titleEn": "Chapter 17: Supreme Truth and Devotion",
        "summaryHi": "आचार्य चाणक्य द्वारा उपदिष्ट अध्याय १७: परम सत्य और ईश्वर निष्ठा का सारगर्भित नीति उपदेश।",
        "summaryEn": "Timeless strategic and ethical guidance from Chapter 17: Supreme Truth and Devotion.",
        "verses": [
          {
            "id": "cn-17-1",
            "verseNumber": 1,
            "sanskritText": "पुस्तकस्था तु या विद्या परहस्तगतं धनम् |\nकार्यकाले समुत्पन्ने न सा विद्या न तद्धनम् || १७-१ ||",
            "sanskrit": "पुस्तकस्था तु या विद्या परहस्तगतं धनम् |\nकार्यकाले समुत्पन्ने न सा विद्या न तद्धनम् || १७-१ ||",
            "transliteration": "pustakasthā tu yā vidyā parahastagataṁ dhanam |\nkāryakāle samutpanne na sā vidyā na taddhanam || 17-1 ||",
            "translationHi": "जो विद्या केवल पुस्तकों में ही रखी रह जाए और जो धन दूसरों के हाथ में चला गया हो—वह समय पड़ने पर न तो विद्या काम आती है और न वह धन काम आता है।",
            "hindiMeaning": "जो विद्या केवल पुस्तकों में ही रखी रह जाए और जो धन दूसरों के हाथ में चला गया हो—वह समय पड़ने पर न तो विद्या काम आती है और न वह धन काम आता है।",
            "translationEn": "Knowledge that remains confined to books and wealth that has passed into another's hands—neither that knowledge nor that wealth is of any use when the hour of need arrives.",
            "englishMeaning": "Knowledge that remains confined to books and wealth that has passed into another's hands—neither that knowledge nor that wealth is of any use when the hour of need arrives.",
            "commentary": "चाणक्य नीति का अमर सूत्र: ज्ञान वही जो कंठस्थ और आचरण में हो, और धन वही जो अपने नियंत्रण में हो।"
          }
        ]
      }
    ]
  }
};
