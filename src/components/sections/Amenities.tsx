import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { amenities } from '../../data/project';
import { Reveal } from '../Reveal';
import { MaskText } from '../MaskText';

const EASE = [0.23, 1, 0.32, 1] as const;

export function Amenities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = amenities[activeIndex];

  return (
    <section id="amenities" aria-labelledby="amenities-title" className="bg-charcoal px-4 py-24 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow text-champagne">Amenities</p>
        </Reveal>

        <MaskText
          id="amenities-title"
          text="NHỮNG TIỆN NGHI DÀNH RIÊNG CHO CƯ DÂN."
          className="display mt-8 max-w-[16ch] text-[clamp(36px,6vw,90px)] text-warmwhite" />
        

        {/* Desktop: the visual wipes between amenities as the list is explored. */}
        <div className="mt-16 hidden gap-12 lg:grid lg:grid-cols-12">
          <ul className="lg:col-span-5">
            {amenities.map((item, index) =>
            <li key={item.name}>
                <button
                type="button"
                data-cursor="hover"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-current={index === activeIndex}
                className="relative flex w-full items-baseline gap-6 border-b border-white/10 py-7 text-left">
                
                  <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-px w-full origin-left bg-champagne transition-transform duration-200 ease-out ${
                  index === activeIndex ? 'scale-x-100' : 'scale-x-0'}`
                  } />
                
                  <span className="text-[11px] tracking-[0.2em] text-white/30">{item.index}</span>
                  <span
                  className={`display text-[clamp(26px,2.8vw,44px)] transition-[color,transform] duration-200 ease-out ${
                  index === activeIndex ? 'translate-x-2 text-warmwhite' : 'translate-x-0 text-white/35'}`
                  }>
                  
                    {item.name}
                  </span>
                </button>
              </li>
            )}
          </ul>

          <div className="relative overflow-hidden bg-ink lg:col-span-7" style={{ aspectRatio: '4 / 3' }}>
            <AnimatePresence initial={false}>
              <motion.img
                key={active.name}
                src={active.image}
                alt={active.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.06 }}
                animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }} />
              
            </AnimatePresence>

            <div className="absolute bottom-5 left-5 flex items-end gap-4 mix-blend-exclusion">
              <span className="display text-[42px] leading-none text-white">{active.index}</span>
              <span className="pb-1 text-[11px] uppercase tracking-[0.22em] text-white">{active.caption}</span>
            </div>
          </div>
        </div>

        {/* Mobile: stacked cinematic blocks. */}
        <div className="mt-12 space-y-10 lg:hidden">
          {amenities.map((item, index) =>
          <Reveal as="figure" key={item.name} delay={index * 0.04}>
              <div className="overflow-hidden bg-ink" style={{ aspectRatio: '4 / 3' }}>
                <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover" />
              
              </div>
              <figcaption className="mt-4">
                <span className="display block text-[26px] text-warmwhite">{item.name}</span>
                <span className="mt-2 block text-[14px] text-white/50">{item.caption}</span>
              </figcaption>
            </Reveal>
          )}
        </div>

        <p className="mt-14 text-[12px] leading-relaxed text-white/30">
          Danh mục tiện ích đầy đủ theo hồ sơ dự án: [AMENITIES].
        </p>
      </div>
    </section>);

}