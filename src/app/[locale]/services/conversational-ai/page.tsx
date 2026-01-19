'use client';

import Hero from '@/components/conversational-ai/Hero';
import WhyUs from '@/components/conversational-ai/WhyUs';
import TechStackStrip from '@/components/conversational-ai/TechStackStrip';
import ProcessPreview from '@/components/conversational-ai/ProcessPreview';
import ChatbotServices from '@/components/conversational-ai/ChatbotServices';
import ChatbotTestimonials from '@/components/conversational-ai/ChatbotTestimonials';
import ChatbotFAQ from '@/components/conversational-ai/ChatbotFAQ';
import { ServiceRequestCTA } from '@/components/services';

export default function ConversationalAIPage() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TechStackStrip />
            <ProcessPreview />
            <ChatbotServices />
            <WhyUs />
            <ChatbotTestimonials />
            <ChatbotFAQ />
            <ServiceRequestCTA serviceType="conversational-ai" />
        </main>
    );
}
