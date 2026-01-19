'use client';

import { motion } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    LightBulbIcon,
    PencilSquareIcon,
    RocketLaunchIcon,
    ChartBarIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const steps = [
    {
        icon: MagnifyingGlassIcon,
        title: 'Analiz ve Arastirma',
        description: 'Isletmenizi, sektorunuzu ve rakiplerinizi derinlemesine analiz ediyoruz. Hedef kitlenizi taniyor, pazar firsatlarini belirliyoruz.'
    },
    {
        icon: LightBulbIcon,
        title: 'Strateji Gelistirme',
        description: 'Analiz sonuclarina dayanarak ozellestirilmis bir dijital pazarlama stratejisi olusturuyoruz. Hedefler, KPI\'lar ve yol haritasi belirliyoruz.'
    },
    {
        icon: PencilSquareIcon,
        title: 'Icerik ve Kreatif Uretim',
        description: 'Hedef kitlenize hitap eden etkileyici icerikler ve gorseller uretiyoruz. SEO uyumlu metinler, sosyal medya icerikleri ve reklam kreatifleri hazirliyoruz.'
    },
    {
        icon: RocketLaunchIcon,
        title: 'Kampanya Baslangici',
        description: 'Hazirlanan stratejileri hayata geciriyoruz. Reklam kampanyalarini baslatiyor, icerikleri yayinliyor ve sosyal medya yonetimini aktif hale getiriyoruz.'
    },
    {
        icon: ChartBarIcon,
        title: 'Izleme ve Analiz',
        description: 'Kampanya performansini surekli izliyor ve analiz ediyoruz. Detayli raporlar ile ilerlemeyi takip ediyor, basari metriklerini olcuyoruz.'
    },
    {
        icon: ArrowPathIcon,
        title: 'Optimizasyon ve Iyilestirme',
        description: 'Veriye dayali optimizasyonlar ile kampanya performansini surekli iyilestiriyoruz. A/B testleri ve stratejik ayarlamalar yapiyoruz.'
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
                        <span className="text-pink-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Surecimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Dijital Pazarlama Surecimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Basariyi garantileyen kanitlanmis 6 adimli dijital pazarlama metodolojimizi kesfedin.
                            Her adim, maksimum etki ve yatirim getirisi icin optimize edilmistir.
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
                                <div className="absolute left-7 top-16 w-0.5 h-full bg-pink-200" />
                            )}

                            <div className="relative z-10 w-14 h-14 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <step.icon className="w-7 h-7 text-white" />
                            </div>

                            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-sm font-bold text-pink-500">Adim {index + 1}</span>
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-pink-500 hover:!bg-pink-600 !border-pink-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
