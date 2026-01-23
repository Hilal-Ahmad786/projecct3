'use client';

import { ServicePageHero } from '@/components/services';
import { ChatbotAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.conversationalAi.hero"
      accentColor="violet"
      ctaHref="/contact"
      secondaryCtaHref="/services/conversational-ai/portfolio"
      AnimationComponent={ChatbotAnimation}
    />
  );
}
