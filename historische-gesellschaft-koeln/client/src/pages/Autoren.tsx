/*
 * Autoren – Monumentum Design
 * Übersicht aller Autoren der Buchreihe
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { autoren } from "@/lib/data";
import { User } from "lucide-react";

export default function Autoren() {
  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero py-20">
        <div className="container">
          <p
            className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Die Wissenschaftler
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Die Autoren
          </h1>
          <p
            className="text-gray-300 max-w-2xl text-lg leading-relaxed"
            style={{ fontFamily: "'Lora', serif" }}
          >
            International renommierte Historiker haben die Kölner Stadtgeschichte verfasst. 
            Jeder Band ist das Werk eines ausgewiesenen Experten für die jeweilige Epoche.
          </p>
        </div>
      </section>

      {/* Autoren-Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {autoren.map((autor) => (
              <Link
                key={autor.slug}
                href={`/autoren/${autor.slug}`}
                className="band-card group block p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-900 group-hover:text-red-700 transition-colors"
                      style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                    >
                      {autor.name}
                    </h3>
                    <p
                      className="text-red-700 text-xs font-semibold tracking-wider uppercase mt-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {autor.band}
                    </p>
                  </div>
                </div>
                <p
                  className="text-sm text-gray-600 leading-relaxed line-clamp-3"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {autor.beschreibung}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
