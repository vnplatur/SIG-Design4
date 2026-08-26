'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FeatureSteps, { type Feature } from '@/components/ui/feature-section';
import { NEWS_EN, NEWS_VIEW_ALL, LEADER } from '@/lib/sig-data';

const features: Feature[] = NEWS_EN.map((n) => ({
  step: n.tag,
  title: n.title,
  content: n.excerpt,
  image: n.image,
  href: n.href,
}));

const LatestNews = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="media" className="bg-[color:var(--paper)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-3xl text-center overflow-hidden">
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="eyebrow mb-3 text-[color:var(--teal-600)]"
          >
            Latest News
          </motion.p>
          <h2 className="h-sec mb-4 text-[color:var(--navy-900)] flex flex-wrap justify-center items-center gap-x-3 overflow-hidden">
            <motion.span
              initial={{ x: -150, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="inline-block"
            >
              Stay updated with the
            </motion.span>
            <motion.span
              initial={{ x: 150, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="inline-block text-[color:var(--teal-600)]"
            >
              latest insights
            </motion.span>
          </h2>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="text-lg text-[color:var(--grey-600)]"
          >
            {LEADER.name} — {LEADER.role}
            <span className="block text-base text-[color:var(--grey-500)]">
              Oman Observer columnist
            </span>
          </motion.div>
        </div>

        <FeatureSteps
          features={features}
          autoPlayInterval={6000}
          imageHeight="h-[420px] md:h-[500px]"
        />

        <div className="mt-10 text-center">
          <a
            href={NEWS_VIEW_ALL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark"
          >
            View all articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
