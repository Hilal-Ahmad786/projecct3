'use client';

import { motion } from 'framer-motion';
import {
    BoltIcon,
    ShieldCheckIcon,
    DocumentTextIcon,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function WhyUs() {
    const features = [
        {
            title: 'High Performance',
            description: 'Our APIs are optimized for speed with efficient database queries, caching layers, and asynchronous processing to handle millions of requests.',
            icon: BoltIcon,
        },
        {
            title: 'Enterprise Security',
            description: 'We implement industry-leading security practices including encryption, input validation, and protection against common vulnerabilities like SQL injection and XSS.',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Clear Documentation',
            description: 'Every API comes with comprehensive documentation including endpoint descriptions, request/response examples, and interactive testing environments.',
            icon: DocumentTextIcon,
        },
        {
            title: 'Scalable Architecture',
            description: 'Built with horizontal scaling in mind, our APIs use microservices patterns and cloud-native technologies to grow with your business demands.',
            icon: ArrowTrendingUpIcon,
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
                            <h2 className="text-overline mb-4 text-teal-600">Why Choose Us</h2>
                            <h3 className="text-headline font-medium text-gray-900 mb-6">
                                API Excellence Delivered
                            </h3>
                            <p className="text-body text-gray-600 mb-8">
                                With years of experience building APIs for startups and enterprises alike,
                                we bring deep technical expertise and a commitment to quality that sets us apart.
                            </p>
                            <div className="h-1 w-20 bg-teal-500" />
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
                                    className="bg-white p-8 rounded-xl border border-gray-100 hover:border-teal-100 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-50 transition-colors">
                                        <feature.icon className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
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
