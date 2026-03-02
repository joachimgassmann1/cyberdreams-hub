/*
 * Die Gesellschaft – Monumentum Design
 */
import Layout from "@/components/Layout";

const MANUSCRIPT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/100777620/bjrpg25JMfDiZ3CmTynrxu/medieval-manuscript-X4jAUF4MSVqVRT8hsNRGhM.webp";

export default function Gesellschaft() {
  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero py-20">
        <div className="container">
          <p
            className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Über uns
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Die Gesellschaft
          </h1>
          <p
            className="text-gray-300 max-w-2xl text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Die Historische Gesellschaft Köln e.V. – Träger der wissenschaftlichen Kölner Stadtgeschichte
          </p>
        </div>
      </section>

      {/* Hauptinhalt */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className="text-3xl font-bold text-gray-900 mb-6 section-title"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                Über die Historische Gesellschaft Köln
              </h2>
              <p
                className="text-gray-700 leading-relaxed mb-4"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Die Historische Gesellschaft Köln e.V. wurde mit dem Ziel gegründet, die 
                wissenschaftliche Erforschung und Darstellung der Kölner Stadtgeschichte zu 
                fördern und zu unterstützen. Im Mittelpunkt steht die Herausgabe der großen 
                wissenschaftlichen und allgemeinverständlichen Kölner Stadtgeschichte in 
                13 Bänden.
              </p>
              <p
                className="text-gray-700 leading-relaxed mb-4"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Damit wird der seit Jahrzehnten immer wieder öffentlich formulierte Wunsch, 
                eine wissenschaftlich fundierte, aus der Forschung gewachsene und gut lesbare 
                Darstellung der 2000-jährigen Stadtgeschichte zu besitzen, im Greven Verlag 
                Köln erfüllt.
              </p>
              <p
                className="text-gray-700 leading-relaxed mb-8"
                style={{ fontFamily: "'Lora', serif" }}
              >
                In 13 Bänden stellen international renommierte Historiker die Entwicklung des 
                politischen Gemeinwesens dar, das sich stets seiner eigenen, historisch 
                gewachsenen Identität bewusst war. Die Gesellschaft versteht sich als Brücke 
                zwischen Wissenschaft und interessierter Öffentlichkeit.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 text-center">
                  <div
                    className="text-4xl font-bold text-red-700 mb-1"
                    style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                  >
                    13
                  </div>
                  <div
                    className="text-xs text-gray-500 uppercase tracking-wider"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Bände
                  </div>
                </div>
                <div className="bg-gray-50 p-6 text-center">
                  <div
                    className="text-4xl font-bold text-red-700 mb-1"
                    style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                  >
                    2000
                  </div>
                  <div
                    className="text-xs text-gray-500 uppercase tracking-wider"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Jahre Geschichte
                  </div>
                </div>
              </div>
            </div>

            <div>
              <img
                src={MANUSCRIPT_IMG}
                alt="Historische Handschrift"
                className="w-full shadow-xl mb-6"
              />
              <div className="bg-red-700 text-white p-6">
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                >
                  Vorsitzender
                </h3>
                <p className="text-red-100 mb-1" style={{ fontFamily: "'Lora', serif" }}>
                  Prof. Dr. Jürgen Wilhelm
                </p>
                <p
                  className="text-red-200 text-sm"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  geb. 1949, Rechtsanwalt und Vorsitzender der Historischen Gesellschaft Köln
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zitat */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-3xl">
          <blockquote className="quote-block">
            <p
              className="text-xl text-gray-800 italic leading-relaxed mb-4"
              style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
            >
              »Wir sind froh und stolz, dass diese Bücher auch für den interessierten Laien 
              gut und lesbar geschrieben sind.«
            </p>
            <footer>
              <cite
                className="text-gray-600 not-italic text-sm"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
              >
                Prof. Dr. Jürgen Wilhelm, Vorsitzender der Historischen Gesellschaft Köln
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>
    </Layout>
  );
}
