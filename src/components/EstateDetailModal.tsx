import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { EstateItem } from '../data/estateData';

interface EstateDetailModalProps {
  item: EstateItem | null;
  onClose: () => void;
  onBookTour: (item: EstateItem) => void;
}

export const EstateDetailModal: React.FC<EstateDetailModalProps> = ({
  item,
  onClose,
  onBookTour,
}) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md">
        {/* Backdrop click */}
        <motion.div
          className="absolute inset-0 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          className="relative z-10 w-full max-w-5xl bg-[#0d0d0d] border border-white/15 rounded-2xl overflow-hidden shadow-2xl text-white flex flex-col md:flex-row max-h-[90vh]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Image showcase */}
          <div className="w-full md:w-1/2 relative bg-black flex items-center justify-center overflow-hidden min-h-[280px] md:min-h-full">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 text-xs tracking-widest uppercase font-mono">
              {item.code} · {item.category}
            </div>
          </div>

          {/* Right: Architectural Specifications */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="text-xs text-white/50 tracking-[0.2em] uppercase font-mono mb-2">
                HỒ SƠ KIẾN TRÚC ĐỘC BẢN
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-1">
                {item.title}
              </h2>
              <p className="text-sm text-white/70 italic mb-4">
                {item.vietnameseTitle}
              </p>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-light">
                {item.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-white/[0.04] rounded-lg border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-white/50 uppercase font-mono mb-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Diện tích</span>
                  </div>
                  <div className="text-base font-medium text-white">{item.area}</div>
                </div>

                <div className="p-3 bg-white/[0.04] rounded-lg border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-white/50 uppercase font-mono mb-1">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Hướng & Ánh sáng</span>
                  </div>
                  <div className="text-xs font-medium text-white">{item.specs.orientation}</div>
                </div>

                <div className="col-span-2 p-3 bg-white/[0.04] rounded-lg border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-white/50 uppercase font-mono mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Vật liệu & Chiều cao trần</span>
                  </div>
                  <div className="text-xs font-medium text-white">
                    {item.materials} · Trần cao {item.specs.ceilingHeight}
                  </div>
                </div>
              </div>

              {/* Highlight features */}
              <div className="mb-6">
                <div className="text-xs uppercase text-white/60 font-mono tracking-wider mb-2">
                  Đặc quyền hoàn thiện
                </div>
                <div className="space-y-2">
                  {item.specs.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] text-white/50 uppercase font-mono">Dự toán hạng mục</div>
                <div className="text-xl font-bold tracking-tight text-white">
                  {item.priceTag || "$4,850,000"}
                </div>
              </div>

              <button
                onClick={() => onBookTour(item)}
                className="px-6 py-3 bg-white text-black font-semibold text-sm rounded-full hover:bg-neutral-200 transition-colors uppercase tracking-wider cursor-pointer"
              >
                Đặt Lịch Khảo Sát
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
