'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TailwindImageAccordion, {
  type ImageAccordionItem,
} from '@/components/ui/tailwind-image-accordion';
import { WORKSHOPS } from '@/lib/sig-data';

const items: ImageAccordionItem[] = WORKSHOPS.map((w, i) => ({
  id: String(i + 1),
  url: w.image,
  title: w.title,
  description: `${w.category} · ${w.location}`,
  href: w.href,
}));

const Workshops = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="training" className="bg-white py-20 md:py-28">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-3xl text-center overflow-hidden">
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="eyebrow mb-3 text-[color:var(--teal-600)]"
          >
            Capability Development
          </motion.p>
          <h2 className="h-sec mb-5 text-[color:var(--navy-900)] flex flex-wrap justify-center items-center gap-x-3 overflow-hidden">
            <motion.span
              initial={{ x: -150, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="inline-block"
            >
              Training
            </motion.span>
            <motion.span
              initial={{ x: 150, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="inline-block text-[color:var(--teal-600)]"
            >
              &amp; Workshops
            </motion.span>
          </h2>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="text-lg text-[color:var(--grey-600)]"
          >
            Strengthen institutional capacity through our specialized training
            programs and executive workshops.
          </motion.p>
        </div>

        <TailwindImageAccordion items={items} />

        <p className="mt-6 text-center text-sm text-[color:var(--grey-500)]">
          Hover or focus a panel to expand it.
        </p>
      </div>
    </section>
  );
};

export default Workshops;
