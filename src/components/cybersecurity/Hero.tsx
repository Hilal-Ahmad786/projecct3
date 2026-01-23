'use client';

import { ServicePageHero } from '@/components/services';
import { CybersecurityAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.cybersecurity.hero"
      accentColor="rose"
      ctaHref="/contact"
      secondaryCtaHref="/services/cybersecurity/portfolio"
      AnimationComponent={CybersecurityAnimation}
    />
  );
}
