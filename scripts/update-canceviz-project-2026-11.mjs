/**
 * Enrich the existing `canceviz-hurma` portfolio project (approved 2026-11-03):
 * ikas Studio build + the Canceviz AI Agent ikas app, new screenshots, and the
 * same additions in tr/de/ur/ar. Additive only: other fields are untouched.
 * Writes a JSON backup of the row first. Idempotent (skips if already applied).
 *
 * Usage: node scripts/update-canceviz-project-2026-11.mjs <backup-file.json> [--dry-run]
 */
import { writeFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local', quiet: true });
dotenv.config({ path: '.env', quiet: true });

const [backupPath, flag] = process.argv.slice(2);
if (!backupPath) throw new Error('Pass a backup file path');
const dryRun = flag === '--dry-run';
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL }) });

const MARK = 'Canceviz AI Agent';
const img = '/images/portfolio/canceviz';
const newImages = [
  `${img}/canceviz-hurma-ana-sayfa.webp`, `${img}/canceviz-hurma-urunler.webp`, `${img}/canceviz-hurma-mobil.webp`,
  `${img}/canceviz-ai-agent-dashboard.webp`, `${img}/canceviz-ai-agent-magaza-asistani.webp`, `${img}/canceviz-ai-agent-mesajlar.webp`, `${img}/canceviz-ai-agent-web-chat.webp`,
];

const add = {
  en: {
    description: 'An ikas Studio e-commerce store for dates (hurma), chocolate-covered dates and dried fruit — with Ads, SEO and a custom AI agent ikas app.',
    full: 'PakSoft built the storefront with ikas Studio — theme, custom sections, category showcases and campaign areas. We also developed the Canceviz AI Agent, an AI customer-support and store-assistant app that connects to the store as an ikas app: it answers product, stock and order questions across web chat and messaging channels, and lets the team ask about orders and sales in plain language.',
    solution: 'Plus a custom ikas app: an AI agent for round-the-clock customer answers and a store assistant for the team.',
  },
  tr: {
    description: 'Hurma, çikolatalı hurma ve kuruyemiş için ikas Studio ile geliştirilen e-ticaret mağazası — reklam, SEO ve özel yapay zekâ asistanı ikas uygulamasıyla.',
    full: "Mağazayı ikas Studio ile geliştirdik; tema, özel bölümler, kategori vitrinleri ve kampanya alanları bu çalışmanın parçasıdır. Ayrıca mağazaya ikas uygulaması olarak bağlanan Canceviz AI Agent'ı geliştirdik: web chat ve mesaj kanallarında ürün, stok ve sipariş sorularını yanıtlar; mağaza ekibinin sipariş ve satış verilerini doğal dille sormasını sağlar.",
    solution: 'Buna ek olarak, müşterilere 7/24 yanıt veren ve ekibe mağaza asistanı sunan özel bir ikas uygulaması (yapay zekâ asistanı).',
  },
  de: {
    description: 'Ein mit ikas Studio entwickelter E-Commerce-Shop für Datteln, schokoladenüberzogene Datteln und Trockenfrüchte — mit Ads, SEO und einer eigenen KI-Agent-App für ikas.',
    full: 'PakSoft hat den Shop mit ikas Studio umgesetzt — Theme, individuelle Sektionen, Kategorie-Schaufenster und Kampagnenbereiche. Zusätzlich haben wir den Canceviz AI Agent entwickelt, eine KI-App für Kundensupport und Shop-Assistenz, die als ikas-App mit dem Shop verbunden ist: Sie beantwortet Fragen zu Produkten, Lagerbestand und Bestellungen per Web-Chat und Messaging-Kanälen und lässt das Team Bestell- und Umsatzdaten in natürlicher Sprache abfragen.',
    solution: 'Dazu eine individuelle ikas-App: ein KI-Agent für Kundenantworten rund um die Uhr und ein Shop-Assistent für das Team.',
  },
  ur: {
    description: 'کھجور، چاکلیٹ لپٹی کھجور اور خشک میوہ جات کے لیے ikas Studio سے بنایا گیا ای کامرس اسٹور — ایڈز، SEO اور حسبِ ضرورت AI ایجنٹ ikas ایپ کے ساتھ۔',
    full: 'PakSoft نے یہ اسٹور ikas Studio کے ساتھ بنایا — تھیم، حسبِ ضرورت سیکشنز، کیٹیگری شوکیس اور مہم کے حصے۔ ہم نے Canceviz AI Agent بھی تیار کیا، جو ikas ایپ کے طور پر اسٹور سے جڑتا ہے: یہ ویب چیٹ اور میسجنگ چینلز پر مصنوعات، اسٹاک اور آرڈر کے سوالات کا جواب دیتا ہے، اور ٹیم کو آرڈرز اور فروخت کے بارے میں سادہ زبان میں سوال پوچھنے دیتا ہے۔',
    solution: 'اس کے علاوہ ایک حسبِ ضرورت ikas ایپ: گاہکوں کو چوبیس گھنٹے جواب دینے والا AI ایجنٹ اور ٹیم کے لیے اسٹور اسسٹنٹ۔',
  },
  ar: {
    description: 'متجر إلكتروني مبني بـ ikas Studio للتمور والتمور المغطاة بالشوكولاتة والفواكه المجففة — مع إعلانات وSEO وتطبيق ikas مخصص لوكيل ذكاء اصطناعي.',
    full: 'طوّرت PakSoft المتجر باستخدام ikas Studio — القالب والأقسام المخصصة وواجهات الفئات ومساحات الحملات. كما طوّرنا Canceviz AI Agent، وهو تطبيق ذكاء اصطناعي لدعم العملاء ومساعدة المتجر يرتبط بالمتجر كتطبيق ikas: يجيب عن أسئلة المنتجات والمخزون والطلبات عبر الدردشة على الموقع وقنوات المراسلة، ويتيح للفريق الاستفسار عن الطلبات والمبيعات بلغة طبيعية.',
    solution: 'إضافة إلى تطبيق ikas مخصص: وكيل ذكاء اصطناعي يجيب العملاء على مدار الساعة ومساعد متجر للفريق.',
  },
};

