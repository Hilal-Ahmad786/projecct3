'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  XMarkIcon,
  Bars3Icon,
  GlobeAltIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  ShoppingCartIcon,
  LinkIcon,
  PaintBrushIcon,
  DevicePhoneMobileIcon,
  CpuChipIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
  BoltIcon,
  PencilSquareIcon,
  UserGroupIcon,
  BookOpenIcon,
  CommandLineIcon,
  CloudIcon,
  RocketLaunchIcon,
  MegaphoneIcon,
  PresentationChartLineIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  CursorArrowRaysIcon,
  ShareIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  PlayIcon,
  BriefcaseIcon,
  CloudArrowUpIcon,
  GlobeEuropeAfricaIcon,
  SwatchIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import { getLocalizedPath } from '@/lib/routes';
import Image from "next/image";
import { trackQuoteRequest, trackLanguageChange } from '@/lib/analytics';

// Service icon components mapping
const serviceIcons: Record<string, React.ElementType> = {
  'web-development': CodeBracketIcon,
  'e-commerce': ShoppingCartIcon,
  'api-development': LinkIcon,
  'ui-ux-design': PaintBrushIcon,
  'mobile-development': DevicePhoneMobileIcon,
  'saas-development': CloudIcon,
  'wordpress-development': GlobeEuropeAfricaIcon,
  'graphic-design': SwatchIcon,
  'ai-solutions': CpuChipIcon,
  'machine-learning': ChartBarIcon,
  'conversational-ai': ChatBubbleLeftRightIcon,
  'computer-vision': EyeIcon,
  'llm-finetuning': BoltIcon,
  'prompt-engineering': PencilSquareIcon,
  'ai-agents': UserGroupIcon,
  'rag-solutions': BookOpenIcon,
  'seo': MagnifyingGlassIcon,
  'google-ads': CursorArrowRaysIcon,
  'meta-ads': ShareIcon,
  'social-media-marketing': MegaphoneIcon,
  'email-marketing': EnvelopeIcon,
  'content-marketing': DocumentTextIcon,
  'tiktok-ads': PlayIcon,
  'linkedin-ads': BriefcaseIcon,
  'python-automation': CommandLineIcon,
  'devops-cloud': CloudIcon,
  'mlops-deployment': RocketLaunchIcon,
  'data-analytics': PresentationChartLineIcon,
  'cybersecurity': ShieldCheckIcon,
  'cloud-migration': CloudArrowUpIcon,
};

