import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ServiceBlogDefinition } from './types';
import manifest from '../../../../content/blog/custom-ecommerce/manifest.json';

const servicePath = '/tr/hizmetler/custom-ecommerce';
const enquiryPath = '/tr/start-project?service=custom-ecommerce';

export const customEcommerceBlog: ServiceBlogDefinition = {
  config: {
    serviceName: 'Özel E-Ticaret', servicePath, blogLabel: 'Özel E-Ticaret Rehberleri', brandLine: 'PakSoft · Özel E-Ticaret',
    allGuidesLabel: 'Tüm özel e-ticaret rehberleri', overviewLabel: 'Özel e-ticaret hizmetine genel bakış', jsonLdSection: 'Özel E-Ticaret Geliştirme',
    ctas: {
      early: { heading: 'Özel e-ticaret projenizi mi planlıyorsunuz?', text: 'Örnek ürününüzü, iş kuralınızı ve sipariş akışınızı paylaşarak kapsamı birlikte netleştirelim.', primary: { label: 'İhtiyacımı Paylaş', href: enquiryPath }, secondary: { label: 'Hizmeti İnceleyin', href: servicePath } },
      middle: { heading: 'Teknik yaklaşımı projeniz üzerinden değerlendirin', text: 'Mevcut sistemlerinizi ve değiştirmek istediğiniz iş akışını paylaşın.', primary: { label: 'Teknik Seçenekleri İnceleyin', href: `${servicePath}/teknoloji` } },
      closing: { heading: 'Mağazanız için uygun kapsamı belirleyin', text: 'İlk sürümde gerekli ekranları, iş kurallarını ve bağlantıları birlikte planlayalım.', primary: { label: 'Projenizi Görüşelim', href: enquiryPath }, secondary: { label: 'Fiyatlandırmayı İnceleyin', href: `${servicePath}/fiyatlandirma` } },
    },
  },
  defaultCategoryLabel: 'Özel E-Ticaret Rehberi',
  articles: manifest,
};

export function getCustomEcommerceGuides() { return manifest; }

export function getCustomEcommerceGuide(slug: string) {
  const entry = manifest.find((item) => item.slug === slug);
  if (!entry) return null;
  return {
    ...entry,
    metaTitle: entry.title,
    tags: ['özel e-ticaret', 'e-ticaret yazılımı', 'proje kapsamı'],
    content: readFileSync(join(process.cwd(), 'content/blog/custom-ecommerce', `${entry.slug}.md`), 'utf8'),
    publishedAt: null as string | null,
    updatedAt: null as string | null,
    language: 'tr',
  };
}

