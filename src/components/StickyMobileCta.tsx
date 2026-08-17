import React from 'react';
import { useLeadForm } from '../contexts/LeadFormContext';

export function StickyMobileCta() {
  const { open, isOpen } = useLeadForm();

  return (
    <div
      className={`safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/90 px-4 pt-3 backdrop-blur-md transition-opacity duration-200 ease-out lg:hidden ${
      isOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}`
      }>
      
      <button
        type="button"
        onClick={() => open('sticky-mobile')}
        className="w-full bg-bone px-6 py-4 text-[12px] uppercase tracking-[0.18em] text-ink">
        
        Đăng ký xem nhà
      </button>
    </div>);

}