'use client';

import Hero from '@/components/computer-vision/Hero';
import WhyUs from '@/components/computer-vision/WhyUs';
import TechStackStrip from '@/components/computer-vision/TechStackStrip';
import ProcessPreview from '@/components/computer-vision/ProcessPreview';
import Services from '@/components/computer-vision/Services';
import Testimonials from '@/components/computer-vision/Testimonials';
import FAQ from '@/components/computer-vision/FAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function ComputerVisionPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <Services />
            <WhyUs />
            <Testimonials />
            <FAQ />
            <ServiceRequestCTA serviceType="computer-vision" />
        </main>
    );
}
