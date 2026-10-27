import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        // Vendor code rarely changes; content changes every batch. Separate chunks keep
        // the installed PWA from re-downloading libraries when only content updates.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/, priority: 3 },
            { name: 'ui', test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion|radix-ui|@radix-ui|@floating-ui|cmdk|lucide-react|tailwind-merge|clsx|react-remove-scroll|react-style-singleton|use-callback-ref|use-sidecar|aria-hidden|tslib|get-nonce|detect-node-es)[\\/]/, priority: 2 },
            { name: 'zod', test: /node_modules[\\/]zod[\\/]/, priority: 2 },
            { name: 'content', test: /[\\/]src[\\/]content[\\/]/, priority: 1 },
          ],
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'MusiKit: The Ultimate Music Production Guide',
        short_name: 'MusiKit',
        description: 'An interactive guide and cheat sheet for beatmakers, songwriters, vocalists, and engineers.',
        theme_color: '#0B0B12',
        background_color: '#0B0B12',
        display: 'standalone',
        start_url: '/',
        icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: 'index.html',
      },
    }),
  ],
})
