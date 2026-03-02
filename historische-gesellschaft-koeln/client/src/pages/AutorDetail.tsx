/*
 * Autor-Detail – Monumentum Design
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, User } from "lucide-react";
import Layout from "@/components/Layout";
import { autoren, baende } from "@/lib/data";
import NotFound from "./NotFound";

export default function AutorDetail() {
  const { slug } = useParams<{ slug: string }>();
  const autor = autoren.find((a) => a.slug === slug);

  if (!autor) return <NotFound />;

  // Finde zugehörige Bände
  const zugehoerigeBaende = baende.filter((b) => b.autor === autor.name);

  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero py-16">
        <div className="container">
          <Link
            href="/autoren"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors w-fit"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <ArrowLeft size={14} /> Alle Autoren
          </Link>
          <p
            className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Der Autor
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            {autor.name}
          </h1>
          <p
            className="text-red-400 text-sm font-semibold tracking-wider uppercase"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {autor.band}
          </p>
        </div>
      </section>

      {/* Inhalt */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2
                className="text-2xl font-bold text-gray-900 mb-6 section-title"
                style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
              >
                Lebenslauf
              </h2>
              <p
                className="text-gray-700 leading-relaxed text-lg mb-6"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {autor.lebenslauf}
              </p>
            </div>

            <div>
              <div className="bg-gray-50 p-6 mb-6">
                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mx-auto mb-4">
                  <User size={36} className="text-gray-400" />
                </div>
                <h3
                  className="text-center font-bold text-gray-900 mb-1"
                  style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                >
                  {autor.name}
                </h3>
                <p
                  className="text-center text-red-700 text-xs font-semibold tracking-wider uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {autor.band}
                </p>
              </div>

              {zugehoerigeBaende.length > 0 && (
                <div className="bg-gray-50 p-6">
                  <h3
                    className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-4"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Verfasste Bände
                  </h3>
                  {zugehoerigeBaende.map((band) => (
                    <Link
                      key={band.nummer}
                      href={`/band/${band.slug}`}
                      className="block p-3 border border-gray-200 hover:border-red-700 hover:text-red-700 transition-colors mb-2"
                    >
                      <p
                        className="text-xs text-red-700 font-semibold uppercase tracking-wider mb-1"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Band {band.nummer}
                      </p>
                      <p
                        className="text-sm text-gray-800"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {band.titel}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
