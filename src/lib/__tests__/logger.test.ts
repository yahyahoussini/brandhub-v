import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger } from '../logger';

describe('Logger', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should have debug method', () => {
        expect(logger.debug).toBeDefined();
        expect(typeof logger.debug).toBe('function');
    });

    it('should have info method', () => {
        expect(logger.info).toBeDefined();
        expect(typeof logger.info).toBe('function');
    });

    it('should have warn method', () => {
        expect(logger.warn).toBeDefined();
        expect(typeof logger.warn).toBe('function');
    });

    it('should have error method', () => {
        expect(logger.error).toBeDefined();
        expect(typeof logger.error).toBe('function');
    });

    it('should log messages in development', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

        logger.info('Test message');

        // In development mode, logger should call console
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('should handle error objects', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        const testError = new Error('Test error');

        logger.error('Error occurred', testError);

        expect(consoleSpy).toHaveBeenCalled();
    });

    it('should handle context objects', () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

        logger.info('Test message', { userId: '123', action: 'test' });

        expect(consoleSpy).toHaveBeenCalled();
    });
});
