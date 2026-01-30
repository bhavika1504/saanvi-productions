import { motion, useInView } from 'framer-motion';
import { Film, Tv, Video, GraduationCap, Camera, Clapperboard, MonitorPlay, Star, Mic } from 'lucide-react';
import { useRef } from 'react';

// Service list with IDs for deep linking
const services = [
  {
    id: "movie-shoot",
    icon: Film,
    title: 'Movie Shoot',
    description: 'Feature films that captivate audiences',
    color: 'cta',
  },
  {
    id: "ads-shoot",
    icon: Tv,
    title: 'Ads Shoot',
    description: 'Commercial excellence that drives results',
    color: 'accent',
  },
  {
    id: "brand-shoot",
    icon: Camera,
    title: 'Brand Shoot',
    description: 'Visual stories that build identities',
    color: 'cta',
  },
  {
    id: "web-series-shoot",
    icon: MonitorPlay,
    title: 'Web Series Shoot',
    description: 'Episodic content for digital platforms',
    color: 'accent',
  },
  {
    id: "short-movie-shoot",
    icon: Clapperboard,
    title: 'Short Movie Shoot',
    description: 'Impactful narratives in compact form',
    color: 'cta',
  },
  {
    id: "grooming-classes",
    icon: Star,
    title: 'Grooming Classes',
    description: 'Personal presence and confidence building',
    color: 'accent',
  },
  {
    id: "acting-classes",
    icon: Mic, // Or a better icon if available
    title: 'Acting Classes',
    description: 'Professional training for aspiring artists',
    color: 'cta',
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isOrange = service.color === 'cta';

            return (
              <motion.div
                key={service.title}
                id={service.id} // Added ID for scrolling
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                  ease: 'easeOut',
                }}
                className="group scroll-mt-24" // Added scroll margin for navbar offset
              >
                <div className="h-full film-frame rounded-xl p-6 relative overflow-hidden">
                  {/* Inner frame line */}
                  <div className="absolute inset-3 border border-dashed border-amber-800/20 rounded-lg pointer-events-none" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 ${isOrange
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
