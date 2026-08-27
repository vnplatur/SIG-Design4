'use client';

import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TEAM = [
  {
    name: 'Dr. Yousuf bin Hamed Al Balushi',
    title: 'Founder & Managing Director',
    bio: "PhD in Economics, King's College London. Former Chief Economist, Oman Vision 2040 Taskforce. FDI adviser to IMF & IFC. 25+ years experience.",
    image: 'https://www.omaninvestgateway.com/wp-content/uploads/2026/01/Dr.Yousef-298x300.png',
    linkedin: 'https://www.omanobserver.om/author/1678/dr-yousuf-bin-hamed-al-balushi',
  },
  {
    name: 'Muaiyad Mohammed Al-Busaidi',
    title: 'Chief Executive Officer',
    bio: 'Expert strategist in business and geo-economic affairs. Specialises in FDI, international economics, and global market dynamics.',
    image: 'https://www.omaninvestgateway.com/wp-content/uploads/2025/12/Busaidi300x300.png',
    linkedin: 'https://www.omaninvestgateway.com/our-team/',
  },
  {
    name: 'Al-Yaqadhan Al-Shukaili',
    title: 'R&D and Business Developer',
    bio: 'Logistics Engineer and Lean Six Sigma practitioner. Worked with ASYAD, DHL, and DSV. Represents SIG at high-level economic events.',
    image: 'https://www.omaninvestgateway.com/wp-content/uploads/2025/12/Al-Yaqadan1.png',
    linkedin: 'https://www.omaninvestgateway.com/our-team/',
  },
  {
    name: 'Prashant Soni',
    title: 'Business Analyst',
    bio: 'Specialist in macroeconomic research, data analysis, and investment intelligence reporting. Skilled in SQL, Power BI, and Excel.',
    image: 'https://www.omaninvestgateway.com/wp-content/uploads/2025/12/Prashant-1-298x300.png',
    linkedin: 'https://www.omaninvestgateway.com/our-team/',
  },
  {
    name: 'Hussam Daqamsih',
    title: 'Economic Researcher & Data Analyst',
    bio: 'Delivers data-driven economic insights through macro and microeconomic research, advanced data analysis, and stakeholder reporting.',
    image: 'https://www.omaninvestgateway.com/wp-content/uploads/2026/01/Hussam1-298x300.png',
    linkedin: 'https://www.omaninvestgateway.com/our-team/',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
};

export default function Leadership() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} id="leadership" className="bg-white py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(20,184,166,0.03)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)] relative z-10">
        {/* Section header - Exactly matches Workshops style */}
        <div className="mx-auto mb-16 max-w-3xl text-center overflow-hidden">
          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="eyebrow mb-3 text-[color:var(--teal-600)]"
          >
            Our People
          </motion.p>
          <h2 className="h-sec mb-5 text-[color:var(--navy-900)] flex flex-wrap justify-center items-center gap-x-3 overflow-hidden">
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
              className="inline-block text-[color:var(--teal-600)]"
            >
              Leadership
            </motion.span>
          </h2>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="text-lg text-[color:var(--grey-600)]"
          >
            A multidisciplinary team combining sector expertise, financial analysis, and market research to drive investment outcomes in Oman.
          </motion.p>
        </div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative h-[380px] bg-white border border-slate-100 shadow-md hover:border-[color:var(--teal-500)]/30 hover:shadow-2xl hover:shadow-teal-500/10 rounded-2xl overflow-hidden flex flex-col justify-between p-6 transition-[border-color,box-shadow] duration-300 ease-out text-center"
            >
              {/* Decorative mesh profile backing */}
              <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[color:var(--teal-500)]/5 via-transparent to-[color:var(--teal-500)]/3 pointer-events-none" />

              {/* Avatar Circle in normal flex flow */}
              <div className="relative z-10 w-28 h-28 rounded-full border border-slate-200 overflow-hidden flex items-center justify-center bg-slate-100 shadow-inner transition-all duration-500 group-hover:border-[color:var(--teal-500)]/40 mx-auto shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card info text wrapper */}
              <div className="relative z-10 flex-1 flex flex-col justify-center mt-4">
                <h3 className="text-sm font-bold text-[color:var(--navy-900)] group-hover:text-[color:var(--teal-600)] transition-colors mb-1 leading-snug">
                  {member.name}
                </h3>
                <p className="text-xs text-[color:var(--teal-600)] font-semibold tracking-wider uppercase mb-3">
                  {member.title}
                </p>
                
                {/* Subtle Bio */}
                <p className="text-[11px] text-[color:var(--grey-500)] leading-relaxed h-14 overflow-hidden opacity-90 group-hover:opacity-100 transition-all duration-300">
                  {member.bio}
                </p>
              </div>

              {/* View Profile area with hover button slide-up (zero height/space at rest) */}
              <div className="h-0 opacity-0 group-hover:h-10 group-hover:opacity-100 mt-0 group-hover:mt-3 pt-0 group-hover:pt-3 border-t border-transparent group-hover:border-slate-100/60 transition-all duration-300 ease-out relative flex items-center justify-center overflow-hidden shrink-0">
                <div className="flex items-center justify-center w-full h-full">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[color:var(--teal-500)] text-white hover:bg-[color:var(--teal-600)] text-xs font-bold rounded-full transition-colors duration-300 shadow-sm shadow-teal-500/20"
                  >
                    View Profile
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Full-card link overlay - only active on mobile/touch screens */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-20 md:hidden"
                aria-label={`View ${member.name} profile`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
