// Static content fallback (baked 2026-07-03) used ONLY when the live database is
// unreachable — currently because Neon is over its monthly data-transfer quota
// (resets ~2026-07-30). Without this, every uncached page that queries the DB
// throws and renders a 404. These snapshots let the whole public site render
// real content with ZERO database calls until the quota resets / we migrate.
//
// services.json — 268 published services with full `content` (extracted from the
//   July-2 unstable_cache snapshot in .next/cache). English base content; non-EN
//   locales gracefully show English while the DB is down.
// projects.json — 12 real client projects with tr/de/ur/ar translations (extracted
//   from scripts/add-client-projects-2026.mjs).
//
// SAFE TO DELETE once the DB is healthy again — nothing depends on it when queries
// succeed; it is only returned inside catch blocks.
import servicesData from './services.json'
import projectsData from './projects.json'

// The JSON is intentionally loosely typed (mirrors Prisma row shapes at runtime).
export const fallbackServices = servicesData as any[]
export const fallbackProjects = projectsData as any[]

export function fallbackServiceBySlug(slug: string) {
  return fallbackServices.find((s) => s.slug === slug) ?? null
}

export function fallbackSubServices(parentSlug: string) {
  return fallbackServices.filter((s) => s.parentSlug === parentSlug)
}
