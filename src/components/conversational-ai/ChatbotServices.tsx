'use client';

import { motion } from 'framer-motion';
import {
    ChatBubbleBottomCenterTextIcon,
    GlobeAltIcon,
    CpuChipIcon,
    UserGroupIcon,
    PhoneIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function ChatbotServices() {
    const services = [
        {
            title: 'Custom Chatbots',
            description: 'Tailored conversational agents designed for your specific business needs, from customer support to sales qualification.',
            icon: ChatBubbleBottomCenterTextIcon,
        },
        {
            title: 'Multi-Channel Support',
            description: 'Deploy your AI assistant across web, mobile, WhatsApp, Facebook Messenger, and more from a single platform.',
            icon: GlobeAltIcon,
        },
        {
            title: 'NLP Integration',
            description: 'Advanced natural language processing to understand user intent, sentiment, and context for human-like conversations.',
            icon: CpuChipIcon,
        },
        {
            title: 'Virtual Assistants',
            description: 'Intelligent assistants that handle scheduling, FAQs, order tracking, and complex multi-turn conversations.',
            icon: UserGroupIcon,
        },
        {
            title: 'Voice Bots',
            description: 'Voice-enabled AI solutions for call centers and IVR systems with natural speech recognition and synthesis.',
            icon: PhoneIcon,
        },
        {
            title: 'Knowledge Base AI',
            description: 'AI-powered systems that learn from your documentation to provide accurate, contextual answers instantly.',
            icon: DocumentTextIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Conversational AI Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        From simple FAQ bots to sophisticated virtual assistants, we build AI solutions that transform how you engage with customers.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-violet-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-violet-600 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-violet-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
