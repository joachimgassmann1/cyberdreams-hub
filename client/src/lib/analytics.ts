/**
 * Google Analytics 4 Event Tracking Utility
 * 
 * This file provides type-safe functions to track custom events in GA4.
 * Events will appear in Google Analytics under Reports → Engagement → Events
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

/**
 * Check if Google Analytics is loaded and user has consented
 */
function isAnalyticsAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/**
 * Track when a user clicks on a YouTube video
 */
export function trackVideoClick(videoId: string, videoTitle: string, channelName: string) {
  if (!isAnalyticsAvailable()) return;
  
  window.gtag!('event', 'video_click', {
    video_id: videoId,
    video_title: videoTitle,
    channel_name: channelName,
    event_category: 'engagement',
    event_label: `${channelName} - ${videoTitle}`
  });
}

/**
 * Track when a user clicks on a channel card
 */
export function trackChannelClick(channelName: string, channelUrl: string) {
  if (!isAnalyticsAvailable()) return;
  
  window.gtag!('event', 'channel_click', {
    channel_name: channelName,
    channel_url: channelUrl,
    event_category: 'engagement',
    event_label: channelName
  });
}

/**
 * Track when a user views a blog article
 */
export function trackBlogArticleView(articleSlug: string, articleTitle: string, category: string) {
  if (!isAnalyticsAvailable()) return;
  
  window.gtag!('event', 'blog_article_view', {
    article_slug: articleSlug,
    article_title: articleTitle,
    article_category: category,
    event_category: 'content',
    event_label: articleTitle
  });
}

/**
 * Track when a user clicks a social share button
 */
export function trackSocialShare(platform: string, articleTitle: string, articleSlug: string) {
  if (!isAnalyticsAvailable()) return;
  
  window.gtag!('event', 'social_share', {
    platform: platform,
    article_title: articleTitle,
    article_slug: articleSlug,
    event_category: 'engagement',
    event_label: `${platform} - ${articleTitle}`
  });
}

/**
 * Track cookie consent decision
 */
export function trackCookieConsent(consentType: 'accept_all' | 'necessary_only') {
  if (!isAnalyticsAvailable()) return;
  
  window.gtag!('event', 'cookie_consent', {
    consent_type: consentType,
    event_category: 'user_preferences',
    event_label: consentType === 'accept_all' ? 'Accepted All' : 'Necessary Only'
  });
}

/**
 * Track when a user clicks on a CTA button (e.g., "Explore Channels", "Subscribe on YouTube")
 */
export function trackCTAClick(buttonText: string, buttonLocation: string) {
  if (!isAnalyticsAvailable()) return;
  
  window.gtag!('event', 'cta_click', {
    button_text: buttonText,
    button_location: buttonLocation,
    event_category: 'engagement',
    event_label: `${buttonLocation} - ${buttonText}`
  });
}

/**
 * Track when a user clicks on a related article
 */
export function trackRelatedArticleClick(fromArticle: string, toArticle: string) {
  if (!isAnalyticsAvailable()) return;
  
  window.gtag!('event', 'related_article_click', {
    from_article: fromArticle,
    to_article: toArticle,
    event_category: 'navigation',
    event_label: `${fromArticle} → ${toArticle}`
  });
}
