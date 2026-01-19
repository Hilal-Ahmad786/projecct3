'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.eCommerce.hero"
      accentColor="emerald"
      ctaHref="/contact"
      secondaryCtaHref="/services/e-commerce/portfolio"
    />
  );
}
