import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { siteSettings } from '../../src/data/siteSettings';
import { heroSlides, featuredServices, partners, visionMission } from '../../src/data/home';
import { productCategories } from '../../src/data/categories';
import { products } from '../../src/data/products';
import { events, getEvent } from '../../src/data/events';
import { licenses } from '../../src/data/licenses';

const publicDir = fileURLToPath(new URL('../../public/', import.meta.url));

/** Site-relative paths ("/images/...") must exist under apps/web/public. */
const missingPublicFiles = (paths: (string | undefined)[]) =>
  paths
    .filter((path): path is string => Boolean(path) && path!.startsWith('/'))
    .filter((path) => !existsSync(publicDir + decodeURIComponent(path.slice(1))));

const duplicates = (values: string[]) => values.filter((value, index) => values.indexOf(value) !== index);

const isHttps = (value: string) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe('local data: products and categories', () => {
  it('has products and categories', () => {
    expect(products.length).toBeGreaterThan(0);
    expect(productCategories.length).toBeGreaterThan(0);
  });

  it('has unique, URL-safe product slugs', () => {
    const slugs = products.map((p) => p.slug);
    expect(duplicates(slugs)).toEqual([]);
    expect(slugs.filter((slug) => !SLUG.test(slug))).toEqual([]);
  });

  it('has unique category ids', () => {
    expect(duplicates(productCategories.map((c) => c.id))).toEqual([]);
  });

  it('assigns every product to an existing category', () => {
    const ids = new Set(productCategories.map((c) => c.id));
    expect(products.filter((p) => !ids.has(p.categoryId)).map((p) => p.slug)).toEqual([]);
  });

  it('fills in the required product fields', () => {
    const incomplete = products.filter((p) => !p.name || !p.shortDescription || !p.body || !p.manufacturer);
    expect(incomplete.map((p) => p.slug)).toEqual([]);
  });

  it('only references hero images and brochures that exist in public/', () => {
    expect(missingPublicFiles(products.map((p) => p.heroImage))).toEqual([]);
    expect(missingPublicFiles(products.map((p) => p.source))).toEqual([]);
  });

  it('uses https for every catalogUrl', () => {
    const catalogUrls = products.map((p) => p.catalogUrl).filter((url): url is string => Boolean(url));
    expect(catalogUrls.length).toBeGreaterThan(0);
    expect(catalogUrls.filter((url) => !isHttps(url))).toEqual([]);
  });

  it('has no catalogUrls entry for a slug that does not exist (typo guard)', () => {
    // The slug -> catalogUrl map is private to products.ts, so read its keys from source.
    const source = readFileSync(new URL('../../src/data/products.ts', import.meta.url), 'utf8');
    const map = source.match(/const catalogUrls[^=]*=\s*\{([\s\S]*?)\n\};/)?.[1] ?? '';
    const keys = [...map.matchAll(/^\s*'([^']+)':/gm)].map((m) => m[1]);
    expect(keys.length).toBeGreaterThan(0);
    const slugs = new Set(products.map((p) => p.slug));
    expect(keys.filter((key) => !slugs.has(key))).toEqual([]);
  });
});

describe('local data: events', () => {
  it('has unique, URL-safe event slugs', () => {
    const slugs = events.map((e) => e.slug);
    expect(slugs.length).toBeGreaterThan(0);
    expect(duplicates(slugs)).toEqual([]);
    expect(slugs.filter((slug) => !SLUG.test(slug))).toEqual([]);
  });

  it('is sorted newest first by createdAt', () => {
    const times = events.map((e) => Date.parse(e.createdAt));
    expect(times.every((t) => !Number.isNaN(t))).toBe(true);
    expect([...times].sort((a, b) => b - a)).toEqual(times);
  });

  it('uses ISO dates for eventDateStart', () => {
    expect(events.filter((e) => !/^\d{4}-\d{2}-\d{2}$/.test(e.eventDateStart)).map((e) => e.slug)).toEqual([]);
  });

  it('only references event images that exist in public/', () => {
    expect(events.every((e) => e.image)).toBe(true);
    expect(missingPublicFiles(events.map((e) => e.image))).toEqual([]);
  });

  it('uses https source links and non-empty bodies', () => {
    expect(events.filter((e) => e.sourceUrl && !isHttps(e.sourceUrl)).map((e) => e.slug)).toEqual([]);
    expect(events.filter((e) => e.body.length === 0).map((e) => e.slug)).toEqual([]);
  });

  it('getEvent finds events by slug', () => {
    expect(getEvent(events[0].slug)).toBe(events[0]);
    expect(getEvent('does-not-exist')).toBeUndefined();
  });
});

describe('local data: home, settings and licenses', () => {
  it('only references hero, partner and logo images that exist in public/', () => {
    expect(missingPublicFiles(heroSlides.map((s) => s.image))).toEqual([]);
    expect(missingPublicFiles(partners.map((p) => p.image))).toEqual([]);
    expect(missingPublicFiles([siteSettings.logo])).toEqual([]);
  });

  it('has three featured services for the 3-column grid', () => {
    expect(featuredServices).toHaveLength(3);
  });

  it('has a vision and at least one mission statement', () => {
    expect(visionMission.vision.length).toBeGreaterThan(0);
    expect(visionMission.mission.length).toBeGreaterThan(0);
  });

  it('has a WhatsApp link that matches the displayed number', () => {
    expect(siteSettings.whatsappLink).toBe('https://wa.me/6282114582810');
    expect(siteSettings.whatsapp.replace(/\D/g, '')).toBe('6282114582810');
  });

  it('uses https for map and social links and has a disclaimer', () => {
    expect(isHttps(siteSettings.mapUrl)).toBe(true);
    expect(siteSettings.socials.every((s) => isHttps(s.url))).toBe(true);
    expect(siteSettings.disclaimer.length).toBeGreaterThan(0);
  });

  it('has a title and registration number for every license', () => {
    expect(licenses.filter((l) => !l.title || !l.registrationNumber)).toEqual([]);
  });
});
