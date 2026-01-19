'use client';

import Hero from '@/components/digital-marketing/Hero';
import TechStackStrip from '@/components/digital-marketing/TechStackStrip';
import ProcessPreview from '@/components/digital-marketing/ProcessPreview';
import MarketingServices from '@/components/digital-marketing/MarketingServices';
import WhyUs from '@/components/digital-marketing/WhyUs';
import MarketingTestimonials from '@/components/digital-marketing/MarketingTestimonials';
import MarketingFAQ from '@/components/digital-marketing/MarketingFAQ';
import MarketingCTA from '@/components/digital-marketing/MarketingCTA';

export default function DijitalPazarlamaPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <MarketingServices />
            <WhyUs />
            <MarketingTestimonials />
            <MarketingFAQ />
            <MarketingCTA />
        </main>
    );
}
