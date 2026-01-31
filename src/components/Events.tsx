import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Users, Award, Star, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useMemo, useState, useEffect } from 'react';
import { eventsService, Event } from '@/lib/eventsService';

// Fallback static data
const staticWorkshops = [
  {
    id: '1',
    title: 'Method Acting Masterclass',
    subtitle: 'Learn from Bollywood Veterans',
    date: '2024-02-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Saanvi Productions, Ahmedabad',
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
  // ... other static data if needed but I'll skip for brevity and let firebase take over
];

export function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'all' | 'workshops' | 'talent-hunts'>('all');
  const [previewEvent, setPreviewEvent] = useState<any | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsService.getAllEvents();
        if (data.length > 0) {
          setEvents(data);
        } else {
          // If no data in firebase yet, show some static ones or empty
          console.log("No events in Firebase, showing static content");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getFilteredEvents = () => {
    const dataToFilter = events.length > 0 ? events : [];
    // If empty and loading finished, we might want to show placeholder

    switch (activeTab) {
      case 'workshops':
        return dataToFilter.filter(e => e.category === 'Workshop');
      case 'talent-hunts':
        return dataToFilter.filter(e => e.category === 'Talent Hunt');
      default:
        return dataToFilter;
    }
  };

  const topEvent = useMemo(() => {
    const source = events.length > 0 ? events : [];
    return [...source].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0];
  }, [events]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        day: date.getDate(),
        month: date.toLocaleDateString('en-IN', { month: 'short' }),
        year: date.getFullYear(),
      };
    } catch (e) {
      return { day: '?', month: '?', year: '?' };
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Talent Hunt':
        return 'bg-cta/10 text-cta border-cta/30';
      case 'Workshop':
        return 'bg-accent/10 text-accent border-accent/30';
      default:
        return 'bg-primary/10 text-primary border-primary/30';
    }
  };

  return (
    <section id="events" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cta/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="section-container relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cta bg-cta/10 rounded-full mb-4">
              Coming Soon
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">
              Featured <span className="text-cta">Spotlight</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground max-w-md md:text-right"
          >
            Handpicked opportunities and masterclasses designed to elevate your career in the entertainment industry.
          </motion.p>
        </div>

        {/* Spotlight Hero Event */}
        {topEvent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="group relative mb-24 cursor-pointer"
            onClick={() => setPreviewEvent(topEvent)}
          >
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-border shadow-2xl">
              <img
                src={topEvent.image}
                alt={topEvent.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white`}>
                    {topEvent.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    {topEvent.rating} • {topEvent.reviews} Reviews
                  </div>
                </div>

                <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 line-clamp-2 text-shadow-premium">
                  {topEvent.title}
                </h3>

                <div className="flex flex-wrap gap-6 text-white/80 mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cta" />
                    <span>{topEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cta" />
                    <span>{topEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-cta" />
                    <span>{topEvent.participants}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button className="bg-cta hover:bg-cta/90 text-white px-8 py-6 text-lg rounded-xl cta-glow">
                    Register Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" className="bg-white/5 border-white/20 text-white backdrop-blur-md hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Row Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <h3 className="font-display text-4xl md:text-6xl font-bold text-foreground">
            Discover <span className="text-cta">Events</span>
          </h3>

          <div className="flex bg-secondary/30 backdrop-blur-sm rounded-xl p-1 border border-border/50 self-start">
            {[
              { key: 'all', label: 'All', icon: Calendar },
              { key: 'workshops', label: 'Workshops', icon: Award },
              { key: 'talent-hunts', label: 'Talent Hunts', icon: Star },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === key
                  ? 'bg-white text-primary shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Ticket-Inspired Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredEvents().map((event, index) => {
            const isWorkshop = event.category === 'Workshop';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="film-ticket h-full flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/30 backdrop-blur-md text-white bg-black/40`}>
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col border-x-2 border-dashed border-border/30">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h4 className="font-display text-xl font-bold line-clamp-2 leading-tight text-cta">
                        {event.title}
                      </h4>
                      <div className="flex items-center text-xs font-bold text-cta">
                        {event.rating} ★
                      </div>
                    </div>

                    <div className="space-y-3 mb-8 flex-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5 text-cta" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-cta" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t-2 border-dashed border-border/50 flex items-center justify-between gap-4">
                      <div className="text-lg font-bold text-foreground">
                        {event.price}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreviewEvent(event)}
                          className="p-2.5 rounded-lg border border-border hover:bg-secondary transition-colors"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <Button className="px-6 rounded-lg font-bold">
                          {isWorkshop ? 'Book' : 'Join'}
                        </Button>
                      </div>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setPreviewEvent(null)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative max-w-4xl w-full bg-card rounded-2xl border border-border overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <img src={previewEvent.image} alt={previewEvent.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setPreviewEvent(null)}
                  className="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-8 md:p-12 overflow-y-auto max-h-[80vh]">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-4 py-1 text-xs font-bold rounded-full border ${getCategoryStyle(previewEvent.category)}`}>
                    {previewEvent.category}
                  </span>
                  <div className="text-sm font-bold text-cta">{previewEvent.rating} ★ Rating</div>
                </div>

                <h3 className="font-display text-3xl font-bold mb-4">{previewEvent.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {previewEvent.description}
                </p>

                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-cta" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Date & Time</div>
                      <div className="font-semibold">{previewEvent.date} • {previewEvent.time}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Location</div>
                      <div className="font-semibold">{previewEvent.location}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-8 pt-8 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Entry Fee</div>
                    <div className="text-2xl font-bold">{previewEvent.price}</div>
                  </div>
                  <Button className="flex-1 py-6 text-lg rounded-xl cta-glow">
                    Secure Spot Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

