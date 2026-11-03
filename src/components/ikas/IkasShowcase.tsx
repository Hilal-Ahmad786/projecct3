// Real PakSoft ikas work, shared by the Turkish overview, portfolio and
// technology pages: the Canceviz Hurma store (built with ikas Studio) and the
// Canceviz AI Agent (an ikas app). Screenshots live in
// public/images/portfolio/canceviz; customer names in the inbox shot are
// blurred and the dashboard shows the app's demo data.

import Image from 'next/image';
import Link from '@/components/IntentLink';
import { ArrowRightIcon, ChatBubbleLeftRightIcon, ChartBarIcon, CheckIcon, Squares2X2Icon, SwatchIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { IkasExternalLink, IkasIcon } from './IkasMark';
import { IKAS_TR_ENQUIRY as enquiry } from './ikasTurkishCopy';

export const CANCEVIZ_STORE_URL = 'https://cancevizhurma.com';
export const IKAS_APP_DOCS_URL = 'https://builders.ikas.com/docs/admin-api';

const img = '/images/portfolio/canceviz';
const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

function Shot({ src, alt, w = 1440, h = 611, caption, className = '' }: { src: string; alt: string; w?: number; h?: number; caption?: string; className?: string }) {
  return (
    <figure data-ikas-reveal className={`m-0 ${className}`}>
      <div className="overflow-hidden rounded-xl border border-heritage-sand bg-white shadow-sm">
        <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-heritage-sand bg-heritage-ivory px-3 py-2"><span className="h-2 w-2 rounded-full bg-heritage-sand" /><span className="h-2 w-2 rounded-full bg-heritage-sand" /><span className="h-2 w-2 rounded-full bg-heritage-sand" /></div>
        <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 1024px) 560px, 100vw" className="h-auto w-full" />
      </div>
      {caption && <figcaption className="mt-2 text-xs leading-5 text-gray-500">{caption}</figcaption>}
    </figure>
  );
}

function Ticks({ items }: { items: string[] }) {
  return <ul className="mt-5 space-y-2">{items.map((item) => <li key={item} className="flex gap-2.5 text-sm leading-6 text-gray-700"><CheckIcon className="mt-1 h-4 w-4 shrink-0 text-heritage-turquoise-deep" aria-hidden="true" />{item}</li>)}</ul>;
}

const badge = 'inline-flex items-center gap-2 rounded-full border border-heritage-sand bg-white px-3 py-1 text-xs font-semibold text-gray-700';

/** Canceviz Hurma store case. `headingLevel` lets the portfolio nest it under its own H2. */
export function IkasStoreCase({ headingLevel = 2, id }: { headingLevel?: 2 | 3; id?: string }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div id={id} className="grid gap-10 scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
      <div>
        <span className={badge}><IkasIcon size={16} />ikas Studio ile geliştirildi</span>
        <H className={`mt-4 ${headingLevel === 2 ? 'text-headline' : 'text-title'} font-medium leading-tight text-gray-900 reveal`}>Canceviz Hurma: ikas Studio ile Geliştirdiğimiz E-Ticaret Mağazası</H>
        <p className="mt-4 text-body leading-relaxed text-gray-600">Hurma, kuruyemiş ve kuru meyve satan Canceviz Hurma&apos;nın online mağazasını ikas Studio üzerinde geliştirdik. Mağazanın tema ve bölüm yapısını, ürün yelpazesine ve kampanya dönemlerine göre yönetilebilecek şekilde kurguladık.</p>
        <Ticks items={[
          'ikas Studio ile tema ve özel bölüm geliştirme.',
          'Hurma, kuruyemiş ve kuru meyve kategorileri için menü ve vitrin yapısı.',
          'Kampanya şeridi, fırsat ürünleri ve indirim vitrinleri gibi satış alanları.',
          'Masaüstü ve mobilde tutarlı alışveriş arayüzü.',
        ]} />
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <IkasExternalLink href={CANCEVIZ_STORE_URL} className="text-sm">cancevizhurma.com&apos;u ziyaret edin</IkasExternalLink>
          <Link href={enquiry} className={`inline-flex items-center gap-2 text-sm font-semibold text-gray-900 underline-offset-4 hover:underline ${focus}`}>Benzer bir mağaza planlayalım<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="relative">
        <Shot src={`${img}/canceviz-hurma-ana-sayfa.webp`} alt="Canceviz Hurma ikas mağazasının ana sayfası: kategori menüsü, kampanya şeridi ve ürün kampanyası görseli" />
        <div className="absolute -left-3 top-[42%] hidden w-[30%] sm:block lg:-left-8">
          <div data-ikas-reveal className="overflow-hidden rounded-2xl border-4 border-gray-900 bg-white shadow-lg">
            <Image src={`${img}/canceviz-hurma-mobil.webp`} alt="Canceviz Hurma mağazasının mobil görünümü" width={606} height={611} sizes="180px" className="h-auto w-full" />
          </div>
        </div>
        <Shot className="mt-12 sm:ms-[22%] sm:mt-14" src={`${img}/canceviz-hurma-urunler.webp`} alt="Canceviz Hurma mağazasında fırsat ve flash ürün vitrinleri" caption="cancevizhurma.com · canlı mağazadan ekran görüntüleri" />
      </div>
    </div>
  );
}

