'use client';

import { ServicePageHero } from '@/components/services';
import { MarketingAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.digitalMarketing.hero"
      accentColor="rose"
      ctaHref="/contact"
      secondaryCtaHref="/services/digital-marketing/portfolio"
      AnimationComponent={MarketingAnimation}
    />
  );
}
