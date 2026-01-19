'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function WebDevCTA() {
    return (
        <section className="py-32 bg-gray-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800/50 to-transparent" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
                        Ready to Build Something Amazing?
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                        Let's discuss your project and explore how we can help bring your vision to life.
                        Schedule a free consultation with our team today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-white !text-gray-900 hover:!bg-gray-100 !border-white">
                            Schedule a Consultation
                        </Button>
                        <Button href="/services/web-development/portfolio" variant="outline" size="lg" className="!text-white !border-gray-700 hover:!bg-gray-800">
                            View Case Studies
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