const agentFeatures: { title: string; text: string; Icon: typeof ChartBarIcon }[] = [
  { title: 'Müşteri destek asistanı', text: 'Ürün, stok ve sipariş sorularını mağaza verisi ve bilgi bankasıyla yanıtlar; emin olmadığı konuyu ekibe aktarır.', Icon: ChatBubbleLeftRightIcon },
  { title: 'Mağaza Asistanı', text: '"Bugün kaç sipariş geldi?" veya "Son 7 günün ciro özeti nedir?" gibi soruları mağaza verisiyle yanıtlar.', Icon: ChartBarIcon },
  { title: 'Tek gelen kutusu', text: 'Web chat, Instagram, WhatsApp ve Messenger konuşmaları tek ekranda; gerektiğinde sohbeti ekip devralır.', Icon: Squares2X2Icon },
  { title: 'CRM ve hazır mesajlar', text: 'Konuşmalardan gelen müşteri adaylarını aşamalara göre takip eder, sık kullanılan yanıtları saklar.', Icon: UserGroupIcon },
  { title: 'Özelleştirilebilir web chat', text: 'Mağazaya eklenen sohbet balonunun renkleri, karşılama metni ve sosyal bağlantıları panelden ayarlanır.', Icon: SwatchIcon },
];

/** ikas app development + the Canceviz AI Agent case. */
export function IkasAppsSection({ id = 'ikas-uygulama-gelistirme', compact = false }: { id?: string; compact?: boolean }) {
  return (
    <section id={id} className="bg-heritage-ivory scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 cw-section">
        <span className={badge}><IkasIcon size={16} />ikas Uygulama Geliştirme</span>
        <h2 className="mt-4 reveal max-w-4xl text-headline font-medium leading-tight text-gray-900">ikas Mağazaları İçin Uygulama Geliştiriyoruz</h2>
        <p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">Mağaza kurulumunun yanında ikas için özel uygulamalar da geliştiriyoruz. Uygulamalar mağazaya ikas&apos;ın uygulama yetkilendirmesiyle bağlanır; ürün, sipariş ve müşteri verilerini ihtiyaç duyulan izinlerle okuyarak panelde yeni iş akışları sunar.</p>
        {!compact && (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Panel uygulamaları', 'Mağaza yönetimine eklenen raporlama, operasyon ve müşteri araçları.'],
              ['Yapay zekâ asistanları', 'Mağaza verisine bağlı müşteri desteği ve yönetici asistanları.'],
              ['Webhook otomasyonları', 'Sipariş, ürün veya müşteri olaylarında tetiklenen iş akışları.'],
              ['Vitrin eklentileri', 'Mağaza sayfalarına eklenen sohbet, form veya içerik bileşenleri.'],
            ].map(([title, text]) => (
              <li key={title} data-ikas-reveal className="ikas-card-motion rounded-xl border border-heritage-sand bg-white p-4">
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">{text}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-heritage-turquoise-deep">Örnek uygulama</p>
            <h3 className="mt-1 text-title font-semibold leading-tight text-gray-900">Canceviz AI Agent: ikas uygulaması olarak çalışan yapay zekâ asistanı</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">Canceviz Hurma için geliştirdiğimiz asistan, ikas paneline uygulama olarak eklenir ve mağazanın gerçek ürün ve sipariş verileriyle çalışır. Hem müşterilere hem de mağaza ekibine hizmet eden iki asistanı tek bir panelde toplar.</p>
            <ul className="mt-5 space-y-4">
              {agentFeatures.map(({ title, text, Icon }) => (
                <li key={title} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-heritage-turquoise-light"><Icon className="h-5 w-5 text-heritage-turquoise-deep" aria-hidden="true" /></span>
                  <span><span className="block text-sm font-semibold text-gray-900">{title}</span><span className="block text-sm leading-6 text-gray-600">{text}</span></span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-5 text-gray-500">Asistan mağaza verisini okur; fiyat, sipariş veya ayar değiştirmez. Başka bir müşterinin sipariş bilgisi, sipariş sahibi doğrulanmadan paylaşılmaz.</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href={enquiry} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep motion-reduce:transition-none ${focus}`}>ikas uygulama fikrimi paylaş<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>
              <IkasExternalLink href={IKAS_APP_DOCS_URL} className="text-sm">ikas geliştirici dokümantasyonu</IkasExternalLink>
            </div>
          </div>
          <div className="space-y-5">
            <Shot src={`${img}/canceviz-ai-agent-dashboard.webp`} alt="Canceviz AI Agent paneli: toplam konuşma, AI yanıtları ve kanal dağılımı grafikleri" caption="Panel görünümü · demo veriyle" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Shot src={`${img}/canceviz-ai-agent-magaza-asistani.webp`} alt="Mağaza Asistanı: sipariş ve ciro sorularıyla başlayan sohbet ekranı" caption="Mağaza Asistanı" />
              <Shot src={`${img}/canceviz-ai-agent-mesajlar.webp`} alt="Tek gelen kutusu: müşterinin 5 kilo hurma sorusuna yapay zekânın stok bilgisiyle yanıtı" caption="Gelen kutusu · müşteri adları gizlendi" />
            </div>
            {!compact && <Shot src={`${img}/canceviz-ai-agent-web-chat.webp`} alt="Web chat widget ayarları ve Canceviz Hurma sohbet balonunun canlı önizlemesi" caption="Web chat widget ayarları ve canlı önizleme" />}
          </div>
        </div>
      </div>
    </section>
  );
}
