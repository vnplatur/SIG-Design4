'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CoverFlowCarousel, {
  type CarouselItem,
} from '@/components/ui/3-d-coverflow-carousel';
import LogoMarquee from '@/components/ui/logo-marquee';

/*
  Logos come from /public/logos, named by Muscat Securities Market ticker.
  Display names are taken from each file's embedded SVG <title> where present,
  otherwise from the ticker.

  TODO(confirm): ASCO.OM_BIG.svg carries no title and no text — only six cyan
  vector paths — so its company name could not be verified. It is labelled by
  ticker until confirmed. Replace `name` below with the correct company.
*/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const CLIENT_LOGOS: CarouselItem[] = [
  { titleLine1: 'Bank Muscat', img: `${basePath}/logos/BKMB.OM_BIG.svg` },
  { titleLine1: 'Omantel', img: `${basePath}/logos/OTEL.OM.svg` },
  { titleLine1: 'National Bank of Oman', img: `${basePath}/logos/NBOB.OM_BIG.svg` },
  { titleLine1: 'Bank Dhofar', img: `${basePath}/logos/BKDB.OM_BIG.svg` },
  { titleLine1: 'Sohar International', img: `${basePath}/logos/BKSB.OM_BIG.svg` },
  { titleLine1: 'Ahli Bank', img: `${basePath}/logos/ABOB.OM_BIG.svg` },
  { titleLine1: 'OQ Gas Networks', img: `${basePath}/logos/OQGN.OM.svg` },
  { titleLine1: 'ASCO', img: `${basePath}/logos/ASCO.OM_BIG.svg` },
];

const ClientsCoverflow = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="clients"
      className="py-20 md:py-24"
      style={{
        background:
          'linear-gradient(100deg, var(--navy-900) 0%, var(--navy-800) 60%, var(--navy-900) 100%)',
      }}
    >
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
        {/* Section header */}
        <div className="mb-12 text-center overflow-hidden">
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="eyebrow mb-3 text-[color:var(--teal-400)]"
          >
            Trusted Partners
          </motion.p>
          <h2 className="h-sec mb-4 text-white flex flex-wrap justify-center items-center gap-x-3 overflow-hidden">
            <motion.span
              initial={{ x: -150, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="inline-block"
            >
              Our
            </motion.span>
            <motion.span
              initial={{ x: 150, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="inline-block text-[color:var(--teal-400)]"
            >
              Clients
            </motion.span>
          </h2>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-white/80"
          >
            Leading government agencies and corporations across Oman partner with
            SIG for strategic advisory and investment promotion.
          </motion.p>
        </div>

        {/* 3D coverflow logo wall */}
        <CoverFlowCarousel
          items={CLIENT_LOGOS}
          variant="logo"
          sectionLabel=""
          accent="var(--teal-400)"
          controlsOnDark
          autoplay
          autoplayDelay={4000}
        />

        {/* Continuously scrolling logo ribbon — every client visible at once,
            complementing the one-at-a-time coverflow above. */}
        <LogoMarquee
          className="mt-2"
          items={CLIENT_LOGOS.map((c) => ({ name: c.titleLine1, src: c.img }))}
          duration="45s"
          fadeColor="var(--navy-900)"
        />

        {/* Call to action */}
        <div className="mt-12 text-center">
          <p className="mb-5 text-white/70">
            Join leading organizations transforming their investment strategies
            with SIG
          </p>
          <a href="#contact" className="btn btn-primary">
            Start Your Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientsCoverflow;
