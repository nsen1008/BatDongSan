import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const BrandLogo: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      id="brand-logo"
      className="fixed pointer-events-none z-30 blend-exclusion top-5 left-5 lg:top-7 lg:left-8 transition-all duration-500 ease-out"
      style={{
        width: isScrolled ? '140px' : '220px',
        opacity: isScrolled ? 0.75 : 1,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0,
      }}
    >
      <svg
        viewBox="0 0 355 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Geometric Architectural Monogram "PRMPT" */}
        <path
          d="M0 10H42C56 10 65 19 65 33C65 47 56 56 42 56H20V92H0V10ZM20 28V38H40C43.5 38 46 36 46 33C46 30 43.5 28 40 28H20Z"
          fill="white"
        />
        <path
          d="M78 10H120C134 10 143 19 143 33C143 44 136 52 125 55L145 92H123L105 58H98V92H78V10ZM98 28V42H118C121.5 42 124 40 124 35C124 30 121.5 28 118 28H98Z"
          fill="white"
        />
        <path
          d="M156 10H176L195 55L214 10H234V92H216V36L199 74H191L174 36V92H156V10Z"
          fill="white"
        />
        <path
          d="M246 10H288C302 10 311 19 311 33C311 47 302 56 288 56H266V92H246V10ZM266 28V38H286C289.5 38 292 36 292 33C292 30 289.5 28 286 28H266Z"
          fill="white"
        />
        <path
          d="M316 10H355V28H345V92H326V28H316V10Z"
          fill="white"
        />
        {/* Subtitle: ESTATES */}
        <text
          x="0"
          y="108"
          fill="white"
          fontSize="13"
          letterSpacing="0.45em"
          fontWeight="600"
          fontFamily="'Inter Tight', sans-serif"
        >
          ESTATES · ARCHIVE
        </text>

        <circle cx="348" cy="104" r="5" stroke="white" strokeWidth="0.8" />
        <text
          x="348"
          y="106.5"
          fill="white"
          fontSize="5.5"
          fontWeight="600"
          textAnchor="middle"
          fontFamily="'Inter Tight', sans-serif"
        >
          R
        </text>
      </svg>
    </motion.div>
  );
};
