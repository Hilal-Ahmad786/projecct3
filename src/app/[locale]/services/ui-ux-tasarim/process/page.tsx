'use client';

import { motion } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    PencilSquareIcon,
    SwatchIcon,
    DevicePhoneMobileIcon,
    BeakerIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const steps = [
    {
        icon: MagnifyingGlassIcon,
        title: 'Kesif ve Arastirma',
        description: 'Projenin hedeflerini, hedef kitleyi ve pazar dinamiklerini anlamak icin kapsamli arastirma yapiyoruz. Rekabet analizi, kullanici gorusmeleri ve anketler ile degerli icgoruler topluyoruz.'
    },
    {
        icon: PencilSquareIcon,
        title: 'Strateji ve Planlama',
        description: 'Toplanan veriler isiginda kullanici personaları, kullanici yolculugu haritalari ve bilgi mimarisi olusturuyoruz. Tasarim stratejisi ve proje yol haritasini belirliyoruz.'
    },
    {
        icon: SwatchIcon,
        title: 'Wireframe Tasarimi',
        description: 'Dusuk sadakatli wireframe\'ler ile sayfa yapisini ve icerik hiyerarsisini belirliyoruz. Kullanici akislarini ve etkilesim noktalarini planliyoruz.'
    },
    {
        icon: DevicePhoneMobileIcon,
        title: 'Gorsel Tasarim',
        description: 'Marka kimliginize uygun, modern ve etkileyici arayuz tasarimlari olusturuyoruz. Renk paleti, tipografi, ikonlar ve gorsel ogelerle tasarimi canlandiriyoruz.'
    },
    {
        icon: BeakerIcon,
        title: 'Prototipleme ve Test',
        description: 'Etkilesimli prototipler olusturuyor ve gercek kullanicilarla test ediyoruz. Geri bildirimler dogrultusunda tasarimlari iyilestiriyor ve optimize ediyoruz.'
    },
    {
        icon: RocketLaunchIcon,
        title: 'Teslim ve Destek',
        description: 'Gelistirme ekiplerine detayli tasarim dosyalari, stil kilavuzlari ve bilesenler teslim ediyoruz. Uygulama surecinde teknik destek sagliyoruz.'
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
                        <span className="text-indigo-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Calisma Surecimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Tasarim Surecimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Kullanici odakli ve sonuc odakli tasarim surecimiz ile projelerinizi
                            basariya tasiyoruz. Her adimda seffaflik ve isbirligi on planda.
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
                                <div className="absolute left-7 top-16 w-0.5 h-full bg-indigo-200" />
                            )}

                            <div className="relative z-10 w-14 h-14 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <step.icon className="w-7 h-7 text-white" />
                            </div>

                            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-sm font-bold text-indigo-500">Adim {index + 1}</span>
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-indigo-500 hover:!bg-indigo-600 !border-indigo-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
