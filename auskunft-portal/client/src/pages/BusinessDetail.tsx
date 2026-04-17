import { useState } from "react";
import { useParams, Link } from "wouter";
import {
  MapPin, Phone, Mail, Globe, Clock, CheckCircle2, Crown, Share2, Heart,
  ChevronLeft, Star, Calendar, Users, ChevronRight, ExternalLink, ThumbsUp,
  Utensils, Info, MessageSquare, Camera
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { featuredBusinesses } from "@/lib/data";
import { toast } from "sonner";

export default function BusinessDetail() {
  const params = useParams<{ id: string }>();
  const business = featuredBusinesses.find((b) => b.id === params.id) || featuredBusinesses[0];

  const [activeTab, setActiveTab] = useState<"info" | "menu" | "bewertungen" | "fotos">("info");
  const [saved, setSaved] = useState(false);
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("19:00");
  const [reservationPersons, setReservationPersons] = useState("2");
  const [activePhoto, setActivePhoto] = useState(0);

  const tabs = [
    { id: "info", label: "Informationen", icon: <Info className="w-4 h-4" /> },
    ...(business.menu ? [{ id: "menu" as const, label: "Speisekarte", icon: <Utensils className="w-4 h-4" /> }] : []),
    { id: "bewertungen" as const, label: `Bewertungen (${business.reviewCount})`, icon: <MessageSquare className="w-4 h-4" /> },
    { id: "fotos" as const, label: "Fotos", icon: <Camera className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* ── HERO IMAGE ── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={business.gallery?.[activePhoto] || business.image}
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-4 left-0 right-0 container">
          <Link href="/suche" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Zurück zur Suche
          </Link>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-0 container flex justify-end gap-2">
          <button
            onClick={() => { setSaved(!saved); toast.success(saved ? "Gespeichert entfernt" : "Gespeichert!"); }}
            className={`p-2.5 rounded-full backdrop-blur-sm border transition-colors ${saved ? "bg-red-500 border-red-400 text-white" : "bg-black/20 border-white/20 text-white hover:bg-black/40"}`}
          >
            <Heart className={`w-5 h-5 ${saved ? "fill-white" : ""}`} />
          </button>
          <button
            onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link kopiert!"); }}
            className="p-2.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 text-white hover:bg-black/40 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Business name overlay */}
        <div className="absolute bottom-0 left-0 right-0 container pb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              {business.premium && (
                <span className="badge-verified flex items-center gap-1 w-fit mb-2">
                  <Crown className="w-3 h-3" /> Premium Partner
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {business.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <StarRating rating={business.rating} size="md" showNumber reviewCount={business.reviewCount} />
                <span className="text-white/60">·</span>
                <span className="text-white/80 text-sm">{business.category}</span>
                {business.subcategory && (
                  <>
                    <span className="text-white/60">·</span>
                    <span className="text-white/80 text-sm">{business.subcategory}</span>
                  </>
                )}
                {business.priceRange && (
                  <>
                    <span className="text-white/60">·</span>
                    <span className="text-white/80 text-sm font-medium">{business.priceRange}</span>
                  </>
                )}
              </div>
            </div>
            {business.openNow !== undefined && (
              <div className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm ${business.openNow ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-200"}`}>
                {business.openNow ? "Jetzt geöffnet" : "Geschlossen"}
              </div>
            )}
          </div>
        </div>

        {/* Photo thumbnails */}
        {business.gallery && business.gallery.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {business.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${activePhoto === i ? "border-white scale-110" : "border-white/40 opacity-70"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── CONTACT BAR ── */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <a href={`tel:${business.phone}`} className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Telefon</p>
                <p className="text-sm font-semibold">{business.phone}</p>
              </div>
            </a>
            {business.email && (
              <a href={`mailto:${business.email}`} className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                  <Mail className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">E-Mail</p>
                  <p className="text-sm font-semibold">{business.email}</p>
                </div>
              </a>
            )}
            <div className="flex items-center gap-2 text-slate-700">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Adresse</p>
                <p className="text-sm font-semibold">{business.address}, {business.zip} {business.city}</p>
              </div>
            </div>
            <div className="ml-auto flex gap-3">
              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors text-sm"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
              <button
                onClick={() => toast.success("Reservierungsanfrage gesendet!")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl transition-colors text-sm shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Jetzt reservieren
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="container py-8">
        <div className="flex gap-8 items-start">
          {/* Left: Main content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex gap-1 bg-white rounded-xl border border-slate-100 p-1 mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* INFO TAB */}
            {activeTab === "info" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Description */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="section-divider mb-3" />
                  <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Über {business.name}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {business.longDescription || business.description}
                  </p>
                  {business.features && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {business.features.map((f) => (
                        <span key={f} className="flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Photo gallery */}
                {business.gallery && (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Galerie</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {business.gallery.map((img, i) => (
                        <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer group" onClick={() => setActivePhoto(i)}>
                          <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Opening hours */}
                {business.hours && (
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      <Clock className="w-5 h-5 text-indigo-600" />
                      Öffnungszeiten
                    </h3>
                    <div className="space-y-2">
                      {business.hours.map((h) => (
                        <div key={h.day} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                          <span className="text-sm font-medium text-slate-700">{h.day}</span>
                          <span className="text-sm text-slate-600 font-mono">{h.open} – {h.close} Uhr</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h3 className="font-bold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Kategorien & Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
                      {business.category}
                    </span>
                    {business.tags.map((tag) => (
                      <span key={tag} className="text-sm text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* MENU TAB */}
            {activeTab === "menu" && business.menu && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="section-divider mb-2" />
                      <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Signature Gerichte</h2>
                    </div>
                    <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
                      Gesamte Karte (PDF) <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {business.menu.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="py-5 flex items-start justify-between gap-4"
                      >
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{item.name}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                        </div>
                        <span className="text-lg font-bold text-indigo-600 flex-shrink-0">{item.price}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === "bewertungen" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Rating summary */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-6xl font-extrabold text-slate-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {business.rating.toFixed(1)}
                      </div>
                      <StarRating rating={business.rating} size="lg" />
                      <p className="text-sm text-slate-500 mt-1">{business.reviewCount} Bewertungen</p>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const pct = stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                        return (
                          <div key={stars} className="flex items-center gap-3 mb-2">
                            <span className="text-xs text-slate-500 w-4">{stars}</span>
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    onClick={() => toast.info("Bewertung schreiben kommt bald!")}
                    className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    Bewertung schreiben
                  </button>
                </div>

                {/* Individual reviews */}
                {(business.reviews || []).map((review, i) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-sm">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{review.author}</p>
                          <p className="text-xs text-slate-400">{review.date}</p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm">{review.text}</p>
                    {review.helpful !== undefined && (
                      <div className="mt-3 flex items-center gap-2">
                        <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-600 transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          Hilfreich ({review.helpful})
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* PHOTOS TAB */}
            {activeTab === "fotos" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-bold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Alle Fotos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[business.image, ...(business.gallery || [])].map((img, i) => (
                      <div key={i} className="aspect-video rounded-xl overflow-hidden group cursor-pointer">
                        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-4">
            {/* Reservation widget */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                <Calendar className="w-5 h-5 text-indigo-600" />
                Tisch reservieren
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Datum</label>
                  <input
                    type="date"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Uhrzeit</label>
                  <select
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                  >
                    {["12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"].map((t) => (
                      <option key={t} value={t}>{t} Uhr</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Personen</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReservationPersons(String(Math.max(1, parseInt(reservationPersons) - 1)))}
                      className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                    >
                      –
                    </button>
                    <span className="flex-1 text-center font-semibold text-slate-900">{reservationPersons}</span>
                    <button
                      onClick={() => setReservationPersons(String(parseInt(reservationPersons) + 1))}
                      className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => toast.success("Verfügbarkeit wird geprüft...")}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Verfügbarkeit prüfen
                </button>
              </div>
            </div>

            {/* Opening hours */}
            {business.hours && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  <Clock className="w-4 h-4 text-indigo-600" />
                  Öffnungszeiten
                </h3>
                <div className="space-y-1.5">
                  {business.hours.map((h) => (
                    <div key={h.day} className="flex justify-between text-sm">
                      <span className="text-slate-600">{h.day}</span>
                      <span className="font-medium text-slate-800 font-mono text-xs">{h.open}–{h.close}</span>
                    </div>
                  ))}
                </div>
                <div className={`mt-3 flex items-center gap-2 text-sm font-semibold ${business.openNow ? "text-emerald-600" : "text-slate-400"}`}>
                  <span className={`w-2 h-2 rounded-full ${business.openNow ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                  {business.openNow ? "Jetzt geöffnet" : "Momentan geschlossen"}
                </div>
              </div>
            )}

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">{business.address}</p>
                  <p className="text-xs text-slate-400">{business.zip} {business.city}</p>
                </div>
              </div>
              <div className="p-4">
                <button
                  onClick={() => toast.info("Karte öffnet sich...")}
                  className="w-full text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Route berechnen
                </button>
              </div>
            </div>

            {/* Quick contact */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Direkt anfragen</h3>
              <p className="text-white/80 text-xs mb-4">Schreiben Sie dem Unternehmen direkt</p>
              <button
                onClick={() => toast.info("Kontaktformular kommt bald!")}
                className="w-full bg-white text-indigo-700 font-semibold py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition-colors"
              >
                Nachricht senden
              </button>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
