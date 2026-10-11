import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://got.jyutdict.org',
  integrations: [vue(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'yue'],
    routing: { prefixDefaultLocale: false },
  },
});
