'use client';

import Hero from '@/components/llm-finetuning/Hero';
import WhyUs from '@/components/llm-finetuning/WhyUs';
import TechStackStrip from '@/components/llm-finetuning/TechStackStrip';
import ProcessPreview from '@/components/llm-finetuning/ProcessPreview';
import Services from '@/components/llm-finetuning/Services';
import Testimonials from '@/components/llm-finetuning/Testimonials';
import FAQ from '@/components/llm-finetuning/FAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function LLMFinetuningPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <Services />
            <WhyUs />
            <Testimonials />
            <FAQ />
            <ServiceRequestCTA serviceType="llm-finetuning" />
        </main>
    );
}
