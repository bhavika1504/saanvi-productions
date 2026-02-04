import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const GHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const companyName = "SAANVI PRODUCTIONS";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="ghero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero Section - Saanvi Productions"
      role="banner"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Saanvi Films and Production - Professional film production studio and casting agency in Ahmedabad, Gujarat"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" /> {/* Dark overlay for readability */}
      </div>
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-orb-float"
          style={{
            background: 'radial-gradient(circle, hsl(210 30% 70% / 0.15), transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full animate-orb-float"
          style={{
            background: 'radial-gradient(circle, hsl(200 50% 50% / 0.1), transparent 60%)',
            filter: 'blur(50px)',
            animationDelay: '-5s',
          }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full animate-orb-float"
          style={{
            background: 'radial-gradient(circle, hsl(210 40% 80% / 0.1), transparent 60%)',
            filter: 'blur(40px)',
            animationDelay: '-10s',
          }}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Tagline */}
        <p
          className={`font-body text-sm md:text-base tracking-cinematic uppercase text-gold mb-8 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          role="doc-subtitle"
        >
          Premium Film Production & Acting Academy
        </p>

        {/* Company Name with Letter Animation */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 overflow-hidden">
          <span className="sr-only">{companyName}</span>
          <span aria-hidden="true" className="flex flex-wrap justify-center gap-x-2 md:gap-x-4">
            {companyName.split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="flex">
                {word.split('').map((letter, letterIndex) => (
                  <span
                    key={letterIndex}
                    className="inline-block text-cta-gradient"
                    style={{
                      opacity: isLoaded ? 1 : 0,
                      transform: isLoaded
                        ? 'translateY(0) rotateX(0deg)'
                        : 'translateY(50px) rotateX(-90deg)',
                      transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1)`,
                      transitionDelay: `${(wordIndex * word.length + letterIndex) * 50 + 400}ms`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`font-body text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light tracking-wide-elegant text-white text-shadow-premium transition-all duration-1000 delay-[1200ms] ${isLoaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
            }`}
        >
          Where Stories Come to Life
        </p>

        {/* Decorative Line */}
        <div
          className={`mx-auto mt-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-1000 delay-[1500ms] ${isLoaded ? 'w-48 opacity-100' : 'w-0 opacity-0'
            }`}
        />
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToServices}
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground hover:text-gold transition-all duration-500 cursor-pointer group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        style={{ transitionDelay: '1800ms' }}
        aria-label="Scroll to services"
      >
        <span className="font-body text-xs tracking-cinematic uppercase">
          Discover Our World
        </span>
        <ChevronDown
          className="w-6 h-6 animate-bounce-subtle group-hover:text-gold transition-colors"
        />
      </button>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l border-t border-gold/20" />
      <div className="absolute top-8 right-8 w-24 h-24 border-r border-t border-gold/20" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-l border-b border-gold/20" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r border-b border-gold/20" />
    </section>
  );
};

export default GHero;
