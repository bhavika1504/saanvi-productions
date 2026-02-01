import { Film, Instagram, Facebook, Mail, Phone, MapPin, ArrowRight, Clapperboard } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/saanvifilmandproduction/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/people/saanviproduction/61586511233227/', label: 'Facebook' },
];

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Events', href: '#events' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black relative pt-12">
      <div className="section-container pb-8">
        {/* Main Footer Content */}
        <div className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="space-y-6">
              <a
                href="#"
                className="flex items-center gap-2 group w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-cta to-cta/80 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-display text-xl font-bold text-white group-hover:text-cta transition-colors duration-300">
                    Saanvi Films
                  </span>
                  <span className="block text-xs text-accent font-medium tracking-wider uppercase">
                    & Production
                  </span>
                </div>
              </a>

              <p className="text-gray-400 leading-relaxed text-sm">
                Discovering and nurturing new talent across films, ads, and digital entertainment. Your journey to stardom begins here.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-cta text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/5 hover:border-cta"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:pl-8">
              <h4 className="font-display text-lg font-bold text-white mb-6">
                Explore
              </h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-cta transition-all duration-300 text-sm flex items-center group"
                    >
                      <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 mr-0 group-hover:mr-2 text-cta">
                        —
                      </span>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-display text-lg font-bold text-white mb-6">
                Connect
              </h4>
              <div className="space-y-4">
                <a href="tel:+919904024100" className="flex items-start gap-3 text-gray-400 hover:text-cta transition-all duration-300 text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cta/10 transition-colors mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[10px] uppercase font-bold mb-0.5 tracking-wider">Call Us</span>
                    <span className="font-medium">+91 99040 24100</span>
                  </div>
                </a>
                <a href="mailto:saanviproductionhelp@gmail.com" className="flex items-start gap-3 text-gray-400 hover:text-cta transition-all duration-300 text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cta/10 transition-colors mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[10px] uppercase font-bold mb-0.5 tracking-wider">Email Us</span>
                    <span className="font-medium break-all">saanviproductionhelp@gmail.com</span>
                  </div>
                </a>
                <div className="flex items-start gap-3 text-gray-400 text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-[10px] uppercase font-bold mb-0.5 tracking-wider">Location</span>
                    <span className="font-medium">Ahmedabad, Gujarat</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Creative Opportunity Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-cta/50 transition-colors duration-500">
                {/* Background Decor */}
                <div className="absolute -right-6 -bottom-6 text-cta/5 group-hover:text-cta/10 transition-colors duration-500 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all">
                  <Clapperboard size={120} />
                </div>

                <h4 className="text-white font-display text-lg font-bold mb-3 relative z-10 leading-tight">
                  Turn Your <span className="text-cta italic">Dreams</span> into <br className="hidden sm:block" /> Real <span className="text-cta">Opportunities</span>
                </h4>

                <p className="text-gray-400 text-xs mb-6 relative z-10 leading-relaxed uppercase tracking-wider font-medium">
                  Fresh Faces • Models • Actors
                </p>

                <button
                  onClick={() => scrollToSection('#contact')}
                  className="group/btn relative flex items-center gap-2 px-6 py-3 bg-cta text-white text-xs font-bold rounded-xl overflow-hidden shadow-lg shadow-cta/20 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <span className="relative z-10 uppercase tracking-widest">Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-500 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors">
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}