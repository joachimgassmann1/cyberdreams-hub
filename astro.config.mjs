import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sphere-music-hub.com',
  integrations: [
    react(),
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
