// hooks/useTranslations.tsx
// Re-export from server translations for backwards compatibility
// This ensures all components that import from @/hooks/useTranslations work with SSR

export {
  TranslationsProvider,
  useTranslations,
  useSectionTranslations,
  useLocale,
} from './useServerTranslations';

// Legacy export for backwards compatibility (deprecated)
export { TranslationsProvider as I18nProvider } from './useServerTranslations';