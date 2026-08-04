// Data-driven indexation gate for the ~270-service catalog.
//
// The catalog averages ~96 words of unique copy per service; post-Helpful-
// Content-Update, thousands of near-identical thin URLs drag down the pages
// that CAN rank. Strategy (from the Aug-2026 SEO audit): keep hub/parent pages
// and genuinely substantial services indexed, mark the thin long-tail
// `noindex,follow` (link equity still flows) and drop it from the sitemap.
// A service "graduates" back into the index automatically the moment its
// content is enriched past the threshold — no code change needed.

const MIN_WORDS = 120;

function wordCount(text: unknown): number {
  return typeof text === 'string' && text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function isSubstantialService(svc: {
  isParent?: boolean | null;
  fullDescription?: string | null;
  pricingPackages?: unknown[] | null;
  content?: unknown;
}): boolean {
  if (svc.isParent) return true; // hub pages always index
  if ((svc.pricingPackages?.length ?? 0) > 0) return true; // real offer = money page
  if (wordCount(svc.fullDescription) >= MIN_WORDS) return true;
  // Rich curated content (real testimonials/case study approved by the owner)
  const c = svc.content as Record<string, unknown> | null | undefined;
  if (c && c.trustApproved === true) return true;
  return false;
}

/** Metadata `robots` value for a service page (undefined = default/index). */
export function serviceRobots(svc: Parameters<typeof isSubstantialService>[0]) {
  return isSubstantialService(svc) ? undefined : { index: false, follow: true };
}
