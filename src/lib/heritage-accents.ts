// Modern Heritage service accent system.
// Services carry legacy color names (emerald/blue/violet/…) in the DB;
// this maps them onto the four heritage hues (turquoise, lapis, saffron,
// terracotta) so every page stays on-brand with per-category variety.

export type AccentColor = 'gray' | 'emerald' | 'violet' | 'blue' | 'amber' | 'rose';

export const colorMap: Record<string, AccentColor> = {
  gray: 'gray',
  emerald: 'emerald',
  green: 'emerald',
  teal: 'emerald',
  cyan: 'emerald',
  violet: 'violet',
  purple: 'violet',
  indigo: 'violet',
  blue: 'blue',
  amber: 'amber',
  yellow: 'amber',
  orange: 'amber',
  rose: 'rose',
  red: 'rose',
  pink: 'rose',
};

export interface AccentClasses {
  eyebrow: string;
  titleAccent: string;
  gradientFrom: string;
  gradientTo: string;
  ring: string;
  dot: string;
  blob1: string;
  blob2: string;
}

const lapis: AccentClasses = {
  eyebrow: 'text-heritage-lapis',
  titleAccent: 'text-heritage-lapis',
  gradientFrom: 'from-heritage-lapis-light',
  gradientTo: 'to-heritage-ivory',
  ring: 'ring-heritage-lapis-light',
  dot: 'bg-heritage-lapis',
  blob1: 'bg-heritage-lapis-light',
  blob2: 'bg-heritage-sand',
};

export const accentColors: Record<AccentColor, AccentClasses> = {
  gray: lapis,
  blue: lapis,
  violet: { ...lapis, blob2: 'bg-heritage-turquoise-light' },
  emerald: {
    eyebrow: 'text-heritage-turquoise',
    titleAccent: 'text-heritage-turquoise',
    gradientFrom: 'from-heritage-turquoise-light',
    gradientTo: 'to-heritage-ivory',
    ring: 'ring-heritage-turquoise-light',
    dot: 'bg-heritage-turquoise',
    blob1: 'bg-heritage-turquoise-light',
    blob2: 'bg-heritage-sand',
  },
  amber: {
    eyebrow: 'text-heritage-saffron',
    titleAccent: 'text-heritage-saffron',
    gradientFrom: 'from-heritage-saffron-light',
    gradientTo: 'to-heritage-ivory',
    ring: 'ring-heritage-saffron-light',
    dot: 'bg-heritage-saffron-bright',
    blob1: 'bg-heritage-saffron-light',
    blob2: 'bg-heritage-sand',
  },
  rose: {
    eyebrow: 'text-heritage-terracotta',
    titleAccent: 'text-heritage-terracotta',
    gradientFrom: 'from-heritage-terracotta-light',
    gradientTo: 'to-heritage-ivory',
    ring: 'ring-heritage-terracotta-light',
    dot: 'bg-heritage-terracotta',
    blob1: 'bg-heritage-terracotta-light',
    blob2: 'bg-heritage-sand',
  },
};

export function getAccent(color?: string | null): AccentClasses {
  return accentColors[colorMap[color || ''] || 'emerald'];
}

// ── Rich variant used by service subpages ────────────────────────────
export interface RichAccentClasses {
  bg: string;
  bgLight: string;
  text: string;
  gradient: string;
  gradientOverlay: string;
  hoverBorder: string;
  border: string;
  ring: string;
}

