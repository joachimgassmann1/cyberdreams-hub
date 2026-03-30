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
      {
        name: 'mock-css-ssr',
        enforce: 'pre',
        resolveId(source, importer, options) {
          if (options.ssr && source.endsWith('.css')) {
            return '\0mock-css';
          }
        },
        load(id) {
          if (id === '\0mock-css') {
            return 'export default {}';
          }
        }
      }
    ],
    ssr: {
      noExternal: ['katex', 'streamdown'],
    }
  },
  srcDir: './src',
  publicDir: './client/public',
});
