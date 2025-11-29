import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Music2, Radio, Guitar, Piano, Sparkles, Waves, Play } from "lucide-react";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { detectLanguage } from "@/lib/i18n";

// Static subscriber counts (updated manually as needed - last update: Nov 25, 2025)
const SUBSCRIBER_COUNTS: Record<string, string> = {
  "UCWJCgh3eJ_mILLwZ4--snpA": "2.7K",  // Deep Focus Sphere
  "UCuQPvy0FcB8EG5kKpvZfUjw": "82",     // Chillout Sphere
  "UCnLlBi5GoE7YFQHB-KmKe2Q": "173",    // Cyber Dreams
  "UC7JVkI8IrHqYxg4LB9jPVhg": "1.2K",   // JazzSphere Radio
  "UCiN4bH-VKz1YMvvYnRJXwOw": "0",      // Guitarsphere Radio (empty channel)
  "UCZlHnzC_oYrU9zJGxJQYbSw": "2"       // Pianosphere Radio
};

// Latest featured video from each channel (updated manually as needed - last update: Nov 27, 2025)
const CHANNEL_FEATURED_VIDEOS: Record<string, string> = {
  "UCWJCgh3eJ_mILLwZ4--snpA": "uDbTU2pLCRs",  // Deep Focus Sphere - Deep Focus | Calm Ambient Music
  "UCuQPvy0FcB8EG5kKpvZfUjw": "RJIdAEvb_dY",  // Chillout Sphere - Midnight Glow Terrace
  "UCnLlBi5GoE7YFQHB-KmKe2Q": "Q2NIq7Qwogc",  // Cyber Dreams - CYBERPUNK CITYRAIN
  "UC7JVkI8IrHqYxg4LB9jPVhg": "bA1JhbZD8UM",  // JazzSphere Radio - Smooth Vocal Jazz
  "UCiN4bH-VKz1YMvvYnRJXwOw": "uDbTU2pLCRs",  // Guitarsphere Radio (placeholder - use Deep Focus)
  "UCZlHnzC_oYrU9zJGxJQYbSw": "XCh88UzbssA"   // Pianosphere Radio - Chill Piano Escapes
};

