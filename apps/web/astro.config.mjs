import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Public address of the site. Used for canonical links, Open Graph tags, the sitemap and robots.txt.
// Set SITE_URL in Vercel once the custom domain is connected (e.g. https://www.arjayamedika.co.id).
const site = process.env.SITE_URL || 'https://arjaya-web.vercel.app';

export default defineConfig({
  site,
  integrations: [tailwind()],
  output: 'static'
});
