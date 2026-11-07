import Link from '@/components/IntentLink';
import { trTitleCase } from '@/lib/tr-title-case';
import type { ReactNode } from 'react';
import {
  ArrowRightIcon, ArrowsRightLeftIcon, BuildingStorefrontIcon, CheckIcon, CreditCardIcon, PaintBrushIcon,
  Squares2X2Icon, SparklesIcon, TruckIcon, WrenchScrewdriverIcon, CalculatorIcon,
} from '@heroicons/react/24/outline';
import WhatsAppButton from '@/components/services/WhatsAppButton';
import { GirihHalo, HeritageParticles, H } from '@/components/services/hero-visuals/primitives';
import { IKAS_TR_BASE as base, IKAS_TR_ENQUIRY as enquiry, IKAS_TR_FAQ, IKAS_INTEGRATIONS_URL } from './ikasTurkishCopy';
import IkasMotionScope from './IkasMotionScope';
import { IkasExternalLink, IkasIcon } from './IkasMark';
import IkasVisual from './visuals/IkasVisual';
import type { IkasVisualName } from './visuals/generated';
import { IkasAppsSection, IkasStoreCase } from './IkasShowcase';
import PageJumpNav from '@/components/e-commerce/PageJumpNav';

// Server-rendered body (sections 02–14) of the Turkish ikas overview. The hero
// (01) stays in ServiceDetailClient so its animation is unchanged. Only the
// Turkish page uses this; other locales keep the generic service template.

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';
const textLink = `inline-flex items-center gap-2 text-sm font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`;

