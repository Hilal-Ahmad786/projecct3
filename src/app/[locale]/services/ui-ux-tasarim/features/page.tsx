'use client';

import { motion } from 'framer-motion';
import {
    PaintBrushIcon,
    DevicePhoneMobileIcon,
    SwatchIcon,
    CursorArrowRaysIcon,
    EyeIcon,
    UsersIcon,
    ChartBarIcon,
    SparklesIcon,
    PencilSquareIcon,
    ViewfinderCircleIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const features = [
    {
        icon: PaintBrushIcon,
        title: 'Kullanici Arastirmasi',
        description: 'Kullanici ihtiyaclarini ve davranislarini anlamak icin kapsamli arastirma yapiyoruz. Anketler, gorusmeler ve kullanici testleri ile degerli icgoruler elde ediyoruz.'
    },
    {
        icon: DevicePhoneMobileIcon,
        title: 'Wireframe ve Prototipleme',
        description: 'Fikirleri hizla gorsellestirir ve test edilebilir prototipler olusturuyoruz. Dusuk ve yuksek sadakatli wireframe\'ler ile tasarim surecini hizlandiriyoruz.'
    },
    {
        icon: SwatchIcon,
        title: 'Arayuz Tasarimi',
        description: 'Goze hos gelen ve kullanici dostu arayuzler tasarliyoruz. Renk paleti, tipografi ve gorsel hiyerarsiye ozen gosteriyoruz.'
    },
    {
        icon: CursorArrowRaysIcon,
        title: 'Kullanilabilirlik Testi',
        description: 'Gercek kullanicilarla test yaparak tasarimlarin etkinligini olcuyoruz. Geri bildirimler dogrultusunda surekli iyilestirmeler yapiyoruz.'
    },
    {
        icon: EyeIcon,
        title: 'Tasarim Sistemi',
        description: 'Tutarli ve olceklenebilir tasarim sistemleri olusturuyoruz. Yeniden kullanilabilir bilesenler ve stil kilavuzlari gelistiriyoruz.'
    },
    {
        icon: UsersIcon,
        title: 'Kullanici Deneyimi Stratejisi',
        description: 'Is hedeflerinize uygun UX stratejileri gelistiriyoruz. Kullanici yolculugu haritalari ve persona calismalari ile yonlendiriyoruz.'
    },
    {
        icon: ChartBarIcon,
        title: 'Erisilebilirlik Tasarimi',
        description: 'WCAG standartlarina uygun, herkes icin erisilebilir tasarimlar yapiyoruz. Engelli kullanicilari da dusunerek kapsayici deneyimler olusturuyoruz.'
    },
    {
        icon: SparklesIcon,
        title: 'Mikro Etkilesimler',
        description: 'Kullanici deneyimini zenginlestiren mikro animasyonlar ve etkilesimler tasarliyoruz. Her detay ile markanizi ozel kiliyoruz.'
    },
    {
        icon: PencilSquareIcon,
        title: 'Gorsel Tasarim',
        description: 'Marka kimliginize uygun gorsel tasarimlar olusturuyoruz. Ikonlar, ilustrasyonlar ve gorsel ogeler ile tasarimlari canlandiriyoruz.'
    },
    {
        icon: ViewfinderCircleIcon,
        title: 'Responsive Tasarim',
        description: 'Tum cihazlarda mukemmel gorunen ve calisan tasarimlar yapiyoruz. Mobil oncelikli yaklasim ile her ekran boyutuna uyum sagliyoruz.'
    }
];

export default function FeaturesPage() {
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
                            Ozellikler
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            UI/UX Tasarim Hizmetlerimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Kullanici odakli tasarim yaklasimiyla dijital urunlerinizi hayata geciriyoruz.
                            Her projede estetik ve islevseligi bir araya getiriyoruz.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="w-7 h-7 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Button href="/contact" variant="primary" size="lg" className="!bg-indigo-500 hover:!bg-indigo-600 !border-indigo-500">
                        Tasarim Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
