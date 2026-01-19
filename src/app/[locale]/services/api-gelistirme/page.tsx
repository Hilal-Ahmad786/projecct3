'use client';

import Hero from '@/components/api-development/Hero';
import TechStackStrip from '@/components/api-development/TechStackStrip';
import ProcessPreview from '@/components/api-development/ProcessPreview';
import APIServices from '@/components/api-development/APIServices';
import WhyUs from '@/components/api-development/WhyUs';
import APITestimonials from '@/components/api-development/APITestimonials';
import APIFAQ from '@/components/api-development/APIFAQ';
import APICTA from '@/components/api-development/APICTA';

export default function APIGelistirmePage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <APIServices />
            <WhyUs />
            <APITestimonials />
            <APIFAQ />
            <APICTA />
        </main>
    );
}
