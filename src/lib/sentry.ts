import * as Sentry from '@sentry/react';
import { isDevelopment, isProduction } from './env';

/**
 * Initialize Sentry error monitoring
 * Only runs in production to avoid noise in development
 */
export function initSentry() {
    if (!isProduction) {
        console.log('[Sentry] Skipping initialization in development mode');
        return;
    }

    const dsn = import.meta.env.VITE_SENTRY_DSN;

    if (!dsn) {
        console.warn('[Sentry] DSN not configured, error monitoring disabled');
        return;
    }

    Sentry.init({
        dsn,

        // Environment
        environment: import.meta.env.MODE,

        // Performance Monitoring
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({
                maskAllText: false,
                blockAllMedia: false,
            }),
        ],

        // Performance traces - sample 10% of transactions
        tracesSampleRate: 0.1,

        // Session Replay - sample 10% of sessions, 100% of error sessions
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,

        // Release tracking
        release: `brandhub-morocco@${import.meta.env.VITE_APP_VERSION || 'dev'}`,

        // Filter out non-critical errors
        beforeSend(event, hint) {
            // Don't send console errors in development
            if (isDevelopment) {
                return null;
            }

            // Filter out browser extension errors
            if (event.exception?.values?.[0]?.stacktrace?.frames) {
                const frames = event.exception.values[0].stacktrace.frames;
                if (frames.some(frame =>
                    frame.filename?.includes('extensions/') ||
                    frame.filename?.includes('chrome-extension://')
                )) {
                    return null;
                }
            }

            // Filter out network errors from ad blockers
            const error = hint.originalException;
            if (error instanceof Error) {
                if (error.message.includes('adsbygoogle') ||
                    error.message.includes('Failed to fetch')) {
                    return null;
                }
            }

            return event;
        },

        // Ignore specific errors
        ignoreErrors: [
            // Browser extensions
            'top.GLOBALS',
            'canvas.contentDocument',
            // Random network errors
            'NetworkError',
            'Network request failed',
            // ResizeObserver (benign)
            'ResizeObserver loop limit exceeded',
        ],
    });

    console.log('[Sentry] Error monitoring initialized');
}

/**
 * Manually capture an error to Sentry
 */
export function captureError(error: Error, context?: Record<string, any>) {
    if (isDevelopment) {
        console.error('[Sentry] Error captured:', error, context);
        return;
    }

    Sentry.captureException(error, {
        contexts: {
            custom: context || {},
        },
    });
}

/**
 * Set user context for error tracking
 */
export function setUserContext(user: { id: string; email?: string; username?: string }) {
    Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.username,
    });
}

/**
 * Clear user context (on logout)
 */
export function clearUserContext() {
    Sentry.setUser(null);
}

/**
 * Add breadcrumb for tracking user actions
 */
export function addBreadcrumb(message: string, category: string, data?: Record<string, any>) {
    Sentry.addBreadcrumb({
        message,
        category,
        level: 'info',
        data,
    });
}

/**
 * Track performance metrics
 */
export function trackPerformance(name: string, duration: number, data?: Record<string, any>) {
    if (isDevelopment) {
        console.log(`[Performance] ${name}: ${duration}ms`, data);
        return;
    }

    Sentry.metrics.distribution(name, duration, {
        unit: 'millisecond',
        tags: data,
    });
}
