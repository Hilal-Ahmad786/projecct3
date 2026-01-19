'use client';

import Hero from '@/components/web-development/Hero';
import WhyUs from '@/components/web-development/WhyUs';
import TechStackStrip from '@/components/web-development/TechStackStrip';
import ProcessPreview from '@/components/web-development/ProcessPreview';
import WebDevServices from '@/components/web-development/WebDevServices';
import WebDevTestimonials from '@/components/web-development/WebDevTestimonials';
import WebDevFAQ from '@/components/web-development/WebDevFAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function WebDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TechStackStrip />
      <ProcessPreview />
      <WebDevServices />
      <WhyUs />
      <WebDevTestimonials />
      <WebDevFAQ />
      <ServiceRequestCTA serviceType="web-development" />
    </main>
  );
}
