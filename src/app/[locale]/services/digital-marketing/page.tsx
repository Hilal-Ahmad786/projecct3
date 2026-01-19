'use client';

import Hero from '@/components/digital-marketing/Hero';
import WhyUs from '@/components/digital-marketing/WhyUs';
import TechStackStrip from '@/components/digital-marketing/TechStackStrip';
import ProcessPreview from '@/components/digital-marketing/ProcessPreview';
import MarketingServices from '@/components/digital-marketing/MarketingServices';
import MarketingTestimonials from '@/components/digital-marketing/MarketingTestimonials';
import MarketingFAQ from '@/components/digital-marketing/MarketingFAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function DigitalMarketingPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <MarketingServices />
            <WhyUs />
            <MarketingTestimonials />
            <MarketingFAQ />
            <ServiceRequestCTA serviceType="digital-marketing" />
        </main>
    );
}
