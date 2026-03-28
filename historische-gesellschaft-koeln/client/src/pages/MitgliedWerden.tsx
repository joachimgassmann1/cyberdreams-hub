/*
 * Mitglied werden – Monumentum Design
 */
import Layout from "@/components/Layout";
import { Check } from "lucide-react";

const vorteile = [
  "Unterstützung der wissenschaftlichen Kölner Stadtgeschichte",
  "Regelmäßige Informationen über neue Bände und Veranstaltungen",
  "Einladungen zu Jahreshauptversammlungen",
  "Möglichkeit zur aktiven Mitgestaltung der Gesellschaft",
  "Verbindung mit einem Netzwerk von Geschichtsinteressierten",
  "Beitrag zur Bewahrung und Vermittlung des kulturellen Erbes Kölns"
];

export default function MitgliedWerden() {
  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero py-20">
        <div className="container">
          <p
            className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Mitmachen
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Mitglied werden
          </h1>
          <p
            className="text-gray-300 text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Unterstützen Sie die Historische Gesellschaft Köln e.V.
          </p>
        </div>
      </section>

      {/* Inhalt */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-6 section-title"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                Werden Sie Teil der Geschichte
              </h2>
              <p
                className="text-gray-700 leading-relaxed mb-6"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Die Historische Gesellschaft Köln e.V. freut sich über jeden, der die 
                wissenschaftliche Erforschung und Darstellung der Kölner Stadtgeschichte 
                unterstützen möchte. Als Mitglied tragen Sie dazu bei, dass dieses 
                einzigartige Projekt fortgeführt werden kann.
              </p>
              <p
                className="text-gray-700 leading-relaxed mb-8"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Die Mitgliedschaft steht allen Interessierten offen – ob Historiker, 
                Archivare, Lehrer, Journalisten oder einfach geschichtsinteressierte 
                Bürgerinnen und Bürger.
              </p>

              <h3
                className="text-lg font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                Vorteile der Mitgliedschaft
              </h3>
              <ul className="space-y-3 mb-8">
                {vorteile.map((vorteil, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <span
                      className="text-gray-700 text-sm"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {vorteil}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Beitrittsformular */}
            <div>
              <div className="bg-gray-50 p-8">
                <h3
                  className="text-xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                >
                  Beitrittsantrag
                </h3>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Vielen Dank für Ihren Beitrittsantrag. Wir melden uns in Kürze."); }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Vorname *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors"
                        style={{ fontFamily: "'Lora', serif" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Nachname *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors"
                        style={{ fontFamily: "'Lora', serif" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors"
                      style={{ fontFamily: "'Lora', serif" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Adresse
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors"
                      style={{ fontFamily: "'Lora', serif" }}
                      placeholder="Straße, Hausnummer"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        PLZ
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors"
                        style={{ fontFamily: "'Lora', serif" }}
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Ort
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors"
                        style={{ fontFamily: "'Lora', serif" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Anmerkungen
                    </label>
                    <textarea
                      rows={3}
                      className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors resize-none"
                      style={{ fontFamily: "'Lora', serif" }}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Beitrittsantrag senden
                  </button>

                  <p
                    className="text-xs text-gray-500 text-center"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    * Pflichtfelder. Ihre Daten werden vertraulich behandelt.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
