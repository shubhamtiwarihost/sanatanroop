'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Calendar,
  Sparkles,
  Share2,
  ChevronRight,
  Check,
  Flame,
  Bookmark,
  Clock,
  Heart,
} from 'lucide-react';

interface KathaChapter {
  title: string;
  content: string;
}

interface Katha {
  id: string;
  titleHi: string;
  titleEn: string;
  category: 'vrat' | 'ekadashi' | 'pauranik' | 'devi';
  deity: string;
  dayOrTithi: string;
  shortDesc: string;
  vidhi: string[];
  chapters: KathaChapter[];
  phalaShruti: string;
}

const KATHAS_DATA: Katha[] = [
  {
    id: 'satyanarayan',
    titleHi: 'श्री सत्यनारायण व्रत कथा',
    titleEn: 'Shri Satyanarayan Vrat Katha',
    category: 'vrat',
    deity: 'भगवान श्री सत्यनारायण (विष्णु)',
    dayOrTithi: 'पूर्णिमा, गुरुवार, संक्रांति या शुभ मुहूर्त',
    shortDesc: 'कलिकाल में सबसे कल्याणकारी और सर्वमनोकामना पूर्ण करने वाली भगवान विष्णु की पावन व्रत कथा।',
    vidhi: [
      'प्रातःकाल स्नानादि से निवृत्त होकर सत्यनारायण व्रत का संकल्प लें।',
      'चौकी पर पीला वस्त्र बिछाकर भगवान सत्यनारायण एवं शालिग्राम जी की स्थापना करें।',
      'पंचामृत (दूध, दही, घी, शहद, गंगाजल) और पंजीरी (गेहूं का भुना आटा, चीनी, केले व तुलसीदल) का नैवेद्य तैयार करें।',
      'कथा श्रवण के पश्चात आरती करें और सभी भक्तों में चरणामृत व पंजीरी का प्रसाद वितरित करें।',
    ],
    chapters: [
      {
        title: 'प्रथम अध्याय (First Chapter) - कथा की महिमा एवं नारद जी की प्रार्थना',
        content: `एक समय नैमिषारण्य तीर्थ में शौनकादिक अठ्यासी हजार ऋषियों ने परम ज्ञानी सूत जी से पूछा — हे सूत जी महाराज! इस कलयुग में कौन सा ऐसा व्रत अथवा तप है जिससे मानव जाति को सभी कष्टों से मुक्ति मिले और परम शांति व मोक्ष प्राप्त हो?

सूत जी ने कहा — हे मुनियों! एक बार भगवान नारायण के अनन्य भक्त देवर्षि नारद जी ने तीनों लोकों का भ्रमण करते हुए देखा कि मृत्युलोक के सभी प्राणी अपने पूर्व जन्म के कर्मों के फलवश अनेक प्रकार के कष्टों से पीड़ित हैं।

नारद जी ने करुणावश क्षीरसागर में विराजमान भगवान श्रीमन नारायण से प्रार्थना की — हे प्रभु! मृत्युलोक के प्राणियों के उद्धार का कोई सरल उपाय बताएं। तब भगवान नारायण ने कहा — हे नारद! सत्यनारायण व्रत तीनों लोकों में दुर्लभ और अत्यंत पुण्यप्रद है। जो भी मनुष्य श्रद्धा और भक्ति से यह व्रत करता है, वह इस लोक में सुख भोगकर अंत में मोक्ष पद प्राप्त करता है।`,
      },
      {
        title: 'द्वितीय अध्याय (Second Chapter) - निर्धन ब्राह्मण एवं शतानंद जी की कथा',
        content: `सूत जी ने आगे कहा — प्राचीन काल में काशी नगरी में एक अत्यंत दरिद्र, भिक्षाजीवी ब्राह्मण निवास करता था। उसकी दयनीय दशा देखकर स्वयं भगवान विष्णु ने वृद्ध ब्राह्मण का वेश धारण कर दर्शन दिया।

भगवान ने पूछा — हे विप्रवर! आप इतने दुःखी क्यों हैं? ब्राह्मण ने अपनी निर्धनता व्यक्त की। तब वृद्ध रूपी प्रभु ने कहा — हे ब्राह्मण! भगवान सत्यनारायण का व्रत करो। इससे तुम्हारी समस्त दरिद्रता समाप्त हो जाएगी और जीवन सुखमय हो जाएगा।

ब्राह्मण ने अत्यंत भक्ति से सत्यनारायण व्रत का संकल्प लिया और उसी रात स्वप्न में प्रभु के दर्शन हुए। अगले दिन उसने श्रद्धापूर्वक सपरिवार व्रत किया। व्रत के प्रभाव से उसकी दरिद्रता नष्ट हो गई और वह परम ऐश्वर्यवान होकर धर्मपूर्वक जीवन बिताने लगा।`,
      },
      {
        title: 'तृतीय अध्याय (Third Chapter) - साधु वैश्य की कथा',
        content: `इसके बाद सूत जी ने एक अन्य कथा सुनाई — एक समय उल्कामुख नाम का धर्मात्मा राजा अपनी पत्नी सहित सत्यनारायण का पूजन कर रहा था। वहां एक साधु नामक वैश्य आया और उसने राजा से पूछा — राजन! आप किसका पूजन कर रहे हैं?

राजा ने कहा — मैं संतान और समृद्धि प्रदाता भगवान सत्यनारायण का व्रत कर रहा हूँ। साधु वैश्य ने भी संतान प्राप्ति हेतु व्रत का संकल्प लिया। घर जाकर उसने अपनी पत्नी लीलावती को यह बात बताई। समय आने पर लीलावती ने एक कन्या को जन्म दिया जिसका नाम कलावती रखा गया।

परंतु वैश्य ने कन्या के विवाह तक व्रत टाल दिया। विवाह के समय भी लोभवश व्रत नहीं किया। फलस्वरूप व्यापार के समय राजा चंद्रकेतु के राज्य में साधु वैश्य और उसके दामाद पर चोरी का झूठा आरोप लगा और दोनों कारागार में डाल दिए गए।`,
      },
      {
        title: 'चतुर्थ अध्याय (Fourth Chapter) - संकट निवारण एवं सत्य की विजय',
        content: `कारागार में कष्ट भोगते हुए साधु वैश्य को अपने अपराध का स्मरण हुआ। उसने पश्चाताप करते हुए कारागार में ही भगवान सत्यनारायण की मानसिक स्तुति की।

उधर लीलावती और कलावती भी निर्धनता से त्रस्त हो गईं। एक दिन कलावती ने एक ब्राह्मण के घर सत्यनारायण की कथा सुनी और प्रसाद ग्रहण कर घर लौटी। माता-पुत्री ने मिलकर नियमपूर्वक सत्यनारायण का व्रत किया।

प्रभु सत्यनारायण प्रसन्न हुए और उन्होंने राजा चंद्रकेतु को स्वप्न में आदेश दिया कि दोनों निर्दोष व्यापारियों को मुक्त करो और उनका धन लौटाओ। राजा ने प्रातः दोनों को मुक्त कर उनका सम्पूर्ण धन दुगुने सम्मान के साथ लौटा दिया।`,
      },
      {
        title: 'पंचम अध्याय (Fifth Chapter) - राजा तुंगध्वज एवं प्रसाद का महात्म्य',
        content: `सूत जी ने आगे बताया — एक समय राजा तुंगध्वज वन में शिकार खेलने गए। वहां वट वृक्ष के नीचे कुछ गोप बालक भक्तिभाव से भगवान सत्यनारायण की पूजा कर रहे थे।

राजा ने अहंकारवश न तो बालकों को प्रणाम किया और न ही दिया गया प्रसाद ग्रहण किया। जब राजा अपने महल लौटा, तो देखा कि उसका राज्य नष्ट हो चुका है और पुत्र भी संकट में हैं।

राजा को अपनी भूल का भान हुआ। वह तुरंत उसी वट वृक्ष के पास लौटा और गोप बालकों के साथ बैठकर विधिवत भगवान सत्यनारायण का पूजन किया और साष्टांग प्रणाम कर प्रसाद ग्रहण किया। प्रभु की कृपा से राजा का राज्य, संपत्ति और पुत्र पुनः सुरक्षित हो गए।

अतः जो भी मनुष्य निष्कपट भाव से इस व्रत को करता है, वह इस संसार में समस्त सुख भोगकर वैकुंठ धाम को प्राप्त करता है।`,
      },
    ],
    phalaShruti: 'सत्यनारायण कथा के श्रवण मात्र से भय, दरिद्रता, रोग और पापों का नाश होता है तथा मनोवांछित फल की प्राप्ति होती है।',
  },
  {
    id: 'shivratri',
    titleHi: 'महाशिवरात्रि व्रत कथा',
    titleEn: 'Maha Shivratri Vrat Katha',
    category: 'vrat',
    deity: 'भगवान शिव (महादेव)',
    dayOrTithi: 'फाल्गुन कृष्ण चतुर्दशी',
    shortDesc: 'अज्ञान के अंधकार से मोक्ष के प्रकाश की ओर ले जाने वाली भगवान आशुतोष शिव की पावन कथा।',
    vidhi: [
      'महाशिवरात्रि के दिन सूर्योदय से पूर्व उठकर पवित्र नदी या घर पर गंगाजल युक्त जल से स्नान करें।',
      'शिवलिंग पर कच्चा दूध, दही, घी, शहद और शर्करा (पंचामृत) से अभिषेक करें।',
      'त्रिदल विल्वपत्र, धतूरा, भांग, भस्म और अक्षत अर्पित करें।',
      'चारों प्रहर में ‘ॐ नमः शिवाय’ का अनवरत जप करें और रात्रि जागरण करें।',
    ],
    chapters: [
      {
        title: 'व्याध (शिकारी) और बेलपत्र की अमर कथा',
        content: `प्राचीन काल में चित्रभानु नामक एक शिकारी (व्याध) था। वह वन्य पशुओं की हत्या कर अपना और परिवार का पेट भरता था। एक बार उसने किसी साहूकार से ऋण लिया जिसे वह समय पर न चुका सका। साहूकार ने उसे शिव मठ में बंदी बना लिया।

उस दिन संयोग से फाल्गुन कृष्ण चतुर्दशी थी और मठ में शिवरात्रि की पूजा हो रही थी। शिकारी दिन भर भूखा-प्यासा रहा और अनजाने में ही शिव नाम सुनता रहा। सायंकाल साहूकार ने उसे यह कहकर छोड़ दिया कि कल ऋण चुकाना होगा।

शिकारी शिकार की खोज में वन में गया और एक जलाशय के किनारे बेल के पेड़ पर चढ़कर बैठ गया। उसने नीचे एक शिवलिंग देखा जो पत्तों से ढका हुआ था। शिकारी रात भर जागता रहा और टहनियां तोड़कर नीचे फेंकता रहा। संयोगवश वे बेलपत्र नीचे स्थापित शिवलिंग पर गिरते रहे।`,
      },
      {
        title: 'मृग परिवार का सत्य और शिव साक्षात्कार',
        content: `रात्रि के प्रथम प्रहर में एक गर्भिणी हिरणी जल पीने आई। शिकारी ने धनुष पर बाण चढ़ाया। हिरणी ने विनम्रता से कहा — हे व्याध! मैं अभी गर्भिणी हूँ, अपने शावकों को जन्म देकर लौट आऊंगी। शिकारी ने उसकी सत्यवादिता पर विश्वास कर उसे जाने दिया। इस प्रक्रिया में उसके हाथ से अनजाने में फिर बेलपत्र शिवलिंग पर गिरे।

दूसरे प्रहर में दूसरी हिरणी आई और तीसरे प्रहर में एक मृग आया। सभी ने अपनी जिम्मेदारियां पूरी कर वापस लौटने का वचन दिया। शिकारी ने दयावश सबको छोड़ दिया और निरंतर बेलपत्र नीचे गिरते रहे।

चौथे प्रहर में वह पूरा मृग परिवार एक साथ शिकारी के समक्ष उपस्थित हो गया ताकि वह अपना शिकार कर सके। मृगों की सत्यनिष्ठा और त्याग देखकर शिकारी का हृदय पिघल गया। उसकी आंखों से अश्रुधारा बह निकली।

उसके इस भाव से प्रसन्न होकर स्वयं देवाधिदेव महादेव प्रकट हुए और उन्होंने शिकारी व मृग परिवार दोनों को दिव्य विमान से शिवलोक भेज दिया। इस प्रकार अनजाने में किए गए शिवरात्रि व्रत से भी परम पद मिल गया।`,
      },
    ],
    phalaShruti: 'महाशिवरात्रि व्रत से जाने-अनजाने में हुए सभी पाप नष्ट हो जाते हैं और साधक को शिव सान्निध्य प्राप्त होता है।',
  },
  {
    id: 'nirjala-ekadashi',
    titleHi: 'निर्जला एकादशी व्रत कथा',
    titleEn: 'Nirjala Ekadashi Vrat Katha',
    category: 'ekadashi',
    deity: 'भगवान श्री विष्णु',
    dayOrTithi: 'ज्येष्ठ शुक्ल एकादशी',
    shortDesc: 'वर्ष भर की सभी २४ एकादशियों का पुण्य अकेले देने वाली परम तपमयी एकादशी।',
    vidhi: [
      'दशमी तिथि की रात्रि से ही सात्विक आचरण रखें।',
      'एकादशी के दिन सूर्योदय से लेकर द्वादशी के सूर्योदय तक जल और अन्न का त्याग करें।',
      'भगवान विष्णु का षोडशोपचार पूजन करें और ॐ नमो भगवते वासुदेवाय का जप करें।',
      'द्वादशी के दिन ब्राह्मणों को जल से भरे कलश, छाता, पंखा और अन्न का दान देकर पारण करें।',
    ],
    chapters: [
      {
        title: 'भीमसेन की व्यथा एवं महर्षि वेदव्यास जी का उपदेश',
        content: `महाभारत काल में जब धर्मराज युधिष्ठिर, माता कुंती, द्रौपदी, अर्जुन, नकुल और सहदेव नियमपूर्वक प्रत्येक एकादशी का व्रत रखते थे, तब महाबली भीमसेन अत्यंत चिंतित रहते थे।

भीमसेन ने महर्षि वेदव्यास जी से कहा — हे पितामह! मेरे पेट में ‘वृक’ नामक अग्नि निरंतर प्रज्वलित रहती है जो अधिक अन्न खाने पर ही शांत होती है। मेरे परिवार के सभी लोग एकादशी व्रत करते हैं, परंतु मैं भूख सहन नहीं कर पाता। क्या कोई ऐसा उपाय है जिससे मुझे बिना भूखे रहे वर्ष की सभी एकादशियों का फल प्राप्त हो सके?

महर्षि वेदव्यास जी ने मुस्कुराकर कहा — हे वृकोदर! ज्येष्ठ मास के शुक्ल पक्ष में जो एकादशी आती है, उसे ‘निर्जला एकादशी’ कहते हैं। इस दिन आचमन के अतिरिक्त जल की एक बूंद भी ग्रहण नहीं की जाती। यदि तुम इस एक एकादशी का पूर्ण निर्जल व्रत कर लो, तो तुम्हें वर्ष की सभी चौबीस एकादशियों का पूर्ण पुण्य प्राप्त हो जाएगा।`,
      },
      {
        title: 'भीम का कठिन संकल्प और मोक्ष प्राप्ति',
        content: `महर्षि व्यास के वचन सुनकर महाबली भीमसेन ने निर्जला एकादशी का कठोर व्रत करने का संकल्प लिया। निर्जल रहने के कारण मध्याह्न तक भीमसेन की स्थिति व्याकुल होने लगी, परंतु उन्होंने अपने अदम्य मनोबल से व्रत पूर्ण किया।

द्वादशी के दिन प्रातः भीमसेन ने भगवान विष्णु का पूजन किया, ब्राह्मणों को कलश, वस्त्र और मिष्ठान दान दिया और गंगाजल से पारण किया। इसी कारण इस एकादशी को ‘भीमसेनी एकादशी’ या ‘पांडव एकादशी’ भी कहा जाता है।`,
      },
    ],
    phalaShruti: 'निर्जला एकादशी का व्रत करने से साधक को दीर्घायु, आरोग्य, अक्षय पुण्य और अंत में वैकुंठ धाम की प्राप्ति होती है।',
  },
  {
    id: 'karwa-chauth',
    titleHi: 'करवा चौथ व्रत कथा',
    titleEn: 'Karwa Chauth Vrat Katha',
    category: 'vrat',
    deity: 'माँ गौरी एवं भगवान शिव',
    dayOrTithi: 'कार्तिक कृष्ण चतुर्थी',
    shortDesc: 'अखंड सौभाग्य, सुहाग की दीर्घायु एवं दांपत्य सुख की पावन पारंपरिक व्रत कथा।',
    vidhi: [
      'प्रातःकाल सरगी ग्रहण करने के पश्चात निर्जल व्रत का संकल्प लें।',
      'सायंकाल करवा माता, शिव-पार्वती और गणेश जी का चित्र बनाकर पूजन करें।',
      'करवे में जल भरकर कथा सुनें और बड़ों का आशीर्वाद लें।',
      'रात्रि में चंद्रोदय होने पर छलनी से चंद्रमा और पतिदेव का दर्शन कर अर्घ्य दें।',
    ],
    chapters: [
      {
        title: 'रानी वीरवती और सात भाइयों का स्नेह',
        content: `प्राचीन काल में एक धर्मात्मा ब्राह्मण के सात पुत्र और एक रूपवती कन्या थी जिसका नाम वीरवती था। सात भाइयों की वह इकलौती लाडली बहन थी। वीरवती का विवाह एक राजा के साथ हुआ।

विवाह के बाद प्रथम करवा चौथ पर वीरवती मायके आई हुई थी। उसने निर्जल व्रत रखा। दिनभर भूखी-प्यासी रहने के कारण सायंकाल भूख से उसकी चेतना क्षीण होने लगी। भाइयों से अपनी बहन की यह दशा देखी न गई।

भाइयों ने वन में जाकर एक ऊंचे वट वृक्ष पर दीपक जलाकर छलनी की आड़ में रख दिया और बहन से कहा — देखो वीरवती! चंद्रमा निकल आया है, तुम अर्घ्य देकर भोजन कर लो। वीरवती ने भाइयों की बात पर विश्वास कर नकली चंद्रमा को अर्घ्य देकर भोजन का पहला ग्रास मुख में डाला तो उसमें बाल निकला, दूसरे में छींक आई और तीसरे ग्रास पर समाचार आया कि उसका पति अचानक गंभीर रूप से अस्वस्थ हो गया है।`,
      },
      {
        title: 'माँ इंद्राणी की कृपा और अखंड सौभाग्य',
        content: `वीरवती अपने पति के पास पहुंची और उसने निरंतर एक वर्ष तक भगवान शिव और माँ पार्वती की तपस्या की। अगले वर्ष कार्तिक कृष्ण चतुर्थी को माँ इंद्राणी (शची) प्रकट हुईं।

माँ इंद्राणी ने वीरवती को उसकी भूल का स्मरण कराया और विधिपूर्वक करवा चौथ का व्रत करने का उपदेश दिया। वीरवती ने अत्यंत श्रद्धा, नियम और निष्ठा से करवा चौथ का निर्जल व्रत किया।

रात्रि में चंद्रमा के दर्शन कर उसने पति के चरणों का स्पर्श किया। माँ पार्वती और शिव जी की कृपा से उसका पति पूर्णतः स्वस्थ और दीर्घायु हो गया।`,
      },
    ],
    phalaShruti: 'करवा चौथ का व्रत करने से अखंड सौभाग्य की प्राप्ति होती है और दांपत्य जीवन में सुख, शांति और प्रेम बढ़ता है।',
  },
  {
    id: 'somwar-vrat',
    titleHi: 'सोमवार व्रत कथा',
    titleEn: 'Somwar Vrat Katha',
    category: 'vrat',
    deity: 'भगवान शिव एवं माता पार्वती',
    dayOrTithi: 'प्रत्येक सोमवार / श्रावण सोमवार',
    shortDesc: 'मनोवांछित जीवनसाथी, मानसिक शांति और कष्ट निवारण हेतु भगवान आशुतोष का प्रिय सोमवार व्रत।',
    vidhi: [
      'प्रातःकाल स्नानादि के पश्चात भगवान शिव और माता पार्वती का ध्यान करें।',
      'शिवलिंग पर गंगाजल, श्वेत पुष्प, बेलपत्र और चंदन अर्पित करें।',
      'दोपहर या सायंकाल सोमवार व्रत कथा सुनें और आरती करें।',
      'सायंकाल एक समय सात्विक भोजन (बिना नमक या सेंधा नमक युक्त) ग्रहण करें।',
    ],
    chapters: [
      {
        title: 'धनी साहूकार और पुत्र की अल्पायु की कथा',
        content: `एक नगर में एक धनी साहूकार रहता था। उसके पास अपार धन-संपत्ति थी, परंतु कोई संतान न थी। वह प्रतिदिन शिव मंदिर जाकर दीपक जलाता और पुत्र प्राप्ति की प्रार्थना करता।

उसकी भक्ति देखकर माता पार्वती ने भगवान शिव से कहा — हे प्रभु! इस भक्त की मनोकामना अवश्य पूर्ण कीजिए। शिव जी ने कहा — हे देवी! इसके भाग्य में पुत्र का योग नहीं है, यदि इसे पुत्र प्राप्त हुआ भी तो वह मात्र बारह वर्ष की आयु तक ही जीवित रहेगा।

माता पार्वती के विशेष आग्रह पर शिव जी ने साहूकार को पुत्र का वरदान दे दिया। समय आने पर साहूकार की पत्नी ने एक सुंदर पुत्र को जन्म दिया। साहूकार ने उसका नाम अमर रखा, परंतु वह जानता था कि बालक की आयु केवल १२ वर्ष है। अतः उसने किसी को प्रसन्नता में नहीं बांधा और निरंतर सोमवार का व्रत करता रहा।`,
      },
      {
        title: 'काशी यात्रा, विवाह और शिव जी का अमर वरदान',
        content: `जब बालक ११ वर्ष का हुआ, तो साहूकार ने उसे उसके मामा के साथ विद्या अध्ययन हेतु काशी भेज दिया और मार्ग में यज्ञ व दान करने का निर्देश दिया।

मार्ग में एक राजकुमारी का विवाह हो रहा था, जहां वर का एक नेत्र दोषपूर्ण था। वर पक्ष ने छल से साहूकार के सुंदर पुत्र से फेरे करवा दिए। परंतु बालक ने राजकुमारी की चुनरी पर लिख दिया कि फेरे मेरे साथ हुए हैं, जबकि तुम्हें जिसके साथ भेजा जा रहा है वह काना है। राजकुमारी ने उस धूर्त वर को अस्वीकार कर दिया।

इसके बाद बालक काशी पहुंचा। बारहवें वर्ष के दिन बालक की अचानक मृत्यु हो गई। मामा का विलाप सुनकर वहां से गुजर रहे भगवान शिव और माता पार्वती वहां पहुंचे। माता पार्वती की प्रार्थना पर भगवान शिव ने बालक को पुनर्जीवित कर दीर्घायु प्रदान की। लौटते समय वह राजकुमारी को विदा कराकर सकुशल अपने माता-पिता के पास लौटा।`,
      },
    ],
    phalaShruti: 'सोमवार व्रत करने से भगवान शिव की असीम अनुकंपा प्राप्त होती है और समस्त संतापों का अंत होता है।',
  },
];

