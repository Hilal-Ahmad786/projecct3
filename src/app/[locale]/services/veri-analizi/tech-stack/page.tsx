'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';

const technologies = [
    { name: 'Python', category: 'Temel Dil', color: 'bg-cyan-500' },
    { name: 'Pandas', category: 'Veri Analizi', color: 'bg-cyan-600' },
    { name: 'NumPy', category: 'Sayisal Hesaplama', color: 'bg-cyan-500' },
    { name: 'Tableau', category: 'Gorsellestirme', color: 'bg-cyan-600' },
    { name: 'Power BI', category: 'Is Zekasi', color: 'bg-cyan-500' },
    { name: 'Apache Spark', category: 'Buyuk Veri', color: 'bg-cyan-600' },
    { name: 'SQL', category: 'Veritabani Sorgulari', color: 'bg-cyan-500' },
    { name: 'MongoDB', category: 'NoSQL Veritabani', color: 'bg-cyan-600' },
    { name: 'Snowflake', category: 'Veri Ambari', color: 'bg-cyan-500' },
    { name: 'Airflow', category: 'Veri Boru Hatlari', color: 'bg-cyan-600' },
    { name: 'Jupyter', category: 'Interaktif Analiz', color: 'bg-cyan-500' },
    { name: 'R', category: 'Istatistiksel Hesaplama', color: 'bg-cyan-600' },
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
                        <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Teknoloji Yiginimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Veri Analitigi Teknolojilerimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Olceklenebilir ve guvenilir veri analitigi cozumleri sunmak icin kullandigimiz modern teknolojiler ve araclar.
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-cyan-500 hover:!bg-cyan-600 !border-cyan-500">
                        Gereksinimlerinizi Tartisin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
