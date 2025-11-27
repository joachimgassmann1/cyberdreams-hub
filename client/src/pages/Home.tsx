import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Channels from "@/components/Channels";
import FeaturedVideos from "@/components/FeaturedVideos";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet-async';

export default function Home() {
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Sphere Music Hub | Relaxing, Chill, Ambient & Focus Music</title>
        <meta name="description" content="Relaxing music, chill music, ambient soundscapes and deep focus music for work, study and relaxation. Discover calming playlists and focus environments at Sphere Music Hub." />
        <meta property="og:title" content="Sphere Music Hub – Relaxing Ambient, Chillout & Focus Music" />
        <meta property="og:description" content="Explore relaxing music, chillout beats, ambient vibes and deep focus soundscapes crafted for productivity, calmness and study sessions." />
        <meta name="twitter:title" content="Sphere Music Hub – Relaxing Ambient, Chillout & Focus Music" />
        <meta name="twitter:description" content="Explore relaxing music, chillout beats, ambient vibes and deep focus soundscapes crafted for productivity, calmness and study sessions." />
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
