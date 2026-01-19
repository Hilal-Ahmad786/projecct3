'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const faqs = [
    {
        question: 'API gelistirme sureci ne kadar surer?',
        answer: 'API gelistirme suresi projenin kapsamina ve karmasikligina bagli olarak degisir. Basit bir API 2-4 hafta icerisinde tamamlanabilirken, kapsamli kurumsal API projeleri 2-6 ay surer. Ilk gorusmemizde projeniz icin detayli bir zaman cizelgesi sunuyoruz.'
    },
    {
        question: 'Hangi API mimarilerini kullaniyorsunuz?',
        answer: 'Projenizin ihtiyaclarina gore RESTful API, GraphQL veya gRPC mimarilerini kullaniyoruz. REST, genel amacli uygulamalar icin idealdir. GraphQL, karmasik veri iliskileri olan projeler icin uygundur. gRPC ise yuksek performans gerektiren mikroservis mimarilerinde tercih edilir.'
    },
    {
        question: 'API guvenligini nasil sagliyorsunuz?',
        answer: 'API guvenligini cok katmanli bir yaklasimla sagliyoruz: OAuth 2.0 ve JWT tabanli kimlik dogrulama, HTTPS/TLS sifreleme, rate limiting, IP beyaz/kara listesi, girdi dogrulama ve SQL enjeksiyonu korumasi. Duzenli guvenlik taramalari ve penetrasyon testleri de yapiyoruz.'
    },
    {
        question: 'Mevcut sistemlerimizle entegrasyon yapabilir misiniz?',
        answer: 'Evet, mevcut sistemlerinizle sorunsuz entegrasyon saglamayi oncelikli hedefimiz olarak goruyoruz. ERP, CRM, odeme sistemleri, bulut hizmetleri ve ucuncu parti uygulamalarla entegrasyon deneyimimiz var. Mevcut API\'lerinizi de modernize edebiliyoruz.'
    },
    {
        question: 'API dokumantasyonu sagliyor musunuz?',
        answer: 'Kesinlikle! Her proje icin Swagger/OpenAPI formatinda interaktif dokumantasyon olusturuyoruz. Dokumantasyon, endpoint aciklamalari, istek/yanit ornekleri, hata kodlari ve SDK ornekleri icerir. Gelistiricileriniz API\'yi hizlica ogrenerek entegrasyon yapabilir.'
    },
    {
        question: 'Proje tesliminden sonra destek sagliyor musunuz?',
        answer: 'Evet, proje tesliminden sonra cesitli destek paketleri sunuyoruz. Standart paketimiz 3 ay garantili destek icerir. Ayrica 7/24 teknik destek, performans izleme, guvenlik guncellemeleri ve ozellik gelistirme iceren uzun vadeli bakim sozlesmeleri de yapiyoruz.'
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
                        <span className="text-teal-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            SSS
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Sikca Sorulan Sorular
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            API gelistirme hizmetlerimiz hakkinda en cok sorulan sorularin yanitlari.
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-teal-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-teal-600 flex-shrink-0" />
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
                        Aradiginiz cevabi bulamadiniz mi? API uzmanlarimiz size yardimci olmak icin hazir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-teal-500 hover:!bg-teal-600 !border-teal-500">
                            Ekibimizle Iletisime Gecin
                        </Button>
                        <Button href="/services/api-gelistirme" variant="secondary" size="lg">
                            Hizmetleri Inceleyin
                        </Button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
