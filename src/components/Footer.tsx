import { Film, Instagram, Facebook, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/saanvifilms', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/saanvifilms', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/saanvifilms', label: 'YouTube' },
];

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Events', href: '#events' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Support Center', href: '#support' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black relative">
      <div className="section-container">
        {/* Main Footer Content - Ultra Compact */}
        <div className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Brand Section */}
            <div className="col-span-2 md:col-span-1">
              <a
                href="#"
                className="flex items-center gap-2 mb-3 group w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-cta to-cta/80 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Film className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-display text-base font-bold text-white group-hover:text-cta transition-colors duration-300">
                    Saanvi Films
                  </span>
                  <span className="block text-xs text-accent font-medium tracking-wider uppercase">
                    & Production
                  </span>
                </div>
              </a>
              
              <p className="text-gray-400 max-w-xs leading-relaxed mb-3 text-xs">
                Discovering and nurturing new talent across films, ads, and digital entertainment.
              </p>

              {/* Ultra Compact Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-cta text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
                      aria-label={social.label}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-2 text-sm">
                Quick Links
              </h4>
              <ul className="space-y-1">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-xs footer-link"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-2 text-sm">
                Legal
              </h4>
              <ul className="space-y-1">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-xs footer-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-2 text-sm">
                Contact
              </h4>
              <div className="space-y-1">
                <a href="tel:+919909210605" className="flex items-center gap-1.5 text-gray-400 hover:text-cta transition-colors duration-300 text-xs group">
                  <Phone className="w-3 h-3" />
                  <span>+91 99092 10605</span>
                </a>
                <a href="mailto:info@saanvifilms.com" className="flex items-center gap-1.5 text-gray-400 hover:text-cta transition-colors duration-300 text-xs group">
                  <Mail className="w-3 h-3" />
                  <span>info@saanvifilms.com</span>
                </a>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <MapPin className="w-3 h-3" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ultra Compact Bottom Bar - Centered Copyright */}
        <div className="py-3 border-t border-white/10">
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} Saanvi Films & Production. All rights reserved.
          </p> 
        </div>
      </div>
    </footer>
  );
} 