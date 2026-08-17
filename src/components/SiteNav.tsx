import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { navLinks, project } from '../data/project';
import { useLeadForm } from '../contexts/LeadFormContext';

export function SiteNav() {
  const { open } = useLeadForm();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <div className="flex items-start justify-between p-4 lg:p-8">
          <motion.a
            href="#overview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-auto text-[13px] uppercase tracking-[0.32em] text-white mix-blend-exclusion lg:text-[15px]">
            
            {project.name}
          </motion.a>

          <motion.nav
            aria-label="Điều hướng chính"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-auto flex items-center gap-2 lg:gap-9">
            
            <ul className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) =>
              <li key={link.href}>
                  <a
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.22em] text-white mix-blend-exclusion transition-opacity duration-200 ease-out hover:opacity-60">
                  
                    {link.label}
                  </a>
                </li>
              )}
            </ul>

            <button
              type="button"
              onClick={() => open('nav')}
              className="whitespace-nowrap bg-bone px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-ink transition-colors duration-200 ease-out hover:bg-champagne lg:px-6 lg:text-[11px] lg:tracking-[0.18em]">
              
              Đăng ký xem nhà
            </button>

            <button
              type="button"
              aria-label="Mở menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="p-1 text-white mix-blend-exclusion lg:hidden">
              
              <MenuIcon className="h-6 w-6" strokeWidth={1.25} />
            </button>
          </motion.nav>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-50 bg-ink px-6 py-6 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu">
          
            <div className="flex items-center justify-between">
              <span className="text-[13px] uppercase tracking-[0.32em]">{project.name}</span>
              <button type="button" aria-label="Đóng menu" onClick={() => setMenuOpen(false)}>
                <XIcon className="h-6 w-6" strokeWidth={1.25} />
              </button>
            </div>

            <ul className="mt-16 space-y-6">
              {navLinks.map((link) =>
            <li key={link.href}>
                  <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="display block text-[34px] text-bone">
                
                    {link.label}
                  </a>
                </li>
            )}
            </ul>

            <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              open('mobile-menu');
            }}
            className="mt-14 w-full bg-bone px-6 py-4 text-[12px] uppercase tracking-[0.18em] text-ink">
            
              Đăng ký xem nhà
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}