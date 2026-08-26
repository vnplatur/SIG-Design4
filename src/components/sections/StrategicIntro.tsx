'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionLabel, Tilt, Counter } from '@/components/ui/primitives';

const StrategicIntro = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section ref={ref} className="py-24 md:py-36 bg-white relative overflow-hidden">
      {/* Drifting Background Glow Spotlights */}
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -60, 70, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -right-48 -top-48 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.06)_0%,transparent_75%)] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 80, -40, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -left-48 -bottom-48 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_75%)] pointer-events-none"
      />

      {/* Decorative grid pattern backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,20,40,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,20,40,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="shell relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Left Column - Main Statement */}
          <motion.div variants={itemVariants} className="relative">
            {/* Decorative line */}
            <motion.div
              className="absolute -left-8 top-0 h-24 w-1 bg-gradient-to-b from-[color:var(--teal-500)] to-transparent"
              initial={{ height: 0 }}
              animate={inView ? { height: 96 } : { height: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <div className="mb-3">
              <motion.p
                initial={{ x: -100, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="eyebrow text-[color:var(--teal-600)]"
              >
                What We Do
              </motion.p>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight flex flex-wrap items-center gap-x-3 overflow-hidden">
              <motion.span
                initial={{ x: -150, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="inline-block"
              >
                We Turn Strategy Into
              </motion.span>
              <motion.span
                initial={{ x: 150, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="inline-block text-[color:var(--teal-600)]"
              >
                Impact
              </motion.span>
            </h2>

            <motion.p
              initial={{ x: 100, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8"
            >
              SIG connects strategy, research, investment intelligence, and execution across government and private sector partnerships. We deliver economic advisory, feasibility studies, FDI support, and executive training to organizations seeking measurable transformation.
            </motion.p>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-slate-200">
              <motion.div variants={itemVariants}>
                <p className="text-3xl font-bold text-[color:var(--teal-600)]">
                  <Counter to={5} suffix="+" />
                </p>
                <p className="text-sm text-slate-500 font-medium">Years of Excellence</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <p className="text-3xl font-bold text-[color:var(--teal-600)]">
                  <Counter to={100} suffix="+" />
                </p>
                <p className="text-sm text-slate-500 font-medium">Successful Projects</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Brand Video Card Player with Glare Tilt Mockup */}
          <motion.div variants={itemVariants} className="w-full">
            <Tilt max={5} glare={true} className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(20,184,166,0.1)] transition-all duration-500 group">
              <div className="p-3 border border-slate-200/80 bg-white/40 backdrop-blur-xs rounded-2xl h-full flex flex-col justify-center relative">
                {/* Floating shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 shadow-inner">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1280&auto=format&fit=crop"
                  >
                    <source
                      src="https://www.omaninvestgateway.com/wp-content/uploads/2021/04/video-4.mp4"
                      type="video/mp4"
                    />
                  </video>
                  {/* Frosted Play HUD overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors duration-500">
                    <div className="w-16 h-16 rounded-full bg-white/80 hover:bg-white backdrop-blur-md flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 pointer-events-none">
                      <svg className="w-6 h-6 text-teal-600 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StrategicIntro;
