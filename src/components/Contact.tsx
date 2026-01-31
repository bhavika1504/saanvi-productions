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
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    highlight: true,
  },
  {
    icon: Instagram,
    studioIcon: Camera,
    label: 'Instagram',
    value: '@saanviproduction',
    href: 'https://instagram.com/saanviproduction',
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
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-cta bg-cta/10 rounded-full mb-4">
            🎬 Direct Casting Line
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Let's <span className="text-cta">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your journey? Fill out the form below and our casting directors will get in touch.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Info & Hours */}
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
                  Casting Office Hours
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

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="bg-black rounded-3xl p-8 border border-border/50 shadow-xl relative overflow-hidden"
          >
            {/* Design accents */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-cta/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />

            <form onSubmit={handleSubmit} className="space-y-6 relative ">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-foreground text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-cta" /> Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="bg-background border-border focus:border-cta focus:ring-cta h-12"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cta" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="bg-background border-border focus:border-cta focus:ring-cta h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-foreground text-white flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cta" /> Contact No
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="bg-background border-border focus:border-cta focus:ring-cta h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-semibold text-foreground text-white flex items-center gap-2">
                  <Mic className="w-4 h-4 text-cta" /> Your Message / Query
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about yourself or your query..."
                  className="bg-background border-border focus:border-cta focus:ring-cta min-h-[120px] pt-4"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cta hover:bg-cta/90 text-white h-14 text-lg font-bold rounded-xl cta-glow transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending Clip...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                By clicking Send, you agree to our contact terms and casting guidelines.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
