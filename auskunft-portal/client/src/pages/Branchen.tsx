import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronRight, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/lib/data";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const allBranches = [
  { letter: "A", items: ["Ärzte", "Apotheken", "Anwälte", "Architekten", "Autohäuser", "Augenoptiker"] },
  { letter: "B", items: ["Bäckereien", "Banken", "Beautysalons", "Buchhandlungen", "Bauunternehmen"] },
  { letter: "C", items: ["Cafés", "Catering", "Coiffeure", "Computer & IT"] },
  { letter: "D", items: ["Dentisten", "Designagenturen", "Druckereien"] },
  { letter: "E", items: ["Elektriker", "Energieberater", "Ernährungsberater"] },
  { letter: "F", items: ["Friseure", "Fahrschulen", "Fitnessstudios", "Fotografen", "Floristen"] },
  { letter: "G", items: ["Gaststätten", "Gärtnereien", "Gebäudereinigung", "Gesundheitszentren"] },
  { letter: "H", items: ["Handwerker", "Hotels", "Hundesalons", "Heilpraktiker"] },
  { letter: "I", items: ["Immobilienmakler", "Ingenieure", "IT-Dienstleister"] },
  { letter: "J", items: ["Juweliere", "Juristen"] },
  { letter: "K", items: ["Kfz-Werkstätten", "Kindergärten", "Klempner", "Kosmetikstudios"] },
  { letter: "L", items: ["Logistik", "Lernzentren", "Landschaftsgärtner"] },
  { letter: "M", items: ["Maler", "Massagepraxen", "Möbelhäuser", "Musikschulen"] },
  { letter: "N", items: ["Notare", "Nagelstudios"] },
  { letter: "O", items: ["Optiker", "Orthopäden", "Online-Marketing"] },
  { letter: "P", items: ["Physiotherapeuten", "Pizzerien", "Psychologen", "Pflegedienste"] },
  { letter: "R", items: ["Restaurants", "Rechtsanwälte", "Reinigungen", "Reisebüros"] },
  { letter: "S", items: ["Steuerberater", "Supermärkte", "Schreiner", "Schulen", "Sportvereine"] },
  { letter: "T", items: ["Tierärzte", "Tischlereien", "Taxiunternehmen", "Therapeuten"] },
  { letter: "U", items: ["Umzugsunternehmen", "Unternehmensberater"] },
  { letter: "V", items: ["Versicherungen", "Verlage", "Vermessungsbüros"] },
  { letter: "W", items: ["Wirtschaftsprüfer", "Werbeagenturen", "Wellnesszentren"] },
  { letter: "Z", items: ["Zahnärzte", "Zimmereien", "Zeitarbeit"] },
];

export default function Branchen() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-700 to-violet-700 py-14">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-3"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Alle Branchen
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg"
          >
            Über 500 Branchen – finden Sie genau den Anbieter, den Sie suchen
          </motion.p>
        </div>
      </div>

      <div className="container py-12">
        {/* Top categories */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Top Branchen</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={`/suche?was=${cat.name}`}>
                  <div className="bg-white rounded-2xl p-4 text-center border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all group cursor-pointer">
                    <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                      {cat.icon}
                    </div>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">{cat.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{cat.count.toLocaleString()}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alphabet navigation */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-8 flex flex-wrap gap-1 justify-center">
          {alphabet.map((letter) => {
            const hasEntries = allBranches.some((b) => b.letter === letter);
            return (
              <a
                key={letter}
                href={hasEntries ? `#letter-${letter}` : undefined}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                  hasEntries
                    ? "text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                    : "text-slate-300 cursor-default"
                }`}
              >
                {letter}
              </a>
            );
          })}
        </div>

        {/* A-Z listing */}
        <div className="space-y-8">
          {allBranches.map((group) => (
            <div key={group.letter} id={`letter-${group.letter}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {group.letter}
                </div>
                <div className="h-px flex-1 bg-slate-100" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {group.items.map((item) => (
                  <Link key={item} href={`/suche?was=${item}`}>
                    <div className="flex items-center justify-between bg-white rounded-xl border border-slate-100 px-4 py-3 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group cursor-pointer">
                      <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 transition-colors">{item}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