const getChannels = (lang: 'en' | 'de') => [
  {
    id: "deep-focus",
    name: "Deep Focus Sphere",
    handle: "@DeepFocusSphere67",
    channelId: "UCWJCgh3eJ_mILLwZ4--snpA",
    description: lang === 'de'
      ? "Fokus-, Entspannungs- & Lernmusik, die dir hilft, besser zu arbeiten, länger zu lernen und ruhig und produktiv zu bleiben."
      : "Focus, Relax & Study Music designed to help you work better, study longer and stay calm while staying productive.",
    image: "/channel-deep-focus-new.webp",
    url: "https://www.youtube.com/@deepfocussphere67",
    icon: Music2,
    color: "from-primary to-primary/70",
  },
  {
    id: "chillout",
    name: "Chillout Sphere",
    handle: "@ChilloutSphere67",
    channelId: "UCuQPvy0FcB8EG5kKpvZfUjw",
    description: lang === 'de'
      ? "Chillout Lounge & Entspannungsmusik für friedliche Momente, Strand-Vibes und Sonnenuntergangs-Entspannung."
      : "Chillout Lounge & Relaxing Music for peaceful moments, beach vibes, and sunset relaxation.",
    image: "/channel-chillout-new.webp",
    url: "https://www.youtube.com/@ChilloutSphere67",
    icon: Waves,
    color: "from-accent to-accent/70",
  },
  {
    id: "cyber-dreams",
    name: "Cyber Dreams",
    handle: "@CyberDreams-x9p",
    channelId: "UCnLlBi5GoE7YFQHB-KmKe2Q",
    description: lang === 'de'
      ? "Ambient-Musik & Futuristische Klänge für eine Reise in Cyberpunk-Atmosphären und elektronische Soundscapes."
      : "Ambient Music & Futuristic Sounds for a journey into cyberpunk atmospheres and electronic soundscapes.",
    image: "/channel-cyber-new.webp",
    url: "https://www.youtube.com/@CyberDreams-x9p",
    icon: Sparkles,
    color: "from-chart-2 to-chart-2/70",
  },
  {
    id: "jazz-sphere",
    name: "JazzSphere Radio",
    handle: "@JazzSphereRadio",
    channelId: "UC7JVkI8IrHqYxg4LB9jPVhg",
    description: lang === 'de'
      ? "Welt des Smooth Jazz mit eleganten Melodien und raffinierten Rhythmen für anspruchsvolles Hören."
      : "World of Smooth Jazz featuring elegant melodies and sophisticated rhythms for refined listening.",
    image: "/channel-jazz-new.webp",
    url: "https://www.youtube.com/@JazzSphereRadio",
    icon: Radio,
    color: "from-chart-3 to-chart-3/70",
  },
  {
    id: "guitar-sphere",
    name: "Guitarsphere Radio",
    handle: "@GuitarsphereRadio",
    channelId: "UCiN4bH-VKz1YMvvYnRJXwOw",
    description: lang === 'de'
      ? "Der Klang der Gitarre mit chilliger und gefühlvoller Gitarrenmusik für Entspannung und Kontemplation."
      : "The Sound of Guitar with chill and soulful guitar music for relaxation and contemplation.",
    image: "/channel-guitar-new.webp",
    url: "https://www.youtube.com/@GuitarsphereRadio",
    icon: Guitar,
    color: "from-chart-4 to-chart-4/70",
  },
  {
    id: "piano-sphere",
    name: "Pianosphere Radio",
    handle: "@PianosphereRadio",
    channelId: "UCZlHnzC_oYrU9zJGxJQYbSw",
    description: lang === 'de'
      ? "Wunderschönes Klavier - Jazz-Piano - Emotionale Balladen für Momente des Friedens und der Innenschau."
      : "Beautiful Piano - Jazz Piano - Emotional Ballads for moments of peace and introspection.",
    image: "/channel-piano-new.webp",
    url: "https://www.youtube.com/@PianosphereRadio",
    icon: Piano,
    color: "from-chart-5 to-chart-5/70",
  },
];

export default function Channels() {
  const lang = detectLanguage();
  const channels = getChannels(lang);
  const { playVideo } = useMusicPlayer();
  
  // Detect if user is on mobile device (including iPad/iPadOS)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS 13+
  
  const handlePlayClick = (channel: typeof channels[0]) => {
    // Open YouTube channel page (not individual video)
    window.open(channel.url, '_blank');
  };
  return (
    <section id="music-channels" className="pt-28 pb-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {lang === 'de' ? 'Entdecke unsere Musikkanäle' : 'Explore Our Music Channels'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {lang === 'de' 
              ? 'Jeder Kanal bietet ein einzigartiges Klangerlebnis, zugeschnitten auf verschiedene Stimmungen, Aktivitäten und Atmosphären.'
              : 'Each channel offers a unique sonic experience tailored to different moods, activities, and atmospheres.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const subscribers = SUBSCRIBER_COUNTS[channel.channelId] || "0";
            
            return (
              <Card key={channel.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-card border-border flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden">
                  <img
                    src={channel.image.replace('.webp', '-700.webp')}
                    srcSet={`${channel.image.replace('.webp', '-400.webp')} 400w, ${channel.image.replace('.webp', '-700.webp')} 700w`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={`${channel.name} - ${channel.description}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                  />
                  {/* Bright overlay to lighten images */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-white/10 to-transparent pointer-events-none" />
                  <div className="absolute top-4 right-4 p-3 rounded-full bg-background/80 backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground">{channel.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{channel.handle}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">{channel.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-primary">{subscribers}</span>
                    <span className="text-muted-foreground">subscribers</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={() => handlePlayClick(channel)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {lang === 'de' ? 'Zum Kanal' : 'Visit Channel'}
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
