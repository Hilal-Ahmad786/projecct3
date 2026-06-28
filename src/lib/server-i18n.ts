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

// Deep merge function - merges source into target, where source values take precedence
function deepMerge(target: any, source: any): any {
  const result = { ...target };
  for (const key in source) {
    if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

// Cached translation loader for server components
// Falls back to English for missing keys
export const getTranslations = cache((locale: Locale) => {
  const validLocale = locales.includes(locale) ? locale : defaultLocale;

  // If the locale is English or invalid, just return English
  if (validLocale === 'en') {
    return enTranslations;
  }

  // Merge English (base) with the target locale (override)
  // This ensures missing keys fall back to English
  const localeTranslations = translations[validLocale] || {};
  return deepMerge(enTranslations, localeTranslations);
});

// Namespaces that are ONLY consumed by /services/* route components
// (per-service detail sections and per-service heroes). They are the single
// biggest part of each locale file (~259KB of ~460KB for `en`) and were being
// serialized into the client payload of EVERY page via the global
// TranslationsProvider. We strip them from the global ("core") payload and
// supply the full dictionary only on /services/* routes (see
// app/[locale]/services/layout.tsx).
const SERVICE_ONLY_NAMESPACES = ['serviceSubpages', 'servicePages'] as const;

// Core translations for the global client provider: everything EXCEPT the
// heavy service-only namespaces. Used on home/blog/about/contact/etc.
export const getCoreTranslations = cache((locale: Locale) => {
  const full = getTranslations(locale);
  const core: Record<string, any> = {};
  for (const key in full) {
    if ((SERVICE_ONLY_NAMESPACES as readonly string[]).includes(key)) continue;
    core[key] = full[key];
  }
  return core;
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
