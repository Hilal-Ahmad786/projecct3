'use client';

import { motion } from 'framer-motion';
import {
    RocketLaunchIcon,
    CodeBracketIcon,
    DevicePhoneMobileIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        title: 'Performance First',
        description: 'Lightning fast load times and optimized Core Web Vitals for superior SEO ranking.',
        icon: RocketLaunchIcon,
    },
    {
        title: 'Clean Code',
        description: 'Maintainable, scalable, and semantic code architecture using modern best practices.',
        icon: CodeBracketIcon,
    },
    {
        title: 'Mobile Native',
        description: 'Responsive designs that feel like native applications on every device size.',
        icon: DevicePhoneMobileIcon,
    },
    {
        title: 'Secure by Design',
        description: 'Enterprise-grade security implementation to protect your data and users.',
        icon: ShieldCheckIcon,
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
                            <h2 className="text-overline mb-4 text-gray-600">Why Choose Us</h2>
                            <h3 className="text-headline font-medium text-gray-900 mb-6">
                                Engineering excellence <br />
                                meets creative design.
                            </h3>
                            <p className="text-body text-gray-600 mb-8">
                                We don't just write code; we architect solutions. Our development philosophy
                                prioritizes long-term stability, performance, and user experience above all else.
                            </p>
                            <div className="h-1 w-20 bg-gray-500" />
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
                                    className="bg-white p-8 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors">
                                        <feature.icon className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
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
