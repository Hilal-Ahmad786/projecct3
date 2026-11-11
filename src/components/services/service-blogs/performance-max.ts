import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/performance-max/manifest.json';

const servicePath = '/tr/hizmetler/performance-max';
const enquiryPath = '/tr/start-project?service=performance-max';

export const performanceMaxBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'Performance Max', servicePath, blogLabel: 'Performance Max Rehberleri', brandLine: 'PakSoft · Performance Max',
    allGuidesLabel: 'Tüm Performance Max rehberleri', overviewLabel: 'Performance Max kampanya yönetimine genel bakış', jsonLdSection: 'Performance Max Kampanya Rehberleri',
    ctas: {
      early: { heading: 'Kampanya hedefiniz için doğru başlangıcı belirleyin', text: 'Öncelikli ürün veya hizmetinizi ve mevcut hesabınızdaki sorunu paylaşın.', primary: { label: 'Performance Max Teklifi Al', href: enquiryPath }, secondary: { label: 'Performance Max Hizmetini İncele', href: servicePath } },
      middle: { heading: 'Ölçüm ve kampanya kapsamını birlikte değerlendirelim', text: 'Site adresinizi ve test etmek istediğiniz satın alma veya başvuru akışını paylaşın.', primary: { label: 'Kampanyamı Görüşelim', href: enquiryPath }, secondary: { label: 'Dönüşüm Takibini İncele', href: `${servicePath}/teknoloji` } },
      closing: { heading: 'Performance Max çalışmanız için ilk adımı belirleyelim', text: 'Hedefinizi, ölçüm yapınızı ve mevcut kampanya durumunuzu paylaşın.', primary: { label: 'Performance Max Teklifi Al', href: enquiryPath }, secondary: { label: 'Fiyatlandırmayı İncele', href: `${servicePath}/fiyatlandirma` } },
    },
  },
  defaultCategoryLabel: 'Performance Max Rehberi',
  articles: manifest,
};

export function getPerformanceMaxGuides() {
  return manifest.map((entry) => ({ ...entry, title: entry.heading }));
}

export function getPerformanceMaxGuide(slug: string) {
  const entry = manifest.find((item) => item.slug === slug);
  if (!entry) return null;
  return {
    ...entry,
    title: entry.heading,
    metaTitle: entry.title,
    tags: entry.tags,
    content: readFileSync(join(process.cwd(), 'content/blog/performance-max', `${entry.slug}.md`), 'utf8'),
    publishedAt: undefined,
    updatedAt: undefined,
    language: 'tr',
  };
}
