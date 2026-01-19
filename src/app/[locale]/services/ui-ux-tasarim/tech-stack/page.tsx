'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';

const technologies = [
    { name: 'Figma', category: 'Tasarim Araci', color: 'bg-indigo-500' },
    { name: 'Adobe XD', category: 'Prototipleme', color: 'bg-indigo-600' },
    { name: 'Sketch', category: 'UI Tasarimi', color: 'bg-orange-500' },
    { name: 'InVision', category: 'Prototipleme', color: 'bg-red-500' },
    { name: 'Principle', category: 'Animasyon', color: 'bg-purple-600' },
    { name: 'Framer', category: 'Etkilesimli Tasarim', color: 'bg-blue-500' },
    { name: 'Zeplin', category: 'Tasarim Teslimi', color: 'bg-yellow-500' },
    { name: 'Miro', category: 'Isbirligi', color: 'bg-yellow-600' },
    { name: 'Hotjar', category: 'Kullanici Arastirmasi', color: 'bg-red-600' },
    { name: 'Maze', category: 'Kullanilabilirlik Testi', color: 'bg-indigo-500' },
    { name: 'Lottie', category: 'Animasyonlar', color: 'bg-cyan-500' },
    { name: 'Storybook', category: 'Bilesen Kutuphanesi', color: 'bg-pink-600' },
];

const categories = [
    {
        title: 'Tasarim Araclari',
        description: 'Profesyonel UI/UX tasarimlari icin en guncel ve guclu tasarim araclarini kullaniyoruz.',
        tools: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator']
    },
    {
        title: 'Prototipleme',
        description: 'Etkilesimli prototipler ile fikirleri hizla test edip dogruluyoruz.',
        tools: ['Figma Prototypes', 'InVision', 'Principle', 'ProtoPie', 'Framer']
    },
    {
        title: 'Kullanici Arastirmasi',
        description: 'Kullanici davranislarini anlamak icin gelismis analiz araclari kullaniyoruz.',
        tools: ['Hotjar', 'Maze', 'UserTesting', 'Lookback', 'Optimal Workshop']
    },
    {
        title: 'Isbirligi ve Teslim',
        description: 'Tasarim dosyalarini gelistirme ekiplerine sorunsuz sekilde teslim ediyoruz.',
        tools: ['Zeplin', 'Abstract', 'Miro', 'FigJam', 'Notion']
    }
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
                        <span className="text-indigo-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Tasarim Araclari
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Kullandigimiz Teknolojiler
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Endustrinin en iyi tasarim araclari ve teknolojileri ile
                            projelerinizi hayata geciriyoruz. Her arac ozenle secilmistir.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
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

                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Kategori Bazinda Araclar</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                                <p className="text-gray-600 mb-4">{category.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {category.tools.map((tool, i) => (
                                        <span key={i} className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Button href="/contact" variant="primary" size="lg" className="!bg-indigo-500 hover:!bg-indigo-600 !border-indigo-500">
                        Gereksinimlerinizi Konusalim
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
