// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { blogPosts, blogDateModified } from './src/data/blog.ts';

const siteUrl = (process.env.PUBLIC_SITE_URL || 'https://nexus-alpha-ten-66.vercel.app').replace(/\/+$/, '');

const blogDates = Object.fromEntries(blogPosts.map((post) => [post.slug, blogDateModified(post)]));

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/og/') && !page.includes('google58b312901cae68d0'),
      serialize(item) {
        const pathname = new URL(item.url).pathname.replace(/\/+$/, '') || '/';
        // Keep sitemap locs aligned with trailingSlash: 'never' (no trailing slash, including root)
        item.url = pathname === '/' ? siteUrl : `${siteUrl}${pathname}`;

        if (pathname === '/') {
          return { ...item, changefreq: 'weekly', priority: 1.0, lastmod: undefined };
        }
        if (pathname === '/services') {
          return { ...item, changefreq: 'monthly', priority: 0.9, lastmod: undefined };
        }
        if (pathname.startsWith('/services/')) {
          return { ...item, changefreq: 'monthly', priority: 0.9, lastmod: undefined };
        }
        if (pathname === '/blog') {
          return { ...item, changefreq: 'weekly', priority: 0.8, lastmod: undefined };
        }
        if (pathname.startsWith('/blog/')) {
          const slug = pathname.slice('/blog/'.length);
          const date = blogDates[slug];
          return {
            ...item,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: date ? new Date(`${date}T00:00:00.000Z`) : undefined
          };
        }
        if (pathname === '/about') {
          return { ...item, changefreq: 'yearly', priority: 0.7, lastmod: undefined };
        }
        if (pathname === '/contact') {
          return { ...item, changefreq: 'yearly', priority: 0.7, lastmod: undefined };
        }
        if (pathname === '/privacy' || pathname === '/terms') {
          return { ...item, changefreq: 'yearly', priority: 0.2, lastmod: undefined };
        }
        return { ...item, lastmod: undefined };
      }
    })
  ],
  // Emit CSS as hashed /_astro/*.css files instead of inlining Tailwind into every HTML document.
  build: {
    inlineStylesheets: 'never'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
