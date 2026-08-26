'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const headlines = [
    'Activating Strategies.',
    'Accelerating Investment.',
    'Creating Impact.',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-primary-900">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero-poster.jpg"
      >
        <source
          src="https://www.omaninvestgateway.com/wp-content/uploads/2021/04/video-4.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-primary-900/40 to-primary-900/80" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-sm md:text-base font-semibold text-accent-500 tracking-widest uppercase">
              Smart Investment Gateway
            </p>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {headlines.map((headline, idx) => (
              <div key={idx} className="inline">
                {headline}
                {idx < headlines.length - 1 && <br />}
              </div>
            ))}
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Transforming strategy, research, and investment intelligence into measurable impact across government and private sector partnerships.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="#services"
              className="px-8 py-4 bg-accent-600 text-white rounded-lg font-semibold text-lg hover:bg-accent-500 transition-all duration-300 hover:shadow-lg"
            >
              Explore Our Services
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Investment Opportunities
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-white text-sm font-medium">Scroll to explore</p>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
