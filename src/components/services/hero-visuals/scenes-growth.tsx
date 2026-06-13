'use client';

// Growth & specialty scenes: serp-ranking, email-inbox, funnel,
// social-feed, kanban-board, video-player, database-rings, crypto-chain.
// All user-facing words come from useSceneLabels (5-locale support).

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { H, Scene, GirihHalo, HeritageParticles, drawIn, riseIn, popIn, starPoints, useSceneLabels } from './primitives';

/* ── serp-ranking (SEO: result climbs to #1) ─────────────────────── */
export function SerpRankingScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const rows = [0, 1, 2, 3];
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={8} />
      <motion.div {...riseIn(0.1)} className="absolute inset-5 sm:inset-7 flex items-center justify-center">
        <motion.div
          className="w-full rounded-xl shadow-2xl overflow-hidden"
          style={{ background: H.white, border: `1px solid ${H.sand}` }}
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* search bar */}
          <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: H.ivory, borderBottom: `1px solid ${H.sand}` }}>
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke={H.turquoise} strokeWidth="2">
              <circle cx="9" cy="9" r="6" /><path d="m14 14 4 4" strokeLinecap="round" />
            </svg>
            <div className="flex-1 h-5 rounded-full px-2.5 flex items-center" style={{ background: H.white, border: `1px solid ${H.sand}` }}>
              <motion.span
                className="h-1.5 rounded-full"
                style={{ background: H.sand }}
                initial={{ width: 0 }}
                animate={{ width: '55%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
          </div>
          {/* results — your site climbs from row 3 to row 0 */}
          <div className="relative p-3 space-y-2" style={{ height: 190 }}>
            {rows.map(i => (
              <div key={i} className="rounded-lg px-3 py-2 space-y-1.5" style={{ background: H.ivory, height: 40 }}>
                <div className="h-1.5 rounded-full" style={{ background: H.sand, width: `${70 - i * 8}%` }} />
                <div className="h-1.5 rounded-full" style={{ background: H.sand, width: '40%', opacity: 0.6 }} />
              </div>
            ))}
            {/* the highlighted result */}
            <motion.div
              className="absolute left-3 right-3 rounded-lg px-3 py-2 shadow-lg flex items-center justify-between"
              style={{ background: H.white, border: `1.6px solid ${H.turquoise}`, height: 40, top: 12 }}
              initial={{ y: 144 }}
              animate={reduced ? { y: 0 } : { y: [144, 96, 48, 0] }}
              transition={{ delay: 1, duration: 2.6, times: [0, 0.35, 0.7, 1], ease: 'easeInOut' }}
            >
              <div className="space-y-1.5 flex-1">
                <div className="text-[9px] font-bold" style={{ color: H.turquoiseDeep }}>{L('yourSite', 'your-website.com')}</div>
                <div className="h-1.5 rounded-full w-3/5" style={{ background: H.turquoiseLight }} />
              </div>
              <motion.span {...popIn(3.7)} className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: H.saffron, color: H.white }}>
                ↑ {L('rankUp', '#1 ranking')}
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Scene>
  );
}

