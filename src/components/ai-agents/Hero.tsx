'use client';

import { ServicePageHero } from '@/components/services';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.aiAgents.hero"
      accentColor="emerald"
      ctaHref="/contact"
      secondaryCtaHref="/services/ai-agents/portfolio"
    />
  );
}
