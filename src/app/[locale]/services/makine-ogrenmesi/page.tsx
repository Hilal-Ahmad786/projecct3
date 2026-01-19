'use client';

import Hero from '@/components/machine-learning/Hero';
import TechStackStrip from '@/components/machine-learning/TechStackStrip';
import ProcessPreview from '@/components/machine-learning/ProcessPreview';
import MLServices from '@/components/machine-learning/MLServices';
import WhyUs from '@/components/machine-learning/WhyUs';
import MLTestimonials from '@/components/machine-learning/MLTestimonials';
import MLFAQ from '@/components/machine-learning/MLFAQ';
import MLCTA from '@/components/machine-learning/MLCTA';

export default function MakineOgrenmesiPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <MLServices />
            <WhyUs />
            <MLTestimonials />
            <MLFAQ />
            <MLCTA />
        </main>
    );
}
