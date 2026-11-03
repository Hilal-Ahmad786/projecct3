// Inline, CSS-animated section illustrations for the Turkish ikas pages.
// Server component: the SVG markup ships as HTML only (no client JS). Motion is
// opt-in through IkasMotionScope (`ikas-visible` once, `ikas-in-view` for loops)
// and lives in globals.css under "ikas visuals"; reduced motion shows the
// final, fully drawn state.

import { IKAS_VISUALS, type IkasVisualName } from './generated';
import { IkasIcon } from '../IkasMark';

interface IkasVisualProps {
  name: IkasVisualName;
  /** Accessible description; omit for purely decorative use. */
  label?: string;
  /** Optional HTML labels for `slot-*` boxes (keyed by slot id). */
  slotLabels?: Record<string, string>;
  /** Keep ambient loops (pulses, knobs) running while on screen. */
  loop?: boolean;
  className?: string;
}

export default function IkasVisual({ name, label, slotLabels, loop = false, className = '' }: IkasVisualProps) {
  const visual = IKAS_VISUALS[name];
  const slots = visual.slots as Record<string, { left: number; top: number; width: number; height: number }>;
  return (
    <figure
      data-ikas-reveal=""
      className={`ikas-visual ikas-visual--${name} relative m-0 ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {/* Loops sit on an inner node: IkasMotionScope treats loop and reveal
          targets differently, and the figure itself must still reveal once. */}
      <div data-ikas-loop={loop ? '' : undefined} className="iv-art" dangerouslySetInnerHTML={{ __html: visual.markup }} />
      {Object.entries(slots).map(([id, box]) => {
        const style = { left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%`, height: `${box.height}%` };
        if (id === 'slot-ikas-mark') {
          return <span key={id} aria-hidden="true" className="iv-slot absolute flex items-center gap-1.5 text-[clamp(10px,1.3vw,14px)] font-bold text-gray-900" style={style}><IkasIcon size={18} />ikas</span>;
        }
        const text = slotLabels?.[id];
        return text ? <span key={id} aria-hidden="true" className="iv-slot absolute flex items-center justify-center text-center text-[clamp(9px,1.25vw,13px)] font-semibold leading-tight text-gray-700" style={style}>{text}</span> : null;
      })}
    </figure>
  );
}
