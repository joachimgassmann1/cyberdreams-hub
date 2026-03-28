import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <section className="page-hero py-32">
        <div className="container text-center">
          <p
            className="text-red-400 text-8xl font-bold mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            404
          </p>
          <h1
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
          >
            Seite nicht gefunden
          </h1>
          <p
            className="text-gray-300 mb-8"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Die gesuchte Seite existiert leider nicht.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Zur Startseite
          </Link>
        </div>
      </section>
    </Layout>
  );
}
