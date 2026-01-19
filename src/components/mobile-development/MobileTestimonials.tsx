'use client';

import { motion } from 'framer-motion';

export default function MobileTestimonials() {
    const testimonials = [
        {
            quote: 'They transformed our idea into a beautiful, intuitive app that our users absolutely love. The attention to detail and commitment to quality exceeded our expectations.',
            author: 'Sarah Chen',
            role: 'CEO, FitTrack Pro',
        },
        {
            quote: 'The team delivered our e-commerce app on time and within budget. Sales through our mobile channel increased by 150% within the first quarter after launch.',
            author: 'Michael Rodriguez',
            role: 'Founder, ShopEase',
        },
        {
            quote: 'Outstanding technical expertise and communication throughout the project. They handled complex integrations seamlessly and provided excellent post-launch support.',
            author: 'Emily Watson',
            role: 'CTO, HealthConnect',
        },
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-0.5 bg-blue-600"></div>
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                            Client Success Stories
                        </span>
                        <div className="w-8 h-0.5 bg-blue-600"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                        What Our Clients Say
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            <div className="mb-6">
                                <svg className="h-8 w-8 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                </svg>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {testimonial.quote}
                            </p>
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-lg font-medium text-blue-600">
                                        {testimonial.author.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
