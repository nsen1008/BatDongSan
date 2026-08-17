import { useEffect, useState } from 'react';

function useMediaQuery(query: string, initial = false): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return initial;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True on pointer-precise, wide viewports — where cursor interactions belong. */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
}

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** Convenience: cinematic interactions run only when both are satisfied. */
export function useCinematicMode(): boolean {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  return isDesktop && !reduced;
}