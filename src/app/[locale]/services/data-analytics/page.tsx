'use client';

import Hero from '@/components/data-analytics/Hero';
import WhyUs from '@/components/data-analytics/WhyUs';
import TechStackStrip from '@/components/data-analytics/TechStackStrip';
import ProcessPreview from '@/components/data-analytics/ProcessPreview';
import AnalyticsServices from '@/components/data-analytics/AnalyticsServices';
import AnalyticsTestimonials from '@/components/data-analytics/AnalyticsTestimonials';
import AnalyticsFAQ from '@/components/data-analytics/AnalyticsFAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function DataAnalyticsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <AnalyticsServices />
            <WhyUs />
            <AnalyticsTestimonials />
            <AnalyticsFAQ />
            <ServiceRequestCTA serviceType="data-analytics" />
        </main>
    );
}
