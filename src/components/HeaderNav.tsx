import React from 'react';
import { motion } from 'motion/react';

interface HeaderNavProps {
  onOpenInquiry?: () => void;
  onOpenMenu?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onOpenInquiry, onOpenMenu }) => {
  return (
    <motion.header
      className="fixed z-30 blend-exclusion top-5 right-5 lg:top-7 lg:right-8 flex items-center gap-6 lg:gap-8 pointer-events-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.15,
      }}
    >
      <button
        onClick={onOpenMenu}
        className="hidden md:block text-[13px] font-medium tracking-wider text-white/90 uppercase hover:text-white transition-colors cursor-pointer"
      >
        BỘ SƯU TẬP
      </button>

      <button
        onClick={onOpenMenu}
        aria-label="Open Menu"
        className="p-1 hover:scale-105 transition-transform cursor-pointer flex items-center justify-center"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 lg:w-6 lg:h-6"
        >
          <path d="M4 14H36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M4 26H36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>

      <button
        onClick={onOpenInquiry}
        className="text-[12px] lg:text-[13px] font-semibold tracking-wider text-white uppercase px-3.5 py-1.5 rounded-full border border-white/30 bg-black/20 hover:bg-white hover:text-black transition-all cursor-pointer whitespace-nowrap"
      >
        [ LIÊN HỆ / TOUR ]
      </button>
    </motion.header>
  );
};
