'use client';

import { motion } from 'framer-motion';
import {
    LightBulbIcon,
    ChartPieIcon,
    ShieldCheckIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export default function WhyUs() {
    const features = [
        {
            title: 'Industry Expertise',
            description: 'Our team brings deep knowledge across retail, finance, healthcare, and manufacturing sectors, ensuring analytics tailored to your industry.',
            icon: LightBulbIcon,
        },
        {
            title: 'Proven Methodology',
            description: 'We follow a structured approach combining best practices in data science with agile delivery to ensure consistent, high-quality results.',
            icon: ChartPieIcon,
        },
        {
            title: 'Data Security',
            description: 'Enterprise-grade security protocols protect your sensitive data throughout the analytics lifecycle, ensuring compliance with regulations.',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Rapid Time-to-Value',
            description: 'Our streamlined processes and pre-built components accelerate deployment, delivering actionable insights in weeks, not months.',
            icon: ClockIcon,
        },
    ];

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
                            <h2 className="text-overline mb-4 text-cyan-600">Why Choose Us</h2>
                            <h3 className="text-headline font-medium text-gray-900 mb-6">
                                Your Trusted Analytics Partner
                            </h3>
                            <p className="text-body text-gray-600 mb-8">
                                We combine cutting-edge technology with deep analytical expertise to deliver insights that transform how you do business.
                            </p>
                            <div className="h-1 w-20 bg-cyan-500" />
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
                                    className="bg-white p-8 rounded-xl border border-gray-100 hover:border-cyan-100 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-50 transition-colors">
                                        <feature.icon className="w-6 h-6 text-gray-600 group-hover:text-cyan-600 transition-colors" />
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
