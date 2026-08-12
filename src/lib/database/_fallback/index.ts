// Static content fallback used ONLY when the live database is unreachable
// (Neon quota/outage) or FORCE_BAKED_CONTENT=1. Without this, every uncached
// page that queries the DB throws and renders a 404. These snapshots let the
// whole public site render real content with ZERO database calls.
//
// services.json — 268 published services rebaked from the live DB
//   (scripts/bake-fallback-content.mjs). English on the base fields +
//   per-locale rows (tr/de/ur/ar) in `translations`; the helpers below merge
//   the requested locale the same way public-queries' mergeServiceTranslation
//   does, so a DB outage no longer leaks the wrong language into pages.
// projects.json — 12 real client projects with tr/de/ur/ar translations
//   (extracted from scripts/add-client-projects-2026.mjs).
//
// Re-run `node scripts/bake-fallback-content.mjs` after large content passes
// so the snapshot tracks the DB.
import servicesData from './services.json'
import projectsData from './projects.json'

// The JSON is intentionally loosely typed (mirrors Prisma row shapes at runtime).
const rawServices = servicesData as any[]
export const fallbackProjects = projectsData as any[]

// Same merge semantics as mergeServiceTranslation in public-queries.ts:
// base fields are English; a non-en locale overlays its translation row.
function localizeService(service: any, locale?: string) {
  const { translations, ...base } = service
  if (!locale || locale === 'en') return base
  const t = translations?.find((x: any) => x.locale === locale)
  if (!t) return base
  return {
    ...base,
    name: t.name || base.name,
    shortDescription: t.shortDescription || base.shortDescription,
    fullDescription: t.fullDescription || base.fullDescription,
    features: t.features?.length ? t.features : base.features,
    benefits: t.benefits?.length ? t.benefits : base.benefits,
    content: t.content
      ? {
          ...((base.content as Record<string, unknown>) || {}),
          ...((t.content as Record<string, unknown>) || {}),
          animation: (base.content as Record<string, unknown>)?.animation,
        }
      : base.content,
    metaTitle: t.metaTitle || base.metaTitle,
    metaDescription: t.metaDescription || base.metaDescription,
  }
}

export function fallbackServicesLocalized(locale?: string) {
  return rawServices.map((s) => localizeService(s, locale))
}

export function fallbackServiceBySlug(slug: string, locale?: string) {
  const s = rawServices.find((x) => x.slug === slug)
  return s ? localizeService(s, locale) : null
}

export function fallbackSubServices(parentSlug: string, locale?: string) {
  return rawServices
    .filter((s) => s.parentSlug === parentSlug)
    .map((s) => localizeService(s, locale))
}

// Locale-agnostic view (sitemap, pricing existence checks). English base
// fields, no `translations` key — same shape callers relied on before.
export const fallbackServices = fallbackServicesLocalized()
