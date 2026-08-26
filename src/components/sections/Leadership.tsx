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
    linkedin: '#',
  },
  {
    name: 'Al-Yaqadhan Al-Shukaili',
    title: 'R&D and Business Developer',
    bio: 'Logistics Engineer and Lean Six Sigma practitioner. Worked with ASYAD, DHL, and DSV. Represents SIG at high-level economic events.',
    image: 'https://www.omaninvestgateway.com/wp-content/uploads/2025/12/Al-Yaqadan1.png',
    linkedin: '#',
  },
  {
    name: 'Prashant Soni',
    title: 'Business Analyst',
    bio: 'Specialist in macroeconomic research, data analysis, and investment intelligence reporting. Skilled in SQL, Power BI, and Excel.',
    image: 'https://www.omaninvestgateway.com/wp-content/uploads/2025/12/Prashant-1-298x300.png',
    linkedin: '#',
  },
  {
    name: 'Hussam Daqamsih',
    title: 'Economic Researcher & Data Analyst',
    bio: 'Delivers data-driven economic insights through macro and microeconomic research, advanced data analysis, and stakeholder reporting.',
    image: 'https://www.omaninvestgateway.com/wp-content/uploads/2026/01/Hussam1-298x300.png',
    linkedin: '#',
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
              className="group relative rounded-2xl overflow-hidden bg-slate-50/60 border border-slate-100/80 hover:bg-white hover:border-[color:var(--teal-500)]/30 hover:shadow-[0_12px_32px_-4px_rgba(15,23,42,0.08)] transition-all duration-300"
            >
              {/* Photo Area with aspect-square to fit headshots perfectly */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Modern Fade Overlay */}
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-10">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <p className="text-xs text-slate-200 leading-relaxed line-clamp-5 mb-4">{member.bio}</p>
                    {member.linkedin !== '#' && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        View Profile
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-5">
                <div className="w-8 h-0.5 bg-[color:var(--teal-400)] mb-3 transition-all duration-300 group-hover:w-12" />
                <h3 className="text-sm font-bold text-[color:var(--navy-900)] leading-snug group-hover:text-[color:var(--teal-600)] transition-colors duration-300">{member.name}</h3>
                <p className="mt-1 text-xs text-[color:var(--teal-600)] font-semibold uppercase tracking-wider">{member.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
