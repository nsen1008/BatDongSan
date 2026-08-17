import React from 'react';
import { useReducedMotion } from '../hooks/useEnvironment';

/** Continuous linear ticker — pure CSS transform, GPU friendly. */
export function Marquee({ items }: {items: readonly string[];}) {
  const reduced = useReducedMotion();
  const sequence = [...items, ...items, ...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden border-y border-white/10 bg-ink py-5">
      
      <div className={`flex w-max items-center gap-10 whitespace-nowrap ${reduced ? '' : 'marquee-track'}`}>
        {sequence.map((item, index) =>
        <span key={`${item}-${index}`} className="flex items-center gap-10">
            <span className="text-[11px] uppercase tracking-[0.28em] text-white/35">{item}</span>
            <span className="h-1 w-1 rounded-full bg-champagne/70" />
          </span>
        )}
      </div>
    </div>);

}