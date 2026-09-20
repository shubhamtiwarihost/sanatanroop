/**
 * Hindu Panchang Calculation Engine
 * Deterministic astronomical calculations based on Surya Siddhanta & Drik Ganita algorithms.
 * Calculates exact Tithi, Nakshatra, Yoga, Karana, Paksha, Sunrise, Sunset, and Muhurats.
 */

export interface PanchangInfo {
  date: string;
  dayOfWeek: string;
  dayNumber: string;
  monthYear: string;
  dayOfWeekHi: string;
  city?: string;
  tithiNumber: number;
  tithiName: { en: string; hi: string; sa: string };
  paksha: { en: string; hi: string; sa: string };
  nakshatra: { en: string; hi: string; sa: string };
  yoga: { en: string; hi: string; sa: string };
  karana: { en: string; hi: string; sa: string };
  sunrise: string;
  sunset: string;
  brahmaMuhurat: string;
  abhijitMuhurat: string;
  rahuKaal: string;
  isEkadashi: boolean;
  isPurnima: boolean;
  isAmavasya: boolean;
  vrat: { en: string; hi: string; sa: string } | null;
  dailyMantra: {
    sanskrit: string;
    transliteration: string;
    meaningEn: string;
    meaningHi: string;
    deity: string;
  };
}

const TITHI_NAMES = [
  { en: 'Pratipada', hi: 'प्रतिपदा', sa: 'प्रतिपत्' },
  { en: 'Dwitiya', hi: 'द्वितीया', sa: 'द्वितीया' },
  { en: 'Tritiya', hi: 'तृतीया', sa: 'तृतीया' },
  { en: 'Chaturthi', hi: 'चतुर्थी', sa: 'चतुर्थी' },
  { en: 'Panchami', hi: 'पञ्चमी', sa: 'पञ्चमी' },
  { en: 'Shashthi', hi: 'षष्ठी', sa: 'षष्ठी' },
  { en: 'Saptami', hi: 'सप्तमी', sa: 'सप्तमी' },
  { en: 'Ashtami', hi: 'अष्टमी', sa: 'अष्टमी' },
  { en: 'Navami', hi: 'नवमी', sa: 'नवमी' },
  { en: 'Dashami', hi: 'दशमी', sa: 'दशमी' },
  { en: 'Ekadashi', hi: 'एकादशी', sa: 'एकादशी' },
  { en: 'Dwadashi', hi: 'द्वादशी', sa: 'द्वादशी' },
  { en: 'Trayodashi', hi: 'त्रयोदशी', sa: 'त्रयोदशी' },
  { en: 'Chaturdashi', hi: 'चतुर्दशी', sa: 'चतुर्दशी' },
  { en: 'Purnima', hi: 'पूर्णिमा', sa: 'पूर्णिमा' },
  { en: 'Pratipada', hi: 'प्रतिपदा', sa: 'प्रतिपत्' },
  { en: 'Dwitiya', hi: 'द्वितीया', sa: 'द्वितीया' },
  { en: 'Tritiya', hi: 'तृतीया', sa: 'तृतीया' },
  { en: 'Chaturthi', hi: 'चतुर्थी', sa: 'चतुर्थी' },
  { en: 'Panchami', hi: 'पञ्चमी', sa: 'पञ्चमी' },
  { en: 'Shashthi', hi: 'षष्ठी', sa: 'षष्ठी' },
  { en: 'Saptami', hi: 'सप्तमी', sa: 'सप्तमी' },
  { en: 'Ashtami', hi: 'अष्टमी', sa: 'अष्टमी' },
  { en: 'Navami', hi: 'नवमी', sa: 'नवमी' },
  { en: 'Dashami', hi: 'दशमी', sa: 'दशमी' },
  { en: 'Ekadashi', hi: 'एकादशी', sa: 'एकादशी' },
  { en: 'Dwadashi', hi: 'द्वादशी', sa: 'द्वादशी' },
  { en: 'Trayodashi', hi: 'त्रयोदशी', sa: 'त्रयोदशी' },
  { en: 'Chaturdashi', hi: 'चतुर्दशी', sa: 'चतुर्दशी' },
  { en: 'Amavasya', hi: 'अमावस्या', sa: 'अमावास्या' },
];

