/*
 * Dokumente – Monumentum Design
 */
import Layout from "@/components/Layout";
import { dokumente } from "@/lib/data";
import { FileText, Download } from "lucide-react";

export default function Dokumente() {
  return (
    <Layout>
      {/* Hero */}
      <section className="page-hero py-20">
        <div className="container">
          <p
            className="text-red-400 text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Downloads
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Dokumente
          </h1>
          <p
            className="text-gray-300 text-lg"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Protokolle, Satzungen und weitere Dokumente der Historischen Gesellschaft Köln
          </p>
        </div>
      </section>

      {/* Dokumente */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <h2
            className="text-2xl font-bold text-gray-900 mb-8 section-title"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Jahreshauptversammlungen & Satzung
          </h2>

          <div className="space-y-4">
            {dokumente.map((dok, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-5 border border-gray-200 hover:border-red-700 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-50 flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-red-700" />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors"
                      style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
                    >
                      {dok.titel}
                    </h3>
                    <p
                      className="text-sm text-gray-500 mt-1"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {dok.datum}
                      {dok.ort && ` · ${dok.ort}`}
                    </p>
                  </div>
                </div>
                <button
                  className="flex items-center gap-2 text-red-700 hover:text-red-800 transition-colors text-sm font-semibold"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                  onClick={() => alert("Das Dokument steht als PDF zum Download bereit.")}
                >
                  <Download size={16} />
                  PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
