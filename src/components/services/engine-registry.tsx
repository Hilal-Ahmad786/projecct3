import type { ReactNode } from 'react';
import { isEngineSlug } from '@/lib/engine-services';
import { ServiceOverviewScene } from '@/components/services/hero-visuals/scenes-subpages';
import { getGeneratedService } from './generated/GeneratedService';
import { InstagramAdsOverviewBody, InstagramAdsTurkishPage, getInstagramAdsMeta, getInstagramAdsSocialMeta } from './InstagramAdsTurkishPage';
import type { SeoMeta, SeoPageKind } from './seo-pages/SeoServiceEngine';

// One lookup for every Turkish service that runs on the shared engine, so routes do not need a branch per service.
export type EngineHero = { eyebrow: string; lead: string; words: string[]; keywordLine: string; cta: string; enquiry: string; base: string; secondaryHref?: string };
export type EngineSubPage = Exclude<SeoPageKind, 'overview'>;
export type EngineService = {
  slug: string; hero: EngineHero; heroArt: ReactNode;
  OverviewBody: () => ReactNode; Page: (props: { page: EngineSubPage }) => ReactNode;
  getMeta: (page: SeoPageKind) => SeoMeta; getSocialMeta: (page: SeoPageKind, canonical: string) => Record<string, unknown>;
};

const instagramHeroArt = <ServiceOverviewScene label="Temsili Instagram reklam akışı: Reels, hikâye ve katalog reklamı hazırlanıyor, mesaj ve sipariş ölçülüyor ve sonuç raporuna yansıyor." title="Instagram reklamı" chips={['Reels videosu', 'Hikâye reklamı', 'Mesaj ve sipariş']} report="Sonuç raporu" bars={['Reels', 'Hikâye', 'Akış']} badge="Ölçüm test edilmeden yayın yok" steps={['Hedef', 'İçerik', 'Yayın', 'Rapor']} />;

export function getEngine(slug: string, locale: string): EngineService | null {
  if (locale !== 'tr' || !isEngineSlug(slug)) return null;
  if (slug === 'instagram-ads') {
    return {
      slug, heroArt: instagramHeroArt,
      hero: { eyebrow: 'Instagram Reklam Yönetimi', lead: 'Instagram Reklam', words: ['Yönetimi', 'Ajansı', 'Danışmanlığı'], keywordLine: 'Hedefe uygun kreatif planı · Mobil akış kontrolü · Sonuca göre değerlendirme', cta: 'Instagram Reklam Teklifi Al', enquiry: '/start-project?service=instagram-ads', base: '/tr/hizmetler/instagram-ads' },
      OverviewBody: InstagramAdsOverviewBody, Page: InstagramAdsTurkishPage, getMeta: getInstagramAdsMeta, getSocialMeta: getInstagramAdsSocialMeta,
    };
  }
  const g = getGeneratedService(slug);
  return { slug, hero: g.hero, heroArt: g.heroArt, OverviewBody: g.service.OverviewBody, Page: g.service.Page as EngineService['Page'], getMeta: g.service.getMeta, getSocialMeta: g.service.getSocialMeta };
}
