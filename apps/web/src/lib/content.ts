/**
 * Single entry point for site content.
 *
 * Each collection comes from Sanity when it is configured and has published
 * documents. Otherwise the local files in src/data/ are used, so the site
 * always builds. Pages and components should import from here, not src/data/.
 */
import { sanityFetch, toParagraphs } from './sanity';
import { siteSettings as localSiteSettings } from '../data/siteSettings';
import {
  heroSlides as localHeroSlides,
  featuredServices as localServices,
  partners as localPartners,
  visionMission as localVisionMission
} from '../data/home';
import { productCategories as localCategories, type ProductCategory } from '../data/categories';
import { products as localProducts, type Product } from '../data/products';
import { events as localEvents, type EventItem } from '../data/events';
import { licenses as localLicenses } from '../data/licenses';

export type { Product, ProductCategory, EventItem };

type PortableText = Parameters<typeof toParagraphs>[0];

const nonEmpty = <T>(items: T[] | null | undefined): items is T[] => Array.isArray(items) && items.length > 0;
const pick = <T>(value: T | null | undefined, fallback: T): T =>
  value === null || value === undefined || value === '' ? fallback : value;

/* ---------- Query (one request per build) ---------- */

const query = `{
  "settings": *[_type == "siteSettings"][0]{
    name, tagline, whatsappNumber, whatsappLink, email, address, mapUrl, disclaimer,
    "logo": logo.asset->url,
    "socials": socialLinks[]{label, url}
  },
  "home": *[_type == "homePage"][0]{
    "heroSlides": heroSlides[]{title, subtitle, "image": image.asset->url},
    "featuredServices": featuredServices[]{title, description, icon},
    "partners": partners[]{name, subtitle, "image": logo.asset->url},
    vision, mission
  },
  "categories": *[_type == "productCategory" && defined(slug.current)] | order(order asc, title asc){
    "id": slug.current, "name": title, "description": coalesce(summary, "")
  },
  "products": *[_type == "product" && defined(slug.current)] | order(order asc, title asc){
    "slug": slug.current,
    "name": title,
    "categoryId": category->slug.current,
    shortDescription, body, highlights, manufacturer, sourceLabel, catalogUrl,
    specifications[]{label, value},
    "source": coalesce(brochure.asset->url, sourceUrl),
    "heroImage": images[0].asset->url
  },
  "events": *[_type == "event" && defined(slug.current)] | order(publishedAt desc){
    "slug": slug.current, title, publishedAt, eventDate, eventDateStart, excerpt, body,
    "image": image.asset->url, sourceUrl, sourceLabel
  },
  "licenses": *[_type == "license" && status == "active"] | order(order asc, title asc){
    title, label, registrationNumber, description
  }
}`;

type Nullable<T> = { [K in keyof T]?: T[K] | null };

type CmsResult = {
  settings: (Nullable<typeof localSiteSettings> & { whatsappNumber?: string | null }) | null;
  home: {
    heroSlides?: typeof localHeroSlides | null;
    featuredServices?: typeof localServices | null;
    partners?: typeof localPartners | null;
    vision?: string | null;
    mission?: string[] | null;
  } | null;
  categories: ProductCategory[] | null;
  products:
    | (Nullable<Omit<Product, 'slug' | 'name' | 'categoryId' | 'shortDescription' | 'body' | 'specifications'>> &
        Pick<Product, 'slug' | 'name' | 'categoryId' | 'shortDescription'> & {
          body?: PortableText;
          specifications?: { label: string; value: string }[] | null;
        })[]
    | null;
  events:
    | (Nullable<Pick<EventItem, 'eventDate' | 'image' | 'sourceUrl' | 'sourceLabel'>> &
        Pick<EventItem, 'slug' | 'title' | 'eventDateStart' | 'excerpt'> & { publishedAt: string; body?: PortableText })[]
    | null;
  licenses: (Nullable<(typeof localLicenses)[number]> & { title: string })[] | null;
};

const cms = await sanityFetch<CmsResult>(query);

/* ---------- Site settings ---------- */

const s = cms?.settings;
export const siteSettings: typeof localSiteSettings = s
  ? {
      name: pick(s.name, localSiteSettings.name),
      logo: pick(s.logo, localSiteSettings.logo),
      tagline: pick(s.tagline, localSiteSettings.tagline),
      whatsapp: pick(s.whatsappNumber, localSiteSettings.whatsapp),
      whatsappLink: pick(s.whatsappLink, localSiteSettings.whatsappLink),
      address: pick(s.address, localSiteSettings.address),
      mapUrl: pick(s.mapUrl, localSiteSettings.mapUrl),
      email: s.email ?? '',
      socials: (s.socials ?? []).filter((link) => link?.label && link?.url),
      disclaimer: pick(s.disclaimer, localSiteSettings.disclaimer)
    }
  : localSiteSettings;

/* ---------- Home page ---------- */

const home = cms?.home;
export const heroSlides = nonEmpty(home?.heroSlides) ? home.heroSlides : localHeroSlides;
export const featuredServices = nonEmpty(home?.featuredServices) ? home.featuredServices : localServices;
export const partners = nonEmpty(home?.partners) ? home.partners : localPartners;
export const visionMission = {
  vision: pick(home?.vision, localVisionMission.vision),
  mission: nonEmpty(home?.mission) ? home.mission : localVisionMission.mission
};

/* ---------- Products ---------- */

export const productCategories: ProductCategory[] = nonEmpty(cms?.categories) ? cms.categories : localCategories;

export const products: Product[] = nonEmpty(cms?.products)
  ? cms.products.map((product) => ({
      slug: product.slug,
      name: product.name,
      categoryId: product.categoryId,
      shortDescription: product.shortDescription,
      body: toParagraphs(product.body).join('\n\n'),
      highlights: product.highlights ?? [],
      specifications: Object.fromEntries((product.specifications ?? []).map(({ label, value }) => [label, value])),
      manufacturer: product.manufacturer ?? '',
      source: product.source ?? undefined,
      sourceLabel: product.sourceLabel ?? undefined,
      catalogUrl: product.catalogUrl ?? undefined,
      heroImage: product.heroImage ?? undefined
    }))
  : localProducts;

export const getCategory = (id: ProductCategory['id']) => productCategories.find((category) => category.id === id);

export const getEcatalogProducts = () => products.filter((product) => Boolean(product.catalogUrl));

/* ---------- Events ---------- */

const formatDate = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const events: EventItem[] = nonEmpty(cms?.events)
  ? cms.events.map((event) => ({
      slug: event.slug,
      title: event.title,
      createdAt: event.publishedAt,
      eventDate: event.eventDate || formatDate(event.eventDateStart),
      eventDateStart: event.eventDateStart,
      excerpt: event.excerpt,
      body: toParagraphs(event.body),
      image: event.image ?? '',
      sourceUrl: event.sourceUrl ?? '',
      sourceLabel: event.sourceLabel ?? 'Open event folder'
    }))
  : localEvents;

/* ---------- Licenses ---------- */

export const licenses = nonEmpty(cms?.licenses)
  ? cms.licenses.map((license) => ({
      title: license.title,
      label: license.label ?? 'Registration Number',
      registrationNumber: license.registrationNumber ?? '',
      description: license.description ?? ''
    }))
  : localLicenses;
