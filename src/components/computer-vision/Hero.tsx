'use client';

import { ServicePageHero } from '@/components/services';
import { MachineLearningAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.computerVision.hero"
      accentColor="rose"
      ctaHref="/contact"
      secondaryCtaHref="/services/computer-vision/portfolio"
      AnimationComponent={MachineLearningAnimation}
    />
  );
}
