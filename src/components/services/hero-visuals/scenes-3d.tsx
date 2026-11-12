'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { MagnifyingGlassIcon, PlayIcon, EnvelopeIcon, MapPinIcon, PhotoIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline';
import { H, GirihHalo, HeritageParticles } from './primitives';

function useActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowed(!preference.matches && !document.hidden);
    update();
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => { preference.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  return { ref, active: visible && allowed };
}

function Frame({ label, children }: { label: string; children: (active: boolean) => ReactNode }) {
  const { ref, active } = useActivity();
  // The scene is laid out on a fixed 384 px stage and sized with CSS `zoom`, which re-lays out the
  // content (text and icons stay sharp, unlike a scale transform). The zoom follows the hero column:
  // 352 px on phones, 448 px on tablets and lg, 512 px at md (single column), 544 px from xl.
  return <div ref={ref} role="img" aria-label={label} className="flex max-w-full justify-center">
    <div className="relative h-96 w-96 [zoom:0.9167] sm:[zoom:1.1667] md:[zoom:1.3333] lg:[zoom:1.1667] xl:[zoom:1.4167]">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: H.turquoise, opacity: 0.12 }} />
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-3xl" style={{ perspective: 850 }}>
        <GirihHalo active={active} opacity={0.16} /><HeritageParticles active={active} duration={6} count={5} />
        <div className="absolute inset-[3%]" style={{ transformStyle: 'preserve-3d', fontSize: 10, color: H.lapisDeep }}>{children(active)}</div>
      </div>
    </div>
  </div>;
}

function Plane({ active, children, x, y, width, depth = 0, angle = 0, delay = 0, floating = false }: { active: boolean; children: ReactNode; x: number; y: number; width: number; depth?: number; angle?: number; delay?: number; floating?: boolean }) {
  const controls = useAnimationControls();
  const entered = useRef(false);
  useEffect(() => {
    let cancelled = false;
    async function play() {
      if (!entered.current) {
        entered.current = true;
        await controls.start({ z: [depth + 65, depth], rotateY: [angle + 12, angle], opacity: [0.65, 1], transition: { duration: 0.85, delay, ease: 'easeOut' } });
      }
      if (floating && !cancelled) void controls.start({ y: [0, -3, 0], borderColor: [H.turquoise + '40', H.turquoise, H.turquoise + '40'], transition: { duration: 9, delay: delay * 4, repeat: Infinity, ease: 'easeInOut' } });
    }
    if (active) void play();
    else { controls.stop(); controls.set({ z: depth, rotateY: angle, opacity: 1, y: 0, borderColor: H.turquoise + '40' }); }
    return () => { cancelled = true; controls.stop(); };
  }, [active, controls, depth, angle, delay, floating]);
  return <motion.div initial={false} animate={controls} className="absolute rounded-xl border p-3" style={{ left: `${x}%`, top: `${y}%`, width: `${width}%`, z: depth, rotateY: angle, transformStyle: 'preserve-3d', borderColor: H.turquoise + '40', background: 'rgba(255,255,255,.96)', boxShadow: '0 12px 24px #122a4f18, 0 3px 0 #e6f2f2' }}>{children}</motion.div>;
}
function Bars() { return <div className="mt-2 space-y-1.5"><div className="h-1.5 w-4/5 rounded" style={{ background: H.turquoiseLight }} /><div className="h-1 w-3/5 rounded" style={{ background: H.sand }} /></div>; }
function Cloth() { return <div className="my-2 h-6 rounded-md border" style={{ borderColor: H.sand, background: `repeating-linear-gradient(90deg,transparent,transparent 7px,#cbbf9d55 8px), repeating-linear-gradient(0deg,${H.ivory},${H.ivory} 7px,#cbbf9d55 8px)`, transform: 'rotateX(12deg)' }} />; }
function Connections({ active, paths }: { active: boolean; paths: string[] }) {
  return <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">{paths.map((d, i) => <g key={d}>
    <path d={d} stroke={H.turquoise} strokeWidth=".5" opacity=".22" />
    <motion.path d={d} stroke={H.turquoise} strokeWidth=".8" initial={false} animate={active ? { pathLength: [0, 1, 1], opacity: [0, 0.8, 0] } : { pathLength: 1, opacity: 0.25 }} transition={active ? { duration: 8, repeat: Infinity, delay: i * 1.2, ease: 'easeInOut' } : { duration: 0 }} />
  </g>)}</svg>;
}

