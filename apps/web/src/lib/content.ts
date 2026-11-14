/**
 * Single entry point for site content.
 *
 * Sanity is "in use" once it is configured, reachable and seeded (the Site
 * Settings document exists). Until then everything comes from the local files
 * in src/data/, so the site always builds.
 *
 * Once Sanity is in use:
 * - Collections (products, categories, events, licenses) come only from Sanity,
 *   so unpublishing every item really empties the section.
 * - Single fields and page-structure lists (headings, hero slides, nav links…)
 *   still fall back field by field, so a blank field never blanks the layout.
 *
 * Pages and components should import from here, not src/data/.
 */
import { sanityFetch, toParagraphs } from './sanity';
import { siteSettings as localSiteSettings } from '../data/siteSettings';
import {
  heroSlides as localHeroSlides,
  featuredServices as localServices,
  partners as localPartners,
  visionMission as localVisionMission,
  homeSections as localHomeSections
} from '../data/home';
import {
  aboutPage as localAboutPage,
  contactPage as localContactPage,
  listingPages as localListingPages
} from '../data/pages';
import { productCategories as localCategories, type ProductCategory } from '../data/categories';
import { products as localProducts, type Product } from '../data/products';
import { events as localEvents, postKindLabels, type EventItem, type PostKind } from '../data/events';
import { licenses as localLicenses } from '../data/licenses';

export type { Product, ProductCategory, EventItem, PostKind };
export { postKindLabels };

type PortableText = Parameters<typeof toParagraphs>[0];

const nonEmpty = <T>(items: T[] | null | undefined): items is T[] => Array.isArray(items) && items.length > 0;
const pick = <T>(value: T | null | undefined, fallback: T): T =>
  value === null || value === undefined || value === '' ? fallback : value;

type Nullable<T> = { [K in keyof T]?: T[K] | null };

/** Field-by-field fallback for a flat object of strings/booleans (headings, SEO, …). */
const merge = <T extends Record<string, unknown>>(value: Nullable<T> | null | undefined, fallback: T): T =>
  Object.fromEntries(
    Object.entries(fallback).map(([field, fallbackValue]) => [field, pick(value?.[field as keyof T], fallbackValue)])
  ) as T;

type Heading = { eyebrow: string; heading: string; description: string };
type CallToAction = { eyebrow: string; heading: string; text: string; buttonLabel: string };
type Seo = { title: string; description: string };

/* ---------- Query (one request per build) ---------- */

const query = `{
  "settings": *[_type == "siteSettings"][0]{
    name, tagline, whatsappNumber, whatsappLink, whatsappButtonLabel, email, address, mapUrl, disclaimer,
    "logo": logo.asset->url,
    "socials": socialLinks[]{label, url},
    "navLinks": navLinks[]{label, href},
    footerContactHeading, footerMapLinkLabel, footerSocialHeading
  },
  "home": *[_type == "homePage"][0]{
    "heroSlides": heroSlides[]{title, subtitle, "image": image.asset->url},
    "featuredServices": featuredServices[]{title, description, icon},
    "partners": partners[]{name, subtitle, "image": logo.asset->url},
    vision, mission,
    heroEyebrow, visionLabel, missionLabel, ecatalogueButtonLabel,
    servicesHeading, partnersHeading, licensesHeading, ecatalogueHeading, inquiryBanner, seo
  },
  "about": *[_type == "aboutPage"][0]{
    eyebrow, heading, leftColumn, rightColumn, showDisclaimer, disclaimerLabel, seo,
    "image": image.asset->url, "imageAlt": image.alt
  },
  "contact": *[_type == "contactPage"][0]{ heading, intro, mapEmbedUrl, seo },
  "listing": *[_type == "listingPages"][0]{
    productsIntro, productsEcatalogueTeaser, productsSeo,
    ecatalogueIntro, ecatalogueSeo,
    eventsIntro, eventsSeo
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
    kind, "slug": slug.current, title, publishedAt, eventDate, eventDateStart, excerpt, body,
    "image": image.asset->url, sourceUrl, sourceLabel
  },
  "licenses": *[_type == "license" && status == "active"] | order(order asc, title asc){
    title, label, registrationNumber, description
  }
}`;

