/*
 * Kuratorium – Monumentum Design
 */
import Layout from "@/components/Layout";
import { kuratoriumsmitglieder } from "@/lib/data";
import { User } from "lucide-react";

export default function Kuratorium() {
  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero py-20">
        <div className="container">
          <p
            className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Führung
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Kuratorium
          </h1>
          <p
            className="text-gray-300 text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Das Kuratorium der Historischen Gesellschaft Köln e.V.
          </p>
        </div>
      </section>

      {/* Kuratorium */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <h2
            className="text-2xl font-bold text-gray-900 mb-10 section-title"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Mitglieder des Kuratoriums
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kuratoriumsmitglieder.map((mitglied, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 border-l-4 border-red-700">
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-gray-500" />
                </div>
                <div>
                  <h3
                    className="font-bold text-gray-900 mb-1"
                    style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                  >
                    {mitglied.name}
                  </h3>
                  <p
                    className="text-red-700 text-xs font-semibold tracking-wider uppercase"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {mitglied.funktion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