export function GoogleAdsHubScene() {
  return <Frame label="Temsili Google Ads hesabı: Arama Ağı, Alışveriş ve Performance Max kampanyaları ortak dönüşüm ölçümüne bağlanıyor.">{active => <>
    <Connections active={active} paths={['M20 34 Q15 77 50 86', 'M50 29 L50 86', 'M80 34 Q85 77 50 86']} />
    <Plane active={active} x={1} y={17} width={32} angle={-20} depth={12}><b>Arama Ağı</b><div className="mt-2 text-[9px]" style={{ color: H.turquoiseDeep }}>Sponsorlu</div><Bars /></Plane>
    <Plane active={active} x={34} y={5} width={32} depth={-15} delay={0.12}><b>Alışveriş</b><div className="flex gap-1"><div className="w-1/2"><Cloth /><Bars /></div><div className="w-1/2"><Cloth /><Bars /></div></div></Plane>
    <Plane active={active} x={67} y={17} width={32} angle={20} depth={12} delay={0.24}><b>Performance Max</b><div className="mt-3 grid grid-cols-2 gap-2">{[MagnifyingGlassIcon, PlayIcon, EnvelopeIcon, MapPinIcon].map((Icon,i) => <Icon key={i} className="h-4 w-4" style={{ color: H.turquoise }} />)}</div></Plane>
    <Plane active={active} x={22} y={55} width={56} depth={35} delay={0.4}><p className="text-center font-semibold">Google Ads hesabınız</p><Bars /></Plane>
    <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-2 font-semibold" style={{ background: H.turquoiseLight }}>Dönüşüm ölçümü</div>
  </>}</Frame>;
}

export function PerformanceMaxScene() {
  const channels = [{ title: 'Arama', x: 37, y: 3, Icon: MagnifyingGlassIcon }, { title: 'YouTube', x: 73, y: 24, Icon: PlayIcon }, { title: 'Görüntülü', x: 67, y: 66, Icon: PhotoIcon }, { title: 'Gmail', x: 8, y: 66, Icon: EnvelopeIcon }, { title: 'Haritalar', x: 0, y: 24, Icon: MapPinIcon }];
  return <Frame label="Temsili Performance Max kampanyası: hedef, reklam öğeleri ve ürün verisinden Google kanallarına uzanan bağlantılar.">{active => <>
    <div className="absolute inset-[8%] rounded-full border-2" style={{ borderColor: H.turquoise + '35', transform: 'rotateX(57deg)', transformStyle: 'preserve-3d' }} />
    <Connections active={active} paths={channels.map(c => `M50 46 L${c.x+13} ${c.y+8}`)} />
    {channels.map(({title,x,y,Icon},i) => <Plane key={title} active={active} x={x} y={y} width={27} depth={12} angle={x > 50 ? -12 : 12} delay={i*.1}><Icon className="mx-auto h-4 w-4" style={{ color: H.turquoise }} /><p className="mt-1 text-center text-[9px] font-semibold">{title}</p></Plane>)}
    <Plane active={active} x={26} y={37} width={49} depth={40}><p className="text-center font-semibold">Performance Max</p><Bars /></Plane>
    <div className="absolute bottom-[1%] flex w-full justify-center gap-1">{['Hedef','Öğeler','Ürün verisi'].map((s,i) => <motion.span key={s} initial={false} animate={active ? { y: [3, 0] } : { y: 0 }} transition={{ duration: .7, delay: i*.12 }} className="rounded-md border px-2 py-1" style={{ background:H.ivory, borderColor:H.sand }}>{s}</motion.span>)}</div>
  </>}</Frame>;
}

