'use client';

import Image from 'next/image';
import LocalizedLink from '@/components/LocalizedLink';
import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import type { CSSProperties } from 'react';
import CorporateWebsiteGuideCards from '@/components/services/CorporateWebsiteGuideCards';
import AnimatedVisual, { useVisualPlayback } from '@/components/services/corporate-visuals/AnimatedVisual';
import BeforeAfterCompare from '@/components/services/corporate-visuals/BeforeAfterCompare';
import MultilingualDemo from '@/components/services/corporate-visuals/MultilingualDemo';
import type { CorporateVisualName } from '@/components/services/corporate-visuals/svgData';
import { GirihHalo, HeritageParticles, H } from '@/components/services/hero-visuals/primitives';
import { corporateWebsiteArticlePath } from '@/data/corporate-website-article-cards';

type Locale = 'en' | 'tr';

const copy = {
  en: {
    preview: 'Illustrative website preview',
    projects: 'Selected Website Projects', projectsIntro: 'A selection of published projects with documented requirements and functionality.',
    client: 'Client and sector', need: 'Business requirement', contribution: 'PakSoft contribution and functionality',
    sunName: 'Sun Container GmbH', sunSector: 'Modular containers and construction', sunNeed: 'Present configurable modular containers to German business and consumer audiences.', sunContribution: 'A product-focused website with product and application information, references, a configurator entry point and a separate order-tracking portal.', viewProject: 'View project',
    redesignTitle: 'A New Website—or a Better Version of Your Current One?', newTitle: 'New website', newText: 'Plan the structure, brand presentation and content, then develop the agreed pages and functionality.', redesignTitle2: 'Redesign', redesignText: 'Review current content, usability and technical needs, then agree on the improvements and migration scope.', migration: 'When URLs change, we can plan redirects and post-launch monitoring as part of the agreed migration scope. Search visibility can fluctuate during a migration; specific outcomes cannot be guaranteed.',
    deliverables: 'What Your Project Can Include', core: 'Core project scope', optional: 'Optional additions, if agreed', scopeNote: 'The proposal confirms the pages, functionality, responsibilities and deliverables for each project.',
    coreItems: ['Website structure and page planning', 'Responsive interface design and development', 'Content management requirements', 'Contact and quotation forms', 'Technical SEO foundations', 'Testing and launch preparation', 'Handover and content-management guidance'], optionalItems: ['Additional language versions', 'Content writing or migration', 'Third-party integrations', 'Ongoing maintenance and hosting'],
    modulesTitle: 'Pages and Features Built Around Your Business', modulesText: 'Choose the modules that fit your organization, products and customer journey. This is an illustrative sitemap, not a fixed package.', modulesLabel: 'Illustrative website structure', modules: ['Company and team', 'Services', 'Products / technical catalogue', 'Projects and references', 'Certificates', 'News and insights', 'Careers', 'Contact / quotation requests'], featuresLink: 'Explore website features',
    multiTitle: 'Present Your Business in More Than One Language', multiText: 'Language versions can have their own navigation, forms and content. Arabic and Urdu layouts require right-to-left (RTL) support. Localized metadata and connections between language versions can be configured for the agreed structure.', languages: ['Turkish', 'English', 'German', 'Arabic', 'Urdu'], translationNote: 'Translation, editing and approvals are agreed in the project scope; they are not automatically included.',
    seoTitle: 'A Foundation for Visibility and Usability', seoText: 'We can build practical technical foundations into the website. These support discoverability and use, but are distinct from an ongoing SEO campaign.', seoItems: ['Descriptive page structure and metadata', 'Crawlable navigation and relevant sitemap configuration', 'Responsive layouts and performance considerations', 'Accessible forms and navigation', 'Analytics setup where agreed'], seoLink: 'Explore SEO services',
    processTitle: 'From Planning to Launch', processText: 'The sequence is tailored to the agreed scope. Client content and approvals affect the project schedule.', stages: ['Needs and scope', 'Structure and design', 'Development and content', 'Testing and approval', 'Launch and handover'], processLink: 'View the full process',
    priceTitle: 'What Determines the Cost?', priceText: 'A proposal is prepared around the size and requirements of the project. Factors include:', priceFactors: ['Unique page templates and functionality', 'Number of languages', 'CMS requirements', 'Content preparation or migration', 'Integrations', 'Hosting and ongoing support choices'], feesTitle: 'Project and recurring costs', feesText: 'Project fees are scoped separately from recurring hosting, maintenance and third-party licence costs. Applicable items are identified in the proposal.', pricingLink: 'See pricing details',
    manageTitle: 'Managing Your Website After Launch', manageText: 'Before work begins, the proposal and agreement document access, responsibilities and handover arrangements, including:', manageItems: ['Editing access and handover materials', 'Domain and hosting accounts', 'Code, design and content ownership', 'Third-party licences', 'Any optional maintenance'],
    faqTitle: 'Frequently Asked Questions', questions: [
      ['Do you provide both design and development?', 'Yes. We plan, design and develop the website as one project, with the specific scope confirmed in the proposal.'],
      ['Can you redesign our current website?', 'Yes. We review its content, usability and technical requirements, then agree on a redesign and any URL migration work.'],
      ['Can our team update the content?', 'Content management can be included. Editing access and guidance are agreed and documented for the project.'],
      ['Can the website support multiple languages?', 'Yes. Language-specific pages, navigation and forms can be scoped, including RTL layouts for Arabic and Urdu. Translation responsibilities are agreed separately.'],
      ['What affects the price and timeline?', 'Page templates, functionality, languages, CMS needs, content, integrations and hosting choices affect the proposal. Client content and approvals also affect timing.'],
      ['What happens after launch?', 'The handover and any ongoing maintenance are defined in the proposal and agreement.'],
    ], faqLink: 'Visit all FAQs', finalTitle: 'Tell Us About Your Website Project', finalText: 'Share what your business needs from its website and we can discuss a suitable scope.', finalCta: 'Discuss Your Project',
  },
  tr: {
    preview: 'Örnek gösterim: web sitesi ön izlemesi',
    projects: 'Seçili Web Sitesi Projelerimiz', projectsIntro: 'Gereksinimleri ve işlevleri proje kayıtlarında belgelenmiş yayınlanmış çalışmalardan bir örnek.',
    client: 'Müşteri ve sektör', need: 'İşletme ihtiyacı', contribution: 'PakSoft katkısı ve işlevler', sunName: 'Sun Container GmbH', sunSector: 'Modüler konteyner ve inşaat', sunNeed: 'Modüler konteyner çözümlerini Almanya’daki işletme ve tüketicilere tanıtmak.', sunContribution: 'Ürün ve kullanım alanlarını tanıtan, referansları ve konfigüratöre geçişi sunan; ayrıca ayrı bir sipariş takip portalıyla desteklenen web sitesi.', viewProject: 'Projeyi inceleyin',
    redesignTitle: 'Yeni Bir Web Sitesi mi, Mevcut Sitenizin Yenilenmesi mi?', newTitle: 'Yeni web sitesi', newText: 'Site yapısını, marka sunumunu ve içerik planını belirleyip üzerinde anlaşılan sayfa ve işlevleri geliştiriyoruz.', redesignTitle2: 'Yenileme', redesignText: 'Mevcut içerikleri, kullanılabilirliği ve teknik gereksinimleri inceliyor; ardından iyileştirme ve geçiş kapsamını birlikte belirliyoruz.', migration: 'URL’ler değişecekse yönlendirmeler ve yayın sonrası takip, üzerinde anlaşılan geçiş kapsamına eklenebilir. Geçiş sırasında arama görünürlüğü değişebilir; belirli bir sonuç garanti edilemez.',
    deliverables: 'Projenizin Kapsamında Neler Olabilir?', core: 'Temel proje kapsamı', optional: 'Üzerinde anlaşılırsa eklenebilecekler', scopeNote: 'Teklifte projeye özel sayfalar, işlevler, sorumluluklar ve teslimatlar netleştirilir.', coreItems: ['Web sitesi yapısı ve sayfa planı', 'Mobil uyumlu arayüz tasarımı ve geliştirme', 'İçerik yönetimi gereksinimleri', 'İletişim ve teklif formları', 'Teknik SEO temelleri', 'Test ve yayına hazırlık', 'Devir ve içerik yönetimi bilgilendirmesi'], optionalItems: ['Ek dil seçenekleri', 'İçerik yazımı veya aktarımı', 'Üçüncü taraf entegrasyonları', 'Sürekli bakım ve hosting'],
    modulesTitle: 'İşletmenize Uygun Sayfalar ve İşlevler', modulesText: 'İşletmenizin, ürünlerinizin ve müşteri yolculuğunuzun ihtiyaçlarına göre modüller seçilir. Bu görsel örnek bir site yapısıdır; sabit paket değildir.', modulesLabel: 'Örnek site yapısı', modules: ['Kurumsal ve ekip', 'Hizmetler', 'Ürünler / teknik katalog', 'Projeler ve referanslar', 'Sertifikalar', 'Haberler ve yazılar', 'Kariyer', 'İletişim / teklif talepleri'], featuresLink: 'Web sitesi özelliklerini inceleyin',
    multiTitle: 'İşletmenizi Birden Fazla Dilde Tanıtın', multiText: 'Dil sürümlerinin kendi menüleri, formları ve içerikleri olabilir. Arapça ve Urduca sayfalarda sağdan sola (RTL) düzen desteği gerekir. Yerelleştirilmiş meta veriler ve dil sürümleri arasındaki bağlantılar, üzerinde anlaşılan yapıya göre düzenlenebilir.', languages: ['Türkçe', 'İngilizce', 'Almanca', 'Arapça', 'Urduca'], translationNote: 'Çeviri, editoryal çalışma ve onay sorumlulukları proje kapsamında kararlaştırılır; otomatik olarak dahil değildir.',
    seoTitle: 'Görünürlük ve Kullanım Kolaylığı İçin Sağlam Bir Altyapı', seoText: 'Web sitesine uygulanabilecek teknik temelleri kuruyoruz. Bunlar bulunabilirliği ve kullanımı destekler; sürekli SEO kampanyasından ayrı çalışmalardır.', seoItems: ['Açıklayıcı sayfa yapısı ve meta veriler', 'Taranabilir menüler ve uygun site haritası yapılandırması', 'Mobil uyumlu düzen ve performans değerlendirmeleri', 'Erişilebilir formlar ve navigasyon', 'Anlaşma kapsamındaysa analitik kurulumu'], seoLink: 'SEO hizmetlerini inceleyin',
    processTitle: 'Planlamadan Yayına', processText: 'Adımlar, üzerinde anlaşılan kapsama göre düzenlenir. Müşteri içerikleri ve onaylar proje takvimini etkiler.', stages: ['İhtiyaç ve kapsam', 'Yapı ve tasarım', 'Geliştirme ve içerik', 'Test ve onay', 'Yayın ve devir'], processLink: 'Sürecin tümünü inceleyin',
    priceTitle: 'Proje Fiyatını Neler Belirler?', priceText: 'Teklif, projenin büyüklüğü ve gereksinimleri üzerinden hazırlanır. Başlıca etkenler:', priceFactors: ['Özel sayfa şablonları ve işlevler', 'Dil sayısı', 'İçerik yönetim sistemi gereksinimleri', 'İçerik hazırlığı veya aktarımı', 'Entegrasyonlar', 'Hosting ve devam eden destek seçenekleri'], feesTitle: 'Proje ve düzenli giderler', feesText: 'Proje ücreti; düzenli hosting, bakım ve üçüncü taraf lisans giderlerinden ayrı değerlendirilir. Geçerli kalemler teklifte belirtilir.', pricingLink: 'Fiyatlandırma detaylarını inceleyin',
    manageTitle: 'Yayından Sonra Web Sitenizin Yönetimi', manageText: 'Çalışma başlamadan önce erişim, sorumluluk ve devir koşulları teklif ve sözleşmede belgelenir. Bunlar şunları kapsar:', manageItems: ['Düzenleme erişimi ve devir materyalleri', 'Alan adı ve hosting hesapları', 'Kod, tasarım ve içerik sahipliği', 'Üçüncü taraf lisansları', 'Kararlaştırılan bakım hizmetleri'],
    faqTitle: 'Sık Sorulan Sorular', questions: [
      ['Tasarım ve geliştirme hizmetlerini birlikte veriyor musunuz?', 'Evet. Web sitesini tek bir proje kapsamında planlıyor, tasarlıyor ve geliştiriyoruz. Projeye özel kapsam teklifte belirlenir.'],
      ['Mevcut web sitemizi yenileyebilir misiniz?', 'Evet. İçerikleri, kullanılabilirliği ve teknik gereksinimleri değerlendirip yenileme ve varsa URL geçişi kapsamını birlikte belirliyoruz.'],
      ['Ekibimiz içerikleri güncelleyebilir mi?', 'İçerik yönetimi projeye dahil edilebilir. Düzenleme erişimi ve bilgilendirme kapsamı proje için kararlaştırılır.'],
      ['Web sitesi birden fazla dili destekleyebilir mi?', 'Evet. Arapça ve Urduca için RTL düzeni de dahil olmak üzere, dil bazlı sayfalar, menüler ve formlar planlanabilir. Çeviri sorumlulukları ayrıca belirlenir.'],
      ['Fiyat ve takvimi neler etkiler?', 'Sayfa şablonları, işlevler, dil sayısı, içerik yönetimi, içerikler, entegrasyonlar ve hosting tercihleri teklifi etkiler. Müşteri içerikleri ve onaylar da takvimde rol oynar.'],
      ['Yayından sonra ne olur?', 'Devir süreci ve varsa devam eden bakım hizmetleri teklif ve sözleşmede tanımlanır.'],
    ], faqLink: 'Tüm sık sorulan soruları görün', finalTitle: 'Web Sitesi Projenizi Anlatın', finalText: 'İşletmenizin web sitesinden neler beklediğini paylaşın; ihtiyaçlarınıza uygun kapsamı birlikte konuşalım.', finalCta: 'Projenizi Konuşalım',
  },
} satisfies Record<Locale, Record<string, any>>;

