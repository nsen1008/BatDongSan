import React, { useEffect, useRef } from 'react';

/**
 * Desktop-only architectural cursor. All motion is written straight to the DOM
 * through refs + requestAnimationFrame — never through React state.
 */
export function CustomCursor({ enabled }: {enabled: boolean;}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const scale = useRef(1);
  const scaleTarget = useRef(1);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add('cursor-hidden');

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      const interactive = (event.target as HTMLElement | null)?.closest(
        'a, button, input, textarea, select, [data-cursor="hover"]'
      );
      scaleTarget.current = interactive ? 2.4 : 1;
    };

    let frame = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      scale.current += (scaleTarget.current - scale.current) * 0.18;
      const node = dotRef.current;
      if (node) {
        node.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%) scale(${scale.current.toFixed(3)})`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      root.classList.remove('cursor-hidden');
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 h-4 w-4 rounded-full border border-white mix-blend-exclusion"
      style={{ willChange: 'transform' }} />);


}