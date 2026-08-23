// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nexus-alpha-ten-66.vercel.app',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/og/'),
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === '/') return { ...item, priority: 1.0, changefreq: 'weekly' };
        if (path.startsWith('/services')) return { ...item, priority: 0.9, changefreq: 'monthly' };
        if (path === '/about/') return { ...item, priority: 0.7, changefreq: 'yearly' };
        if (path.startsWith('/blog/') && path !== '/blog/') return { ...item, priority: 0.7, changefreq: 'monthly' };
        if (path === '/privacy/') return { ...item, priority: 0.2, changefreq: 'yearly' };
        return item;
      }
    })
  ],
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