function A({ href, children, className = textLink }: { href: string; children: ReactNode; className?: string }) {
  // In-page anchors stay plain <a>; routes use Link (both render crawlable href).
  return href.startsWith('#') ? <a href={href} className={className}>{children}</a> : <Link href={href} className={className}>{children}</Link>;
}
function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return <p className="mt-6"><A href={href}>{children}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></A></p>;
}
function Section({ id, title, tone = 'white', children }: { id?: string; title: string; tone?: 'white' | 'gray' | 'ivory'; children: ReactNode }) {
  const bg = tone === 'gray' ? 'bg-background-gray' : tone === 'ivory' ? 'bg-heritage-ivory' : 'bg-white';
  return (
    <section id={id} className={`${bg} scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section">
        <h2 className="reveal max-w-4xl text-headline font-medium leading-tight text-gray-900">{trTitleCase(title)}</h2>
        {children}
      </div>
    </section>
  );
}
function Intro({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">{children}</p>;
}
function Table({ label, headers, rows }: { label: string; headers: [string, string]; rows: [string, string][] }) {
  return (
    <div tabIndex={0} role="region" aria-label={label} className="mt-6 overflow-x-auto rounded-xl border border-heritage-sand bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <thead className="bg-heritage-ivory"><tr>{headers.map((h) => <th key={h} scope="col" className="border-b border-heritage-sand px-4 py-3 font-semibold text-gray-900">{h}</th>)}</tr></thead>
        <tbody>{rows.map(([a, b]) => <tr key={a} className="even:bg-gray-50/70"><td className="border-b border-gray-100 px-4 py-3 align-top font-medium leading-6 text-gray-900">{a}</td><td className="border-b border-gray-100 px-4 py-3 align-top leading-6 text-gray-700">{b}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
function ButtonLink({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'light' }) {
  const cls = variant === 'primary'
    ? 'bg-heritage-turquoise text-white hover:bg-heritage-turquoise-deep'
    : 'bg-white text-gray-900 hover:bg-heritage-turquoise-light';
  return <Link href={href} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition-colors motion-reduce:transition-none ${cls} ${focus}`}>{children}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>;
}

const startingPoints = [
  { title: 'Yeni ikas e-ticaret sitesi kuracağım', text: 'Ürünlerinizi, kategori yapınızı, mağaza sayfalarını ve kullanacağınız ödeme/kargo akışlarını birlikte planlarız. İçerik hazırlığı ve hesap erişimleri için görevleri başlangıçta belirleriz.', link: 'Kurulum kapsamını incele', href: '#ikas-hizmetleri', Icon: BuildingStorefrontIcon },
  { title: 'Mevcut ikas mağazamı geliştireceğim', text: 'Mobil gezinme, ürün sunumu, kategori düzeni veya kampanya alanları gibi ihtiyaçları mevcut tema üzerinden değerlendiririz. Çalışan mağazanızdaki değişiklikleri test ve onay adımlarıyla planlarız.', link: 'Tema çalışmalarını incele', href: '#ikas-tema-tasarimi', Icon: SparklesIcon },
  { title: "Başka bir altyapıdan ikas'a geçeceğim", text: 'Taşınacak verileri, eski URL\'leri ve kritik bağlantıları önce envantere alırız. Örnek aktarım ve kontrol planıyla geçiş kapsamını netleştiririz.', link: 'Geçiş planını incele', href: '#ikasa-gecis', Icon: ArrowsRightLeftIcon },
];

const services = [
  { title: 'Mağaza kurulumu ve temel yapılandırma', text: 'Alan adı bağlantısı, mağaza bilgileri, menüler ve gerekli içerik sayfaları için kurulum planı oluştururuz. Platform paketinizin sunduğu özelliklerle ihtiyaçlarınızın eşleşmesini kontrol ederiz.', Icon: BuildingStorefrontIcon , glyph: 'glyph-setup' as IkasVisualName },
  { title: 'Tema tasarımı ve özelleştirme', text: 'Ana sayfa, kategori ve ürün sunumunu marka kimliğinize göre düzenleriz. Hazır temanın uyarlanması ile özel bölüm veya bileşen geliştirilmesini ayrı değerlendiririz.', Icon: PaintBrushIcon , glyph: 'glyph-theme' as IkasVisualName },
  { title: 'Ürün, kategori ve varyant düzeni', text: 'Ürün bilgilerini, kategori ilişkilerini, varyantları ve görselleri düzenli bir katalog yapısında ele alırız. Aktarım öncesinde örnek veri üzerinden eksikleri ve eşleştirmeleri belirleriz.', Icon: Squares2X2Icon , glyph: 'glyph-catalog' as IkasVisualName },
  { title: 'Ödeme, kargo ve iş sistemi bağlantıları', text: 'İhtiyaç duyulan servisleri mevcut ikas imkanları ve sağlayıcı koşulları üzerinden inceleriz. Bağlantının kurulmasıyla birlikte hangi sipariş ve veri akışlarının kontrol edileceğini tanımlarız.', Icon: CreditCardIcon , glyph: 'glyph-integrations' as IkasVisualName },
  { title: 'Platform geçişi ve veri aktarımı', text: 'Kaynak sistemdeki verileri ve yeni mağazada kullanılacak alanları eşleştiririz. Geçişin ürün, içerik, URL ve bağlantı kapsamını yazılı bir planla yönetiriz.', Icon: ArrowsRightLeftIcon , glyph: 'glyph-migration' as IkasVisualName },
  { title: 'Test, eğitim ve yayın sonrası destek', text: 'Kararlaştırılan alışveriş akışlarını kontrol eder; mağaza yönetimini ve yapılan ayarları ekibinize aktarırız. Yayın sonrası desteğin süresini ve kapsamını teklifte ayrıca belirtiriz.', Icon: WrenchScrewdriverIcon , glyph: 'glyph-launch' as IkasVisualName },
];

const themeWork = [
  { title: 'Mevcut temayı markanıza uyarlama', text: 'Renk, tipografi, içerik alanları ve sayfa sıralamasını mevcut temanın imkanlarına göre düzenleriz. Hangi değişikliklerin tema ayarlarıyla yapılabileceğini, hangilerinin geliştirme gerektirdiğini ayırırız.' },
  { title: 'Özel bölüm ve bileşen ihtiyaçları', text: 'Markanıza özgü içerik blokları veya ürün anlatımları gerekiyorsa mevcut tema ortamını inceleyerek çözüm öneririz. Yeni bir tema ile mevcut temanın geliştirilmesi için aynı teknik yöntemi varsaymayız.' },
  { title: 'Ekibinizin düzenleyebileceği içerik alanları', text: 'Banner, metin, görsel ve bölüm ayarları gibi günlük ihtiyaçların mağaza ekibiniz tarafından yönetilebilmesini hedefleriz. Hangi alanların panelden düzenleneceğini devir sırasında gösteririz.' },
];

const integrations = [
  { title: 'Ödeme ve sipariş durumları', text: 'Sağlayıcı hesabı, platform uygunluğu ve test imkanlarını değerlendiririz. Başarılı ve başarısız ödeme gibi kararlaştırılan senaryolarda sipariş durumlarını kontrol ederiz.', Icon: CreditCardIcon },
  { title: 'Kargo ve takip bilgisi', text: 'Gönderi oluşturma, takip bilgisinin mağazaya dönmesi ve operasyon ekibinizin yapacağı işlemleri netleştiririz.', Icon: TruckIcon },
  { title: 'Muhasebe, ERP ve pazar yeri bağlantıları', text: 'Stok, fiyat, sipariş veya fatura verilerinden hangilerinin hangi yönde aktarılacağını belirleriz. Hazır uygulama ile özel bağlantı ihtiyacını ayrı inceleriz.', Icon: CalculatorIcon },
];

const deliverables = [
  'Kararlaştırılan sayfa ve tema düzenlemeleri.',
  'Kapsam dahilindeki ürün ve kategori aktarımının kontrol özeti.',
  'Yapılandırılan entegrasyonların listesi ve kontrol edilen akışlar.',
  'Geçiş varsa URL eşleştirme ve yönlendirme çalışma listesi.',
  'Mağaza yönetiminde ihtiyaç duyacağınız alanların anlatımı.',
  'Projede yapılan ayarlar, açık kalan işler ve destek sorumluluklarının özeti.',
];

const steps = [
  { title: 'Mevcut durumu ve ihtiyaçları anlama', text: 'Ürün yapınızı, hedef pazarınızı, mevcut mağazanızı ve ekibinizin iş akışını inceleriz.' },
  { title: 'Kapsamı ve sorumlulukları belirleme', text: 'Sayfaları, aktarılacak verileri, entegrasyonları, içerik görevlerini ve onay aşamalarını netleştiririz.' },
  { title: 'Tasarım ve mağaza hazırlığı', text: 'Onaylanan plan doğrultusunda tema, içerik, katalog ve bağlantılar üzerinde çalışırız.' },
  { title: 'Test ve yayın hazırlığı', text: 'Mobil sayfaları ve kararlaştırılan alışveriş akışlarını kontrol eder; yayın öncesi eksikleri birlikte değerlendiririz.' },
  { title: 'Yayın, eğitim ve devir', text: 'Yayın adımlarını uygular, yapılan işleri ekibinize aktarır ve anlaşmalı destek dönemini başlatırız.' },
];

// Portföy points at the real Canceviz Hurma store + AI agent app (IkasShowcase).
const detailPages = [
  { title: 'ikas site kurma özellikleri', text: 'Mağaza, katalog, tasarım ve entegrasyon çalışmalarının kapsamı.', href: `${base}/ozellikler` },
  { title: 'ikas tema ve yazılım geliştirme', text: 'Tema ortamı, uygulama ve geliştirme yönteminin nasıl belirlendiği.', href: `${base}/teknoloji` },
  { title: 'ikas kurulum ve site taşıma süreci', text: 'Keşif, uygulama, kontrol ve devir aşamaları.', href: `${base}/surec` },
  { title: 'ikas ile yapılan siteler', text: 'Canceviz Hurma mağazası ve ikas uygulama örneği.', href: `${base}/portfoy` },
  { title: 'ikas kurulum fiyatları', text: 'Teklif kapsamını ve bütçeyi etkileyen işler.', href: `${base}/fiyatlandirma` },
  { title: 'ikas rehberleri', text: 'ikas kurulum ve tema tasarımı yazıları.', href: `${base}/blog` },
  { title: 'ikas SSS', text: 'Kurulum ve geliştirme hakkında sık sorulan sorular.', href: `${base}/sss` },
];

// "ikas yazılım" searchers are often still choosing a platform: a neutral fit check.
const platformFit = {
  ikas: ['Standart sepet, ödeme ve kargo akışlarıyla satış yapacaksanız.', 'Ürün, kampanya ve içerikleri ekibinizle panelden yönetmek istiyorsanız.', 'İhtiyaçlarınız hazır entegrasyon ve uygulamalarla karşılanabiliyorsa.', 'Sunucu, güvenlik güncellemesi ve barındırma işlerini üstlenmek istemiyorsanız.'],
  custom: ['Fiyat, bayi veya sipariş kurallarınız standart akışların dışındaysa.', 'Hazır uygulamaların karşılamadığı bir veri akışına ihtiyacınız varsa.', 'Mağaza verisiyle çalışan özel bir panel, otomasyon veya asistan istiyorsanız.'],
};

const relatedServices = [
  { title: 'E-Ticaret Çözümleri', text: 'Altyapı seçeneklerini ve genel mağaza geliştirme kapsamını karşılaştırın.', href: '/tr/hizmetler/e-commerce' },
  { title: 'E-Ticaret Tasarımı', text: 'Ürün, kategori ve mobil alışveriş arayüzlerini planlayın.', href: '/tr/hizmetler/ecommerce-design' },
  { title: 'Ödeme Entegrasyonu', text: 'Ödeme bağlantısı ve sipariş durumları için kapsamı değerlendirin.', href: '/tr/hizmetler/payment-gateway-integration' },
  { title: 'Shopify Geliştirme', text: 'Alternatif bir platform üzerinde kurulum ve geliştirme hizmetlerini inceleyin.', href: '/tr/hizmetler/shopify-development' },
  { title: 'WooCommerce Geliştirme', text: 'WordPress tabanlı mağaza ihtiyaçlarını değerlendirin.', href: '/tr/hizmetler/woocommerce-development' },
  { title: 'Özel E-Ticaret', text: 'Hazır platformlara uyumu ayrıca değerlendirilmesi gereken iş kurallarını görüşün.', href: '/tr/hizmetler/custom-ecommerce' },
];

// Coded, explicitly labelled layout sketch (no client screenshots exist for
// this page); it must never read as a customer project.
function ThemeLayoutSketch() {
  const bar = 'rounded-full bg-heritage-sand';
  return (
    <figure className="reveal m-0">
      <div aria-hidden="true" className="ikas-theme-demo relative rounded-2xl border border-heritage-sand bg-white p-4 shadow-sm sm:p-6" data-ikas-reveal>
        <div className="overflow-hidden rounded-lg border border-heritage-sand">
          <div className="flex items-center gap-1.5 border-b border-heritage-sand bg-heritage-ivory px-3 py-2"><span className="h-2 w-2 rounded-full bg-heritage-sand" /><span className="h-2 w-2 rounded-full bg-heritage-sand" /><span className="h-2 w-2 rounded-full bg-heritage-sand" /><span className="ms-3 flex w-1/3 items-center gap-1.5 rounded-full bg-white px-1.5 py-0.5"><IkasIcon size={10} /><span className={`h-1.5 flex-1 ${bar}`} /></span></div>
          <div className="space-y-3 p-3 sm:p-4">
            <div className="flex items-center justify-between"><span className="h-3 w-16 rounded bg-heritage-turquoise-deep/80" /><span className="flex gap-2"><span className={`h-2 w-10 ${bar}`} /><span className={`h-2 w-10 ${bar}`} /><span className={`h-2 w-10 ${bar}`} /></span></div>
            <div className="ikas-theme-banner flex h-20 items-end rounded-md bg-heritage-turquoise-light p-3 sm:h-24"><span className="h-3 w-1/2 rounded bg-heritage-turquoise-deep/70" /></div>
            <div className="grid grid-cols-4 gap-2">{[0, 1, 2, 3].map((i) => <div key={i} className="ikas-theme-product space-y-1.5"><div className="aspect-square rounded bg-heritage-ivory" /><span className={`block h-1.5 w-4/5 ${bar}`} /><span className="block h-1.5 w-1/2 rounded-full bg-heritage-turquoise/60" /></div>)}</div>
          </div>
        </div>
        <div className="ikas-theme-content absolute -bottom-4 end-4 w-[5.5rem] overflow-hidden rounded-xl border-4 border-gray-900 bg-white shadow-lg sm:end-6 sm:w-24">
          <div className="space-y-1.5 p-2"><span className="block h-2 w-8 rounded bg-heritage-turquoise-deep/80" /><div className="h-10 rounded bg-heritage-turquoise-light" /><div className="grid grid-cols-2 gap-1">{[0, 1, 2, 3].map((i) => <div key={i} className="aspect-square rounded bg-heritage-ivory" />)}</div><span className="block h-3 rounded bg-heritage-turquoise" /></div>
        </div>
      </div>
      <figcaption className="mt-7 text-xs leading-5 text-gray-600">Temsili mağaza düzeni · masaüstü ve mobil görünüm örneği</figcaption>
    </figure>
  );
}

const jumpLinks = [
  { href: '#ikas-hizmetleri', label: 'Hizmetler' },
  { href: '#ikas-yazilim', label: 'ikas mı, özel yazılım mı?' },
  { href: '#ikas-tema-tasarimi', label: 'Tema tasarımı' },
  { href: '#ikas-magaza-ornegi', label: 'Örnek site' },
  { href: '#ikas-uygulama-gelistirme', label: 'Uygulamalar' },
  { href: '#ikasa-gecis', label: 'Site taşıma' },
  { href: '#ikas-entegrasyon', label: 'Entegrasyonlar' },
  { href: '#ikas-fiyat', label: 'Fiyat' },
  { href: '#ikas-sss', label: 'SSS' },
];

export default function IkasTurkishOverviewBody() {
  return <>
    <IkasMotionScope />
    <PageJumpNav items={jumpLinks} mark={<IkasIcon size={14} />} />

    {/* 02 — starting point */}
    <Section title="ikas site kurma projenizde nereden başlayalım?" tone="gray">
      <Intro>İlk kez ikas e-ticaret sitesi açmak, başka bir platformdan taşınmak ve mevcut ikas mağazasını geliştirmek farklı hazırlıklar gerektirir. Çalışmaya mevcut durumunuza göre başlarız.</Intro>
      <IkasVisual name="start-paths" className="mx-auto mt-8 hidden max-w-2xl md:block" />
      <div className="reveal-group mt-6 grid gap-4 md:grid-cols-3">
        {startingPoints.map(({ title, text, link, href, Icon }) => (
          <article key={title} data-ikas-reveal className="ikas-card-motion flex h-full flex-col rounded-xl border border-heritage-sand bg-white p-5">
            <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-lg bg-heritage-turquoise-light"><Icon className="ikas-motion-icon h-6 w-6 text-heritage-turquoise-deep" /></span>
            <h3 className="mt-4 text-title font-medium text-gray-900">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">{text}</p>
            <A href={href} className={`mt-4 ${textLink}`}>{link}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></A>
          </article>
        ))}
      </div>
    </Section>

    {/* 03 — services */}
    <Section id="ikas-hizmetleri" title="ikas e-ticaret sitesi için neler yapıyoruz?">
      <Intro>ikas site kurma hizmetinin kapsamı mağazanızın mevcut durumuna göre belirlenir. Aşağıdaki işler teklifinizde ayrı teslim kalemleri olarak tanımlanabilir.</Intro>
      <div className="reveal-group mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, text, glyph }) => (
          <article key={title} data-ikas-reveal className="ikas-card-motion h-full rounded-xl border border-heritage-sand bg-white p-5">
            <IkasVisual name={glyph} className="h-14 w-14" />
            <h3 className="mt-4 text-base font-semibold leading-snug text-gray-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
          </article>
        ))}
      </div>
      <MoreLink href={`${base}/ozellikler`}>ikas site kurma özelliklerini ayrıntılı inceleyin</MoreLink>
    </Section>

    {/* 03b — platform fit ("ikas yazılım") */}
    <Section id="ikas-yazilim" title="ikas yazılımı mı, özel e-ticaret yazılımı mı?" tone="gray">
      <Intro>ikas, abonelikle kullanılan hazır bir e-ticaret yazılımıdır; altyapı ve platform güncellemeleri ikas tarafından yönetilir. Özel yazılımda ise iş kurallarınız için ayrı geliştirme yapılır. Hangisinin uygun olduğunu ürün yapınıza ve operasyonunuza göre birlikte değerlendiririz.</Intro>
      <div className="reveal-group mt-6 grid gap-4 lg:grid-cols-2">
        <article data-ikas-reveal className="ikas-card-motion rounded-xl border-2 border-heritage-turquoise/40 bg-white p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-title font-medium text-gray-900"><IkasIcon size={22} />ikas genellikle uygun olduğunda</h3>
          <ul className="mt-4 space-y-3">{platformFit.ikas.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-gray-700"><CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />{item}</li>)}</ul>
        </article>
        <article data-ikas-reveal className="ikas-card-motion rounded-xl border border-heritage-sand bg-white p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-title font-medium text-gray-900"><WrenchScrewdriverIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />Ek geliştirme gerektiğinde</h3>
          <ul className="mt-4 space-y-3">{platformFit.custom.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-gray-700"><ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />{item}</li>)}</ul>
          <p className="mt-4 text-sm leading-6 text-gray-600">Bu ihtiyaçlar her zaman platform değişikliği gerektirmez: <A href="#ikas-uygulama-gelistirme">özel bir ikas uygulaması</A> çoğu durumda yeterli olabilir. Tamamen farklı iş kuralları için <A href="/tr/hizmetler/custom-ecommerce">özel e-ticaret yazılımını</A> ayrıca değerlendiririz.</p>
        </article>
      </div>
    </Section>

    {/* 04 — theme design */}
    <section id="ikas-tema-tasarimi" className="bg-heritage-ivory scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]">
      <div className="mx-auto grid max-w-[1200px] gap-x-12 gap-y-10 px-4 sm:px-6 cw-section lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div>
          <h2 className="reveal max-w-4xl text-headline font-medium leading-tight text-gray-900">ikas Tema Tasarımı: Görünüm Kadar Yönetilebilirlik de Önemli</h2>
          <Intro>Mağaza tasarımı yalnızca renk ve banner değişikliğinden oluşmaz. Müşterinizin kategoriyi bulması, ürün seçeneklerini anlaması ve mobilde alışverişi sürdürebilmesi için sayfa yapısını birlikte değerlendiririz.</Intro>
          <div className="reveal-group mt-6 space-y-5">
            {themeWork.map(({ title, text }) => (
              <div key={title} className="border-s-2 border-heritage-turquoise ps-4">
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
          <MoreLink href={`${base}/teknoloji`}>Tema ve geliştirme yaklaşımımızı inceleyin</MoreLink>
        </div>
        <ThemeLayoutSketch />
      </div>
    </section>

    {/* 04b — real ikas Studio store ("ikas ile yapılan siteler") */}
    <section className="bg-background-gray"><div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section"><IkasStoreCase id="ikas-magaza-ornegi" /></div></section>

    {/* 04c — ikas app development + AI agent (kept beside the real store case) */}
    <IkasAppsSection />

    {/* 05 — migration ("ikas site taşıma") */}
    <Section id="ikasa-gecis" title="ikas site taşıma: geçişi veri ve URL planıyla yönetelim">
      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <p className="text-body leading-relaxed text-gray-600">Mevcut mağazanızı ikas&apos;a taşırken yalnızca yeni tasarımı değil, ürün verisini ve ziyaretçilerinizin kullandığı bağlantıları da ele almak gerekir. Kaynak altyapının dışa aktarma imkanlarını ve hedef mağazanın desteklediği alanları önceden inceleriz.</p>
          <p className="mt-4 text-sm leading-6 text-gray-600">Aktarımın kapsamını örnek verilerle doğrularız. Müşteri hesapları, şifreler, geçmiş siparişler veya bütün alanların otomatik taşınacağını varsaymayız. URL planı ve yayın sonrası kontroller yapılır; sıralamaların değişmeyeceği veya kesintisiz geçiş garantisi verilmez.</p>
          <MoreLink href={`${base}/surec`}>ikas site taşıma ve yayın adımlarını görün</MoreLink>
        </div>
        <div className="rounded-xl border border-heritage-sand bg-white p-4 sm:p-6">
          <IkasVisual name="migration-map" label="Temsili geçiş akışı: eski mağazadaki ürün kayıtları ikas mağazasına aktarılıyor, eski URL'ler yeni adreslerle eşleştiriliyor" />
          <p className="mt-3 text-xs leading-5 text-gray-600">Örnek gösterim · Ürün kayıtlarının aktarımı ve URL eşleştirmesi; gerçek bir aktarım kaydı değildir.</p>
        </div>
      </div>
      <Table label="ikas site taşımada netleştirilecek konular" headers={['Başlık', 'Birlikte netleştireceğimiz konu']} rows={[
        ['Ürün verisi', 'Ürün kodları, varyantlar, fiyatlar, görseller ve kategori ilişkileri'],
        ['İçerik', 'Taşınacak sayfalar, açıklamalar ve eksik görseller'],
        ["Eski URL'ler", 'Korunabilecek adresler ve gereken yönlendirme eşleştirmeleri'],
        ['Geçmiş kayıtlar', 'Müşteri ve sipariş verilerinin taşınabilirliği ve erişim yetkileri'],
        ['Yayın geçişi', 'Son veri güncellemesi, kontrol sorumluları ve alan adı adımları'],
      ]} />
    </Section>

    {/* 06 — integrations */}
    <Section id="ikas-entegrasyon" title="ikas entegrasyonlarını günlük operasyonunuza göre planlıyoruz" tone="gray">
      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
        <div>
          <p className="text-body leading-relaxed text-gray-600">Ödeme almak, siparişi kargoya aktarmak veya stok bilgisini başka bir sistemle paylaşmak farklı bağlantılar gerektirir. Kullanacağınız servisleri ve veri akışında hangi sistemin esas alınacağını başlangıçta belirleriz.</p>
          <ul className="reveal-group mt-6 space-y-3">
            {integrations.map(({ title, text, Icon }) => (
              <li key={title} data-ikas-reveal className="ikas-card-motion flex gap-4 rounded-xl border border-heritage-sand bg-white p-4">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-heritage-turquoise-light"><Icon className="ikas-motion-icon h-5 w-5 text-heritage-turquoise-deep" /></span>
                <div><h3 className="text-base font-semibold text-gray-900">{title}</h3><p className="mt-1 text-sm leading-6 text-gray-600">{text}</p></div>
              </li>
            ))}
          </ul>
        </div>
        <IkasVisual name="integration-hub" loop className="mx-auto w-full max-w-xl" label="Temsili entegrasyon akışı: ikas mağazası ödeme, kargo, ERP ve pazar yeri sistemlerine bağlanıyor" slotLabels={{ 'slot-payment': 'Ödeme', 'slot-cargo': 'Kargo', 'slot-erp': 'Muhasebe / ERP', 'slot-marketplace': 'Pazar yeri' }} />
      </div>
      <p className="mt-6 max-w-3xl text-xs leading-5 text-gray-600">Uygulama uygunluğu, servis sözleşmeleri ve ek ücretler seçilen çözümün güncel koşullarına bağlıdır. PakSoft&apos;un kurulum hizmeti, üçüncü taraf hizmet ücretlerini kendiliğinden kapsamaz. Platformun güncel entegrasyon kategorilerini <IkasExternalLink href={IKAS_INTEGRATIONS_URL}>ikas entegrasyonlar sayfasında</IkasExternalLink> inceleyebilirsiniz.</p>
      <div className="mt-6"><ButtonLink href={enquiry}>Entegrasyon kapsamını görüşelim</ButtonLink></div>
    </Section>

    {/* 07 — SEO & measurement */}
    <Section title="ikas e-ticaret sitenizde SEO hazırlığı ve ölçümleme">
      <div className="reveal-group mt-6 grid max-w-5xl gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-heritage-sand bg-white p-5"><h3 className="text-base font-semibold text-gray-900">Arama görünürlüğü</h3><p className="mt-2 text-sm leading-6 text-gray-600">Kategori yapısı, ürün içeriği, sayfa başlıkları ve geçişteki URL eşleştirmelerini mağaza hazırlığının parçası olarak değerlendiririz. Teknik imkanlar doğrultusunda gerekli arama görünürlüğü ayarlarını kontrol ederiz.</p></div>
        <div className="rounded-xl border border-heritage-sand bg-white p-5"><h3 className="text-base font-semibold text-gray-900">Ölçümleme</h3><p className="mt-2 text-sm leading-6 text-gray-600">Hangi olayların takip edileceğini ve hangi hesapların kullanılacağını başlangıçta belirleriz. Ziyaret, ürün inceleme ve satın alma olaylarını ayırarak test planı oluştururuz; satın alma olayının tekrar sayılmamasını kontrol ederiz.</p></div>
      </div>
      <p className="mt-5 max-w-3xl rounded-lg border border-heritage-sand bg-heritage-ivory px-4 py-3 text-sm leading-6 text-gray-700">Temel kurulum, sürekli SEO içerik üretimi ve reklam yönetimi farklı hizmet kapsamlarıdır. Hangi işlerin dahil olacağı teklifinizde açıkça belirtilir.</p>
      <Link href="/tr/hizmetler/ecommerce-seo" className={`${textLink} mt-4`}>ikas mağazaları için E-Ticaret SEO hizmetini inceleyin<ArrowRightIcon className="h-4 w-4" aria-hidden="true"/></Link>
    </Section>

    {/* 08 — deliverables */}
    <Section title="ikas projesi sonunda neleri teslim alırsınız?" tone="ivory">
      <Intro>Teslim listesi teklifinizdeki kapsamla birlikte hazırlanır. Çalışmanın sonunda yalnızca mağazanın bağlantısını değil, yapılan işleri ve ekibinizin kullanacağı bilgileri de aktarırız.</Intro>
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
      <IkasVisual name="handover-pack" className="mx-auto w-full max-w-sm" />
      <ul className="reveal-group grid gap-3 sm:grid-cols-2">
        {deliverables.map((item) => (
          <li key={item} className="flex gap-3 rounded-xl border border-heritage-sand bg-white p-4 text-sm leading-6 text-gray-700">
            <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />{item}
          </li>
        ))}
      </ul>
      </div>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-gray-600">Hesap sahipliği ve erişim yetkileri işletmenizin kontrolünde olacak şekilde planlanır. Kullanılan tema, uygulama ve geliştirmelerin lisans veya kullanım koşulları ayrıca açıklanır.</p>
    </Section>

    {/* 09 — process */}
    <Section title="ikas site kurma projenizi beş adımda ilerletiyoruz">
      <IkasVisual name="process-rail" className="mt-8 hidden lg:block" />
      <ol className="reveal-group mt-6 grid gap-x-7 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map(({ title, text }, i) => (
          <li key={title} className="border-t-2 border-heritage-turquoise py-4">
            <span className="text-sm font-semibold text-heritage-turquoise-deep">{i + 1}.</span>
            <h3 className="mt-1 text-base font-semibold leading-snug text-gray-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
          </li>
        ))}
      </ol>
      <MoreLink href={`${base}/surec`}>ikas proje sürecinin ayrıntıları</MoreLink>
    </Section>

    {/* 10 — pricing factors */}
    <Section id="ikas-fiyat" title="ikas site kurma fiyatını neler belirler?" tone="gray">
      <Intro>Fiyat; yeni kurulum veya mevcut mağaza çalışması olmasına, tema ihtiyacına, ürün verisinin durumuna ve entegrasyon kapsamına göre belirlenir. İlk görüşmede işleri ayırarak teklifin hangi teslimleri kapsadığını açıklarız.</Intro>
      <Table label="PakSoft hizmet kapsamı ve üçüncü taraf giderleri" headers={['PakSoft hizmet kapsamı', 'Ayrı değerlendirilecek üçüncü taraf giderleri']} rows={[
        ['Kurulum, tema çalışması ve sayfa hazırlığı', 'ikas paket/abonelik bedeli'],
        ['Veri aktarımı ve kontrol', 'Kullanılacak uygulama ve lisanslar'],
        ['Entegrasyon kurulumu veya geliştirme', 'Ödeme, kargo ve ilgili sağlayıcı ücretleri'],
        ['Anlaşmalı eğitim ve teknik destek', 'Ek servis ve kullanım bedelleri'],
      ]} />
      <p className="mt-5 max-w-3xl text-sm leading-6 text-gray-600">Başlangıçta yalnızca ihtiyaç duyduğunuz işleri planlayabilir, sonraki geliştirmeleri ayrı bir aşamaya bırakabiliriz. Dahil işler, kapsam dışı talepler ve düzenli giderler teklifinizde ayrıştırılır.</p>
      <MoreLink href={`${base}/fiyatlandirma`}>ikas hizmet fiyatlandırmasını inceleyin</MoreLink>
    </Section>

    {/* 11 — FAQ (visible text matches the FAQPage JSON-LD) */}
    <Section id="ikas-sss" title="ikas e-ticaret sitesi hakkında sık sorulan sorular" tone="ivory">
      <div className="mt-6 divide-y divide-heritage-sand border-y border-heritage-sand">
        {IKAS_TR_FAQ.map(({ question, answer }) => (
          <div key={question} className="py-5">
            <h3 className="text-base font-semibold text-gray-900">{question}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">{answer}</p>
          </div>
        ))}
      </div>
      <MoreLink href={`${base}/sss`}>Tüm ikas sorularını inceleyin</MoreLink>
    </Section>

    {/* 12 — detail pages + related services in one place */}
    <Section title="ikas hizmetinin ayrıntıları ve ilgili hizmetler">
      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">ikas sayfaları</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {detailPages.map(({ title, text, href }) => (
              <li key={href}>
                <Link href={href} className={`group flex h-full flex-col rounded-lg border border-heritage-sand bg-white p-4 transition-colors hover:border-heritage-turquoise motion-reduce:transition-none ${focus}`}>
                  <span className="flex items-center justify-between gap-2 font-semibold text-gray-900">{trTitleCase(title)}<ArrowRightIcon className="h-4 w-4 shrink-0 text-heritage-turquoise-deep transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" /></span>
                  <span className="mt-1 text-sm leading-6 text-gray-600">{text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">İlgili e-ticaret hizmetleri</h3>
          <ul className="mt-3 divide-y divide-heritage-sand rounded-xl border border-heritage-sand bg-heritage-ivory/50">
            {relatedServices.map(({ title, text, href }) => (
              <li key={href}>
                <Link href={href} className={`group flex items-start justify-between gap-4 p-4 transition-colors hover:bg-white motion-reduce:transition-none ${focus}`}>
                  <span><span className="block font-semibold text-gray-900 group-hover:text-heritage-turquoise-deep">{title}</span><span className="mt-1 block text-sm leading-6 text-gray-600">{text}</span></span>
                  <ArrowRightIcon className="mt-1 h-4 w-4 shrink-0 text-heritage-turquoise-deep transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>

    {/* 13 — closing CTA (no response-time promises) */}
    <section className="relative isolate overflow-hidden bg-gray-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 motion-reduce:hidden">
        <GirihHalo size={480} color={H.saffron} opacity={0.45} /><HeritageParticles count={10} colors={[H.turquoise, H.saffron, H.terracotta]} />
      </div>
      <div className="mx-auto max-w-3xl px-4 cw-section text-center">
        <span aria-hidden="true" className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg"><IkasIcon size={34} /></span>
        <h2 className="mt-5 text-headline font-medium">ikas E-Ticaret Siteniz İçin İlk Adımı Birlikte Belirleyelim</h2>
        <p className="mt-4 text-body leading-relaxed text-gray-300">Yeni ikas sitesi mi kuruyorsunuz, mevcut mağazanızı mı geliştiriyor ya da taşıyorsunuz? Ürün yapınızı, mevcut bağlantınızı ve ihtiyaçlarınızı paylaşın; kurulum, tasarım veya geçiş kapsamını birlikte değerlendirelim.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={enquiry}>ikas Projemi Paylaş</ButtonLink>
          <WhatsAppButton source="ikas_overview_closing" variant="solid" size="md" className="min-h-11" label="WhatsApp'tan Görüşelim" />
        </div>
        <p className="mt-4 text-sm text-gray-400">Mevcut sitenizin bağlantısı ve örnek ürün verileri kapsamı değerlendirmemize yardımcı olur.</p>
      </div>
    </section>
  </>;
}
