import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollRestoration component that automatically scrolls to top on route changes
 * Handles both regular navigation and hash-based navigation
 */
export default function ScrollRestoration() {
  const [location] = useLocation();

  useEffect(() => {
    // Check if this is a hash navigation (e.g., /#about)
    const hash = window.location.hash;
    
    if (hash) {
      // Hash navigation - let the Navigation component handle it
      return;
    }
    
    // Regular navigation - scroll to top immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' to avoid animation on page load
    });
  }, [location]);

  return null;
}
