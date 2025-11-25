import { Cache } from './cache';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

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
export async function getVideoStatistics(videoId: string) {
  const cacheKey = `yt_video_${videoId}`;
  
  // Check cache first
  const cached = Cache.get<any>(cacheKey);
  if (cached) return cached;
  
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=statistics&id=${videoId}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      console.error('Failed to fetch video statistics:', response.statusText);
      return null;
    }
    
    const data = await response.json();
    const result = data.items?.[0] || null;
    
    // Cache the result
    if (result) {
      Cache.set(cacheKey, result, CACHE_TTL);
    }
    
    return result;
  } catch (error) {
    console.error('Error fetching video statistics:', error);
    return null;
  }
}

/**
 * Fetch channel statistics from YouTube Data API
 */
export async function getChannelStatistics(channelId: string) {
  const cacheKey = `yt_channel_${channelId}`;
  
  // Check cache first
  const cached = Cache.get<any>(cacheKey);
  if (cached) return cached;
  
  try {
    const response = await fetch(
      `${BASE_URL}/channels?part=statistics&id=${channelId}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      console.error('Failed to fetch channel statistics:', response.statusText);
      return null;
    }
    
    const data = await response.json();
    const result = data.items?.[0] || null;
    
    // Cache the result
    if (result) {
      Cache.set(cacheKey, result, CACHE_TTL);
    }
    
    return result;
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
  const cacheKey = `yt_aggregated_${channelIds.join('_')}`;
  
  // Check cache first
  const cached = Cache.get<any>(cacheKey);
  if (cached) return cached;
  
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
    
    const result = {
      totalChannels: channelIds.length,
      totalSubscribers,
      totalHours: estimatedHours,
      totalViews,
    };
    
    // Cache the result
    Cache.set(cacheKey, result, CACHE_TTL);
    
    return result;
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
