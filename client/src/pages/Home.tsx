import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Channels from "@/components/Channels";
import FeaturedVideos from "@/components/FeaturedVideos";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet-async';
import { detectLanguage } from '@/lib/i18n';

export default function Home() {
  const lang = detectLanguage();
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{lang === 'de' ? 'Sphere Music Hub | Entspannende, Chill, Ambient & Fokusmusik' : 'Sphere Music Hub | Relaxing, Chill, Ambient & Focus Music'}</title>
        <meta name="description" content={lang === 'de' ? 'Entspannende Musik, Chillmusik, Ambient-Soundscapes und tiefe Fokusmusik für Arbeit, Studium und Entspannung. Entdecke beruhigende Playlists und Fokus-Umgebungen bei Sphere Music Hub.' : 'Relaxing music, chill music, ambient soundscapes and deep focus music for work, study and relaxation. Discover calming playlists and focus environments at Sphere Music Hub.'} />
        <meta property="og:title" content={lang === 'de' ? 'Sphere Music Hub – Entspannende Ambient, Chillout & Fokusmusik' : 'Sphere Music Hub – Relaxing Ambient, Chillout & Focus Music'} />
        <meta property="og:description" content={lang === 'de' ? 'Erkunde entspannende Musik, Chillout-Beats, Ambient-Vibes und tiefe Fokus-Soundscapes für Produktivität, Ruhe und Lernsessions.' : 'Explore relaxing music, chillout beats, ambient vibes and deep focus soundscapes crafted for productivity, calmness and study sessions.'} />
        <meta name="twitter:title" content={lang === 'de' ? 'Sphere Music Hub – Entspannende Ambient, Chillout & Fokusmusik' : 'Sphere Music Hub – Relaxing Ambient, Chillout & Focus Music'} />
        <meta name="twitter:description" content={lang === 'de' ? 'Erkunde entspannende Musik, Chillout-Beats, Ambient-Vibes und tiefe Fokus-Soundscapes für Produktivität, Ruhe und Lernsessions.' : 'Explore relaxing music, chillout beats, ambient vibes and deep focus soundscapes crafted for productivity, calmness and study sessions.'} />
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
