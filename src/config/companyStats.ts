// Single source of truth for company stats. EDIT THESE to real, defensible numbers.
// Every prominent stat block/banner should import from here instead of hardcoding
// numbers, so the whole site stays consistent when a figure changes.
export const COMPANY_STATS = {
  projects: '50+',
  clients: '30+',
  years: '5+',
  satisfaction: '98%',
  teamMembers: '10+',
  countries: '10+',
} as const;
