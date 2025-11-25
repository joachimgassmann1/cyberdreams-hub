const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  commentCount: string;
}

export interface ChannelStatistics {
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

export interface VideoData {
  id: string;
  title: string;
  statistics: VideoStatistics;
}

export interface ChannelData {
  id: string;
  title: string;
  statistics: ChannelStatistics;
}

/**
 * Fetch video statistics from YouTube Data API
 */
export async function getVideoStatistics(videoId: string): Promise<VideoData | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      console.error('Failed to fetch video statistics:', response.statusText);
      return null;
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.error('No video found with ID:', videoId);
      return null;
    }
    
    const video = data.items[0];
    return {
      id: video.id,
      title: video.snippet.title,
      statistics: video.statistics,
    };
  } catch (error) {
    console.error('Error fetching video statistics:', error);
    return null;
  }
}

/**
 * Fetch channel statistics from YouTube Data API
 */
export async function getChannelStatistics(channelId: string): Promise<ChannelData | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      console.error('Failed to fetch channel statistics:', response.statusText);
      return null;
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.error('No channel found with ID:', channelId);
      return null;
    }
    
    const channel = data.items[0];
    return {
      id: channel.id,
      title: channel.snippet.title,
      statistics: channel.statistics,
    };
  } catch (error) {
    console.error('Error fetching channel statistics:', error);
    return null;
  }
}

/**
 * Format large numbers with K/M suffix
 */
export function formatCount(count: string | number): string {
  const num = typeof count === 'string' ? parseInt(count, 10) : count;
  
  if (isNaN(num)) return '0';
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  
  return num.toString();
}

/**
 * Get channel ID from handle/username using search API
 */
export async function getChannelIdFromHandle(handle: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      console.error('Failed to search for channel:', response.statusText);
      return null;
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.error('No channel found with handle:', handle);
      return null;
    }
    
    return data.items[0].id.channelId;
  } catch (error) {
    console.error('Error searching for channel:', error);
    return null;
  }
}