type CmsResult = {
  settings: (Nullable<typeof localSiteSettings> & { whatsappNumber?: string | null }) | null;
  home: {
    heroSlides?: typeof localHeroSlides | null;
    featuredServices?: typeof localServices | null;
    partners?: typeof localPartners | null;
    vision?: string | null;
    mission?: string[] | null;
    heroEyebrow?: string | null;
    visionLabel?: string | null;
    missionLabel?: string | null;
    ecatalogueButtonLabel?: string | null;
    servicesHeading?: Nullable<Heading> | null;
    partnersHeading?: Nullable<Heading> | null;
    licensesHeading?: Nullable<Heading> | null;
    ecatalogueHeading?: Nullable<Heading> | null;
    inquiryBanner?: Nullable<CallToAction> | null;
    seo?: Nullable<Seo> | null;
  } | null;
  about: (Nullable<Omit<typeof localAboutPage, 'seo'>> & { seo?: Nullable<Seo> | null }) | null;
  contact: (Nullable<Omit<typeof localContactPage, 'seo'>> & { seo?: Nullable<Seo> | null }) | null;
  listing: {
    productsIntro?: Nullable<Heading> | null;
    productsEcatalogueTeaser?: Nullable<CallToAction> | null;
    productsSeo?: Nullable<Seo> | null;
    ecatalogueIntro?: Nullable<Heading> | null;
    ecatalogueSeo?: Nullable<Seo> | null;
    eventsIntro?: Nullable<Heading> | null;
    eventsSeo?: Nullable<Seo> | null;
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
        Pick<EventItem, 'slug' | 'title' | 'eventDateStart' | 'excerpt'> & {
          kind?: PostKind | null;
          publishedAt: string;
          body?: PortableText;
        })[]
    | null;
  licenses: (Nullable<(typeof localLicenses)[number]> & { title: string })[] | null;
};

const cms = await sanityFetch<CmsResult>(query);

/** True once Sanity is reachable and has been seeded; see the header comment. */
export const cmsInUse = Boolean(cms?.settings);

/** Collections: Sanity's list (even if empty) once Sanity is in use, otherwise the local list. */
const collection = <T>(items: T[] | null | undefined, local: T[]): T[] => (cmsInUse ? (items ?? []) : local);

/**
 * WhatsApp click-to-chat link derived from the displayed number, so the two can never disagree.
 * "+62 821-1458-2810" and "0821-1458-2810" both become https://wa.me/6282114582810.
 */
export const toWhatsappLink = (number: string): string => {
  const digits = number.replace(/\D/g, '');
  return `https://wa.me/${digits.startsWith('0') ? `62${digits.slice(1)}` : digits}`;
};

/* ---------- Site settings ---------- */

const s = cms?.settings;
export const siteSettings: typeof localSiteSettings = s
  ? {
      name: pick(s.name, localSiteSettings.name),
      logo: pick(s.logo, localSiteSettings.logo),
      tagline: pick(s.tagline, localSiteSettings.tagline),
      whatsapp: pick(s.whatsappNumber, localSiteSettings.whatsapp),
      whatsappLink: toWhatsappLink(pick(s.whatsappNumber, localSiteSettings.whatsapp)),
      whatsappButtonLabel: pick(s.whatsappButtonLabel, localSiteSettings.whatsappButtonLabel),
      address: pick(s.address, localSiteSettings.address),
      mapUrl: pick(s.mapUrl, localSiteSettings.mapUrl),
      email: s.email ?? '',
      // Never set → local defaults; set (even to an empty list) → exactly what the editor chose.
      socials: Array.isArray(s.socials)
        ? s.socials.filter((link) => link?.label && link?.url)
        : localSiteSettings.socials,
      disclaimer: pick(s.disclaimer, localSiteSettings.disclaimer),
      navLinks: (() => {
        const links = (s.navLinks ?? []).filter((link) => link?.label && link?.href);
        return nonEmpty(links) ? links : localSiteSettings.navLinks;
      })(),
      footerContactHeading: pick(s.footerContactHeading, localSiteSettings.footerContactHeading),
      footerMapLinkLabel: pick(s.footerMapLinkLabel, localSiteSettings.footerMapLinkLabel),
      footerSocialHeading: pick(s.footerSocialHeading, localSiteSettings.footerSocialHeading)
    }
  : { ...localSiteSettings, whatsappLink: toWhatsappLink(localSiteSettings.whatsapp) };

/* ---------- Home page ---------- */

const home = cms?.home;
export const heroSlides = nonEmpty(home?.heroSlides) ? home.heroSlides : localHeroSlides;
export const featuredServices = nonEmpty(home?.featuredServices) ? home.featuredServices : localServices;
export const partners = nonEmpty(home?.partners) ? home.partners : localPartners;
export const visionMission = {
  vision: pick(home?.vision, localVisionMission.vision),
  mission: nonEmpty(home?.mission) ? home.mission : localVisionMission.mission
};

/** Section headings and labels on the home page (and the shared inquiry banner). */
export const homeSections: typeof localHomeSections = {
  seo: merge(home?.seo, localHomeSections.seo),
  heroEyebrow: pick(home?.heroEyebrow, localHomeSections.heroEyebrow),
  services: merge(home?.servicesHeading, localHomeSections.services),
  partners: merge(home?.partnersHeading, localHomeSections.partners),
  visionLabel: pick(home?.visionLabel, localHomeSections.visionLabel),
  missionLabel: pick(home?.missionLabel, localHomeSections.missionLabel),
  licenses: merge(home?.licensesHeading, localHomeSections.licenses),
  ecatalogue: merge(home?.ecatalogueHeading, localHomeSections.ecatalogue),
  ecatalogueButtonLabel: pick(home?.ecatalogueButtonLabel, localHomeSections.ecatalogueButtonLabel),
  inquiryBanner: merge(home?.inquiryBanner, localHomeSections.inquiryBanner)
};

