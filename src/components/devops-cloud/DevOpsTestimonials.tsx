'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { useSectionTranslations } from '@/hooks/useTranslations';

const SHOW_TESTIMONIALS = false; // fabricated placeholder quotes removed 2026-08; set true after adding real client quotes to the locale files

export default function DevOpsTestimonials() {
    const t = useSectionTranslations('devopsCloud');

    if (!SHOW_TESTIMONIALS) return null;

    const getTestimonials = () => {
        try {
            const items = t('testimonials.items');
            if (Array.isArray(items) && items.length > 0) return items;
        } catch (e) { /* fallback */ }
        return [
            {
                quote: 'Their DevOps expertise transformed our deployment process. We went from monthly releases to multiple deployments per day with zero downtime.',
                author: 'Michael Chen',
                role: 'CTO, TechScale Solutions',
                rating: 5
            },
            {
                quote: 'The cloud migration was seamless. They reduced our infrastructure costs by 40% while improving performance and reliability significantly.',
                author: 'Sarah Johnson',
                role: 'VP of Engineering, DataFlow Inc',
                rating: 5
            },
            {
                quote: 'Outstanding Kubernetes implementation. Our containerized applications now auto-scale effortlessly, handling 10x traffic spikes with ease.',
                author: 'David Rodriguez',
                role: 'DevOps Lead, CloudNative Labs',
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
                    <span className="text-sky-600 font-medium tracking-wider uppercase text-sm mb-4 block">
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
                            className="bg-sky-50 p-8 rounded-2xl relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-sky-500" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">
                                &ldquo;{item.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-sky-200 rounded-full flex items-center justify-center text-sky-700 font-bold">
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
