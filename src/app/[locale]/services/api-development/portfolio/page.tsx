'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import APICTA from '@/components/api-development/APICTA';

export default function PortfolioPage() {
    const projects = [
        {
            title: 'E-Commerce Platform API',
            description: 'High-performance REST API powering a marketplace with 500K+ products and real-time inventory sync.',
            result: '10M+ daily requests',
            resultLabel: 'Daily Requests',
            tech: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
            challenge: 'The client needed an API that could handle massive traffic spikes during sales events while maintaining sub-100ms response times.',
            solution: 'We implemented a multi-layer caching strategy with Redis, database connection pooling, and horizontal scaling on AWS ECS.',
            image: '/api-ecommerce.jpg'
        },
        {
            title: 'FinTech Integration Hub',
            description: 'Secure API gateway connecting 20+ payment providers and banking systems with PCI compliance.',
            result: '99.99% uptime',
            resultLabel: 'Uptime',
            tech: ['FastAPI', 'GraphQL', 'Docker', 'AWS'],
            challenge: 'Integrating multiple payment providers with different protocols while maintaining PCI-DSS compliance and high availability.',
            solution: 'Built a unified API gateway with adapter pattern for each provider, implemented circuit breakers, and deployed across multiple availability zones.',
            image: '/api-fintech.jpg'
        },
        {
            title: 'Healthcare Data Platform',
            description: 'HIPAA-compliant API infrastructure for patient data exchange across multiple hospital systems.',
            result: '3s to 200ms latency',
            resultLabel: 'Latency Improvement',
            tech: ['Node.js', 'MongoDB', 'Redis', 'Kubernetes'],
            challenge: 'Legacy systems caused 3+ second response times, making real-time patient data access impossible for doctors.',
            solution: 'Implemented strategic caching, optimized database queries, and introduced a message queue for async operations.',
            image: '/api-healthcare.jpg'
        },
        {
            title: 'IoT Device Management',
            description: 'Real-time API with WebSocket support managing 100K+ connected devices globally.',
            result: '100K+ devices',
            resultLabel: 'Connected Devices',
            tech: ['FastAPI', 'WebSocket', 'TimescaleDB', 'MQTT'],
            challenge: 'Managing real-time communication with 100K+ IoT devices while processing millions of telemetry events daily.',
            solution: 'Designed an event-driven architecture with MQTT for device communication and TimescaleDB for time-series data storage.',
            image: '/api-iot.jpg'
        }
    ];

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
                        Our Work
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        API Development Portfolio
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Explore our successful API projects across various industries. From high-traffic e-commerce platforms to secure fintech integrations, see how we deliver scalable API solutions.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Image/Visual */}
                            <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                <div className="aspect-video bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl overflow-hidden relative group">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-teal-600 mb-2">{project.result}</div>
                                            <div className="text-teal-500 font-medium">{project.resultLabel}</div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                                        {project.tech.map((tech, techIndex) => (
                                            <span key={techIndex} className="px-3 py-1 bg-teal-600 text-white text-sm rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h2>
                                <p className="text-gray-600 text-lg mb-6">{project.description}</p>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">The Challenge</h4>
                                        <p className="text-gray-600">{project.challenge}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Our Solution</h4>
                                        <p className="text-gray-600">{project.solution}</p>
                                    </div>
                                </div>

                                <button className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700 transition-colors group">
                                    View Case Study
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
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