const studioName = (name) => name.replace('(ikas)', '(ikas Studio)');
const append = (text, extra) => (text ? `${text.trim()} ${extra}` : extra);

const p = await prisma.project.findUnique({ where: { slug: 'canceviz-hurma' }, include: { translations: true } });
if (!p) throw new Error('canceviz-hurma not found');
writeFileSync(backupPath, JSON.stringify(p, null, 1));
console.log('backup written:', backupPath);
if (p.fullDescription?.includes(MARK)) { console.log('already applied — nothing to do'); await prisma.$disconnect(); process.exit(0); }

const base = {
  name: studioName(p.name),
  description: add.en.description,
  fullDescription: append(p.fullDescription, add.en.full),
  solution: append(p.solution, add.en.solution),
  images: [...p.images, ...newImages.filter((i) => !p.images.includes(i))],
  technologies: [...p.technologies, ...['ikas Studio', 'ikas Admin API'].filter((t) => !p.technologies.includes(t))],
};
const trans = p.translations.filter((t) => add[t.locale]).map((t) => ({
  id: t.id, locale: t.locale,
  data: { name: studioName(t.name), description: add[t.locale].description, fullDescription: append(t.fullDescription, add[t.locale].full), solution: append(t.solution, add[t.locale].solution) },
}));
console.log('base name:', base.name, '| images:', base.images.length, '| tech:', base.technologies.join(', '));
console.log('translations:', trans.map((t) => `${t.locale}: ${t.data.name}`).join(' | '));
if (dryRun) { console.log('dry run — no writes'); await prisma.$disconnect(); process.exit(0); }

await prisma.$transaction([
  prisma.project.update({ where: { id: p.id }, data: base }),
  ...trans.map((t) => prisma.projectTranslation.update({ where: { id: t.id }, data: t.data })),
]);
console.log('updated base +', trans.length, 'translations');
await prisma.$disconnect();
