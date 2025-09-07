// src/components/OurStoryTimeline.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function OurStoryTimeline() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('about.timeline');

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <section className="section bg-white relative overflow-hidden">
        <div className="container mx-auto text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading timeline...</p>
        </div>
      </section>
    );
  }

  // Get milestones from translations with fallback
  const getMilestones = () => {
    try {
      const milestonesData = t('milestones');
      if (milestonesData && typeof milestonesData === 'object') {
        // Convert object to array with years as keys
        const milestonesArray = Object.entries(milestonesData).map(([year, data]: [string, any]) => ({
          year,
          label: data.label || '',
          description: data.description || '',
          icon: getIconForYear(year)
        }));
        
        // Sort by year
        return milestonesArray.sort((a, b) => parseInt(a.year) - parseInt(b.year));
      }
    } catch (error) {
      console.error('Error loading timeline milestones:', error);
    }
    
    // Fallback data
    return [
      { 
        year: '2021', 
        label: 'Foundation & First MVP', 
        description: 'R&D supported prototype launched',
        icon: '🚀'
      },
      { 
        year: '2022', 
        label: 'Pilot Projects', 
        description: 'Field tests conducted with 3 different SMEs',
        icon: '⚡'
      },
      { 
        year: '2023', 
        label: 'Technopark Application', 
        description: 'Candidate for R&D Center at Bozok Technopark',
        icon: '🏢'
      },
      { 
        year: '2024', 
        label: 'Modular Platform', 
        description: 'MDL-01…MDL-07 modules live',
        icon: '🔧'
      },
      { 
        year: '2025', 
        label: 'International Target', 
        description: 'Expansion plan to Middle East and Europe',
        icon: '🌍'
      },
    ];
  };

  // Helper function to get appropriate icon for each year
  const getIconForYear = (year: string) => {
    const iconMap: { [key: string]: string } = {
      '2021': '🚀',
      '2022': '⚡',
      '2023': '🏢',
      '2024': '🔧',
      '2025': '🌍'
    };
    return iconMap[year] || '📅';
  };

  // Get stats from translations with fallback
  const getStats = () => {
    try {
      const statsData = t('stats');
      if (statsData && typeof statsData === 'object') {
        return [
          { value: statsData.yearsJourney || "5+", label: statsData.yearsJourney || "Years Journey" },
          { value: statsData.projectsDelivered || "50+", label: statsData.projectsDelivered || "Projects Delivered" },
          { value: statsData.majorMilestones || "5", label: statsData.majorMilestones || "Major Milestones" },
          { value: statsData.marketExpansions || "2", label: statsData.marketExpansions || "Market Expansions" }
        ];
      }
    } catch (error) {
      console.error('Error loading timeline stats:', error);
    }

    // Fallback stats
    return [
      { value: "5+", label: "Years Journey" },
      { value: "50+", label: "Projects Delivered" },
      { value: "5", label: "Major Milestones" },
      { value: "2", label: "Market Expansions" }
    ];
  };

  const milestones = getMilestones();
  const stats = getStats();

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
    <section className="section bg-white relative overflow-hidden" dir={dir}>
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
      <div className={`absolute top-20 w-28 h-28 ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-900`} />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
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
            className={`grid grid-cols-1 lg:grid-cols-${milestones.length} gap-8 lg:gap-0`}
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className="relative lg:text-center"
              >
                {/* Mobile Timeline Connector */}
                <div className={`lg:hidden flex items-center gap-4 mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center">
                    <span className="text-lg" role="img" aria-label={`${milestone.year} milestone`}>
                      {milestone.icon}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Desktop Timeline Node */}
                <div className="hidden lg:flex items-center justify-center relative z-10 mb-6">
                  <div className="w-16 h-16 bg-white border-4 border-gray-200 rounded-sm flex items-center justify-center relative group hover:border-gray-300 transition-colors">
                    <span 
                      className="text-xl group-hover:scale-110 transition-transform"
                      role="img" 
                      aria-label={`${milestone.year} milestone`}
                    >
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
                      {milestone.description}
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
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label || index}
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