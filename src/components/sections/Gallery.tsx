import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryAlts, galleryCaptions, realEstateAssets } from '../../data/project';
import { useReducedMotion } from '../../hooks/useEnvironment';

gsap.registerPlugin(ScrollTrigger);

/** Deterministic scatter so the grid reads as an architectural magazine spread. */
const SCATTER = [0, 120, 40, 170, 70, 10, 140, 50, 160, 90];
/** Per-column drift speed — the grid breathes as it passes. */
const DRIFT = [5, 11, 3, 9, 7, 4, 12, 6, 10, 5];

export function Gallery() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-gallery-card]').forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 62%', scrub: true }
          }
        );
        gsap.to(card, {
          scale: 0,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'bottom 34%', end: 'bottom top', scrub: true }
        });
        /* Slow internal pan keeps each frame alive while it is on screen. */
        gsap.fromTo(
          card.querySelector('img'),
          { yPercent: -6, scale: 1.14 },
          {
            yPercent: 6,
            scale: 1.14,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-gallery-figure]').forEach((figure) => {
        const amount = Number(figure.dataset.drift ?? 6);
        gsap.fromTo(
          figure,
          { y: amount * 6 },
          {
            y: -amount * 6,
            ease: 'none',
            scrollTrigger: { trigger: figure, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      });
    }, rootRef);

    return () => context.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      aria-label="Kiến trúc, không gian sống và phong cách sống"
      className="bg-ink px-4 pb-32 lg:px-8 lg:pb-56">
      
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <h2 className="display text-[clamp(28px,3.4vw,48px)] text-warmwhite">
            ARCHITECTURE / RESIDENCE / LIFESTYLE
          </h2>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
            {realEstateAssets.gallery.length} khung hình
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-7">
          {realEstateAssets.gallery.map((src, index) =>
          <figure
            key={src}
            data-gallery-figure
            data-drift={DRIFT[index]}
            className="group flex flex-col will-change-transform"
            style={{ marginTop: `clamp(0px, ${SCATTER[index] / 12}vw, ${SCATTER[index]}px)` }}>
            
              <div
              data-gallery-card
              className="overflow-hidden bg-charcoal"
              style={{ aspectRatio: '2 / 3', willChange: 'transform' }}>
              
                <img
                src={src}
                alt={galleryAlts[index]}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover will-change-transform"
                style={{ transform: 'scale(1.14)' }} />
              
              </div>
              <figcaption className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/35 transition-colors duration-200 ease-out group-hover:text-champagne lg:text-[11px]">
                <span className="text-white/20">{String(index + 1).padStart(2, '0')}</span>
                {galleryCaptions[index]}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>);

}