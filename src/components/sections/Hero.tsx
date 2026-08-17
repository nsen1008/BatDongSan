import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { project, realEstateAssets } from '../../data/project';
import { useCinematicMode, useReducedMotion } from '../../hooks/useEnvironment';
import { useLeadForm } from '../../contexts/LeadFormContext';
import { MaskText } from '../MaskText';
import { CtaButton } from '../CtaButton';

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)(\?|$)/i.test(src);

const DEAD_ZONE = 0.06;
const EASE = [0.23, 1, 0.32, 1] as const;

function HeroMedia({
  src,
  alt,
  priority,
  videoRef,
  animate






}: {src: string;alt: string;priority: boolean;videoRef: React.RefObject<HTMLVideoElement>;animate: boolean;}) {
  if (isVideoSrc(src)) {
    return (
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        aria-label={alt} />);


  }
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`h-full w-full object-cover ${animate ? 'kenburns' : ''}`} />);


}

export function Hero() {
  const cinematic = useCinematicMode();
  const reduced = useReducedMotion();
  const { open } = useLeadForm();

  const layerBRef = useRef<HTMLDivElement>(null);
  const mediaARef = useRef<HTMLDivElement>(null);
  const mediaBRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  const target = useRef(0.5);
  const smoothed = useRef(0.5);

  const [videoA, videoB] = realEstateAssets.heroVideos;
  const usesVideo = isVideoSrc(videoA) || isVideoSrc(videoB);

  /* Desktop: cursor position reveals the second perspective of the property. */
  useEffect(() => {
    if (!cinematic) return;

    const onPointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth;
      const offset = x - 0.5;
      let progress = 0.5;
      if (Math.abs(offset) > DEAD_ZONE) {
        const signed = offset > 0 ? offset - DEAD_ZONE : offset + DEAD_ZONE;
        progress = 0.5 + signed / (0.5 - DEAD_ZONE) * 0.5;
      }
      target.current = Math.min(1, Math.max(0, progress));
    };

    let frame = 0;
    const tick = () => {
      smoothed.current += (target.current - smoothed.current) * 0.07;
      const p = smoothed.current;

      if (layerBRef.current) {
        layerBRef.current.style.clipPath = `inset(0 0 0 ${((1 - p) * 100).toFixed(2)}%)`;
      }
      if (mediaARef.current) {
        mediaARef.current.style.transform = `translate3d(${(p - 0.5) * -34}px, 0, 0) scale(1.1)`;
      }
      if (mediaBRef.current) {
        mediaBRef.current.style.transform = `translate3d(${(p - 0.5) * 34}px, 0, 0) scale(1.1)`;
      }
      if (seamRef.current) {
        seamRef.current.style.transform = `translate3d(${((1 - p) * 100).toFixed(2)}vw, 0, 0)`;
        seamRef.current.style.opacity = `${Math.min(1, Math.abs(p - 0.5) * 4).toFixed(2)}`;
      }

      for (const ref of [videoARef, videoBRef]) {
        const video = ref.current;
        if (!video || !video.duration || video.seeking) continue;
        const next = p * video.duration;
        if (Math.abs(video.currentTime - next) > 0.04) {
          video.currentTime = next;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, [cinematic]);

  /* Touch / reduced-motion: no scrubbing. Videos autoplay, stills alternate slowly. */
  useEffect(() => {
    if (cinematic) return;

    if (layerBRef.current) layerBRef.current.style.clipPath = 'inset(0 0 0 0%)';

    if (usesVideo && !reduced) {
      videoARef.current?.play().catch(() => undefined);
      videoBRef.current?.play().catch(() => undefined);
    }

    if (reduced) {
      if (layerBRef.current) layerBRef.current.style.opacity = '0';
      return;
    }

    let visible = false;
    const interval = window.setInterval(() => {
      visible = !visible;
      if (layerBRef.current) layerBRef.current.style.opacity = visible ? '1' : '0';
    }, 5200);

    return () => {
      window.clearInterval(interval);
      videoARef.current?.pause();
      videoBRef.current?.pause();
    };
  }, [cinematic, reduced, usesVideo]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section
      id="overview"
      aria-label="Giới thiệu dự án"
      className="relative h-[100svh] w-full overflow-hidden bg-ink">
      
      {/* Cinematic curtain: the first frame is unveiled, not switched on. */}
      {!reduced &&
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
        className="absolute inset-0 z-30 origin-top bg-ink" />

      }

      <motion.div
        ref={mediaARef}
        className="absolute inset-0 will-change-transform"
        initial={reduced ? false : { scale: 1.22 }}
        animate={reduced ? undefined : { scale: 1.1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
        style={{ transform: 'scale(1.1)' }}>
        
        <HeroMedia
          src={videoA}
          alt={`Kiến trúc ngoại thất dự án ${project.name} lúc hoàng hôn`}
          priority
          videoRef={videoARef}
          animate={!cinematic && !reduced} />
        
      </motion.div>

      <div
        ref={layerBRef}
        className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
        style={{ clipPath: 'inset(0 0 0 100%)', willChange: 'clip-path, opacity', opacity: 1 }}>
        
        <div ref={mediaBRef} className="h-full w-full will-change-transform" style={{ transform: 'scale(1.1)' }}>
          <HeroMedia
            src={videoB}
            alt={`Không gian sống bên trong căn hộ ${project.name} về đêm`}
            priority={false}
            videoRef={videoBRef}
            animate={!cinematic && !reduced} />
          
        </div>
      </div>

      {/* Seam between the two perspectives — only visible once the cursor commits to a side. */}
      {cinematic &&
      <div
        ref={seamRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-px bg-white/60 mix-blend-exclusion"
        style={{ opacity: 0, willChange: 'transform, opacity' }} />

      }

      <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-ink/35" />

      <div className="safe-bottom relative z-20 flex h-full w-full flex-col justify-end px-4 pb-24 pt-28 lg:px-8 lg:pb-10">
        <div className="grid w-full gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
              className="eyebrow text-white mix-blend-exclusion">
              
              Private residences · {project.location}
            </motion.p>

            <MaskText
              as="h1"
              trigger="mount"
              delay={1}
              text="MỘT CHUẨN SỐNG KHÁC GIỮA TÂM ĐIỂM THÀNH PHỐ"
              className="display mt-5 max-w-[16ch] text-[clamp(42px,7vw,110px)] text-warmwhite" />
            

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.35, ease: EASE }}
              className="mt-7 max-w-[52ch] text-[15px] leading-relaxed text-white/70 lg:text-[17px]">
              
              Một không gian sống được kiến tạo dành cho những chủ nhân tìm kiếm sự riêng tư, vị thế và giá
              trị bền vững.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.5, ease: EASE }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              
              <CtaButton onClick={() => open('hero')}>Đăng ký xem nhà</CtaButton>
              <CtaButton variant="outline" withArrow={false} onClick={() => scrollTo('introduction')}>
                Khám phá dự án
              </CtaButton>
            </motion.div>
          </div>

          <motion.aside
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6, ease: EASE }}
            aria-label="Thông tin dự án"
            className="hidden border-t border-white/20 pt-6 lg:col-span-4 lg:block">
            
            <p className="eyebrow text-white/50">Private residences</p>
            <p className="display mt-3 text-[clamp(24px,2.4vw,38px)] text-warmwhite">{project.name}</p>
            <p className="mt-4 text-[13px] uppercase tracking-[0.18em] text-champagne">
              {project.showPrice ? `Từ ${project.price}` : 'Giới hạn số lượng'}
            </p>
            <div className="mt-6 flex items-center gap-4">
              {!reduced && <span aria-hidden="true" className="scroll-cue block h-10 w-px bg-white/50" />}
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Cuộn để khám phá</p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>);

}