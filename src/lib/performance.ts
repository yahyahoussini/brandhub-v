import { logger } from './logger';

/**
 * Performance monitoring utilities
 * Tracks Core Web Vitals and custom performance metrics
 */

interface PerformanceMetric {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
}

// Core Web Vitals thresholds
const THRESHOLDS = {
    LCP: { good: 2500, poor: 4000 },  // Largest Contentful Paint
    FID: { good: 100, poor: 300 },    // First Input Delay
    CLS: { good: 0.1, poor: 0.25 },   // Cumulative Layout Shift
    TTFB: { good: 800, poor: 1800 },  // Time to First Byte
};

function getRating(value: number, thresholds: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.poor) return 'needs-improvement';
    return 'poor';
}

/**
 * Initialize performance monitoring
 * Call this once in your app entry point
 */
export function initPerformanceMonitoring() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
        return;
    }

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry;

        const metric: PerformanceMetric = {
            name: 'LCP',
            value: lastEntry.startTime,
            rating: getRating(lastEntry.startTime, THRESHOLDS.LCP),
        };

        logger.info('Performance: LCP', metric);
        reportMetric(metric);
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
            const value = entry.processingStart - entry.startTime;

            const metric: PerformanceMetric = {
                name: 'FID',
                value,
                rating: getRating(value, THRESHOLDS.FID),
            };

            logger.info('Performance: FID', metric as Record<string, unknown>);
            reportMetric(metric);
        });
    });

    fidObserver.observe({ type: 'first-input', buffered: true });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
                clsValue += entry.value;
            }
        });

        const metric: PerformanceMetric = {
            name: 'CLS',
            value: clsValue,
            rating: getRating(clsValue, THRESHOLDS.CLS),
        };

        logger.info('Performance: CLS', metric as Record<string, unknown>);
        reportMetric(metric);
    });

    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Time to First Byte (TTFB)
    const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
            const ttfb = entry.responseStart - entry.requestStart;

            const metric: PerformanceMetric = {
                name: 'TTFB',
                value: ttfb,
                rating: getRating(ttfb, THRESHOLDS.TTFB),
            };

            logger.info('Performance: TTFB', metric as Record<string, unknown>);
            reportMetric(metric);
        });
    });

    navigationObserver.observe({ type: 'navigation', buffered: true });
}

/**
 * Report metric to analytics/monitoring service
 */
function reportMetric(metric: PerformanceMetric) {
    // Send to analytics service (Google Analytics, etc.)
    if (window.gtag) {
        window.gtag('event', metric.name, {
            value: Math.round(metric.value),
            metric_rating: metric.rating,
            non_interaction: true,
        });
    }

    // Send to custom monitoring service
    if (import.meta.env.PROD) {
        // Could send to your own analytics endpoint
        // fetch('/api/metrics', { method: 'POST', body: JSON.stringify(metric) });
    }
}

/**
 * Custom performance mark
 */
export function mark(name: string) {
    if (typeof performance !== 'undefined' && performance.mark) {
        performance.mark(name);
    }
}

/**
 * Measure time between two marks
 */
export function measure(name: string, startMark: string, endMark: string) {
    if (typeof performance !== 'undefined' && performance.measure) {
        try {
            const measurement = performance.measure(name, startMark, endMark);
            logger.debug(`Performance: ${name}`, {
                duration: measurement.duration,
            });
            return measurement.duration;
        } catch (error) {
            logger.warn(`Failed to measure ${name}`, { error });
        }
    }
    return 0;
}

/**
 * Time a function execution
 */
export async function timeAsync<T>(
    name: string,
    fn: () => Promise<T>
): Promise<T> {
    const startMark = `${name}-start`;
    const endMark = `${name}-end`;

    mark(startMark);
    try {
        const result = await fn();
        mark(endMark);
        measure(name, startMark, endMark);
        return result;
    } catch (error) {
        mark(endMark);
        measure(name, startMark, endMark);
        throw error;
    }
}

// Extend Window interface for gtag
declare global {
    interface Window {
        gtag?: (
            command: string,
            eventName: string,
            params?: Record<string, unknown>
        ) => void;
    }
}
