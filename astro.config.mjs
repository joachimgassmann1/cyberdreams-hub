import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// The project creates one static output for each public domain. SITE_URL is set
// by the build script so canonical URLs and generated sitemaps stay host-correct.
const siteUrl = process.env.SITE_URL || 'https://www.sphere-music-hub.com';

export default defineConfig({
  site: siteUrl,
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    ssr: {
      noExternal: ['katex', 'streamdown'],
    },
    server: {
      allowedHosts: true
    },
    preview: {
      allowedHosts: true
    }
  },
  srcDir: './src',
  publicDir: './client/public',
});
