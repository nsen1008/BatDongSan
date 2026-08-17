import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useEnvironment';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrubbed parallax for every `[data-parallax="<amount>"]` inside `scopeRef`.
 * Amount is expressed in percent of the element height; negative moves against scroll.
 */
export function useParallax(scopeRef: React.RefObject<HTMLElement>): void {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scopeRef.current) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        const amount = Number(element.dataset.parallax ?? 6);
        gsap.fromTo(
          element,
          { yPercent: amount },
          {
            yPercent: -amount,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });
    }, scopeRef);

    return () => context.revert();
  }, [reduced, scopeRef]);
}