import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Music2, Radio, Guitar, Piano, Sparkles, Waves } from "lucide-react";

// Static subscriber counts (updated manually as needed - last update: Nov 25, 2025)
const SUBSCRIBER_COUNTS: Record<string, string> = {
  "UCWJCgh3eJ_mILLwZ4--snpA": "2.7K",  // Deep Focus Sphere
  "UCuQPvy0FcB8EG5kKpvZfUjw": "82",     // Chillout Sphere
  "UCnLlBi5GoE7YFQHB-KmKe2Q": "173",    // Cyber Dreams
  "UC7JVkI8IrHqYxg4LB9jPVhg": "1.2K",   // JazzSphere Radio
  "UCiN4bH-VKz1YMvvYnRJXwOw": "0",      // Guitarsphere Radio (empty channel)
  "UCZlHnzC_oYrU9zJGxJQYbSw": "2"       // Pianosphere Radio
};

const channels = [
  {
    id: "deep-focus",
    name: "Deep Focus Sphere",
    handle: "@DeepFocusSphere67",
    channelId: "UCWJCgh3eJ_mILLwZ4--snpA",
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
    channelId: "UCuQPvy0FcB8EG5kKpvZfUjw",
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
    channelId: "UCnLlBi5GoE7YFQHB-KmKe2Q",
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
    channelId: "UC7JVkI8IrHqYxg4LB9jPVhg",
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
    channelId: "UCiN4bH-VKz1YMvvYnRJXwOw",
    description: "The Sound of Guitar with chill and soulful guitar music for relaxation and contemplation.",
    image: "/channel-guitar-new.jpg",
    url: "https://www.youtube.com/@GuitarsphereRadio",
    icon: Guitar,
    color: "from-chart-4 to-chart-4/70",
  },
  {
    id: "piano-sphere",
    name: "Pianosphere Radio",
    handle: "@PianosphereRadio",
    channelId: "UCZlHnzC_oYrU9zJGxJQYbSw",
    description: "Beautiful Piano - Jazz Piano - Emotional Ballads for moments of peace and introspection.",
    image: "/channel-piano-new.jpg",
    url: "https://www.youtube.com/@PianosphereRadio",
    icon: Piano,
    color: "from-chart-5 to-chart-5/70",
  },
];

export default function Channels() {
  return (
    <section id="channels" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Explore Our Music Channels
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each channel offers a unique sonic experience tailored to different moods, activities, and atmospheres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const subscribers = SUBSCRIBER_COUNTS[channel.channelId] || "0";
            
            return (
              <Card key={channel.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-card border-border">
                  <div className="relative h-48 overflow-hidden">
                  <img
                    src={channel.image}
                    alt={channel.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 p-3 rounded-full bg-background/80 backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">{channel.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{channel.handle}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{channel.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-primary">{subscribers}</span>
                    <span className="text-muted-foreground">subscribers</span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/30 hover:bg-primary/10"
                    asChild
                  >
                    <a href={channel.url} target="_blank" rel="noopener noreferrer">
                      Visit Channel
                      <ExternalLink className="ml-2 h-4 w-4" />
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
