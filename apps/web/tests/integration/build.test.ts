/**
 * Builds the site once (Sanity env unset, so local src/data is used) into a
 * temp directory and checks the generated HTML. No browser involved.
 */
import { execFile } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { products } from '../../src/data/products';
import { events } from '../../src/data/events';
import { heroSlides, featuredServices, partners } from '../../src/data/home';
import { siteSettings } from '../../src/data/siteSettings';
import { SANITY_ENV_KEYS } from '../helpers/env';

const webRoot = fileURLToPath(new URL('../../', import.meta.url));
const astroBin = join(dirname(createRequire(import.meta.url).resolve('astro/package.json')), 'astro.js');
const WHATSAPP = 'https://wa.me/6282114582810';

let outDir = '';
const pages = new Map<string, string>();

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const page = (route: string) => {
  const html = pages.get(route);
  if (html === undefined) throw new Error(`No page built for ${route}`);
  return html;
};

const count = (html: string, pattern: RegExp) => html.match(new RegExp(pattern.source, 'g'))?.length ?? 0;

/** Text as it appears in HTML (Astro escapes quotes, ampersands, etc.). */
const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const containsText = (html: string, text: string) =>
  html.includes(text) || html.includes(escapeHtml(text)) || html.includes(escapeHtml(text).replace(/'/g, '&#39;'));

beforeAll(async () => {
  outDir = mkdtempSync(join(tmpdir(), 'aryajaya-web-build-'));
  const env: NodeJS.ProcessEnv = { ...process.env, NODE_ENV: 'production' };
  // Empty (not just unset) so a local apps/web/.env cannot switch the build to Sanity.
  for (const key of SANITY_ENV_KEYS) env[key] = '';
  delete env.VITEST;
  delete env.VITEST_MODE;
  delete env.VITEST_POOL_ID;
  delete env.VITEST_WORKER_ID;

  await promisify(execFile)(process.execPath, [astroBin, 'build', '--outDir', outDir], {
    cwd: webRoot,
    env,
    maxBuffer: 64 * 1024 * 1024
  });

  for (const file of walk(outDir).filter((f) => f.endsWith('.html'))) {
    const route = '/' + relative(outDir, file).replace(/\\/g, '/').replace(/index\.html$/, '');
    pages.set(route, readFileSync(file, 'utf8'));
  }
}, 300_000);

afterAll(() => {
  if (outDir && existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
});

describe('static build', () => {
  it('builds the core pages', () => {
    expect(pages.size).toBeGreaterThan(products.length + events.length);
    for (const route of ['/', '/about/', '/contact/', '/products/', '/products/e-catalogue/', '/events/']) {
      expect(pages.has(route), route).toBe(true);
    }
  });

  it('builds a page for every local product and event', () => {
    const missing = [
      ...products.map((p) => `/products/${p.slug}/`),
      ...events.map((e) => `/events/${e.slug}/`)
    ].filter((route) => !pages.has(route));
    expect(missing).toEqual([]);
  });

  it('renders product and event content on their pages', () => {
    for (const product of products) expect(containsText(page(`/products/${product.slug}/`), product.name), product.slug).toBe(true);
    for (const event of events) expect(containsText(page(`/events/${event.slug}/`), event.title), event.slug).toBe(true);
  });

  it('gives every page a non-empty <title>, a meta description and the sitewide disclaimer', () => {
    const problems: string[] = [];
    for (const [route, html] of pages) {
      if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${route}: missing <title>`);
      if (!/<meta\s+name="description"\s+content="[^"]+"/.test(html)) problems.push(`${route}: missing meta description`);
      if (!containsText(html, siteSettings.disclaimer)) problems.push(`${route}: missing disclaimer`);
    }
    expect(problems).toEqual([]);
  });

  it('points every WhatsApp link to the company number', () => {
    const links = [...pages.values()].flatMap((html) => [...html.matchAll(/href="(https?:\/\/(?:api\.whatsapp\.com|wa\.me)[^"]*)"/g)].map((m) => m[1]));
    expect(links.length).toBeGreaterThan(0);
    expect(links.filter((href) => href !== WHATSAPP && !href.startsWith(`${WHATSAPP}?`))).toEqual([]);
    // Every page offers at least one WhatsApp link (header/footer/CTA).
    expect([...pages].filter(([, html]) => !html.includes(`href="${WHATSAPP}`)).map(([route]) => route)).toEqual([]);
  });

  it('never renders undefined or null into href/src attributes', () => {
    const bad = [...pages].flatMap(([route, html]) =>
      [...html.matchAll(/\b(href|src)="(undefined|null|)"/g)].map((m) => `${route}: ${m[0]}`)
    );
    expect(bad).toEqual([]);
  });

  it('only links to local assets that exist in the build output', () => {
    const missing = new Set<string>();
    for (const [route, html] of pages) {
      for (const [, url] of html.matchAll(/\b(?:href|src)="(\/(?:images|documents)\/[^"#?]+)"/g)) {
        if (!existsSync(join(outDir, decodeURIComponent(url)))) missing.add(`${route}: ${url}`);
      }
    }
    expect([...missing]).toEqual([]);
  });
});

describe('home page', () => {
  it('has the hero slider with one slide and dot per slide plus prev/next arrows', () => {
    const html = page('/');
    expect(html).toMatch(/data-hero-slider="hero-slider-[^"]+"/);
    expect(count(html, /data-index="\d+"/)).toBe(heroSlides.length);
    expect(count(html, /data-dot="\d+"/)).toBe(heroSlides.length);
    expect(html).toMatch(/<button[^>]*data-prev[^>]*aria-label="Previous slide"/);
    expect(html).toMatch(/<button[^>]*data-next[^>]*aria-label="Next slide"/);
    for (const slide of heroSlides) expect(containsText(html, slide.title)).toBe(true);
  });

  it('has a 3-column featured services grid', () => {
    const html = page('/');
    expect(html).toMatch(/class="[^"]*\bgrid\b[^"]*\bmd:grid-cols-3\b[^"]*"/);
    for (const service of featuredServices) expect(containsText(html, service.title), service.title).toBe(true);
  });

  it('has the partners carousel with every partner', () => {
    const html = page('/');
    expect(html).toMatch(/data-partners-slider="partners-slider-[^"]+"/);
    expect(html).toContain('aria-label="Partner carousel"');
    expect(html).toMatch(/aria-label="Previous partners"/);
    expect(html).toMatch(/aria-label="Next partners"/);
    for (const partner of partners) expect(containsText(html, partner.name), partner.name).toBe(true);
  });
});

describe('e-catalogue page', () => {
  it('links to every product catalogUrl', () => {
    const html = page('/products/e-catalogue/');
    const missing = products
      .filter((p) => p.catalogUrl)
      .filter((p) => !html.includes(`href="${p.catalogUrl}"`) && !html.includes(`href="${escapeHtml(p.catalogUrl!)}"`));
    expect(missing.map((p) => p.slug)).toEqual([]);
  });
});

describe('SEO files and tags', () => {
  const SITE = 'https://arjaya-web.vercel.app';
  const contentPages = () => [...pages.keys()].filter((route) => route.endsWith('/'));

  it('robots.txt allows crawling and points to the sitemap', () => {
    const robots = readFileSync(join(outDir, 'robots.txt'), 'utf8');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });

  it('sitemap.xml lists exactly the built pages', () => {
    const sitemap = readFileSync(join(outDir, 'sitemap.xml'), 'utf8');
    const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, '')).sort();
    expect(listed).toEqual(contentPages().sort());
  });

  it('gives every page a canonical URL and Open Graph tags with absolute URLs', () => {
    for (const route of contentPages()) {
      const html = page(route);
      expect(html, route).toContain(`<link rel="canonical" href="${SITE}${route}">`);
      expect(html, route).toMatch(/<meta property="og:title" content="[^"]+">/);
      expect(html, route).toMatch(new RegExp(`<meta property="og:image" content="https://[^"]+">`));
    }
  });

  it('has a 404 page that search engines do not index', () => {
    const html = page('/404.html');
    expect(html).toContain('<meta name="robots" content="noindex">');
    expect(html).toContain('href="/products"');
  });
});
