import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { ESTATE_ITEMS, EstateItem } from '../data/estateData';

interface GalleryPanelProps {
  onSelectItem: (item: EstateItem) => void;
  onScrollPhaseChange?: (isHeroVisible: boolean) => void;
}

function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let imgIndex = 0;
  let r = 0;

  while (imgIndex < count) {
    const row: number[] = new Array(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    if (imgIndex < count) {
      row[a] = imgIndex++;
    }

    if (r % 3 === 0 && imgIndex < count && cols > 1) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      if (row[b] === -1 && imgIndex < count) {
        row[b] = imgIndex++;
      }
    }

    rows.push(row);
    r++;
  }

  return rows;
}

const SYMBOLS = ['8', '$', '^^', '%', '/', '§', '✦', 'Ω', '01', '◈'];

export const GalleryPanel: React.FC<GalleryPanelProps> = ({
  onSelectItem,
  onScrollPhaseChange,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const cardCurrentScaleRef = useRef<Map<number, number>>(new Map());
  const cachedCardMetricsRef = useRef<{ top: number; height: number }[]>([]);

  const lastSymbolUpdateRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(-1);

  const [cols, setCols] = React.useState<number>(() => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 2;
    if (window.innerWidth < 1024) return 3;
    return 4;
  });

  const gridRows = useMemo(() => {
    return buildLayout(ESTATE_ITEMS.length, cols);
  }, [cols]);

  const updateMetrics = useCallback(() => {
    const metrics: { top: number; height: number }[] = [];
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperTopInDoc = wrapperRect.top + window.scrollY;

    cardRefs.current.forEach((cardEl, imgIdx) => {
      if (cardEl) {
        const cardRect = cardEl.getBoundingClientRect();
        metrics[imgIdx] = {
          top: cardRect.top + window.scrollY - wrapperTopInDoc,
          height: cardRect.height,
        };
      }
    });

    cachedCardMetricsRef.current = metrics;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const newCols = w < 640 ? 2 : w < 1024 ? 3 : 4;
      if (newCols !== cols) {
        setCols(newCols);
      }
      setTimeout(updateMetrics, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    const t = setTimeout(updateMetrics, 200);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t);
    };
  }, [cols, updateMetrics]);

  useEffect(() => {
    let rafId: number;

    const tick = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const panel = panelRef.current;
      const wrapper = wrapperRef.current;
      const spacer = document.getElementById('scroll-spacer');
      const outroOverlay = document.getElementById('outro-overlay');
      const outroBuy = document.getElementById('outro-buy');
      const outroFooter = document.getElementById('outro-footer');
      const symbolElem = document.getElementById('circle-symbol');

      if (!panel || !wrapper) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (onScrollPhaseChange) {
        onScrollPhaseChange(scrollY < vh * 1.05);
      }

      const now = performance.now();
      if (scrollY !== lastScrollYRef.current && now - lastSymbolUpdateRef.current > 80) {
        lastSymbolUpdateRef.current = now;
        lastScrollYRef.current = scrollY;
        if (symbolElem) {
          const randSym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          symbolElem.textContent = randSym;
        }
      }

      const wrapScrollHeight = wrapper.offsetHeight;
      const maxScroll = Math.max(0, wrapScrollHeight - vh);

      if (spacer) {
        const requiredHeight = vh + maxScroll + 2 * vh;
        if (spacer.style.height !== `${requiredHeight}px`) {
          spacer.style.height = `${requiredHeight}px`;
        }
      }

      let panelY = 0;
      let wrapperTranslate = 0;

      if (scrollY <= vh) {
        // Phase 1: Panel slides up from bottom
        panelY = vh - scrollY;
        wrapperTranslate = 0;
        panel.style.transform = `translate3d(0, ${panelY}px, 0)`;
        wrapper.style.transform = `translate3d(0, 0, 0)`;

        if (outroOverlay) outroOverlay.style.opacity = '0';
        if (outroBuy) outroBuy.style.transform = 'scale(0)';
        if (outroFooter) outroFooter.style.opacity = '0';
      } else {
        // Phase 2: Panel pinned at top
        panelY = 0;
        panel.style.transform = 'translate3d(0, 0, 0)';
        const phase2Scroll = scrollY - vh;
        wrapperTranslate = -Math.min(phase2Scroll, maxScroll);
        wrapper.style.transform = `translate3d(0, ${wrapperTranslate}px, 0)`;

        // Outro phase
        if (scrollY > vh + maxScroll) {
          const outroScroll = scrollY - vh - maxScroll;
          const denom = Math.max(1, vh - 100);
          const progress = Math.max(0, Math.min(1, outroScroll / denom));

          if (outroOverlay) outroOverlay.style.opacity = `${progress}`;
          if (outroBuy) outroBuy.style.transform = `scale(${progress})`;
          if (outroFooter) outroFooter.style.opacity = `${progress}`;
        } else {
          if (outroOverlay) outroOverlay.style.opacity = '0';
          if (outroBuy) outroBuy.style.transform = 'scale(0)';
          if (outroFooter) outroFooter.style.opacity = '0';
        }
      }

      // Card scale physics: exit early before hitting the top header bar (top < 120px)
      const metrics = cachedCardMetricsRef.current;
      const topSafeZone = 100; // safe zone in pixels from top edge

      cardRefs.current.forEach((cardEl, imgIdx) => {
        if (!cardEl) return;
        const metric = metrics[imgIdx];

        let targetScale = 0;
        if (metric) {
          const cardTopInView = metric.top + panelY + wrapperTranslate;
          const cardBottomInView = cardTopInView + metric.height;

          if (cardBottomInView <= topSafeZone || cardTopInView >= vh) {
            targetScale = 0;
          } else {
            const enter = Math.min(1, (vh - cardTopInView) / (vh * 0.5));
            const exit = Math.min(1, (cardBottomInView - topSafeZone) / (vh * 0.4));
            targetScale = Math.max(0, Math.min(enter, exit));
          }
        }

        const prevScale = cardCurrentScaleRef.current.get(imgIdx) ?? -1;
        if (Math.abs(targetScale - prevScale) > 0.003) {
          cardCurrentScaleRef.current.set(imgIdx, targetScale);
          cardEl.style.transform = `scale(${targetScale.toFixed(3)})`;
        }
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [gridRows, onScrollPhaseChange]);

  return (
    <div
      ref={panelRef}
      id="black-panel"
      className="fixed inset-0 z-10 bg-black overflow-hidden pointer-events-auto will-change-transform"
      style={{
        transform: 'translate3d(0, 100vh, 0)',
      }}
    >
      <div
        ref={wrapperRef}
        id="panel-inner-wrapper"
        className="w-full will-change-transform"
        style={{
          paddingTop: 'min(280px, 30vh)',
          paddingBottom: 'min(300px, 30vh)',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Subtle architectural Section Intro */}
          <div className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase block mb-1">
                DANH MỤC KHÔNG GIAN
              </span>
              <h2 className="text-xl sm:text-3xl font-semibold tracking-tight text-white">
                BỘ SƯU TẬP KIẾN TRÚC ĐỘC BẢN
              </h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-md font-mono tracking-tight leading-relaxed">
              10 phân khu và tiện ích siêu sang được chế tác từ đá nguyên khối và ánh sáng tự nhiên.
            </p>
          </div>

          {/* Scattered Layout Grid */}
          <div
            className="grid gap-5 sm:gap-6 md:gap-8 w-full"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
          >
            {gridRows.map((row, rIdx) =>
              row.map((imgIdx, cIdx) => {
                if (imgIdx === -1) {
                  return <div key={`empty-${rIdx}-${cIdx}`} className="aspect-[2/3] w-full" />;
                }

                const item = ESTATE_ITEMS[imgIdx];
                if (!item) return null;

                const isLeftHalf = cIdx < cols / 2;
                const transformOrigin = isLeftHalf ? 'right bottom' : 'left bottom';

                return (
                  <div
                    key={`card-${item.id}`}
                    ref={(el) => {
                      if (el) cardRefs.current.set(imgIdx, el);
                      else cardRefs.current.delete(imgIdx);
                    }}
                    onClick={() => onSelectItem(item)}
                    className="bp-card aspect-[2/3] w-full relative group cursor-pointer overflow-hidden rounded-xl bg-neutral-900 border border-white/15 shadow-2xl transition-all hover:border-white/40 will-change-transform"
                    style={{
                      transformOrigin,
                      transform: 'scale(0)',
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/15 text-[10px] font-mono tracking-widest text-white uppercase">
                      {item.code}
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                      <div className="text-[10px] font-mono tracking-wider text-white/60 uppercase mb-1">
                        {item.category} · {item.area}
                      </div>
                      <h3 className="text-xs sm:text-sm font-semibold tracking-tight leading-snug line-clamp-2 mb-1 group-hover:text-amber-200 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/15 text-xs">
                        <span className="font-mono text-white/80 text-[11px]">{item.priceTag}</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                          Chi tiết →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
