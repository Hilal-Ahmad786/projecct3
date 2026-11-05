import type { CSSProperties, ReactNode } from 'react';
import {
  ArrowUturnLeftIcon, BanknotesIcon, BuildingStorefrontIcon, CheckCircleIcon, ClipboardDocumentCheckIcon,
  LockClosedIcon, ShieldCheckIcon, ShoppingCartIcon, TruckIcon, UserIcon,
} from '@heroicons/react/24/outline';

// Pazaryeri illustrations as HTML scenes: labels stay real text, the final
// state is the server-rendered markup, and motion is opt-in through
// IkasMotionScope (`ikas-visible` once on the figure, `ikas-in-view` on the
// inner `data-ikas-loop` wrapper for ambient pulses). CSS: "marketplace
// scenes" in globals.css. All amounts follow the blog example (A: 1.000 TL /
// %10, B: 600 TL / %15).

const step = (i: number) => ({ '--mp-i': i } as CSSProperties);

function Scene({ label, className = '', children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <figure data-ikas-reveal="" role="img" aria-label={label} className={`mp-scene relative m-0 w-full ${className}`}>
      <div data-ikas-loop="" aria-hidden="true" className="rounded-2xl border border-heritage-sand bg-white p-4 shadow-[0_18px_40px_-24px_rgba(18,25,38,0.35)] sm:p-5">{children}</div>
    </figure>
  );
}

