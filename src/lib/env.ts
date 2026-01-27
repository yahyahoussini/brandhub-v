import { z } from 'zod';

const envSchema = z.object({
    VITE_SUPABASE_URL: z.string().url('VITE_SUPABASE_URL must be a valid URL'),
    VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(1, 'VITE_SUPABASE_PUBLISHABLE_KEY is required'),
    VITE_SUPABASE_PROJECT_ID: z.string().min(1, 'VITE_SUPABASE_PROJECT_ID is required'),
    MODE: z.enum(['development', 'production', 'test']),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
    const env = {
        VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
        VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        VITE_SUPABASE_PROJECT_ID: import.meta.env.VITE_SUPABASE_PROJECT_ID,
        MODE: import.meta.env.MODE,
    };

    try {
        return envSchema.parse(env);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const missing = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('\n');
            throw new Error(`Environment validation failed:\n${missing}`);
        }
        throw error;
    }
}

export const env = validateEnv();

// Type-safe environment access
export const isDevelopment = env.MODE === 'development';
export const isProduction = env.MODE === 'production';
export const isTest = env.MODE === 'test';
