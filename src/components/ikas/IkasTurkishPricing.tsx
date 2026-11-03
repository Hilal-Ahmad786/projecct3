import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRightIcon, ArrowsRightLeftIcon, BuildingStorefrontIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import InternalPageHero from '@/components/services/InternalPageHero';
import { ProcessScene } from '@/components/services/hero-visuals/scenes-internal';
import { IKAS_TR_BASE as base, IKAS_TR_ENQUIRY as enquiry } from './ikasTurkishCopy';
import IkasMotionScope from './IkasMotionScope';
import IkasVisual from './visuals/IkasVisual';
import { IkasIcon, IkasPlatformNote } from './IkasMark';

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';
const textLink = `font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`;

function Action({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition-colors motion-reduce:transition-none ${focus} ${secondary ? 'border border-heritage-sand bg-white text-gray-900 hover:bg-heritage-ivory' : 'bg-heritage-turquoise text-white hover:bg-heritage-turquoise-deep'}`}>{children}<ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link>;
}

function Section({ id, title, children, tone = 'white' }: { id?: string; title: string; children: ReactNode; tone?: 'white' | 'gray' | 'ivory' }) {
  const bg = tone === 'gray' ? 'bg-background-gray' : tone === 'ivory' ? 'bg-heritage-ivory' : 'bg-white';
  return <section id={id} className={`${bg} scroll-mt-[calc(var(--navbar-h,88px)+3.5rem)]`}><div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 sm:py-16"><h2 className="max-w-4xl text-headline font-medium leading-tight text-gray-900">{title}</h2>{children}</div></section>;
}

function Table({ label, headers, rows }: { label: string; headers: string[]; rows: string[][] }) {
  return <div role="region" aria-label={label} tabIndex={0} className="mt-6 overflow-x-auto rounded-xl border border-heritage-sand bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise"><table className="w-full min-w-[650px] border-collapse text-left text-sm"><thead className="bg-heritage-ivory"><tr>{headers.map((h) => <th key={h} scope="col" className="border-b border-heritage-sand px-4 py-3 font-semibold text-gray-900">{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={`${row[0]}-${i}`} className="even:bg-gray-50/70">{row.map((value, j) => <td key={`${j}-${value}`} className={`border-b border-gray-100 px-4 py-3 align-top leading-6 text-gray-700 ${j === 0 ? 'font-semibold text-gray-900' : ''}`}>{value}</td>)}</tr>)}</tbody></table></div>;
}

const options = [
  { title: 'Yeni ikas mağazası kurulumu', forWho: 'Yeni mağaza açacak ve ürünlerini düzenli bir yapıyla yayına hazırlamak isteyen işletmeler.', items: ['Mağaza ayarları, menü ve kararlaştırılan içerik sayfaları.', 'Mevcut temanın marka görünümüne göre uyarlanması.', 'Kategori ve ürün yapısının hazırlanması.', 'Uygun ödeme/kargo bağlantıları, kontroller ve yönetim bilgilendirmesi.'], driver: 'Ürün verisinin hazırlığı, ihtiyaç duyulan şablonlar ve tema düzenlemelerinin kapsamı.', Icon: BuildingStorefrontIcon },
  { title: 'Mevcut ikas mağazasının geliştirilmesi', forWho: 'Mağazası bulunan ve belirli sayfa veya alışveriş alanlarını iyileştirmek isteyen işletmeler.', items: ['Ana sayfa veya belirli kategori/ürün alanlarının düzenlenmesi.', 'Mobil menü, içerik sunumu ve mevcut tema alanlarının iyileştirilmesi.', 'Özel bölüm veya bileşen ihtiyaçlarının incelenmesi.', 'Değişikliklerin mevcut mağazaya etkisinin kontrol edilmesi.'], driver: 'Mevcut tema ortamı, kod yapısı, düzenlenecek alanlar ve değişikliğin diğer sayfalara etkisi.', Icon: WrenchScrewdriverIcon },
  { title: "Başka platformdan ikas'a geçiş", forWho: 'Mevcut mağazasını farklı bir altyapıdan ikas’a taşımayı planlayan işletmeler.', items: ['Kaynak veri ve aktarılacak kayıtların incelenmesi.', 'Örnek ürün aktarımı ve veri alanlarının eşleştirilmesi.', 'Yeni mağazanın tema ve içerik hazırlığı.', 'URL eşleştirmesi, yayın kontrolleri ve devir planı.'], driver: 'Veri kalitesi, varyantlar, kaynak sistemin imkanları, kayıtlar ve URL kapsamı.', Icon: ArrowsRightLeftIcon },
];

const faq = [
  ['ikas mağaza kurulum hizmeti kaç TL?', 'Yapılacak işler belirlenmeden tek bir bedel söylemek sağlıklı bir karşılaştırma sunmaz. Yeni kurulum, tema düzenlemesi ve platform geçişi farklı kapsamlar olabilir. Mağaza ve ihtiyaç bilgileri üzerinden proje teklifi hazırlanır.'],
  ['ikas aboneliği PakSoft hizmet bedeline dahil mi?', 'Platform aboneliği ile kurulum ve geliştirme hizmeti farklı kalemlerdir. Teklifte açıkça dahil olduğu belirtilmeyen abonelik, uygulama ve üçüncü taraf giderleri ayrıca değerlendirilir.'],
  ['Yalnızca birkaç tema değişikliği için teklif alabilir miyim?', 'Evet. İhtiyaç duyduğunuz sayfaları ve değişiklikleri paylaşabilirsiniz. Mevcut tema ortamı incelenerek daha dar kapsamlı bir çalışma planlanabilir.'],
  ['Ürün aktarımı ücreti yalnızca ürün sayısına göre mi belirlenir?', 'Hayır. Varyantlar, görseller, veri kalitesi, kategori ilişkileri ve kaynak sistemin imkanları da işi etkiler. Örnek veri üzerinden gerekli hazırlık değerlendirilir.'],
  ['Özel tema geliştirmek her zaman gerekir mi?', 'Hayır. İhtiyacınız mevcut tema ayarları veya daha sınırlı düzenlemelerle karşılanabilir. Özel geliştirme kararı mevcut yapı ve gereken davranış incelendikten sonra verilir.'],
  ['Yayın sonrasındaki değişiklikler aynı fiyata dahil mi?', 'Destek kapsamındaki işler ve yeni geliştirme talepleri teklifte ayrılır. Onaylı kapsam dışındaki yeni sayfa, bölüm veya bağlantıların bedel ve takvim etkisi ayrıca değerlendirilir.'],
  ['SEO ve reklam yönetimi kurulum ücretine dahil mi?', 'Yalnızca teklifte belirtilen işler dahildir. Temel mağaza hazırlığı, sürekli SEO, içerik üretimi, reklam yönetimi ve reklam harcaması farklı kalemlerdir.'],
];

export function getIkasTurkishPricingMeta() {
  return {
    title: 'ikas Kurulum ve Tema Tasarımı Hizmet Fiyatları | PakSoft',
    description: 'ikas kurulum, tema tasarımı ve geçiş hizmetlerinde fiyatı etkileyen işleri inceleyin. PakSoft hizmet bedeliyle platform ve uygulama giderlerini ayrı planlayın.',
  };
}

export default function IkasTurkishPricing() {
  return <>
    <IkasMotionScope />
    <InternalPageHero eyebrowIcon={<IkasIcon size={24} />} eyebrowNormalCase footnote={<IkasPlatformNote />}
      serviceName="ikas"
      accentWord="ikas Hizmet Fiyatlandırması"
      heading="ikas Kurulum ve Tema Tasarımı Hizmet Fiyatlandırması"
      subtitle="ikas mağazanız için hizmet bedeli; yapılacak kurulum, tema çalışması, veri aktarımı ve entegrasyon kapsamına göre belirlenir. Teklifte PakSoft’un yapacağı işleri, teslimleri ve ayrıca karşılanacak platform veya uygulama giderlerini ayırıyoruz."
      scene={<ProcessScene />}
      crumbs={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Hizmetler', href: '/hizmetler' }, { label: 'ikas Geliştirme', href: base }, { label: 'Fiyatlandırma' }]}
      actions={<><Action href={enquiry}>ikas Projem İçin Teklif Talep Et</Action><Action href="#ikas-ornek-kapsamlar" secondary>Örnek Kapsamları İncele</Action></>}
    />

    <Section title="ikas projesinde üç gider kalemini ayrı değerlendirin" tone="gray"><p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">Mağaza bütçesini planlarken hizmet bedeli, platform giderleri ve günlük işletme maliyetleri aynı kalem değildir. Bu ayrım, teklif kapsamındaki işleri karşılaştırmayı kolaylaştırır.</p><IkasVisual name="cost-split" className="mt-6 max-w-lg" label="Temsili gider grupları: PakSoft hizmet bedeli, ikas platform ve uygulama giderleri ile günlük operasyon giderleri ayrı planlanıyor" /><Table label="ikas mağaza gider grupları" headers={['Gider grubu', 'Neyi kapsayabilir?', 'Nasıl değerlendirilir?']} rows={[
      ['PakSoft hizmet bedeli', 'Kurulum, tasarım, veri aktarımı, bağlantı çalışmaları ve kararlaştırılan bilgilendirme', 'Onaylanan proje ve teslim kapsamına göre'], ['Platform ve dış servis giderleri', 'ikas aboneliği, uygulamalar, alan adı ve ilgili servisler', 'Seçilen sağlayıcının güncel koşullarına göre'], ['Mağaza işletme giderleri', 'Reklam harcaması, paketleme, kargo, ödeme işlemleri ve operasyon', 'İşletmenin kullanımına ve anlaşmalarına göre'],
    ]} /><p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Bir bağlantının kurulması, sağlayıcının kullanım bedelinin PakSoft hizmet ücretine dahil olduğu anlamına gelmez. Gider sorumlulukları teklifinizde açıklanır.</p></Section>

    <Section id="ikas-ornek-kapsamlar" title="Hangi ikas çalışma kapsamı size uygun?"><p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">Aşağıdaki senaryolar ihtiyacınızı tarif etmenize yardımcı olur. Bunlar sabit fiyatlı paketler veya otomatik dahil olan hizmet listeleri değildir; teslimler projeye göre belirlenir.</p><div className="mt-6 grid gap-4 lg:grid-cols-3">{options.map(({ title, forWho, items, driver, Icon }, index) => <article key={title} data-ikas-reveal data-ikas-delay={index * 65} className="ikas-card-motion flex h-full flex-col rounded-xl border border-heritage-sand bg-white p-5"><Icon className="ikas-motion-icon h-7 w-7 text-heritage-turquoise-deep" aria-hidden="true" /><h3 className="mt-3 text-lg font-semibold leading-snug text-gray-900">{title}</h3><p className="mt-3 text-sm leading-6 text-gray-700"><strong>Kimler için?</strong> {forWho}</p><p className="mt-4 text-sm font-semibold text-gray-900">Değerlendirilebilecek işler</p><ul className="mt-2 flex-1 list-disc space-y-1 ps-5 text-sm leading-6 text-gray-600">{items.map((item) => <li key={item}>{item}</li>)}</ul><p className="mt-4 text-sm leading-6 text-gray-700"><strong>Fiyatı etkileyen:</strong> {driver}</p><p className="mt-4 border-t border-heritage-sand pt-4 text-sm font-semibold text-gray-900">Kapsama göre teklif</p><Link href={enquiry} className={`mt-2 inline-flex items-center gap-2 text-sm ${textLink}`}>Bu kapsamı konuşalım <ArrowRightIcon className="h-4 w-4" aria-hidden="true" /></Link></article>)}</div></Section>

    <Section title="ikas hizmet fiyatını neler değiştirir?" tone="ivory"><div className="grid gap-x-10 gap-y-6 md:grid-cols-2">{[
      ['Tema uyarlaması mı, özel geliştirme mi?', 'Mevcut ayarlarla yapılabilen bir düzenleme ile yeni bir bölüm veya davranış geliştirmek farklı işlerdir. Hangi sayfaların ele alınacağını, ekibinizin neyi yöneteceğini ve temanın imkanlarını değerlendiririz.'],
      ['Ürün verisi ne kadar hazır?', 'Ürün sayısı tek başına aktarım işini tarif etmez. Tutarlı kodlar, eksiksiz varyantlar ve eşleşmiş görseller hazırlığı kolaylaştırır. Veri temizliği ve tamamlama görevleri ayrıca belirlenir.'],
      ['Hangi bağlantılar gerekiyor?', 'Hazır bir uygulamanın yapılandırılmasıyla özel veri akışı geliştirilmesi aynı kapsam değildir. Veriler, aktarım yönü, güncelleme sıklığı ve hata takibi iş planını etkiler.'],
      ['Hangi içerikler hazırlanacak?', 'İşletmenin sağladığı metin ve görsellerle yeni içerik hazırlamak farklı işlerdir. Ürün açıklaması, görsel üretimi ve çeviri ihtiyaçları ayrı iş kalemleri olabilir.'],
      ['Yayın sonrası destek neyi kapsayacak?', 'Eğitim, teknik destek ve yeni geliştirmeler ayrı tarif edilir. Destek süresi, dahil işler ve yeni taleplerin değerlendirilme biçimi teklifinizde belirtilir.'],
    ].map(([h, p]) => <article key={h}><h3 className="text-base font-semibold text-gray-900">{h}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{p}</p></article>)}</div><p className="mt-6"><Link href={`${base}/ozellikler`} className={textLink}>Çalışma alanlarını ve teslimleri inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link></p></Section>

    <Section title="Teklifte hangi bilgileri görebilmelisiniz?"><p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">Teklifin yalnızca toplam bedelini değil, bu bedelle tamamlanacak işleri de karşılaştırın. Aynı isimle sunulan kurulum hizmetleri farklı teslimler içerebilir.</p><Table label="Teklifte netleştirilecek kalemler" headers={['Başlık', 'Netleştirilecek bilgi']} rows={[
      ['Sayfa ve tema işleri', 'Hangi sayfalar, şablonlar veya bölümler hazırlanacak?'], ['Veri aktarımı', 'Hangi kayıtlar ve alanlar aktarılacak, kim kontrol edecek?'], ['Bağlantılar', 'Hangi servis ve veri akışları kapsama dahil?'], ['İçerik görevleri', 'Metin, görsel ve veri hazırlığını kim yapacak?'], ['Onay ve revizyon', 'Geri bildirim hangi aşamada ve nasıl değerlendirilecek?'], ['Test ve yayın', 'Hangi kontroller ve yayın adımları yapılacak?'], ['Eğitim ve destek', 'Süre, dahil işler ve destek yöntemi nedir?'], ['Bedel ve ticari koşullar', 'Para birimi, vergi durumu, ödeme planı ve teklif geçerliliği nedir?'],
    ]} /><p className="mt-4 text-sm leading-6 text-gray-600">Ticari koşullar proje teklifinde netleştirilir; bu sayfada belirtilmeyen ödeme veya revizyon hakkı varsayılmaz.</p></Section>

    <Section title="Örnek bir proje özetiyle teklif talebinizi hazırlayın" tone="gray"><p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">Aşağıdaki metin örnek bir ihtiyaç tarifidir; müşteri projesi, sabit paket veya fiyat vaadi değildir.</p><blockquote className="mt-5 max-w-4xl rounded-xl border-s-4 border-heritage-turquoise bg-white p-5 text-sm leading-7 text-gray-700 sm:p-6">Mevcut ikas mağazamızda ana sayfa ve ürün sunumunu düzenlemek istiyoruz. Ürün verilerini ekibimiz güncelliyor; bu aşamada toplu veri aktarımı istemiyoruz. Mobil menüyü ve kampanya alanlarını incelemenizi istiyoruz. Ekibimizin banner görseli ve bağlantısını panelden değiştirebilmesi önemli. Özel geliştirme gerektiren işleri, mevcut ayarlarla yapılabilecek düzenlemelerden ayrı belirtmenizi rica ediyoruz.</blockquote><p className="mt-4 max-w-3xl text-sm leading-6 text-gray-600">Yeni mağaza için ürünlerin hazırlık durumunu ve gerekli sayfaları ekleyebilirsiniz. Geçişte mevcut platformu ve taşınmasını istediğiniz kayıtları belirtmeniz de yararlı olur.</p><div className="mt-6"><Action href={enquiry}>Önce kapsamı netleştirelim</Action></div></Section>

    <Section title="İlk yayın kapsamını daraltmak mümkün mü?" tone="ivory"><p className="mt-4 max-w-3xl text-body leading-relaxed text-gray-600">Evet. İlk aşamada gerekli işleri belirleyip daha sonra yapılabilecek geliştirmeleri ayrı planlayabiliriz. Ertelenen bir alanın veri yapısı, alışveriş akışı veya sistem bağlantılarıyla ilişkisini de değerlendiririz; sonraki aşamada yeniden çalışma gerekip gerekmediği bu ilişkilere bağlıdır.</p><p className="mt-4"><Link href={`${base}/surec`} className={textLink}>Kapsam ve onay aşamalarını inceleyin <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link></p></Section>

    <Section title="ikas hizmet fiyatları hakkında sık sorulan sorular"><div className="mt-6 space-y-6">{faq.map(([question, answer]) => <article key={question} className="max-w-4xl border-b border-heritage-sand pb-5"><h3 className="text-base font-semibold leading-6 text-gray-900">{question}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{answer}</p></article>)}</div><h3 className="mt-8 text-base font-semibold text-gray-900">Bütçe planlaması için ilgili kaynaklar</h3><ul className="mt-3 space-y-2 text-sm leading-6">{[
      ['E-ticaret sitesi fiyatları: maliyeti neler belirler?', '/tr/hizmetler/e-commerce/blog/e-ticaret-sitesi-fiyatlari'], ['ikas hizmet özellikleri', `${base}/ozellikler`], ['ikas geliştirme süreci', `${base}/surec`], ['ikas genel bakış', base],
    ].map(([label, href]) => <li key={href}><Link href={href} className={textLink}>{label} <ArrowRightIcon className="inline h-4 w-4" aria-hidden="true" /></Link></li>)}</ul></Section>

    <section className="bg-heritage-turquoise-deep text-white"><div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-10 sm:px-6 sm:py-12 md:flex-row md:items-center md:justify-between"><div className="max-w-2xl"><h2 className="text-title font-semibold leading-tight">ikas projeniz için teklif talep edin</h2><p className="mt-2 text-sm leading-6 text-white/85">Mevcut mağaza bağlantınızı veya yeni mağaza planınızı, örnek ürün yapınızı ve ihtiyaç duyduğunuz değişiklikleri paylaşın. Yapılacak işleri ve ayrıca değerlendirilmesi gereken giderleri birlikte netleştirelim.</p><p className="mt-2 text-xs leading-5 text-white/80">İlk aşamada şifre veya API anahtarı paylaşmanız gerekmez. Kısa bir ihtiyaç özetiyle başlayabilirsiniz.</p></div><Action href={enquiry} secondary>ikas Projemi Paylaş</Action></div></section>
  </>;
}
