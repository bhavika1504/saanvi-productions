import { motion, useInView } from 'framer-motion';
import { Film, Tv, Video, GraduationCap } from 'lucide-react';
import { useRef } from 'react';

const services = [
  {
    icon: Film,
    title: 'Films & Movies',
    description:
      'Get cast in feature films, short films, and regional cinema projects. We connect fresh talent with renowned directors.',
    color: 'cta',
  },
  {
    icon: Tv,
    title: 'Advertisements & Brand Shoots',
    description:
      'Appear in TV commercials, digital ads, and brand campaigns. Perfect platform for beginners to gain exposure.',
    color: 'accent',
  },
  {
    icon: Video,
    title: 'Web Series',
    description:
      'Star in OTT platform content, web series, and digital entertainment. The future of entertainment awaits.',
    color: 'cta',
  },
  {
    icon: GraduationCap,
    title: 'Acting & Grooming Classes',
    description:
      'Learn from industry professionals. Our workshops cover acting techniques, camera presence, and personal branding.',
    color: 'accent',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-secondary/50 relative overflow-hidden">
      {/* Subtle background gradient - no animation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cta/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="section-container relative">
        {/* Section header with slow fade animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-cta bg-cta/10 rounded-full mb-4">
            🎬 What We Do
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Your Gateway to{' '}
            <span className="text-cta">Entertainment</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive opportunities for aspiring artists to showcase
            their talent across multiple entertainment platforms.
          </p>
        </motion.div>

        {/* Services grid - film frame styled cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isOrange = service.color === 'cta';

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.15,
                  ease: 'easeOut',
                }}
                className="group"
              >
                <div className="h-full film-frame rounded-xl p-6 relative overflow-hidden">
                  {/* Inner frame line */}
                  <div className="absolute inset-3 border border-dashed border-amber-800/20 rounded-lg pointer-events-none" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 ${
                        isOrange
                          ? 'bg-cta/10 text-cta group-hover:bg-cta group-hover:text-cta-foreground'
                          : 'bg-accent/20 text-accent-foreground group-hover:bg-accent'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Film frame number - like frame count on film */}
                  <div className="absolute bottom-2 right-3 text-xs font-mono text-amber-800/40">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
