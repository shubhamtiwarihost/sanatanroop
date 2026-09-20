import { en } from '../src/i18n/locales/en';
import { hi } from '../src/i18n/locales/hi';
import { sa } from '../src/i18n/locales/sa';

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

function runI18nValidation() {
  console.log('--- Checking Multilingual Translation Completeness (EN, HI, SA) ---');
  
  const flatEn = flattenObject(en);
  const flatHi = flattenObject(hi);
  const flatSa = flattenObject(sa);

  const enKeys = Object.keys(flatEn);
  let hasErrors = false;

  console.log(`Total canonical English keys: ${enKeys.length}`);

  // Check Hindi parity
  const missingInHi = enKeys.filter(k => !(k in flatHi) || !flatHi[k].trim());
  if (missingInHi.length > 0) {
    console.error('❌ Missing or empty keys in Hindi (hi):');
    missingInHi.forEach(k => console.error(`   - ${k}`));
    hasErrors = true;
  } else {
    console.log('✅ Hindi (hi): 100% complete key coverage');
  }

  // Check Sanskrit parity
  const missingInSa = enKeys.filter(k => !(k in flatSa) || !flatSa[k].trim());
  if (missingInSa.length > 0) {
    console.error('❌ Missing or empty keys in Sanskrit (sa):');
    missingInSa.forEach(k => console.error(`   - ${k}`));
    hasErrors = true;
  } else {
    console.log('✅ Sanskrit (sa): 100% complete key coverage');
  }

  // Check for extraneous keys in hi or sa
  const extraInHi = Object.keys(flatHi).filter(k => !(k in flatEn));
  if (extraInHi.length > 0) {
    console.warn('⚠️ Extra keys in Hindi not in English:', extraInHi);
  }

  const extraInSa = Object.keys(flatSa).filter(k => !(k in flatEn));
  if (extraInSa.length > 0) {
    console.warn('⚠️ Extra keys in Sanskrit not in English:', extraInSa);
  }

  if (hasErrors) {
    console.error('❌ Build/CI Validation Failed: Missing translations detected!');
    process.exit(1);
  }

  console.log('🎉 i18n Translation Validation PASSED: All languages have 100% coverage.\n');
}

runI18nValidation();
