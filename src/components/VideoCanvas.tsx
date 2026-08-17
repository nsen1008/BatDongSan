import React, { useEffect, useRef, useState, useCallback } from 'react';

interface VideoCanvasProps {
  isVisible?: boolean;
}

const LEFT_VIDEO_URL = '/videos/hero_interior.mp4';
const RIGHT_VIDEO_URL = '/videos/hero_twilight.mp4';

export const VideoCanvas: React.FC<VideoCanvasProps> = ({ isVisible = true }) => {
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [leftLoaded, setLeftLoaded] = useState(false);
  const [rightLoaded, setRightLoaded] = useState(false);
  const isLoaded = leftLoaded && rightLoaded;

  const mouseXRef = useRef<number>(typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500);
  const mouseYRef = useRef<number>(typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400);

  const splitProgressRef = useRef<number>(0.5);
  const targetSplitRef = useRef<number>(0.5);

  const leftOpacityRef = useRef<number>(0.5);
  const rightOpacityRef = useRef<number>(0.5);

  const rafIdRef = useRef<number | null>(null);
  const isTouchDeviceRef = useRef<boolean>(false);

  // Active view mode label for HUD
  const [activeLabel, setActiveLabel] = useState<'EXTERIOR' | 'INTERIOR' | 'DUAL'>('DUAL');

  // Check touch
  useEffect(() => {
    isTouchDeviceRef.current =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseXRef.current = e.clientX;
    mouseYRef.current = e.clientY;

    const width = window.innerWidth;
    const centerX = width * 0.5;
    const deadZone = Math.max(40, width * 0.06);

    const distFromCenter = e.clientX - centerX;

    if (Math.abs(distFromCenter) < deadZone) {
      // In dead zone: balanced 50/50 blend
      targetSplitRef.current = 0.5;
    } else if (distFromCenter < 0) {
      // Moved left: show Exterior Twilight Villa
      const progress = Math.min(1, Math.abs(distFromCenter) / (centerX - deadZone));
      targetSplitRef.current = 0.5 - progress * 0.5; // 0.5 -> 0.0 (reveals Exterior)
    } else {
      // Moved right: show Interior Atrium
      const progress = Math.min(1, distFromCenter / (centerX - deadZone));
      targetSplitRef.current = 0.5 + progress * 0.5; // 0.5 -> 1.0 (reveals Interior)
    }
  }, []);

  // 120 FPS Zero-Lag GPU Compositor Loop
  useEffect(() => {
    // Start videos in continuous smooth playback mode
    const lVid = leftVideoRef.current;
    const rVid = rightVideoRef.current;

    if (lVid) {
      lVid.play().catch(() => {});
    }
    if (rVid) {
      rVid.play().catch(() => {});
    }

    if (!isTouchDeviceRef.current) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let lastLabel = 'DUAL';

    const tick = () => {
      if (isVisible) {
        // High-speed smooth lerp interpolation (0.12) for ultra-fluid motion
        splitProgressRef.current += (targetSplitRef.current - splitProgressRef.current) * 0.12;
        const currentSplit = splitProgressRef.current;

        // Calculate opacities and clip positions
        // When split is near 0 -> 100% Twilight Exterior (Right video)
        // When split is near 1 -> 100% Luxury Interior (Left video)
        // In middle -> Seamless cross-dissolve & split reveal
        const leftOp = Math.max(0, Math.min(1, (currentSplit - 0.2) / 0.6));
        const rightOp = 1 - leftOp;

        leftOpacityRef.current = leftOp;
        rightOpacityRef.current = rightOp;

        if (leftVideoRef.current) {
          leftVideoRef.current.style.opacity = `${leftOp.toFixed(3)}`;
        }
        if (rightVideoRef.current) {
          rightVideoRef.current.style.opacity = `${rightOp.toFixed(3)}`;
        }

        // Update mode label only when changed
        let newLabel: 'EXTERIOR' | 'INTERIOR' | 'DUAL' = 'DUAL';
        if (currentSplit < 0.25) newLabel = 'EXTERIOR';
        else if (currentSplit > 0.75) newLabel = 'INTERIOR';

        if (newLabel !== lastLabel) {
          lastLabel = newLabel;
          setActiveLabel(newLabel);
        }

        // Ensure videos are playing smoothly without pausing or buffering stalls
        if (lVid && lVid.paused) lVid.play().catch(() => {});
        if (rVid && rVid.paused) rVid.play().catch(() => {});
      } else {
        // Pause videos when scrolled out of hero to save 100% GPU
        if (lVid && !lVid.paused) lVid.pause();
        if (rVid && !rVid.paused) rVid.pause();
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleMouseMove, isVisible]);

  return (
    <div
      id="main-canvas"
      ref={containerRef}
      className={`pointer-events-none overflow-hidden transition-opacity duration-500
        ${isVisible ? 'visible' : 'invisible'}
        fixed inset-0 w-full h-full z-0
        max-sm:top-[220px] max-sm:h-[calc(100vh-220px)]`}
      style={{
        opacity: isLoaded ? 1 : 0,
        transform: 'translate3d(0, 0, 0)',
        contain: 'strict',
      }}
    >
      {/* Exterior Twilight Luxury Villa Video (Base Layer) */}
      <video
        ref={rightVideoRef}
        src={RIGHT_VIDEO_URL}
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setRightLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover select-none will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0)',
          opacity: 0.5,
          transition: 'none',
        }}
      />

      {/* Interior Walkthrough Video (Overlaid Smooth Transition Layer) */}
      <video
        ref={leftVideoRef}
        src={LEFT_VIDEO_URL}
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setLeftLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover select-none will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0)',
          opacity: 0.5,
          transition: 'none',
        }}
      />

      {/* Subtle Cinematic Vignette & Grain Filter */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* Architectural Mode Indicator Badge in Hero (Bottom Center) */}
      <div className="hidden lg:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-20 blend-exclusion items-center gap-3 px-4 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm pointer-events-none">
        <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${activeLabel === 'EXTERIOR' ? 'text-white font-bold' : 'text-white/40'}`}>
          ← NGOẠI THẤT HOÀNG HÔN
        </span>
        <span className="text-white/30 text-xs">•</span>
        <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${activeLabel === 'DUAL' ? 'text-white font-bold' : 'text-white/40'}`}>
          HÒA SẮC KHÔNG GIAN
        </span>
        <span className="text-white/30 text-xs">•</span>
        <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${activeLabel === 'INTERIOR' ? 'text-white font-bold' : 'text-white/40'}`}>
          NỘI THẤT DUPLEX →
        </span>
      </div>
    </div>
  );
};
