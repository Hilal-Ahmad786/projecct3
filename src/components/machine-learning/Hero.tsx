'use client';

import { ServicePageHero } from '@/components/services';
import { MachineLearningAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.machineLearning.hero"
      accentColor="violet"
      ctaHref="/contact"
      secondaryCtaHref="/services/machine-learning/portfolio"
      AnimationComponent={MachineLearningAnimation}
    />
  );
}
