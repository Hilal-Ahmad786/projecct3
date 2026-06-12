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
