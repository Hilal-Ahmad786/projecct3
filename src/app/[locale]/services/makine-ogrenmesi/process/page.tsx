'use client';

import { motion } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    CircleStackIcon,
    CpuChipIcon,
    BeakerIcon,
    RocketLaunchIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const steps = [
    {
        icon: MagnifyingGlassIcon,
        title: 'Kesfet ve Analiz',
        description: 'Isletmenizin ihtiyaclarini ve mevcut veri altyapisini detayli sekilde analiz ediyoruz. Hedeflerinizi belirliyor, ML cozumunun potansiyel degerini ortaya koyuyoruz.'
    },
    {
        icon: CircleStackIcon,
        title: 'Veri Hazirlama',
        description: 'Verilerinizi topluyoruz, temizliyoruz ve ML modelleri icin uygun formata donusturuyoruz. Ozellik muhendisligi ve veri zenginlestirme islemleri yapiyoruz.'
    },
    {
        icon: CpuChipIcon,
        title: 'Model Gelistirme',
        description: 'Probleminize en uygun algoritmalarla model gelistiriyoruz. Farkli yaklasimlaryi deneyerek en iyi performansi elde ediyoruz.'
    },
    {
        icon: BeakerIcon,
        title: 'Test ve Dogrulama',
        description: 'Modeli kapsamli testlerden geciriyoruz. Dogruluk, hiz ve guvenilirlik metriklerini olcuyor, gercek dunya senaryolariyla dogruluyoruz.'
    },
    {
        icon: RocketLaunchIcon,
        title: 'Uretim Ortamina Dagitim',
        description: 'Modeli uretim ortamina guvenli sekilde deploy ediyoruz. API entegrasyonlari, olceklendirme ve izleme sistemlerini kuruyoruz.'
    },
    {
        icon: ArrowPathIcon,
        title: 'Surekli Iyilestirme',
        description: 'Model performansini surekli izliyor, yeni verilerle egitim yapiyor ve iyilestirmeler uyguluyoruz. MLOps surecleriyle kesintisiz operasyon sagliyoruz.'
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
                        <span className="text-violet-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Calisma Surecimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            ML Proje Sureci
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Fikirden uretime kadar her adimda yaninizda. Yapay zeka projelerinizi
                            kanitlanmis metodolojimizle hayata geciriyoruz.
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
                                <div className="absolute left-7 top-16 w-0.5 h-full bg-violet-200" />
                            )}

                            <div className="relative z-10 w-14 h-14 bg-violet-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <step.icon className="w-7 h-7 text-white" />
                            </div>

                            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-sm font-bold text-violet-500">Adim {index + 1}</span>
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
                    <Button href="/tr/iletisim" variant="primary" size="lg" className="!bg-violet-500 hover:!bg-violet-600 !border-violet-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
