'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { useSectionTranslations } from '@/hooks/useTranslations';

export default function DesignTestimonials() {
    const t = useSectionTranslations('servicePages.uiUxDesign');

    const getTestimonials = () => {
        try {
            const items = t('testimonials.items');
            if (Array.isArray(items) && items.length > 0) return items;
        } catch (e) { /* fallback */ }
        return [
            {
                quote: "The team completely transformed our app's user experience. Our user engagement increased by 150% within three months of the redesign launch.",
                author: "Sarah Chen",
                role: "Product Director, TechFlow",
                rating: 5
            },
            {
                quote: "Their attention to detail is unmatched. Every pixel, every interaction was thoughtfully crafted. Our customers constantly compliment our new interface.",
                author: "Marcus Johnson",
                role: "CEO, Innovate Labs",
                rating: 5
            },
            {
                quote: "Working with this design team was a game-changer. They took the time to understand our users and delivered a solution that exceeded all expectations.",
                author: "Emily Rodriguez",
                role: "Head of Product, StartupXYZ",
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
                    <span className="text-pink-500 font-medium tracking-wider uppercase text-sm mb-4 block">
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
                            className="bg-pink-50 p-8 rounded-2xl relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-pink-500" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">
                                &ldquo;{item.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 font-bold">
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
