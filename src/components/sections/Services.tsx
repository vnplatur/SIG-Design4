'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { SERVICES } from '@/lib/sig-data';
import { cn } from '@/lib/utils';

const CARD_SURFACES = [
  'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 100%)',
  'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-950) 100%)',
  'linear-gradient(135deg, var(--navy-700) 0%, var(--navy-900) 100%)',
  'linear-gradient(135deg, var(--navy-950) 0%, var(--navy-800) 100%)',
  'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)',
  'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-700) 100%)',
];

const ServiceCard = ({
  service,
  index,
  isActive,
  onHover,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  isActive: boolean;
  onHover: () => void;
}) => {
  const words = service.title.split(' ');
  const mid = Math.ceil(words.length / 2);
  const titleLeft = words.slice(0, mid).join(' ');
  const titleRight = words.slice(mid).join(' ');

  return (
    <article
      onMouseEnter={onHover}
      onClick={onHover}
      className={cn(
        "relative rounded-3xl overflow-hidden border border-white/5 shadow-lg transition-[flex,height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none",
        // Desktop widths: Active card expands, others contract to fit the screen
        isActive ? "md:flex-[3.8] md:w-auto" : "md:flex-[0.6] md:w-auto",
        // Mobile heights: Active card expands, others contract
        isActive ? "max-md:h-[480px]" : "max-md:h-[72px]"
      )}
    >
      {/* Background Surface */}
      <div 
        className="absolute inset-0 z-0"
        style={{ background: CARD_SURFACES[index % CARD_SURFACES.length] }}
      />

      {/* ACTIVE CARD LAYOUT */}
      <div 
        className={cn(
          "relative z-10 w-full h-full flex flex-col sm:flex-row transition-opacity duration-300", 
          isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-0"
        )}
      >
        {/* Copy */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 md:p-10 text-white gap-3 md:gap-4 overflow-hidden">
          <motion.span
            initial={{ y: -20, opacity: 0 }}
            animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="eyebrow text-[color:var(--teal-300)]"
          >
            {service.n}
          </motion.span>

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug tracking-[-0.01em] overflow-hidden flex flex-wrap gap-x-2">
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={isActive ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="inline-block"
            >
              {titleLeft}
            </motion.span>
            <motion.span
              initial={{ x: 100, opacity: 0 }}
              animate={isActive ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="inline-block text-[color:var(--teal-300)]"
            >
              {titleRight}
            </motion.span>
          </h3>

          <motion.p
            initial={{ x: -50, opacity: 0 }}
            animate={isActive ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-white/90 font-medium leading-relaxed"
          >
            {service.lead}
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={isActive ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            className="text-xs sm:text-xs md:text-sm leading-relaxed text-white/70"
          >
            {service.body}
          </motion.p>

          {/* Read More Button with hover animation */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isActive ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          >
            <a
              href="https://www.omaninvestgateway.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-[color:var(--teal-500)] text-[color:var(--navy-950)] font-semibold rounded-lg hover:bg-[color:var(--teal-400)] transition-all duration-300 text-xs sm:text-sm max-w-max shadow-[0_4px_12px_rgba(20,184,166,0.2)] hover:shadow-[0_4px_20px_rgba(20,184,166,0.4)]"
            >
              Read More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Imagery */}
        <div className="relative w-full h-[150px] sm:h-full sm:w-[38%] shrink-0 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/article:scale-105 transform-gpu will-change-transform"
            loading="lazy"
          />
          <div
            className="absolute inset-0 bg-linear-to-t sm:bg-linear-to-r from-[color:var(--navy-950)]/50 to-transparent"
          />
        </div>
      </div>

      {/* INACTIVE CARD LAYOUT */}
      <div 
        className={cn(
          "relative z-10 w-full h-full flex flex-col justify-between p-4 md:py-10 transition-opacity duration-300", 
          !isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-0"
        )}
      >
        {/* Desktop Vertical Title */}
        <div className="hidden md:flex flex-col items-center justify-between h-full w-full">
          <span className="text-sm font-bold text-white/50">{service.n}</span>
          
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm font-bold text-white/70 whitespace-nowrap rotate-[270deg] tracking-wide uppercase select-none">
              {service.title.length > 25 ? `${service.title.substring(0, 22)}...` : service.title}
            </p>
          </div>

          <div className="w-1.5 h-10 bg-[color:var(--teal-400)] rounded-full transition-all duration-300 group-hover:h-14" />
        </div>

        {/* Mobile Horizontal Layout for Collapsed state */}
        <div className="md:hidden flex items-center justify-between w-full h-full px-2">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-teal-400">{service.n}</span>
            <span className="text-sm font-bold text-white leading-tight">{service.title}</span>
          </div>
          <svg className="text-white/60" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m19 9-7 7-7-7" />
          </svg>
        </div>
      </div>
    </article>
  );
};

const Services = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { ref: viewRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="bg-[color:var(--paper)] py-20 md:py-28 relative overflow-hidden">
      <div ref={viewRef} className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
        {/* Section header */}
        <div className="mb-12 max-w-3xl overflow-hidden">
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="eyebrow mb-3 text-[color:var(--teal-600)]"
          >
            Capabilities
          </motion.p>
          <h2 className="h-sec mb-5 text-[color:var(--navy-900)] flex flex-wrap items-center gap-x-3 overflow-hidden">
            <motion.span
              initial={{ x: -150, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="inline-block"
            >
              OUR
            </motion.span>
            <motion.span
              initial={{ x: 150, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="inline-block text-[color:var(--teal-600)]"
            >
              SERVICES
            </motion.span>
          </h2>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="text-lg text-[color:var(--grey-600)]"
          >
            We turn strategy, research, and investment insight into measurable impact across government and private sector partnerships.
          </motion.p>
        </div>

        {/* Hover expanding Accordion Container */}
        <div className="flex flex-col md:flex-row gap-4 w-full h-auto md:h-[520px] mt-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.n}
              service={service}
              index={index}
              isActive={activeIndex === index}
              onHover={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