/* ── email-inbox (email marketing) ───────────────────────────────── */
export function EmailInboxScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const mails = [
    { key: 'subject1', color: H.turquoise },
    { key: 'subject2', color: H.saffron },
    { key: 'subject3', color: H.terracotta },
  ];
  return (
    <Scene glow={H.saffron}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={8} colors={[H.saffron, H.turquoise, H.terracotta]} />
      <motion.div {...riseIn(0.1)} className="absolute inset-5 sm:inset-7 flex items-center justify-center">
        <motion.div
          className="w-full rounded-xl shadow-2xl overflow-hidden"
          style={{ background: H.white, border: `1px solid ${H.sand}` }}
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* header with open-rate */}
          <div className="flex items-center justify-between px-3 py-2.5" style={{ background: H.lapis }}>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={H.saffron} strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
              </svg>
              <span className="text-[10px] font-semibold text-white">Inbox</span>
            </div>
            <motion.span {...popIn(2.6)} className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(232,163,61,0.25)', color: H.saffron }}>
              68% {L('openRate', 'open rate')}
            </motion.span>
          </div>
          {/* mails slide in */}
          <div className="p-2.5 space-y-2">
            {mails.map((m, i) => (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-lg px-3 py-2 flex items-center gap-2.5"
                style={{ background: H.ivory, borderLeft: `3px solid ${m.color}` }}
              >
                <motion.div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: m.color }}
                  animate={i === 0 && !reduced ? { scale: [1, 1.12, 1] } : undefined}
                  transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                >
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5"><polygon points={starPoints(8, 8, 5, 2.8)} fill={H.white} /></svg>
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-bold truncate" style={{ color: H.ink }}>{L(m.key, 'Your weekly growth report')}</div>
                  <div className="h-1.5 rounded-full mt-1.5" style={{ background: H.sand, width: `${75 - i * 12}%` }} />
                </div>
                {i === 0 && (
                  <motion.span {...popIn(1.4)} className="w-2 h-2 rounded-full shrink-0" style={{ background: H.terracotta }} />
                )}
              </motion.div>
            ))}
            {/* send progress */}
            <motion.div {...riseIn(1.9)} className="h-1.5 rounded-full overflow-hidden" style={{ background: H.sand }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(to right, ${H.turquoise}, ${H.saffron})` }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 2.1, duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Scene>
  );
}

/* ── funnel (CRO / landing pages) ────────────────────────────────── */
export function FunnelScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const stages = [
    { labelKey: 'visitors', w: 200, color: H.lapis, pct: '100%' },
    { labelKey: 'signups', w: 144, color: H.turquoise, pct: '38%' },
    { labelKey: 'customers', w: 92, color: H.saffron, pct: '12%' },
  ];
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.terracotta} opacity={0.18} />
      <HeritageParticles count={8} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
        {stages.map((s, i) => (
          <motion.div
            key={s.labelKey}
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4 + i * 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl flex items-center justify-between px-4 shadow-lg"
            style={{ width: s.w, height: 46, background: `linear-gradient(135deg, ${s.color}, ${s.color}dd)` }}
          >
            <span className="text-[10px] font-bold text-white">{L(s.labelKey, s.labelKey)}</span>
            <span className="text-[10px] font-bold text-white/80">{s.pct}</span>
          </motion.div>
        ))}
        {/* dots dropping through */}
        {!reduced && [0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ background: H.terracotta, top: '22%' }}
            animate={{ y: [0, 60, 120, 168], opacity: [0, 1, 1, 0], x: [(i - 1) * 36, (i - 1) * 20, (i - 1) * 9, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: 1.4 + i * 0.7, ease: 'easeIn' }}
          />
        ))}
        {/* optimized badge */}
        <motion.div {...popIn(1.8)} className="mt-1 px-3 py-1 rounded-full text-[10px] font-bold shadow-md" style={{ background: H.turquoise, color: H.white }}>
          {L('optimized', 'optimized ↑')} 3.2×
        </motion.div>
      </div>
    </Scene>
  );
}

/* ── social-feed (social media) ──────────────────────────────────── */
export function SocialFeedScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  return (
    <Scene glow={H.terracotta}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={8} colors={[H.terracotta, H.saffron, H.turquoise]} />
      <motion.div {...riseIn(0.1)} className="absolute inset-x-8 sm:inset-x-12 inset-y-5 flex items-center justify-center">
        <motion.div
          className="w-full max-w-[230px] rounded-2xl shadow-2xl overflow-hidden"
          style={{ background: H.white, border: `1px solid ${H.sand}` }}
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* profile header */}
          <div className="flex items-center gap-2 px-3 py-2.5" style={{ borderBottom: `1px solid ${H.sand}` }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: H.turquoise }}>
              <svg viewBox="0 0 16 16" className="w-4 h-4"><polygon points={starPoints(8, 8, 5.5, 3)} fill={H.white} /></svg>
            </div>
            <div className="flex-1">
              <div className="h-1.5 rounded-full w-20" style={{ background: H.sand }} />
              <motion.div {...popIn(2.2)} className="text-[8px] font-bold mt-1" style={{ color: H.turquoiseDeep }}>
                +12.4k {L('followers', 'followers')}
              </motion.div>
            </div>
          </div>
          {/* post image area with girih pattern */}
          <motion.div {...riseIn(0.5)} className="h-24 relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${H.turquoiseLight}, ${H.sand})` }}>
            <svg viewBox="0 0 60 60" className="w-14 h-14 opacity-60">
              <polygon points={starPoints(30, 30, 22, 12)} fill="none" stroke={H.turquoise} strokeWidth="1.5" />
              <polygon points={starPoints(30, 30, 10, 5.5)} fill={H.saffron} />
            </svg>
            <motion.span
              {...popIn(1)}
              className="absolute top-2 right-2 text-[8px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: H.white, color: H.terracotta }}
            >
              {L('newPost', 'New post published')}
            </motion.span>
          </motion.div>
          {/* engagement row */}
          <div className="flex items-center gap-3 px-3 py-2.5">
            {[H.terracotta, H.turquoise, H.saffron].map((c, i) => (
              <motion.svg
                key={i}
                viewBox="0 0 24 24" className="w-4 h-4"
                fill={i === 0 ? c : 'none'} stroke={c} strokeWidth="2"
                {...popIn(1.2 + i * 0.2)}
              >
                {i === 0 && <path d="M12 21C7 16.5 3 13.2 3 9.5 3 7 5 5 7.5 5c1.7 0 3.2.9 4.5 2.3C13.3 5.9 14.8 5 16.5 5 19 5 21 7 21 9.5c0 3.7-4 7-9 11.5z" />}
                {i === 1 && <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.9-.9L3 21l2-4.9a8.4 8.4 0 1 1 16-4.6z" />}
                {i === 2 && <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />}
              </motion.svg>
            ))}
            <motion.span {...popIn(1.9)} className="ml-auto text-[9px] font-bold" style={{ color: H.terracotta }}>♥ 2,847</motion.span>
          </div>
        </motion.div>
      </motion.div>
      {/* hearts flying out */}
      {!reduced && [0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="absolute text-sm"
          style={{ color: H.terracotta, right: '18%', bottom: '30%' }}
          animate={{ y: [0, -70 - i * 22], x: [0, (i - 1) * 26], opacity: [0, 1, 0], scale: [0.6, 1.1, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 1.8 + i * 0.7 }}
        >♥</motion.span>
      ))}
    </Scene>
  );
}