const richTurquoise: RichAccentClasses = {
  bg: 'bg-heritage-turquoise',
  bgLight: 'bg-heritage-turquoise-light',
  text: 'text-heritage-turquoise',
  gradient: 'from-heritage-turquoise to-heritage-turquoise-deep',
  gradientOverlay: 'from-heritage-turquoise/90 to-heritage-turquoise-deep/90',
  hoverBorder: 'hover:border-heritage-turquoise',
  border: 'border-heritage-turquoise-light',
  ring: 'ring-heritage-turquoise',
};
const richLapis: RichAccentClasses = {
  bg: 'bg-heritage-lapis',
  bgLight: 'bg-heritage-lapis-light',
  text: 'text-heritage-lapis',
  gradient: 'from-heritage-lapis to-heritage-lapis-deep',
  gradientOverlay: 'from-heritage-lapis/90 to-heritage-lapis-deep/90',
  hoverBorder: 'hover:border-heritage-lapis',
  border: 'border-heritage-lapis-light',
  ring: 'ring-heritage-lapis',
};
const richSaffron: RichAccentClasses = {
  bg: 'bg-heritage-saffron-bright',
  bgLight: 'bg-heritage-saffron-light',
  text: 'text-heritage-saffron',
  gradient: 'from-heritage-saffron-bright to-heritage-saffron-deep',
  gradientOverlay: 'from-heritage-saffron-bright/90 to-heritage-saffron-deep/90',
  hoverBorder: 'hover:border-heritage-saffron-bright',
  border: 'border-heritage-saffron-light',
  ring: 'ring-heritage-saffron-bright',
};
const richTerracotta: RichAccentClasses = {
  bg: 'bg-heritage-terracotta',
  bgLight: 'bg-heritage-terracotta-light',
  text: 'text-heritage-terracotta',
  gradient: 'from-heritage-terracotta to-heritage-terracotta-deep',
  gradientOverlay: 'from-heritage-terracotta/90 to-heritage-terracotta-deep/90',
  hoverBorder: 'hover:border-heritage-terracotta',
  border: 'border-heritage-terracotta-light',
  ring: 'ring-heritage-terracotta',
};

/** Legacy 12-color names → heritage rich classes (subpage colorMap drop-in). */
export const richColorMap: Record<string, RichAccentClasses> = {
  purple: richLapis,
  violet: richLapis,
  indigo: richLapis,
  blue: richLapis,
  teal: richTurquoise,
  emerald: richTurquoise,
  cyan: richTurquoise,
  green: richTurquoise,
  orange: richSaffron,
  amber: richSaffron,
  yellow: richSaffron,
  rose: richTerracotta,
  red: richTerracotta,
  pink: richTerracotta,
  gray: richLapis,
};

export function getRichAccent(color?: string | null): RichAccentClasses {
  return richColorMap[color || ''] || richTurquoise;
}

// ── Hex remapping ────────────────────────────────────────────────────
// DB animation configs carry legacy Tailwind palette hexes; remap them
// to heritage hues so inline `style={{ color }}` usages stay on-brand.
export const HERITAGE_HEX = {
  turquoise: '#0e7c7b',
  turquoiseDeep: '#095d5c',
  lapis: '#1a3a6b',
  terracotta: '#c4572e',
  saffron: '#e8a33d',
} as const;

const HEX_MAP: Record<string, string> = {
  '#10B981': HERITAGE_HEX.turquoise, // emerald
  '#14B8A6': HERITAGE_HEX.turquoise, // teal
  '#06B6D4': HERITAGE_HEX.turquoise, // cyan
  '#22C55E': HERITAGE_HEX.turquoise, // green
  '#3B82F6': HERITAGE_HEX.lapis,     // blue
  '#6366F1': HERITAGE_HEX.lapis,     // indigo
  '#8B5CF6': HERITAGE_HEX.lapis,     // violet
  '#A855F7': HERITAGE_HEX.lapis,     // purple
  '#F59E0B': HERITAGE_HEX.saffron,   // amber
  '#F97316': HERITAGE_HEX.saffron,   // orange
  '#EAB308': HERITAGE_HEX.saffron,   // yellow
  '#EF4444': HERITAGE_HEX.terracotta, // red
  '#F43F5E': HERITAGE_HEX.terracotta, // rose
  '#EC4899': HERITAGE_HEX.terracotta, // pink
};

export function toHeritageHex(hex?: string | null): string {
  if (!hex) return HERITAGE_HEX.turquoise;
  return HEX_MAP[hex.toUpperCase()] || HEX_MAP[hex] || hex;
}

// ── Dark-background variant (tech-stack subpage) ─────────────────────
export interface DarkAccentClasses {
  text: string;
  textDark: string;
  gradient: string;
  border: string;
  bgCard: string;
}

