/*
 * Kontakt – Monumentum Design
 */
import Layout from "@/components/Layout";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Kontakt() {
  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero py-20">
        <div className="container">
          <p
            className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Schreiben Sie uns
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Kontakt
          </h1>
          <p
            className="text-gray-300 text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Wir freuen uns über Ihre Anfragen und Anregungen.
          </p>
        </div>
      </section>

      {/* Kontakt-Inhalt */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Kontaktdaten */}
            <div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-8 section-title"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                Geschäftsstelle
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-700 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Adresse
                    </p>
                    <p className="text-gray-700" style={{ fontFamily: "'Lora', serif" }}>
                      Historische Gesellschaft Köln e.V.<br />
                      Hohenzollernring 71–73<br />
                      50672 Köln
                    </p>
                    <p className="text-gray-500 text-sm mt-2" style={{ fontFamily: "'Lora', serif" }}>
                      Postfach 10 22 51<br />
                      50462 Köln
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-700 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Telefon & Fax
                    </p>
                    <p className="text-gray-700" style={{ fontFamily: "'Lora', serif" }}>
                      +49 (0) 221 5736110
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-700 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      E-Mail
                    </p>
                    <a
                      href="mailto:info@historische-gesellschaft-koeln.de"
                      className="text-red-700 hover:text-red-800 transition-colors"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      info@historische-gesellschaft-koeln.de
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-gray-50 p-6">
                <h3
                  className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Vertreten durch
                </h3>
                <p className="text-gray-700 mb-1" style={{ fontFamily: "'Lora', serif" }}>
                  Prof. Dr. Jürgen Wilhelm (Vorsitzender)
                </p>
                <p className="text-gray-700" style={{ fontFamily: "'Lora', serif" }}>
                  Hadmut Jaeger (Geschäftsführerin)
                </p>
              </div>
            </div>

            {/* Kontaktformular */}
            <div>
              <h2
                className="text-2xl font-bold text-gray-900 mb-8 section-title"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                Nachricht senden
              </h2>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Vielen Dank für Ihre Nachricht. Wir melden uns in Kürze."); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Vorname
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors"
                      style={{ fontFamily: "'Lora', serif" }}
                      placeholder="Ihr Vorname"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Nachname
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors"
                      style={{ fontFamily: "'Lora', serif" }}
                      placeholder="Ihr Nachname"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    E-Mail
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors"
                    style={{ fontFamily: "'Lora', serif" }}
                    placeholder="ihre@email.de"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Betreff
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors"
                    style={{ fontFamily: "'Lora', serif" }}
                    placeholder="Betreff Ihrer Nachricht"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Nachricht
                  </label>
                  <textarea
                    rows={5}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-700 transition-colors resize-none"
                    style={{ fontFamily: "'Lora', serif" }}
                    placeholder="Ihre Nachricht an uns..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
