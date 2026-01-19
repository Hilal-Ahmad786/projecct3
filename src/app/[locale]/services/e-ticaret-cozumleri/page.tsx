'use client';

import Hero from '@/components/e-commerce/Hero';
import TechStackStrip from '@/components/e-commerce/TechStackStrip';
import ProcessPreview from '@/components/e-commerce/ProcessPreview';
import ECommerceServices from '@/components/e-commerce/ECommerceServices';
import WhyUs from '@/components/e-commerce/WhyUs';
import ECommerceTestimonials from '@/components/e-commerce/ECommerceTestimonials';
import ECommerceFAQ from '@/components/e-commerce/ECommerceFAQ';
import ECommerceCTA from '@/components/e-commerce/ECommerceCTA';

export default function ETicaretCozumleriPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <ECommerceServices />
            <WhyUs />
            <ECommerceTestimonials />
            <ECommerceFAQ />
            <ECommerceCTA />
        </main>
    );
}
