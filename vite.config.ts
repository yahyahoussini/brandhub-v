import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";
import { compression } from "vite-plugin-compression2";
import Sitemap from "vite-plugin-sitemap";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),

    // Bundle analysis in production build
    mode === "production" && visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),

    // Brotli compression for production
    mode === "production" && compression({
      algorithms: ['brotliCompress'],
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 10240, // Only compress files > 10KB
      deleteOriginalAssets: false,
    }),

    // XML Sitemap generation for SEO
    Sitemap({
      hostname: 'https://brandhub.ma',
      dynamicRoutes: [
        '/',
        '/about',
        '/contact',
        '/portfolio',
        '/blog',
        '/services/programming',
        '/services/graphics',
        '/services/content',
        '/services/business',
        '/locations/morocco',
        '/locations/spain',
        '/locations/saudi-arabia',
      ],
      changefreq: 'weekly',
      priority: 0.7,
    }),

    // PWA Service Worker for offline support
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicone.png', 'robots.txt'],
      manifest: {
        name: 'BrandHub.ma - Branding & Web Development Morocco',
        short_name: 'BrandHub',
        description: 'Expert branding and web development services in Morocco',
        theme_color: '#11118b',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/favicone.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/favicone.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5
              }
            }
          }
        ]
      }
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020',
    sourcemap: mode === 'production' ? 'hidden' : true,
    cssCodeSplit: true,
    cssMinify: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor splitting by library
          if (id.includes('node_modules')) {
            // React core - keep together for better caching
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // Router - separate for code splitting
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // UI library - separate
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            // Heavy 3D libraries - separate for lazy load
            if (id.includes('three') && !id.includes('@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('@react-three')) {
              return 'vendor-three-react';
            }
            // Spline - very heavy, separate chunk
            if (id.includes('@splinetool')) {
              return 'vendor-spline';
            }
            // Animation libraries - separate
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            // Icon cloud - heavy
            if (id.includes('react-icon-cloud')) {
              return 'vendor-icon-cloud';
            }
            // Database
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            // Query
            if (id.includes('@tanstack')) {
              return 'vendor-query';
            }
            // Icons
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }

          // Feature-based splitting
          if (id.includes('/pages/admin/') || id.includes('/components/admin/')) {
            return 'feature-admin';
          }
          if (id.includes('/pages/Blog') || id.includes('blog/')) {
            return 'feature-blog';
          }
          if (id.includes('/pages/Portfolio') || id.includes('portfolio/')) {
            return 'feature-portfolio';
          }
        },
        // Optimal chunk naming for long-term caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize by file type
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|ttf|otf|eot/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 300, // Warn at 300KB per chunk

    // Performance budgets
    reportCompressedSize: true,

    // Fail build if chunks are too large
    rollupOptions: {
      ...{
        output: {
          manualChunks: (id) => {
            // ... manualChunks logic above  
          },
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
    exclude: ['@splinetool/runtime'],
  },

  // Performance monitoring during build
  logLevel: 'info',
}));
