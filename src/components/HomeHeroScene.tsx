'use client';

// Flagship homepage hero scene — Modern Heritage style, matching the
// crisp service-page scenes. A central girih "core" (PakSoft) with six
// capability nodes orbiting on drawn connections, signals travelling
// core → node. Built on the same primitives as the service scenes.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { H, GirihHalo, HeritageParticles, starPoints, popIn, drawIn } from '@/components/services/hero-visuals/primitives';
import { HERO_NODES as NODES, HeroIcon as Icon } from '@/components/heritage/hero-nodes';

const CX = 200, CY = 200, ORBIT = 132, NODE_R = 30;

function nodePos(angle: number) {
  const a = (angle * Math.PI) / 180;
  return { x: CX + ORBIT * Math.cos(a), y: CY + ORBIT * Math.sin(a) };
}

export default function HomeHeroScene() {
  const reduced = useReducedMotion();

  return (
    <div className="relative w-[320px] sm:w-[380px] md:w-[440px] max-w-full mx-auto aspect-square">
      {/* ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full blur-3xl pointer-events-none"
        style={{ background: H.turquoise, opacity: 0.1 }}
      />
      <GirihHalo size={460} color={H.saffron} opacity={0.22} />
      <HeritageParticles count={14} />

      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* orbit ring */}
        <motion.circle
          cx={CX} cy={CY} r={ORBIT}
          fill="none" stroke={H.lapis} strokeWidth="1" strokeDasharray="3 7" opacity="0.35"
          {...drawIn(0.3, 1.4)}
        />

        {/* connections core → node, with travelling signals */}
        {NODES.map((n, i) => {
          const pos = nodePos(n.angle);
          const d = `M ${CX} ${CY} L ${pos.x} ${pos.y}`;
          return (
            <g key={`c${i}`}>
              <motion.path d={d} stroke={n.color} strokeWidth="1.5" fill="none" opacity={0.45} {...drawIn(0.6 + i * 0.12, 0.7)} />
              {!reduced && (
                <motion.circle
                  r="3.2" fill={n.color}
                  initial={{ cx: CX, cy: CY, opacity: 0 }}
                  animate={{ cx: [CX, pos.x], cy: [CY, pos.y], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 1.6 + i * 0.35, repeatDelay: 1.4, ease: 'easeInOut' }}
                />
              )}
            </g>
          );
        })}

        {/* capability nodes */}
        {NODES.map((n, i) => {
          const pos = nodePos(n.angle);
          return (
            <motion.g key={`n${i}`} {...popIn(0.5 + i * 0.13)}>
              <circle cx={pos.x} cy={pos.y} r={NODE_R} fill={H.white} stroke={n.color} strokeWidth="2" />
              {/* girih star ring behind icon */}
              <motion.polygon
                points={starPoints(pos.x, pos.y, NODE_R - 6, (NODE_R - 6) * 0.55)}
                fill="none" stroke={n.color} strokeWidth="1" opacity="0.35"
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                animate={reduced ? undefined : { rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 28 + i * 4, repeat: Infinity, ease: 'linear' }}
              />
              <g transform={`translate(${pos.x} ${pos.y})`}><Icon kind={n.icon} color={n.color} /></g>
            </motion.g>
          );
        })}

        {/* central PakSoft core — layered girih star */}
        <motion.g {...popIn(0.2)}>
          {/* outer pulse ring */}
          {!reduced && (
            <motion.circle
              cx={CX} cy={CY} r="46" fill="none" stroke={H.turquoise} strokeWidth="1.5"
              animate={{ r: [44, 64], opacity: [0.5, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <circle cx={CX} cy={CY} r="46" fill={H.white} stroke={H.lapis} strokeWidth="2" />
          {/* slow-rotating outer girih star */}
          <motion.polygon
            points={starPoints(CX, CY, 38, 21)}
            fill="none" stroke={H.turquoise} strokeWidth="2"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
          />
          {/* counter-rotating inner star */}
          <motion.polygon
            points={starPoints(CX, CY, 24, 13)}
            fill={H.turquoise} opacity="0.12"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
            animate={reduced ? undefined : { rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          {/* saffron core */}
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
