#!/usr/bin/env node
/**
 * Builds seed/content.ndjson from the website's local content (apps/web/src/data),
 * so the dashboard starts with exactly what the site shows today.
 *
 *   npm run seed:generate   # write seed/content.ndjson
 *   npm run seed:import     # import it into the dataset in .env.local (replaces same-id docs)
 *
 * Images and PDFs from apps/web/public are referenced with `_sanityAsset`,
 * which `sanity dataset import` uploads automatically.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(here, '../../web');
const dataDir = join(webRoot, 'src/data');
const publicDir = join(webRoot, 'public');
const outFile = resolve(here, '../seed/content.ndjson');

const load = (name) => import(pathToFileURL(join(dataDir, `${name}.ts`)).href);

const [{ siteSettings }, home, { productCategories }, { products }, { events }, { licenses }] = await Promise.all([
  load('siteSettings'),
  load('home'),
  load('categories'),
  load('products'),
  load('events'),
  load('licenses')
]);

const missing = [];
let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;

/** `/images/x.png` → Sanity asset placeholder that the import CLI uploads. */
const asset = (kind, publicPath) => {
  if (!publicPath) return undefined;
  const absolute = join(publicDir, publicPath.replace(/^\//, ''));
  if (!existsSync(absolute)) {
    missing.push(publicPath);
    return undefined;
  }
  return { _type: kind, _sanityAsset: `${kind}@${pathToFileURL(absolute).href}` };
};
const image = (path) => asset('image', path);

const blocks = (paragraphs) =>
  paragraphs
    .filter((text) => text && text.trim())
    .map((text) => ({
      _type: 'block',
      _key: key(),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: key(), text, marks: [] }]
    }));

const slug = (current) => ({ _type: 'slug', current });
const compact = (doc) => JSON.parse(JSON.stringify(doc)); // drops undefined fields

const docs = [];

docs.push({
  _id: 'siteSettingsSingleton',
  _type: 'siteSettings',
  name: siteSettings.name,
  tagline: siteSettings.tagline,
  logo: image(siteSettings.logo),
  whatsappNumber: siteSettings.whatsapp,
  whatsappLink: siteSettings.whatsappLink,
  email: siteSettings.email || undefined,
  address: siteSettings.address,
  mapUrl: siteSettings.mapUrl,
  socialLinks: siteSettings.socials.map((link) => ({ _key: key(), _type: 'link', ...link })),
  disclaimer: siteSettings.disclaimer
});

docs.push({
  _id: 'homePageSingleton',
  _type: 'homePage',
  heroSlides: home.heroSlides.map((slide) => ({
    _key: key(),
    _type: 'slide',
    title: slide.title,
    subtitle: slide.subtitle,
    image: image(slide.image)
  })),
  featuredServices: home.featuredServices.map((service) => ({ _key: key(), _type: 'service', ...service })),
  partners: home.partners.map((partner) => ({
    _key: key(),
    _type: 'partner',
    name: partner.name,
    subtitle: partner.subtitle,
    logo: image(partner.image)
  })),
  vision: home.visionMission.vision,
  mission: home.visionMission.mission
});

productCategories.forEach((category, index) => {
  docs.push({
    _id: `category-${category.id}`,
    _type: 'productCategory',
    title: category.name,
    slug: slug(category.id),
    summary: category.description,
    order: index
  });
});

products.forEach((product, index) => {
  const isPdf = product.source?.startsWith('/') && product.source.endsWith('.pdf');
  docs.push({
    _id: `product-${product.slug}`,
    _type: 'product',
    title: product.name,
    slug: slug(product.slug),
    category: { _type: 'reference', _ref: `category-${product.categoryId}` },
    shortDescription: product.shortDescription,
    manufacturer: product.manufacturer,
    images: product.heroImage ? [{ _key: key(), ...image(product.heroImage) }].filter((img) => img._type) : undefined,
    body: blocks(product.body.split(/\n{2,}/)),
    highlights: product.highlights,
    specifications: Object.entries(product.specifications).map(([label, value]) => ({ _key: key(), _type: 'spec', label, value })),
    catalogUrl: product.catalogUrl,
    brochure: isPdf ? asset('file', product.source) : undefined,
    sourceUrl: product.source && !isPdf ? product.source : undefined,
    sourceLabel: product.sourceLabel,
    order: index
  });
});

events.forEach((event) => {
  docs.push({
    _id: `event-${event.slug}`,
    _type: 'event',
    title: event.title,
    slug: slug(event.slug),
    eventDateStart: event.eventDateStart,
    eventDate: event.eventDate,
    publishedAt: new Date(event.createdAt).toISOString(),
    excerpt: event.excerpt,
    image: image(event.image),
    body: blocks(event.body),
    sourceUrl: event.sourceUrl,
    sourceLabel: event.sourceLabel
  });
});

licenses.forEach((license, index) => {
  docs.push({
    _id: `license-${license.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    _type: 'license',
    title: license.title,
    label: license.label,
    registrationNumber: license.registrationNumber,
    description: license.description,
    status: 'active',
    order: index
  });
});

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, docs.map((doc) => JSON.stringify(compact(doc))).join('\n') + '\n');

const counts = docs.reduce((acc, doc) => ({ ...acc, [doc._type]: (acc[doc._type] ?? 0) + 1 }), {});
console.log(`Wrote ${docs.length} documents to ${outFile}`);
console.log(counts);
if (missing.length) console.warn(`Skipped ${missing.length} missing asset(s):\n  ${missing.join('\n  ')}`);
