import { beforeEach, describe, expect, it, vi } from 'vitest';
import { stubFetchJson, stubSanityEnv } from '../helpers/env';
import { siteSettings as localSiteSettings } from '../../src/data/siteSettings';
import {
  heroSlides as localHeroSlides,
  featuredServices as localServices,
  partners as localPartners,
  visionMission as localVisionMission
} from '../../src/data/home';
import { productCategories as localCategories } from '../../src/data/categories';
import { products as localProducts } from '../../src/data/products';
import { events as localEvents } from '../../src/data/events';
import { licenses as localLicenses } from '../../src/data/licenses';

/**
 * content.ts runs one Sanity query with top-level await. Each scenario stubs
 * env + fetch, resets the module graph and re-imports so the await re-runs.
 */
const loadContent = async () => {
  vi.resetModules();
  return import('../../src/lib/content');
};

const loadWithCms = async (result: Record<string, unknown>) => {
  stubSanityEnv({ SANITY_PROJECT_ID: 'test-project' });
  const fetchMock = stubFetchJson({ result });
  const content = await loadContent();
  return { content, fetchMock };
};

const block = (...spans: string[]) => ({ _type: 'block', children: spans.map((text) => ({ _type: 'span', text })) });

const cmsCategories = [
  { id: 'spine', name: 'CMS Spine', description: 'From Sanity' },
  { id: 'robotics', name: 'CMS Robotics', description: '' }
];

const cmsProducts = [
  {
    slug: 'cms-screw',
    name: 'CMS Screw',
    categoryId: 'spine',
    shortDescription: 'Short',
    body: [block('First ', 'paragraph.'), { _type: 'image' }, block('Second paragraph.')],
    highlights: ['Strong'],
    manufacturer: 'Acme',
    sourceLabel: 'Brochure',
    catalogUrl: 'https://katalog.inaproc.id/cms-screw',
    specifications: [
      { label: 'Material', value: 'Titanium' },
      { label: 'Length', value: '40 mm' }
    ],
    source: 'https://cdn.sanity.io/files/x/brochure.pdf',
    heroImage: 'https://cdn.sanity.io/images/x/screw.png'
  },
  {
    slug: 'cms-robot',
    name: 'CMS Robot',
    categoryId: 'robotics',
    shortDescription: 'Bare minimum',
    body: null,
    highlights: null,
    manufacturer: null,
    sourceLabel: null,
    catalogUrl: null,
    specifications: null,
    source: null,
    heroImage: null
  }
];

const cmsEvents = [
  {
    slug: 'cms-event-with-label',
    title: 'Labelled',
    publishedAt: '2026-10-01T08:00:00Z',
    eventDate: 'October 1-2, 2026',
    eventDateStart: '2026-10-01',
    excerpt: 'Excerpt A',
    body: [block('Para ', 'one'), block(''), block('Para two')],
    image: 'https://cdn.sanity.io/images/x/a.png',
    sourceUrl: 'https://drive.google.com/a',
    sourceLabel: 'Photos'
  },
  {
    slug: 'cms-event-no-label',
    title: 'Unlabelled',
    publishedAt: '2026-09-01T08:00:00Z',
    eventDate: '',
    eventDateStart: '2026-03-05',
    excerpt: 'Excerpt B',
    body: null,
    image: null,
    sourceUrl: null,
    sourceLabel: null
  }
];

const cmsLicenses = [
  { title: 'CDAKB', label: 'Cert No.', registrationNumber: '123', description: 'Desc' },
  { title: 'NIB', label: null, registrationNumber: null, description: null }
];

