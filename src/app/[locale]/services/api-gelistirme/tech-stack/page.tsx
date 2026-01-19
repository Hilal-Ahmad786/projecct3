'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';

const technologies = [
    { name: 'Node.js', category: 'Calisma Ortami', color: 'bg-green-500' },
    { name: 'Express', category: 'Framework', color: 'bg-gray-600' },
    { name: 'FastAPI', category: 'Python Framework', color: 'bg-teal-500' },
    { name: 'GraphQL', category: 'Sorgu Dili', color: 'bg-pink-500' },
    { name: 'REST', category: 'Mimari', color: 'bg-blue-500' },
    { name: 'gRPC', category: 'RPC Framework', color: 'bg-cyan-500' },
    { name: 'PostgreSQL', category: 'Veritabani', color: 'bg-blue-600' },
    { name: 'MongoDB', category: 'NoSQL Veritabani', color: 'bg-emerald-500' },
    { name: 'Redis', category: 'Onbellekleme', color: 'bg-red-500' },
    { name: 'Docker', category: 'Konteynerizasyon', color: 'bg-blue-400' },
    { name: 'Swagger', category: 'Dokumantasyon', color: 'bg-green-600' },
    { name: 'JWT', category: 'Kimlik Dogrulama', color: 'bg-purple-500' },
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
                        <span className="text-teal-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Teknoloji Yigini
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Kullandigimiz Teknolojiler
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            En guncel ve guvenilir teknolojileri kullanarak modern API cozumleri gelistiriyoruz.
                            Her projede en uygun teknoloji secimini yaparak optimum performans sagliyoruz.
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-teal-500 hover:!bg-teal-600 !border-teal-500">
                        Gereksinimlerinizi Tartisalim
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
