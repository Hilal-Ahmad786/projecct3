'use client';

// Page-type scenes for service internal pages (pricing, blog).
// Unlike the service archetypes, these express the PAGE's purpose and
// are reused across all services, tinted by the service accent.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { H, Scene, GirihHalo, HeritageParticles, riseIn, popIn, starPoints, useSceneLabels } from './primitives';

/* ── pricing: three tier cards + value balance ───────────────────── */
export function PricingTiersScene({ accent = H.turquoise }: { accent?: string }) {
  const reduced = useReducedMotion();
  const tiers = [
    { h: 64, delay: 0.3, highlight: false },
    { h: 88, delay: 0.5, highlight: true },
    { h: 74, delay: 0.7, highlight: false },
  ];
  return (
    <Scene glow={accent}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={8} colors={[accent, H.saffron, H.terracotta]} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-end gap-3">
          {tiers.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: t.highlight ? 1.06 : 1 }}
              transition={{ delay: t.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl shadow-xl px-3 pt-3 pb-2.5 w-[88px] relative"
              style={{
                background: t.highlight ? `linear-gradient(160deg, ${accent}, ${H.lapisDeep})` : H.white,
                border: t.highlight ? 'none' : `1px solid ${H.sand}`,
              }}
            >
              {t.highlight && (
                <motion.span
                  {...popIn(1.2)}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[7px] font-bold"
                  style={{ background: H.saffron, color: H.white }}
                >★</motion.span>
              )}
              {/* girih seal */}
              <svg viewBox="0 0 20 20" className="w-5 h-5 mb-2">
                <polygon points={starPoints(10, 10, 7, 4)} fill={t.highlight ? H.saffron : accent} opacity={0.9} />
              </svg>
              {/* price line */}
              <div className="h-2 rounded-full mb-2" style={{ background: t.highlight ? 'rgba(255,255,255,0.45)' : H.sand, width: '70%' }} />
              {/* feature ticks */}
              <div className="space-y-1.5" style={{ height: t.h - 40 }}>
                {[0, 1, 2].slice(0, Math.round(t.h / 28)).map(j => (
                  <motion.div key={j} {...riseIn(t.delay + 0.4 + j * 0.15)} className="flex items-center gap-1">
                    <span className="text-[7px] font-bold" style={{ color: t.highlight ? H.saffron : accent }}>✓</span>
                    <span className="h-1 rounded-full flex-1" style={{ background: t.highlight ? 'rgba(255,255,255,0.3)' : H.ivory }} />
                  </motion.div>
                ))}
              </div>
              {/* CTA pill */}
              <motion.div
                {...popIn(t.delay + 0.9)}
                className="h-4 rounded-full mt-2"
                style={{ background: t.highlight ? H.saffron : `${accent}22`, border: t.highlight ? 'none' : `1px solid ${accent}` }}
              />
            </motion.div>
          ))}
        </div>
        {/* floating coin */}
        {!reduced && (
          <motion.div
            className="absolute w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: H.saffron, top: '18%', right: '16%' }}
            animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 14 14" className="w-3.5 h-3.5"><polygon points={starPoints(7, 7, 5, 2.8)} fill={H.white} /></svg>
          </motion.div>
        )}
      </div>
    </Scene>
  );
}

/* ── blog: article cards + writing pen ───────────────────────────── */
export function BlogFeedScene({ accent = H.turquoise }: { accent?: string }) {
  const reduced = useReducedMotion();
  const L = useSceneLabels();
  return (
    <Scene glow={accent}>
      <GirihHalo color={H.terracotta} opacity={0.18} />
      <HeritageParticles count={8} colors={[accent, H.saffron, H.terracotta]} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-56">
          {/* stacked article cards */}
          {[2, 1, 0].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: (i - 1) * 3 }}
              animate={{ opacity: 1, y: i * -14, rotate: (i - 1) * 2.5 }}
              transition={{ delay: 0.3 + (2 - i) * 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 rounded-xl shadow-xl p-3"
              style={{ background: H.white, border: `1px solid ${H.sand}`, top: 30, zIndex: 3 - i }}
            >
              {/* cover band with girih */}
              <div className="h-12 rounded-lg mb-2.5 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accent}1f, ${H.sand})` }}>
                <svg viewBox="0 0 32 32" className="w-8 h-8 opacity-70">
                  <polygon points={starPoints(16, 16, 11, 6)} fill="none" stroke={accent} strokeWidth="1.4" />
                </svg>
              </div>
              {/* title lines — top card gets "written" */}
              {i === 0 ? (
                <>
                  <motion.div
                    className="h-2 rounded-full mb-1.5"
                    style={{ background: accent, opacity: 0.85 }}
                    initial={{ width: 0 }}
                    animate={{ width: '78%' }}
                    transition={{ delay: 1.2, duration: 0.9, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="h-1.5 rounded-full mb-1"
                    style={{ background: H.sand }}
                    initial={{ width: 0 }}
                    animate={{ width: '95%' }}
                    transition={{ delay: 1.7, duration: 0.8 }}
                  />
                  <motion.div
                    className="h-1.5 rounded-full"
                    style={{ background: H.sand }}
                    initial={{ width: 0 }}
                    animate={{ width: '62%' }}
                    transition={{ delay: 2.1, duration: 0.7 }}
                  />
                  <div className="flex items-center justify-between mt-2.5">
                    <motion.span {...popIn(2.5)} className="text-[8px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${accent}1c`, color: accent }}>
                      {L('newPost', 'New post published')}
                    </motion.span>
                    <motion.span {...popIn(2.7)} className="text-[8px] font-semibold" style={{ color: '#9a9183' }}>5 min</motion.span>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-2 rounded-full mb-1.5" style={{ background: H.sand, width: '70%' }} />
                  <div className="h-1.5 rounded-full" style={{ background: H.ivory, width: '88%' }} />
                </>
              )}
            </motion.div>
          ))}
          {/* writing pen follows the title line */}
          {!reduced && (
            <motion.div
              className="absolute z-10"
              style={{ top: 76, left: 0 }}
              initial={{ x: 8, opacity: 0 }}
              animate={{ x: [8, 150], opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.2, duration: 1.1, ease: 'easeOut' }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ transform: 'rotate(40deg)' }}>
                <path d="M3 21l3.8-1 11.4-11.4a2 2 0 0 0 0-2.8l-1-1a2 2 0 0 0-2.8 0L3 16.2 2 20z" fill={H.saffron} stroke={H.lapisDeep} strokeWidth="1" />
              </svg>
            </motion.div>
          )}
        </div>
      </div>
    </Scene>
  );
}
