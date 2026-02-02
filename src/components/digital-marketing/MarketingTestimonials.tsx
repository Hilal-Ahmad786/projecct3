'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { useSectionTranslations } from '@/hooks/useTranslations';

export default function MarketingTestimonials() {
    const t = useSectionTranslations('digitalMarketing');

    const getTestimonials = () => {
        try {
            const items = t('testimonials.items');
            if (Array.isArray(items) && items.length > 0) return items;
        } catch (e) { /* fallback */ }
        return [
            {
                quote: 'Their SEO strategy doubled our organic traffic in just 6 months. The team truly understands search engine optimization and delivers measurable results.',
                author: 'Sarah Mitchell',
                role: 'Marketing Director, TechStart Inc.',
                rating: 5
            },
            {
                quote: 'The PPC campaigns they manage for us have a 340% ROI. Their data-driven approach and constant optimization make all the difference.',
                author: 'Michael Chen',
                role: 'CEO, GrowthBox Solutions',
                rating: 5
            },
            {
                quote: 'Our social media presence transformed completely. Engagement is up 400% and we are generating quality leads every single day.',
                author: 'Emma Rodriguez',
                role: 'Founder, StyleHouse Boutique',
                rating: 5
            }
        ];
    };

    const testimonials = getTestimonials();
    const eyebrow = t('testimonials.eyebrow') || 'Client Success Stories';
    const title = t('testimonials.title') || 'What Our Clients Say';

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-rose-500 font-medium tracking-wider uppercase text-sm mb-4 block">
                        {eyebrow}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                        {title}
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
                            className="bg-rose-50 p-8 rounded-2xl relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-rose-500" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">
                                &quot;{item.quote}&quot;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-rose-200 rounded-full flex items-center justify-center text-rose-700 font-bold">
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
