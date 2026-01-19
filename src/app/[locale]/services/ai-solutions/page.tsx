'use client';

import Hero from '@/components/ai-solutions/Hero';
import WhyUs from '@/components/ai-solutions/WhyUs';
import TechStackStrip from '@/components/ai-solutions/TechStackStrip';
import ProcessPreview from '@/components/ai-solutions/ProcessPreview';
import AIServices from '@/components/ai-solutions/AIServices';
import AITestimonials from '@/components/ai-solutions/AITestimonials';
import AIFAQ from '@/components/ai-solutions/AIFAQ';
import AICTA from '@/components/ai-solutions/AICTA';

export default function AISolutionsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <AIServices />
            <WhyUs />
            <AITestimonials />
            <AIFAQ />
            <AICTA />
        </main>
    );
}
