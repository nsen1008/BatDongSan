import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { project, realEstateAssets } from '../../data/project';
import { useLeadForm } from '../../contexts/LeadFormContext';
import { useReducedMotion } from '../../hooks/useEnvironment';
import { MaskText } from '../MaskText';
import { Reveal } from '../Reveal';
import { CtaButton } from '../CtaButton';

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.23, 1, 0.32, 1] as const;

export function ViewingCta() {
  const { open } = useLeadForm();
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced || !rootRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-cta-image]',
        { yPercent: -8, scale: 1.18 },
        {
          yPercent: 8,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
        }
      );
      gsap.fromTo(
        '[data-cta-scrim]',
        { opacity: 0.8 },
        {
          opacity: 0.55,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'center center', scrub: true }
        }
      );
    }, rootRef);

    return () => context.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="private-viewing"
      aria-labelledby="viewing-title"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink">
      
      <img
        data-cta-image
        src={realEstateAssets.viewingCta}
        alt={`Không gian nội thất căn hộ ${project.name} lúc chạng vạng`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: 'scale(1.12)' }} />
      
      <div data-cta-scrim aria-hidden="true" className="absolute inset-0 bg-ink" style={{ opacity: 0.65 }} />

      <div className="relative z-10 w-full px-4 pb-28 pt-32 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="eyebrow text-champagne">Private viewing</p>
          </Reveal>

          <MaskText
            id="viewing-title"
            text="TRẢI NGHIỆM KHÔNG GIAN TRƯỚC KHI QUYẾT ĐỊNH."
            className="display mt-7 max-w-[15ch] text-[clamp(42px,7vw,110px)] text-warmwhite" />
          

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mt-7 max-w-[52ch] text-[15px] leading-relaxed text-white/70 lg:text-[17px]">
            
            Đăng ký để nhận thông tin chi tiết và đặt lịch tham quan không gian thực tế.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            
            <CtaButton className="px-10 py-5 text-[13px]" onClick={() => open('final-cta')}>
              Đăng ký xem nhà
            </CtaButton>
            <CtaButton
              variant="outline"
              withArrow={false}
              className="px-10 py-5 text-[13px]"
              onClick={() => open('final-cta-secondary')}>
              
              Nhận thông tin dự án
            </CtaButton>
          </motion.div>

          <p className="mt-8 text-[12px] uppercase tracking-[0.2em] text-white/40">
            Số lượng buổi tham quan riêng trong tuần được giới hạn.
          </p>
        </div>
      </div>
    </section>);

}