// Section illustrations (Turkish overview). Order matches the content arrays.
const capabilityGlyphs: CorporateVisualName[] = ['glyph-layout', 'glyph-devices', 'glyph-cms', 'glyph-form', 'glyph-seo'];
const stageIcons: CorporateVisualName[] = ['stage-1-analysis', 'stage-2-design', 'stage-3-development', 'stage-4-testing', 'stage-5-launch'];
export const sitemapPages = ['Hakkımızda', 'Hizmetler', 'Ürünler', 'Projeler', 'Haberler', 'İletişim'];
const scopeChips = ['Şablonlar', 'Diller', 'CMS', 'Entegrasyon', 'İçerik', 'Hosting'];
const handoverRows = ['Alan adı hesabı', 'Hosting hesabı', 'Yönetim paneli erişimi', 'Analitik erişimi', 'Kod ve tasarım dosyaları'];

type Project = { client?: string; industry?: string; description?: string; challenge?: string; solution?: string };

export default function CorporateWebsiteOverview({ locale, project }: { locale: Locale; project?: Project | null }) {
  if (locale === 'tr') return <TurkishCorporateWebsiteOverview project={project} />;

  const c = copy[locale];
  const projectName = c.sunName;
  const projectIndustry = c.sunSector;
  const projectNeed = c.sunNeed;
  const projectContribution = c.sunContribution;
  const projectImageAlt = 'Sun Container corporate website homepage featuring its container solutions';
  const sub = (name: string) => `/services/corporate-website-design/${name}`;
  const enquiry = '/start-project?service=corporate-website-design';

  return (
    <>
      <section id="selected-projects" className="container mx-auto max-w-[1200px] px-4 section-compact">
        <div className="mb-7 max-w-2xl"><h2 className="text-headline font-medium text-gray-900">{c.projects}</h2><p className="mt-3 text-body leading-relaxed text-gray-600">{c.projectsIntro}</p></div>
        <article className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white md:grid-cols-[.8fr_1.2fr]">
          <div className="relative aspect-[16/10] min-h-48 overflow-hidden bg-heritage-ivory md:aspect-auto md:min-h-[20rem]"><Image src="/images/portfolio/sun-container.png" alt={projectImageAlt} fill priority sizes="(max-width: 767px) 100vw, 40vw" className="object-cover object-top" /></div>
          <div className="grid gap-5 p-6 sm:grid-cols-3"><div><h3 className="text-overline text-heritage-turquoise-deep">{c.client}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{projectName}<br/>{projectIndustry}</p></div><div><h3 className="text-overline text-heritage-turquoise-deep">{c.need}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{projectNeed}</p></div><div><h3 className="text-overline text-heritage-turquoise-deep">{c.contribution}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{projectContribution}</p><LocalizedLink href="/projects/sun-container" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{c.viewProject}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180"/></LocalizedLink></div></div>
        </article>
      </section>

      <section className="bg-background-gray"><div className="container mx-auto max-w-[1200px] px-4 section-compact"><h2 className="max-w-3xl text-headline font-medium text-gray-900">{c.redesignTitle}</h2><div className="mt-6 grid gap-5 md:grid-cols-2"><article className="rounded-2xl border border-gray-200 border-t-4 border-t-heritage-turquoise bg-white p-6"><h3 className="text-title font-medium text-gray-900">{c.newTitle}</h3><p className="mt-3 text-body leading-relaxed text-gray-600">{c.newText}</p></article><article className="rounded-2xl border border-gray-200 border-t-4 border-t-heritage-saffron bg-white p-6"><h3 className="text-title font-medium text-gray-900">{c.redesignTitle2}</h3><p className="mt-3 text-body leading-relaxed text-gray-600">{c.redesignText}</p></article></div><p className="mt-5 max-w-4xl text-caption text-gray-600">{c.migration}</p></div></section>

      <section className="container mx-auto max-w-[1200px] px-4 section-compact"><h2 className="text-headline font-medium text-gray-900">{c.deliverables}</h2><p className="mt-3 max-w-2xl text-body leading-relaxed text-gray-600">{c.scopeNote}</p><div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><div className="rounded-2xl border border-gray-200 bg-white p-6"><h3 className="text-title font-medium text-gray-900">{c.core}</h3><ul className="mt-5 grid gap-3 sm:grid-cols-2">{c.coreItems.map((x:string)=><li key={x} className="flex gap-2.5 text-sm leading-6 text-gray-700"><CheckIcon className="mt-1 h-4 w-4 flex-none text-heritage-turquoise-deep"/>{x}</li>)}</ul></div><div className="rounded-2xl bg-heritage-turquoise-light/70 p-6"><h3 className="text-title font-medium text-gray-900">{c.optional}</h3><ul className="mt-5 space-y-3">{c.optionalItems.map((x:string)=><li key={x} className="text-sm leading-6 text-gray-700">{x}</li>)}</ul></div></div></section>

      <section className="bg-heritage-ivory"><div className="container mx-auto max-w-[1200px] px-4 section-compact"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><h2 className="text-headline font-medium text-gray-900">{c.modulesTitle}</h2><p className="mt-4 text-body leading-relaxed text-gray-600">{c.modulesText}</p><LocalizedLink href={sub('features')} className="mt-5 inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{c.featuresLink}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180"/></LocalizedLink></div><div className="border-y border-heritage-sand py-5"><p className="mb-3 text-overline text-heritage-turquoise-deep">{c.modulesLabel}</p><div className="grid grid-cols-2 gap-x-6 sm:grid-cols-4">{c.modules.map((x:string,i:number)=><div key={x} className={`flex min-h-14 items-center border-b border-heritage-sand py-3 text-sm leading-snug ${i===0?'font-semibold text-heritage-turquoise-deep':'text-gray-700'}`}>{x}</div>)}</div></div></div></div></section>

      <section className="container mx-auto max-w-[1200px] px-4 section-compact"><div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center"><div><h2 className="text-headline font-medium text-gray-900">{c.multiTitle}</h2><p className="mt-4 text-body leading-relaxed text-gray-600">{c.multiText}</p><div className="mt-5 flex flex-wrap gap-2">{c.languages.map((x:string)=><span key={x} className="rounded-full border border-heritage-sand bg-heritage-ivory px-3 py-1.5 text-sm text-gray-700">{x}</span>)}</div><p className="mt-4 text-caption text-gray-600">{c.translationNote}</p></div><div dir="ltr" aria-label="Illustrative multilingual interface" className="rounded-2xl border border-heritage-sand bg-heritage-ivory p-4 sm:p-6"><p className="text-overline text-heritage-turquoise-deep">{c.preview}</p><div className="mt-4 rounded-xl border border-heritage-sand bg-white p-4"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-heritage-sand pb-3"><span className="font-medium">PakSoft</span><div className="flex gap-2 text-xs text-gray-500">TR　EN　DE　AR　UR</div></div><div className="grid gap-2 pt-4"><i className="h-2 w-1/2 rounded bg-heritage-sand"/><i className="h-2 w-4/5 rounded bg-heritage-ivory"/><div className="mt-2 flex justify-end"><div dir="rtl" className="rounded bg-heritage-turquoise-light px-3 py-2 text-sm text-gray-700">العربية · اردو</div></div></div></div></div></div></section>

      <section className="bg-background-gray"><div className="container mx-auto grid max-w-[1200px] gap-8 px-4 section-compact lg:grid-cols-[.85fr_1.15fr]"><div><h2 className="text-headline font-medium text-gray-900">{c.seoTitle}</h2><p className="mt-4 text-body leading-relaxed text-gray-600">{c.seoText}</p><LocalizedLink href="/services/seo" className="mt-5 inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{c.seoLink}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180"/></LocalizedLink></div><ul className="grid content-center gap-x-6 sm:grid-cols-2">{c.seoItems.map((x:string)=><li key={x} className="flex gap-3 border-b border-heritage-sand py-4 text-sm leading-6 text-gray-700"><CheckIcon className="mt-1 h-4 w-4 flex-none text-heritage-turquoise-deep"/>{x}</li>)}</ul></div></section>

      <section className="container mx-auto max-w-[1200px] px-4 section-compact"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-headline font-medium text-gray-900">{c.processTitle}</h2><p className="mt-3 max-w-2xl text-body leading-relaxed text-gray-600">{c.processText}</p></div><LocalizedLink href={sub('process')} className="inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{c.processLink}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180"/></LocalizedLink></div><ol className="mt-6 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-5">{c.stages.map((x:string,i:number)=><li key={x} className="border-t-2 border-heritage-turquoise py-4"><span className="text-overline text-heritage-turquoise-deep">0{i+1}</span><p className="mt-2 font-medium text-gray-900">{x}</p></li>)}</ol></section>

      <section className="bg-heritage-ivory"><div className="container mx-auto max-w-[1200px] px-4 section-compact"><div className="grid gap-8 lg:grid-cols-2"><div><h2 className="text-headline font-medium text-gray-900">{c.priceTitle}</h2><p className="mt-4 text-body leading-relaxed text-gray-600">{c.priceText}</p><ul className="mt-5 grid gap-x-6 sm:grid-cols-2">{c.priceFactors.map((x:string)=><li key={x} className="border-b border-heritage-sand py-3 text-sm leading-6 text-gray-700">{x}</li>)}</ul><LocalizedLink href={sub('pricing')} className="mt-5 inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{c.pricingLink}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180"/></LocalizedLink></div><aside className="rounded-2xl border border-heritage-sand bg-white p-6"><h3 className="text-title font-medium text-gray-900">{c.feesTitle}</h3><p className="mt-3 text-body leading-relaxed text-gray-600">{c.feesText}</p></aside></div></div></section>

      <section className="container mx-auto max-w-[1200px] px-4 section-compact"><div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><h2 className="text-headline font-medium text-gray-900">{c.manageTitle}</h2><p className="mt-4 text-body leading-relaxed text-gray-600">{c.manageText}</p></div><ul className="grid content-start gap-x-6 sm:grid-cols-2">{c.manageItems.map((x:string)=><li key={x} className="flex gap-3 border-b border-gray-200 py-4 text-sm leading-6 text-gray-700"><CheckIcon className="mt-1 h-4 w-4 flex-none text-heritage-turquoise-deep"/>{x}</li>)}</ul></div></section>

      <section className="bg-background-gray"><div className="container mx-auto max-w-4xl px-4 section-compact"><h2 className="text-headline font-medium text-gray-900">{c.faqTitle}</h2><dl className="mt-6 divide-y divide-heritage-sand border-y border-heritage-sand">{c.questions.map(([q,a]:string[]) => <div key={q} className="py-4"><dt className="text-base font-semibold text-gray-900">{q}</dt><dd className="max-w-3xl pt-2 text-body leading-relaxed text-gray-600">{a}</dd></div>)}</dl><LocalizedLink href={sub('faq')} className="mt-5 inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{c.faqLink}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180"/></LocalizedLink></div></section>

      <section className="bg-gray-950"><div className="container mx-auto max-w-5xl px-4 section-compact text-center"><h2 className="text-headline font-medium text-white">{c.finalTitle}</h2><p className="mx-auto mt-4 max-w-2xl text-body leading-relaxed text-gray-300">{c.finalText}</p><LocalizedLink href={enquiry} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise px-6 py-3 font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950">{c.finalCta}<ArrowRightIcon className="h-4 w-4 rtl:rotate-180"/></LocalizedLink></div></section>
    </>
  );
}

