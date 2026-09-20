import { NextRequest, NextResponse } from 'next/server';
import { calculatePanchang } from '@/lib/panchang';

export const dynamic = 'force-dynamic';

const CITY_COORDINATES: Record<string, { lat: number; lng: number; hi: string }> = {
  Varanasi: { lat: 25.3176, lng: 82.9739, hi: 'वाराणसी (काशी)' },
  Ayodhya: { lat: 26.7922, lng: 82.1998, hi: 'अयोध्या' },
  Mathura: { lat: 27.4924, lng: 77.6737, hi: 'मथुरा' },
  Ujjain: { lat: 23.1765, lng: 75.7885, hi: 'उज्जैन' },
  Haridwar: { lat: 29.9457, lng: 78.1642, hi: 'हरिद्वार' },
  'New Delhi': { lat: 28.6139, lng: 77.209, hi: 'नई दिल्ली' },
  Prayagraj: { lat: 25.4358, lng: 81.8463, hi: 'प्रयागराज' },
  Tirupati: { lat: 13.6288, lng: 79.4192, hi: 'तिरुपति' },
  Rameshwaram: { lat: 9.2876, lng: 79.3129, hi: 'रामेश्वरम्' },
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get('date');
    const cityParam = searchParams.get('city') || 'Varanasi';

    let lat = parseFloat(searchParams.get('lat') || '');
    let lng = parseFloat(searchParams.get('lng') || '');

    if (isNaN(lat) || isNaN(lng)) {
      const cityData = CITY_COORDINATES[cityParam] || CITY_COORDINATES.Varanasi;
      lat = cityData.lat;
      lng = cityData.lng;
    }

    let date: Date;
    if (dateParam) {
      const [y, m, d] = dateParam.split('-').map(Number);
      if (y && m && d) {
        date = new Date(y, m - 1, d);
      } else {
        date = new Date(dateParam);
      }
    } else {
      date = new Date();
    }

    const panchang = calculatePanchang(date, lat, lng);
    panchang.city = cityParam;

    return NextResponse.json(
      {
        success: true,
        panchang,
        meta: {
          city: cityParam,
          lat,
          lng,
          computedAt: new Date().toISOString(),
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error: any) {
    console.error('Panchang API error:', error);
    return NextResponse.json({ error: 'Failed to compute Panchang' }, { status: 500 });
  }
}
