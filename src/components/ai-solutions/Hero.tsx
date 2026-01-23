'use client';

import { ServicePageHero } from '@/components/services';
import { AIAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.aiSolutions.hero"
      accentColor="blue"
      ctaHref="/contact"
      secondaryCtaHref="/services/ai-solutions/portfolio"
      AnimationComponent={AIAnimation}
    />
  );
}