function Status({ tone, children, i = 0 }: { tone: 'turquoise' | 'amber' | 'gray' | 'rose'; children: ReactNode; i?: number }) {
  const cls = { turquoise: 'bg-heritage-turquoise-light text-heritage-turquoise-deep', amber: 'bg-amber-50 text-amber-800', gray: 'bg-gray-100 text-gray-700', rose: 'bg-rose-50 text-rose-700' }[tone];
  const dot = { turquoise: 'bg-heritage-turquoise', amber: 'bg-amber-500', gray: 'bg-gray-400', rose: 'bg-rose-500' }[tone];
  return <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${cls}`}><span className={`mp-pulse h-1.5 w-1.5 rounded-full ${dot}`} style={step(i)} />{children}</span>;
}

const Caption = ({ children }: { children: ReactNode }) => <p className="mt-3 text-center text-[11px] text-gray-500">{children}</p>;

/** Floating storefront tile over a hero scene (the ikas/Shopify logo-tile pattern). */
export function MarketplaceHeroScene({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full max-w-xl">
      {children}
      <div aria-hidden="true" data-ikas-loop className="ikas-badge-float absolute -left-2 -top-14 z-20 rounded-[20px] bg-white p-3 shadow-[0_12px_30px_rgba(18,25,38,0.18)] ring-1 ring-black/5 sm:-left-6">
        <BuildingStorefrontIcon className="h-10 w-10 text-heritage-turquoise-deep sm:h-12 sm:w-12" />
      </div>
    </div>
  );
}

/** One basket, two sellers: the cart splits into per-seller order lines. */
export function OrderSplitScene({ className }: { className?: string }) {
  return (
    <Scene className={className} label="Temsili sipariş akışı: alıcının tek sepeti Satıcı A ve Satıcı B için iki ayrı sipariş kalemine ayrılıyor; her satıcı kendi gönderisini hazırlıyor">
      <div className="grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1.1fr)]">
        <div className="mp-step rounded-xl border border-heritage-sand bg-heritage-ivory p-3" style={step(0)}>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900"><ShoppingCartIcon className="h-4 w-4 text-heritage-turquoise-deep" />Alıcının sepeti</div>
          {[['Satıcı A', '1.000 TL'], ['Satıcı B', '600 TL']].map(([seller, price]) => (
            <div key={seller} className="mt-2 flex items-center gap-2 rounded-lg bg-white px-2.5 py-2">
              <span className="h-7 w-7 shrink-0 rounded-md bg-heritage-turquoise-light" />
              <span className="min-w-0 flex-1"><span className="block text-xs font-medium text-gray-800">Ürün</span><span className="block text-[11px] text-gray-500">{seller}</span></span>
              <span className="text-xs font-semibold text-gray-900">{price}</span>
            </div>
          ))}
          <div className="mt-2 flex justify-between border-t border-heritage-sand pt-2 text-xs"><span className="text-gray-600">Tek ödeme</span><span className="font-semibold text-gray-900">1.600 TL</span></div>
        </div>
        <svg viewBox="0 0 40 120" className="mx-auto hidden h-28 w-10 sm:block" fill="none">
          <path className="mp-draw" style={step(1)} pathLength={1} d="M0 60 H14 C24 60 22 26 40 26" stroke="#0E7C7B" strokeWidth="2" strokeLinecap="round" />
          <path className="mp-draw" style={step(2)} pathLength={1} d="M0 60 H14 C24 60 22 94 40 94" stroke="#0E7C7B" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div className="space-y-3">
          {[['Satıcı A', 'Hazırlanıyor', 'turquoise', 2], ['Satıcı B', 'Kargoda', 'gray', 3]].map(([seller, state, tone, i]) => (
            <div key={seller as string} className="mp-step rounded-xl border border-heritage-sand bg-white p-3" style={step(i as number)}>
              <div className="flex items-center justify-between gap-2"><span className="flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-gray-900"><BuildingStorefrontIcon className="h-4 w-4 shrink-0 text-heritage-turquoise-deep" />{seller}</span><Status tone={tone as 'turquoise' | 'gray'} i={i as number}>{state}</Status></div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-600"><TruckIcon className="h-3.5 w-3.5" />Kendi sipariş kalemi ve gönderisi</div>
            </div>
          ))}
        </div>
      </div>
      <Caption>Temsili akış · alıcı gönderileri ayrı takip eder</Caption>
    </Scene>
  );
}

/** Seller panel: approval, order and payout rows highlighted in turn. */
export function SellerPanelScene({ className }: { className?: string }) {
  const rows: [ReactNode, string, string, 'amber' | 'turquoise' | 'gray'][] = [
    [<ClipboardDocumentCheckIcon key="i" className="h-4 w-4" />, 'Ürün onayı', 'İncelemede', 'amber'],
    [<TruckIcon key="i" className="h-4 w-4" />, 'Sipariş kalemi #1042', 'Hazırlanıyor', 'turquoise'],
    [<BanknotesIcon key="i" className="h-4 w-4" />, 'Hakediş kaydı', '900 TL', 'gray'],
  ];
  return (
    <Scene className={className} label="Temsili satıcı paneli: ürün onayı incelemede, sipariş kalemi hazırlanıyor, hakediş kaydı 900 TL olarak izleniyor">
      <div className="flex items-center justify-between border-b border-heritage-sand pb-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-900"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-heritage-turquoise-light"><BuildingStorefrontIcon className="h-4 w-4 text-heritage-turquoise-deep" /></span>Satıcı paneli · Satıcı A</span>
        <span className="hidden text-[11px] text-gray-500 sm:inline">Yalnızca kendi kayıtları</span>
      </div>
      <div className="mt-3 flex gap-1.5 text-[11px] font-medium text-gray-600">{['Ürünler', 'Siparişler', 'Hakediş'].map((tab, i) => <span key={tab} className={`rounded-full px-2.5 py-1 ${i === 1 ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>{tab}</span>)}</div>
      <ul className="mt-3 space-y-2">
        {rows.map(([icon, title, state, tone], i) => (
          <li key={title} className="mp-step mp-row flex items-center justify-between gap-3 rounded-xl border border-heritage-sand bg-white px-3 py-2.5" style={step(i)}>
            <span className="flex min-w-0 items-center gap-2 text-xs font-medium text-gray-800"><span className="text-heritage-turquoise-deep">{icon}</span>{title}</span>
            <Status tone={tone} i={i}>{state}</Status>
          </li>
        ))}
      </ul>
      <Caption>Örnek gösterim · alanlar proje kapsamına göre belirlenir</Caption>
    </Scene>
  );
}