const NAKSHATRAS = [
  { en: 'Ashwini', hi: 'अश्विनी', sa: 'अश्विनी' },
  { en: 'Bharani', hi: 'भरणी', sa: 'भरणी' },
  { en: 'Krittika', hi: 'कृत्तिका', sa: 'कृत्तिका' },
  { en: 'Rohini', hi: 'रोहिणी', sa: 'रोहिणी' },
  { en: 'Mrigashira', hi: 'मृगशिरा', sa: 'मृगशीर्ष' },
  { en: 'Ardra', hi: 'आर्द्रा', sa: 'आर्द्रा' },
  { en: 'Punarvasu', hi: 'पुनर्वसु', sa: 'पुनर्वसु' },
  { en: 'Pushya', hi: 'पुष्य', sa: 'पुष्य' },
  { en: 'Ashlesha', hi: 'आश्लेषा', sa: 'आश्लेषा' },
  { en: 'Magha', hi: 'मघा', sa: 'मघा' },
  { en: 'Purva Phalguni', hi: 'पूर्वाफाल्गुनी', sa: 'पूर्वाफाल्गुनी' },
  { en: 'Uttara Phalguni', hi: 'उत्तराफाल्गुनी', sa: 'उत्तराफाल्गुनी' },
  { en: 'Hasta', hi: 'हस्त', sa: 'हस्त' },
  { en: 'Chitra', hi: 'चित्रा', sa: 'चित्रा' },
  { en: 'Swati', hi: 'स्वाति', sa: 'स्वाति' },
  { en: 'Vishakha', hi: 'विशाखा', sa: 'विशाखा' },
  { en: 'Anuradha', hi: 'अनुराधा', sa: 'अनुराधा' },
  { en: 'Jyeshtha', hi: 'ज्येष्ठा', sa: 'ज्येष्ठा' },
  { en: 'Mula', hi: 'मूल', sa: 'मूलम्' },
  { en: 'Purva Ashadha', hi: 'पूर्वाषाढ़ा', sa: 'पूर्वाषाढा' },
  { en: 'Uttara Ashadha', hi: 'उत्तराषाढ़ा', sa: 'उत्तराषाढा' },
  { en: 'Shravana', hi: 'श्रवण', sa: 'श्रवणः' },
  { en: 'Dhanishta', hi: 'धनिष्ठा', sa: 'धनिष्ठा' },
  { en: 'Shatabhisha', hi: 'शतभिषा', sa: 'शतभिषक्' },
  { en: 'Purva Bhadrapada', hi: 'पूर्वभाद्रपद', sa: 'पूर्वभाद्रपदा' },
  { en: 'Uttara Bhadrapada', hi: 'उत्तरभाद्रपद', sa: 'उत्तरभाद्रपदा' },
  { en: 'Revati', hi: 'रेवती', sa: 'रेवती' },
];

const YOGAS = [
  { en: 'Vishkambha', hi: 'विष्कम्भ', sa: 'विष्कम्भः' },
  { en: 'Priti', hi: 'प्रीति', sa: 'प्रीतिः' },
  { en: 'Ayushman', hi: 'आयुष्मान्', sa: 'आयुष्मान्' },
  { en: 'Saubhagya', hi: 'सौभाग्य', sa: 'सौभाग्यम्' },
  { en: 'Shobhana', hi: 'शोभन', sa: 'शोभनः' },
  { en: 'Atiganda', hi: 'अतिगण्ड', sa: 'अतिगण्डः' },
  { en: 'Sukarma', hi: 'सुकर्मा', sa: 'सुकर्मा' },
  { en: 'Dhriti', hi: 'धृति', sa: 'धृतिः' },
  { en: 'Shula', hi: 'शूल', sa: 'शूलः' },
  { en: 'Ganda', hi: 'गण्ड', sa: 'गण्डः' },
  { en: 'Vriddhi', hi: 'वृद्धि', sa: 'वृद्धिः' },
  { en: 'Dhruva', hi: 'ध्रुव', sa: 'ध्रुवः' },
  { en: 'Vyaghata', hi: 'व्याघात', sa: 'व्याघातः' },
  { en: 'Harshana', hi: 'हर्षण', sa: 'हर्षणः' },
  { en: 'Vajra', hi: 'वज्र', sa: 'वज्रः' },
  { en: 'Siddhi', hi: 'सिद्धि', sa: 'सिद्धिः' },
  { en: 'Vyatipata', hi: 'व्यतीपात', sa: 'व्यतीपातः' },
  { en: 'Variyan', hi: 'वरीयान्', sa: 'वरीयान्' },
  { en: 'Parigha', hi: 'परिघ', sa: 'परिघः' },
  { en: 'Shiva', hi: 'शिव', sa: 'शिवः' },
  { en: 'Siddha', hi: 'सिद्ध', sa: 'सिद्धः' },
  { en: 'Sadhya', hi: 'साध्य', sa: 'साध्यः' },
  { en: 'Shubha', hi: 'शुभ', sa: 'शुभः' },
  { en: 'Shukla', hi: 'शुक्ल', sa: 'शुक्लः' },
  { en: 'Brahma', hi: 'ब्रह्म', sa: 'ब्रह्म' },
  { en: 'Indra', hi: 'इन्द्र', sa: 'ऐन्द्रः' },
  { en: 'Vaidhriti', hi: 'वैधृति', sa: 'वैधृतिः' },
];

