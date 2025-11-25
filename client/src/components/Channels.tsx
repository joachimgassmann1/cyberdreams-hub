import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Music2, Radio, Guitar, Piano, Sparkles, Waves } from "lucide-react";
import { useEffect, useState } from "react";
import { getChannelStatistics, formatCount } from "@/lib/youtube";

const channels = [
  {
    id: "deep-focus",
    name: "Deep Focus Sphere",
    handle: "@DeepFocusSphere67",
    channelId: "UCNc7m60KRRtsFugFEPwgL4Q",
    description: "Focus, Relax & Study Music designed to help you work better, study longer and stay calm while staying productive.",
    image: "/channel-deep-focus-new.jpg",
    url: "https://www.youtube.com/@deepfocussphere67",
    icon: Music2,
    color: "from-primary to-primary/70",
  },
  {
    id: "chillout",
    name: "Chillout Sphere",
    handle: "@ChilloutSphere67",
    channelId: "UCz1te_MlsOdFvo86vJv16_A",
    description: "Chillout Lounge & Relaxing Music for peaceful moments, beach vibes, and sunset relaxation.",
    image: "/channel-chillout-new.jpg",
    url: "https://www.youtube.com/@ChilloutSphere67",
    icon: Waves,
    color: "from-accent to-accent/70",
  },
  {
    id: "cyber-dreams",
    name: "Cyber Dreams",
    handle: "@CyberDreams-x9p",
    channelId: "UCaSZ-ibhaSzxB-_PnfCVxFA",
    description: "Ambient Music & Futuristic Sounds for a journey into cyberpunk atmospheres and electronic soundscapes.",
    image: "/channel-cyber-new.jpg",
    url: "https://www.youtube.com/@CyberDreams-x9p",
    icon: Sparkles,
    color: "from-chart-2 to-chart-2/70",
  },
  {
    id: "jazz-sphere",
    name: "JazzSphere Radio",
    handle: "@JazzSphereRadio",
    channelId: "UCBKfJNITtV3Ubf_6uZb527w",
    description: "World of Smooth Jazz featuring elegant melodies and sophisticated rhythms for refined listening.",
    image: "/channel-jazz-new.jpg",
    url: "https://www.youtube.com/@JazzSphereRadio",
    icon: Radio,
    color: "from-chart-3 to-chart-3/70",
  },
  {
    id: "guitar-sphere",
    name: "Guitarsphere Radio",
    handle: "@GuitarsphereRadio",
    channelId: "UCrzRTjTXIcfNJUHPs9nzJzw",
    description: "The Sound of Guitar celebrating acoustic and electric guitar music across all genres.",
    image: "/channel-guitar-new.jpg",
    url: "https://www.youtube.com/@GuitarsphereRadio",
    icon: Guitar,
    color: "from-primary to-accent",
  },
  {
    id: "piano-sphere",
    name: "Pianosphere Radio",
    handle: "@PianosphereRadio",
    channelId: "UCeYqdPkQ6ZMZHLlbfkZ5qNw",
    description: "Beautiful piano compositions and ambient piano music for relaxation and contemplation.",
    image: "/channel-piano-new.jpg",
    url: "https://www.youtube.com/@PianosphereRadio",
    icon: Piano,
    color: "from-chart-4 to-chart-4/70",
  },
];

// Fallback subscriber counts for instant loading
const FALLBACK_SUBSCRIBERS: Record<string, string> = {
  "deep-focus": "650",
  "chillout": "720",
  "cyber-dreams": "890",
  "jazz-sphere": "540",
  "guitar-sphere": "610",
  "piano-sphere": "680",
};

export default function Channels() {
  const [subscriberCounts, setSubscriberCounts] = useState<Record<string, string>>(FALLBACK_SUBSCRIBERS);

  useEffect(() => {
    // Fetch subscriber counts asynchronously in the background
    const fetchSubscriberCounts = async () => {
      const counts: Record<string, string> = {};
      
      for (const channel of channels) {
        if (channel.channelId) {
          try {
            const stats = await getChannelStatistics(channel.channelId);
            if (stats) {
              counts[channel.id] = formatCount(stats.statistics.subscriberCount);
            }
          } catch (error) {
            console.error(`Error fetching stats for ${channel.name}:`, error);
            // Keep fallback value on error
          }
        }
      }
      
      // Only update if we got at least some data
      if (Object.keys(counts).length > 0) {
        setSubscriberCounts(prev => ({ ...prev, ...counts }));
      }
    };

    fetchSubscriberCounts();
  }, []);

  return (
    <section id="channels" className="py-20 md:py-32 bg-gradient-to-b from-background to-card/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Music Channels
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Each channel offers a unique sonic experience tailored to different moods, activities, and atmospheres.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const subscribers = subscriberCounts[channel.id] || "500";
            
            return (
              <Card
                key={channel.id}
                className="group overflow-hidden bg-card hover:bg-card/80 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Channel Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={channel.image}
                    alt={channel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent"></div>
                  
                  {/* Icon Overlay */}
                  <div className={`absolute top-4 right-4 p-3 rounded-full bg-gradient-to-br ${channel.color} shadow-lg`}>
                    <Icon className="w-6 h-6 text-background" />
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {channel.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/60">
                    {channel.handle} • {subscribers} subscribers
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-foreground/70 line-clamp-3">
                    {channel.description}
                  </p>
                </CardContent>

                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary group"
                    asChild
                  >
                    <a href={channel.url} target="_blank" rel="noopener noreferrer">
                      Visit Channel
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
