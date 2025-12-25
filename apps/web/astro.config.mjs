import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.arjaya.example',
  integrations: [tailwind()],
  output: 'static'
});
