import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './site.config.mjs';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Keep CSS in files so the Content-Security-Policy can stay at style-src 'self'.
    inlineStylesheets: 'never',
  },
  markdown: {
    // Syntax highlighting writes inline styles, which the CSP blocks; code blocks are styled in CSS instead.
    syntaxHighlight: false,
  },
  integrations: [sitemap()],
});
