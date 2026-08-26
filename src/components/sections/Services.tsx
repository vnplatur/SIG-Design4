'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import StackingCards, {
  StackingCardItem,
} from '@/components/ui/stacking-cards';
import { SERVICES } from '@/lib/sig-data';

/* Alternating card surfaces so consecutive cards stay distinguishable as they
   stack. Navy-only by design: --teal-600 (#0f766e) is light enough that white
   body copy over it measures 3.54:1, below the 4.5:1 AA floor. Teal stays as
   the number accent, where the darker navy gives it room. */
const CARD_SURFACES = [
  'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 100%)',
  'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-950) 100%)',
  'linear-gradient(135deg, var(--navy-700) 0%, var(--navy-900) 100%)',
  'linear-gradient(135deg, var(--navy-950) 0%, var(--navy-800) 100%)',
  'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%)',
  'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-700) 100%)',
];

const ServiceCardContent = ({
  service,
  index,
}: {
  service: (typeof SERVICES)[0];
  index: number;
}) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.25 });

  // Split title into two parts for the left/right slide
  const words = service.title.split(' ');
  const mid = Math.ceil(words.length / 2);
  const titleLeft = words.slice(0, mid).join(' ');
  const titleRight = words.slice(mid).join(' ');

  return (
    <div
      ref={ref}
      className="mx-auto flex h-[78%] w-[92%] max-w-[var(--maxw)] flex-col overflow-hidden rounded-3xl shadow-[0_25px_70px_-20px_rgba(5,10,24,0.55)] sm:flex-row"
    >
      {/* Copy */}
      <div
        className="flex flex-1 flex-col justify-center gap-4 p-8 text-white md:p-12 overflow-hidden"
        style={{ background: CARD_SURFACES[index % CARD_SURFACES.length] }}
      >
        <motion.span
          initial={{ x: -100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="eyebrow text-[color:var(--teal-300)]"
        >
          {service.n}
        </motion.span>

        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl flex flex-wrap items-center gap-x-2 overflow-hidden">
          <motion.span
            initial={{ x: -150, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.05 }}
            className="inline-block"
          >
            {titleLeft}
          </motion.span>
          <motion.span
            initial={{ x: 150, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.05 }}
            className="inline-block text-[color:var(--teal-300)]"
          >
            {titleRight}
          </motion.span>
        </h3>

        <motion.p
          initial={{ x: -100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="text-base text-white/90 md:text-lg"
        >
          {service.lead}
        </motion.p>

        <motion.p
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="max-w-xl text-sm leading-relaxed text-white/70 md:text-base"
        >
          {service.body}
        </motion.p>
      </div>

      {/* Imagery */}
      <div className="relative hidden min-h-[220px] w-full sm:block sm:w-[42%]">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 42vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(5,10,24,0.55) 0%, rgba(5,10,24,0.12) 45%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
};

const Services = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="bg-[color:var(--paper)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
        {/* Section header */}
        <div ref={ref} className="mx-auto mb-14 max-w-3xl text-center overflow-hidden">
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="eyebrow mb-3 text-[color:var(--teal-600)]"
          >
            Capabilities
          </motion.p>
          <h2 className="h-sec mb-5 text-[color:var(--navy-900)] flex flex-wrap justify-center items-center gap-x-3 overflow-hidden">
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
      </div>

      {/* Scroll-driven stack. Each item needs an explicit height so its wrapper
         is taller than the card, which is what makes `top` pinning work. */}
      <StackingCards
        totalCards={SERVICES.length}
        scaleMultiplier={0.04}
        className="w-full"
      >
        {SERVICES.map((service, index) => (
          <StackingCardItem
            key={service.n}
            index={index}
            className="h-[92vh] min-h-[560px]"
          >
            <ServiceCardContent service={service} index={index} />
          </StackingCardItem>
        ))}
      </StackingCards>
    </section>
  );
};

export default Services;