/* ── kanban-board (teams / project services) ─────────────────────── */
export function KanbanBoardScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const cols = [
    { key: 'todo', color: H.lapis, cards: 2 },
    { key: 'doing', color: H.saffron, cards: 1 },
    { key: 'done', color: H.turquoise, cards: 2 },
  ];
  return (
    <Scene glow={H.lapis}>
      <GirihHalo color={H.turquoise} opacity={0.18} />
      <HeritageParticles count={8} />
      <motion.div {...riseIn(0.1)} className="absolute inset-4 sm:inset-6 flex items-center justify-center">
        <motion.div
          className="w-full rounded-xl shadow-2xl p-3"
          style={{ background: H.white, border: `1px solid ${H.sand}` }}
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="grid grid-cols-3 gap-2.5">
            {cols.map((col, ci) => (
              <motion.div key={col.key} {...riseIn(0.3 + ci * 0.15)} className="rounded-lg p-2" style={{ background: H.ivory }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                  <span className="text-[8px] font-bold uppercase tracking-wide" style={{ color: '#8a8275' }}>{L(col.key, col.key)}</span>
                </div>
                <div className="space-y-1.5" style={{ minHeight: 110 }}>
                  {Array.from({ length: col.cards }).map((_, i) => (
                    <motion.div
                      key={i}
                      {...popIn(0.6 + ci * 0.2 + i * 0.15)}
                      className="rounded-md p-1.5 space-y-1 shadow-sm"
                      style={{ background: H.white, borderTop: `2px solid ${col.color}` }}
                    >
                      <div className="h-1.5 rounded-full" style={{ background: H.sand, width: '85%' }} />
                      <div className="h-1.5 rounded-full" style={{ background: H.sand, width: '55%' }} />
                      <div className="flex -space-x-1 pt-0.5">
                        {[H.turquoise, H.terracotta].slice(0, 2 - i % 2).map((c, j) => (
                          <span key={j} className="w-3 h-3 rounded-full border border-white" style={{ background: c }} />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          {/* moving card */}
          {!reduced && (
            <motion.div
              className="absolute rounded-md p-1.5 shadow-xl w-[26%] space-y-1"
              style={{ background: H.white, borderTop: `2px solid ${H.saffron}`, top: '42%', left: '5%' }}
              animate={{ left: ['5%', '38%', '38%', '71%'], top: ['42%', '46%', '46%', '38%'], rotate: [0, 3, 0, -2] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.4, 0.6, 1], ease: 'easeInOut', delay: 1.6 }}
            >
              <div className="h-1.5 rounded-full" style={{ background: H.sand, width: '80%' }} />
              <div className="h-1.5 rounded-full" style={{ background: H.saffron, width: '45%', opacity: 0.6 }} />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </Scene>
  );
}

/* ── video-player (video production) ─────────────────────────────── */
export function VideoPlayerScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  return (
    <Scene glow={H.terracotta}>
      <GirihHalo color={H.terracotta} opacity={0.2} />
      <HeritageParticles count={8} colors={[H.terracotta, H.saffron, H.turquoise]} />
      <motion.div {...riseIn(0.1)} className="absolute inset-4 sm:inset-6 flex items-center justify-center">
        <motion.div
          className="w-full rounded-xl shadow-2xl overflow-hidden"
          style={{ background: H.lapisDeep, border: '1px solid rgba(232,163,61,0.3)' }}
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* screen */}
          <div className="relative h-32 sm:h-36 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${H.lapis}, ${H.lapisDeep})` }}>
            {/* girih backdrop */}
            <svg viewBox="0 0 80 80" className="absolute w-20 h-20 opacity-20">
              <polygon points={starPoints(40, 40, 30, 16)} fill="none" stroke={H.saffron} strokeWidth="1.5" />
            </svg>
            {/* play button pulses */}
            <motion.div
              className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl cursor-pointer"
              style={{ background: H.terracotta }}
              {...popIn(0.6)}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 ml-0.5" fill={H.white}><path d="M8 5v14l11-7z" /></svg>
              {!reduced && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${H.terracotta}` }}
                  animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                />
              )}
            </motion.div>
            {/* views badge */}
            <motion.span {...popIn(2)} className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,0,0,0.45)', color: H.white }}>
              ▶ 48.2k {L('views', 'views')}
            </motion.span>
          </div>
          {/* timeline */}
          <div className="px-3 py-3 space-y-2">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(to right, ${H.terracotta}, ${H.saffron})` }}
                initial={{ width: '0%' }}
                animate={reduced ? { width: '64%' } : { width: ['0%', '64%'] }}
                transition={{ delay: 1.2, duration: 3, ease: 'linear' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.span
                    key={i}
                    className="w-5 h-3 rounded-sm"
                    style={{ background: i === 2 ? H.saffron : 'rgba(255,255,255,0.18)' }}
                    {...popIn(1.4 + i * 0.1)}
                  />
                ))}
              </div>
              <span className="text-[8px]" style={{ color: '#9fb3d1' }}>{L('watchTime', 'watch time')} +87%</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Scene>
  );
}

/* ── database-rings (databases) ──────────────────────────────────── */
export function DatabaseRingsScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  return (
    <Scene glow={H.lapis}>
      <GirihHalo color={H.turquoise} opacity={0.18} />
      <HeritageParticles count={8} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* cylinder stack */}
        {[0, 1, 2].map(i => (
          <motion.g key={i} {...riseIn(0.3 + i * 0.25)}>
            <ellipse cx="120" cy={86 + i * 36} rx="52" ry="13" fill={i === 0 ? H.lapis : 'none'} stroke={H.lapis} strokeWidth="2" />
            <path d={`M 68 ${86 + i * 36} v 22 a 52 13 0 0 0 104 0 v -22`} fill="rgba(26,58,107,0.06)" stroke={H.lapis} strokeWidth="2" />
          </motion.g>
        ))}
        <motion.polygon points={starPoints(120, 86, 8, 4.5)} fill={H.saffron} {...popIn(1.2)} />
        {/* queries flowing in/out */}
        {!reduced && (
          <>
            <motion.circle r="3.5" fill={H.saffron}
              animate={{ cx: [30, 68], cy: [60, 100], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 1.4 }} />
            <motion.circle r="3.5" fill={H.terracotta}
              animate={{ cx: [172, 212], cy: [120, 80], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 2.2 }} />
          </>
        )}
        <motion.path d="M 30 60 Q 50 80 68 100" fill="none" stroke={H.turquoise} strokeWidth="1.4" strokeDasharray="3 4" opacity="0.5" {...drawIn(1, 0.7)} />
        <motion.path d="M 172 120 Q 196 100 212 80" fill="none" stroke={H.turquoise} strokeWidth="1.4" strokeDasharray="3 4" opacity="0.5" {...drawIn(1.2, 0.7)} />
      </svg>
      {/* badges */}
      <motion.div {...popIn(1.9)} className="absolute left-1/2 -translate-x-1/2 bottom-7 flex gap-2">
        <span className="px-2.5 py-1 rounded-full text-[9px] font-bold shadow" style={{ background: H.turquoise, color: H.white }}>⚡ {L('queryTime', 'query 12ms')}</span>
        <span className="px-2.5 py-1 rounded-full text-[9px] font-bold shadow" style={{ background: H.white, color: H.lapis, border: `1px solid ${H.lapis}` }}>{L('indexed', 'indexed ✓')}</span>
      </motion.div>
    </Scene>
  );
}

/* ── crypto-chain (blockchain / web3) ────────────────────────────── */
export function CryptoChainScene() {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  const blocks = [44, 104, 164];
  return (
    <Scene glow={H.saffron}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={10} colors={[H.saffron, H.turquoise, H.lapis]} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* chain links */}
        {blocks.slice(0, -1).map((x, i) => (
          <g key={i}>
            <motion.line x1={x + 34} y1="104" x2={blocks[i + 1] - 2} y2="104" stroke={H.saffron} strokeWidth="2.5" strokeDasharray="5 4" {...drawIn(0.8 + i * 0.4, 0.6)} />
            {!reduced && (
              <motion.circle r="3" fill={H.terracotta}
                animate={{ cx: [x + 34, blocks[i + 1] - 2], cy: 104, opacity: [0, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 2 + i * 0.7 }} />
            )}
          </g>
        ))}
        {/* blocks assemble */}
        {blocks.map((x, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: -50, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.3 + i * 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <rect x={x} y="84" width="34" height="40" rx="7" fill={i === 2 ? H.saffron : H.white} stroke={i === 2 ? H.saffron : H.lapis} strokeWidth="2" />
            <polygon points={starPoints(x + 17, 98, 6, 3.4)} fill={i === 2 ? H.white : H.turquoise} />
            <rect x={x + 8} y="110" width="18" height="3" rx="1.5" fill={i === 2 ? 'rgba(255,255,255,0.6)' : H.sand} />
          </motion.g>
        ))}
        {/* hash ticker under chain */}
        <motion.text {...riseIn(1.6)} x="120" y="146" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#8a8275">0x7f3a…e91c</motion.text>
        {/* confirmation ring */}
        {!reduced && (
          <motion.circle cx="181" cy="104" r="26" fill="none" stroke={H.saffron} strokeWidth="1.5"
            animate={{ r: [24, 40], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 2.4 }} />
        )}
        {/* wallet */}
        <motion.g {...popIn(1.9)}>
          <rect x="86" y="170" width="68" height="34" rx="9" fill={H.lapis} />
          <circle cx="140" cy="187" r="6" fill={H.saffron} />
          <text x="104" y="191" textAnchor="middle" fontSize="9" fontWeight="700" fill={H.white}>{'₿'}</text>
        </motion.g>
      </svg>
      <motion.div {...popIn(2.5)} className="absolute left-1/2 -translate-x-1/2 bottom-4 px-3 py-1 rounded-full text-[9px] font-bold shadow" style={{ background: H.turquoise, color: H.white }}>
        ✓ {L('blockConfirmed', 'block confirmed')}
      </motion.div>
    </Scene>
  );
}
