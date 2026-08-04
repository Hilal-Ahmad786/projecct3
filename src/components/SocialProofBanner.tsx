'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { smoothSpring, snappySpring, useCountUp, useInViewOnce } from '@/lib/animations';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { COMPANY_STATS } from '@/config/companyStats';

interface TrustBadge {
  name: string;
  icon?: string;
}

interface SocialProofBannerProps {
  logos?: string[];
  variant?: 'logos' | 'stats' | 'combined';
  // Allow callers to override with translated data already resolved
  title?: string;
  stats?: Array<{ value: string; label: string }>;
  badges?: TrustBadge[];
}

const defaultLogos = [
  '/logos/clients/client1.svg',
  '/logos/clients/client2.svg',
  '/logos/clients/client3.svg',
  '/logos/clients/client4.svg',
  '/logos/clients/client5.svg',
];

function CountUpStatItem({ value, label, dir }: { value: string; label: string; dir: string }) {
  const { ref, isInView } = useInViewOnce();
  const prefersReducedMotion = useReducedMotion();
  const match = value.replace('+', '').match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = value.includes('+') ? '+' : (match ? match[2] : '');
  const count = useCountUp(target, prefersReducedMotion ? 0 : 2000, isInView);

  const display = match ? (dir === 'rtl' ? `+${count}` : `${count}+`) : value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? { duration: 0 } : smoothSpring}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-gray-900">
        {display}
      </div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </motion.div>
  );
}

export default function SocialProofBanner({
  logos = defaultLogos,
  variant = 'combined',
  title: titleProp,
  stats: statsProp,
  badges: badgesProp,
}: SocialProofBannerProps) {
  const prefersReducedMotion = useReducedMotion();
  const { dir } = useTranslations();
  const t = useSectionTranslations('socialProof');

  const title = titleProp ?? (t('title') as string);

  const stats: Array<{ value: string; label: string }> = statsProp ?? (() => {
    try {
      const raw = t('stats');
      if (Array.isArray(raw)) return raw as Array<{ value: string; label: string }>;
    } catch {}
    return [
      { value: COMPANY_STATS.projects,    label: 'Projects Completed' },
      { value: COMPANY_STATS.clients,     label: 'Happy Clients' },
      { value: COMPANY_STATS.years,       label: 'Years Experience' },
      { value: COMPANY_STATS.teamMembers, label: 'Team Members' },
    ];
  })();

  const badges: TrustBadge[] = badgesProp ?? (() => {
    try {
      const raw = t('badges');
      if (Array.isArray(raw)) return (raw as string[]).map((name) => ({ name }));
    } catch {}
    // Certification badges removed 2026-08: only list certifications PakSoft actually holds.
    return [
      { name: 'GDPR Compliant' },
    ];
  })();

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100" dir={dir}>
      <div className="container mx-auto px-6 lg:px-8">
        {title && (
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-8">
            {title}
          </p>
        )}

        {/* Logos */}
        {(variant === 'logos' || variant === 'combined') && logos.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-10">
            {logos.map((logo, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : {
                  opacity: 0,
                  x: index % 2 === 0 ? -30 : 30,
                  filter: 'blur(6px)',
                }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: index * 0.08 }}
                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <Image
                  src={logo}
                  alt={`Client logo ${index + 1}`}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        {(variant === 'stats' || variant === 'combined') && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <CountUpStatItem key={index} value={stat.value} label={stat.label} dir={dir} />
            ))}
          </div>
        )}

        {/* Trust Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { ...snappySpring, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-gray-600"
              >
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {badge.name}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
