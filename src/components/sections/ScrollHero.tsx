'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollExpandMedia, {
  useScrollHero,
} from '@/components/ui/scroll-expansion-hero';
import { Arrow } from '@/components/ui/primitives';

/* SIG brand film, already used by the previous hero. */
const HERO_VIDEO =
  'https://www.omaninvestgateway.com/wp-content/uploads/2021/04/video-4.mp4';

/* Backdrop behind the collapsed card, and the video's poster frame.
   Replace with a local asset in /public once brand imagery is available. */
const HERO_BACKDROP =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop';
const HERO_POSTER =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1280&auto=format&fit=crop';

const ScrollHeroContent = () => {
  const { showContent } = useScrollHero();

  return (
    <div className="mx-auto max-w-4xl text-center overflow-hidden">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight flex flex-wrap justify-center items-center gap-x-3 overflow-hidden">
        <motion.span
          initial={{ x: -150, opacity: 0 }}
          animate={showContent ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="inline-block"
        >
          Accelerating Investment.
        </motion.span>
        <motion.span
          initial={{ x: 150, opacity: 0 }}
          animate={showContent ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="inline-block text-[color:var(--teal-300)]"
        >
          Creating Impact.
        </motion.span>
      </h2>

      <motion.p
        initial={{ x: 100, opacity: 0 }}
        animate={showContent ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        className="mb-10 text-lg leading-relaxed text-white/80 md:text-xl max-w-2xl mx-auto"
      >
        Transforming strategy, research, and investment intelligence into
        measurable impact across government and private sector partnerships.
      </motion.p>

      <div className="flex flex-col gap-4 sm:flex-row justify-center items-center overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={showContent ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
        >
          <Link href="#services" className="btn btn-primary">
            Explore Our Services
            <Arrow />
          </Link>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={showContent ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
        >
          <Link
            href="#contact"
            className="btn border border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
          >
            Investment Opportunities
            <Arrow />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

const ScrollHero = () => {
  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc={HERO_VIDEO}
      posterSrc={HERO_POSTER}
      bgImageSrc={HERO_BACKDROP}
      title="Activating Strategies"
      date="Smart Investment Gateway"
      scrollToExpand="Scroll to explore"
      titleAs="h1"
      textClassName="text-white"
      overlayClassName="bg-[color:var(--navy-950)]/75"
    >
      <ScrollHeroContent />
    </ScrollExpandMedia>
  );
};

export default ScrollHero;
