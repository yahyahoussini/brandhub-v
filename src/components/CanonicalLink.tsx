import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const CanonicalLink = () => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = 'https://brandhub.ma';
    const currentPath = location.pathname;
    const canonicalUrl = `${baseUrl}${currentPath === '/' ? '' : currentPath}`;

    // Remove existing canonical link if present
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.setAttribute('href', canonicalUrl);
    } else {
      // Create new canonical link
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }

    // Update og:url
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    // Update twitter:url
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', canonicalUrl);
    }
  }, [location]);

  return null;
};
