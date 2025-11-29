import { Button } from "@/components/ui/button";
import { Music, Play } from "lucide-react";
import { detectLanguage } from "@/lib/i18n";

// Static data (updated manually as needed)
const STATS = {
  channels: 6,
  hours: 100,
  views: 50000,
  subscribers: 4157 // 2740 + 82 + 173 + 1160 + 0 + 2
};

export default function Hero() {
  const lang = detectLanguage();
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const scrollToChannels = () => {
    const element = document.querySelector("#music-channels");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.webp"
          alt="Modern workspace with city skyline at dusk - ambient music atmosphere for focus and productivity"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/90"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
              <Music className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent">
              Sphere Music Hub
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight bg-gradient-to-r from-cyan-100 via-white to-cyan-100 bg-clip-text text-transparent">
              {lang === 'de' ? 'Fokus, Chill & Ambient Musik' : 'Focus, Chill & Ambient Music Vibes'}
            </h2>
          </div>

          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            {lang === 'de' 
              ? 'Entspannende Chillout-Beats, Ambient-Vibes und Deep-Focus-Soundscapes, die dir helfen, zu entspannen, länger zu lernen und ruhig und produktiv zu bleiben.'
              : 'Relaxing chillout beats, ambient vibes, and deep focus soundscapes designed to help you unwind, study longer, and stay calm and productive.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-base md:text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-black font-semibold w-full sm:w-72"
              onClick={scrollToChannels}
            >
              <Play className="mr-2 h-5 w-5" />
{lang === 'de' ? 'Kanäle entdecken' : 'Explore Channels'}
            </Button>
            <Button
              size="lg"
              className="text-base md:text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-black font-semibold w-full sm:w-72"
              asChild
            >
              <a href="https://www.youtube.com/@deepfocussphere67" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
{lang === 'de' ? 'Auf YouTube abonnieren' : 'Subscribe on YouTube'}
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {STATS.channels}+
              </div>
              <div className="text-sm md:text-base text-foreground/60">{lang === 'de' ? 'Kanäle' : 'Channels'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {STATS.hours}+
              </div>
              <div className="text-sm md:text-base text-foreground/60">{lang === 'de' ? 'Stunden Musik' : 'Hours of Music'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {formatNumber(STATS.views)}+
              </div>
              <div className="text-sm md:text-base text-foreground/60">{lang === 'de' ? 'Aufrufe gesamt' : 'Total Views'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {formatNumber(STATS.subscribers)}+
              </div>
              <div className="text-sm md:text-base text-foreground/60">{lang === 'de' ? 'Abonnenten' : 'Subscribers'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
