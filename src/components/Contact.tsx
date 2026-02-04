import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Clock, ArrowRight, Mic, Camera, Video, User, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { submissionsService } from '@/lib/submissionsService';

const contactInfo = [
  {
    icon: Phone,
    studioIcon: Mic,
    label: 'Phone Number',
    value: '+91 9904024100',
    href: 'tel:+919904024100',
    highlight: true,
  },
  {
    icon: Instagram,
    studioIcon: Camera,
    label: 'Instagram',
    value: '@saanvifilmandproduction',
    href: 'https://www.instagram.com/saanvifilmandproduction/',
    highlight: true,
  },
  {
    icon: MapPin,
    studioIcon: Video,
    label: 'Office Address',
    value: 'Saanvi Productions, B-2/802/8th floor, West Gate Business Bay, SG Highway, Nr.Croma, Makarba, Ahmedabad, Gujarat',
    href: 'https://maps.google.com',
  },
  {
    icon: Mail,
    studioIcon: Mail,
    label: 'Email',
    value: 'saanviproductionhelp@gmail.com',
    href: 'mailto:saanviproductionhelp@gmail.com',
  },
];

const businessHours = [
  { day: 'Monday - Friday', time: '10:00 AM - 7:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 5:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submissionsService.addSubmission(formData);
      toast.success("Message sent! Our casting directors will review your profile.");
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary/50 relative overflow-hidden"
      aria-label="Contact Us Section"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* Subtle background */}
      <div className="absolute bottom-0 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-cta/5 rounded-full blur-3xl" />

      <div className="section-container relative px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-cta bg-cta/10 rounded-full mb-3 sm:mb-4">
            🎬 Direct Casting Line
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Let's <span className="text-cta">Connect</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Ready to start your journey? Fill out the form below and our casting directors will get in touch.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Left Side: Contact Info & Hours */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            aria-label="Contact Information"
          >
            <address className="space-y-3 sm:space-y-4 not-italic" itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Saanvi Films & Production" />
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
                    className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card rounded-xl border transition-all duration-500 group ${item.highlight
                      ? 'border-cta/30 hover:border-cta hover:shadow-lg'
                      : 'border-border hover:shadow-md'
                      }`}
                    aria-label={`${item.label}: ${item.value}`}
                    itemProp={item.label === 'Phone Number' ? 'telephone' : item.label === 'Email' ? 'email' : undefined}
                  >
                    {/* Studio Equipment Styled Icon */}
                    <div className="studio-icon flex-shrink-0">
                      <StudioIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1">
                        {item.label}
                      </div>
                      <div className={`font-medium transition-colors duration-300 break-words ${item.highlight
                        ? 'text-foreground text-base sm:text-lg group-hover:text-cta'
                        : 'text-foreground text-sm sm:text-base group-hover:text-cta'
                        }`}>
                        {item.value}
                      </div>
                    </div>
                    {item.highlight && (
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cta/10 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-cta" />
                      </div>
                    )}
                  </motion.a>
                );
              })}
            </address>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className="mt-4 sm:mt-6 p-4 sm:p-6 bg-card rounded-xl border border-border"
              aria-label="Business Hours"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-cta" />
                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                  Casting Office Hours
                </h3>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                {businessHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between text-xs sm:text-sm gap-2"
                  >
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="text-foreground font-medium whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="bg-black rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-border/50 shadow-xl relative overflow-hidden"
          >
            {/* Design accents */}
            <div className="absolute -top-12 -right-12 w-24 sm:w-32 h-24 sm:h-32 bg-cta/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-24 sm:w-32 h-24 sm:h-32 bg-accent/5 rounded-full blur-2xl" />

            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5 md:space-y-6 relative"
              aria-label="Contact Form"
              itemScope
              itemType="https://schema.org/ContactAction"
            >
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="name" className="text-xs sm:text-sm font-semibold text-foreground text-white flex items-center gap-1.5 sm:gap-2">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cta" /> Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="bg-background border-border focus:border-cta focus:ring-cta h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                  required
                  aria-required="true"
                  autoComplete="name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="email" className="text-xs sm:text-sm font-semibold text-foreground text-white flex items-center gap-1.5 sm:gap-2">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cta" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="bg-background border-border focus:border-cta focus:ring-cta h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                    required
                    aria-required="true"
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="phone" className="text-xs sm:text-sm font-semibold text-foreground text-white flex items-center gap-1.5 sm:gap-2">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cta" /> Contact No
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 99040 24100"
                    className="bg-background border-border focus:border-cta focus:ring-cta h-10 sm:h-11 md:h-12 text-sm sm:text-base"
                    required
                    aria-required="true"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="message" className="text-xs sm:text-sm font-semibold text-foreground text-white flex items-center gap-1.5 sm:gap-2">
                  <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cta" /> Your Message / Query
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about yourself or your query..."
                  className="bg-background border-border focus:border-cta focus:ring-cta min-h-[100px] sm:min-h-[110px] md:min-h-[120px] pt-3 sm:pt-4 text-sm sm:text-base"
                  required
                  aria-required="true"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cta hover:bg-cta/90 text-white h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg font-bold rounded-lg sm:rounded-xl cta-glow transition-all duration-300"
                aria-label={isSubmitting ? "Sending message..." : "Send Message"}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-3 sm:mt-4 px-2">
                By clicking Send, you agree to our contact terms and casting guidelines.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

