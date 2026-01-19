'use client';

import { motion } from 'framer-motion';
import {
    ClockIcon,
    UserGroupIcon,
    ShieldExclamationIcon,
    DocumentCheckIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        title: '24/7 Monitoring',
        description: 'Round-the-clock security operations center monitoring to detect and respond to threats in real-time.',
        icon: ClockIcon,
    },
    {
        title: 'Certified Experts',
        description: 'Team of CISSP, CEH, and OSCP certified professionals with extensive industry experience.',
        icon: UserGroupIcon,
    },
    {
        title: 'Proactive Defense',
        description: 'Advanced threat intelligence and proactive hunting to stop attacks before they happen.',
        icon: ShieldExclamationIcon,
    },
    {
        title: 'Compliance Ready',
        description: 'Expertise in ISO 27001, SOC 2, GDPR, HIPAA, and PCI-DSS compliance frameworks.',
        icon: DocumentCheckIcon,
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
                            <h2 className="text-overline mb-4 text-red-600">Why Choose Us</h2>
                            <h3 className="text-headline font-medium text-gray-900 mb-6">
                                Security expertise <br />
                                you can trust.
                            </h3>
                            <p className="text-body text-gray-600 mb-8">
                                We don't just implement security; we build comprehensive defense strategies. Our approach
                                prioritizes threat prevention, rapid response, and continuous improvement.
                            </p>
                            <div className="h-1 w-20 bg-red-500" />
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
                                    className="bg-white p-8 rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors">
                                        <feature.icon className="w-6 h-6 text-gray-600 group-hover:text-red-600 transition-colors" />
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
