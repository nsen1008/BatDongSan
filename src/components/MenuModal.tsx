import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';
import { PROJECT_DETAILS } from '../data/estateData';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Drawer Panel */}
        <motion.div
          className="relative z-10 w-full max-w-xl bg-[#0a0a0a] border-l border-white/15 h-full p-8 md:p-12 text-white flex flex-col justify-between overflow-y-auto"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Top header */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50 block">
                  DANH MỤC ĐIỀU HƯỚNG
                </span>
                <span className="text-xl font-bold tracking-tight text-white">
                  {PROJECT_DETAILS.brandName}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation items */}
            <nav className="space-y-6">
              <a
                href="#main-canvas"
                onClick={onClose}
                className="group flex items-center justify-between text-2xl md:text-3xl font-semibold tracking-tight text-white hover:text-amber-200 transition-colors"
              >
                <span>01. CINEMATIC FACADE TOUR</span>
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="#black-panel"
                onClick={() => {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                  onClose();
                }}
                className="group flex items-center justify-between text-2xl md:text-3xl font-semibold tracking-tight text-white hover:text-amber-200 transition-colors"
              >
                <span>02. ARCHITECTURAL GALLERY</span>
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry();
                }}
                className="group flex items-center justify-between text-2xl md:text-3xl font-semibold tracking-tight text-white hover:text-amber-200 transition-colors text-left w-full cursor-pointer"
              >
                <span>03. ĐẶT LỊCH THAM QUAN VIP</span>
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </nav>

            {/* Key Project Highlights */}
            <div className="mt-12 p-6 bg-white/[0.03] rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-white/50">
                <MapPin className="w-3.5 h-3.5" />
                <span>Vị trí độc tôn</span>
              </div>
              <p className="text-sm text-neutral-300 font-light">
                {PROJECT_DETAILS.location}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-white/50 font-mono block">Tổng diện tích GFA</span>
                  <span className="text-white font-medium text-sm">{PROJECT_DETAILS.totalArea}</span>
                </div>
                <div>
                  <span className="text-white/50 font-mono block">Giá tham chiếu</span>
                  <span className="text-white font-medium text-sm">{PROJECT_DETAILS.startingPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Details */}
          <div className="pt-8 border-t border-white/10 text-xs text-white/40 space-y-2 font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Pháp lý quy hoạch 1/500 hoàn thiện 100%</span>
            </div>
            <div>Bản quyền kiến trúc © 2026 PRMPT ESTATES. Bảo mật chuẩn Thụy Sĩ.</div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
