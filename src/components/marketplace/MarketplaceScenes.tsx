import type { ReactNode } from 'react';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

// Pazaryeri hero wrapper. The section and hero illustrations themselves are
// the Codex SVGs in ./visuals (MarketplaceArtwork).

/** Floating storefront tile over a hero scene (the ikas/Shopify logo-tile pattern).
 *  `bottom-left` parks it in the overview SVG's empty corner instead of over its top bar. */
export function MarketplaceHeroScene({ children, tile = 'top' }: { children: ReactNode; tile?: 'top' | 'bottom-left' }) {
  return (
    <div className="relative w-full max-w-xl">
      {children}
      <div aria-hidden="true" data-ikas-loop className={`ikas-badge-float absolute z-20 ${tile === 'top' ? '-left-2 -top-14 sm:-left-6' : 'bottom-[8%] left-[4%]'} rounded-[20px] bg-white p-3 shadow-[0_12px_30px_rgba(18,25,38,0.18)] ring-1 ring-black/5`}>
        <BuildingStorefrontIcon className="h-10 w-10 text-heritage-turquoise-deep sm:h-12 sm:w-12" />
      </div>
    </div>
  );
}
