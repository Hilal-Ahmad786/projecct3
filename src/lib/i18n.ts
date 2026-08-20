// lib/i18n.ts
export type Locale = 'en' | 'tr' | 'de' | 'ur' | 'ar';

export const locales: Locale[] = ['en', 'tr', 'de', 'ur', 'ar'];
// PakSoft sells into Türkiye. This constant is the fallback for three
// separate things, and English was wrong for all of them:
//   1. middleware locale negotiation when the visitor sends no usable
//      accept-language — which is exactly the case for Googlebot, so the
//      crawler was being redirected to /en on every visit to the root.
//   2. hreflang x-default (see lib/seo.ts) — the "show this when nothing
//      else matches" signal was pointing at the English tree.
//   3. <html lang> on the root layout.
// Explicit language preferences still win: en-GB still resolves to /en,
// de-DE to /de. Only the no-preference fallback changes.
export const defaultLocale: Locale = 'tr';

export const localeNames: Record<Locale, { name: string; nativeName: string; flag: string; dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  ur: { name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
};

// Translation cache
const translationCache = new Map<string, any>();

// Load translations with caching
export async function loadTranslations(locale: Locale): Promise<any> {
  const cacheKey = `translations-${locale}`;
  
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const translations = await import(`../locales/${locale}.json`);
    const data = translations.default || translations;
    translationCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.warn(`Failed to load translations for locale: ${locale}`);
    // Fallback to English if locale fails to load
    if (locale !== 'en') {
      return loadTranslations('en');
    }
    return {};
  }
}

// Get nested translation value
export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : path;
  }, obj);
}

// Format translation with variables
export function formatTranslation(template: string, variables?: Record<string, string | number>): string {
  if (!variables) return template;
  
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

// Detect browser locale
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  
  const browserLang = navigator.language.split('-')[0] as Locale;
  return locales.includes(browserLang) ? browserLang : defaultLocale;
}

// RTL helper
export function isRTL(locale: Locale): boolean {
  return localeNames[locale].dir === 'rtl';
}