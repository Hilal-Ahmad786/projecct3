// src/app/services/page.tsx
import ServicesHero      from '@/components/ServicesHero';
import ServicesSection   from '@/components/ServicesSection';
import PricingSection    from '@/components/PricingSection';
import WhyUsSection      from '@/components/WhyUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaBanner         from '@/components/CtaBanner';

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesSection />
      <PricingSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
