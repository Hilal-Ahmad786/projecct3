// src/components/PricingSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [activeCategory, setActiveCategory] = useState<'subscription' | 'project'>('subscription');

  const subscriptionTiers = [
    {
      name: 'SEO & Dijital Pazarlama',
      priceMonthly: 10000,
      priceAnnual: 90000, // 10% indirimli
      features: [
        'Teknik SEO optimizasyonu (site içi & dışı)',
        'Google & Meta Ads yönetimi',
        'Aylık performans raporları',
        '4 saat/ay reklam bütçe danışmanlığı',
      ],
    },
    {
      name: 'Bakım & Destek',
      priceMonthly: 5000,
      priceAnnual: 45000,
      features: [
        'Güvenlik güncellemeleri & yedekleme',
        'Sistem izleme & hızlı hata düzeltme',
        'Haftalık içerik & görsel güncellemeler',
        '7/24 SLA destek hattı',
      ],
    },
    {
      name: 'Otomasyon Bot Aboneliği',
      priceMonthly: 8000,
      priceAnnual: 72000,
      features: [
        '2 özelleştirilmiş Python botu',
        'Veri çekme, gönderme & raporlama akışları',
        'Aylık bot bakımı & hata giderme',
        'API izleme & güncelleme desteği',
      ],
    },
    {
      name: 'UI/UX Tasarım Aboneliği',
      priceMonthly: 7000,
      priceAnnual: 63000,
      features: [
        'Yeni sayfa & bölüm tasarımları',
        'Kullanıcı testi & geri bildirim döngüsü',
        'A/B test destek & analiz raporu',
        'Figma kaynak dosya teslimi',
      ],
    },
    {
      name: 'DevOps & CI/CD Aboneliği',
      priceMonthly: 6000,
      priceAnnual: 54000,
      features: [
        'Pipeline izleme & hata uyarıları',
        'Otomatik test & deploy bakımı',
        'Container / Kubernetes desteği',
        'Aylık performans optimizasyonu',
      ],
    },
    {
      name: 'AI Model Hosting & Güncelleme',
      priceMonthly: 12000,
      priceAnnual: 108000,
      features: [
        'ML/NLP model hosting',
        'Aylık yeniden eğitim & versiyonlama',
        'API endpoint yönetimi',
        '7/24 uptime SLA',
      ],
    },
  ];

  const projectTiers = [
    {
      name: 'Kurumsal Web Sitesi',
      price: '20.000–40.000₺',
      features: [
        'Next.js/React tabanlı modern tasarım',
        'SEO & hız optimizasyonu',
        '4–6 haftalık Agile sprint',
        '1 ay ücretsiz bakım & eğitim',
      ],
    },
    {
      name: 'E-Ticaret Mağaza Projesi',
      price: '25.000–50.000₺',
      features: [
        'Shopify/WooCommerce entegrasyonu',
        'Çok dilli & ödeme altyapısı',
        'Ödeme & kargo entegrasyonları',
        '2 hafta ücretsiz destek & eğitim',
      ],
    },
    {
      name: 'MERN Uygulama Projesi',
      price: '30.000–60.000₺',
      features: [
        'MongoDB, Express, React, Node.js kurulumu',
        'Kullanıcı yönetimi & yetkilendirme',
        'RESTful API dokümantasyonu',
        '1 ay ücretsiz bakım & revizyon',
      ],
    },
    {
      name: 'Mobil Uygulama Projesi',
      price: '40.000–80.000₺',
      features: [
        'React Native iOS/Android derlemesi',
        'UI/UX prototip & kullanıcı testi',
        'App Store & Play Store yayınlama',
        '2 hafta ücretsiz hata düzeltme',
      ],
    },
    {
      name: 'Veri Analizi & BI Dashboards',
      price: '18.000–40.000₺',
      features: [
        'Power BI / Tableau panelleri',
        'Özelleştirilmiş KPI takibi',
        'Excel/CSV entegrasyon akışları',
        '1 ay ücretsiz veri bakımı',
      ],
    },
    {
      name: 'DevOps & CI/CD Kurulum',
      price: '10.000–25.000₺',
      features: [
        'Jenkins / GitHub Actions kurulumu',
        'Container & Kubernetes konfigürasyonu',
        'Otomatik test & deploy pipeline',
        '1 hafta ücretsiz izleme desteği',
      ],
    },
    {
      name: 'Özel Kurumsal Çözüm',
      price: 'Teklif Bazlı',
      features: [
        'Tüm modüller & entegrasyonlar',
        'Özel SLA & premium destek',
        'Kurulum, eğitim & dokümantasyon',
        'Uzun dönem strateji danışmanlığı',
      ],
    },
  ];

  const periodLabel = billingCycle === 'monthly' ? '/ay' : '/yıl';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="section bg-gray-50 relative overflow-hidden">
      {/* Swiss Grid Background (behind content) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      {/* Proper Crescent Elements (behind content) */}
      <div className="absolute top-20 right-16 w-28 h-28 pointer-events-none -z-10">
        <div className="crescent crescent-right crescent-subtle text-gray-900" />
      </div>

      <div className="container mx-auto relative z-10">
        <SectionHeader
          eyebrow="Fiyatlandırma"
          title="Aylık & Proje Bazlı Seçeneklerimiz"
          subtitle="İhtiyaçlarınıza göre esnek fiyatlandırma seçenekleri. Tüm paketlerimiz şeffaf fiyatlandırma ve gizli ücret yoktur."
          className="mb-16"
        />

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white border border-gray-200 rounded-sm p-1">
            <button
              type="button"
              onClick={() => setActiveCategory('subscription')}
              className={`
                px-6 py-2 text-sm font-medium rounded-sm transition-all duration-250 cursor-pointer
                ${activeCategory === 'subscription'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              Abonelik Paketleri
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('project')}
              className={`
                px-6 py-2 text-sm font-medium rounded-sm transition-all duration-250 cursor-pointer
                ${activeCategory === 'project'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              Proje Bazlı Hizmetler
            </button>
          </div>
        </motion.div>

        {activeCategory === 'subscription' ? (
          <>
            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center mb-16"
            >
              <div className="bg-white border border-gray-200 rounded-sm p-1">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`
                    px-6 py-2 text-sm font-medium rounded-sm transition-all duration-250 cursor-pointer
                    ${billingCycle === 'monthly'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  Aylık
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`
                    px-6 py-2 text-sm font-medium rounded-sm transition-all duration-250 cursor-pointer
                    ${billingCycle === 'annual'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  Yıllık
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-sm">
                    10% İndirim
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Subscription Grid (state-driven animation + remount) */}
            <motion.div
              key={`grid-${activeCategory}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {subscriptionTiers.map((tier) => {
                const price = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceAnnual;
                return (
                  <motion.div
                    key={tier.name}
                    variants={itemVariants}
                    className="card group"
                  >
                    <div className="space-y-6">
                      {/* Header */}
                      <div>
                        <h3 className="text-title text-gray-900 mb-2">
                          {tier.name}
                        </h3>
                        <div className="pb-6 border-b border-gray-200">
                          <span className="text-3xl font-light text-gray-900">
                            {price.toLocaleString('tr-TR')}₺
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            {periodLabel}
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-4">
                        <div className="text-caption text-gray-500 uppercase tracking-wide">
                          Neler Dahil
                        </div>
                        <ul className="space-y-3">
                          {tier.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <div className="w-5 h-5 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckIcon className="h-3 w-3 text-gray-600" />
                              </div>
                              <span className="text-body text-gray-600 leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="pt-6">
                        <Button
                          href="/contact"
                          variant="primary"
                          size="lg"
                          className="w-full"
                        >
                          Teklif Al
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 text-center text-caption text-gray-500"
            >
              Tüm abonelik paketlerimiz 14 günlük iade garantilidir.
            </motion.p>
          </>
        ) : (
          <>
            {/* Project Grid (state-driven animation + remount) */}
            <motion.div
              key={`grid-${activeCategory}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projectTiers.map((tier) => (
                <motion.div
                  key={tier.name}
                  variants={itemVariants}
                  className="card group"
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <h3 className="text-title text-gray-900 mb-2">
                        {tier.name}
                      </h3>
                      <div className="pb-6 border-b border-gray-200">
                        <span className="text-2xl font-light text-gray-900">
                          {tier.price}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <div className="text-caption text-gray-500 uppercase tracking-wide">
                        Proje Kapsamı
                      </div>
                      <ul className="space-y-3">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mt-3 flex-shrink-0" />
                            <span className="text-body text-gray-600 leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="pt-6">
                      <Button
                        href="/contact"
                        variant="primary"
                        size="lg"
                        className="w-full"
                      >
                        Detaylı Teklif
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 text-center text-caption text-gray-500"
            >
              Tüm tek seferlik proje hizmetlerimiz %100 memnuniyet garantilidir.
            </motion.p>
          </>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            Özel Çözüm mü Gerekiyor?
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            Her işletme kendine özgüdür. Spesifik gereksinimlerinizi tartışalım 
            ve size mükemmel şekilde uygun özel bir çözüm oluşturalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Özel Teklif Al
            </Button>
            <Button href="/projects" variant="secondary" size="lg">
              Projelerimizi İncele
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
