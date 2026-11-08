import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/google-ads/manifest.json';

const servicePath = '/tr/hizmetler/google-ads';
const enquiryPath = '/tr/start-project?service=google-ads';
const entryFor = (slug: string) => manifest.find((entry) => entry.slug === slug);

export const googleAdsBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'Google Ads Yönetimi', servicePath, blogLabel: 'Google Ads Rehberleri', brandLine: 'PakSoft · Google Ads Yönetimi',
    allGuidesLabel: 'Tüm Google Ads rehberleri', overviewLabel: 'Google Ads yönetimine genel bakış', jsonLdSection: 'Google Ads Rehberleri',
    ctas: {
      early: { heading: 'Kampanyanız için doğru başlangıcı belirleyin', text: 'Öncelikli hizmetinizi, hedef bölgenizi ve varsa mevcut hesabınızı paylaşın.', primary: { label: 'Google Ads Teklifi Al', href: enquiryPath }, secondary: { label: 'Google Ads Yönetimini İncele', href: servicePath } },
      middle: { heading: 'Ölçüm veya kampanya sorununu birlikte inceleyelim', text: 'Reklamın yönlendiği sayfayı ve ölçmek istediğiniz eylemi paylaşın.', primary: { label: 'Kampanyamı Görüşmek İstiyorum', href: enquiryPath }, secondary: { label: 'Dönüşüm Takibini İncele', href: `${servicePath}/teknoloji` } },
      closing: { heading: 'Google Ads çalışma kapsamınızı belirleyelim', text: 'Hedefinizi ve mevcut kampanya durumunuzu paylaşın; yönetim, ölçüm ve ek işleri ayrı değerlendirelim.', primary: { label: 'Google Ads Teklifi Al', href: enquiryPath }, secondary: { label: 'Fiyatlandırmayı İncele', href: `${servicePath}/fiyatlandirma` } },
    },
  },
  defaultCategoryLabel: 'Google Ads Rehberi',
  articles: manifest,
};

export function getGoogleAdsGuides() {
  return manifest.map((entry) => ({ ...entry, title: entry.heading }));
}

export function getGoogleAdsGuide(slug: string) {
  const entry = entryFor(slug);
  if (!entry) return null;
  return {
    ...entry,
    title: entry.heading,
    metaTitle: entry.title,
    tags: entry.tags,
    content: readFileSync(join(process.cwd(), 'content/blog/google-ads', `${entry.slug}.md`), 'utf8'),
    publishedAt: null as string | null,
    updatedAt: null as string | null,
    language: 'tr',
  };
}
