'use client';

import { ServicePageHero } from '@/components/services';
import { MachineLearningAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.llmFinetuning.hero"
      accentColor="violet"
      ctaHref="/contact"
      secondaryCtaHref="/services/llm-finetuning/portfolio"
      AnimationComponent={MachineLearningAnimation}
    />
  );
}
