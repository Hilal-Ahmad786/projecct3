'use client';

import { ServicePageHero } from '@/components/services';
import { AIAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.aiAgents.hero"
      accentColor="emerald"
      ctaHref="/contact"
      secondaryCtaHref="/services/ai-agents/portfolio"
      AnimationComponent={AIAnimation}
    />
  );
}
