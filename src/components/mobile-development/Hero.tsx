'use client';

import { ServicePageHero } from '@/components/services';
import { MobileDevAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.mobileDevelopment.hero"
      accentColor="blue"
      ctaHref="/contact"
      secondaryCtaHref="/services/mobile-development/portfolio"
      AnimationComponent={MobileDevAnimation}
    />
  );
}
