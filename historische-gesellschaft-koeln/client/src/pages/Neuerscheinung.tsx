/*
 * Neuerscheinung – Monumentum Design
 * Präsentation des neuesten Bandes
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { baende } from "@/lib/data";

const BOOK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/100777620/bjrpg25JMfDiZ3CmTynrxu/book-collection-P7GfJDdfBcsUaGfjPukUst.webp";

export default function Neuerscheinung() {
  // Band 5 ist die Neuerscheinung
  const band = baende[4];

  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={BOOK_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <p
            className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Aktuell
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Neuerscheinung
          </h1>
          <p
            className="text-gray-300 text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Der neueste Band der Kölner Stadtgeschichte
          </p>
        </div>
      </section>

      {/* Band-Präsentation */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <img
                src={BOOK_IMG}
                alt={band.titel}
                className="w-full shadow-2xl"
              />
            </div>
            <div>
              <span
                className="inline-block bg-red-700 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Neuerscheinung · Band {band.nummer}
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 section-title"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                {band.titel}
              </h2>
              <p
                className="text-xl text-red-700 font-semibold mb-4"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                {band.untertitel}
              </p>
              <p
                className="text-gray-500 text-sm mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
              >
                {band.zeitraum} · von {band.autor}
              </p>
              <p
                className="text-gray-700 leading-relaxed text-lg mb-8"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {band.beschreibung}
              </p>

              <div className="bg-gray-50 p-6 mb-8">
                <h3
                  className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Buchdetails
                </h3>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", letterSpacing: "0.05em" }}>Reihe</dt>
                    <dd className="text-gray-800 font-medium" style={{ fontFamily: "'Lora', serif" }}>Kölner Stadtgeschichte</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", letterSpacing: "0.05em" }}>Band</dt>
                    <dd className="text-gray-800 font-medium" style={{ fontFamily: "'Lora', serif" }}>{band.nummer} von 13</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", letterSpacing: "0.05em" }}>Autor</dt>
                    <dd className="text-gray-800 font-medium" style={{ fontFamily: "'Lora', serif" }}>{band.autor}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", letterSpacing: "0.05em" }}>Verlag</dt>
                    <dd className="text-gray-800 font-medium" style={{ fontFamily: "'Lora', serif" }}>Greven Verlag Köln</dd>
                  </div>
                  {band.isbn && (
                    <div className="col-span-2">
                      <dt className="text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem", letterSpacing: "0.05em" }}>ISBN</dt>
                      <dd className="text-gray-800 font-medium" style={{ fontFamily: "'Lora', serif" }}>{band.isbn}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.greven-verlag.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Im Greven Verlag bestellen
                </a>
                <Link href={`/band/${band.slug}`} className="btn-outline inline-block">
                  Mehr zum Band
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Über den Autor */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-3xl">
          <h2
            className="text-2xl font-bold text-gray-900 mb-6 section-title"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Über den Autor
          </h2>
          <p
            className="text-gray-700 leading-relaxed mb-4"
            style={{ fontFamily: "'Lora', serif" }}
          >
            <strong>Prof. Dr. Gerd Schwerhoff</strong> (geb. 1957 in Köln) ist Professor für die 
            Geschichte der Frühen Neuzeit an der TU Dresden. Zu seinen Arbeitsgebieten zählen 
            die Stadt- und Religionsgeschichte sowie die Erforschung von Kriminalität, Hexerei 
            und Gotteslästerung.
          </p>
          <p
            className="text-gray-700 leading-relaxed"
            style={{ fontFamily: "'Lora', serif" }}
          >
            In zahlreichen Veröffentlichungen hat er sich mit der Kölner Stadtgeschichte des 
            Spätmittelalters und der Frühen Neuzeit beschäftigt. Als gebürtiger Kölner verbindet 
            ihn eine besondere Beziehung zur Geschichte seiner Heimatstadt.
          </p>
          <div className="mt-6">
            <Link href="/autoren/schwerhoff" className="btn-outline inline-block">
              Zum Autorenprofil
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
