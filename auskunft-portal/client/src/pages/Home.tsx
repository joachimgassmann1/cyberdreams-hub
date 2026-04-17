import { Link } from "wouter";
import { ArrowRight, Star, Shield, TrendingUp, Users, CheckCircle2, ChevronRight, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import BusinessCard from "@/components/BusinessCard";
import StarRating from "@/components/StarRating";
import { categories, featuredBusinesses, recentReviews, stats } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[580px] flex items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/100777620/iNpFAWmmdxoGCdRVQVkPGq/hero-main-coArensdq66Dussp7p6hr5.webp)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-indigo-900/75 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

        <div className="relative container py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Über 48.000 geprüfte Unternehmen</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Finden Sie den<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-orange-300">
                perfekten Anbieter
              </span>
              <br />in Ihrer Nähe
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-white/80 text-lg mb-10 max-w-xl">
              Restaurants, Handwerker, Ärzte und mehr – mit echten Bewertungen, direkter Kontaktaufnahme und Online-Buchung.
            </motion.p>

            <motion.div variants={fadeUp} custom={3}>
              <SearchBar size="hero" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-extrabold text-indigo-600 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="section-divider mb-3" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Alle Branchen auf einen Blick
              </h2>
              <p className="text-slate-500 mt-1">Wählen Sie eine Kategorie und finden Sie sofort die besten Anbieter</p>
            </div>
            <Link href="/branchen" className="hidden md:flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              Alle Branchen <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={`/suche?was=${cat.name}`}>
                  <div className="bg-white rounded-2xl p-4 text-center border border-slate-100 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50 transition-all duration-200 group cursor-pointer">
                    <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                      {cat.icon}
                    </div>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors leading-tight">{cat.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{cat.count.toLocaleString()} Einträge</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED BUSINESSES ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="section-divider mb-3" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Top-bewertete Unternehmen
              </h2>
              <p className="text-slate-500 mt-1">Die besten Anbieter nach echten Kundenbewertungen</p>
            </div>
            <Link href="/suche" className="hidden md:flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              Alle anzeigen <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredBusinesses.slice(0, 6).map((biz, i) => (
              <motion.div
                key={biz.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <BusinessCard business={biz} layout="grid" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-divider mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              So einfach funktioniert Auskunft.de
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: "🔍", title: "Suchen", desc: "Geben Sie ein, was Sie suchen und wo – unser smarter Algorithmus findet die besten Treffer in Ihrer Nähe." },
              { step: "02", icon: "⭐", title: "Vergleichen", desc: "Lesen Sie echte Bewertungen, vergleichen Sie Angebote und schauen Sie sich Fotos und Details an." },
              { step: "03", icon: "📞", title: "Kontaktieren", desc: "Rufen Sie direkt an, schreiben Sie eine E-Mail oder buchen Sie online – alles mit einem Klick." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm h-full">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-indigo-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT REVIEWS ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <div className="section-divider mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Was unsere Nutzer sagen
            </h2>
            <p className="text-slate-500 mt-1">Aktuelle Bewertungen aus der Community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentReviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <Quote className="w-8 h-8 text-indigo-200 mb-3" />
                <p className="text-slate-700 mb-4 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{review.author}</p>
                    <p className="text-xs text-indigo-600 font-medium">{review.business}</p>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOR BUSINESSES ── */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Für Unternehmen</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Ihr Unternehmen auf Auskunft.de
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Erreichen Sie täglich tausende potenzielle Kunden. Kostenloser Basiseintrag, Premium-Profile mit Fotos, Öffnungszeiten und direkter Buchung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
                Kostenlos eintragen
              </button>
              <button className="bg-white/10 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors">
                Mehr erfahren
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Kostenloser Basiseintrag" },
                { icon: <Shield className="w-4 h-4" />, text: "Verifiziertes Profil" },
                { icon: <Users className="w-4 h-4" />, text: "2,1 Mio. Nutzer/Monat" },
                { icon: <Star className="w-4 h-4" />, text: "Bewertungsmanagement" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
