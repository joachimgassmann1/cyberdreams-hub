/*
 * Band-Detail – Monumentum Design
 * Detailseite für jeden Band der Buchreihe
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, BookOpen, User, Calendar, Hash } from "lucide-react";
import Layout from "@/components/Layout";
import { baende, autoren } from "@/lib/data";
import NotFound from "./NotFound";

export default function BandDetail() {
  const { slug } = useParams<{ slug: string }>();
  const band = baende.find((b) => b.slug === slug);

  if (!band) return <NotFound />;

  const autor = autoren.find((a) => a.slug === slug.split("-")[0] || a.band.toLowerCase().includes(`band ${band.nummer}`));
  const prevBand = baende[band.nummer - 2];
  const nextBand = baende[band.nummer];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <img
          src={band.bild}
          alt={band.titel}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative h-full container flex flex-col justify-end pb-10">
          <Link
            href="/buchreihe"
            className="flex items-center gap-2 text-gray-300 hover:text-white text-sm mb-4 transition-colors w-fit"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <ArrowLeft size={14} /> Alle Bände
          </Link>
          <span
            className="bg-red-700 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider w-fit mb-2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Band {band.nummer}
          </span>
          <h1
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            {band.titel}
          </h1>
        </div>
      </section>

      {/* Inhalt */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Hauptinhalt */}
            <div className="lg:col-span-2">
              <p
                className="text-red-700 text-sm font-semibold mb-2"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                {band.untertitel}
              </p>
              <h2
                className="text-2xl font-bold text-gray-900 mb-6 section-title"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                Zum Inhalt
              </h2>
              <p
                className="text-gray-700 leading-relaxed text-lg mb-8"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {band.beschreibung}
              </p>

              {!band.erschienen && (
                <div className="bg-amber-50 border border-amber-200 p-4 mb-8">
                  <p
                    className="text-amber-800 text-sm"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    Dieser Band befindet sich noch in Vorbereitung. Das Erscheinungsdatum 
                    ist noch nicht bekannt.
                  </p>
                </div>
              )}

              {band.erschienen && (
                <a
                  href="https://www.greven-verlag.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Im Greven Verlag bestellen
                </a>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 p-6 mb-6">
                <h3
                  className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Buchdetails
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <BookOpen size={16} className="text-red-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>Reihe</p>
                      <p className="text-sm text-gray-800" style={{ fontFamily: "'Lora', serif" }}>Kölner Stadtgeschichte, Band {band.nummer}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <User size={16} className="text-red-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>Autor</p>
                      <p className="text-sm text-gray-800" style={{ fontFamily: "'Lora', serif" }}>{band.autor}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Calendar size={16} className="text-red-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>Zeitraum</p>
                      <p className="text-sm text-gray-800" style={{ fontFamily: "'Lora', serif" }}>{band.zeitraum}</p>
                    </div>
                  </li>
                  {band.isbn && (
                    <li className="flex items-start gap-3">
                      <Hash size={16} className="text-red-700 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>ISBN</p>
                        <p className="text-sm text-gray-800" style={{ fontFamily: "'Lora', serif" }}>{band.isbn}</p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              {/* Herausgeber */}
              <div className="bg-gray-50 p-6">
                <h3
                  className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Herausgeber
                </h3>
                <p className="text-sm text-gray-700 mb-1" style={{ fontFamily: "'Lora', serif" }}>
                  Historische Gesellschaft Köln e.V.
                </p>
                <p className="text-sm text-gray-700" style={{ fontFamily: "'Lora', serif" }}>
                  Greven Verlag Köln
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation zwischen Bänden */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="container flex justify-between items-center">
          {prevBand ? (
            <Link
              href={`/band/${prevBand.slug}`}
              className="flex items-center gap-2 text-gray-600 hover:text-red-700 transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", letterSpacing: "0.05em" }}
            >
              <ArrowLeft size={14} />
              <span>Band {prevBand.nummer}: {prevBand.zeitraum}</span>
            </Link>
          ) : <div />}
          {nextBand ? (
            <Link
              href={`/band/${nextBand.slug}`}
              className="flex items-center gap-2 text-gray-600 hover:text-red-700 transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", letterSpacing: "0.05em" }}
            >
              <span>Band {nextBand.nummer}: {nextBand.zeitraum}</span>
              <ArrowLeft size={14} className="rotate-180" />
            </Link>
          ) : <div />}
        </div>
      </section>
    </Layout>
  );
}
