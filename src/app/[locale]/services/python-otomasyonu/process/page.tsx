'use client';

import { motion } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    DocumentTextIcon,
    CpuChipIcon,
    BeakerIcon,
    RocketLaunchIcon,
    WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const steps = [
    {
        icon: MagnifyingGlassIcon,
        title: 'Ihtiyac Analizi',
        description: 'Is sureclerinizi detayli analiz ederek otomasyon ihtiyaclarinizi belirliyoruz. Mevcut is akislarinizi inceliyor ve iyilestirme alanlarini tespit ediyoruz.'
    },
    {
        icon: DocumentTextIcon,
        title: 'Cozum Tasarimi',
        description: 'Ihtiyaclariniza ozel otomasyon cozumu tasarliyoruz. Teknik mimari, kullanilacak teknolojiler ve uygulama planini hazirliyoruz.'
    },
    {
        icon: CpuChipIcon,
        title: 'Gelistirme',
        description: 'Python ve en guncel kutuphaneleri kullanarak otomasyon cozumunuzu gelistiriyoruz. Temiz kod ve en iyi uygulamalar ile kaliteli yazilim uretiyoruz.'
    },
    {
        icon: BeakerIcon,
        title: 'Test ve Dogrulama',
        description: 'Gelistirilen cozumu kapsamli test sureclerinden geciriyoruz. Hata tespiti, performans testleri ve kullanici kabul testleri yapiyoruz.'
    },
    {
        icon: RocketLaunchIcon,
        title: 'Devreye Alma',
        description: 'Otomasyon cozumunu canli ortama tasiyoruz. Sistem entegrasyonu, veri aktarimi ve canli ortam yapilandirmasini gerceklestiriyoruz.'
    },
    {
        icon: WrenchScrewdriverIcon,
        title: 'Destek ve Bakim',
        description: 'Cozumunuzun surekli calismasini sagliyoruz. Izleme, guncelleme ve iyilestirme hizmetleri ile uzun vadeli destek sunuyoruz.'
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
                        <span className="text-orange-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Surecimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Otomasyon Gelistirme Surecimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Otomasyon projelerinizi basariya ulastirmak icin izledigimiz sistematik ve kanitlanmis gelistirme surecimizi kesfedein.
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
                                <div className="absolute left-7 top-16 w-0.5 h-full bg-orange-200" />
                            )}

                            <div className="relative z-10 w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <step.icon className="w-7 h-7 text-white" />
                            </div>

                            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-sm font-bold text-orange-500">Adim {index + 1}</span>
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-orange-500 hover:!bg-orange-600 !border-orange-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
