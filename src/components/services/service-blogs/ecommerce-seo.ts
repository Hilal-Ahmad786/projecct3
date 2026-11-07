import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/ecommerce-seo/manifest.json';

const servicePath = '/tr/hizmetler/ecommerce-seo';
const enquiryPath = '/tr/start-project?service=ecommerce-seo';

export const ecommerceSeoBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'E-Ticaret SEO', servicePath, blogLabel: 'E-Ticaret SEO Rehberleri', brandLine: 'PakSoft · E-Ticaret SEO',
    allGuidesLabel: 'Tüm e-ticaret SEO rehberleri', overviewLabel: 'E-Ticaret SEO hizmetine genel bakış', jsonLdSection: 'E-Ticaret SEO Rehberleri',
    ctas: {
      early: { heading: 'Mağazanızdaki öncelikli ürün grubunu belirleyin', text: 'Örnek bir kategori veya ürün bağlantısı paylaşın; hangi sayfa ve verilerden başlanacağını birlikte değerlendirelim.', primary: { label: 'Mağazam İçin SEO Planı Al', href: enquiryPath }, secondary: { label: 'E-Ticaret SEO Hizmetini İncele', href: servicePath } },
      middle: { heading: 'Mağaza sayfalarınızı birlikte inceleyelim', text: 'Kategori, ürün ve varyant sayfalarınızda hangi kontrollerin gerekli olduğunu belirleyelim.', primary: { label: 'Öncelikli Sayfamı Paylaş', href: enquiryPath }, secondary: { label: 'Çalışma Çıktılarını İncele', href: `${servicePath}/ozellikler` } },
      closing: { heading: 'Mağazanız için bir SEO çalışma planı oluşturalım', text: 'Mağaza adresinizi ve öncelikli ürün grubunuzu paylaşın. İlk aşamada hangi sayfaların ele alınacağını konuşalım.', primary: { label: 'Mağazam İçin SEO Planı Al', href: enquiryPath }, secondary: { label: 'E-Ticaret SEO Hizmetini İncele', href: servicePath } },
    },
  },
  defaultCategoryLabel: 'E-Ticaret SEO Rehberi',
  articles: manifest,
};

export function getEcommerceSeoGuides() {
  return manifest.map((entry) => ({ ...entry, title: entry.heading }));
}

export function getEcommerceSeoGuide(slug: string) {
  const entry = manifest.find((item) => item.slug === slug);
  if (!entry) return null;
  const raw = readFileSync(join(process.cwd(), 'content/blog/ecommerce-seo', `${entry.slug}.md`), 'utf8')
    .replace(/^# .+\n+/, '')
    .replace(/^\*\*CTA\*\*.*\n?/gm, '')
    .trim();
  const parts = raw.split(/\n(?=## )/);
  const firstSection = parts[0] ?? '';
  const rest = parts.slice(1);
  const content = [firstSection, '[[PAKSOFT_CTA:early]]', ...rest.slice(0, 2), '[[PAKSOFT_CTA:middle]]', ...rest.slice(2), '[[PAKSOFT_CTA:closing]]'].filter(Boolean).join('\n\n');
  return {
    ...entry,
    title: entry.heading,
    metaTitle: entry.title,
    content,
    publishedAt: entry.datePublished as string | null,
    updatedAt: entry.datePublished as string | null,
    language: 'tr',
  };
}
