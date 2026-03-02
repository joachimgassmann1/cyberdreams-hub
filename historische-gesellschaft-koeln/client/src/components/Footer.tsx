/*
 * Footer – Monumentum Design
 * Dunkler Hintergrund, weiße Schrift, CI-Rot für Links
 */
import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Beschreibung */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" fill="#C0392B" rx="2"/>
                  <text x="20" y="26" textAnchor="middle" fill="white" fontSize="14" fontFamily="serif" fontWeight="bold">HG</text>
                </svg>
              </div>
              <div>
                <div
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                  className="text-white font-bold text-base leading-tight"
                >
                  Historische Gesellschaft
                </div>
                <div
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="text-red-400 text-xs font-semibold tracking-widest uppercase"
                >
                  Köln e.V.
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm" style={{ fontFamily: "'Lora', serif" }}>
              Die Historische Gesellschaft Köln e.V. gibt die große wissenschaftliche und 
              allgemeinverständliche Kölner Stadtgeschichte in 13 Bänden heraus.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-red-400" />
                <span>Hohenzollernring 71–73, 50672 Köln</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={14} className="flex-shrink-0 text-red-400" />
                <span>+49 (0) 221 5736110</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={14} className="flex-shrink-0 text-red-400" />
                <a href="mailto:info@historische-gesellschaft-koeln.de" className="hover:text-red-400 transition-colors">
                  info@historische-gesellschaft-koeln.de
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-white text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Die Gesellschaft
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Über uns", href: "/gesellschaft" },
                { label: "Aktuelles", href: "/aktuelles" },
                { label: "Kuratorium", href: "/kuratorium" },
                { label: "Mitglied werden", href: "/mitglied-werden" },
                { label: "Dokumente", href: "/dokumente" },
                { label: "Kontakt", href: "/kontakt" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Buchreihe */}
          <div>
            <h4
              className="text-white text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Buchreihe
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Neuerscheinung", href: "/neuerscheinung" },
                { label: "Alle Bände", href: "/buchreihe" },
                { label: "Autoren", href: "/autoren" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="https://www.greven-verlag.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Greven Verlag Köln ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className="text-xs text-gray-500"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
          >
            © {new Date().getFullYear()} Historische Gesellschaft Köln e.V.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "Impressum", href: "/impressum" },
              { label: "Datenschutz", href: "/datenschutz" },
              { label: "Kontakt", href: "/kontakt" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-gray-500 hover:text-red-400 transition-colors uppercase tracking-wider"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
