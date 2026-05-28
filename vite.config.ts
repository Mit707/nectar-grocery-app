import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    host: true,   // reachable by phone on same Wi-Fi
    port: 5173,
  },
  preview: {
    host: true,   // same for production preview
    port: 4173,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      // Enables the service-worker in `vite dev` so you can test on-device
      // without a full build.  Uses a "passthrough" SW that doesn't cache —
      // the real caching only kicks in with `vite build`.
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },

      includeAssets: [
        'favicon.svg',
        'icons/*.png',
        'images/**/*.png',
      ],

      manifest: {
        name: 'Nectar – Online Grocery',
        short_name: 'Nectar',
        description: 'Get your groceries delivered in as fast as one hour',
        theme_color: '#53B175',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        id: '/',
        categories: ['shopping', 'food'],
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/pwa-maskable-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/icons/pwa-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        // Cache everything in the dist folder on install
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,webp,woff,woff2,otf,ttf,json}'],
        cleanupOutdatedCaches: true,
        // SPA fallback — serve index.html for all navigation misses (offline too)
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          // Google Fonts stylesheets
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-styles',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // Google Fonts files
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
