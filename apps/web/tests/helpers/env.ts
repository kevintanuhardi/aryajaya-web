import { vi } from 'vitest';

export const SANITY_ENV_KEYS = [
  'SANITY_PROJECT_ID',
  'SANITY_STUDIO_PROJECT_ID',
  'SANITY_DATASET',
  'SANITY_STUDIO_DATASET',
  'SANITY_READ_TOKEN'
] as const;

type SanityEnv = Partial<Record<(typeof SANITY_ENV_KEYS)[number], string>>;

/** Clears every Sanity variable (so a local .env cannot leak in), then applies `env`. */
export function stubSanityEnv(env: SanityEnv = {}) {
  for (const key of SANITY_ENV_KEYS) vi.stubEnv(key, env[key] ?? '');
}

/** Stubs global fetch with the same JSON response for every call. */
export function stubFetchJson(body: unknown, init: { status?: number } = {}) {
  const fetchMock = vi.fn(
    async (_url: URL | string, _init?: RequestInit) =>
      new Response(JSON.stringify(body), { status: init.status ?? 200 })
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}
