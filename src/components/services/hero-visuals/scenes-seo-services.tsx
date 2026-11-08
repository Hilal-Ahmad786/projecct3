'use client';

// Overview hero scenes for the Turkish E-Ticaret SEO and Teknik SEO pages, in
// the same style as SerpRankingScene (the SEO overview hero): the store's
// product result climbs the results, and a URL's status moves from an error to
// an indexable page. Reduced motion shows the final state. Decorative only.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { H, Scene, GirihHalo, HeritageParticles, riseIn, popIn } from './primitives';

const Search = ({ color = H.turquoise }: { color?: string }) => (
  <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" stroke={color} strokeWidth="2" aria-hidden="true">
    <circle cx="9" cy="9" r="6" /><path d="m14 14 4 4" strokeLinecap="round" />
  </svg>
);
const Star = () => (
  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill={H.saffron} aria-hidden="true"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.1 1.2 6L12 16.4 6.6 19.4l1.2-6L3.3 9.3l6.1-.7z" /></svg>
);

/* ── E-Ticaret SEO: product result climbs, then Arama → Kategori → Ürün ── */
export function EcommerceSerpScene() {
  const reduced = useReducedMotion();
  const rows = [0, 1, 2, 3];
  const path = ['Arama', 'Kategori', 'Ürün'];
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={8} />
      <motion.div {...riseIn(0.1)} className="absolute inset-4 flex flex-col items-center justify-center gap-3 sm:inset-6">
        <motion.div
          className="w-full overflow-hidden rounded-xl shadow-2xl"
          style={{ background: H.white, border: `1px solid ${H.sand}` }}
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: H.ivory, borderBottom: `1px solid ${H.sand}` }}>
            <Search />
            <div className="flex h-5 flex-1 items-center overflow-hidden rounded-full px-2.5 text-[9px] font-semibold" style={{ background: H.white, border: `1px solid ${H.sand}`, color: H.ink }}>
              <motion.span className="inline-block overflow-hidden whitespace-nowrap" initial={{ maxWidth: 0 }} animate={{ maxWidth: 160 }} transition={{ delay: 0.4, duration: 0.9, ease: 'linear' }}>
                yürüyüş ayakkabısı
              </motion.span>
            </div>
          </div>
          <div className="relative space-y-2 p-3" style={{ height: 196 }}>
            {rows.map((i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg px-2.5 py-2" style={{ background: H.ivory, height: 41 }}>
                <span className="h-6 w-6 shrink-0 rounded" style={{ background: H.sand }} />
                <div className="flex-1 space-y-1.5">
                  <div className="h-1.5 rounded-full" style={{ background: H.sand, width: `${72 - i * 8}%` }} />
                  <div className="h-1.5 rounded-full" style={{ background: H.sand, width: '40%', opacity: 0.6 }} />
                </div>
              </div>
            ))}
            {/* the store's product result */}
            <motion.div
              className="absolute left-3 right-3 flex items-center gap-2 rounded-lg px-2.5 py-1.5 shadow-lg"
              style={{ background: H.white, border: `1.6px solid ${H.turquoise}`, height: 41, top: 12 }}
              initial={{ y: 147 }}
              animate={reduced ? { y: 0 } : { y: [147, 98, 49, 0] }}
              transition={{ delay: 1.2, duration: 2.6, times: [0, 0.35, 0.7, 1], ease: 'easeInOut' }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded" style={{ background: H.turquoiseLight }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={H.turquoiseDeep} strokeWidth="1.8" aria-hidden="true"><path d="M4 8l8-4 8 4v8l-8 4-8-4z M4 8l8 4 8-4 M12 12v8" strokeLinejoin="round" /></svg>
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[9px] font-bold" style={{ color: H.turquoiseDeep }}>magazaniz.com › yürüyüş ayakkabısı</div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="flex">{[0, 1, 2, 3, 4].map((s) => <Star key={s} />)}</span>
                  <span className="rounded-full px-1.5 text-[8px] font-semibold" style={{ background: H.turquoiseLight, color: H.turquoiseDeep }}>Stokta</span>
                </div>
              </div>
              <motion.span {...popIn(3.9)} className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: H.saffron, color: H.white }}>
                ↑ 1. sıra
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
        {/* Arama → Kategori → Ürün, each highlighted once */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {path.map((label, i) => (
            <React.Fragment key={label}>
              <motion.span
                className="rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm"
                style={{ background: H.white, color: H.turquoiseDeep, border: `1px solid ${H.sand}` }}
                animate={reduced ? undefined : { backgroundColor: [H.white, H.turquoiseLight, H.white], borderColor: [H.sand, H.turquoise, H.sand] }}
                transition={{ delay: 4.3 + i * 0.6, duration: 0.9 }}
              >
                {label}
              </motion.span>
              {i < path.length - 1 && <span className="text-[10px] font-bold" style={{ color: H.turquoise }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </Scene>
  );
}

/* ── Teknik SEO: 404 → 301 → 200, Tara · Önceliklendir · Doğrula ───────── */
const STATUS = [
  { code: '404', text: 'Bulunamadı', bg: '#fbe9e4', fg: H.terracotta },
  { code: '301', text: 'Yönlendirme', bg: H.ivory, fg: '#a8661a' },
  { code: '200', text: 'İndekslenebilir', bg: H.turquoiseLight, fg: H.turquoiseDeep },
];

export function TechnicalAuditScene() {
  const reduced = useReducedMotion();
  // Same first render on server and client (hydration-safe); reduced motion jumps to the end state after mount.
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    if (reduced) { setStep(2); return; }
    const timers = [setTimeout(() => setStep(1), 1600), setTimeout(() => setStep(2), 2800)];
    return () => timers.forEach(clearTimeout);
  }, [reduced]);
  const s = STATUS[step];
  const cards = ['Tara', 'Önceliklendir', 'Doğrula'];
  const vitals: [string, number, string][] = [['LCP', 0.78, H.turquoise], ['INP', 0.62, H.saffron], ['CLS', 0.86, H.turquoise]];
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={8} />
      <motion.div {...riseIn(0.1)} className="absolute inset-4 flex items-center justify-center sm:inset-6">
        <motion.div
          className="w-full overflow-hidden rounded-xl shadow-2xl"
          style={{ background: H.white, border: `1px solid ${H.sand}` }}
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: H.ivory, borderBottom: `1px solid ${H.sand}` }}>
            <Search />
            <div className="flex h-5 flex-1 items-center rounded-full px-2.5 font-mono text-[9px]" style={{ background: H.white, border: `1px solid ${H.sand}`, color: H.ink }}>
              siteniz.com/hizmetler/web
            </div>
          </div>
          <div className="space-y-3 p-3">
            {/* status chip */}
            <div className="flex items-center justify-between rounded-lg px-3 py-2" style={{ background: H.ivory }}>
              <span className="text-[10px] font-semibold" style={{ color: H.ink }}>URL durumu</span>
              <motion.span key={s.code} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: s.bg, color: s.fg }}>
                <span className="font-mono">{s.code}</span><span className="font-semibold">· {s.text}</span>
              </motion.span>
            </div>
            {/* Tara · Önceliklendir · Doğrula */}
            <div className="grid grid-cols-3 gap-2">
              {cards.map((label, i) => (
                <motion.div key={label} className="rounded-lg px-2 py-2 text-center"
                  style={{ border: `1.4px solid ${H.sand}`, background: H.white }}
                  animate={reduced ? undefined : { borderColor: [H.sand, H.turquoise, H.sand], backgroundColor: [H.white, H.turquoiseLight, H.white] }}
                  transition={{ delay: 0.8 + i * 0.7, duration: 1 }}>
                  <span className="mx-auto mb-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: H.turquoiseDeep }}>{i + 1}</span>
                  <span className="block text-[9px] font-semibold" style={{ color: H.ink }}>{label}</span>
                </motion.div>
              ))}
            </div>
            {/* Core Web Vitals bars (representative) */}
            <div className="space-y-1.5 rounded-lg p-2.5" style={{ background: H.ivory }}>
              {vitals.map(([name, fill, color], i) => (
                <div key={name} className="flex items-center gap-2">
                  <span className="w-7 text-[9px] font-bold" style={{ color: H.ink }}>{name}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: H.sand }}>
                    <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${fill * 100}%` }} transition={reduced ? { duration: 0 } : { delay: 1.2 + i * 0.25, duration: 0.9, ease: 'easeOut' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Scene>
  );
}

/* ── Google Ads: the sponsored result climbs to the top, then Hedef → Kampanya → Ölçüm ── */
export function GoogleAdsScene() {
  const reduced = useReducedMotion();
  const rows = [0, 1, 2, 3];
  const cards = ['Hedef', 'Kampanya', 'Ölçüm'];
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={8} />
      <motion.div {...riseIn(0.1)} className="absolute inset-4 flex flex-col items-center justify-center gap-3 sm:inset-6">
        <motion.div
          className="w-full overflow-hidden rounded-xl shadow-2xl"
          style={{ background: H.white, border: `1px solid ${H.sand}` }}
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: H.ivory, borderBottom: `1px solid ${H.sand}` }}>
            <Search />
            <div className="flex h-5 flex-1 items-center overflow-hidden rounded-full px-2.5 text-[9px] font-semibold" style={{ background: H.white, border: `1px solid ${H.sand}`, color: H.ink }}>
              <motion.span className="inline-block overflow-hidden whitespace-nowrap" initial={{ maxWidth: 0 }} animate={{ maxWidth: 170 }} transition={{ delay: 0.4, duration: 0.9, ease: 'linear' }}>
                endüstriyel kompresör bakımı
              </motion.span>
            </div>
          </div>
          <div className="relative space-y-2 p-3" style={{ height: 196 }}>
            {rows.map((i) => (
              <div key={i} className="rounded-lg px-3 py-2 space-y-1.5" style={{ background: H.ivory, height: 41 }}>
                <div className="h-1.5 rounded-full" style={{ background: H.sand, width: `${70 - i * 8}%` }} />
                <div className="h-1.5 rounded-full" style={{ background: H.sand, width: '40%', opacity: 0.6 }} />
              </div>
            ))}
            {/* the sponsored result */}
            <motion.div
              className="absolute left-3 right-3 flex items-center gap-2 rounded-lg px-2.5 py-1.5 shadow-lg"
              style={{ background: H.white, border: `1.6px solid ${H.turquoise}`, height: 41, top: 12 }}
              initial={{ y: 147 }}
              animate={reduced ? { y: 0 } : { y: [147, 98, 49, 0] }}
              transition={{ delay: 1.2, duration: 2.6, times: [0, 0.35, 0.7, 1], ease: 'easeInOut' }}
            >
              <span className="shrink-0 rounded px-1.5 py-0.5 text-[8px] font-bold" style={{ border: `1px solid ${H.turquoiseDeep}`, color: H.turquoiseDeep }}>Sponsorlu</span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[9px] font-bold" style={{ color: H.turquoiseDeep }}>siteniz.com › kompresör-bakımı</div>
                <div className="mt-1 h-1.5 w-3/5 rounded-full" style={{ background: H.turquoiseLight }} />
              </div>
              <motion.span {...popIn(3.9)} className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: H.saffron, color: H.white }}>
                Form ✓
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
        {/* Hedef → Kampanya → Ölçüm, each highlighted once */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {cards.map((label, i) => (
            <React.Fragment key={label}>
              <motion.span
                className="rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm"
                style={{ background: H.white, color: H.turquoiseDeep, border: `1px solid ${H.sand}` }}
                animate={reduced ? undefined : { backgroundColor: [H.white, H.turquoiseLight, H.white], borderColor: [H.sand, H.turquoise, H.sand] }}
                transition={{ delay: 4.3 + i * 0.6, duration: 0.9 }}
              >
                {label}
              </motion.span>
              {i < cards.length - 1 && <span className="text-[10px] font-bold" style={{ color: H.turquoise }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </Scene>
  );
}
