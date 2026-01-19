'use client';

import { motion } from 'framer-motion';
import {
    EyeIcon,
    CubeTransparentIcon,
    IdentificationIcon,
    VideoCameraIcon,
    DocumentMagnifyingGlassIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

export default function Services() {
    const services = [
        {
            title: 'Object Detection & Recognition',
            description: 'Build systems that detect, classify, and locate objects in images and video streams with high accuracy.',
            icon: EyeIcon,
        },
        {
            title: 'Image Segmentation',
            description: 'Precise pixel-level segmentation for medical imaging, autonomous vehicles, and industrial inspection.',
            icon: CubeTransparentIcon,
        },
        {
            title: 'Facial Recognition & Analysis',
            description: 'Implement face detection, verification, and analysis systems with privacy-preserving options.',
            icon: IdentificationIcon,
        },
        {
            title: 'Video Analytics',
            description: 'Real-time video processing for action recognition, tracking, anomaly detection, and surveillance.',
            icon: VideoCameraIcon,
        },
        {
            title: 'OCR & Document Processing',
            description: 'Extract text from documents, forms, and images with layout understanding and structured data output.',
            icon: DocumentMagnifyingGlassIcon,
        },
        {
            title: 'Generative Vision AI',
            description: 'Image generation, editing, and enhancement using diffusion models and GANs for creative applications.',
            icon: SparklesIcon,
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                        Computer Vision Services
                    </h2>
                    <p className="text-xl text-gray-600 font-light">
                        Give your applications the power to see, understand, and act on visual information.
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
                            <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-rose-600 transition-colors duration-300">
                                <service.icon className="w-6 h-6 text-rose-600 group-hover:text-white transition-colors duration-300" />
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