const darkTurquoise: DarkAccentClasses = {
  text: 'text-heritage-turquoise-soft',
  textDark: 'text-heritage-turquoise-soft',
  gradient: 'from-heritage-turquoise to-heritage-turquoise-deep',
  border: 'border-heritage-turquoise/30',
  bgCard: 'hover:bg-heritage-turquoise/15',
};
const darkLapis: DarkAccentClasses = {
  text: 'text-heritage-lapis-soft',
  textDark: 'text-heritage-lapis-soft',
  gradient: 'from-heritage-lapis to-heritage-lapis-deep',
  border: 'border-heritage-lapis-soft/30',
  bgCard: 'hover:bg-heritage-lapis-soft/10',
};
const darkSaffron: DarkAccentClasses = {
  text: 'text-heritage-saffron-soft',
  textDark: 'text-heritage-saffron-soft',
  gradient: 'from-heritage-saffron-bright to-heritage-saffron-deep',
  border: 'border-heritage-saffron-bright/30',
  bgCard: 'hover:bg-heritage-saffron-bright/15',
};
const darkTerracotta: DarkAccentClasses = {
  text: 'text-heritage-terracotta-soft',
  textDark: 'text-heritage-terracotta-soft',
  gradient: 'from-heritage-terracotta to-heritage-terracotta-deep',
  border: 'border-heritage-terracotta/30',
  bgCard: 'hover:bg-heritage-terracotta/15',
};

export const darkColorMap: Record<string, DarkAccentClasses> = {
  purple: darkLapis, violet: darkLapis, indigo: darkLapis, blue: darkLapis,
  teal: darkTurquoise, emerald: darkTurquoise, cyan: darkTurquoise, green: darkTurquoise,
  orange: darkSaffron, amber: darkSaffron, yellow: darkSaffron,
  rose: darkTerracotta, red: darkTerracotta, pink: darkTerracotta,
};

// ── Process subpage variant (includes raw hex) ───────────────────────
export interface ProcessAccentClasses {
  hex: string;
  bg: string;
  text: string;
  gradient: string;
  border: string;
  ring: string;
  light: string;
}

const procTurquoise: ProcessAccentClasses = {
  hex: HERITAGE_HEX.turquoise,
  bg: 'bg-heritage-turquoise',
  text: 'text-heritage-turquoise',
  gradient: 'from-heritage-turquoise to-heritage-turquoise-deep',
  border: 'border-heritage-turquoise-light',
  ring: 'ring-heritage-turquoise-light',
  light: 'bg-heritage-turquoise-light',
};
const procLapis: ProcessAccentClasses = {
  hex: HERITAGE_HEX.lapis,
  bg: 'bg-heritage-lapis',
  text: 'text-heritage-lapis',
  gradient: 'from-heritage-lapis to-heritage-lapis-deep',
  border: 'border-heritage-lapis-light',
  ring: 'ring-heritage-lapis-light',
  light: 'bg-heritage-lapis-light',
};
const procSaffron: ProcessAccentClasses = {
  hex: HERITAGE_HEX.saffron,
  bg: 'bg-heritage-saffron-bright',
  text: 'text-heritage-saffron',
  gradient: 'from-heritage-saffron-bright to-heritage-saffron-deep',
  border: 'border-heritage-saffron-light',
  ring: 'ring-heritage-saffron-light',
  light: 'bg-heritage-saffron-light',
};
const procTerracotta: ProcessAccentClasses = {
  hex: HERITAGE_HEX.terracotta,
  bg: 'bg-heritage-terracotta',
  text: 'text-heritage-terracotta',
  gradient: 'from-heritage-terracotta to-heritage-terracotta-deep',
  border: 'border-heritage-terracotta-light',
  ring: 'ring-heritage-terracotta-light',
  light: 'bg-heritage-terracotta-light',
};

export const processColorMap: Record<string, ProcessAccentClasses> = {
  purple: procLapis, violet: procLapis, indigo: procLapis, blue: procLapis,
  teal: procTurquoise, emerald: procTurquoise, cyan: procTurquoise, green: procTurquoise,
  orange: procSaffron, amber: procSaffron, yellow: procSaffron,
  rose: procTerracotta, red: procTerracotta, pink: procTerracotta,
};
