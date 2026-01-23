'use client';

import { ServicePageHero } from '@/components/services';
import { EcommerceAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.eCommerce.hero"
      accentColor="emerald"
      ctaHref="/contact"
      secondaryCtaHref="/services/e-commerce/portfolio"
      AnimationComponent={EcommerceAnimation}
    />
  );
}
