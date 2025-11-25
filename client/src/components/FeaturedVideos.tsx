import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getLatestVideosFromDifferentChannels, getVideoStatistics, formatCount } from "@/lib/youtube";

// Channel IDs for all Sphere Music channels
const CHANNEL_IDS = [
  "UCNc7m60KRRtsFugFEPwgL4Q", // Deep Focus Sphere
  "UCz1te_MlsOdFvo86vJv16_A", // Chillout Sphere
  "UCaSZ-ibhaSzxB-_PnfCVxFA", // Cyber Dreams
  "UCBKfJNITtV3Ubf_6uZb527w", // JazzSphere Radio
  "UCrzRTjTXIcfNJUHPs9nzJzw", // Guitarsphere Radio
  "UCeYqdPkQ6ZMZHLlbfkZ5qNw", // Pianosphere Radio
];

// Fallback videos when API is not available
const FALLBACK_VIDEOS = [
  {
    id: "bsUsjirLjG4",
    title: "Unlock Deep Focus | Ambient Sounds for Nighttime Study & Intense Work",
    channelTitle: "Deep Focus Sphere",
    viewCount: "163",
  },
  {
    id: "B2g2msoQsHA",
    title: "Velvet Night Lounge | Smooth Chillout & Relaxing Music",
    channelTitle: "Chillout Sphere",
    viewCount: "3",
  },
  {
    id: "Q2NIq7Qwogc",
    title: "CYBERPUNK CITYRAIN | Futuristic Ambiente Music",
    channelTitle: "Cyber Dreams",
    viewCount: "29",
  },
];

interface FeaturedVideo {
  id: string;
  title: string;
  channelTitle: string;
  viewCount: string;
}

export default function FeaturedVideos() {
  const [videos, setVideos] = useState<FeaturedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestVideos = async () => {
      try {
        // Get latest videos from different channels
        const latestVideos = await getLatestVideosFromDifferentChannels(CHANNEL_IDS);
        
        // If API returned videos, fetch their stats
        if (latestVideos && latestVideos.length > 0) {
          const videosWithStats = await Promise.all(
            latestVideos.map(async (video: any) => {
              const stats = await getVideoStatistics(video.id);
              return {
                id: video.id,
                title: video.title,
                channelTitle: video.channelTitle,
                viewCount: stats ? formatCount(stats.statistics.viewCount) : "...",
              };
            })
          );
          
          setVideos(videosWithStats);
        } else {
          // Fallback to default videos if API fails
          setVideos(FALLBACK_VIDEOS);
        }
      } catch (error) {
        console.error('Error fetching latest videos, using fallback:', error);
        // Use fallback videos when API is not available
        setVideos(FALLBACK_VIDEOS);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideos();
  }, []);

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
          {loading ? (
            // Loading skeleton
            [1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden bg-card border-border">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-2/3 animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            videos.map((video) => (
              <Card
                key={video.id}
                className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardContent className="p-0">
                  {/* Video Thumbnail */}
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative"
                  >
                    <div className="relative aspect-video bg-muted overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
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
                        <span>{video.channelTitle}</span>
                        <span>{video.viewCount} views</span>
                      </div>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))
          )}
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
