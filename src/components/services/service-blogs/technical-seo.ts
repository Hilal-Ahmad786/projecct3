import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/technical-seo/manifest.json';

const servicePath = '/tr/hizmetler/technical-seo';
const enquiryPath = '/tr/start-project?service=technical-seo';

export const technicalSeoBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'Teknik SEO', servicePath, blogLabel: 'Teknik SEO Rehberleri', brandLine: 'PakSoft · Teknik SEO',
    allGuidesLabel: 'Tüm Teknik SEO rehberleri', overviewLabel: 'Teknik SEO hizmetine genel bakış', jsonLdSection: 'Teknik SEO Rehberleri',
    ctas: {
      early: { heading: 'Öncelikli sayfanızı birlikte inceleyelim', text: 'Sorun gördüğünüz bir URL’yi ve varsa Search Console durumunu paylaşın; hangi kontrollerin uygun olduğunu değerlendirelim.', primary: { label: 'Teknik SEO Denetimi İçin Teklif Al', href: enquiryPath }, secondary: { label: 'Teknik SEO Kapsamını İncele', href: servicePath } },
      middle: { heading: 'Teknik bulguyu örnek URL ile netleştirin', text: 'Etkilenen adresi ve beklenen davranışı paylaşarak sonraki kontrol adımını belirleyin.', primary: { label: 'Sorunlu URL’yi Paylaş', href: enquiryPath }, secondary: { label: 'Denetim Araçlarını İncele', href: `${servicePath}/teknoloji` } },
      closing: { heading: 'Siteniz için teknik SEO adımlarını belirleyelim', text: 'Site adresinizi ve öncelikli sayfalarınızı paylaşın. Denetim, uygulama ve doğrulama kapsamını birlikte değerlendirelim.', primary: { label: 'Teknik SEO Teklifi Al', href: enquiryPath }, secondary: { label: 'Teknik SEO Hizmetini İncele', href: servicePath } },
    },
  },
  defaultCategoryLabel: 'Teknik SEO Rehberi',
  articles: manifest,
};

export function getTechnicalSeoGuides() {
  return manifest.map((entry) => ({ ...entry, title: entry.heading }));
}

export function getTechnicalSeoGuide(slug: string) {
  const entry = manifest.find((item) => item.slug === slug);
  if (!entry) return null;
  return {
    ...entry,
    title: entry.heading,
    metaTitle: entry.title,
    content: readFileSync(join(process.cwd(), 'content/blog/technical-seo', `${entry.slug}.md`), 'utf8'),
    publishedAt: entry.datePublished as string | null,
    updatedAt: entry.datePublished as string | null,
    language: 'tr',
  };
}
