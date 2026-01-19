'use client';

import Hero from '@/components/api-development/Hero';
import WhyUs from '@/components/api-development/WhyUs';
import TechStackStrip from '@/components/api-development/TechStackStrip';
import ProcessPreview from '@/components/api-development/ProcessPreview';
import APIServices from '@/components/api-development/APIServices';
import APITestimonials from '@/components/api-development/APITestimonials';
import APIFAQ from '@/components/api-development/APIFAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function APIDevelopmentPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <APIServices />
            <WhyUs />
            <APITestimonials />
            <APIFAQ />
            <ServiceRequestCTA serviceType="api-development" />
        </main>
    );
}
