import { Link } from "wouter";
import { Search, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Auskunft<span className="text-indigo-400">.de</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Das modernste Branchenportal Deutschlands. Finden Sie lokale Unternehmen, lesen Sie echte Bewertungen und buchen Sie direkt.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Top Branchen */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Top Branchen</h4>
            <ul className="space-y-2.5">
              {["Restaurants", "Handwerker", "Ärzte", "Rechtsanwälte", "Beauty & Wellness", "Immobilien", "Shopping"].map((item) => (
                <li key={item}>
                  <Link href={`/suche?was=${item}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Städte */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Top Städte</h4>
            <ul className="space-y-2.5">
              {["Berlin", "München", "Hamburg", "Köln", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig"].map((city) => (
                <li key={city}>
                  <Link href={`/suche?wo=${city}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Für Unternehmen */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Für Unternehmen</h4>
            <ul className="space-y-2.5 mb-6">
              {[
                "Kostenlos eintragen",
                "Premium-Profil",
                "Werbemöglichkeiten",
                "Bewertungen verwalten",
                "Analytics & Insights",
                "API für Entwickler",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-2">Kontakt</p>
              <a href="mailto:info@auskunft.de" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white mb-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                info@auskunft.de
              </a>
              <a href="tel:+4930123456" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white">
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                +49 30 123 456
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2025 Auskunft.de GmbH. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            {["Impressum", "Datenschutz", "AGB", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
