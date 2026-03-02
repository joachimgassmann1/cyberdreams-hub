/*
 * Navigation – Monumentum Design
 * Sticky-Header, transparent → weiß beim Scrollen
 * Montserrat, Uppercase, CI-Rot als Akzent
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Search, ChevronDown } from "lucide-react";

const navItems = [
  {
    label: "Die Gesellschaft",
    href: "/gesellschaft",
    children: [
      { label: "Aktuelles", href: "/aktuelles" },
      { label: "Kontakt", href: "/kontakt" },
      { label: "Kuratorium", href: "/kuratorium" },
      { label: "Mitglied werden", href: "/mitglied-werden" },
      { label: "Dokumente", href: "/dokumente" },
    ]
  },
  {
    label: "Neuerscheinung",
    href: "/neuerscheinung",
  },
  {
    label: "Buchreihe",
    href: "/buchreihe",
    children: [
      { label: "Band 1: Köln in röm. Zeit", href: "/band/koeln-in-roemischer-zeit" },
      { label: "Band 2: 400–1100", href: "/band/koeln-im-fruehmittelalter" },
      { label: "Band 3: 1074/75–1288", href: "/band/koeln-im-hochmittelalter" },
      { label: "Band 4: 1288–1512/13", href: "/band/koeln-im-spaetmittelalter" },
      { label: "Band 5: 1512/13–1610", href: "/band/koeln-im-zeitalter-der-reformation" },
      { label: "Band 6: 1610–1686", href: "/band/koeln-im-eisernen-zeitalter" },
      { label: "Band 7: 1686–1794", href: "/band/koeln-im-ancien-regime" },
      { label: "Band 8: 1794–1815", href: "/band/koeln-von-der-franzoesischen-zur-preussischen-herrschaft" },
      { label: "Band 9: 1815–1871", href: "/band/koeln-in-preussischer-zeit" },
      { label: "Band 10: 1871–1918", href: "/band/koeln-im-kaiserreich" },
      { label: "Band 11: 1918–1933", href: "/band/koeln-in-der-weimarer-republik" },
      { label: "Band 12: 1933–1945", href: "/band/koeln-in-der-zeit-des-nationalsozialismus" },
    ]
  },
  {
    label: "Autoren",
    href: "/autoren",
  }
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm shadow-sm"
      }`}
    >
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex-shrink-0">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" fill="#C0392B" rx="2"/>
                <text x="20" y="26" textAnchor="middle" fill="white" fontSize="14" fontFamily="serif" fontWeight="bold">HG</text>
              </svg>
            </div>
            <div>
              <div
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                className="text-base font-bold text-gray-900 leading-tight group-hover:text-red-700 transition-colors"
              >
                Historische Gesellschaft
              </div>
              <div
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-xs font-semibold tracking-widest text-red-700 uppercase"
              >
                Köln
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`nav-link flex items-center gap-1 py-2 ${
                    location === item.href || location.startsWith(item.href + "/")
                      ? "text-red-700 active"
                      : ""
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown size={12} className="opacity-60" />}
                </Link>

                {item.children && openDropdown === item.href && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-100 py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-red-700 hover:bg-gray-50 transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/suche" className="p-2 text-gray-500 hover:text-red-700 transition-colors">
              <Search size={18} />
            </Link>
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="container py-4">
            {navItems.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="block py-3 text-sm font-semibold tracking-widest uppercase text-gray-800 hover:text-red-700 transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                      className="p-2 text-gray-500"
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${openDropdown === item.href ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
                {item.children && openDropdown === item.href && (
                  <div className="pl-4 border-l-2 border-red-200 mb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-xs text-gray-600 hover:text-red-700 transition-colors uppercase tracking-wider"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
