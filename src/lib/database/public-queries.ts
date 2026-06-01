import { getPrisma } from '@/lib/db/prisma';

const getPrismaClient = () => getPrisma();

// ==================== SERVICE QUERIES ====================

export async function getPublishedServices(locale?: string) {
  const services = await getPrismaClient().service.findMany({
    where: { status: { in: ['published', 'active'] } },
    include: {
      translations: locale ? { where: { locale } } : false,
      pricingPackages: true,
    },
    orderBy: { order: 'asc' },
  });

  return services.map((service) => mergeServiceTranslation(service, locale));
}

export async function getFeaturedServices(locale?: string) {
  const services = await getPrismaClient().service.findMany({
    where: { status: { in: ['published', 'active'] }, featured: true },
    include: {
      translations: locale ? { where: { locale } } : false,
      pricingPackages: true,
    },
    orderBy: { order: 'asc' },
  });

  return services.map((service) => mergeServiceTranslation(service, locale));
}

export async function getPublishedServiceBySlug(slug: string, locale?: string) {
  const service = await getPrismaClient().service.findFirst({
    where: { slug, status: { in: ['published', 'active'] } },
    include: {
      translations: locale ? { where: { locale } } : false,
      pricingPackages: {
        orderBy: { tier: 'asc' },
      },
    },
  });

  if (!service) return null;

  return mergeServiceTranslation(service, locale);
}

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

export async function getSubServices(parentSlug: string, locale?: string) {
  const services = await getPrismaClient().service.findMany({
    where: { parentSlug, status: { in: ['published', 'active'] } },
    include: {
      translations: locale ? { where: { locale } } : false,
    },
    orderBy: { order: 'asc' },
  });

  return services.map((service) => mergeServiceTranslation(service, locale));
}

export async function getParentService(slug: string, locale?: string) {
  const service = await getPrismaClient().service.findFirst({
    where: { slug, status: { in: ['published', 'active'] } },
    include: {
      translations: locale ? { where: { locale } } : false,
    },
  });
  if (!service) return null;
  const merged = mergeServiceTranslation(service, locale);
  return { name: merged.name, slug: merged.slug, icon: merged.icon, color: merged.color };
}

// ==================== PROJECT QUERIES ====================

export async function getPublishedProjects(locale?: string, category?: string) {
  const where: Record<string, unknown> = { status: { in: ['published', 'PUBLISHED', 'active'] } };
  if (category) where.category = category;

  const projects = await getPrismaClient().project.findMany({
    where,
    include: {
      translations: locale ? { where: { locale } } : false,
    },
    orderBy: { createdAt: 'desc' },
  });

  return projects.map((project) => mergeProjectTranslation(project, locale));
}

export async function getFeaturedProjects(locale?: string) {
  const projects = await getPrismaClient().project.findMany({
    where: { status: { in: ['published', 'PUBLISHED', 'active'] }, featured: true },
    include: {
      translations: locale ? { where: { locale } } : false,
    },
    orderBy: { createdAt: 'desc' },
  });

  return projects.map((project) => mergeProjectTranslation(project, locale));
}

export async function getPublishedProjectBySlug(slug: string, locale?: string) {
  const project = await getPrismaClient().project.findFirst({
    where: { slug, status: { in: ['published', 'PUBLISHED', 'active'] } },
    include: {
      translations: locale ? { where: { locale } } : false,
    },
  });

  if (!project) return null;

  return mergeProjectTranslation(project, locale);
}

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

export async function getPublicPricingPackages(serviceSlug?: string) {
  const where: Record<string, unknown> = {};
  if (serviceSlug) {
    where.service = { slug: serviceSlug, status: { in: ['published', 'active'] } };
  } else {
    where.service = { status: { in: ['published', 'active'] } };
  }

  const packages = await getPrismaClient().pricingPackage.findMany({
    where,
    include: {
      service: {
        select: { id: true, name: true, slug: true, icon: true, color: true },
      },
    },
    orderBy: [{ service: { order: 'asc' } }, { tier: 'asc' }],
  });

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
}
