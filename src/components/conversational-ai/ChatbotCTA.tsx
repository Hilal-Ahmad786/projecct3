'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function ChatbotCTA() {
    return (
        <section className="py-32 bg-violet-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-800/50 to-transparent" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
                        Ready to Automate Your Conversations?
                    </h2>
                    <p className="text-xl text-violet-200 mb-12 leading-relaxed">
                        Let us show you how AI-powered chatbots can reduce support costs,
                        increase customer satisfaction, and scale your business 24/7.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-white !text-violet-900 hover:!bg-violet-100 !border-white">
                            Schedule a Demo
                        </Button>
                        <Button href="/services/conversational-ai/portfolio" variant="outline" size="lg" className="!text-white !border-violet-400 hover:!bg-violet-800">
                            View Case Studies
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
