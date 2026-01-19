'use client';

import { motion } from 'framer-motion';
import {
    ServerIcon,
    CircleStackIcon,
    ArrowsRightLeftIcon,
    CubeTransparentIcon,
    BoltIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function APIServices() {
    const services = [
        {
            title: 'REST API Development',
            description: 'Build clean, well-structured RESTful APIs following industry standards with proper HTTP methods, status codes, and resource naming conventions.',
            icon: ServerIcon,
        },
        {
            title: 'GraphQL APIs',
            description: 'Create flexible GraphQL APIs that allow clients to request exactly the data they need, reducing over-fetching and improving performance.',
            icon: CircleStackIcon,
        },
        {
            title: 'API Integration',
            description: 'Seamlessly connect your systems with third-party services, payment gateways, CRMs, and other external APIs for unified data flow.',
            icon: ArrowsRightLeftIcon,
        },
        {
            title: 'Authentication & Security',
            description: 'Implement robust authentication using OAuth 2.0, JWT tokens, API keys, and role-based access control to protect your endpoints.',
            icon: CubeTransparentIcon,
        },
        {
            title: 'Rate Limiting & Caching',
            description: 'Optimize API performance with intelligent rate limiting, request throttling, and caching strategies to handle high traffic loads.',
            icon: BoltIcon,
        },
        {
            title: 'API Documentation',
            description: 'Deliver comprehensive, interactive API documentation using OpenAPI/Swagger specifications with code examples and testing capabilities.',
            icon: ShieldCheckIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Our API Development Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        Comprehensive API solutions tailored to your business needs
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
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
