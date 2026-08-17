import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from '../Reveal';
import { MaskText } from '../MaskText';
import { CtaButton } from '../CtaButton';
import { realEstateAssets } from '../../data/project';
import { useLeadForm } from '../../contexts/LeadFormContext';
import { useReducedMotion } from '../../hooks/useEnvironment';

gsap.registerPlugin(ScrollTrigger);

const characteristics = [
{ title: 'ÁNH SÁNG TỰ NHIÊN', body: 'Mặt kính cao trần đưa ánh sáng vào sâu trong không gian sống.' },
{ title: 'VẬT LIỆU', body: 'Đá tự nhiên, gỗ và kim loại hoàn thiện tinh xảo, bền theo thời gian.' },
{ title: 'TỔ CHỨC KHÔNG GIAN', body: 'Phân tách rõ khu vực tiếp khách và khu vực riêng tư của gia đình.' },
{ title: 'TẦM NHÌN', body: 'Mỗi căn hộ được định hướng để giữ trọn tầm nhìn đẹp nhất.' }];


export function Architecture() {
  const { open } = useLeadForm();
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced || !rootRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        '[data-arch-frame]',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          ease: 'none',
          scrollTrigger: { trigger: '[data-arch-frame]', start: 'top 88%', end: 'top 40%', scrub: true }
        }
      );
      gsap.fromTo(
        '[data-arch-image]',
        { yPercent: -8, scale: 1.16 },
        {
          yPercent: 8,
          scale: 1.16,
          ease: 'none',
          scrollTrigger: { trigger: '[data-arch-frame]', start: 'top bottom', end: 'bottom top', scrub: true }
        }
      );
    }, rootRef);

    return () => context.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      aria-labelledby="architecture-title"
      className="bg-charcoal px-4 py-24 lg:px-8 lg:py-40">
      
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-champagne">Architecture</p>
          </Reveal>

          <MaskText
            id="architecture-title"
            text="KIẾN TRÚC ĐƯỢC THIẾT KẾ CHO MỘT ĐỜI SỐNG RIÊNG TƯ."
            className="display mt-8 max-w-[15ch] text-[clamp(36px,6vw,90px)] text-warmwhite" />
          

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[54ch] text-[15px] leading-relaxed text-white/60 lg:text-[17px]">
              Hình khối tiết chế, tỉ lệ chuẩn xác và vật liệu thật. Kiến trúc không phô trương — nó tạo ra
              cảm giác an tĩnh mà chỉ có thể cảm nhận khi bước vào bên trong.
            </p>
          </Reveal>

          <dl className="mt-14 grid gap-x-8 gap-y-10 border-t border-white/10 pt-10 sm:grid-cols-2">
            {characteristics.map((item, index) =>
            <Reveal key={item.title} delay={index * 0.05}>
                <dt className="text-[11px] uppercase tracking-[0.22em] text-white/40">{item.title}</dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-white/70">{item.body}</dd>
              </Reveal>
            )}
          </dl>

          <Reveal delay={0.1}>
            <CtaButton className="mt-14" onClick={() => open('architecture')}>
              Đăng ký xem nhà
            </CtaButton>
          </Reveal>
        </div>

        <figure className="lg:col-span-5">
          <div
            data-arch-frame
            className="overflow-hidden bg-ink will-change-[clip-path]"
            style={{ aspectRatio: '2 / 3' }}>
            
            <img
              data-arch-image
              src={realEstateAssets.architecture}
              alt="Chi tiết vật liệu kiến trúc: đá tự nhiên, kim loại và gỗ dưới ánh sáng xiên"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover will-change-transform"
              style={{ transform: 'scale(1.16)' }} />
            
          </div>
          <figcaption className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/35">
            Chi tiết hoàn thiện · [ARCHITECT]
          </figcaption>
        </figure>
      </div>
    </section>);

}