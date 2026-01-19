'use client';

import Hero from '@/components/ui-ux-design/Hero';
import WhyUs from '@/components/ui-ux-design/WhyUs';
import TechStackStrip from '@/components/ui-ux-design/TechStackStrip';
import ProcessPreview from '@/components/ui-ux-design/ProcessPreview';
import DesignServices from '@/components/ui-ux-design/DesignServices';
import DesignTestimonials from '@/components/ui-ux-design/DesignTestimonials';
import DesignFAQ from '@/components/ui-ux-design/DesignFAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function UIUXDesignPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <DesignServices />
            <WhyUs />
            <DesignTestimonials />
            <DesignFAQ />
            <ServiceRequestCTA serviceType="ui-ux-design" />
        </main>
    );
}
