'use client';

import { motion } from 'framer-motion';
import {
    BoltIcon,
    ShieldCheckIcon,
    ClockIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function WhyUs() {
    const features = [
        {
            title: 'Lightning Fast Execution',
            description: 'Our optimized Python solutions process tasks in seconds that would take hours manually.',
            icon: BoltIcon,
        },
        {
            title: 'Error-Free Accuracy',
            description: 'Automated processes eliminate human error, ensuring consistent and reliable results every time.',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Time Savings',
            description: 'Free up your team to focus on high-value tasks while automation handles the repetitive work.',
            icon: ClockIcon,
        },
        {
            title: 'Cost Effective',
            description: 'Reduce operational costs significantly with automation that pays for itself quickly.',
            icon: CurrencyDollarIcon,
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
                            <h2 className="text-overline mb-4 text-orange-600">Why Choose Us</h2>
                            <h3 className="text-headline font-medium text-gray-900 mb-6">
                                Expert Python Automation
                            </h3>
                            <p className="text-body text-gray-600 mb-8">
                                We bring years of Python expertise to every project, delivering
                                automation solutions that are robust, maintainable, and scalable.
                            </p>
                            <div className="h-1 w-20 bg-orange-500" />
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
                                    className="bg-white p-8 rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-50 transition-colors">
                                        <feature.icon className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
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
