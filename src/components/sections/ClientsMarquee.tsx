'use client';

import { motion } from 'framer-motion';

const ClientsMarquee = () => {
  const clients = [
    { name: 'Ministry of Commerce', initials: 'MOC' },
    { name: 'Ahlibank', initials: 'AB' },
    { name: 'Petroleum Development Oman', initials: 'PDO' },
    { name: 'Special Economic Zone Authority', initials: 'SEZA' },
    { name: 'Al Fairuz', initials: 'AF' },
    { name: 'Riyadha', initials: 'RY' },
    { name: 'Royal Academy of Management', initials: 'RAM' },
    { name: 'EDGO', initials: 'EDGO' },
    { name: 'Al Haditha Petroleum', initials: 'AHP' },
    { name: 'The Zubair Corporation', initials: 'ZC' },
    { name: 'Al Roya', initials: 'AR' },
    { name: 'Seeh Al Sarya', initials: 'SAS' },
  ];

  // Duplicate for seamless loop
  const displayClients = [...clients, ...clients];

  return (
    <section className="py-20 md:py-24 bg-gradient-to-r from-primary-900 to-primary-900/90">
      <div className="container-max">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="text-accent-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Trusted Partners
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Clients</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Leading government agencies and corporations across Oman partner with SIG for strategic advisory and investment promotion.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{ x: [0, -2000] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear' as any,
            }}
          >
            {displayClients.map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="flex-shrink-0 w-48 h-24 bg-white/10 backdrop-blur border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <p className="text-white font-bold text-sm text-center px-4 line-clamp-2">{client.name}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary-900 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary-900 to-transparent pointer-events-none" />
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-white/70 mb-4">
            Join leading organizations transforming their investment strategies with SIG
          </p>
          <button className="px-8 py-3 bg-accent-600 text-white rounded-lg font-semibold hover:bg-accent-500 transition-colors">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientsMarquee;
