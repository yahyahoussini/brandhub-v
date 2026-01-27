import { useEffect } from 'react';
import { logger } from '@/lib/logger';
import { trackPerformance } from '@/lib/sentry';

/**
 * Performance optimizer component that implements various performance optimizations
 * - Prefetches critical routes on idle
 * - Monitors Core Web Vitals (LCP, FID/INP, CLS)
 * - Preconnects to critical third-party origins
 */
export const PerformanceOptimizer = () => {
  useEffect(() => {
    // Prefetch critical routes on idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const routes = ['/blog', '/services/programming', '/contact'];
        routes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
      });
    }

    // Observe performance metrics
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry: any = entries[entries.length - 1];
          const lcp = lastEntry.renderTime || lastEntry.loadTime;

          logger.debug('LCP measured', { lcp });
          trackPerformance('lcp', lcp);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // First Input Delay (FID) / Interaction to Next Paint (INP)
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.processingStart && entry.startTime) {
              const fid = entry.processingStart - entry.startTime;
              logger.debug('FID/INP measured', { fid });
              trackPerformance('fid', fid);
            }
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });

        // Cumulative Layout Shift (CLS)
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
              logger.debug('CLS measured', { cls: clsScore });
              trackPerformance('cls', clsScore);
            }
          });
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // PerformanceObserver not supported
        logger.warn('PerformanceObserver not fully supported', e as Error);
      }
    }

    // Preconnect to critical third-party origins on interaction
    const preconnectOnInteraction = () => {
      const origins = [
        'https://oxiyfnlhalptsdydlbmz.supabase.co',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com'
      ];

      origins.forEach(origin => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = origin;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Trigger preconnect on first user interaction
    const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
    const handler = () => {
      preconnectOnInteraction();
      events.forEach(event => document.removeEventListener(event, handler));
    };
    events.forEach(event => document.addEventListener(event, handler, { passive: true, once: true }));

    return () => {
      events.forEach(event => document.removeEventListener(event, handler));
    };
  }, []);

  return null;
};
