import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Clock, ArrowRight, Mic, Camera, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    icon: Phone,
    studioIcon: Mic,
    label: 'Phone Number',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    highlight: true,
  },
  {
    icon: Instagram,
    studioIcon: Camera,
    label: 'Instagram',
    value: '@saanvifilms',
    href: 'https://instagram.com/saanvifilms',
    highlight: true,
  },
  {
    icon: MapPin,
    studioIcon: Video,
    label: 'Office Address',
    value: 'Saanvi Studios, Andheri West, Mumbai - 400053',
    href: 'https://maps.google.com',
  },
  {
    icon: Mail,
    studioIcon: Mail,
    label: 'Email',
    value: 'info@saanvifilms.com',
    href: 'mailto:info@saanvifilms.com',
  },
];

const businessHours = [
  { day: 'Monday - Friday', time: '10:00 AM - 7:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 5:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export function Contact() {
  const scrollToCasting = () => {
    const element = document.getElementById('casting');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary/50 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />

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
            📞 Get in Touch
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Let's <span className="text-cta">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about auditions or workshops? We're here to guide you through
            your next step in entertainment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const StudioIcon = item.studioIcon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                    className={`flex items-start gap-4 p-5 bg-card rounded-xl border transition-all duration-500 group ${item.highlight
                      ? 'border-cta/30 hover:border-cta hover:shadow-lg'
                      : 'border-border hover:shadow-md'
                      }`}
                  >
                    {/* Studio Equipment Styled Icon */}
                    <div className="studio-icon flex-shrink-0">
                      <StudioIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                      <div className="text-sm text-muted-foreground mb-1">
                        {item.label}
                      </div>
                      <div className={`font-medium transition-colors duration-300 ${item.highlight
                        ? 'text-foreground text-lg group-hover:text-cta'
                        : 'text-foreground group-hover:text-cta'
                        }`}>
                        {item.value}
                      </div>
                    </div>
                    {item.highlight && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cta/10 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-cta" />
                      </div>
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="mt-6 p-6 bg-card rounded-xl border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-cta" />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Business Hours
                </h3>
              </div>
              <div className="space-y-2">
                {businessHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="text-foreground font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="bg-primary rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center relative overflow-hidden">
              {/* Subtle background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cta/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

              <div className="relative">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                  Don't wait for your dreams to come true — take the first step today.
                  Apply for our upcoming auditions or join a workshop to hone your
                  skills.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={scrollToCasting}
                    className="bg-cta hover:bg-cta/90 text-cta-foreground cta-glow transition-all duration-300"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cta/40 text-cta hover:bg-cta/10 hover:border-cta transition-all duration-300"
                    onClick={() => {
                      const element = document.getElementById('events');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Workshops
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-primary-foreground/10">
                  <p className="text-primary-foreground/60 text-sm italic">
                    "We're here to guide you through your next step. Every star started
                    somewhere — let's start your story today."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
