import type { ReactNode } from 'react';

// Shopify brand marks for the Turkish Shopify pages. The green bag is the
// official colour mark (public/images/Tech/brand/shopify-color.svg). No partner
// badge or partner claim is used: the keyword brief rules that out.

export const SHOPIFY_OFFICIAL_URL = 'https://www.shopify.com/tr';
export const SHOPIFY_INDEPENDENCE_NOTE = 'PakSoft, Shopify’dan bağımsız bir hizmet sağlayıcısıdır; Shopify iş ortaklığı iddiası taşımaz.';

export function ShopifyIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- tiny static SVG mark
  return <img src="/images/Tech/brand/shopify-color.svg" alt="" aria-hidden="true" width={size} height={size} className={`shrink-0 ${className}`} style={{ width: size, height: size }} />;
}

/** Icon + "Shopify" lockup used where the platform name sits next to the mark. */
export function ShopifyLockup({ size = 20, className = '' }: { size?: number; className?: string }) {
  return <span className={`inline-flex items-center gap-1.5 font-bold text-gray-900 ${className}`}><ShopifyIcon size={size} />Shopify</span>;
}

export function ShopifyExternalLink({ href = SHOPIFY_OFFICIAL_URL, children }: { href?: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-heritage-turquoise-deep underline underline-offset-4 hover:text-heritage-turquoise">{children}</a>;
}

/** Small hero footnote: mark, link to the platform, independence note. */
export function ShopifyPlatformNote() {
  return (
    <p className="flex max-w-lg items-start gap-2 text-xs leading-5 text-gray-500">
      <ShopifyIcon size={18} className="mt-0.5" />
      <span><strong className="font-semibold text-gray-700">Shopify</strong> altyapısı hakkında: <ShopifyExternalLink>shopify.com/tr</ShopifyExternalLink>. {SHOPIFY_INDEPENDENCE_NOTE}</span>
    </p>
  );
}

/** Wraps a hero scene with a floating Shopify mark tile (float loop runs only while visible). */
export function ShopifyHeroScene({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <div aria-hidden="true" data-shopify-loop className="shopify-badge-float absolute -left-3 -top-5 z-20 rounded-[20px] bg-white p-3 shadow-[0_12px_30px_rgba(18,25,38,0.18)] ring-1 ring-black/5 sm:-left-5">
        <ShopifyIcon size={44} />
      </div>
    </div>
  );
}
