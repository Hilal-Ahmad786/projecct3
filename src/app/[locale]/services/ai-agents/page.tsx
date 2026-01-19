'use client';

import Hero from '@/components/ai-agents/Hero';
import WhyUs from '@/components/ai-agents/WhyUs';
import TechStackStrip from '@/components/ai-agents/TechStackStrip';
import ProcessPreview from '@/components/ai-agents/ProcessPreview';
import Services from '@/components/ai-agents/Services';
import Testimonials from '@/components/ai-agents/Testimonials';
import FAQ from '@/components/ai-agents/FAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function AIAgentsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <Services />
            <WhyUs />
            <Testimonials />
            <FAQ />
            <ServiceRequestCTA serviceType="ai-agents" />
        </main>
    );
}
