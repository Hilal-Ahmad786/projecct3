'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { MagnifyingGlassIcon, PlayIcon, EnvelopeIcon, MapPinIcon, PhotoIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline';
import { H, GirihHalo, HeritageParticles, drawIn, popIn, riseIn, starPoints } from './primitives';

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

// Meta overview hero: the original AdCreativeScene look (full-canvas SVG, gradient ad card with a
// girih star, draw-in outlines, rising heart) merged with the newer story: the same ad in the feed and
// in a story, a click travelling to the landing page, a measured form and the four-step rail.
// First render is identical on server and client; loops start only after mount while on screen.
export function MetaAdsScene() {
  const steps = [['Hedef', 14, 44], ['Kreatif', 62, 48], ['Ölçüm', 114, 44], ['Değerlendirme', 162, 64]] as const;
  const click = 'M106 162 C128 162 140 152 154 146';
  const record = 'M152 190 C140 198 132 200 124 200';
  const loop = (active: boolean, values: Record<string, number[] | string[]>, duration: number, delay = 0) =>
    active ? { animate: values, transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' as const } } : { animate: Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v[0]])), transition: { duration: 0 } };
  const pop = (delay: number) => ({ ...popIn(delay), style: { transformBox: 'fill-box' as const, transformOrigin: 'center' } });
  return <Frame label="Temsili Meta reklam akışı: Facebook akışı ve Instagram hikâyesindeki aynı reklam açılış sayfasına yönlendiriyor; başarılı form kaydı ölçülüyor ve hedef, kreatif, ölçüm, değerlendirme adımlarıyla izleniyor.">{active => <>
    <GirihHalo active={active} color={H.terracotta} opacity={0.14} />
    <svg viewBox="0 0 240 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="metaAdGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={H.terracotta} /><stop offset="100%" stopColor={H.saffron} /></linearGradient>
        <linearGradient id="metaStoryGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={H.turquoise} /><stop offset="100%" stopColor={H.turquoiseDeep} /></linearGradient>
        <filter id="metaShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={H.lapisDeep} floodOpacity="0.12" /></filter>
      </defs>

      {/* story placement, tilted behind the feed card */}
      <motion.g {...pop(0.5)}>
        <motion.g {...loop(active, { y: [0, -3, 0] }, 7, 0.4)}>
          <g transform="rotate(8 162 66)" filter="url(#metaShadow)">
            <rect x="134" y="18" width="56" height="96" rx="10" fill={H.white} stroke={H.sand} strokeWidth="1.5" />
            <text x="142" y="31" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Hikâye</text>
            <rect x="140" y="36" width="44" height="54" rx="7" fill="url(#metaStoryGrad)" />
            <polygon points="157,55 157,71 170,63" fill={H.white} opacity="0.9" />
            <rect x="145" y="96" width="38" height="11" rx="5.5" fill={H.white} stroke={H.turquoise} />
            <text x="164" y="104" textAnchor="middle" fontSize="6" fill={H.turquoiseDeep}>Instagram</text>
          </g>
        </motion.g>
      </motion.g>

      {/* feed ad card (original AdCreative card) */}
      <motion.g {...loop(active, { y: [0, -2.5, 0] }, 8)}>
        <rect x="22" y="30" width="118" height="152" rx="14" fill={H.white} filter="url(#metaShadow)" />
        <motion.rect x="22" y="30" width="118" height="152" rx="14" fill="none" stroke={H.sand} strokeWidth="2" {...drawIn(0.1, 1)} />
        <motion.text x="32" y="45" fontSize="7" fontWeight="700" fill={H.lapisDeep} {...riseIn(0.4)}>Akış · Facebook</motion.text>
        <motion.rect x="30" y="51" width="102" height="64" rx="10" fill="url(#metaAdGrad)" {...pop(0.6)} />
        <motion.g {...pop(0.85)}>
          <motion.g {...loop(active, { rotate: [0, 45] }, 18)} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <polygon points={starPoints(81, 83, 20, 11)} fill="none" stroke={H.white} strokeWidth="1.8" />
          </motion.g>
          <circle cx="81" cy="83" r="5.5" fill={H.white} />
        </motion.g>
        <motion.g {...pop(0.95)}>
          <rect x="37" y="57" width="34" height="13" rx="6.5" fill={H.white} />
          <text x="54" y="66.3" textAnchor="middle" fontSize="7" fontWeight="800" fill={H.terracotta}>Reklam</text>
        </motion.g>
        <motion.rect x="32" y="124" width="86" height="7" rx="3.5" fill={H.sand} {...pop(1.1)} />
        <motion.rect x="32" y="136" width="60" height="5" rx="2.5" fill={H.ivory} {...pop(1.2)} />
        <motion.g {...pop(1.35)}>
          <rect x="32" y="152" width="74" height="20" rx="10" fill={H.turquoise} />
          <text x="69" y="164.6" textAnchor="middle" fontSize="7" fontWeight="700" fill={H.white}>Daha fazla bilgi</text>
        </motion.g>
        {/* rising heart (engagement) */}
        <motion.path d="M124 160 c-3 -4 -10 -2 -10 4 c0 5 10 10 10 10 c0 0 10 -5 10 -10 c0 -6 -7 -8 -10 -4 z" fill={H.terracotta}
          initial={false} {...(active ? { animate: { y: [0, -46], opacity: [0, 1, 0], scale: [0.6, 1, 1] }, transition: { duration: 2.6, repeat: Infinity, repeatDelay: 3.4, delay: 2 } } : { animate: { y: 0, opacity: 0, scale: 0.6 }, transition: { duration: 0 } })}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
      </motion.g>

      {/* click travels to the landing page */}
      <motion.path d={click} fill="none" stroke={H.turquoise} strokeWidth="1.4" strokeDasharray="3 3" {...drawIn(1.5, 0.8)} />
      <motion.circle r="3" fill={H.saffron} initial={false} style={{ offsetPath: `path("${click}")` }}
        animate={active ? { offsetDistance: ['0%', '100%'], opacity: [0, 1, 0] } : { offsetDistance: '100%', opacity: 0 }}
        transition={active ? { duration: 2.2, repeat: Infinity, repeatDelay: 3.8, delay: 2.4, ease: 'easeInOut' } : { duration: 0 }} />

      {/* landing page */}
      <motion.g {...pop(1.7)}>
        <motion.g {...loop(active, { y: [0, -2, 0] }, 9, 1)}>
          <rect x="150" y="116" width="76" height="80" rx="10" fill={H.white} stroke={H.turquoise} strokeOpacity="0.35" filter="url(#metaShadow)" />
          <path d="M150 126 a10 10 0 0 1 10 -10 h56 a10 10 0 0 1 10 10 z" fill={H.turquoiseLight} />
          {[158, 164, 170].map((cx, i) => <circle key={cx} cx={cx} cy="121.5" r="1.8" fill={i === 2 ? H.terracotta : H.turquoise} />)}
          <text x="158" y="138" fontSize="7" fontWeight="700" fill={H.lapisDeep}>Açılış sayfası</text>
          <rect x="158" y="144" width="54" height="4" rx="2" fill={H.sand} />
          <rect x="158" y="153" width="60" height="9" rx="3" fill="none" stroke={H.sand} />
          <rect x="158" y="166" width="60" height="9" rx="3" fill="none" stroke={H.sand} />
          <motion.rect x="158" y="180" width="34" height="10" rx="5" fill={H.terracotta} {...loop(active, { opacity: [1, 0.75, 1] }, 6, 4.6)} />
        </motion.g>
      </motion.g>

      {/* measured form record */}
      <motion.path d={record} fill="none" stroke={H.turquoise} strokeWidth="1.4" strokeDasharray="3 3" {...drawIn(2.1, 0.6)} />
      <motion.g {...pop(2.3)}>
        <rect x="22" y="189" width="102" height="22" rx="11" fill={H.white} stroke={H.turquoise} strokeOpacity="0.45" filter="url(#metaShadow)" />
        <motion.circle cx="34" cy="200" r="7" fill={H.turquoise} {...loop(active, { scale: [1, 1.12, 1] }, 6, 5)} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <path d="M30.5 200 l2.5 2.5 l4.5 -5" fill="none" stroke={H.white} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="46" y="202.5" fontSize="7" fontWeight="600" fill={H.lapisDeep}>Başarılı form kaydı</text>
      </motion.g>

      {/* four-step rail */}
      {steps.map(([label, x, w], i) => <motion.g key={label} {...riseIn(2.5 + i * 0.1)}>
        <motion.rect x={x} y="219" width={w} height="16" rx="5" strokeWidth="1"
          initial={false} animate={active ? { fill: [H.ivory, H.turquoiseLight, H.ivory], stroke: [H.sand, H.turquoise, H.sand] } : { fill: H.ivory, stroke: H.sand }}
          transition={active ? { duration: 8, repeat: Infinity, delay: 3 + i * 2, times: [0, 0.12, 0.25] } : { duration: 0 }} style={{ fill: H.ivory, stroke: H.sand }} />
        <text x={x + w / 2} y="229.6" textAnchor="middle" fontSize="7" fontWeight="700" fill={H.lapisDeep}>{label}</text>
      </motion.g>)}
    </svg>
  </>}</Frame>;
}
