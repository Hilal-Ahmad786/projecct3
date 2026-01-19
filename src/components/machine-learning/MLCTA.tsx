'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function MLCTA() {
    return (
        <section className="py-32 bg-violet-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-800/50 to-transparent" />

            {/* Neural Network Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-2 h-2 bg-violet-400 rounded-full opacity-30" />
                <div className="absolute top-40 right-40 w-3 h-3 bg-purple-300 rounded-full opacity-20" />
                <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-violet-500 rounded-full opacity-25" />
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full opacity-30" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
                        Ready to Transform Your Business with ML?
                    </h2>
                    <p className="text-xl text-violet-200 mb-12 leading-relaxed">
                        Let&apos;s discuss how machine learning can solve your most challenging problems
                        and unlock new opportunities for growth and innovation.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-white !text-violet-900 hover:!bg-violet-50 !border-white">
                            Schedule a Consultation
                        </Button>
                        <Button href="/services/machine-learning/portfolio" variant="outline" size="lg" className="!text-white !border-violet-400 hover:!bg-violet-800">
                            View Case Studies
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
