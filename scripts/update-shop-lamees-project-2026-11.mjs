/**
 * Refresh the existing `shop-lamees` portfolio row (created 2026-02 with the
 * staging URL) to the live store, 2026-11-04:
 * - projectUrl → https://www.shoplamees.com/ (footer credits PakSoft)
 * - thumbnail/images → live-site screenshots in public/images/portfolio/shop-lamees*
 * - results → factual items only (the old "98/100" and "<2% return rate"
 *   figures could not be verified)
 * - copy (en base + tr/de/ur/ar) describes what the live site visibly does.
 * Updates by slug; never creates or deletes rows. Prints the previous values
 * first so the change can be reverted by hand.
 * Run: node scripts/update-shop-lamees-project-2026-11.mjs
 */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local', quiet: true });
dotenv.config({ path: '.env', quiet: true });
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL }) });

const img = '/images/portfolio/shop-lamees';
const base = {
  projectUrl: 'https://www.shoplamees.com/',
  thumbnail: '/images/portfolio/shop-lamees.webp',
  images: ['/images/portfolio/shop-lamees.webp', `${img}/shop-lamees-ana-sayfa.webp`, `${img}/shop-lamees-urun-sayfasi.webp`, `${img}/shop-lamees-kategori-filtreler.webp`, `${img}/shop-lamees-mobil.webp`],
  results: [{ metric: 'Languages', value: 'AR + EN' }, { metric: 'Currency', value: 'QAR' }, { metric: 'Catalog', value: '30+ products' }, { metric: 'Status', value: 'Live' }],
};

