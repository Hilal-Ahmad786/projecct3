'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

export default function AnalyticsTestimonials() {
    const testimonials = [
        {
            quote: 'Their analytics platform transformed how we understand our customers. We saw a 40% increase in conversion rates within the first quarter.',
            author: 'Sarah Chen',
            role: 'VP of Marketing, TechRetail Inc.',
            rating: 5
        },
        {
            quote: 'The predictive models they built helped us reduce inventory costs by 25% while improving product availability. Exceptional work.',
            author: 'Michael Torres',
            role: 'Supply Chain Director, Global Logistics',
            rating: 5
        },
        {
            quote: 'Finally, our executives have real-time visibility into company performance. The dashboards are intuitive and the insights are invaluable.',
            author: 'Emma Richardson',
            role: 'CFO, FinanceFirst Solutions',
            rating: 5
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Client Success Stories
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                        Trusted by Industry Leaders
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
                                    <StarIcon key={i} className="w-5 h-5 text-cyan-500" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">
                                &ldquo;{item.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-700 font-bold">
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
