'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';

const technologies = [
    { name: 'Shopify', category: 'E-Ticaret Platformu', color: 'bg-emerald-500' },
    { name: 'WooCommerce', category: 'WordPress Eklentisi', color: 'bg-purple-500' },
    { name: 'Magento', category: 'Kurumsal Platform', color: 'bg-orange-500' },
    { name: 'Next.js', category: 'Frontend Framework', color: 'bg-gray-800' },
    { name: 'Stripe', category: 'Odeme Gecidi', color: 'bg-purple-600' },
    { name: 'iyzico', category: 'Yerel Odeme', color: 'bg-blue-500' },
    { name: 'PayTR', category: 'Yerel Odeme', color: 'bg-red-500' },
    { name: 'Algolia', category: 'Arama Motoru', color: 'bg-blue-600' },
    { name: 'Contentful', category: 'CMS', color: 'bg-blue-400' },
    { name: 'Klaviyo', category: 'E-posta Pazarlama', color: 'bg-green-600' },
    { name: 'Yotpo', category: 'Yorumlar ve UGC', color: 'bg-teal-500' },
    { name: 'Elasticsearch', category: 'Arama Motoru', color: 'bg-yellow-500' },
    { name: 'AWS', category: 'Bulut Altyapisi', color: 'bg-orange-600' },
    { name: 'Vercel', category: 'Hosting', color: 'bg-gray-700' },
    { name: 'Aras Kargo', category: 'Kargo Entegrasyonu', color: 'bg-red-600' },
    { name: 'Yurtici Kargo', category: 'Kargo Entegrasyonu', color: 'bg-blue-700' },
];

export default function TechStackPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Teknoloji Yiginimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Kullandigimiz Teknolojiler
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            E-ticaret projelerinizde en guncel ve guvenilir teknolojileri kullaniyoruz. Shopify, WooCommerce ve ozel cozumlerle isletmenizi dijitale tasiyoruz.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
                        >
                            <div className={`w-12 h-12 ${tech.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                                <span className="text-white font-bold text-lg">{tech.name.charAt(0)}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{tech.name}</h3>
                            <p className="text-sm text-gray-500">{tech.category}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Button href="/contact" variant="primary" size="lg" className="!bg-emerald-500 hover:!bg-emerald-600 !border-emerald-500">
                        Gereksinimlerinizi Konusalim
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
