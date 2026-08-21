/**
 * Language detection and internationalization utilities
 * Automatically detects language based on domain:
 * - sphere-music-hub.de → German
 * - sphere-music-hub.com → English
 */

export type Language = 'en' | 'de';

/**
 * Detects the current language based on the hostname
 */
export function detectLanguage(): Language {
  // During Astro's static build, use the locale selected for the current
  // domain output. In the browser, the hostname remains the source of truth.
  if (typeof window === 'undefined') {
    return import.meta.env.VITE_SITE_LOCALE === 'de' ? 'de' : 'en';
  }
  
  const hostname = window.location.hostname;
  
  // Check if domain ends with .de
  if (hostname.endsWith('.de')) {
    return 'de';
  }
  
  // Default to English for .com and localhost
  return 'en';
}

/**
 * Hook to get current language
 */
export function useLanguage(): Language {
  return detectLanguage();
}

/**
 * Translation helper type
 */
export type Translation<T = string> = {
  en: T;
  de: T;
};

/**
 * Get translated text based on current language
 */
export function t<T = string>(translation: Translation<T>): T {
  const lang = detectLanguage();
  return translation[lang];
}
