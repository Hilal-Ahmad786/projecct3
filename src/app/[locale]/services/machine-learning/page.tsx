'use client';

import Hero from '@/components/machine-learning/Hero';
import WhyUs from '@/components/machine-learning/WhyUs';
import TechStackStrip from '@/components/machine-learning/TechStackStrip';
import ProcessPreview from '@/components/machine-learning/ProcessPreview';
import MLServices from '@/components/machine-learning/MLServices';
import MLTestimonials from '@/components/machine-learning/MLTestimonials';
import MLFAQ from '@/components/machine-learning/MLFAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function MachineLearningPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <MLServices />
            <WhyUs />
            <MLTestimonials />
            <MLFAQ />
            <ServiceRequestCTA serviceType="machine-learning" />
        </main>
    );
}
