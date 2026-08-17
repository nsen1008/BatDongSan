import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useEnvironment';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

interface MaskTextProps {
  text: string;
  className?: string;
  as?: Tag;
  /** Reveal on mount (hero) or when scrolled into view (sections). */
  trigger?: 'mount' | 'view';
  delay?: number;
  id?: string;
}

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Word-by-word mask reveal: each word rides up from behind its own clipping box.
 * The staggered sequence is what makes large editorial type feel authored.
 */
export function MaskText({ text, className = '', as = 'h2', trigger = 'view', delay = 0, id }: MaskTextProps) {
  const reduced = useReducedMotion();
  const Tag = as;

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>);

  }

  const words = text.split(' ');
  const animateProps =
  trigger === 'mount' ?
  { animate: 'visible' as const } :
  { whileInView: 'visible' as const, viewport: { once: true, margin: '-12% 0px' } };

  return (
    <Tag id={id} className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        {...animateProps}
        transition={{ staggerChildren: 0.045, delayChildren: delay }}>
        
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-flex overflow-hidden align-bottom"
            style={{
              paddingTop: '0.3em',
              marginTop: '-0.3em',
              paddingBottom: '0.18em',
              marginBottom: '-0.18em',
            }}
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '120%' },
                visible: { y: '0%', transition: { duration: 0.62, ease: EASE } },
              }}
            >
              {word}
              {index < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>);

}