export function GoogleShoppingScene() {
  return <Frame label="Temsili keten masa örtüsü: mağaza sayfası, Merchant Center ürün kaydı ve Alışveriş reklamında aynı ürünün izlenmesi.">{active => <>
    <Connections active={active} paths={['M30 29 L40 48', 'M40 48 L70 80']} />
    <Plane active={active} floating x={2} y={3} width={57} angle={-16} depth={-12}><b>Mağaza</b><Cloth /><p className="text-[9px]">Keten masa örtüsü · 160 × 220</p><div className="mt-1 flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-stone-300" /><i className="h-2 w-2 rounded-full bg-teal-700" /><span className="ml-auto text-[9px]" style={{color:H.turquoiseDeep}}>Stokta</span></div></Plane>
    <Plane active={active} floating x={12} y={37} width={60} angle={-12} depth={15} delay={.25}><b>Merchant Center</b><div className="mt-2 flex gap-3">{['id','fiyat','stok','görsel'].map(s => <span key={s} className="text-[9px]">{s}<CheckIcon className="mt-1 h-3 w-3" style={{color:H.turquoise}} /></span>)}</div></Plane>
    <Plane active={active} floating x={46} y={58} width={51} angle={-8} depth={35} delay={.5}><b>Alışveriş reklamı</b><Cloth /><p className="text-[9px]">Keten masa örtüsü</p><Bars /><p className="mt-1 text-[9px]">magazaniz.com</p></Plane>
  </>}</Frame>;
}

export function CorporateSiteScene({ locale = 'tr' }: { locale?: 'tr' | 'en' }) {
  const t = locale === 'tr' ? { label:'Temsili kurumsal web sitesi: menü, tanıtım, hizmetler ve formun birleşmesi; mobil görünüm ve içerik yönetimi.', menu:'Menü', hero:'İşletmeniz', services:'Hizmetler', refs:'Referanslar', form:'İletişim formu', cms:'Yönetim paneli' } : { label:'Illustrative company website assembled from navigation, introduction, services and a form, with a mobile view and content editing.', menu:'Navigation', hero:'Your business', services:'Services', refs:'References', form:'Contact form', cms:'Content management' };
  return <Frame label={t.label}>{active => <>
    <div className="absolute inset-0" style={{transform:'rotateY(-12deg) rotateX(8deg)',transformStyle:'preserve-3d'}}>
      {[t.menu,t.hero,t.services,t.refs,t.form].map((label,i) => <Plane key={label} active={active} x={7} y={[3, 16, 29, 51, 65][i]} width={64} depth={i*2} delay={i*.14}><div className="flex items-center gap-2"><span className="text-[9px] font-semibold">{label}</span>{i===1 ? <motion.span initial={false} animate={active ? { scaleX:[1,.7,1] } : {scaleX:1}} transition={active ? {duration:9,repeat:Infinity} : {duration:0}} className="h-1.5 flex-1 rounded origin-left" style={{background:H.turquoise}} /> : <span className="h-1 flex-1 rounded" style={{background:H.turquoiseLight}} />}</div>{i===2 && <div className="mt-2 flex gap-1">{[0,1,2].map(n=><span key={n} className="h-4 flex-1 rounded" style={{background:H.ivory}} />)}</div>}{i===4 && <div className="mt-2 flex gap-2"><span className="h-3 flex-1 rounded border" style={{borderColor:H.sand}} /><span className="h-3 w-6 rounded" style={{background:H.turquoise}} /></div>}</Plane>)}
    </div>
    <div className="absolute right-[2%] top-[32%] w-[22%] rounded-2xl border-2 bg-white p-2 shadow-xl" style={{borderColor:H.lapisDeep,transform:'translateZ(45px) rotateY(-8deg)'}}><div className="mx-auto mb-3 h-1 w-5 rounded" style={{background:H.lapisDeep}} />{[t.hero,t.services,t.form].map(label=><div key={label} className="mb-2 rounded p-1" style={{background:H.ivory}}><span className="text-[8px]">{label}</span><Bars /></div>)}</div>
    <div className="absolute bottom-[3%] left-[10%] flex items-center gap-2 rounded-full px-3 py-2 font-semibold" style={{background:H.turquoiseLight}}><PencilSquareIcon className="h-4 w-4" />{t.cms}</div>
  </>}</Frame>;
}
