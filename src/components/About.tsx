import { motion, useInView } from 'framer-motion';
import { Star, Heart, Users, Award } from 'lucide-react';
import { useRef } from 'react';

const stats = [
  { icon: Users, value: '500+', label: 'Talents Discovered' },
  { icon: Star, value: '50+', label: 'Successful Projects' },
  { icon: Award, value: '10+', label: 'Years Experience' },
  { icon: Heart, value: '100%', label: 'Passion & Dedication' },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-background relative overflow-hidden"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* Subtle static background - no animation */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cta/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-accent-foreground bg-accent/20 rounded-full mb-4">
              Who We Are
            </span>

            <h2
              id="about-heading"
              className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6"
              itemProp="headline"
            >
              Nurturing Dreams,
              <br />
              <span className="text-cta">Creating Stars</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Saanvi Films & Production</strong> is
                dedicated to discovering and nurturing new talent across India. We believe
                that everyone has a star within them, waiting to shine on the big screen.
              </p>
              <p>
                With over a decade of experience in the entertainment industry, we've
                helped hundreds of aspiring artists take their first steps into films,
                advertisements, and web series. Our team of industry veterans provides
                personalized guidance and real opportunities.
              </p>
              <p>
                We create genuine pathways for aspiring artists in films, advertisements,
                and digital entertainment. From kids to adults, beginners to seasoned
                performers — everyone deserves a chance to follow their dreams.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid - clean professional design */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                    ease: 'easeOut',
                  }}
                  className="group relative"
                >
                  <div className="bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-border/50 h-full transition-all duration-300 hover:border-cta/30 hover:bg-card">
                    {/* Icon in top right corner */}
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                      <Icon className="w-8 h-8 text-cta" />
                    </div>

                    {/* Value and label */}
                    <div className="relative">
                      <div className="font-display text-4xl font-bold text-foreground mb-1.5 tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-muted-foreground leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
