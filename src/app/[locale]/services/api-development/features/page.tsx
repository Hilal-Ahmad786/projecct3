'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import APICTA from '@/components/api-development/APICTA';

const features = [
    {
        title: 'RESTful API Design & Development',
        description: 'Build clean, intuitive REST APIs following industry best practices and HTTP standards for seamless integration.'
    },
    {
        title: 'GraphQL Schema Design',
        description: 'Flexible GraphQL endpoints that give clients exactly the data they need in a single request.'
    },
    {
        title: 'OAuth 2.0 & JWT Authentication',
        description: 'Enterprise-grade security with OAuth 2.0 flows and JWT token-based authentication systems.'
    },
    {
        title: 'API Rate Limiting & Throttling',
        description: 'Protect your APIs from abuse with intelligent rate limiting and request throttling mechanisms.'
    },
    {
        title: 'Swagger/OpenAPI Documentation',
        description: 'Interactive API documentation using Swagger/OpenAPI for seamless developer experience.'
    },
    {
        title: 'Webhook Implementation',
        description: 'Real-time event notifications with secure webhook delivery and retry mechanisms.'
    },
    {
        title: 'Database Integration (SQL & NoSQL)',
        description: 'Seamless integration with PostgreSQL, MongoDB, Redis, and other database systems.'
    },
    {
        title: 'Caching with Redis',
        description: 'High-performance caching layers for reduced latency and improved API response times.'
    },
    {
        title: 'API Versioning Strategies',
        description: 'Future-proof APIs with proper versioning strategies ensuring backward compatibility.'
    },
    {
        title: 'Comprehensive Error Handling',
        description: 'Consistent error responses with meaningful messages and proper HTTP status codes.'
    }
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <span className="text-teal-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Capabilities
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        API Development Features
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Robust and scalable API solutions to power your applications and integrate your systems seamlessly.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 bg-gray-50 rounded-xl border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors">
                                    <CheckCircleIcon className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-20">
                <APICTA />
            </div>
        </main>
    );
}
