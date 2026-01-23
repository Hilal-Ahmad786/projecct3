'use client';

import { ServicePageHero } from '@/components/services';
import { WebDevAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.webDevelopment.hero"
      accentColor="gray"
      ctaHref="/contact"
      secondaryCtaHref="/services/web-development/portfolio"
      AnimationComponent={WebDevAnimation}
    />
  );
}
