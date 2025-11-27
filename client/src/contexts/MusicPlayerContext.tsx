import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface Video {
  id: string;
  title: string;
  channelName: string;
  thumbnail?: string;
}

interface MusicPlayerContextType {
  currentVideo: Video | null;
  isPlaying: boolean;
  isMinimized: boolean;
  isPlayerReady: boolean;
  volume: number;
  playVideo: (video: Video) => void;
  pauseVideo: () => void;
  resumeVideo: () => void;
  closePlayer: () => void;
  toggleMinimize: () => void;
  setVolume: (volume: number) => void;
  setPlayerReady: (ready: boolean) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlayerReady, setPlayerReady] = useState(false);
  const [volume, setVolumeState] = useState(70); // Default 70%

  // Load YouTube IFrame API when first video is played
  useEffect(() => {
    if (currentVideo && !window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, [currentVideo]);

  const playVideo = useCallback((video: Video) => {
    setCurrentVideo(video);
    setIsPlaying(true);
    setIsMinimized(false);
  }, []);

  const pauseVideo = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resumeVideo = useCallback(() => {
    if (currentVideo) {
      setIsPlaying(true);
    }
  }, [currentVideo]);

  const closePlayer = useCallback(() => {
    setCurrentVideo(null);
    setIsPlaying(false);
    setIsMinimized(false);
  }, []);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(100, newVolume)));
  }, []);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentVideo,
        isPlaying,
        isMinimized,
        isPlayerReady,
        volume,
        playVideo,
        pauseVideo,
        resumeVideo,
        closePlayer,
        toggleMinimize,
        setVolume,
        setPlayerReady,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
}

// Extend Window interface for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
