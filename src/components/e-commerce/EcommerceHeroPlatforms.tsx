import Image from 'next/image';
import '@/components/services/corporate-visuals/ecom-visuals.css';

// Platform badges that float around an e-commerce hero scene, so the brands
// are part of the hero animation. Each badge pops in after the scene has
// built (outer element) and then drifts gently on its own rhythm (inner
// element). Decorative: the platforms are listed as real links elsewhere in
// the hero/page, so this layer is aria-hidden.
const badges = [
  { name: 'ikas', logo: '/images/Tech/brand/ikas-icon.png', w: 34, h: 34, pos: 'left-0 top-[6%]', logoClass: 'h-7 w-7 rounded-md', label: true },
  { name: 'Shopify', logo: '/images/Tech/brand/shopify-color.svg', w: 28, h: 28, pos: 'right-0 top-0', logoClass: 'h-6 w-6', label: true },
  { name: 'WooCommerce', logo: '/images/Tech/brand/woocommerce-color.svg', w: 92, h: 20, pos: 'left-0 bottom-[1%]', logoClass: 'h-5 w-auto', label: false },
  { name: 'Magento', logo: '/images/Tech/brand/magento-color.svg', w: 28, h: 28, pos: 'right-[2%] bottom-[7%]', logoClass: 'h-6 w-6', label: true },
] as const;

export default function EcommerceHeroPlatforms({ children, compact = false }: { children: React.ReactNode; compact?: boolean }) {
  return (
    <div className="relative mx-auto w-fit max-w-full">
      {children}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
        {badges.map((badge, i) => (
          <div key={badge.name} className={`ecom-hero-badge absolute ${badge.pos}`} style={{ animationDelay: `${0.9 + i * 0.18}s` }}>
            <div className="ecom-hero-badge-float" style={{ animationDuration: `${3.4 + i * 0.6}s`, animationDelay: `${i * 0.4}s` }}>
              <span className={`inline-flex items-center gap-1.5 rounded-full border border-heritage-sand bg-white/95 shadow-md backdrop-blur-sm ${compact ? 'px-2.5 py-1.5' : 'px-3 py-2'}`}>
                <Image src={badge.logo} alt="" width={badge.w} height={badge.h} className={`${badge.logoClass} object-contain`} />
                {badge.label && <span className={`font-semibold text-gray-800 ${compact ? 'text-xs' : 'text-sm'}`}>{badge.name}</span>}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
