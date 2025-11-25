import { Button } from "@/components/ui/button";
import { Music, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getAggregatedStats, formatCount, formatHours } from "@/lib/youtube";

// Channel IDs for all Sphere Music channels
const CHANNEL_IDS = [
  "UCNc7m60KRRtsFugFEPwgL4Q", // Deep Focus Sphere
  "UCz1te_MlsOdFvo86vJv16_A", // Chillout Sphere
  "UCaSZ-ibhaSzxB-_PnfCVxFA", // Cyber Dreams
  "UCBKfJNITtV3Ubf_6uZb527w", // JazzSphere Radio
  "UCrzRTjTXIcfNJUHPs9nzJzw", // Guitarsphere Radio
  "UCeYqdPkQ6ZMZHLlbfkZ5qNw", // Pianosphere Radio
];

export default function Hero() {
  const [stats, setStats] = useState({
    channels: 6,
    hours: 100,
    views: 50000,
    subscribers: 4000,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const aggregatedStats = await getAggregatedStats(CHANNEL_IDS);
        setStats({
          channels: aggregatedStats.totalChannels,
          hours: aggregatedStats.totalHours,
          views: aggregatedStats.totalViews,
          subscribers: aggregatedStats.totalSubscribers,
        });
      } catch (error) {
        console.error('Error fetching aggregated stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const scrollToChannels = () => {
    const element = document.querySelector("#channels");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Hero Background"
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            Your Space for Focus, Relax & Study
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover curated ambient soundscapes, deep focus music, and chillout beats designed to help you work better, study longer, and stay calm while staying productive.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-base md:text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={scrollToChannels}
            >
              <Play className="mr-2 h-5 w-5" />
              Explore Channels
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base md:text-lg px-8 py-6 border-primary/30 hover:bg-primary/10"
              asChild
            >
              <a href="https://www.youtube.com/@deepfocussphere67" target="_blank" rel="noopener noreferrer">
                Subscribe on YouTube
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {loading ? "..." : `${stats.channels}+`}
              </div>
              <div className="text-sm md:text-base text-foreground/60">Channels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {loading ? "..." : `${formatHours(stats.hours * 3600)}+`}
              </div>
              <div className="text-sm md:text-base text-foreground/60">Hours of Music</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {loading ? "..." : `${formatCount(stats.views)}+`}
              </div>
              <div className="text-sm md:text-base text-foreground/60">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {loading ? "..." : `${formatCount(stats.subscribers)}+`}
              </div>
              <div className="text-sm md:text-base text-foreground/60">Subscribers</div>
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
