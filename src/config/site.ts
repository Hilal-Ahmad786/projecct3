export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.paksofts.com';
export const SITE_NAME = 'PakSoft';

/**
 * Social profiles that ACTUALLY EXIST and are owned by PakSoft.
 *
 * Single source of truth: consumed by `sameAs` on the Organization schema
 * (components/seo/JsonLd.tsx) and by the footer icon row (components/Footer.tsx).
 *
 * Only list a profile once the account is live and has real content. `sameAs`
 * is an entity-resolution signal — pointing it at handles that 404, or that
 * belong to somebody else, is worse than listing nothing. The footer previously
 * linked six profiles and the schema claimed five; one existed.
 *
 * To add one later: uncomment / add the line. Schema and footer both pick it up.
 */
export const SOCIAL_PROFILES: Partial<Record<SocialKey, string>> = {
  instagram: 'https://www.instagram.com/paksoft3',
  // linkedin: 'https://www.linkedin.com/company/<slug>',
  // youtube:  'https://www.youtube.com/@<handle>',
  // facebook: 'https://www.facebook.com/<page>',
  // x:        'https://x.com/<handle>',
  // github:   'https://github.com/<org>',
};

export type SocialKey = 'instagram' | 'linkedin' | 'youtube' | 'facebook' | 'x' | 'github';

/** Flat list for schema.org `sameAs`. Empty entries are never emitted. */
export const SOCIAL_PROFILE_URLS: string[] =
  Object.values(SOCIAL_PROFILES).filter((u): u is string => Boolean(u));
