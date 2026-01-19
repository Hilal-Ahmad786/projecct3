'use client';

import { motion } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    MegaphoneIcon,
    EnvelopeIcon,
    ChartBarIcon,
    HashtagIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';

export default function MarketingServices() {
    const services = [
        {
            title: 'Search Engine Optimization',
            description: 'Boost your organic visibility with technical SEO, content optimization, and strategic link building to rank higher on search engines.',
            icon: MagnifyingGlassIcon,
        },
        {
            title: 'PPC Advertising',
            description: 'Drive immediate results with targeted pay-per-click campaigns on Google Ads, Bing, and social media platforms.',
            icon: MegaphoneIcon,
        },
        {
            title: 'Email Marketing',
            description: 'Nurture leads and retain customers with personalized email campaigns, automation sequences, and newsletter strategies.',
            icon: EnvelopeIcon,
        },
        {
            title: 'Analytics & Reporting',
            description: 'Make data-driven decisions with comprehensive analytics, custom dashboards, and actionable performance insights.',
            icon: ChartBarIcon,
        },
        {
            title: 'Social Media Marketing',
            description: 'Build brand awareness and engagement across Facebook, Instagram, LinkedIn, Twitter, and emerging platforms.',
            icon: HashtagIcon,
        },
        {
            title: 'Content Marketing',
            description: 'Attract and convert your audience with compelling blog posts, videos, infographics, and downloadable resources.',
            icon: PencilSquareIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Comprehensive Marketing Solutions
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        From SEO to social media, we offer full-spectrum digital marketing services to grow your brand online.
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-rose-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-rose-500 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-rose-500 group-hover:text-white transition-colors duration-300" />
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
