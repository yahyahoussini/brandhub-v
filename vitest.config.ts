import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov', 'json'],
            reportsDirectory: './coverage',
            exclude: [
                'node_modules/',
                'src/test/',
                '**/*.d.ts',
                '**/*.config.*',
                '**/dist/**',
                '**/.{idea,git,cache,output,temp}/**',
            ],
            // Coverage thresholds - start at 30%, aim for 70%
            thresholds: {
                statements: 30,
                branches: 25,
                functions: 30,
                lines: 30,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
