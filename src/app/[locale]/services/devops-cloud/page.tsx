'use client';

import Hero from '@/components/devops-cloud/Hero';
import WhyUs from '@/components/devops-cloud/WhyUs';
import TechStackStrip from '@/components/devops-cloud/TechStackStrip';
import ProcessPreview from '@/components/devops-cloud/ProcessPreview';
import DevOpsServices from '@/components/devops-cloud/DevOpsServices';
import DevOpsTestimonials from '@/components/devops-cloud/DevOpsTestimonials';
import DevOpsFAQ from '@/components/devops-cloud/DevOpsFAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function DevOpsCloudPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <DevOpsServices />
            <WhyUs />
            <DevOpsTestimonials />
            <DevOpsFAQ />
            <ServiceRequestCTA serviceType="devops-cloud" />
        </main>
    );
}
