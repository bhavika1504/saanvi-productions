import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Users, Award, Star, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useMemo, useState } from 'react';

// Data (same as before) - keep externally if you prefer
const workshops = [
  {
    id: '1',
    title: 'Method Acting Masterclass',
    subtitle: 'Learn from Bollywood Veterans',
    date: '2024-02-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Saanvi Studios, Mumbai',
    description:
      'Dive deep into method acting techniques with industry professionals. Learn emotional preparation, character development, and scene analysis through hands-on practice.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
    category: 'Workshop',
    level: 'Intermediate',
    duration: '6 hours',
    participants: '25 max',
    price: '₹2,999',
    originalPrice: '₹3,999',
    highlights: ['Certificate of Completion', 'Industry Networking', 'Portfolio Review', 'Live Performance'],
    instructor: 'Rajesh Sharma (20+ years experience)',
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '2',
    title: 'Camera Acting Workshop',
    subtitle: 'Master On-Screen Presence',
    date: '2024-02-20',
    time: '2:00 PM - 6:00 PM',
    location: 'Film City, Goregaon',
    description:
      'Learn the nuances of acting for camera vs stage. Understand angles, expressions, and how to work with directors and crew in a professional setup.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
    category: 'Workshop',
    level: 'Beginner',
    duration: '4 hours',
    participants: '20 max',
    price: '₹1,999',
    originalPrice: '₹2,499',
    highlights: ['Live Camera Practice', 'Scene Recording', 'Instant Feedback', 'Director Interaction'],
    instructor: 'Priya Mehta (TV & Film Director)',
    rating: 4.8,
    reviews: 89,
  },
  {
    id: '3',
    title: 'Kids Acting Bootcamp',
    subtitle: 'Fun Learning for Young Stars',
    date: '2024-03-01',
    time: '11:00 AM - 3:00 PM',
    location: 'Saanvi Academy, Andheri',
    description:
      'Specially designed workshop for children aged 5-14. Focus on confidence building, expression, and having fun while learning the basics of acting.',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
    category: 'Workshop',
    level: 'Kids Special',
    duration: '4 hours',
    participants: '15 max',
    price: '₹1,499',
    originalPrice: '₹1,999',
    highlights: ['Parent Participation', 'Games & Activities', 'Performance Video', 'Fun Certificates'],
    instructor: 'Sneha Kapoor (Child Psychology Expert)',
    rating: 5.0,
    reviews: 67,
  },
];

const talentHunts = [
  {
    id: '4',
    title: 'Mega Talent Hunt 2024',
    subtitle: 'Your Gateway to Stardom',
    date: '2024-03-10',
    time: '9:00 AM - 6:00 PM',
    location: 'Multiple Venues, Mumbai',
    description:
      'The biggest talent discovery event of the year. Open for all ages and categories. Industry scouts, directors, and casting agents will be present to discover new talent.',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
    category: 'Talent Hunt',
    level: 'All Levels',
    duration: 'Full Day',
    participants: 'Unlimited',
    price: 'Free Entry',
    highlights: ['Industry Networking', 'Instant Callbacks', 'Media Coverage', 'Professional Photos'],
    prizes: ['₹50,000 Cash Prize', 'Film Contract', 'Portfolio Shoot', 'Mentorship Program'],
    rating: 4.7,
    reviews: 234,
  },
  {
    id: '5',
    title: 'Digital Content Creator Hunt',
    subtitle: 'For the Social Media Generation',
    date: '2024-03-15',
    time: '1:00 PM - 5:00 PM',
    location: 'Online + Studio',
    description:
      'Discover talent for web series, YouTube content, and digital platforms. Perfect for the new age of entertainment and social media influencers.',
    image:
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=500&fit=crop&crop=center&auto=format&q=80',
    category: 'Talent Hunt',
    level: 'All Levels',
    duration: '4 hours',
    participants: '100 max',
    price: 'Free Entry',
    highlights: ['Live Streaming', 'Social Media Boost', 'Collaboration Offers', 'Content Strategy'],
    prizes: ['Content Creation Deal', '1 Year Mentorship', 'Equipment Sponsorship', 'Brand Partnerships'],
    rating: 4.6,
    reviews: 178,
  },
];