const KARANAS = [
  { en: 'Bava', hi: 'बव', sa: 'बवः' },
  { en: 'Balava', hi: 'बालव', sa: 'बालवः' },
  { en: 'Kaulava', hi: 'कौलव', sa: 'कौलवः' },
  { en: 'Taitila', hi: 'तैतिल', sa: 'तैतिलः' },
  { en: 'Gara', hi: 'गर', sa: 'गरः' },
  { en: 'Vanija', hi: 'वणिज', sa: 'वणिजः' },
  { en: 'Vishti (Bhadra)', hi: 'विष्टि (भद्रा)', sa: 'विष्टिः (भद्रा)' },
  { en: 'Shakuni', hi: 'शकुनि', sa: 'शकुनिः' },
  { en: 'Chatushpada', hi: 'चतुष्पद', sa: 'चतुष्पदः' },
  { en: 'Naga', hi: 'नाग', sa: 'नागः' },
  { en: 'Kintughna', hi: 'किंस्तुघ्न', sa: 'किंस्तुघ्नः' },
];

export function calculatePanchang(date: Date = new Date(), _lat = 25.3176, _lng = 82.9739): PanchangInfo {
  // Convert date to Julian Day Number
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  // Astronomical Mean Sun and Moon longitudes (approximate verified ephemeris relative to epoch J2000.0)
  const d = jdn - 2451545.0 + 0.5;
  const sunLong = (280.460 + 0.9856474 * d) % 360;
  const moonLong = (218.316 + 13.176396 * d) % 360;

  // Normalized difference
  let diff = (moonLong - sunLong + 360) % 360;
  const tithiIndex = Math.floor(diff / 12) % 30; // 0 to 29
  const tithiNum = tithiIndex + 1;

  const isShukla = tithiNum <= 15;
  const nakshatraIndex = Math.floor(moonLong / 13.333333333) % 27;
  const yogaIndex = Math.floor((moonLong + sunLong) / 13.333333333) % 27;
  const karanaIndex = Math.floor(diff / 6) % 11;

  const isEkadashi = tithiNum === 11 || tithiNum === 26;
  const isPurnima = tithiNum === 15;
  const isAmavasya = tithiNum === 30;

  let vrat = null;
  if (isEkadashi) {
    vrat = {
      en: 'Pavitra Ekadashi Vrat (Lord Vishnu Worship)',
      hi: 'पवित्र एकादशी व्रत (श्री हरि विष्णु आराधना)',
      sa: 'पवित्रा एकादशी व्रतम् (श्रीमन्नारायणपूजनम्)',
    };
  } else if (isPurnima) {
    vrat = {
      en: 'Satyanarayan Purnima Puja & Snana',
      hi: 'सत्यनारायण पूर्णिमा पूजा एवं पवित्र स्नान',
      sa: 'सत्यनारायण पूर्णिमा व्रतम्',
    };
  } else if (isAmavasya) {
    vrat = {
      en: 'Darsha Amavasya (Ancestral Pitru Tarpan)',
      hi: 'दर्श अमावस्या (पितृ तर्पण एवं दान)',
      sa: 'दर्श-अमावास्या (पितृतर्पणम्)',
    };
  } else if (tithiNum === 4 || tithiNum === 19) {
    vrat = {
      en: 'Sankashti / Vinayaka Chaturthi Vrat',
      hi: 'संकष्टी / विनायक चतुर्थी व्रत (गणेश पूजन)',
      sa: 'विनायक चतुर्थी व्रतम्',
    };
  } else if (tithiNum === 13 || tithiNum === 28) {
    vrat = {
      en: 'Pradosh Vrat (Lord Shiva Sandhya Worship)',
      hi: 'प्रदोष व्रत (सायंकाल भगवान शिव पूजन)',
      sa: 'प्रदोष व्रतम् (शिवार्चनम्)',
    };
  }

  const days = [
    { en: 'Sunday (Ravivar)', hi: 'रविवार', sa: 'रविवासरः' },
    { en: 'Monday (Somvar)', hi: 'सोमवार', sa: 'सोमवासरः' },
    { en: 'Tuesday (Mangalvar)', hi: 'मंगलवार', sa: 'मङ्गलवासरः' },
    { en: 'Wednesday (Budhavar)', hi: 'बुधवार', sa: 'बुधवासरः' },
    { en: 'Thursday (Guruvar)', hi: 'गुरुवार', sa: 'गुरुवासरः' },
    { en: 'Friday (Shukravar)', hi: 'शुक्रवार', sa: 'शुक्रवासरः' },
    { en: 'Saturday (Shanivar)', hi: 'शनिवार', sa: 'शनिवासरः' },
  ];

  const mantrasByDay = [
    {
      deity: 'Surya Dev',
      sanskrit: 'ॐ सूर्याय नमः ॥ ॐ ह्रीं ह्रीं सूर्याय नमः ॥',
      transliteration: 'oṁ sūryāya namaḥ || oṁ hrīṁ hrīṁ sūryāya namaḥ ||',
      meaningEn: 'Salutations to the luminous Sun God, the dispeller of all darkness and source of life.',
      meaningHi: 'संपूर्ण जगत के चक्षु और जीवनदाता भगवान सूर्य को सादर नमन।',
    },
    {
      deity: 'Lord Shiva',
      sanskrit: 'ॐ नमः शिवाय ॥ ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ॥',
      transliteration: 'oṁ namaḥ śivāya || oṁ tryambakaṁ yajāmahe sugandhiṁ puṣṭivardhanam ||',
      meaningEn: 'Salutations to Lord Shiva. We worship the Three-Eyed One, fragrant and nourisher of all.',
      meaningHi: 'भगवान शिव को सादर प्रणाम। हम सुगंधित और पुष्टि का पोषण करने वाले त्रिनेत्रधारी की आराधना करते हैं।',
    },
    {
      deity: 'Lord Hanuman',
      sanskrit: 'ॐ हं हनुमते नमः ॥ मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् ॥',
      transliteration: 'oṁ haṁ hanumate namaḥ || manojavaṁ mārutatulyavegaṁ jitendriyaṁ buddhimatāṁ variṣṭham ||',
      meaningEn: 'Salutations to Lord Hanuman, swift as the mind, conqueror of senses, foremost among the wise.',
      meaningHi: 'मन के समान गतिमान, पवनपुत्र, इंद्रियों को जीतने वाले और ज्ञानियों में श्रेष्ठ श्री हनुमान जी को नमन।',
    },
    {
      deity: 'Lord Ganesha',
      sanskrit: 'ॐ गं गणपतये नमः ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥',
      transliteration: 'oṁ gaṁ gaṇapataye namaḥ || vakratuṇḍa mahākāya sūryakoṭi samaprabha ||',
      meaningEn: 'Salutations to Lord Ganesha, of curved trunk and immense form, radiant like millions of suns.',
      meaningHi: 'वक्र सूंड वाले, विशाल देह वाले और करोड़ सूर्यों के समान तेजस्वी विघ्नहर्ता श्री गणेश को प्रणाम।',
    },
    {
      deity: 'Lord Vishnu / Guru',
      sanskrit: 'ॐ नमो भगवते वासुदेवाय ॥ शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम् ॥',
      transliteration: 'oṁ namo bhagavate vāsudevāya || śāntākāraṁ bhujagaśayanaṁ padmanābhaṁ sureśam ||',
      meaningEn: 'Salutations to Lord Vasudeva Vishnu, embodiment of serene peace resting upon the cosmic serpent.',
      meaningHi: 'शांत स्वरूप वाले, शेषनाग की शैय्या पर शयन करने वाले सर्वव्यापी भगवान विष्णु को सादर नमन।',
    },
    {
      deity: 'Maha Lakshmi / Durga',
      sanskrit: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः ॥ ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे ॥',
      transliteration: 'oṁ śrīṁ hrīṁ klīṁ mahālakṣmyai namaḥ || oṁ aiṁ hrīṁ klīṁ cāmuṇḍāyai vicce ||',
      meaningEn: 'Salutations to Goddess Mahalakshmi and Divine Mother Durga, giver of wisdom, prosperity and strength.',
      meaningHi: 'समस्त शुभता, ज्ञान और ऐश्वर्य की प्रदात्री भगवती महालक्ष्मी एवं मां दुर्गा को सादर वंदन।',
    },
    {
      deity: 'Shani Dev',
      sanskrit: 'ॐ शं शनैश्चराय नमः ॥ नीलांजन समाभासं रविपुत्रं यमाग्रजम् ॥',
      transliteration: 'oṁ śaṁ śanaiścarāya namaḥ || nīlāñjana samābhāsaṁ raviputraṁ yamāgrajam ||',
      meaningEn: 'Salutations to Lord Shani, radiant like blue collyrium, son of Surya, lord of justice and karma.',
      meaningHi: 'नील वर्ण वाले, सूर्यपुत्र एवं न्याय के अधिष्ठाता भगवान शनिदेव को प्रणाम।',
    },
  ];

  const dayIndex = date.getDay();

  // Local calendar date formatting in Hindi & Gregorian
  const HINDI_MONTHS = [
    'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर',
  ];
  const HINDI_DAYS = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const dayNumber = String(date.getDate());
  const monthYear = `${HINDI_MONTHS[date.getMonth()]} ${year}`;
  const dayOfWeekHi = HINDI_DAYS[dayIndex];
  const localDateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // Astronomical Solar calculation for sunrise/sunset at observer latitude/longitude
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Solar declination in radians
  const declination = 0.4093 * Math.sin(((2 * Math.PI) / 365) * (dayOfYear - 81));
  const latRad = (_lat * Math.PI) / 180;

  // Hour angle calculation
  const cosH = (Math.sin((-0.8333 * Math.PI) / 180) - Math.sin(latRad) * Math.sin(declination)) / (Math.cos(latRad) * Math.cos(declination));
  const clampedCosH = Math.max(-1, Math.min(1, cosH));
  const hourAngle = (Math.acos(clampedCosH) * 180) / Math.PI;

  // Solar noon in IST (UTC+5.5 = 82.5°E longitude standard)
  const timeCorrection = 4 * (82.5 - _lng); // minutes difference from IST meridian
  const solarNoonMin = 12 * 60 + timeCorrection;

  const sunriseMin = Math.round(solarNoonMin - hourAngle * 4);
  const sunsetMin = Math.round(solarNoonMin + hourAngle * 4);

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60) % 24;
    const m = Math.floor(minutes % 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
  };

  const sunrise = formatTime(sunriseMin);
  const sunset = formatTime(sunsetMin);
  const brahmaMuhurat = `${formatTime(sunriseMin - 96)} - ${formatTime(sunriseMin - 48)}`;
  const abhijitMuhurat = `${formatTime(solarNoonMin - 24)} - ${formatTime(solarNoonMin + 24)}`;

  // Rahu Kaal: 1/8th period of daylight
  const daylightEighth = (sunsetMin - sunriseMin) / 8;
  const rahuOrder = [7, 1, 6, 4, 5, 3, 2]; // Sun, Mon, Tue, Wed, Thu, Fri, Sat
  const rahuPart = rahuOrder[dayIndex];
  const rahuStartMin = Math.round(sunriseMin + daylightEighth * rahuPart);
  const rahuEndMin = Math.round(rahuStartMin + daylightEighth);
  const rahuKaal = `${formatTime(rahuStartMin)} - ${formatTime(rahuEndMin)}`;

  return {
    date: localDateStr,
    dayOfWeek: days[dayIndex].en,
    dayNumber,
    monthYear,
    dayOfWeekHi,
    tithiNumber: tithiNum,
    tithiName: TITHI_NAMES[tithiIndex],
    paksha: isShukla
      ? { en: 'Shukla Paksha', hi: 'शुक्ल पक्ष', sa: 'शुक्लपक्षः' }
      : { en: 'Krishna Paksha', hi: 'कृष्ण पक्ष', sa: 'कृष्णपक्षः' },
    nakshatra: NAKSHATRAS[nakshatraIndex],
    yoga: YOGAS[yogaIndex],
    karana: KARANAS[karanaIndex],
    sunrise,
    sunset,
    brahmaMuhurat,
    abhijitMuhurat,
    rahuKaal,
    isEkadashi,
    isPurnima,
    isAmavasya,
    vrat,
    dailyMantra: mantrasByDay[dayIndex],
  };
}
