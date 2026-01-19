'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const faqs = [
    {
        question: 'UI/UX tasarim sureci ne kadar surer?',
        answer: 'Proje kapsamina bagli olarak UI/UX tasarim sureci genellikle 4-12 hafta arasinda degisir. Basit bir landing page tasarimi 2-3 hafta sururken, kapsamli bir uygulama tasarimi 8-12 hafta alabilir. Surec, arastirma, wireframe, gorsel tasarim ve prototipleme asamalarini icerir.'
    },
    {
        question: 'Tasarim surecinde ne kadar geri bildirim verebilirim?',
        answer: 'Tasarim surecimiz tamamen isbirligine dayalidir. Her asamada sizin geri bildirimlerinizi aliyoruz. Wireframe, gorsel tasarim ve prototip asamalarinda revizyon turlari yapiyoruz. Genellikle her asamada 2-3 revizyon hakki sunuyoruz, ancak ihtiyaca gore bu sayi arttirilabilir.'
    },
    {
        question: 'Hangi tasarim araclarini kullaniyorsunuz?',
        answer: 'Projelerimizde Figma, Adobe XD ve Sketch gibi endustri lideri tasarim araclarini kullaniyoruz. Prototipleme icin InVision ve Principle, kullanici arastirmasi icin Hotjar ve Maze tercih ediyoruz. Teslimatlari Zeplin uzerinden gelistirme ekiplerine aktariyoruz.'
    },
    {
        question: 'Mevcut markamiza uygun tasarim yapabilir misiniz?',
        answer: 'Evet, kesinlikle. Marka kimliginizi ve mevcut tasarim dilini dikkate alarak calisiyoruz. Marka rehberiniz varsa bunu temel aliyoruz, yoksa mevcut gorsel ogelerinizden yola cikarak tutarli bir tasarim sistemi olusturuyoruz.'
    },
    {
        question: 'Tasarimlar gelistirme ekibine nasil teslim ediliyor?',
        answer: 'Tasarimlarimizi Zeplin veya Figma uzerinden gelistirme dostu formatlarda teslim ediyoruz. CSS degerlerini, olculeri, renk kodlarini ve asset\'leri icerir. Ayrica tasarim sistemi dokumantasyonu ve bilesen kutuphanesi de sagliyoruz.'
    },
    {
        question: 'Mobil ve web icin ayri tasarimlar mi yapiyorsunuz?',
        answer: 'Responsive tasarim yaklasimi ile hem mobil hem de web icin optimize edilmis tasarimlar olusturuyoruz. Mobil oncelikli (mobile-first) yaklasim benimsiyoruz ve tum ekran boyutlari icin uyumlu tasarimlar sunuyoruz. Gerektiginde native mobil uygulama tasarimlari da yapiyoruz.'
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                            SSS
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Sikca Sorulan Sorular
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            UI/UX tasarim hizmetlerimiz hakkinda merak edilenleri yanatliyoruz.
                            Daha fazla sorunuz varsa bizimle iletisime gecin.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-3xl mx-auto space-y-4 mb-16">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-indigo-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                                ) : (
                                    <PlusIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-white rounded-2xl p-12 max-w-3xl mx-auto border border-gray-200"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Baska Sorulariniz mi Var?</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Aradiginiz cevabi bulamadiniz mi? Tasarim uzmanlarimiz size yardimci olmak icin hazir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-indigo-500 hover:!bg-indigo-600 !border-indigo-500">
                            Ekibimize Ulasin
                        </Button>
                        <Button href="/services/ui-ux-tasarim/pricing" variant="secondary" size="lg">
                            Fiyatlandirmayi Gorun
                        </Button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
