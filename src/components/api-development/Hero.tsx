'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.apiDevelopment.hero"
      accentColor="emerald"
      ctaHref="/contact"
      secondaryCtaHref="/services/api-development/portfolio"
    />
  );
}
