import { APP_LOGO } from "@/const";
import { Facebook, Mail, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "YouTube - Deep Focus Sphere",
      url: "https://www.youtube.com/@deepfocussphere67",
      icon: Youtube,
    },
    {
      name: "YouTube - Chillout Sphere",
      url: "https://www.youtube.com/@ChilloutSphere67",
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
              <img src={APP_LOGO} alt="Sphere Music Hub" className="h-10 w-10" />
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Sphere Music Hub
              </span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Your space for focus, relaxation, and study music. Curated ambient soundscapes for every moment.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
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
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
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
                href="mailto:contact@spheremusichub.com"
                className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors text-sm group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>
              © {currentYear} Sphere Music Hub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
