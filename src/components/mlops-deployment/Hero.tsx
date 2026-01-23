'use client';

import { ServicePageHero } from '@/components/services';
import { DevOpsAnimation } from '@/components/animations/service-animations';

export default function Hero() {
  return (
    <ServicePageHero
      translationKey="servicePages.mlopsDeployment.hero"
      accentColor="amber"
      ctaHref="/contact"
      secondaryCtaHref="/services/mlops-deployment/portfolio"
      AnimationComponent={DevOpsAnimation}
    />
  );
}
