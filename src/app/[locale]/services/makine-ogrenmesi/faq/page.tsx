'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const faqs = [
    {
        question: 'Makine ogrenmesi projesi ne kadar surer?',
        answer: 'Proje suresi karmasikliga gore degisir. Basit modeller 4-8 haftada tamamlanabilirken, karmasik derin ogrenme projeleri 3-6 ay surebilir. Ilk gorusmede projenizin kapsamini degerlendirerek size net bir zaman cizelgesi sunuyoruz.'
    },
    {
        question: 'ML projesi icin ne kadar veri gerekli?',
        answer: 'Veri miktari probleme ve kullanilan algoritmalara bagli olarak degisir. Genel olarak, denetimli ogrenme icin en az birkac bin ornek onerilir. Derin ogrenme modelleri genellikle daha fazla veri gerektirir. Veri yetersizse, transfer ogrenme ve veri artirma teknikleri kullanabiliriz.'
    },
    {
        question: 'Mevcut sistemlerimize ML entegrasyonu nasil yapilir?',
        answer: 'ML modellerinizi REST API\'ler araciligiyla mevcut sistemlerinize entegre ediyoruz. Cloud tabanli veya on-premise cozumler sunabiliyoruz. Entegrasyon sureci, mevcut altyapinizi analiz ederek basliyor ve minimum kesinti ile tamamlaniyor.'
    },
    {
        question: 'Model performansi nasil olculur ve izlenir?',
        answer: 'Her model icin ozel metrikler belirliyoruz (dogruluk, F1 skoru, AUC-ROC vb.). Uretim ortaminda surekli izleme dashboardlari kuruyoruz. Model drift tespiti ve otomatik yeniden egitim mekanizmalari ile performansi surdurulebilir kiliyoruz.'
    },
    {
        question: 'Veri guvenligi ve gizliligi nasil saglanir?',
        answer: 'Veri guvenligi en yuksek oncelligimiz. Verileriniz sifrelenmis ortamlarda islenir, NDA anlasmasi yapilir. GDPR ve KVKK uyumlu surecler uyguluyoruz. Istenirse tamamen on-premise cozumler de sunabiliyoruz.'
    },
    {
        question: 'Proje sonrasinda destek ve bakim hizmeti var mi?',
        answer: 'Evet, tum projelerimizde kapsamli destek ve bakim hizmeti sunuyoruz. SLA anlasmasi ile garantili yanit sureleri, model guncelleme ve optimizasyon hizmetleri, 7/24 teknik destek opsiyonlari mevcuttur.'
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
                        <span className="text-violet-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            SSS
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Sikca Sorulan Sorular
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Makine ogrenmesi hizmetlerimiz hakkinda merak edilenler.
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-violet-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-violet-600 flex-shrink-0" />
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
                        Aradiginiz cevabi bulamadiniz mi? ML uzmanlarimiiz sorularinizi yanitslamak icin hazir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/tr/iletisim" variant="primary" size="lg" className="!bg-violet-500 hover:!bg-violet-600 !border-violet-500">
                            Ekibimizle Iletisime Gecin
                        </Button>
                        <Button href="/tr/services/makine-ogrenmesi/pricing" variant="secondary" size="lg">
                            Fiyatlandirmayi Gorun
                        </Button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
