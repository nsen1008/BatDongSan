import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LeadFormProvider } from './contexts/LeadFormContext';
import { useCinematicMode, useReducedMotion } from './hooks/useEnvironment';
import { useSeo } from './hooks/useSeo';
import { project, realEstateAssets } from './data/project';
import { CustomCursor } from './components/CustomCursor';
import { SiteNav } from './components/SiteNav';
import { LeadFormModal } from './components/LeadFormModal';
import { StickyMobileCta } from './components/StickyMobileCta';
import { Hero } from './components/sections/Hero';
import { Introduction } from './components/sections/Introduction';
import { Gallery } from './components/sections/Gallery';
import { Architecture } from './components/sections/Architecture';
import { Residences } from './components/sections/Residences';
import { Amenities } from './components/sections/Amenities';
import { LocationSection } from './components/sections/LocationSection';
import { Marquee } from './components/Marquee';
import { ValueAndTrust } from './components/sections/ValueAndTrust';
import { ViewingCta } from './components/sections/ViewingCta';
import { SiteFooter } from './components/sections/SiteFooter';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const cinematic = useCinematicMode();
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useSeo({
    title: `${project.name} — Premium Private Residences`,
    description: `Khám phá ${project.name}, không gian sống cao cấp dành cho những chủ nhân tìm kiếm sự riêng tư, vị thế và giá trị bền vững. Đăng ký tham quan riêng.`,
    image: realEstateAssets.heroVideos[0]
  });

  /* The black panel rises over the cinematic hero across the first viewport of scroll. */
  useEffect(() => {
    if (reduced || !stageRef.current || !heroRef.current) return;

    const context = gsap.context(() => {
      gsap.to(heroRef.current, {
        opacity: 0.25,
        scale: 0.94,
        ease: 'none',
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true
        }
      });
    }, stageRef);

    return () => context.revert();
  }, [reduced]);

  return (
    <LeadFormProvider>
      <div className="w-full bg-ink">
        <CustomCursor enabled={cinematic} />
        <SiteNav />

        <main>
          <div ref={stageRef} className="relative">
            <div ref={heroRef} className="sticky top-0 h-[100svh] overflow-hidden will-change-transform">
              <Hero />
            </div>

            <div className="relative z-20 bg-ink">
              <Introduction />
              <Gallery />
            </div>
          </div>

          <Architecture />
          <Residences />
          <Amenities />
          <LocationSection />
          <Marquee
            items={[
            project.name,
            'PRIVATE RESIDENCES',
            'ĐĂNG KÝ XEM NHÀ',
            project.location,
            'LIMITED PRIVATE VIEWINGS']
            } />
          
          <ValueAndTrust />
          <ViewingCta />
        </main>

        <SiteFooter />
        <StickyMobileCta />
        <LeadFormModal />
      </div>
    </LeadFormProvider>);

}