'use client';

// Infrastructure scenes: cloud-stack, gear-system, shield-lock,
// workflow-diagram, satellite, globe.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { H, Scene, GirihHalo, HeritageParticles, drawIn, riseIn, popIn, starPoints, octagonPoints , useSceneLabels } from './primitives';

/* ── cloud-stack ─────────────────────────────────────────────────── */
const CLOUD_D = 'M 78 128 a 26 26 0 0 1 6 -51 a 34 34 0 0 1 66 -8 a 24 24 0 0 1 14 45 q -4 14 -20 14 h -52 q -10 0 -14 -8 z';

export function CloudStackScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  const orbiters = [
    { label: 'API', color: H.terracotta },
    { label: 'DB', color: H.lapis },
    { label: 'CDN', color: H.saffron },
  ];
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.turquoise} opacity={0.2} />
      <HeritageParticles count={10} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* cloud */}
        <motion.path d={CLOUD_D} fill="rgba(14,124,123,0.1)" stroke={H.turquoise} strokeWidth="2.5" strokeLinejoin="round" {...drawIn(0.3, 1.4)} />
        {/* girih core inside cloud */}
        <motion.polygon
          points={starPoints(122, 92, 16, 9)}
          fill={H.turquoise}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: '122px 92px' }}
          transition={{ delay: 1.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        />
        {/* upload / download streams */}
        {!reduced && [0, 1, 2].map(i => (
          <motion.circle
            key={`u${i}`} r="3" fill={i === 1 ? H.saffron : H.terracotta}
            initial={{ cx: 96 + i * 26, cy: 196, opacity: 0 }}
            animate={{ cy: i === 1 ? [140, 196] : [196, 140], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: 1.8 + i * 0.5 }}
          />
        ))}
        {[0, 1, 2].map(i => (
          <motion.line
            key={`s${i}`} x1={96 + i * 26} y1="140" x2={96 + i * 26} y2="196"
            stroke={H.turquoise} strokeWidth="1.2" strokeDasharray="3 4" opacity="0.5"
            {...drawIn(1.2 + i * 0.2, 0.6)}
          />
        ))}
        {/* ground services */}
        <motion.g {...riseIn(1.4)}>
          <rect x="76" y="196" width="92" height="20" rx="7" fill={H.white} stroke={H.sand} strokeWidth="1.5" />
          <text x="122" y="209.5" textAnchor="middle" fontSize="9" fontWeight="600" fill={H.lapis}>{L('yourInfra', 'your infrastructure')}</text>
        </motion.g>
      </svg>
      {/* orbiting service chips */}
      {!reduced && (
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          {orbiters.map((o, i) => {
            const a = (i / orbiters.length) * 2 * Math.PI;
            return (
              <motion.div
                key={o.label}
                className="absolute w-10 h-10 rounded-xl shadow-lg flex items-center justify-center"
                style={{
                  left: `calc(50% + ${Math.cos(a) * 42}% - 20px)`,
                  top: `calc(42% + ${Math.sin(a) * 42}% - 20px)`,
                  background: H.white,
                  border: `1.5px solid ${o.color}`,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-[9px] font-bold" style={{ color: o.color }}>{o.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </Scene>
  );
}

/* ── gear-system (meshed gears + task conveyor) ──────────────────── */
function Gear({ cx, cy, r, teeth, color, dir = 1, duration = 14, delay = 0 }: { cx: number; cy: number; r: number; teeth: number; color: string; dir?: 1 | -1; duration?: number; delay?: number }) {
  const reduced = useReducedMotion();
  const toothShapes = Array.from({ length: teeth }, (_, i) => {
    const a = (2 * Math.PI / teeth) * i;
    return (
      <rect
        key={i}
        x={cx - 3.2} y={cy - r - 5.5} width="6.4" height="9" rx="2"
        transform={`rotate(${(a * 180) / Math.PI} ${cx} ${cy})`}
        fill={color}
      />
    );
  });
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <motion.g
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        animate={reduced ? undefined : { rotate: 360 * dir }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {toothShapes}
        <circle cx={cx} cy={cy} r={r} fill={color} />
        <circle cx={cx} cy={cy} r={r * 0.62} fill={H.ivory} />
        <polygon points={starPoints(cx, cy, r * 0.42, r * 0.24)} fill={color} />
      </motion.g>
    </motion.g>
  );
}

export function GearSystemScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.terracotta}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={8} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        <Gear cx={92} cy={92} r={38} teeth={10} color={H.turquoise} dir={1} duration={16} delay={0.3} />
        <Gear cx={158} cy={130} r={26} teeth={8} color={H.terracotta} dir={-1} duration={11} delay={0.55} />
        <Gear cx={108} cy={172} r={19} teeth={7} color={H.saffron} dir={1} duration={8} delay={0.75} />
        {/* task conveyor */}
        <motion.line x1="28" y1="218" x2="212" y2="218" stroke={H.lapis} strokeWidth="2" strokeLinecap="round" {...drawIn(1, 0.8)} />
        {!reduced && [0, 1, 2].map(i => (
          <motion.g key={i} initial={{ x: -30 }} animate={{ x: 220 }} transition={{ duration: 5, repeat: Infinity, delay: 1.4 + i * 1.7, ease: 'linear' }}>
            <rect x="20" y="206" width="18" height="9" rx="3" fill={H.white} stroke={H.turquoise} strokeWidth="1.4" />
            <text x="29" y="213.5" textAnchor="middle" fontSize="7" fontWeight="700" fill={H.turquoiseDeep}>✓</text>
          </motion.g>
        ))}
      </svg>
    </Scene>
  );
}

/* ── shield-lock (girih shield + scan) ───────────────────────────── */
const SHIELD_D = 'M 120 34 L 178 56 V 118 q 0 46 -58 72 q -58 -26 -58 -72 V 56 Z';

export function ShieldLockScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.lapis}>
      <GirihHalo color={H.turquoise} opacity={0.18} />
      <HeritageParticles count={8} colors={[H.turquoise, H.lapis, H.saffron]} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        <defs>
          <clipPath id="shieldClip"><path d={SHIELD_D} /></clipPath>
        </defs>
        {/* shield outline draws */}
        <motion.path d={SHIELD_D} fill="rgba(26,58,107,0.08)" stroke={H.lapis} strokeWidth="2.5" strokeLinejoin="round" {...drawIn(0.3, 1.3)} />
        {/* girih tiling inside shield */}
        <g clipPath="url(#shieldClip)">
          {[[92, 76], [148, 76], [120, 110], [92, 144], [148, 144]].map(([x, y], i) => (
            <motion.polygon
              key={i}
              points={octagonPoints(x, y, 17)}
              fill="none" stroke={H.turquoise} strokeWidth="1"
              opacity={0.5}
              {...popIn(1 + i * 0.15)}
            />
          ))}
          {/* scanning beam */}
          {!reduced && (
            <motion.rect
              x="56" width="130" height="26"
              fill="url(#scanGrad)"
              initial={{ y: 20 }}
              animate={{ y: [20, 180, 20] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
            />
          )}
        </g>
        <defs>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={H.saffron} stopOpacity="0" />
            <stop offset="50%" stopColor={H.saffron} stopOpacity="0.35" />
            <stop offset="100%" stopColor={H.saffron} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* lock */}
        <motion.g {...popIn(1.3)}>
          <motion.path
            d="M 106 106 v -10 a 14 14 0 0 1 28 0 v 10"
            fill="none" stroke={H.saffron} strokeWidth="4" strokeLinecap="round"
            initial={{ y: -7 }}
            animate={{ y: 0 }}
            transition={{ delay: 2, duration: 0.35, ease: 'easeIn' }}
          />
          <rect x="98" y="106" width="44" height="36" rx="9" fill={H.saffron} />
          <circle cx="120" cy="121" r="5" fill={H.lapisDeep} />
          <rect x="118" y="121" width="4" height="10" rx="2" fill={H.lapisDeep} />
        </motion.g>
        {/* deflected threat dots */}
        {!reduced && [[-1, 60], [1, 100]].map(([side, y], i) => (
          <motion.circle
            key={i}
            r="3.5" fill={H.terracotta}
            initial={{ cx: side === -1 ? -10 : 250, cy: y as number, opacity: 0 }}
            animate={{
              cx: side === -1 ? [-10, 56, 30] : [250, 184, 212],
              cy: [y as number, (y as number) + 24, (y as number) - 28],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 2.4 + i * 1.1, repeatDelay: 1.6 }}
          />
        ))}
        {/* secure badge */}
        <motion.g {...popIn(2.4)}>
          <rect x="86" y="204" width="68" height="20" rx="10" fill={H.turquoise} />
          <text x="120" y="217.5" textAnchor="middle" fontSize="10" fontWeight="700" fill={H.white}>{L('secured', '✓ secured')}</text>
        </motion.g>
      </svg>
    </Scene>
  );
}

/* ── workflow-diagram ────────────────────────────────────────────── */
export function WorkflowDiagramScene() {
  const L = useSceneLabels();
  const reduced = useReducedMotion();
  const steps = [
    { x: 48, y: 56, color: H.turquoise },
    { x: 120, y: 56, color: H.lapis },
    { x: 192, y: 56, color: H.terracotta },
  ];
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.terracotta} opacity={0.18} />
      <HeritageParticles count={8} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* top row nodes */}
        {steps.map((s, i) => (
          <motion.g key={i} {...popIn(0.3 + i * 0.3)}>
            <rect x={s.x - 22} y={s.y - 16} width="44" height="32" rx="9" fill={H.white} stroke={s.color} strokeWidth="2" />
            <polygon points={starPoints(s.x, s.y, 8, 4.5)} fill={s.color} />
          </motion.g>
        ))}
        {/* connectors with pulses */}
        {[0, 1].map(i => (
          <g key={i}>
            <motion.line
              x1={steps[i].x + 24} y1="56" x2={steps[i + 1].x - 24} y2="56"
              stroke={H.lapis} strokeWidth="1.6" {...drawIn(0.6 + i * 0.3, 0.5)} opacity={0.5}
            />
            {!reduced && (
              <motion.circle
                r="3" fill={H.saffron}
                initial={{ cx: steps[i].x + 24, cy: 56, opacity: 0 }}
                animate={{ cx: [steps[i].x + 24, steps[i + 1].x - 24], opacity: [0, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 1.6 + i * 0.7, repeatDelay: 1.4 }}
              />
            )}
          </g>
        ))}
        {/* branch down to decision diamond */}
        <motion.line x1="192" y1="72" x2="192" y2="104" stroke={H.lapis} strokeWidth="1.6" {...drawIn(1.3, 0.4)} opacity={0.5} />
        <motion.g {...popIn(1.6)}>
          <rect x="172" y="104" width="40" height="40" rx="8" fill={H.saffron} transform="rotate(45 192 124)" />
          <text x="192" y="128" textAnchor="middle" fontSize="11" fontWeight="800" fill={H.white}>?</text>
        </motion.g>
        {/* yes / no branches */}
        <motion.path d="M 172 124 H 120 V 188" fill="none" stroke={H.turquoise} strokeWidth="1.6" {...drawIn(2, 0.6)} opacity={0.6} />
        <motion.path d="M 192 144 V 188" fill="none" stroke={H.terracotta} strokeWidth="1.6" strokeDasharray="4 4" {...drawIn(2.2, 0.5)} opacity={0.6} />
        <motion.g {...popIn(2.5)}>
          <rect x="92" y="188" width="56" height="26" rx="13" fill={H.turquoise} />
          <text x="120" y="205" textAnchor="middle" fontSize="10" fontWeight="700" fill={H.white}>{L('ship', '✓ ship')}</text>
        </motion.g>
        <motion.g {...popIn(2.7)}>
          <rect x="166" y="188" width="52" height="26" rx="13" fill={H.white} stroke={H.terracotta} strokeWidth="1.6" />
          <text x="192" y="205" textAnchor="middle" fontSize="10" fontWeight="700" fill={H.terracotta}>{L('retry', 'retry ↻')}</text>
        </motion.g>
        {/* labels above */}
        <motion.text {...riseIn(1)} x="48" y="32" textAnchor="middle" fontSize="9" fill="#8a8275">{L('plan', 'plan')}</motion.text>
        <motion.text {...riseIn(1.1)} x="120" y="32" textAnchor="middle" fontSize="9" fill="#8a8275">{L('build', 'build')}</motion.text>
        <motion.text {...riseIn(1.2)} x="192" y="32" textAnchor="middle" fontSize="9" fill="#8a8275">{L('test', 'test')}</motion.text>
      </svg>
    </Scene>
  );
}

/* ── satellite ───────────────────────────────────────────────────── */
export function SatelliteScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.lapis}>
      <GirihHalo color={H.saffron} opacity={0.2} />
      <HeritageParticles count={12} colors={[H.saffron, H.turquoise, H.white]} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* planet */}
        <motion.circle cx="120" cy="150" r="52" fill={H.lapis} {...popIn(0.3)} />
        <motion.path d="M 70 138 q 50 -26 100 0" fill="none" stroke={H.turquoise} strokeWidth="1.4" opacity="0.7" {...drawIn(0.8, 0.8)} />
        <motion.path d="M 70 158 q 50 26 100 0" fill="none" stroke={H.turquoise} strokeWidth="1.4" opacity="0.7" {...drawIn(0.9, 0.8)} />
        <motion.polygon points={starPoints(120, 150, 14, 8)} fill={H.saffron} {...popIn(1.1)} />
        {/* orbit path */}
        <motion.ellipse cx="120" cy="130" rx="96" ry="54" fill="none" stroke={H.sand} strokeWidth="1.2" strokeDasharray="4 6" {...drawIn(0.5, 1.2)} />
        {/* ground stations ping */}
        {!reduced && [[86, 188], [158, 184]].map(([x, y], i) => (
          <motion.circle
            key={i} cx={x} cy={y} r="4"
            fill="none" stroke={H.saffron} strokeWidth="1.4"
            animate={{ r: [3, 12], opacity: [0.8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 2 + i * 0.7 }}
          />
        ))}
      </svg>
      {/* satellite riding the orbit */}
      {!reduced && (
        <motion.div className="absolute inset-0" style={{ transformOrigin: '50% 54%' }} animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
          <div className="absolute" style={{ left: '50%', top: '10%', transform: 'translateX(-50%)' }}>
            <svg viewBox="0 0 48 24" className="w-12 h-6">
              <rect x="18" y="7" width="12" height="10" rx="2.5" fill={H.terracotta} />
              <rect x="2" y="9" width="13" height="6" rx="1.5" fill={H.turquoise} />
              <rect x="33" y="9" width="13" height="6" rx="1.5" fill={H.turquoise} />
              <line x1="24" y1="7" x2="24" y2="2" stroke={H.saffron} strokeWidth="1.6" />
              <circle cx="24" cy="2" r="1.8" fill={H.saffron} />
            </svg>
          </div>
        </motion.div>
      )}
    </Scene>
  );
}

