import Navigation from "@/components/Navigation";
import { Helmet } from 'react-helmet-async';
import { detectLanguage } from '@/lib/i18n';
import Hero from "@/components/Hero";
import Channels from "@/components/Channels";
import FeaturedVideos from "@/components/FeaturedVideos";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  const lang = detectLanguage();
  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'sphere-music-hub.com';
  const baseDomain = currentDomain.includes('sphere-music-hub.de') ? 'sphere-music-hub.de' : 'sphere-music-hub.com';
  
  const title = lang === 'de' 
    ? 'Sphere Music Hub – Fokus, Chill & Ambient Musik | Entspannungsmusik & Lernmusik'
    : 'Sphere Music Hub – Focus, Chill & Ambient Music | Relaxation & Study Music';
  
  const description = lang === 'de'
    ? 'Entdecke entspannende Chillout-Beats, Ambient-Vibes und Deep-Focus-Soundscapes. Perfekt zum Lernen, Arbeiten und Entspannen. Kostenlose Musik-Kanäle für Fokus, Konzentration und Produktivität.'
    : 'Discover relaxing chillout beats, ambient vibes, and deep focus soundscapes. Perfect for studying, working, and unwinding. Free music channels for focus, concentration, and productivity.';
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <html lang={lang} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://${baseDomain}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://${baseDomain}/hero-bg.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`https://${baseDomain}/hero-bg.webp`} />
        <link rel="canonical" href={`https://${baseDomain}/`} />
        <link rel="alternate" hrefLang="en" href="https://sphere-music-hub.com/" />
        <link rel="alternate" hrefLang="de" href="https://sphere-music-hub.de/" />
        <link rel="alternate" hrefLang="x-default" href="https://sphere-music-hub.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sphere Music Hub",
            "url": `https://${baseDomain}/`,
            "logo": `https://${baseDomain}/logo.svg`,
            "description": description,
            "sameAs": [
              "https://www.youtube.com/@deepfocussphere67",
              "https://www.youtube.com/@ChilloutSphere67",
              "https://www.youtube.com/@CyberDreams-x9p",
              "https://www.youtube.com/@JazzSphereRadio",
              "https://facebook.com/profile.php?id=61580223927048"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Sphere Music Hub",
            "url": `https://${baseDomain}/`,
            "description": description,
            "inLanguage": lang
          })}
        </script>
      </Helmet>
      <Navigation />
      <Hero />
      <Channels />
      <FeaturedVideos />
      <About />
      <Footer />
    </div>
  );
}
