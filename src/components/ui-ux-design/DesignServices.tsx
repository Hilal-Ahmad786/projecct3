'use client';

import { motion } from 'framer-motion';
import {
    PaintBrushIcon,
    DevicePhoneMobileIcon,
    CursorArrowRaysIcon,
    SparklesIcon,
    RectangleGroupIcon,
    DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

export default function DesignServices() {
    const services = [
        {
            title: 'UI Design',
            description: 'Beautiful, pixel-perfect interfaces that reflect your brand identity and create memorable visual experiences for your users.',
            icon: PaintBrushIcon,
        },
        {
            title: 'Mobile Design',
            description: 'Native and cross-platform mobile app designs optimized for iOS and Android, ensuring seamless experiences on every device.',
            icon: DevicePhoneMobileIcon,
        },
        {
            title: 'UX Research',
            description: 'Deep user research, persona development, and journey mapping to understand your audience and their needs.',
            icon: CursorArrowRaysIcon,
        },
        {
            title: 'Prototyping',
            description: 'Interactive prototypes that bring your ideas to life, allowing you to test and validate concepts before development.',
            icon: SparklesIcon,
        },
        {
            title: 'Design Systems',
            description: 'Scalable component libraries and style guides that ensure consistency across all your digital products.',
            icon: RectangleGroupIcon,
        },
        {
            title: 'Usability Testing',
            description: 'Comprehensive user testing sessions to identify pain points and optimize your product for maximum engagement.',
            icon: DocumentDuplicateIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Our Design Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        From initial concept to final polish, we offer comprehensive design solutions to bring your vision to life.
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
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pink-500 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-pink-500 group-hover:text-white transition-colors duration-300" />
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
