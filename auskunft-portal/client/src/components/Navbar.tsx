import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, MapPin, Menu, X, ChevronDown, Star, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { label: "Entdecken", href: "/" },
    { label: "Branchen", href: "/branchen" },
    { label: "Städte", href: "/staedte" },
    { label: "Für Unternehmen", href: "/eintragen" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md group-hover:bg-indigo-700 transition-colors">
              <Search className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Auskunft<span className="text-indigo-600">.de</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location === link.href
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => toast.info("Login kommt bald!")}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Anmelden
            </button>
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
              onClick={() => toast.info("Eintragen kommt bald!")}
            >
              <Building2 className="w-4 h-4 mr-1.5" />
              Eintragen
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button className="text-sm font-medium text-slate-600 text-left px-4 py-2">Anmelden</button>
            <Button size="sm" className="bg-indigo-600 text-white">Jetzt eintragen</Button>
          </div>
        </div>
      )}
    </header>
  );
}
