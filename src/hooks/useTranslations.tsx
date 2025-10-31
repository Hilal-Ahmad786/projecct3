// hooks/useTranslations.tsx
'use client';

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Locale, defaultLocale, loadTranslations, getNestedValue, formatTranslation, isRTL } from '@/lib/i18n';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => Promise<void>;
  t: (key: string, variables?: Record<string, string | number>) => string;
  isLoading: boolean;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale = defaultLocale }: I18nProviderProps) {
  const pathname = usePathname();
  
  const getLocaleFromPath = (): Locale => {
    const pathLocale = pathname?.split('/')[1] as Locale;
    return pathLocale && ['en', 'tr', 'de', 'ur', 'ar'].includes(pathLocale) 
      ? pathLocale 
      : initialLocale;
  };

  const [locale, setCurrentLocale] = useState<Locale>(getLocaleFromPath());
  const [translations, setTranslations] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const setLocale = async (newLocale: Locale): Promise<void> => {
    setIsLoading(true);
    try {
      const newTranslations = await loadTranslations(newLocale);
      setTranslations(newTranslations);
      setCurrentLocale(newLocale);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-locale', newLocale);
        document.documentElement.lang = newLocale;
        document.documentElement.dir = isRTL(newLocale) ? 'rtl' : 'ltr';
      }
    } catch (error) {
      console.error('Failed to change locale:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const value = getNestedValue(translations, key);
    return formatTranslation(value, variables);
  };

  useEffect(() => {
    const initializeLocale = async () => {
      let targetLocale = getLocaleFromPath();
      
      if (typeof window !== 'undefined' && targetLocale === defaultLocale) {
        const storedLocale = localStorage.getItem('preferred-locale') as Locale;
        if (storedLocale && ['en', 'tr', 'de', 'ur', 'ar'].includes(storedLocale)) {
          targetLocale = storedLocale;
        }
      }
      
      await setLocale(targetLocale);
    };

    initializeLocale();
  }, [pathname]);

  const contextValue: I18nContextType = {
    locale,
    setLocale,
    t,
    isLoading,
    dir: isRTL(locale) ? 'rtl' : 'ltr',
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }
  return context;
}

export function useSectionTranslations(section: string) {
  const { t } = useTranslations();
  
  return (key: string, variables?: Record<string, string | number>) => {
    return t(`${section}.${key}`, variables);
  };
}