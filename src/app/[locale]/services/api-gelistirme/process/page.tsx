'use client';

import { motion } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    DocumentTextIcon,
    CodeBracketIcon,
    BeakerIcon,
    RocketLaunchIcon,
    WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const steps = [
    {
        icon: MagnifyingGlassIcon,
        title: 'Gereksinim Analizi',
        description: 'Projenizin ihtiyaclarini detayli olarak analiz ediyoruz. Is sureclerinizi, mevcut sistemlerinizi ve hedeflerinizi anlayarak en uygun API mimarisini belirliyoruz.'
    },
    {
        icon: DocumentTextIcon,
        title: 'API Tasarimi',
        description: 'RESTful veya GraphQL standartlarina uygun API tasarimi yapiyoruz. Endpoint\'leri, veri modellerini ve guvenlik protokollerini detayli olarak planliyoruz.'
    },
    {
        icon: CodeBracketIcon,
        title: 'Gelistirme',
        description: 'Modern teknolojiler ve en iyi pratikler kullanarak API\'nizi gelistiriyoruz. Temiz kod, modular yapi ve olceklenebilirlik onceliklerimiz arasinda.'
    },
    {
        icon: BeakerIcon,
        title: 'Test ve Kalite Kontrol',
        description: 'Kapsamli birim testleri, entegrasyon testleri ve yuklenme testleri ile API\'nizin guvenilirligini ve performansini dogruluyoruz.'
    },
    {
        icon: RocketLaunchIcon,
        title: 'Deployment',
        description: 'CI/CD pipeline\'lari ile otomatik deployment surecleri olusturuyoruz. Sifir kesinti suresi ile production ortamina gecis sagliyoruz.'
    },
    {
        icon: WrenchScrewdriverIcon,
        title: 'Bakim ve Destek',
        description: 'API\'nizin surekli calismasini sagliyoruz. Performans izleme, guvenlik guncellemeleri ve teknik destek hizmetleri sunuyoruz.'
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
                        <span className="text-teal-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Surecimiz
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            API Gelistirme Surecimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Sistematik ve seffaf bir calisma sureci ile projenizi basariya ulastiriyoruz.
                            Her adimda sizinle iletisim halinde kalarak beklentilerinizi karsiliyoruz.
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
                                <div className="absolute left-7 top-16 w-0.5 h-full bg-teal-200" />
                            )}

                            <div className="relative z-10 w-14 h-14 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <step.icon className="w-7 h-7 text-white" />
                            </div>

                            <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-sm font-bold text-teal-500">Adim {index + 1}</span>
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-teal-500 hover:!bg-teal-600 !border-teal-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
