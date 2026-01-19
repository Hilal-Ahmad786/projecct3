'use client';

import { motion } from 'framer-motion';
import {
    BoltIcon,
    LanguageIcon,
    ShieldCheckIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        title: 'Lightning Fast Responses',
        description: 'Sub-second response times ensure natural, fluid conversations that keep users engaged.',
        icon: BoltIcon,
    },
    {
        title: 'Multi-Language Support',
        description: 'Deploy chatbots that speak your customers language with native NLP capabilities in 50+ languages.',
        icon: LanguageIcon,
    },
    {
        title: 'Enterprise Security',
        description: 'SOC 2 compliant infrastructure with end-to-end encryption for sensitive conversations.',
        icon: ShieldCheckIcon,
    },
    {
        title: 'Analytics & Insights',
        description: 'Deep conversation analytics to understand user intent and continuously improve responses.',
        icon: ChartBarIcon,
    },
];

export default function WhyUs() {
    return (
        <section className="py-32 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Section Header */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-overline mb-4 text-violet-600">Why Choose Us</h2>
                            <h3 className="text-headline font-medium text-gray-900 mb-6">
                                Conversational AI <br />
                                that actually works.
                            </h3>
                            <p className="text-body text-gray-600 mb-8">
                                We dont just build chatbots; we engineer intelligent conversation systems.
                                Our AI solutions understand context, learn from interactions, and deliver
                                meaningful responses that drive real business outcomes.
                            </p>
                            <div className="h-1 w-20 bg-violet-500" />
                        </motion.div>
                    </div>

                    {/* Features Grid */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white p-8 rounded-xl border border-gray-100 hover:border-violet-100 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-violet-50 transition-colors">
                                        <feature.icon className="w-6 h-6 text-gray-600 group-hover:text-violet-600 transition-colors" />
                                    </div>
                                    <h4 className="text-title font-medium text-gray-900 mb-3">{feature.title}</h4>
                                    <p className="text-body text-gray-500">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