/* ---------- About, Contact and listing pages ---------- */

const about = cms?.about;
export const aboutPage: typeof localAboutPage = {
  seo: merge(about?.seo, localAboutPage.seo),
  eyebrow: pick(about?.eyebrow, localAboutPage.eyebrow),
  heading: pick(about?.heading, localAboutPage.heading),
  // A CMS image replaces the local one; its alt text falls back to the heading.
  image: pick(about?.image, localAboutPage.image),
  imageAlt: about?.image ? pick(about.imageAlt, pick(about.heading, localAboutPage.heading)) : localAboutPage.imageAlt,
  leftColumn: nonEmpty(about?.leftColumn) ? about.leftColumn : localAboutPage.leftColumn,
  rightColumn: nonEmpty(about?.rightColumn) ? about.rightColumn : localAboutPage.rightColumn,
  showDisclaimer: pick(about?.showDisclaimer, localAboutPage.showDisclaimer),
  disclaimerLabel: pick(about?.disclaimerLabel, localAboutPage.disclaimerLabel)
};

const contact = cms?.contact;
export const contactPage: typeof localContactPage = {
  seo: merge(contact?.seo, localContactPage.seo),
  heading: pick(contact?.heading, localContactPage.heading),
  intro: pick(contact?.intro, localContactPage.intro),
  mapEmbedUrl: pick(contact?.mapEmbedUrl, localContactPage.mapEmbedUrl)
};

const listing = cms?.listing;
export const listingPages: typeof localListingPages = {
  products: {
    seo: merge(listing?.productsSeo, localListingPages.products.seo),
    intro: merge(listing?.productsIntro, localListingPages.products.intro),
    ecatalogueTeaser: merge(listing?.productsEcatalogueTeaser, localListingPages.products.ecatalogueTeaser)
  },
  ecatalogue: {
    seo: merge(listing?.ecatalogueSeo, localListingPages.ecatalogue.seo),
    intro: merge(listing?.ecatalogueIntro, localListingPages.ecatalogue.intro)
  },
  events: {
    seo: merge(listing?.eventsSeo, localListingPages.events.seo),
    intro: merge(listing?.eventsIntro, localListingPages.events.intro)
  }
};

/* ---------- Products ---------- */

export const productCategories: ProductCategory[] = collection(cms?.categories, localCategories);

const uncategorized = (cms?.products ?? []).filter((product) => !product.categoryId).map((product) => product.slug);
if (cmsInUse && uncategorized.length > 0) {
  console.warn(`[sanity] Products without a published category (shown without a category label): ${uncategorized.join(', ')}`);
}

export const products: Product[] = cmsInUse
  ? (cms?.products ?? []).map((product) => ({
      slug: product.slug,
      name: product.name,
      categoryId: product.categoryId ?? '',
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

export const getCategory = (id: ProductCategory['id']) =>
  id ? productCategories.find((category) => category.id === id) : undefined;

export const getEcatalogProducts = () => products.filter((product) => Boolean(product.catalogUrl));

/* ---------- Events ---------- */

/** "2025-08-15" → "August 15, 2025"; anything unparseable → "". */
export const formatDate = (isoDate: string | null | undefined): string => {
  const day = isoDate?.slice(0, 10);
  const date = day ? new Date(`${day}T00:00:00`) : null;
  return date && !Number.isNaN(date.getTime())
    ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';
};

export const events: EventItem[] = cmsInUse
  ? (cms?.events ?? []).map((event) => {
      const kind: PostKind = event.kind && event.kind in postKindLabels ? event.kind : 'event';
      const published = event.publishedAt?.slice(0, 10) || '';
      // News and articles are dated by publish date. Events use their start date
      // (required in the dashboard), with publishedAt as a last resort.
      const start = kind === 'event' ? event.eventDateStart || published : published;
      return {
        kind,
        slug: event.slug,
        title: event.title,
        createdAt: event.publishedAt,
        eventDate: (kind === 'event' && event.eventDate?.trim()) || formatDate(start),
        eventDateStart: start,
        excerpt: event.excerpt,
        body: toParagraphs(event.body),
        image: event.image ?? '',
        sourceUrl: event.sourceUrl ?? '',
        sourceLabel: event.sourceLabel ?? 'Open folder'
      };
    })
  : localEvents;

/* ---------- Licenses ---------- */

export const licenses = cmsInUse
  ? (cms?.licenses ?? []).map((license) => ({
      title: license.title,
      label: license.label ?? 'Registration Number',
      registrationNumber: license.registrationNumber ?? '',
      description: license.description ?? ''
    }))
  : localLicenses;
