import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock events data - will be replaced with Firestore data
const mockEvents = [
  {
    id: '1',
    title: 'Talent Hunt 2024',
    date: '2024-02-15',
    time: '10:00 AM',
    location: 'Mumbai Film City',
    description:
      'Annual talent discovery event for aspiring actors aged 5-35. Industry professionals will scout for fresh faces.',
    category: 'Talent Hunt',
  },
  {
    id: '2',
    title: 'Acting Masterclass',
    date: '2024-02-20',
    time: '2:00 PM',
    location: 'Saanvi Studios, Andheri',
    description:
      'Learn camera techniques, emotional expression, and scene preparation from veteran actors.',
    category: 'Workshop',
  },
  {
    id: '3',
    title: 'Kids Special Workshop',
    date: '2024-03-01',
    time: '11:00 AM',
    location: 'Online + In-Person',
    description:
      'Fun-filled acting workshop designed specifically for children aged 4-12. Parents welcome!',
    category: 'Workshop',
  },
  {
    id: '4',
    title: 'Screen Test Auditions',
    date: '2024-03-10',
    time: '9:00 AM',
    location: 'Studio One, Goregaon',
    description:
      'Open auditions for upcoming web series and ad films. Bring your portfolio and headshots.',
    category: 'Audition',
  },
];

export function Events() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Talent Hunt':
        return 'bg-cta/10 text-cta border-cta/20';
      case 'Workshop':
        return 'bg-accent/20 text-accent-foreground border-accent/30';
      case 'Audition':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="events" className="py-24 bg-background relative">
      {/* Subtle film grain pattern */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-50" />

      <div className="section-container relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-accent-foreground bg-accent/20 rounded-full mb-4">
            🎞️ Upcoming Events
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Workshops & <span className="text-cta">Talent Hunt</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our workshops to learn from industry experts or participate in talent
            hunts to get discovered.
          </p>
        </motion.div>

        {/* Events list - Film Ticket Style */}
        <div className="max-w-4xl mx-auto space-y-6">
          {mockEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="group"
            >
              <div className="film-ticket p-6 relative transition-shadow duration-500 hover:shadow-lg">
                {/* Ticket stub perforation line */}
                <div className="absolute left-24 top-0 bottom-0 w-px border-l-2 border-dashed border-amber-700/20" />

                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Date badge - ticket stub style */}
                  <div className="flex-shrink-0 w-20">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-b from-amber-800 to-amber-900 flex flex-col items-center justify-center text-amber-50 shadow-md">
                      <span className="text-2xl font-bold font-display">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="text-xs uppercase tracking-wider opacity-80">
                        {new Date(event.date).toLocaleDateString('en-IN', {
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Event details */}
                  <div className="flex-grow pl-4 lg:pl-8">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(
                          event.category
                        )}`}
                      >
                        {event.category}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-cta">
                      {event.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-cta" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-accent" />
                        {event.location}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex-shrink-0">
                    <Button
                      className="bg-cta hover:bg-cta/90 text-cta-foreground transition-all duration-300"
                    >
                      Register
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Film ticket serial number */}
                <div className="absolute bottom-2 right-4 text-xs font-mono text-amber-800/30">
                  TKT-{event.id.padStart(4, '0')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-10"
        >
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            View All Events
            <Calendar className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
