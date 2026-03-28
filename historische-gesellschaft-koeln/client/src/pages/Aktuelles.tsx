/*
 * Aktuelles – Monumentum Design
 */
import Layout from "@/components/Layout";
import { Link } from "wouter";

const neuigkeiten = [
  {
    datum: "März 2025",
    titel: "Band 5 erschienen: Köln im Zeitalter der Reformation",
    text: "Der fünfte Band der Kölner Stadtgeschichte von Prof. Dr. Gerd Schwerhoff ist erschienen. Das Werk behandelt die Zeit von 1512/13 bis 1610 und beleuchtet Kölns Rolle als Bollwerk des Katholizismus in der Reformationszeit.",
    kategorie: "Neuerscheinung"
  },
  {
    datum: "Juni 2024",
    titel: "Jahreshauptversammlung 2024",
    text: "Am 17. Juni 2024 trafen sich die Mitglieder der Historischen Gesellschaft zur Jahreshauptversammlung im Greven Verlag, Neue Weyerstraße 1–3 in 50676 Köln.",
    kategorie: "Veranstaltung"
  },
  {
    datum: "2023",
    titel: "Jahreshauptversammlung 2023",
    text: "Am 5. Juni 2023 trafen sich die Mitglieder der Historischen Gesellschaft zur Jahreshauptversammlung im Greven Verlag.",
    kategorie: "Veranstaltung"
  },
  {
    datum: "2022",
    titel: "Jahreshauptversammlung 2022",
    text: "Am 23. Mai 2022 trafen sich die Mitglieder der Historischen Gesellschaft zur Jahreshauptversammlung im Greven Verlag.",
    kategorie: "Veranstaltung"
  }
];

export default function Aktuelles() {
  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero py-20">
        <div className="container">
          <p
            className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Neuigkeiten
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Aktuelles
          </h1>
          <p
            className="text-gray-300 text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Neuigkeiten und Veranstaltungen der Historischen Gesellschaft Köln
          </p>
        </div>
      </section>

      {/* Neuigkeiten */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="space-y-10">
            {neuigkeiten.map((item, i) => (
              <article key={i} className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10 border-b border-gray-100 last:border-0">
                <div className="md:col-span-1">
                  <span
                    className="inline-block bg-red-700 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.kategorie}
                  </span>
                  <p
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.datum}
                  </p>
                </div>
                <div className="md:col-span-3">
                  <h2
                    className="text-xl font-bold text-gray-900 mb-3"
                    style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                  >
                    {item.titel}
                  </h2>
                  <p
                    className="text-gray-600 leading-relaxed"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