/* ── globe (global reach) ────────────────────────────────────────── */
const ARCS = [
  'M 78 96 Q 120 44 164 90',
  'M 70 130 Q 120 86 172 122',
  'M 88 158 Q 124 120 158 150',
];

export function GlobeScene() {
  const reduced = useReducedMotion();
  return (
    <Scene glow={H.turquoise}>
      <GirihHalo color={H.turquoise} opacity={0.2} />
      <HeritageParticles count={10} />
      <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full">
        {/* sphere */}
        <motion.circle cx="120" cy="122" r="74" fill="rgba(14,124,123,0.07)" stroke={H.turquoise} strokeWidth="2" {...popIn(0.2)} />
        {/* longitude / latitude wires */}
        {[0.35, 0.7].map((k, i) => (
          <motion.ellipse key={`lo${i}`} cx="120" cy="122" rx={74 * k} ry="74" fill="none" stroke={H.turquoise} strokeWidth="1" opacity="0.45" {...drawIn(0.5 + i * 0.15, 1)} />
        ))}
        {[0.4, 0.78].map((k, i) => (
          <motion.ellipse key={`la${i}`} cx="120" cy="122" rx="74" ry={74 * k} fill="none" stroke={H.turquoise} strokeWidth="1" opacity="0.45" {...drawIn(0.7 + i * 0.15, 1)} />
        ))}
        {/* connection arcs */}
        {ARCS.map((d, i) => (
          <g key={i}>
            <motion.path d={d} fill="none" stroke={H.saffron} strokeWidth="1.8" strokeLinecap="round" {...drawIn(1.2 + i * 0.3, 1)} />
            {!reduced && (
              <motion.circle
                r="3" fill={H.terracotta}
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{ offsetDistance: '100%', opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 2 + i * 0.7 }}
                style={{ offsetPath: `path("${d}")` }}
              />
            )}
          </g>
        ))}
        {/* city nodes — girih stars */}
        {[[78, 96], [164, 90], [70, 130], [172, 122], [88, 158], [158, 150]].map(([x, y], i) => (
          <motion.polygon key={i} points={starPoints(x, y, 5.5, 3)} fill={i % 2 ? H.terracotta : H.saffron} {...popIn(1.2 + i * 0.12)} />
        ))}
        {/* city ping */}
        {!reduced && (
          <motion.circle
            cx="164" cy="90" r="6" fill="none" stroke={H.saffron} strokeWidth="1.4"
            animate={{ r: [5, 16], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 2.6 }}
          />
        )}
      </svg>
    </Scene>
  );
}
