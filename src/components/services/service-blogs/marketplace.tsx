import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/marketplace/manifest.json';

const servicePath = '/tr/hizmetler/marketplace-development';
const enquiryPath = '/tr/start-project?service=marketplace-development';

export const marketplaceBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'Pazaryeri Geliştirme', servicePath, blogLabel: 'Pazaryeri Rehberleri', brandLine: 'PakSoft · Pazaryeri Geliştirme',
    allGuidesLabel: 'Tüm pazaryeri rehberleri', overviewLabel: 'Pazaryeri yazılımı hizmetine genel bakış', jsonLdSection: 'Pazaryeri Geliştirme Rehberleri',
    ctas: {
      early: { heading: 'Pazaryeri modelinizi değerlendirelim', text: 'Satıcıların, ürünlerin ve siparişlerin nasıl ilerlemesini istediğinizi paylaşın.', primary: { label: 'Pazaryeri Modelimi Değerlendir', href: enquiryPath }, secondary: { label: 'Hizmeti İnceleyin', href: servicePath } },
      middle: { heading: 'İlk sürüm kapsamını planlayalım', text: 'Örnek sipariş akışınızı birlikte değerlendirip gerekli işlevleri belirleyelim.', primary: { label: 'Özellikleri İnceleyin', href: `${servicePath}/ozellikler` } },
      closing: { heading: 'Pazaryeri projenizi konuşalım', text: 'İş modelinizi ve ilk satıcı grubunuzu paylaşın; kapsamı birlikte netleştirelim.', primary: { label: 'Pazaryeri Projenizi Anlatın', href: enquiryPath }, secondary: { label: 'Fiyatlandırmayı İnceleyin', href: `${servicePath}/fiyatlandirma` } },
    },
  },
  defaultCategoryLabel: 'Pazaryeri Rehberi',
  articles: manifest,
};

export function getMarketplaceGuides() { return manifest.map((entry) => ({ ...entry, title: entry.heading })); }

export function getMarketplaceGuide(slug: string) {
  const entry = manifest.find((item) => item.slug === slug);
  if (!entry) return null;
  return {
    ...entry,
    title: entry.heading,
    metaTitle: entry.title,
    content: readFileSync(join(process.cwd(), 'content/blog/marketplace', `${entry.slug}.md`), 'utf8'),
    publishedAt: entry.datePublished as string | null,
    updatedAt: entry.datePublished as string | null,
    language: 'tr',
  };
}
