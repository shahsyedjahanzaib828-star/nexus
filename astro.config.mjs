// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nexus-alpha-ten-66.vercel.app',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});