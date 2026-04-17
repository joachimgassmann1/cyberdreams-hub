import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Crown, Zap, BarChart3, Star, Shield, Users, TrendingUp, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const plans = [
  {
    name: "Basis",
    price: "Kostenlos",
    priceNote: "für immer",
    color: "slate",
    features: [
      "Grundeintrag mit Adresse & Telefon",
      "1 Foto",
      "Kategorieeintrag",
      "Kundenbewertungen empfangen",
      "Basis-Statistiken",
    ],
    cta: "Kostenlos starten",
    popular: false,
  },
  {
    name: "Professional",
    price: "€29",
    priceNote: "pro Monat",
    color: "indigo",
    features: [
      "Alles aus Basis",
      "Bis zu 20 Fotos & Videos",
      "Öffnungszeiten & Beschreibung",
      "Online-Reservierung",
      "Hervorgehobene Platzierung",
      "Detaillierte Analytics",
      "Verifiziertes Badge",
      "Antworten auf Bewertungen",
    ],
    cta: "14 Tage kostenlos testen",
    popular: true,
  },
  {
    name: "Premium",
    price: "€79",
    priceNote: "pro Monat",
    color: "violet",
    features: [
      "Alles aus Professional",
      "Top-Platzierung in Suchergebnissen",
      "Speisekarte / Leistungsübersicht",
      "Direktbuchung & Terminverwaltung",
      "Premium-Badge",
      "Dedizierter Account Manager",
      "API-Zugang",
      "Werbeanzeigen in der Region",
    ],
    cta: "Jetzt Premium werden",
    popular: false,
  },
];

const benefits = [
  { icon: <Users className="w-6 h-6" />, title: "2,1 Mio. Nutzer/Monat", desc: "Erreichen Sie täglich tausende potenzielle Kunden in Ihrer Region." },
  { icon: <Star className="w-6 h-6" />, title: "Echte Bewertungen", desc: "Bauen Sie Vertrauen auf mit verifizierten Kundenbewertungen." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Detaillierte Analytics", desc: "Verstehen Sie, wie Kunden Ihr Profil finden und nutzen." },
  { icon: <Shield className="w-6 h-6" />, title: "Verifiziertes Profil", desc: "Das Verifiziert-Badge signalisiert Seriosität und Vertrauen." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Bessere Sichtbarkeit", desc: "Premium-Profile erscheinen weiter oben in den Suchergebnissen." },
  { icon: <Zap className="w-6 h-6" />, title: "Schnelle Einrichtung", desc: "In weniger als 5 Minuten online – kostenlos und ohne Kreditkarte." },
];

export default function Eintragen() {
  const [formData, setFormData] = useState({ name: "", category: "", phone: "", email: "", city: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Vielen Dank! Wir melden uns in Kürze bei Ihnen.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <Crown className="w-4 h-4 text-amber-300" />
              <span className="text-white text-sm font-medium">Für Unternehmen & Selbstständige</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Ihr Unternehmen auf<br />Auskunft.de
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8">
              Tragen Sie Ihr Unternehmen kostenlos ein und erreichen Sie täglich tausende potenzielle Kunden.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#eintragen" className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
                Jetzt kostenlos eintragen
              </a>
              <a href="#preise" className="bg-white/10 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors">
                Preise ansehen
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="section-divider mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Warum Auskunft.de?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="preise" className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-10">
            <div className="section-divider mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Transparente Preise
            </h2>
            <p className="text-slate-500 mt-1">Starten Sie kostenlos, upgraden Sie wenn Sie wachsen</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white rounded-2xl border shadow-sm p-6 ${
                  plan.popular ? "border-indigo-400 shadow-indigo-100 shadow-lg ring-2 ring-indigo-400" : "border-slate-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge-verified px-4 py-1">Beliebteste Wahl</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-extrabold text-slate-900 text-xl mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                    <span className="text-slate-500 text-sm">/{plan.priceNote}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => toast.info("Registrierung kommt bald!")}
                  className={`w-full font-bold py-3 rounded-xl transition-colors ${
                    plan.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick registration form */}
      <section id="eintragen" className="py-16 bg-white">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <div className="section-divider mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Jetzt kostenlos eintragen
            </h2>
            <p className="text-slate-500 mt-1">In weniger als 5 Minuten online</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Unternehmensname *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Muster GmbH"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Branche *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                >
                  <option value="">Bitte wählen...</option>
                  <option>Restaurants</option>
                  <option>Handwerker</option>
                  <option>Ärzte</option>
                  <option>Rechtsanwälte</option>
                  <option>Beauty & Wellness</option>
                  <option>Immobilien</option>
                  <option>Sonstiges</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Telefon *</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+49 30 123 456"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">E-Mail *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@meinunternehmen.de"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Stadt / PLZ *</label>
              <input
                required
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Berlin, 10115"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Kostenlos eintragen
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-slate-400 text-center">
              Mit dem Absenden stimmen Sie unseren AGB und der Datenschutzerklärung zu.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
