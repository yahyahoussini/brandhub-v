import { useEffect } from 'react';
import { logger } from '@/lib/logger';
import { trackPerformance } from '@/lib/sentry';

/**
 * Performance monitoring component that tracks Core Web Vitals
 * Monitors LCP, FID, and CLS metrics for performance optimization
 */
export const PerformanceMonitor = () => {
  useEffect(() => {
    // Report Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcpValue = lastEntry.renderTime || lastEntry.loadTime;

        logger.debug('LCP measured', { lcp: lcpValue });
        trackPerformance('lcp', lcpValue);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            const fidValue = entry.processingStart - entry.startTime;
            logger.debug('FID measured', { fid: fidValue });
            trackPerformance('fid', fidValue);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            logger.debug('CLS measured', { cls: clsValue });
            trackPerformance('cls', clsValue);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }, []);

  return null;
};