function TurkishCorporateWebsiteOverview({ project }: { project?: Project | null }) {
  const stagesPlayback = useVisualPlayback<HTMLOListElement>(0.3);
  const sub = (name: string) => `/services/corporate-website-design/${name}`;
  const projectName = project?.client || 'Sun Container GmbH';
  const capabilities = [
    {
      title: 'İşletmenize Özel Tasarım ve Sayfa Yapısı',
      text: 'Marka kimliğinize ve ziyaretçilerin aradığı bilgilere uygun sayfa düzenleri planlanır. Sayfa türleri ve tasarım kapsamı, işletmenizin hedefleri ve içerik ihtiyaçlarıyla birlikte teklifte netleştirilir.',
    },
    {
      title: 'Mobil ve Tablet Uyumluluğu',
      text: 'Sayfalar farklı ekran boyutlarında okunup kullanılabilecek şekilde geliştirilir. Cihaz ve tarayıcı kontrolleri, proje için üzerinde anlaşılan test kapsamına göre yapılır.',
    },
    {
      title: 'Yönetim Paneli ve İçerik Güncelleme',
      text: 'Seçilen altyapıya göre ekibinizin hizmet metinlerini, haberleri veya görselleri güncelleyebileceği bir içerik yönetimi planlanabilir. Düzenlenebilir alanlar ve kullanıcı erişimleri proje kapsamına göre belirlenir.',
    },
    {
      title: 'İletişim ve Teklif Talep Formları',
      text: 'İletişim, teklif veya randevu taleplerini toplamak için işletmenizin ihtiyaç duyduğu alanlar belirlenir. Form yönlendirmeleri, entegrasyonlar ve spam önlemleri teklifte ayrıca tanımlanır.',
    },
    {
      title: 'Teknik SEO Altyapısı',
      text: 'Açıklayıcı sayfa yapısı, meta veriler ve taranabilir bağlantılar gibi teknik temeller planlanabilir. Bunlar devam eden SEO kampanyasından ayrıdır; kapsam proje teklifinde belirtilir.',
    },
  ];
  const stages = [
    { title: 'İhtiyaç Analizi ve Kapsam', team: 'Hedefleri, hedef kitleleri ve teknik gereksinimleri değerlendiririz.', client: 'İş önceliklerini, paydaşları ve mevcut materyalleri paylaşır.' },
    { title: 'Sayfa Planı ve Tasarım', team: 'Site haritasını ve üzerinde anlaşılan arayüz taslaklarını hazırlarız.', client: 'Sayfa yapısını ve tasarımları inceler, geri bildirimleri bir araya getirir.' },
    { title: 'Geliştirme ve İçerik', team: 'Onaylanan tasarımları, işlevleri ve içerik yönetimi yapısını geliştiririz.', client: 'Metinleri, görselleri, belgeleri ve gerekli erişimleri sağlar.' },
    { title: 'Test ve Onay', team: 'Anlaşılan sayfaları, formları, bağlantıları ve cihaz düzenlerini kontrol ederiz.', client: 'İş akışlarını dener ve bulgularını onay aşamasında iletir.' },
    { title: 'Yayın ve Teslim', team: 'Yayını ve kararlaştırılan erişim/devir bilgilerini hazırlarız.', client: 'Alan adı, hosting ve yayın onaylarının hazır olduğunu teyit eder.' },
  ];
  const buyerChecks = [
    'Benzer ihtiyaçlara sahip gerçek projeleri ve teslim edilen işlevleri inceleyin.',
    'Sayfaların, işlevlerin, kapsam dışı işlerin ve sorumlulukların teklifte açıkça yazıldığını kontrol edin.',
    'İçerik yönetimi, hesap erişimleri ve devir materyallerinin nasıl ele alınacağını sorun.',
    'İletişim, geri bildirim ve onay aşamalarını proje başlamadan netleştirin.',
    'Hosting, lisans, bakım ve üçüncü taraf giderlerini proje ücretinden ayrı değerlendirin.',
  ];
  const faqs = [
    ['Kurumsal web sitesi tasarımı ve geliştirme aynı hizmete dahil mi?', 'PakSoft planlama, arayüz tasarımı ve geliştirmeyi tek bir proje kapsamında ele alabilir. Hangi sayfa ve işlevlerin dahil olduğu teklifinizde belirlenir.'],
    ['Web sitesindeki içerikleri kendimiz güncelleyebilir miyiz?', 'Seçilen altyapı ve proje kapsamı uygunsa ekibinizin belirli içerikleri güncelleyebileceği bir yönetim paneli kurulabilir. Düzenlenebilir alanlar, roller ve erişimler teklifte netleştirilir.'],
    ['Mevcut kurumsal web sitemizi yenileyebilir misiniz?', 'Evet. Mevcut içerik, kullanılabilirlik ve teknik gereksinimler değerlendirilerek yenileme kapsamı oluşturulabilir. URL’ler değişiyorsa yönlendirmeler ve yayın sonrası kontroller planlanabilir; arama görünürlüğü için sıfır kayıp garantisi verilmez.'],
    ['Çok dilli bir web sitesi hazırlayabilir misiniz?', 'Türkçe, İngilizce, Almanca, Arapça ve Urduca sürümler planlanabilir. Çeviri sorumlulukları ayrıca kararlaştırılır; Arapça ve Urduca için RTL düzeni de kapsamda değerlendirilir.'],
    ['Kurumsal web sitesi yapımı ne kadar sürer?', 'Takvim; sayfa ve işlev kapsamına, içeriklerin hazır olmasına, entegrasyonlara ve onay sürelerine bağlıdır. Gereksinimler değerlendirildikten sonra proje takvimi teklif kapsamında netleştirilir.'],
    ['Web sitesi projesine başlamak için neler hazırlamalıyız?', 'İşletme hedeflerinizi, hedef kitlelerinizi, mevcut web sitenizi, yaklaşık sayfa listenizi ve varsa örnek içeriklerinizi paylaşmanız başlangıç için yardımcı olur. Gerekli entegrasyon ve dilleri de belirtin.'],
  ];

  return (
    <>
      <section className="bg-background-gray">
        <div className="container mx-auto max-w-[1200px] px-4 section-compact">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-10">
            <div className="max-w-3xl">
              <h2 className="reveal text-headline font-medium text-gray-900">İşletmenize Uygun Kurumsal Web Sitesi</h2>
              <p className="mt-4 text-body leading-relaxed text-gray-700">Kurumsal web sitesi; işletmenizin ne yaptığını, hangi ürün veya hizmetleri sunduğunu ve müşterilerin size nasıl ulaşabileceğini açık biçimde anlatır. Üreticiler, ihracatçılar, hizmet şirketleri ve kurumsal web sitesini yenilemek isteyen KOBİ’ler için ihtiyaçlara göre planlanabilir.</p>
              <p className="mt-3 text-body leading-relaxed text-gray-600">PakSoft yalnızca görsel taslak hazırlamaz; üzerinde anlaşılan tasarım, geliştirme ve yayına hazırlık çalışmalarını yürütür. Sayfalar, içerik yönetimi, formlar ve entegrasyonlar projenizin gereksinimlerine göre teklifte belirlenir.</p>
              <LocalizedLink href="/services/web-design" className="inline-flex min-h-11 items-center gap-2 mt-6 rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-heritage-turquoise hover:text-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise motion-reduce:transition-none">Web Tasarım Hizmetlerini İnceleyin<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></LocalizedLink>
            </div>
            <figure className="m-0"><AnimatedVisual name="site-build" className="mx-auto max-w-xl" /><figcaption className="sr-only">Örnek gösterim: kurumsal web sitesi taslağının tasarıma dönüşmesi</figcaption></figure>
          </div>
        </div>
      </section>

      <section id="selected-projects" className="container mx-auto max-w-[1200px] px-4 section-compact">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><h2 className="reveal text-headline font-medium text-gray-900">Kurumsal Web Tasarım Projelerimiz</h2><p className="mt-3 max-w-2xl text-body leading-relaxed text-gray-600">Yayınlanmış ve proje kayıtlarında işlevleri belgelenmiş çalışmalardan bir örnek.</p></div>
          <LocalizedLink href={sub('portfolio')} className="inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Tüm proje örneklerini inceleyin<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></LocalizedLink>
        </div>
        <article className="reveal grid overflow-hidden rounded-2xl border border-gray-200 bg-white md:grid-cols-[.9fr_1.1fr]">
          <div className="relative aspect-[16/10] min-h-48 overflow-hidden bg-heritage-ivory md:aspect-auto md:min-h-[22rem]"><Image src="/images/portfolio/sun-container.png" alt="Sun Container web sitesi ana sayfasında modüler konteyner ürünleri tanıtılıyor" fill sizes="(max-width: 767px) 100vw, 42vw" className="object-cover object-top" /></div>
          <div className="p-5 sm:p-7">
            <p className="text-overline text-heritage-turquoise-deep">Modüler konteyner ve inşaat</p><h3 className="mt-2 text-title font-semibold text-gray-900">{projectName}</h3>
            <div className="mt-5 space-y-4 text-sm leading-6 text-gray-700">
              <p><strong className="text-gray-900">İşletme ihtiyacı: </strong>{project?.challenge || 'Almanya pazarında yapılandırılabilir modüler konteyner çözümlerini işletme ve tüketicilere tanıtmak.'}</p>
              <p><strong className="text-gray-900">PakSoft katkısı: </strong>{project?.solution || 'Ürün ve kullanım alanlarını, referansları ve teklif akışına yönlendiren konfigüratör girişini sunan web sitesi.'} Ayrı bir sipariş takip portalı da bulunur.</p>
            </div>
            <ul className="mt-5 grid gap-x-5 gap-y-2 sm:grid-cols-2">
              {['Ürün ve kullanım alanı sayfaları', 'Konfigüratör ve teklif akışına geçiş', 'Ayrı sipariş takip portalı'].map(item => <li key={item} className="flex items-start gap-2 text-sm leading-6 text-gray-700"><CheckIcon className="mt-1 h-4 w-4 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />{item}</li>)}
            </ul>
            <LocalizedLink href="/projects/sun-container" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Sun Container projesini inceleyin<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></LocalizedLink>
          </div>
        </article>
      </section>

      <section className="bg-heritage-ivory">
        <div className="container mx-auto max-w-[1200px] px-4 section-compact">
          <h2 className="reveal text-headline font-medium text-gray-900">Kurumsal Web Sitesi Yapımında Neler Planlıyoruz?</h2>
          <p className="mt-3 max-w-3xl text-body leading-relaxed text-gray-600">Her projede aynı özellikler varsayılmaz. Aşağıdaki başlıkların kapsamı, işletmenizin ihtiyaçları ve seçilen altyapıya göre belirlenir.</p>
          <div className="reveal-group mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, i) => <article key={item.title} data-cv-hover className="corporate-info-card rounded-xl border border-heritage-sand bg-white p-5 sm:p-6"><AnimatedVisual name={capabilityGlyphs[i]} replayOnHover className="w-16" /><h3 className="mt-4 text-lg font-semibold leading-snug text-gray-900">{item.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p></article>)}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            <LocalizedLink href={sub('features')} className="inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Web sitesi özelliklerinin ayrıntılarını inceleyin<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></LocalizedLink>
            <LocalizedLink href="/services/seo" className="inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">SEO hizmetlerini inceleyin<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></LocalizedLink>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-[1200px] px-4 section-compact">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div><h2 className="reveal text-headline font-medium text-gray-900">Kurumsal Web Sitesi Tasarımında Sayfalar ve İşlevler</h2><p className="mt-4 text-body leading-relaxed text-gray-600">Site haritası; işletmenizin sunduklarına, müşterilerinizin aradığı bilgilere ve içerikleri kimin yöneteceğine göre şekillenir. Aşağıdaki yapı örnek niteliğindedir.</p></div>
          <figure className="m-0 rounded-2xl border border-heritage-sand bg-heritage-ivory p-4 sm:p-6"><AnimatedVisual name="site-tree" labels={[{ slot: 'slot-root', text: <span className="text-white">Ana Sayfa</span>, delay: 0.3 }, ...sitemapPages.map((page, i) => ({ slot: `slot-${i + 1}`, text: page, delay: 0.95 + i * 0.12 }))]} /><figcaption className="mt-4 text-sm leading-6 text-gray-600">Örnek site yapısı. Kariyer sayfaları, şubeler, indirilebilir belgeler ve dış sistem entegrasyonları gereksinimlere göre ayrıca değerlendirilir.</figcaption></figure>
        </div>
      </section>

      <section className="bg-background-gray">
        <div className="container mx-auto max-w-[1200px] px-4 section-compact">
          <h2 className="reveal max-w-3xl text-headline font-medium text-gray-900">Yeni Web Sitesi veya Mevcut Sitenizin Yenilenmesi</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="reveal-group grid gap-5">
            <article className="rounded-2xl border border-gray-200 border-t-4 border-t-heritage-turquoise bg-white p-5 sm:p-6"><h3 className="text-title font-semibold text-gray-900">Yeni Bir Kurumsal Web Sitesi Oluşturma</h3><p className="mt-3 text-body leading-relaxed text-gray-600">Sayfa yapısını ve içerik sorumluluklarını planlar, marka sunumunu tasarlar ve üzerinde anlaşılan sayfa ve işlevleri geliştiririz. İçerik hazırlığı, formlar ve içerik yönetimi kapsamı teklifte netleştirilir.</p></article>
            <article className="rounded-2xl border border-gray-200 border-t-4 border-t-heritage-saffron bg-white p-5 sm:p-6"><h3 className="text-title font-semibold text-gray-900">Mevcut Web Sitesini Yenileme</h3><p className="mt-3 text-body leading-relaxed text-gray-600">Mevcut içeriği, kullanılabilirliği ve teknik gereksinimleri inceler; iyileştirme ve geçiş kapsamını birlikte belirleriz. URL’ler değişiyorsa yönlendirmeler planlanabilir ve yayın sonrası kontroller yapılabilir. Arama görünürlüğünde sıfır kayıp garantisi verilmez.</p><Link href={corporateWebsiteArticlePath('web-sitesi-yenileme')} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Yenileme planlama rehberini okuyun<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></article>
          </div><BeforeAfterCompare /></div>
        </div>
      </section>

      <section className="container mx-auto max-w-[1200px] px-4 section-compact">
        <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div><h2 className="reveal text-headline font-medium text-gray-900">Çok Dilli Kurumsal Web Sitesi Seçenekleri</h2><p className="mt-4 text-body leading-relaxed text-gray-600">Türkçe, İngilizce, Almanca, Arapça ve Urduca sayfalar planlanabilir. Her dil için içerik, menü ve formlar ayrı ele alınır. Arapça ve Urduca sürümlerde metin yönü ve sayfa düzeni RTL kullanımına göre kontrol edilir.</p><p className="mt-3 text-sm leading-6 text-gray-600">Çeviri, editoryal inceleme ve onay sorumlulukları proje kapsamına göre belirlenir; otomatik olarak dahil değildir. Ek diller, içerik miktarı ve kontrol ihtiyacına bağlı olarak kapsamı ve maliyeti etkiler.</p><div className="mt-5 flex flex-wrap gap-2">{['Türkçe', 'İngilizce', 'Almanca', 'Arapça', 'Urduca'].map(language => <span key={language} className="rounded-full border border-heritage-sand bg-heritage-ivory px-3 py-1.5 text-sm text-gray-700">{language}</span>)}</div><Link href={corporateWebsiteArticlePath('ihracat-firmalari-icin-cok-dilli-web-sitesi')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">İhracat firmaları için çok dilli site rehberi<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></div>
          <MultilingualDemo />
        </div>
      </section>

      <section className="bg-background-gray">
        <div className="container mx-auto max-w-[1200px] px-4 section-compact">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="reveal text-headline font-medium text-gray-900">Kurumsal Web Sitesi Yapımı Nasıl İlerler?</h2><p className="mt-3 max-w-3xl text-body leading-relaxed text-gray-600">Her aşamada ekiplerin sorumluluklarını ve onay noktalarını netleştiririz. Takvim; kapsam, içeriklerin hazır olması ve geri bildirim sürelerine bağlıdır.</p></div><LocalizedLink href={sub('process')} className="inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Proje sürecinin ayrıntılarını inceleyin<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></LocalizedLink></div>
          <ol ref={stagesPlayback.ref} className="reveal-group mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{stages.map((stage, i) => <li key={stage.title} className="h-full rounded-xl border border-gray-200 bg-white p-4 sm:p-5"><div className="flex items-center justify-between"><AnimatedVisual name={stageIcons[i]} state={stagesPlayback.state} className="w-12" style={{ '--cv-delay': `${i * 0.35}s` } as CSSProperties} /><span className="text-overline text-heritage-turquoise-deep">0{i + 1}</span></div><h3 className="mt-2 font-semibold leading-snug text-gray-900">{stage.title}</h3><p className="mt-3 text-sm leading-6 text-gray-700"><strong>PakSoft: </strong>{stage.team}</p><p className="mt-2 text-sm leading-6 text-gray-600"><strong>Müşteri: </strong>{stage.client}</p></li>)}</ol>
        </div>
      </section>

      <section className="container mx-auto max-w-[1200px] px-4 section-compact">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><h2 className="reveal text-headline font-medium text-gray-900">Kurumsal Web Tasarım Ajansı Seçerken Nelere Bakmalısınız?</h2><p className="mt-4 text-body leading-relaxed text-gray-600">Teklifleri karşılaştırırken yalnızca görsel tasarıma değil, proje boyunca ve teslim sonrasında nasıl çalışılacağına da bakın.</p></div>
          <ul className="reveal grid gap-x-6 sm:grid-cols-2">{buyerChecks.map(item => <li key={item} className="flex gap-3 border-b border-heritage-sand py-3 text-sm leading-6 text-gray-700"><CheckIcon className="mt-1 h-4 w-4 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />{item}</li>)}</ul>
        </div>
      </section>

      <section className="bg-heritage-ivory">
        <div className="container mx-auto max-w-[1200px] px-4 section-compact">
          <div className="grid gap-8 lg:grid-cols-2"><div><h2 className="reveal text-headline font-medium text-gray-900">Kurumsal Web Sitesi Fiyatını Neler Belirler?</h2><p className="mt-4 text-body leading-relaxed text-gray-600">Web sitesi yapım teklifi; gereken tasarım, geliştirme ve içerik çalışmasına göre hazırlanır. Başlıca etkenler şunlardır:</p><ul className="mt-4 grid gap-x-6 sm:grid-cols-2">{['Özel sayfa şablonları ve işlevler', 'Dil sayısı', 'İçerik yönetim sistemi gereksinimleri', 'İçerik hazırlığı veya aktarımı', 'Entegrasyonlar', 'Hosting, lisans ve bakım tercihleri'].map(item => <li key={item} className="border-b border-heritage-sand py-3 text-sm leading-6 text-gray-700">{item}</li>)}</ul><LocalizedLink href={sub('pricing')} className="mt-5 inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Kurumsal Web Sitesi Fiyatları ve Kapsamı<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></LocalizedLink></div><div className="space-y-5"><figure className="m-0 rounded-2xl border border-heritage-sand bg-white p-4 sm:p-5"><AnimatedVisual name="scope-builder" labels={scopeChips.map((chip, i) => ({ slot: `slot-chip-${i + 1}`, text: chip, delay: 0.4 + i * 0.2, className: 'font-medium text-gray-700' }))} /><figcaption className="mt-3 text-xs leading-5 text-gray-600">Örnek gösterim · Teklif, projeye alınan kalemlere göre şekillenir.</figcaption></figure><aside className="rounded-2xl border border-heritage-sand bg-white p-5 sm:p-6"><h3 className="text-title font-semibold text-gray-900">Proje ve devam eden giderler</h3><p className="mt-3 text-body leading-relaxed text-gray-600">Proje ücreti; alan adı, hosting, lisanslar ve devam eden bakım gibi düzenli giderlerden ayrı değerlendirilir. Projeniz için geçerli kalemler teklifte belirtilir; burada sabit fiyat veya paket varsayımı sunulmaz.</p></aside></div></div>
        </div>
      </section>

      <section className="container mx-auto max-w-[1200px] px-4 section-compact">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]"><div><h2 className="reveal text-headline font-medium text-gray-900">Yayından Sonra İçerik Yönetimi ve Destek</h2><p className="mt-4 text-body leading-relaxed text-gray-600">İçerik düzenleme erişimi ve devir materyalleri proje kapsamında planlanabilir. Hesap erişimleri, teslimatlar, sahiplik, üçüncü taraf lisansları ve varsa devam eden destek teklif ve sözleşmede belgelenir.</p><figure className="m-0 mt-6"><AnimatedVisual name="handover" labels={handoverRows.map((row, i) => ({ slot: `slot-row-${i + 1}`, text: row, delay: 0.25 + i * 0.1, className: 'font-medium text-gray-700' }))} /><figcaption className="mt-3 text-xs leading-5 text-gray-600">Örnek gösterim · Devredilecek erişim ve dosyalar teklif ve sözleşmede listelenir.</figcaption></figure></div><ul className="reveal grid content-start gap-x-6 sm:grid-cols-2">{['İçerik düzenleme erişimi', 'Hesap ve hosting bilgileri', 'Devir materyalleri', 'Üçüncü taraf lisansları', 'Kararlaştırılan bakım seçenekleri'].map(item => <li key={item} className="flex gap-3 border-b border-gray-200 py-4 text-sm leading-6 text-gray-700"><CheckIcon className="mt-1 h-4 w-4 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />{item}</li>)}</ul></div>
      </section>

      <section aria-labelledby="corporate-guides" className="bg-heritage-ivory">
        <div className="container mx-auto max-w-[1200px] px-4 section-compact">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl"><h2 id="corporate-guides" className="reveal text-headline font-medium text-gray-900">Kurumsal Web Tasarım Rehberleri</h2><p className="mt-3 text-body leading-relaxed text-gray-600">Projeye başlamadan önce kararlarınızı netleştirmek için hazırladığımız uygulamalı rehberler: mevcut siteyi yenileme ve yurt dışı pazarlar için çok dilli site planlama.</p></div>
            <LocalizedLink href={sub('blog')} className="inline-flex shrink-0 items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Tüm rehberleri görün<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></LocalizedLink>
          </div>
          <CorporateWebsiteGuideCards reveal />
        </div>
      </section>

      <section className="bg-background-gray">
        <div className="container mx-auto max-w-4xl px-4 section-compact">
          <h2 className="reveal text-headline font-medium text-gray-900">Kurumsal Web Tasarım Hakkında Sık Sorulan Sorular</h2>
          <dl className="reveal mt-6 divide-y divide-heritage-sand border-y border-heritage-sand">{faqs.map(([question, answer]) => <div key={question} className="py-5"><dt><h3 className="text-base font-semibold leading-snug text-gray-900">{question}</h3></dt><dd className="max-w-3xl pt-2 text-body leading-relaxed text-gray-600">{answer}</dd></div>)}</dl>
          <LocalizedLink href={sub('faq')} className="mt-5 inline-flex items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">Tüm soruların yanıtlarını inceleyin<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></LocalizedLink>
        </div>
      </section>

      <section className="bg-heritage-ivory">
        <div className="container mx-auto max-w-[1200px] px-4 section-compact">
          <div className="max-w-3xl">
            <h2 className="reveal text-headline font-medium text-gray-900">Kurumsal Web Tasarım Hizmetini Ayrıntılı İnceleyin</h2>
            <p className="mt-3 text-body leading-relaxed text-gray-600">Bu sayfa hizmetin özetini sunar. Karar vermeden önce ihtiyaç duyduğunuz konunun ayrıntılarına ilgili sayfadan ulaşın.</p>
          </div>
          <nav aria-label="Kurumsal web tasarım hizmeti sayfaları" className="reveal-group mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Kurumsal Web Sitesi Özellikleri', description: 'Yönetim paneli, mobil uyumluluk, çok dilli yapı ve isteğe bağlı modülleri inceleyin.', route: 'features' },
              { title: 'Teknolojiler ve Altyapı Seçenekleri', description: 'Web siteniz için kullanılan teknolojileri, içerik yönetimini ve altyapı seçeneklerini değerlendirin.', route: 'technologies' },
              { title: 'Tasarımdan Yayına Proje Süreci', description: 'Planlama, tasarım, geliştirme, onay ve teslim aşamalarında nasıl ilerlediğimizi öğrenin.', route: 'process' },
              { title: 'Kurumsal Web Sitesi Projelerimiz', description: 'Yayınlanmış projelerde işletme ihtiyacını, PakSoft’un katkısını ve belgelenen işlevleri inceleyin.', route: 'portfolio' },
              { title: 'Kurumsal Web Sitesi Fiyatları', description: 'Fiyatı etkileyen unsurları, teklife dahil olabilecekleri ve yayın sonrası giderleri öğrenin.', route: 'pricing' },
              { title: 'Kurumsal Web Tasarım Rehberleri', description: 'Site yenileme, çok dilli yapı, teklif hazırlığı ve içerik yönetimi kararları için rehberleri okuyun.', route: 'blog' },
              { title: 'Sık Sorulan Sorular', description: 'İçerik yönetimi, teslimat, çok dilli yapı ve destek hakkındaki soruların yanıtlarını bulun.', route: 'faq' },
            ].map(item => <LocalizedLink key={item.route} href={sub(item.route)} className="group flex h-full min-h-32 items-start justify-between gap-4 rounded-xl border border-heritage-sand bg-white p-4 transition-colors hover:border-heritage-turquoise hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none sm:p-5">
              <span className="block">
                <h3 className="text-base font-semibold leading-snug text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
              </span>
              <ArrowRightIcon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-heritage-turquoise-deep transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none motion-reduce:transform-none rtl:rotate-180" />
            </LocalizedLink>)}
          </nav>
        </div>
      </section>

      <section className="bg-gray-950">
        <div className="relative isolate container mx-auto max-w-5xl overflow-hidden px-4 section-compact text-center"><div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2"><GirihHalo size={480} color={H.saffron} opacity={0.45} /><HeritageParticles count={10} colors={[H.turquoise, H.saffron, H.terracotta]} /></div><h2 className="reveal text-headline font-medium text-white">Kurumsal Web Sitesi Projenizi Konuşalım</h2><p className="mx-auto mt-4 max-w-2xl text-body leading-relaxed text-gray-300">İşletmenizi, mevcut web sitenizi ve ihtiyaç duyduğunuz sayfa ve işlevleri paylaşın. Size uygun proje kapsamını birlikte değerlendirelim.</p><LocalizedLink href="/start-project?service=corporate-website-design" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise px-6 py-3 font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950">Projenizi Konuşalım<ArrowRightIcon className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /></LocalizedLink></div>
      </section>
    </>
  );
}
