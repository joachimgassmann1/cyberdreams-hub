import { APP_LOGO } from "@/const";
import { Facebook, Mail, Youtube } from "lucide-react";
import SocialShare from "./SocialShare";
import { detectLanguage } from "@/lib/i18n";
import { resetCookieConsent } from "./CookieBanner";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const lang = detectLanguage();

  const socialLinks = [
    {
      name: "YouTube - Deep Focus Sphere",
      url: "https://www.youtube.com/@deepfocussphere67",
      icon: Youtube,
    },
    {
      name: "YouTube - Chillout Sphere",
      url: "https://www.youtube.com/@chilloutsphere67",
      icon: Youtube,
    },
    {
      name: "Facebook",
      url: "https://facebook.com/profile.php?id=61580223927048",
      icon: Facebook,
    },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={APP_LOGO} alt="Sphere Music Hub logo - YouTube music channels for focus, chillout, and ambient soundscapes" className="h-10 w-10" />
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Sphere Music Hub
              </span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              {lang === 'de'
                ? 'Dein Raum für Fokus, Entspannung und Lernmusik. Kuratierte Ambient-Soundscapes für jeden Moment.'
                : 'Your space for focus, relaxation, and study music. Curated ambient soundscapes for every moment.'}
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">{lang === 'de' ? 'Schnelllinks' : 'Quick Links'}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#channels"
                  onClick={(e) => scrollToSection(e, "#channels")}
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  Channels
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, "#about")}
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@deepfocussphere67/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  All Videos
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">{lang === 'de' ? 'Verbinde dich mit uns' : 'Connect With Us'}</h3>
            <div className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors text-sm group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
              <a
                href="mailto:info@sphere-music-hub.com"
                className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors text-sm group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{lang === 'de' ? 'E-Mail an uns' : 'Email Us'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="pt-8 border-t border-border">
          <div className="flex justify-center">
            <SocialShare 
              title="Sphere Music Hub - Focus, Chill & Ambient Music"
              description="Discover curated ambient soundscapes, focus music, and relaxing beats for work, study, and relaxation."
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>
              © {currentYear} Sphere Music Hub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/impressum" className="hover:text-primary transition-colors">
                Impressum
              </a>
              <a href="/datenschutz" className="hover:text-primary transition-colors">
                Datenschutz
              </a>
              <button
                onClick={resetCookieConsent}
                className="hover:text-primary transition-colors"
              >
                {lang === 'de' ? 'Cookie-Einstellungen' : 'Cookie Settings'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
