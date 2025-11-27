import { useEffect, useRef, useState } from 'react';
import { useMusicPlayer } from '@/contexts/MusicPlayerContext';
import { X, Minimize2, Maximize2, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function MusicPlayer() {
  const {
    currentVideo,
    isPlaying,
    isMinimized,
    volume,
    pauseVideo,
    resumeVideo,
    closePlayer,
    toggleMinimize,
    setVolume,
    setPlayerReady,
  } = useMusicPlayer();

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show player with slide-in animation when video is loaded
  useEffect(() => {
    if (currentVideo) {
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [currentVideo]);

  // Initialize YouTube player
  useEffect(() => {
    if (!currentVideo) return;

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player('youtube-player', {
          height: '100%',
          width: '100%',
          videoId: currentVideo.id,
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
          },
          events: {
            onReady: (event: any) => {
              event.target.setVolume(volume);
              setPlayerReady(true);
            },
            onStateChange: (event: any) => {
              // Auto-play next video could be added here
            },
          },
        });
      }
    };

    if (window.YT) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [currentVideo, volume, setPlayerReady]);

  // Control playback
  useEffect(() => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  // Control volume
  useEffect(() => {
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(volume);
    }
  }, [volume]);

  const handleToggleMute = () => {
    if (isMuted) {
      setVolume(70);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  if (!currentVideo) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {isMinimized ? (
        /* Minimized State */
        <button
          onClick={toggleMinimize}
          className="group relative w-16 h-16 bg-card/95 backdrop-blur-lg border border-border rounded-full shadow-2xl hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            {isPlaying ? (
              <div className="flex gap-0.5">
                <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
            ) : (
              <Play className="w-6 h-6 text-primary" />
            )}
          </div>
        </button>
      ) : (
        /* Expanded State */
        <div className="w-80 bg-card/95 backdrop-blur-lg border border-border rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs font-semibold text-primary">NOW PLAYING</span>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMinimize}
                className="h-7 w-7 p-0 hover:bg-muted"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={closePlayer}
                className="h-7 w-7 p-0 hover:bg-destructive/20 hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Video Container (Hidden) */}
          <div className="hidden">
            <div id="youtube-player" />
          </div>

          {/* Video Info */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1">
                {currentVideo.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {currentVideo.channelName}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={isPlaying ? pauseVideo : resumeVideo}
                className="h-10 w-10 p-0 rounded-full hover:bg-primary/20"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

              {/* Volume Control */}
              <div className="flex items-center gap-2 flex-1 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleMute}
                  className="h-8 w-8 p-0"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Open on YouTube Link */}
            <a
              href={`https://www.youtube.com/watch?v=${currentVideo.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Open on YouTube ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
