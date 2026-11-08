import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/google-search-ads/manifest.json';

const servicePath = '/tr/hizmetler/google-search-ads';
const enquiryPath = '/tr/start-project?service=google-search-ads';
const entryFor = (slug: string) => manifest.find((entry) => entry.slug === slug);

export const googleSearchAdsBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'Google Arama Ağı Reklamları', servicePath, blogLabel: 'Arama Ağı Reklam Rehberleri', brandLine: 'PakSoft · Google Arama Ağı',
    allGuidesLabel: 'Tüm Arama Ağı rehberleri', overviewLabel: 'Google Arama Ağı reklamlarına genel bakış', jsonLdSection: 'Arama Ağı Reklam Rehberleri',
    ctas: {
      early: { heading: 'Arama Ağı kampanyanız için doğru başlangıcı belirleyin', text: 'Tanıtacağınız hizmeti, hedef bölgenizi ve varsa mevcut hesabınızı paylaşın.', primary: { label: 'Arama Ağı Teklifi Al', href: enquiryPath }, secondary: { label: 'Arama Ağı Hizmetini İncele', href: servicePath } },
      middle: { heading: 'Kampanya veya ölçüm sorununu birlikte inceleyelim', text: 'Reklamın yönlendiği sayfayı ve takip etmek istediğiniz eylemi paylaşın.', primary: { label: 'Kampanyamı Görüşelim', href: enquiryPath }, secondary: { label: 'Dönüşüm Takibini İncele', href: `${servicePath}/teknoloji` } },
      closing: { heading: 'Google Arama Ağı çalışma kapsamınızı belirleyelim', text: 'Hedefinizi ve mevcut kampanya durumunuzu paylaşın; kurulum, yönetim ve ölçüm ihtiyaçlarını değerlendirelim.', primary: { label: 'Arama Ağı Teklifi Al', href: enquiryPath }, secondary: { label: 'Fiyatlandırmayı İncele', href: `${servicePath}/fiyatlandirma` } },
    },
  },
  defaultCategoryLabel: 'Arama Ağı Reklam Rehberi',
  articles: manifest,
};

export function getGoogleSearchAdsGuides() {
  return manifest.map((entry) => ({ ...entry, title: entry.heading }));
}

export function getGoogleSearchAdsGuide(slug: string) {
  const entry = entryFor(slug);
  if (!entry) return null;
  return {
    ...entry,
    title: entry.heading,
    metaTitle: entry.title,
    tags: entry.tags,
    content: readFileSync(join(process.cwd(), 'content/blog/google-search-ads', `${entry.slug}.md`), 'utf8'),
    publishedAt: entry.datePublished,
    updatedAt: entry.datePublished,
    language: 'tr',
  };
}
