'use client';

import { motion } from 'framer-motion';
import {
    ShoppingCartIcon,
    CreditCardIcon,
    TruckIcon,
    ChartBarIcon,
    CogIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function EcommerceServices() {
    const services = [
        {
            title: 'Custom Storefronts',
            description: 'Beautifully designed, fully customized online stores that reflect your brand identity and provide exceptional shopping experiences.',
            icon: ShoppingCartIcon,
        },
        {
            title: 'Payment Integration',
            description: 'Seamless integration with multiple payment gateways including Stripe, PayPal, and local payment methods for global reach.',
            icon: CreditCardIcon,
        },
        {
            title: 'Inventory Management',
            description: 'Real-time inventory tracking, automated stock alerts, and multi-warehouse support to streamline your operations.',
            icon: TruckIcon,
        },
        {
            title: 'Analytics & Insights',
            description: 'Comprehensive dashboards with sales analytics, customer behavior tracking, and conversion optimization insights.',
            icon: ChartBarIcon,
        },
        {
            title: 'Order Processing',
            description: 'Automated order management with fulfillment tracking, returns handling, and customer notification systems.',
            icon: CogIcon,
        },
        {
            title: 'Mobile Commerce',
            description: 'Responsive, mobile-first designs and progressive web apps that capture the growing mobile shopping market.',
            icon: GlobeAltIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Complete E-Commerce Solutions
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        Everything you need to launch, run, and scale a successful online store
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
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
