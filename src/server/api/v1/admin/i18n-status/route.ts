import { NextResponse } from 'next/server';
import { en } from '@/i18n/locales/en';
import { hi } from '@/i18n/locales/hi';
import { sa } from '@/i18n/locales/sa';

function flattenObject(obj: Record<string, any>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(result, flattenObject(obj[key], fullPath));
    } else {
      result[fullPath] = String(obj[key] ?? '');
    }
  }
  return result;
}

export async function GET() {
  const flatEn = flattenObject(en);
  const flatHi = flattenObject(hi);
  const flatSa = flattenObject(sa);

  const enKeys = Object.keys(flatEn);
  const totalKeys = enKeys.length;

  const missingHi = enKeys.filter((k) => !(k in flatHi) || !flatHi[k].trim());
  const missingSa = enKeys.filter((k) => !(k in flatSa) || !flatSa[k].trim());

  const hiScore = Math.round(((totalKeys - missingHi.length) / totalKeys) * 100);
  const saScore = Math.round(((totalKeys - missingSa.length) / totalKeys) * 100);

  return NextResponse.json({
    success: true,
    totalKeys,
    stats: {
      en: { completeness: 100, missingCount: 0 },
      hi: { completeness: hiScore, missingCount: missingHi.length, missingKeys: missingHi },
      sa: { completeness: saScore, missingCount: missingSa.length, missingKeys: missingSa },
    },
    sections: Object.keys(en),
  });
}
