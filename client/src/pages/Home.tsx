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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Featured Music Videos",
            "description": "Curated collection of ambient soundscapes, focus music, and relaxing beats",
            "itemListElement": [
              {
                "@type": "VideoObject",
                "position": 1,
                "name": "CYBERPUNK CITYRAIN | Futuristic Ambiente Music",
                "description": "Immersive cyberpunk ambient music for deep focus and creative work",
                "thumbnailUrl": "https://i.ytimg.com/vi/Q2NIq7Qwogc/maxresdefault.jpg",
                "uploadDate": "2025-11-20",
                "contentUrl": "https://www.youtube.com/watch?v=Q2NIq7Qwogc",
                "embedUrl": "https://www.youtube.com/embed/Q2NIq7Qwogc"
              },
              {
                "@type": "VideoObject",
                "position": 2,
                "name": "Chill Piano Escapes – Cozy Melodies to Unwind",
                "description": "Relaxing piano music for calm moments and peaceful relaxation",
                "thumbnailUrl": "https://i.ytimg.com/vi/XCh88UzbssA/maxresdefault.jpg",
                "uploadDate": "2025-11-18",
                "contentUrl": "https://www.youtube.com/watch?v=XCh88UzbssA",
                "embedUrl": "https://www.youtube.com/embed/XCh88UzbssA"
              },
              {
                "@type": "VideoObject",
                "position": 3,
                "name": "Midnight Glow Terrace: Relaxing Lounge Beats for Ultimate Chill",
                "description": "Chillout lounge music for peaceful evenings and relaxation",
                "thumbnailUrl": "https://i.ytimg.com/vi/RJIdAEvb_dY/maxresdefault.jpg",
                "uploadDate": "2025-11-15",
                "contentUrl": "https://www.youtube.com/watch?v=RJIdAEvb_dY",
                "embedUrl": "https://www.youtube.com/embed/RJIdAEvb_dY"
              },
              {
                "@type": "VideoObject",
                "position": 4,
                "name": "Deep Focus | Calm Ambient Music for Work and Study",
                "description": "Ambient focus music for concentration, studying, and productive work",
                "thumbnailUrl": "https://i.ytimg.com/vi/uDbTU2pLCRs/maxresdefault.jpg",
                "uploadDate": "2025-11-12",
                "contentUrl": "https://www.youtube.com/watch?v=uDbTU2pLCRs",
                "embedUrl": "https://www.youtube.com/embed/uDbTU2pLCRs"
              },
              {
                "@type": "VideoObject",
                "position": 5,
                "name": "Deep Focus Vibes: The Ultimate Study Music Mix",
                "description": "Long-form ambient music for extended study sessions and deep work",
                "thumbnailUrl": "https://i.ytimg.com/vi/xPjrkMmZElw/maxresdefault.jpg",
                "uploadDate": "2025-11-10",
                "contentUrl": "https://www.youtube.com/watch?v=xPjrkMmZElw",
                "embedUrl": "https://www.youtube.com/embed/xPjrkMmZElw"
              },
              {
                "@type": "VideoObject",
                "position": 6,
                "name": "Smooth Vocal Jazz | Midnight Lounge & Cozy City Nights",
                "description": "Smooth jazz with vocals for sophisticated relaxation and elegant ambience",
                "thumbnailUrl": "https://i.ytimg.com/vi/bA1JhbZD8UM/maxresdefault.jpg",
                "uploadDate": "2025-11-08",
                "contentUrl": "https://www.youtube.com/watch?v=bA1JhbZD8UM",
                "embedUrl": "https://www.youtube.com/embed/bA1JhbZD8UM"
              }
            ]
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
