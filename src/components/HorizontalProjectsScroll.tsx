// src/components/HorizontalProjectsScroll.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGSAP } from '@/lib/gsap';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import SplitHeading from '@/components/SplitHeading';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Locale } from '@/lib/i18n';
import Link from 'next/link';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projects: any[];
  locale: Locale;
}

const CARD_W = 380;
const CARD_GAP = 24;

const DEMO_PROJECTS: Project[] = [
  { id: '1', name: 'E-Commerce Platform', slug: 'ecommerce-platform', client: 'RetailCo', category: 'web', industry: 'E-Commerce', thumbnail: '/images/Demo/ShopifyBot.png', description: 'Full-stack Shopify integration with AI-powered product recommendations and real-time analytics dashboard.', technologies: ['Next.js', 'Shopify', 'TypeScript'], projectUrl: null, translations: [] },
  { id: '2', name: 'Healthcare Management', slug: 'healthcare-mgmt', client: 'MedGroup', category: 'app', industry: 'Healthcare', thumbnail: '/images/Demo/ShopifyBot.png', description: 'Patient management system with appointment scheduling, telemedicine, and HIPAA-compliant data handling.', technologies: ['React', 'Node.js', 'PostgreSQL'], projectUrl: null, translations: [] },
  { id: '3', name: 'Logistics Dashboard', slug: 'logistics-dashboard', client: 'FreightPro', category: 'web', industry: 'Logistics', thumbnail: '/images/Demo/ShopifyBot.png', description: 'Real-time fleet tracking and route optimization platform handling 10,000+ daily shipments.', technologies: ['Vue.js', 'Python', 'Redis'], projectUrl: null, translations: [] },
  { id: '4', name: 'FinTech Mobile App', slug: 'fintech-app', client: 'PaySwift', category: 'mobile', industry: 'Finance', thumbnail: '/images/Demo/ShopifyBot.png', description: 'Cross-platform mobile banking application with biometric authentication and instant transfers.', technologies: ['Flutter', 'Dart', 'Firebase'], projectUrl: null, translations: [] },
  { id: '5', name: 'AI Content Studio', slug: 'ai-content-studio', client: 'CreativeAI', category: 'saas', industry: 'Media', thumbnail: '/images/Demo/ShopifyBot.png', description: 'SaaS platform for AI-powered content generation, editing, and multilingual publishing.', technologies: ['Python', 'OpenAI', 'React'], projectUrl: null, translations: [] },
];

export default function HorizontalProjectsScroll({ projects, locale }: Props) {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('projects.horizontal');
  const prefersReducedMotion = useReducedMotion();

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const springProgress = useSpring(0, { stiffness: 120, damping: 30 });
  const [mounted, setMounted] = useState(false);

  // Merge DB projects with demo fallbacks
  const displayProjects: Project[] = (projects && projects.length > 0 ? projects : DEMO_PROJECTS).slice(0, 8);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;
    if (!outerRef.current || !innerRef.current) return;

    initGSAP();

    const outer = outerRef.current;
    const inner = innerRef.current;

    const ctx = gsap.context(() => {
      const getScrollDist = () => inner.offsetWidth - window.innerWidth + 80;

      const hScroll = gsap.to(inner, {
        x: () => (dir === 'rtl' ? getScrollDist() : -getScrollDist()),
        ease: 'none',
        scrollTrigger: {
          trigger: outer,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + getScrollDist(),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            springProgress.set(self.progress);
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: self.progress });
            }
          },
        },
      });

      // Per-card entrance
      inner.querySelectorAll('.h-scroll-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: hScroll,
            start: 'left 90%',
            once: true,
          },
        });
      });
    }, outer);

    return () => ctx.revert();
  }, [mounted, prefersReducedMotion, dir, displayProjects.length]);

  if (isLoading) return null;

  // Fallback: simple grid for reduced motion or SSR
  if (prefersReducedMotion) {
    return (
      <section className="section bg-white" dir={dir}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <SplitHeading tag="h2" text={t('title') as string || 'Featured Projects'} className="text-headline text-gray-900" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((p) => (
              <ProjectCard key={p.id} project={p} locale={locale} dir={dir} t={t} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={outerRef} className="relative bg-white overflow-hidden" style={{ height: '100vh' }}>
      {/* Section header — pinned above the track */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-12 pb-6 px-8 md:px-16 bg-white/90 backdrop-blur-sm">
        <div className={`flex items-end justify-between gap-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <div>
            <div className={`flex items-center gap-3 mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-0.5 bg-gray-900" />
              <span className="text-overline">{t('eyebrow') as string || 'Our Work'}</span>
              <div className="w-8 h-0.5 bg-gray-900" />
            </div>
            <SplitHeading
              tag="h2"
              text={t('title') as string || 'Featured Projects'}
              className="text-headline text-gray-900"
            />
          </div>
          <p className={`hidden md:block text-body text-gray-500 max-w-xs mb-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            {t('hint') as string || 'Scroll to explore →'}
          </p>
        </div>

        {/* Progress bar track */}
        <div className="mt-6 h-px bg-gray-100 w-full relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute inset-y-0 left-0 w-full origin-left"
            style={{ backgroundColor: '#16a085', transformOrigin: dir === 'rtl' ? 'right center' : 'left center', transform: 'scaleX(0)' }}
          />
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={innerRef}
        className={`absolute bottom-0 flex gap-6 items-center px-16 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
        style={{
          top: '160px',
          width: `${displayProjects.length * (CARD_W + CARD_GAP) + 128}px`,
          willChange: 'transform',
        }}
      >
        {displayProjects.map((project) => (
          <div key={project.id} className="h-scroll-card flex-shrink-0" style={{ width: CARD_W }}>
            <ProjectCard project={project} locale={locale} dir={dir} t={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  locale,
  dir,
  t,
}: {
  project: Project;
  locale: Locale;
  dir: string;
  t: (key: string) => unknown;
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

  return (
    <motion.div
      data-cursor="view"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{ height: 460 }}
    >
      {/* Thumbnail */}
      <div className="relative h-52 bg-gray-50 overflow-hidden">
        {project.thumbnail && !imgError ? (
          <img
            src={project.thumbnail}
            alt={localizedName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-4xl font-bold text-gray-300">
              {localizedName.charAt(0)}
            </span>
          </div>
        )}

        {/* Category badge */}
        {project.category && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 uppercase tracking-wide">
            {project.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-[calc(460px-13rem)]">
        {project.client && (
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{project.client}</p>
        )}
        <h3 className={`text-lg font-bold text-gray-900 mb-3 leading-tight ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {localizedName}
        </h3>
        {localizedDesc && (
          <p className={`text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            {localizedDesc}
          </p>
        )}

        {/* Tech tags */}
        {technologies.length > 0 && (
          <div className={`flex flex-wrap gap-2 mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {technologies.map((tech, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-xs text-gray-500">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Link */}
        <Link
          href={href}
          className={`inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
        >
          {t('viewProject') as string || 'View Project'}
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
