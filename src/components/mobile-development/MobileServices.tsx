'use client';

import { motion } from 'framer-motion';
import {
    DevicePhoneMobileIcon,
    ArrowPathIcon,
    BellAlertIcon,
    ShieldCheckIcon,
    CloudArrowUpIcon,
    ChartPieIcon
} from '@heroicons/react/24/outline';

export default function MobileServices() {
    const services = [
        {
            title: 'iOS Development',
            description: 'Build stunning native iOS apps using Swift and SwiftUI. We create high-performance applications optimized for iPhone, iPad, and Apple Watch.',
            icon: DevicePhoneMobileIcon,
        },
        {
            title: 'Android Development',
            description: 'Develop powerful Android applications using Kotlin and Jetpack Compose. We ensure compatibility across the diverse Android ecosystem.',
            icon: ArrowPathIcon,
        },
        {
            title: 'Cross-Platform Apps',
            description: 'Save time and budget with React Native or Flutter development. One codebase delivers native experiences on both iOS and Android.',
            icon: BellAlertIcon,
        },
        {
            title: 'App Maintenance',
            description: 'Keep your app running smoothly with regular updates, bug fixes, and performance improvements. We provide ongoing support and monitoring.',
            icon: ShieldCheckIcon,
        },
        {
            title: 'Performance Optimization',
            description: 'Optimize your app for speed, battery efficiency, and smooth animations. We ensure your users enjoy a fast, responsive experience.',
            icon: CloudArrowUpIcon,
        },
        {
            title: 'App Store Optimization',
            description: 'Maximize your app visibility with ASO strategies. We optimize listings, keywords, and screenshots to drive organic downloads.',
            icon: ChartPieIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Mobile Development Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        From concept to launch, we provide comprehensive mobile app development services tailored to your business needs.
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
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
