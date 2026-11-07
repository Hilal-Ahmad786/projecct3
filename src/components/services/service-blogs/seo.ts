import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/seo/manifest.json';

const servicePath = '/tr/hizmetler/seo';
const enquiryPath = '/tr/start-project?service=seo';

export const seoBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'SEO Hizmeti', servicePath, blogLabel: 'SEO Rehberleri', brandLine: 'PakSoft · SEO Hizmeti',
    allGuidesLabel: 'Tüm SEO rehberleri', overviewLabel: 'SEO hizmetine genel bakış', jsonLdSection: 'SEO Rehberleri',
    ctas: {
      early: { heading: 'Siteniz için ilk SEO önceliğini belirleyin', text: 'Öncelikli hizmet sayfanızı veya ürün kategorinizi paylaşın; ilk incelemede hangi verilerin ve sayfaların ele alınacağını değerlendirelim.', primary: { label: 'Sitem İçin SEO Planı Al', href: enquiryPath }, secondary: { label: 'SEO Hizmetini İncele', href: servicePath } },
      middle: { heading: 'Ölçüm sorularınızı netleştirin', text: 'Organik aramadan hangi sayfaların ziyaret aldığını ve hangi işlemlerin izlenebildiğini birlikte değerlendirelim.', primary: { label: 'Ölçüm İhtiyacımı Paylaş', href: enquiryPath }, secondary: { label: 'SEO Araçlarını İncele', href: `${servicePath}/teknoloji` } },
      closing: { heading: 'Siteniz için SEO çalışma planı oluşturalım', text: 'Site adresinizi ve öncelikli sayfalarınızı paylaşın. İnceleme, uygulama ve takip kapsamını birlikte belirleyelim.', primary: { label: 'Sitem İçin SEO Planı Al', href: enquiryPath }, secondary: { label: 'SEO Hizmetini İncele', href: servicePath } },
    },
  },
  defaultCategoryLabel: 'SEO Rehberi',
  articles: manifest,
};

export function getSeoGuides() { return manifest.map((entry) => ({ ...entry, title: entry.heading })); }

export function getSeoGuide(slug: string) {
  const entry = manifest.find((item) => item.slug === slug);
  if (!entry) return null;
  return {
    ...entry,
    title: entry.heading,
    metaTitle: entry.title,
    content: readFileSync(join(process.cwd(), 'content/blog/seo', `${entry.slug}.md`), 'utf8'),
    publishedAt: entry.datePublished as string | null,
    updatedAt: entry.datePublished as string | null,
    language: 'tr',
  };
}
