'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const faqs = [
    {
        question: 'Veri analitigi hizmetleri neler icerir?',
        answer: 'Veri analitigi hizmetlerimiz is zekasi panolari, veri gorsellestirme, tahminsel analitik, gercek zamanli raporlama, veri madenciligi ve ozel rapor olusturma gibi kapsamli cozumleri icerir. Her proje is ihtiyaclariniza ozel olarak tasarlanir.'
    },
    {
        question: 'Hangi veri kaynaklariyla calisabilirsiniz?',
        answer: 'Veritabanlari (SQL, NoSQL), bulut platformlari, API\'ler, dosya sistemleri, IoT cihazlari ve daha fazlasi dahil olmak uzere hemen hemen her veri kaynagindan veri toplayip analiz edebiliriz. Mevcut sistemlerinizle sorunsuz entegrasyon sagliyoruz.'
    },
    {
        question: 'Veri guvenligi nasil saglanir?',
        answer: 'Veri guvenligi en onde gelen onceliklerimizden biridir. Kurumsal duzeyde sifreleme, erisim kontrolleri ve KVKK/GDPR uyumlulugu sagliyoruz. Tum veriler guvenli sunucularda saklanir ve duzenli guvenlik denetimleri yapilir.'
    },
    {
        question: 'Proje sureci ne kadar surer?',
        answer: 'Proje suresi kapsama ve karmasikliga bagli olarak degisir. Basit pano projeleri 2-4 hafta sururken, kapsamli kurumsal analitik cozumleri 2-6 ay arasinda tamamlanabilir. Ilk gorusmede detayli bir zaman cizelgesi sunuyoruz.'
    },
    {
        question: 'Mevcut sistemlerimizle entegrasyon mumkun mu?',
        answer: 'Evet, tum buyuk ERP, CRM, veritabani ve bulut platformlariyla entegrasyon sagliyoruz. SAP, Salesforce, Microsoft Dynamics, AWS, Azure, Google Cloud ve daha fazlasiyla sorunsuz calisiyoruz.'
    },
    {
        question: 'Proje sonrasi destek sunuyor musunuz?',
        answer: 'Evet, tum projelerimiz icin kapsamli proje sonrasi destek sunuyoruz. Bakim, guncelleme, egitim ve teknik destek hizmetlerimizle sistemlerinizin surekli optimum performansta calismasini sagliyoruz.'
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
                        <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            SSS
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Sikca Sorulan Sorular
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Veri analitigi hizmetlerimiz hakkinda en cok sorulan sorular ve yanitlari.
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-cyan-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-cyan-600 flex-shrink-0" />
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Hala Sorulariniz mi Var?</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Aradiginiz cevabi bulamadiniz mi? Veri analitigi uzmanlarimiz size yardimci olmak icin hazir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-cyan-500 hover:!bg-cyan-600 !border-cyan-500">
                            Ekibimizle Iletisime Gecin
                        </Button>
                        <Button href="/services/veri-analizi/pricing" variant="secondary" size="lg">
                            Fiyatlandirmayi Goruntuleyın
                        </Button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
