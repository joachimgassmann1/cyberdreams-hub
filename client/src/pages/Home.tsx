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
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <html lang={lang} />
        <link rel="alternate" hrefLang="en" href="https://sphere-music-hub.com/" />
        <link rel="alternate" hrefLang="de" href="https://sphere-music-hub.de/" />
        <link rel="alternate" hrefLang="x-default" href="https://sphere-music-hub.com/" />
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
