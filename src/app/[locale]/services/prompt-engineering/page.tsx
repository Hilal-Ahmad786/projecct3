'use client';

import Hero from '@/components/prompt-engineering/Hero';
import WhyUs from '@/components/prompt-engineering/WhyUs';
import TechStackStrip from '@/components/prompt-engineering/TechStackStrip';
import ProcessPreview from '@/components/prompt-engineering/ProcessPreview';
import Services from '@/components/prompt-engineering/Services';
import Testimonials from '@/components/prompt-engineering/Testimonials';
import FAQ from '@/components/prompt-engineering/FAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function PromptEngineeringPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <Services />
            <WhyUs />
            <Testimonials />
            <FAQ />
            <ServiceRequestCTA serviceType="prompt-engineering" />
        </main>
    );
}
