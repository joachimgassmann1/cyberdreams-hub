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

/**
 * Get all videos from a channel
 */
export async function getChannelVideos(channelId: string, maxResults: number = 50): Promise<string[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=id&channelId=${channelId}&type=video&maxResults=${maxResults}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      console.error('Failed to fetch channel videos:', response.statusText);
      return [];
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return [];
    }
    
    return data.items.map((item: any) => item.id.videoId);
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    return [];
  }
}

/**
 * Get total duration of videos in seconds
 */
export async function getVideosDuration(videoIds: string[]): Promise<number> {
  if (videoIds.length === 0) return 0;
  
  try {
    // YouTube API allows up to 50 video IDs per request
    const chunks = [];
    for (let i = 0; i < videoIds.length; i += 50) {
      chunks.push(videoIds.slice(i, i + 50));
    }
    
    let totalSeconds = 0;
    
    for (const chunk of chunks) {
      const response = await fetch(
        `${BASE_URL}/videos?part=contentDetails&id=${chunk.join(',')}&key=${API_KEY}`
      );
      
      if (!response.ok) {
        console.error('Failed to fetch video durations:', response.statusText);
        continue;
      }
      
      const data = await response.json();
      
      if (data.items) {
        for (const video of data.items) {
          const duration = video.contentDetails.duration;
          totalSeconds += parseDuration(duration);
        }
      }
    }
    
    return totalSeconds;
  } catch (error) {
    console.error('Error fetching video durations:', error);
    return 0;
  }
}

/**
 * Parse ISO 8601 duration to seconds
 * Example: PT1H2M10S = 1 hour, 2 minutes, 10 seconds = 3730 seconds
 */
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Format seconds to hours
 */
export function formatHours(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  
  if (hours >= 1000) {
    return (hours / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  
  return hours.toString();
}

/**
 * Get aggregated statistics for multiple channels
 * Optimized to only fetch subscriber counts, not video durations
 */
export async function getAggregatedStats(channelIds: string[]) {
  let totalSubscribers = 0;
  let totalVideoCount = 0;
  
  // Fetch all channels in a single API call (up to 50 channels)
  try {
    const response = await fetch(
      `${BASE_URL}/channels?part=statistics&id=${channelIds.join(',')}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      console.error('Failed to fetch aggregated channel statistics:', response.statusText);
      // Return fallback values
      return {
        totalChannels: channelIds.length,
        totalSubscribers: 4100,
        totalHours: 100,
        totalViews: 50000,
      };
    }
    
    const data = await response.json();
    
    let totalViews = 0;
    
    if (data.items) {
      for (const channel of data.items) {
        totalSubscribers += parseInt(channel.statistics.subscriberCount || '0', 10);
        totalVideoCount += parseInt(channel.statistics.videoCount || '0', 10);
        totalViews += parseInt(channel.statistics.viewCount || '0', 10);
      }
    }
    
    // Estimate hours based on average video length (assume 30 min per video)
    const estimatedHours = Math.floor((totalVideoCount * 30) / 60);
    
    return {
      totalChannels: channelIds.length,
      totalSubscribers,
      totalHours: estimatedHours,
      totalViews,
    };
  } catch (error) {
    console.error('Error fetching aggregated stats:', error);
    // Return fallback values
    return {
      totalChannels: channelIds.length,
      totalSubscribers: 4100,
      totalHours: 100,
      totalViews: 50000,
    };
  }
}