const fullCms = {
  settings: {
    name: 'CMS Name',
    tagline: 'CMS tagline',
    whatsappNumber: '+62 811-0000-0000',
    whatsappLink: 'https://wa.me/628110000000',
    email: 'hello@example.com',
    address: 'CMS address',
    mapUrl: 'https://maps.example.com',
    disclaimer: 'CMS disclaimer',
    logo: 'https://cdn.sanity.io/images/x/logo.png',
    socials: [
      { label: 'LinkedIn', url: 'https://linkedin.com/x' },
      { label: '', url: 'https://broken.example.com' },
      { label: 'No URL', url: null }
    ]
  },
  home: {
    heroSlides: [{ title: 'CMS slide', subtitle: 'Sub', image: 'https://cdn.sanity.io/images/x/slide.png' }],
    featuredServices: [{ title: 'CMS service', description: 'Desc', icon: '*' }],
    partners: [{ name: 'CMS partner', subtitle: 'Sub', image: 'https://cdn.sanity.io/images/x/p.png' }],
    vision: 'CMS vision',
    mission: ['CMS mission']
  },
  categories: cmsCategories,
  products: cmsProducts,
  events: cmsEvents,
  licenses: cmsLicenses
};

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('content.ts without Sanity', () => {
  it('exports the local data and does not call fetch', async () => {
    stubSanityEnv();
    const fetchMock = stubFetchJson({ result: fullCms });
    const content = await loadContent();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(content.siteSettings).toEqual(localSiteSettings);
    expect(content.heroSlides).toEqual(localHeroSlides);
    expect(content.featuredServices).toEqual(localServices);
    expect(content.partners).toEqual(localPartners);
    expect(content.visionMission).toEqual(localVisionMission);
    expect(content.productCategories).toEqual(localCategories);
    expect(content.products).toEqual(localProducts);
    expect(content.events).toEqual(localEvents);
    expect(content.licenses).toEqual(localLicenses);
    expect(content.getEcatalogProducts()).toEqual(localProducts.filter((p) => p.catalogUrl));
    expect(content.getCategory('spine')?.name).toBe('Spine Solutions');
  });

  it('falls back to local data when the Sanity request fails', async () => {
    stubSanityEnv({ SANITY_PROJECT_ID: 'test-project' });
    stubFetchJson({ error: 'boom' }, { status: 503 });
    const content = await loadContent();

    expect(content.products).toEqual(localProducts);
    expect(content.events).toEqual(localEvents);
    expect(content.siteSettings).toEqual(localSiteSettings);
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('falls back to local data when every CMS collection is empty or null', async () => {
    const { content, fetchMock } = await loadWithCms({
      settings: null,
      home: null,
      categories: [],
      products: [],
      events: null,
      licenses: []
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(content.siteSettings).toEqual(localSiteSettings);
    expect(content.heroSlides).toEqual(localHeroSlides);
    expect(content.visionMission).toEqual(localVisionMission);
    expect(content.productCategories).toEqual(localCategories);
    expect(content.products).toEqual(localProducts);
    expect(content.events).toEqual(localEvents);
    expect(content.licenses).toEqual(localLicenses);
  });
});

describe('content.ts with a full Sanity response', () => {
  it('sends a single query to Sanity', async () => {
    const { fetchMock } = await loadWithCms(fullCms);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const url = new URL(String(fetchMock.mock.calls[0][0]));
    expect(url.host).toBe('test-project.apicdn.sanity.io');
    expect(url.searchParams.get('query')).toContain('_type == "product"');
  });

  it('maps site settings, including whatsappNumber -> whatsapp, and filters incomplete socials', async () => {
    const { content } = await loadWithCms(fullCms);
    expect(content.siteSettings).toEqual({
      name: 'CMS Name',
      logo: 'https://cdn.sanity.io/images/x/logo.png',
      tagline: 'CMS tagline',
      whatsapp: '+62 811-0000-0000',
      whatsappLink: 'https://wa.me/628110000000',
      address: 'CMS address',
      mapUrl: 'https://maps.example.com',
      email: 'hello@example.com',
      socials: [{ label: 'LinkedIn', url: 'https://linkedin.com/x' }],
      disclaimer: 'CMS disclaimer'
    });
  });

  it('uses CMS home page content', async () => {
    const { content } = await loadWithCms(fullCms);
    expect(content.heroSlides).toEqual(fullCms.home.heroSlides);
    expect(content.featuredServices).toEqual(fullCms.home.featuredServices);
    expect(content.partners).toEqual(fullCms.home.partners);
    expect(content.visionMission).toEqual({ vision: 'CMS vision', mission: ['CMS mission'] });
  });

  it('maps products: specifications array -> object, body portable text -> paragraphs joined by blank lines', async () => {
    const { content } = await loadWithCms(fullCms);
    expect(content.products).toHaveLength(2);
    expect(content.products[0]).toEqual({
      slug: 'cms-screw',
      name: 'CMS Screw',
      categoryId: 'spine',
      shortDescription: 'Short',
      body: 'First paragraph.\n\nSecond paragraph.',
      highlights: ['Strong'],
      specifications: { Material: 'Titanium', Length: '40 mm' },
      manufacturer: 'Acme',
      source: 'https://cdn.sanity.io/files/x/brochure.pdf',
      sourceLabel: 'Brochure',
      catalogUrl: 'https://katalog.inaproc.id/cms-screw',
      heroImage: 'https://cdn.sanity.io/images/x/screw.png'
    });
  });

  it('gives products safe defaults for missing optional fields', async () => {
    const { content } = await loadWithCms(fullCms);
    expect(content.products[1]).toEqual({
      slug: 'cms-robot',
      name: 'CMS Robot',
      categoryId: 'robotics',
      shortDescription: 'Bare minimum',
      body: '',
      highlights: [],
      specifications: {},
      manufacturer: '',
      source: undefined,
      sourceLabel: undefined,
      catalogUrl: undefined,
      heroImage: undefined
    });
  });

  it('getEcatalogProducts only returns products with a catalogUrl', async () => {
    const { content } = await loadWithCms(fullCms);
    expect(content.getEcatalogProducts().map((p) => p.slug)).toEqual(['cms-screw']);
  });

  it('getCategory and productCategories use the CMS categories', async () => {
    const { content } = await loadWithCms(fullCms);
    expect(content.productCategories).toEqual(cmsCategories);
    expect(content.getCategory('spine')?.name).toBe('CMS Spine');
    expect(content.getCategory('robotics')?.name).toBe('CMS Robotics');
    // Local-only categories are not mixed in.
    expect(content.getCategory('trauma')).toBeUndefined();
  });

  it('maps events: publishedAt -> createdAt, portable text body -> paragraphs, label kept', async () => {
    const { content } = await loadWithCms(fullCms);
    expect(content.events[0]).toEqual({
      slug: 'cms-event-with-label',
      title: 'Labelled',
      createdAt: '2026-10-01T08:00:00Z',
      eventDate: 'October 1-2, 2026',
      eventDateStart: '2026-10-01',
      excerpt: 'Excerpt A',
      body: ['Para one', 'Para two'],
      image: 'https://cdn.sanity.io/images/x/a.png',
      sourceUrl: 'https://drive.google.com/a',
      sourceLabel: 'Photos'
    });
  });

  it('formats eventDateStart (en-US, long month) when eventDate is empty, and defaults other fields', async () => {
    const { content } = await loadWithCms(fullCms);
    expect(content.events[1]).toEqual({
      slug: 'cms-event-no-label',
      title: 'Unlabelled',
      createdAt: '2026-09-01T08:00:00Z',
      eventDate: 'March 5, 2026',
      eventDateStart: '2026-03-05',
      excerpt: 'Excerpt B',
      body: [],
      image: '',
      sourceUrl: '',
      sourceLabel: 'Open event folder'
    });
  });

  it('formats the date the same way when eventDate is null', async () => {
    const { content } = await loadWithCms({
      ...fullCms,
      events: [{ ...cmsEvents[1], eventDate: null, eventDateStart: '2025-12-31' }]
    });
    expect(content.events[0].eventDate).toBe('December 31, 2025');
  });

  it('maps licenses with defaults for label, number and description', async () => {
    const { content } = await loadWithCms(fullCms);
    expect(content.licenses).toEqual([
      { title: 'CDAKB', label: 'Cert No.', registrationNumber: '123', description: 'Desc' },
      { title: 'NIB', label: 'Registration Number', registrationNumber: '', description: '' }
    ]);
  });
});

describe('content.ts per-collection fallback', () => {
  it('uses CMS products but local events, licenses and home content when those are empty', async () => {
    const { content } = await loadWithCms({
      settings: null,
      home: { heroSlides: [], featuredServices: null, partners: [], vision: null, mission: [] },
      categories: cmsCategories,
      products: cmsProducts,
      events: [],
      licenses: null
    });

    expect(content.products.map((p) => p.slug)).toEqual(['cms-screw', 'cms-robot']);
    expect(content.productCategories).toEqual(cmsCategories);
    expect(content.events).toEqual(localEvents);
    expect(content.licenses).toEqual(localLicenses);
    expect(content.heroSlides).toEqual(localHeroSlides);
    expect(content.featuredServices).toEqual(localServices);
    expect(content.partners).toEqual(localPartners);
    expect(content.visionMission).toEqual(localVisionMission);
    expect(content.siteSettings).toEqual(localSiteSettings);
  });

  it('uses CMS events but local products and categories when those are empty', async () => {
    const { content } = await loadWithCms({ ...fullCms, categories: [], products: null });

    expect(content.events.map((e) => e.slug)).toEqual(['cms-event-with-label', 'cms-event-no-label']);
    expect(content.products).toEqual(localProducts);
    expect(content.productCategories).toEqual(localCategories);
    expect(content.getCategory('trauma')?.name).toBe('Trauma & Reconstruction');
  });

  it('falls back field by field for partial home content', async () => {
    const { content } = await loadWithCms({
      ...fullCms,
      home: { heroSlides: fullCms.home.heroSlides, vision: '', mission: null }
    });
    expect(content.heroSlides).toEqual(fullCms.home.heroSlides);
    expect(content.featuredServices).toEqual(localServices);
    expect(content.partners).toEqual(localPartners);
    expect(content.visionMission).toEqual(localVisionMission);
  });

  it('falls back field by field for partial site settings', async () => {
    const { content } = await loadWithCms({
      ...fullCms,
      settings: {
        name: 'Only the name',
        tagline: '',
        whatsappNumber: null,
        whatsappLink: undefined,
        address: null,
        mapUrl: '',
        disclaimer: null,
        logo: null
      }
    });

    expect(content.siteSettings).toEqual({
      ...localSiteSettings,
      name: 'Only the name',
      // Current behavior: email and socials do NOT fall back to local values
      // (local email is '' so that is equivalent; socials become []).
      email: '',
      socials: []
    });
  });
});
