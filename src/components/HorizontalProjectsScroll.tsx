// src/components/HorizontalProjectsScroll.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGSAP } from '@/lib/gsap';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { Locale } from '@/lib/i18n';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectTranslation {
  locale: string;
  name: string;
  description?: string | null;
}

interface Project {
  id: string;
  name: string;
  slug: string;
  client?: string | null;
  category?: string | null;
  industry?: string | null;
  thumbnail?: string | null;
  description?: string | null;
  technologies: unknown[];
  projectUrl?: string | null;
  translations: ProjectTranslation[];
}

interface Props {
  projects: any[];
  locale: Locale;
}

const CARD_W = 400;
const CARD_GAP = 28;


const DEMO_PROJECTS: Project[] = [
  {
    id: '1', name: 'Supply Chain SaaS Platform', slug: 'supply-chain-saas',
    client: 'LogisticsPro', category: 'SaaS', industry: 'Logistics',
    thumbnail: null,
    description: 'Real-time fleet tracking and route optimisation platform handling 10,000+ daily shipments with live dashboards.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'], projectUrl: null, translations: [],
  },
  {
    id: '2', name: 'Fashion E-Commerce Platform', slug: 'fashion-ecommerce',
    client: 'StyleBrand', category: 'E-Commerce', industry: 'Retail',
    thumbnail: null,
    description: 'Headless Shopify storefront with AI-powered recommendations, boosting conversion by 38%.',
    technologies: ['Next.js', 'Shopify', 'TypeScript'], projectUrl: null, translations: [],
  },
  {
    id: '3', name: 'Telehealth Patient Portal', slug: 'telehealth-portal',
    client: 'MedGroup', category: 'HealthTech', industry: 'Healthcare',
    thumbnail: null,
    description: 'HIPAA-compliant patient portal with appointment scheduling, video consultations, and EHR integration.',
    technologies: ['React', 'Node.js', 'Redis'], projectUrl: null, translations: [],
  },
  {
    id: '4', name: 'Real Estate Marketplace', slug: 'real-estate-marketplace',
    client: 'PropTech Co.', category: 'Marketplace', industry: 'Real Estate',
    thumbnail: null,
    description: 'Property discovery platform with virtual tours, AI valuation, and mortgage calculator.',
    technologies: ['Next.js', 'Three.js', 'Prisma'], projectUrl: null, translations: [],
  },
  {
    id: '5', name: 'FinTech Dashboard', slug: 'fintech-dashboard',
    client: 'PaySwift', category: 'FinTech', industry: 'Finance',
    thumbnail: null,
    description: 'Cross-platform banking app with biometric auth, instant transfers, and real-time analytics.',
    technologies: ['React Native', 'Node.js', 'Firebase'], projectUrl: null, translations: [],
  },
];

