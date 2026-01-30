import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock portfolio data - will be replaced with Firestore data
const mockPortfolio = [
  {
    id: '1',
    title: 'Film Shoot - Mumbai',
    category: 'Films',
    imageUrl: '/img1.jpeg',
  },
  {
    id: '2',
    title: 'Ad Campaign',
    category: 'Advertisements',
    imageUrl: '/img2.jpeg',
  },
  {
    id: '3',
    title: 'Behind The Scenes',
    category: 'BTS',
    imageUrl: '/img3.jpeg',
  },
  {
    id: '4',
    title: 'Web Series Production',
    category: 'Web Series',
    imageUrl: '/img4.jpeg',
  },
  {
    id: '5',
    title: 'Workshop Session',
    category: 'Workshops',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
  },
  {
    id: '6',
    title: 'Talent Discovery',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=400&fit=crop',
  },
  {
    id: '7',
    title: 'Movie Premiere',
    category: 'Films',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop',
  },
  {
    id: '8',
    title: 'Commercial Shoot',
    category: 'Advertisements',
    imageUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=600&h=400&fit=crop',
  },
];

export function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<typeof mockPortfolio[0] | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-cta bg-cta/10 rounded-full mb-4">
            Our Work
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Portfolio & <span className="text-cta">Productions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse of our work across films, advertisements, web series, and
            behind-the-scenes moments.
          </p>
        </motion.div>
      </div>

      {/* Film Reel Strip - Full Width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        {/* Navigation buttons */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-amber-900/90 text-amber-50 flex items-center justify-center transition-all duration-300 ${canScrollLeft ? 'opacity-100 hover:bg-amber-800' : 'opacity-30 cursor-not-allowed'
            }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-amber-900/90 text-amber-50 flex items-center justify-center transition-all duration-300 ${canScrollRight ? 'opacity-100 hover:bg-amber-800' : 'opacity-30 cursor-not-allowed'
            }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Film Reel Container */}
        <div
          ref={scrollContainerRef}
          className="film-reel-container"
        >
          <div className="film-reel-strip min-w-max">
            {mockPortfolio.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="film-frame-cell group"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                  <div>
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-cta/80 text-cta-foreground rounded mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-display text-sm font-semibold text-amber-50">
                      {item.title}
                    </h3>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-50/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-amber-50" />
                  </div>
                </div>
                {/* Frame number */}
                <div className="absolute bottom-1 left-2 text-[10px] font-mono text-amber-500/60">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint text */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          ← Scroll or drag to explore →
        </p>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 text-primary-foreground" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-cta/20 text-cta rounded-full mb-2">
                  {selectedImage.category}
                </span>
                <h3 className="font-display text-2xl font-semibold text-primary-foreground">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
