'use client';

import Hero from '@/components/ui-ux-design/Hero';
import TechStackStrip from '@/components/ui-ux-design/TechStackStrip';
import ProcessPreview from '@/components/ui-ux-design/ProcessPreview';
import DesignServices from '@/components/ui-ux-design/DesignServices';
import WhyUs from '@/components/ui-ux-design/WhyUs';
import DesignTestimonials from '@/components/ui-ux-design/DesignTestimonials';
import DesignFAQ from '@/components/ui-ux-design/DesignFAQ';
import DesignCTA from '@/components/ui-ux-design/DesignCTA';

export default function UIUXTasarimPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <DesignServices />
            <WhyUs />
            <DesignTestimonials />
            <DesignFAQ />
            <DesignCTA />
        </main>
    );
}
