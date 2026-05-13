// Currency formatting utility — maps each locale to its regional currency
// Base prices are stored in Turkish Lira (TRY) and converted using live-approximate rates.

export type SupportedLocale = 'en' | 'tr' | 'de' | 'ur' | 'ar';

interface CurrencyConfig {
  symbol: string;
  code: string;
  symbolAfter: boolean; // true → "1,000 AED", false → "₺1,000"
  jsLocale: string;     // for toLocaleString formatting
  rateFromTRY: number;  // multiply TRY amount by this to get local currency
  roundTo: number;      // round result to nearest N for clean display
}

// Rates as of mid-2025 (TRY base)
// 1 USD ≈ 38.5 TRY · 1 EUR ≈ 42 TRY · 1 AED ≈ 10.5 TRY · 1 TRY ≈ 7.3 PKR
const CONFIGS: Record<SupportedLocale, CurrencyConfig> = {
  tr: { symbol: '₺',   code: 'TRY', symbolAfter: false, jsLocale: 'tr-TR', rateFromTRY: 1,         roundTo: 100  },
  en: { symbol: '$',   code: 'USD', symbolAfter: false, jsLocale: 'en-US', rateFromTRY: 1 / 38.5,  roundTo: 5    },
  de: { symbol: '€',   code: 'EUR', symbolAfter: false, jsLocale: 'de-DE', rateFromTRY: 1 / 42,    roundTo: 5    },
  ar: { symbol: 'AED', code: 'AED', symbolAfter: true,  jsLocale: 'ar-AE', rateFromTRY: 1 / 10.5,  roundTo: 5    },
  ur: { symbol: '₨',   code: 'PKR', symbolAfter: false, jsLocale: 'ur-PK', rateFromTRY: 7.3,       roundTo: 1000 },
};

function roundNearest(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest;
}

/** Format a TRY-denominated amount for the given locale. */
export function formatPrice(tryAmount: number, locale: string): string {
  const cfg = CONFIGS[locale as SupportedLocale] ?? CONFIGS.en;
  const converted = roundNearest(tryAmount * cfg.rateFromTRY, cfg.roundTo);
  const formatted = converted.toLocaleString(cfg.jsLocale);
  return cfg.symbolAfter ? `${formatted} ${cfg.symbol}` : `${cfg.symbol}${formatted}`;
}

/** Get just the currency symbol for a locale. */
export function getCurrencySymbol(locale: string): string {
  return (CONFIGS[locale as SupportedLocale] ?? CONFIGS.en).symbol;
}

/** Subscription plan base prices (TRY/month). Annual = monthly × 12 × 0.90 */
export const SUBSCRIPTION_PRICES_TRY: Record<string, number> = {
  seoMarketing:       10000,
  maintenanceSupport:  5000,
  automationBot:       8000,
  uiuxDesign:          7000,
  devopsCicd:          6000,
  aiModelHosting:     12000,
  promptEngineering:   6500,
  ragMaintenance:      9000,
  aiAgentMonitoring:   7500,
};

/** One-time project base prices (TRY, starting-from). */
export const PROJECT_PRICES_TRY: Record<string, number> = {
  corporateWebsite:          100000,
  ecommerceStore:            160000,
  mernApplication:           200000,
  mobileApplication:         240000,
  dataAnalyticsBi:           140000,
  devopsSetup:               120000,
  promptEngineeringProject:   80000,
  ragSolution:               160000,
  aiAgentDevelopment:        200000,
  llmFinetuning:             280000,
  computerVision:            240000,
  conversationalAiProject:   160000,
  mlopsSetup:                180000,
  customEnterprise:          360000,
};