// Gradient backgrounds for service tiles
const serviceGradients: Record<string, string> = {
  'web-development': 'from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border-blue-200/50',
  'e-commerce': 'from-emerald-500/10 to-emerald-600/10 hover:from-emerald-500/20 hover:to-emerald-600/20 border-emerald-200/50',
  'api-development': 'from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20 border-purple-200/50',
  'ui-ux-design': 'from-pink-500/10 to-pink-600/10 hover:from-pink-500/20 hover:to-pink-600/20 border-pink-200/50',
  'mobile-development': 'from-cyan-500/10 to-cyan-600/10 hover:from-cyan-500/20 hover:to-cyan-600/20 border-cyan-200/50',
  'saas-development': 'from-sky-500/10 to-sky-600/10 hover:from-sky-500/20 hover:to-sky-600/20 border-sky-200/50',
  'wordpress-development': 'from-blue-400/10 to-indigo-500/10 hover:from-blue-400/20 hover:to-indigo-500/20 border-blue-200/50',
  'graphic-design': 'from-fuchsia-500/10 to-fuchsia-600/10 hover:from-fuchsia-500/20 hover:to-fuchsia-600/20 border-fuchsia-200/50',
  'ai-solutions': 'from-violet-500/10 to-violet-600/10 hover:from-violet-500/20 hover:to-violet-600/20 border-violet-200/50',
  'machine-learning': 'from-indigo-500/10 to-indigo-600/10 hover:from-indigo-500/20 hover:to-indigo-600/20 border-indigo-200/50',
  'conversational-ai': 'from-teal-500/10 to-teal-600/10 hover:from-teal-500/20 hover:to-teal-600/20 border-teal-200/50',
  'computer-vision': 'from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 border-amber-200/50',
  'llm-finetuning': 'from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20 border-orange-200/50',
  'prompt-engineering': 'from-rose-500/10 to-rose-600/10 hover:from-rose-500/20 hover:to-rose-600/20 border-rose-200/50',
  'ai-agents': 'from-fuchsia-500/10 to-fuchsia-600/10 hover:from-fuchsia-500/20 hover:to-fuchsia-600/20 border-fuchsia-200/50',
  'rag-solutions': 'from-lime-500/10 to-lime-600/10 hover:from-lime-500/20 hover:to-lime-600/20 border-lime-200/50',
  'seo': 'from-green-500/10 to-green-600/10 hover:from-green-500/20 hover:to-green-600/20 border-green-200/50',
  'google-ads': 'from-blue-500/10 to-yellow-500/10 hover:from-blue-500/20 hover:to-yellow-500/20 border-blue-200/50',
  'meta-ads': 'from-blue-600/10 to-indigo-500/10 hover:from-blue-600/20 hover:to-indigo-500/20 border-blue-200/50',
  'social-media-marketing': 'from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20 border-pink-200/50',
  'email-marketing': 'from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border-amber-200/50',
  'content-marketing': 'from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 border-teal-200/50',
  'tiktok-ads': 'from-gray-800/10 to-pink-500/10 hover:from-gray-800/20 hover:to-pink-500/20 border-gray-200/50',
  'linkedin-ads': 'from-blue-700/10 to-blue-500/10 hover:from-blue-700/20 hover:to-blue-500/20 border-blue-200/50',
  'python-automation': 'from-yellow-500/10 to-yellow-600/10 hover:from-yellow-500/20 hover:to-yellow-600/20 border-yellow-200/50',
  'devops-cloud': 'from-sky-500/10 to-sky-600/10 hover:from-sky-500/20 hover:to-sky-600/20 border-sky-200/50',
  'mlops-deployment': 'from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 border-red-200/50',
  'data-analytics': 'from-slate-500/10 to-slate-600/10 hover:from-slate-500/20 hover:to-slate-600/20 border-slate-200/50',
  'cybersecurity': 'from-gray-500/10 to-gray-600/10 hover:from-gray-500/20 hover:to-gray-600/20 border-gray-200/50',
  'cloud-migration': 'from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border-cyan-200/50',
};

// Icon colors for services
const serviceIconColors: Record<string, string> = {
  'web-development': 'text-blue-600',
  'e-commerce': 'text-emerald-600',
  'api-development': 'text-purple-600',
  'ui-ux-design': 'text-pink-600',
  'mobile-development': 'text-cyan-600',
  'saas-development': 'text-sky-600',
  'wordpress-development': 'text-blue-500',
  'graphic-design': 'text-fuchsia-600',
  'ai-solutions': 'text-violet-600',
  'machine-learning': 'text-indigo-600',
  'conversational-ai': 'text-teal-600',
  'computer-vision': 'text-amber-600',
  'llm-finetuning': 'text-orange-600',
  'prompt-engineering': 'text-rose-600',
  'ai-agents': 'text-fuchsia-600',
  'rag-solutions': 'text-lime-600',
  'seo': 'text-green-600',
  'google-ads': 'text-blue-600',
  'meta-ads': 'text-blue-700',
  'social-media-marketing': 'text-pink-600',
  'email-marketing': 'text-amber-600',
  'content-marketing': 'text-teal-600',
  'tiktok-ads': 'text-gray-800',
  'linkedin-ads': 'text-blue-700',
  'python-automation': 'text-yellow-600',
  'devops-cloud': 'text-sky-600',
  'mlops-deployment': 'text-red-600',
  'data-analytics': 'text-slate-600',
  'cybersecurity': 'text-gray-600',
  'cloud-migration': 'text-cyan-600',
};

