'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function AICTA() {
    return (
        <section className="py-32 bg-indigo-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-800/50 to-transparent" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
                        Ready to Transform Your Business with AI?
                    </h2>
                    <p className="text-xl text-indigo-200 mb-12 leading-relaxed">
                        Let us discuss how artificial intelligence can solve your unique challenges
                        and unlock new opportunities for growth. Schedule a free consultation with our AI experts today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-white !text-indigo-900 hover:!bg-indigo-100 !border-white">
                            Schedule a Consultation
                        </Button>
                        <Button href="/projects" variant="outline" size="lg" className="!text-white !border-indigo-400 hover:!bg-indigo-800">
                            View Case Studies
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
