enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
}

interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: Date;
    context?: Record<string, unknown>;
    error?: Error;
}

class Logger {
    private isDevelopment = import.meta.env.DEV;
    private minLevel: LogLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.WARN;

    private formatMessage(entry: LogEntry): string {
        const { level, message, timestamp } = entry;
        const time = timestamp.toISOString();
        const levelStr = LogLevel[level].padEnd(5);
        return `[${time}] ${levelStr} ${message}`;
    }

    private log(entry: LogEntry) {
        if (entry.level < this.minLevel) return;

        const formatted = this.formatMessage(entry);
        const { context, error } = entry;

        switch (entry.level) {
            case LogLevel.DEBUG:
                console.debug(formatted, context);
                break;
            case LogLevel.INFO:
                console.info(formatted, context);
                break;
            case LogLevel.WARN:
                console.warn(formatted, context);
                break;
            case LogLevel.ERROR:
                console.error(formatted, context, error);
                // In production, send to error tracking service
                if (!this.isDevelopment && error) {
                    this.sendToErrorTracking(error, context);
                }
                break;
        }
    }

    private sendToErrorTracking(error: Error, context?: Record<string, unknown>) {
        // Placeholder for Sentry or other error tracking
        // Will be implemented when Sentry is configured
        if (window.Sentry) {
            window.Sentry.captureException(error, {
                extra: context,
            });
        }
    }

    debug(message: string, context?: Record<string, unknown>) {
        this.log({
            level: LogLevel.DEBUG,
            message,
            timestamp: new Date(),
            context
        });
    }

    info(message: string, context?: Record<string, unknown>) {
        this.log({
            level: LogLevel.INFO,
            message,
            timestamp: new Date(),
            context
        });
    }

    warn(message: string, context?: Record<string, unknown>) {
        this.log({
            level: LogLevel.WARN,
            message,
            timestamp: new Date(),
            context
        });
    }

    error(message: string, error?: Error, context?: Record<string, unknown>) {
        this.log({
            level: LogLevel.ERROR,
            message,
            timestamp: new Date(),
            context,
            error
        });
    }

    // Utility for timing operations
    time(label: string) {
        const start = performance.now();
        return () => {
            const duration = performance.now() - start;
            this.debug(`${label} took ${duration.toFixed(2)}ms`);
        };
    }
}

// Extend Window interface for Sentry
declare global {
    interface Window {
        Sentry?: {
            captureException: (error: Error, context?: { extra?: Record<string, unknown> }) => void;
        };
    }
}

export const logger = new Logger();
