/*
 * Impressum – Monumentum Design
 */
import Layout from "@/components/Layout";

export default function Impressum() {
  return (
    <Layout>
      <section className="page-hero py-16">
        <div className="container">
          <h1
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Impressum
          </h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="prose max-w-none" style={{ fontFamily: "'Lora', serif" }}>
            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Angaben gemäß § 5 TMG</h2>
            <p>
              Historische Gesellschaft Köln e.V.<br />
              Postfach 10 22 51<br />
              50462 Köln
            </p>
            <p>
              <strong>Hausanschrift:</strong><br />
              Hohenzollernring 71–73<br />
              50672 Köln
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Vertreten durch</h2>
            <p>
              Prof. Dr. Jürgen Wilhelm (Vorsitzender)<br />
              Hadmut Jaeger (Geschäftsführerin)
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Kontakt</h2>
            <p>
              Historische Gesellschaft Köln, Geschäftsstelle<br />
              Telefon und Telefax: +49 (0) 221 5736110<br />
              E-Mail: <a href="mailto:info@historische-gesellschaft-koeln.de" className="text-red-700 hover:underline">info@historische-gesellschaft-koeln.de</a>
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
              DE 5215/5867/0204
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Greven Verlag Köln GmbH &amp; Co. KG<br />
              Neue Weyerstraße 1–3<br />
              50676 Köln
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Haftungsausschluss</h2>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die 
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch 
              keine Gewähr übernehmen.
            </p>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf 
              diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 
              TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder 
              gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, 
              die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
