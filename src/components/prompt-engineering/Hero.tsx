'use client';

import { ServicePageHero } from '@/components/services';
import { AIAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.promptEngineering.hero"
      accentColor="violet"
      ctaHref="/contact"
      secondaryCtaHref="/services/prompt-engineering/portfolio"
      AnimationComponent={AIAnimation}
    />
  );
}
