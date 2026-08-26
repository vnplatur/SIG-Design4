'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tilt } from '@/components/ui/primitives';

const CountUp = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      const animation = animate(count, value, { duration });
      return () => animation.stop();
    }
  }, [inView, value, duration, count]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  return <span ref={ref}>{displayValue}</span>;
};

const Statistics = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    {
      label: 'Partnered with Global Institutions',
      value: 5,
      suffix: '+',
    },
    {
      label: 'Feasibility & Pre-Feasibility Studies',
      value: 40,
      suffix: '+',
    },
    {
      label: 'Advisory Engagements',
      value: 50,
      suffix: '+',
    },
    {
      label: 'Senior Officers Trained',
      value: 300,
      suffix: '+',
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(100deg, var(--navy-900) 0%, var(--navy-900) 55%, var(--teal-600) 100%)' }}>
      
      {/* Dynamic drifting background glow */}
      <motion.div 
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-accent-500/10 blur-[120px] pointer-events-none"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none"
        animate={{
          x: [0, -60, 60, 0],
          y: [0, 60, -60, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Background grid decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/20 to-transparent" />
      </div>

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto overflow-hidden">
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-accent-300 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Proven Track Record
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex flex-wrap justify-center items-center gap-x-3 overflow-hidden">
            <motion.span
              initial={{ x: -150, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="inline-block"
            >
              Why Choose
            </motion.span>
            <motion.span
              initial={{ x: 150, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="inline-block text-accent-300"
            >
              SIG?
            </motion.span>
          </h2>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="text-white/80 text-lg"
          >
            Our experience across government, finance, and private sector advisory demonstrates the impact we create.
          </motion.p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group h-full flex flex-col"
            >
              <Tilt
                className="h-full w-full rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xs transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-[0_15px_40px_-15px_rgba(20,184,166,0.15)] overflow-hidden"
                max={10}
              >
                {/* Content */}
                <div className="relative p-8 text-center h-full flex flex-col justify-between min-h-[220px]">
                  {/* Progress line above */}
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-accent-300 to-transparent"
                    initial={{ width: 0 }}
                    animate={inView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                  />

                  {/* Number */}
                  <div className="mb-4">
                    <p className="text-5xl md:text-6xl font-bold text-white mb-2">
                      <CountUp value={stat.value} duration={2.5} />
                      <span className="text-accent-300">{stat.suffix}</span>
                    </p>
                  </div>

                  {/* Label */}
                  <p className="text-white/80 font-medium text-base leading-relaxed flex-grow">
                    {stat.label}
                  </p>

                  {/* Decorative dot */}
                  <motion.div
                    className="mt-6 flex justify-center"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: idx * 0.1 + 0.5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-300" />
                  </motion.div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 pt-16 border-t border-white/20 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-white/80 mb-6 text-lg">
            Ready to transform your investment strategy?
          </p>
          <motion.button 
            whileHover={{ scale: 1.04, backgroundColor: 'var(--teal-300)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white text-primary-900 rounded-lg font-semibold transition-colors duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(20,184,166,0.3)]"
          >
            Schedule a Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
