import Navigation from "@/components/Navigation";

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
      <Navigation />
      <Hero />
      <Channels />
      <FeaturedVideos />
      <About />
      <Footer />
    </div>
  );
}
