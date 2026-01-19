'use client';

import { motion } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    DocumentTextIcon,
    CircleStackIcon,
    BeakerIcon,
    PresentationChartLineIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const steps = [
    {
        icon: MagnifyingGlassIcon,
        title: 'Kesif ve Analiz',
        description: 'Is hedeflerinizi, mevcut veri kaynaklarinizi ve analitik ihtiyaclarinizi anlamak icin derinlemesine analiz yapiyoruz. Mevcut sistemlerinizi ve veri kalitesini degerlendiriyoruz.'
    },
    {
        icon: DocumentTextIcon,
        title: 'Strateji ve Planlama',
        description: 'Is hedeflerinize uygun kapsamli bir veri analitigi stratejisi gelistiriyoruz. KPI\'lari, veri kaynaklarini ve teknik gereksinimleri belirliyoruz.'
    },
    {
        icon: CircleStackIcon,
        title: 'Veri Toplama ve Hazirlama',
        description: 'Cesitli kaynaklardan veri toplayip temizliyoruz. Veri kalitesini saglayarak analiz icin optimize edilmis veri setleri olusturuyoruz.'
    },
    {
        icon: BeakerIcon,
        title: 'Analiz ve Modelleme',
        description: 'Gelismis istatistiksel yontemler ve makine ogrenimi teknikleri kullanarak verilerinizi analiz ediyoruz. Tahminsel modeller ve icgorular gelistiriyoruz.'
    },
    {
        icon: PresentationChartLineIcon,
        title: 'Gorsellestirme ve Raporlama',
        description: 'Interaktif panolar ve raporlar olusturuyoruz. Bulgulari kolayca anlasilan gorseller ve istatistiklerle sunuyoruz.'
    },
    {
        icon: ArrowPathIcon,
        title: 'Surekli Iyilestirme',
        description: 'Analitik cozumlerinizi surekli izleyip optimize ediyoruz. Yeni veri kaynaklari ve gelisen is ihtiyaclarina gore sistemleri guncelliyoruz.'
    }
];

export default function ProcessPage() {
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
                            Surecimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Veri Analitigi Surecimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Ham verileri degerli is icgorulerine donusturmek icin kanitlanmis metodolojimiz. Her adimda sizinle birlikte calisiyoruz.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex items-start gap-6 pb-12 last:pb-0"
                        >
                            {index !== steps.length - 1 && (
                                <div className="absolute left-7 top-16 w-0.5 h-full bg-cyan-200" />
                            )}

                            <div className="relative z-10 w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <step.icon className="w-7 h-7 text-white" />
                            </div>

                            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-sm font-bold text-cyan-500">Adim {index + 1}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
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
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
