import React from 'react';

export const OutroOverlay: React.FC = () => {
  return (
    <div
      id="outro-overlay"
      className="fixed inset-0 pointer-events-none z-12 bg-white transition-none"
      style={{ opacity: 0 }}
      aria-hidden="true"
    />
  );
};

export const OutroFooter: React.FC = () => {
  return (
    <div
      id="outro-footer"
      className="fixed pointer-events-none z-20 blend-exclusion left-4 lg:left-8 bottom-6 lg:bottom-8
        flex items-center gap-[40px] lg:gap-[80px] justify-between lg:justify-start
        w-[calc(100vw-32px)] lg:w-auto transition-none"
      style={{ opacity: 0 }}
    >
      <span className="text-[11px] lg:text-[13px] font-medium tracking-[-0.02em] uppercase text-white">
        PRMPT ESTATES (R) 2026
      </span>
      <span className="text-[11px] lg:text-[13px] font-medium tracking-[-0.02em] uppercase text-white">
        QUY HOẠCH & BẢO MẬT VIP
      </span>
    </div>
  );
};
