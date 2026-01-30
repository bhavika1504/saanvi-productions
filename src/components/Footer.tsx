import { Film, Instagram, Facebook, Youtube, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/saanvifilms', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/saanvifilms', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/saanvifilms', label: 'YouTube' },
];

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Events', href: '#events' },
  { label: 'Apply Now', href: '#casting' },
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
    <footer className="bg-primary py-16">
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="flex items-center gap-3 mb-6"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Film className="w-10 h-10 text-cta" />
              <div>
                <span className="font-display text-xl font-bold text-primary-foreground">
                  Saanvi Films
                </span>
                <span className="block text-xs text-accent font-medium tracking-widest uppercase">
                  & Production
                </span>
              </div>
            </a>
            <p className="text-primary-foreground/70 max-w-md leading-relaxed mb-6">
              Dedicated to discovering and nurturing new talent. We create real
              opportunities in films, ads, and digital entertainment for aspiring
              artists across India.
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
                    className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-cta text-primary-foreground hover:text-cta-foreground flex items-center justify-center transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/70 hover:text-cta transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.slice(4).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/70 hover:text-cta transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-cta transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-cta transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} Saanvi Films & Production. All rights
              reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-cta fill-cta" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
