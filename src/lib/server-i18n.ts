// src/lib/server-i18n.ts
// Server-side i18n utilities for SSR/SSG

import { cache } from 'react';
import { Locale, defaultLocale, locales, isRTL } from './i18n';

// Import translations statically for better performance
import enTranslations from '@/locales/en.json';
import trTranslations from '@/locales/tr.json';
import deTranslations from '@/locales/de.json';
import urTranslations from '@/locales/ur.json';
import arTranslations from '@/locales/ar.json';

// Static translations map
const translations: Record<Locale, any> = {
  en: enTranslations,
  tr: trTranslations,
  de: deTranslations,
  ur: urTranslations,
  ar: arTranslations,
};

// Cached translation loader for server components
export const getTranslations = cache((locale: Locale) => {
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  return translations[validLocale] || translations[defaultLocale];
});

// Get nested translation value
export function getNestedValue(obj: any, path: string): string {
  const result = path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);

  // Return the path as fallback if translation not found (for debugging)
  return result !== undefined ? result : path;
}

// Format translation with variables
export function formatTranslation(template: string, variables?: Record<string, string | number>): string {
  if (!variables || typeof template !== 'string') return template;

  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

// Create a translator function for a specific locale
export function createTranslator(locale: Locale) {
  const trans = getTranslations(locale);

  return function t(key: string, variables?: Record<string, string | number>): string {
    const value = getNestedValue(trans, key);
    return formatTranslation(value, variables);
  };
}

// Create a section-specific translator
export function createSectionTranslator(locale: Locale, section: string) {
  const t = createTranslator(locale);

  return function(key: string, variables?: Record<string, string | number>): string {
    return t(`${section}.${key}`, variables);
  };
}

// Get locale from path
export function getLocaleFromPath(pathname: string): Locale {
  const pathLocale = pathname.split('/')[1] as Locale;
  return pathLocale && locales.includes(pathLocale) ? pathLocale : defaultLocale;
}

// Get direction for locale
export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

// Validate locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Export types and utilities
export type { Locale };
export { locales, defaultLocale, isRTL };
