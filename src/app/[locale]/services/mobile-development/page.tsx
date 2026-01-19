'use client';

import Hero from '@/components/mobile-development/Hero';
import WhyUs from '@/components/mobile-development/WhyUs';
import TechStackStrip from '@/components/mobile-development/TechStackStrip';
import ProcessPreview from '@/components/mobile-development/ProcessPreview';
import MobileServices from '@/components/mobile-development/MobileServices';
import MobileTestimonials from '@/components/mobile-development/MobileTestimonials';
import MobileFAQ from '@/components/mobile-development/MobileFAQ';
import MobileCTA from '@/components/mobile-development/MobileCTA';

export default function MobileDevelopmentPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <MobileServices />
            <WhyUs />
            <MobileTestimonials />
            <MobileFAQ />
            <MobileCTA />
        </main>
    );
}
