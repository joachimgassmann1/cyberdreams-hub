import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
  ],
  vite: {
    plugins: [
      tailwindcss(),

    ],
    ssr: {
      noExternal: ['katex', 'streamdown'],
    }
  },
  srcDir: './src',
  publicDir: './client/public',
});