/** Commission + payout per seller; B's full refund only corrects B's row. */
export function CommissionLedgerScene({ className }: { className?: string }) {
  return (
    <Scene className={className} label="Temsili komisyon kaydı: Satıcı A 1.000 TL ürün bedeli, yüzde 10 komisyon, 900 TL hakediş; Satıcı B 600 TL, yüzde 15 komisyon, 510 TL hakediş. B ürünü iade edilince yalnızca B satırında 510 TL hakediş ve 90 TL komisyon düzeltmesi oluşuyor">
      <div className="flex items-center justify-between"><span className="text-sm font-semibold text-gray-900">Sipariş #1042 · komisyon ve hakediş</span><BanknotesIcon className="h-5 w-5 text-heritage-turquoise-deep" /></div>
      <div className="mt-3 overflow-hidden rounded-xl border border-heritage-sand text-[11px] sm:text-xs">
        <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr] bg-heritage-ivory px-3 py-2 font-semibold text-gray-700"><span>Kalem</span><span className="text-right">Bedel</span><span className="text-right">Komisyon</span><span className="text-right">Hakediş</span></div>
        <div className="mp-step grid grid-cols-[1.1fr_1fr_1fr_1fr] border-t border-heritage-sand px-3 py-2 text-gray-800" style={step(0)}><span className="font-medium">Satıcı A</span><span className="text-right">1.000 TL</span><span className="text-right">%10 · 100 TL</span><span className="text-right font-semibold">900 TL</span></div>
        <div className="mp-step grid grid-cols-[1.1fr_1fr_1fr_1fr] border-t border-heritage-sand px-3 py-2 text-gray-800" style={step(1)}><span className="font-medium">Satıcı B</span><span className="text-right">600 TL</span><span className="text-right">%15 · 90 TL</span><span className="text-right font-semibold">510 TL</span></div>
        <div className="mp-pop flex flex-wrap items-center gap-2 border-t border-rose-100 bg-rose-50/70 px-3 py-2 text-rose-800" style={step(3)}><ArrowUturnLeftIcon className="h-4 w-4" /><span className="font-semibold">Satıcı B iadesi:</span><span>hakediş −510 TL · komisyon −90 TL</span></div>
      </div>
      <div className="mp-step mt-2 flex items-center gap-1.5 text-[11px] text-gray-600" style={step(4)}><CheckCircleIcon className="h-4 w-4 text-heritage-turquoise-deep" />Satıcı A kaydı değişmez: 900 TL hakediş korunur</div>
      <Caption>Temsili hesap · kargo, indirim ve vergi dahil değildir</Caption>
    </Scene>
  );
}

/** Buyer, seller and admin around the same order. */
export function RolesScene({ className }: { className?: string }) {
  const roles: [ReactNode, string, string[]][] = [
    [<UserIcon key="i" className="h-4 w-4" />, 'Alıcı', ['Sipariş verir', 'İadeyi takip eder']],
    [<BuildingStorefrontIcon key="i" className="h-4 w-4" />, 'Satıcı', ['Ürün ve stok', 'Kendi gönderisi']],
    [<ShieldCheckIcon key="i" className="h-4 w-4" />, 'Yönetici', ['Satıcı ve ürün onayı', 'Komisyon kuralı']],
  ];
  return (
    <Scene className={className} label="Temsili roller: alıcı sipariş verir ve iadeyi takip eder, satıcı ürün, stok ve kendi gönderisini yönetir, yönetici satıcı ve ürün onayı ile komisyon kurallarını belirler">
      <div className="mp-pop mx-auto flex w-fit items-center gap-2 rounded-full border border-heritage-turquoise/40 bg-heritage-turquoise-light px-3 py-1.5 text-xs font-semibold text-heritage-turquoise-deep" style={step(0)}><ShoppingCartIcon className="h-4 w-4" />Sipariş #1042</div>
      <svg viewBox="0 0 300 28" className="mx-auto h-7 w-full max-w-sm" fill="none" preserveAspectRatio="none">
        {['M150 0 V10 H50 V28', 'M150 0 V28', 'M150 0 V10 H250 V28'].map((d, i) => <path key={d} className="mp-draw" style={step(i + 1)} pathLength={1} d={d} stroke="#0E7C7B" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />)}
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {roles.map(([icon, name, tasks], i) => (
          <div key={name} className="mp-step rounded-xl border border-heritage-sand bg-white p-2.5" style={step(i + 2)}>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-900"><span className="text-heritage-turquoise-deep">{icon}</span>{name}</span>
            <ul className="mt-2 space-y-1">{tasks.map((task) => <li key={task} className="rounded-md bg-heritage-ivory px-2 py-1 text-[10.5px] leading-4 text-gray-700 sm:text-[11px]">{task}</li>)}</ul>
          </div>
        ))}
      </div>
      <Caption>Her rol aynı siparişi kendi ekranından görür</Caption>
    </Scene>
  );
}

