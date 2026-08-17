import React from 'react';
import { Reveal } from '../Reveal';
import { MaskText } from '../MaskText';
import { CtaButton } from '../CtaButton';
import { project, residenceHighlights, residenceSpaces } from '../../data/project';
import { useLeadForm } from '../../contexts/LeadFormContext';

export function Residences() {
  const { open } = useLeadForm();

  return (
    <section id="residences" aria-labelledby="residences-title" className="bg-ink px-4 py-24 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-champagne">Residences</p>
            </Reveal>
            <MaskText
              id="residences-title"
              text="KHÔNG GIAN SỐNG THUỘC VỀ RIÊNG BẠN."
              className="display mt-8 max-w-[14ch] text-[clamp(36px,6vw,90px)] text-warmwhite" />
            
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <dl className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-white/35">Diện tích</dt>
                <dd className="mt-2 text-[15px] text-bone">{project.area}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-white/35">Phòng ngủ</dt>
                <dd className="mt-2 text-[15px] text-bone">{project.bedrooms}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-white/35">Loại căn</dt>
                <dd className="mt-2 text-[15px] text-bone">{project.unitTypes}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {residenceSpaces.map((space, index) =>
          <Reveal
            key={space.name}
            as="figure"
            delay={index * 0.05}
            className={index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
            
              <div
              className="overflow-hidden bg-charcoal"
              style={{ aspectRatio: index < 2 ? '4 / 3' : '3 / 4' }}>
              
                <img
                src={space.image}
                alt={space.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.03]" />
              
              </div>
              <figcaption className="mt-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
                {space.name}
              </figcaption>
            </Reveal>
          )}
        </div>

        <ul className="mt-20 grid gap-x-8 gap-y-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-5">
          {residenceHighlights.map((highlight, index) =>
          <Reveal as="li" key={highlight.label} delay={index * 0.04} className="flex h-full flex-col">
              <p className="text-[11px] uppercase tracking-[0.2em] text-champagne">{highlight.label}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/55">{highlight.note}</p>
            </Reveal>
          )}
        </ul>

        <Reveal delay={0.06}>
          <CtaButton className="mt-14" onClick={() => open('residences')}>
            Đăng ký xem nhà
          </CtaButton>
        </Reveal>
      </div>
    </section>);

}