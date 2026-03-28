/*
 * Datenschutz – Monumentum Design
 */
import Layout from "@/components/Layout";

export default function Datenschutz() {
  return (
    <Layout>
      <section className="page-hero py-16">
        <div className="container">
          <h1
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Datenschutzerklärung
          </h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="prose max-w-none" style={{ fontFamily: "'Lora', serif" }}>
            <p>
              Als verantwortliche Betreiber dieser Seiten wissen wir um die Wichtigkeit 
              des Schutzes Ihrer persönlichen Daten. Selbstverständlich sind wir gehalten, 
              alle gesetzlichen Datenschutzvorschriften einzuhalten. Wir behandeln Ihre 
              personenbezogenen Daten vertraulich.
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Verantwortlicher</h2>
            <p>
              Historische Gesellschaft Köln e.V.<br />
              Postfach 10 22 51<br />
              50462 Köln<br />
              Hohenzollernring 71–73, 50672 Köln<br />
              Telefon und Telefax: +49 (0) 221 51 02 604<br />
              E-Mail: <a href="mailto:info@historische-gesellschaft-koeln.de" className="text-red-700 hover:underline">info@historische-gesellschaft-koeln.de</a>
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Erhebung und Verarbeitung personenbezogener Daten</h2>
            <p>
              In dieser Datenschutzerklärung informieren wir Sie über Art und Umfang der 
              Datenerhebung – welche Daten erheben wir, wie nutzen wir sie, und zu welchem 
              Zweck geschieht das?
            </p>
            <p>
              Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert 
              werden können. Wir erheben, verarbeiten und nutzen Ihre personenbezogenen 
              Daten nur, soweit sie für die Begründung, inhaltliche Ausgestaltung oder 
              Änderung des Rechtsverhältnisses erforderlich sind.
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Rechtsgrundlage</h2>
            <p>
              Rechtsgrundlage für die Verarbeitung personenbezogener Daten ist Art. 6 Abs. 1 
              lit. a, b, c, d, f EU-Datenschutzgrundverordnung (DSGVO).
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft über die bei uns gespeicherten 
              personenbezogenen Daten, das Recht auf Berichtigung, Löschung oder 
              Einschränkung der Verarbeitung sowie das Recht auf Datenübertragbarkeit.
            </p>
            <p>
              Zur Geltendmachung Ihrer Rechte wenden Sie sich bitte an:<br />
              <a href="mailto:info@historische-gesellschaft-koeln.de" className="text-red-700 hover:underline">info@historische-gesellschaft-koeln.de</a>
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Cookies</h2>
            <p>
              Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf 
              Ihrem Rechner abgelegt werden und die Ihr Browser speichert. Sie richten 
              auf Ihrem Rechner keinen Schaden an und enthalten keine Viren.
            </p>

            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}>Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung gelegentlich anzupassen, 
              damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um 
              Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
