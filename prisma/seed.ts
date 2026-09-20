import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding Hindu Dharma Digital Platform Database ---');

  // 1. Users & Roles
  const passwordHash = await bcrypt.hash('Sanatan@108', 10);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@sanatan.org' },
    update: {},
    create: {
      email: 'superadmin@sanatan.org',
      name: 'Acharya Vidyadhar (Super Admin)',
      passwordHash,
      role: 'SUPER_ADMIN',
      preferredLocale: 'en',
    },
  });

  const contentAdmin = await prisma.user.upsert({
    where: { email: 'contentadmin@sanatan.org' },
    update: {},
    create: {
      email: 'contentadmin@sanatan.org',
      name: 'Dr. Raghavan Shastri (Content Admin)',
      passwordHash,
      role: 'CONTENT_ADMIN',
      preferredLocale: 'hi',
    },
  });

  const storeAdmin = await prisma.user.upsert({
    where: { email: 'storeadmin@sanatan.org' },
    update: {},
    create: {
      email: 'storeadmin@sanatan.org',
      name: 'Govind Das (Store Admin)',
      passwordHash,
      role: 'STORE_ADMIN',
      preferredLocale: 'en',
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: 'editor@sanatan.org' },
    update: {},
    create: {
      email: 'editor@sanatan.org',
      name: 'Pooja Sharma (Senior Editor)',
      passwordHash,
      role: 'EDITOR',
      preferredLocale: 'en',
    },
  });

  const author = await prisma.user.upsert({
    where: { email: 'author@sanatan.org' },
    update: {},
    create: {
      email: 'author@sanatan.org',
      name: 'Pandit Devavrata (Dharma Author)',
      passwordHash,
      role: 'AUTHOR',
      preferredLocale: 'sa',
    },
  });

  const seeker = await prisma.user.upsert({
    where: { email: 'seeker@sanatan.org' },
    update: {},
    create: {
      email: 'seeker@sanatan.org',
      name: 'Aditi Verma (Spiritual Seeker)',
      passwordHash,
      role: 'USER',
      preferredLocale: 'en',
    },
  });

  console.log('✅ Users & Roles Seeded (Default password: Sanatan@108)');

  // 2. Scripture Collections
  const gitaCollection = await prisma.scriptureCollection.upsert({
    where: { slug: 'smriti-shastras' },
    update: {},
    create: {
      slug: 'smriti-shastras',
      titleEn: 'Smriti & Itihasa',
      titleHi: 'स्मृति एवं इतिहास',
      titleSa: 'स्मृति-इतिहास-प्रस्थानम्',
      description: 'Sacred remembered texts including Bhagavad Gita, Mahabharata, Ramayana, and Puranas.',
      order: 1,
    },
  });

  const upanishadCollection = await prisma.scriptureCollection.upsert({
    where: { slug: 'shruti-upanishads' },
    update: {},
    create: {
      slug: 'shruti-upanishads',
      titleEn: 'Shruti & Upanishads',
      titleHi: 'श्रुति एवं उपनिषद',
      titleSa: 'श्रुति-उपनिषत्-प्रस्थानम्',
      description: 'The supreme revelatory texts and philosophic culmination of the Vedas (Vedanta).',
      order: 2,
    },
  });

  // 3. Scriptures & Chapters
  const gita = await prisma.scripture.upsert({
    where: { slug: 'bhagavad-gita' },
    update: {},
    create: {
      collectionId: gitaCollection.id,
      slug: 'bhagavad-gita',
      titleEn: 'Srimad Bhagavad Gita',
      titleHi: 'श्रीमद्भगवद्गीता',
      titleSa: 'श्रीमद्भगवद्गीता',
      category: 'Gita',
      description: 'The 700-verse philosophical conversation between Bhagavan Shri Krishna and Arjuna on the battlefield of Kurukshetra, illuminating Karma, Bhakti, and Jnana Yoga.',
      provenance: 'Mahabharata, Bhishma Parva, Chapters 23-40. Vedavyasa tradition.',
      rightsStatus: 'PUBLIC_DOMAIN',
      published: true,
    },
  });

  const ishaUpanishad = await prisma.scripture.upsert({
    where: { slug: 'isha-upanishad' },
    update: {},
    create: {
      collectionId: upanishadCollection.id,
      slug: 'isha-upanishad',
      titleEn: 'Isha Upanishad (Ishavasya)',
      titleHi: 'ईशावास्योपनिषद्',
      titleSa: 'ईशावास्योपनिषत्',
      category: 'Upanishad',
      description: 'One of the primary mukhya Upanishads belonging to the Shukla Yajurveda, teaching non-attachment, divine omnipresence, and transcendental oneness.',
      provenance: 'Shukla Yajurveda, Kanva/Madhyandina recension.',
      rightsStatus: 'PUBLIC_DOMAIN',
      published: true,
    },
  });

  // 4. Chapters & Verses for Gita
  const gitaCh2 = await prisma.bookChapter.upsert({
    where: { id: 'gita-ch-2' },
    update: {},
    create: {
      id: 'gita-ch-2',
      scriptureId: gita.id,
      chapterNumber: 2,
      titleEn: 'Sankhya Yoga (The Yoga of Knowledge)',
      titleHi: 'सांख्य योग (ज्ञान एवं कर्म का स्वरूप)',
      titleSa: 'सांख्ययोगः',
      summaryEn: 'Lord Krishna instructs Arjuna on the eternal, indestructible nature of the Atman and introduces the timeless doctrine of Nishkama Karma.',
      summaryHi: 'भगवान श्रीकृष्ण अर्जुन को आत्मा की अमरता और निष्काम कर्मयोग का दिव्य उपदेश प्रदान करते हैं।',
      versesCount: 4,
    },
  });

  // Gita Verses
  const versesData = [
    {
      id: 'gita-2-47',
      chapterId: gitaCh2.id,
      verseNumber: 47,
      sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      transliteration: 'karmaṇyevādhikāraste mā phaleṣu kadācana |\nmā karmaphalaheturbhūrmā te saṅgo\'stvakarmaṇi ||',
      hindiMeaning: 'तुम्हारा अधिकार केवल कर्म करने में ही है, उसके फलों में कभी नहीं। इसलिए तुम कर्मों के फल के हेतु मत बनो और न ही तुम्हारी अकर्मण्यता (कर्म न करने) में आसक्ति हो।',
      englishMeaning: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.',
      wordByWord: JSON.stringify({
        'कर्मणि': 'in duty / action',
        'एव': 'only',
        'अधिकारः': 'right / entitlement',
        'ते': 'your',
        'मा': 'not / never',
        'फलेषु': 'in results / fruits',
        'कदाचन': 'at any time',
        'अकर्मणि': 'in inaction',
      }),
      commentary: 'Adi Shankaracharya Bhashya: The seeker must purify the chitta through detached duty without egoic craving for selfish outcomes, achieving inner stillness.',
    },
    {
      id: 'gita-2-20',
      chapterId: gitaCh2.id,
      verseNumber: 20,
      sanskrit: 'न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥',
      transliteration: 'na jāyate mriyate vā kadācin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato\'yaṁ purāṇo\nna hanyate hanyamāne śarīre ||',
      hindiMeaning: 'यह आत्मा न कभी जन्म लेती है और न कभी मरती है; न यह उत्पन्न होकर फिर होने वाली है। यह अजन्मा, नित्य, सनातन और पुरातन है; शरीर के मारे जाने पर भी यह नहीं मारी जाती।',
      englishMeaning: 'For the soul there is never birth nor death at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing and primeval. It is not slain when the body is slain.',
      wordByWord: JSON.stringify({
        'न': 'neither',
        'जायते': 'is born',
        'म्रियते': 'dies',
        'कदाचित्': 'at any time',
        'अजः': 'unborn',
        'नित्यः': 'eternal',
        'शाश्वतः': 'everlasting',
        'पुराणः': 'primeval',
      }),
      commentary: 'Ramanuja Bhashya: The essential conscious self is distinct from mutable physical elements, existing perpetually in its transcendental constitutional nature.',
    },
    {
      id: 'gita-2-22',
      chapterId: gitaCh2.id,
      verseNumber: 22,
      sanskrit: 'वासांसि जीर्णानि यथा विहाय\nनवानि गृह्णाति नरोऽपराणि।\nतथा शरीराणि विहाय जीर्णा-\nन्यन्यानि संयाति नवानि देही॥',
      transliteration: 'vāsāṁsi jīrṇāni yathā vihāya\nnavāni gṛhṇāti naro\'parāṇi |\ntathā śarīrāṇi vihāya jīrṇā-\nnyanyāni saṁyāti navāni dehī ||',
      hindiMeaning: 'जैसे मनुष्य पुराने वस्त्रों को त्यागकर दूसरे नए वस्त्र धारण कर लेता है, वैसे ही जीवात्मा पुराने शरीरों को छोड़कर दूसरे नए शरीरों को प्राप्त होती है।',
      englishMeaning: 'As a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones.',
      wordByWord: JSON.stringify({
        'वासांसि': 'garments',
        'जीर्णानि': 'worn-out',
        'यथा': 'just as',
        'विहाय': 'giving up',
        'नवानि': 'new ones',
        'गृह्णाति': 'accepts',
        'देही': 'the embodied soul',
      }),
      commentary: 'The transmigratory journey of the jiva reflects cosmic renewal, reassuring the aspirant beyond temporary physical mortality.',
    },
    {
      id: 'gita-2-70',
      chapterId: gitaCh2.id,
      verseNumber: 70,
      sanskrit: 'आपूर्यमाणमचलप्रतिष्ठं\nसमुद्रमापः प्रविशन्ति यद्वत्।\nतद्वत्कामा यं प्रविशन्ति सर्वे\nस शान्तिमाप्नोति न कामकामी॥',
      transliteration: 'āpūryamāṇamacalapratiṣṭhaṁ\nsamudramāpaḥ praviśanti yadvat |\ntadvatkāmā yaṁ praviśanti sarve\nsa śāntimāpnoti na kāmakāmī ||',
      hindiMeaning: 'जैसे सब ओर से जल से परिपूर्ण और अचल प्रतिष्ठा वाले समुद्र में नदियाँ आकर विलीन हो जाती हैं, उसी प्रकार जिस संयमी पुरुष में सब भोग बिना किसी विकार के समा जाते हैं, वही परम शान्ति को प्राप्त होता है, भोगों की कामना करने वाला नहीं।',
      englishMeaning: 'A person who is not disturbed by the incessant flow of desires—that enter like rivers into the ocean, which is ever being filled but is always still—can alone achieve peace, and not the person who strives to satisfy such desires.',
      wordByWord: JSON.stringify({
        'आपूर्यमाणम्': 'ever full',
        'अचलप्रतिष्ठम्': 'steadfastly established',
        'समुद्रम्': 'into the ocean',
        'शान्तिम्': 'peace',
        'आप्रेति': 'attains',
      }),
      commentary: 'Describes the serene state of Sthitaprajna (one of steady wisdom), unperturbed by worldly sensory ripples.',
    },
  ];

  for (const v of versesData) {
    await prisma.bookVerse.upsert({
      where: { id: v.id },
      update: {},
      create: v,
    });
  }

  // 5. Standalone Canonical Shlokas
  const shlokasData = [
    {
      slug: 'gayatri-mantra',
      scriptureId: null,
      titleEn: 'The Supreme Gayatri Mantra',
      titleHi: 'परम पावन गायत्री महामन्त्र',
      titleSa: 'सावित्री गायत्री महामन्त्रः',
      sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
      transliteration: 'oṁ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṁ\nbhargo devasya dhīmahi dhiyo yo naḥ pracodayāt ||',
      hindiMeaning: 'उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा को हम अन्तःकरण में धारण करें। वह परमात्मा हमारी बुद्धि को सन्मार्ग में प्रेरित करे।',
      englishMeaning: 'We meditate upon the supreme effulgence of the Divine Sun (Savitur), the creator of the three planes of existence. May that Supreme Light inspire and illuminate our intellect and intuition.',
      sourceChapter: 'Rigveda Mandala 3',
      sourceVerse: 'Sukta 62, Verse 10',
      isPopular: true,
      tags: 'Veda, Gayatri, Illumination, Meditation, Daily Japa',
    },
    {
      slug: 'mahamrityunjaya-mantra',
      scriptureId: null,
      titleEn: 'Mahamrityunjaya Mantra (Conqueror of Death)',
      titleHi: 'महामृत्युंजय महामन्त्र (अमृत संजीवनी)',
      titleSa: 'महामृत्युञ्जय मन्त्रः',
      sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
      transliteration: 'oṁ tryambakaṁ yajāmahe sugandhiṁ puṣṭivardhanam |\nurvārukamiva bandhanānmṛtyormukṣīya māmṛtāt ||',
      hindiMeaning: 'हम त्रिनेत्रधारी भगवान शिव की आराधना करते हैं, जो सुगंधित हैं और सभी प्राणियों का पोषण करते हैं। जैसे पका हुआ खरबूजा बेल के बंधन से मुक्त हो जाता है, वैसे ही हम मृत्यु और संसार के बंधनों से मुक्त होकर अमृतत्व को प्राप्त हों।',
      englishMeaning: 'We worship the Three-Eyed Lord Shiva, who is fragrant and nourishes all beings. As a ripe cucumber is liberated from its stalk, may we be liberated from the bondage of mortality into immortality.',
      sourceChapter: 'Rigveda Mandala 7',
      sourceVerse: 'Sukta 59, Verse 12',
      isPopular: true,
      tags: 'Shiva, Healing, Immortality, Protection, Rigveda',
    },
    {
      slug: 'shanti-mantra-purnamadah',
      scriptureId: ishaUpanishad.id,
      titleEn: 'Peace Invocation: Om Purnamadah',
      titleHi: 'शांति पाठ: ॐ पूर्णमदः पूर्णमिदम्',
      titleSa: 'ईशावास्य शान्तिमन्त्रः',
      sanskrit: 'ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते।\nपूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते॥\nॐ शान्तिः शान्तिः शान्तिः॥',
      transliteration: 'oṁ pūrṇamadaḥ pūrṇamidaṁ pūrṇātpūrṇamudacyate |\npūrṇasya pūrṇamādāya pūrṇamevāvaśiṣyate ||\noṁ śāntiḥ śāntiḥ śāntiḥ ||',
      hindiMeaning: 'वह परब्रह्म पूर्ण है और यह जगत भी पूर्ण है। पूर्ण से ही पूर्ण की उत्पत्ति होती है। पूर्ण में से पूर्ण को निकाल लेने पर भी पूर्ण ही शेष बचता है।',
      englishMeaning: 'That transcendent Reality is Infinite (Purna), and this relative universe is Infinite. From Infinity, Infinity manifests. When Infinity is taken from Infinity, Infinity alone remains.',
      sourceChapter: 'Brihadaranyaka & Isha Upanishad',
      sourceVerse: 'Shanti Patha',
      isPopular: true,
      tags: 'Vedanta, Peace, Infinity, Upanishad',
    },
  ];

  for (const s of shlokasData) {
    await prisma.shloka.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }

  // 6. Deities
  const deitiesData = [
    {
      slug: 'bhagavan-shiva',
      nameEn: 'Bhagavan Shiva (Mahadeva)',
      nameHi: 'भगवान शिव (महादेव)',
      nameSa: 'श्रीमहादेवः शिवः',
      mantra: 'ॐ नमः शिवाय (oṁ namaḥ śivāya)',
      iconography: 'Trishula (Trident), Damaru (Drum), Crescent Moon on Jata, Crescent Ganga, Snake Vasuki, Third Eye, Nilakantha (Blue Throat).',
      significanceEn: 'The auspicious transformer and sovereign ascetic of the universe; embodiment of pure consciousness, supreme stillness, and infinite compassion.',
      significanceHi: 'कल्याणकारी, संहारक एवं परम वैरागी देव; सच्चिदानन्द स्वरूप, असीम करुणा एवं ध्यानावस्था के अधिष्ठाता।',
      significanceSa: 'शान्तं शाश्वतमप्रमेयमनघं निर्वाणशान्तिप्रदम्।',
      storyEn: 'Lord Shiva consumed the Halahala poison during the churning of the cosmic ocean (Samudra Manthan) to save all creation, retaining it in His throat and becoming Nilakantha.',
      storyHi: 'समुद्र मंथन के समय समस्त संसार की रक्षा हेतु भगवान शिव ने हलाहल विष का पान किया और नीलकंठ कहलाए।',
      imageUrl: '/images/deities/shiva.jpg',
      popularTemples: JSON.stringify(['Kashi Vishwanath', 'Kedarnath', 'Somnath', 'Mahakaleshwar', 'Ramanathaswamy']),
      festivals: JSON.stringify(['Maha Shivaratri', 'Shravana Somvar', 'Pradosham']),
      scripturalRefs: JSON.stringify(['Shiva Purana', 'Shvetashvatara Upanishad', 'Yajurveda Rudradhyaya']),
    },
    {
      slug: 'bhagavan-shri-krishna',
      nameEn: 'Bhagavan Shri Krishna',
      nameHi: 'भगवान श्रीकृष्ण',
      nameSa: 'श्रीकृष्णः परब्रह्म',
      mantra: 'ॐ नमो भगवते वासुदेवाय (oṁ namo bhagavate vāsudevāya)',
      iconography: 'Peacock feather crown (Mor Pankh), Flute (Murali), Vaijayanti Mala, Yellow Silk Garments (Pitambara), Lotus Eyes.',
      significanceEn: 'The supreme Purna-Avatara of Lord Vishnu; divine teacher of the Bhagavad Gita, embodiment of supreme love, wisdom, dharma, and joy.',
      significanceHi: 'भगवान विष्णु के पूर्ण अवतार; श्रीमद्भगवद्गीता के दिव्य प्रदाता, धर्म, प्रेम एवं ज्ञान के अधिष्ठाता।',
      significanceSa: 'कृष्णस्तु भगवान् स्वयम्।',
      storyEn: 'Descended in Mathura to destroy tyranny and establish eternal Dharma, guiding the Pandavas and delivering the eternal wisdom of the Gita.',
      storyHi: 'द्वापर युग में अधर्म का नाश करने तथा धर्म संस्थापना के लिए अवतरित हुए और कुरुक्षेत्र में गीता ज्ञान दिया।',
      imageUrl: '/images/deities/krishna.jpg',
      popularTemples: JSON.stringify(['Banke Bihari Mandir Vrindavan', 'Dwarkadhish Temple Gujarat', 'Jagannath Temple Puri', 'Guruvayur Temple Kerala']),
      festivals: JSON.stringify(['Janmashtami', 'Radhashtami', 'Gita Jayanti']),
      scripturalRefs: JSON.stringify(['Srimad Bhagavatam', 'Bhagavad Gita', 'Mahabharata']),
    },
    {
      slug: 'devi-durga',
      nameEn: 'Devi Durga (Maha Shakti)',
      nameHi: 'मां दुर्गा (आदिशक्ति)',
      nameSa: 'भगवती दुर्गा आदिशक्तिः',
      mantra: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे (oṁ aiṁ hrīṁ klīṁ cāmuṇḍāyai vicce)',
      iconography: 'Riding a lion, eight or ten arms holding divine weapons bestowed by all devas, radiating supreme protective radiance.',
      significanceEn: 'The primordial creative cosmic power (Adi Parashakti) and fierce protectress of righteous order, annihilating evil forces.',
      significanceHi: 'सृष्टि की आद्या शक्ति एवं धर्मरक्षिका भगवती, जो अज्ञान और आसुरी प्रवृत्तियों का संहार करती हैं।',
      significanceSa: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।',
      storyEn: 'Formed from the united luminous energy of the gods to defeat Mahishasura, demonstrating that truth and righteousness transcend all oppressive forces.',
      storyHi: 'महिषासुर के अत्याचारों से देवताओं की रक्षा हेतु प्रकट हुईं और नौ दिनों के संग्राम के पश्चात उसका वध किया।',
      imageUrl: '/images/deities/durga.jpg',
      popularTemples: JSON.stringify(['Vaishno Devi', 'Kamakhya Temple', 'Dakshineswar Kali Temple', 'Meenakshi Amman']),
      festivals: JSON.stringify(['Sharad Navratri', 'Chaitra Navratri', 'Durga Puja']),
      scripturalRefs: JSON.stringify(['Devi Mahatmyam', 'Devi Bhagavata Purana', 'Rigveda Devi Suktam']),
    },
  ];

  for (const d of deitiesData) {
    await prisma.deity.upsert({
      where: { slug: d.slug },
      update: {},
      create: d,
    });
  }

  // 7. Temples
  const templesData = [
    {
      slug: 'kashi-vishwanath',
      nameEn: 'Kashi Vishwanath Temple',
      nameHi: 'काशी विश्वनाथ मन्दिर',
      nameSa: 'काशीविश्वनाथमन्दिरम्',
      deityName: 'Lord Shiva',
      state: 'Uttar Pradesh',
      city: 'Varanasi',
      country: 'Bharat (India)',
      historyEn: 'Standing on the sacred western bank of the holy Ganga, Kashi is considered one of the oldest living cities in human civilization and the spiritual capital of Sanatan Dharma.',
      historyHi: 'पवित्र माँ गंगा के पावन तट पर स्थित यह ज्योतिर्लिंग सनातन धर्म का परम जाग्रत केंद्र है।',
      timings: '03:00 AM - 11:00 PM (Mangala Aarti to Shayan Aarti)',
      significance: 'One of the twelve supreme Jyotirlingas, granting liberation (Moksha).',
      imageUrl: '/images/temples/kashi.jpg',
      officialUrl: 'https://shrikashivishwanath.org',
    },
    {
      slug: 'kedarnath-dham',
      nameEn: 'Kedarnath Temple',
      nameHi: 'केदारनाथ मन्दिर',
      nameSa: 'केदारनाथधाम',
      deityName: 'Lord Shiva',
      state: 'Uttarakhand',
      city: 'Rudraprayag (Himalayas)',
      country: 'Bharat (India)',
      historyEn: 'Nestled amidst the snowy Garhwal Himalayan ranges near the Mandakini River, built originally by the Pandavas and revitalized by Adi Shankaracharya.',
      historyHi: 'मंदाकिनी नदी के समीप हिमालय की धवल चोटियों के मध्य स्थित यह धाम पंच केदार और चार धाम में अग्रगण्य है।',
      timings: '04:00 AM - 09:00 PM (Open May to November)',
      significance: 'Northernmost Jyotirlinga, profound pilgrimage of tapas and surrender.',
      imageUrl: '/images/temples/kedarnath.jpg',
      officialUrl: 'https://badrinath-kedarnath.gov.in',
    },
    {
      slug: 'tirupati-balaji',
      nameEn: 'Shri Venkateswara Swamy Temple',
      nameHi: 'श्री तिरुपति वेंकटेश्वर स्वामी मन्दिर',
      nameSa: 'श्रीवेङ्कटेश्वरमन्दिरम् (तिरुपतिः)',
      deityName: 'Lord Venkateswara (Vishnu)',
      state: 'Andhra Pradesh',
      city: 'Tirupati (Tirumala)',
      country: 'Bharat (India)',
      historyEn: 'Situated on the Venkatadri hill of the sacred Seshachalam range, the temple preserves thousands of years of continuous devotional service (Kalyug Avatara).',
      historyHi: 'शेषाचलम पर्वतमाला पर स्थित यह दिव्य देवालय कलियुग में प्रत्यक्ष फलदाता भगवान श्रीनिवास का पावन धाम है।',
      timings: '02:30 AM - 01:30 AM (Suprabhatam to Ekantha Seva)',
      significance: 'Known as the Kaliyuga Vaikuntha where Lord Vishnu protects devotees.',
      imageUrl: '/images/temples/tirupati.jpg',
      officialUrl: 'https://tirumala.org',
    },
  ];

  for (const t of templesData) {
    await prisma.temple.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
  }

  // 8. Festivals
  const festivalsData = [
    {
      slug: 'maha-shivaratri',
      nameEn: 'Maha Shivaratri',
      nameHi: 'महाशिवरात्रि',
      nameSa: 'महाशिवरात्रिपर्व',
      lunarMonth: 'Phalguna / Magha',
      tithi: 'Krishna Paksha Chaturdashi',
      descriptionEn: 'The supreme night of Lord Shiva celebrating the divine union of Shiva and Parvati and the manifestation of the infinite Lingodbhava pillar of light.',
      descriptionHi: 'भगवान शिव एवं माता पार्वती के दिव्य विवाह तथा ज्योतिर्लिंग प्राकट्य का परम पावन रात्रि महापर्व।',
      pujaVidhiEn: 'Night-long vigil (Jagaran), continuous Abhishekam with Bilva leaves, milk, honey, Ganga water, and chanting of Sri Rudram.',
      pujaVidhiHi: 'रात्रि के चारों प्रहर में चार बार रुद्राभिषेक, बेलपत्र समर्पण एवं महामृत्युंजय मन्त्र का अखण्ड जप।',
      associatedDeity: 'Lord Shiva',
      isMajor: true,
      imageUrl: '/images/festivals/shivaratri.jpg',
    },
    {
      slug: 'deepavali',
      nameEn: 'Deepavali (Diwali)',
      nameHi: 'दीपावली (दिवाली)',
      nameSa: 'दीपावलीमहोत्सवः',
      lunarMonth: 'Kartika',
      tithi: 'Amavasya',
      descriptionEn: 'The festival of divine lights celebrating the return of Lord Rama to Ayodhya and the worship of Goddess Mahalakshmi for spiritual and material auspiciousness.',
      descriptionHi: 'भगवान श्रीराम के चौदह वर्ष पश्चात अयोध्या प्रत्यागमन और मां महालक्ष्मी के आह्वान का प्रकाश पर्व।',
      pujaVidhiEn: 'Evening Lakshmi-Ganesha puja, lighting earthen ghee lamps (diyas), drawing rangoli, charity, and sharing prasad.',
      pujaVidhiHi: 'सायंकाल शुभ मुहूर्त में श्री गणेश-लक्ष्मी पूजन, दीप प्रज्वलन, मिष्ठान्न भोग एवं दीन-दुखियों को दान।',
      associatedDeity: 'Maha Lakshmi & Shri Rama',
      isMajor: true,
      imageUrl: '/images/festivals/diwali.jpg',
    },
    {
      slug: 'krishna-janmashtami',
      nameEn: 'Krishna Janmashtami',
      nameHi: 'श्रीकृष्ण जन्माष्टमी',
      nameSa: 'श्रीकृष्णजन्माष्टमी',
      lunarMonth: 'Bhadrapada',
      tithi: 'Krishna Paksha Ashtami (Rohini Nakshatra)',
      descriptionEn: 'Celebrating the divine birth of Bhagavan Shri Krishna at midnight to dispel the darkness of ignorance and protect righteousness.',
      descriptionHi: 'मध्यरात्रि में भगवान श्रीकृष्ण के पावन अवतरण का महापर्व, व्रत, कीर्तन एवं अभिषेक।',
      pujaVidhiEn: 'Nirjala fasting until midnight, singing Bhajans, Panchamrit Abhishekam of Bal Gopal, offering Makhan Mishri.',
      pujaVidhiHi: 'दिनभर उपवास, मध्यरात्रि में शंख ध्वनि के साथ कान्हा का पंचामृत अभिषेक एवं माखन-मिश्री का भोग।',
      associatedDeity: 'Bhagavan Shri Krishna',
      isMajor: true,
      imageUrl: '/images/festivals/janmashtami.jpg',
    },
  ];

  for (const f of festivalsData) {
    await prisma.festival.upsert({
      where: { slug: f.slug },
      update: {},
      create: f,
    });
  }

  // 9. CMS Articles
  const catPhilosophy = await prisma.category.upsert({
    where: { slug: 'philosophy-darshana' },
    update: {},
    create: {
      slug: 'philosophy-darshana',
      nameEn: 'Philosophy & Darshana',
      nameHi: 'दर्शन एवं तत्वज्ञान',
      nameSa: 'दर्शनम्',
      description: 'Foundational philosophical concepts of Sanatan Dharma.',
    },
  });

  await prisma.post.upsert({
    where: { slug: 'four-purusharthas' },
    update: {},
    create: {
      slug: 'four-purusharthas',
      titleEn: 'The Four Purusharthas: Dharma, Artha, Kama, and Moksha',
      titleHi: 'मानव जीवन के चार पुरुषार्थ: धर्म, अर्थ, काम और मोक्ष',
      titleSa: 'चतुर्विधपुरुषार्थाः : धर्मार्थकाममोक्षाः',
      summaryEn: 'An in-depth study of the holistic Vedic framework for balancing ethical duty, prosperity, desires, and ultimate spiritual liberation.',
      summaryHi: 'वैदिक दृष्टि से मानव जीवन को संतुलित एवं सार्थक बनाने वाले चार पुरुषार्थों का प्रामाणिक विवेचन।',
      summarySa: 'मानवजीवनस्य समग्रसाधनाय चतुर्विधपुरुषार्थानां शास्त्रीयं निरूपणम्।',
      contentEn: `Sanatan Dharma provides a comprehensively balanced worldview through the doctrine of the **Chaturvidha Purushartha**—the four foundational aims of human existence:

1. **Dharma (Righteous Order & Duty)**: The bedrock of existence that upholds moral harmony, truth, and individual duty in accordance with cosmic law (*Rta*).
2. **Artha (Honorable Prosperity)**: The acquisition of wealth and resources through pure, ethical means to support family, community, and dharma.
3. **Kama (Aesthetic & Emotional Joy)**: The noble enjoyment of legitimate desires, arts, cultural life, and loving relationships within the perimeter of Dharma.
4. **Moksha (Spiritual Emancipation)**: The ultimate summit of human destiny—transcending the cycle of Samsara to realize one's oneness with the Supreme Self (*Brahman*).

When Artha and Kama are guided by Dharma, they naturally ripen into the supreme nectar of Moksha.`,
      contentHi: `सनातन संस्कृति में जीवन को एकांगी न मानकर समग्र और पूर्ण रूप में देखा गया है। मानव जीवन के चार अनिवार्य उद्देश्य हैं:

१. **धर्म**: जीवन का आधार, जो सदाचार, कर्तव्य और सत्य की मर्यादा सुनिश्चित करता है।
२. **अर्थ**: धर्मानुकूल एवं सात्विक साधनों द्वारा भौतिक समृद्धि और समाजोपयोगी संपत्ति का उपार्जन।
३. **काम**: धर्म की मर्यादा में रहकर सात्विक सुख, कला, प्रेम और जीवन के आनंद का अनुभव।
४. **मोक्ष**: अज्ञान के बंधनों से मुक्त होकर परमानंद और आत्मसाक्षात्कार की स्थिति।

जब अर्थ और काम दोनों धर्म के रथ पर सवार होते हैं, तब वे व्यक्ति को सीधे मोक्ष के परम धाम तक पहुंचाते हैं।`,
      contentSa: `सनातनधर्मे मानवजीवनस्य परमं साफल्यं चतुर्विधपुरुषार्थसिद्धौ वर्तते। धर्मेणैव अर्थकामौ साधनीयौ, ताभ्यां च मोक्षपदं लभ्यते।`,
      authorId: author.id,
      categoryId: catPhilosophy.id,
      tags: 'Purushartha, Dharma, Karma, Moksha, Philosophy',
      status: 'PUBLISHED',
      isFeatured: true,
      seoTitleEn: 'The Four Purusharthas in Hindu Dharma: Complete Vedic Guide',
      seoDescEn: 'Understand Dharma, Artha, Kama, and Moksha from authentic Sanskrit scripture sources.',
      publishedAt: new Date(),
    },
  });

  // 10. E-Commerce Products
  const productsData = [
    {
      slug: 'bhagavad-gita-deluxe-gita-press',
      titleEn: 'Srimad Bhagavad Gita - Deluxe Gold Edition (Sanskrit + Hindi/English)',
      titleHi: 'श्रीमद्भगवद्गीता - विशिष्ट स्वर्ण संस्करण (मूल संस्कृत, अन्वय एवं भावार्थ)',
      titleSa: 'श्रीमद्भगवद्गीता विशिष्टसंस्करणम्',
      category: 'BOOKS',
      descriptionEn: 'Authentic canonical print of the complete 18 chapters of Srimad Bhagavad Gita with pristine Devanagari Sanskrit verses, roman transliteration, and authentic word-by-word meanings.',
      descriptionHi: '१८ अध्यायों की संपूर्ण श्रीमद्भगवद्गीता का शुद्ध देवनागरी मुद्रण, सटीक पदच्छेद एवं प्रामाणिक हिन्दी टीका सहित।',
      price: 499,
      mrp: 650,
      stock: 50,
      sku: 'BOOK-GITA-DLX-01',
      imageUrl: '/images/products/gita-book.jpg',
      isFeatured: true,
      specifications: JSON.stringify({
        Pages: 640,
        Binding: 'Deluxe Hardcover with Gold Foil',
        Publisher: 'Sanatan Dharma Canonical Press',
        Language: 'Sanskrit, Hindi & English',
      }),
    },
    {
      slug: 'panchmukhi-brass-shiva-lingam',
      titleEn: 'Panchmukhi Shiva Lingam Brass Murti with Jaladhari & Naag',
      titleHi: 'पंचमुखी शिवलिंग पीतल विग्रह (जलाधारी एवं नाग सहित)',
      titleSa: 'पञ्चमुखी शिवलिङ्ग-पित्तलप्रतिमा',
      category: 'IDOLS',
      descriptionEn: 'Sacred solid brass Panchamukhi Shiva Lingam representing Sadyojata, Vamadeva, Aghora, Tatpurusha, and Ishana aspects of Mahadeva, handcrafted by heritage temple sculptors.',
      descriptionHi: 'शुद्ध पीतल से निर्मित पंचमुखी शिवलिंग, जिसमें भगवान शिव के पांचों पावन स्वरूपों का दिव्य दर्शन है। नित्य अभिषेक हेतु श्रेष्ठ।',
      price: 1850,
      mrp: 2400,
      stock: 25,
      sku: 'IDOL-SHIVA-BRASS-05',
      imageUrl: '/images/products/shivalingam.jpg',
      isFeatured: true,
      specifications: JSON.stringify({
        Material: 'Pure Virgin Brass',
        Height: '5.5 Inches',
        Weight: '850 Grams',
        Craftsmanship: 'Traditional Handcrafted Temple Grade',
      }),
    },
    {
      slug: 'certified-five-mukhi-rudraksha-mala',
      titleEn: '108+1 Five-Mukhi Authentic Rudraksha Japa Mala (Lab Certified)',
      titleHi: '१०८+१ पंचमुखी प्रामाणिक रुद्राक्ष जप माला (प्रयोगशाला प्रमाणित)',
      titleSa: '१०८+१ पञ्चमुखीरुद्राक्षमाला',
      category: 'PUJA_ITEMS',
      descriptionEn: 'Natural, unpolished 5-Mukhi Rudraksha beads strung in pure red silk thread with traditional knots, ideal for daily Gayatri and Shiva mantra japa.',
      descriptionHi: 'हिमालयी वनों से प्राप्त शुद्ध पंचमुखी रुद्राक्ष के १०८ मनकों की पवित्र जप माला। प्रत्येक मनके के बीच शास्त्रीय गांठ।',
      price: 699,
      mrp: 999,
      stock: 100,
      sku: 'PUJA-RUDRAKSHA-108',
      imageUrl: '/images/products/rudraksha-mala.jpg',
      isFeatured: true,
      specifications: JSON.stringify({
        BeadSize: '8 mm',
        BeadCount: '108 + 1 Meru Bead',
        Origin: 'Nepal / Himalayan Terai',
        Certification: 'Lab Certified 100% Natural',
      }),
    },
  ];

  for (const p of productsData) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  console.log('✅ Scriptures, Verses, Shlokas, Deities, Temples, Festivals & Products Seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
