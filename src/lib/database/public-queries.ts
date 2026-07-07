import { getPrisma } from '@/lib/db/prisma';
import { unstable_cache } from 'next/cache';
import {
  fallbackServices,
  fallbackProjects,
  fallbackServiceBySlug,
  fallbackSubServices,
} from './_fallback';

const getPrismaClient = () => getPrisma();

// Public service content is cached for 1 hour (tag 'services') so service
// pages serve from the Next data cache instead of hitting Neon on every
// request. Content edits appear within the hour (or immediately on redeploy).
// Pages stay fully server-rendered — crawlers see identical complete HTML;
// this only changes where the data comes from, so it's SEO-safe and faster
// responses improve Core Web Vitals.
const CACHE_OPTS = { revalidate: 3600, tags: ['services'] };

// Now that public pages are statically prerendered, a DB error at build time
// would fail the whole deploy (previously these were dynamic, so DB errors were
// isolated per-request 500s). These helpers swallow DB errors and return a safe
// empty result so the build/runtime degrades gracefully instead of hard-failing.
// NOTE: this is a safety net — a persistent DB issue (e.g. an exceeded data
// transfer quota) still needs to be resolved for pages to show real content.
function dbError(scope: string, err: unknown) {
  console.error(`[public-queries] DB error in ${scope}:`, err);
}

// ==================== SERVICE QUERIES ====================

export const getPublishedServices = unstable_cache(
  async (locale?: string) => {
    try {
      const services = await getPrismaClient().service.findMany({
        where: { status: { in: ['published', 'active'] } },
        include: {
          translations: locale ? { where: { locale } } : false,
          pricingPackages: true,
        },
        orderBy: { order: 'asc' },
      });
      if (!services.length) return fallbackServices;
      return services.map((service) => mergeServiceTranslation(service, locale));
    } catch (err) {
      dbError('getPublishedServices', err);
      return fallbackServices;
    }
  },
  ['public:services-all'],
  CACHE_OPTS,
);

export const getFeaturedServices = unstable_cache(
  async (locale?: string) => {
    try {
      const services = await getPrismaClient().service.findMany({
        where: { status: { in: ['published', 'active'] }, featured: true },
        include: {
          translations: locale ? { where: { locale } } : false,
          pricingPackages: true,
        },
        orderBy: { order: 'asc' },
      });
      if (!services.length) return fallbackServices.filter((s) => s.featured);
      return services.map((service) => mergeServiceTranslation(service, locale));
    } catch (err) {
      dbError('getFeaturedServices', err);
      return fallbackServices.filter((s) => s.featured);
    }
  },
  ['public:services-featured'],
  CACHE_OPTS,
);

// Trimmed sitemap query. The sitemap only needs: slug + updatedAt (for the URL
// and lastmod) and enough to decide which sub-pages exist (features / content
// sub-arrays / whether any pricing package exists). Previously it called
// getPublishedServices(), which additionally pulls each service's name, long
// descriptions, benefits, meta fields and FULL pricing-package rows for ~270
// services on every (re)generation — all discarded. We keep `content` because
// subPagesFor() inspects it, but drop the rest and reduce pricing to a bare
// existence check, cutting the transfer without losing any sitemap URLs.
export const getServicesForSitemap = unstable_cache(
  async () => {
    try {
      return await getPrismaClient().service.findMany({
        where: { status: { in: ['published', 'active'] } },
        select: {
          slug: true,
          updatedAt: true,
          features: true,
          content: true,
          pricingPackages: { select: { id: true }, take: 1 },
        },
        orderBy: { order: 'asc' },
      });
    } catch (err) {
      dbError('getServicesForSitemap', err);
      return fallbackServices.map((s) => ({
        slug: s.slug,
        updatedAt: s.updatedAt,
        features: s.features,
        content: s.content,
        pricingPackages: (s.pricingPackages ?? []).slice(0, 1).map((p: any) => ({ id: p.id })),
      }));
    }
  },
  ['public:services-sitemap'],
  CACHE_OPTS,
);

export const getPublishedServiceBySlug = unstable_cache(
  async (slug: string, locale?: string) => {
    try {
      const service = await getPrismaClient().service.findFirst({
        where: { slug, status: { in: ['published', 'active'] } },
        include: {
          translations: locale ? { where: { locale } } : false,
          pricingPackages: {
            orderBy: { tier: 'asc' },
          },
        },
      });
      if (!service) return fallbackServiceBySlug(slug);
      return mergeServiceTranslation(service, locale);
    } catch (err) {
      dbError('getPublishedServiceBySlug', err);
      return fallbackServiceBySlug(slug);
    }
  },
  ['public:service-by-slug'],
  CACHE_OPTS,
);

