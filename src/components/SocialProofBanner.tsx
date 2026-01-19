'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TrustBadge {
  name: string;
  icon?: string;
}

interface SocialProofBannerProps {
  title?: string;
  logos?: string[];
  stats?: Array<{ value: string; label: string }>;
  badges?: TrustBadge[];
  variant?: 'logos' | 'stats' | 'combined';
}

const defaultLogos = [
  '/logos/clients/client1.svg',
  '/logos/clients/client2.svg',
  '/logos/clients/client3.svg',
  '/logos/clients/client4.svg',
  '/logos/clients/client5.svg',
];

const defaultStats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '200+', label: 'Happy Clients' },
  { value: '15+', label: 'Years Experience' },
  { value: '50+', label: 'Team Members' },
];

const defaultBadges: TrustBadge[] = [
  { name: 'ISO 27001 Certified' },
  { name: 'GDPR Compliant' },
  { name: 'SOC 2 Type II' },
];

export default function SocialProofBanner({
  title = 'Trusted by leading companies worldwide',
  logos = defaultLogos,
  stats = defaultStats,
  badges = defaultBadges,
  variant = 'combined',
}: SocialProofBannerProps) {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Title */}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Trust Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-sm text-gray-600"
              >
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
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
