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
import { useSectionTranslations } from '@/hooks/useTranslations';

export default function WebDevServices() {
    const t = useSectionTranslations('webDevelopment.services');

    const services = [
        {
            title: t('items.0.title'),
            description: t('items.0.description'),
            icon: ShoppingCartIcon,
        },
        {
            title: t('items.1.title'),
            description: t('items.1.description'),
            icon: ComputerDesktopIcon,
        },
        {
            title: t('items.2.title'),
            description: t('items.2.description'),
            icon: ServerIcon,
        },
        {
            title: t('items.3.title'),
            description: t('items.3.description'),
            icon: DevicePhoneMobileIcon,
        },
        {
            title: t('items.4.title'),
            description: t('items.4.description'),
            icon: CloudIcon,
        },
        {
            title: t('items.5.title'),
            description: t('items.5.description'),
            icon: CodeBracketIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        {t('subtitle')}
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
