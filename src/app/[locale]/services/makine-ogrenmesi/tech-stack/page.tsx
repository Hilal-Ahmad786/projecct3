'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';

const technologies = [
    { name: 'TensorFlow', category: 'Derin Ogrenme', color: 'bg-orange-500' },
    { name: 'PyTorch', category: 'Sinir Aglari', color: 'bg-red-500' },
    { name: 'Scikit-Learn', category: 'ML Kutuphanesi', color: 'bg-blue-500' },
    { name: 'Keras', category: 'Derin Ogrenme', color: 'bg-red-600' },
    { name: 'Python', category: 'Ana Dil', color: 'bg-yellow-500' },
    { name: 'NumPy', category: 'Sayisal Hesaplama', color: 'bg-blue-600' },
    { name: 'Pandas', category: 'Veri Isleme', color: 'bg-purple-500' },
    { name: 'MLflow', category: 'ML Yasam Dongusu', color: 'bg-cyan-500' },
    { name: 'CUDA', category: 'GPU Hesaplama', color: 'bg-green-500' },
    { name: 'AWS SageMaker', category: 'ML Platformu', color: 'bg-orange-600' },
    { name: 'Hugging Face', category: 'NLP Modelleri', color: 'bg-yellow-600' },
    { name: 'OpenCV', category: 'Bilgisayarli Goru', color: 'bg-emerald-500' },
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
                        <span className="text-violet-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Teknoloji Yiğini
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Kullandigimiz Teknolojiler
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Endustrinin en guclu ve guncel ML teknolojilerini kullanarak
                            projelerinizi hayata geciriyoruz. Olceklenebilir ve surdurulebilir cozumler.
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
                    <Button href="/tr/iletisim" variant="primary" size="lg" className="!bg-violet-500 hover:!bg-violet-600 !border-violet-500">
                        Gereksinimlerinizi Konusalim
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
