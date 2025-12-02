'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { useSectionTranslations } from '@/hooks/useTranslations';

export default function WebDevTestimonials() {
    const t = useSectionTranslations('webDevelopment.testimonials');

    const testimonials = [
        {
            quote: t('items.0.quote'),
            author: t('items.0.author'),
            role: t('items.0.role'),
            rating: 5
        },
        {
            quote: t('items.1.quote'),
            author: t('items.1.author'),
            role: t('items.1.role'),
            rating: 5
        },
        {
            quote: t('items.2.quote'),
            author: t('items.2.author'),
            role: t('items.2.role'),
            rating: 5
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-gray-500 font-medium tracking-wider uppercase text-sm mb-4 block">
                        {t('eyebrow')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                        {t('title')}
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-gray-50 p-8 rounded-2xl relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-gray-900" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">
                                "{item.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">
                                    {item.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{item.author}</div>
                                    <div className="text-sm text-gray-500">{item.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
