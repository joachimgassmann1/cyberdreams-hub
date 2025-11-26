import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Datenschutz() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 bg-background">
        <div className="container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Datenschutzerklärung</h1>
          
          <div className="space-y-8 max-w-4xl">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-xl font-semibold mb-3 text-foreground/90">Allgemeine Hinweise</h3>
              <p className="text-foreground/80 mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                persönlich identifiziert werden können.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground/90">Datenerfassung auf dieser Website</h3>
              <p className="text-foreground/80 mb-4">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                können Sie dem Impressum dieser Website entnehmen.
              </p>
              <p className="text-foreground/80 mb-4">
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. 
                um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p className="text-foreground/80">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
                IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder 
                Uhrzeit des Seitenaufrufs).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">2. Hosting</h2>
              <p className="text-foreground/80">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, 
                werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, 
                Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe 
                und sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="text-xl font-semibold mb-3 text-foreground/90">Datenschutz</h3>
              <p className="text-foreground/80 mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie 
                dieser Datenschutzerklärung.
              </p>
              <p className="text-foreground/80">
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Die vorliegende 
                Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, 
                wie und zu welchem Zweck das geschieht.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground/90">Hinweis zur verantwortlichen Stelle</h3>
              <p className="text-foreground/80 mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-foreground/80">
                Joachim Gassmann – Musik- & Medienproduktion<br />
                Agnes-Miegel-Str. 2<br />
                53859 Niederkassel<br />
                <br />
                Telefon: 01715569140<br />
                E-Mail: info@sphere-music-hub.com
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground/90">Speicherdauer</h3>
              <p className="text-foreground/80">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben 
                Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein 
                berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, 
                werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung 
                Ihrer personenbezogenen Daten haben.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3 text-foreground/90">Ihre Rechte</h3>
              <p className="text-foreground/80 mb-4">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder 
                Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, 
                können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.
              </p>
              <p className="text-foreground/80">
                Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer 
                personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen 
                Aufsichtsbehörde zu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">4. Datenerfassung auf dieser Website</h2>
              <h3 className="text-xl font-semibold mb-3 text-foreground/90">Server-Log-Dateien</h3>
              <p className="text-foreground/80 mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-foreground/80">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser 
                Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">5. Plugins und Tools</h2>
              <h3 className="text-xl font-semibold mb-3 text-foreground/90">YouTube</h3>
              <p className="text-foreground/80">
                Diese Website bindet Videos der Website YouTube ein. Betreiber der Website ist die Google Ireland Limited. 
                Wenn Sie eine unserer Webseiten besuchen, auf denen YouTube eingebunden ist, wird eine Verbindung zu den 
                Servern von YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt, welche unserer Seiten Sie 
                besucht haben.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