function mergeServiceTranslation(service: any, locale?: string) {
  const translation = service.translations?.[0];
  if (!translation || !locale || locale === 'en') {
    const { translations, ...rest } = service;
    return rest;
  }

  const { translations, ...base } = service;
  return {
    ...base,
    name: translation.name || base.name,
    shortDescription: translation.shortDescription || base.shortDescription,
    fullDescription: translation.fullDescription || base.fullDescription,
    features: translation.features?.length ? translation.features : base.features,
    benefits: translation.benefits?.length ? translation.benefits : base.benefits,
    content: translation.content
      ? {
          ...(base.content as Record<string, unknown> || {}),
          ...(translation.content as Record<string, unknown> || {}),
          animation: (base.content as Record<string, unknown>)?.animation,
        }
      : base.content,
    metaTitle: translation.metaTitle,
    metaDescription: translation.metaDescription,
  };
}

// ==================== SUB-SERVICE QUERIES ====================

export const getSubServices = unstable_cache(
  async (parentSlug: string, locale?: string) => {
    try {
      const services = await getPrismaClient().service.findMany({
        where: { parentSlug, status: { in: ['published', 'active'] } },
        include: {
          translations: locale ? { where: { locale } } : false,
        },
        orderBy: { order: 'asc' },
      });
      if (!services.length) return fallbackSubServices(parentSlug);
      return services.map((service) => mergeServiceTranslation(service, locale));
    } catch (err) {
      dbError('getSubServices', err);
      return fallbackSubServices(parentSlug);
    }
  },
  ['public:sub-services'],
  CACHE_OPTS,
);

export const getParentService = unstable_cache(
  async (slug: string, locale?: string) => {
    try {
      const service = await getPrismaClient().service.findFirst({
        where: { slug, status: { in: ['published', 'active'] } },
        include: {
          translations: locale ? { where: { locale } } : false,
        },
      });
      const src = service ?? fallbackServiceBySlug(slug);
      if (!src) return null;
      const merged = mergeServiceTranslation(src, locale);
      return { name: merged.name, slug: merged.slug, icon: merged.icon, color: merged.color };
    } catch (err) {
      dbError('getParentService', err);
      const s = fallbackServiceBySlug(slug);
      return s ? { name: s.name, slug: s.slug, icon: s.icon, color: s.color } : null;
    }
  },
  ['public:parent-service'],
  CACHE_OPTS,
);

// ==================== PROJECT QUERIES ====================

export const getPublishedProjects = unstable_cache(
  async (locale?: string, category?: string) => {
    const where: Record<string, unknown> = { status: { in: ['published', 'PUBLISHED', 'active'] } };
    if (category) where.category = category;

    try {
      const projects = await getPrismaClient().project.findMany({
        where,
        include: {
          translations: locale ? { where: { locale } } : false,
        },
        orderBy: { createdAt: 'desc' },
      });

      if (!projects.length) return fallbackProjectList(locale, category);
      return projects.map((project) => mergeProjectTranslation(project, locale));
    } catch (err) {
      dbError('getPublishedProjects', err);
      return fallbackProjectList(locale, category);
    }
  },
  ['public:projects-all'],
  { revalidate: 3600, tags: ['projects'] },
);

// Merge a baked fallback project down to a single locale, reusing the same
// translation-merge logic the DB path uses.
function fallbackProjectList(locale?: string, category?: string) {
  let list = fallbackProjects;
  if (category) list = list.filter((p) => p.category === category);
  return list.map((p) => mergeProjectTranslation(fallbackForLocale(p, locale), locale));
}

function fallbackForLocale(p: any, locale?: string) {
  return {
    ...p,
    translations: locale ? (p.translations ?? []).filter((t: any) => t.locale === locale) : [],
  };
}

