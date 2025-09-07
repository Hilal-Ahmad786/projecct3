// src/components/OurStoryTimeline.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

const milestones = [
  { 
    year: '2021', 
    label: 'Kuruluş & İlk MVP', 
    desc: 'Ar-Ge desteğiyle Prototip Yayınlandı',
    icon: '🚀'
  },
  { 
    year: '2022', 
    label: 'Pilot Projeler', 
    desc: '3 farklı KOBİ ile saha testleri yapıldı',
    icon: '⚡'
  },
  { 
    year: '2023', 
    label: 'Teknopark Başvurusu', 
    desc: 'Bozok Teknopark\'ta Ar-Ge Merkezine aday',
    icon: '🏢'
  },
  { 
    year: '2024', 
    label: 'Modüler Platform', 
    desc: 'MDL-01…MDL-07 modülleri yayında',
    icon: '🔧'
  },
  { 
    year: '2025', 
    label: 'Uluslararası Hedef', 
    desc: 'Orta Doğu ve Avrupa\'ya açılım planı',
    icon: '🌍'
  },
];

export default function OurStoryTimeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
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
    <section className="section bg-white relative overflow-hidden">
      {/* Swiss Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
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

      {/* Proper Crescent Elements */}
      <div className="absolute top-20 left-16 w-28 h-28">
        <div className="crescent crescent-left crescent-subtle text-gray-900" />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Our Journey"
          title="Company Timeline"
          subtitle="From humble beginnings to innovative solutions - discover the key milestones that shaped our company's growth and evolution."
          className="mb-16"
        />

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop: Horizontal Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gray-200 transform -translate-y-1/2" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-0"
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className="relative lg:text-center"
              >
                {/* Mobile Timeline Connector */}
                <div className="lg:hidden flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center">
                    <span className="text-lg">{milestone.icon}</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Desktop Timeline Node */}
                <div className="hidden lg:flex items-center justify-center relative z-10 mb-6">
                  <div className="w-16 h-16 bg-white border-4 border-gray-200 rounded-sm flex items-center justify-center relative group hover:border-gray-300 transition-colors">
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {milestone.icon}
                    </span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="card lg:mt-6">
                  <div className="space-y-3">
                    {/* Year Badge */}
                    <div className="inline-flex px-3 py-1 bg-gray-100 border border-gray-200 rounded-sm">
                      <span className="text-sm font-medium text-gray-900">
                        {milestone.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-title text-gray-900">
                      {milestone.label}
                    </h3>

                    {/* Description */}
                    <p className="text-body text-gray-600 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
        >
          {[
            { value: "5+", label: "Years Journey" },
            { value: "50+", label: "Projects Delivered" },
            { value: "3", label: "Major Milestones" },
            { value: "2", label: "Market Expansions" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-light text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-caption text-gray-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}