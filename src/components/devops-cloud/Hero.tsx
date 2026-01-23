'use client';

import { ServicePageHero } from '@/components/services';
import { DevOpsAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.devopsCloud.hero"
      accentColor="blue"
      ctaHref="/contact"
      secondaryCtaHref="/services/devops-cloud/portfolio"
      AnimationComponent={DevOpsAnimation}
    />
  );
}