// Service categories with their items — 4 balanced columns
const serviceCategories = {
  webSoftware: {
    services: [
      { slug: 'web-development' },
      { slug: 'e-commerce' },
      { slug: 'api-development' },
      { slug: 'ui-ux-design' },
      { slug: 'mobile-development' },
      { slug: 'saas-development' },
      { slug: 'wordpress-development' },
      { slug: 'graphic-design' },
    ]
  },
  aiMl: {
    services: [
      { slug: 'ai-solutions' },
      { slug: 'machine-learning' },
      { slug: 'conversational-ai' },
      { slug: 'computer-vision' },
      { slug: 'llm-finetuning' },
      { slug: 'prompt-engineering' },
      { slug: 'ai-agents' },
      { slug: 'rag-solutions' },
    ]
  },
  marketing: {
    services: [
      { slug: 'seo' },
      { slug: 'google-ads' },
      { slug: 'meta-ads' },
      { slug: 'social-media-marketing' },
      { slug: 'email-marketing' },
      { slug: 'content-marketing' },
      { slug: 'tiktok-ads' },
      { slug: 'linkedin-ads' },
    ]
  },
  infrastructure: {
    services: [
      { slug: 'python-automation' },
      { slug: 'devops-cloud' },
      { slug: 'mlops-deployment' },
      { slug: 'data-analytics' },
      { slug: 'cybersecurity' },
      { slug: 'cloud-migration' },
    ]
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const { locale, setLocale, isLoading, dir } = useTranslations();
  const t = useSectionTranslations('navbar');
  const tCommon = useSectionTranslations('common');
  const tServices = useSectionTranslations('megaMenu');

  // Detect if we are on a service detail page (microsite)
  const isServicePage = pathname.includes('/services/') && pathname.split('/').length > 3;

  // Extract current service slug from pathname
  const getServiceSlug = () => {
    const parts = pathname.split('/');
    const servicesIndex = parts.indexOf('services');
    if (servicesIndex !== -1 && parts[servicesIndex + 1]) {
      return parts[servicesIndex + 1];
    }
    return 'web-development';
  };
  const currentServiceSlug = getServiceSlug();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Standard Links (without services - it's handled separately)
  const mainLinks = [
    { label: t('home'), href: '/', localizedHref: getLocalizedPath('/', locale) },
    { label: t('projects'), href: '/projects', localizedHref: getLocalizedPath('/projects', locale) },
    { label: t('blog'), href: '/blog', localizedHref: getLocalizedPath('/blog', locale) },
    { label: t('about'), href: '/about', localizedHref: getLocalizedPath('/about', locale) },
    { label: t('contact'), href: '/contact', localizedHref: getLocalizedPath('/contact', locale) },
  ];

  // Service Microsite Links
  const serviceLinks = [
    { label: t('serviceNav.overview'), href: `/services/${currentServiceSlug}`, localizedHref: `/services/${currentServiceSlug}` },
    { label: t('serviceNav.features'), href: `/services/${currentServiceSlug}/features`, localizedHref: `/services/${currentServiceSlug}/features` },
    { label: t('serviceNav.process'), href: `/services/${currentServiceSlug}/process`, localizedHref: `/services/${currentServiceSlug}/process` },
    { label: t('serviceNav.techStack'), href: `/services/${currentServiceSlug}/tech-stack`, localizedHref: `/services/${currentServiceSlug}/tech-stack` },
    { label: t('serviceNav.portfolio'), href: `/services/${currentServiceSlug}/portfolio`, localizedHref: `/services/${currentServiceSlug}/portfolio` },
    { label: t('serviceNav.faq'), href: `/services/${currentServiceSlug}/faq`, localizedHref: `/services/${currentServiceSlug}/faq` },
  ];

  const currentLinks = isServicePage ? serviceLinks : mainLinks;

  const handleLanguageChange = async (newLocale: Locale) => {
    setLanguageOpen(false);
    if (newLocale !== locale) {
      trackLanguageChange(locale, newLocale);
      await setLocale(newLocale);
    }
  };

  const handleLinkClick = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  // Get localized service path based on locale
  const getServicePath = (slug: string) => {
    return `/${locale}/services/${slug}`;
  };

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50 transition-all duration-300
          ${scrolled
            ? 'glass-strong border-b border-glass shadow-lg py-3'
            : 'glass-subtle border-b border-glass/50 py-4'
          }
        `}
        dir={dir}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/images/logo/logo.png"
                alt="PakSoft Logo"
                width={160}
                height={160}
                className="rounded-sm"
                priority
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-8">
              {/* Home Link */}
              {!isServicePage && (
                <li className="relative">
                  <Link
                    href={`/${locale}`}
                    className={`
                      text-sm font-medium tracking-wide transition-colors duration-250
                      ${pathname === `/${locale}` || pathname === `/${locale}/`
                        ? 'text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    {t('home')}
                  </Link>
                  {(pathname === `/${locale}` || pathname === `/${locale}/`) && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900" />
                  )}
                </li>
              )}

              {/* Services Mega Dropdown - Only show when not on service page */}
              {!isServicePage && (
                <li className="relative" ref={servicesRef}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`
                      flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-250
                      ${pathname.includes('/services')
                        ? 'text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    {t('services')}
                    <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {pathname.includes('/services') && !servicesOpen && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900" />
                  )}

                  {/* Mega Dropdown */}
                  {servicesOpen && (
                    <div className={`absolute top-full mt-4 ${dir === 'rtl' ? 'right-0' : 'left-1/2 -translate-x-1/2'} w-[1100px] bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl p-8 z-50`}>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">{t('services')}</h2>
                          <p className="text-sm text-gray-500 mt-0.5">Explore our comprehensive digital solutions</p>
                        </div>
                        <Link
                          href={`/${locale}/services`}
                          onClick={handleLinkClick}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          {tServices('viewAll')}
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>

                      <div className="grid grid-cols-4 gap-6 max-h-[75vh] overflow-y-auto">
                        {/* Column 1: Web & Software */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                              <CodeBracketIcon className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">{tServices('webSoftware')}</h3>
                          </div>
                          <div className="space-y-1.5">
                            {serviceCategories.webSoftware.services.map((service) => {
                              const IconComponent = serviceIcons[service.slug] || CpuChipIcon;
                              const gradient = serviceGradients[service.slug];
                              const iconColor = serviceIconColors[service.slug];
                              return (
                                <Link
                                  key={service.slug}
                                  href={getServicePath(service.slug)}
                                  onClick={handleLinkClick}
                                  className={`group flex items-center gap-2.5 p-2 rounded-xl bg-gradient-to-br ${gradient} border transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
                                >
                                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <span className="text-[13px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                    {tServices(`services.${service.slug}`)}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Column 2: AI & ML */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                              <CpuChipIcon className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">{tServices('aiMl')}</h3>
                          </div>
                          <div className="space-y-1.5">
                            {serviceCategories.aiMl.services.map((service) => {
                              const IconComponent = serviceIcons[service.slug] || CpuChipIcon;
                              const gradient = serviceGradients[service.slug];
                              const iconColor = serviceIconColors[service.slug];
                              return (
                                <Link
                                  key={service.slug}
                                  href={getServicePath(service.slug)}
                                  onClick={handleLinkClick}
                                  className={`group flex items-center gap-2.5 p-2 rounded-xl bg-gradient-to-br ${gradient} border transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
                                >
                                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <span className="text-[13px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                    {tServices(`services.${service.slug}`)}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Column 3: Marketing & Growth */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                              <MegaphoneIcon className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">{tServices('marketingGrowth')}</h3>
                          </div>
                          <div className="space-y-1.5">
                            {serviceCategories.marketing.services.map((service) => {
                              const IconComponent = serviceIcons[service.slug] || CpuChipIcon;
                              const gradient = serviceGradients[service.slug];
                              const iconColor = serviceIconColors[service.slug];
                              return (
                                <Link
                                  key={service.slug}
                                  href={getServicePath(service.slug)}
                                  onClick={handleLinkClick}
                                  className={`group flex items-center gap-2.5 p-2 rounded-xl bg-gradient-to-br ${gradient} border transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
                                >
                                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <span className="text-[13px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                    {tServices(`services.${service.slug}`)}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Column 4: Infrastructure */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                              <ServerStackIcon className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">{tServices('infrastructure')}</h3>
                          </div>
                          <div className="space-y-1.5">
                            {serviceCategories.infrastructure.services.map((service) => {
                              const IconComponent = serviceIcons[service.slug] || CpuChipIcon;
                              const gradient = serviceGradients[service.slug];
                              const iconColor = serviceIconColors[service.slug];
                              return (
                                <Link
                                  key={service.slug}
                                  href={getServicePath(service.slug)}
                                  onClick={handleLinkClick}
                                  className={`group flex items-center gap-2.5 p-2 rounded-xl bg-gradient-to-br ${gradient} border transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
                                >
                                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <span className="text-[13px] font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                    {tServices(`services.${service.slug}`)}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )}

              {/* Service page links or remaining main links */}
              {isServicePage ? (
                serviceLinks.map(({ label, href, localizedHref }) => {
                  const isActive = pathname.endsWith(localizedHref);
                  return (
                    <li key={href} className="relative">
                      <Link
                        href={`/${locale}${localizedHref}`}
                        className={`
                          text-sm font-medium tracking-wide transition-colors duration-250
                          ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}
                        `}
                      >
                        {label}
                      </Link>
                      {isActive && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900" />}
                    </li>
                  );
                })
              ) : (
                // Remaining main links (projects, blog, about, contact)
                mainLinks.slice(1).map(({ label, href, localizedHref }) => {
                  const isActive = pathname.endsWith(localizedHref);
                  return (
                    <li key={href} className="relative">
                      <Link
                        href={`/${locale}${localizedHref}`}
                        onClick={handleLinkClick}
                        className={`
                          text-sm font-medium tracking-wide transition-colors duration-250
                          ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}
                        `}
                      >
                        {label}
                      </Link>
                      {isActive && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900" />}
                    </li>
                  );
                })
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                disabled={isLoading}
                className={`
                  flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900
                  transition-colors border border-gray-200 rounded-sm hover:border-gray-300
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <GlobeAltIcon className="h-4 w-4" />
                <span className="font-medium">
                  {localeNames[locale].flag} {locale.toUpperCase()}
                </span>
                <svg
                  className={`h-3 w-3 transition-transform duration-250 ${languageOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 glass border-glass rounded-sm shadow-lg py-1 z-50">
                  {locales.map((lang) => (
                    <button
                      key={lang}
                      className={`
                        w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors
                        ${lang === locale
                          ? 'text-gray-900 bg-gray-50'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => handleLanguageChange(lang)}
                      disabled={isLoading}
                    >
                      <span>{localeNames[lang].flag}</span>
                      <span className="font-medium">{localeNames[lang].nativeName}</span>
                      {lang === locale && (
                        <svg className="h-4 w-4 ml-auto text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/${locale}${getLocalizedPath('/contact', locale)}`}
              onClick={() => trackQuoteRequest('navbar')}
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium
                         bg-gray-900 text-white border border-gray-900 rounded-sm
                         hover:bg-gray-700 hover:border-gray-700 transition-all duration-250
                         hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <span>{t('getQuote')}</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-sm hover:border-gray-300 transition-colors"
              aria-label={`${tCommon('menu')}`}
            >
              {open ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" dir={dir}>
          <div
            className="absolute inset-0 bg-gray-900/20"
            onClick={() => setOpen(false)}
          />

          <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} top-0 h-full w-80 glass-strong border-l border-glass shadow-2xl overflow-y-auto`}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">{tCommon('menu')}</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-sm hover:border-gray-300"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 px-6 py-6">
                <ul className="space-y-2">
                  {/* Home */}
                  <li>
                    <Link
                      href={`/${locale}`}
                      className={`
                        block px-4 py-3 text-sm font-medium transition-colors border-l-2
                        ${pathname === `/${locale}` || pathname === `/${locale}/`
                          ? 'text-gray-900 border-gray-900 bg-gray-50'
                          : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                        }
                      `}
                      onClick={() => setOpen(false)}
                    >
                      {t('home')}
                    </Link>
                  </li>

                  {/* Services Accordion */}
                  <li>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors border-l-2
                        ${pathname.includes('/services')
                          ? 'text-gray-900 border-gray-900 bg-gray-50'
                          : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                        }
                      `}
                    >
                      {t('services')}
                      <ChevronDownIcon className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {mobileServicesOpen && (
                      <div className="mt-2 ml-4 space-y-4 pb-4">
                        {/* Web & Software */}
                        <div>
                          <div className="flex items-center gap-2 mb-2 px-2">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                              <CodeBracketIcon className="w-3 h-3 text-white" />
                            </div>
                            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              {tServices('webSoftware')}
                            </h4>
                          </div>
                          <ul className="space-y-1">
                            {serviceCategories.webSoftware.services.map((service) => {
                              const IconComponent = serviceIcons[service.slug] || CpuChipIcon;
                              const iconColor = serviceIconColors[service.slug];
                              return (
                                <li key={service.slug}>
                                  <Link
                                    href={getServicePath(service.slug)}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-2 py-1.5 hover:bg-gray-50 rounded-lg transition-colors"
                                  >
                                    <IconComponent className={`w-4 h-4 ${iconColor}`} />
                                    <span>{tServices(`services.${service.slug}`)}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        {/* AI & ML */}
                        <div>
                          <div className="flex items-center gap-2 mb-2 px-2">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                              <CpuChipIcon className="w-3 h-3 text-white" />
                            </div>
                            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              {tServices('aiMl')}
                            </h4>
                          </div>
                          <ul className="space-y-1">
                            {serviceCategories.aiMl.services.map((service) => {
                              const IconComponent = serviceIcons[service.slug] || CpuChipIcon;
                              const iconColor = serviceIconColors[service.slug];
                              return (
                                <li key={service.slug}>
                                  <Link
                                    href={getServicePath(service.slug)}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-2 py-1.5 hover:bg-gray-50 rounded-lg transition-colors"
                                  >
                                    <IconComponent className={`w-4 h-4 ${iconColor}`} />
                                    <span>{tServices(`services.${service.slug}`)}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        {/* Marketing & Growth */}
                        <div>
                          <div className="flex items-center gap-2 mb-2 px-2">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                              <MegaphoneIcon className="w-3 h-3 text-white" />
                            </div>
                            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              {tServices('marketingGrowth')}
                            </h4>
                          </div>
                          <ul className="space-y-1">
                            {serviceCategories.marketing.services.map((service) => {
                              const IconComponent = serviceIcons[service.slug] || CpuChipIcon;
                              const iconColor = serviceIconColors[service.slug];
                              return (
                                <li key={service.slug}>
                                  <Link
                                    href={getServicePath(service.slug)}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-2 py-1.5 hover:bg-gray-50 rounded-lg transition-colors"
                                  >
                                    <IconComponent className={`w-4 h-4 ${iconColor}`} />
                                    <span>{tServices(`services.${service.slug}`)}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        {/* Infrastructure */}
                        <div>
                          <div className="flex items-center gap-2 mb-2 px-2">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                              <ServerStackIcon className="w-3 h-3 text-white" />
                            </div>
                            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              {tServices('infrastructure')}
                            </h4>
                          </div>
                          <ul className="space-y-1">
                            {serviceCategories.infrastructure.services.map((service) => {
                              const IconComponent = serviceIcons[service.slug] || CpuChipIcon;
                              const iconColor = serviceIconColors[service.slug];
                              return (
                                <li key={service.slug}>
                                  <Link
                                    href={getServicePath(service.slug)}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-2 py-1.5 hover:bg-gray-50 rounded-lg transition-colors"
                                  >
                                    <IconComponent className={`w-4 h-4 ${iconColor}`} />
                                    <span>{tServices(`services.${service.slug}`)}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        {/* View All */}
                        <Link
                          href={`/${locale}/services`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 text-sm font-medium text-white bg-gray-900 px-4 py-2.5 mt-3 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          {tServices('viewAll')}
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    )}
                  </li>

                  {/* Other Links */}
                  {mainLinks.slice(1).map(({ label, href, localizedHref }) => {
                    const isActive = pathname.endsWith(localizedHref);
                    return (
                      <li key={href}>
                        <Link
                          href={`/${locale}${localizedHref}`}
                          className={`
                            block px-4 py-3 text-sm font-medium transition-colors border-l-2
                            ${isActive
                              ? 'text-gray-900 border-gray-900 bg-gray-50'
                              : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                            }
                          `}
                          onClick={() => setOpen(false)}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">
                    {t('language')}
                  </h3>
                  <div className="space-y-2">
                    {locales.map((lang) => (
                      <button
                        key={lang}
                        className={`
                          flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors rounded-sm
                          ${lang === locale
                            ? 'text-gray-900 bg-gray-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }
                        `}
                        onClick={() => {
                          handleLanguageChange(lang);
                          setOpen(false);
                        }}
                        disabled={isLoading}
                      >
                        <span>{localeNames[lang].flag}</span>
                        <span className="font-medium">{localeNames[lang].nativeName}</span>
                        {lang === locale && (
                          <svg className="h-4 w-4 ml-auto text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <Link
                  href={`/${locale}${getLocalizedPath('/contact', locale)}`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-medium
                             bg-gray-900 text-white border border-gray-900 rounded-sm
                             hover:bg-gray-700 hover:border-gray-700 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <span>{t('getQuote')}</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {languageOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setLanguageOpen(false)}
        />
      )}

      {servicesOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setServicesOpen(false)}
        />
      )}
    </>
  );
}
