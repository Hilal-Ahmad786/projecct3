'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.digitalMarketing.hero"
      accentColor="rose"
      ctaHref="/contact"
      secondaryCtaHref="/services/digital-marketing/portfolio"
    />
  );
}
