'use client';

import Hero from '@/components/mlops-deployment/Hero';
import WhyUs from '@/components/mlops-deployment/WhyUs';
import TechStackStrip from '@/components/mlops-deployment/TechStackStrip';
import ProcessPreview from '@/components/mlops-deployment/ProcessPreview';
import Services from '@/components/mlops-deployment/Services';
import Testimonials from '@/components/mlops-deployment/Testimonials';
import FAQ from '@/components/mlops-deployment/FAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function MLOpsDeploymentPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <Services />
            <WhyUs />
            <Testimonials />
            <FAQ />
            <ServiceRequestCTA serviceType="mlops-deployment" />
        </main>
    );
}
