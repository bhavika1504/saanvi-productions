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
    <section id="about" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
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
              🎥 Who We Are
            </span>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
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

            {/* Film strip divider */}
            <div className="my-8 film-strip-divider rounded-full opacity-60" />

            {/* Mission statement - simplified */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 bg-primary/5 border-l-4 border-cta rounded-r-xl"
            >
              <p className="text-foreground italic font-medium">
                "Our mission is simple: to give every aspiring artist a fair chance to
                showcase their talent and make their dreams come true."
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                — Team Saanvi Films
              </p>
            </motion.div>
          </motion.div>

          {/* Stats Grid - simplified, no bouncing */}
          <div className="grid grid-cols-2 gap-6">
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
                  className="group"
                >
                  <div className="bg-card rounded-2xl p-6 border border-border h-full transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-500 ${index % 2 === 0
                          ? 'bg-cta/10 text-cta group-hover:bg-cta group-hover:text-cta-foreground'
                          : 'bg-accent/20 text-accent-foreground group-hover:bg-accent'
                        }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="font-display text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
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
