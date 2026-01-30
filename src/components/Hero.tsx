import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Sparkles, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';
import { useRef } from 'react';

const floatingStars = [
  { x: '15%', y: '25%', delay: 0, size: 16 },
  { x: '80%', y: '20%', delay: 0.5, size: 20 },
  { x: '70%', y: '65%', delay: 1, size: 14 },
  { x: '25%', y: '70%', delay: 1.5, size: 18 },
  { x: '90%', y: '80%', delay: 2, size: 12 },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={heroBg}
          alt="Cinematic film production"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 cinematic-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-primary/80" />
      </motion.div>

      {/* Film grain effect */}
      <div className="absolute inset-0 film-grain pointer-events-none" />

      {/* Animated floating stars */}
      {floatingStars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute text-cta/60 pointer-events-none"
          style={{ left: star.x, top: star.y }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Star className="fill-current" style={{ width: star.size, height: star.size }} />
        </motion.div>
      ))}

      {/* Animated light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-1/2 left-1/4 w-[500px] h-[1000px] bg-gradient-to-b from-cta/20 to-transparent rotate-12 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute -top-1/2 right-1/3 w-[400px] h-[800px] bg-gradient-to-b from-accent/20 to-transparent -rotate-12 blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div className="relative z-10 section-container py-32" style={{ opacity }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge with bounce */}
         

          {/* Headline with letter animation */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Auditions{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.4, type: 'spring', bounce: 0.6 }}
              className="text-cta relative inline-block"
            >
              Open
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-2 left-0 w-full h-1 bg-cta rounded-full origin-left"
              />
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-2xl sm:text-3xl md:text-4xl text-primary-foreground/90 mb-6"
          >
            Start Your Journey in Entertainment
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Step into movies, advertisements, and web series.
            <br className="hidden sm:block" />
            We welcome kids, men, and women aged 1–40.{' '}
            <motion.span 
              className="text-accent font-medium inline-block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              No experience required.
            </motion.span>
          </motion.p>

          {/* CTAs with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => scrollToSection('casting')}
                size="lg"
                className="bg-cta hover:bg-cta/90 text-cta-foreground text-lg px-8 py-6 rounded-xl cta-glow animate-pulse-glow group relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => scrollToSection('events')}
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                </motion.div>
                Join Workshops
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats with staggered counter animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '500+', label: 'Talents Discovered' },
              { value: '50+', label: 'Productions' },
              { value: '10+', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.15, type: 'spring', bounce: 0.5 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center cursor-default"
              >
                <motion.div
                  className="font-display text-3xl sm:text-4xl font-bold text-cta mb-1"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2 cursor-pointer"
          whileHover={{ scale: 1.2, borderColor: 'hsl(25 95% 53% / 0.5)' }}
          onClick={() => scrollToSection('services')}
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-cta"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
