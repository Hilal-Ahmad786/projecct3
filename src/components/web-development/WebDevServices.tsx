'use client';

import { motion } from 'framer-motion';
import {
    ShoppingCartIcon,
    ComputerDesktopIcon,
    ServerIcon,
    DevicePhoneMobileIcon,
    CloudIcon,
    CodeBracketIcon
} from '@heroicons/react/24/outline';

export default function WebDevServices() {
    const services = [
        {
            title: 'Custom Web Applications',
            description: 'Tailor-made web solutions built from the ground up to meet your unique business requirements and workflow.',
            icon: ComputerDesktopIcon,
        },
        {
            title: 'E-commerce Solutions',
            description: 'Powerful online stores with secure payments, inventory management, and seamless user experiences that drive conversions.',
            icon: ShoppingCartIcon,
        },
        {
            title: 'Content Management Systems',
            description: 'User-friendly CMS platforms that empower your team to manage content efficiently without technical expertise.',
            icon: ServerIcon,
        },
        {
            title: 'Progressive Web Apps',
            description: 'Fast, reliable, and engaging web applications that work offline and feel like native mobile apps.',
            icon: DevicePhoneMobileIcon,
        },
        {
            title: 'API Integration',
            description: 'Seamlessly connect your web application with third-party services, payment gateways, and external data sources.',
            icon: CloudIcon,
        },
        {
            title: 'Performance Optimization',
            description: 'Speed up your existing website with advanced optimization techniques for better user experience and SEO rankings.',
            icon: CodeBracketIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Our Web Development Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        From concept to deployment, we deliver comprehensive web solutions that help businesses thrive in the digital landscape.
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
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
