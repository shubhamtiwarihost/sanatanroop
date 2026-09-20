import { Dictionary, Locale, SUPPORTED_LANGUAGES } from './types';
import { en } from './locales/en';
import { hi } from './locales/hi';
import { sa } from './locales/sa';

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  hi,
  sa,
};

export function getDictionary(locale: Locale = 'en'): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}

export { SUPPORTED_LANGUAGES };
export type { Locale, Dictionary };
