import type { APIRoute } from 'astro';
import { events, products } from '../lib/content';

/** Every public page. Product and event pages come from the same content as the pages themselves. */
export const sitemapPaths = (): string[] => [
  '/',
  '/about/',
  '/contact/',
  '/products/',
  '/products/e-catalogue/',
  '/events/',
  ...products.map((product) => `/products/${product.slug}/`),
  ...events.map((event) => `/events/${event.slug}/`)
];

export const GET: APIRoute = ({ site }) => {
  const urls = sitemapPaths()
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
