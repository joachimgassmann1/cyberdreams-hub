/*
 * Startseite – Monumentum Design
 * Hero mit Köln-Panorama, Intro-Text, Stimmen, Buchreihe-Übersicht
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronRight, ChevronLeft, Quote } from "lucide-react";
import Layout from "@/components/Layout";
import { baende, stimmen, pressestimmen } from "@/lib/data";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/100777620/bjrpg25JMfDiZ3CmTynrxu/hero-koeln-panorama-kLkn46rytcvyURz3VsiZb7.webp";
const BOOK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/100777620/bjrpg25JMfDiZ3CmTynrxu/book-collection-P7GfJDdfBcsUaGfjPukUst.webp";
const MANUSCRIPT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/100777620/bjrpg25JMfDiZ3CmTynrxu/medieval-manuscript-X4jAUF4MSVqVRT8hsNRGhM.webp";

export default function Home() {
  const [currentStimme, setCurrentStimme] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const nextStimme = () => setCurrentStimme((c) => (c + 1) % stimmen.length);
  const prevStimme = () => setCurrentStimme((c) => (c - 1 + stimmen.length) % stimmen.length);

  // Neuerscheinung = Band 5 (letzter erschienener)
  const neuerscheinung = baende[4];

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Köln Panorama"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="relative h-full container flex flex-col justify-end pb-16">
          <div className={`max-w-2xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p
              className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Historische Gesellschaft Köln e.V.
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              2000 Jahre<br />Kölner Geschichte
            </h1>
            <p
              className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Die wissenschaftliche Stadtgeschichte Kölns in 13 Bänden – 
              von der Römerzeit bis in die Gegenwart.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/buchreihe" className="btn-primary inline-block">
                Zur Buchreihe
              </Link>
              <Link href="/neuerscheinung" className="btn-outline inline-block border-white text-white hover:bg-white hover:text-gray-900">
                Neuerscheinung
              </Link>
            </div>
          </div>
        </div>

        {/* Scrolling indicator */}
        <div className="absolute bottom-6 right-8 text-white/60 text-xs tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Band 5 – Neuerscheinung
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="text-red-700 text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Die Gesellschaft
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 section-title"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                Die Historische Gesellschaft Köln
              </h2>
              <h3
                className="text-lg text-red-700 font-semibold mb-6"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                Herausgabe der wissenschaftlichen Kölner Stadtgeschichte
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: "'Lora', serif" }}>
                Die Historische Gesellschaft Köln e.V. gibt die große wissenschaftliche und 
                allgemeinverständliche Kölner Stadtgeschichte in 13 Bänden heraus. Damit wird 
                der seit Jahrzehnten immer wieder öffentlich formulierte Wunsch, eine 
                wissenschaftlich fundierte, aus der Forschung gewachsene und gut lesbare 
                Darstellung der 2000-jährigen Stadtgeschichte zu besitzen, im Greven Verlag 
                Köln erfüllt.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8" style={{ fontFamily: "'Lora', serif" }}>
                In 13 Bänden stellen international renommierte Historiker die Entwicklung des 
                politischen Gemeinwesens dar, das sich stets seiner eigenen, historisch 
                gewachsenen Identität bewusst war.
              </p>
              <Link href="/gesellschaft" className="btn-outline inline-block">
                Mehr über die Gesellschaft
              </Link>
            </div>
            <div className="relative">
              <img
                src={MANUSCRIPT_IMG}
                alt="Mittelalterliche Handschrift"
                className="w-full h-80 object-cover shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-red-700 text-white p-6 w-48">
                <div
                  className="text-3xl font-bold"
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                >
                  13
                </div>
                <div
                  className="text-xs tracking-wider uppercase mt-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Bände
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEUERSCHEINUNG ── */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={BOOK_IMG}
                alt="Buchreihe"
                className="w-full h-72 object-cover shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p
                className="text-red-700 text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Neuerscheinung
              </p>
              <h2
                className="text-3xl font-bold text-gray-900 mb-2 section-title"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                Band {neuerscheinung.nummer}
              </h2>
              <h3
                className="text-xl text-red-700 font-semibold mb-2"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                {neuerscheinung.titel}
              </h3>
              <p
                className="text-sm text-gray-500 mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
              >
                {neuerscheinung.zeitraum} · {neuerscheinung.autor}
              </p>
              <p className="text-gray-700 leading-relaxed mb-8" style={{ fontFamily: "'Lora', serif" }}>
                {neuerscheinung.beschreibung}
              </p>
              <Link href="/neuerscheinung" className="btn-primary inline-block">
                Zur Neuerscheinung
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STIMMEN ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p
              className="text-red-700 text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Was andere sagen
            </p>
            <h2
              className="text-3xl font-bold text-gray-900 section-title centered"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              Stimmen zur Buchreihe
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative bg-gray-50 p-10 min-h-[200px]">
              <Quote size={40} className="text-red-200 absolute top-6 left-6" />
              <div className="relative z-10">
                <blockquote
                  className="text-xl text-gray-800 italic leading-relaxed mb-6"
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                >
                  »{stimmen[currentStimme].zitat}«
                </blockquote>
                <div>
                  <p
                    className="font-bold text-gray-900"
                    style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                  >
                    {stimmen[currentStimme].name}
                  </p>
                  <p
                    className="text-sm text-gray-500 mt-1"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {stimmen[currentStimme].beschreibung}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={prevStimme}
                className="p-2 border border-gray-200 hover:border-red-700 hover:text-red-700 transition-colors"
                aria-label="Vorherige Stimme"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {stimmen.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStimme(i)}
                    className={`w-2 h-2 transition-colors ${
                      i === currentStimme ? "bg-red-700" : "bg-gray-300"
                    }`}
                    aria-label={`Stimme ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextStimme}
                className="p-2 border border-gray-200 hover:border-red-700 hover:text-red-700 transition-colors"
                aria-label="Nächste Stimme"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRESSESTIMMEN ── */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container">
          <div className="text-center mb-10">
            <p
              className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Presse
            </p>
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              Pressestimmen zur Kölner Stadtgeschichte
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pressestimmen.map((p, i) => (
              <div key={i} className="border-l-2 border-red-700 pl-4 py-2">
                <p
                  className="text-gray-300 italic text-sm leading-relaxed mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  »{p.zitat}«
                </p>
                <p
                  className="text-red-400 text-xs font-semibold tracking-wider uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {p.quelle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUCHREIHE ÜBERSICHT ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p
              className="text-red-700 text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              13 Bände
            </p>
            <h2
              className="text-3xl font-bold text-gray-900 section-title centered"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              Die Buchreihe im Überblick
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto" style={{ fontFamily: "'Lora', serif" }}>
              Die komplette Geschichte der Stadt Köln in 13 Prachtbänden. Für Sammler auch in Halbleder.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {baende.slice(0, 12).map((band) => (
              <Link
                key={band.nummer}
                href={`/band/${band.slug}`}
                className="band-card group block"
              >
                <div className="bg-gray-900 aspect-[3/4] flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-1 bg-red-700"
                  />
                  <span
                    className="text-4xl font-bold text-white/20 absolute"
                    style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                  >
                    {band.nummer}
                  </span>
                  <div className="relative z-10 text-center">
                    <p
                      className="text-red-400 text-xs font-semibold tracking-wider uppercase mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Band {band.nummer}
                    </p>
                    <p
                      className="text-white text-xs leading-tight"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {band.zeitraum}
                    </p>
                  </div>
                </div>
                <div className="p-3">
                  <p
                    className="text-xs text-gray-700 leading-tight line-clamp-2"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {band.titel}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/buchreihe" className="btn-primary inline-block">
              Alle Bände ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA MITGLIED WERDEN ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2c1810 100%)" }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)"
          }} />
        </div>
        <div className="container relative z-10 text-center">
          <p
            className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Werden Sie Teil der Geschichte
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Mitglied der Historischen Gesellschaft Köln
          </h2>
          <p
            className="text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Unterstützen Sie die Herausgabe der wissenschaftlichen Kölner Stadtgeschichte 
            und werden Sie Teil unserer Gemeinschaft von Geschichtsinteressierten.
          </p>
          <Link href="/mitglied-werden" className="btn-primary inline-block">
            Jetzt Mitglied werden
          </Link>
        </div>
      </section>
    </Layout>
  );
}
