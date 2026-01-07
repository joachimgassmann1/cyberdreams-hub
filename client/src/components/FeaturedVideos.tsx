import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { detectLanguage } from "@/lib/i18n";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";

// Static featured videos (updated manually as needed - last update: Nov 26, 2025)
const FEATURED_VIDEOS = [
  {
    id: "ZLV_qi22E40",
    title: "Post-Apocalyptic Cyborg | Immersive Dystopian Atmosphere for Coding",
    channelTitle: "Cyber Dreams",
  },
  {
    id: "XCh88UzbssA",
    title: "Chill Piano Escapes – Cozy Melodies to Unwind",
    channelTitle: "Pianosphere Radio",
  },
  {
    id: "Gu9dNvn5hfU",
    title: "Chill Beats for Sunset Vibes | Lounge & Relax Music",
    channelTitle: "Chillout Sphere",
  },
  {
    id: "WrUw5iL2J3A",
    title: "Deep Work Soundscape – Stay Focused for Hours with Cozy Office Vibes",
    channelTitle: "Deep Focus Sphere",
  },
  {
    id: "xPjrkMmZElw",
    title: "Deep Focus Vibes: The Ultimate Study Music Mix",
    channelTitle: "Deep Focus Sphere",
  },
  {
    id: "bA1JhbZD8UM",
    title: "Smooth Vocal Jazz | Midnight Lounge & Cozy City Nights",
    channelTitle: "JazzSphere Radio",
  },
];

export default function FeaturedVideos() {
  const lang = detectLanguage();
  const { playVideo } = useMusicPlayer();
  
  // Detect if user is on mobile device (including iPad/iPadOS)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS 13+
  
  const handleVideoClick = (video: typeof FEATURED_VIDEOS[0]) => {
    if (isMobile) {
      // On mobile, open YouTube directly in new tab
      window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
    } else {
      // On desktop, use embedded player
      playVideo({
        id: video.id,
        title: video.title,
        channelName: video.channelTitle,
      });
    }
  };
  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {lang === 'de' ? 'Ausgewählte' : 'Featured'}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {lang === 'de' ? 'Musik-Mixes' : 'Music Mixes'}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            {lang === 'de' 
              ? 'Entdecke unsere kuratierte Sammlung von Ambient-Soundscapes, Fokus-Musik und entspannenden Beats aus all unseren Kanälen.'
              : 'Explore our curated collection of ambient soundscapes, focus music, and relaxing beats from all our channels.'}
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURED_VIDEOS.map((video) => (
            <Card
              key={video.id}
              className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardContent className="p-0">
                {/* Video Thumbnail */}
                <div
                  onClick={() => handleVideoClick(video)}
                  className="block relative cursor-pointer"
                >
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={`${video.title} - ${video.channelTitle} YouTube video thumbnail`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                      }}
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {/* Dark overlay - only on desktop hover */}
                      <div className="absolute inset-0 bg-background/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Play button - always visible on touch, hover on desktop */}
                      <div className="relative opacity-0 md:group-hover:opacity-100 [@media(hover:none)]:opacity-100 p-4 rounded-full bg-primary md:group-hover:scale-110 transition-all duration-300">
                        <Play className="w-8 h-8 text-primary-foreground fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <div className="text-sm text-foreground/60">
                      <span>{video.channelTitle}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@deepfocussphere67/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium text-lg"
          >
            {lang === 'de' ? 'Alle Videos auf YouTube ansehen' : 'View All Videos on YouTube'}
            <Play className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
