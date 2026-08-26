'use client';

import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionLabel } from '@/components/ui/primitives';

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
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Leadership() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 md:py-36 bg-[color:var(--navy-950)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(20,184,166,0.07)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SectionLabel index="06" tone="dark">Our People</SectionLabel>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            <span className="block">
              <span className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ x: -60, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  Our
                </motion.span>
              </span>{' '}
              <span className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block text-[color:var(--teal-400)]"
                  initial={{ x: 60, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Leadership
                </motion.span>
              </span>
            </span>
          </h2>
          <motion.p
            className="mt-4 max-w-xl text-slate-400 text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A multidisciplinary team combining sector expertise, financial analysis, and market research to drive investment outcomes in Oman.
          </motion.p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-teal-500/40 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(20,184,166,0.12)]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-800">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-950)] via-[color:var(--navy-950)]/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">{member.bio}</p>
                  {member.linkedin !== '#' && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      View Profile
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="w-8 h-0.5 bg-[color:var(--teal-400)] mb-3 transition-all duration-500 group-hover:w-12" />
                <h3 className="text-sm font-semibold text-white leading-snug">{member.name}</h3>
                <p className="mt-1 text-xs text-teal-400 font-medium">{member.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