export default function KathasPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKatha, setSelectedKatha] = useState<Katha>(KATHAS_DATA[0]);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('large');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredKathas = useMemo(() => {
    return KATHAS_DATA.filter((katha) => {
      const matchesCategory =
        activeCategory === 'all' || katha.category === activeCategory;
      const matchesSearch =
        katha.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        katha.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        katha.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        katha.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopy = (katha: Katha) => {
    const text = `${katha.titleHi}\n\n${katha.shortDesc}\n\nफलश्रुति:\n${katha.phalaShruti}`;
    navigator.clipboard.writeText(text);
    setCopiedId(katha.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const categories = [
    { id: 'all', label: 'सभी कथाएं (All)' },
    { id: 'vrat', label: 'व्रत कथाएं (Vrat Stories)' },
    { id: 'ekadashi', label: 'एकादशी महात्म्य (Ekadashi)' },
    { id: 'pauranik', label: 'पौराणिक कथाएं (Pauranik)' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#121216] text-[#1c1917] dark:text-stone-100 font-sans pb-24">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2e1507] via-[#3d1c0b] to-[#220d04] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-600/40">
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-amber-500/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>॥ सत्यं वद, धर्मं चर ॥</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-wide text-amber-100">
            सम्पूर्ण व्रत एवं पौराणिक कथाएं (Sacred Kathas)
          </h1>

          <p className="text-stone-300 max-w-2xl mx-auto text-sm sm:text-base font-serif leading-relaxed">
            सनातन धर्म की पावन व्रत कथाएं, एकादशी महात्म्य, पूजन विधि एवं फलश्रुति। पढ़ें, सुनें और धर्म मार्ग पर अग्रसर हों।
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-4 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-7 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="व्रत अथवा कथा का नाम खोजें..."
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

        {/* Two Columns: Katha List & Katha Reader */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Left Column: Kathas Directory (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-sm font-serif font-bold text-stone-500 uppercase tracking-wider px-1">
              कथा सूची ({filteredKathas.length})
            </h2>

            <div className="space-y-3">
              {filteredKathas.map((katha) => {
                const isSelected = selectedKatha.id === katha.id;
                return (
                  <div
                    key={katha.id}
                    onClick={() => setSelectedKatha(katha)}
                    className={`p-4 rounded-2xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-[#27170c] border-amber-500/70 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-white dark:bg-[#1a1411] border-stone-200 dark:border-stone-800 hover:border-amber-400/50 shadow-sm'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-serif">
                          {katha.deity}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                        {katha.titleHi}
                      </h3>

                      <p className="text-xs text-stone-500 dark:text-stone-400 font-serif line-clamp-2 leading-relaxed">
                        {katha.shortDesc}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-[11px] text-amber-700 dark:text-amber-400 font-serif font-semibold">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{katha.dayOrTithi}</span>
                        </span>
                        <ChevronRight className={`w-4 h-4 text-stone-400 ${isSelected ? 'text-amber-600' : ''}`} />
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredKathas.length === 0 && (
                <div className="p-8 text-center bg-white dark:bg-[#1a1411] rounded-2xl border border-stone-200 dark:border-stone-800">
                  <p className="font-serif text-stone-500">कोई कथा नहीं मिली। कृपया दूसरा शब्द खोजें।</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Selected Katha Complete Text & Vidhi (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-[#1a1411] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl p-6 sm:p-10 space-y-8">
              
              {/* Top Header of Reader */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-serif uppercase tracking-wider">
                      {selectedKatha.deity}
                    </span>
                    <span className="text-stone-300 dark:text-stone-700">•</span>
                    <span className="text-xs font-serif text-stone-500">
                      {selectedKatha.dayOrTithi}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-white">
                    {selectedKatha.titleHi}
                  </h2>
                  <p className="text-sm font-serif text-amber-800 dark:text-amber-300/90 font-medium">
                    {selectedKatha.shortDesc}
                  </p>
                </div>

                {/* Top Controls: Font & Share */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 text-xs font-serif font-bold">
                    <button
                      onClick={() => setFontSize('normal')}
                      className={`px-3 py-1 rounded-lg transition ${
                        fontSize === 'normal' ? 'bg-white dark:bg-stone-700 shadow-sm text-amber-600' : 'text-stone-500'
                      }`}
                    >
                      अ
                    </button>
                    <button
                      onClick={() => setFontSize('large')}
                      className={`px-3 py-1 rounded-lg transition text-sm ${
                        fontSize === 'large' ? 'bg-white dark:bg-stone-700 shadow-sm text-amber-600' : 'text-stone-500'
                      }`}
                    >
                      अ+
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopy(selectedKatha)}
                    className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition text-xs flex items-center space-x-1"
                    title="कथा साझा करें"
                  >
                    {copiedId === selectedKatha.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Vrat Vidhi & Rules Box */}
              <div className="bg-[#fcf8f0] dark:bg-[#20150d] rounded-2xl p-5 sm:p-6 border border-amber-300 dark:border-amber-900/60 space-y-3">
                <h3 className="font-serif font-bold text-sm sm:text-base text-amber-900 dark:text-amber-200 flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>व्रत एवं पूजन विधि (Sacred Vidhi & Rituals)</span>
                </h3>

                <ul className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-serif">
                  {selectedKatha.vidhi.map((v, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Katha Chapters Content */}
              <div className="space-y-8">
                {selectedKatha.chapters.map((ch, idx) => (
                  <div key={idx} className="space-y-3 border-b border-stone-100 dark:border-stone-800/80 pb-6 last:border-b-0">
                    <h4 className="text-lg sm:text-xl font-serif font-bold text-amber-900 dark:text-amber-300 flex items-center space-x-2">
                      <span className="text-amber-600 dark:text-amber-400">❖</span>
                      <span>{ch.title}</span>
                    </h4>

                    <div
                      className={`font-serif text-stone-800 dark:text-stone-200 leading-loose whitespace-pre-line ${
                        fontSize === 'normal' ? 'text-base' : 'text-lg leading-relaxed'
                      }`}
                    >
                      {ch.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Phala-shruti Card */}
              <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 font-serif flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>॥ पावन फलश्रुति (Auspicious Benefits) ॥</span>
                </span>
                <p className="font-serif text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
                  {selectedKatha.phalaShruti}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
