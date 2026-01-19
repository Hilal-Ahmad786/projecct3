'use client';

import Hero from '@/components/cybersecurity/Hero';
import WhyUs from '@/components/cybersecurity/WhyUs';
import TechStackStrip from '@/components/cybersecurity/TechStackStrip';
import ProcessPreview from '@/components/cybersecurity/ProcessPreview';
import SecurityServices from '@/components/cybersecurity/SecurityServices';
import SecurityTestimonials from '@/components/cybersecurity/SecurityTestimonials';
import SecurityFAQ from '@/components/cybersecurity/SecurityFAQ';
import SecurityCTA from '@/components/cybersecurity/SecurityCTA';

export default function CybersecurityPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <SecurityServices />
            <WhyUs />
            <SecurityTestimonials />
            <SecurityFAQ />
            <SecurityCTA />
        </main>
    );
}
