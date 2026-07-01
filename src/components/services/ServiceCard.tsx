'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  features?: string[];
  variant?: 'default' | 'glass' | 'bordered' | 'featured';
  className?: string;
  index?: number;
}

const variants = {
  default: 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg',
  glass: 'glass hover:glass-strong',
  bordered: 'bg-white border-2 border-gray-900 hover:bg-gray-50',
  featured: 'bg-gray-900 text-white hover:bg-gray-800',
};

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  features,
  variant = 'default',
  className = '',
  index = 0,
}: ServiceCardProps) {
  const isFeatured = variant === 'featured';

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative p-6 rounded-xl transition-all duration-300
        ${variants[variant]}
        ${className}
      `}
    >
      {/* Icon */}
      {icon && (
        <div
          className={`
            w-12 h-12 rounded-lg flex items-center justify-center mb-4
            ${isFeatured ? 'bg-white/10' : 'bg-gray-100'}
          `}
        >
          <div className={isFeatured ? 'text-white' : 'text-gray-900'}>{icon}</div>
        </div>
      )}

      {/* Title */}
      <h3
        className={`
          text-lg font-semibold mb-2
          ${isFeatured ? 'text-white' : 'text-gray-900'}
        `}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`
          text-sm leading-relaxed mb-4
          ${isFeatured ? 'text-gray-300' : 'text-gray-600'}
        `}
      >
        {description}
      </p>

      {/* Features List */}
      {features && features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <svg
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  isFeatured ? 'text-heritage-turquoise-soft' : 'text-heritage-turquoise'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className={isFeatured ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Arrow indicator for links */}
      {href && (
        <div
          className={`
            absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center
            transition-transform duration-300 group-hover:translate-x-1
            ${isFeatured ? 'bg-white/10' : 'bg-gray-100'}
          `}
        >
          <svg
            className={`w-4 h-4 ${isFeatured ? 'text-white' : 'text-gray-900'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block group">
        {content}
      </Link>
    );
  }

  return content;
}

// Grid wrapper for consistent card layouts
interface ServiceCardGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ServiceCardGrid({ children, columns = 3, className = '' }: ServiceCardGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 ${className}`}>{children}</div>
  );
}
