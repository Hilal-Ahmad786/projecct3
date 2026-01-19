'use client';

import Hero from '@/components/rag-solutions/Hero';
import WhyUs from '@/components/rag-solutions/WhyUs';
import TechStackStrip from '@/components/rag-solutions/TechStackStrip';
import ProcessPreview from '@/components/rag-solutions/ProcessPreview';
import Services from '@/components/rag-solutions/Services';
import Testimonials from '@/components/rag-solutions/Testimonials';
import FAQ from '@/components/rag-solutions/FAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function RAGSolutionsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <Services />
            <WhyUs />
            <Testimonials />
            <FAQ />
            <ServiceRequestCTA serviceType="rag-solutions" />
        </main>
    );
}
