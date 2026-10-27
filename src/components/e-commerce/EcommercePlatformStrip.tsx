import Image from 'next/image';
import Link from 'next/link';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

// Platforms PakSoft has a dedicated service page for. Logos use each brand's
// own colours (ikas: official lime badge from ikas.com; Shopify, WooCommerce,
// Magento: brand colours from their style guides). Only list platforms with a
// real PakSoft service — showing a logo implies we work with it.
const platforms = [
  { name: 'ikas', href: '/tr/hizmetler/ikas-development', logo: '/images/Tech/brand/ikas-icon.png', size: [28, 28] },
  { name: 'Shopify', href: '/tr/hizmetler/shopify-development', logo: '/images/Tech/brand/shopify-color.svg', size: [26, 26] },
  { name: 'WooCommerce', href: '/tr/hizmetler/woocommerce-development', logo: '/images/Tech/brand/woocommerce-color.svg', size: [80, 18] },
  { name: 'Magento', href: '/tr/hizmetler/magento-development', logo: '/images/Tech/brand/magento-color.svg', size: [24, 24] },
] as const;

export default function EcommercePlatformStrip() {
  return (
    <div className="hero-enter pt-2" style={{ animationDelay: '0.3s' }}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">Hizmet verdiğimiz e-ticaret altyapıları</p>
      <ul className="mt-3 flex flex-wrap gap-2.5">
        {platforms.map((platform, i) => (
          <li key={platform.name} className="hero-enter" style={{ animationDelay: `${0.4 + i * 0.08}s` }}>
            <Link
              href={platform.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-heritage-turquoise hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <Image src={platform.logo} alt="" width={platform.size[0]} height={platform.size[1]} className={`w-auto object-contain ${platform.name === 'ikas' ? 'h-7 rounded-md' : platform.name === 'WooCommerce' ? 'h-[18px]' : 'h-6'}`} />
              {platform.name !== 'WooCommerce' && <span>{platform.name}</span>}
              {platform.name === 'WooCommerce' && <span className="sr-only">WooCommerce</span>}
            </Link>
          </li>
        ))}
        <li className="hero-enter" style={{ animationDelay: `${0.4 + platforms.length * 0.08}s` }}>
          <Link
            href="/tr/hizmetler/custom-ecommerce"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-heritage-turquoise hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-md bg-heritage-turquoise-light text-heritage-turquoise-deep"><CodeBracketIcon className="h-4 w-4" /></span>
            Özel e-ticaret
          </Link>
        </li>
      </ul>
    </div>
  );
}
