'use client';

import { ServicePageHero } from '@/components/services';
import { APIAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.apiDevelopment.hero"
      accentColor="emerald"
      ctaHref="/contact"
      secondaryCtaHref="/services/api-development/portfolio"
      AnimationComponent={APIAnimation}
    />
  );
}
