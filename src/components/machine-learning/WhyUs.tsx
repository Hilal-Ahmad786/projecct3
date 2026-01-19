'use client';

import { motion } from 'framer-motion';
import {
    AcademicCapIcon,
    BeakerIcon,
    ShieldCheckIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function WhyUs() {
    const features = [
        {
            title: 'Expert Data Scientists',
            description: 'Our team includes PhD-level researchers and experienced ML engineers who have delivered solutions across diverse industries.',
            icon: AcademicCapIcon,
        },
        {
            title: 'Research-Driven Approach',
            description: 'We stay at the forefront of ML innovation, incorporating the latest techniques and frameworks into production-ready solutions.',
            icon: BeakerIcon,
        },
        {
            title: 'Enterprise-Grade Security',
            description: 'Your data is protected with industry-leading security practices, compliance standards, and privacy-preserving ML techniques.',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Continuous Improvement',
            description: 'Our MLOps practices ensure your models are continuously monitored, retrained, and improved as new data becomes available.',
            icon: ArrowPathIcon,
        },
    ];

    return (
        <section className="py-32 bg-violet-50">
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
                                Your Trusted ML Partner
                            </h3>
                            <p className="text-body text-gray-600 mb-8">
                                We combine deep technical expertise with business acumen to deliver ML solutions
                                that create real value and measurable ROI for your organization.
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
                                    className="bg-white p-8 rounded-xl border border-gray-100 hover:border-violet-200 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-violet-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-violet-100 transition-colors">
                                        <feature.icon className="w-6 h-6 text-violet-600 group-hover:text-violet-700 transition-colors" />
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
