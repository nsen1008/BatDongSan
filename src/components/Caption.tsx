import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const Caption: React.FC = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Smoothly fade out caption as soon as user starts scrolling down
      const newOp = Math.max(0, 1 - scrollY / 150);
      setOpacity(newOp);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      id="hero-caption"
      className="fixed pointer-events-none z-20 blend-exclusion left-5 lg:left-8 top-[125px] sm:top-[145px] lg:top-[160px] max-w-[420px] transition-opacity duration-300"
      style={{
        opacity,
        visibility: opacity <= 0 ? 'hidden' : 'visible',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      }}
    >
      <p className="text-[11px] lg:text-[12px] leading-[150%] tracking-tight font-normal text-white/90">
        Rê chuột sang <strong>trái/phải</strong> để chuyển đổi giữa ánh sáng hoàng hôn và không gian nội thất. Cuộn xuống để xem chi tiết 10 phân khu dinh thự.
      </p>
      <div className="flex items-center gap-3 mt-2 text-[10px] tracking-wider uppercase text-white/60 font-mono">
        <span>820 M² GFA</span>
        <span>•</span>
        <span>4 SUITES · 6 BATHS</span>
      </div>
    </motion.div>
  );
};
