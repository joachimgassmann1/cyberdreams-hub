import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

const featuredVideos = [
  {
    id: "1",
    title: "Unlock Deep Focus | Ambient Sounds for Nighttime Study & Intense Work",
    videoId: "uDbTU2pLCRs",
    views: "5.2K",
    channel: "Deep Focus Sphere",
  },
  {
    id: "2",
    title: "Velvet Night Lounge | Smooth Chillout & Relaxing Music",
    videoId: "dQw4w9WgXcQ",
    views: "1.2K",
    channel: "Chillout Sphere",
  },
  {
    id: "3",
    title: "Cyber Dreams | Futuristic Ambient Soundscapes",
    videoId: "dQw4w9WgXcQ",
    views: "850",
    channel: "Cyber Dreams",
  },
];

export default function FeaturedVideos() {
  return (
    <section className="py-20 md:py-32 bg-card/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Music Mixes
            </span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Dive into our most popular ambient soundscapes and focus music collections.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredVideos.map((video) => (
            <Card
              key={video.id}
              className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardContent className="p-0">
                {/* Video Thumbnail */}
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                >
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                      }}
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-4 rounded-full bg-primary group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary-foreground fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-foreground/60">
                      <span>{video.channel}</span>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </a>
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
            View All Videos on YouTube
            <Play className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
