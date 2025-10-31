// src/app/[locale]/dienstleistungen/page.tsx
import ServicesHero      from '@/components/ServicesHero';
import ServicesSection   from '@/components/ServicesSection';
import PricingSection    from '@/components/PricingSection';
import WhyUsSection      from '@/components/WhyUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaBanner         from '@/components/CtaBanner';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dienstleistungen – PakSoft',
  description: 'Umfassende Technologiedienstleistungen einschließlich Webentwicklung, KI-Lösungen und Automatisierung.',
}

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