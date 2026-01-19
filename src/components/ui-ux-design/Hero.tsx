'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.uiUxDesign.hero"
      accentColor="rose"
      ctaHref="/contact"
      secondaryCtaHref="/services/ui-ux-design/portfolio"
    />
  );
}
