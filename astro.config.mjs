import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { EMPRESA } from './src/config.ts';

// `site` vem do domínio em src/config.ts (usado no sitemap, nas URLs canônicas e no Open Graph)
export default defineConfig({
  site: EMPRESA.dominio,
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
  build: { inlineStylesheets: 'auto' },
});
