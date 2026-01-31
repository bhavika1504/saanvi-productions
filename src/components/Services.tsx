import { motion, useInView } from 'framer-motion';
import { Film, Tv, Camera, MonitorPlay, Clapperboard, Star, Mic, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { CastingFormModal} from './CastingFormModal';
// Service list with more natural descriptions
const services = [
  {
    id: "movie-shoot",
    icon: Film,
    title: 'Movie Productions',
    description: 'Full-length feature films with professional crews and equipment. From concept to screen, we handle every aspect of movie production.',
    color: 'cta',
    image: '/MovieProductions.jpg',
    details: ['Script Development', 'Location Scouting', 'Professional Cast & Crew'],
  },
  {
    id: "ads-shoot",
    icon: Tv,
    title: 'Commercial Advertising',
    description: 'High-impact commercials that tell your brand story. We create memorable ads that connect with audiences and drive business results.',
    color: 'accent',
    image: '/Advertisement.jpg',
    details: ['Brand Consultation', 'Creative Concepts', 'Multi-Channel Distribution'],
  },
  {
    id: "brand-shoot",
    icon: Camera,
    title: 'Brand Photography',
    description: 'Professional photography that captures your brand essence. From product shots to lifestyle imagery, we create visuals that speak.',
    color: 'cta',
    image: '/Brandphoto.png',
    details: ['Product Photography', 'Lifestyle Shoots', 'Brand Guidelines'],
  },
  {
    id: "web-series-shoot",
    icon: MonitorPlay,
    title: 'Web Series',
    description: 'Engaging episodic content designed for digital platforms. We help bring your series concept to life with compelling storytelling.',
    color: 'accent',
    image: '/WebSeries.jpg',
    details: ['Series Planning', 'Episode Production', 'Platform Optimization'],
  },
  {
    id: "short-movie-shoot",
    icon: Clapperboard,
    title: 'Short Films',
    description: 'Powerful storytelling in compact format. Perfect for festivals, social media, or showcasing creative concepts with maximum impact.',
    color: 'cta',
    image: '/ShortFilms.png',
    details: ['Concept Development', 'Festival Submissions', 'Creative Direction'],
  },
  {
    id: "grooming-classes",
    icon: Star,
    title: 'Personal Grooming',
    description: 'Professional grooming and styling sessions. Learn how to present yourself confidently on camera and in auditions.',
    color: 'accent',
    image: '/PersonalGrooming.jpg',
    details: ['Style Consultation', 'Camera Presence', 'Professional Etiquette'],
  },
  {
    id: "acting-classes",
    icon: Mic,
    title: 'Acting Workshop',
    description: 'Comprehensive acting training from industry professionals. Develop your skills through practical exercises and real-world experience.',
    color: 'cta',
    image: '/ActingWorkShops.jpeg',
    details: ['Method Acting', 'Scene Work', 'Audition Techniques'],
  },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const handleApply = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="services" ref={sectionRef} className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background relative">
        {/* Subtle background elements */}
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-accent/8 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cta/6 rounded-full blur-2xl" />

        <div className="section-container relative">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cta bg-cta/10 rounded-full mb-6 border border-cta/20">
              What We Do
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Your Gateway to{' '}
              <span className="text-cta">Entertainment</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive opportunities for aspiring artists to showcase
              their talent across multiple entertainment platforms.
            </p>
          </motion.div>

          {/* Services grid with more natural layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isOrange = service.color === 'cta';

              return (
                <motion.div
                  key={service.title}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                  className="group scroll-mt-24"
                >
                  <div className="bg-card rounded-lg overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      
                      {/* Service number */}
                      <div className="absolute top-3 right-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                          isOrange ? 'bg-cta' : 'bg-accent'
                        }`}>
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Icon and title */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isOrange ? 'bg-cta/10 text-cta' : 'bg-accent/10 text-accent'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-display text-xl font-semibold text-foreground">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* Details list */}
                      {/* <div className="space-y-1 mb-6">
                        {service.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className={`w-1 h-1 rounded-full ${
                              isOrange ? 'bg-cta' : 'bg-accent'
                            }`} />
                            {detail}
                          </div>
                        ))}
                      </div> */}

                      {/* Apply button */}
                      <button
                        onClick={() => handleApply(service.title)}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                          isOrange
                            ? 'bg-cta/10 text-cta hover:bg-cta hover:text-white border border-cta/20 hover:border-cta'
                            : 'bg-accent/10 text-accent hover:bg-accent hover:text-white border border-accent/20 hover:border-accent'
                        }`}
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Casting Form Modal */}
      <CastingFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
      />
    </>
  );
}