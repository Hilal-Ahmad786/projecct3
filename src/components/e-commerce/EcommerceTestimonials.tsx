'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

export default function EcommerceTestimonials() {
    const testimonials = [
        {
            quote: 'Our online sales increased by 340% within the first six months after launching our new store. The checkout optimization alone was a game-changer.',
            author: 'Sarah Mitchell',
            role: 'CEO, Luxe Fashion Co.',
            rating: 5
        },
        {
            quote: 'The inventory management system they built has saved us countless hours. We can now manage multiple warehouses seamlessly from one dashboard.',
            author: 'David Chen',
            role: 'Operations Director, TechGadgets',
            rating: 5
        },
        {
            quote: 'From concept to launch in just 8 weeks, and the store handles our Black Friday traffic without breaking a sweat. Exceptional work.',
            author: 'Emma Rodriguez',
            role: 'Founder, Artisan Home Goods',
            rating: 5
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Client Success Stories
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                        Trusted by Growing Brands
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
                            className="bg-emerald-50 p-8 rounded-2xl relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-emerald-500" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">
                                &quot;{item.quote}&quot;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700 font-bold">
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
