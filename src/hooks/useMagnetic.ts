import { useEffect, useRef } from 'react';
import { useCinematicMode } from './useEnvironment';

/**
 * Desktop-only magnetic pull. Written directly to the DOM via rAF — no React state.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);
  const cinematic = useCinematicMode();

  useEffect(() => {
    const node = ref.current;
    if (!cinematic || !node) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let active = false;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      target.x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      target.y = (event.clientY - (rect.top + rect.height / 2)) * strength * 0.6;
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      node.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      if (Math.abs(current.x) < 0.05 && Math.abs(current.y) < 0.05 && !active) {
        node.style.transform = '';
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      active = true;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      active = false;
      onLeave();
      if (!frame) frame = requestAnimationFrame(tick);
    };

    node.addEventListener('pointerenter', start);
    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', stop);

    return () => {
      node.removeEventListener('pointerenter', start);
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', stop);
      if (frame) cancelAnimationFrame(frame);
      node.style.transform = '';
    };
  }, [cinematic, strength]);

  return ref;
}