const allEvents = [...workshops, ...talentHunts];

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'all' | 'workshops' | 'talent-hunts'>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [previewEvent, setPreviewEvent] = useState<any | null>(null);

  const getFilteredEvents = () => {
    switch (activeTab) {
      case 'workshops':
        return workshops;
      case 'talent-hunts':
        return talentHunts;
      default:
        return allEvents;
    }
  };

  const topEvents = useMemo(() => {
    return [...allEvents].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-IN', { month: 'short' }),
      year: date.getFullYear(),
    };
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Talent Hunt':
        return 'bg-gradient-to-r from-cta/20 to-cta/10 text-cta border-cta/30';
      case 'Workshop':
        return 'bg-gradient-to-r from-accent/20 to-accent/10 text-accent border-accent/30';
      default:
        return 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/30';
    }
  };

  return (
    <section id="events" ref={sectionRef} className="py-20 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">Best Events</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">Top rated events handpicked for you — quick glance and fast actions.</p>
        </motion.div>

        {/* Best Events Strip (horizontal scroll) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-4 overflow-x-auto pb-4 mb-8 -mx-4 px-4"
        >
          {topEvents.map((ev) => (
            <div key={ev.id} className="min-w-[230px] bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden shadow-sm">
              <div className="relative h-28">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-[10px] font-semibold rounded-full border ${getCategoryStyle(ev.category)}`}>
                    {ev.category}
                  </span>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => setPreviewEvent(ev)} aria-label={`View ${ev.title}`} className="bg-black/60 hover:bg-black/70 rounded-full p-2">
                    <Eye className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold line-clamp-2">{ev.title}</h4>
                  <div className="text-xs font-bold text-primary">{ev.rating} ★</div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ev.subtitle}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex bg-card/50 backdrop-blur-sm rounded-2xl p-1 border border-border/50">
            {[
              { key: 'all', label: 'All Events', icon: Calendar },
              { key: 'workshops', label: 'Workshops', icon: Award },
              { key: 'talent-hunts', label: 'Talent Hunts', icon: Star },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-cta text-cta-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Compact Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {getFilteredEvents().map((event, index) => {
            const dateInfo = formatDate(event.date);
            const isWorkshop = event.category === 'Workshop';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.03 + index * 0.03 }}
                className="group"
                onMouseEnter={() => setHoveredCard(event.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-lg overflow-hidden border border-border/50 hover:shadow-lg transition-transform duration-200">
                  {/* compact header */}
                  <div className="relative h-28 flex-shrink-0">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 text-[11px] font-semibold rounded-full border ${getCategoryStyle(event.category)}`}>
                        {event.category}
                      </span>
                    </div>

                    <div className="absolute top-2 right-2 flex gap-2">
                      <button onClick={() => setPreviewEvent(event)} aria-label={`View ${event.title}`} className="bg-black/60 hover:bg-black/70 rounded-full p-2">
                        <Eye className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    <div className="absolute bottom-2 right-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-bold text-white ${event.price === 'Free Entry' ? 'bg-green-500' : 'bg-cta'}`}>
                        {event.price}
                      </div>
                    </div>
                  </div>

                  {/* compact body */}
                  <div className="p-3 text-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-foreground line-clamp-2">{event.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{event.subtitle}</p>
                      </div>
                      <div className="text-xs text-primary font-bold">{event.rating} ★</div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cta" />
                        <span className="truncate">{event.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-primary" />
                        <span className="truncate">{event.participants}</span>
                      </div>
                      <div className="flex items-center gap-1 col-span-2">
                        <MapPin className="w-3 h-3 text-accent" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button className="flex-1 text-xs py-2 rounded-md">{isWorkshop ? 'Register' : 'Join Hunt'}</Button>
                      <button onClick={() => setPreviewEvent(event)} aria-label={`Quick view ${event.title}`} className="px-3 py-2 rounded-md border border-border/50 text-xs bg-card/70">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal / Quick View */}
      {previewEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPreviewEvent(null)} />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.18 }} className="relative max-w-3xl w-full bg-card/90 backdrop-blur-md rounded-xl border border-border/60 overflow-hidden">
            <div className="relative h-44">
              <img src={previewEvent.image} alt={previewEvent.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3">
                <button onClick={() => setPreviewEvent(null)} className="bg-black/60 rounded-full p-2">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-black font-bold">{previewEvent.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{previewEvent.subtitle} • {previewEvent.instructor || previewEvent.level}</p>
                </div>
                <div className="text-sm font-bold text-primary">{previewEvent.rating} ★</div>
              </div>

              <p className="text-sm text-muted-foreground mt-3">{previewEvent.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <div className="text-black text-muted-foreground">Date</div>
                    <div className="font-medium text-black">{previewEvent.date} • {previewEvent.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <div>
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="font-medium text-black">{previewEvent.location}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Button className="px-6 py-2">{previewEvent.price === 'Free Entry' ? 'Reserve Spot' : `Book · ${previewEvent.price}`}</Button>
                <Button className="px-6 py-2 variant-ghost" onClick={() => setPreviewEvent(null)}>Close</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
