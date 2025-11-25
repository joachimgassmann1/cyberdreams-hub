import { describe, it, expect } from 'vitest';

describe('YouTube API Key Validation', () => {
  it('should have YouTube API key configured', () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).not.toBe('');
    expect(apiKey).toMatch(/^AIza/); // YouTube API keys start with AIza
  });

  it('should successfully fetch channel data from YouTube API', async () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const channelId = 'UCNc7m60KRRtsFugFEPwgL4Q'; // Deep Focus Sphere channel
    
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
    );
    
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.items).toBeDefined();
    expect(data.items.length).toBeGreaterThan(0);
  });

  it('should successfully fetch video statistics from YouTube API', async () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const videoId = 'bsUsjirLjG4'; // One of the featured videos
    
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`
    );
    
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.items).toBeDefined();
    expect(data.items.length).toBeGreaterThan(0);
    expect(data.items[0].statistics).toBeDefined();
    expect(data.items[0].statistics.viewCount).toBeDefined();
  });
});
