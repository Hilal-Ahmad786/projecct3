'use client';

import Hero from '@/components/data-analytics/Hero';
import TechStackStrip from '@/components/data-analytics/TechStackStrip';
import ProcessPreview from '@/components/data-analytics/ProcessPreview';
import AnalyticsServices from '@/components/data-analytics/AnalyticsServices';
import WhyUs from '@/components/data-analytics/WhyUs';
import AnalyticsTestimonials from '@/components/data-analytics/AnalyticsTestimonials';
import AnalyticsFAQ from '@/components/data-analytics/AnalyticsFAQ';
import AnalyticsCTA from '@/components/data-analytics/AnalyticsCTA';

export default function VeriAnaliziPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <AnalyticsServices />
            <WhyUs />
            <AnalyticsTestimonials />
            <AnalyticsFAQ />
            <AnalyticsCTA />
        </main>
    );
}
