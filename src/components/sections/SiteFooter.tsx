import React from 'react';
import { project } from '../../data/project';
import { useLeadForm } from '../../contexts/LeadFormContext';

export function SiteFooter() {
  const { open } = useLeadForm();

  return (
    <footer className="bg-ink px-4 pb-28 pt-20 lg:px-8 lg:pb-16 lg:pt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="display text-[clamp(28px,4vw,56px)] text-warmwhite">{project.name}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-white/40">Private residences</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              data-cursor="hover"
              onClick={() => open('footer')}
              className="bg-bone px-8 py-4 text-[12px] uppercase tracking-[0.18em] text-ink transition-colors duration-200 ease-out hover:bg-champagne">
              
              Đăng ký xem nhà
            </button>
            <a
              href={`tel:${project.hotline}`}
              className="border border-white/25 px-8 py-4 text-center text-[12px] uppercase tracking-[0.18em] text-bone transition-colors duration-200 ease-out hover:border-champagne hover:text-champagne">
              
              {project.hotline}
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-[11px] uppercase tracking-[0.2em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>{project.address}</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="transition-colors duration-200 ease-out hover:text-bone">
              Privacy policy
            </a>
            <p>© 2026 {project.name}</p>
          </div>
        </div>
      </div>
    </footer>);

}