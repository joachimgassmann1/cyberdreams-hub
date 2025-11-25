/**
 * Simple localStorage cache with TTL (Time To Live)
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // in milliseconds
}

export class Cache {
  /**
   * Set a cache entry with TTL
   * @param key Cache key
   * @param data Data to cache
   * @param ttl Time to live in milliseconds (default: 10 minutes)
   */
  static set<T>(key: string, data: T, ttl: number = 10 * 60 * 1000): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    
    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.error('Failed to set cache:', error);
    }
  }

  /**
   * Get a cache entry if it exists and is not expired
   * @param key Cache key
   * @returns Cached data or null if not found or expired
   */
  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);
      const now = Date.now();

      // Check if cache is expired
      if (now - entry.timestamp > entry.ttl) {
        localStorage.removeItem(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error('Failed to get cache:', error);
      return null;
    }
  }

  /**
   * Clear a specific cache entry
   * @param key Cache key
   */
  static clear(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  /**
   * Clear all cache entries with a specific prefix
   * @param prefix Cache key prefix
   */
  static clearPrefix(prefix: string): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear cache prefix:', error);
    }
  }
}
