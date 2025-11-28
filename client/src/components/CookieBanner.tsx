import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { detectLanguage } from '@/lib/i18n';
import { trackCookieConsent } from '@/lib/analytics';

const COOKIE_CONSENT_KEY = 'sphere-music-hub-cookie-consent';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  timestamp: number;
}

export default function CookieBanner() {
  const lang = detectLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (!savedConsent) {
      // Show banner after 1 second delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
        // Trigger slide-in animation
        setTimeout(() => setIsVisible(true), 50);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      // Load existing consent and initialize analytics if accepted
      const consent: CookieConsent = JSON.parse(savedConsent);
      if (consent.analytics) {
        initializeAnalytics();
      }
    }
  }, []);

  const saveConsent = (analytics: boolean) => {
    const consent: CookieConsent = {
      necessary: true, // Always true
      analytics,
      timestamp: Date.now(),
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    
    if (analytics) {
      initializeAnalytics();
    }
    
    // Slide out animation
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const initializeAnalytics = () => {
    // Update Google Consent Mode v2 to 'granted' for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
    
    // Initialize Umami Analytics (privacy-friendly, no cookies)
    const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    
    if (websiteId && endpoint) {
      // Umami tracking script
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = endpoint;
      script.setAttribute('data-website-id', websiteId);
      script.setAttribute('data-domains', 'sphere-music-hub.com,sphere-music-hub.de');
      script.setAttribute('data-auto-track', 'true');
      document.head.appendChild(script);
    }
  };

  const handleAcceptAll = () => {
    saveConsent(true);
    trackCookieConsent('accept_all');
  };

  const handleNecessaryOnly = () => {
    saveConsent(false);
    trackCookieConsent('necessary_only');
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🍪</span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {lang === 'de' 
                      ? 'Wir verwenden Cookies' 
                      : 'We use cookies'}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-2xl">
                    {lang === 'de'
                      ? 'Diese Website nutzt Cookies, um die Nutzung zu analysieren und Inhalte zu verbessern. Wir verwenden ausschließlich privacy-freundliche Analytics ohne personenbezogene Daten. Sie können Ihre Einstellungen jederzeit ändern.'
                      : 'This website uses cookies to analyze usage and improve content. We use privacy-friendly analytics without personal data. You can change your settings at any time.'}
                  </p>
                  <a 
                    href="/datenschutz" 
                    className="text-sm text-primary hover:underline inline-block mt-2"
                  >
                    {lang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                  </a>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={handleNecessaryOnly}
                className="whitespace-nowrap"
              >
                {lang === 'de' ? 'Nur notwendige' : 'Necessary only'}
              </Button>
              <Button
                onClick={handleAcceptAll}
                className="whitespace-nowrap"
              >
                {lang === 'de' ? 'Alle akzeptieren' : 'Accept all'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export function to check if analytics is enabled
export function isAnalyticsEnabled(): boolean {
  const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!savedConsent) return false;
  
  const consent: CookieConsent = JSON.parse(savedConsent);
  return consent.analytics;
}

// Export function to reset consent (for cookie settings page)
export function resetCookieConsent() {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.location.reload();
}
