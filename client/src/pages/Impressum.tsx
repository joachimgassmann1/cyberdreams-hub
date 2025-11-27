import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { detectLanguage } from '@/lib/i18n';

export default function Impressum() {
  const lang = detectLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{lang === 'de' ? 'Impressum - Sphere Music Hub' : 'Imprint - Sphere Music Hub'}</title>
        <meta name="description" content={lang === 'de' ? 'Impressum von Sphere Music Hub. Angaben gemäß § 5 TMG: Joachim Gassmann – Musik- & Medienproduktion, Niederkassel.' : 'Imprint of Sphere Music Hub. Information according to § 5 TMG: Joachim Gassmann – Music & Media Production, Niederkassel.'} />
        <meta property="og:title" content={lang === 'de' ? 'Impressum - Sphere Music Hub' : 'Imprint - Sphere Music Hub'} />
        <meta property="og:description" content={lang === 'de' ? 'Impressum von Sphere Music Hub. Angaben gemäß § 5 TMG: Joachim Gassmann – Musik- & Medienproduktion, Niederkassel.' : 'Imprint of Sphere Music Hub. Information according to § 5 TMG: Joachim Gassmann – Music & Media Production, Niederkassel.'} />
        <meta property="og:url" content="https://sphere-music-hub.com/impressum" />
        <meta name="twitter:title" content={lang === 'de' ? 'Impressum - Sphere Music Hub' : 'Imprint - Sphere Music Hub'} />
        <meta name="twitter:description" content={lang === 'de' ? 'Impressum von Sphere Music Hub. Angaben gemäß § 5 TMG: Joachim Gassmann – Musik- & Medienproduktion, Niederkassel.' : 'Imprint of Sphere Music Hub. Information according to § 5 TMG: Joachim Gassmann – Music & Media Production, Niederkassel.'} />
        <link rel="canonical" href="https://sphere-music-hub.com/impressum" />
      </Helmet>
      <Navigation />
      
      <main className="flex-1 bg-background">
        <div className="container py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Impressum</h1>
          
          <div className="space-y-8 max-w-4xl">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Angaben gemäß § 5 TMG</h2>
              <p className="text-foreground/80">
                Joachim Gassmann – Musik- & Medienproduktion<br />
                Agnes-Miegel-Str. 2<br />
                53859 Niederkassel
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Kontakt</h2>
              <p className="text-foreground/80">
                Telefon: 01715569140<br />
                E-Mail: info@sphere-music-hub.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Gewerbe</h2>
              <p className="text-foreground/80">
                Zuständige Behörde: Stadt Niederkassel – Gewerbeamt<br />
                Gemeindekennzahl: 05382 044
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Gegenstand des Unternehmens</h2>
              <p className="text-foreground/80">
                Produktion und Veröffentlichung digitaler Medieninhalte (Musik- und Videoproduktion), 
                Betrieb von YouTube-Kanälen, Online-Marketing und Werbedienstleistungen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">EU-Streitschlichtung</h2>
              <p className="text-foreground/80">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                .<br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Verbraucherstreitbeilegung</h2>
              <p className="text-foreground/80">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Haftung für Inhalte</h2>
              <p className="text-foreground/80 mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                Tätigkeit hinweisen.
              </p>
              <p className="text-foreground/80">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
                erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei 
                Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend 
                entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Haftung für Links</h2>
              <p className="text-foreground/80 mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                Seiten verantwortlich.
              </p>
              <p className="text-foreground/80">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete 
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von 
                Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Urheberrecht</h2>
              <p className="text-foreground/80 mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
              <p className="text-foreground/80">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die 
                Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung 
                aufmerksam werden, bitten wir um einen entsprechenden Hinweis.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
