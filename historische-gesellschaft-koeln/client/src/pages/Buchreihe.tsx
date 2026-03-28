/*
 * Buchreihe – Monumentum Design
 * Übersicht aller 13 Bände
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { baende } from "@/lib/data";

export default function Buchreihe() {
  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero py-20">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/100777620/bjrpg25JMfDiZ3CmTynrxu/book-collection-P7GfJDdfBcsUaGfjPukUst.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <p
            className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Historische Gesellschaft Köln
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Die Buchreihe
          </h1>
          <p
            className="text-gray-300 max-w-2xl text-lg leading-relaxed"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Die komplette Geschichte der Stadt Köln in 13 Prachtbänden – 
            von der Römerzeit bis in die Gegenwart. Für Sammler auch in Halbleder erhältlich.
          </p>
        </div>
      </section>

      {/* Bände */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {baende.map((band) => (
              <Link
                key={band.nummer}
                href={`/band/${band.slug}`}
                className="band-card group block"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={band.bild}
                    alt={band.titel}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span
                      className="bg-red-700 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Band {band.nummer}
                    </span>
                    {!band.erschienen && (
                      <span
                        className="ml-2 bg-gray-600 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        In Vorbereitung
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <p
                    className="text-red-700 text-xs font-semibold tracking-wider uppercase mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {band.zeitraum}
                  </p>
                  <h3
                    className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-700 transition-colors"
                    style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                  >
                    {band.titel}
                  </h3>
                  <p
                    className="text-sm text-gray-500 mb-3"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {band.autor}
                  </p>
                  <p
                    className="text-sm text-gray-600 line-clamp-3 leading-relaxed"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {band.beschreibung}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Halbleder Hinweis */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Für Sammler auch in Halbleder
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6" style={{ fontFamily: "'Lora', serif" }}>
            Die Kölner Stadtgeschichte ist für Sammler auch in einer exklusiven Halbleder-Ausgabe 
            erhältlich. Diese hochwertige Ausstattung macht die Bände zu einem besonderen 
            Schmuckstück in jeder Bibliothek.
          </p>
          <a
            href="https://www.greven-verlag.de"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Im Greven Verlag bestellen
          </a>
        </div>
      </section>
    </Layout>
  );
}
