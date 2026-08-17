import React from 'react';
import { Reveal } from '../Reveal';
import { MaskText } from '../MaskText';
import { CtaButton } from '../CtaButton';
import { locationPoints, project, realEstateAssets } from '../../data/project';
import { useLeadForm } from '../../contexts/LeadFormContext';

export function LocationSection() {
  const { open } = useLeadForm();

  return (
    <section id="location" aria-labelledby="location-title" className="bg-ink px-4 py-24 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow text-champagne">Location · {project.location}</p>
        </Reveal>
        <MaskText
          id="location-title"
          text="MỌI ĐIỂM ĐẾN QUAN TRỌNG ĐỀU Ở TRONG TẦM KẾT NỐI."
          className="display mt-8 max-w-[17ch] text-[clamp(36px,6vw,90px)] text-warmwhite" />
        

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal as="figure" className="lg:col-span-7">
            <div className="overflow-hidden bg-charcoal" style={{ aspectRatio: '16 / 10' }}>
              <img
                src={realEstateAssets.location}
                alt={`Vị trí dự án nhìn từ trên cao tại ${project.location} về đêm`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover" />
              
            </div>
            <figcaption className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/35">
              {project.address}
            </figcaption>
          </Reveal>

          <div className="lg:col-span-5">
            <ul>
              {locationPoints.map((point, index) =>
              <Reveal as="li" key={point.place} delay={index * 0.05}>
                  <div className="flex items-baseline justify-between gap-6 border-b border-white/10 py-6">
                    <span className="text-[13px] uppercase tracking-[0.2em] text-white/55">{point.place}</span>
                    <span className="display text-[clamp(20px,2vw,30px)] text-champagne">{point.time}</span>
                  </div>
                </Reveal>
              )}
            </ul>
            <p className="mt-6 text-[12px] leading-relaxed text-white/30">
              Thời gian di chuyển mang tính tham khảo, được cập nhật theo hồ sơ chính thức của dự án.
            </p>
            <Reveal delay={0.08}>
              <CtaButton variant="outline" className="mt-10" onClick={() => open('location')}>
                Nhận thông tin dự án
              </CtaButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>);

}