// Lightweight gallery query for the public /projects page. Selects only the
// fields the project grid actually renders and EXCLUDES the heavy detail-only
// fields (content JSON, fullDescription, challenge, solution, images) on both the
// project row and its 5 translations. The previous path (admin getProjects with
// `include: { translations: true }`) pulled full localized content for every card,
// which was the main data-transfer drain. Cached for 1h like the other public reads.
export const getProjectsForGallery = unstable_cache(
  async (limit = 50) => {
    try {
      const rows = await getPrismaClient().project.findMany({
        where: { status: { in: ['published', 'PUBLISHED', 'active'] } },
        select: {
          id: true,
          name: true,
          slug: true,
          client: true,
          category: true,
          industry: true,
          description: true,
          thumbnail: true,
          technologies: true,
          projectUrl: true,
          results: true,
          translations: {
            select: { locale: true, name: true, description: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
      return rows.length ? rows : fallbackProjects.slice(0, limit);
    } catch (err) {
      dbError('getProjectsForGallery', err);
      return fallbackProjects.slice(0, limit);
    }
  },
  ['public:projects-gallery'],
  { revalidate: 3600, tags: ['projects'] },
);

export const getFeaturedProjects = unstable_cache(
  async (locale?: string) => {
    try {
      const projects = await getPrismaClient().project.findMany({
        where: { status: { in: ['published', 'PUBLISHED', 'active'] }, featured: true },
        include: {
          translations: locale ? { where: { locale } } : false,
        },
        orderBy: { createdAt: 'desc' },
      });

      if (!projects.length) {
        return fallbackProjects.filter((p) => p.featured).map((p) => mergeProjectTranslation(fallbackForLocale(p, locale), locale));
      }
      return projects.map((project) => mergeProjectTranslation(project, locale));
    } catch (err) {
      dbError('getFeaturedProjects', err);
      return fallbackProjects.filter((p) => p.featured).map((p) => mergeProjectTranslation(fallbackForLocale(p, locale), locale));
    }
  },
  ['public:projects-featured'],
  { revalidate: 3600, tags: ['projects'] },
);

export const getPublishedProjectBySlug = unstable_cache(
  async (slug: string, locale?: string) => {
    try {
      const project = await getPrismaClient().project.findFirst({
        where: { slug, status: { in: ['published', 'PUBLISHED', 'active'] } },
        include: {
          translations: locale ? { where: { locale } } : false,
        },
      });

      if (!project) {
        const fb = fallbackProjects.find((p) => p.slug === slug);
        return fb ? mergeProjectTranslation(fallbackForLocale(fb, locale), locale) : null;
      }

      return mergeProjectTranslation(project, locale);
    } catch (err) {
      dbError('getPublishedProjectBySlug', err);
      const fb = fallbackProjects.find((p) => p.slug === slug);
      return fb ? mergeProjectTranslation(fallbackForLocale(fb, locale), locale) : null;
    }
  },
  ['public:project-by-slug'],
  { revalidate: 3600, tags: ['projects'] },
);

function mergeProjectTranslation(project: any, locale?: string) {
  const translation = project.translations?.[0];
  if (!translation || !locale || locale === 'en') {
    const { translations, ...rest } = project;
    return rest;
  }

  const { translations, ...base } = project;
  return {
    ...base,
    name: translation.name || base.name,
    description: translation.description || base.description,
    fullDescription: translation.fullDescription || base.fullDescription,
    challenge: translation.challenge || base.challenge,
    solution: translation.solution || base.solution,
    results: translation.results || base.results,
    content: translation.content || base.content,
  };
}

// ==================== PRICING QUERIES ====================

export const getPublicPricingPackages = unstable_cache(
  async (serviceSlug?: string) => {
    const where: Record<string, unknown> = {};
    if (serviceSlug) {
      where.service = { slug: serviceSlug, status: { in: ['published', 'active'] } };
    } else {
      where.service = { status: { in: ['published', 'active'] } };
    }

    try {
      const packages = await getPrismaClient().pricingPackage.findMany({
        where,
        include: {
          service: {
            select: { id: true, name: true, slug: true, icon: true, color: true },
          },
        },
        orderBy: [{ service: { order: 'asc' } }, { tier: 'asc' }],
      });

      if (!packages.length) return fallbackPricingPackages(serviceSlug);

      // Group by service
      const grouped: Record<string, { service: any; packages: any[] }> = {};
      for (const pkg of packages) {
        const key = pkg.service.slug;
        if (!grouped[key]) {
          grouped[key] = { service: pkg.service, packages: [] };
        }
        const { service, ...pkgData } = pkg;
        grouped[key].packages.push(pkgData);
      }

      return Object.values(grouped);
    } catch (err) {
      dbError('getPublicPricingPackages', err);
      return fallbackPricingPackages(serviceSlug);
    }
  },
  ['public:pricing-packages'],
  { revalidate: 3600, tags: ['pricing', 'services'] },
);

// Rebuild the grouped pricing structure from the baked service snapshot (each
// fallback service carries its pricingPackages inline).
function fallbackPricingPackages(serviceSlug?: string) {
  const services = serviceSlug
    ? fallbackServices.filter((s) => s.slug === serviceSlug)
    : fallbackServices;
  return services
    .filter((s) => Array.isArray(s.pricingPackages) && s.pricingPackages.length)
    .map((s) => ({
      service: { id: s.id, name: s.name, slug: s.slug, icon: s.icon, color: s.color },
      packages: s.pricingPackages,
    }));
}
