import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface EstateInfoProps {
  onViewClick?: () => void;
}

export const EstateInfo: React.FC<EstateInfoProps> = ({ onViewClick }) => {
  const [heroOpacity, setHeroOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fade out the bottom-right hero card as user scrolls into gallery
      const op = Math.max(0, 1 - scrollY / 150);
      setHeroOpacity(op);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1E. Refined, Compact Estate Info Card (Bottom Right in Hero) */}
      <motion.div
        id="outro-info"
        data-outro-offset-desktop="100"
        data-outro-offset-mobile="80"
        className="fixed pointer-events-none z-20 blend-exclusion flex flex-col items-end text-right
          right-5 lg:right-8 bottom-6 lg:bottom-8
          w-auto transition-opacity duration-300"
        style={{
          opacity: heroOpacity,
          visibility: heroOpacity <= 0 ? 'hidden' : 'visible',
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.35,
        }}
      >
        <div className="flex flex-col items-end mb-2">
          {/* Symbol + Label Badge */}
          <div className="flex items-center gap-2 mb-1">
            <span
              id="circle-symbol"
              className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-[10px] font-mono text-white select-none"
            >
              8
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/70 uppercase">
              BỘ SƯU TẬP ĐỘC BẢN
            </span>
          </div>

          <div className="text-sm lg:text-base font-semibold tracking-tight text-white uppercase">
            SANCTUARY VILLA 2026
          </div>

          <div className="text-[10px] lg:text-[11px] tracking-wider uppercase text-white/60 font-mono">
            820 M² · 4 SUITES · INFINITY POOL
          </div>
        </div>

        {/* Refined Price Typography */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-[10px] font-mono text-white/60 uppercase">Khởi điểm</span>
          <span className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
            $4,850,000
          </span>
        </div>
      </motion.div>

      {/* 1F. "View" Big Pill Button (Bottom Right, Initially Scale 0, activates at Outro) */}
      <div
        id="outro-buy"
        onClick={onViewClick}
        className="fixed z-30 blend-exclusion cursor-pointer pointer-events-auto
          left-5 right-5 lg:left-auto lg:right-8
          bottom-8 lg:bottom-8
          h-[80px] lg:w-[260px] lg:h-[130px]
          bg-white rounded-full flex items-center justify-center shadow-2xl
          hover:scale-105 active:scale-95 transition-transform"
        style={{
          transformOrigin: 'right bottom',
          transform: 'scale(0)',
        }}
      >
        <span className="text-4xl lg:text-6xl font-medium tracking-tight text-black blend-exclusion select-none leading-none lowercase">
          view
        </span>
      </div>
    </>
  );
};
