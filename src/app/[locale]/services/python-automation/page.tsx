'use client';

import Hero from '@/components/python-automation/Hero';
import WhyUs from '@/components/python-automation/WhyUs';
import TechStackStrip from '@/components/python-automation/TechStackStrip';
import ProcessPreview from '@/components/python-automation/ProcessPreview';
import AutomationServices from '@/components/python-automation/AutomationServices';
import AutomationTestimonials from '@/components/python-automation/AutomationTestimonials';
import AutomationFAQ from '@/components/python-automation/AutomationFAQ';
import AutomationCTA from '@/components/python-automation/AutomationCTA';

export default function PythonAutomationPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <AutomationServices />
            <WhyUs />
            <AutomationTestimonials />
            <AutomationFAQ />
            <AutomationCTA />
        </main>
    );
}
