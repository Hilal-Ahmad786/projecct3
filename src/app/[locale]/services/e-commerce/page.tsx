'use client';

import Hero from '@/components/e-commerce/Hero';
import WhyUs from '@/components/e-commerce/WhyUs';
import TechStackStrip from '@/components/e-commerce/TechStackStrip';
import ProcessPreview from '@/components/e-commerce/ProcessPreview';
import EcommerceServices from '@/components/e-commerce/EcommerceServices';
import EcommerceTestimonials from '@/components/e-commerce/EcommerceTestimonials';
import EcommerceFAQ from '@/components/e-commerce/EcommerceFAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function EcommercePage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <EcommerceServices />
            <WhyUs />
            <EcommerceTestimonials />
            <EcommerceFAQ />
            <ServiceRequestCTA serviceType="e-commerce" />
        </main>
    );
}
