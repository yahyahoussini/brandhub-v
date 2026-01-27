import { describe, it, expect, beforeEach, vi } from 'vitest';
import { env, validateEnv, isDevelopment, isProduction, isTest } from '../env';

// Mock import.meta.env
const mockEnv = {
    VITE_SUPABASE_URL: 'https://test.supabase.co',
    VITE_SUPABASE_PUBLISHABLE_KEY: 'test-key',
    VITE_SUPABASE_PROJECT_ID: 'test-project',
    MODE: 'development',
};

vi.stubGlobal('import', {
    meta: {
        env: mockEnv,
    },
});

describe('Environment Validation', () => {
    it('should export validated environment variables', () => {
        expect(env).toBeDefined();
        expect(env.VITE_SUPABASE_URL).toBe(mockEnv.VITE_SUPABASE_URL);
        expect(env.VITE_SUPABASE_PUBLISHABLE_KEY).toBe(mockEnv.VITE_SUPABASE_PUBLISHABLE_KEY);
        expect(env.VITE_SUPABASE_PROJECT_ID).toBe(mockEnv.VITE_SUPABASE_PROJECT_ID);
    });

    it('should have correct environment flags', () => {
        expect(isDevelopment).toBe(true);
        expect(isProduction).toBe(false);
        expect(isTest).toBe(false);
    });

    it('should validate URL format', () => {
        expect(env.VITE_SUPABASE_URL).toMatch(/^https:\/\//);
    });

    it('should validate required fields are not empty', () => {
        expect(env.VITE_SUPABASE_PUBLISHABLE_KEY.length).toBeGreaterThan(0);
        expect(env.VITE_SUPABASE_PROJECT_ID.length).toBeGreaterThan(0);
    });
});