const copy = {
  en: {
    name: 'Shop Lamees - Arabic & English Abaya E-Commerce Store',
    description: 'A custom Next.js e-commerce store for an abaya brand selling across the Gulf — Arabic (RTL) and English, QAR pricing and made-to-measure orders via WhatsApp.',
    fullDescription: 'PakSoft designed and developed Shop Lamees as a custom Next.js store rather than a ready-made platform theme. The storefront runs right-to-left in Arabic with an English switch and QAR currency selection. The catalog is filtered by price, colour, fabric and size, with collection and campaign pages such as Eid and winter. Product pages offer size selection in centimetres, a required cut-type option, stock status and image zoom, and a step-by-step WhatsApp flow handles made-to-measure requests. On mobile, a bottom navigation bar keeps home, categories, cart and account one tap away.',
    challenge: 'Present a premium abaya collection to Gulf shoppers in their own language and reading direction, while supporting product options and made-to-measure requests that standard store themes handle poorly.',
    solution: 'A custom Next.js storefront with RTL Arabic and English, filterable collections, centimetre sizing and cut-type options on product pages, and a WhatsApp-based made-to-measure order flow.',
  },
  tr: {
    name: 'Shop Lamees - Arapça ve İngilizce Abaya E-Ticaret Sitesi',
    description: 'Körfez ülkelerine satış yapan abaya markası için Next.js ile geliştirilen özel e-ticaret sitesi — Arapça (sağdan sola) ve İngilizce arayüz, QAR fiyatlandırma ve WhatsApp üzerinden ölçüye özel sipariş.',
    fullDescription: 'PakSoft, Shop Lamees mağazasını hazır bir platform teması yerine Next.js ile özel olarak tasarlayıp geliştirdi. Mağaza Arapça sağdan sola çalışır; İngilizce dil seçeneği ve QAR para birimi seçimi sunar. Katalog fiyat, renk, kumaş ve bedene göre filtrelenir; bayram ve kış gibi koleksiyon ve kampanya sayfaları bulunur. Ürün sayfalarında santim cinsinden beden seçimi, zorunlu kesim tipi seçeneği, stok durumu ve görsel yakınlaştırma yer alır; ölçüye özel dikim talepleri WhatsApp üzerinden adım adım alınır. Mobilde alt gezinme çubuğu ana sayfa, kategoriler, sepet ve hesaba tek dokunuşla erişim sağlar.',
    challenge: 'Premium abaya koleksiyonunu Körfez’deki müşterilere kendi dillerinde ve okuma yönünde sunmak; standart temaların zorlandığı ürün seçeneklerini ve ölçüye özel talepleri desteklemek.',
    solution: 'Arapça (RTL) ve İngilizce, filtrelenebilir koleksiyonlar, ürün sayfasında santim beden ve kesim tipi seçenekleri ve WhatsApp tabanlı ölçüye özel sipariş akışı içeren özel Next.js mağazası.',
    results: [{ metric: 'Diller', value: 'AR + EN' }, { metric: 'Para birimi', value: 'QAR' }, { metric: 'Katalog', value: '30+ ürün' }, { metric: 'Durum', value: 'Yayında' }],
  },
  de: {
    name: 'Shop Lamees – Arabisch-englischer Abaya-Onlineshop',
    description: 'Ein individueller Next.js-Onlineshop für eine Abaya-Marke mit Kundinnen in den Golfstaaten — Arabisch (RTL) und Englisch, Preise in QAR und Maßanfertigung per WhatsApp.',
    fullDescription: 'PakSoft hat Shop Lamees nicht als fertiges Plattform-Theme, sondern als individuellen Next.js-Shop gestaltet und entwickelt. Der Shop läuft auf Arabisch von rechts nach links, mit englischer Sprachumschaltung und Währungsauswahl in QAR. Der Katalog lässt sich nach Preis, Farbe, Stoff und Größe filtern; dazu kommen Kollektions- und Kampagnenseiten wie Eid und Winter. Produktseiten bieten Größenwahl in Zentimetern, eine Pflichtauswahl für den Schnitt, Lagerstatus und Bildzoom; Anfragen für Maßanfertigungen laufen Schritt für Schritt über WhatsApp. Mobil hält eine untere Navigationsleiste Startseite, Kategorien, Warenkorb und Konto mit einem Tipp erreichbar.',
    challenge: 'Eine Premium-Abaya-Kollektion Kundinnen am Golf in ihrer Sprache und Leserichtung präsentieren und dabei Produktoptionen und Maßanfertigungen unterstützen, die Standard-Themes kaum abbilden.',
    solution: 'Ein individueller Next.js-Shop mit Arabisch (RTL) und Englisch, filterbaren Kollektionen, Zentimetergrößen und Schnittoptionen auf Produktseiten sowie einem WhatsApp-basierten Ablauf für Maßanfertigungen.',
    results: [{ metric: 'Sprachen', value: 'AR + EN' }, { metric: 'Währung', value: 'QAR' }, { metric: 'Katalog', value: '30+ Produkte' }, { metric: 'Status', value: 'Live' }],
  },
  ur: {
    name: 'شاپ لمیس – عربی اور انگریزی عبایا ای کامرس اسٹور',
    description: 'خلیجی ممالک میں فروخت کرنے والے عبایا برانڈ کے لیے Next.js سے تیار کردہ کسٹم ای کامرس اسٹور — عربی (دائیں سے بائیں) اور انگریزی، QAR قیمتیں اور واٹس ایپ کے ذریعے ناپ کے مطابق آرڈر۔',
    fullDescription: 'PakSoft نے شاپ لمیس کو کسی ریڈی میڈ پلیٹ فارم تھیم کے بجائے Next.js پر کسٹم اسٹور کے طور پر ڈیزائن اور تیار کیا۔ اسٹور عربی میں دائیں سے بائیں چلتا ہے اور انگریزی زبان اور QAR کرنسی کا انتخاب دیتا ہے۔ کیٹلاگ کو قیمت، رنگ، کپڑے اور سائز کے لحاظ سے فلٹر کیا جا سکتا ہے، اور عید اور سرما جیسے کلیکشن اور مہم کے صفحات موجود ہیں۔ پروڈکٹ صفحات پر سینٹی میٹر میں سائز کا انتخاب، کٹ کی قسم کا لازمی انتخاب، اسٹاک کی صورتحال اور تصویر زوم شامل ہیں، جبکہ ناپ کے مطابق سلائی کی درخواستیں واٹس ایپ پر مرحلہ وار لی جاتی ہیں۔ موبائل پر نیچے کی نیویگیشن بار ہوم، کیٹیگریز، کارٹ اور اکاؤنٹ کو ایک ٹیپ کی دوری پر رکھتی ہے۔',
    challenge: 'خلیجی خریداروں کے سامنے پریمیم عبایا کلیکشن ان کی اپنی زبان اور پڑھنے کی سمت میں پیش کرنا، اور ایسے پروڈکٹ آپشنز اور ناپ کے مطابق آرڈرز کو سپورٹ کرنا جنہیں عام تھیمز مشکل سے سنبھالتے ہیں۔',
    solution: 'عربی (RTL) اور انگریزی، فلٹر ہونے والے کلیکشنز، پروڈکٹ صفحات پر سینٹی میٹر سائز اور کٹ کے آپشنز، اور واٹس ایپ پر مبنی ناپ کے مطابق آرڈر کا عمل رکھنے والا کسٹم Next.js اسٹور۔',
    results: [{ metric: 'زبانیں', value: 'AR + EN' }, { metric: 'کرنسی', value: 'QAR' }, { metric: 'کیٹلاگ', value: '30+ مصنوعات' }, { metric: 'حیثیت', value: 'لائیو' }],
  },
  ar: {
    name: 'شوب لاميس – متجر عبايات إلكتروني بالعربية والإنجليزية',
    description: 'متجر إلكتروني مخصص مبني بـ Next.js لعلامة عبايات تبيع في دول الخليج — بالعربية (من اليمين إلى اليسار) والإنجليزية، مع أسعار بالريال القطري وطلبات تفصيل حسب المقاس عبر واتساب.',
    fullDescription: 'صمّمت PakSoft وطوّرت متجر شوب لاميس كمتجر مخصص مبني بـ Next.js بدلاً من قالب جاهز على منصة. يعمل المتجر بالعربية من اليمين إلى اليسار مع خيار اللغة الإنجليزية واختيار العملة بالريال القطري. يمكن تصفية الكتالوج حسب السعر واللون والخامة والمقاس، مع صفحات للمجموعات والحملات مثل كولكشن العيد وتشكيلة الشتاء. تتضمن صفحات المنتجات اختيار المقاس بالسنتيمتر وخياراً إلزامياً لنوع القصة وحالة المخزون وتكبير الصور، بينما تُستقبل طلبات التفصيل حسب المقاس خطوة بخطوة عبر واتساب. وعلى الجوال، يتيح شريط التنقل السفلي الوصول إلى الرئيسية والأقسام والسلة والحساب بلمسة واحدة.',
    challenge: 'تقديم مجموعة عبايات فاخرة لعميلات الخليج بلغتهن واتجاه القراءة لديهن، مع دعم خيارات المنتجات وطلبات التفصيل حسب المقاس التي لا تتعامل معها القوالب الجاهزة بسهولة.',
    solution: 'متجر Next.js مخصص بالعربية (RTL) والإنجليزية، مع مجموعات قابلة للتصفية، ومقاسات بالسنتيمتر وخيارات نوع القصة في صفحات المنتجات، ومسار طلب تفصيل حسب المقاس عبر واتساب.',
    results: [{ metric: 'اللغات', value: 'AR + EN' }, { metric: 'العملة', value: 'QAR' }, { metric: 'الكتالوج', value: '+30 منتجاً' }, { metric: 'الحالة', value: 'مباشر' }],
  },
};

const p = await prisma.project.findUnique({ where: { slug: 'shop-lamees' }, include: { translations: true } });
if (!p) throw new Error('shop-lamees not found');
console.log('previous:', JSON.stringify({ name: p.name, projectUrl: p.projectUrl, thumbnail: p.thumbnail, images: p.images, results: p.results, description: p.description, translations: p.translations.map(({ locale, name, description }) => ({ locale, name, description })) }));

await prisma.project.update({ where: { id: p.id }, data: { ...base, ...copy.en } });
for (const locale of ['tr', 'de', 'ur', 'ar']) {
  const { results, ...text } = copy[locale];
  await prisma.projectTranslation.upsert({
    where: { projectId_locale: { projectId: p.id, locale } },
    update: { ...text, results },
    create: { projectId: p.id, locale, ...text, results },
  });
}
console.log('updated shop-lamees: base + tr/de/ur/ar');
await prisma.$disconnect();
