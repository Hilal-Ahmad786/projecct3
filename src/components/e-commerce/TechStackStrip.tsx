'use client';

import { motion } from 'framer-motion';

export default function TechStackStrip() {
    const technologies = [
        'Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Stripe', 'PayPal',
        'Next.js', 'React', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS'
    ];

    return (
        <div className="w-full bg-emerald-50 border-y border-emerald-100 overflow-hidden py-8">
            <div className="relative flex">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-emerald-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-emerald-50 to-transparent z-10" />

                {/* Scrolling Content */}
                <motion.div
                    className="flex gap-12 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {/* Repeat list 3 times for seamless loop */}
                    {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                        <div key={index} className="flex items-center gap-2 text-emerald-600 font-medium text-lg">
                            {/* Simple dot separator */}
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {tech}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
