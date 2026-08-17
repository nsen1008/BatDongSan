import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';

type Variant = 'primary' | 'outline' | 'dark';

const base =
'group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 text-[12px] tracking-[0.18em] uppercase transition-colors duration-200 ease-out';

const variants: Record<Variant, string> = {
  primary: 'bg-bone text-ink hover:text-bone',
  outline: 'border border-white/35 text-bone hover:text-ink',
  dark: 'bg-ink text-bone hover:text-ink'
};

/** The sweep panel that wipes across on hover — solid colour, no gradients. */
const sweeps: Record<Variant, string> = {
  primary: 'bg-ink',
  outline: 'bg-bone',
  dark: 'bg-bone'
};

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  withArrow?: boolean;
}

export function CtaButton({
  variant = 'primary',
  withArrow = true,
  className = '',
  children,
  ...rest
}: CtaButtonProps) {
  const magneticRef = useMagnetic<HTMLButtonElement>(0.22);

  return (
    <button
      ref={magneticRef}
      type="button"
      data-cursor="hover"
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}>
      
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-200 ease-out group-hover:origin-top group-hover:scale-y-100 ${sweeps[variant]}`} />
      
      <span className="relative z-10">{children}</span>
      {withArrow &&
      <ArrowUpRightIcon
        aria-hidden="true"
        className="relative z-10 h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
        strokeWidth={1.5} />

      }
    </button>);

}