import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from '../Reveal';
import { MaskText } from '../MaskText';
import { trustFacts, valuePillars } from '../../data/project';
import { useReducedMotion } from '../../hooks/useEnvironment';

gsap.registerPlugin(ScrollTrigger);

/**
 * The outro turn: warm white wipes up over the cinematic black before the final
 * conversion moment — value first, then who stands behind the project.
 */
export function ValueAndTrust() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'top 45%',
            scrub: true
          }
        }
      );
    }, rootRef);

    return () => context.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      aria-labelledby="value-title"
      className="relative z-10 bg-warmwhite px-4 py-24 text-ink lg:px-8 lg:py-40"
      style={{ willChange: 'clip-path' }}>
      
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow text-ink/45">Value</p>
        </Reveal>

        <MaskText
          id="value-title"
          text="GIÁ TRỊ ĐƯỢC GIỮ GÌN BỞI NHỮNG ĐIỀU KHÔNG THỂ TÁI TẠO."
          className="display mt-8 max-w-[16ch] text-[clamp(36px,6vw,90px)]" />
        

        <div className="mt-20 grid gap-x-8 gap-y-12 border-t border-ink/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {valuePillars.map((pillar, index) =>
          <Reveal key={pillar.title} delay={index * 0.05} className="flex h-full flex-col">
              <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">{pillar.title}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{pillar.body}</p>
            </Reveal>
          )}
        </div>

        <p className="mt-10 max-w-[70ch] text-[12px] leading-relaxed text-ink/40">
          Các nội dung trên mang tính giới thiệu dự án, không phải cam kết về lợi nhuận, tốc độ tăng giá hay
          thu nhập cho thuê.
        </p>

        <div className="mt-24 border-t border-ink/15 pt-12">
          <Reveal>
            <p className="eyebrow text-ink/45">Trust</p>
          </Reveal>
          <dl className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {trustFacts.map((fact, index) =>
            <Reveal key={fact.label} delay={index * 0.05} className="flex h-full flex-col">
                <dt className="text-[11px] uppercase tracking-[0.22em] text-ink/40">{fact.label}</dt>
                <dd className="display mt-3 text-[clamp(20px,2vw,30px)]">{fact.value}</dd>
              </Reveal>
            )}
          </dl>
          <p className="mt-10 text-[12px] leading-relaxed text-ink/40">
            Giải thưởng, chứng nhận và hồ sơ năng lực: [AWARDS] · [CERTIFICATIONS] · [YEARS] năm kinh nghiệm.
          </p>
        </div>
      </div>
    </section>);

}