export default function HorizontalProjectsScroll({ projects, locale }: Props) {
  const { dir } = useTranslations();
  const t = useSectionTranslations('projects.horizontal');
  const prefersReducedMotion = useReducedMotion();

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);

  const localizedDemoProjects: Project[] = DEMO_PROJECTS.map((p, i) => {
    const tName = t(`demoProjects.${i}.name`) as string;
    const tDesc = t(`demoProjects.${i}.description`) as string;
    const name = tName && !tName.startsWith('projects.') ? tName : p.name;
    const description = tDesc && !tDesc.startsWith('projects.') ? tDesc : p.description;
    return { ...p, name, description };
  });

  const displayProjects: Project[] = (projects?.length > 0 ? projects : localizedDemoProjects).slice(0, 6);
  const isRTL = dir === 'rtl';

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;
    if (!outerRef.current || !innerRef.current) return;

    initGSAP();

    const outer = outerRef.current;
    const inner = innerRef.current;

    const ctx = gsap.context(() => {
      const getScrollDist = () => Math.max(0, inner.scrollWidth - window.innerWidth + 96);

      gsap.to(inner, {
        x: () => (isRTL ? getScrollDist() : -getScrollDist()),
        ease: 'none',
        scrollTrigger: {
          trigger: outer,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => '+=' + getScrollDist(),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: self.progress });
            }
          },
        },
      });
    }, outer);

    return () => ctx.revert();
  }, [mounted, prefersReducedMotion, isRTL, displayProjects.length]);

  // Static grid fallback for reduced motion / SSR
  if (prefersReducedMotion) {
    return (
      <section className="py-24 bg-white" dir={dir}>
        <div className="container mx-auto px-6">
          <SectionHeader t={t} isRTL={isRTL} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {displayProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} locale={locale} isRTL={isRTL} t={t} themeIndex={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const trackWidth = displayProjects.length * (CARD_W + CARD_GAP) + 192;

  return (
    <div ref={outerRef} className="relative bg-white overflow-hidden" style={{ height: '100vh' }}>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-10 pb-5 px-8 md:px-16">
        <SectionHeader t={t} isRTL={isRTL} progress={progress} progressBarRef={progressBarRef} />
      </div>

      {/* Card track */}
      <div
        ref={innerRef}
        className={`absolute flex items-center gap-7 px-16 ${isRTL ? 'flex-row-reverse' : ''}`}
        style={{
          top: '160px',
          bottom: '48px',
          width: `${trackWidth}px`,
          willChange: 'transform',
        }}
      >
        {displayProjects.map((project, i) => (
          <div key={project.id} className="h-scroll-card flex-shrink-0" style={{ width: CARD_W }}>
            <ProjectCard project={project} locale={locale} isRTL={isRTL} t={t} themeIndex={i} />
          </div>
        ))}

        {/* End cap */}
        <div className="flex-shrink-0 w-8" />
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-600 text-xs font-medium select-none">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
        </svg>
        <span>{t('hint') as string}</span>
      </div>
    </div>
  );
}

function SectionHeader({
  t, isRTL, progress, progressBarRef,
}: {
  t: (k: string) => unknown;
  isRTL: boolean;
  progress?: number;
  progressBarRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className={`flex items-end justify-between gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div>
        <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-6 h-px bg-gray-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            {t('eyebrow') as string}
          </span>
          <div className="w-6 h-px bg-gray-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {t('title') as string}
        </h2>
      </div>

      {progressBarRef && (
        <div className="hidden md:flex flex-col items-end gap-2">
          <span className="text-xs text-gray-400 font-mono">
            {Math.round((progress ?? 0) * 100)}%
          </span>
          <div className="w-48 h-px bg-gray-200 relative overflow-hidden rounded-full">
            <div
              ref={progressBarRef}
              className="absolute inset-y-0 left-0 w-full bg-gray-900 origin-left rounded-full"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project, locale, isRTL, t, themeIndex,
}: {
  project: Project;
  locale: Locale;
  isRTL: boolean;
  t: (k: string) => unknown;
  themeIndex: number;
}) {
  const [imgError, setImgError] = useState(false);

  const localizedName =
    project.translations?.find((tr) => tr.locale === locale)?.name || project.name;
  const localizedDesc =
    project.translations?.find((tr) => tr.locale === locale)?.description || project.description;

  const technologies = Array.isArray(project.technologies)
    ? (project.technologies as string[]).slice(0, 3)
    : [];

  const href = `/${locale}/projects/${project.slug}`;
  const num = String(themeIndex + 1).padStart(2, '0');

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col"
      style={{ height: 'calc(100vh - 260px)', minHeight: 320, maxHeight: 520 }}
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 overflow-hidden bg-gray-100" style={{ height: '48%' }}>
        {project.thumbnail && !imgError ? (
          <Image
            src={project.thumbnail}
            alt={localizedName}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-7xl font-bold text-gray-300 select-none leading-none">
              {num}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category chip */}
        {project.category && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-[11px] font-semibold rounded-full shadow-sm">
              {project.category}
            </span>
          </div>
        )}

        {/* Project number */}
        <div className="absolute top-3 right-3 text-xs font-mono font-bold text-white/70 bg-black/20 backdrop-blur-sm px-1.5 py-0.5 rounded">
          {num}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-2.5">
        {project.client && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            {project.client}
          </p>
        )}

        <h3 className={`text-base font-semibold text-gray-900 leading-snug group-hover:text-gray-700 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}>
          {localizedName}
        </h3>

        {localizedDesc && (
          <p className={`text-sm leading-relaxed flex-1 line-clamp-3 text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}>
            {localizedDesc}
          </p>
        )}

        {/* Tech tags */}
        {technologies.length > 0 && (
          <div className={`flex flex-wrap gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[11px] font-medium bg-white border border-gray-200 rounded-sm text-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-100 mt-auto" />

        {/* Link */}
        <Link
          href={href}
          className={`inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group/link pt-1 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {t('viewProject') as string}
          <svg
            className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
