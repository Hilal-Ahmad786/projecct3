'use client';

// Flagship homepage hero — orbital Modern Heritage scene. Capability
// nodes revolve around a central girih star (recreating the original
// orbit motion) while each node's icon counter-rotates to stay upright.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { H, GirihHalo, HeritageParticles, starPoints, popIn } from '@/components/services/hero-visuals/primitives';
import { HERO_NODES, HeroIcon } from '@/components/heritage/hero-nodes';

const CX = 200, CY = 200, ORBIT = 134, NODE_R = 30, SPIN = 38; // seconds per revolution

function nodePos(angle: number) {
  const a = (angle * Math.PI) / 180;
  return { x: CX + ORBIT * Math.cos(a), y: CY + ORBIT * Math.sin(a) };
}

export default function HomeHeroOrbit() {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  // Infinite SVG rotations repaint every frame — a constant main-thread
  // cost that makes mid-range phones feel like they're hanging. Render
  // the scene statically on mobile (and for reduced-motion users).
  const reduced = prefersReduced || isMobile;

  return (
    <div className="relative w-[320px] sm:w-[380px] md:w-[460px] max-w-full mx-auto aspect-square">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full blur-3xl pointer-events-none"
        style={{ background: H.turquoise, opacity: 0.1 }}
      />
      <GirihHalo size={460} color={H.saffron} opacity={0.2} />
      {!reduced && <HeritageParticles count={14} />}

      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* static orbit ring */}
        <circle cx={CX} cy={CY} r={ORBIT} fill="none" stroke={H.lapis} strokeWidth="1" strokeDasharray="3 8" opacity="0.3" />

        {/* ── revolving system: connections + nodes rotate as one ── */}
        <motion.g
          style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: 'fill-box' } as React.CSSProperties}
          initial={{ rotate: 0 }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: SPIN, repeat: Infinity, ease: 'linear' }}
        >
          {/* connection spokes core → node */}
          {HERO_NODES.map((n, i) => {
            const p = nodePos(n.angle);
            return (
              <motion.line
                key={`l${i}`}
                x1={CX} y1={CY} x2={p.x} y2={p.y}
                stroke={n.color} strokeWidth="1.5" opacity={0.4}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.7 }}
              />
            );
          })}

          {/* nodes */}
          {HERO_NODES.map((n, i) => {
            const p = nodePos(n.angle);
            return (
              <motion.g key={`n${i}`} {...popIn(0.5 + i * 0.13)}>
                <circle cx={p.x} cy={p.y} r={NODE_R} fill={H.white} stroke={n.color} strokeWidth="2" />
                {/* girih ring */}
                <polygon
                  points={starPoints(p.x, p.y, NODE_R - 7, (NODE_R - 7) * 0.55)}
                  fill="none" stroke={n.color} strokeWidth="1" opacity="0.3"
                />
                {/* icon counter-rotates so it stays upright as the system revolves */}
                <motion.g
                  style={{ transformOrigin: `${p.x}px ${p.y}px`, transformBox: 'fill-box' } as React.CSSProperties}
                  animate={reduced ? undefined : { rotate: -360 }}
                  transition={{ duration: SPIN, repeat: Infinity, ease: 'linear' }}
                >
                  <g transform={`translate(${p.x} ${p.y})`}><HeroIcon kind={n.icon} color={n.color} /></g>
                </motion.g>
              </motion.g>
            );
          })}
        </motion.g>

        {/* ── central PakSoft core (fixed position, spins on its own axis) ── */}
        <motion.g {...popIn(0.2)}>
          {!reduced && (
            <motion.circle
              cx={CX} cy={CY} r="46" fill="none" stroke={H.turquoise} strokeWidth="1.5"
              animate={{ r: [44, 66], opacity: [0.5, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <circle cx={CX} cy={CY} r="46" fill={H.white} stroke={H.lapis} strokeWidth="2" />
          <motion.polygon
            points={starPoints(CX, CY, 38, 21)}
            fill="none" stroke={H.turquoise} strokeWidth="2"
            style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: 'fill-box' } as React.CSSProperties}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
          />
          <motion.polygon
            points={starPoints(CX, CY, 24, 13)}
            fill={H.turquoise} opacity="0.12"
            style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: 'fill-box' } as React.CSSProperties}
            animate={reduced ? undefined : { rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.polygon
            points={starPoints(CX, CY, 13, 7)}
            fill={H.saffron}
            animate={reduced ? undefined : { opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
