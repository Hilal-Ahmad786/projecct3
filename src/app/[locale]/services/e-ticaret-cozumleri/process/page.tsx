'use client';

import { motion } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    PaintBrushIcon,
    CodeBracketIcon,
    ShoppingCartIcon,
    RocketLaunchIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const steps = [
    {
        icon: MagnifyingGlassIcon,
        title: 'Ihtiyac Analizi',
        description: 'Isletmenizin ihtiyaclarini, hedef kitlenizi ve rekabet ortamini detayli olarak analiz ediyoruz. E-ticaret stratejinizi birlikte belirliyoruz.'
    },
    {
        icon: PaintBrushIcon,
        title: 'Tasarim ve UX',
        description: 'Markaniza ozel, kullanici dostu ve donusume odakli e-ticaret tasarimi olusturuyoruz. Mobil oncelikli yaklasim ile her cihazda mukemmel deneyim.'
    },
    {
        icon: CodeBracketIcon,
        title: 'Gelistirme',
        description: 'Modern teknolojiler kullanarak guvenli, hizli ve olceklenebilir e-ticaret platformunuzu gelistiriyoruz. Ozel ozellikler ve entegrasyonlar dahil.'
    },
    {
        icon: ShoppingCartIcon,
        title: 'Urun ve Icerik Yukleme',
        description: 'Urunlerinizi, kategorilerinizi ve iceriklerinizi platformunuza profesyonelce yukluyoruz. SEO uyumlu urun aciklamalari ve gorseller.'
    },
    {
        icon: RocketLaunchIcon,
        title: 'Test ve Lansman',
        description: 'Kapsamli test surecinin ardindan e-ticaret sitenizi yayina aliyoruz. Odeme, kargo ve tum sistemlerin sorunsuz calistigindan emin oluyoruz.'
    },
    {
        icon: ChartBarIcon,
        title: 'Destek ve Optimizasyon',
        description: 'Lansman sonrasi surekli destek, performans takibi ve optimizasyon hizmetleri sunuyoruz. Satislarinizi artirmak icin surekli iyilestirmeler.'
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
                        <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Calisma Surecimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            E-Ticaret Gelistirme Surecimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Fikirden basarili bir e-ticaret sitesine uzanan yolculugunuzda her adimda yaninizdayiz. Sistematik ve seffaf calisma surecimizi kesfetdin.
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
                                <div className="absolute left-7 top-16 w-0.5 h-full bg-emerald-200" />
                            )}

                            <div className="relative z-10 w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <step.icon className="w-7 h-7 text-white" />
                            </div>

                            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-sm font-bold text-emerald-500">Adim {index + 1}</span>
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-emerald-500 hover:!bg-emerald-600 !border-emerald-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
