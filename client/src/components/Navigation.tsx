import { APP_LOGO } from "@/const";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { detectLanguage } from "@/lib/i18n";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme, switchable } = useTheme();
  const lang = detectLanguage();

  // Handle scroll to hash on page load (for cross-page navigation)
  useEffect(() => {
    if (location === "/") {
      const targetHash = sessionStorage.getItem('scrollToHash');
      if (targetHash) {
        sessionStorage.removeItem('scrollToHash');
        // Wait for page to fully render
        setTimeout(() => {
          const element = document.querySelector(targetHash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    }
  }, [location]);

  const navLinks = [
    { href: "/", label: lang === 'de' ? "Startseite" : "Home" },
    { href: "/#music-channels", label: lang === 'de' ? "Kanäle" : "Channels" },
    { href: "/blog", label: "Blog" },
    { href: "/#about", label: lang === 'de' ? "Über uns" : "About" },
    { href: "/#contact", label: "Kontakt" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle hash links (/#about, /#contact, etc.)
    if (href.startsWith("/#")) {
      e.preventDefault();
      const hash = href.substring(1); // Remove leading / to get #about
      
      if (location === "/") {
        // Already on homepage, just scroll
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsMenuOpen(false);
        }
      } else {
        // Store hash in sessionStorage and navigate to homepage
        sessionStorage.setItem('scrollToHash', hash);
        window.location.href = "/";
      }
    }
    // Handle home link - scroll to top if already on homepage
    else if (href === "/" && location === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMenuOpen(false);
    }
    // For other internal routes, let wouter handle it
    else {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={APP_LOGO} alt="Sphere Music Hub logo - YouTube music channels for focus, chillout, and ambient soundscapes" className="h-10 w-10 md:h-12 md:w-12" />
            <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sphere Music Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Theme Toggle */}
            {switchable && toggleTheme && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-foreground/80 hover:text-primary"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
            {/* Nav Links */}
            <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              // Use Link component for all routes, but add click handler
              return (
                <Link key={link.href} href={link.href.startsWith('/#') ? '/' : link.href}>
                  <a
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium cursor-pointer"
                  >
                    {link.label}
                  </a>
                </Link>
              );
            })}
            </div>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {switchable && toggleTheme && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-foreground/80 hover:text-primary"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                return (
                  <Link key={link.href} href={link.href.startsWith('/#') ? '/' : link.href}>
                    <a
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-foreground/80 hover:text-primary transition-colors font-medium py-2 cursor-pointer block"
                    >
                      {link.label}
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
