// hooks/useServerTranslations.tsx
'use client';

import { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, defaultLocale, isRTL, locales } from '@/lib/i18n';

interface TranslationsContextType {
  locale: Locale;
  translations: any;
  t: (key: string, variables?: Record<string, string | number>) => string;
  dir: 'ltr' | 'rtl';
  setLocale: (newLocale: Locale) => Promise<void>;
  isLoading: boolean;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

// Get nested translation value
function getNestedValue(obj: any, path: string): string {
  const result = path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
  return result !== undefined ? result : path;
}

// Format translation with variables
function formatTranslation(template: string, variables?: Record<string, string | number>): string {
  if (!variables || typeof template !== 'string') return template;
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

interface TranslationsProviderProps {
  children: ReactNode;
  locale: Locale;
  translations: any;
}

export function TranslationsProvider({ children, locale, translations }: TranslationsProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const t = useMemo(() => {
    return (key: string, variables?: Record<string, string | number>): string => {
      const value = getNestedValue(translations, key);
      return formatTranslation(value, variables);
    };
  }, [translations]);

  // setLocale navigates to the new locale URL - translations are loaded server-side
  const setLocale = useCallback(async (newLocale: Locale): Promise<void> => {
    if (newLocale === locale) return;
    const pathWithoutLocale = pathname?.replace(/^\/(en|tr|de|ur|ar)/, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  }, [locale, pathname, router]);

  const contextValue = useMemo(() => ({
    locale,
    translations,
    t,
    dir: isRTL(locale) ? 'rtl' as const : 'ltr' as const,
    setLocale,
    isLoading: false, // Translations are loaded server-side, no client loading state
  }), [locale, translations, t, setLocale]);

  return (
    <TranslationsContext.Provider value={contextValue}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a TranslationsProvider');
  }
  return context;
}

export function useSectionTranslations(section: string) {
  const { t } = useTranslations();

  return (key: string, variables?: Record<string, string | number>) => {
    return t(`${section}.${key}`, variables);
  };
}

// Hook to get locale from URL (client-side)
export function useLocale(): Locale {
  const pathname = usePathname();
  const pathLocale = pathname?.split('/')[1] as Locale;
  return pathLocale && locales.includes(pathLocale) ? pathLocale : defaultLocale;
}