/** Product submitted → in review → published (or sent back for correction). */
export function ProductApprovalScene({ className }: { className?: string }) {
  return (
    <Scene className={className} label="Temsili ürün onayı: satıcının eklediği ürün kontrol ediliyor, incelemeden sonra yayımlanıyor; eksik bilgi varsa düzeltme gerekçesiyle satıcıya geri gönderiliyor">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:items-center">
        <div className="mp-step rounded-xl border border-heritage-sand bg-heritage-ivory p-3" style={step(0)}>
          <span className="block aspect-[4/3] rounded-lg bg-gradient-to-br from-heritage-turquoise-light to-white" />
          <span className="mt-2 block h-2 w-3/4 rounded-full bg-gray-300" /><span className="mt-1.5 block h-2 w-1/2 rounded-full bg-heritage-turquoise/60" />
          <span className="mt-2 block text-[11px] text-gray-600">Satıcı A · yeni ürün</span>
        </div>
        <ol className="space-y-2">
          {([['Zorunlu alanlar', 'Tamam', 'turquoise'], ['Kategori ve görseller', 'İncelemede', 'amber'], ['Yayın durumu', 'Yayında', 'turquoise']] as const).map(([title, state, tone], i) => (
            <li key={title} className="mp-step flex items-center justify-between gap-2 rounded-xl border border-heritage-sand bg-white px-3 py-2" style={step(i + 1)}>
              <span className="text-xs font-medium text-gray-800">{title}</span><Status tone={tone} i={i}>{state}</Status>
            </li>
          ))}
          <li className="mp-pop flex items-center gap-1.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/60 px-3 py-2 text-[11px] text-amber-900" style={step(4)}><ArrowUturnLeftIcon className="h-3.5 w-3.5" />Eksik bilgi varsa: düzeltme gerekçesiyle satıcıya döner</li>
        </ol>
      </div>
    </Scene>
  );
}

/** A seller sees only its own order lines. */
export function SellerScopeScene({ className }: { className?: string }) {
  return (
    <Scene className={className} label="Temsili veri yetkisi: Satıcı A panelinde yalnızca kendi sipariş kalemi görünüyor, Satıcı B'ye ait kaleme erişim yok; finans ekibi ödeme kayıtlarını ayrı yetkiyle görüyor">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900"><LockClosedIcon className="h-4 w-4 text-heritage-turquoise-deep" />Satıcı A kullanıcısının görünümü</div>
      <ul className="mt-3 space-y-2">
        <li className="mp-step flex items-center justify-between gap-2 rounded-xl border border-heritage-sand bg-white px-3 py-2.5" style={step(0)}><span className="text-xs font-medium text-gray-800">Sipariş #1042 · Satıcı A kalemi</span><Status tone="turquoise">Görünür</Status></li>
        <li className="mp-step flex items-center justify-between gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-3 py-2.5" style={step(1)}><span className="flex items-center gap-1.5 text-xs text-gray-500"><LockClosedIcon className="h-3.5 w-3.5" />Sipariş #1042 · Satıcı B kalemi</span><Status tone="gray">Erişim yok</Status></li>
      </ul>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
        {[['Katalog ekibi', 'Ürün onayı'], ['Finans ekibi', 'Ödeme kayıtları']].map(([team, scope], i) => <div key={team} className="mp-step rounded-lg bg-heritage-ivory px-2.5 py-2" style={step(i + 2)}><span className="block font-semibold text-gray-900">{team}</span><span className="text-gray-600">{scope}</span></div>)}
      </div>
      <Caption>Yetkiler panelde ve veriyi sunan sistemde birlikte uygulanır</Caption>
    </Scene>
  );
}

/** Portföy hero: three representative marketplace models. */
export function ScenarioStackScene({ className }: { className?: string }) {
  const cards: [string, string, ReactNode][] = [
    ['Üretici ağı', 'Ortak katalog · merkezi ürün onayı', <BuildingStorefrontIcon key="i" className="h-5 w-5" />],
    ['Sektör platformu', 'Kategoriye göre başvuru · komisyon', <ShieldCheckIcon key="i" className="h-5 w-5" />],
    ['Kurumsal tedarik', 'Onaylı tedarikçiler · sipariş onayı', <ClipboardDocumentCheckIcon key="i" className="h-5 w-5" />],
  ];
  return (
    <Scene className={className} label="Üç temsili pazaryeri senaryosu: üretici ağı, sektör platformu ve kurumsal tedarik">
      <ul className="space-y-2.5">
        {cards.map(([title, text, icon], i) => (
          <li key={title} className="mp-step flex items-center gap-3 rounded-xl border border-heritage-sand bg-white p-3" style={{ ...step(i), marginInlineStart: `${i * 6}%` }}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-heritage-turquoise-light text-heritage-turquoise-deep">{icon}</span>
            <span className="min-w-0"><span className="block text-sm font-semibold text-gray-900">{title}</span><span className="block text-[11px] text-gray-600">{text}</span></span>
            <span className="ms-auto hidden shrink-0 rounded-full bg-heritage-ivory px-2 py-0.5 text-[10px] font-semibold text-gray-600 sm:inline">Temsili senaryo</span>
          </li>
        ))}
      </ul>
    </Scene>
  );
}
