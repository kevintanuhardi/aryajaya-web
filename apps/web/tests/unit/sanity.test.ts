import { beforeEach, describe, expect, it, vi } from 'vitest';
import { stubFetchJson, stubSanityEnv } from '../helpers/env';

// sanity.ts reads env at module load, so each scenario re-imports it.
const loadSanity = async () => {
  vi.resetModules();
  return import('../../src/lib/sanity');
};

const QUERY = '*[_type == "product"]{title}';

describe('sanityFetch', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('returns null and never calls fetch without a project ID', async () => {
    stubSanityEnv();
    const fetchMock = stubFetchJson({ result: ['should not be used'] });
    const { sanityFetch, isSanityConfigured } = await loadSanity();

    expect(isSanityConfigured).toBe(false);
    await expect(sanityFetch(QUERY)).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reads the live API (not the apicdn cache) without a token and sends no Authorization header', async () => {
    stubSanityEnv({ SANITY_PROJECT_ID: 'abc123', SANITY_DATASET: 'staging' });
    const fetchMock = stubFetchJson({ result: [] });
    const { sanityFetch } = await loadSanity();
    await sanityFetch(QUERY);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    const parsed = new URL(String(url));
    expect(parsed.origin).toBe('https://abc123.api.sanity.io');
    expect(parsed.pathname).toBe('/v2024-01-01/data/query/staging');
    expect(parsed.searchParams.get('query')).toBe(QUERY);
    expect(parsed.searchParams.get('perspective')).toBe('published');
    expect(init?.headers).toBeUndefined();
  });

  it('falls back to SANITY_STUDIO_PROJECT_ID and the production dataset', async () => {
    stubSanityEnv({ SANITY_STUDIO_PROJECT_ID: 'studio42' });
    const fetchMock = stubFetchJson({ result: [] });
    const { sanityFetch, isSanityConfigured } = await loadSanity();
    await sanityFetch(QUERY);

    expect(isSanityConfigured).toBe(true);
    const parsed = new URL(String(fetchMock.mock.calls[0][0]));
    expect(parsed.host).toBe('studio42.api.sanity.io');
    expect(parsed.pathname).toBe('/v2024-01-01/data/query/production');
  });

  it('uses the live API host and a bearer token when SANITY_READ_TOKEN is set', async () => {
    stubSanityEnv({ SANITY_PROJECT_ID: 'abc123', SANITY_READ_TOKEN: 'secret-token' });
    const fetchMock = stubFetchJson({ result: [] });
    const { sanityFetch } = await loadSanity();
    await sanityFetch(QUERY);

    const [url, init] = fetchMock.mock.calls[0];
    expect(new URL(String(url)).host).toBe('abc123.api.sanity.io');
    expect(init?.headers).toEqual({ Authorization: 'Bearer secret-token' });
  });

  it('JSON-encodes query params as $-prefixed search params', async () => {
    stubSanityEnv({ SANITY_PROJECT_ID: 'abc123' });
    const fetchMock = stubFetchJson({ result: [] });
    const { sanityFetch } = await loadSanity();
    await sanityFetch(QUERY, { slug: 'nova', limit: 3 });

    const parsed = new URL(String(fetchMock.mock.calls[0][0]));
    expect(parsed.searchParams.get('$slug')).toBe('"nova"');
    expect(parsed.searchParams.get('$limit')).toBe('3');
  });

  it('returns the `result` field on a 200 response', async () => {
    stubSanityEnv({ SANITY_PROJECT_ID: 'abc123' });
    stubFetchJson({ result: [{ title: 'Nova' }], ms: 4, query: QUERY });
    const { sanityFetch } = await loadSanity();

    await expect(sanityFetch(QUERY)).resolves.toEqual([{ title: 'Nova' }]);
  });

  it('returns null on a non-200 response and warns only once', async () => {
    stubSanityEnv({ SANITY_PROJECT_ID: 'abc123' });
    stubFetchJson({ error: 'nope' }, { status: 500 });
    const { sanityFetch } = await loadSanity();

    await expect(sanityFetch(QUERY)).resolves.toBeNull();
    await expect(sanityFetch(QUERY)).resolves.toBeNull();
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(String(vi.mocked(console.warn).mock.calls[0][0])).toContain('HTTP 500');
  });

  it('returns null when fetch throws', async () => {
    stubSanityEnv({ SANITY_PROJECT_ID: 'abc123' });
    vi.stubGlobal('fetch', vi.fn(async () => Promise.reject(new TypeError('network down'))));
    const { sanityFetch } = await loadSanity();

    await expect(sanityFetch(QUERY)).resolves.toBeNull();
    expect(String(vi.mocked(console.warn).mock.calls[0][0])).toContain('network down');
  });
});

describe('toParagraphs', () => {
  it('handles null and undefined', async () => {
    const { toParagraphs } = await loadSanity();
    expect(toParagraphs(null)).toEqual([]);
    expect(toParagraphs(undefined)).toEqual([]);
  });

  it('keeps blocks only, joins child spans, and drops empty text', async () => {
    const { toParagraphs } = await loadSanity();
    const blocks = [
      { _type: 'block', children: [{ text: 'Hello ' }, { text: 'world' }, { text: '.' }] },
      { _type: 'image', children: [{ text: 'not a paragraph' }] },
      { _type: 'block', children: [{ text: '   ' }] },
      { _type: 'block', children: [] },
      { _type: 'block' },
      { _type: 'block', children: [{}, { text: 'Second' }] }
    ];
    expect(toParagraphs(blocks)).toEqual(['Hello world.', 'Second']);
  });
});
