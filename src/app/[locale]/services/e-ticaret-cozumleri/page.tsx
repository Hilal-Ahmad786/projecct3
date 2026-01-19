'use client';

import Hero from '@/components/e-commerce/Hero';
import TechStackStrip from '@/components/e-commerce/TechStackStrip';
import ProcessPreview from '@/components/e-commerce/ProcessPreview';
import EcommerceServices from '@/components/e-commerce/EcommerceServices';
import WhyUs from '@/components/e-commerce/WhyUs';
import EcommerceTestimonials from '@/components/e-commerce/EcommerceTestimonials';
import EcommerceFAQ from '@/components/e-commerce/EcommerceFAQ';
import EcommerceCTA from '@/components/e-commerce/EcommerceCTA';

export default function ETicaretCozumleriPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <EcommerceServices />
            <WhyUs />
            <EcommerceTestimonials />
            <EcommerceFAQ />
            <EcommerceCTA />
        </main>
    );
}
